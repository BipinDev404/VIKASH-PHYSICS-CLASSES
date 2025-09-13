// Smooth scroll, active nav, reveal on scroll, mobile nav
(function(){
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  // year
  const y = new Date().getFullYear();
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = y;

  // mobile nav toggle
  const nav = qs('.nav');
  const toggle = qs('.nav-toggle');
  if (toggle && nav){
    toggle.addEventListener('click', ()=>{
      nav.classList.toggle('open');
    });
  }

  // smooth scroll for internal links
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = qs(a.getAttribute('href'));
      if (target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        nav && nav.classList.remove('open');
      }
    });
  });

  // reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(ent => {
      if (ent.isIntersecting){
        ent.target.classList.add('visible');
        observer.unobserve(ent.target);
      }
    })
  }, {threshold: 0.15});

  qsa('.reveal').forEach(el => observer.observe(el));

  // sticky header active link
  const sections = qsa('section[id]');
  const navLinks = qsa('.nav a[href^="#"]');
  const spy = new IntersectionObserver((ents)=>{
    ents.forEach(ent =>{
      if (ent.isIntersecting){
        const id = ent.target.getAttribute('id');
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    })
  }, {threshold: 0.55});
  sections.forEach(s => spy.observe(s));
})();
