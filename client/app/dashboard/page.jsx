'use client'
import CardUser from './card/CardUser';
import { useSession } from "next-auth/react";
import Welcome from "../components/welcome/Welcome";
import NavbarApp from '../components/navbarApp/NavbarApp';
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from 'react';



const Dashboard = () => {
  const { data: session } = useSession();
  const [notify, setNotify] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:5001");
    if (session && session.user) {
      socket.emit("register", (session.user.id));
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
  
  if (!session) {
      return <p className='flex justify-center items-center h-full'>Loading...</p>;
  }

  return (
    <>
    <ToastContainer />
    <NavbarApp />
    <div className="flex justify-center items-center p-2 w-full h-[90vh]">
          <Welcome session={session} />
          <CardUser session={session}/>
          <div className='hidden w-full md:block md:w-[250px] absolute text-right right-2 md:right-10 bottom-4 md:bottom-1 text-2xl md:text-6xl italic font-bold -z-10 text-wrap'>
            Find your soulmate
          </div>
        </div>

    </>
  );
};

export default Dashboard;
