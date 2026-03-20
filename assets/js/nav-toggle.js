(function () {
  "use strict";

  var STYLE_ID = "aurora-nav-toggle-style";
  var MOBILE_MEDIA = "(max-width: 991.98px)";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "@media (max-width: 991.98px) {",
      "  .cosmic-nav { padding: 8px 0; }",
      "  .cosmic-nav .container { display: block !important; }",
      "  .cosmic-nav-toggle-wrap { display: flex; justify-content: flex-end; padding: 2px 0 6px; }",
      "  .cosmic-nav-toggle {",
      "    display: inline-flex; align-items: center; gap: 0.5rem;",
      "    border: 1px solid rgba(212, 175, 55, 0.5); border-radius: 999px;",
      "    color: var(--soft-gold, #ffc107); background: rgba(15, 23, 42, 0.32);",
      "    padding: 0.35rem 0.85rem; font-size: 0.88rem; font-weight: 600;",
      "  }",
      "  .cosmic-nav-toggle:hover {",
      "    color: var(--moon-white, #f5f5f7); border-color: var(--soft-gold, #ffc107);",
      "    background: rgba(111, 66, 193, 0.35);",
      "  }",
      "  .cosmic-nav-toggle:focus-visible {",
      "    outline: 2px solid var(--soft-gold, #ffc107); outline-offset: 2px;",
      "  }",
      "  .cosmic-nav-toggle i { font-size: 1rem; line-height: 1; }",
      "  .cosmic-nav-collapse {",
      "    border-top: 1px solid rgba(212, 175, 55, 0.25); margin-top: 0.25rem; padding-top: 0.3rem;",
      "  }",
      "  .cosmic-nav-collapse .nav-link-cosmic {",
      "    display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start;",
      "    width: 100%; margin: 0.15rem 0; padding: 0.6rem 0.75rem; border-radius: 0.6rem;",
      "  }",
      "  .cosmic-nav-collapse .nav-link-cosmic::after { display: none !important; }",
      "  .cosmic-nav-collapse .nav-link-cosmic i { width: 1.05rem; text-align: center; }",
      "  .post-content .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; }",
      "  .post-content .aspectos-table { min-width: 620px; }",
      "}",
      "@media (min-width: 992px) {",
      "  .cosmic-nav-toggle-wrap { display: none !important; }",
      "  .cosmic-nav-collapse { display: flex !important; visibility: visible !important; }",
      "}",
    ].join("\n");

    document.head.appendChild(style);
  }

  function isMobileViewport() {
    return window.matchMedia(MOBILE_MEDIA).matches;
  }

  function updateToggleVisual(button, expanded) {
    if (!button) {
      return;
    }

    var icon = button.querySelector("i");
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    button.setAttribute(
      "aria-label",
      expanded ? "Fechar menu de navegacao" : "Abrir menu de navegacao",
    );

    if (icon) {
      icon.className = expanded ? "bi bi-x-lg" : "bi bi-list";
    }
  }

  function findOrCreateMenuWrapper(container) {
    var wrappedMenu = Array.from(container.children).find(function (child) {
      return (
        child &&
        child.querySelectorAll &&
        child.querySelectorAll(".nav-link-cosmic").length > 0
      );
    });

    if (wrappedMenu) {
      return wrappedMenu;
    }

    var links = Array.from(container.children).filter(function (child) {
      return child.classList && child.classList.contains("nav-link-cosmic");
    });
    if (!links.length) {
      return null;
    }

    var menu = document.createElement("div");
    Array.from(container.classList)
      .filter(function (className) {
        return className !== "container";
      })
      .forEach(function (className) {
        menu.classList.add(className);
      });

    container.className = "container";

    links.forEach(function (link) {
      menu.appendChild(link);
    });

    container.appendChild(menu);
    return menu;
  }

  function initCosmicNav(nav, index) {
    if (!nav || nav.dataset.toggleReady === "1") {
      return;
    }

    if (nav.querySelector(".cosmic-nav-mobile") || nav.querySelector(".cosmic-nav-main-desktop")) {
      nav.dataset.toggleReady = "1";
      return;
    }

    var container = Array.from(nav.children).find(function (child) {
      return child.classList && child.classList.contains("container");
    }) || nav.querySelector(".container");

    if (!container) {
      return;
    }

    var menu = findOrCreateMenuWrapper(container);
    if (!menu) {
      return;
    }

    var links = menu.querySelectorAll(".nav-link-cosmic");
    if (links.length < 2) {
      return;
    }

    var collapseId = menu.id || "cosmic-nav-collapse-" + String(index + 1);
    menu.id = collapseId;
    menu.classList.add(
      "collapse",
      "cosmic-nav-collapse",
      "d-lg-flex",
      "justify-content-center",
      "align-items-center",
      "gap-2",
      "py-2",
    );

    if (container.querySelector(".cosmic-nav-toggle-wrap")) {
      nav.dataset.toggleReady = "1";
      return;
    }

    var toggleWrap = document.createElement("div");
    toggleWrap.className = "cosmic-nav-toggle-wrap d-lg-none";
    toggleWrap.innerHTML =
      '<button type="button" class="cosmic-nav-toggle" aria-controls="' +
      collapseId +
      '" aria-expanded="false" aria-label="Abrir menu de navegacao">' +
      '<i class="bi bi-list" aria-hidden="true"></i>' +
      "<span>Menu</span>" +
      "</button>";

    container.insertBefore(toggleWrap, menu);

    var toggleButton = toggleWrap.querySelector("button");
    var collapseApi = null;

    if (window.bootstrap && typeof window.bootstrap.Collapse === "function") {
      collapseApi = new window.bootstrap.Collapse(menu, { toggle: false });

      menu.addEventListener("shown.bs.collapse", function () {
        updateToggleVisual(toggleButton, true);
      });

      menu.addEventListener("hidden.bs.collapse", function () {
        updateToggleVisual(toggleButton, false);
      });

      toggleButton.addEventListener("click", function () {
        if (menu.classList.contains("show")) {
          collapseApi.hide();
        } else {
          collapseApi.show();
        }
      });

      links.forEach(function (link) {
        link.addEventListener("click", function () {
          if (isMobileViewport()) {
            collapseApi.hide();
          }
        });
      });
    } else {
      toggleButton.addEventListener("click", function () {
        var expanded = menu.classList.toggle("show");
        updateToggleVisual(toggleButton, expanded);
      });

      links.forEach(function (link) {
        link.addEventListener("click", function () {
          if (isMobileViewport()) {
            menu.classList.remove("show");
            updateToggleVisual(toggleButton, false);
          }
        });
      });
    }

    window.addEventListener("resize", function () {
      if (!isMobileViewport()) {
        menu.classList.remove("show");
        updateToggleVisual(toggleButton, false);
      }
    });

    nav.dataset.toggleReady = "1";
  }

  function bootstrapCosmicNavs() {
    injectStyles();

    var navs = document.querySelectorAll("nav.cosmic-nav");
    navs.forEach(function (nav, index) {
      initCosmicNav(nav, index);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrapCosmicNavs);
  } else {
    bootstrapCosmicNavs();
  }
})();
