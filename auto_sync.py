import os
import sys
import time
import subprocess
import logging
from pathlib import Path
from threading import Timer

# Garante suporte a UTF-8 no stdout do Windows CMD
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
    HAS_WATCHDOG = True
except ImportError:
    HAS_WATCHDOG = False

# --- CONFIGURAÇÕES DO AUTO-SYNC ---
REPO_DIR = os.path.abspath(os.path.dirname(__file__))
BRANCH = "main"
DEBOUNCE_INTERVAL = 3.0  # Segundos de inatividade antes de sincronizar

# Carrega PAT de arquivo .env se existir
ENV_FILE = os.path.join(REPO_DIR, ".env")
GITHUB_PAT = os.environ.get("GITHUB_PAT", "")

if not GITHUB_PAT and os.path.exists(ENV_FILE):
    try:
        with open(ENV_FILE, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("GITHUB_PAT="):
                    GITHUB_PAT = line.strip().split("=", 1)[1].strip("\"'")
                    break
    except Exception:
        pass

IGNORED_PATTERNS = [
    "\\.git\\", "node_modules", "\\.venv\\", "\\.vscode\\",
    "auto_sync.log", "\\.tmp", "~$", "\\.swp", "\\.env"
]

# Configuração do sistema de logs
LOG_FILE = os.path.join(REPO_DIR, "auto_sync.log")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout)
    ]
)

class GitAutoSync:
    def __init__(self, repo_dir, branch, pat=""):
        self.repo_dir = repo_dir
        self.branch = branch
        self.pat = pat
        self.is_syncing = False

    def _get_remote_url(self):
        if self.pat:
            return f"https://x-access-token:{self.pat}@github.com/brasil-financas-atlas/atlas.git"
        return "origin"

    def _limpar_segredo(self, texto):
        """Remove o PAT de qualquer texto antes de ir para o log.

        O remote autenticado carrega o token dentro da propria URL, e o git
        repete essa URL nas mensagens de erro. Sem esta limpeza, um push que
        falha grava o token em texto puro no auto_sync.log.
        """
        if not texto:
            return texto
        if self.pat:
            texto = texto.replace(self.pat, "***TOKEN-OCULTO***")
        return texto

    def _run_git(self, args, timeout=40):
        """Executa comandos do Git impedindo travamento por solicitação de senha."""
        env = os.environ.copy()
        env["GIT_TERMINAL_PROMPT"] = "0"
        env["GIT_OPTIONAL_LOCKS"] = "0"

        cmd = ["git"] + args
        try:
            result = subprocess.run(
                cmd,
                cwd=self.repo_dir,
                env=env,
                capture_output=True,
                text=True,
                timeout=timeout
            )
            if result.returncode == 0:
                return True, self._limpar_segredo(result.stdout.strip())
            else:
                saida = result.stderr.strip() or result.stdout.strip()
                return False, self._limpar_segredo(saida)
        except subprocess.TimeoutExpired:
            return False, f"Comando git {args[0]} expirou tempo limite de {timeout}s."
        except Exception as e:
            return False, self._limpar_segredo(str(e))

    def has_changes(self):
        """Verifica se há alterações modificadas ou novos arquivos staged/unstaged."""
        success, out = self._run_git(["status", "--porcelain"])
        return success and len(out.strip()) > 0

    def sync(self):
        if self.is_syncing:
            return

        self.is_syncing = True
        logging.info("[AUTO-SYNC] Alteracao detectada! Iniciando sincronizacao com GitHub...")

        remote_target = self._get_remote_url()

        try:
            # 1. Traz o remoto ANTES de qualquer coisa. Se nao der para saber o
            #    que existe no GitHub, nao ha como publicar com seguranca.
            logging.info("[AUTO-SYNC] Buscando atualizacoes do GitHub (git fetch)...")
            ok_fetch, saida_fetch = self._run_git(["fetch", remote_target, self.branch])
            if not ok_fetch:
                logging.error(
                    "[AUTO-SYNC] ERRO no fetch: %s. Sincronizacao cancelada — "
                    "publicar sem conhecer o remoto sobrescreveria o trabalho de outra pessoa.",
                    saida_fetch
                )
                return

            # 2. Coloca as alteracoes locais em um commit.
            if self.has_changes():
                logging.info("[AUTO-SYNC] Adicionando arquivos e gerando commit local...")
                ok_add, saida_add = self._run_git(["add", "-A"])
                if not ok_add:
                    logging.error("[AUTO-SYNC] ERRO no git add: %s", saida_add)
                    return

                timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
                commit_msg = f"chore(auto-sync): atualiza arquivos locais [{timestamp}]"

                ok_commit, saida_commit = self._run_git(["commit", "-m", commit_msg])
                if not ok_commit and "nothing to commit" not in saida_commit:
                    logging.error("[AUTO-SYNC] ERRO ao criar commit: %s", saida_commit)
                    return

            # 3. Reaplica o commit local EM CIMA do que ja esta no GitHub.
            logging.info("[AUTO-SYNC] Rebasando historico com FETCH_HEAD...")
            ok_rebase, saida_rebase = self._run_git(["rebase", "FETCH_HEAD"])

            if not ok_rebase:
                # Conflito significa que o mesmo arquivo mudou nos dois lados.
                # Escolher um automaticamente e o que apaga o trabalho alheio,
                # entao aqui o servico para e devolve a decisao para a pessoa.
                logging.error("[AUTO-SYNC] CONFLITO no rebase: %s", saida_rebase)
                self._run_git(["rebase", "--abort"])
                logging.error(
                    "[AUTO-SYNC] PUSH CANCELADO. Alguem alterou os mesmos arquivos no GitHub. "
                    "Resolva a mao: `git pull --rebase origin %s`, revise o resultado e envie. "
                    "O servico continua rodando, mas nao vai publicar ate isso ser resolvido.",
                    self.branch
                )
                return

            # 4. So agora publica. Sem --force em hipotese nenhuma: se o push
            #    for recusado, o remoto andou de novo e a proxima rodada trata.
            logging.info("[AUTO-SYNC] Enviando commits para branch principal (git push)...")
            ok_push, saida_push = self._run_git(["push", remote_target, self.branch])
            if ok_push:
                logging.info("[AUTO-SYNC] SUCESSO! Alteracoes sincronizadas no GitHub.")
            else:
                logging.error("[AUTO-SYNC] ERRO no git push: %s", saida_push)

        finally:
            self.is_syncing = False

