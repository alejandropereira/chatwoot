import React, { useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { TweenLite } from 'gsap';
import Conversation from '../components/Conversation';
import ChatInput from '../components/ChatInput';
import Header from '../components/Header';
import variables from '../utils/variables';
import AppContext from '../context/AppContext';

const ChatBox = ({ webWidget }) => {
  const {
    state: { openChat, onClose },
  } = useContext(AppContext);
  const chatBoxRef = useRef();

  const show = () => {
    TweenLite.to(chatBoxRef.current, 0.1, {
      opacity: 1,
      delay: 2,
    });
  };

  const hide = () => {
    TweenLite.to(chatBoxRef.current, 0.1, {
      opacity: 0,
      delay: 1.8,
    });
  };

  useEffect(() => {
    if (openChat) {
      show();
    }
  }, [openChat, show]);

  useEffect(() => {
    if (onClose) {
      hide();
    }
  }, [onClose, hide]);

  return (
    <styles.ChatBox className="ChatBox" ref={chatBoxRef}>
      <Header webWidget={webWidget} />
      <styles.ChatBoxWrapper>
        <Conversation webWidget={webWidget} />
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
  box-shadow: 4px 2px 10px rgba(0, 0, 0, 0.05);
`;

styles.ChatBoxWrapper = styled.div`
  border-radius: ${variables.BorderRadius};
  width: ${variables.ChatWidth}px;
  height: calc(${variables.ChatHeight} - ${variables.HeaderSmall}px);
  bottom: 0;
  left: 0;
  position: absolute;
`;

export default ChatBox;
