import React, { useContext, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import AppContext from '../context/AppContext';
import { types } from '../reducers';
import variables from '../utils/variables';
import LogoNova from '../components/Svgs/LogoNova';

const OutroLogo = () => {
  const {
    state: { onLogoOutro },
    dispatch,
  } = useContext(AppContext);

  const circleRef = useRef();
  const logoRef = useRef();

  const toggleChat = () => {
    dispatch({ type: types.OPEN_CHAT });
  };

  const outroComplete = () => {
    dispatch({ type: types.OUTRO_COMPLETE });
  };

  const playOutro = useCallback(() => {
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

  useEffect(() => {
    if (onLogoOutro) {
      playOutro();
    }
  }, [onLogoOutro, playOutro]);

  return (
    <Transition
      unmountOnExit
      in={onLogoOutro}
      addEndListener={(node, done) => {
        onLogoOutro
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
      <styles.LogoOutro onClick={toggleChat} className="LogoOutro">
        <div className="CircleWrapper">
          <span className="Circle" ref={circleRef} />
        </div>
        <styles.LogoNova ref={logoRef}>
          <LogoNova />
        </styles.LogoNova>
      </styles.LogoOutro>
    </Transition>
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

export default OutroLogo;
