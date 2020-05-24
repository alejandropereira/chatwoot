import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { TweenLite, Power2 } from 'gsap';
import { Transition } from 'react-transition-group';
import HeaderInfo from './HeaderInfo';
import HeaderPattern from './HeaderPattern';
import Button from '../Button';
import variables from '../../utils/variables';
import IconLeft from '../../components/Svgs/IconLeft';
import LogoNova from '../../components/Svgs/LogoNova';
import { types } from '../../reducers';
import AppContext from '../../context/AppContext';

const Header = ({ webWidget }) => {
  const {
    state: {
      onChatList,
      onHome,
      onIntro,
      onMessages,
      onBackHome,
      currentConversation,
    },
    dispatch,
  } = useContext(AppContext);

  const headerRef = useRef();

  const onBackClick = () => {
    if (onMessages && currentConversation.id === 'volatile') {
      dispatch({ type: types.ON_BACK_CLICK });
    } else if (onMessages) {
      dispatch({ type: types.ON_BACK_CLICK_MESSAGES });
    } else {
      dispatch({ type: types.ON_BACK_CLICK });
    }
  };

  const onHomeOutDone = () => {
    dispatch({ type: types.ON_HOME_OUT_DONE });
  };

  return (
    <styles.Header ref={headerRef}>
      <HeaderPattern onIntro={onIntro} />
      <div className="Container">
        {/* onHome: WelcomeElements */}
        <Transition
          unmountOnExit
          in={onHome}
          addEndListener={(node, done) =>
            onHome
              ? TweenLite.to(node, 1, {
                  opacity: 1,
                  y: 0,
                  delay: onBackHome ? 0 : 2.4,
                  onComplete: done,
                })
              : TweenLite.to(node, 0.6, {
                  opacity: 0,
                  y: -60,
                  onStart: () => {
                    if (!onMessages) {
                      onHomeOutDone();
                    }
                  },
                  onComplete: done,
                })
          }
        >
          <styles.WelcomeElements className="WelcomeElements">
            <styles.LogoNova>
              <LogoNova />
            </styles.LogoNova>
            <h1>{webWidget.widget.welcomeTitle}</h1>
            <h3>{webWidget.widget.welcomeTagline}</h3>
          </styles.WelcomeElements>
        </Transition>
        {/* onChatList | onMessages:  HeaderSmallContent */}
        <styles.HeaderSmallContent className="HeaderSmallContent">
          <Transition
            unmountOnExit
            in={onChatList || onMessages}
            addEndListener={(node, done) => {
              TweenLite.to(node, 0.5, {
                opacity: 1,
                y: 0,
                ease: Power2.easeOut,
                onComplete: done,
              });
            }}
          >
            <Button
              flat
              icon={IconLeft}
              onClick={onBackClick}
              className="HeaderSmallContentButton"
            />
          </Transition>
          <Transition
            unmountOnExit
            in={onChatList}
            addEndListener={(node, done) =>
              onChatList
                ? TweenLite.to(node, 0.5, {
                    opacity: 1,
                    top: 0,
                    ease: Power2.easeOut,
                    onComplete: done,
                  })
                : TweenLite.to(node, 0.5, {
                    opacity: 0,
                    top: -10,
                    onComplete: done,
                  })
            }
          >
            <div className="Label">Previous conversations</div>
          </Transition>
          <HeaderInfo onChatList={onChatList} onMessages={onMessages} />
        </styles.HeaderSmallContent>
      </div>
    </styles.Header>
  );
};

const styles = {};
const formattedHeaderSmall = `${variables.HeaderSmall}px`;

styles.Header = styled.div`
  background-image: linear-gradient(to right, #311e95, #1c046d);
  border-top-left-radius: ${variables.BorderRadius};
  border-top-right-radius: ${variables.BorderRadius};
  height: 247px;
  color: white;
  display: flex;
  position: relative;
  overflow: hidden;
  .Container {
    position: relative;
    h1 {
      font-size: 29px;
      line-height: 1.1;
    }
    h3 {
      opacity: 0.6;
      font-size: 16px;
      margin: 20px 0 0 0;
      letter-spacing: -0.5px;
      line-height: 1.5;
    }
  }
  .Label {
    height: ${variables.HeaderSmall}px;
    font-size: 20px;
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 11px;
    letter-spacing: 0.3px;
    opacity: 0;
    top: 50px;
    pointer-events: none;
  }
`;

styles.LogoNova = styled.div`
  margin: 0 0 10px 0;
  img {
    width: 34px;
  }
`;

styles.WelcomeElements = styled.div`
  margin: 15px 35px;
  transform: translateY(100px);
  opacity: 0;
`;

styles.HeaderSmallContent = styled.div`
  width: ${variables.ChatWidth}px;
  height: ${formattedHeaderSmall};
  position: absolute;
  top: 0px;
  left: 0;
  display: flex;
  .HeaderSmallContentButton {
    margin: 0 0 0 10px;
    opacity: 0;
    transform: translateY(20px);
  }
`;

export default Header;
