# Analytics setup

This site is prepared for Google Analytics 4, but tracking is off until a real measurement ID is added.

## What it can track

- Daily, monthly, yearly, and total page views
- Active users and new users
- Popular pages
- Tool usage events through the `tool_use` event
- Tool name through the `tool_name` event parameter
- Tool action through the `tool_action` event parameter

## Enable Google Analytics

1. Create a free Google Analytics 4 property.
2. Add a Web data stream for `https://dhforge.github.io/`.
3. Copy the Measurement ID. It looks like `G-XXXXXXXXXX`.
4. Open `analytics.js`.
5. Replace the empty value:

```js
const DHFORGE_GA_MEASUREMENT_ID = "";
```

with the real ID:

```js
const DHFORGE_GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

6. Commit and push the change.

## Where to check stats

- Daily visitors: Google Analytics > Reports > Engagement > Overview
- Page views: Google Analytics > Reports > Engagement > Pages and screens
- Monthly and yearly views: change the date range in the top-right date picker
- Tool usage: Google Analytics > Reports > Engagement > Events > `tool_use`
- Per-tool usage: open the `tool_use` event and inspect `tool_name` and `tool_action`

## Current event names

- Main tools: `char-counter`, `date-calculator`, `unit-converter`, `random-picker`, `qr-generator`, `text-cleaner`, `color-tool`, `timer`, `ratio-calculator`, `image-resizer`
- Paper tools: `graph-paper`, `dot-grid-paper`, `lined-paper`, `cornell-notes`, `handwriting-paper`, `music-staff-paper`, `weekly-planner`, `habit-tracker`, `checklist`, `isometric-paper`
