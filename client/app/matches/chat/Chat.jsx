'use client';
import React, { useState, useEffect, useRef } from 'react';
import InputBox from './chatComponents/InputBox';
import UserList from './chatComponents/UserList';
import UserInfo from './chatComponents/UserInfo';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'; // Menu icons from MUI
import { IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSession } from 'next-auth/react';
import { io } from "socket.io-client";

const Chat = () => {
  
  const { data: session } = useSession();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ notify, setNotify] = useState('');
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const socket = io("http://localhost:5001");
    if (session && session.user) {
      socket.emit("register", (session.user.id));
    }
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    socket.on('notify', ({ senderName, message }) => {
      setNotify(message);
      toast(
        <div>
           Messaggio da: <strong>{senderName} </strong>
          <div> {message} </div>
        </div>
      );
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("notify");
    };

  }, [session]);

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setMessages([]); 
    setIsMenuOpen(false);
    
    async function fetchMessages() {
      const res = await fetch(`/api/messages?userId=${session.user.id}&contactId=${user._id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);

        setTimeout(() => {
          if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        console.error("Failed to load messages");
      }
    }

    fetchMessages();
  };

  return (
    <>
      <ToastContainer/>
      <div className='relative flex h-full w-full md:w-[70%]'>
        <div className='flex w-full gap-2'>
          {/* Menu User */}
          <div className='absolute top-2 left-16 transform -translate-x-16 z-10 md:hidden'>
            <IconButton onClick={toggleMenu} className='text-sm text-black hover:text-white hover:bg-inherit'>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />} Show Contacts
            </IconButton>
          </div>

          {/* UserList: visibilità mobile*/}
          <div className={`absolute md:relative md:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-col h-full w-[100%] md:w-auto z-10 bg-black/70  md:bg-black/30 p-2 rounded-lg`}>
            <UserList onSelectUser={handleUserSelection} />
          </div>

          {/* Chat content */}
          <div className='flex-grow'>
            {!selectedUser && 
              <h1 className='flex h-full w-full items-center justify-center text-wrap text-white text-3xl italic font-bold backdrop-blur-lg bg-black/30 p-2 rounded-lg'>
                Seleziona un utente ed inizia a chattare!
              </h1>}
            {selectedUser && 
              <div className="chat w-full h-full flex flex-col justify-between backdrop-blur-lg bg-black/30 p-2 rounded-lg">
                <UserInfo selectedUser={selectedUser} />
                <div className='flex-grow overflow-y-auto'>
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      ref={index === messages.length - 2 ? lastMessageRef : null}
                      className={`p-2 my-2 ${msg.senderId !== session.user.id ? 'text-left' : 'text-right'}`}
                    >
                      <span className='bg-white/50 rounded-lg p-2'>{msg.message}</span>
                    </div>
                  ))}
                </div>
                <InputBox selectedUser={selectedUser} setMessages={setMessages} />
              </div>
            }
          </div>
        </div>
      </div>
    </>

  );
}

export default Chat;
