"use client";
import React , { useState }from 'react';
import {signIn, useSession} from "next-auth/react";

const LoginComponent = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const data = useSession();
  // const handleCopy = (event) => {
  //   event.preventDefault(); // Prevent default copy behavior
  // };
  return (
    <div className="flex items-center justify-center min-h-screen">
      
      <div className="bg-white p-8 rounded shadow-md w-64">
      
        <h2 className="text-xl font-semibold mb-4 text-black">Login with GitHub</h2>
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 border rounded text-black"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded text-black"
            onChange={(e) => setPassword(e.target.value)}
            onCopy={handleCopy}
          />
        </div> */}
        <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={()=> signIn("github")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
