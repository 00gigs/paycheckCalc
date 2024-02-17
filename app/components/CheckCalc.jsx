'use client'

import React,{useState} from 'react'

const CheckCalc = () => {

    const [saveValue, setSaveValue] = useState(20);; // Initial value set to the min value of the slider
    const [investValue, setInvestValue] = useState(10);
    const [livingValue, setlivingValue] = useState(30);
    const [funValue, setFunValue] = useState(5);
    const [checkAmount, setCheckAmount] = useState('');

    // Event handler for the 'Save' slider
    const Calculate = () => {
      const paycheckAmount = parseFloat(checkAmount);
      if (!paycheckAmount) {
        alert('Please enter a valid paycheck amount');
        return;
      }
      
      const savingAmount = Math.round((saveValue / 100) * paycheckAmount);
      const investmentAmount = Math.round((investValue / 100) * paycheckAmount);
      const livingExpensesAmount = Math.round((livingValue / 100) * paycheckAmount);
      const funAmount = Math.round((funValue / 100) * paycheckAmount);
  
      alert(`Saving: ${savingAmount}, Investments: ${investmentAmount}, Living Expenses: ${livingExpensesAmount}, Fun: ${funAmount}`);
    };

  return (
    <div className='flex justify-center'>
        <form className='flex flex-col gid grid-cols-2 justify-center items-center gap-2'>
        <input name='Check amount' type='number' className='text-black flex text-center bg-transparent' placeholder='Check amount'/>
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
        <button onClick={Calculate} className='border'>Calculate</button>
        </form>
      
    </div>
  )
  
}

export default CheckCalc