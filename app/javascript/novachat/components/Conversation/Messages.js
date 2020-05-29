import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import MessagesContainer from './MessagesContainer';
import { types } from '../../reducers';
import AppContext from '../../context/AppContext';

const MESSAGES = gql`
  query messages($token: String!, $websiteToken: String!, $uuid: String!) {
    messages(token: $token, websiteToken: $websiteToken, uuid: $uuid) {
      collection {
        id
        content
        createdAt
        messageType
        status
        assignee {
          avatarUrl
        }
      }
    }
  }
`;

const Messages = ({ onMessages, currentConversation }) => {
  const {
    state: { messages },
    dispatch,
  } = useContext(AppContext);
  const [typing, setTyping] = useState(false);
  const { loading, error } = useQuery(MESSAGES, {
    variables: {
      websiteToken: 'dYh5GQtcMgCM1KTozn5f29a2',
      token: Cookies.get('cw_conversation'),
      uuid: currentConversation.uuid,
    },
    onCompleted(data) {
      dispatch({ type: types.SET_MESSAGES, payload: data.messages.collection });
    },
  });

  if (loading || error) return null;

  return (
    <MessagesContainer
      typing={typing}
      currentConversation={currentConversation}
      messages={messages}
      toggle={onMessages}
    />
  );
};

Messages.propTypes = {
  conversationId: PropTypes.string,
  onMessages: PropTypes.bool,
};

export default Messages;
