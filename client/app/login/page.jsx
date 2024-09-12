'use client' ;
import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import RegisterPopup from './RegisterPopup';
import LoginPopup from './LoginPopup';


export default function Login() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  
  const togglePopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
  }
  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  return (
    <div className='cursor-default overflow-y-hidden'>
      <Navbar toggleLoginPopup={toggleLoginPopup} />
      {isLoginPopupOpen && <LoginPopup toggleLoginPopup={toggleLoginPopup} />}
  
      {/* Background */}
      <video
        src='./assets/video/loginVideo.mp4'
        loop
        autoPlay
        muted
        className='brightness-50 object-cover absolute h-screen w-screen -z-10 left-0'
      ></video>
  
      {/* Content */}
      <div className='px-4 md:px-12 lg:px-24 xl:px-72 h-screen flex flex-col justify-center items-center text-center'>
        <span className='text-white space-y-5 text-4xl md:text-6xl lg:text-8xl font-extrabold'>
          Find your soulmate
        </span>
        <button
          className='w-fit px-6 md:px-8 lg:px-12 py-2 md:py-3 lg:py-4 bg-purple-600 text-white hover:bg-white border-2 hover:text-black rounded-full mt-4 font-extrabold'
          onClick={togglePopup}
        >
          Crea account
        </button>
        {isPopUpOpen && <RegisterPopup togglePopup={togglePopup} />}
      </div>
  
      {/* Footer */}
      <div className='bg-black'>
        <Footer />
      </div>
    </div>
  );
  
}
