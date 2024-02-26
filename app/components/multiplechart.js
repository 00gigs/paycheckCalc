import React from 'react';
import ChartDisplay from '../components/chart' // Adjust the import path as necessary

const MultiChartDisplay = () => {
  const tics = ["IBM", "AAPL", "GOOGL", "MSFT", "AMZN", "FB"]; // Example ticker symbols

  return (
    <div className='flex gap-6  overflow-x-scroll'>
      {tics.map((tic, index) => (
        <div key={index} className="chart-container text-center mt-3 mb-10">
          <ChartDisplay tic={tic} />
        </div>
      ))}
    </div>
  );
};

export default MultiChartDisplay;
