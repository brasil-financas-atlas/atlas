/**
 * GitHub REST API Direct Commit-Back Service for BFA Platform (Git-as-a-CMS)
 */
const githubSyncService = {
  /**
   * Commit updated JSON overrides directly to GitHub repository
   */
  async commitOverrides({ owner, repo, path = 'plataforma/src/data/overrides.json', branch = 'main', content, token, message }) {
    if (!token) {
      throw new Error("Personal Access Token (PAT) do GitHub é necessário.");
    }

    const cleanOwner = owner || 'davidlhferro';
    const cleanRepo = repo || 'atlas';
    const apiUrl = `https://api.github.com/repos/${cleanOwner}/${cleanRepo}/contents/${path}`;

    // 1. Fetch current file SHA if exists
    let sha = null;
    try {
      const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (getRes.ok) {
        const getData = await getRes.json();
        sha = getData.sha;
      }
    } catch (err) {
      console.warn("Arquivo não encontrado no repositório, criando novo...", err);
    }

    // 2. Base64 encode UTF-8 content
    const jsonStr = JSON.stringify(content, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(jsonStr)));

    // 3. Commit file via PUT request
    const payload = {
      message: message || `content(cms): atualiza edições in-context [${new Date().toLocaleString('pt-BR')}]`,
      content: base64Content,
      branch: branch
    };
    if (sha) {
      payload.sha = sha;
    }

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(payload)
    });

    if (!putRes.ok) {
      const errData = await putRes.json();
      throw new Error(errData.message || "Falha ao enviar commit para a API do GitHub.");
    }

    const putData = await putRes.json();
    return {
      success: true,
      commitSha: putData.commit.sha,
      commitUrl: putData.commit.html_url
    };
  }
};

window.githubSyncService = githubSyncService;
