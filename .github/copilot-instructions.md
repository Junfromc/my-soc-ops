# Copilot Instructions: Soc Ops

Social Bingo game for in-person mixers. Players find people who match questions on their board and aim for 5 in a row.

## Architecture

**Component Hierarchy:**
- [App.tsx](../src/App.tsx) → orchestrates game flow via `useBingoGame` hook
- [StartScreen.tsx](../src/components/StartScreen.tsx) → initial state
- [GameScreen.tsx](../src/components/GameScreen.tsx) → active game board
  - [BingoBoard.tsx](../src/components/BingoBoard.tsx) → grid container
    - [BingoSquare.tsx](../src/components/BingoSquare.tsx) → individual square
- [BingoModal.tsx](../src/components/BingoModal.tsx) → victory state

**State Management:**
- Single custom hook pattern: [useBingoGame.ts](../src/hooks/useBingoGame.ts) manages all game state
- Pure functions in [bingoLogic.ts](../src/utils/bingoLogic.ts) handle board generation, square toggling, and bingo detection
- LocalStorage persistence with validation (`STORAGE_KEY = 'bingo-game-state'`, versioned)

**Data Flow:**
1. `generateBoard()` creates 5×5 grid with center free space (index 12)
2. `toggleSquare()` returns new board array (immutable updates)
3. `checkBingo()` validates all rows/columns/diagonals
4. Hook syncs state to localStorage on changes

## Key Patterns

### TypeScript Domain Types
All game types defined in [types/index.ts](../src/types/index.ts):
- `BingoSquareData` → square state (id, text, isMarked, isFreeSpace)
- `BingoLine` → winning line definition (type, index, squares array)
- `GameState` → `'start' | 'playing' | 'bingo'`

### Pure Functional Logic
[bingoLogic.ts](../src/utils/bingoLogic.ts) exports pure functions only:
- No side effects, no DOM manipulation
- All functions return new data structures
- Tested with [bingoLogic.test.ts](../src/utils/bingoLogic.test.ts) (220+ lines)

### Component Props Pattern
Components receive data + callbacks, never manage state directly:
```tsx
<GameScreen
  board={board}           // Display data
  winningSquareIds={...}  // Computed state
  onSquareClick={...}     // Action callbacks
/>
```

## Styling

**Tailwind CSS v4** with CSS-first configuration in [index.css](../src/index.css):
- Theme colors defined via `@theme` directive (not `tailwind.config.js`)
- Custom colors: `--color-accent`, `--color-marked`, `--color-marked-border`, `--color-bingo`
- Use directly in classes: `bg-marked`, `border-marked-border`, `text-accent`
- Opacity via slash syntax: `bg-black/50` (not `bg-opacity-50`)

**State Styling Pattern:**
- Conditional classes based on props: `square.isMarked ? 'bg-marked' : 'bg-white'`
- Winning squares: amber colors (`bg-amber-200`, `border-amber-400`)
- See [BingoSquare.tsx](../src/components/BingoSquare.tsx) for canonical example

## Development Workflow

### Commands
- `npm run dev` → Vite dev server (default task, currently running)
- `npm run build` → TypeScript compilation + Vite production build
- `npm run test` → Vitest (runs once, no watch mode)
- `npm run lint` → ESLint with TypeScript rules

### Testing Setup
- Vitest with jsdom environment ([vite.config.ts](../vite.config.ts))
- React Testing Library with jest-dom matchers ([test/setup.ts](../src/test/setup.ts))
- Test pattern: mock boards in `beforeEach`, verify pure function outputs

### Deployment
- Auto-deploys to GitHub Pages on push to `main` ([.github/workflows/deploy.yml](../.github/workflows/deploy.yml))
- Base path auto-detected via `VITE_REPO_NAME` env var
- Serves from `/dist` directory

## Content Management

**Questions File:** [data/questions.ts](../src/data/questions.ts)
- Export `questions: string[]` (24 items minimum)
- Export `FREE_SPACE` constant for center square
- Board generation shuffles and slices first 24 questions

## Common Tasks

**Add New Question:**
1. Append to `questions` array in [questions.ts](../src/data/questions.ts)
2. No code changes needed (board generation handles it)

**Modify Board Size:**
1. Update `BOARD_SIZE` and `CENTER_INDEX` in [bingoLogic.ts](../src/utils/bingoLogic.ts)
2. Adjust `getWinningLines()` logic
3. Update question array slice logic

**Change Styling:**
1. Add theme colors to `@theme` block in [index.css](../src/index.css)
2. Use directly in components: `bg-[color-name]`
3. No config file needed (Tailwind v4 pattern)

**Add Persistence Field:**
1. Update `StoredGameData` interface in [useBingoGame.ts](../src/hooks/useBingoGame.ts)
2. Increment `STORAGE_VERSION` constant
3. Update `validateStoredData()` function

## Constraints

- Center square (index 12) always free space, always marked
- Free space cannot be toggled
- Bingo requires exactly 5 consecutive squares (no diagonal wrapping)
- LocalStorage validation prevents corrupted state from crashing app
- SSR-safe: hooks check `typeof window !== 'undefined'` before localStorage access
