import React, { useReducer, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { TweenLite } from 'gsap';
import Conversation from '../components/Conversation';
import ChatInput from '../components/ChatInput';
import Header from '../components/Header';
import variables from '../utils/variables';
import AppContext from '../context/AppContext';

const ChatBox = () => {
  const {
    state: { openChat },
  } = useContext(AppContext);
  const chatBoxRef = useRef();
  console.log({ openChat });

  const show = () => {
    console.log({ show: true });
    TweenLite.to(chatBoxRef.current, 0.1, {
      opacity: 1,
      delay: 2,
    });
  };

  useEffect(() => {
    if (openChat) {
      show();
    }
  }, [openChat, show]);

  return (
    <styles.ChatBox ref={chatBoxRef}>
      <Header />
      <styles.ChatBoxWrapper>
        <Conversation />
        <ChatInput />
      </styles.ChatBoxWrapper>
    </styles.ChatBox>
  );
};

const styles = {};

styles.ChatBox = styled.div`
  border-radius: ${variables.BorderRadius};
  background: #fcfcfc;
  height: ${variables.ChatHeight};
  position: relative;
  opacity: 0;
  overflow: hidden;
`;

styles.ChatBoxWrapper = styled.div`
  border-radius: ${variables.BorderRadius};
  width: ${variables.ChatWidth}px;
  height: calc(${variables.ChatHeight} - ${variables.HeaderSmall}px);
  top: ${variables.HeaderSmall}px;
  left: 0;
  position: absolute;
`;

export default ChatBox;
