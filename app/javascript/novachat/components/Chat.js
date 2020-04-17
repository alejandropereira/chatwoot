import React, {
  useEffect,
  useReducer,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import styled, { css } from 'styled-components';
import { TweenLite, Power4, Back, TimelineMax } from 'gsap';
import 'gsap/MorphSVGPlugin';
import { Transition } from 'react-transition-group';
import reducer, { types, initialState } from '../reducers';
import AppContext from '../context/AppContext';
import variables from '../utils/variables';
import StartButtonAnimation from '../components/Button/StartButtonAnimation';
import StartChatButton from '../containers/StartChatButton';
import ChatBox from '../containers/ChatBox';

const Chat = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const circleRef = useRef();
  const logoRef = useRef();

  const { openChat, onLogoOutro, onClose, onLogoOutroComplete } = state;

  const playOutro = useCallback(() => {
    if (!circleRef.current || !logoRef.current) return;
    const animation = new TimelineMax();

    animation
      .to(circleRef.current, 1, {
        width: 60,
        height: 60,
        top: 4,
        left: 21,
        ease: Power4.easeOut,
      })
      .to(circleRef.current, 0, {
        opacity: 0,
      })
      .to(logoRef.current, 0.5, {
        opacity: 1,
      })
      .to(logoRef.current, 1.5, {
        top: 640,
        ease: Back.easeInOut.config(1.5),
      })
      .to(logoRef.current, 1.5, {
        left: 318,
        rotation: 360,
        ease: Power4.easeInOut,
      })
      .to(logoRef.current, 0.5, {
        opacity: 0,
        ease: Power4.easeInOut,
        onComplete: outroComplete,
      });
  }, []);

  const toggleChat = () => {
    dispatch({ type: types.OPEN_CHAT });
  };

  // const onIntroComplete = () => {
  //   if (onClose) {
  //     dispatch({ type: types.ON_INTRO_COMPLETE_CLOSE });
  //   } else {
  //     dispatch({ type: types.ON_INTRO_COMPLETE });
  //   }
  // };

  // const onPrevChatClick = () => {
  //   dispatch({ type: types.ON_PREV_CHAT_CLICK });
  // };

  const onCloseClick = () => {
    dispatch({ type: types.ON_CLOSE_CLICK });
    TweenLite.to(chatBoxRef.current, 0.1, {
      opacity: 0,
      delay: 1.8,
    });
  };

  const outroComplete = () => {
    dispatch({ type: types.OUTRO_COMPLETE });
  };

  // const onHomeOutDone = () => {
  //   dispatch({ type: types.ON_HOME_OUT_DONE });
  // };

  // const onBackClick = () => {
  //   if (onMessages && currentConversation.id === "volatile") {
  //     dispatch({ type: types.ON_BACK_CLICK });
  //   } else if (onMessages) {
  //     dispatch({ type: types.ON_BACK_CLICK_MESSAGES });
  //   } else {
  //     dispatch({ type: types.ON_BACK_CLICK });
  //   }
  // };

  // const onListItemClick = conversationId => {
  //   dispatch({ type: types.ON_LIST_ITEM_CLICK, payload: conversationId });
  // };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <styles.Chat className="Chat" open={openChat}>
        {/* Intro */}
        {/* <Transition
          unmountOnExit
          in={onIntro}
          addEndListener={(node, done) => {
            onIntro
              ? TweenLite.to(node, 0.3, {
                  opacity: 1,
                  onComplete: done
                })
              : TweenLite.to(node, 0.3, {
                  opacity: 0,
                  onComplete: done
                });
          }}
        >
          <Intro className="Intro" onIntroComplete={onIntroComplete} />
        </Transition> */}

        {/* ChatBox */}
        <ChatBox />

        {/* Outro */}
        {/* <Transition
          unmountOnExit
          in={onClose}
          addEndListener={(node, done) => {
            onClose
              ? TweenLite.to(node, 0.3, {
                  opacity: 1,
                  onComplete: done
                })
              : TweenLite.to(node, 0.3, {
                  opacity: 0,
                  onComplete: done
                });
          }}
        >
          <Intro className="Outro" onIntroComplete={onIntroComplete} />
        </Transition> */}
        {/* Close Chat Button */}
        {/* <Transition
          unmountOnExit
          in={openChat}
          addEndListener={(node, done) => {
            openChat
              ? TweenLite.to(node, 1.5, {
                  bottom: 0,
                  ease: Power4.easeInOut,
                  delay: 1.5,
                  onComplete: done
                })
              : TweenLite.to(node, 1, {
                  bottom: 75,
                  opacity: 0,
                  ease: Back.easeInOut.config(10),
                  onComplete: done
                });
          }}
        >
          <CloseChatButton onCloseClick={onCloseClick} />
        </Transition> */}
        {/* Start Button Animation */}
        <Transition
          unmountOnExit
          in={openChat}
          addEndListener={(node, done) => {
            openChat
              ? TweenLite.to(node, 0.3, {
                  opacity: 1,
                  onComplete: done,
                })
              : TweenLite.to(node, 0.3, {
                  opacity: 0,
                  onComplete: done,
                });
          }}
        >
          <StartButtonAnimation
            onClose={onClose}
            onCloseClick={onCloseClick}
            onClick={toggleChat}
            openChat={openChat}
            onLogoOutroComplete={onLogoOutroComplete}
          />
        </Transition>

        {/* Start Chat Button */}
        <StartChatButton />

        {/* LogoOutro */}
        {/* {onLogoOutro && (
          <styles.LogoOutro onClick={toggleChat} className="LogoOutro">
            <div className="CircleWrapper">
              <span className="Circle" ref={circleRef} />
            </div>
            <styles.LogoNova ref={logoRef}>
              <LogoNova />
            </styles.LogoNova>
          </styles.LogoOutro>
        )} */}
      </styles.Chat>
    </AppContext.Provider>
  );
};

const styles = {};

styles.LogoNova = styled.div`
  position: absolute;
  background: white;
  opacity: 0;
  top: 4px;
  left: 21px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  img {
    width: 34px;
  }
`;

styles.LogoOutro = styled.div`
  position: absolute;
  top: 0;
  pointer-events: none;
  width: ${variables.ChatWidth}px;
  height: 100%;
  .CircleWrapper {
    width: ${variables.ChatWidth}px;
    height: ${variables.ChatHeight};
    position: absolute;
    top: 0;
    overflow: hidden;
    border-radius: ${variables.BorderRadius};
  }
  .Circle {
    width: 800px;
    height: 800px;
    background: white;
    display: block;
    border-radius: 100%;
    position: absolute;
    top: -100px;
    left: -200px;
  }
`;

styles.SenderInput = styled.div`
  border: none;
  position: absolute;
  left: -400px;
  bottom: 98px;
`;

styles.Chat = styled.div`
  position: fixed;
  right: 10px;
  bottom: 0px;
  width: 0px;
  height: 0px;
  z-index: 1;
  width: ${variables.ChatWidth}px;
  height: 716px;
  ${({ open }) =>
    false &&
    css`
      width: ${variables.ChatWidth}px;
      height: 716px;
    `}
`;

export default Chat;
