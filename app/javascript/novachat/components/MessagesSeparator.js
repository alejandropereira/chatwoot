import React from 'react';
import styled from 'styled-components';
import Message from './Conversation/Message';

const MessagesSeparator = ({ date, messages }) => (
  <>
    {messages &&
      messages.map(message => {
        return (
          <Message
            key={message.id}
            id={message.id}
            status={message.status}
            avatar={message.assignee && message.assignee.avatarUrl}
            text={message.content}
            fromUser={message.messageType === 'incoming'}
            typing={false}
            attachments={message.attachments}
            contentAttributes={message.contentAttributes}
            contentType={message.contentType}
            senderTyping={false}
            type={null}
            sendUserData={() => {}}
          />
        );
      })}
    <styles.Separator>{date}</styles.Separator>
  </>
);

export default MessagesSeparator;

const styles = {};

styles.Separator = styled.div`
  font-size: 0.7rem;
  color: #3c4858;
  height: 50px;
  line-height: 50px;
  position: relative;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.5px;

  &:before,
  &:after {
    background-color: #e0e6ed;
    content: '';
    height: 1px;
    position: absolute;
    top: 24px;
    width: calc((100% - 120px) / 2);
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`;
