import React from 'react'
import ChartDisplay from './chart'

const Stock = () => {
  return (
    <div className="flex flex-col items-center w-full space-y-4 mt-2 mb-3">
    <div className="flex text-center font-bold">Stocks</div>
    <div className="text-center items-center">
  <ChartDisplay/>
    </div>
  </div>
  )
}

export default Stock
