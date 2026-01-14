interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-mono-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-mono-white border-4 border-mono-black p-8 max-w-xs w-full text-center">
        <div className="text-6xl font-bold mb-6 text-mono-black tracking-tighter">■</div>
        <h2 className="text-2xl font-bold text-mono-black mb-2 uppercase tracking-widest">BINGO</h2>
        <p className="text-mono-gray-dark mb-8 text-sm uppercase tracking-wide">You completed a line</p>
        
        <button
          onClick={onDismiss}
          className="w-full bg-mono-black text-mono-white font-bold py-3 px-6 uppercase tracking-wide hover:bg-mono-gray-dark transition-colors"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
