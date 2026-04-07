import React from 'react';

const WatchMechanism = () => {
  const majorTicks = Array.from({ length: 12 }, (_, i) => i * 30);
  const minorTicks = Array.from({ length: 60 }, (_, i) => i * 6).filter(
    (a) => a % 30 !== 0
  );

  return (
    <div className="relative aspect-square w-full opacity-85 select-none pointer-events-none">

      {/* Outermost faint boundary ring */}
      <div className="absolute inset-0 rounded-full border border-[#C8D8F0]/10" />

      {/* Outer ring — slow clockwise */}
      <div className="watch-ring-outer absolute inset-2 rounded-full border border-[#C8D8F0]/20">
        {/* Major tick marks on outer ring */}
        {majorTicks.map((angle) => (
          <div
            key={`outer-major-${angle}`}
            className="absolute left-1/2 top-0 h-4 w-px bg-[#C8D8F0]/40"
            style={{
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: '50% 100%',
              height: '50%',
            }}
          />
        ))}
        {/* Minor tick marks on outer ring */}
        {minorTicks.map((angle) => (
          <div
            key={`outer-minor-${angle}`}
            className="absolute left-1/2 top-0 h-2 w-px bg-[#C8D8F0]/20"
            style={{
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: '50% 100%',
              height: '50%',
            }}
          />
        ))}
      </div>

      {/* Middle ring — counter-clockwise */}
      <div className="watch-ring-middle absolute inset-12 rounded-full border border-[#C8D8F0]/15">
        {majorTicks.map((angle) => (
          <div
            key={`mid-${angle}`}
            className="absolute left-1/2 top-0 h-8 w-[2px] bg-[#B8960C]/30"
            style={{
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: '50% 100%',
              height: '50%',
            }}
          />
        ))}
      </div>

      {/* Inner ring — fast clockwise */}
      <div className="watch-ring-inner absolute inset-24 rounded-full border border-[#C8D8F0]/20">
        {majorTicks.map((angle) => (
          <div
            key={`inner-${angle}`}
            className="absolute left-1/2 top-0 h-2 w-1 bg-[#EEF2F9]/40"
            style={{
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: '50% 100%',
              height: '50%',
            }}
          />
        ))}
      </div>

      {/* Innermost static ring */}
      <div className="absolute inset-[112px] rounded-full border border-[#B8960C]/20 bg-[#0B1428]/80 backdrop-blur-sm" />

      {/* Gold center dot */}
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8960C] shadow-[0_0_15px_rgba(184,150,12,0.5)]">
        <div className="absolute inset-0 animate-ping rounded-full bg-[#B8960C]/40" />

        {/* Brand initials fixed in center */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="font-serif text-[10px] text-[#0B1428]">
            RS
          </span>
        </div>
      </div>
    </div>
  );
};

export default WatchMechanism;
