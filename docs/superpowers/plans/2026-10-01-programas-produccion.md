# Programas Boat Solutions en Producción — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrar esta noche en `boat-solutions.es` la oferta aprobada de cuatro programas, su reserva real y sus páginas legales, conservando Yacht Logistics y el resto de la web actual.

**Architecture:** La aplicación pública seguirá siendo una única SPA Vue 3 + TypeScript + Vite. Se trasladarán del prototipo los modelos tipados, componentes, imágenes optimizadas y reglas de reserva, adaptándolos al router bilingüe, cabecera, SEO y estilos de la web real. Google Apps Script seguirá siendo el backend de formularios y la fuente autoritativa de nombre/precio para cada reserva de programa.

**Tech Stack:** Vue 3.5, TypeScript 5.8, Vue Router 4.6, Vite 8, Vitest, Google Apps Script, GmailApp, Google Sheets, GitHub Actions y GitHub Pages.

**Spec:** `D:/Proyectos/boat-solutions-programas-preview/docs/superpowers/specs/2026-09-30-programas-reales-design.md`

## Global Constraints

- Repositorio de producción: `D:/Proyectos/boatSolutions/boat-solutions`.
- El prototipo `D:/Proyectos/boat-solutions-programas-preview` es la referencia visual y funcional; no se desplegará como sitio independiente.
- Mantener `Yacht Logistics` y sus calculadoras como servicio independiente.
- No recuperar tienda ni referencias a Fender Design.
- Los cuatro programas aprobados son Mantenimiento Delegado, Electrónica Asesorada, Limpieza y Detailing y Listo para Zarpar.
- Todos los importes visibles y enviados por correo incluyen IVA.
- Matrices de precios por 30/35/40/45/50 pies: mantenimiento `215/250/285/320/355`, electrónica `130/150/170/190/215`, limpieza `85/100/115/130/145`, completo `360/420/480/540/600` euros al mes.
- La promoción aprobada es una revisión inicial de una hora, valorada en 120 € IVA incluido, limitada a diez plazas, barcos de hasta 30 pies en Rías Baixas y reservas hasta el 31/10/2026.
- No publicar precios de pulido no confirmados.
- Preservar la selección de programa, eslora, fecha y hora al abrir el modal.
- Mostrar fechas al usuario como `DD/MM/AAAA`; enviar al backend `YYYY-MM-DD`.
- No reemplazar ni descartar los cambios locales existentes en `backend/Code.gs`, `backend/README.md` y `backend/Code.test.ts`; corregirlos sobre su estado actual.
- Ningún `push` a `main` hasta superar pruebas, build, revisión visual y una reserva real de extremo a extremo.

## Review Focus

- El navegador no puede falsear nombre o cuota: el backend recalcula ambos desde `programId` y eslora.
- Una reserva con ruta inglesa debe conservar idioma, textos y formato de fecha correctos.
- Los antiguos enlaces de servicios deben redirigir sin romper marcadores ni resultados de buscadores.
- Un fallo de Apps Script no puede mostrar una confirmación falsa al usuario.
- La web debe seguir funcionando si falla la CSV de calculadoras; Logistics y Detailing conservan sus valores fallback.

---

## Ruta crítica de esta noche

| Franja | Bloque | Responsable | Dependencia |
|---|---|---|---|
| 00:00–00:25 | Baseline, rama y corrección de pruebas existentes | Agente integrador | Ninguna |
| 00:25–01:55 | Backend, frontend ES e i18n/legal en paralelo | 3 agentes | Baseline |
| 01:55–02:45 | Integración de ramas/cambios y resolución de conflictos | Agente integrador | Tres bloques |
| 02:45–03:15 | Despliegue manual de Apps Script y prueba real | Usuario + agente | Backend integrado |
| 03:15–04:15 | QA responsive, accesibilidad, rutas y regresión | 2 agentes | Aplicación integrada |
| 04:15–04:45 | Push, GitHub Pages, smoke test y rollback preparado | Agente integrador | Todo verde |
| 04:45–05:30 | Margen para incidencias | Todos | Solo si hace falta |

Tiempo previsto con trabajo paralelo: **4 h 45 min**, con **45 min de margen**. La única intervención manual imprescindible del usuario es desplegar Apps Script/autorizaciones y confirmar la recepción de los dos correos.

