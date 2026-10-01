# Migración integral del catálogo de servicios a programas

**Fecha:** 1 de octubre de 2026  
**Proyecto:** Boat Solutions  
**Estado:** Diseño aprobado en conversación; pendiente de revisión del documento

## Objetivo

Hacer que toda la web pública presente una única oferta comercial coherente basada en los cuatro programas actuales:

1. Plan Mantenimiento Delegado.
2. Plan Electrónica Asesorada.
3. Plan Limpieza y Detailing.
4. Listo para Zarpar.

Yacht Logistics y la antigua estructura de servicios individuales dejarán de formar parte de la oferta pública. La actualización debe abarcar navegación, inicio, contacto, reservas, SEO, sitemap, traducciones y código frontend que haya quedado sin uso.

## Criterios de éxito

- Ningún elemento visible ofrece Yacht Logistics, traslados, soluciones a medida, realce estético ni los antiguos servicios como productos contratables.
- La página de inicio presenta los cuatro programas actuales con su imagen, resumen y enlace correcto.
- El selector de asunto del formulario de contacto contiene únicamente opciones compatibles con el catálogo nuevo.
- Los CTA principales abren el flujo real de revisión inicial asociado a los programas.
- El bloque final de `/servicios` no repite web, teléfono ni correo antes del footer global.
- Las rutas antiguas importantes no producen errores 404: redirigen al programa o página vigente más relacionados.
- Las versiones española e inglesa permanecen equivalentes.
- El sitemap solo publica rutas canónicas vigentes.
- Las automatizaciones interpretan correctamente los nuevos asuntos del formulario.
- Pruebas, compilación y comprobación visual responsive pasan antes de publicar.

## Alcance funcional

### 1. Navegación y footer

- Eliminar los enlaces desktop y móvil a Yacht Logistics.
- Eliminar Yacht Logistics del footer.
- Mantener Servicios como acceso principal y los cuatro programas como navegación secundaria.
- Eliminar etiquetas y estilos que solo existan para el enlace de Logistics.

### 2. Inicio

- Sustituir las tres tarjetas antiguas por cuatro tarjetas de programas.
- Reutilizar la fuente de datos tipada de los programas y `programVisuals`; no duplicar nombres, slugs ni imágenes en la vista.
- Cada tarjeta debe enlazar a `/programas/<slug>` respetando el prefijo inglés mediante `to()`.
- Actualizar hero, entradilla de servicios, CTA y metadatos SEO para describir programas anuales de mantenimiento, electrónica y limpieza.
- Eliminar promesas comerciales de traslado o consultoría como servicio independiente.
- Mantener los casos reales, pero describir las actuaciones con vocabulario operativo y no como un catálogo anterior.

### 3. Contacto y reservas

El selector de asunto tendrá estas claves estables:

- `consulta`: consulta general.
- `revision`: revisión inicial gratuita.
- `programa_mantenimiento`: Plan Mantenimiento Delegado.
- `programa_electronica`: Plan Electrónica Asesorada.
- `programa_limpieza`: Plan Limpieza y Detailing.
- `programa_completo`: Listo para Zarpar.
- `otro`: otro asunto.

Las mismas claves y etiquetas bilingües se incorporarán a `SUBJECT_LABELS` en Apps Script. El formulario seguirá enviando `type: contacto`; no se cambia el contrato general del endpoint.

Los CTA de cabecera, inicio y contacto que actualmente abren la antigua consultoría deberán abrir `ProgramBookingModal`. Cuando proceda, el programa puede quedar sin preseleccionar para que el usuario lo elija en el modal. La fecha y hora elegidas en los calendarios existentes se conservarán al abrir el nuevo modal.

### 4. Bloque final de Servicios

- Mantener el mensaje sobre la revisión inicial gratuita y su botón.
- Eliminar la fila duplicada con `boat-solutions.es`, teléfono y correo.
- El footer global seguirá siendo la fuente única de esos datos de contacto.

### 5. Rutas y compatibilidad

Las rutas vigentes de los cuatro programas permanecen sin cambios.

Las rutas históricas se conservarán únicamente como redirecciones:

| Ruta histórica | Destino ES | Destino EN |
| --- | --- | --- |
| `/yacht-management` | `/programas/mantenimiento-delegado` | `/en/programas/mantenimiento-delegado` |
| `/yacht-detailing` | `/programas/limpieza-detailing` | `/en/programas/limpieza-detailing` |
| `/yacht-consulting` | `/servicios` | `/en/servicios` |
| `/yacht-logistics` | `/servicios` | `/en/servicios` |

Yacht Logistics desaparecerá del sitemap y dejará de cargar una vista propia.

