'use client'

import React,{useState} from 'react'

const CheckCalc = () => {

    const [saveValue, setSaveValue] = useState(20);; // Initial value set to the min value of the slider
    const [investValue, setInvestValue] = useState(10);
    const [livingValue, setlivingValue] = useState(30);
    const [funValue, setFunValue] = useState(5);

    // Event handler for the 'Save' slider
    const handleSaveChange = (event) => {
      setSaveValue(event.target.value);
    };

  return (
    <div className='flex justify-center'>
        <form className='flex flex-col gid grid-cols-2 justify-center items-center gap-2'>
        <input name='Check amount' type='number' className='text-black flex text-center' placeholder='Check amount'/>
        <span>Saving: {saveValue + '%'}</span>
        <input type="range" min="20" max="30"  name="Slider" 
        value={saveValue} 
        onChange={(e) => setSaveValue(e.target.value)}
        ></input>
        <span>Investments: {investValue + '%'}</span>
        <input type="range" min="10" max="20" name="Slider"
        value={investValue} 
        onChange={(e) => setInvestValue(e.target.value)}></input>
        <span>Living Expenses: {livingValue + '%'}</span>
        <input type="range" min="30" max="40" name="Slider"
        value={livingValue} 
        onChange={(e) => setlivingValue(e.target.value)}></input>
        <span>Fun: {funValue + '%'}</span>
        <input type="range" min="5" max="10" name="Slider"
        value={funValue} 
        onChange={(e) => setFunValue(e.target.value)}></input>
        <button>Calculate</button>
        </form>
       <h1>
        test
       </h1>
    </div>
  )
}

export default CheckCalc