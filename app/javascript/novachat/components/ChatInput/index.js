import React, { useState, useRef, useEffect, useContext } from 'react';
import { TweenLite, Power4 } from 'gsap';
import Cookies from 'js-cookie';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import TextareaAutoSize from 'react-textarea-autosize';
import variables from '../../utils/variables';
import LogoNova from '../../components/Svgs/LogoNova';
import AppContext from '../../context/AppContext';
import getUuid from '../../../widget/helpers/uuid';
import { types } from '../../reducers';
import EmojiPicker from './EmojiPicker';
import FileUpload from './FileUpload';

const CREATE_MESSAGE = gql`
  mutation createMessage(
    $websiteToken: String!
    $token: String
    $content: String
    $attachment: File
    $refererUrl: String
    $timestamp: String
  ) {
    createMessage(
      input: {
        websiteToken: $websiteToken
        token: $token
        content: $content
        attachment: $attachment
        refererUrl: $refererUrl
        timestamp: $timestamp
      }
    ) {
      message {
        id
      }
    }
  }
`;

const ChatInput = () => {
  const {
    state: { onMessages, onHome, onChatList, websiteToken },
    dispatch,
  } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const chatInputRef = useRef();
  const inputRef = useRef();
  const [createMessage] = useMutation(CREATE_MESSAGE);

  const focusInput = () => {
    if (inputRef.current && onMessages) {
      inputRef.current.focus();
    }
  };

  const toggleInput = () => {
    if (onHome) {
      return TweenLite.to(chatInputRef.current, 1, {
        bottom: -48,
        delay: 2.5,
        ease: Power4.easeInOut,
      });
    }
    if (onChatList) {
      return TweenLite.to(chatInputRef.current, 1, {
        bottom: -48,
        ease: Power4.easeInOut,
      });
    }
    if (onMessages) {
      return TweenLite.to(chatInputRef.current, 1, {
        bottom: 0,
        ease: Power4.easeInOut,
        delay: 1,
        onComplete: focusInput,
      });
    }
    return TweenLite.to(chatInputRef.current, 1, {
      bottom: -48,
      ease: Power4.easeInOut,
    });
  };

  useEffect(() => {
    toggleInput();
  }, [onMessages, onHome, onChatList]);

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleEmoji = selection => {
    setMessage(msg => `${msg} ${selection.emoji}`);
  };

  const onSave = e => {
    e.preventDefault();
    createMessage({
      variables: {
        content: message,
        websiteToken,
        refererUrl: window.location.href,
        timestamp: new Date().toString(),
        token: Cookies.get('cw_conversation'),
      },
    });
    dispatch({
      type: types.APPEND_IP_MESSAGE,
      payload: {
        id: getUuid(),
        createdAt: new Date().toISOString(),
        assignee: null,
        content: message,
        status: 'in_progress',
        messageType: 'incoming',
      },
    });
    setMessage('');
  };

  const onFileUpload = file => {
    createMessage({
      variables: {
        attachment: file,
        websiteToken,
        refererUrl: window.location.href,
        timestamp: new Date().toString(),
        token: Cookies.get('cw_conversation'),
      },
    });
    dispatch({
      type: types.APPEND_IP_MESSAGE,
      payload: {
        id: getUuid(),
        createdAt: new Date().toISOString(),
        assignee: null,
        content: null,
        attachments: [
          {
            id: getUuid(),
            fileName: file.name,
            fileType: /image/i.test(file.type) ? 'image' : 'file',
            thumbUrl: URL.createObjectURL(file),
          },
        ],
        status: 'in_progress',
        messageType: 'incoming',
      },
    });
  };

  const onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      onSave(e);
    }
  };

  return (
    <React.Fragment>
      <styles.ChatInput className="ChatInput" ref={chatInputRef}>
        <div className="NovaElements">
          <LogoNova />
          <p>Powered by novachat!</p>
        </div>
        <styles.Input className="Input">
          <form onSubmit={onSave}>
            <TextareaAutoSize
              inputRef={inputRef}
              maxRows={3}
              placeholder="write a reply…"
              value={message}
              onChange={handleChange}
              onKeyDown={onEnterPress}
            />
          </form>
          <div>
            <EmojiPicker onChange={handleEmoji} />
            <FileUpload onFileUpload={onFileUpload} />
          </div>
        </styles.Input>
      </styles.ChatInput>
    </React.Fragment>
  );
};

const styles = {};

styles.ChatInput = styled.div`
  border-bottom-left-radius: ${variables.BorderRadius};
  border-bottom-right-radius: ${variables.BorderRadius};
  background: white;
  position: absolute;
  bottom: -100px;
  width: ${variables.ChatWidth}px;
  color: ${variables.SecondaryFontColor};
  .NovaElements {
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${variables.ChatInputHeight};
    img,
    svg {
      width: 16px;
      margin: 0 5px 0 0;
    }
  }
`;

styles.Input = styled.div`
  display: flex;
  padding: 10px 20px;
  border-top: 1px solid #efefef;
  form {
    flex: 1;
    width: 100%;
    margin-right: 15px;
  }
  textarea {
    width: 100%;
    border: none;
    outline: none;
    font-family: ${variables.MainFontFamily};
    font-size: ${variables.MainFontSize};
    width: 100%;
    padding: 4px 0 0 0;
    resize: none;
  }
  img,
  svg {
    margin: 0 15px 0 0;
    width: 19px;
  }
`;

export default ChatInput;
