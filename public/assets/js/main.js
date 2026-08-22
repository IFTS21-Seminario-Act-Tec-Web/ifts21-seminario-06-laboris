// ============================================================
// LABORIS — main.js
//
//   1. Año dinámico
//   2. Navbar: transparente → oscuro al scrollear
//   3. Botón "volver arriba"
//   4. Sección activa (IntersectionObserver)
//   5. CONSULTA DE EXPEDIENTE — funcionalidad clave del modelo
//   6. Formulario de contacto
// ============================================================

"use strict";

document.getElementById('year').textContent = new Date().getFullYear();

const siteNav   = document.getElementById('siteNav');
const backToTop = document.getElementById('backToTop');

function updateScrollState() {
  siteNav?.classList.toggle('scrolled', window.scrollY > 30);
  backToTop?.classList.toggle('visible', window.scrollY > 450);
}
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// IntersectionObserver — sección activa
const navLinks = document.querySelectorAll('.la-nav-link[data-section]');
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector(`.la-nav-link[data-section="${entry.target.id}"]`)?.classList.add('active');
    }
  });
}, { root: null, rootMargin: '-25% 0px -65% 0px', threshold: 0 });

sections.forEach(s => observer.observe(s));


// ─── CONSULTA DE EXPEDIENTE ───────────────────────────────────
//
// El usuario ingresa su número de expediente judicial.
// El JS devuelve un estado simulado.
//
// PRÓXIMO PASO (etapa backend):
//   const res = await fetch(`/api/expediente/${numero}`);
//   const data = await res.json();
//
// El endpoint FastAPI en src/routes/contact.py devolverá:
// { numero, estado, etapa, ultima_actuacion, fecha }

const expedienteInput   = document.getElementById('expedienteInput');
const consultarBtn      = document.getElementById('consultarBtn');
const consultaResultado = document.getElementById('consultaResultado');

const DEMO_EXPEDIENTES = {
  '12345/2026': {
    estado: 'EN TRÁMITE',
    etapa:  'Audiencia preliminar',
    ultima: 'Notificación de fecha de audiencia enviada al empleador.',
    fecha:  '18/08/2026',
  },
  '98765/2025': {
    estado: 'SENTENCIA FAVORABLE',
    etapa:  'Ejecución de sentencia',
    ultima: 'El juez ordenó el pago de la indemnización. Aguardamos cumplimiento del empleador.',
    fecha:  '10/08/2026',
  },
  '11111/2024': {
    estado: 'CONCILIACIÓN ACORDADA',
    etapa:  'Homologación',
    ultima: 'Acuerdo firmado en el SECLO. En proceso de homologación judicial.',
    fecha:  '05/08/2026',
  },
};

function renderResultado(numero, data) {
  consultaResultado.className = 'la-consulta-resultado la-success';
  consultaResultado.innerHTML = `
    <span class="la-estado-badge">${data.estado}</span>
    <p style="font-size:13px; margin:0 0 6px; color:var(--la-white)">
      <strong>Expte. ${numero}</strong> · Etapa: ${data.etapa}
    </p>
    <p style="font-size:12px; margin:0 0 6px; color:rgba(255,255,255,.65)">${data.ultima}</p>
    <p style="font-size:10px; margin:0; color:rgba(255,255,255,.4)">Última actualización: ${data.fecha}</p>
  `;
}

function renderError(msg) {
  consultaResultado.className = 'la-consulta-resultado la-error';
  consultaResultado.textContent = msg;
}

consultarBtn?.addEventListener('click', () => {
  const numero = expedienteInput.value.trim();

  if (!numero || numero.length < 4) {
    renderError('Ingresá un número de expediente válido (ej: 12345/2026).');
    return;
  }

  consultaResultado.className = 'la-consulta-resultado';
  consultaResultado.innerHTML = '<p style="color:rgba(255,255,255,.45); font-size:12px">Consultando el sistema judicial...</p>';

  setTimeout(() => {
    const data = DEMO_EXPEDIENTES[numero];
    if (data) {
      renderResultado(numero, data);
    } else {
      renderResultado(numero, {
        estado: 'EN TRÁMITE',
        etapa:  'Instrucción del expediente',
        ultima: 'Demo — en la etapa backend este resultado vendrá de FastAPI. Tu expediente fue localizado en el sistema.',
        fecha:  new Date().toLocaleDateString('es-AR'),
      });
    }
  }, 700);
});

expedienteInput?.addEventListener('keydown', e => { if (e.key === 'Enter') consultarBtn.click(); });


// ─── FORMULARIO DE CONTACTO ───────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formMessage  = document.getElementById('formMessage');

contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
  formMessage.textContent = '✓ Consulta recibida. Te respondemos a la brevedad. Primera consulta sin cargo.';
  contactForm.reset();
});
