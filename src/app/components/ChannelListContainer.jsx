"use client"
import React, { useState } from 'react'
import { ChannelList, ChatContext, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import message from '../assets/message.png'
import myLogout from '../assets/logout.png'
import ChannelSearch from '../components/ChannelSearch'
import Image from 'next/image';
import { TeamChannelList, TeamChannelPreview } from ".";


const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className='channel-list__sidebar'>
     <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
        <Image src={message} alt="message" width="30"/>
      </div>
     </div>
     <div className='channel-list__sidebar__icon2'>
      <div className='icon1__inner' onClick={logout}>
        <Image src={myLogout} alt="message" width="36" height="30"/>
      </div>
     </div>
  </div>
)

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Chat & Meet</p>
  </div>
)

const CustomChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team')
}
const CustomChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging')
  
}


const ChannelListContent = ({ isCreating, setIsCreating, setIsEditing, setCreateType, setToggleContainer}) => {
  const {client} = useChatContext();
  const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('userName');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  };

  const filters = { members: {$in: [client.userID]}};


  return (
  <>
    <SideBar logout={logout}/>
    <div className="channel-list__list__wrapper">
      <CompanyHeader/>
      <ChannelSearch setToggleContainer={setToggleContainer}/>
      <ChannelList
        filters={filters}
        channelRenderFilterFn={CustomChannelTeamFilter}
        List={(listProps) => (
          <TeamChannelList
            {...listProps}
            type="team"
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType} 
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
          />
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview
            {...previewProps}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
            type="team"
          />
        )}
      />
      <ChannelList
        filters={filters}
        channelRenderFilterFn={CustomChannelMessagingFilter}
        List={(listProps) => (
          <TeamChannelList
            {...listProps}
            type="messaging"
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType} 
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
          />
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview
            {...previewProps}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
            type="messaging"
          />
        )}
      />
    </div>
  </>  
  )
}

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
 
  const [toggleContainer, setToggleContainer] = useState(false)
  
  return(
    <>
      <div className="channel-list__container">
        <ChannelListContent 
          setIsCreating={setIsCreating} 
          setCreateType={setCreateType} 
          setIsEditing={setIsEditing} 
        />
      </div>
      <div className="channel-list__container-responsive"
        style={{left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
      >
        <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevContainer) => !prevContainer)}>
          <ChannelListContent
            setIsCreating={setIsCreating} 
            setCreateType={setCreateType} 
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
          />
        </div>
      </div>
    </>
  )
}

export default ChannelListContainer