import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MessagesContainer from './MessagesContainer';

const Messages = ({ onMessages, currentConversation }) => {
  const [typing, setTyping] = useState(false);

  return (
    <MessagesContainer
      typing={typing}
      currentConversation={currentConversation}
      messages={[]}
      toggle={onMessages}
    />
  );
};

Messages.propTypes = {
  conversationId: PropTypes.string,
  onMessages: PropTypes.bool,
};

export default Messages;
