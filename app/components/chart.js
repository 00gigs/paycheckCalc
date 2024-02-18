'use client'
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';


const ChartDisplay = () => {
  const chartContainerRef = useRef([]); // Create a ref for the chart container

  const getTics = async ()=>{
    const res = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo')
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const tics = await res.json()
    const seriesData = tics["Time Series (Daily)"];
    if (!seriesData) {
      console.error("Data not found or the response structure is different than expected.");
      return []; // Return an empty array or handle this case as appropriate
    }
    const convertedData = Object.entries(seriesData).map(([date, values]) => ({
        time: date,
        value: parseFloat(values["5. adjusted close"]) // Convert string to float for numerical operations
    }));
    convertedData.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
 console.log(convertedData)
    return convertedData;
  }
  
  
  
  useEffect(() => {
    const fetched = async()=>{
      const ChartData = await getTics()

     if (chartContainerRef.current) {
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      upColor: 'red',
      downColor: 'blue',
      localization: {
        dateFormat: 'YYYY/MM/DD',
      },
    });
    
    const lineSeries = chart.addLineSeries();
    // lineSeries.setData(ChartData)
    lineSeries.setData(ChartData)
    
  }
  ;
  // Cleanup function to remove the chart
  return () => {
    chart.remove();
    chartContainerRef.current.innerHTML = ''; // Clear the container's inner HTML
  };
  
}
fetched()
  }, []); // Empty dependency array ensures this runs only once after initial render

  return <div ref={chartContainerRef}></div>; // Use ref for the chart container
};

export default ChartDisplay;
