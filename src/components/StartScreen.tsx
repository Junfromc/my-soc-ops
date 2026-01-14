interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-mono-white">
      <div className="text-center max-w-sm">
        <h1 className="text-5xl font-bold text-mono-black mb-1 tracking-tight">SOC OPS</h1>
        <p className="text-sm text-mono-gray mb-12 uppercase tracking-widest">Social Bingo</p>
        
        <div className="border-2 border-mono-black p-8 mb-12">
          <h2 className="font-bold text-mono-black mb-4 uppercase tracking-wide text-base">How to play</h2>
          <ul className="text-left text-mono-gray-dark text-sm space-y-3">
            <li>— Find people who match the questions</li>
            <li>— Tap a square when you find a match</li>
            <li>— Get 5 in a row to win</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-mono-black text-mono-white font-bold py-4 px-8 text-base uppercase tracking-wide hover:bg-mono-gray-dark transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
