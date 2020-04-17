import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TimelineMax, TweenLite, Power0, Power4 } from "gsap";
import variables from "../../utils/variables";
import LogoNova from "../../components/Svgs/LogoNova";
import pathData from "../../utils/pathData";

const morphTime = 0.1;
const animTime = 1;
const morphEase = Power0.easeNone;

class StartButtonAnimation extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    openChat: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.animContainer = null;
    this.button = null;
    this.buttonInPaths = null;
    this.buttonOutPaths = null;
  }

  componentDidMount() {
    const { openChat, onLogoOutroComplete } = this.props;
    if (openChat) {
      const morphOut = new TimelineMax({ paused: true });
      const moveButton = new TimelineMax({ paused: true });

      // Move button
      moveButton
        .to(this.animContainer, morphTime, { y: 37 })
        .to(this.animContainer, morphTime, { y: -70 });
      TweenLite.to(moveButton, animTime * 1.3, {
        progress: 1,
        ease: Power4.easeInOut
      });

      // Move in paths
      TweenLite.to(this.buttonInPaths, animTime * 0.3, {
        x: -10,
        y: -10,
        delay: animTime * 0.4,
        ease: Power4.easeInOut
      });

      //Show out paths
      TweenLite.to(this.buttonOutPaths, animTime * 0.1, {
        opacity: 1,
        delay: animTime * 0.6
      });

      //Morph out
      morphOut
        .to("#bo0", morphTime, { morphSVG: { shape: "#bo1", ease: morphEase } })
        .to("#bo0", morphTime, { morphSVG: { shape: "#bo2", ease: morphEase } })
        .to("#bo0", morphTime, {
          morphSVG: { shape: "#bo3", ease: morphEase }
        });
      TweenLite.to(morphOut, animTime * 0.8, {
        progress: 1,
        ease: Power0.easeNone,
        delay: animTime * 0.6
      });

      //Hide Button
      TweenLite.to(this.button, 0, {
        opacity: 0,
        delay: animTime * 0.6
      });

      //Hide animContainer
      TweenLite.to(this.animContainer, 0.3, {
        scaleX: 0,
        scaleY: 0,
        x: 125,
        y: -25,
        delay: animTime * 1
      });
    }
    // Show toggle button after outro is complete
    if (onLogoOutroComplete) {
      // TweenLite.to(this.button, 1, {
      //   opacity: 1
      // });
    }
  }

  renderOutPaths = () => {
    const paths = pathData.buttonOutPaths.map((path, index) => {
      return (
        <path
          d={pathData.buttonOutPaths[index]}
          id={`bo${index}`}
          key={`bo${index}`}
          fill={variables.BrandMainColor}
        ></path>
      );
    });
    return paths;
  };

  render() {
    const { onClick } = this.props;
    return (
      <div className="StartButtonAnimation">
        <styles.AnimationContainer ref={div => (this.animContainer = div)}>
          <styles.StartButtonAnimation
            onClick={onClick}
            ref={div => (this.button = div)}
          >
            <LogoNova className="LogoNova" />
            <svg
              id="buttonInPaths"
              ref={div => (this.buttonInPaths = div)}
              width="124px"
              height="80px"
              viewBox="0 0 124 80"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M123.080636,5.76688899 L123.080636,80.4688512 L0,80.4688512 L0,23.630889 C10.5344967,17.5459227 19.2476501,15.3356264 26.1394603,17 C36.4771756,19.4965604 51.3846548,25.5922537 76.0900975,9.29612684 C92.5603926,-1.56795772 108.223905,-2.74437034 123.080636,5.76688899 Z"
                id="buttonInPath"
                fill={variables.BrandMainColor}
              ></path>
            </svg>
          </styles.StartButtonAnimation>
          <svg
            id="buttonOutPaths"
            ref={div => (this.buttonOutPaths = div)}
            width="60px"
            height="60px"
            viewBox="0 0 60 60"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Page-1" stroke="none" fill="none">
              {this.renderOutPaths()}
            </g>
          </svg>
        </styles.AnimationContainer>
      </div>
    );
  }
}

const styles = {};

styles.StartButtonAnimation = styled.button`
  border-radius: 60px;
  width: 60px;
  height: 60px;
  background: white;
  border: none;
  margin: 10px 0;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  .IconClose {
    width: 12px;
  }
  .LogoNova {
    width: 34px;
    position: absolute;
    top: 10px;
  }

  #buttonInPaths {
    transform: translate(14px, 34px) scale(2, 2);
  }
`;

styles.AnimationContainer = styled.div`
  #buttonOutPaths {
    position: absolute;
    right: 0px;
    transform: translate(8px, 17px) scale(1.3, 1.3);
    pointer-events: none;
    opacity: 0;
  }
  #bo1,
  #bo2,
  #bo3 {
    visibility: hidden;
  }
`;

export default StartButtonAnimation;
