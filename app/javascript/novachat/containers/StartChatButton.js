import React from 'react';
import styled, { css } from 'styled-components';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import variables from '../utils/variables';
import { types } from '../reducers';
import LogoNova from '../components/Svgs/LogoNova';
import { useTracked } from '../App';

const StartChatButton = () => {
  const [{ startChatButtonVisible }, dispatch] = useTracked();

  const toggleChat = () => {
    dispatch({ type: types.OPEN_CHAT });
  };

  return (
    <Transition
      in={startChatButtonVisible}
      addEndListener={(node, done) =>
        startChatButtonVisible
          ? TweenLite.to(node, 0.3, {
              opacity: 1,
              onComplete: done,
            })
          : TweenLite.to(node, 0.3, {
              opacity: 0,
              onComplete: done,
            })
      }
    >
      <styles.StartChatButton
        open={startChatButtonVisible}
        onClick={toggleChat}
      >
        <LogoNova />
      </styles.StartChatButton>
    </Transition>
  );
};

const styles = {};

styles.StartChatButton = styled.button`
  position: absolute;
  background: white;
  bottom: 16px;
  right: 16px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;

  @media ${variables.device.tablet} {
    right: 0px;
  }

  img {
    width: 34px;
  }

  &:focus {
    outline: none;
  }

  ${({ open }) =>
    !open &&
    css`
      pointer-events: none;
    `}
`;

export default StartChatButton;
