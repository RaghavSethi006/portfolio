import React, { useEffect, useState } from 'react';

const DataTicker = () => {
  const tickerString = "GPT-4o · ♙e4 e5 ♘f3 · RAGHAV SETHI · transformer · d4 ♘f6 c4 · FAISS · LangChain · ♔g1 · neural net · RAG pipeline · ♕d1-h5 · 2024:Alberta · OpenCV · ♗b5 · attention is all you need · Qd5+ · HuggingFace · ♖e1 · entropy · ♙c5 · precision · Streamlit · ♟ · backpropagation · ♘c3 · inference · Node.js · ♙a4 · embeddings · ♚ · PyTorch · Nf3 Nc6 · systems think first · ";
  const fullString = tickerString + tickerString;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes ticker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-animate {
            display: inline-block;
            animation: ticker-scroll 60s linear infinite;
          }
          .ticker-paused {
            animation-play-state: paused !important;
          }
        `}
      </style>
      <div 
        className="w-full overflow-hidden bg-[#050A18] py-2.5 whitespace-nowrap"
        style={{ borderTop: '0.5px solid #1A2744', borderBottom: '0.5px solid #1A2744' }}
      >
        <div className={`ticker-animate font-mono text-[10px] tracking-[0.12em] text-[#8BA3C7] opacity-45 ${prefersReducedMotion ? 'ticker-paused' : ''}`}>
          {fullString}
        </div>
      </div>
    </>
  );
};

export default DataTicker;