### Task 1: Baseline seguro y contrato de datos definitivo

**Files:**
- Modify: `src/components/__tests__/BookingModal.spec.ts`
- Inspect: `backend/Code.gs`
- Inspect: `backend/Code.test.ts`
- Test: `src/components/__tests__/BookingModal.spec.ts`

**Interfaces:**
- Consumes: estado actual de `main` y cambios locales de backend.
- Produces: suite base verde y lista exacta de archivos modificados antes de integrar.

- [ ] **Step 1: Crear la rama `feat/programas-produccion` sin limpiar ni sobrescribir el working tree.**
- [ ] **Step 2: Registrar `git status`, commit base y variables configuradas sin imprimir secretos.**
- [ ] **Step 3: Corregir el montaje de `BookingModal.spec.ts` para instalar un router de memoria y eliminar el error `route.path` undefined.**
- [ ] **Step 4: Ejecutar `npm run test:run`; resultado esperado: todas las pruebas existentes pasan sin warnings de inyección de router.**
- [ ] **Step 5: Ejecutar `npm run build`; resultado esperado: TypeScript, Vite y sitemap terminan con código 0.**
- [ ] **Step 6: Commit `test: restore production baseline`.**

### Task 2: Backend autoritativo para reservas de programas

**Files:**
- Modify: `backend/Code.gs`
- Modify: `backend/Code.test.ts`
- Modify: `backend/README.md`

**Interfaces:**
- Consumes: payload `program-booking` del prototipo.
- Produces: `normalizeProgramBooking(data)`, fila de Sheets y dos correos coherentes con los precios aprobados.

- [ ] **Step 1: Cambiar primero las pruebas para cubrir los 20 precios, IVA incluido y rechazo de programa/eslora desconocidos.**
- [ ] **Step 2: Ejecutar `npm run test:run -- backend/Code.test.ts`; debe fallar con la matriz antigua.**
- [ ] **Step 3: Sustituir `PROGRAM_BOOKING_CONFIG` por IDs, nombres y matrices definitivas del prototipo.**
- [ ] **Step 4: Cambiar asuntos, resúmenes y correos para decir `IVA incluido`, nunca `+ IVA`.**
- [ ] **Step 5: Validar campos obligatorios, longitudes permitidas `30|35|40|45|50` y fechas/horas antes de escribir la fila.**
- [ ] **Step 6: Mantener `NOTIFY_EMAIL` y `REPLY_TO` en `info@boat-solutions.es`.**
- [ ] **Step 7: Ejecutar la prueba aislada y la suite completa; ambas deben pasar.**
- [ ] **Step 8: Documentar columnas esperadas, despliegue y prueba manual en `backend/README.md`.**
- [ ] **Step 9: Commit `feat: finalize program booking automation`.**

### Task 3: Integración frontend española de programas

**Files:**
- Create: `src/data/programs.ts`
- Create: `src/data/programDetails.ts`
- Create: `src/data/commercialConditions.ts`
- Create: `src/data/promotion.ts`
- Create: `src/types/programs.ts`
- Create: `src/types/programBooking.ts`
- Create: `src/components/programs/LengthSelector.vue`
- Create: `src/components/programs/ProgramCard.vue`
- Create: `src/components/programs/ProgramConditions.vue`
- Create: `src/components/programs/ProgramFaq.vue`
- Create: `src/components/programs/BookingCalendar.vue`
- Create: `src/components/programs/ProgramBookingModal.vue`
- Create: `src/views/Servicios.vue`
- Create: `src/views/ProgramaDetalle.vue`
- Create: `src/views/BasesRevisionGratuita.vue`
- Create/Modify: pruebas equivalentes bajo `src/**/__tests__/`
- Copy: cuatro WebP optimizados desde `boat-solutions-programas-preview/src/assets/programs/`

**Interfaces:**
- Consumes: modelos y comportamiento aprobados del prototipo.
- Produces: `/servicios`, cuatro fichas, selector reactivo y modal que envía `program-booking`.

