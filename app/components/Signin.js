"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ModalComponent from "./myModal";
const Signin = () => {
const router = useRouter()


const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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

  const handleCloseModal = () => {
    setShowModal(false);
  };
  /*use handleSubmit in checkCalc to send a post req with body containing amount saved and amount invested along with the current user.
you can use useState and form as const
  */

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

    if (res.status === 401) {
      setModalMessage("Make sure user credentials are correct. Please try again.");
      setShowModal(true);
      return; // Exit the function early
    }
    if (res.status === 500) {
      setModalMessage("please Sign up, if you do not have an account");
      setShowModal(true);
      return; // Exit the function early
    }

    if (!res.ok) {
      throw new Error("Failed to Signin user");
    }


    const data = await res.json();

    router.refresh();
    router.push("/");
    localStorage.setItem('token', data.token);
    console.log(localStorage.getItem('token'))
    window.dispatchEvent(new Event('tokenChanged'));
  };

  return (
    <div>
       {showModal && <ModalComponent message={modalMessage} onClose={handleCloseModal} />}
      <div className="flex justify-center h-screen items-center ">
        <div className="border-spacing-2 m-3 border-4 p-4 border-orange-300 md:h-80 md:w-full">
          <form
            name="form"
            className="flex flex-col gap-5 md:text-2xl sm:text-sm w-40 md:w-full"
            method="post"
            onSubmit={handleSubmit}
          >
            <input
              required
            
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              className="rounded text-center  text-black "
              value={form.email}
            />
            <input
              required
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              className="rounded text-center  text-black"
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