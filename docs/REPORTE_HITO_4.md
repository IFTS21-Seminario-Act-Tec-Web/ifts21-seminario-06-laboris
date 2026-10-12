# REPORTE DE HITO 4 — Sprint Final: Backend Real, Producción y Entrega de Activos

**Proyecto:** Laboris — Estudio Jurídico Laboral  
**Institución:** IFTS N° 21 — Seminario de Actualización en Tecnología Web  
**Sprint:** 4 (Sprint Final)  
**Fecha de cierre:** 12 de octubre de 2026  
**Responsable del reporte:** Ricardo Medina (Scrum Master)  
**Estado:** ✅ APROBADO POR EL STAKEHOLDER

---

## 1. Objetivo del Hito

Transicionar el proyecto desde un entorno de simulación (localStorage / mocks) a una **arquitectura de producción real** compuesta por:

- **Frontend:** HTML5 + CSS3 + Bootstrap 5 + JavaScript Vanilla
- **Backend:** FastAPI (Python) servido vía `uvicorn`
- **Base de datos:** MySQL (entorno local con XAMPP + entorno remoto en la nube)
- **Persistencia real:** Reemplazo definitivo de `localStorage` por peticiones `fetch()` a endpoints reales

Adicionalmente, cumplir con el **requerimiento especial del cliente**: entrega de la base de datos exportada en formato `.sql` compatible con MySQL Workbench, para que el bufete pueda operar de forma independiente en su infraestructura local.

---

## 2. Entregables del Sprint 4

| # | Entregable | Responsable | Estado |
|---|-----------|-------------|--------|
| 1 | Servidor FastAPI (`main.py`) con endpoints `GET /api/expediente/{numero}` y `POST /api/contacto` | José (Dev) | ✅ Completado |
| 2 | Esquema `laboris_db` creado en MySQL Workbench con tablas `clientes`, `expedientes` y `consultas` | José (Dev) | ✅ Completado |
| 3 | Refactorización de `main.js`: eliminación de mocks y `localStorage`, implementación de `fetch()` real | José (Dev) | ✅ Completado |
| 4 | Diseño e implementación de estados de error HTTP (404, 500, Network Error) | Zoe (UX/UI) | ✅ Completado |
| 5 | Ajuste de UI para entorno de producción (latencia, spinners, responsive) | Zoe (UX/UI) | ✅ Completado |
| 6 | Plan de testing de integración (Frontend ↔ Backend ↔ BD) | Graciela (QA) | ✅ Completado |
| 7 | Archivo `laboris_db_dump.sql` + instructivo de importación para el cliente | Ricardo (SM) | ✅ Completado |
| 8 | Aprobación formal del stakeholder y cierre del proyecto | Cristina (PO) | ✅ Completado |

┌─────────────────────────────────────────────────────────────┐
│ FRONTEND │
│ index.html · style.css · script.js · Bootstrap 5 │
└──────────────────────┬──────────────────────────────────────┘
│ fetch() real (HTTP)
▼
─────────────────────────────────────────────────────────────┐
│ BACKEND │
│ FastAPI (main.py) · Pydantic · CORS · .env │
└──────────────────────┬──────────────────────────────────────┘
│ pymysql / mysql-connector
▼
─────────────────────────────────────────────────────────────┐
│ BASE DE DATOS │
│ MySQL Workbench (local XAMPP) ↔ MySQL en la nube │
│ Tablas: clientes · expedientes · consultas │
└─────────────────────────────────────────────────────────────┘
│
▼ (exportación)
┌─────────────────────────────────────────────────────────────┐
│ ENTREGABLE AL CLIENTE │
│ laboris_db_dump.sql + Instructivo PDF de importación │
└─────────────────────────────────────────────────────────────┘


---

## 4. Intervenciones por Integrante

### 👨‍ José (Developer)
- Configuración del servidor FastAPI con `uvicorn main:app --reload`.
- Creación de la estructura de carpetas `public/` y `src/routes/`.
- Implementación de los endpoints `GET` y `POST` con validación Pydantic.
- Conexión a MySQL mediante variables de entorno (`.env`).
- Refactorización completa de `script.js`: eliminación de `DEMO_EXPEDIENTES`, `mockFetchExpediente` y `localStorage`.
- Integración de `fetch()` real apuntando a `http://localhost:8000/api/...`

### 👩‍🎨 Zoe (UX/UI)
- Diseño de estados visuales para errores HTTP 404, 500 y Network Error.
- Ajuste del mensaje de éxito del formulario de contacto para entorno real.
- Revisión y adaptación del CSS del panel de administración oculto para manejar datos reales (textos largos, fechas, responsive).
- Validación de que los spinners de carga funcionen correctamente con requests reales (local y nube).
- Implementación de la imagen de fondo de la portada (`justicia.png`) con overlay profesional.

### 👩‍🔬 Graciela (QA Tester)
- Definición de casos de prueba de integración (envío de formulario → verificación en BD).
- Testing de endpoints forzando respuestas 404 y 500.
- Validación de la importación del `laboris_db_dump.sql` en un entorno limpio de MySQL Workbench.
- Verificación de que no existan credenciales expuestas en el código (`.env` en `.gitignore`).
- Firma de aprobación final: *"Aprobado para Demo Final al Stakeholder"*.

