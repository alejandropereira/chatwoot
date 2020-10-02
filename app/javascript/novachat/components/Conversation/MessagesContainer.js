import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import variables from '../../utils/variables';
import { types } from '../../reducers';
import Messages from './Messages';
import MessagesSeparator from '../MessagesSeparator';

const MessagesContainer = ({
  messages,
  toggle,
  currentConversation,
  fetchMoreMessages,
  typing,
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
      date: new Date(date).toDateString(),
      messages: groups[date],
    };
  });

  return (
    <animated.div style={transition}>
      <styles.Messages ref={messagesRef}>
        {typing && (
          <Messages
            key={currentConversation.key}
            typing={typing}
            avatar={
              currentConversation.assignee &&
              currentConversation.assignee.avatarUrl
            }
            type={null}
            sendUserData={() => {}}
          />
        )}
        {messages &&
          groupArrays.map(record => (
            <MessagesSeparator
              key={record.date}
              date={record.date}
              messages={record.messages}
            />
          ))}
        {loading && <div>Loading...</div>}
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

export default MessagesContainer;
