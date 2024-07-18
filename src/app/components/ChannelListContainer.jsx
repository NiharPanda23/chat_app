"use client"
import "../page.css"
import React from 'react'
import { ChannelList, ChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import message from '../assets/message.png'
import logout from '../assets/logout.png'
import ChannelSearch from "./ChannelSearch";
import Image from 'next/image';

const SideBar = () => (
  <div className='channel-list__sidebar'>
     <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
        <Image src={message} alt="message" width="30"/>
      </div>
     </div>
     <div className='channel-list__sidebar__icon2'>
      <div className='icon1__inner'>
        <Image src={logout} alt="message" width="36" height="30"/>
      </div>
     </div>
  </div>
)

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Chat & Meet</p>
  </div>
)

const ChannelListContainer = () => {
  return (
  <>
    <SideBar/>
    <div className="channel-list__list__wrapper">
      <CompanyHeader/>
      <ChannelSearch/>
    </div>
  </>  
  )
}

export default ChannelListContainer