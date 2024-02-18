"use client";


import React, { useState } from "react";



const CheckCalc = () => {
  const [saveValue, setSaveValue] = useState(20); // Initial value set to the min value of the slider
  const [investValue, setInvestValue] = useState(10);
  const [livingValue, setlivingValue] = useState(30);
  const [funValue, setFunValue] = useState(5);
  const [checkAmount, setCheckAmount] = useState("");
  const [data,setData] = useState(null)
  const [amountSaved,setAmountSaved] = useState(0)
  const [amountInvested,setAmountInvested] = useState(0)
  // Event handler for the 'Save' slider
  const Calculate = () => {
    const paycheckAmount = parseFloat(checkAmount);
    if (!paycheckAmount) {
      alert("Please enter a valid paycheck amount");
      return;
    }
    const savingAmount = Math.round((saveValue / 100) * paycheckAmount);
    const investmentAmount = Math.round((investValue / 100) * paycheckAmount);
    const livingExpensesAmount = Math.round((livingValue / 100) * paycheckAmount);
    const funAmount = Math.round((funValue / 100) * paycheckAmount);
    const res ={'Savings':`$ ${savingAmount}`,'Investments':`$ ${investmentAmount}`,'Living Expenses':`$ ${livingExpensesAmount}`,'Fun':`$ ${funAmount}`}
    console.log(JSON.stringify(res,null,3))
    setData(res)
setAmountSaved(savingAmount+amountSaved)
setAmountInvested(investmentAmount+amountInvested)
setSaveValue(20)
setInvestValue(10)
setlivingValue(30)
setFunValue(5)
  };
  
  const ClearTotals = () =>{
    setAmountSaved(0)
setAmountInvested(0)
  }
  


  return (
    <div className="flex justify-center w-full mt-2 mb-3">

<div  className="flex flex-col w-full max-w-md px-4">
    <h1 className="flex justify-center  text-center font-bold">
    ALLOCATION CALCULATOR
    </h1>
<form className="flex flex-col justify-center items-center gap-2">
        <div className="flex items-center bg-transparent">
          <span className="text-white p-3">$</span>
          <input
            name="checkAmount"
            type="text"
            className="text-white text-center bg-transparent outline-none w-3/4 m-0"
            placeholder="Check amount"
            onChange={(e) => setCheckAmount(e.target.value)}
          />
        </div>
        <span className="font-light text-orange-300">Saving: {saveValue + "%"}</span>
        <input
          type="range"
          min="20"
          max="30"
          name="Slider"
          value={saveValue}
          onChange={(e) => setSaveValue(e.target.value)}
        ></input>
        <span className="font-light text-orange-300">Investments: {investValue + "%"}</span>
        <input
          type="range"
          min="10"
          max="20"
          name="Slider"
          value={investValue}
          onChange={(e) => setInvestValue(e.target.value)}
        ></input>
        <span className="font-light text-orange-300">Living Expenses: {livingValue + "%"}</span>
        <input
          type="range"
          min="30"
          max="40"
          name="Slider"
          value={livingValue}
          onChange={(e) => setlivingValue(e.target.value)}
        ></input>
        <span className="font-light text-orange-300">Fun: {funValue + "%"}</span>
        <input
          type="range"
          min="5"
          max="10"
          name="Slider"
          value={funValue}
          onChange={(e) => setFunValue(e.target.value)}
        ></input>
        <button type="button" onClick={Calculate} className=" text-slate-400 hover:text-orange-300">Calculate</button>
      </form>
      <div className="flex px-3 align-center justify-center text-center m-1">
  {data ? (
    <ul className="whitespace-nowrap ">
      {Object.entries(data).map(([key, value]) => (
        <li key={key} className="overflow-hidden text-ellipsis ">
          {`${key}: ${value}`}
        </li>
      ))}
    </ul>
  ) : <span className="font-extralight">Enter values and click Calculate.</span>}
</div>

<div className="flex flex-col items-center w-full space-y-4 mt-1 mb-3 border">
      <div className="flex text-center font-bold">Investing Totals</div>
      <div className="text-center items-center">
        <div >
          <h1 className="text-green-600">money saved $:{amountSaved}</h1>
          <h1 className="text-green-600">Investments $:{amountInvested}</h1>
          <button type="button mt-1" className=" text-slate-400 hover:text-red-400" onClick={ClearTotals}>Clear</button>
        </div>
        {/* Return users financial profile , (integrate AI to make better financial decisions ) */}
      </div>
    </div>
</div>
    </div>
  );
};

export default CheckCalc;
