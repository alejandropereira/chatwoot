import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TweenLite, Power4 } from 'gsap';
import add from 'date-fns/add';
import isPast from 'date-fns/isPast';
import variables from '../../utils/variables';
import Avatar from '../Avatar';
import RequestBubble from './RequestBubble';
import PathMessage from '../../img/PathMessage.svg';
import ImageContainer from './ImageContainer';
import Schedule from './Schedule';

const ANIM_TIME = 2;
const DOTS_TIME = 1;
const SECS = 5;

export default function Message({
  id,
  text,
  avatar,
  fromUser,
  typing,
  type,
  status,
  attachments,
  contentType,
  contentAttributes,
  secured,
  createdAt,
}) {
  const [sent, setSent] = useState(false);
  const [isSecured, setIsSecured] = useState(
    () =>
      secured &&
      isPast(
        add(new Date(createdAt), {
          seconds: SECS,
        })
      )
  );
  const securedRef = useRef(null);
  const maskRight = useRef(null);
  const maskLeft = useRef(null);
  const dotsLeft = useRef(null);
  const dotsRight = useRef(null);
  const lastDotRight = useRef(null);
  const firstDotLeft = useRef(null);
  const firstDotRight = useRef(null);
  const tween1 = useRef(null);
  const tween2 = useRef(null);

  const onRepeatLeft = () => {
    TweenLite.to(lastDotRight.current, 0, {
      opacity: 0,
    });
    TweenLite.to(firstDotLeft.current, 0, {
      opacity: 1,
    });
  };

  const onRepeatRight = () => {
    TweenLite.to(lastDotRight.current, 0, {
      opacity: 1,
    });
    TweenLite.to(firstDotLeft.current, 0, {
      opacity: 0,
    });
  };

  const onRightStart = () => {
    TweenLite.to(firstDotRight.current, 0, {
      opacity: 1,
    });
    TweenLite.to(firstDotLeft.current, 0, {
      opacity: 0,
    });
  };

  useEffect(() => {
    if (secured && !isSecured) {
      securedRef.current = setTimeout(() => {
        setIsSecured(true);
      }, SECS * 1000);
    }

    return () => {
      clearTimeout(securedRef.current);
    };
  }, [secured]);

  useEffect(() => {
    if (fromUser) {
      // For user bubble: Move path from right to left
      TweenLite.to(maskRight.current, ANIM_TIME, {
        left: -500,
        top: -130,
        ease: Power4.easeOut,
      });
    } else {
      // For sender bubble: Move path from left to right
      TweenLite.to(maskLeft.current, ANIM_TIME, {
        left: 200,
        top: -200,
        ease: Power4.easeOut,
      });
    }
    // Typing animation
    if (typing) {
      // Rotate dots left
      tween1.current = TweenLite.to(dotsLeft.current, DOTS_TIME, {
        rotation: 180,
        repeat: -1,
        repeatDelay: DOTS_TIME / 2,
        ease: Power4.easeOut,
        onRepeat: onRepeatLeft,
      });
      // Rotate dots right
      tween2.current = TweenLite.to(dotsRight.current, DOTS_TIME, {
        rotation: -180,
        repeat: -1,
        delay: DOTS_TIME,
        repeatDelay: DOTS_TIME / 2,
        ease: Power4.easeOut,
        onStart: onRightStart,
        onRepeat: onRepeatRight,
      });
    }
    return () => {
      if (tween1.current) tween1.current.kill();
      if (tween2.current) tween2.current.kill();
    };
  }, [fromUser, typing]);

  return (
    <styles.Message
      inProgress={status === 'in_progress'}
      className="Message"
      fromUser={fromUser}
      secured={isSecured}
    >
      {!fromUser && !type && avatar && <Avatar image={avatar} />}
      {contentType === 'input_email' ? (
        <RequestBubble
          messageId={id}
          sent={sent}
          label={text}
          sendUserData={() => {}}
          onChange={() => {}}
          contentAttributes={contentAttributes}
        />
      ) : contentType === 'schedule' ? (
        <Schedule text={text} />
      ) : (
        <styles.Bubble
          fromUser={fromUser}
          hasAttachment={attachments && attachments[0]}
        >
          {typing && (
            <styles.Typing>
              <div className="Dots" ref={dotsLeft}>
                <span className="Dot" ref={firstDotLeft} />
                <span className="Dot" />
              </div>
              <div className="Dots Right" ref={dotsRight}>
                <span className="Dot firstDotRight" ref={firstDotRight} />
                <span className="Dot" ref={lastDotRight} />
              </div>
            </styles.Typing>
          )}
          <div dangerouslySetInnerHTML={{ __html: text }} />
          {attachments && attachments[0] && (
            <ImageContainer attachment={attachments[0]} />
          )}
          {fromUser ? (
            <img
              src={PathMessage}
              alt="Path Message"
              ref={maskRight}
              id="maskRight"
            />
          ) : (
            <img
              src={PathMessage}
              alt="Path Message"
              ref={maskLeft}
              id="maskLeft"
            />
          )}
        </styles.Bubble>
      )}
    </styles.Message>
  );
}

const styles = {};

styles.Message = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0 0 15px 0;
  ${props =>
    props.inProgress &&
    `
    opacity: 0.75;
  `}

  ${props =>
    props.secured &&
    `
    filter: blur(5px);
  `}

  ${props =>
    props.fromUser &&
    `
    justify-content: flex-end;
  `}
`;

styles.Bubble = styled.div`
  max-width: 250px;
  background: #f5f5f5;
  border-radius: 5px;
  padding: 18px 23px;
  margin: 0 0 0 15px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  word-break: break-word;
  ${props =>
    props.hasAttachment &&
    `
    padding: 0;
    box-shadow: 0 0.4rem 6px rgba(50, 50, 93, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  `}
  ${props =>
    props.fromUser &&
    `
    background: ${variables.BrandMainColor};
    color: white;
  `}
  #maskRight {
    position: absolute;
    top: 0;
    left: 0;
  }
  #maskLeft {
    position: absolute;
    left: -75px;
    top: -150px;
    transform: rotate(180deg);
  }
`;

styles.Typing = styled.div`
  display: flex;
  .Dots {
    display: flex;
  }
  .Right {
    margin: 0 0 0 -11px;
  }
  .Dot {
    background: ${variables.SecondaryFontColor};
    width: 7px;
    height: 7px;
    margin: 0 2px;
    display: block;
    border-radius: 10px;
  }
  .firstDotRight {
    opacity: 0;
  }
`;
