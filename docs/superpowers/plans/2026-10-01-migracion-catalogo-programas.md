# Migración integral del catálogo de programas — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminar la oferta pública antigua y hacer que toda Boat Solutions presente, reserve y comunique únicamente los cuatro programas actuales.

**Architecture:** Los datos comerciales seguirán centralizados en `programs.ts`, `programVisuals.ts` y los módulos i18n de programas. Inicio y contacto consumirán esas fuentes o claves compartidas; las rutas antiguas quedarán como redirecciones y el frontend obsoleto se eliminará. Apps Script conservará sus handlers históricos, pero ampliará el mapa de asuntos para el catálogo nuevo.

**Tech Stack:** Vue 3, TypeScript, Vue Router, Vite, Vitest, Vue Test Utils, Google Apps Script y Playwright/Python para QA visual.

**Spec:** `docs/superpowers/specs/2026-10-01-migracion-catalogo-programas-design.md`

## Global Constraints

- La oferta pública contiene exactamente cuatro programas: `care`, `navigation`, `ready` y `complete`.
- Yacht Logistics no aparece en navegación, footer, sitemap ni páginas contratables.
- Las rutas históricas permanecen como redirecciones y nunca como contenido canónico.
- Las versiones ES y EN deben conservar paridad funcional y semántica.
- Inicio reutiliza `programs`, `programVisuals` y `programsI18n`; no crea un catálogo duplicado.
- `ProgramBookingModal` es el único flujo de reserva específico de los programas.
- Los handlers históricos de Apps Script permanecen como compatibilidad defensiva, pero ninguna interfaz nueva los invoca.
- Los términos técnicos legítimos pueden aparecer en prestaciones y casos reales; no deben presentarse como servicios antiguos contratables.
- No se modifican precios, prestaciones, condiciones contractuales ni la promoción vigente.

## Review Focus

- Una URL histórica ES o EN debe conservar el idioma al redirigir y nunca terminar en 404.
- Un CTA abierto después de elegir fecha y hora debe conservar ambos valores y permitir seleccionar un programa si no venía preseleccionado.
- Un asunto nuevo de contacto debe llegar al correo administrativo con la etiqueta correcta en ES o EN, no con una clave interna ni vacío.
- Una tarjeta de Inicio debe usar el slug, nombre e imagen del mismo `ProgramId`, incluso después de futuras reordenaciones.
- La limpieza de términos antiguos no debe eliminar “detailing” del programa vigente ni desvirtuar actuaciones técnicas reales de los proyectos.

---

### Task 1: Permitir que la reserva de programas reciba fecha y hora preseleccionadas

**Files:**
- Modify: `src/types/programBooking.ts`
- Modify: `src/composables/useProgramBooking.ts`
- Modify: `src/components/ProgramBookingModal.vue`
- Test: `src/components/__tests__/ProgramBookingFlow.spec.ts`

**Interfaces:**
- Produces: `BookingContext { programId: ProgramId | null; length: BoatLength; schedule?: CalendarSelection }`.
- Produces: `useProgramBooking().open(context: BookingContext): void` que clona también `schedule`.
- Consumes: `CalendarSelection { date: string | null; time: string | null }`.

- [ ] **Step 1: Escribir la prueba que abre el modal con programa nulo y fecha/hora preseleccionadas**

Añadir `prefills the calendar while leaving the program selectable` y comprobar que `2026-10-05` y `10:00` quedan seleccionados, mientras `#booking-program` conserva `value === ''`.

- [ ] **Step 2: Ejecutar la prueba y comprobar RED**

Run: `npm run test:run -- src/components/__tests__/ProgramBookingFlow.spec.ts`
Expected: FAIL porque `BookingContext` no acepta `schedule` o el modal lo reinicia a valores nulos.

- [ ] **Step 3: Ampliar `BookingContext` y usar el schedule del contexto en `resetForm()`**

Clonar el objeto `schedule` al abrir y al reiniciar para evitar compartir referencias mutables. El valor por defecto sigue siendo `{ date: null, time: null }`.

- [ ] **Step 4: Ejecutar la prueba y la suite del componente**

Run: `npm run test:run -- src/components/__tests__/ProgramBookingFlow.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/types/programBooking.ts src/composables/useProgramBooking.ts src/components/ProgramBookingModal.vue src/components/__tests__/ProgramBookingFlow.spec.ts
git commit -m "feat: prefill program booking schedule"
```

### Task 2: Retirar Yacht Logistics del shell y convertir rutas antiguas en redirecciones

