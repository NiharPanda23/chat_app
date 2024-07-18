'use client'
import React, { useEffect, useState } from 'react'
import SearchIcon from '../assets/SearchIcon'


const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  
  const getChannels = async(text) => {
      try {
        // TODO:Fetch channels 
      } catch (error) {
        SetQuery('');
      }
  };

  const handelSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  }

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          type="text"
          value={query}
          onChange={handelSearch}
        />
      </div>
    </div>
  )
}

export default ChannelSearch