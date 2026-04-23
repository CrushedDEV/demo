/* NEXIFY main.js */

// ── Animate impact panel on scroll ──
function animateCount(el, target, duration) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.round(p * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const panel = document.getElementById('impact-panel');
if (panel) {
  const panelObs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    // Animate bars
    panel.querySelectorAll('.impact-bar-fill').forEach((bar, i) => {
      const w = bar.getAttribute('data-value') + '%';
      setTimeout(() => { bar.style.width = w; }, i * 150);
    });
    // Animate mini-card counters
    panel.querySelectorAll('.mini-card-num').forEach((el, i) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      setTimeout(() => animateCount(el, target, 1400), i * 200 + 300);
    });
    panelObs.disconnect();
  }, { threshold: 0.3 });
  panelObs.observe(panel);
}

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger ──
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

// ── Active nav on scroll ──
const sections = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav-link');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      allLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.35 }).observe && sections.forEach(s =>
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      allLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${s.id}"]`);
      if (a) a.classList.add('active');
    }
  }, { threshold: 0.35 }).observe(s)
);

// ── Scroll reveal ──
document.querySelectorAll(
  '.ideas-left, .ideas-right, .feature-card, .project-card, ' +
  '.testimonial-card, .process-step, .solutions-header'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
});

new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  .observe && document.querySelectorAll('.reveal').forEach(el =>
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) entries[0].target.classList.add('visible');
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }).observe(el)
  );

// ── Counter animation ──
const counterEl = document.getElementById('counter-num');
if (counterEl) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      let start = null;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1600, 1);
        counterEl.textContent = Math.round(p * 170);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      entries[0].target._obs.disconnect();
    }
  }, { threshold: 0.5 }).observe(counterEl);
  // store ref
  counterEl._obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      let start = null;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1600, 1);
        counterEl.textContent = Math.round(p * 170);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterEl._obs.disconnect();
    }
  }, { threshold: 0.5 });
  counterEl._obs.observe(counterEl);
}

// ── Ticker duplicate for seamless loop ──
const track = document.querySelector('.ticker-track');
if (track) {
  // already duplicated in HTML for seamless loop
}

// ── Retro cursor blink style ──
const style = document.createElement('style');
style.textContent = `
  #navbar.scrolled { box-shadow: 0 4px 0 rgba(245,197,24,.3); }
  .process-section { background: var(--g2,#e8e4d9); padding: 100px 24px; border-top: 3px solid var(--dk,#0b0b0f); border-bottom: 3px solid var(--dk,#0b0b0f); }
  .process-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; margin-top: 48px; }
  .process-step { background: #fff; border: 3px solid var(--dk,#0b0b0f); border-radius: 20px; padding: 32px 24px; box-shadow: 5px 5px 0 var(--dk,#0b0b0f); transition: all .2s; }
  .process-step:hover { transform: translate(-3px,-3px); box-shadow: 8px 8px 0 var(--dk,#0b0b0f); }
  .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 3rem; color: var(--y,#f5c518); line-height: 1; margin-bottom: 12px; -webkit-text-stroke: 2px var(--dk,#0b0b0f); }
  .process-step h3 { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; letter-spacing: .04em; color: var(--dk,#0b0b0f); margin-bottom: 10px; }
  .process-step p { font-size: .875rem; color: var(--g4,#555); line-height: 1.65; }
  .hero-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .pill { font-family: 'Space Mono', monospace; font-size: .78rem; font-weight: 700; color: rgba(0,0,0,.65); background: rgba(0,0,0,.08); padding: 6px 14px; border-radius: 100px; border: 2px solid rgba(0,0,0,.15); }
  @media(max-width:768px){ .process-grid{ grid-template-columns:repeat(2,1fr); } }
  @media(max-width:480px){ .process-grid{ grid-template-columns:1fr; } }
`;
document.head.appendChild(style);
