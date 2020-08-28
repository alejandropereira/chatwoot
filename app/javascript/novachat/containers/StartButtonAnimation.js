import React from 'react';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import StartButtonAnimation from '../components/Button/StartButtonAnimation';
import { types } from '../reducers';
import { useTracked } from '../App';

const StartButtonAnimationContainer = () => {
  const [{ openChat, onLogoOutroComplete }, dispatch] = useTracked();

  const toggleChat = () => {
    dispatch({ type: types.OPEN_CHAT });
  };

  return (
    <Transition
      unmountOnExit
      in={openChat}
      addEndListener={(node, done) =>
        openChat
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
      <StartButtonAnimation
        onClick={toggleChat}
        openChat={openChat}
        onLogoOutroComplete={onLogoOutroComplete}
      />
    </Transition>
  );
};

export default StartButtonAnimationContainer;
