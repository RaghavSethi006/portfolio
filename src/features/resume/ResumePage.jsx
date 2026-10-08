import React from 'react';
import NajdorfResume from './NajdorfResume';

const ResumePage = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NajdorfResume />
      </div>
    </div>
  );
};

export default React.memo(ResumePage);
