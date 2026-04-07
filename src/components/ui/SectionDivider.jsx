import React from 'react';

const SectionDivider = ({ label }) => {
  return (
    <div className="py-6 flex justify-center">
      <svg 
        viewBox="0 0 480 24" 
        width="100%" 
        style={{ maxWidth: '480px', height: '24px' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="12" x2="480" y2="12" stroke="rgba(200,216,240,0.1)" strokeWidth="0.5"/>
        
        {[0, 40, 80, 120, 160, 200, 220, 240, 260, 280, 320, 360, 400, 440, 480].map((x) => {
          const isMajor = x === 0 || x === 240 || x === 480;
          return (
            <line
              key={x}
              x1={x}
              y1={isMajor ? 5 : 8.5}
              x2={x}
              y2={isMajor ? 19 : 15.5}
              stroke={isMajor ? "rgba(200,216,240,0.4)" : "rgba(200,216,240,0.18)"}
              strokeWidth={isMajor ? 1 : 0.5}
            />
          );
        })}

        {label && (
          <>
            <rect x="224" y="11" width="32" height="2" fill="#050A18" />
            <text 
              x="240" 
              y="16" 
              textAnchor="middle" 
              fontFamily="JetBrains Mono, monospace" 
              fontSize="8" 
              fill="rgba(184,150,12,0.55)"
            >
              {label}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default SectionDivider;