- [ ] **Step 1: Portar primero las pruebas de precios, ahorros, calendario, conservación de preselección y payload.**
- [ ] **Step 2: Ejecutar las pruebas nuevas; deben fallar porque aún no existen los módulos.**
- [ ] **Step 3: Portar datos tipados y funciones puras sin duplicar matrices en componentes.**
- [ ] **Step 4: Portar componentes visuales y estilos adaptándolos a los tokens globales de la web real.**
- [ ] **Step 5: Portar las tres vistas y las cuatro imágenes WebP específicas.**
- [ ] **Step 6: Usar `VITE_SCRIPT_URL` mediante el helper de entorno existente; no crear una segunda configuración.**
- [ ] **Step 7: Confirmar que el selector aparece inmediatamente después de la cuota en cada ficha.**
- [ ] **Step 8: Ejecutar pruebas nuevas y build; resultado esperado: verde.**
- [ ] **Step 9: Commit `feat: integrate programs experience`.**

### Task 4: Router, navegación y compatibilidad con URLs existentes

**Files:**
- Modify: `src/router/index.ts`
- Modify: `src/components/Header.vue`
- Modify: `src/i18n/header.ts`
- Modify: `scripts/generate-sitemap.ts`
- Modify: tests de router/App/Header

**Interfaces:**
- Consumes: vistas producidas por Task 3.
- Produces: rutas públicas, navegación desktop/móvil, redirects y sitemap.

- [ ] **Step 1: Escribir pruebas de `/servicios`, cuatro rutas de programa y `/bases-revision-gratuita`.**
- [ ] **Step 2: Registrar esas rutas con lazy loading.**
- [ ] **Step 3: Mantener `/yacht-logistics` como enlace independiente.**
- [ ] **Step 4: Redirigir rutas antiguas de Management/Detailing/Consulting a la página nueva más cercana sin generar 404.**
- [ ] **Step 5: Sustituir el desplegable de servicios por Servicios, cuatro programas y Logistics en desktop y móvil.**
- [ ] **Step 6: Añadir las nuevas URLs al sitemap y comprobar que no aparecen rutas retiradas.**
- [ ] **Step 7: Ejecutar pruebas de navegación y build.**
- [ ] **Step 8: Commit `feat: publish program routes and navigation`.**

### Task 5: Inglés, SEO y contenido legal funcional

**Files:**
- Create: `src/i18n/programs.ts`
- Create: `src/i18n/programDetails.ts`
- Create: `src/i18n/programBooking.ts`
- Create: `src/i18n/promotion.ts`
- Modify: vistas y componentes creados en Task 3
- Modify: `src/router/index.ts`
- Modify: `src/views/PoliticaPrivacidad.vue`
- Modify: `src/views/TerminosCondiciones.vue`
- Modify: tests de i18n/meta/legal

**Interfaces:**
- Consumes: rutas y modelos de Tasks 3–4.
- Produces: paridad ES/EN, metadatos por ruta y textos de tratamiento de datos.

- [ ] **Step 1: Escribir pruebas que recorran las seis rutas en ES y EN y verifiquen título, CTA y ausencia de castellano residual en EN.**
- [ ] **Step 2: Extraer todo el contenido visible a módulos i18n tipados; precios y IDs permanecen neutrales.**
- [ ] **Step 3: Añadir `/en/servicios`, cuatro rutas `/en/programas/...` y `/en/bases-revision-gratuita`.**
- [ ] **Step 4: Añadir título, descripción, canonical y alternates ES/EN mediante `usePageMeta`.**
- [ ] **Step 5: Actualizar privacidad con finalidad de gestionar reservas, datos recogidos, base jurídica, conservación, destinatarios y derechos, sin prometer validación jurídica profesional.**
- [ ] **Step 6: Mantener visible en el prototipo/entorno de revisión la advertencia de revisión jurídica hasta aprobación final del texto.**
- [ ] **Step 7: Ejecutar pruebas y build.**
- [ ] **Step 8: Commit `feat: add bilingual program and legal content`.**

### Task 6: Integración y despliegue real de Google Apps Script

**Files:**
- Deploy source: `backend/Code.gs`
- Verify secret: GitHub `VITE_SCRIPT_URL`
- Verify external: Google Sheet asociada y bandejas de correo

**Interfaces:**
- Consumes: backend probado de Task 2 y frontend de Task 3.
- Produces: URL `/exec` real y reserva completa verificable.

