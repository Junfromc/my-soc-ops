interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  // Split "SOC OPS" into individual letters for staggered animation
  const heroText = "SOC OPS";
  const letters = heroText.split("").map((char, index) => ({
    char: char === " " ? "\u00A0" : char, // Non-breaking space for space character
    delay: index * 50, // 50ms stagger per letter
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 bg-mono-white">
      <div className="text-center max-w-2xl">
        {/* Oversized hero text with letter-by-letter animation */}
        <h1 className="text-9xl font-black text-mono-black mb-4 tracking-widest uppercase">
          {letters.map((letter, index) => (
            <span
              key={`hero-letter-${index}-${letter.char}`}
              className="inline-block animate-fade-in-up"
              style={{
                animationDelay: `${letter.delay}ms`,
                opacity: 0,
              }}
            >
              {letter.char}
            </span>
          ))}
        </h1>

        {/* Subtitle with delayed fade-in */}
        <p
          className="text-xl text-mono-gray mb-16 uppercase tracking-widest font-bold animate-fade-in"
          style={{
            animationDelay: "350ms",
            opacity: 0,
          }}
        >
          Social Bingo
        </p>

        {/* Instructions box with delayed fade-in */}
        <div
          className="border-2 border-mono-black p-8 mb-16 animate-fade-in"
          style={{
            animationDelay: "400ms",
            opacity: 0,
          }}
        >
          <h2 className="font-bold text-mono-black mb-4 uppercase tracking-wide text-lg">
            How to play
          </h2>
          <ul className="text-left text-mono-gray-dark text-base space-y-3">
            <li>— Find people who match the questions</li>
            <li>— Tap a square when you find a match</li>
            <li>— Get 5 in a row to win</li>
          </ul>
        </div>

        {/* CTA button with delayed fade-in and continuous pulse */}
        <button
          onClick={onStart}
          className="w-full bg-mono-black text-mono-white font-bold py-5 px-10 text-lg uppercase tracking-wide hover:bg-mono-gray-dark transition-colors animate-fade-in-then-pulse"
          style={{
            animationDelay: "450ms",
            opacity: 0,
          }}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
