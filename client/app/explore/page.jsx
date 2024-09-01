import React from 'react'
import NavbarApp from '../components/navbarApp/NavbarApp'
import ExploreDashboard from './exploreDashboard/ExploreDashboard'

const Explore = () => {
  return (
    <div className=''>
        <NavbarApp />
        <div className="flex p-4 flex-col size-full  flex-wrap">
            <div className="flex justify-center size-full items-center flex-wrap">
                <div className="h-full flex justify-center  w-[70%]">
                <ExploreDashboard/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Explore