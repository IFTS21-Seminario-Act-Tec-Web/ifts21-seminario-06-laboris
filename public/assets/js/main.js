// ============================================================
// LABORIS — main.js
// [JOSÉ] Evolución: Validación, Limpieza de Simulaciones e Integración FastAPI
// ============================================================

"use strict";

document.getElementById('year').textContent = new Date().getFullYear();

// ─── 1. [JOSÉ - Sprint 3 - Día 3 - 17/09/2026] Lógica base: Toggle de tema y Validación en tiempo real ──
const btnToggle = document.getElementById('btnToggleTema');
const iconoTema = document.getElementById('iconoTema');

function actualizarIcono(theme) {
  if (theme === 'dark') {
    iconoTema.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    btnToggle.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    iconoTema.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
    btnToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }
}

const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
actualizarIcono(currentTheme);

btnToggle?.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme-preference', newTheme);
  actualizarIcono(newTheme);
});

const campos = ['nombre', 'email', 'celular', 'tipoConsulta', 'descripcion'];
const mensajesError = {
  nombre: 'El nombre es obligatorio y debe tener al menos 3 caracteres.',
  email: 'Ingresá un email válido (ej: nombre@dominio.com).',
  celular: 'El celular debe tener el formato 11-1234-5678.',
  tipoConsulta: 'Seleccioná un tipo de consulta.',
  descripcion: 'La descripción es obligatoria y debe tener al menos 10 caracteres.'
};

function esValido(campo) {
  const valor = campo.value.trim();
  switch (campo.id) {
    case 'nombre': return valor.length >= 3;
    case 'email': return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    case 'celular': return /^\d{2}-\d{4}-\d{4}$/.test(valor);
    case 'tipoConsulta': return valor !== '' && valor !== 'Seleccioná una opción';
    case 'descripcion': return valor.length >= 10;
    default: return true;
  }
}

function validarCampo(campo) {
  const valido = esValido(campo);
  const feedback = campo.parentElement.querySelector('.invalid-feedback');
  campo.classList.remove('is-valid', 'is-invalid');
  campo.classList.add(valido ? 'is-valid' : 'is-invalid');
  if (feedback) feedback.textContent = valido ? '' : mensajesError[campo.id];
  actualizarBotonEnviar();
  return valido;
}

function actualizarBotonEnviar() {
  const btnEnviar = document.getElementById('btnEnviarConsulta');
  const todosValidos = campos.every(id => {
    const el = document.getElementById(id);
    return el && esValido(el);
  });
  if (btnEnviar) btnEnviar.disabled = !todosValidos;
}

campos.forEach(campoId => {
  const el = document.getElementById(campoId);
  if (!el) return;
  el.addEventListener('input', () => validarCampo(el));
  el.addEventListener('blur', () => validarCampo(el));
});

document.addEventListener('DOMContentLoaded', actualizarBotonEnviar);


// ─── 2. [JOSÉ - Sprint 4 - Día 1 - 18/09/2026] Limpieza de simulaciones y preparación para API ──────────
// NOTA: Se eliminaron el objeto DEMO_EXPEDIENTES, la función setTimeout y toda la lógica de localStorage.
// El proyecto ahora se conecta a un backend real (FastAPI + MySQL).

const API_BASE_URL = 'http://localhost:8000'; // URL del servidor local de FastAPI

