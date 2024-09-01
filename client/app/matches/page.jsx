import React from 'react'
import Chat from './chat/Chat'
import NavbarApp from '../components/navbarApp/NavbarApp'
const Matches = () => {
  return (
    <>
       <NavbarApp />
      <div className="flex justify-center items-center p-2 w-full h-[90vh]">
            <Chat />
      </div>
    </>
    
  )
}

export default Matches