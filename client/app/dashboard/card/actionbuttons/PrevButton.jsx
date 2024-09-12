import React from 'react'
import IconButton from '@mui/material/IconButton';
import PrevIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from '@mui/material';
const PrevButton = () => {
  return (
    <IconButton aria-label="" size="large">
      <Tooltip title="Previous" placement='top'>
        <PrevIcon sx={{ 
          fontSize: {
            xs: 30,
            md: 35  
          },
          color: "white" }}  />
      </Tooltip>
    </IconButton>
  )
}

export default PrevButton