### ‍💼 Ricardo Medina (Scrum Master / Dev)
- Organización de la minuta presencial de transición al Sprint 4.
- Gestión del requerimiento de último momento del cliente (exportación de BD).
- Generación y prueba del archivo `laboris_db_dump.sql`.
- Redacción del instructivo de importación para el cliente.
- Configuración de seguridad: `.gitignore`, `.env.example`, variables de entorno.
- Coordinación del equipo y seguimiento de tareas en Trello.

### ‍💼 Cristina (Product Owner)
- Aprobación formal del Sprint 3 y autorización para avanzar al Sprint 4.
- Validación de criterios de aceptación finales.
- Conducción de la Demo Final ante el stakeholder.
- Obtención de la aprobación formal del cliente y cierre oficial del proyecto.
- Entrega del paquete final al cliente (repo + `.sql` + instructivo).

---

## 5. Criterios de Aceptación Cumplidos

- [x] El servidor FastAPI levanta correctamente y sirve el frontend.
- [x] El esquema `laboris_db` existe en MySQL con las 3 tablas y sus relaciones.
- [x] La consulta de expediente `12345/2026` devuelve datos reales desde la BD.
- [x] La consulta de un expediente inexistente devuelve HTTP 404 con mensaje de UI adecuado.
- [x] El envío del formulario de contacto persiste el dato en la tabla `consultas`.
- [x] No quedan rastros de simulaciones (`DEMO_EXPEDIENTES`, `setTimeout`, `localStorage`).
- [x] El archivo `.env` está configurado y no hay credenciales expuestas en GitHub.
- [x] El archivo `laboris_db_dump.sql` se importa sin errores en MySQL Workbench 8.0+.
- [x] El cliente recibió y aprobó formalmente el entregable final.

---

## 6. Feedback del Stakeholder

> *"Destacaron la profesionalidad de los spinners, les encantó el panel de administración y confirmaron que vamos por muy buen camino. Nos dieron la aprobación formal para avanzar."*  
> — Cristina (PO), reunión de cierre del Sprint 3.

> *"El cliente aprobó formalmente el entregable final y expresó su total satisfacción con la funcionalidad del programa. Les encantó poder llevarse el archivo `.sql` y el instructivo para tener el control total de su información en su MySQL Workbench local."*  
> — Cristina (PO), reunión de cierre del Sprint 4.

---

## 7. Lecciones Aprendidas (Retrospectiva)

1. **Lo que funcionó bien:**
   - La división clara de roles (Dev, UX, QA, SM, PO) permitió un flujo de trabajo ordenado.
   - El uso de Trello para centralizar tareas y dependencias fue clave.
   - La documentación de cada Sprint con comentarios en el código facilitó la trazabilidad.

2. **Lo que podemos mejorar:**
   - Anticipar requerimientos "estándar" del cliente (como la exportación de BD) desde el Sprint 1.
   - Establecer desde el inicio la estrategia de despliegue (local vs. nube) para evitar refactorizaciones.

3. **Acciones para futuros proyectos:**
   - Incluir un checklist de "entregables típicos de cliente corporativo" en la fase de planificación.
   - Definir el entorno de producción antes del Sprint 2.

---

## 8. Evidencias

- 📂 **Carpeta de documentación:** `/docs/` (REPORTE_HITO_1.md, REPORTE_HITO_2.md, REPORTE_HITO_3.md, REPORTE_HITO_4.md)
- 💻 **Repositorio GitHub:** [IFTS21-Seminario-Act-Tec-Web/ifts21-seminario-06-laboris](https://github.com/IFTS21-Seminario-Act-Tec-Web/ifts21-seminario-06-laboris)
- 🗄️ **Archivo de exportación:** `laboris_db_dump.sql` (entregado al cliente)
- 📋 **Tablero Trello:** Sprint 4 completado, todas las tarjetas en "Done"

---

## 9. Cierre

Con la aprobación formal del stakeholder y la entrega del paquete final (código fuente + base de datos exportada + instructivo), el **Proyecto Laboris se considera oficialmente cerrado**.

El equipo cumplió con todos los objetivos pedagógicos del Seminario de Actualización en Tecnología Web del IFTS N° 21, demostrando competencias en:

- Desarrollo frontend con HTML, CSS, Bootstrap y JavaScript.
- Implementación de backend con FastAPI.
- Gestión de base de datos MySQL (local y nube).
- Metodologías ágiles (Scrum) con roles definidos.
- Gestión de proyectos con Trello y GitHub.
- Comunicación profesional con stakeholders.

**Firma del Scrum Master:**  
*Ricardo Medina — 12 de octubre de 2026*

**Firma de la Product Owner:**  
*Cristina — 12 de octubre de 2026*

---

*Documento generado como parte del entregable final del Seminario de Actualización en Tecnología Web — IFTS N° 21.*



## 3. Arquitectura Final Implementada
