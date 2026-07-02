---
name: theme-visibility-fix
description: Fixed theme visibility issues for carousel controls and indicators
metadata:
  type: reference
---

Fixed CSS variables usage in carousel controls and indicators to adapt to both light and dark themes.

**Changes made in `/home/gianluca/Documentos/Site-protifolio-PW1/css/style.css`:**

1. **Carousel button hover state (line ~190)**:
   - Changed from: `background: rgba(255, 255, 255, 0.2);`
   - Changed to: `background: rgba(var(--bs-body-color-rgb), 0.2);`

2. **Carousel indicators (lines ~270, 277)**:
   - Changed from: `background: rgba(255, 255, 255, 0.3);`
   - Changed to: `background: rgba(var(--bs-body-color-rgb), 0.3);`
   - Changed from: `background: white;`
   - Changed to: `background: rgba(var(--bs-body-color-rgb), 0.7);`

3. **Carousel caption background (lines 222-231)**:
   - Added background for better text readability: `background-color: rgba(var(--bs-body-bg-rgb), 0.5);`
   - Added border-radius and padding for better appearance
   - This ensures text is readable over images in both light and dark themes

**Why this fixes the issue:**
- Previously, hardcoded RGBA values with fixed RGB values (255,255,255) were used, which appeared white in both light and dark themes
- Now using CSS variables `var(--bs-body-color-rgb)` and `var(--bs-body-bg-rgb)` which dynamically change based on the theme:
  - Light mode: body text RGB (33, 37, 41), body bg RGB (250, 250, 250)
  - Dark mode: body text RGB (224, 224, 224), body bg RGB (18, 18, 18)
- Added background to carousel caption to ensure text readability over images
- This ensures proper contrast and visibility in both themes

**Related memories:**
- [[theme-button-visibility]] - Previous fix for theme button visibility
- [[scroll-spy-fix]] - Fix for active link highlighting on scroll
- [[navbar-backdrop-fix]] - Fix for navbar backdrop and responsiveness