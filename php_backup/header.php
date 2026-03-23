<?php
/**
 * Header - Abertura do HTML e meta tags
 */
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="Aurora Scorpio" />
    <meta name="description" content="<?php echo $descricao ?? 'Aurora Scorpio - Blog de Astrologia Mística e Autoconhecimento. Explore previsões diárias, previsões semanais e conteúdos especiais em linguagem simbólica e acolhedora.'; ?>" />
    <meta name="keywords" content="astrologia, signos, previsões, horóscopo, lua, aurora scorpio" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#1b1f3b" />
    <link rel="canonical" href="<?php echo $canonical ?? 'https://astros.koddahub.com.br' . $_SERVER['REQUEST_URI']; ?>" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="<?php echo $titulo_pagina ?? 'Aurora Scorpio | Previsões Astrológicas 2026'; ?>" />
    <meta property="og:description" content="<?php echo $descricao ?? 'Horóscopo diário e previsões astrológicas dos 12 signos com linguagem prática e acolhedora.'; ?>" />
    <meta property="og:url" content="<?php echo $canonical ?? 'https://astros.koddahub.com.br' . $_SERVER['REQUEST_URI']; ?>" />
    <meta property="og:site_name" content="Aurora Scorpio" />
    <meta property="og:image" content="https://astros.koddahub.com.br/assets/img/logo_celestial.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?php echo $titulo_pagina ?? 'Aurora Scorpio | Previsões Astrológicas 2026'; ?>" />
    <meta name="twitter:description" content="<?php echo $descricao ?? 'Horóscopo diário e previsões astrológicas dos 12 signos para amor, trabalho e energia do dia.'; ?>" />
    <meta name="twitter:image" content="https://astros.koddahub.com.br/assets/img/logo_celestial.png" />
    <link rel="icon" href="/assets/img/favicon.png" type="image/png" />
    <link rel="shortcut icon" href="/assets/img/favicon.png" type="image/png" />
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L35SD7P8VS"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-L35SD7P8VS');
    </script>
    
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9709698776174284" crossorigin="anonymous"></script>
    
    <title><?php echo $titulo_pagina ?? 'Aurora Scorpio | Previsões Astrológicas 2026'; ?></title>
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Aurora Scorpio",
        "description": "Blog de Astrologia Mística e Autoconhecimento",
        "url": "https://astros.koddahub.com.br",
        "author": {
            "@type": "Person",
            "name": "Aurora Scorpio",
            "jobTitle": "Astróloga Mística",
            "description": "Astróloga e Analista Junguiana há mais de 15 anos"
        }
    }
    </script>

    <!-- Bootstrap e Fonts -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:wght@400;500;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
    
    <!-- CSS do site -->
    <link rel="stylesheet" href="/assets/css/index.css" />
    <link rel="stylesheet" href="/assets/css/index-tablet.css" />
    <link rel="stylesheet" href="/assets/css/index-desktop.css" />
    <link rel="stylesheet" href="/assets/css/index-inline.css" />
    
    <style>
        /* Correções para garantir menu mobile */
        @media (max-width: 991.98px) {
            .cosmic-nav-mobile {
                background: linear-gradient(135deg, #1b1f3b, #2a1b4a);
                padding: 12px 0;
                border-bottom: 2px solid #d4af37;
                position: sticky;
                top: 0;
                z-index: 100;
                flex-wrap: wrap;
                gap: 8px;
            }
            .cosmic-nav-mobile .nav-link-cosmic {
                color: #fff;
                background: rgba(255,255,255,0.1);
                border-radius: 30px;
                padding: 6px 14px;
                font-size: 0.85rem;
                transition: all 0.3s;
                text-decoration: none;
            }
            .cosmic-nav-mobile .nav-link-cosmic:hover {
                background: #d4af37;
                color: #1b1f3b;
                transform: translateY(-2px);
            }
            .cosmic-nav-main-desktop {
                display: none !important;
            }
        }
        @media (min-width: 992px) {
            .cosmic-nav-mobile {
                display: none !important;
            }
        }
    </style>
</head>
<body>
<div class="cosmic-bg">
    <!-- Header místico -->
    <header class="header-mistico text-center py-5">
        <div class="container position-relative" style="z-index: 2;">
            <h1 class="display-4 fw-bold text-white mb-3">A vida é feita de estrelas que escolhemos olhar</h1>
            <p class="lead text-white-50 mb-0">MISTÉRIOS DO ZODÍACO · AURORA SCORPIO</p>
            <p class="text-white-50 small">Astrologia Mística & Autoconhecimento</p>
        </div>
    </header>

    <!-- INCLUI O MENU (NAVBAR) -->
    <?php include 'navbar.php'; ?>