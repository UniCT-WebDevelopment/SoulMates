import React from 'react'

const Welcome = ( {session} ) => {
  return (
    <div className='hidden w-full md:block md:w-[500px] absolute right-2 md:left-2 md:top-16 md:text-2xl italic font-bold'>
      <div>
        Welcome back, 
        <span className='text-white'> {session.user.name.split(' ')[0]}</span>
      </div>

    </div>
  );  
}

export default Welcome