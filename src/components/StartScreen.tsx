interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative min-h-full bg-mono-white overflow-hidden">
      {/* Thick vertical border beam - structural element */}
      <div 
        className="absolute left-16 top-0 bottom-0 border-l-6 border-mono-black"
        style={{ 
          animation: 'borderPulse 3s ease-in-out infinite'
        }}
      />
      
      {/* Main content area - asymmetric positioning */}
      <div className="relative min-h-full flex items-center justify-end pr-16 py-12">
        <div className="max-w-md w-full" style={{ fontFamily: 'var(--font-display)' }}>
          
          {/* Title split across positions - asymmetric */}
          <div className="mb-16">
            <h1 
              className="text-7xl font-bold text-mono-black uppercase tracking-widest mb-2"
              style={{ 
                animation: 'slideInLeft 0.8s ease-out forwards'
              }}
            >
              SOC
            </h1>
            <h1 
              className="text-7xl font-bold text-mono-black uppercase tracking-widest pl-24"
              style={{ 
                animation: 'slideInRight 0.8s ease-out 0.15s forwards',
                opacity: 0
              }}
            >
              OPS
            </h1>
            <p 
              className="text-sm text-mono-gray uppercase tracking-widest mt-4 pl-24"
              style={{ 
                animation: 'slideInUp 0.8s ease-out 0.3s forwards',
                opacity: 0
              }}
            >
              Social Bingo
            </p>
          </div>

          {/* L-shaped border framing instructions */}
          <div 
            className="relative mb-16"
            style={{ 
              animation: 'slideInUp 0.8s ease-out 0.45s forwards',
              opacity: 0
            }}
          >
            {/* Top horizontal border */}
            <div className="absolute -top-6 left-0 right-12 h-0 border-t-4 border-mono-black" />
            {/* Left vertical border */}
            <div className="absolute top-0 -left-6 bottom-0 w-0 border-l-4 border-mono-black" />
            
            <div className="pl-8 pt-2">
              <h2 className="font-bold text-mono-black mb-6 uppercase tracking-widest text-base">
                How to play
              </h2>
              <ul className="text-left text-mono-gray-dark text-sm space-y-3">
                <li className="font-normal">— Find people who match the questions</li>
                <li className="font-normal">— Tap a square when you find a match</li>
                <li className="font-normal">— Get 5 in a row to win</li>
              </ul>
            </div>
          </div>

          {/* Button positioned opposite to title */}
          <div 
            className="flex justify-start"
            style={{ 
              animation: 'slideInUp 0.8s ease-out 0.6s forwards',
              opacity: 0
            }}
          >
            <button
              onClick={onStart}
              className="bg-mono-black text-mono-white font-bold py-4 px-12 text-base uppercase tracking-widest hover:bg-mono-gray-dark transition-colors"
              style={{
                animation: 'subtleShift 3s ease-in-out infinite 1s'
              }}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
