import React from 'react'
import MoreButton from '@/app/dashboard/card/morebutton/MoreButton'
const UserInfo = ({ selectedUser }) => {
  if(selectedUser){
    return (
      <div className='flex justify-between bg-black/30 p-2 rounded mt-9 md:mt-0 text-white'>
        <div className='flex items-center'>
          <img src={selectedUser.img}  className='w-10 h-10 rounded-full'/>
        </div>
        <div className='flex items-center'>{selectedUser.name}</div>
        <div>
          <MoreButton/>
        </div>
      </div>
    )
  }

  
}

export default UserInfo