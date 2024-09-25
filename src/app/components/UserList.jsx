import React, { useEffect, useState } from 'react';
import { Avatar, useChatChannel } from 'stream-chat-react';
import InviteIcon from '../assets/InviteIcon';


const ListContainer = ({children}) => {
    return(
        <div className='user-list__Container'>
            <div className='user-list__header'>
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = () => {
    return(
        <div>
            
        </div>
    )
}

const UserList = () => {
  return (
    <ListContainer>
        UserList
    </ListContainer>
  )
}

export default UserList