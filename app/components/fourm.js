'use client'
import React ,{ useState }from "react";

export const Fourm = () => {

const [formData,setFormData] = useState({
  postbody:"",
})

const changeHandle = (e) =>{
  const {name,value } = e.target
  setFormData((prevState)=>({
    ...prevState,
    [name]:value,
  }))
}

const formSub = async (e) =>{
e.preventDefault()
const res = await fetch()
}

  return (
    <div className="flex flex-col items-center w-full space-y-4 mt-2 mb-3">
      <form>
      <div className="grid-cols-2 grid">
        <button className="hover:scale-110 w-1/4 flex justify-center">
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/color/48/filled-plus-2-math.png"
            alt="filled-plus-2-math"
          />
        </button>
        <div className="hover:border-b-2">
          <input
            name="postbody"
            className="rounded-lg text-slate-300 bg-transparent text-center items-center"
            type="text"
            placeholder="Type message here"
            value={formData.value}
            onChange={changeHandle}
          />
        </div>
      </div>
      <div>
        <span>#username</span>
        <p>#post body</p>
      </div>
      </form>
    </div>
  );
};
