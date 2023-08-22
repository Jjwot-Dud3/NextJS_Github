"use client";
import React from 'react';
import {signIn, useSession} from "next-auth/react";
import Image from "next/image";
import github_icon from "../app/icons/github_icon.png"

const LoginComponent = () => {

  const data = useSession();
  // const handleCopy = (event) => {
  //   event.preventDefault(); // Prevent default copy behavior
  // };
  return (
    <div className="flex items-center justify-center min-h-screen">
      
      <div className="bg-white p-8 rounded shadow-md w-64">
      
        <div className="flex gap-5">
          <Image src={github_icon}  width="0" height="0" sizes="100vw" className="w-2/4 h-auto rounded-full py-2" />
          <h2 className="text-xl font-semibold mb-2 text-black justify-center">Login with GitHub</h2>
        </div>
        
        <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={()=> signIn("github")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
