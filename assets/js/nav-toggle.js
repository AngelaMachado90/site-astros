(function () {
  "use strict";

  var BREAKPOINT = 992;
  var MENU_ID = "cosmic-mobile-menu";
  var BUTTON_ID = "cosmic-mobile-menu-btn";
  var BACKDROP_ID = "cosmic-mobile-backdrop";

  var menuContainer = null;
  var mobileButton = null;
  var mobileBackdrop = null;
  var bodyOverflowBackup = "";

  function isMobile() {
    return window.innerWidth < BREAKPOINT;
  }

  function getMenuContainer() {
    var menu = document.querySelector(".cosmic-nav-main-desktop");

    if (!menu) {
      menu = document.querySelector("header nav ul") || document.querySelector("nav ul");
    }

    if (!menu) {
      return null;
    }

    menu.classList.add("mobile-nav-target");

    if (!menu.id) {
      menu.id = MENU_ID;
    }

    return menu;
  }

  function updateButtonState(isOpen) {
    if (!mobileButton) {
      return;
    }

    mobileButton.classList.toggle("open", !!isOpen);
    mobileButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    mobileButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    mobileButton.textContent = isOpen ? "✕" : "☰";
  }

  function createBackdrop() {
    if (mobileBackdrop) {
      return mobileBackdrop;
    }

    var existing = document.getElementById(BACKDROP_ID);
    if (existing) {
      mobileBackdrop = existing;
      return mobileBackdrop;
    }

    mobileBackdrop = document.createElement("div");
    mobileBackdrop.id = BACKDROP_ID;
    mobileBackdrop.className = "mobile-menu-backdrop";
    mobileBackdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(mobileBackdrop);

    mobileBackdrop.addEventListener("click", function () {
      closeMenu();
    });

    return mobileBackdrop;
  }

  function createMobileButton() {
    if (mobileButton) {
      return mobileButton;
    }

    var existing = document.getElementById(BUTTON_ID);
    if (existing) {
      mobileButton = existing;
      return mobileButton;
    }

    mobileButton = document.createElement("button");
    mobileButton.type = "button";
    mobileButton.id = BUTTON_ID;
    mobileButton.className = "mobile-menu-btn";
    mobileButton.setAttribute("role", "button");
    mobileButton.setAttribute("tabindex", "0");
    mobileButton.setAttribute("aria-controls", menuContainer ? menuContainer.id : MENU_ID);
    mobileButton.setAttribute("aria-expanded", "false");
    mobileButton.setAttribute("aria-label", "Abrir menu");
    mobileButton.textContent = "☰";

    document.body.appendChild(mobileButton);

    mobileButton.addEventListener("click", function () {
      toggleMenu();
    });

    mobileButton.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " " || event.code === "Space") {
        event.preventDefault();
        toggleMenu();
      }
    });

    return mobileButton;
  }

  function removeMobileButton() {
    if (mobileButton && mobileButton.parentNode) {
      mobileButton.parentNode.removeChild(mobileButton);
    }

    if (mobileBackdrop && mobileBackdrop.parentNode) {
      mobileBackdrop.parentNode.removeChild(mobileBackdrop);
    }

    mobileButton = null;
    mobileBackdrop = null;
  }

  function openMenu() {
    if (!menuContainer) {
      return;
    }

    menuContainer.classList.add("mobile-menu-ready", "mobile-menu-active");

    if (!mobileBackdrop) {
      createBackdrop();
    }

    if (mobileBackdrop) {
      mobileBackdrop.classList.add("active");
      mobileBackdrop.setAttribute("aria-hidden", "false");
    }

    if (!bodyOverflowBackup) {
      bodyOverflowBackup = document.body.style.overflow || "";
    }
    document.body.style.overflow = "hidden";

    updateButtonState(true);

    var firstLink = menuContainer.querySelector("a, button, [tabindex]:not([tabindex='-1'])");
    if (firstLink) {
      firstLink.focus();
    }
  }

  function closeMenu() {
    if (!menuContainer) {
      return;
    }

    menuContainer.classList.remove("mobile-menu-active");

    if (mobileBackdrop) {
      mobileBackdrop.classList.remove("active");
      mobileBackdrop.setAttribute("aria-hidden", "true");
    }

    document.body.style.overflow = bodyOverflowBackup;
    bodyOverflowBackup = "";

    updateButtonState(false);
  }

  function toggleMenu() {
    if (!menuContainer || !isMobile()) {
      return;
    }

    if (menuContainer.classList.contains("mobile-menu-active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleOutsideClick(event) {
    if (!isMobile() || !menuContainer || !menuContainer.classList.contains("mobile-menu-active")) {
      return;
    }

    var clickedOnButton = mobileButton && mobileButton.contains(event.target);
    var clickedInsideMenu = menuContainer.contains(event.target);
    var clickedBackdrop = mobileBackdrop && mobileBackdrop.contains(event.target);

    if (!clickedOnButton && !clickedInsideMenu && !clickedBackdrop) {
      closeMenu();
    }
  }

  function trapFocus(event) {
    if (!menuContainer || !menuContainer.classList.contains("mobile-menu-active")) {
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    var focusable = menuContainer.querySelectorAll(
      "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
    );

    if (!focusable.length) {
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeMenu();
      if (mobileButton) {
        mobileButton.focus();
      }
      return;
    }

    trapFocus(event);
  }

  function handleResize() {
    if (!menuContainer) {
      menuContainer = getMenuContainer();
      if (!menuContainer) {
        return;
      }
    }

    if (isMobile()) {
      menuContainer.classList.add("mobile-menu-ready");
      createMobileButton();
      createBackdrop();
      updateButtonState(false);
      return;
    }

    closeMenu();
    menuContainer.classList.remove("mobile-menu-ready", "mobile-menu-active");
    removeMobileButton();
  }

  function init() {
    menuContainer = getMenuContainer();
    if (!menuContainer) {
      return;
    }

    menuContainer.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleKeydown);
    window.addEventListener("resize", handleResize);

    handleResize();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

