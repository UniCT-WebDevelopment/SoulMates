import React from 'react'

const Welcome = ( {session} ) => {
  return (
    <div className='hidden w-full md:block md:w-[500px] absolute right-2 md:left-2 md:top-16 text-2xl md:text-6xl italic font-bold text-wrap'>
      <div>
        Welcome back,
      </div>
      <div className='text-white'>
        {session.user.name.split(' ')[0]}
      </div>
    </div>
  );  
}

export default Welcome