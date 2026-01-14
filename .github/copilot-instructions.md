# Copilot Instructions: Soc Ops

Social Bingo game for in-person mixers. 5×5 grid, get 5 in a row to win.

## Development Checklist

Before committing changes:
- [ ] Run `npm run lint` and fix all errors
- [ ] Run `npm run build` successfully
- [ ] Run `npm run test` and ensure all tests pass

## Architecture

**Component Flow:** [App.tsx](../src/App.tsx) → `useBingoGame` hook → [GameScreen.tsx](../src/components/GameScreen.tsx) → [BingoBoard.tsx](../src/components/BingoBoard.tsx) → [BingoSquare.tsx](../src/components/BingoSquare.tsx)

**State:** Single hook [useBingoGame.ts](../src/hooks/useBingoGame.ts) + pure functions in [bingoLogic.ts](../src/utils/bingoLogic.ts). Props down, callbacks up. Persisted to localStorage (versioned, validated).

**Types:** [types/index.ts](../src/types/index.ts) defines `BingoSquareData`, `BingoLine`, `GameState`

**Game Logic:** `generateBoard()` → shuffled 5×5 with center free space (index 12). `toggleSquare()` → immutable updates. `checkBingo()` → validates rows/columns/diagonals.

## Design System: Minimalist Monochrome

**Aesthetic:** Pure black/white with grayscale. Sharp edges, high contrast, geometric precision. No gradients, shadows, or decorative elements.

**Color Palette** (in [index.css](../src/index.css) `@theme` block):
```css
@theme {
  --color-mono-black: #000000;
  --color-mono-gray-dark: #404040;
  --color-mono-gray: #808080;
  --color-mono-gray-light: #d0d0d0;
  --color-mono-white: #ffffff;
}
```

**Typography:**
- Uppercase for headings with `tracking-wide` or `tracking-widest`
- Font weights: `font-bold` for emphasis, regular for body
- Use em-dashes (—) not bullets (•)
- System font stack: `system-ui, -apple-system, sans-serif`

**Component States:**
- **Unmarked square:** `bg-mono-white` + `border border-mono-black` + `text-mono-black`
- **Marked square:** `bg-mono-black` + `border-2 border-mono-black` + `text-mono-white`
- **Winning square:** Same as marked but `border-4` (thicker border)
- **Free space:** `bg-mono-gray-light` + always marked + `font-bold`

**Layout Rules:**
- No rounded corners (sharp 90° edges everywhere)
- No shadows (flat design)
- No gaps in grid (`gap-0`) for unified table look
- 2px borders for primary divisions, 1px for secondary
- Opacity overlays: `bg-mono-black/80` for modals

**Interaction:**
- Hover: `hover:bg-mono-gray-dark` on black buttons
- Active: `active:bg-mono-gray-light` on white elements
- Transitions: `transition-colors` (no bounce/spring animations)

**Icon/Symbol:** Use geometric Unicode (■ = \u25a0) not emoji

## Styling (Tailwind v4)

**Theme:** Define in [index.css](../src/index.css) `@theme` block (not config file). Use as `bg-mono-black`, `text-mono-gray`, etc. Opacity: `bg-mono-black/80`. See [BingoSquare.tsx](../src/components/BingoSquare.tsx) for state-based styling pattern.

## Commands

- `npm run dev` → Vite dev server
- `npm run build` → Production build (auto-deploys to GitHub Pages on `main`)
- `npm run test` → Vitest (no watch mode)
- `npm run lint` → ESLint

## Common Edits

**Add Questions:** Append to `questions[]` in [data/questions.ts](../src/data/questions.ts) (24 min)

**Change Board Size:** Update `BOARD_SIZE`, `CENTER_INDEX`, `getWinningLines()` in [bingoLogic.ts](../src/utils/bingoLogic.ts)

**Add Theme Color:** Add to `@theme` in [index.css](../src/index.css), use as `bg-[name]`

**Add Persistence Field:** Update `StoredGameData` + increment `STORAGE_VERSION` + update `validateStoredData()` in [useBingoGame.ts](../src/hooks/useBingoGame.ts)

## Constraints

- Center square (index 12) = free space (always marked, non-toggleable)
- Bingo = exactly 5 consecutive squares in row/column/diagonal
- SSR-safe: check `typeof window !== 'undefined'` before localStorage
