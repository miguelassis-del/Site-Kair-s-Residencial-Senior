document.documentElement.classList.add('js');
var WHATS = '5511995009308';
var header = document.getElementById('header');
var burger = document.getElementById('burger');
var menu = document.getElementById('menu');

// Sombra no cabeçalho ao rolar
function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
function setMenu(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
}
burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

// Animação ao rolar (com pequeno atraso entre irmãos)
var items = document.querySelectorAll('.reveal');
items.forEach(function (el) {
  var i = Array.prototype.indexOf.call(el.parentNode.children, el);
  el.style.setProperty('--d', Math.min(i, 4) * 0.08 + 's');
});
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el) { io.observe(el); });
} else {
  items.forEach(function (el) { el.classList.add('in'); });
}

// Link ativo no menu
var links = document.querySelectorAll('#menu a');
var spy = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (en.isIntersecting) {
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });

// FAQ: abre um por vez
var faqs = document.querySelectorAll('details');
faqs.forEach(function (d) {
  d.addEventListener('toggle', function () {
    if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
  });
});

// Formulário -> WhatsApp
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  var texto = 'Olá! Meu nome é ' + document.getElementById('nome').value +
    '. O cuidado é para: ' + document.getElementById('para').value + '. ' +
    (document.getElementById('msg').value || 'Gostaria de conhecer a Kairós.');
  document.getElementById('ok').textContent = 'Abrindo o WhatsApp...';
  window.open('https://wa.me/' + WHATS + '?text=' + encodeURIComponent(texto), '_blank');
});
