---
name: scroll-spy-fix
description: Fixed active link highlighting on scroll for navbar navigation
metadata:
  type: reference
---

Fixed the scroll spy logic in the updateActiveLinkOnScroll function to properly highlight navbar links when scrolling to sections.

**Changes made in `/home/gianluca/Documentos/Site-protifolio-PW1/js/main.js` (lines 50-58):**

1. **Fixed the scroll detection condition**:
   - Changed from: `if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight - 10)`
   - Changed to: `if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight)`
   - Removed the erroneous `- 10` from the upper bound calculation

**Why this fixes the issue:**
- The original code had an incorrect offset subtraction that made the activation zone too small
- This caused the "Fale Conosco" section link to never get the 'active' class when scrolling to the contact section
- By removing the extra `- 10`, the activation zone now correctly spans from `(section.offsetTop - navbarHeight - 10)` to `(section.offsetTop - navbarHeight - 10) + section.offsetHeight`
- This ensures that when the user scrolls to a section, the corresponding navbar link gets highlighted with the underline effect

**Technical explanation:**
- `sectionTop = section.offsetTop - navbarHeight - 10` accounts for the fixed navbar height and provides acknavbar height and provides a small buffer
- The section is considered "active" when `pageYOffset` is >= sectionTop AND < sectionTop + sectionHeight
- This creates a smooth transition where the link activates as the section enters the viewport and remains active until the next section enters

**Related memories:**
- [[theme-visibility-fix]] - Fix for carousel controls visibility in both themes
- [[theme-button-visibility]] - Fix for theme button visibility (changing outline classes)
- [[navbar-backdrop-fix]] - Fix for navbar backdrop and responsiveness