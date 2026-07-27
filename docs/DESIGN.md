# Acervo — Brand & Design System
> the midnight cellar, one ruby light
> Pure black canvas, warm ivory ink, and a single garnet ember doing all the
> chromatic work — a vault for what you own, not a spreadsheet.

**Theme:** dark, single register — no light mode, no toggle.

---

## 0. Brand

**Name:** Acervo — Spanish for an accumulated collection of value (cultural, patrimonial). Chosen over "Portfolio Tracker" because it names *what the product is for* without borrowing financial-advisory vocabulary, and it means the same thing whether the collection is bottles, watches, or paintings.

**What Acervo is:** a place to register what you own and see what it's honestly worth, one category at a time. Wine is the first vertical, not the whole product — the name never had to change to fit that.

**What Acervo is not:** an investment platform. This is the one hard line in this document. Vinovest was an early visual reference and it is also an EAFI-style wine investment advisor — annualized returns, "personalized portfolio creation," language explicitly ruled out for this product (see `CLAUDE.md` §Constraints). No "annualized return," no "invest," no personalized recommendation copy, ever.

**Vertical framing:** Wine is signaled quietly — a small "Vino" tag beside the wordmark — not narrated. The product doesn't announce a roadmap to visitors who came to value their Rioja; it just doesn't paint itself into a wine-only corner either.

**Voice:** direct, quiet confidence. States what it knows and what it doesn't (confidence levels are a voice decision as much as a data one). Never sells; informs.

---

## 1. Reference & lineage

This pass rebuilds the system on **Atlas Card**'s structure — a midnight-vault dark mode built around one rule: an achromatic base (three background steps, three text steps) and exactly **one** chromatic accent, kept rare. Atlas's own accent (Sapphire Volt, a deep electric blue) is recolored here to **Garnet** — the one hue change the brief asked for; everything else (the three-step surface/text scale, the single-accent discipline, pill controls, monospace annotation voice, zero shadows) is adopted directly.

Earlier passes explored a two-register model (a light "Paper" app surface plus a dark "Ink" marketing surface, with an editorial serif for display type). That model is retired: the product is dark everywhere now, front page to dashboard, and there is no serif — sans + mono only, per Atlas.

- **Atlas Card** — primary structural reference: Void/Obsidian/Graphite surface steps, Ash/Frost/Paper text steps, the single accent doctrine, pill buttons, the monospace annotation voice, zero-shadow elevation.
- **Vinovest** — style-only reference (not voice/positioning, see §0): black canvas, warm off-white on black, stat-forward layout.
- **Custo** — achromatic gallery restraint, hairline borders, zero shadows.
- **Aker** — whisper-to-bold display type at scale, single warm accent used sparingly, generous section rhythm.
- **Aceternity UI** — component pattern source, not a brand: the pointer-tracked spotlight-border card is a restrained, single-hue adaptation of Aceternity's hover-glow card pattern.

---

## 2. Tokens — Colors

One register. Three background steps (Void → Obsidian → Graphite), three text/ink steps (Ash → Frost → Paper), one accent (Garnet, in a fill weight and a brighter text/link weight).

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void | `#000000` | `--color-void` | Base canvas — every page, every section, no exceptions |
| Obsidian | `#161616` | `--color-obsidian` | First elevation step — cards, nav, modals, form fields |
| Graphite | `#242424` | `--color-graphite` | Second elevation step — hover states, secondary panels, medium-confidence badge fill |
| Ash | `#868686` | `--color-ash` | Quietest text — captions, muted metadata, low-confidence badge text |
| Frost | `#d1d1d1` | `--color-frost` | Secondary text — helper copy, medium-confidence badge text, focus borders |
| Paper | `#f4efe6` | `--color-paper` | Primary text — headings, body, button labels. Warm off-white, never pure `#fff` |
| Hairline | `rgba(244,239,230,0.10)` | `--color-hairline` | The only border weight in the system — cards, inputs, dividers, seams |
| Garnet | `#8f1734` | `--color-garnet` | The one accent, fill weight — primary buttons, brand mark, high-value chart bar |
| Garnet Bright | `#dd3f68` | `--color-garnet-bright` | The one accent, text weight — links, hover states, the "Vino" vertical tag, kicker labels that need to read as brand rather than muted |

### Confidence — encoded by weight, not by a second color set

Acervo's core honesty mechanism (every valuation carries a confidence level) does **not** borrow a green/amber/red status palette — that would be a second chromatic system fighting Garnet for attention. Instead, confidence is encoded the way Atlas encodes state: by visual weight along the existing Ash→Frost→Paper / Void→Obsidian→Graphite scale. High confidence looks solid and certain; low confidence looks quiet and provisional — the metaphor matches the data.

