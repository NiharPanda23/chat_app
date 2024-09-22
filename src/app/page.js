"use client";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import "./page.css";
import { ChannelListContainer, ChannelContainer } from "./components";
import dynamic from "next/dynamic";
const Auth = dynamic(() => import("./components/Auth"), { ssr: false });

const cookies = new Cookies();
const apiKey = "fqz853mkdrjr";

function App() {
  const [client, setClient] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = cookies.get("token");

    if (token) {
      const chatClient = StreamChat.getInstance(apiKey);

      chatClient.connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("userName"),
          fullName: cookies.get("fullName"),
          image: cookies.get("avatarURL"),
          hashedPassword: cookies.get("hashedPassword"),
          phoneNumber: cookies.get("phoneNumber"),
        },
        token
      );

      setClient(chatClient);
      setAuthToken(token);
    }
  }, []);

  if (!authToken) return <Auth />;
  if (!client) return <div>Loading...</div>;
  return (
    <div className="app__wrapper" theme="theme light">
      <Chat client={client}>
        <ChannelListContainer 

        />
        <ChannelContainer 
          
        />
      </Chat>
    </div>
  );
}

export default App;
