// ============================================================
// LABORIS — main.js
// ============================================================

"use strict";

// 1. Año dinámico
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

// 2. Sección activa (IntersectionObserver)
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


// ── CONSULTA DE EXPEDIENTE ───────────────────────────────────
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


// ── FORMULARIO DE CONTACTO ───────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formMessage  = document.getElementById('formMessage');

contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
  formMessage.textContent = '✓ Consulta recibida. Te respondemos a la brevedad. Primera consulta sin cargo.';
  contactForm.reset();
});


// ============================================================
// ACCIÓN 2: LÓGICA DE GESTIÓN DE CLIENTES (SPRINT 1)
// ============================================================
let clientes = [];

const formCliente = document.getElementById('formCliente');
const msgCliente = document.getElementById('msgCliente');
const tablaClientes = document.getElementById('tablaClientes');
const contadorClientes = document.getElementById('contadorClientes');

function renderizarClientes() {
  contadorClientes.textContent = clientes.length;
  
  if (clientes.length === 0) {
    tablaClientes.innerHTML = '<tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">No hay clientes registrados aún.</td></tr>';
    return;
  }

  tablaClientes.innerHTML = clientes.map(c => `
    <tr>
      <td style="padding: 0.75rem; border-bottom: 1px solid #eee;">${c.nombre}</td>
      <td style="padding: 0.75rem; border-bottom: 1px solid #eee;">${c.dni}</td>
      <td style="padding: 0.75rem; border-bottom: 1px solid #eee;">${c.telefono}</td>
      <td style="padding: 0.75rem; border-bottom: 1px solid #eee;">${c.email}</td>
    </tr>
  `).join('');
}

formCliente?.addEventListener('submit', event => {
  event.preventDefault();
  msgCliente.textContent = '';
  msgCliente.style.color = '';

  const nombre = document.getElementById('cliNombre').value.trim();
  const dni = document.getElementById('cliDni').value.trim();
  const telefono = document.getElementById('cliTel').value.trim();
  const email = document.getElementById('cliEmail').value.trim();

  // Validaciones (Criterios de aceptación de Cristina)
  if (!nombre) return mostrarError('El nombre es obligatorio.');
  if (!/^\d{8}$/.test(dni)) return mostrarError('El DNI debe tener exactamente 8 dígitos numéricos.');
  if (!/^11-\d{4}-\d{4}$/.test(telefono)) return mostrarError('El teléfono debe tener formato 11-XXXX-XXXX.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return mostrarError('Ingresá un email válido.');

  if (clientes.some(c => c.dni === dni)) {
    return mostrarError('Ya existe un cliente con ese DNI.');
  }

  clientes.push({ nombre, dni, telefono, email });
  renderizarClientes();
  
  msgCliente.textContent = '✓ Cliente agregado correctamente.';
  msgCliente.style.color = 'green';
  formCliente.reset();
});

function mostrarError(msg) {
  msgCliente.textContent = `⚠ ${msg}`;
  msgCliente.style.color = 'red';
}

renderizarClientes();
// FIN ACCIÓN 2
