# FeaturedCarousel Specification

## Overview
- **Target file:** `src/components/FeaturedCarousel.tsx`
- **Interaction model:** click-driven carousel (prev/next arrow buttons)

## DOM Structure
```
<section (maxWidth 1512px, padding 0 24px)>
  <!-- Header row -->
  <div headingContainer (flex, between, align center)>
    <h3>FEATURED</h3>
    <div navigationWrapper (flex, gap, align center)>
      <button (icon: chevron-left / arrow-left)>
      <button (icon: chevron-right / arrow-right)>
    </div>
  </div>

  <!-- Carousel -->
  <article (overflow hidden)>
    <div swiper (horizontal, overflow visible)>
      <div swiper-wrapper (flex, gap between cards)>
        <!-- 11 model cards: -->
        <div swiper-slide>
          <div card>
            <div cardContent (relative)>
              <img (254px × 318px, objectFit cover, aspect ratio 4:5) />
              <!-- Hover overlay -->
              <div cardHoverContent (absolute, inset 0, opacity 0 → 1 on hover)>
                <div grid>
                  <a href="/models/...">Portfolios</a>
                  <a href="/models/...">Models</a>
                </div>
              </div>
            </div>
            <div cardFooter>
              <div textContainer>
                <div>MODEL NAME</div>  <!-- e.g. "Alicia" -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</section>
```

## Computed Styles

### Section container
- maxWidth: 1512px
- padding: 0px 24px
- backgroundColor: transparent
- margin: 0 auto

### Heading (h3)
- fontFamily: "Cassannet Plus"
- fontSize: 31px
- fontWeight: 700
- textTransform: uppercase
- color: rgb(232, 230, 227)

### Card image
- width: ~254px (fills slide width)
- height: ~318px
- objectFit: cover
- aspectRatio: 0.8 (≈ 4:5)

### Card name text
- fontFamily: Radikal, sans-serif
- fontSize: 16px
- fontWeight: 250  (ultra-light/thin)
- color: rgb(232, 230, 227)
- textTransform: none

### Navigation arrows
- Large icon buttons
- color: rgb(232, 230, 227)
- backgroundColor: transparent
- border: none

## States & Behaviors

### Card hover overlay
- State A: `cardHoverContent` opacity: 0, invisible
- State B (hover): opacity: 1, shows "Portfolios" and "Models" links
- Transition: opacity ~0.2s ease

### Carousel navigation
- Prev/Next buttons advance the swiper by a few slides
- Shows 5-6 cards at once on desktop (cards are ~254px wide + gap)

## Model Card Data
```
{ name: "Alicia",  href: "/models/women/3013298/alicia-r",  img: "/images/featured/alicia.jpg" }
{ name: "Ape",     href: "/models/men/3028361/ape-f",       img: "/images/featured/ape.jpg" }
{ name: "Bianca",  href: "/models/women/3013505/bianca-p",  img: "/images/featured/bianca.jpg" }
{ name: "Camila",  href: "/models/women/2972695/camila-r",  img: "/images/featured/camila.jpg" }
{ name: "Cezar",   href: "/models/men/3028402/cezar-d",     img: "/images/featured/cezar.jpg" }
{ name: "Izzy",    href: "/models/women/2972694/izzy-y",    img: "/images/featured/izzy.jpg" }
{ name: "Luana",   href: "/models/women/2970431/luana-c",   img: "/images/featured/luana.jpg" }
{ name: "Nathan",  href: "/models/men/2970992/nathan-n",    img: "/images/featured/nathan.jpg" }
{ name: "Van",     href: "/models/women/3013512/van-k",     img: "/images/featured/van.jpg" }
{ name: "Vanessa", href: "/models/women/2971931/vanessa-k", img: "/images/featured/vanessa.jpg" }
{ name: "Vitoria", href: "/models/women/2971907/vitoria-a", img: "/images/featured/vitoria.jpg" }
```

## Implementation Notes
- Use `swiper` npm package for the carousel (already used on the original)
- Alternatively: simple overflow-x scroll with prev/next buttons controlling scrollLeft
- Preferred: install `swiper` and use `<Swiper>` component with Navigation module
- slidesPerView: ~5.5 on desktop, auto on mobile

## Responsive Behavior
- Desktop (1440px): ~5-6 cards visible, horizontal scroll
- Mobile (390px): 1-2 cards visible, same scroll behavior
- Cards maintain aspect ratio at all breakpoints
