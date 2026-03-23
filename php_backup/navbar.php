<?php
/**
 * Navbar - Menu mobile e desktop (separado do header)
 * Este arquivo pode ser incluído em qualquer página que precise do menu
 */
?>

<!-- Menu Mobile (visível apenas em telas < 992px) -->
<nav class="cosmic-nav-mobile d-flex d-lg-none justify-content-center flex-wrap py-2">
    <a class="nav-link-cosmic" href="/#previsoes" title="Ir para a seção de previsões em destaque">
        <i class="bi bi-stars"></i> Previsões
    </a>
    <a class="nav-link-cosmic" href="/#signos" title="Ir para a seção Previsão dos Signos">
        <i class="bi bi-gem"></i> Signos
    </a>
    <a class="nav-link-cosmic" href="/#posts-diarios" title="Ir para o arquivo completo de posts diários">
        <i class="bi bi-calendar-week"></i> Posts Diários
    </a>
    <a class="nav-link-cosmic" href="/sobre.html" title="Conheça a história de Aurora Scorpio">
        <i class="bi bi-person"></i> Sobre
    </a>
</nav>

<!-- Menu Desktop (visível apenas em telas >= 992px) -->
<nav class="cosmic-nav d-none d-lg-block">
    <div class="container">
        <div class="cosmic-nav-main-desktop d-flex justify-content-center align-items-center gap-2 pt-2 pb-1" aria-label="Menu principal">
            <a class="nav-link-cosmic nav-link-icon-only" href="/#previsoes" title="Previsões">
                <i class="bi bi-stars" aria-hidden="true"></i>
            </a>
            <a class="nav-link-cosmic nav-link-icon-only" href="/#signos" title="Signos">
                <i class="bi bi-gem" aria-hidden="true"></i>
            </a>
            <a class="nav-link-cosmic nav-link-icon-only" href="/#posts-diarios" title="Posts Diários">
                <i class="bi bi-calendar-week" aria-hidden="true"></i>
            </a>
            <a class="nav-link-cosmic nav-link-icon-only" href="/sobre.html" title="Sobre">
                <i class="bi bi-person" aria-hidden="true"></i>
            </a>
        </div>
    </div>
</nav>

<script>
// Script simples para garantir que o menu mobile funcione em páginas internas
(function() {
    "use strict";
    document.addEventListener('DOMContentLoaded', function() {
        const mobileNav = document.querySelector('.cosmic-nav-mobile');
        if (mobileNav) {
            mobileNav.classList.add('mobile-nav-ready');
            console.log('Menu mobile carregado');
        }
    });
})();
</script>