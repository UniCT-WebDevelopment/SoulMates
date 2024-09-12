import React from 'react'
import IconButton from '@mui/material/IconButton';
import SuccIcon from '@mui/icons-material/ArrowForward';
import { Tooltip } from '@mui/material';
const SuccButton = ({ onClick }) => {
  return (
    
      <IconButton aria-label="" size="large" onClick={onClick}>
        <Tooltip title="Next" placement='top'>
          <SuccIcon sx={{ 
            fontSize: {
              xs: 30,
              md: 35  
            },
            color: "white" }} /> 
        </Tooltip> 
      </IconButton>


  )
}

export default SuccButton