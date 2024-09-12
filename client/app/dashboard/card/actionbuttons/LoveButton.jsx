import React from 'react'
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Tooltip } from '@mui/material';
const LoveButton = ({ onClick }) => {
  return (
    <IconButton aria-label="" size="large" onClick={onClick}>
      <Tooltip title="Love It" placement='top'>
        <FavoriteIcon sx={{ 
          fontSize: {
            xs: 30,
            md: 35  
          },
          color: "#32de84" }} />
      </Tooltip>
    </IconButton>
  )
}

export default LoveButton
