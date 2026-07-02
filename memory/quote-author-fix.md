---
name: quote-author-fix
description: Improved contrast of quote author text on index page
metadata:
  type: reference
---

Fixed the quote author text color on the index page to ensure proper readability in both light and dark themes.

**Changes made in `/home/gianluca/Documentos/Site-protifolio-PW1/css/style.css` (lines 295-298):**

1. **Quote footer styling**:
   - Changed from: `color: var(--bs-border-color);`
   - Changed to: `color: var(--bs-body-color); opacity: 0.8;`

**Why this fixes the issue:**
- Previously, the quote author text used `var(--bs-border-color)` which is:
  - Light mode: `#dee2e6` (very light gray)
  - Dark mode: `#333333` (dark gray)
- On the light-colored quote box background (rgba(var(--bs-body-color-rgb), 0.03)), the light gray text in light mode was difficult to read
- The dark gray text in dark mode was acceptable but could be improved for better consistency

- Now using `var(--bs-body-color)` which provides optimal contrast:
  - Light mode: `#212529` (dark gray/black) - excellent contrast on light background
  - Dark mode: `#e0e0e0` (light gray/white) - good contrast on dark background
- Added `opacity: 0.8;` to slightly de-emphasize the author text relative to the quote while maintaining readability
- This follows standard typographic hierarchy where quotes are primary and attribution is secondary but still clearly legible

**Technical details:**
- The quote box has a semi-transparent background: `background-color: rgba(var(--bs-body-color-rgb), 0.03);`
- In light mode: nearly white background (97% white) with dark gray text (rgba(33,37,41,0.8))
- In dark mode: nearly black background (3% white) with light gray text (rgba(224,224,224,0.8))
- This ensures WCAG AA contrast compliance in both themes

**Related memories:**
- [[theme-visibility-fix]] - Fix for carousel controls visibility in both themes
- [[theme-button-visibility]] - Fix for theme button visibility (changing outline classes)
- [[scroll-spy-fix]] - Fix for active link highlighting on scroll
- [[navbar-backdrop-fix]] - Fix for navbar backdrop and responsiveness (implemented in same commit)