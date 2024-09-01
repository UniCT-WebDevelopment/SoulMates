import React from 'react'

const Welcome = ( {session} ) => {
  return (
    <div className='absolute left-4 top-16 text-6xl italic font-bold'>
        <div>
         Welcome back, 
        </div>
        <div className='text-white'>
        {session.user.name.split(' ')[0]}
        </div>
        
    </div>
  )
}

export default Welcome