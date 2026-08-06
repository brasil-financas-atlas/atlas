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
                return True, result.stdout.strip()
            else:
                return False, result.stderr.strip() or result.stdout.strip()
        except subprocess.TimeoutExpired:
            return False, f"Comando {' '.join(cmd)} expirou tempo limite de {timeout}s."
        except Exception as e:
            return False, str(e)

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
            # 1. Puxa atualizações remotas via rebase seguro
            success, out = self._run_git(["pull", "--rebase", remote_target, self.branch])
            if not success and "up to date" not in out and "Already up to date" not in out:
                if "rebase in progress" in out or "conflict" in out.lower():
                    logging.warning("[AUTO-SYNC] Conflito no git pull --rebase. Abortando rebase para manter estabilidade.")
                    self._run_git(["rebase", "--abort"])

            # 2. Se houver alterações locais, faz staging, commit e push
            if self.has_changes():
                logging.info("[AUTO-SYNC] Adicionando arquivos e gerando commit...")
                self._run_git(["add", "-A"])

                timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
                commit_msg = f"chore(auto-sync): atualiza arquivos locais [{timestamp}]"

                success_commit, out_commit = self._run_git(["commit", "-m", commit_msg])
                if success_commit:
                    logging.info("[AUTO-SYNC] Enviando commits para branch principal (git push)...")
                    success_push, out_push = self._run_git(["push", remote_target, self.branch])
                    if success_push:
                        logging.info("[AUTO-SYNC] SUCESSO! Alteracoes sincronizadas no GitHub.")
                    else:
                        logging.error(f"[AUTO-SYNC] ERRO no git push: {out_push}")
                        if "could not read Username" in out_push or "Authentication failed" in out_push:
                            logging.error("[AUTO-SYNC] DICA: Adicione seu PAT no arquivo .env (GITHUB_PAT=sua_chave) para autenticação automática sem prompt.")
                else:
                    logging.error(f"[AUTO-SYNC] ERRO ao criar commit: {out_commit}")
            else:
                logging.info("[AUTO-SYNC] Nenhuma alteracao pendente para commit.")

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
