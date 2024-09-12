import React from 'react'
import IconButton from '@mui/material/IconButton';
import BlockIcon from '@mui/icons-material/Block';
import { Tooltip } from '@mui/material';
const DisLikeButton = ( { onClick }) => {
  return (
    <IconButton aria-label="" size="large" onClick={ onClick }>
      <Tooltip title="I don't like it" placement='top'>
        <BlockIcon sx={{
          fontSize: {
            xs: 30,
            md: 35  
          },
          color: "red"}} />
      </Tooltip>
    </IconButton>
  )
}

export default DisLikeButton


