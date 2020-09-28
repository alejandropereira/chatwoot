import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TweenLite } from 'gsap';
import Conversation from '../components/Conversation';
import ChatInput from '../components/ChatInput';
import Header from '../components/Header';
import variables from '../utils/variables';
import { useTracked } from '../App';
import DragAndDropFile from '../components/ChatInput/DragAndDropFile';

const ChatBox = () => {
  const [dragOpen, setDragOpen] = useState(false);
  const [{ openChat, onClose }] = useTracked();
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
    <styles.ChatBox
      onDragEnter={event => {
        event.preventDefault();
        event.stopPropagation();
        if (event.currentTarget.contains(event.relatedTarget) && !dragOpen) {
          setDragOpen(true);
        }
      }}
      onDragLeave={event => {
        event.preventDefault();
        event.stopPropagation();
        if (!event.currentTarget.contains(event.relatedTarget) && dragOpen) {
          setDragOpen(false);
        }
      }}
      className="ChatBox"
      ref={chatBoxRef}
    >
      <Header />
      <styles.ChatBoxWrapper className="ChatBoxWrapper">
        <Conversation />
        <ChatInput />
      </styles.ChatBoxWrapper>
      <DragAndDropFile dragOpen={dragOpen} setDragOpen={setDragOpen} />
    </styles.ChatBox>
  );
};

const styles = {};

styles.DragAndDrop = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2em;
`;

styles.ChatBox = styled.div`
  background: #fcfcfc;
  position: relative;
  opacity: 0;
  height: 100vh;
  overflow: hidden;
  box-shadow: 4px 2px 10px rgba(0, 0, 0, 0.05);

  @media ${variables.device.tablet} {
    border-radius: ${variables.BorderRadius};
    height: ${variables.ChatHeight};
  }
`;

styles.ChatBoxWrapper = styled.div`
  border-radius: ${variables.BorderRadius};
  bottom: 0;
  left: 0;
  position: absolute;
  height: calc(100% - 76px);
  width: 100%;

  @media ${variables.device.tablet} {
    width: ${variables.ChatWidth}px;
    height: calc(${variables.ChatHeight} - ${variables.HeaderSmall}px);
  }
`;

export default ChatBox;
