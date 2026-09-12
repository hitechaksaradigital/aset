---
name: Precision Enterprise Asset Architecture
colors:
  surface: '#f9f9ff'
  surface-dim: '#c6dbff'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d4e3ff'
  on-surface: '#001c3a'
  on-surface-variant: '#464650'
  inverse-surface: '#00315e'
  inverse-on-surface: '#ebf1ff'
  outline: '#777681'
  outline-variant: '#c7c5d2'
  surface-tint: '#55589c'
  primary: '#010025'
  on-primary: '#ffffff'
  primary-container: '#121358'
  on-primary-container: '#7d7fc7'
  inverse-primary: '#c0c1ff'
  secondary: '#4e599e'
  on-secondary: '#ffffff'
  secondary-container: '#a6b1fd'
  on-secondary-container: '#364285'
  tertiary: '#000605'
  on-tertiary: '#ffffff'
  tertiary-container: '#002320'
  on-tertiary-container: '#08968d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#0f1056'
  on-primary-fixed-variant: '#3d4083'
  secondary-fixed: '#dee0ff'
  secondary-fixed-dim: '#bbc3ff'
  on-secondary-fixed: '#031158'
  on-secondary-fixed-variant: '#354185'
  tertiary-fixed: '#86f5ea'
  tertiary-fixed-dim: '#69d8cd'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#00504b'
  background: '#f9f9ff'
  on-background: '#001c3a'
  surface-variant: '#d4e3ff'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  data-metric:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  data-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-compact: 0.5rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system serves mission-critical Enterprise Asset Management (EAM), where operational continuity, physical infrastructure tracking, and massive telemetry streams intersect. The design language marries the technical rigor and precision of modern developer tools with the scale and architectural permanence demanded by industrial asset governance.

The aesthetic philosophy balances modern enterprise SaaS clarity with high-density utility:
- **Structural Integrity:** Heavy reliance on low-contrast structural grids, deliberate data borders, and crisp containment boundaries rather than amorphous floating blocks.
- **Actionable Hierarchy:** Pure functional color placement where deep structural blues establish institutional authority, and vibrant teal signals operational status, live assets, and confirmed actions.
- **Information Density:** Optimized for high-throughput scanning across deep asset hierarchies, work orders, preventative maintenance schedules, and sensory telemetry without visual fatigue.
- **Predictable Demarcation:** Rigid visual geometry paired with refined tabular typography delivers a professional, indestructible enterprise workstation feel.

## Colors

The color architecture is built around an authoritative deep nautical spectrum anchored by Dark Navy, layered through Royal Blue, and energized by high-visibility Mint Teal highlights.

### System Palette Implementation

- **Primary (`#121358`):** Deep Navy. Applied to primary navigational frames, dominant typography headers, definitive interactive triggers, and high-level structural nodes.
- **Secondary (`#232F72`):** Royal Blue. Serves as surface layering for sub-navigation, active state fills, grouped table headers, and focused item boundaries.
- **Accent Slate (`#2F578A`):** Used for metadata labels, passive iconography, structural dividers, and secondary interactive borders.
- **Highlight Teal (`#36ADA3`):** Precision Mint Teal. High-contrast accent reserved strictly for active asset health states, successful completions, primary toggles, telemetry delta spikes, and micro-metric badges.
- **Neutral & Surface Hierarchy:**
  - Base Canvas: `#F4F6F9` (Cool industrial mist).
  - Primary Surface / Cards: `#FFFFFF` (Crisp technical white).
  - Surface Subdued / Metric Wells: `#EBF0F5` (Engineered slate-gray).
  - Border Subdued: `#D5DEE7` (Precision hair-line divider).
  - High-Contrast Text: `#0B0C32` (Deep navy ink).
  - Subdued Text: `#4A5E78` (Balanced industrial gray-blue).

## Typography

The typography pairs **Hanken Grotesk** for clean, low-distortion UI reading with **JetBrains Mono** for asset tags, serial numbers, operational readouts, and status codes.

- **Tabular Alignment:** All numerical listings, counts, IDs, and financial metrics utilize tabular figures (`tnum`) to ensure total vertical scan efficiency in dense data grids.
- **Label Discipline:** Labels use medium and semi-bold weights with subtle tracking to remain distinct even at 11px and 12px scales in multi-layered asset trees.
- **Hierarchy Rules:** Large display scales are restricted to dashboard KPIs and summary overview hubs; core operational views cap title sizes at `headline-md` (20px) to maximize above-the-fold screen real estate.

## Layout & Spacing

This design system uses a technical, grid-constrained fluid layout designed for desktop workstations while gracefully consolidating onto ruggedized tablet viewports.

