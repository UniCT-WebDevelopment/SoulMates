import React, { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import NewChatIcon from "@mui/icons-material/Create";
import { useSession } from 'next-auth/react';

const UserList = ({ onSelectUser }) => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // Usa l'ID utente per tracciare l'utente selezionato
 
  useEffect(() => {
    //trova gli utenti che hanno matchato con l'utente
    async function fetchUsers() {
      if (session && session.user) {
        const userId = session.user.id; 
        const res = await fetch(`/api/users/userChat?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error("Loading Users Failed");
        }
      }
    }
    fetchUsers();
  }, [session]);

  if (users.length === 0) return <p className='m-3'> Loading... </p>;

  const handleUserClick = (user) => {
    console.log("Utente selezionato: " + user.name + " Con ID: " + user._id);
    setSelectedUserId(user._id); 
    onSelectUser(user); 
  };

  return (
    <div className= 'p-2 drop-shadow-lg  bg-black/100 backdrop-blur-lg rounded-lg flex flex-col md:bg-transparent'>
      <div className='flex flex-col justify-between border-b-2 pb-2'> 
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-white'>Chats</h1>
          <button className='border-2 hover:bg-slate-200 hover:border-black rounded-full p-1'>
            <NewChatIcon sx={{
              color:'white',
              '&:hover':{
                color:"black",
              }
            }}/> 
          </button>
        </div>
        <div className='flex mt=2'> 
          <input type='text' placeholder='Search' className='p-2 rounded-full flex-grow backdrop-blur-lg bg-black/30 text-white'></input>
          <button className='hover:bg-purple-100 rounded-full ml-1 p-2'>
            <SearchIcon sx={{
              color:'white',
              '&:hover':{
                color:"black",
              }
            }}/> 
          </button>
        </div>
      </div>
      <ul className='flex-grow overflow-y-auto'>
        {users.map((user, index) => (
          <li
            key={index}  
            className={`p-2 mt-1 text-white flex items-center 
                hover:bg-white/20 hover:rounded-lg hover:text-black cursor-pointer
                 ${selectedUserId === user._id ? 'bg-white/20 text-black rounded-lg' : ''}`}
            onClick={() => handleUserClick(user)}
          >
            <img
              src={user.img}
              alt={`${user.name}'s avatar`}
              className='w-8 h-8 rounded-full mr-2'
            />
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
