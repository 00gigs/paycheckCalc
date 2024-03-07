"use client";
import React from "react";
import { useState,useEffect } from "react";



const Articles = () => {
const [newsData,setNewsData] = useState([])
useEffect(() => {
  const fetching = async () => {
    
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/news?token=${process.env.NEXT_PUBLIC_ApiKEy}&category=general` ); 
      const data = await response.json();
      console.log(data);
      setNewsData(data.slice(0,30))
    } catch (error) {
      console.error("Error fetching market news:", error);
    }
  };
  fetching()
}, [])


  return (
    <div className="flex flex-col items-center w-full space-y-4 mt-2 mb-3">
      <h1 className="flex text-center font-bold">Market News</h1>
      <div className="text-center items-center  overflow-y-scroll max-h-96">
        {newsData.map((news,index)=>(
          <ul>
            <li key={index}>
            <div className="sm:text-sm font-light text-slate-300 border-4 border-orange-400  hover:border-orange-200 rounded-md py-2 m-3">
              <a href={news.url}>
                <div className="md:text-3xl">
              {news.headline}
                </div>
              <hr></hr>
              {news.image ? <div className="flex justify-center  py-4">
             <img className="md:w-72 border-2 rounded-r py-2" src={news.image}/>
              </div>
              :
              <div className="flex justify-center  py-4">
                  <img className="md:w-72 border-2 rounded-r py-2" src='https://cdn.mos.cms.futurecdn.net/apZwQKgs2BYj8ebCV2NRqe.jpg'/>
              </div>
              }
              {news.source}
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
