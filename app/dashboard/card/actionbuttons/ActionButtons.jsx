import React from 'react'
import './actionbuttons.css'
import DislikeButton from './DislikeButton'
import LoveButton from './LoveButton'
import SuperLikeButton from './SuperLikebutton'
import PrevButton from './PrevButton'
import SuccButton from './Succbutton'

const ActionButtons = ({ onNextUser, onLike , onDislike}) => {
  return (
    <div className='action-buttons'>
        <PrevButton />
        <DislikeButton  onClick={ onDislike }/>
        <LoveButton onClick={ onLike }/>
        <SuperLikeButton />
        <SuccButton onClick={ onNextUser } />
    </div>
  )
}

export default ActionButtons