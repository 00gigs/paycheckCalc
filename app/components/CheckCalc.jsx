"use client";

import { redirect } from "next/dist/server/api-utils";
import React, { useState } from "react";
import { useRouter } from "next/router";


const CheckCalc = () => {
  const [saveValue, setSaveValue] = useState(20); // Initial value set to the min value of the slider
  const [investValue, setInvestValue] = useState(10);
  const [livingValue, setlivingValue] = useState(30);
  const [funValue, setFunValue] = useState(5);
  const [checkAmount, setCheckAmount] = useState("");

  // Event handler for the 'Save' slider
  const Calculate = () => {
    const paycheckAmount = parseFloat(checkAmount);
    if (!paycheckAmount) {
      alert("Please enter a valid paycheck amount");
      return;
    }
    const router = useRouter()
    const savingAmount = Math.round((saveValue / 100) * paycheckAmount);
    const investmentAmount = Math.round((investValue / 100) * paycheckAmount);
    const livingExpensesAmount = Math.round((livingValue / 100) * paycheckAmount);
    const funAmount = Math.round((funValue / 100) * paycheckAmount);
    const res ={'Savings':savingAmount,'Investments':investmentAmount,'Living Expenses':livingExpensesAmount,'Fun':funAmount}
      console.log(JSON.stringify(res,null,3))
    router.push('/')

  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gid grid-cols-2 justify-center items-center gap-2">
        <div className="flex items-center bg-transparent">
          <span className="text-white p-3">$</span>
          <input
            name="checkAmount"
            type="number"
            className="text-white text-center bg-transparent outline-none w-3/4 m-0"
            placeholder="Check amount"
            onChange={(e) => setCheckAmount(e.target.value)}
          />
        </div>
        <span>Saving: {saveValue + "%"}</span>
        <input
          type="range"
          min="20"
          max="30"
          name="Slider"
          value={saveValue}
          onChange={(e) => setSaveValue(e.target.value)}
        ></input>
        <span>Investments: {investValue + "%"}</span>
        <input
          type="range"
          min="10"
          max="20"
          name="Slider"
          value={investValue}
          onChange={(e) => setInvestValue(e.target.value)}
        ></input>
        <span>Living Expenses: {livingValue + "%"}</span>
        <input
          type="range"
          min="30"
          max="40"
          name="Slider"
          value={livingValue}
          onChange={(e) => setlivingValue(e.target.value)}
        ></input>
        <span>Fun: {funValue + "%"}</span>
        <input
          type="range"
          min="5"
          max="10"
          name="Slider"
          value={funValue}
          onChange={(e) => setFunValue(e.target.value)}
        ></input>
       
        <button type="button" onClick={Calculate} className=" text-slate-400">
       
        
          Calculate
        </button>
      </form>
    </div>
  );
};

export default CheckCalc;
