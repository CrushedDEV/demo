/* NEXIFY main.js - Core UI Interactions */

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  const [s0, s1, s2] = hamburger.querySelectorAll('span');
  if (open) {
    s0.style.transform = 'translateY(7px) rotate(45deg)';
    s1.style.opacity   = '0';
    s2.style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    s0.style.transform = s1.style.opacity = s2.style.transform = '';
  }
});
navLinks.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
  });
});

// ── Active Nav Link (Based on current URL) ──
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  link.classList.remove('active');
  const linkPath = link.getAttribute('href');
  if (linkPath === currentPath) {
    link.classList.add('active');
  }
});

// ── Scroll reveal ──
document.querySelectorAll(
  '.ideas-left, .ideas-right, .feature-card, .project-card, ' +
  '.testimonial-card, .process-step, .solutions-header, ' +
  '.tech-card, .pricing-card, .faq-item, .case-card, .video-inner'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Inject dynamic styles for Navbar ──
const style = document.createElement('style');
style.textContent = `
  #navbar.scrolled { box-shadow: 0 4px 0 rgba(245,197,24,.3); }
`;
document.head.appendChild(style);
