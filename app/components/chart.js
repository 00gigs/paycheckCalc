"use client";
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
// import { ChartAPIKEY } from "../ServerOps/apiKey";${ChartAPIKEY}

const ChartDisplay = () => {
  const chartContainerRef = useRef(null); // Create a ref for the chart container
  const chartInstanceRef = useRef(null); // Ref to store the chart instance
  const tic = "IBM";

  const getTics = async () => {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tic}&apikey=demo`
      //API rate LIMIT is 25 requests per day
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const tics = await res.json();
    const seriesData = tics["Time Series (Daily)"];
    if (!seriesData) {
      console.error(
        "Data not found or the response structure is different than expected."
      );
      return []; // Return an empty array or handle this case as appropriate
    }
    const convertedData = Object.entries(seriesData).map(([date, values]) => ({
      time: date,
      value: parseFloat(values["4. close"]), // Convert string to float for numerical operations
    }));
    convertedData.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    console.log(convertedData);
    return convertedData;
  };

  useEffect(() => {
    const createChartInstance = async () => {
      console.log("Creating chart instance");
      const ChartData = await getTics();
      // Dispose of the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
      }
      const chart = createChart(chartContainerRef.current, {
        width: 600,
        height: 150,
        localization: {
          dateFormat: "YYYY/MM/DD",
        },
      });
      const lineSeries = chart.addLineSeries();
      lineSeries.setData(ChartData);
      // Store the new chart instance
      chartInstanceRef.current = chart;
    };

    createChartInstance();

    // Cleanup function to remove the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
      }
    };
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <div>
      <span>{tic}</span>
      <div ref={chartContainerRef}></div>
    </div>
  ); // Use ref for the chart container
};

export default ChartDisplay;
