import React, { Component } from 'react';
import styled from 'styled-components';
import { TimelineMax, TweenLite, Power0, Power4 } from 'gsap';
import variables from '../utils/variables';
import pathData from '../utils/pathData';

const morphTime = 0.5;
const animTime = 2;
const morphEase = Power0.easeNone;
const animEase = Power4.easeInOut;

class SideTransition extends Component {
  constructor(props) {
    super(props);
    this.paths = null;
  }

  componentDidMount() {
    const morphA = new TimelineMax({ paused: true });
    const morphB = new TimelineMax({ paused: true });

    morphA
      .to('#m0a', morphTime, { morphSVG: { shape: '#m1a', ease: morphEase } })
      .to('#m0a', morphTime, { morphSVG: { shape: '#m2a', ease: morphEase } })
      .to('#m0a', morphTime, { morphSVG: { shape: '#m3a', ease: morphEase } })
      .to('#m0a', morphTime, { morphSVG: { shape: '#m4a', ease: morphEase } })
      .to('#m0a', morphTime, { morphSVG: { shape: '#m5a', ease: morphEase } });
    morphB
      .to('#m0b', morphTime, { morphSVG: { shape: '#m1b', ease: morphEase } })
      .to('#m0b', morphTime, { morphSVG: { shape: '#m2b', ease: morphEase } })
      .to('#m0b', morphTime, { morphSVG: { shape: '#m3b', ease: morphEase } })
      .to('#m0b', morphTime, { morphSVG: { shape: '#m4b', ease: morphEase } })
      .to('#m0b', morphTime, { morphSVG: { shape: '#m5b', ease: morphEase } });

    TweenLite.to(morphA, animTime, { progress: 1, ease: animEase });
    TweenLite.to(morphB, animTime, { progress: 1, ease: animEase });
  }

  renderPaths = () => {
    const paths = pathData.messagePaths.map((path, index) => {
      return (
        <g id={`m${index}`} key={`m${index}`}>
          <path
            d={pathData.messagePaths[index].a}
            id={`m${index}a`}
            fill={variables.BrandMainColor}
          ></path>
          <path
            d={pathData.messagePaths[index].b}
            id={`m${index}b`}
            fill="white"
          ></path>
        </g>
      );
    });
    return paths;
  };

  render() {
    const { className } = this.props;
    return (
      <styles.SideTransition className={className}>
        <div>
          <svg
            id="paths"
            // width="425px"
            // height="759px"
            viewBox="0 0 425 759"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            ref={div => (this.paths = div)}
          >
            {this.renderPaths()}
          </svg>
        </div>
      </styles.SideTransition>
    );
  }
}

const styles = {};

styles.SideTransition = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  overflow: hidden;
  top: 0px;
  left: 50px;

  @media ${variables.device.tablet} {
    width: ${variables.ChatWidth}px;
    height: ${variables.ChatHeight};
  }

  #paths {
    position: absolute;
    left: 0;
    top: 0;
    transform: scaleX(1.5) scaleY(1.3);
  }

  @media ${variables.device.tablet} {
    #paths {
      left: -150px;
      top: -100px;
    }
  }

  #m1a,
  #m1b {
    visibility: hidden;
  }
  #m2a,
  #m2b {
    visibility: hidden;
  }
  #m3a,
  #m3b {
    visibility: hidden;
  }
  #m4a,
  #m4b {
    visibility: hidden;
  }
  #m5a,
  #m5b {
    visibility: hidden;
  }
  #m6a,
  #m6b {
    visibility: hidden;
  }
`;

export default SideTransition;
