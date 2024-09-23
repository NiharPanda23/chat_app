"use client";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import 'stream-chat-react/dist/css/index.css';
//the above css is imported for default stream chat ui
import "./page.css";
import { ChannelListContainer, ChannelContainer } from "./components";

// dynamic is imported and used for dynamic import of auth components to solve dehydration error
import dynamic from "next/dynamic";
const Auth = dynamic(() => import("./components/Auth"), { ssr: false });

const cookies = new Cookies();
const apiKey = "fqz853mkdrjr";

function App() {
  const [client, setClient] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  // the above 2 useState client and authToken is used to solve Dehydration error 

  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  // useEffect and useState client and authToken is used to solve Dehydration error 
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
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App;