- [ ] **Step 1: Copiar `backend/Code.gs` aprobado al proyecto Apps Script propietario.**
- [ ] **Step 2: Guardar y ejecutar una función controlada para provocar la autorización de Sheets y Gmail.**
- [ ] **Step 3: Implementar una nueva versión del Web App como propietario y con acceso público requerido por el formulario.**
- [ ] **Step 4: Actualizar `VITE_SCRIPT_URL` en GitHub Secrets solo si cambió la URL `/exec`.**
- [ ] **Step 5: Enviar una reserva real de prueba con Electrónica Asesorada, 40 pies y fecha futura.**
- [ ] **Step 6: Comprobar fila con cuota `170 €/mes`, confirmación al cliente y aviso a `info@boat-solutions.es`, todos con IVA incluido.**
- [ ] **Step 7: Verificar que datos manipulados del navegador no alteran nombre ni precio.**
- [ ] **Step 8: Registrar el resultado sin guardar datos personales de prueba en el repositorio.**

### Task 7: QA integral y revisión independiente

**Files:**
- Modify: `scripts/visual_check.py`
- Create/Modify: pruebas de integración necesarias
- Generate locally: `artifacts/screenshots/programas-*` (no bloquear publicación si quedan ignorados)

**Interfaces:**
- Consumes: aplicación totalmente integrada.
- Produces: evidencia de publicación segura.

- [ ] **Step 1: Ejecutar `npm run test:run`; debe terminar sin fallos ni warnings de router.**
- [ ] **Step 2: Ejecutar `npm run build`; debe generar sitemap con rutas ES/EN correctas.**
- [ ] **Step 3: Revisar `/servicios`, las cuatro fichas, bases y modal a 375, 768, 1024 y 1440 px.**
- [ ] **Step 4: Comprobar teclado, foco visible, Escape, bloqueo de scroll, contraste y ausencia de overflow horizontal.**
- [ ] **Step 5: Probar redirects antiguos, enlaces legales, selector de eslora y persistencia de programa/fecha/hora.**
- [ ] **Step 6: Confirmar que Contacto, Logistics, calculadoras, galería y formularios anteriores siguen funcionando.**
- [ ] **Step 7: Pedir revisión independiente del diff completo y corregir únicamente hallazgos verificables.**
- [ ] **Step 8: Commit `test: verify production programs rollout`.**

### Task 8: Publicación, smoke test y rollback

**Files:**
- Verify: `.github/workflows/deploy.yml`
- Verify: `public/CNAME`
- Verify: `dist/sitemap.xml`

**Interfaces:**
- Consumes: rama verificada y Apps Script operativo.
- Produces: `boat-solutions.es` actualizado y plan de vuelta atrás.

- [ ] **Step 1: Registrar el SHA previo de producción como punto de rollback.**
- [ ] **Step 2: Revisar `git diff --check`, secretos no trackeados y working tree esperado.**
- [ ] **Step 3: Integrar en `main` y hacer push una sola vez.**
- [ ] **Step 4: Esperar a que GitHub Pages complete build y deploy.**
- [ ] **Step 5: Hacer smoke test en dominio real de Home, Servicios, cuatro programas, Logistics, política, bases y reserva.**
- [ ] **Step 6: Confirmar HTTPS, CNAME, navegación móvil y envío real.**
- [ ] **Step 7: Si falla una función crítica, revertir al SHA registrado; no corregir directamente sobre producción sin volver a pasar Task 7.**

## Fuera del alcance de esta noche

- Migrar los precios de los programas a Google Sheets; inicialmente quedarán tipados en frontend y validados de forma autoritativa en Apps Script.
- Incorporar analítica nueva o banner de cookies.
- Rediseñar Home, Nosotros, Galería o Logistics más allá de los enlaces necesarios.
- Publicar precios de servicios no confirmados.

## Criterio de terminado

La tarea solo está terminada cuando la web real muestra las páginas aprobadas en ES y EN, el selector actualiza correctamente los 20 precios, una reserva real crea fila y dos correos con datos verificados, todas las pruebas y el build pasan, y el smoke test de `boat-solutions.es` no encuentra regresiones críticas.
