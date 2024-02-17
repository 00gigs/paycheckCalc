"use client";
import { ApiKEy } from "../ServerOps/apiKey";
import React from "react";
import { useState,useEffect } from "react";

const Articles = () => {
const [newsData,setNewsData] = useState([])

useEffect(() => {
  const fetching = async () => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/news?token=${ApiKEy}&category=general`
      );
      const data = await response.json();
      console.log(data);
      setNewsData(data)
    } catch (error) {
      console.error("Error fetching market news:", error);
    }
  };
  fetching()
}, [])


  return (
    <div className="flex flex-col items-center w-full space-y-4 mt-2 mb-3">
      <h1 className="flex text-center font-bold">Market News</h1>
      <div className="text-center items-center">
        {newsData.map((news,index)=>(
          <ul>
            <li key={index}>
            <div className="sm:text-sm font-normal border border-orange-400 rounded-md py-2 m-3">
              <a href={news.url}>
              {news.headline}
              </a>
            </div>
            </li>
          </ul>

        ))}
      </div>
    </div>
  );
};

export default Articles;
