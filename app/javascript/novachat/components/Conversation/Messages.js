import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useLazyQuery, gql } from '@apollo/client';
import MessagesContainer from './MessagesContainer';
import { types } from '../../reducers';
import { useTracked } from '../../App';

const MESSAGES = gql`
  query messages(
    $token: String!
    $websiteToken: String!
    $uuid: String!
    $page: Int
  ) {
    messages(
      token: $token
      websiteToken: $websiteToken
      uuid: $uuid
      per: 7
      page: $page
    ) {
      collection {
        id
        content
        createdAt
        contentType
        messageType
        contentAttributes
        secured
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
      meta {
        totalPages
      }
    }
  }
`;

const Messages = () => {
  const [
    { messages, websiteToken, onMessages, currentConversation, senderTyping },
    dispatch,
  ] = useTracked();
  const [page, setPage] = useState(1);
  const [loadMessages, { loading, data }] = useLazyQuery(MESSAGES, {
    fetchPolicy: 'no-cache',
    onCompleted(d) {
      if (!d) return;
      dispatch({
        type: types.SET_MESSAGES,
        payload: [...messages, ...d.messages.collection],
      });
    },
  });

  const fetchMoreMessages = React.useCallback(
    event => {
      if (
        event.target.scrollTop < 50 &&
        !loading &&
        page !== data.messages.meta.totalPages
      ) {
        loadMessages({
          variables: {
            websiteToken,
            token: Cookies.get('cw_conversation'),
            uuid: currentConversation.uuid,
            page: page + 1,
          },
        });
        setPage(currentPage => currentPage + 1);
      }
    },
    [page, currentConversation.id, loading, data]
  );

  useEffect(() => {
    if (currentConversation.uuid === 'volatile' || !currentConversation.uuid)
      return;
    loadMessages({
      variables: {
        websiteToken,
        token: Cookies.get('cw_conversation'),
        uuid: currentConversation.uuid,
        page,
      },
    });
  }, [currentConversation.id]);

  return (
    <MessagesContainer
      typing={senderTyping}
      currentConversation={currentConversation}
      messages={messages}
      toggle={onMessages}
      fetchMoreMessages={fetchMoreMessages}
      loading={loading}
      dispatch={dispatch}
    />
  );
};

Messages.propTypes = {
  currentConversation: PropTypes.object,
  onMessages: PropTypes.bool,
};

export default Messages;
