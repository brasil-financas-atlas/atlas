    /* ==========================================================================
       Brasil Finanças Atlas (BFA) — Endereço e chave pública do Supabase
    
       PREENCHA OS DOIS VALORES ABAIXO. Onde achar:
         painel do Supabase -> Project Settings -> API
           - "Project URL"        -> BFA_SUPABASE_URL
           - "anon" / "public"    -> BFA_SUPABASE_ANON_KEY
    
       ---------------------------------------------------------------------------
       "Mas não é perigoso deixar a chave no código?"
    
       Não, e é importante entender por quê, porque a intuição aqui engana.
    
       A chave `anon` é PROJETADA para ser pública. Ela vai no navegador de todo
       visitante em qualquer aplicação Supabase — não existe jeito de esconder algo
       que o navegador precisa usar. Ela não dá permissão nenhuma por si só: só
       identifica o projeto. Quem decide o que cada pessoa pode ler e escrever são
       as políticas de RLS no banco (ver `src/data/schema.sql`).

       A chave que NUNCA pode aparecer aqui é a `service_role`, que ignora todo o
       RLS. Ela é de servidor. Se ela algum dia entrar neste arquivo, o banco
       inteiro fica aberto — leitura, escrita e exclusão, para qualquer visitante.

       Regra curta: `anon` neste arquivo, sim. `service_role`, jamais.
       ---------------------------------------------------------------------------

       Por que aqui e não no localStorage: o site é estático e a chave precisa
       existir para TODO visitante. Se ela ficasse guardada por navegador, o banco
       funcionaria só na máquina de quem digitou — foi o que aconteceu antes, e o
       motivo de `isConfigured()` retornar false em produção.
       ========================================================================== */

    // URL principal do projeto Supabase (SEM "/rest/v1/" no final)
    const BFA_SUPABASE_URL = 'https://wvcjjwvauibsculmqhxi.supabase.co';

    // Chave pública "anon public"
    const BFA_SUPABASE_ANON_KEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Y2pqd3ZhdWlic2N1bG1xaHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMTUyMjQsImV4cCI6MjEwMTc5MTIyNH0.xz3GQidAn0T2_SkkvygmOvsHW9em_YgMHpfukXTmCHw';

    /* A partir daqui não precisa mexer.
       A ordem de precedência permite sobrepor os valores acima no navegador
       (localStorage) quando alguém quiser testar contra outro projeto Supabase,
       sem editar arquivo. */
    window.VITE_SUPABASE_URL =
      window.VITE_SUPABASE_URL ||
      localStorage.getItem('BFA_VITE_SUPABASE_URL') ||
      BFA_SUPABASE_URL ||
      '';

    window.VITE_SUPABASE_ANON_KEY =
      window.VITE_SUPABASE_ANON_KEY ||
      localStorage.getItem('BFA_VITE_SUPABASE_ANON_KEY') ||
      BFA_SUPABASE_ANON_KEY ||
      '';

    if (!window.VITE_SUPABASE_URL || !window.VITE_SUPABASE_ANON_KEY) {
      console.warn(
        '[BFA] Supabase sem configuração: preencha BFA_SUPABASE_URL e ' +
        'BFA_SUPABASE_ANON_KEY em src/utils/env.js. Sem isso, login, progresso ' +
        'do aluno e publicação de conteúdo ficam desligados.'
      );
    }
