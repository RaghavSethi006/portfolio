import React from 'react';

const GlobalStyles = () => (
    <style jsx global>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(6, 182, 212, 0.5);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(6, 182, 212, 0.7);
    }
    
    /* Smooth scrolling for all browsers */
    html {
      scroll-behavior: smooth;
    }
    
    /* Custom focus styles for better accessibility */
    button:focus-visible, 
    input:focus-visible, 
    textarea:focus-visible {
      outline: 2px solid rgba(6, 182, 212, 0.8);
      outline-offset: 2px;
    }
  `}</style>
);

export default GlobalStyles;
