import React from 'react';
import { MessageSimple, useMessageContext } from 'stream-chat-react';

const CustomMessage = (props) => {
  const { message, groupStyles } = useMessageContext();
  const user = message.user;

  const showAuthorName = groupStyles[0] === 'single' || groupStyles[0] === 'top';

  return (
    <div className="custom-message">
      {showAuthorName && (
        <span className="custom-message__author">
          {user.fullName || user.id}
        </span>
      )}
      <MessageSimple {...props} /> 
    </div>
  );
};

export default CustomMessage;
