"use client";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react';
const CheckCalc = () => {
  const [saveValue, setSaveValue] = useState(20); 
  const [investValue, setInvestValue] = useState(10);
  const [livingValue, setlivingValue] = useState(30);
  const [funValue, setFunValue] = useState(5);
  const [checkAmount, setCheckAmount] = useState("");
  const [data, setData] = useState(null);
  const [amountSaved, setAmountSaved] = useState(0);
  const [amountInvested, setAmountInvested] = useState(0);
  const [username, setUsername] = useState('');


  useEffect(() => {   
    if (typeof window !== "undefined") { 
      // Function to fetch latest data
      const fetchLatestData = async () => {
        //GETS CURRENT USER FROM TOKEN STORAGE
        const Token = localStorage.getItem('token'); 
          if (Token) {
            try {
              const decoded = jwtDecode(Token); 
              //DECODE TOKEN AND FETCH USER  THROUGH GET FUNCTION IN BACKEND WITH url.searchParams.get('userId') TO GET userID
              const username = decoded.userId_name.name
              console.log(username)
              setUsername(username)
              const response = await fetch(`/api/account?type=financialDetails&userId=${encodeURIComponent(username)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              });
              if (!response.ok) {
                throw new Error(`Failed to fetch latest data, status: ${response.status}`);
              }
              const data = await response.json();
              console.log(data)
             
              setAmountSaved(data.amountSaved);
              setAmountInvested(data.amountInvested);
            } catch (error) {
              console.error('Error decoding token:', error);
            }
      };
  
    }
    fetchLatestData();

    // Polling for real-time updates
    const intervalId = setInterval(fetchLatestData, 50000); // REFRESH EVERY interval
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }
}, []); // Ensure useEffect has no dependencies unless necessary








//----------------------------------------------------------------------------------------------------------------------


useEffect(() => {
  // Define an async function inside the useEffect
  const sendPostData = async () => {
    if (amountSaved > 0 && amountInvested > 0 && username !== '') {
      const postData = {
        amountSaved: amountSaved,
        amountInvested: amountInvested,
        finAccount: username, // Use username from state
        formType: 'userMoney',
      };

      try {
        const res = await fetch("/api/account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
        if (!res.ok) {
          throw new Error("Failed to save savings/investment information");
        }

        // Success handling here
        console.log("Savings/investment information save successful");
        console.log(JSON.stringify(postData)); // Log or handle data
      } catch (error) {
        console.error(error);
        // Error handling here
      }
    }
  };

  // Immediately invoke the async function
  sendPostData();
}, [amountSaved, amountInvested, username]); 



const Calculate = async () => {
    
    const paycheckAmount = parseFloat(checkAmount);
    if (!paycheckAmount) {
      alert("Please enter a valid paycheck amount");
      return;
    }
    const savingAmount = Math.round((saveValue / 100) * paycheckAmount);
    const investmentAmount = Math.round((investValue / 100) * paycheckAmount);
    const livingExpensesAmount = Math.round(
      (livingValue / 100) * paycheckAmount
    );
    const funAmount = Math.round((funValue / 100) * paycheckAmount);
    const moneyData = {
      Savings: `$ ${savingAmount }`,
      Investments: `$ ${investmentAmount}`,
     ' Living Expenses': `$ ${livingExpensesAmount}`,
      Fun: `$ ${funAmount}`,

    };
   
    console.log(JSON.stringify(moneyData, null, 3));
    setData(moneyData);
    setAmountSaved(prevAmount => prevAmount + savingAmount);
    setAmountInvested(prevAmount => prevAmount + investmentAmount);
    setSaveValue(20);
    setInvestValue(10);
    setlivingValue(30);
    setFunValue(5);


    if (typeof window !== "undefined") { 
    const Token2 = localStorage.getItem('token'); 
    if (Token2) {
      try {
        const decoded = jwtDecode(Token2); 
        //DECODE TOKEN AND FETCH USER  THROUGH GET FUNCTION IN BACKEND WITH url.searchParams.get('userId') TO GET userID
        const username = decoded.userId_name.name
        console.log(username)
      
        setUsername(username)
      }catch(error){
        throw new Error('failed to get user',error)
      }
    }
  }
  }
    //use  a onSubmission inside of calculate button to be able to store
    // (savingAmount) & (investmentAmount) data in a form to be submitted as POST request in [route.js]file
    //ALSO make a mongoose model schema in the {models} folder for the (savingAmount) & (investmentAmount)
    //to be used in the [route.js]file 
  ;

  //delete handle 
const deleteAmounts = async ()=>{
  try {
    const res = await fetch(`/api/account?type=clear&userId=${encodeURIComponent(username)}`,{
      method: 'DELETE',
      headers: { "Content-Type": "application/json",
      "Accept": "application/json", // Indicate that you expect JSON in response
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_RENDER_KEY}` },
    })
    if(!res.ok){
     throw new Error('failed to delete')
    }
    console.log('success during deletion !')
  } catch (error) {
    console.log('error deleting amount info',error)
  }
  
  }

  {/*set amounts 
  //fetch a http post req body
  //fetch  a http get req to get the total amount for each user and render dynamic account
  */}
  const ClearTotals = () => {
    deleteAmounts()
    setAmountSaved(0)
setAmountInvested(0)
  };  
  return (
    <div className="flex justify-center w-full mt-2 mb-3">
      <div className="flex flex-col w-full max-w-md px-4">
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
          <span className="font-light text-orange-300">
            Saving: {saveValue + "%"}
          </span>
          {/*style inputs to be in 2 columns with 2 inputs in each column */}
          <input
            type="range"
            min="20"
            max="30"
            name="Slider"
            value={saveValue}
            onChange={(e) => setSaveValue(e.target.value)}  
          ></input>
          <span className="font-light text-orange-300">
            Investments: {investValue + "%"}
          </span>
          <input
            type="range"
            min="10"
            max="20"
            name="Slider"
            value={investValue}
            onChange={(e) => setInvestValue(e.target.value)}  
          ></input>
          <span className="font-light text-orange-300">
            Living Expenses: {livingValue + "%"}
          </span>
          <input
            type="range"
            min="30"
            max="40"
            name="Slider"
            value={livingValue}
            onChange={(e) => setlivingValue(e.target.value)}  
          ></input>
          <span className="font-light text-orange-300">
            Fun: {funValue + "%"}
          </span>
          <input
            type="range"
            min="5"
            max="10"
            name="Slider"
            value={funValue}
            onChange={(e) => setFunValue(e.target.value)}
          ></input>
{/**
 * ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
 * HIDE INPUT AND STORE THE SAVE AMOUNT AND INVESTMENT AMOUNT ON FORUM 
 * SUBMISSION ,,,,also the two hidden inputs are causing an Uncaught Error: 
 * Too many re-renders. React limits the number of renders  to prevent an infinite loop.
 */}
         
         
          <button
            type="button"
            onClick={Calculate}
            className=" text-slate-400 hover:text-orange-300"
          >
            Calculate
          </button>
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
          ) : (
            <span className="font-extralight">
              Enter values and click Calculate.
            </span>
          )}
        </div>

        <div className="flex flex-col items-center w-full space-y-4 mt-1 mb-3 border">
          <div className="flex text-center font-bold">Investing Totals</div>
          <div className="text-center items-center">
            <div>
              <h1 className="text-green-600">money saved $:{amountSaved}</h1>
              <h1 className="text-green-600">Investments $:{amountInvested}</h1>
              <button
                type="button mt-1"
                className=" text-slate-400 hover:text-red-400"
                onClick={ClearTotals}
              >
                Clear
              </button>
            </div>
            {/* Return users financial profile , (integrate AI to make better financial decisions ) */}
          </div>
        </div>
      </div>
    </div>
  );
          };

export default CheckCalc;