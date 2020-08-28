import React from 'react';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import 'gsap/MorphSVGPlugin';
import Intro from '../views/Intro';
import { types } from '../reducers';
import { useTracked } from '../App';

const IntroAnimation = () => {
  const [{ onIntro }, dispatch] = useTracked();

  const onIntroComplete = () => {
    dispatch({ type: types.ON_INTRO_COMPLETE });
  };

  return (
    <Transition
      unmountOnExit
      in={onIntro}
      addEndListener={(node, done) =>
        onIntro
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
      <Intro className="Intro" onIntroComplete={onIntroComplete} />
    </Transition>
  );
};

export default IntroAnimation;
