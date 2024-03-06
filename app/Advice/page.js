'use client'
import React, {useState} from "react";
import OpenAI from "openai";


//OPEN AI CHARGES WATCH API USAGE❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️



const Advice = () => {

    
  

    const [gpt,setGpt] = useState()
    
//     const openai = new OpenAI({apiKey:'',
//     dangerouslyAllowBrowser: true,
// });
    
    async function main() {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "how to turn 400 dollars into 600." }],
        model: "gpt-3.5-turbo",
      });
    const result =  completion.choices[0].message.content
      console.log(completion.choices[0].message.content);
      setGpt(result)
    }
    
    // main();


   
const fetchData = () => {

}  


const onsubmit = () => {

} 


  return (
    //flex col flex = vertical stack

    <div className="flex flex-col items-center justify-center align-middle p-7 text-center">
      <h1 className="mb-5 text-lg font-bold">
        Meet Fin, the Ai financial friend 👋
      </h1>

      {/**result display /AI text */}
      <div className=" text-wrap  flex  w-3/4 border-4 border-orange-300 m-3 p-4 bg-slate-400 bg-opacity-25 rounded-md text-slate-200 max-h-80 overflow-y-auto tracking-widest">
        {gpt}
      </div>

      {/**submit button   */}

      <div className="flex items-center">
        <button className="flex mr-4 bg-orange-400 rounded-xl w-fit  p-1">+</button>
        {/**inpunt   */}
        <input className=" form-input mt-1 block w-fit p-2 rounded-md bg-inherit border-b-2"/>
      </div>
    </div>
  );
};

export default Advice;
