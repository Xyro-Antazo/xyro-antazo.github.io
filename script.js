document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollEffects();
  initProjectFilters();
  initContactForm();
});

function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const icon = themeToggleBtn.querySelector('i');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

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

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('open');
    }
  });
}

function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

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

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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

    if (!nameInput.value.trim()) {
      showError(nameInput);
      isValid = false;
    } else {
      clearError(nameInput);
    }

    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput);
      isValid = false;
    } else {
      clearError(emailInput);
    }

    if (!subjectInput.value.trim()) {
      showError(subjectInput);
      isValid = false;
    } else {
      clearError(subjectInput);
    }

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

      fetch('https://formsubmit.co/ajax/leonardoantazo821@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageInput.value.trim()
        })
      })
      .then(response => response.json())
      .then(data => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        feedback.className = 'form-feedback success';
        feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent directly to Leonardo. I will get back to you shortly!';
        feedback.style.display = 'block';

        setTimeout(() => {
          feedback.style.display = 'none';
        }, 7000);
      })
      .catch(error => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        feedback.className = 'form-feedback success';
        feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you for reaching out! You can also email directly at <a href="mailto:leonardoantazo821@gmail.com" style="color:inherit;text-decoration:underline;">leonardoantazo821@gmail.com</a>.';
        feedback.style.display = 'block';

        setTimeout(() => {
          feedback.style.display = 'none';
        }, 7000);
      });
    }
  });

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
