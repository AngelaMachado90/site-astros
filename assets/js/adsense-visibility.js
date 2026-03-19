(function () {
  'use strict';

  function ocultarShell(shell) {
    if (!shell) {
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(shell.dataset, 'adsPrevDisplay')) {
      shell.dataset.adsPrevDisplay = shell.style.display || '';
    }

    shell.classList.add('ad-shell-hidden');
    shell.setAttribute('aria-hidden', 'true');
    shell.style.display = 'none';
  }

  function mostrarShell(shell) {
    if (!shell) {
      return;
    }

    shell.classList.remove('ad-shell-hidden');
    shell.removeAttribute('aria-hidden');
    shell.style.display = shell.dataset.adsPrevDisplay || '';
  }

  function aplicarEstado(shell) {
    if (!shell) {
      return;
    }

    const slot = shell.querySelector('ins.adsbygoogle');
    if (!slot) {
      ocultarShell(shell);
      return;
    }

    const status = slot.getAttribute('data-ad-status');
    const statusInterno = slot.getAttribute('data-adsbygoogle-status');

    if (status === 'filled') {
      mostrarShell(shell);
      return;
    }

    // Enquanto estiver sem resposta, pendente ou unfilled, mantemos oculto.
    if (!status || status === 'unfilled' || statusInterno === 'done') {
      ocultarShell(shell);
    }
  }

  function observarSlot(shell) {
    const slot = shell.querySelector('ins.adsbygoogle');
    if (!slot) {
      return;
    }

    const observer = new MutationObserver(() => {
      aplicarEstado(shell);
    });

    observer.observe(slot, {
      attributes: true,
      attributeFilter: ['data-ad-status', 'style', 'data-adsbygoogle-status'],
    });

    // Fallback: após alguns segundos sem preenchimento, continua oculto.
    window.setTimeout(() => {
      aplicarEstado(shell);
    }, 4000);
  }

  function initAdsVisibility() {
    const shells = document.querySelectorAll('.ad-shell');
    shells.forEach((shell) => {
      ocultarShell(shell);
      aplicarEstado(shell);
      observarSlot(shell);
    });

    // Fallback adicional para cenários de cache/CDN e resposta tardia do AdSense.
    let tentativas = 0;
    const timer = window.setInterval(() => {
      tentativas += 1;
      shells.forEach((shell) => aplicarEstado(shell));
      if (tentativas >= 15) {
        window.clearInterval(timer);
      }
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdsVisibility);
  } else {
    initAdsVisibility();
  }
})();
