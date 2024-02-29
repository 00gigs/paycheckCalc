"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Signin = () => {
const router = useRouter()

  const [form, setForm] = useState({
    //make sure form input states are uniform across app
    email: "",
    password: "",
    formType: "login",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Wrapping ({form}) in curly braces will result in error mongoDB expects
      // a non-nested object(obj inside another {form: { name: "", email: "", Password: "" }})
      // payload structure  👇🏻
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      throw new Error("Failed to Signin user");
    }

    const data = await res.json();

    localStorage.setItem('token', data.token);
    window.dispatchEvent(new Event('tokenChanged'));

    alert("SignIn successful"); //replace with toast notifications
    router.refresh();
    router.push("/");
  };

  return (
    <div>
      <div className="flex justify-center h-screen items-center ">
        <div className="border-spacing-2 m-3 border-4 p-4 border-orange-300 md:h-80 md:w-full">
          <form
            name="form"
            className="flex flex-col gap-5 md:text-2xl sm:text-sm w-40"
            method="post"
            onSubmit={handleSubmit}
          >
            <input
              required
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              className="rounded text-center bg-transparent"
              value={form.email}
            />
            <input
              required
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              className="rounded text-center  bg-transparent"
              value={form.password}
            />
            <button type="submit" className="hover:text-green-200">
              Signin
            </button>
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