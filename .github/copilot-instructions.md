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

## Styling (Tailwind v4)

**Theme:** Define in [index.css](../src/index.css) `@theme` block (not config file):
```css
@theme {
  --color-accent: #2563eb;
  --color-marked: #dcfce7;
}
```
Use as `bg-accent`, `bg-marked`. Opacity: `bg-black/50`. See [BingoSquare.tsx](../src/components/BingoSquare.tsx) for state-based styling pattern.

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
