'use client'
import { jwtDecode } from "jwt-decode";
import React, { useState,useEffect } from "react";
import OpenAI from "openai";

const Advice = () => {
    // User input data as a simple string for ease of handling
    const [gptData, setGptData] = useState("");
    // GPT response to the user
    const [gpt, setGpt] = useState("");

    const [username, setUsername] = useState('');

useEffect(() => {
    if (typeof window !== "undefined") {
    const users = () =>{
        try {
            const Token3 = localStorage.getItem('token'); 
            if (Token3) {
             
                const decoded = jwtDecode(Token3); 
                //DECODE TOKEN AND FETCH USER  THROUGH GET FUNCTION IN BACKEND WITH url.searchParams.get('userId') TO GET userID
                const username = decoded.userId_name.name
                console.log(username)
                setUsername(username)
            } else {
                console.log('failed to get user',error)
            
        }
              }catch(error){
                console.log('Error decoding token || no Signed in user');
              }
    }
    
    users()

    const intervalId = setInterval(users, 5000); // REFRESH EVERY interval
    // Cleanup on unmount
    return () => clearInterval(intervalId);
}
}, [])



    

    const handleSubmit = async () => {

        const openai = new OpenAI({
            // apiKey: '',
            dangerouslyAllowBrowser: true,
        });

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: gptData }],
            });
            const result = completion.choices[0].message.content;
            setGpt(result);
            setGptData("");
        } catch (error) {
            console.error("Error fetching GPT-3 completion:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="text-wrap flex w-full border-4 border-orange-300 m-3 p-4 bg-slate-400 bg-opacity-25 rounded-md text-slate-200 max-h-80 overflow-y-auto mx-3 my-3 ">
                
                {gpt}
            </div>

{username ? <div className="flex items-center">
                {/* <button onClick={handleSubmit} className="mr-4 bg-orange-400 rounded-xl p-1">+</button> */}
                <input
                    className="form-input mt-1 block w-full p-2 rounded-md bg-inherit border-b-2 "
                    value={gptData} // This binds the input value to the component's state
                    onChange={(e) => setGptData(e.target.value)} // This updates the state on input change
                    type="text"
                    placeholder="Enter your prompt"
                />
            </div>:
            <div className="flex items-center">
            {/* <button onClick={handleSubmit} className="mr-4 bg-orange-400 rounded-xl p-1">+</button> */}
            <p className="flex justify-center">Please <a className=" ml-1 mr-1 text-green-500 hover:text-green-100 font-bold  duration-300 " href="/Signin"> log in </a> to use Fin the Financial AI.</p>
        </div>}

            
        </div>
    );
};

export default Advice;
