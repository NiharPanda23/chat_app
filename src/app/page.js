"use client"
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import './page.css'
import{ChannelListContainer, ChannelContainer} from './components'


const apiKey = 'fqz853mkdrjr';
// const secret = '3fwjszzzrypsw26qj4x6dnhrx9u445yzjdv9b6mrc8ar5epqexp7j6a2ravq4hwe';

const response  = StreamChat.getInstance(apiKey)

function App() {

  return (
    <div className='app__wrapper' theme='theme light'>
      <Chat client={response}>
        <ChannelListContainer />
        <ChannelContainer/>
      </Chat>
    </div>
  )
}

export default App
