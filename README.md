# HNG Stage 1a – Advanced Todo Card

## Project Overview
A fully accessible, responsive, interactive Todo Card built with **vanilla HTML, CSS, and JavaScript**.  
This extends my Stage 0 Todo Card by adding:
- Edit mode (inline form to edit title, description, priority, due date)
- Status controls (Pending / In Progress / Done)
- Priority indicator (visual dot/bar)
- Expand / collapse behavior for long descriptions
- Dynamic time remaining (granular: minutes/hours/days) + overdue indicator
- Full keyboard navigation and ARIA accessibility

## Live URL
[View the live project](check repo url section)  


## GitHub Repository
[Source code on GitHub](https://github.com/Jhay-Tee/HNG_TODO)  


## What changed from Stage 0
- Added edit form with Save/Cancel and focus management
- Added status dropdown that syncs with checkbox and visual badge
- Added priority indicator (colored bar) that changes with priority level
- Added expand/collapse toggle for description with ARIA attributes
- Replaced static due date with dynamic countdown (updates every 30 seconds)
- Added overdue badge when due date passes
- Enhanced responsiveness for mobile/tablet/desktop
- Improved accessibility: `aria-live`, `aria-expanded`, focus outlines, keyboard tab order

## New design decisions
- **Dark mode** styling (black background, white text) for better contrast and visual comfort.
- Priority indicator uses a **full-width colored bar** (Low = green, Medium = orange, High = red) – easy to scan.
- Status badges have distinct colors and the "Done" state adds strikethrough on title.
- The edit form **stacks vertically on mobile** and returns focus to Edit button after Save/Cancel.
- Time remaining shows granular strings like *"Due in 2 days"*, *"Due in 3 hours"*, *"Overdue by 1 hour"*.
- Expand/collapse is **disabled initially** (collapsed) and toggles with a button that changes text.

## Accessibility notes
- All interactive elements are keyboard-focusable with visible focus outlines.
- Edit form fields have associated `<label>` elements.
- Expand toggle uses `aria-expanded` and `aria-controls`.
- Time remaining uses `aria-live="polite"` so screen readers announce updates.
- Color contrast meets WCAG AA (tested with dark background + light text).
- After Save/Cancel, focus returns to the Edit button for smooth keyboard flow.
- Delete button includes a confirmation dialog to prevent accidental resets.

## Known limitations
- The "Delete" button resets the todo to default demo data (not a full delete from a list) because the spec only requires a single card, not a full app.
- The due date picker uses `datetime-local`
- Time updates every 30 seconds (as recommended in spec: 30–60 seconds). The "Completed" state stops updates.
- Expand/collapse uses `display: none` on collapsed state – content is hidden from screen readers when collapsed, but the button still indicates expandable. This meets the requirement.
