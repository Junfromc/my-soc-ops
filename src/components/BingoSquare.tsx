import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-2 text-center transition-all duration-150 select-none min-h-[60px] text-xs leading-tight font-medium';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-mono-black text-mono-white border-4 border-mono-black'
      : 'bg-mono-black text-mono-white border-2 border-mono-black'
    : 'bg-mono-white text-mono-black border border-mono-black active:bg-mono-gray-light';

  const freeSpaceClasses = square.isFreeSpace ? 'font-bold text-sm bg-mono-gray-light' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
    </button>
  );
}
