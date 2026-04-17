# Page Topology — bareface.com

## URL: https://www.bareface.com/
## Page Height: ~2518px (desktop 1440px)

## Layout: Single-column scroll with sticky header

## Section Order (top to bottom)

1. **Header** — fixed/sticky, dark bg, z-index above all content
2. **HeroCarousel** — full viewport width, ~723px tall, Swiper fade carousel
3. **FeaturedCarousel** — model card carousel with "FEATURED" heading
4. **GetInTouchCTA** — dark background section, heading + body + button
5. **InstagramGrid** — 2-row × 6-col grid of IG photos with header
6. **Footer** — social icons, contact info, copyright

## Global Stack
- Framework: Next.js (App Router? or Pages — uses MUI)
- CSS: Material UI (MUI) with custom emotion classes
- Fonts: Radikal (thin), Cassannet Plus (regular + bold) — self-hosted woff2
- No smooth scroll library detected

## Interaction Models
- Header: static (no scroll behavior detected)
- HeroCarousel: time-driven auto-advancing Swiper.js fade carousel
- FeaturedCarousel: click-driven (prev/next buttons), Swiper.js
- GetInTouchCTA: static
- InstagramGrid: static
- Footer: static, hover on links
