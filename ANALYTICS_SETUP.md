# Analytics setup

This site uses Google Analytics 4 through the free GA tag.

## What it can track

- Daily, monthly, yearly, and total page views
- Active users and new users
- Popular pages
- Tool usage events through the `tool_use` event
- Tool name through the `tool_name` event parameter
- Tool action through the `tool_action` event parameter

## Current Google Analytics setup

- Property: `DH Forge Sites`
- Web stream: `DH Forge GitHub Pages`
- Measurement ID: `G-NKGW4MK8DT`
- GitHub Pages and Blogger both use this same measurement ID.
- Free internal dashboard: `https://dhforge.github.io/stats/`

## Where to check stats

- Daily visitors: Google Analytics > Reports > Engagement > Overview
- Page views: Google Analytics > Reports > Engagement > Pages and screens
- Monthly and yearly views: change the date range in the top-right date picker
- Tool usage: Google Analytics > Reports > Engagement > Events > `tool_use`
- Per-tool usage: open the `tool_use` event and inspect `tool_name` and `tool_action`

Data can take several minutes to 24 hours to appear in standard reports.

## Current event names

- Main tools: `char-counter`, `date-calculator`, `unit-converter`, `random-picker`, `qr-generator`, `text-cleaner`, `color-tool`, `timer`, `ratio-calculator`, `image-resizer`
- Paper tools: `graph-paper`, `dot-grid-paper`, `lined-paper`, `cornell-notes`, `handwriting-paper`, `music-staff-paper`, `weekly-planner`, `habit-tracker`, `checklist`, `isometric-paper`