| Level | Treatment |
|-------|-----------|
| Alto | Paper fill, Void text — inverted, the most solid/opaque a badge gets |
| Medio | Graphite fill, Frost text, hairline border |
| Bajo | Transparent fill, Ash text, **dashed** hairline border — reads as provisional |

Never substitute Garnet into a confidence badge — see Do's & Don'ts.

### Data-visualization — tonal Garnet, not a categorical palette

The region breakdown chart has exactly three fixed categories (Rioja, Ribera del Duero, Priorat). Rather than import the `dataviz` skill's multi-hue categorical palette — which would introduce three unrelated chromatic hues into a system built around exactly one — each region gets a fixed tonal step of Garnet, assigned by **identity, not by value rank** (so the color never repaints when the sort order changes):

- Rioja → Garnet Bright (full brightness)
- Ribera del Duero → Garnet (base fill)
- Priorat → Garnet mixed 55% into Graphite (darkest step)

Every bar is also directly text-labeled, so identity never depends on color alone. This is a deliberate, documented departure from the `dataviz` skill's default categorical-palette guidance, justified by the design system's single-accent constraint and the small, fixed, always-labeled category set. If a future chart needs more than ~3 categories or genuine multi-series comparison, fall back to the validated categorical palette instead of stretching this tonal-ramp trick further.

---

## 3. Tokens — Typography

Two families, matching Atlas's division of labor exactly — no serif anywhere in the system.

### Geist Variable — the sans, standing in for Atlas's Sequel Sans. Carries everything from body copy to the hero display headline. Weight 700 for headlines/hero/section titles, 400 for body copy, 500 for buttons/nav/UI labels. · `--font-sans`
- **Weights:** 400 (body), 500 (buttons, nav, ui-labels), 700 (headings, hero, display)
- **Sizes:** 15px, 16px, 17px, 22px, 32px, 44px, 40–72px (responsive display)
- **Line height:** 1.0–1.6 (tighter as size grows)
- **Letter spacing:** -0.01em to -0.02em at display/heading sizes, normal below 22px

### JetBrains Mono Variable — the annotation voice, standing in for Atlas's ApercuMono. Captions, disclaimers, confidence-rationale footnotes, eyebrow/kicker labels, dashboard card kickers. Never a headline, never a button label, never body copy. · `--font-mono`
- **Weights:** 400 (footnotes), 500 (kickers)
- **Sizes:** 10px, 11px, 12px
- **Line height:** 1.5–1.6
- **Letter spacing:** 0.04–0.08em uppercase for kickers/eyebrows; normal-case, no tracking for footnotes/disclaimers

### Type Scale

| Role | Font | Size | Line Height | Weight | Token |
|------|------|------|-------------|--------|-------|
| annotation | Mono | 11–12px | 1.6 | 400 | `--text-annotation` |
| kicker | Mono | 10–12px | 1.5 | 500, uppercase, 0.06–0.08em | `--text-kicker` |
| body | Sans | 15–16px | 1.5–1.6 | 400 | `--text-body` |
| ui-label | Sans | 15px | 1.24 | 500 | `--text-ui-label` |
| subheading | Sans | 22px | 1.3 | 500 | `--text-subheading` |
| heading | Sans | 32px | 1.2 | 700 | `--text-heading` |
| heading-lg | Sans | 44px | 1.1 | 700 | `--text-heading-lg` |
| display | Sans | 40–72px (responsive) | 1.0–1.03 | 700 | `--text-display` |

---

## 4. Tokens — Spacing & Shapes

**Base unit:** 4px · **Density:** app screens stay comfortable-not-spacious (a working tool); marketing/landing sections get generous gaps (a gallery moment).

### Border Radius

| Element | Value |
|---------|-------|
| buttons (all variants, all sizes) | full pill (`--radius-pill: 9999px`) — see Do's & Don'ts, no exceptions |
| cards, dialogs, popovers | 12px (`rounded-xl`) |
| inputs | 8px |
| confidence badges | full pill |
| tags/kickers (mono, small) | sharp — no radius needed at that size |

### Layout

- **Marketing page max-width:** 1180px
- **Marketing section gap:** 64–96px desktop / 40–56px mobile
- **App content max-width:** 1024px
- **Card padding:** 16–20px
- **Element gap:** 12–16px

---

## 5. Components

### Wordmark Lockup
**Role:** Primary brand identifier — nav, footer, auth pages, hero

