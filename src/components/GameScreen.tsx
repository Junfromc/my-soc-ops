import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-mono-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-mono-white border-b-2 border-mono-black">
        <button
          onClick={onReset}
          className="text-mono-black text-xs px-3 py-2 uppercase tracking-wide font-bold active:bg-mono-gray-light"
        >
          ← Back
        </button>
        <h1 className="font-bold text-mono-black uppercase tracking-widest">Soc Ops</h1>
        <div className="w-16"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-mono-gray text-xs py-3 px-4 uppercase tracking-wide">
        Tap a square when you find someone who matches it
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="bg-mono-black text-mono-white text-center py-3 font-bold text-xs uppercase tracking-widest">
          BINGO — You got a line
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
