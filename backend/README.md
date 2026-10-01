# Backend del formulario (Google Apps Script)

Este folder contiene la **fuente versionada** del Apps Script al que
apunta `VITE_SCRIPT_URL`. El script vive realmente en Google (dentro
de la hoja de Sheets vinculada); aquí guardamos una copia para poder
revisar cambios y trackearlos en git.

## Qué hace

- Recibe `POST` desde la web (BookingModal, QuoteModal, Contacto…).
- Guarda cada envío como una fila en la hoja activa.
- Para los tipos reconocidos, incluido `program-booking`, dispara dos correos automáticos HTML branded:
  - Confirmación al cliente.
  - Notificación al admin (`info@boat-solutions.es`).
- En las reservas de programas, el backend valida programa, eslora, nombre, sintaxis del email, fecha laborable entre hoy y 90 días (zona `Europe/Madrid`), hora permitida y evidencia de consentimiento antes de guardar.
- Los nombres localizados ES/EN y los precios de programa se resuelven en el servidor; los valores enviados por el cliente se ignoran.
- Las cuotas de los programas incluyen IVA y así se indica en la hoja y en ambos correos.
- Antes de escribir en Sheets, cualquier string que pueda interpretarse como fórmula (`=`, `+`, `-` o `@`, incluso tras espacios iniciales) se neutraliza con un apóstrofo. Los valores normales y los objetos `Date` no se modifican.

## Contrato de columnas en Sheets

Cada fila usa estas columnas, en este orden:

1. Fecha de recepción
2. Tipo
3. Categoría
4. Nombre
5. Email
6. Teléfono
7. Tipo de embarcación
8. Asunto/resumen
9. Mensaje o comentarios
10. Resumen adicional
11. Fecha solicitada
12. Hora solicitada
13. Privacidad aceptada
14. Versión de la política de privacidad
15. Fecha/hora ISO del consentimiento

Las tres últimas columnas contienen `true`, `2026-10` y `consentedAt` para `program-booking`; quedan vacías para los demás tipos de formulario.

## Cómo desplegar cambios

1. Abrir [script.google.com](https://script.google.com) con la cuenta
   propietaria del script.
2. Abrir el proyecto vinculado a la hoja de Sheets.
3. Pegar el contenido de `Code.gs` reemplazando el actual.
4. **Implementar → Gestionar implementaciones → ✏️ → Versión: nueva
   versión → Implementar.** La URL `VITE_SCRIPT_URL` se mantiene.

> ⚠️ Si se crea una **implementación nueva** (no editar la existente),
> Google genera una URL distinta y hay que actualizar `.env`.

## Cuotas

- Cuenta gratuita de Gmail: **100 correos/día** desde Apps Script.
- Cada envío de Contacto = 2 correos (cliente + admin) → ~50 envíos/día.
- Cada reserva de programa consume dos envíos: confirmación al cliente y aviso interno.
