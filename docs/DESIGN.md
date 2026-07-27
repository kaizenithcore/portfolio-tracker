# Acervo — Brand & Design System
> the private cellar, lit at night
> Editorial serif numbers glow ivory on near-black, like a wine list held up to candlelight — restrained, unhurried, worth trusting with something valuable.

**Theme:** dark-first (brand/marketing surfaces), with a warm "Paper" surface for working app screens

---

## 0. Brand

**Name:** Acervo — Spanish for an accumulated collection of value (cultural, patrimonial). Chosen over "Portfolio Tracker" because it names *what the product is for* without borrowing financial-advisory vocabulary, and it means the same thing whether the collection is bottles, watches, or paintings.

**What Acervo is:** a place to register what you own and see what it's honestly worth, one category at a time. Wine is the first vertical, not the whole product — the name never had to change to fit that.

**What Acervo is not:** an investment platform. This is the one hard line in this document. Vinovest is our closest visual reference and it is also an EAFI-style wine investment advisor — annualized returns, "personalized portfolio creation," language explicitly ruled out for this product (see `CLAUDE.md` §Constraints). We borrow their *material* — black canvas, editorial serif numerals, restraint — and none of their *voice*. No "annualized return," no "invest," no personalized recommendation copy, ever.

**Vertical framing:** Wine is signaled quietly — a small "Vino" tag beside the wordmark — not narrated. The product doesn't announce a roadmap to visitors who came to value their Rioja; it just doesn't paint itself into a wine-only corner either.

**Voice:** direct, quiet confidence. States what it knows and what it doesn't (confidence levels are a voice decision as much as a data one). Never sells; informs.

---

## 1. Tokens — Colors

Two surface registers, not a light/dark toggle: **Ink** is the brand register (marketing hero, nav, footer, empty states) — near-black with warm ivory ink, editorial-gallery mode. **Paper** is the working register (dashboard, collection, forms) — a warm off-white where dense real data (tables, forms, numbers people are trusting) stays comfortable to read for minutes at a time, not seconds. Both share the same single accent and the same type system; nothing about them should read as two different products.

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ink | `#0e0d0c` | `--color-ink` | Primary dark canvas — hero, nav, footer, brand-forward sections |
| Ink Elevated | `#1b1917` | `--color-ink-elevated` | Card/panel surface on top of Ink — one step up, never a shadow |
| Paper | `#f7f3ea` | `--color-paper` | Primary working-app canvas — dashboard, collection, forms |
| Paper Elevated | `#ffffff` | `--color-paper-elevated` | Card/panel surface on top of Paper |
| Ivory | `#f3ead9` | `--color-ivory` | Primary text and icon color on Ink surfaces — warm, never pure white |
| Charcoal | `#171310` | `--color-charcoal` | Primary text on Paper surfaces — warm near-black, never pure `#000` |
| Stone | `#6e6355` | `--color-stone` | Muted/secondary text on Paper — captions, helper text, placeholders |
| Stone Light | `#a79c89` | `--color-stone-light` | Muted/secondary text on Ink — same role, lifted for dark contrast |
| Hairline on Paper | `rgba(23,19,16,0.10)` | `--color-hairline` | Card borders, dividers, input borders on Paper |
| Hairline on Ink | `rgba(243,234,217,0.14)` | `--color-hairline-ink` | Card borders, dividers on Ink |
| Garnet | `#7a1f3b` | `--color-garnet` | The one accent. Filled primary buttons on Paper, links, focus rings, active states |
| Garnet Bright | `#c1516e` | `--color-garnet-bright` | Garnet lifted for contrast on Ink — ghost-button borders/text, links on dark |

### Status (confidence levels — semantic, not brand)

Kept deliberately warmer/earthier than a generic traffic-light so they sit inside the palette instead of fighting it, but the hue logic (green → amber → rust) still reads instantly.

| Level | Light text | Light tint bg | Dark text | Dark tint bg |
|-------|-----------|---------------|-----------|-------------|
| Alto (good) | `#4b6b3a` | `#e8edE0` | `#9cc17e` | `rgba(156,193,126,0.16)` |
| Medio (warning) | `#8a5a17` | `#f3e7d2` | `#e0b368` | `rgba(224,179,104,0.16)` |
| Bajo (serious) | `#8a3420` | `#f3dfd8` | `#e08b6e` | `rgba(224,139,110,0.16)` |

