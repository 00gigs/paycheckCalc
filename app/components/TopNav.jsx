"use client";
import { navLinks } from "@/constants";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { jwtDecode } from "jwt-decode";




const TopNav = () => {


  const [username,setUsername] = useState('')
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Move this inside useEffect
    if (token) {
      try {
        const decoded = jwtDecode(token); // Ensure jwtDecode is correctly used
        setUsername(decoded.userId_name.name || 'User'); // Assuming the token correctly includes userId_name
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);
/**👆👆
   * get token
   * if token decode 
   * set as username
   * 
   * 
   */




  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };


 
  return (
    <div className="flex">
      <Link href={"/"}>
        <h1 className="text-4xl underline underline-offset-8 py-3 m-2 text-orange-400">
          SMART SAVE
        </h1>
      </Link>
      <ul className="flex gap-3 justify-center max-sm:hidden font-bold p-4">
        {navLinks.map((link) => (
          <Link  href={link.route}>
            <li>{link.label}</li>
          </Link>
        ))}
        {username ? (
          <li className="list-none">Hello, {username} </li>
        ) : (
          <Link href={"/Signup"}>
            <li className="list-none">Signup</li>
          </Link>
        )}
      </ul>

      <div
        className="sm:hidden absolute right-0 hover:cursor-pointer text-3xl py-3"
        onClick={mobileMenuHandler}
      >
        {openMobileMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {/* Mobile MENU */}
      {openMobileMenu && (
        <mobile className="md:hidden">
          <div className="absolute right-2 w-min bg-gray-700 top-10 shadow-md rounded-md p-4 text-white text-center z-[99999]">
            {navLinks.map((link) => (
              <Link href={link.route}>
                <li className="list-none">{link.label}</li>
              </Link>
            ))}
            {username ? (
          <li className="list-none">Hello, {username} </li>
        ) : (
          <Link href={"/Signup"}>
            <li className="list-none">Signup</li>
          </Link>
        )}
          </div>
        </mobile>
      )}
    </div>
  );
  
};

export default TopNav;
