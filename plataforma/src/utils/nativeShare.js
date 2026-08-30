// Utilitário de compartilhamento nativo para Mobile e Desktop (BFA)

async function shareContent({ title, text, url }) {
  const shareUrl = url || window.location.href;
  const shareData = {
    title: title || 'Brasil Finanças Atlas',
    text: text || 'Confira esta aula no Brasil Finanças Atlas!',
    url: shareUrl
  };

  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('[SHARE] Erro ao invocar Web Share API:', err);
      }
      return { success: false, aborted: err.name === 'AbortError' };
    }
  } else {
    // Fallback: Copiar para a área de transferência
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        return { success: true, method: 'clipboard' };
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return { success: true, method: 'clipboard' };
      }
    } catch (clipErr) {
      console.error('[SHARE] Falha ao copiar link:', clipErr);
      return { success: false, error: clipErr };
    }
  }
}

window.shareContent = shareContent;
