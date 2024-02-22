"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <div className="flex justify-center h-screen items-center ">
        <div className="border-spacing-2 m-3 border-4 p-4 border-orange-300 md:h-80 md:w-full ">
          <form name="form" className="flex flex-col gap-5 md:text-2xl">
            <input
              // onChange={handleChange}
              type="email"
              name="Email"
              placeholder="Email"
              className="rounded text-center bg-transparent"
              // value={form.email}
            />
            <input
              // onChange={handleChange}
              type="password"
              name="Password"
              placeholder="Password"
              className="rounded text-center  bg-transparent"
              //  value={form.email}
            />
            <button type="submit" className="hover:text-green-200">
              Signin
            </button>
            {error && (
              <div className="rounded text-center bg-transparent text-red-400 font-bold">
                {error}
              </div>
            )}
            <Link href={"/Signup"}>
              <div className="hover:text-3xl text-center underline">
                Not Registered? SignUp
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
