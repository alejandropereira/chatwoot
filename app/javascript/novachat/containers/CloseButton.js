import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Transition } from 'react-transition-group';
import { TweenLite, Back, Power4 } from 'gsap';
import { types } from '../reducers';
import AppContext from '../context/AppContext';
import CloseChatButton from '../components/Button/CloseChatButton';

const CloseButton = () => {
  const {
    state: { openChat },
    dispatch,
  } = useContext(AppContext);

  const onCloseClick = () => {
    dispatch({ type: types.ON_CLOSE_CLICK });
  };

  return (
    <Transition
      unmountOnExit
      in={openChat}
      addEndListener={(node, done) => {
        openChat
          ? TweenLite.to(node, 1.5, {
              bottom: 0,
              ease: Power4.easeInOut,
              delay: 1.5,
              onComplete: done,
            })
          : TweenLite.to(node, 1, {
              bottom: 75,
              opacity: 0,
              ease: Back.easeInOut.config(10),
              onComplete: done,
            });
      }}
    >
      <CloseChatButton onCloseClick={onCloseClick} />
    </Transition>
  );
};

export default CloseButton;
