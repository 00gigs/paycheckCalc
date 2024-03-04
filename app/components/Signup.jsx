"use client"; 
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";





const Signup =  () => {
  const router = useRouter()
  
 

  //empty form data
  const [form, setForm] = useState({
    //make sure form input states are uniform across app
    name: "", 
    email: "", 
    password: "", 
    formType: "user",
  });

  

 

  const handleChange = (e)=>{
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
}

  const handleSubmit= async (e) => {
    e.preventDefault()
    const res = await fetch("/api/account",{
      method:"POST",
      headers:{"Content-Type": "application/json",},
      // Wrapping ({form}) in curly braces will result in error mongoDB expects 
      // a non-nested object(obj inside another {form: { name: "", email: "", Password: "" }}) 
      // payload structure  👇🏻
      body: JSON.stringify(form),
    })
if(!res.ok){
throw new Error('Failed to create user')
}


alert('account created sucessfully')//replace with toast notifications
router.refresh()
router.push('/Signin')


  }

  return (
    <div>
      <div className="flex justify-center h-screen items-center ">
        <div className="border-spacing-2 m-3 border-4 p-4 border-orange-300 md:h-80 md:w-full ">
          <form
            name="form"
            className="flex flex-col gap-5 md:text-2xl"
            method="post"
            onSubmit={handleSubmit}
          >
            <input
              required
              minlength="5"
              maxlength="20"
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="UserName"
              className="rounded text-center text-black "
              value={form.name}
            />
            <input
              required
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              className="rounded text-center  text-black"
              value={form.email}
            />
            <input
              required
              onChange={handleChange}
              minlength="5"
              maxlength="20"
              type="password"
              name="password"
              placeholder="Password"
              className="rounded text-center   text-black"
              value={form.password}
            />
            <button type="submit" className="hover:text-green-200">
              Register
            </button>
            {/* {error && (
              <div className="rounded text-center bg-transparent text-red-400 font-bold">
                {error}
              </div>
            )} */}
            <Link href={"/Signin"}>
              <div className="hover:text-3xl text-center underline">
                Already Registered? SignIn
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;