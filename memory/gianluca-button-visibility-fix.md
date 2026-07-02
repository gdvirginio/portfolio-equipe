---
name: gianluca-button-visibility-fix
description: Fixed theme visibility for Gianluca's project "Ver Detalhes" buttons
metadata:
  type: reference
---

Fixed the theme visibility issue for "Ver Detalhes" buttons in Gianluca's member section (membro2.html) so they display properly in both light and dark themes.

**Changes made:**

1. **Added CSS class in `/home/gianluca/Documentos/Site-protifolio-PW1/css/style.css` (lines ~130-146)**:
   ```css
   /* Theme-adaptive outline button */
   .btn-outline-theme {
     --bs-btn-color: var(--bs-body-color);
     --bs-btn-bg: transparent;
     --bs-btn-border-color: var(--bs-body-color);
     --bs-btn-hover-color: var(--bs-body-color);
     --bs-btn-hover-bg: var(--bs-body-bg);
     --bs-btn-hover-border-color: var(--bs-body-color);
     --bs-btn-focus-shadow-rgb: var(--bs-body-color-rgb);
     --bs-btn-active-color: var(--bs-btn-hover-color);
     --bs-btn-active-bg: var(--bs-btn-hover-bg);
     --bs-btn-active-border-color: var(--bs-btn-hover-border-color);
     --bs-btn-disabled-color: var(--bs-btn-color);
     --bs-btn-disabled-bg: transparent;
     --bs-btn-disabled-border-color: var(--bs-btn-color);
     --bs-gradient: none;
   }
   ```

2. **Updated buttons in `/home/gianluca/Documentos/Site-protifolio-PW1/membros/membro2.html`**:
   - Changed all 4 "Ver Detalhes" buttons from `class="btn btn-sm btn-outline-light"` to `class="btn btn-sm btn-outline-theme"`
   - Affected lines: 158, 172, 186, 200 (project cards in carousel)

**Why this fixes the issue:**
- Previously, buttons used `btn-outline-light` which relies on fixed `--bs-white` variable
- In light mode: white buttons on near-white background → poor visibility
- In dark mode: white buttons on dark background → good visibility
- New `btn-outline-theme` class uses CSS variables that adapt to the theme:
  - Light mode: `--bs-body-color` = dark gray (21,25,29) → dark text/border on light bg
  - Dark mode: `--bs-body-color` = light gray (224,224,224) → light text/border on dark bg
- Hover states also adapt properly using `--bs-body-bg` for background
- This creates consistent, readable buttons in both themes without needing JS intervention

**Related memories:**
- [[theme-visibility-fix]] - Fix for carousel controls visibility in both themes
- [[theme-button-visibility]] - Fix for theme button visibility (changing outline classes)
- [[scroll-spy-fix]] - Fix for active link highlighting on scroll
- [[alejandro-section-correction]] - Removal of incorrectly added button from Alejandro's section
- [[navbar-backdrop-fix]] - Fix for navbar backdrop and responsiveness
- [[quote-author-fix]] - Fix for quote author text visibility