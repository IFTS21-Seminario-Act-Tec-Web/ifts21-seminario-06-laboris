#  Reporte de Hito 3: Sprint 3 - Lógica Frontend y Persistencia de Datos

**Proyecto:** Laboris - Estudio Jurídico Laboral (IFTS N.º 21)  
**Fecha de cierre:** 24 de septiembre de 2026  
**Responsable del reporte:** Ricardo Medina (Scrum Master)  
**Estado:** ✅ Completado - Demo realizada al Stakeholder (pendiente devolución formal)

---

## 🎯 Objetivo del Sprint 3
Evolucionar la lógica del frontend dejando atrás las simulaciones básicas (`setTimeout`) para implementar una arquitectura de comunicación realista con `async/await`, persistir datos en el navegador con `localStorage` y mejorar la experiencia de usuario con feedback visual de carga (spinners), preparando el terreno para la conexión real con FastAPI en el Sprint 4.

**Épica 3:** Lógica Frontend y Persistencia de Datos  
**Hito 3:** Entrega y Demo del 3er Entregable al Stakeholder

---

## ✅ Logros y Entregables Completados

### 1. Simulación de Backend con `async/await` (José)
- **Reemplazo de `setTimeout`:** La consulta de expediente ahora utiliza una función `async/await` (`mockFetchExpediente()`) que simula una petición real a un endpoint ficticio.
- **Latencia simulada:** Se mantiene un delay de 1.5 segundos para replicar el comportamiento de una API real.
- **Estructura de Promesa:** Preparada para ser reemplazada fácilmente por un `fetch()` real cuando el backend esté listo.
- **Manejo de errores:** Implementación de mensajes amigables para casos de expediente no encontrado (404) y errores de servidor (500).

### 2. Persistencia de Datos con `localStorage` (José)
- **Guardado de consultas:** Al enviar el formulario de contacto, los datos se almacenan en un array de objetos JSON en `localStorage`.
- **Estructura de datos:** Cada consulta incluye `id`, `fecha`, `nombre`, `email`, `celular`, `tipo` y `mensaje`.
- **Persistencia real:** Los datos sobreviven a recargas de página (F5) y al cierre completo del navegador.
- **Limpieza de formulario:** Tras el envío exitoso, el formulario se resetea y se muestra mensaje de confirmación.

### 3. Vista de Admin/Testing Oculta (José)
- **Acceso secreto:** Doble clic en el año del footer (2026) abre/cierra el panel de administración.
- **Visualización de datos:** Tabla que muestra todas las consultas guardadas en `localStorage` con ID, fecha, nombre, email, tipo y mensaje.
- **Función de limpieza:** Botón para borrar todas las consultas de prueba del `localStorage`.
- **Propósito:** Herramienta de testing para validar que la persistencia funciona correctamente.

### 4. Estados de Carga - Spinners (Zoe)
- **Spinner grande:** Para la consulta de expediente, visible en el área de resultados durante la latencia simulada.
- **Spinner integrado:** Mini-spinner dentro del botón de envío del formulario, acompañado de texto "Enviando...".
- **Diseño coherente:** Animación CSS personalizada con la paleta de Laboris (dorado `#D4AF37`).
- **Cross-theme:** Los spinners se visualizan correctamente tanto en Modo Claro como en Modo Oscuro.
- **Deshabilitación de botones:** Los botones se deshabilitan durante la carga para evitar envíos duplicados.

### 5. Gestión y Calidad (Cristina, Graciela y Ricardo)
- **Cristina (PO):** Preparación y ejecución de la demo al stakeholder con guion estructurado.
- **Graciela (QA):** Validación de persistencia, spinners, manejo de errores y pruebas cross-browser (Chrome, Firefox, Safari).
- **Ricardo (SM):** Coordinación del sprint, integración de código, despliegue en Netlify y documentación del hito.

---

## 🔗 Enlaces de Referencia
- **Sitio en Producción (Netlify):** [https://chimerical-boba-df549d.netlify.app/](https://chimerical-boba-df549d.netlify.app/)
- **Repositorio GitHub:** [IFTS21-Seminario-Act-Tec-Web/ifts21-seminario-06-laboris](https://github.com/IFTS21-Seminario-Act-Tec-Web/ifts21-seminario-06-laboris)
- **Release Sprint 2:** [v1.2.0 - Sprint 2 Complete](https://github.com/IFTS21-Seminario-Act-Tec-Web/ifts21-seminario-06-laboris/releases/tag/v1.2.0)
- **Reporte Hito 1:** [REPORTE_HITO_1_RICARDO.md](REPORTE_HITO_1_RICARDO.md)
- **Reporte Hito 2:** [REPORTE_HITO_2.md](REPORTE_HITO_2.md)

---

##  Código Implementado

### Archivos modificados:
- **`public/index.html`:** Agregada estructura de spinners en botones y sección oculta de admin view.
- **`public/assets/css/styles.css`:** Agregadas clases `.la-spinner`, `.la-spinner-sm`, animación `@keyframes la-spin` y estilos de `.la-admin-view`.
- **`public/assets/js/main.js`:** Implementadas funciones `async/await`, persistencia en `localStorage`, renderizado de tabla admin y manejo de estados de carga.

### Funcionalidades clave:
```javascript
// Simulación de fetch con async/await
async function mockFetchExpediente(numero) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return DEMO_EXPEDIENTES[numero] || null;
}

// Persistencia en localStorage
const consultas = JSON.parse(localStorage.getItem('laboris_consultas') || '[]');
consultas.push(nuevaConsulta);
localStorage.setItem('laboris_consultas', JSON.stringify(consultas));

// Acceso a vista admin (doble clic en footer)
footerYear?.addEventListener('dblclick', () => {
  adminView.style.display = isVisible ? 'none' : 'block';
});
