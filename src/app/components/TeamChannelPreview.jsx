import { Avatar, useChatContext } from "stream-chat-react";


const TeamChannelPreview = ({ channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();
  const channelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const directPreview = () => {
    const members = object
      .value(channelPreview.state.members)
      .filter(({ user }) => user.id !== client.userID);
    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    );
  };
  return (
    <div
      className={
        channel?.id === activeChannel
          ? "channel-preview__wrapper__selected"
          : "channel-preview__wrapper"
      } onClick={() => {
        console.log(channel);
      }}
    >
        {type === 'team'? <channelPreview/> : <directPreview />}
    </div>
  );
};

export default TeamChannelPreview;
