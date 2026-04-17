# InstagramGrid Specification

## Overview
- **Target file:** `src/components/InstagramGrid.tsx`
- **Interaction model:** static grid of images

## DOM Structure
```
<section>
  <!-- Header row -->
  <div instagramBox (flex, space-between, px 24px, py ~16px)>
    <p>@bareface_model_agency</p>
    <h3>INSTAGRAM</h3>
  </div>

  <!-- Grid: 6 columns × 2 rows = 12 images -->
  <div MuiGrid2 (grid, 6 cols on desktop, 2 cols on mobile)>
    <!-- 12 items: -->
    <div gridItem>
      <a href="https://www.instagram.com/bareface_model_agency/">
        <img src="..." alt="..." (square, objectFit cover) />
      </a>
    </div>
    <!-- × 12 -->
  </div>
</section>
```

## Computed Styles

### Section
- backgroundColor: transparent (inherits page bg)
- padding: 0px

### Header row (instagramBox)
- display: flex
- justifyContent: space-between
- alignItems: center
- padding: 0px 24px
- paddingBottom: ~16px

### Handle text (@bareface_model_agency)
- fontFamily: Radikal, sans-serif
- fontSize: ~16px
- color: rgb(232, 230, 227)

### "INSTAGRAM" label
- fontFamily: "Cassannet Plus"
- fontSize: ~31px
- fontWeight: 700
- textTransform: uppercase
- color: rgb(232, 230, 227)

### Grid
- display: grid
- gridTemplateColumns: repeat(6, 1fr)
- gap: 0px (no gap — images are flush)
- width: 100%

### Grid images
- width: 100%
- aspectRatio: 1/1 (square)
- objectFit: cover
- display: block

## States & Behaviors

### Image hover
- cursor: pointer
- Likely slight opacity on hover

## Assets
Since Instagram CDN URLs expire, use placeholder images for the grid.
Use these local downloaded images if available, otherwise use next/image with the CDN URLs.
Total: 12 images in a 6×2 grid.
All images link to: https://www.instagram.com/bareface_model_agency/

## Text Content (verbatim)
- Handle: "@bareface_model_agency"
- Label: "Instagram" (rendered uppercase by CSS)

## Responsive Behavior
- Desktop (1440px): 6 columns
- Tablet (768px): 3-4 columns
- Mobile (390px): 2 columns (as per MuiGrid2-grid-xs-6 = 6/12 = 50% = 2 cols)
- Images always square