class DebouncedWatchdogHandler(FileSystemEventHandler):
    def __init__(self, sync_callback, delay=DEBOUNCE_INTERVAL):
        super().__init__()
        self.sync_callback = sync_callback
        self.delay = delay
        self.timer = None

    def on_any_event(self, event):
        if event.is_directory:
            return
        
        path = event.src_path
        for pattern in IGNORED_PATTERNS:
            if pattern in path:
                return

        if self.timer is not None:
            self.timer.cancel()

        self.timer = Timer(self.delay, self.sync_callback)
        self.timer.start()

def main():
    logging.info("==================================================")
    logging.info(f"[AUTO-SYNC] Iniciando Servico Auto-Sync BFA")
    logging.info(f"[AUTO-SYNC] Diretorio: {REPO_DIR}")
    logging.info(f"[AUTO-SYNC] Branch: {BRANCH}")
    if GITHUB_PAT:
        logging.info("[AUTO-SYNC] Autenticacao via GITHUB_PAT detectada.")
    else:
        logging.info("[AUTO-SYNC] Autenticacao via Git Credential Manager do sistema.")
    logging.info("==================================================")

    syncer = GitAutoSync(REPO_DIR, BRANCH, pat=GITHUB_PAT)
    
    # Roda uma sincronização inicial
    syncer.sync()

    if HAS_WATCHDOG:
        logging.info("[AUTO-SYNC] Modo Watchdog nativo ativado (Monitoramento em tempo real).")
        event_handler = DebouncedWatchdogHandler(syncer.sync, delay=DEBOUNCE_INTERVAL)
        observer = Observer()
        observer.schedule(event_handler, REPO_DIR, recursive=True)
        observer.start()

        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            observer.stop()
            logging.info("[AUTO-SYNC] Servico finalizado pelo usuario.")
        observer.join()
    else:
        logging.info("[AUTO-SYNC] Modo Polling ativado (Verificacao a cada 3 segundos).")
        while True:
            time.sleep(3)
            if syncer.has_changes():
                syncer.sync()

if __name__ == "__main__":
    main()
