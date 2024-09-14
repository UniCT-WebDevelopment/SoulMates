'use client'
import React from 'react'
import ProfileDashboard from './profileDashboard/ProfileDashboard'
import NavbarApp from '../components/navbarApp/NavbarApp'
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const [message, setNotify] = useState("");

  /* Notifiche */
  useEffect(() => {
    const socket = io("http://localhost:5001");
    if (session && session.user) {
      socket.emit("register", (session.user.id));
      console.log("Nome utente sessione: "+ session.user.name + " Con ID: " + session.user.id);
    }
    socket.on("notify", ({ senderName, message}) => {
      setNotify(message);
      toast(
        <div>
            Messaggio da: <strong>{senderName} </strong>
          <div> {message} </div>
        </div>
      );
    });
    return() => {
      socket.off("notify");
    };

  }, [session])

  
    return (
        <div className='overflow-hidden'>
          <ToastContainer />
          <NavbarApp />
          <div className="flex justify-center items-center p-2 w-full h-[90vh]">
             <ProfileDashboard />
          </div>
        </div>
      )
}

export default Profile