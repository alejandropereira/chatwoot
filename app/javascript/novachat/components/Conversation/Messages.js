import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLazyQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import MessagesContainer from './MessagesContainer';
import { types } from '../../reducers';
import { useTracked } from '../../App';

const MESSAGES = gql`
  query messages($token: String!, $websiteToken: String!, $uuid: String!) {
    messages(token: $token, websiteToken: $websiteToken, uuid: $uuid) {
      collection {
        id
        content
        createdAt
        messageType
        status
        attachments {
          id
          fileName
          fileType
          fileUrl
          thumbUrl
        }
        assignee {
          avatarUrl
        }
      }
    }
  }
`;

const Messages = () => {
  const [
    { messages, websiteToken, onMessages, currentConversation },
    dispatch,
  ] = useTracked();
  const [typing] = useState(false);
  const [loadMessages] = useLazyQuery(MESSAGES, {
    variables: {
      websiteToken,
      token: Cookies.get('cw_conversation'),
      uuid: currentConversation.uuid,
    },
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      if (!data) return;
      dispatch({ type: types.SET_MESSAGES, payload: data.messages.collection });
    },
  });

  useEffect(() => {
    if (currentConversation.uuid === 'volatile' || !currentConversation.uuid)
      return;
    loadMessages();
  }, [currentConversation.id]);

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
