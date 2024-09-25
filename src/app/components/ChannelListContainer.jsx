"use client"
import "../page.css"
import React from 'react'
import { ChannelList, ChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import message from '../assets/message.png'
import myLogout from '../assets/logout.png'
import ChannelSearch from "./ChannelSearch";
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

const ChannelListContainer = ({ isCreating, setIsCreating, setIsEditing, setCreateType}) => {

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
  return (
  <>
    <SideBar logout={logout}/>
    <div className="channel-list__list__wrapper">
      <CompanyHeader/>
      <ChannelSearch/>
      <ChannelList
        filters={{}}
        channelRenderFilterFn={() => {}}
        List={(listProps) => (
          <TeamChannelList
            {...listProps}
            type="team"
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setCreateType={setCreateType}
          />
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview
            {...previewProps}
            type="team"
          />
        )}
      />
      <ChannelList
        filters={{}}
        channelRenderFilterFn={() => {}}
        List={(listProps) => (
          <TeamChannelList
            {...listProps}
            type="messaging"
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setCreateType={setCreateType}
          />
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview
            {...previewProps}
            type="messaging"
          />
        )}
      />
    </div>
  </>  
  )
}

export default ChannelListContainer