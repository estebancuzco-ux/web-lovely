/**
 * ==========================================================================
 * Centro de Bienestar Lovelyec - Lógica JavaScript Principal
 * Vanilla JS ES6+ (Sin dependencias externas)
 * ==========================================================================
 */

// Activar clase js-enabled inmediatamente para progressive enhancement seguro
document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. AÑO ACTUALIZADO AUTOMÁTICAMENTE EN EL FOOTER
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. HEADER TRANSPAERENTE / SÓLIDO AL HACER SCROLL
  // --------------------------------------------------------------------------
  const header = document.querySelector('.header');
  const handleHeaderScroll = () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Verificación inicial

  // --------------------------------------------------------------------------
  // 3. MENÚ HAMBURGUESA ACCESIBLE PARA MÓVILES
  // --------------------------------------------------------------------------
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  const openMobileMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'true');
    menuToggle?.setAttribute('aria-label', 'Cerrar menú de navegación');
    navMenu?.classList.add('open');
    navBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menú de navegación');
    navMenu?.classList.remove('open');
    navBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  navBackdrop?.addEventListener('click', closeMobileMenu);

  // Cerrar menú al hacer clic en un enlace de navegación
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        closeMobileMenu();
      }
    });
  });

  // Cerrar menú con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (navMenu?.classList.contains('open')) {
        closeMobileMenu();
      }
      closePrivacyModal();
    }
  });

  // --------------------------------------------------------------------------
  // 4. INDICADOR DE SECCIÓN ACTIVA EN EL MENÚ SEGÚN EL SCROLL
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Activar cuando la sección esté en el centro de la pantalla
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href')?.replace('#', '');
            if (href === activeId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 5. ANIMACIONES DISCRETAS AL HACER SCROLL (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              entry.target.classList.add('reveal-visible');
              observer.unobserve(entry.target); // Animación solo una vez
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.1
        }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      // Fallback para navegadores antiguos
      revealElements.forEach((el) => {
        el.classList.add('is-visible');
        el.classList.add('reveal-visible');
      });
    }
  }

  // --------------------------------------------------------------------------
  // 6. MODAL DE AVISO DE PRIVACIDAD Y LEGAL
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('privacy-modal');
  const privacyButtons = document.querySelectorAll('.open-privacy-modal');
  const modalCloseBtn = document.querySelector('.modal-close');

  const openPrivacyModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closePrivacyModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  privacyButtons.forEach((btn) => btn.addEventListener('click', openPrivacyModal));
  modalCloseBtn?.addEventListener('click', closePrivacyModal);

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closePrivacyModal();
    }
  });

  // Log de inicio limpio
  console.log('Centro de Bienestar Lovelyec - Sitio web cargado correctamente.');
});