**These never substitute for Garnet and Garnet never substitutes for them.** A confidence badge is state, not brand — see Do's & Don'ts.

### Data-visualization colors — out of scope here

Chart series colors (region breakdown, future analytics) are **not** brand tokens — they come from the `dataviz` skill's validated CVD-safe categorical palette and must be re-validated with `scripts/validate_palette.js` whenever slots change. Do not reach for Garnet or Ivory to color a chart series; do not reach for the categorical chart palette to color UI chrome. The two systems are intentionally decoupled.

---

## 2. Tokens — Typography

Two families, strict division of labor: the serif is a *brand instrument*, not a body font. If you're tempted to set a table cell, a form label, or a button in Fraunces, use the sans instead.

### Fraunces — Editorial display serif for brand moments only: the hero headline, section headings on marketing surfaces, and the one hero number on the dashboard (total portfolio value). Soft, warm, closer to Roslindale than to a classical serif — this is what makes a page feel like a private cellar list instead of a spreadsheet. · `--font-fraunces`
- **Source:** `@fontsource-variable/fraunces` (self-hosted, variable — optical size + weight axes)
- **Weights used:** 400 (Regular) for body-of-display, 380 (soft/light) for the largest hero sizes when available
- **Sizes:** 28px, 40px, 56px, 72px
- **Line height:** 1.0–1.15 (tighter as size grows)
- **Letter spacing:** -0.01em to -0.02em at display sizes, normal below 40px
- **Role:** Brand-forward numerals and headlines exclusively — never UI chrome, never body copy, never a button label

### Geist Variable — UI sans for everything else: nav, buttons, forms, tables, body copy, captions. Already the project's installed font (`@fontsource-variable/geist`) — no change needed here, just a stricter job description. · `--font-sans`
- **Weights:** 400 (body), 500 (labels, emphasis), 600 (nav/section labels, buttons)
- **Sizes:** 13px, 14px, 15px, 16px, 20px
- **Line height:** 1.3–1.6 (tighter for labels, looser for paragraphs)
- **Letter spacing:** 0.02em uppercase for kicker/section labels only; normal everywhere else

### Type Scale

| Role | Font | Size | Line Height | Weight | Token |
|------|------|------|-------------|--------|-------|
| caption | Geist | 13px | 1.4 | 400 | `--text-caption` |
| body | Geist | 15px | 1.55 | 400 | `--text-body` |
| ui-label | Geist | 14px | 1.3 | 500 | `--text-ui-label` |
| kicker | Geist | 13px | 1.3 | 600, uppercase, 0.02em | `--text-kicker` |
| subheading | Geist | 20px | 1.4 | 500 | `--text-subheading` |
| heading | Fraunces | 28px | 1.2 | 400 | `--text-heading` |
| heading-lg | Fraunces | 40px | 1.12 | 400 | `--text-heading-lg` |
| display | Fraunces | 56–72px | 1.02 | 380–400 | `--text-display` |

---

## 3. Tokens — Spacing & Shapes

**Base unit:** 4px · **Density:** app screens (dashboard/collection/forms) stay comfortable-not-spacious — this is a working tool; marketing surfaces (landing) get the generous gallery gaps.

### Border Radius

| Element | Value | Note |
|---------|-------|------|
| primary buttons (marketing, on Ink) | 999px (pill) | ghost style, per Do's & Don'ts |
| primary buttons (in-app, on Paper) | 999px (pill) | filled Garnet — see §5 for why filled here and ghost there |
| secondary buttons | 10px | |
| cards, inputs, dialogs | 10px | unchanged from current shadcn `--radius` — no need to churn every component |
| badges/pills (confidence, tags) | 999px | |
| hero/image blocks | 12px | |

### Layout

- **Marketing page max-width:** 1180px
- **Marketing section gap:** 96px desktop / 56px mobile
- **App content max-width:** 1024px (unchanged — this is a tool, not a scroll-story)
- **Card padding:** 20px
- **Element gap:** 12–16px

---

## 4. Components

