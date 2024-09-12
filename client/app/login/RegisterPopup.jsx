'use client'
import React, { useState } from 'react';

export default function RegisterPopup({ togglePopup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/auth/register', {
      method: "POST",
      body: JSON.stringify({ name, email, password, gender, age }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      togglePopup(); // Chiudi il popup dopo la registrazione
    } else {
      const errorData = await response.json();
      setError(errorData.message);
      console.error('Registration failed');

    }
  };

  return (
    <div className="popup-overlay fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="popup-content bg-black text-white p-4 md:p-6 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-w-[95%]">
        <button
          className="close-button float-right bg-red-500 h-8 w-8 md:h-10 md:w-10 rounded text-white p-1"
          onClick={togglePopup}
        >
          X
        </button>
        <h2 className="text-2xl md:text-4xl font-extrabold mb-4 text-left">Registrati</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-left">Full Name:</label>
            <input
              type="text"
              className="w-full border p-2 rounded text-black"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-left">Email:</label>
            <input
              type="email"
              className="w-full border p-2 rounded text-black"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-left">Password:</label>
            <input
              type="password"
              className="w-full border p-2 rounded text-black"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-left">Gender:</label>
            <input
              type="text"
              className="w-full border p-2 rounded text-black"
              required
              placeholder="Male or Female"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-left">Age:</label>
            <input
              type="number"
              className="w-full border p-2 rounded text-black"
              required
              placeholder="18+"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          {error && <span className="message">{error}</span>}
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded w-full"
          >
            Registrati
          </button>
        </form>
      </div>
    </div>
  );
  
}