### 6. Limpieza del frontend obsoleto

Eliminar, siempre que no queden consumidores:

- Vistas antiguas de Consulting, Management, Detailing y Logistics.
- Modales específicos de traslado y detailing.
- Composables usados únicamente por esos modales.
- Traducciones exclusivas de las vistas y modales eliminados.
- Montajes globales de esos modales en `App.vue`.
- Configuración de calculadoras que ya no tenga consumidores frontend.

Los manejadores históricos del Apps Script no se eliminarán en esta fase. Permanecerán como compatibilidad defensiva para versiones antiguas en caché o clientes que todavía apunten al endpoint, pero ninguna interfaz pública nueva los invocará.

## Política de contenidos

La limpieza no será una sustitución global de palabras. Los términos técnicos siguen siendo válidos cuando describen una prestación o un trabajo real:

- mantenimiento;
- electrónica;
- limpieza;
- detailing;
- coordinación con proveedores o astilleros;
- movimientos de una embarcación dentro de un caso real.

Lo que debe desaparecer es su presentación como catálogo comercial antiguo. Las páginas Nosotros, Proyectos y Galería se revisarán para que la experiencia pasada respalde los programas actuales sin anunciar Yacht Logistics o traslados como servicio disponible.

## SEO y descubrimiento

- Actualizar título y descripción de Inicio, Nosotros, Proyectos y Galería cuando todavía enumeren servicios antiguos.
- Eliminar `/yacht-logistics` del sitemap.
- Mantener redirecciones de rutas históricas para enlaces guardados y referencias externas.
- Conservar metadatos bilingües y rutas canónicas según los patrones actuales de `usePageMeta`.

## Datos y arquitectura

- `src/data/programs.ts` seguirá siendo la fuente única de identificadores, slugs, precios y prestaciones resumidas.
- `src/data/programVisuals.ts` seguirá siendo la fuente única de imágenes de los programas.
- `src/i18n/programs.ts` seguirá siendo la fuente de nombres y textos comerciales bilingües.
- Inicio consumirá esas fuentes en vez de recrear un segundo catálogo manual.
- El formulario de contacto conservará su modelo actual y solo sustituirá el conjunto de asuntos.
- `ProgramBookingModal` seguirá siendo el único flujo de reserva específico de los programas.

## Pruebas

### Pruebas automatizadas

- Navegación y footer contienen los cuatro programas y no contienen Yacht Logistics.
- Las rutas históricas redirigen a los destinos definidos.
- El sitemap no incluye Yacht Logistics y sí incluye todas las rutas canónicas.
- Inicio renderiza cuatro tarjetas enlazadas a los cuatro programas.
- Contacto ofrece las siete claves de asunto definidas y no ofrece `traslado` ni el antiguo `mantenimiento` genérico.
- El backend resuelve las etiquetas ES/EN de los nuevos asuntos.
- Los CTA principales abren el modal de programas y conservan fecha/hora cuando proceda.
- Una prueba de regresión rastrea enlaces y textos comerciales antiguos en las superficies públicas principales.

### Verificación de producción

- Ejecutar `npm run test:run`.
- Ejecutar `npm run build`.
- Ejecutar la comprobación visual en 375, 768, 1024 y 1440 px.
- Recorrer Inicio, Servicios, cuatro programas, Contacto, Header y Footer en ES/EN.
- Verificar redirecciones históricas.
- Probar un envío real del formulario de contacto con uno de los nuevos asuntos después de desplegar la versión correspondiente de Apps Script.

## Despliegue y dependencia externa

La web puede desplegarse después de que pase toda la verificación frontend. Para que los correos administrativos muestren el nombre concreto de cada programa, `backend/Code.gs` debe publicarse como una nueva versión del mismo Web App de Google Apps Script. El endpoint `VITE_SCRIPT_URL` no necesita cambiar si se actualiza el despliegue existente.

## Fuera de alcance

- Modificar precios o prestaciones de los cuatro programas.
- Cambiar las condiciones contractuales o la promoción vigente.
- Rediseñar el footer global.
- Añadir un servicio de logística alternativo.
- Eliminar compatibilidad histórica del backend.

## Riesgos y mitigaciones

- **Enlaces externos antiguos:** se conservan redirecciones en lugar de responder 404.
- **Correos sin etiqueta:** frontend y Apps Script comparten claves documentadas y se prueban en ambos idiomas.
- **Duplicación futura:** Inicio consume los datos tipados existentes.
- **Eliminación excesiva de contenido real:** se distingue entre servicio comercial antiguo y vocabulario técnico de casos reales.
- **Caché durante el despliegue:** los manejadores antiguos del backend se conservan temporalmente.
