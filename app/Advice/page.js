'use client'
import React, { useState } from "react";
import OpenAI from "openai";

const Advice = () => {
    // User input data as a simple string for ease of handling
    const [gptData, setGptData] = useState("");
    // GPT response to the user
    const [gpt, setGpt] = useState("");

    const handleSubmit = async () => {
        const openai = new OpenAI({
            apiKey: '',
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
            <div className="flex items-center">
                {/* <button onClick={handleSubmit} className="mr-4 bg-orange-400 rounded-xl p-1">+</button> */}
                <input
                    className="form-input mt-1 block w-full p-2 rounded-md bg-inherit border-b-2 "
                    value={gptData} // This binds the input value to the component's state
                    onChange={(e) => setGptData(e.target.value)} // This updates the state on input change
                    type="text"
                    placeholder="Enter your prompt"
                />
            </div>
        </div>
    );
};

export default Advice;
