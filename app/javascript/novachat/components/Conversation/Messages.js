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
    state: { messages, websiteToken },
    dispatch,
  } = useContext(AppContext);
  const [typing] = useState(false);
  useQuery(MESSAGES, {
    variables: {
      websiteToken,

      token: Cookies.get('cw_conversation'),
      uuid: currentConversation.uuid,
    },
    onCompleted(data) {
      dispatch({ type: types.SET_MESSAGES, payload: data.messages.collection });
    },
  });

  console.log({ ms: messages });
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
  currentConversation: PropTypes.object,
  onMessages: PropTypes.bool,
};

export default Messages;