`ACERVO` in Geist 600, 15px, letter-spacing 0.06em, uppercase, Paper. Immediately followed by a small "Vino" pill tag — mono 500, 10px, uppercase, Garnet Bright text, 1px Garnet Bright border at 50% opacity, full pill radius, ~2px/10px padding — reading as a category tag, not a second brand.

### Hero Display Headline
**Role:** The one moment type gets to be huge — the landing hero headline

Geist 700, responsive 40px → 72px across breakpoints, line-height ~1.0–1.03, letter-spacing -0.02em, Paper on Void. This is the single element per screen allowed at display scale.

### Filled Pill Button (Primary Action)
**Role:** Every primary action, everywhere — marketing CTAs and in-app task completion alike

Garnet fill, Paper text, full pill radius, Geist 500, ~14px/28px padding (default) or ~16px/28px (lg, hero-scale). Hover: Garnet darkens ~15%. This is a deliberate unification versus earlier drafts that split ghost-marketing vs. filled-in-app buttons — Atlas doesn't make that distinction, and neither does this pass: one button language everywhere.

### Ghost Pill Button (Secondary Action)
**Role:** "Ya tengo cuenta", secondary nav actions, anything that shouldn't compete with the primary CTA

Transparent fill, 1px Hairline border, Paper text, full pill radius, same padding as the filled variant. Hover: border brightens to Frost.

### Confidence Badge
**Role:** The product's honesty mechanism — must never be visually subordinate to decoration

Full pill, 4px/10px padding, Geist 500 13px. Weight-encoded per §2 (alto = solid Paper/Void, medio = Graphite/Frost, bajo = transparent/Ash/dashed) — never Garnet. Optional tooltip on hover carries the rationale sentence.

### Kicker Label
**Role:** Small overline preceding a section heading, or a dashboard card title — "Cómo funciona", "Valor total estimado"

Mono 500, 10–12px, uppercase, letter-spacing 0.06–0.08em, Ash (quiet) or Garnet Bright (brand-forward moments only, e.g. the hero eyebrow). Sits 8px above the heading it introduces.

### Annotation Caption
**Role:** Legal fine print, disclaimers, vintage-mismatch notes, confidence-rationale footnotes

Mono 400, 11–12px, line-height 1.5–1.6, Ash, normal case, no letter-spacing. Centered when it stands alone (footer disclaimer); left-aligned inline when annotating another element.

### Centered Editorial Block
**Role:** A short brand-voice statement between the hero and the functional sections

Max-width 640px, centered horizontally and in text-align, Geist 400 at 20–24px, line-height 1.5, Paper on Void. Directly adopted from Atlas's Centered Body Block.

### Feature Section
**Role:** The landing's primary content unit — used three times ("El catálogo", "Tu colección", "Confianza"), each pairing a real photograph with a substantive explanation instead of a thin bullet list

Two-column grid at `lg:` (stacks on mobile): text column carries a mono Garnet-Bright kicker, a 2-3-line Geist 700 headline (32–44px), a description paragraph, then 2-3 sub-features below a hairline divider (each a Geist 600 15px mini-heading + Ash/Frost body). Image column carries a single `aspect-[4/5]` photograph, 12px radius, with a mono caption below it. Alternates `reverse` (image left/right) and `surface` (Void/Obsidian) section to section for rhythm — see §10. Adapted directly from atlascard.com's repeating feature-section pattern (kicker → big headline → description → photo → sub-features → optional link), scaled down from Atlas's ~6 sections to 3 to match Acervo's actual current scope.

### Numbered List Item
**Role:** Legacy pattern, superseded by Feature Section's sub-features list for the landing — kept here for any future compact three-step explainer that doesn't need a full Feature Section (a settings page, an in-app tooltip flow, etc.)

Two-digit number (`01`, `02`, `03`) in mono, Ash, above a hairline top-border; label in Geist 600 15px Paper; description in Geist 400 15px Frost.

### Spotlight Card (hover)
**Role:** Catalog preview cards, any future card grid that benefits from a tactile "alive" cue on hover

A pointer-tracked radial Garnet glow (~22% mix into transparent, 220px) on an Obsidian card, paired with a -2px translateY lift. Interaction feedback only — never visible until a pointer is over the card, never applied to functional in-app tables/forms where it would read as noise. Adapted from Aceternity's spotlight-border pattern, single-hue.

### Logo Badge
**Role:** Compact brand mark — favicon, browser tab, anywhere the full lockup won't fit

A rounded-square mark, Paper background, containing a single "A" in Geist 700, Garnet-colored. Placeholder monogram, not a commissioned logotype.

