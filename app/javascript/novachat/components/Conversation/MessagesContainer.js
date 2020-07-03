import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import variables from '../../utils/variables';
import Message from './Message';

const MessagesContainer = ({
  messages,
  toggle,
  currentConversation,
  typing,
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

  useEffect(() => {
    if (messagesRef.current) {
      const scrollPosition = messagesRef.current.scrollHeight;
      messagesRef.current.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  }, [messages]);
  console.log({ msgs: messages });

  return (
    <animated.div style={transition}>
      <styles.Messages ref={messagesRef}>
        {typing && (
          <Message
            key={currentConversation.key}
            typing={typing}
            avatar={currentConversation.assignee.avatarUrl}
            senderTyping={false}
            type={null}
            sendUserData={() => {
              console.log('hi');
            }}
          />
        )}
        {messages &&
          messages.map(message => {
            return (
              <Message
                key={message.id}
                status={message.status}
                avatar={message.assignee && message.assignee.avatarUrl}
                text={message.content}
                fromUser={message.messageType === 'incoming'}
                typing={false}
                senderTyping={false}
                type={null}
                sendUserData={() => {}}
              />
            );
          })}
      </styles.Messages>
    </animated.div>
  );
};

MessagesContainer.propTypes = {
  messages: PropTypes.array,
  toggle: PropTypes.bool,
};

const styles = {};
const formattedHeaderSmall = `${variables.HeaderSmall}px`;

styles.Messages = styled.div`
  box-sizing: border-box;
  width: ${variables.ChatWidth}px;
  padding: 50px 25px 0px;
  overflow: scroll;
  height: calc(
    ${variables.ChatHeight} - ${formattedHeaderSmall} -
      (${variables.ChatInputHeight}*2)
  );
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
`;

export default MessagesContainer;
