# Ad slots and monetization

The app includes **professional ad placeholders** so you can earn revenue from ads or sponsor deals.

## Where ads appear

| Location        | Slot ID             | Size (recommended) | Page(s)                    |
|----------------|---------------------|--------------------|-----------------------------|
| User home      | `user-home-banner`  | 728×90 (banner)    | Dashboard after quick actions |
| My Activity    | `activity-sidebar`  | 300×250 (rectangle)| Activity page sidebar       |
| Footer         | `footer-banner`     | 728×90 (banner)    | All pages (footer)          |

## How to add real ads

### Option 1: Google AdSense

1. Sign up at [Google AdSense](https://www.google.com/adsense).
2. Get your ad unit code (e.g. responsive or fixed size).
3. In `src/components/AdSlot.jsx`, replace the placeholder `<div>` content with your AdSense script or use a wrapper that injects the script for the given `slotId` / `data-ad-slot`.
4. Keep the **"Advertisement"** label visible for compliance.

### Option 2: Direct sponsor / partner deals

1. Replace the placeholder in `AdSlot.jsx` with conditional content: if a sponsor creative (image + link) is provided for that `slotId`, render it; otherwise show the placeholder or nothing.
2. You can pass `slotId` and optional `creative` (e.g. from config or API) so different pages show different partners.

### Option 3: Ad server (e.g. Google Ad Manager)

Use `data-ad-slot` and size to match your ad server’s units, and inject the ad server script in `index.html` or a layout component; the existing slots are already sized and labeled for easy targeting.

## Component usage

```jsx
import AdSlot from "../../components/AdSlot";

// Banner (728×90)
<AdSlot size="banner" slotId="my-banner" />

// Rectangle / sidebar (300×250)
<AdSlot size="rectangle" slotId="my-rect" />
<AdSlot size="sidebar" slotId="my-sidebar" />

// Skyscraper (160×600)
<AdSlot size="skyscraper" slotId="my-skyscraper" />
```

Always keep the **Advertisement** label and comply with your region’s ad disclosure rules.
