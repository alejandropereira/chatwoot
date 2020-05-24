import React from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import List from './List';
import variables from '../../utils/variables';

const CONVERSATIONS = gql`
  query conversations($token: String!, $websiteToken: String!) {
    conversations(token: $token, websiteToken: $websiteToken) {
      collection {
        id
        assignee {
          id
          avatarUrl
          name
        }
        messages(sorting: { field: id, order: DESC }, per: 1) {
          collection {
            id
            content
            createdAt
          }
        }
      }
    }
  }
`;

const Conversations = ({ onChatList, onListItemClick, onBackHome }) => {
  const { loading, error, data } = useQuery(CONVERSATIONS, {
    variables: {
      websiteToken: 'dYh5GQtcMgCM1KTozn5f29a2',
      token: Cookies.get('cw_conversation'),
    },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error!</p>;

  return (
    <Transition
      unmountOnExit
      in={onChatList}
      addEndListener={(node, done) => {
        onChatList
          ? TweenLite.to(node, 0.5, {
              top: 0,
              opacity: 1,
              onComplete: done,
            })
          : TweenLite.to(node, 0.5, {
              left: -variables.ChatWidth,
              delay: onBackHome ? 0 : 1,
              onComplete: done,
            });
      }}
    >
      <List
        conversations={data.conversations.collection}
        onListItemClick={onListItemClick}
      />
    </Transition>
  );
};

export default Conversations;
