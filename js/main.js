// Navigation mobile
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) toggle.addEventListener('click', () => links.classList.toggle('open'));

// Révélation au scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// Filet de sécurité : tout révéler si l'observer n'a pas pu se déclencher
window.addEventListener('load', () => {
  setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) el.classList.add('in');
  }), 300);
});

// Marquer le lien actif selon la page
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === path) a.classList.add('active');
});

// Formulaire de contact (démo : pas d'envoi réel sans backend)
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.querySelector('#form-note');
    note.textContent = 'Message prêt — connectez un service (Formspree, EmailJS) ou votre back-end pour l\'envoi réel.';
    note.style.color = 'var(--warn)';
  });
}
