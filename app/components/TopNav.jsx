"use client";
import { navLinks } from "@/constants";
import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const TopNav = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
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
         <Link href={"/Login"}>
              <li className="list-none">Login</li>
            </Link>
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
            <Link href={"/Login"}>
              <li className="list-none">Login</li>
            </Link>
          </div>
        </mobile>
      )}
    </div>
  );
};

export default TopNav;
