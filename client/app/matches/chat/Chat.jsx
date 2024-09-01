'use client';
import React, { useState, useEffect, useRef } from 'react';
import InputBox from './chatComponents/InputBox';
import UserList from './chatComponents/UserList';
import UserInfo from './chatComponents/UserInfo';
import { useSession } from 'next-auth/react';
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

const Chat = () => {
  const { data: session } = useSession();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null); 

  useEffect(() => {
    if (session && session.user) {
      socket.emit("register", (session.user.id));
      console.log("Nome utente sessione: "+ session.user.name + " Con ID: " + session.user.id);
    }

    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [session]);

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setMessages([]); 

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
    <div className='flex h-full w-[70%]'>
      <div className='flex w-full gap-2'>
        <UserList onSelectUser={handleUserSelection} />
        {!selectedUser && 
          <h1 className='flex h-full w-full items-center justify-center text-wrap  text-white text-3xl  italic font-bold backdrop-blur-lg bg-black/30 p-2 rounded-lg'>
            Seleziona un utente ed inizia a chattare!
          </h1>}
        {selectedUser && 
          <div className="chat w-full h-full flex flex-col justify-between backdrop-blur-lg bg-black/30 p-2 rounded-lg ">
          <UserInfo selectedUser={selectedUser} />
          <div className='flex-grow overflow-y-auto'>
            {messages.map((msg, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null}
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
  )
}

export default Chat;
