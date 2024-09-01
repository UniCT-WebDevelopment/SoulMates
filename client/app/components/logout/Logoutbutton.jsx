'use client';
import React from 'react'
import { IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut } from 'next-auth/react';

const Logoutbutton = () => {
    
    return (
        <div className='flex flex-col mb-1 '>
            <Tooltip title="Logout" placement="top"> 
                <IconButton
                aria-label="Logout"
            
                onClick={() => signOut({ callbackUrl: "/login"})}>
                    <LogoutIcon sx={{ 
                        fontSize:30, 
                        color:'white',
                        transform: 'rotate(180deg)' 
                    }}  
                    />{/*  <span className='text-white text-sm'>Logout</span> */}
                </IconButton>
            </Tooltip>
            
        </div>
    )
}

export default Logoutbutton