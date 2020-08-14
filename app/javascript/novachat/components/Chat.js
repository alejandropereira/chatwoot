import React, { useReducer, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Cookies from 'js-cookie';
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
import ActionCableConnector from '../utils/actionCable';
import useReducerWithLogger from '../hooks/useReducerWithLogger';

const WEB_WIDGET = gql`
  query webWidget($websiteToken: String!, $authToken: String) {
    webWidget(websiteToken: $websiteToken, authToken: $authToken) {
      pubsubToken
      token
      widget {
        welcomeTitle
        welcomeTagline
        agents {
          id
          name
          avatarUrl
          availabilityStatus
        }
      }
    }
  }
`;

const Chat = ({ websiteToken }) => {
  const [authToken, setAuthToken] = useState(
    Cookies.get('cw_conversation') || ''
  );
  const { loading, error, data } = useQuery(WEB_WIDGET, {
    variables: {
      websiteToken,
      authToken,
    },
  });
  const [state, dispatch] = useReducerWithLogger(reducer, initialState);

  useEffect(() => {
    if (data && data.webWidget.pubsubToken) {
      window.actionCable = new ActionCableConnector(
        { dispatch },
        data.webWidget.pubsubToken
      );

      if (!Cookies.get('cw_conversation')) {
        Cookies.set('cw_conversation', data.webWidget.token);
        setAuthToken(data.webWidget.token);
      }
    }

    return () => {
      if (window.actionCable) {
        window.actionCable.disconnect();
      }
    };
  }, [data]);

  if (loading || error || !authToken) return null;

  return (
    <AppContext.Provider
      value={{
        state: { ...state, websiteToken, webWidget: data.webWidget },
        dispatch,
      }}
    >
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
  z-index: 0;
  width: ${variables.ChatWidth}px;
  height: 716px;
`;

export default Chat;
