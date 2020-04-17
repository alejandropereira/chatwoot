import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useContext,
} from 'react';
import { TweenLite, Power4 } from 'gsap';
import styled from 'styled-components';
import TextareaAutoSize from 'react-textarea-autosize';
import variables from '../../utils/variables';
import LogoNova from '../../components/Svgs/LogoNova';
import IconSmile from '../../components/Svgs/IconSmile';
import IconPaperClip from '../../components/Svgs/IconPaperClip';
import AppContext from '../../context/AppContext';

const ChatInput = () => {
  const {
    state: { onMessages, onHome, onChatList },
  } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const chatInputRef = useRef();
  const inputRef = useRef();
  const onMessageSent = () => {};

  const focusInput = () => {
    if (inputRef.current && onMessages) {
      inputRef.current.focus();
    }
  };

  const toggleInput = () => {
    if (onHome) {
      TweenLite.to(chatInputRef.current, 1, {
        bottom: -48,
        delay: 2.5,
        ease: Power4.easeInOut,
      });
    }
    if (onChatList) {
      TweenLite.to(chatInputRef.current, 1, {
        bottom: -48,
        ease: Power4.easeInOut,
      });
    }
    if (onMessages) {
      TweenLite.to(chatInputRef.current, 1, {
        bottom: 0,
        ease: Power4.easeInOut,
        delay: 1,
        onComplete: focusInput,
      });
    }
  };

  useEffect(() => {
    toggleInput();
  }, [onMessages, onHome, onChatList]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    onMessageSent(message);
    setMessage('');
  };

  const onEnterPress = (e) => {
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
            <IconSmile />
            <IconPaperClip />
          </div>
        </styles.Input>
      </styles.ChatInput>
    </React.Fragment>
  );
};

const styles = {};

styles.ChatInput = styled.div`
  border-top: 1px solid #efefef;
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
