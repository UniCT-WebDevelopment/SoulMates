'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { io } from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import NavbarApp from '../components/navbarApp/NavbarApp'

const Notification = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5001");
    
    if (session && session.user) {
      socket.emit("register", session.user.id);
    }

    socket.on("notify", ({ senderName, message, _id, timestamp }) => {
      const newNotification = {
        _id,
        senderName,
        message,
        timestamp: new Date(timestamp),
      };

      setNotifications((prevNotifications) => {
        const updatedNotifications = [newNotification, ...prevNotifications];
        return updatedNotifications.sort((a, b) => b.timestamp - a.timestamp);
      });

      toast(
        <div>
          Messaggio da: <strong>{senderName}</strong>
          <div>{message}</div>
        </div>
      );
    });

    return () => {
      socket.off("notify");
      socket.disconnect(); 
    };
  }, [session]);

  useEffect(() => {
    async function fetchNotifications() {
      if (session && session.user) {
        const receiverId = session.user.id;
        const res = await fetch(`/api/notifications/?receiverId=${receiverId}`);
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.map(notification => ({
            ...notification,
            timestamp: new Date(notification.timestamp)
          })).sort((a, b) => b.timestamp - a.timestamp));
        } else {
          console.error('Loading Notifications Failed');
        }
      }
    }
    fetchNotifications();
  }, [session]);
  
  const DeleteNotifications = async () => {
    if (session && session.user) {
      const receiverId = session.user.id;
      const res = await fetch(`/api/notifications/deleteAll?receiverId=${receiverId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setNotifications([]); 
        toast.success('Tutte le notifiche sono state eliminate');
      } else {
        toast.error('Errore durante l\'eliminazione delle notifiche');
      }
    }
  };
  
  return (
    <>
      <NavbarApp/>
      <ToastContainer/>
      <div className="flex justify-center items-center p-2 w-full h-[90vh]">
        <div className='h-full w-[50%] backdrop-blur-lg bg-black/30 rounded-lg overflow-y-auto'>
          <div className='text-white text-3xl font-bold z-10 sticky p-2 top-0 bg-purple-700 rounded-lg flex justify-between items-center'>
            <h1>Notifiche</h1>
            <button 
              className='rounded-lg text-xs text-black p-2 hover:bg-black hover:text-white'
              onClick={DeleteNotifications}
            > Cancella tutto
            </button>
          </div>
          <ul className='flex-grow overflow-y-auto'>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification._id} className='p-1 m-1 backdrop-blur-lg bg-black/40 rounded-lg'>
                  <div className='text-white'>
                    <p><strong>Da:</strong> {notification.senderName}</p>
                    <p><strong>Messaggio:</strong> {notification.message}</p>
                    <p><strong>Ricevuto il:</strong> {new Date(notification.timestamp).toLocaleString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className='text-white p-2'>Nessuna notifica</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Notification;
