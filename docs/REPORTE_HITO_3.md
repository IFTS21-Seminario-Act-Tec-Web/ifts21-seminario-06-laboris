📄 REPORTE DE HITO 3: Sprint 3 - Introducción de FastAPI y Preparación del Frontend
Proyecto: Laboris - Estudio Jurídico Laboral (IFTS N.º 21)
Fecha de cierre: [Fecha actual]
Responsable del reporte: Ricardo Medina (Scrum Master)
Estado: ✅ Completado - Demo realizada al Stakeholder
🎯 Objetivo del Sprint 3
Adelantar la introducción del backend real migrando de simulaciones básicas a una arquitectura con FastAPI. Se crearon los endpoints base, se conectó el frontend a estos servicios locales y se mejoró la experiencia de usuario (UX) con feedback visual de carga (spinners, fade-out) para gestionar la latencia real, dejando el terreno listo para el CRUD completo en el Sprint 4.
Épica 3: Lógica Frontend y Persistencia de Datos
Hito 3: Introducción de FastAPI, Endpoints básicos y Demo al Stakeholder
✅ Logros y Entregables Completados
1. Introducción de FastAPI y Endpoints (José)
Creación del servidor main.py con uvicorn y configuración de CORS.
Implementación de los endpoints base: GET /api/expediente?numero={n} y POST /api/contacto.
Definición de modelos Pydantic (ConsultaRequest) para validar la estructura de datos que recibe el backend.
Generación automática de la estructura de tablas (DER) y datos de prueba en SQLite al iniciar el servidor.
2. Conexión Real del Frontend (José)
Refactorización de main.js: se reemplazaron las simulaciones (setTimeout) por llamadas fetch() reales apuntando a http://127.0.0.1:8000/api/.
Manejo robusto de respuestas HTTP: tratamiento específico para éxitos (200), no encontrados (404) y errores de servidor (500).
3. Estados de Carga y UX Profesional (Zoe)
Implementación de spinners de carga (CSS personalizado con paleta Laboris) que se activan durante la latencia real de la petición a FastAPI.
Deshabilitación de botones (disabled) durante las peticiones para evitar envíos duplicados.
Efecto fade-out (desvanecimiento suave) en los mensajes de éxito del formulario, mejorando la percepción de fluidez de la aplicación.
Validación visual correcta tanto en Modo Claro como en Modo Oscuro.
4. Gestión y Calidad (Cristina, Graciela y Ricardo)
Cristina (PO): Preparación y ejecución de la demo al stakeholder, obteniendo feedback positivo sobre la profesionalidad de la interfaz.
Graciela (QA): Validación de la conexión frontend-backend, pruebas de endpoints forzando respuestas 404, y verificación de "cero errores en consola" (F12) en Chrome y Firefox.
Ricardo (SM): Coordinación del sprint, integración de código, limpieza inicial del repositorio y documentación del hito.
🔗 Enlaces de Referencia
Sitio en Producción (Netlify): [Tu link de Netlify]
Repositorio GitHub: IFTS21-Seminario-Act-Tec-Web/ifts21-seminario-06-laboris
