"use client";
import { navLinks } from "@/constants";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";



const TopNav = () => {
  const router = useRouter()

  const [username,setUsername] = useState('')
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  
  useEffect(() => {

   function retrieval(){
     
     const token = localStorage.getItem('token'); 
     if (token) {
       try {
         const decoded = jwtDecode(token); 
         setUsername(decoded.userId_name.name || 'User');
         localStorage.setItem('user', decoded.userId_name.name) //use decoded.userId_name.name . decoded.userId_name would render the whole userId_name object instead of individual which would throw an error 
       } catch (error) {
         console.error('Error decoding token:', error);
       }
     }
 
   }
    const intervalId = setInterval(retrieval, 300); // Adjust the interval as needed

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);
/**👆👆
   * get token
   * if token decode 
   * set as username
   * 
   * 
   */


const logoutUser = () => {
  localStorage.clear(); // Remove the token
  setUsername(null); // Reset username to update UI
  // Optionally, redirect the user or perform additional cleanup
router.push("/Signin")
};

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
          <>
          <li className="list-none"> {username} </li>
          <li className="list-none" onClick={logoutUser} style={{cursor: 'pointer'}}>Logout</li>
          </>

        ) : (
          <Link href={"/Signin"}>
            <li className="list-none">Login</li>
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
      <>
        <li className="list-none" onClick={logoutUser}>Logout</li>
            <li className="list-none"> {username} </li>
      </> 
        ) : (
          <Link href={"/Signin"}>
            <li className="list-none">Login</li>
          </Link>
        )}
          </div>
        </mobile>
      )}
    </div>
  );
  
};

export default TopNav;