const siteNav = document.getElementById('siteNav');
function updateScrollState() {
  siteNav?.classList.toggle('scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

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


// ─── 3. [JOSÉ - Sprint 4 - Día 2 - 19/09/2026] Integración Backend: Fetch real a FastAPI ───────────────

// A) Consulta de Expediente (GET)
const expedienteInput = document.getElementById('expedienteInput');
const consultarBtn = document.getElementById('consultarBtn');
const consultaResultado = document.getElementById('consultaResultado');
const spinnerConsulta = document.getElementById('spinnerConsulta');
const btnTextConsulta = consultarBtn.querySelector('.la-btn-text');

consultarBtn?.addEventListener('click', async () => {
  const numero = expedienteInput.value.trim().replace(/[-\s]/g, ''); 
  
  if (!numero || numero.length < 4) {
    consultaResultado.className = 'la-consulta-resultado la-error';
    consultaResultado.textContent = 'Ingresá un número de expediente válido.';
    return;
  }

  // Activar estado de carga (UX de Zoe)
  consultaResultado.className = 'la-consulta-resultado';
  consultaResultado.style.display = 'none';
  spinnerConsulta.style.display = 'inline-block';
  btnTextConsulta.style.display = 'none';
  consultarBtn.disabled = true;

  try {
    // Petición real al endpoint de FastAPI
    const response = await fetch(`${API_BASE_URL}/api/expediente/${numero}`);
    
    if (response.status === 404) {
      consultaResultado.className = 'la-consulta-resultado la-error';
      consultaResultado.textContent = 'No encontramos un expediente con ese número. Verificá que esté bien escrito.';
    } else if (!response.ok) {
      throw new Error('Error del servidor');
    } else {
      const data = await response.json();
      consultaResultado.className = 'la-consulta-resultado la-success';
      consultaResultado.innerHTML = `<p><strong>Expte. ${numero}</strong>: ${data.estado} (${data.etapa})</p>`;
    }
  } catch (error) {
    consultaResultado.className = 'la-consulta-resultado la-error';
    consultaResultado.textContent = 'Hubo un problema en el servidor. Intentá de nuevo en unos minutos.';
  } finally {
    // Desactivar estado de carga
    spinnerConsulta.style.display = 'none';
    btnTextConsulta.style.display = 'inline';
    consultarBtn.disabled = false;
    consultaResultado.style.display = 'block';
  }
});

expedienteInput?.addEventListener('keydown', e => { if (e.key === 'Enter') consultarBtn.click(); });


// B) Formulario de Contacto (POST)
const contactForm = document.getElementById('contactForm');
const btnEnviarConsulta = document.getElementById('btnEnviarConsulta');
const spinnerEnvio = document.getElementById('spinnerEnvio');
const btnTextEnvio = btnEnviarConsulta.querySelector('.la-btn-text');
const formMessage = document.getElementById('formMessage');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Activar estado de carga (UX de Zoe)
  spinnerEnvio.style.display = 'inline-block';
  btnTextEnvio.style.display = 'none';
  btnEnviarConsulta.disabled = true;
  formMessage.textContent = '';

  const datosConsulta = {
    nombre: document.getElementById('nombre').value.trim(),
    email: document.getElementById('email').value.trim(),
    celular: document.getElementById('celular').value.trim(),
    tipo: document.getElementById('tipoConsulta').value,
    mensaje: document.getElementById('descripcion').value.trim()
  };

  try {
    // Petición real al endpoint de FastAPI
    const response = await fetch(`${API_BASE_URL}/api/contacto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosConsulta)
    });

    if (!response.ok) throw new Error('Error al enviar la consulta');

    // Éxito: Limpiar formulario y mostrar mensaje (UX de Zoe)
    formMessage.textContent = '¡Consulta enviada con éxito! Nos pondremos en contacto pronto.';
    formMessage.style.color = 'var(--la-gold)';
    contactForm.reset();
    
    // Limpiar validaciones visuales
    document.querySelectorAll('.la-input').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
    actualizarBotonEnviar();
    
  } catch (error) {
    formMessage.textContent = 'No pudimos conectar. Verificá tu conexión a internet.';
    formMessage.style.color = '#dc3545';
  } finally {
    // Desactivar estado de carga
    spinnerEnvio.style.display = 'none';
    btnTextEnvio.style.display = 'inline';
    btnEnviarConsulta.disabled = false;
    setTimeout(() => { formMessage.textContent = ''; }, 5000);
  }
});
