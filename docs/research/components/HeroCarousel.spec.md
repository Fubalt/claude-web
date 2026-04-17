# HeroCarousel Specification

## Overview
- **Target file:** `src/components/HeroCarousel.tsx`
- **Interaction model:** time-driven auto-advancing fade carousel (Swiper.js on the original)

## DOM Structure
```
<section (full-width, 723px tall, relative)>
  <div overlay>
    <div swiper-container (fade effect, horizontal)>
      <div swiper-wrapper>
        <!-- 13 slides, each: -->
        <div swiper-slide>
          <img (cover fill, object-fit: cover) />
        </div>
      </div>
    </div>
  </div>
  <!-- Scroll-down arrow button, centered at bottom -->
  <button (absolute, bottom 45px, centered x, 50px circle, transparent bg, border 1px solid white)>
    ↓ (chevron down icon)
  </button>
</section>
```

## Computed Styles

### Section container
- width: 100vw (1440px)
- height: 722.945px  (≈ calc(100vh - 64px) — viewport height minus header)
- position: relative
- overflow: visible

### Swiper slide / image
- width: 100%
- height: 100%
- objectFit: cover
- display: block

### Scroll-down button
- position: absolute
- bottom: 45px
- left: 50%
- transform: translateX(-50%)
- width: 50px
- height: 50px
- borderRadius: 50%
- border: 1px solid rgb(232, 230, 227)
- backgroundColor: transparent
- color: rgb(232, 230, 227)
- cursor: pointer

## States & Behaviors

### Auto-advance
- Swiper auto-plays with fade transition between slides
- Transition: opacity fade, ~600ms
- Autoplay delay: ~4000ms (typical)
- Loop: true

### Scroll-down button
- Clicking scrolls page down to next section
- Use `window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })`

## Assets (hero images)
Use these local paths after download:
- `/images/hero/052.jpg`
- `/images/hero/053.jpg`
- `/images/hero/044.jpg`
- `/images/hero/054.jpg`
- `/images/hero/058.jpg`
- `/images/hero/038.jpg`
- `/images/hero/055.jpg`

All images: people/models in various fashion shoots.
Alt text for all: "Intro image for BareFace Productions"

## Implementation Notes
- Use `swiper` npm package with `EffectFade`, `Autoplay`, `A11y` modules
- OR implement a simple CSS-based fade carousel with `useEffect` / `setInterval`
- The simpler approach: CSS `opacity` transition with `setInterval(4000)`
- Install: `npm install swiper` if using Swiper

## Responsive Behavior
- Desktop (1440px): full width, height ~calc(100vh - 70px)
- Mobile (390px): same full width, height auto-adjusts to viewport
- Images always cover the full container
