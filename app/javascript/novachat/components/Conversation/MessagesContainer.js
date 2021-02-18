import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import variables from '../../utils/variables';
import { types } from '../../reducers';
import MessagesSeparator from '../MessagesSeparator';
import IsTyping from './IsTyping';
import Loading from './Loading';
import SecureChat from './SecureChat/index';

const MessagesContainer = ({
  messages,
  toggle,
  fetchMoreMessages,
  loading,
  dispatch,
}) => {
  const messagesRef = useRef();
  const transition = useSpring({
    from: {
      transform: 'translate3d(100%, 0,0)',
      opacity: 0,
      background: '#fcfcfc',
    },
    transform: toggle ? 'translate3d(0%, 0,0)' : `translate3d(100%, 0 ,0)`,
    opacity: toggle ? 1 : 0,
    delay: toggle ? 900 : 0,
    background: toggle ? '#ffffff' : '#fcfcfc',
  });

  const scrollToBottom = React.useCallback(() => {
    if (messagesRef.current) {
      const scrollPosition = messagesRef.current.scrollHeight;
      messagesRef.current.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  }, [messagesRef.current]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.addEventListener('scroll', fetchMoreMessages);
    }
    return () =>
      messagesRef.current.removeEventListener('scroll', fetchMoreMessages);
  }, [messagesRef.current, loading]);

  useEffect(() => {
    scrollToBottom();
    dispatch({
      type: types.SET_MESSAGES_REF,
      payload: messagesRef,
    });
  }, [messagesRef.current]);

  const groups = messages.reduce((group, message) => {
    const date = message.createdAt.split('T')[0];
    if (!group[date]) {
      group[date] = [];
    }
    group[date].push(message);
    return group;
  }, {});

  const groupArrays = Object.keys(groups).map(date => {
    return {
      date,
      messages: groups[date],
    };
  });

  return (
    <animated.div style={transition}>
      <SecureChat />
      <styles.Messages ref={messagesRef}>
        <IsTyping />
        {messages &&
          groupArrays.map(record => (
            <MessagesSeparator
              key={record.date}
              date={record.date}
              messages={record.messages}
            />
          ))}
        {loading && (
          <styles.Loading>
            <Loading color="#2A1688" />
          </styles.Loading>
        )}
      </styles.Messages>
    </animated.div>
  );
};

MessagesContainer.propTypes = {
  messages: PropTypes.array,
  toggle: PropTypes.bool,
  typing: PropTypes.bool,
  loading: PropTypes.bool,
  currentConversation: PropTypes.object,
  fetchMoreMessages: PropTypes.func,
  dispatch: PropTypes.func,
};

const styles = {};
const formattedHeaderSmall = `${variables.HeaderSmall}px`;

styles.Messages = styled.div`
  box-sizing: border-box;
  padding: 0px 25px;
  overflow-y: scroll;
  width: 100%;
  height: calc(
    100vh - ${formattedHeaderSmall} - (${variables.ChatInputHeight}*2) + 7px
  );
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;

  @media ${variables.device.tablet} {
    height: calc(
      ${variables.ChatHeight} - ${formattedHeaderSmall} -
        (${variables.ChatInputHeight}*2)
    );
    width: ${variables.ChatWidth}px;
  }
`;

styles.Loading = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-bottom: 60px;
`;

export default MessagesContainer;
