/**
 * 3rd Year BSIT Portfolio Website Scripts
 * Modern Vanilla JavaScript for Theme Switching, Navigation, Project Filtering, and Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollEffects();
  initProjectFilters();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const icon = themeToggleBtn.querySelector('i');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  // Initial theme determination
  const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');
  applyTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (theme === 'light') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation & Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // Close when clicking outside of menu
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('open');
    }
  });
}

/* --------------------------------------------------------------------------
   3. Navbar Scroll Shadow & Active Link Spy
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Add shadow on scroll
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy for active navigation highlight
    let currentSection = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Project Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button styling
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Contact Form Validation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    // Name Validation
    if (!nameInput.value.trim()) {
      showError(nameInput);
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Email Validation
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput);
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Subject Validation
    if (!subjectInput.value.trim()) {
      showError(subjectInput);
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    // Message Validation
    if (!messageInput.value.trim()) {
      showError(messageInput);
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      const submitBtn = document.getElementById('form-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      // Simulate sending delay for realistic UX
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        feedback.className = 'form-feedback success';
        feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been simulated successfully. For direct contact, please reach out via email.';
        
        setTimeout(() => {
          feedback.style.display = 'none';
        }, 7000);
      }, 700);
    }
  });

  // Clear error state on input
  [
    document.getElementById('contact-name'),
    document.getElementById('contact-email'),
    document.getElementById('contact-subject'),
    document.getElementById('contact-message')
  ].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      clearError(input);
    });
  });

  function showError(input) {
    const formGroup = input.closest('.form-group');
    if (formGroup) formGroup.classList.add('has-error');
  }

  function clearError(input) {
    const formGroup = input.closest('.form-group');
    if (formGroup) formGroup.classList.remove('has-error');
  }
}
