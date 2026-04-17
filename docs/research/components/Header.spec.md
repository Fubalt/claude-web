# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** static (no scroll-driven changes)

## DOM Structure
```
<header>
  <div toolbar (flex row, gap 24px, px 24px)>
    <!-- Left group -->
    <button (hamburger menu icon, Material Symbol)>
    <div navIcons>
      <button (search icon, Material Symbol)>
      <a href="/favs" (heart/favorites icon)>
    </div>

    <!-- Center group - desktop nav -->
    <div navDesktop (flex, grows)>
      <nav>
        <button>Models ▾</button>
        <button>Lifestyle ▾</button>
        <button>Cast ▾</button>
        <button>Influencers ▾</button>
        <button>Stylists ▾</button>
        <button>Photographers ▾</button>
      </nav>
      <div socialLinks>
        <a href="https://wa.me/..." aria-label="Whatsapp social link"> (WhatsApp icon) </a>
        <a href="https://www.instagram.com/bareface_model_agency/" aria-label="Instagram social link"> (Instagram icon) </a>
      </div>
    </div>

    <!-- Logo - far right -->
    <a href="/">
      <img src="/images/logo.svg" alt="BareFace Productions" />
    </a>
  </div>
</header>
```

## Computed Styles

### Header container
- backgroundColor: rgb(24, 26, 27)   /* #181a1b */
- height: 70px
- position: relative (not sticky — but sits at top)
- boxShadow: none
- borderBottom: none

### Toolbar (inner flex row)
- display: flex
- alignItems: center
- gap: 24px
- padding: 0px 24px
- height: 64px
- minHeight: 64px

### Nav buttons (desktop)
- fontFamily: "Cassannet Plus"
- fontSize: 15px
- fontWeight: 400
- textTransform: uppercase
- color: rgb(232, 230, 227)   /* #e8e6e3 */
- backgroundColor: transparent
- padding: 5px 0px 5px 5px
- letterSpacing: normal
- cursor: pointer

### Logo image
- src: `/images/logo.svg`
- alt: "BareFace Productions"
- Positioned at far right of toolbar

## States & Behaviors

### Nav dropdown
- Each nav button has a ▾ chevron indicating dropdown exists
- On hover: likely shows submenu (not extracted — out of scope for homepage clone)
- Interaction model: click-to-open dropdown

### Hover states
- Nav buttons: color changes on hover (likely slight opacity)
- Social icon links: slight opacity change on hover

## Assets
- Logo: `public/images/logo.svg`
- Icons: Material Symbols font (search, menu/hamburger, favorite/heart)
- Social icons: SVG inline icons for WhatsApp and Instagram (use Lucide React or inline SVG)

## Text Content
Nav items: Models | Lifestyle | Cast | Influencers | Stylists | Photographers
Social: WhatsApp link: https://wa.me/+971505919770?text=Ask+us+anything
Instagram link: https://www.instagram.com/bareface_model_agency/

## Responsive Behavior
- Desktop (1440px): full horizontal layout as described
- Mobile (390px): hamburger menu shown, desktop nav hidden, logo visible
- The `.mui-86990p-navMobile` div handles mobile (hidden on desktop)
