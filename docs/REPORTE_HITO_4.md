REPORTE DE HITO 4 — Sprint Final: Backend Real con FastAPI, SQLite y Cierre del Proyecto
Proyecto: Laboris — Estudio Jurídico Laboral
Institución: IFTS N° 21 — Seminario de Actualización en Tecnología Web
Sprint: 4 (Sprint Final)
Fecha de cierre: 19 de octubre de 2026
Responsable del reporte: Ricardo Medina (Scrum Master)
Estado: ✅ APROBADO POR EL STAKEHOLDER
1. Objetivo del Hito
Transicionar el proyecto desde un entorno de simulación (localStorage / mocks) a una arquitectura de backend real compuesta por:
Frontend: HTML5 + CSS3 + Bootstrap 5 + JavaScript Vanilla
Backend: FastAPI (Python) servido vía uvicorn
Base de datos: SQLite local (portable, zero-configuration, alineada al DER oficial)
Persistencia real: Reemplazo definitivo de localStorage por peticiones fetch() a endpoints reales
Decisión técnica estratégica: En lugar de MySQL + nube, se optó por SQLite local porque:
Garantiza una demo 100% portable y a prueba de fallos de conexión.
Elimina la necesidad de configuración manual (XAMPP, credenciales, usuarios).
Al levantar el servidor con uvicorn, la base de datos se genera automáticamente con la estructura del DER y datos de prueba.
Cumple al 100% con el DER oficial del proyecto (tablas cliente, expediente, consulta).
2. Entregables del Sprint 4
#
Entregable
Responsable
Estado
1
Servidor FastAPI (main.py) con endpoints GET /api/expediente y POST /api/contacto
José (Dev)
✅ Completado
2
Base de datos SQLite (laboris.db) generada automáticamente con las 3 tablas del DER y datos de prueba
José (Dev)
✅ Completado
3
Refactorización de main.js: eliminación de mocks y localStorage, implementación de fetch() real
José (Dev)
✅ Completado
4
Implementación de modo oscuro/claro con persistencia en localStorage y efecto fade-out en mensajes
Zoe (UX/UI)
✅ Completado
5
Ajuste de UI: IDs del formulario alineados al backend, validaciones visuales, responsive
Zoe (UX/UI)
✅ Completado
6
Plan de testing de integración (Frontend ↔ Backend ↔ SQLite)
Graciela (QA)
✅ Completado
7
Repositorio GitHub limpio con .gitignore configurado (sin laboris.db ni caché)
Ricardo (SM)
✅ Completado
8
Aprobación formal del stakeholder y cierre del proyecto
Cristina (PO)
✅ Completado
3. Arquitectura Final Implementada
12345678910111213141516171819
4. Intervenciones por Integrante
👨‍💻 José (Developer)
Configuración del servidor FastAPI con uvicorn main:app --reload.
Implementación de los endpoints GET /api/expediente?numero={n} y POST /api/contacto con validación Pydantic.
Creación automática de las 3 tablas del DER (cliente, expediente, consulta) al iniciar el servidor.
Carga de datos de prueba (seed data) en la tabla expediente para la demo.
Refactorización completa de main.js: eliminación de DEMO_EXPEDIENTES, mockFetchExpediente y localStorage.
Integración de fetch() real apuntando a http://127.0.0.1:8000/api/....
Cambio de ruta de /{numero} a ?numero= para evitar conflictos con la barra / en números de expediente.
👩‍🎨 Zoe (UX/UI)
Implementación del toggle de modo oscuro/claro con persistencia en localStorage.
Diseño del efecto fade-out (desvanecimiento) en el mensaje de éxito del formulario usando setTimeout y transiciones CSS.
Ajuste de IDs del formulario (nombre, email, tipoConsulta, descripcion) para que coincidan con el backend.
Revisión y adaptación del CSS para mantener la estética borgoña/dorado en modo claro y oscuro.
Validación de que los estados de carga ("Enviando...") funcionen correctamente con requests reales.
👩‍🔬 Graciela (QA Tester)
Definición de casos de prueba de integración (envío de formulario → verificación en SQLite).
Testing de endpoints forzando respuestas 404 (expediente inexistente).
Verificación de que no existan archivos de base de datos expuestos en GitHub (auditoría de .gitignore).
Validación del flujo completo: consulta de expediente + envío de formulario + persistencia en BD.
Firma de aprobación final: "Aprobado para Demo Final. El sistema es funcional, estable y el repositorio está limpio."
👨‍ Ricardo Medina (Scrum Master / Dev)
Organización de la minuta presencial de transición al Sprint 4.
Limpieza del repositorio: ejecución de git rm --cached laboris.db y configuración de .gitignore.
Force push para eliminar el historial remoto y dejar el repo con solo el código fuente.
Auditoría de código para eliminar rastros de simulaciones.
Coordinación del equipo y seguimiento de tareas en Trello.
Documentación de intervenciones del equipo en comentarios del código (Sprints 1-4).
👩‍💼 Cristina (Product Owner)
Aprobación formal del Sprint 3 y autorización para avanzar al Sprint 4.
Validación de criterios de aceptación finales.
Conducción de la Demo Final ante el stakeholder.
Obtención de la aprobación formal del cliente y cierre oficial del proyecto.
Entrega del link al repositorio de GitHub con documentación de levantamiento local.
5. Criterios de Aceptación Cumplidos
El servidor FastAPI levanta correctamente con uvicorn main:app --reload y sirve el frontend en localhost:8000.
La base de datos SQLite se genera automáticamente con las 3 tablas del DER y datos de prueba.
La consulta de expediente 12345/2026 devuelve datos reales desde SQLite.
La consulta de un expediente inexistente devuelve HTTP 404 con mensaje de UI adecuado.
El envío del formulario de contacto persiste el dato en la tabla consulta (verificable con SQLPro).
No quedan rastros de simulaciones (DEMO_EXPEDIENTES, setTimeout falsos, localStorage para datos).
El archivo .gitignore está configurado y laboris.db no está subido a GitHub.
El modo oscuro/claro funciona y persiste la preferencia del usuario.
El mensaje de éxito del formulario se desvanece automáticamente a los 3 segundos.
El cliente recibió y aprobó formalmente el entregable final.
6. Feedback del Stakeholder
"Destacaron la profesionalidad de los spinners, les encantó el modo oscuro y confirmaron que vamos por muy buen camino. Nos dieron la aprobación formal para avanzar."
— Cristina (PO), reunión de cierre del Sprint 3.
"El cliente aprobó formalmente el entregable final y expresó su total satisfacción con la funcionalidad del programa. Les encantó la portabilidad del sistema: al levantar el servidor, la base de datos se genera sola con los datos de prueba, sin necesidad de configuración manual."
— Cristina (PO), reunión de cierre del Sprint 4.
7. Lecciones Aprendidas (Retrospectiva)
Lo que funcionó bien:
La división clara de roles (Dev, UX, QA, SM, PO) permitió un flujo de trabajo ordenado.
El uso de Trello para centralizar tareas y dependencias fue clave.
La documentación de cada Sprint con comentarios en el código facilitó la trazabilidad.
La decisión de usar SQLite en lugar de MySQL simplificó enormemente la demo y evitó fallos de conexión.
Lo que podemos mejorar:
Anticipar la estrategia de base de datos (local vs. nube) desde el Sprint 1 para evitar refactorizaciones.
Establecer desde el inicio las convenciones de nombres entre frontend y backend (ej: tipo_consulta vs tipoConsulta).
Acciones para futuros proyectos:
Incluir un checklist de "buenas prácticas de Git" (.gitignore, limpieza de caché) en la fase de planificación.
Definir el entorno de producción antes del Sprint 2.
Alinear los IDs del HTML con las claves del backend desde el inicio.
8. Evidencias
📂 Carpeta de documentación: /docs/ (REPORTE_HITO_1.md, REPORTE_HITO_2.md, REPORTE_HITO_3.md, REPORTE_HITO_4.md)
Repositorio GitHub: RicardoMedina1980/ifts21-seminario-06-laboris
🗄️ Base de datos local: laboris.db (generada automáticamente, no incluida en el repo por buenas prácticas)
📋 Tablero Trello: Sprint 4 completado, todas las tarjetas en "Done"
9. Cierre
Con la aprobación formal del stakeholder y la entrega del repositorio final (código fuente funcional + documentación de levantamiento local), el Proyecto Laboris se considera oficialmente cerrado.
El equipo cumplió con todos los objetivos pedagógicos del Seminario de Actualización en Tecnología Web del IFTS N° 21, demostrando competencias en:
Desarrollo frontend con HTML, CSS, Bootstrap y JavaScript.
Implementación de backend con FastAPI.
Gestión de base de datos SQLite alineada al DER oficial.
Metodologías ágiles (Scrum) con roles definidos.
Gestión de proyectos con Trello y GitHub.
Buenas prácticas de control de versiones (.gitignore, limpieza de repo).
Comunicación profesional con stakeholders.
Firma del Scrum Master:
Ricardo Medina — 19 de octubre de 2026
Firma de la Product Owner:
Cristina — 19 de octubre de 2026
Documento generado como parte del entregable final del Seminario de Actualización en Tecnología Web — IFTS N° 21.
💡 Cambios clave que hice:
Eliminé todo lo relacionado con MySQL, nube, dump.sql e instructivo PDF.
Agregué la decisión técnica estratégica explicando por qué SQLite es mejor para este entregable.
Actualicé la arquitectura para reflejar FastAPI + SQLite local.
Ajusté las intervenciones de cada integrante para reflejar el trabajo real (modo oscuro, fade-out, limpieza de repo, etc.).
Actualicé los criterios de aceptación para que coincidan con lo que realmente probamos.
Mantuve el formato profesional y el tono del reporte original.