**Files:**
- Modify: `src/router/index.ts`
- Modify: `src/components/Header.vue`
- Modify: `src/components/Footer.vue`
- Modify: `src/i18n/header.ts`
- Modify: `src/i18n/footer.ts`
- Modify: `scripts/generate-sitemap.ts`
- Modify: `scripts/visual_check.py`
- Modify: `src/router/__tests__/programNavigation.spec.ts`
- Modify: `src/components/__tests__/ProgramShellNavigation.spec.ts`
- Modify: `scripts/__tests__/generate-sitemap.spec.ts`

**Interfaces:**
- Produces: `/yacht-logistics -> /servicios` y `/en/yacht-logistics -> /en/servicios`.
- Produces: navegación pública limitada a Servicios y cuatro programas.

- [ ] **Step 1: Cambiar las pruebas de navegación, rutas y sitemap al comportamiento nuevo**

Comprobar que:
- Header y Footer no contienen `/yacht-logistics`.
- Servicios continúa activo en las cuatro rutas de programa.
- Las dos rutas Logistics redirigen conservando idioma.
- El sitemap no publica `/yacht-logistics`.
- El QA visual deja de recorrer la página independiente de Logistics y verifica su redirección.

- [ ] **Step 2: Ejecutar las pruebas y comprobar RED**

Run: `npm run test:run -- src/router/__tests__/programNavigation.spec.ts src/components/__tests__/ProgramShellNavigation.spec.ts scripts/__tests__/generate-sitemap.spec.ts`
Expected: FAIL porque Logistics todavía está publicado y enlazado.

- [ ] **Step 3: Eliminar enlaces, etiquetas y estilos de Logistics; sustituir las rutas por redirects**

Eliminar la importación lazy de `YachtLogistics`, los dos route records con componente, las etiquetas i18n no usadas y las clases CSS exclusivas del enlace.

- [ ] **Step 4: Eliminar Logistics del generador de sitemap y ajustar el QA visual**

Las rutas históricas solo forman parte de la tabla de comprobación de redirecciones.

- [ ] **Step 5: Ejecutar las pruebas y comprobar GREEN**

Run: `npm run test:run -- src/router/__tests__/programNavigation.spec.ts src/components/__tests__/ProgramShellNavigation.spec.ts scripts/__tests__/generate-sitemap.spec.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/router/index.ts src/components/Header.vue src/components/Footer.vue src/i18n/header.ts src/i18n/footer.ts scripts/generate-sitemap.ts scripts/visual_check.py src/router/__tests__/programNavigation.spec.ts src/components/__tests__/ProgramShellNavigation.spec.ts scripts/__tests__/generate-sitemap.spec.ts
git commit -m "feat: retire yacht logistics from public navigation"
```

### Task 3: Sustituir las tarjetas y mensajes antiguos de Inicio

**Files:**
- Modify: `src/views/Home.vue`
- Modify: `src/i18n/home.ts`
- Create: `src/views/__tests__/HomePrograms.spec.ts`

**Interfaces:**
- Consumes: `programs: Program[]` de `src/data/programs.ts`.
- Consumes: `programVisuals: Record<ProgramId, ProgramVisual>`.
- Consumes: `useT('programs').programs[program.id]` y `to(path)`.
- Produces: cuatro elementos `[data-home-program]` con `data-program-id` y enlace localizado.

- [ ] **Step 1: Escribir pruebas de las cuatro tarjetas y sus fuentes tipadas**

Comprobar orden `care`, `navigation`, `ready`, `complete`; nombres traducidos; hrefs canónicos ES/EN; imágenes iguales a `programVisuals[id].src`; y ausencia de los títulos “Soluciones a medida”, “Realce estético” y “Traslados”. Añadir una prueba del Review Focus que compare cada tarjeta por `ProgramId`, no por índice aislado.

- [ ] **Step 2: Escribir prueba del hero, subtítulo y SEO sin oferta antigua**

Comprobar el mensaje de programas anuales y que el texto renderizado no anuncia transportes o consultoría como servicio independiente.

- [ ] **Step 3: Ejecutar y comprobar RED**

Run: `npm run test:run -- src/views/__tests__/HomePrograms.spec.ts`
Expected: FAIL porque Inicio todavía renderiza tres tarjetas manuales y textos antiguos.

- [ ] **Step 4: Renderizar las cuatro tarjetas desde datos compartidos**

Usar `v-for="program in programs"`, `programVisuals[program.id]`, `programsT.programs[program.id]` y `to('/programas/' + program.slug)`. Cada tarjeta debe incluir un `router-link`, no abrir la antigua consultoría.

- [ ] **Step 5: Actualizar i18n de Inicio y `usePageMeta`**

