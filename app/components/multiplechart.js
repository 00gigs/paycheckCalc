import React from 'react';
import ChartDisplay from '../components/chart' // Adjust the import path as necessary

const MultiChartDisplay = () => {
  const tics = ["", "", "", "", "", "", "",""]; // Example ticker symbols

  return (
    <div className='flex gap-6  overflow-x-scroll h-55'>
      {tics.map((tic, index) => (
        <div key={index} className="chart-container text-center mt-9 mb-8">
          <ChartDisplay tic={tic} />
        </div>
      ))}
    </div>
  );
};

export default MultiChartDisplay;
