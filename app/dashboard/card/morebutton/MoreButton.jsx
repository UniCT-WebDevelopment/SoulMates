import React from 'react'
import MoreIcon from "@mui/icons-material/MoreHoriz";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const MoreButton = () => {
  return (
    <IconButton aria-label="" size="large" className=''>
        <Tooltip title="More" placement='top'>
            <MoreIcon sx={{ color: "white" }} />
        </Tooltip>
    </IconButton>
  )
}

export default MoreButton