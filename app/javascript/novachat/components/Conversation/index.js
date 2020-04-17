import React, { useReducer, useContext } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import Button from '../Button';
import Messages from './Messages';
import UserList from './UserList';
import Conversations from './Conversations';
import variables from '../../utils/variables';
import SideTransition from '../../views/SideTransition';
import IconChat from '../../components/Svgs/IconChat';
import { types } from '../../reducers';
import AppContext from '../../context/AppContext';

const Conversation = () => {
  const {
    state: { onHome, onBackHome, onChatList, onMessages, currentConversation },
    dispatch,
  } = useContext(AppContext);

  const onListItemClick = (conversationId) => {
    dispatch({ type: types.ON_LIST_ITEM_CLICK, payload: conversationId });
  };

  const onPrevChatClick = () => {
    dispatch({ type: types.ON_PREV_CHAT_CLICK });
  };

  return (
    <React.Fragment>
      <styles.Conversation className="Conversation">
        {/* User List (circles) */}
        <UserList
          onHome={onHome}
          onBackHome={onBackHome}
          onListItemClick={onListItemClick}
          onPrevChatClick={onPrevChatClick}
        />
        {/* List */}
        <Conversations
          onChatList={onChatList}
          onBackHome={onBackHome}
          onListItemClick={onListItemClick}
        />
      </styles.Conversation>
      {/* Side Transition */}
      <Transition
        unmountOnExit
        in={onMessages}
        addEndListener={(node, done) => {
          onMessages
            ? TweenLite.to(node, 1, {
                left: 0,
                onComplete: done,
              })
            : TweenLite.to(node, 0.5, {
                left: variables.ChatWidth,
                onComplete: done,
              });
        }}
      >
        <SideTransition className="SideTransition" />
      </Transition>
      {/* Messages */}

      {currentConversation &&
        currentConversation.id &&
        currentConversation.id !== 'volatile' && (
          <Messages
            onMessages={onMessages}
            conversationId={currentConversation.id}
            currentConversation={currentConversation}
          />
        )}
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
  height: 100%;
  h3 {
    font-size: 18px;
  }
  h4 {
    color: ${variables.SecondaryFontColor};
    margin: 2px 0 0 0;
  }
  .List {
    position: absolute;
    height: 100%;
    overflow-y: scroll;
    left: 0;
    top: 100px;
    opacity: 0;
    .ListItem {
      height: 83px;
      width: ${variables.ChatWidth}px;
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
