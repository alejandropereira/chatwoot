import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

import ActionCableConnector from '../utils/actionCable';
import { useTracked } from '../App';
import { types } from '../reducers';

const WEB_WIDGET = gql`
  query webWidget($websiteToken: String!, $authToken: String) {
    webWidget(websiteToken: $websiteToken, authToken: $authToken) {
      pubsubToken
      token
      widget {
        welcomeTitle
        welcomeTagline
        channel {
          id
          name
          avatarUrl
        }
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
  const [state, dispatch] = useTracked();
  const [authToken, setAuthToken] = useState(
    Cookies.get('cw_conversation') || ''
  );
  const { loading, error, data } = useQuery(WEB_WIDGET, {
    variables: {
      websiteToken,
      authToken,
    },
    onCompleted(d) {
      dispatch({
        type: types.SET_WIDGET_TOKEN,
        payload: { webWidget: d.webWidget, websiteToken },
      });
    },
  });

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

Chat.propTypes = {
  websiteToken: PropTypes.string,
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
