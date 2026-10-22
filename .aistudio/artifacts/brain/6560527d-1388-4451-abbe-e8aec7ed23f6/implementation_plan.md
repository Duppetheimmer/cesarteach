# Plan de Implementación: Requisito de Certificado A1 para Desbloquear Nivel A2

## 1. Objetivo Principal
Garantizar que el **Nivel A2 · Plataforma** esté bloqueado hasta que el estudiante obtenga oficialmente su **Certificado Nivel A1** aprobando el examen final A1 con un puntaje de **80% o superior** (`examPassed === true`), tanto en memoria local como sincronizado en Supabase.

---

## 2. Experiencia de Usuario y Reglas de Bloqueo

### A. Botones y Accesos a Nivel A2 Deshabilitados hasta Aprobar A1
Mientras el estudiante no haya aprobado el Examen de Certificación A1 (`!progress.examPassed`):
- **Tarjeta del Módulo "03. Nivel A2 · Plataforma" (Inicio)**:
  - Se mostrará con estado visual de bloqueo (ícono de candado, borde atenuado y etiqueta `"Requisito: Certificado A1"`).
  - El botón de acción estará deshabilitado para entrar a las lecciones A2 y mostrará claramente el requisito.
- **Botón Principal del Hero Banner (Inicio)**:
  - Si el estudiante aún no tiene el Certificado A1, el botón secundario mostrará el requisito de Certificación A1 en lugar de abrir directamente el Nivel A2.
- **Barra de Navegación Inferior (`Nivel A2`)**:
  - Mostrará un indicador de candado junto a `Nivel A2`.
- **Panel de Estrategia Pedagógica (`LearningStrategyPanel`)**:
  - No recomendará saltar a lecciones A2 hasta que el Certificado A1 esté completado; en su lugar, guiará al estudiante a completar las lecciones A1 pendientes o presentar el Examen A1.
- **Vocabulario Rápido y Examen Final**:
  - En **Vocabulario Rápido**, el filtro `Nivel A2` estará deshabilitado con ícono de candado hasta aprobar A1.
  - En **Examen de Certificación**, la pestaña `Certificación Nivel A2` estará deshabilitada hasta haber aprobado primero `Certificación Nivel A1`.

### B. Pantalla de Requisito con Acceso Directo al Examen A1
Si el estudiante intenta acceder a la sección `a2-plataforma` sin contar con el Certificado A1:
- Se mostrará una **Pantalla de Requisito de Certificación A1** en lugar de las lecciones A2.
- Esta pantalla incluirá:
  1. Explicación clara de que para cursar el **Nivel A2 (Plataforma)** es obligatorio contar con el **Certificado Oficial Nivel A1 (≥80%)**.
  2. Indicador de su progreso actual en Nivel A1 (lecciones A1 completadas y mejor puntaje de examen si ya lo intentó).
  3. **Botón directo para ir al Examen de Certificación A1** (o a continuar sus lecciones A1).

### C. Regla Estricta de Desbloqueo (Solo con Examen A1 ≥ 80%)
- El acceso a Nivel A2 dependerá exclusivamente de `Boolean(progress.examPassed)` (que solo se activa al obtener **≥ 80%** en el examen de certificación A1).
- No se podrá saltar este requisito mediante el modo de exploración libre sin haber aprobado primero el Certificado A1.
- Una vez aprobado el Examen A1 con ≥ 80%, todos los botones, filtros y módulos de Nivel A2 se habilitarán automáticamente y el estado quedará guardado en la base de datos de Supabase (`student_progress.exam_passed`).

---

## 3. Archivos a Modificar
- `src/App.tsx`:
  - Validar `Boolean(progress.examPassed)` en las tarjetas de módulos, Hero CTA y navegación inferior.
  - Renderizar la **Pantalla de Requisito de Certificación A1** con botón directo al Examen A1 si se intenta abrir `a2-plataforma` sin haber aprobado A1.
- `src/components/LearningStrategyPanel.tsx`:
  - Ajustar el recomendador adaptativo para priorizar completar A1 y aprobar el Certificado A1 antes de sugerir lecciones de Nivel A2.
- `src/components/FastVocabView.tsx`:
  - Recibir el estado `isA1Certified` y deshabilitar la pestaña de filtro `Nivel A2` si el estudiante aún no tiene el Certificado A1.
- `src/components/FinalExamView.tsx`:
  - Deshabilitar el botón de selección `Certificación Nivel A2` hasta que `progress.examPassed` sea `true`.
