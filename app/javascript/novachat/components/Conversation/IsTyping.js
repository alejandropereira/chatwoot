import React from 'react';
import { useTracked } from '../../App';
import Message from './Message';

const IsTyping = () => {
  const [{ currentConversation, senderTyping }] = useTracked();
  if (!senderTyping) return null;

  return (
    <Message
      typing={senderTyping}
      avatar={
        currentConversation.assignee && currentConversation.assignee.avatarUrl
      }
      type={null}
      sendUserData={() => {}}
    />
  );
};

export default IsTyping;
