import React, { useState } from 'react';
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import { io } from "socket.io-client";
import { useSession } from 'next-auth/react';

// Inizializza la connessione socket
const socket = io("http://localhost:5001");

const InputBox = ({ selectedUser }) => {
  const { data: session } = useSession();
  
  const [message, setMessage] = useState("");

  // Funzione per inviare il messaggio
  const handleSendMessage = () => {
    if (message.trim() !== "" && selectedUser) {
      socket.emit("sendMessage", {
        senderId: session.user.id,
        receiverId: selectedUser._id,
        message: message,
      });

      setMessage(""); // Resetta il campo del messaggio dopo l'invio
    }
  };

  return (
    <div className='chat flex justify-between w-full p-2 bg-black/30 rounded-lg'>
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
