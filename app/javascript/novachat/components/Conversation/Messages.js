import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import MessagesContainer from './MessagesContainer';

const MESSAGES = gql`
  query messages($token: String!, $websiteToken: String!, $uuid: String!) {
    messages(token: $token, websiteToken: $websiteToken, uuid: $uuid) {
      collection {
        id
        content
        createdAt
        messageType
        assignee {
          avatarUrl
        }
      }
    }
  }
`;

const Messages = ({ onMessages, currentConversation }) => {
  const [typing, setTyping] = useState(false);
  const { loading, error, data } = useQuery(MESSAGES, {
    variables: {
      websiteToken: 'dYh5GQtcMgCM1KTozn5f29a2',
      token: Cookies.get('cw_conversation'),
      uuid: currentConversation.uuid,
    },
  });

  if (loading || error) return null;

  return (
    <MessagesContainer
      typing={typing}
      currentConversation={currentConversation}
      messages={data.messages.collection}
      toggle={onMessages}
    />
  );
};

Messages.propTypes = {
  conversationId: PropTypes.string,
  onMessages: PropTypes.bool,
};

export default Messages;
