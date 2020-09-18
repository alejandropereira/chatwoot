import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TweenLite, Power4 } from 'gsap';
import variables from '../../utils/variables';
import Avatar from '../Avatar';
import RequestBubble from './RequestBubble';
import PathMessage from '../../img/PathMessage.svg';
import ImageContainer from './ImageContainer';

const ANIM_TIME = 2;
const DOTS_TIME = 1;

class Message extends Component {
  static propTypes = {
    selectedUser: PropTypes.object,
    sendUserData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userData: '',
      sent: false,
    };
    this.tween1 = null;
    this.tween2 = null;
    this.maskRight = null;
    this.maskLeft = null;
    this.dotsLeft = null;
    this.dotsRight = null;
    this.lastDotRight = null;
    this.firstDotLeft = null;
    this.firstDotRight = null;
  }

  componentDidMount() {
    const { fromUser, typing } = this.props;
    if (fromUser) {
      // For user bubble: Move path from right to left
      TweenLite.to(this.maskRight, ANIM_TIME, {
        left: -500,
        top: -130,
        ease: Power4.easeOut,
      });
    } else {
      // For sender bubble: Move path from left to right
      TweenLite.to(this.maskLeft, ANIM_TIME, {
        left: 200,
        top: -200,
        ease: Power4.easeOut,
      });
    }
    // Typing animation
    if (typing) {
      // Rotate dots left
      this.tween1 = TweenLite.to(this.dotsLeft, DOTS_TIME, {
        rotation: 180,
        repeat: -1,
        repeatDelay: DOTS_TIME / 2,
        ease: Power4.easeOut,
        onRepeat: this.onRepeatLeft,
      });
      // Rotate dots right
      this.tween2 = TweenLite.to(this.dotsRight, DOTS_TIME, {
        rotation: -180,
        repeat: -1,
        delay: DOTS_TIME,
        repeatDelay: DOTS_TIME / 2,
        ease: Power4.easeOut,
        onStart: this.onRightStart,
        onRepeat: this.onRepeatRight,
      });
    }
  }

  componentWillUnmount() {
    this.tween1 && this.tween1.kill();
    this.tween2 && this.tween2.kill();
  }

  onRepeatLeft = () => {
    TweenLite.to(this.lastDotRight, 0, {
      opacity: 0,
    });
    TweenLite.to(this.firstDotLeft, 0, {
      opacity: 1,
    });
  };

  onRepeatRight = () => {
    TweenLite.to(this.lastDotRight, 0, {
      opacity: 1,
    });
    TweenLite.to(this.firstDotLeft, 0, {
      opacity: 0,
    });
  };

  onRightStart = () => {
    TweenLite.to(this.firstDotRight, 0, {
      opacity: 1,
    });
    TweenLite.to(this.firstDotLeft, 0, {
      opacity: 0,
    });
  };

  sendUserData = event => {
    event.preventDefault();
    const { sendUserData, text } = this.props;
    const { userData } = this.state;
    sendUserData(`${text}: ${userData}`);
    this.setState({ sent: true });
  };

  handleChange = event => {
    this.setState({ userData: event.target.value });
  };

  render() {
    const {
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
    } = this.props;
    const { sent } = this.state;
    return (
      <styles.Message
        inProgress={status === 'in_progress'}
        className="Message"
        fromUser={fromUser}
      >
        {!fromUser && !type && avatar && <Avatar image={avatar} />}
        {contentType === 'input_email' ? (
          <RequestBubble
            messageId={id}
            sent={sent}
            label={text}
            sendUserData={this.sendUserData}
            onChange={this.handleChange}
            contentAttributes={contentAttributes}
          />
        ) : (
          <styles.Bubble
            fromUser={fromUser}
            hasAttachment={attachments && attachments[0]}
          >
            {typing && (
              <styles.Typing>
                <div className="Dots" ref={div => (this.dotsLeft = div)}>
                  <span
                    className="Dot"
                    ref={div => (this.firstDotLeft = div)}
                  />
                  <span className="Dot" />
                </div>
                <div className="Dots Right" ref={div => (this.dotsRight = div)}>
                  <span
                    className="Dot firstDotRight"
                    ref={div => (this.firstDotRight = div)}
                  />
                  <span
                    className="Dot"
                    ref={div => (this.lastDotRight = div)}
                  />
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
                ref={div => (this.maskRight = div)}
                id="maskRight"
              />
            ) : (
              <img
                src={PathMessage}
                alt="Path Message"
                ref={div => (this.maskLeft = div)}
                id="maskLeft"
              />
            )}
          </styles.Bubble>
        )}
      </styles.Message>
    );
  }
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

export default Message;
