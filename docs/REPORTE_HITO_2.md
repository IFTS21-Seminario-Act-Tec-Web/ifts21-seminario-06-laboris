# 📊 Reporte de Hito 2: Sprint 2 - UX y Estética Avanzada

**Proyecto:** Laboris - Estudio Jurídico Laboral (IFTS N.º 21)  
**Fecha de cierre:** 14 de septiembre de 2026  
**Responsable del reporte:** Ricardo Medina (Scrum Master)  
**Estado:** ✅ Completado y Aprobado por el Stakeholder

---

##  Objetivo del Sprint 2
Mejorar la interacción del usuario y la adaptabilidad visual de la aplicación, eliminando la deuda técnica detectada en el Sprint 1.  
**Foco principal:** Variables CSS, Modo Oscuro (Dark Mode) y Validación Visual en tiempo real.

---

## ✅ Logros y Entregables Completados

### 1. Experiencia de Usuario (UX) y Diseño (Zoe)
- **Modo Oscuro (Dark Mode):** Implementación completa con toggle en el Navbar. Se ajustó la paleta de colores (Borgoña `#A83040` y Dorado `#D4AF37`) para garantizar contraste WCAG AA y evitar vibración visual sobre fondos oscuros (`#121214`).
- **Escala Tipográfica:** Corrección de todos los textos que estaban por debajo de los 12px. El cuerpo de texto ahora tiene un mínimo de 14px, mejorando drásticamente la legibilidad.
- **Estados Visuales del Formulario:** Diseño e implementación de estados de *Focus* (borde dorado), *Éxito* (borde verde + check) y *Error* (borde rojo + mensaje descriptivo).

### 2. Desarrollo Frontend (José)
- **Persistencia de Preferencias:** El tema seleccionado (Claro/Oscuro) se guarda en `localStorage` y persiste al recargar la página, con un script anti-flash en el `<head>`.
- **Validación en Tiempo Real:** Implementación de eventos `input` y `blur` en el formulario de contacto, aplicando dinámicamente las clases de Bootstrap `.is-valid` e `.is-invalid`.
- **Corrección de Defectos del Sprint 1:** 
  - Cambio de label "Teléfono" a "Celular" con placeholder `11-XXXX-XXXX` y texto de ayuda.
  - Eliminación del badge de Netlify del footer.
  - Centrado vertical y aumento de tamaño de fuente en botones.
  - Los botones "Consultar" de las Áreas de Práctica ahora redirigen a `#contacto`.

### 3. Gestión y Calidad (Cristina, Graciela y Ricardo)
- **Cristina (PO):** Validación de criterios de aceptación y aprobación formal del stakeholder (bufete de abogados).
- **Graciela (QA):** Auditoría cross-browser (Chrome, Firefox, Safari) y validación de accesibilidad.
- **Ricardo (SM):** Coordinación del flujo de trabajo con Git (Forks, Ramas y Pull Requests), configuración de CI/CD en Netlify y documentación del Release.

---

##  Enlaces de Referencia
- **Sitio en Producción (Netlify):** https://chimerical-boba-df549d.netlify.app/
- **GitHub Release Oficial:** [v1.2.0 - Sprint 2 Complete](https://github.com/IFTS21-Seminario-Act-Tec-Web/ifts21-seminario-06-laboris/releases/tag/v1.2.0)
- **Tablero de Trello:** [Pegar aquí el link del tablero]

---

## 🚀 Próximos Pasos: Sprint 3
El foco del siguiente sprint será la **Lógica Frontend y Persistencia de Datos**:
1. Reemplazar las simulaciones con `setTimeout` por funciones `async/await` que simulen peticiones `fetch()`.
2. Implementar `localStorage` para persistir los datos enviados en el formulario de contacto.
3. Crear una vista de administración/testing para visualizar los datos guardados.
4. Diseñar e implementar estados de carga (Spinners / Skeleton loaders) durante las peticiones simuladas.

---
*Documento generado como parte de la evaluación continua del Seminario de Actualización en Tecnología Web.*
