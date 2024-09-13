import React, { useState } from 'react';
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import { io } from "socket.io-client";
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:5001");

const InputBox = ({ selectedUser, setMessages }) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "" && selectedUser) {
      //Sul server attiva due eventi: receiveMessage & notify
      socket.emit("sendMessage", {
        senderId: session.user.id,
        senderName: session.user.name,
        receiverId: selectedUser._id,
        message: message,
      });

      setMessages((prevMessages) => [
        ...prevMessages, 
        {
          senderId: session.user.id,
          message: message,
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div className='chat flex justify-between w-full p-2 bg-black/30 rounded-lg'>
      <ToastContainer />
      <button className='hover:bg-purple-100 rounded-full p-2'>
        <AddIcon sx={{
          color: 'white',
          '&:hover': {
            color: "black",
          }
        }}/> 
      </button>
      <input 
        type='text'
        placeholder='Write here...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='rounded-full w-full mx-0.5 p-2 bg-black/30 text-white'
      />
      <button className='hover:bg-purple-100 rounded-full p-2' onClick={handleSendMessage}>
        <SendIcon sx={{
          color: 'white',
          '&:hover': {
            color: "black",
          }
        }}/>
      </button>
    </div>
  );
}

export default InputBox;
