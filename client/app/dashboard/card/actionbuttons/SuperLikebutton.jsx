import React from 'react'
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { Tooltip } from '@mui/material';
const SuperLikeButton = () => {
  return (
    <IconButton aria-label="" size="large">
      <Tooltip title="Super Like" placement='top'>
        <StarIcon sx={{ 
          fontSize: {
            xs: 30,
            md: 35  
          },
          color:"#00BFFF",}} />
      </Tooltip>
    </IconButton>
  )
}

export default SuperLikeButton