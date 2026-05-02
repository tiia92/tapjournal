## Goal

Re-skin the entire site in the Layout #2 aesthetic — soft off-white canvas, midnight-navy primary, dusty-lavender accent, warm-gold highlight — without changing the Outfit font, the existing book-icon logo silhouette, or any emoji in the trackers.

## What stays exactly the same

- **Font**: Outfit (already loaded via `tailwind.config.ts` font stack). No changes.
- **Logo**: Same `BookOpen` lucide icon inside a rounded square, same component API. Only the gradient colors change to the new navy → lavender palette so it harmonizes.
- **Emoji set**: All emoji options in `src/utils/trackerUtils.ts` stay identical — same icons, same labels, same order. Nothing added or removed.

## Design tokens (the heart of the change)

Update `src/index.css` `:root` and `.dark` HSL tokens:

| Token | Light mode | Role |
|---|---|---|
| `--background` | `36 25% 97%` | Soft off-white canvas |
| `--foreground` | `222 47% 11%` | Midnight ink |
| `--card` | `0 0% 100%` | Pure white cards on warm canvas |
| `--border` | `220 20% 90%` | Hairline slate |
| `--primary` | `222 47% 14%` | Midnight navy |
| `--secondary` / `--muted` | `260 25% 95%` | Dusty lavender wash |
| `--accent` | `260 35% 88%` | Dusty lavender accent |
| `--ring` | `260 40% 60%` | Lavender focus ring |
| `--gold` (new) | `38 60% 55%` | Warm gold highlight |
| `--priority-high` | `355 70% 58%` | Coral red |
| `--priority-medium` | `260 50% 60%` | Lavender (replaces current blue to match palette) |
| `--priority-low` | `145 35% 65%` | Soft sage |

Dark mode mirrors with deeper navy background and brighter lavender/gold accents.

Also add reusable extras:
- `--gradient-hero`: linear-gradient from off-white through faint lavender to soft gold
- `--shadow-soft`: layered low-opacity shadow for cards
- Update `.tap-card` / `.glass-panel` to use these for the polished editorial feel

## Tailwind config additions

In `tailwind.config.ts`:
- Add `gold: 'hsl(var(--gold))'` to colors
- Add `boxShadow.soft` matching the new shadow token
- Bump default border radius scale slightly (cards feel more rounded)

## Component updates

1. **`src/components/Logo.tsx`** — keep the BookOpen icon and rounded-square shape; swap gradient `from-blue-500 to-purple-600` → `from-primary to-[hsl(var(--accent))]` (or gold accent on hover) so the silhouette is recognizably the same but tonally matches.

2. **`src/pages/LandingPage.tsx`** — site-wide aesthetic anchor:
   - Hero background: subtle `bg-[image:var(--gradient-hero)]` wash
   - Rotating word colors switched from rainbow gradients to palette-consistent ones (navy, lavender, gold)
   - Feature cards: white on off-white, hairline border, `shadow-soft`, rounded-2xl, lavender-tinted icon backgrounds (replace current orange/blue/green/purple/red/indigo tile colors with lavender/gold/navy variations so the grid reads as one cohesive palette)
   - CTA buttons inherit new primary (midnight navy), secondary outline picks up lavender border
   - Header/footer get the off-white canvas with hairline border

3. **`src/components/Layout.tsx`** — already token-driven; will inherit automatically. Verify nav active state uses `text-primary` (it does).

4. **Tracker cards** (`TaskTracker`, `EmojiSelector`, `TapCounter`, `SymptomTracker`, `MedicationTracker`, journal notes card on `Index.tsx`):
   - Already use `tap-card`, semantic tokens, and the existing emoji data — they pick up the new look from CSS variables without structural rewrites.
   - Small polish pass: ensure section titles are centered and emoji grid wraps at max 10 per row (current `grid-cols-4` in `.emoji-selector` will be widened to `grid-cols-10` on `md:` and a sensible smaller count on mobile, with `flex-wrap justify-center` so leftover emojis center on a second row — matching the mockup).

5. **Other pages** (`Login`, `Signup`, `Pricing`, `AboutUs`, `Settings`, `Calendar`, `Journal`, `PremiumWaitlist`, `DataRecovery`, `NotFound`) — visual audit pass to:
   - Replace any hard-coded color classes (e.g. `bg-blue-100`, `text-purple-600`) with semantic tokens or the new `gold`/lavender accents
   - Confirm cards use `tap-card` / `glass-panel` styling
   - No structural/copy changes

## Out of scope

- No emoji additions/removals/substitutions
- No font swap
- No logo redesign (only gradient recolor)
- No copy rewrites on landing page
- No new pages/routes

## Visual diagram

```text
canvas: off-white #FAFAF8
  ├─ header: white card, hairline border, navy wordmark
  ├─ hero: faint lavender→gold wash, navy headline, gold accent word
  ├─ feature grid: white cards, lavender/gold icon tiles, soft shadow
  ├─ tracker cards (Today page): white, centered titles, emoji rows max 10
  └─ footer: off-white, hairline top border
```

## Files touched

- `src/index.css` (tokens, gradient, shadow, emoji-grid utility)
- `tailwind.config.ts` (gold color, soft shadow)
- `src/components/Logo.tsx` (gradient recolor)
- `src/pages/LandingPage.tsx` (palette + icon tile colors)
- `src/components/EmojiSelector.tsx` (10-per-row centered wrap)
- Light token cleanup in: `Login.tsx`, `Signup.tsx`, `Pricing.tsx`, `AboutUs.tsx`, `Settings.tsx`, `Calendar.tsx`, `Journal.tsx`, `PremiumWaitlist.tsx`, `DataRecovery.tsx`, `NotFound.tsx`, and any tracker component still using literal Tailwind color classes