La sección presenta programas anuales, revisión gratuita y la propuesta de coordinación. Mantener proyectos, galería y contacto existentes.

- [ ] **Step 6: Ejecutar pruebas y comprobar GREEN**

Run: `npm run test:run -- src/views/__tests__/HomePrograms.spec.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/views/Home.vue src/i18n/home.ts src/views/__tests__/HomePrograms.spec.ts
git commit -m "feat: present current programs on home page"
```

### Task 4: Migrar CTA y calendarios al formulario real de programas

**Files:**
- Modify: `src/components/Header.vue`
- Modify: `src/views/Home.vue`
- Modify: `src/views/Contacto.vue`
- Modify: `src/views/Proyectos.vue`
- Modify: `src/views/Nosotros.vue`
- Modify: `src/i18n/home.ts`
- Modify: `src/i18n/contacto.ts`
- Test: `src/components/__tests__/ProgramShellNavigation.spec.ts`
- Test: `src/views/__tests__/HomePrograms.spec.ts`
- Create: `src/views/__tests__/ContactProgramMigration.spec.ts`

**Interfaces:**
- Consumes: `useProgramBooking().open({ programId: null, length: 30, schedule? })` de Task 1.
- Produces: CTA globales que abren el único modal de programas.

- [ ] **Step 1: Escribir pruebas para Header, Inicio y Contacto**

Comprobar que los CTA llaman a `useProgramBooking`, que el calendario de Inicio y Contacto entrega la fecha ISO y la hora seleccionadas, y que el contexto resultante contiene `programId: null`, `length: 30` y `schedule`. Incluir la prueba del Review Focus con fecha/hora y selección posterior de programa.

- [ ] **Step 2: Ejecutar y comprobar RED**

Run: `npm run test:run -- src/components/__tests__/ProgramShellNavigation.spec.ts src/views/__tests__/HomePrograms.spec.ts src/views/__tests__/ContactProgramMigration.spec.ts`
Expected: FAIL porque esas superficies todavía usan `useBooking('consulting')`.

- [ ] **Step 3: Sustituir `useBooking` por `useProgramBooking` en los CTA comerciales**

Los calendarios pasan `schedule: { date: dateStr, time }`. Los botones sin selección previa pasan solo `programId: null` y `length: 30`.

- [ ] **Step 4: Actualizar el copy de reserva y revisión gratuita**

Eliminar “la primera consultoría es gratuita” donde contradiga la promoción actual y usar la revisión inicial descrita en `programBookingI18n`.

- [ ] **Step 5: Ejecutar pruebas y comprobar GREEN**

Run: `npm run test:run -- src/components/__tests__/ProgramShellNavigation.spec.ts src/views/__tests__/HomePrograms.spec.ts src/views/__tests__/ContactProgramMigration.spec.ts src/components/__tests__/ProgramBookingFlow.spec.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.vue src/views/Home.vue src/views/Contacto.vue src/views/Proyectos.vue src/views/Nosotros.vue src/i18n/home.ts src/i18n/contacto.ts src/components/__tests__/ProgramShellNavigation.spec.ts src/views/__tests__/HomePrograms.spec.ts src/views/__tests__/ContactProgramMigration.spec.ts
git commit -m "feat: unify program booking entry points"
```

### Task 5: Sustituir asuntos antiguos de contacto y mapearlos en Apps Script

**Files:**
- Modify: `src/i18n/contacto.ts`
- Modify: `backend/Code.gs`
- Test: `src/views/__tests__/ContactProgramMigration.spec.ts`
- Test: `backend/Code.test.ts`

**Interfaces:**
- Produces: claves `consulta`, `revision`, `programa_mantenimiento`, `programa_electronica`, `programa_limpieza`, `programa_completo`, `otro`.
- Consumes: `data.subject: string` en `handleContactoEmails`.

- [ ] **Step 1: Escribir prueba frontend del conjunto exacto de asuntos ES/EN**

Comprobar valores y etiquetas; comprobar explícitamente ausencia de `traslado`, `mantenimiento`, `presupuesto` y `cita` como opciones heredadas.

- [ ] **Step 2: Escribir prueba backend parametrizada para las nuevas etiquetas**

Enviar un `contacto` por cada clave en ES y EN y comprobar que el email administrativo contiene la etiqueta humana esperada. Incluir la prueba del Review Focus de clave desconocida: se guarda la solicitud sin inyectar texto inseguro y el correo no muestra una etiqueta inventada.

- [ ] **Step 3: Ejecutar y comprobar RED**

Run: `npm run test:run -- src/views/__tests__/ContactProgramMigration.spec.ts backend/Code.test.ts`
Expected: FAIL porque frontend y Apps Script todavía usan el mapa antiguo.

