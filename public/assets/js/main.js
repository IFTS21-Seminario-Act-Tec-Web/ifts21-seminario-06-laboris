// ============================================================
// LABORIS — main.js
// [JOSÉ] Implementación: Toggle de tema y Validación en tiempo real
// ============================================================

"use strict";

document.getElementById('year').textContent = new Date().getFullYear();

// ─── 1. LÓGICA DEL TOGGLE DE TEMA (JOSÉ) ─────────────────────
const btnToggle = document.getElementById('btnToggleTema');
const iconoTema = document.getElementById('iconoTema');

// Función para actualizar el ícono según el tema
function actualizarIcono(theme) {
  if (theme === 'dark') {
    iconoTema.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    btnToggle.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    iconoTema.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
    btnToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }
}

// Inicializar ícono al cargar la página (el atributo data-theme ya está en el HTML por el script del head)
const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
actualizarIcono(currentTheme);

// Event listener para el botón
btnToggle?.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme-preference', newTheme);
  actualizarIcono(newTheme);
});


// ─── 2. VALIDACIÓN EN TIEMPO REAL DEL FORMULARIO (JOSÉ) ──────
const campos = ['nombre', 'email', 'celular', 'tipoConsulta', 'descripcion'];

// Mensajes de error específicos por campo
const mensajesError = {
  nombre: 'El nombre es obligatorio y debe tener al menos 3 caracteres.',
  email: 'Ingresá un email válido (ej: nombre@dominio.com).',
  celular: 'El celular debe tener el formato 11-1234-5678.',
  tipoConsulta: 'Seleccioná un tipo de consulta.',
  descripcion: 'La descripción es obligatoria y debe tener al menos 10 caracteres.'
};

// Reglas de validación por campo
function esValido(campo) {
  const valor = campo.value.trim();
  switch (campo.id) {
    case 'nombre':
      return valor.length >= 3;
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    case 'celular':
      return /^\d{2}-\d{4}-\d{4}$/.test(valor);
    case 'tipoConsulta':
      return valor !== '' && valor !== 'Seleccioná una opción';
    case 'descripcion':
      return valor.length >= 10;
    default:
      return true;
  }
}

// Valida un campo individual y actualiza clases + feedback
function validarCampo(campo) {
  const valido = esValido(campo);
  const feedback = campo.parentElement.querySelector('.invalid-feedback');
  
  campo.classList.remove('is-valid', 'is-invalid');
  campo.classList.add(valido ? 'is-valid' : 'is-invalid');
  
  if (feedback) {
    feedback.textContent = valido ? '' : mensajesError[campo.id];
  }
  
  actualizarBotonEnviar();
  return valido;
}

// Revisa todos los campos y habilita/deshabilita el botón de envío
function actualizarBotonEnviar() {
  const btnEnviar = document.getElementById('btnEnviarConsulta');
  const todosValidos = campos.every(id => {
    const el = document.getElementById(id);
    return el && esValido(el);
  });
  
  if (btnEnviar) {
    btnEnviar.disabled = !todosValidos;
  }
}

// Listeners en cada campo para validación en tiempo real (input y blur)
campos.forEach(campoId => {
  const el = document.getElementById(campoId);
  if (!el) return;
  
  el.addEventListener('input', () => validarCampo(el));
  el.addEventListener('blur', () => validarCampo(el));
});

// Estado inicial: botón deshabilitado hasta que se complete el form
document.addEventListener('DOMContentLoaded', actualizarBotonEnviar);


// ─── 3. FUNCIONALIDAD EXISTENTE (Navbar, Scroll, Expediente) ─
const siteNav = document.getElementById('siteNav');
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

// Simulación de Consulta de Expediente (Se mantiene para el Sprint 3)
const expedienteInput = document.getElementById('expedienteInput');
const consultarBtn = document.getElementById('consultarBtn');
const consultaResultado = document.getElementById('consultaResultado');

const DEMO_EXPEDIENTES = {
  '12345/2026': { estado: 'EN TRÁMITE', etapa: 'Audiencia preliminar', ultima: 'Notificación enviada.', fecha: '18/08/2026' },
  '98765/2025': { estado: 'SENTENCIA FAVORABLE', etapa: 'Ejecución', ultima: 'Pago ordenado.', fecha: '10/08/2026' }
};

consultarBtn?.addEventListener('click', () => {
  const numero = expedienteInput.value.trim();
  if (!numero || numero.length < 4) {
    consultaResultado.className = 'la-consulta-resultado la-error';
    consultaResultado.textContent = 'Ingresá un número de expediente válido.';
    return;
  }
  consultaResultado.className = 'la-consulta-resultado';
  consultaResultado.innerHTML = '<p style="color:var(--la-text-secondary); font-size:14px">Consultando...</p>';
  
  setTimeout(() => {
    const data = DEMO_EXPEDIENTES[numero];
    if (data) {
      consultaResultado.className = 'la-consulta-resultado la-success';
      consultaResultado.innerHTML = `<p><strong>Expte. ${numero}</strong>: ${data.estado} (${data.etapa})</p>`;
    } else {
      consultaResultado.className = 'la-consulta-resultado la-error';
      consultaResultado.textContent = 'No se encontró el expediente.';
    }
  }, 700);
});

expedienteInput?.addEventListener('keydown', e => { if (e.key === 'Enter') consultarBtn.click(); });