---

## 6. Do's and Don'ts

### Do
- Use Garnet fill for every primary button, everywhere, at full pill radius — one button language across marketing and app, no ghost/filled split by surface.
- Keep the confidence-level encoding weight-based (§2) — never introduce green/amber/red; the whole point is that Garnet stays the only chromatic voice in the product.
- Set every card, dialog, and popover to Obsidian or Graphite on Void with a single Hairline border — never a shadow.
- Reserve Garnet Bright (not Garnet) for anything rendered as inline text/links on Void — the base Garnet is too dark for text contrast on pure black; it's a fill color, not an ink.
- Keep chart series colors tied to category identity, not sort rank (§2) — a region's color must not change when its value changes rank.
- Set mono kickers in uppercase with 0.06–0.08em tracking above every section heading and every dashboard card title — the rhythm that makes the sans headings feel intentional.

### Don't
- Do not borrow Vinovest's *language* — no "invest," no "annualized return," no "personalized portfolio," no performance percentages on any bottle or collection. This is the line that keeps Acervo outside CNMV's EAFI perimeter; see `CLAUDE.md`.
- Do not use drop shadows or static decorative gradients on cards/buttons at rest. The one exception is motion-gated (see §8): a gradient is only ever an *interaction* cue (hover spotlight, hero vignette), never static card decoration.
- Do not use pure `#ffffff` for body text — Paper (`#f4efe6`) is the primary ink everywhere; pure white is reserved for the logo badge background and peak-contrast micro-moments only.
- Do not introduce a second chromatic accent alongside Garnet, ever — including for a "just this once" promotional banner.
- Do not set any button radius below full-pill — every button, every size, is a pill. No 8px "secondary button" exception.
- Do not add wine-bottle or product photography yet (see §9). The system is built to carry full brand weight on typography and color alone.
- Do not animate anything for a user with `prefers-reduced-motion: reduce` (see §8) — render the animation's end state instantly instead of skipping the reveal.

---

## 7. Surfaces & Elevation

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Void | `#000000` | Base canvas — every page |
| 1 | Obsidian | `#161616` | Cards, nav, modals, form fields |
| 2 | Graphite | `#242424` | Hover states, secondary panels, medium-confidence fill |

No shadows anywhere. Elevation is communicated purely by stepping Void → Obsidian → Graphite plus a Hairline border at the boundary — identical philosophy to Atlas, Custo, and Aker alike.

---

## 8. Motion & Interaction

**Library:** `animejs` (v4) for choreographed entrances; plain CSS transitions for hover/pointer feedback.

