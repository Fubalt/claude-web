# GetInTouchCTA Specification

## Overview
- **Target file:** `src/components/GetInTouchCTA.tsx`
- **Interaction model:** static, button hover only

## DOM Structure
```
<section (dark bg, py ~81px, mb 80px)>
  <div container (max-width, padding, flex row, space-between, align-center)>
    <div leftContent>
      <h2>GET IN TOUCH</h2>
      <p>If you have questions, need more information, or want to book talent for your project, we are here to help.</p>
    </div>
    <a href="/contact">
      <button>CONTACT US</button>
    </a>
  </div>
</section>
```

## Computed Styles

### Section container
- backgroundColor: rgb(40, 43, 44)   /* #282b2c */
- padding: 81.5px 0px
- marginBottom: 80px

### Inner layout
- display: flex
- flexDirection: row
- justifyContent: space-between
- alignItems: center
- padding: 0 24px
- maxWidth: 1512px
- margin: 0 auto

### Heading (h2)
- fontFamily: "Cassannet Plus"
- fontSize: 39px
- fontWeight: 700
- textTransform: uppercase
- color: rgb(232, 230, 227)

### Body text (p)
- fontFamily: Radikal, sans-serif
- fontSize: 20px
- fontWeight: 250
- color: rgb(232, 230, 227)
- maxWidth: ~600px

### Button
- fontFamily: "Cassannet Plus"
- fontSize: 31px
- fontWeight: 700
- textTransform: uppercase
- color: rgb(232, 230, 227)
- backgroundColor: rgb(0, 0, 0)
- padding: 29.5px 61.5px
- border: none
- cursor: pointer
- display: block
- whiteSpace: nowrap

## States & Behaviors

### Button hover
- backgroundColor: likely rgb(24, 26, 27) or slight highlight
- transition: background-color 0.2s ease

## Text Content (verbatim)
- Heading: "Get in Touch"   (rendered as uppercase via CSS)
- Body: "If you have questions, need more information, or want to book talent for your project, we are here to help."
- Button: "Contact Us"   (rendered as uppercase via CSS)

## Responsive Behavior
- Desktop (1440px): flex row, text left, button right, full width
- Mobile (390px): stacks to column, text on top, button full-width or centered below
- Breakpoint: ~768px
