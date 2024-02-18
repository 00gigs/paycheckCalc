'use client'
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const ChartDisplay = () => {
  const chartContainerRef = useRef(null); // Create a ref for the chart container

  useEffect(() => {
    if (chartContainerRef.current) { // Ensure the div is mounted
      const chart = createChart(chartContainerRef.current, {
        width: 600,
        height: 300
      });
      const lineSeries = chart.addLineSeries();
      lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
      ]);
    }
  }, []); // Empty dependency array ensures this runs only once after initial render

  return <div ref={chartContainerRef} style={{ width: 400, height: 300 }}></div>; // Use ref for the chart container
};

export default ChartDisplay;