- [ ] **Step 4: Sustituir los mapas ES/EN del frontend y `SUBJECT_LABELS` del backend**

No cambiar el payload ni `type: 'contacto'`.

- [ ] **Step 5: Ejecutar y comprobar GREEN**

Run: `npm run test:run -- src/views/__tests__/ContactProgramMigration.spec.ts backend/Code.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/contacto.ts backend/Code.gs src/views/__tests__/ContactProgramMigration.spec.ts backend/Code.test.ts
git commit -m "feat: align contact subjects with programs"
```

### Task 6: Eliminar el contacto duplicado y limpiar contenido comercial residual

**Files:**
- Modify: `src/views/Servicios.vue`
- Modify: `src/styles/programs.css`
- Modify: `src/views/Nosotros.vue`
- Modify: `src/views/Proyectos.vue`
- Modify: `src/views/Galeria.vue`
- Modify: `src/i18n/nosotros.ts`
- Modify: `src/i18n/proyectos.ts`
- Test: `src/views/__tests__/ProgramsProductionViews.spec.ts`
- Create: `src/views/__tests__/LegacyCatalogAudit.spec.ts`

**Interfaces:**
- Produces: CTA final sin `.contact-details`.
- Produces: lista declarativa de superficies públicas auditadas en `LegacyCatalogAudit.spec.ts`.

- [ ] **Step 1: Escribir prueba del CTA final sin datos repetidos**

Comprobar que conserva kicker, título, texto y botón, pero no contiene `boat-solutions.es`, `676 625 595` ni `info@boat-solutions.es` dentro de `Servicios`.

- [ ] **Step 2: Escribir auditoría de contenidos visibles y metadatos**

Montar Inicio, Servicios, Nosotros, Proyectos y Galería en ES/EN. Rechazar nombres comerciales antiguos (`Yacht Logistics`, `Soluciones a medida`, `Realce estético`, “traslados” como oferta) y aceptar explícitamente `Plan Limpieza y Detailing` y descripciones técnicas reales. Esta prueba cubre el Review Focus sobre falsos positivos de “detailing”.

- [ ] **Step 3: Ejecutar y comprobar RED**

Run: `npm run test:run -- src/views/__tests__/ProgramsProductionViews.spec.ts src/views/__tests__/LegacyCatalogAudit.spec.ts`
Expected: FAIL por el bloque duplicado y metadatos/copys heredados.

- [ ] **Step 4: Eliminar `.contact-details` y su CSS**

No modificar el footer global.

- [ ] **Step 5: Reescribir únicamente referencias comerciales obsoletas**

Conservar hechos de proyectos y experiencia, pero expresarlos como mantenimiento, electrónica, limpieza, puesta a punto y coordinación de especialistas dentro de la oferta actual.

- [ ] **Step 6: Ejecutar y comprobar GREEN**

Run: `npm run test:run -- src/views/__tests__/ProgramsProductionViews.spec.ts src/views/__tests__/LegacyCatalogAudit.spec.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/views/Servicios.vue src/styles/programs.css src/views/Nosotros.vue src/views/Proyectos.vue src/views/Galeria.vue src/i18n/nosotros.ts src/i18n/proyectos.ts src/views/__tests__/ProgramsProductionViews.spec.ts src/views/__tests__/LegacyCatalogAudit.spec.ts
git commit -m "fix: remove legacy catalog references"
```

### Task 7: Eliminar frontend muerto de servicios antiguos

**Files:**
- Delete: `src/views/YachtConsulting.vue`
- Delete: `src/views/YachtManagement.vue`
- Delete: `src/views/YachtLogistics.vue`
- Delete: `src/views/YachtDetailing.vue`
- Delete: `src/components/TransportRequestModal.vue`
- Delete: `src/components/DetailingRequestModal.vue`
- Delete: `src/components/BookingModal.vue`
- Delete: `src/composables/useTransportRequest.ts`
- Delete: `src/composables/useDetailingRequest.ts`
- Delete: `src/composables/useBooking.ts`
- Delete: `src/composables/useCalcConfig.ts`
- Delete: `src/data/calc-config-defaults.ts`
- Delete: `src/i18n/consulting.ts`
- Delete: `src/i18n/management.ts`
- Delete: `src/i18n/logistics.ts`
- Delete: `src/i18n/detailing.ts`
- Delete: `src/i18n/transportRequest.ts`
- Delete: `src/i18n/detailingRequest.ts`
- Delete: `src/components/__tests__/BookingModal.spec.ts`
- Modify: `src/App.vue`
- Modify: `src/i18n/index.ts`
- Modify: `.env.example`
- Modify: `.github/workflows/deploy.yml`
- Modify: `CLAUDE.md`
- Create: `src/__tests__/LegacyFrontendRemoval.spec.ts`