### Wordmark Lockup
**Role:** Primary brand identifier — nav, footer, auth pages

`ACERVO` in Geist 600, 15px, letter-spacing 0.04em, uppercase, Ivory on Ink / Charcoal on Paper. Immediately followed by a small "Vino" pill tag — Geist 500 12px, Garnet Bright text, 1px Garnet Bright border, 999px radius, ~6px/10px padding — sitting at half the wordmark's cap-height so it reads as a category tag, not a second brand.

### Hero Display Number
**Role:** The one moment the serif gets to be huge — hero headline on the landing, and the total-portfolio-value figure on the dashboard

Fraunces 380–400, 56–72px on marketing / 40px on the dashboard stat, line-height ~1.05, Ivory on Ink or Charcoal on Paper, tabular-adjacent (Fraunces doesn't need `tabular-nums` forced — its figures are already even-width enough at display sizes). This is the single element per screen allowed at display scale — never two.

### Ghost Pill Button (Marketing Primary Action)
**Role:** Landing hero / marketing CTAs — "Crear cuenta gratis" on the Ink hero

Transparent fill, 1px Ivory border on Ink (or 1px Charcoal border on Paper marketing sections), Ivory/Charcoal text, 999px radius, ~12px vertical / 24px horizontal padding, Geist 600 14px. Hover inverts to filled.

### Filled Pill Button (In-App Primary Action)
**Role:** Task-completion actions inside the working app — "Añadir botella", "Guardar cambios", "Crear cuenta" submit

Garnet fill, Ivory text, 999px radius, same padding as the ghost variant, Geist 600 14px. Hover darkens Garnet ~8%. This is a deliberate departure from the all-ghost reference systems: Custo and Aker are galleries where nothing needs to be clicked urgently; Acervo's app screens have real task completion (submit a form, confirm a purchase-value entry) that benefits from a clear filled affordance. Ghost stays reserved for brand/marketing moments.

### Confidence Badge
**Role:** The product's honesty mechanism — must never be visually subordinate to decoration

999px pill, 4px/10px padding, Geist 500 13px, status color pair from §1 (text + tint background, never Garnet). Optional tooltip on hover carries the rationale sentence. This component's contract doesn't change with the rebrand — only its exact hex values move to the status table above.

### Kicker Label
**Role:** Small overline preceding a marketing section heading — "Cómo funciona", "Una muestra de nuestro catálogo"

Geist 600, 13px, uppercase, letter-spacing 0.02em, Stone/Stone Light, sits 8px above the Fraunces heading it introduces.

### Section Divider (Ink ↔ Paper)
**Role:** The seam between a brand-forward band and a working-app or content band

No gradient, no shadow — a hard cut between Ink and Paper (or Paper and Ink), exactly like Custo's gunmetal/white alternation. If a hairline is needed at the seam, it's `--color-hairline-ink` on the Ink side of the cut.

### Stat Row
**Role:** Small inline metrics under the hero number — "3 botellas · 1 referencia" style secondary stats

Geist 400, 14–15px, Stone/Stone Light, separated by a middle-dot (`·`), never boxed, never colored — pure supporting text under the one Fraunces hero number.

---

## 5. Do's and Don'ts

### Do
- Reserve Fraunces for exactly one element per screen at display scale — the marketing headline, or the dashboard's total-value figure. Never two competing serif moments on the same view.
- Keep the Ink→Paper split by *surface role*, not by page: marketing/brand surfaces are Ink, working-app surfaces are Paper, regardless of what route they live on.
- Use Garnet as the only brand accent, in exactly two roles: filled in-app buttons/links, or its Bright variant for ghost-button strokes and links on Ink. Never a second accent hue.
- Keep confidence-level colors (§1 status table) visually distinct from Garnet at a glance — a user should never wonder "is this badge brand chrome or is it telling me something."
- Set kicker labels in uppercase Geist 600 with 0.02em tracking above every Fraunces section heading on marketing pages — it's the rhythm that makes the serif headings feel intentional rather than decorative.
- Keep chart series colors sourced from the `dataviz` skill's validated palette, re-run through `scripts/validate_palette.js` on any change — never substitute Garnet or a hand-picked hex.

### Don't
- Do not borrow Vinovest's *language* — no "invest," no "annualized return," no "personalized portfolio," no performance percentages on any bottle or collection. This is the line that keeps Acervo outside CNMV's EAFI perimeter; see `CLAUDE.md`.
- Do not use drop shadows or static decorative gradients on cards/buttons at rest. Elevation is Ink→Ink Elevated or Paper→Paper Elevated surface contrast only, plus hairline borders — never `box-shadow`. The one exception is motion-gated: see §7 Motion & Interaction — a gradient is only ever allowed as an *interaction* cue (hover spotlight, hero vignette), never as static card decoration.
- Do not set Fraunces below 28px or above 15% of a viewport's height — it's a headline/hero instrument, not a body or label font.
- Do not introduce a second chromatic accent alongside Garnet, even for a "just this once" promotional banner — including in motion: the spotlight/vignette in §7 is Garnet-only.
- Do not use pure `#000000` or pure `#ffffff` anywhere — the whole system is warmed (Ink, Ivory, Paper, Charcoal) on purpose; stark black/white will look like a different, colder product next to it.
- Do not apply the ghost-button treatment inside working-app task flows, or the filled-button treatment on marketing/hero surfaces — the split in §4 is deliberate, not interchangeable.
- Do not add wine-bottle or product photography yet — see §8 Imagery. The system is built to work on typography and color alone until real photography exists.
- Do not animate anything for a user with `prefers-reduced-motion: reduce` — see §7. Content must render in its final state instantly, not skip the reveal and stay invisible.

---

## 6. Surfaces & Elevation

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 1 | Ink | `#0e0d0c` | Base brand canvas — hero, nav, footer |
| 2 | Ink Elevated | `#1b1917` | Card/panel one step up from Ink |
| 3 | Paper | `#f7f3ea` | Base working-app canvas |
| 4 | Paper Elevated | `#ffffff` | Card/panel one step up from Paper |

No shadows anywhere in the system. Elevation is communicated purely by moving one step along each surface's own scale (Ink → Ink Elevated, Paper → Paper Elevated) plus a hairline border at the boundary — identical philosophy to both reference systems (Custo §Elevation, Aker §Elevation), carried through unchanged.

---

## 7. Motion & Interaction

Neither Custo nor Aker (both effectively static print-gallery layouts) needed a motion language — Acervo does, because it's a product people need to trust with real value, not a brochure. Motion here does one job: prove the page is alive and considered, without ever becoming the point.

**Library:** `animejs` (v4) for choreographed entrances; plain CSS transitions for hover/pointer feedback (cheaper, no JS on the hot path of a `mousemove`).

### Scroll Reveal
**Role:** Every marketing section's content enters once, the first time it's scrolled into view — never on every re-scroll, never as a loop.

Children fade and rise together: `opacity 0→1`, `translateY 24px→0`, `duration 700ms`, `ease outQuart`, staggered `90ms` apart in DOM order. Triggered by `IntersectionObserver` at `threshold: 0.15`, disconnected after firing once. Above-the-fold content (the hero) uses the identical mechanism — it simply fires immediately since the section is already in view on mount, so there's only one reveal implementation in the codebase (`useScrollReveal`), not a separate "on-mount" variant.

### Hero Vignette
**Role:** The one static-looking gradient in the system — reads as *lighting*, not decoration

A soft Garnet radial glow (`~16%` mix into transparent) anchored top-left of the Ink hero, fixed and non-interactive (`pointer-events: none`). This is the sole exception to "no gradients": it's doing the job a spotlight would do in a physical gallery — a single, motivated light source, never a rainbow or multi-stop decorative fill.

### Spotlight Card (hover)
**Role:** Catalog preview cards, and any future card grid that benefits from a tactile "this is alive" cue on hover

A `220px` radial Garnet glow (`~12%` mix) tracks the pointer inside the card via `mousemove`-driven CSS custom properties (`--spotlight-x`/`--spotlight-y`), fading in/out with the card's hover state (`opacity` transition, `300ms`). Paired with a `-2px` translateY lift on the card itself. This is interaction feedback, not ambient decoration — it does not run, and is not visible, until a pointer is over the card. Reserve it for content the user is actively evaluating (catalog cards); never apply it to functional in-app UI (tables, forms) where it would read as noise rather than delight.

### Reduced Motion
**Role:** Non-negotiable accessibility floor

Every entrance animation checks `prefers-reduced-motion: reduce` first and, if set, applies the animation's *end state* instantly (full opacity, resting position) rather than skipping the reveal and leaving content invisible. Hover-driven CSS transitions (spotlight, button color) are left running — they're state changes triggered by deliberate user action, not autoplaying motion, and are exempt from this check the way any `:hover` transition would be.

---

## 8. Imagery

**Current state: none.** Acervo has no product photography (there's no physical product — bottles belong to users, not to us) and no stock imagery budget for this MVP. The system is deliberately built to carry full brand weight on typography and color alone, the way Vinovest's stat cards and Custo's wordmark do before a photograph enters the frame.

**If/when imagery is introduced** (e.g., a future vertical with a physical object, or curated bottle photography): follow Custo's model — full-bleed or 12px-radius contained photography on Ink Elevated backgrounds only, desaturated/high-key treatment, no illustrations, no abstract graphics, no stock-photo people. Never introduce imagery to a Paper/working-app surface — those stay strictly typographic.

---

## 9. Layout

**Marketing (landing):** vertically stacked single column, 1180px max-width, alternating Ink and Paper bands at 96px gaps (desktop) — Ink hero first, then Paper for "Cómo funciona" and the catalog preview, Ink again for the footer/disclaimer band if weight is needed there, or Paper if the disclaimer should read as fine print rather than a brand statement (current implementation: Paper footer — legal text is not a brand moment).

**App (authenticated screens):** Paper canvas throughout, 1024px max content width, standard 8px-grid component spacing — dashboard cards, collection table, dialogs. The only Fraunces intrusion here is the single hero value number on the dashboard. Nav bar is Ink (brand-forward chrome) even though the content below it is Paper — same pattern as Aker's dark navigation pill floating over light content.

---

## 10. Agent Prompt Guide

**Quick Color Reference**
- background (brand): Ink `#0e0d0c` / background (app): Paper `#f7f3ea`
- text on Ink: Ivory `#f3ead9` · text on Paper: Charcoal `#171310`
- muted text: Stone `#6e6355` (Paper) / Stone Light `#a79c89` (Ink)
- border: Hairline `rgba(23,19,16,0.10)` (Paper) / Hairline Ink `rgba(243,234,217,0.14)` (Ink)
- accent: Garnet `#7a1f3b` (Paper/filled) / Garnet Bright `#c1516e` (Ink/ghost)
- status: Alto `#4b6b3a` · Medio `#8a5a17` · Bajo `#8a3420` (Paper text values; see §1 for dark pairs)

**Example Component Prompts**

1. **Marketing Hero (Ink)** — Full-bleed `#0e0d0c` background, 96px vertical padding. Wordmark "ACERVO" top-left, Geist 600 15px, 0.04em tracking, Ivory `#f3ead9`, followed by a "Vino" pill tag (Garnet Bright `#c1516e` text + border, 999px radius, 12px/6px padding). Headline in Fraunces 380 weight, 72px, line-height 1.02, Ivory, max 14 characters per line. Ghost pill CTA below: transparent fill, 1px Ivory border, Ivory text, Geist 600 14px, 999px radius, 12px/24px padding.

2. **Dashboard Value Card (Paper)** — `#ffffff` card on `#f7f3ea` page background, 10px radius, 1px `rgba(23,19,16,0.10)` border, 20px padding. Kicker "Valor total estimado" in Geist 600 13px uppercase Stone `#6e6355`. Hero number in Fraunces 400, 40px, Charcoal `#171310`. Stat row below in Geist 400 15px Stone: "3 botellas · 1 referencia".

3. **Confidence Badge** — 999px pill, 4px/10px padding, Geist 500 13px. "Alto" variant: text `#4b6b3a` on background `#e8ede0`. Never Garnet, never the app's primary accent — this is status, not brand.

4. **In-App Primary Button (Paper)** — Garnet `#7a1f3b` fill, Ivory `#f3ead9` text, Geist 600 14px, 999px radius, 12px/24px padding, no border, no shadow. Hover: Garnet darkened ~8%.

5. **Section Seam (Ink → Paper)** — Hard cut, no gradient, no shadow. Last 16px of the Ink section may carry a `rgba(243,234,217,0.14)` hairline at the very bottom edge if a visual stop is needed; otherwise the color change alone is the divider.

---

## 11. Similar Brands

- **Vinovest** — Primary *style* reference: black canvas, editorial serif numerals in warm ivory, restrained stat-forward layout. Explicitly **not** a reference for voice/positioning — see §0.
- **Custo** — Achromatic gallery restraint, monolithic single-family typography, hairline borders, zero shadows, ghost-pill primary actions. Source of the "no shadows, one hairline weight" discipline.
- **Aker** — Whisper-weight display type at monumental scale, single warm accent used sparingly, Ink/Paper alternating section rhythm, 999px pill radius on every interactive pill. Source of the section-alternation layout model and the pill-radius language.
- **Aesop** — Same warm-neutral (never stark black/white) palette discipline and editorial restraint in a category (retail) that also has to feel trustworthy with something people spend real money on.
- **Net-a-Porter Editorial / Porter Magazine** — Same serif-headline-on-dark-canvas-with-stat-callouts pattern, applied to a commerce context that still needed to feel like a magazine, not a store.
- **Aceternity UI** — Not a brand, a component pattern source: the pointer-tracked spotlight-border card (§7) is a restrained, single-hue adaptation of Aceternity's hover-glow card pattern — same mechanism, none of its typical multi-color rainbow treatment.

---

## 12. Quick Start — CSS Custom Properties

```css
:root {
  /* Surfaces */
  --color-ink: #0e0d0c;
  --color-ink-elevated: #1b1917;
  --color-paper: #f7f3ea;
  --color-paper-elevated: #ffffff;

  /* Ink */
  --color-ivory: #f3ead9;
  --color-charcoal: #171310;
  --color-stone: #6e6355;
  --color-stone-light: #a79c89;
  --color-hairline: rgba(23, 19, 16, 0.10);
  --color-hairline-ink: rgba(243, 234, 217, 0.14);

  /* Accent */
  --color-garnet: #7a1f3b;
  --color-garnet-bright: #c1516e;

  /* Status (light-surface pairs; see §1 for dark pairs) */
  --color-status-alto: #4b6b3a;
  --color-status-alto-bg: #e8ede0;
  --color-status-medio: #8a5a17;
  --color-status-medio-bg: #f3e7d2;
  --color-status-bajo: #8a3420;
  --color-status-bajo-bg: #f3dfd8;

  /* Typography */
  --font-fraunces: 'Fraunces Variable', 'Fraunces', ui-serif, Georgia, serif;
  --font-sans: 'Geist Variable', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  --text-caption: 13px;
  --text-body: 15px;
  --text-ui-label: 14px;
  --text-kicker: 13px;
  --text-subheading: 20px;
  --text-heading: 28px;
  --text-heading-lg: 40px;
  --text-display: 72px;

  /* Spacing */
  --spacing-unit: 4px;

  /* Radius */
  --radius-pill: 999px;
  --radius-card: 10px;
  --radius-hero: 12px;

  /* Layout */
  --marketing-max-width: 1180px;
  --marketing-section-gap: 96px;
  --app-max-width: 1024px;
}
```

### Tailwind v4

```css
@theme {
  --color-ink: #0e0d0c;
  --color-ink-elevated: #1b1917;
  --color-paper: #f7f3ea;
  --color-paper-elevated: #ffffff;
  --color-ivory: #f3ead9;
  --color-charcoal: #171310;
  --color-stone: #6e6355;
  --color-stone-light: #a79c89;
  --color-garnet: #7a1f3b;
  --color-garnet-bright: #c1516e;
  --color-status-alto: #4b6b3a;
  --color-status-alto-bg: #e8ede0;
  --color-status-medio: #8a5a17;
  --color-status-medio-bg: #f3e7d2;
  --color-status-bajo: #8a3420;
  --color-status-bajo-bg: #f3dfd8;

  --font-fraunces: 'Fraunces Variable', 'Fraunces', ui-serif, Georgia, serif;

  --radius-pill: 999px;
}
```