### Grid & Canvas Structure
- **Master Desktop Shell:** Standard 12-column layout with a fixed 240px primary navigation rail and optional 320px contextual inspector panel. Content area utilizes fluid percentage columns with `1rem` (16px) gutters.
- **Compact Density Mode:** Data grids and inspection tables drop gutters to `0.5rem` (`gutter-compact`) and padding to `space-xs` and `space-sm` for high-volume maintenance logs.
- **Breakpoints:**
  - `Desktop Expanded (1440px+)`: Full multi-pane work order workspace (Tree Navigation + Data Table + Detail Panel).
  - `Desktop Standard (1024px - 1439px)`: Split-pane layout with collapsable context inspector.
  - `Tablet / Ruggedized Field Displays (768px - 1023px)`: 8-column layout, bottom or slide-over inspection views.
  - `Mobile Handheld (<768px)`: 4-column linear reflow; tabular data transforms into stacked metric cards.

## Elevation & Depth

Visual separation is governed by **crisp outlines and tonal containment** rather than heavy drop shadows, preserving an engineered, technical CAD/SaaS aesthetic.

- **Surface Tiers:**
  - *Tier 0 (Canvas):* `#F4F6F9` base background.
  - *Tier 1 (Panels & Master Cards):* `#FFFFFF` bounded by `1px solid #D5DEE7`.
  - *Tier 2 (Recessed Surfaces & Sub-tables):* `#EBF0F5` with inset crisp boundaries.
  - *Tier 3 (Modals, Overlays & Drawers):* `#FFFFFF` with `0 8px 24px -4px rgba(18, 19, 88, 0.12)`, reinforced by a `1px solid #2F578A` perimeter border.
- **Low-Contrast Technical Outlines:** Structural borders use `#D5DEE7` across unselected items, transitioning to `#2F578A` on hover and `#121358` on selection.
- **Zero-Shadow Default:** Tables, buttons, and stat cells sit completely flat, using 1px border lines to enforce structure without blurred visual noise.

## Shapes

The design system operates strictly on **Soft Geometry (`roundedness: 1`)**. Rounded corners are kept small and architectural to preserve structural alignment across dense UI matrices.

- **Base Components (Inputs, Buttons, Cells):** `0.25rem` (4px) corner radius. Keeps edges crisp and visually aligned across vertical form stacks.
- **Cards & Data Panels (`rounded-lg`):** `0.5rem` (8px) corner radius. Provides just enough curvature to separate modular components without wasting inner corner margins.
- **Structural Drawers & Modals (`rounded-xl`):** `0.75rem` (12px) corner radius.
- **Status Indicator Badges & Pills:** Retain small `4px` radii rather than full pills to sustain the technical, instrumentation-board character.

## Components

### Buttons & Interactive Controls
- **Primary Action:** Solid `#121358` background, `#FFFFFF` text, `4px` radius, `0.25rem 0.75rem` padding. Subtle hover shift to `#232F72`. Focus rings utilize a double-line offset with `#36ADA3`.
- **Secondary Action:** Transparent background, `1px solid #D5DEE7`, `#121358` label. Hover transitions to `#EBF0F5` background and `#2F578A` border.
- **Operational / Success Action:** Solid `#36ADA3` background with white text, deployed solely for active run-state confirmations and verified completions.

### Metric Cards & Stat Widgets
- Pure `#FFFFFF` surface with `1px solid #D5DEE7` perimeter.
- Top section holds `label-sm` in `#4A5E78` accompanied by an optional micro sparkline.
- Main value features `data-metric` typography in `#121358`.
- Trend indicators sit within an inline badge: positive shifts in `#36ADA3` tint (`#36ADA3` at 10% opacity background, solid `#1C7C74` text).

### Data Tables & Asset Logs
- **Header:** Height fixed at `36px`, background `#F4F6F9`, text `label-sm` in `#2F578A`, uppercase tracking, border-bottom `1px solid #D5DEE7`.
- **Rows:** Alternating subtle row striping optional; standard height `40px` (dense) to `48px` (standard). Row borders use `#EBF0F5`.
- **Selected State:** Background `#EBF0F5`, reinforced with an active left indicator border in `3px solid #36ADA3`.

### Status Badges & Telemetry Chips
- Rendered in `label-sm` with `JetBrains Mono` font for numeric thresholds.
- Shape is `4px` rounded box with `2px 6px` internal padding.
- Operational States:
  - *Online / Active:* Teal background (`#E6F7F5`), border `1px solid #A4E2DC`, text `#15635C`.
  - *Maintenance / Standby:* Slate background (`#EEF2F6`), border `1px solid #BAC9D9`, text `#232F72`.
  - *Critical Fault:* Coral-crimson background (`#FDF2F2`), border `1px solid #F8B4B4`, text `#9B1C1C`.

### Form Inputs & Selectors
- Height locked to `36px` to harmonize with data grids.
- Background `#FFFFFF`, border `1px solid #D5DEE7`, typography `body-md`.
- Focus state activates `1px solid #232F72` along with a 2px outer glow ring in `#36ADA3` at 25% opacity.
- Integrated monospace unit suffixes (e.g., `PSI`, `RPM`, `°C`) pinned to the right edge with a `#EBF0F5` structural separator.