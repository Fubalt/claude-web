# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** static, hover on links

## DOM Structure
```
<footer>
  <div container (flex column, align center, gap ~16px, py ~40px)>
    <!-- Social icons row -->
    <div socialRow (flex, gap ~16px, align center)>
      <a href="https://wa.me/+971505919770" aria-label="Whatsapp"> (WhatsApp icon) </a>
      <a href="https://www.instagram.com/bareface_model_agency/"> (Instagram icon) </a>
      <a href="..."> (Facebook icon) </a>
      <a href="..."> (YouTube icon) </a>
      <a href="..."> (LinkedIn icon) </a>
      <a href="..."> (TikTok icon) </a>
    </div>

    <!-- Contact info row -->
    <div contactRow (flex, gap ~24px, align center, flex-wrap)>
      <a href="mailto:hello@bareface.com">hello@bareface.com</a>
      <span>+971 50 591 9770</span>
      <span>Building 10 (BBC Bldg), Office 312, Dubai Media City, UAE</span>
      <a href="/terms">Terms & Conditions</a>
    </div>

    <!-- Copyright -->
    <p>Copyright © 2026 BareFace Productions. All Rights Reserved. Powered by Mainboard.</p>
  </div>
</footer>
```

## Computed Styles

### Footer container
- backgroundColor: rgb(24, 26, 27)   /* #181a1b — same as header */
- padding: ~40px 24px
- textAlign: center

### Social icon links
- color: rgb(232, 230, 227)
- fontSize: ~24px (icons)
- opacity: 1 → 0.7 on hover

### Contact text / links
- fontFamily: Radikal, sans-serif
- fontSize: ~14px
- color: rgb(232, 230, 227)
- Links: underline on hover

### Copyright text
- fontFamily: Radikal, sans-serif
- fontSize: ~13px
- color: rgb(232, 230, 227)
- opacity: ~0.7

## Social Links
- WhatsApp: https://wa.me/+971505919770?text=Ask+us+anything
- Instagram: https://www.instagram.com/bareface_model_agency/
- Facebook: (use # as placeholder)
- YouTube: (use # as placeholder)
- LinkedIn: (use # as placeholder)
- TikTok: (use # as placeholder)

## Text Content (verbatim)
- hello@bareface.com
- +971 50 591 9770
- Building 10 (BBC Bldg), Office 312, Dubai Media City, UAE
- Terms & Conditions
- Copyright © 2026 BareFace Productions. All Rights Reserved. Powered by Mainboard.

## Icons
Use Lucide React icons:
- WhatsApp → MessageCircle (or custom SVG)
- Instagram → Instagram
- Facebook → Facebook
- YouTube → Youtube
- LinkedIn → Linkedin
- TikTok → use a simple "T" shaped SVG or Music2 icon

## Responsive Behavior
- All viewports: centered, stacks to column, same content
