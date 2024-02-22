"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Signup = () => {
const router = useRouter()

  //empty form data
  const [form, setForm] = useState({
    name: "", // Changed from User to name
    email: "", // Changed from Email to email
    Password: "", // Keep Password as is
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
    const res = await fetch("/app/api/account",{
      method:"POST",
      headers:{"Content-Type": "application/json",},
      body: JSON.stringify({form}),
    })
if(!res.ok){
throw new Error('Failed to create user')
}

router.refresh()
router.push('/')

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
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="UserName"
              className="rounded text-center bg-transparent"
              value={form.name}
            />
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              className="rounded text-center bg-transparent"
              value={form.email}
            />
            <input
              onChange={handleChange}
              type="password"
              name="Password"
              placeholder="Password"
              className="rounded text-center  bg-transparent"
              value={form.Password}
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
