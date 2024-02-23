'use client'
import React ,{ useState }from "react";

export const Fourm = () => {

const [formData,setFormData] = useState({
  postBody:"",
  formType: "forumPost",
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
 const res = await fetch("/api/account",{
      method:"POST",
      headers:{"Content-Type": "application/json",},
      // Wrapping ({form}) in curly braces will result in error mongoDB expects 
      // a non-nested object(obj inside another {form: { name: "", email: "", Password: "" }}) 
      // payload structure  👇🏻
      body: JSON.stringify(formData),
    })
if(!res.ok){
throw new Error('Failed to create post')
}else{
alert('post created sucessfully')
console.log(formData)
}
}
  return (
    <div className="space-y-4 mt-2 mb-3">
      <form 
      className="flex flex-col items-center w-full"
      name="form"
      onSubmit={formSub}
      method="post">
        <h1 className="font-bold mt-2 mb-4">Finance Forum</h1>
      <div className="flex items-center space-x-4">
        <button className="flex justify-center items-center w-7 h-7 bg-orange-300 rounded-xl hover:scale-110 transition-transform">
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/color/48/filled-plus-2-math.png"
            alt="filled-plus-2-math"
          />
        </button>
        <div>
          <input
            name="postBody"
            className="w-full rounded-lg text-slate-300 bg-transparent  px-4 py-2"
            //rounded-lg text-slate-300 bg-transparent
            type="text"
            placeholder="Type message here"
            value={formData.postBody}
            onChange={changeHandle}
          />
        </div>
      </div>
      </form>
      {/* users chat goes down below  👇🏻 */}
      <div className = "flex flex-col items-center space-x-4">
        <span className=" italic font-light">@FantasyFinancial1997</span>
        <p>Is Bitcoin the future ?</p>
        <span className="font-light text-sm">-1:20pm</span>
      </div>
    </div>
  );
};
