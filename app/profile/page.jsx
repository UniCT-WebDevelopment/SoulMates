import React from 'react'

import ProfileDashboard from './profileDashboard/ProfileDashboard'
import NavbarApp from '../components/navbarApp/NavbarApp'

const Profile = () => {
    return (
        <div className='overflow-hidden'>
          <NavbarApp />
          <div className="flex justify-center items-center p-2 w-full h-[90vh]">
             <ProfileDashboard />
          </div>
        </div>
      )
}

export default Profile