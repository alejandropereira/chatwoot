import React, { useContext } from 'react';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import 'gsap/MorphSVGPlugin';
import AppContext from '../context/AppContext';
import Intro from '../views/Intro';
import { types } from '../reducers';

const OutroAnimation = () => {
  const {
    state: { onClose },
    dispatch,
  } = useContext(AppContext);

  const onIntroComplete = () => {
    dispatch({ type: types.ON_INTRO_COMPLETE_CLOSE });
  };

  return (
    <Transition
      unmountOnExit
      in={onClose}
      addEndListener={(node, done) => {
        onClose
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
      <Intro className="Outro" onIntroComplete={onIntroComplete} />
    </Transition>
  );
};

export default OutroAnimation;
