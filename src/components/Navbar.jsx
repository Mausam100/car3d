import React from 'react';
import Logo from '../assets/logo.png'; 
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";


const Navbar = () => {
  return (
    <nav className=" z-50 fixed top-0 left-16 w-[90%] bg-transparent border-t border-b border-slate-300 py-2 px-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <img src={Logo} alt="Logo" className="top-10 left-4 h-10" />
        <ul className="flex space-x-6 text-white italic font-semibold text-xl">
          <li><a href="#car">Model 510</a></li>
          <li><a href="#features">Colors</a></li>
          <li><a href="#customize">Paints</a></li>
        </ul>
        <div className='flex items-center gap-4'>
        <HiOutlineMenuAlt4  className='text-white text-2xl' />
        <IoIosSearch className='text-white text-2xl' />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
