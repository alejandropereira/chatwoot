import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import Cookies from 'js-cookie';
import { useQuery, gql } from '@apollo/client';
import Button from '../Button';
import Messages from './Messages';
import UserList from './UserList';
import Conversations from './Conversations';
import variables from '../../utils/variables';
import SideTransition from '../../views/SideTransition';
import IconChat from '../../components/Svgs/IconChat';
import { types } from '../../reducers';
import { useTracked } from '../../App';

const CONVERSATIONS = gql`
  query conversations($token: String!, $websiteToken: String!) {
    conversations(token: $token, websiteToken: $websiteToken) {
      collection {
        id
        uuid
        secured
        assignee {
          id
          avatarUrl
          availabilityStatus
          name
        }
        messages(sorting: { field: id, order: DESC }, per: 1) {
          collection {
            id
            content
            attachments {
              id
              fileType
            }
            createdAt
          }
        }
      }
    }
  }
`;

const Conversation = () => {
  const [
    { onHome, onBackHome, onChatList, onMessages, websiteToken, webWidget },
    dispatch,
  ] = useTracked();
  const { loading, error, data, refetch } = useQuery(CONVERSATIONS, {
    variables: {
      websiteToken,
      token: Cookies.get('cw_conversation'),
    },
    fetchPolicy: 'network-only',
  });

  const onListItemClick = conversationId => {
    dispatch({ type: types.ON_LIST_ITEM_CLICK, payload: conversationId });
  };

  const onPrevChatClick = () => {
    dispatch({ type: types.ON_PREV_CHAT_CLICK });
  };

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <styles.Conversation className="Conversation">
        {/* User List (circles) */}
        <UserList
          onHome={onHome}
          onBackHome={onBackHome}
          onListItemClick={onListItemClick}
          onPrevChatClick={onPrevChatClick}
          agents={webWidget.widget.agents}
          conversations={data.conversations.collection}
        />
        {/* List */}
        <Conversations
          onChatList={onChatList}
          refetchConversations={refetch}
          onBackHome={onBackHome}
          onListItemClick={onListItemClick}
          conversations={data.conversations.collection}
        />
      </styles.Conversation>
      {/* Side Transition */}
      <Transition
        unmountOnExit
        in={onMessages}
        appear
        addEndListener={(node, done) =>
          onMessages
            ? TweenLite.to(node, 1, {
                left: 0,
                onComplete: done,
              })
            : TweenLite.to(node, 0.5, {
                left: variables.ChatWidth,
                onComplete: done,
              })
        }
      >
        <SideTransition className="SideTransition" />
      </Transition>
      {/* Messages */}

      {onMessages && <Messages />}

      {/* FooterButton */}
      <styles.FooterButton>
        <Button text="New conversationn" icon={IconChat} />
      </styles.FooterButton>
    </React.Fragment>
  );
};

const styles = {};

styles.Conversation = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding-bottom: ${variables.AvatarBigSize};

  h3 {
    font-size: 18px;
  }
  h4 {
    color: ${variables.SecondaryFontColor};
    margin: 2px 0 0 0;
  }
  .List {
    position: absolute;
    background: white;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    left: 0;
    top: 100px;
    opacity: 0;
    .ListItem {
      height: 83px;
      width: 100%;
      border: none;
      outline: none;
      text-align: left;
      font-family: ${variables.MainFontFamily};
      border-bottom: 1px solid #efefef;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;

      @media ${variables.device.tablet} {
        width: ${variables.ChatWidth}px;
      }

      &:hover {
        background: #fcfcfc;
      }
      .Container {
        padding: 0 13px;
        display: flex;
        align-items: center;
        height: 100%;
      }
      .ListItemAvatar {
        width: ${variables.AvatarSmallSize};
        height: ${variables.AvatarSmallSize};
        border-radius: 40px;
      }
      .ListItemInfo {
        flex: 1;
        margin: 0 13px;
        font-size: ${variables.MainFontSize};
        h5 {
          text-overflow: ellipsis;
          max-width: 225px;
        }
        .LastMessage p {
          color: ${variables.SecondaryFontColor};
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 225px;
        }
      }
      .ListItemDate {
        color: ${variables.SecondaryFontColor};
      }
    }
  }
`;

styles.FooterButton = styled.div`
  position: absolute;
  bottom: 110px;
  opacity: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  display: none;
`;

export default Conversation;
