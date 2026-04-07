import React, { useState } from 'react';

const quotes = ['Precision over flash.', 'Systems think first.', 'Solve for the long game.'];

const CardFlipEgg = () => {
  const [flipped, setFlipped] = useState(false);
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <div className="group flex flex-col items-center gap-3">
      <div 
        className="cursor-pointer"
        style={{ width: '52px', height: '72px', perspective: '600px' }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div 
          className="relative w-full h-full"
          style={{ 
            transformStyle: 'preserve-3d', 
            transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Back Face */}
          <div 
            className="absolute inset-0 bg-[#0E1A34] rounded-md overflow-hidden"
            style={{ border: '0.5px solid rgba(200,216,240,0.2)', backfaceVisibility: 'hidden' }}
          >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="cardPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <line x1="0" y1="8" x2="8" y2="0" stroke="rgba(200,216,240,0.05)" strokeWidth="0.5" />
                <line x1="0" y1="4" x2="4" y2="0" stroke="rgba(200,216,240,0.05)" strokeWidth="0.5" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#cardPattern)" />
            </svg>
          </div>

          {/* Front Face */}
          <div 
            className="absolute inset-0 bg-[#0E1A34] rounded-md p-1.5"
            style={{ 
              border: '0.5px solid rgba(184,150,12,0.35)', 
              backfaceVisibility: 'hidden', 
              transform: 'rotateY(180deg)' 
            }}
          >
            <span className="absolute top-1 left-1.5 font-serif text-[7px] text-[#C8D8F0]/45">♠</span>
            <span className="absolute top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 text-center font-serif italic text-[6.5px] leading-tight text-[#C8D8F0]/70">
              {quote}
            </span>
            <span className="absolute bottom-1 right-1.5 font-serif text-[7px] text-[#C8D8F0]/45 rotate-180">♠</span>
          </div>
        </div>
      </div>
      
      <span 
        className="font-mono text-[7px] text-[rgba(138,163,199,0)] transition-colors duration-400 ease-out group-hover:text-[rgba(138,163,199,0.4)]"
        style={{ transitionDelay: '300ms' }}
      >
        find the card.
      </span>
    </div>
  );
};

export default CardFlipEgg;