### Scroll Reveal
Every marketing section's content enters once, the first time it's scrolled into view. Children fade and rise together: `opacity 0→1`, `translateY 24px→0`, `duration 700ms`, `ease outQuart`, staggered `90ms` apart. Triggered by `IntersectionObserver` at `threshold: 0.15`, disconnected after firing once. One implementation (`useScrollReveal`), reused everywhere including the hero (fires immediately since it's already in view on mount).

### Hero Vignette
A soft Garnet radial glow (~22% mix into transparent) anchored top-left of the Void hero, fixed and non-interactive. The one static-looking gradient in the system — reads as *lighting*, not decoration.

### Spotlight Card (hover)
See §5. `mousemove`-driven CSS custom properties, `opacity` transition 300ms, paired with a card lift.

### Reduced Motion
Every entrance animation checks `prefers-reduced-motion: reduce` first and, if set, applies the animation's *end state* instantly rather than leaving content invisible. Hover-driven CSS transitions are exempt (deliberate user action, not autoplay).

---

## 9. Imagery

**Current state: real stock photography + one hero video loop**, sourced from Pexels (free license, no attribution required) and self-hosted in `public/media/` rather than hotlinked. There is still no owned product photography — bottles belong to users, not to Acervo — so every image is atmospheric/contextual (cellars, barrels, bottles), never a specific labeled bottle presented as "ours."

**Treatment:** 12px-radius contained photography (`aspect-[4/5]` in feature sections, `aspect-[4/3]` in the hero teaser strip), no full-bleed hero photography — the hero uses a muted, looping background video instead (`hero-loop.mp4`, ~6MB SD, opacity-reduced with a Void gradient overlay on top so text stays legible without a separate scrim layer). A black-and-white image is used at least once (the confidence-section photo) so imagery can reinforce the one-accent discipline instead of fighting it. No illustrations, no stock-photo people, no invented product shots.

**Motion:** the hero video respects `prefers-reduced-motion: reduce` — it swaps to a static poster-equivalent image instead of autoplaying, mirroring the same accessibility floor as the scroll-reveal system in §8.

**If more imagery is added later:** keep sourcing free-license stock (Pexels/Unsplash) self-hosted in `public/media/`, same desaturated/atmospheric treatment, same 12px radius — never hotlink a third-party CDN directly in production.

---

## 10. Layout

**Marketing (landing):** vertically stacked single column, 1180px max-width. Sections alternate Void ↔ Obsidian background (not a hard rule of one-tone-only — the alternation is the section-to-section contrast mechanism now, replacing the retired Ink/Paper two-register model) with hairline seams between every section regardless of tone.

**App (authenticated screens):** Void canvas throughout, 1024px max content width, standard spacing. Nav bar is Void with a Hairline bottom border; cards are Obsidian. There is no surface distinction between "marketing" and "app" anymore — one register, everywhere.

---

## 11. Agent Prompt Guide

**Quick Color Reference**
- background: Void `#000000` → Obsidian `#161616` → Graphite `#242424`
- text: Paper `#f4efe6` (primary) → Frost `#d1d1d1` (secondary) → Ash `#868686` (muted)
- border: Hairline `rgba(244,239,230,0.10)` — the only border weight
- accent: Garnet `#8f1734` (fill) / Garnet Bright `#dd3f68` (text/links)
- primary action: Garnet fill, Paper text, full pill radius

**Example Component Prompts**

1. **Hero (Void)** — Full-bleed `#000000` background with a soft top-left Garnet radial glow (22% mix, non-interactive). Wordmark "ACERVO" top-left, Geist 600 15px, 0.06em tracking, Paper `#f4efe6`, followed by a "Vino" pill tag (mono 500 10px, Garnet Bright `#dd3f68` text+border). Headline Geist 700, 72px, line-height 1.0, Paper, max ~30 characters per line. Filled Garnet pill CTA below: `#8f1734` fill, Paper text, Geist 500 15px, full pill radius, 16px/28px padding.

2. **Dashboard Value Card (Obsidian)** — `#161616` card on `#000000` page background, 12px radius, Hairline border, 20px padding. Kicker "Valor total estimado" in mono 500 11px uppercase Ash `#868686`. Hero number in Geist 700, 36px, Paper `#f4efe6`. Stat row below in Geist 400 15px Ash: "3 botellas · 1 referencia".

3. **Confidence Badge** — Full pill, 4px/10px padding, Geist 500 13px. "Alto": Paper fill `#f4efe6`, Void text `#000000` (inverted, solid). "Medio": Graphite fill `#242424`, Frost text `#d1d1d1`. "Bajo": transparent fill, dashed Hairline border, Ash text `#868686`.

4. **Primary Button (any surface)** — Garnet `#8f1734` fill, Paper `#f4efe6` text, Geist 500 15px, full pill radius, 14px/28px padding, no border, no shadow. Hover: Garnet darkened ~15%.

5. **Section Seam** — Hard cut, no gradient, no shadow. A Hairline border at the top of the following section is the only visual stop if one is needed.

---

## 12. Quick Start — CSS Custom Properties

```css
:root {
  /* Surfaces */
  --color-void: #000000;
  --color-obsidian: #161616;
  --color-graphite: #242424;

  /* Text/ink */
  --color-ash: #868686;
  --color-frost: #d1d1d1;
  --color-paper: #f4efe6;
  --color-hairline: rgba(244, 239, 230, 0.10);

  /* Accent */
  --color-garnet: #8f1734;
  --color-garnet-bright: #dd3f68;

  /* Typography */
  --font-sans: 'Geist Variable', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  --text-annotation: 12px;
  --text-kicker: 11px;
  --text-body: 15px;
  --text-ui-label: 15px;
  --text-subheading: 22px;
  --text-heading: 32px;
  --text-heading-lg: 44px;
  --text-display: 72px;

  /* Spacing */
  --spacing-unit: 4px;

  /* Radius */
  --radius-pill: 9999px;
  --radius-card: 12px;
  --radius-input: 8px;

  /* Layout */
  --marketing-max-width: 1180px;
  --marketing-section-gap: 96px;
  --app-max-width: 1024px;
}
```

### Tailwind v4

```css
@theme {
  --color-void: #000000;
  --color-obsidian: #161616;
  --color-graphite: #242424;
  --color-ash: #868686;
  --color-frost: #d1d1d1;
  --color-paper: #f4efe6;
  --color-garnet: #8f1734;
  --color-garnet-bright: #dd3f68;

  --font-mono: 'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  --radius-pill: 9999px;
}
```