**Interfaces:**
- Consumes: rutas redirigidas de Task 2 y CTA migrados de Task 4.
- Produces: App shell con `ProgramBookingModal` como único modal de reserva, sin modales de consultoría, transport o detailing.

- [ ] **Step 1: Escribir prueba estática de ausencia de imports y montajes antiguos**

La prueba lee `App.vue`, router e índice i18n y comprueba ausencia de módulos retirados. Debe confirmar que `ProgramBookingModal` sigue montado exactamente una vez y que `BookingModal` ya no se monta.

- [ ] **Step 2: Ejecutar y comprobar RED**

Run: `npm run test:run -- src/__tests__/LegacyFrontendRemoval.spec.ts src/components/__tests__/ProgramShellNavigation.spec.ts`
Expected: FAIL porque los modales y traducciones antiguas siguen montados/importados.

- [ ] **Step 3: Eliminar imports, montajes y archivos sin consumidores**

Antes de borrar, ejecutar `rg` por cada módulo para confirmar que solo aparecen en los archivos enumerados y en la prueba que exige su ausencia. Eliminar también `BookingModal` y `useBooking` cuando Task 4 haya dejado cero consumidores. Retirar `VITE_CALC_CONFIG_URL` de la documentación, `.env.example` y workflow porque su lector desaparece; no editar el `.env` local del usuario.

- [ ] **Step 4: Ejecutar pruebas y typecheck para comprobar GREEN**

Run: `npm run test:run -- src/__tests__/LegacyFrontendRemoval.spec.ts src/components/__tests__/ProgramShellNavigation.spec.ts && npm run build`
Expected: PASS y build sin imports rotos.

- [ ] **Step 5: Commit**

```bash
git add -A src
git commit -m "refactor: remove retired service frontend"
```

### Task 8: Auditoría final, revisión independiente y publicación

**Files:**
- Modify if needed: `scripts/visual_check.py`
- Modify if needed: tests owning any regression discovered during review
- External deployment: Google Apps Script existing Web App
- External deployment: GitHub Pages from `main`

**Interfaces:**
- Consumes: todos los entregables anteriores.
- Produces: build publicable y evidencia de QA local y remoto.

- [ ] **Step 1: Ejecutar búsqueda de catálogo antiguo**

Run: `rg -n -i "yacht logistics|soluciones a medida|realce est[eé]tico|traslado de embarcaci[oó]n|transport by sea|vessel transfer" src scripts public`
Expected: solo redirecciones, pruebas negativas o referencias históricas justificadas por la especificación; ninguna oferta visible.

- [ ] **Step 2: Ejecutar suite y build completos**

Run: `npm run test:run && npm run build`
Expected: todos los tests PASS y sitemap generado sin Logistics.

- [ ] **Step 3: Ejecutar QA visual local**

Run: levantar `npm run preview -- --host 127.0.0.1 --port 4180 --strictPort` y después `$env:BASE_URL='http://127.0.0.1:4180'; python scripts/visual_check.py`.
Expected: PASS en 17 rutas ajustadas y cuatro anchos responsive, sin overflow ni CTA rotos.

- [ ] **Step 4: Preparar y ejecutar la revisión de rama completa**

Usar `review-package` con el merge-base anterior a Task 1, este plan, la especificación y las cinco líneas de Review Focus. Corregir hallazgos Critical/Important mediante RED→GREEN y registrar rulings/minors según `executing-plans` o `subagent-driven-development`.

- [ ] **Step 5: Publicar una nueva versión del Apps Script existente**

Actualizar `backend/Code.gs` en el proyecto actual, crear una versión nueva manteniendo el mismo Web App y comprobar que `VITE_SCRIPT_URL` no cambia.

- [ ] **Step 6: Hacer un envío real de contacto**

Enviar un asunto de programa y comprobar: fila guardada, confirmación al cliente y correo administrativo con la etiqueta humana correcta.

- [ ] **Step 7: Integrar en `main`, hacer push y esperar GitHub Pages**

Expected: workflow `Deploy to GitHub Pages` termina con `conclusion: success` para el SHA publicado.

- [ ] **Step 8: Ejecutar QA sobre producción**

Run: `$env:BASE_URL='https://boat-solutions.es'; python scripts/visual_check.py`
Expected: PASS; además verificar manualmente Inicio, Servicios, Contacto, Header y Footer en ES/EN y las ocho redirecciones históricas.
