import React from 'react'
import Link from 'next/link';
import './sidebar.css'
import ExploreIcon from "@mui/icons-material/Explore"
import PeopleIcon from "@mui/icons-material/ConnectWithoutContact"
import SettingIcon from "@mui/icons-material/Settings"
import ProfileIcon from "@mui/icons-material/Person";
import NotifyIcon from "@mui/icons-material/Notifications"
import Logoutbutton from '../logout/Logoutbutton';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';

const Sidebar = () => {
  return (
    <div className='sidebar absolute left-0 top-0 p-4 h-full bg-gradient-to-r from-cyan-500 to-[#2191E5] shadow-2xl mr-2'>
      <div className='flex justify-center'>
        <div className=" logo">
          <Tooltip title="Home" placement='right'>
            <Link href="/dashboard">
              <span className='logo-collapsed'>
                <img
                    alt="SoulMates"
                    src="./assets/img/logoSoulmates.png"
                    className="h-12 w-auto"
                  />
              </span>
            </Link>
          </Tooltip>
        </div>
      </div>
      <div className='h-[95%] flex flex-col justify-between items-center'> 
        <ul>
          <li className='mt-4'>
            <Tooltip title="Matches" placement='right'>
              <IconButton>
                <Link href="/matches" className="sidebar-item">
                  <PeopleIcon sx={{ fontSize:30, color:'white'}} /> <span className="item-text">Matches</span>
                </Link>
              </IconButton>
              
            </Tooltip>

          </li>
          <li className='mt-4'>
            <Tooltip title="Esplora" placement='right'>
              <IconButton>
                <Link href="/explore" className="sidebar-item">
                  <ExploreIcon sx={{ fontSize:30, color:'white'}} /> <span className="item-text">Esplora</span>
                </Link>
              </IconButton>
            </Tooltip>
          </li>
          <li className='mt-4'>
            <Tooltip title="Notifiche" placement='right'>
              <IconButton>
                <Link href="/notification" className="sidebar-item">
                  <NotifyIcon sx={{ fontSize:30, color:'white'}} /> <span className="item-text">Notifiche</span>
                </Link>
              </IconButton>
            </Tooltip>
          </li>
          <li className='mt-4'>
            <Tooltip title="Profilo" placement="right">
              <IconButton>
                <Link href="/profile" className="sidebar-item">
                  <ProfileIcon sx={{ fontSize:30, color:'white'}} /> <span className="item-text">Profilo</span>
                </Link>
              </IconButton>
            </Tooltip>
          </li>
          <li className='mt-4'>
            <Tooltip title="Impostazioni" placement="right">
              <IconButton>
                <Link href="/" className="sidebar-item">
                  <SettingIcon sx={{ fontSize:30, color:'white'}} /> <span className="item-text">Impostazioni</span>
                </Link>
              </IconButton>
            </Tooltip>
          </li>
        </ul>
        <div>
          <Logoutbutton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
