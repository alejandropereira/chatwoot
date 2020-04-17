import React, { useReducer } from 'react';
import styled from 'styled-components';
import AppContext from '../context/AppContext';
import variables from '../utils/variables';
import StartChatButton from '../containers/StartChatButton';
import ChatBox from '../containers/ChatBox';
import CloseButton from '../containers/CloseButton';
import IntroAnimation from '../containers/IntroAnimation';
import StartButtonAnimation from '../containers/StartButtonAnimation';
import OutroAnimation from '../containers/OutroAnimation';
import OutroLogo from '../containers/OutroLogo';
import reducer, { initialState } from '../reducers';

const Chat = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <styles.Chat className="Chat">
        <IntroAnimation />
        <ChatBox />
        <OutroAnimation />
        <CloseButton />
        <StartButtonAnimation />
        <StartChatButton />
        <OutroLogo />
      </styles.Chat>
    </AppContext.Provider>
  );
};

const styles = {};

styles.Chat = styled.div`
  position: fixed;
  right: 10px;
  bottom: 0px;
  width: 0px;
  height: 0px;
  z-index: 1;
  width: ${variables.ChatWidth}px;
  height: 716px;
`;

export default Chat;
