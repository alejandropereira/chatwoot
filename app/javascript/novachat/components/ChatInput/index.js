import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TweenLite, Power4 } from 'gsap';
import Cookies from 'js-cookie';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import TextareaAutoSize from 'react-textarea-autosize';
import variables from '../../utils/variables';
import LogoNova from '../../components/Svgs/LogoNova';
import getUuid from '../../../widget/helpers/uuid';
import { types } from '../../reducers';
import EmojiPicker from './EmojiPicker';
import FileUpload from './FileUpload';
import CopyPasteImageUpload from './CopyPasteImageUpload';
import { useTracked } from '../../App';
import ImageUploadPreview from './ImageUploadPreview';

const CREATE_MESSAGE = gql`
  mutation createMessage(
    $websiteToken: String!
    $uuid: String!
    $token: String
    $content: String
    $attachment: File
    $refererUrl: String
    $timestamp: String
  ) {
    createMessage(
      input: {
        websiteToken: $websiteToken
        uuid: $uuid
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

const TOGGLE_TYPING = gql`
  mutation toggleCustomerTyping(
    $websiteToken: String!
    $uuid: String!
    $token: String
    $typingStatus: String
  ) {
    toggleCustomerTyping(
      input: {
        websiteToken: $websiteToken
        uuid: $uuid
        token: $token
        typingStatus: $typingStatus
      }
    ) {
      typing
    }
  }
`;

const ChatInput = React.memo(() => {
  const [
    {
      onMessages,
      onHome,
      onChatList,
      websiteToken,
      currentConversation,
      previewFile,
    },
    dispatch,
  ] = useTracked();
  const [message, setMessage] = useState('');
  const chatInputRef = useRef();
  const inputRef = useRef();
  const typingRef = useRef();
  const focusInputRef = useRef(false);
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [toggleTyping] = useMutation(TOGGLE_TYPING);

  const focusInput = useCallback(() => {
    if (inputRef.current && onMessages) {
      inputRef.current.focus();
    }
  }, [inputRef, onMessages]);

  useEffect(() => {
    if (focusInputRef.current) {
      focusInput();
    }
  }, [focusInputRef.current]);

  useEffect(() => {
    if (onHome) {
      TweenLite.to(chatInputRef.current, 1, {
        bottom: -48,
        ease: Power4.easeInOut,
      });
    } else if (onChatList) {
      TweenLite.to(chatInputRef.current, 1, {
        bottom: -48,
        ease: Power4.easeInOut,
      });
    } else if (onMessages) {
      TweenLite.to(chatInputRef.current, 1, {
        bottom: 0,
        ease: Power4.easeInOut,
        delay: 1,
        onComplete: focusInput,
      });
    }
  }, [onMessages, onHome, onChatList]);

  const handleChange = useCallback(event => {
    setMessage(event.target.value);
  }, []);

  const handleEmoji = useCallback(selection => {
    setMessage(msg => `${msg} ${selection.emoji}`);
  }, []);

  const onSave = e => {
    e.preventDefault();
    if (!message) return;

    createMessage({
      variables: {
        content: message,
        websiteToken,
        uuid: currentConversation.uuid,
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

  const onFileUploadPreview = useCallback(file => {
    focusInputRef.current = true;
    dispatch({
      type: types.SET_PREVIEW_FILE_UPLOAD,
      payload: {
        id: getUuid(),
        fileName: file.name,
        fileType: /image/i.test(file.type) ? 'image' : 'file',
        thumbUrl: URL.createObjectURL(file),
        file,
      },
    });
  }, []);

  const onPreviewRemove = useCallback(() => {
    focusInputRef.current = true;
    dispatch({
      type: types.SET_PREVIEW_FILE_UPLOAD,
      payload: {},
    });
  }, []);

  const onFileUpload = useCallback(
    file => {
      createMessage({
        variables: {
          attachment: file,
          websiteToken,
          uuid: currentConversation.uuid,
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
    },
    [currentConversation.uuid]
  );

  const onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

      if (previewFile.file) {
        onFileUpload(previewFile.file);
        dispatch({
          type: types.SET_PREVIEW_FILE_UPLOAD,
          payload: {},
        });
      } else {
        onSave(e);
      }
    }
  };

  return (
    <React.Fragment>
      <styles.ChatInput className="ChatInput" ref={chatInputRef}>
        <div className="NovaElements">
          <LogoNova />
          <p>Powered by novachat!</p>
        </div>
        <ImageUploadPreview onRemove={onPreviewRemove} />
        <styles.Input className="Input" previewFile={previewFile.thumbUrl}>
          <form onSubmit={onSave}>
            <TextareaAutoSize
              ref={inputRef}
              maxRows={3}
              placeholder="write a reply…"
              value={message}
              onChange={handleChange}
              onKeyUp={() => {
                if (typingRef.current) {
                  clearTimeout(typingRef.current);
                  typingRef.current = null;
                } else {
                  toggleTyping({
                    variables: {
                      typingStatus: 'on',
                      websiteToken,
                      uuid: currentConversation.uuid,
                      token: Cookies.get('cw_conversation'),
                    },
                  });
                }

                typingRef.current = setTimeout(() => {
                  toggleTyping({
                    variables: {
                      typingStatus: 'off',
                      websiteToken,
                      uuid: currentConversation.uuid,
                      token: Cookies.get('cw_conversation'),
                    },
                  });
                  typingRef.current = null;
                }, 500);
              }}
              onBlur={() => {
                focusInputRef.current = false;
              }}
              onKeyDown={onEnterPress}
            />
          </form>
          <CopyPasteImageUpload onFileUpload={onFileUploadPreview} />
          <div>
            <EmojiPicker onChange={handleEmoji} />
            <FileUpload onFileUpload={onFileUploadPreview} />
          </div>
        </styles.Input>
      </styles.ChatInput>
    </React.Fragment>
  );
});

const styles = {};

styles.ChatInput = styled.div`
  background: white;
  position: absolute;
  bottom: -100px;
  color: ${variables.SecondaryFontColor};
  width: 100%;

  @media ${variables.device.tablet} {
    border-bottom-left-radius: ${variables.BorderRadius};
    border-bottom-right-radius: ${variables.BorderRadius};
    width: ${variables.ChatWidth}px;
  }

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
  ${({ previewFile }) => !previewFile && `border-top: 1px solid #efefef;`}

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

ChatInput.displayName = 'ChatInput';

ChatInput.whyDidYouRender = true;

export default ChatInput;
