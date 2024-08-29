'use client';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const LoginPopup = ({ toggleLoginPopup }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("inside the try");
      const response = await signIn("credentials",{
        email: email,
        password: password, 
        redirect: false
      })
      if(response.error){
        setError("Invalid credentials");
        return;
      }
      toggleLoginPopup();
      router.replace("/dashboard")
    } catch (error) {
      setError("Something went wrong.");
    }


/*     const response = await fetch('/api/auth/login', {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    }); */
  };

  return (
    <div className="popup-overlay fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="popup-content bg-black text-white p-6 rounded-lg shadow-lg w-[30%]">
        <button
          className="close-button float-right bg-red-500 text-white p-1 rounded"
          onClick={toggleLoginPopup}
        >
          X
        </button>
        <h2 className="text-4xl font-extraBold mb-4">Accedi</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              className="w-full border p-2 rounded text-black"
              required
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              className="w-full border p-2 rounded text-black"
              required
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <span className='message'>{error}</span>}
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded w-full"
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
