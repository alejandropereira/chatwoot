import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TimelineMax, TweenLite, Power0, Power2 } from 'gsap';
import variables from '../utils/variables';
import pathData from '../utils/pathData';

const morphTime = 0.1;
const animTime = 2;
const morphEase = Power0.easeNone;
const animEase = Power2.easeIn;

class Intro extends Component {
  static propTypes = {
    onIntroComplete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.paths = null;
  }

  componentDidMount() {
    const morphA = new TimelineMax({ paused: true });
    const morphB = new TimelineMax({ paused: true });
    const morphC = new TimelineMax({ paused: true });

    morphA
      .to('#p0a', 0.3, { morphSVG: { shape: '#p1a', ease: morphEase } })
      .to('#p0a', morphTime, { morphSVG: { shape: '#p2a', ease: morphEase } })
      .to('#p0a', morphTime, { morphSVG: { shape: '#p3a', ease: morphEase } })
      .to('#p0a', morphTime, { morphSVG: { shape: '#p4a', ease: morphEase } })
      .to('#p0a', morphTime, { morphSVG: { shape: '#p5a', ease: morphEase } })
      .to('#p0a', morphTime, { morphSVG: { shape: '#p6a', ease: morphEase } })
      .to('#p0a', morphTime, { morphSVG: { shape: '#p7a', ease: morphEase } })
      .to('#p0a', morphTime, { morphSVG: { shape: '#p8a', ease: morphEase } })
      .to('#p0a', 0.03, { morphSVG: { shape: '#p9a', ease: morphEase } });
    morphB
      .to('#p0b', 0.3, { morphSVG: { shape: '#p1b', ease: morphEase } })
      .to('#p0b', morphTime, { morphSVG: { shape: '#p2b', ease: morphEase } })
      .to('#p0b', morphTime, { morphSVG: { shape: '#p3b', ease: morphEase } })
      .to('#p0b', morphTime, { morphSVG: { shape: '#p4b', ease: morphEase } })
      .to('#p0b', morphTime, { morphSVG: { shape: '#p5b', ease: morphEase } })
      .to('#p0b', morphTime, { morphSVG: { shape: '#p6b', ease: morphEase } })
      .to('#p0b', morphTime, { morphSVG: { shape: '#p7b', ease: morphEase } })
      .to('#p0b', morphTime, { morphSVG: { shape: '#p8b', ease: morphEase } })
      .to('#p0b', 0.03, { morphSVG: { shape: '#p9b', ease: morphEase } });
    morphC
      .to('#p0c', 0.3, { morphSVG: { shape: '#p1c', ease: morphEase } })
      .to('#p0c', morphTime, { morphSVG: { shape: '#p2c', ease: morphEase } })
      .to('#p0c', morphTime, { morphSVG: { shape: '#p3c', ease: morphEase } })
      .to('#p0c', morphTime, { morphSVG: { shape: '#p4c', ease: morphEase } })
      .to('#p0c', morphTime, { morphSVG: { shape: '#p5c', ease: morphEase } })
      .to('#p0c', morphTime, { morphSVG: { shape: '#p6c', ease: morphEase } })
      .to('#p0c', morphTime, { morphSVG: { shape: '#p7c', ease: morphEase } })
      .to('#p0c', morphTime, { morphSVG: { shape: '#p8c', ease: morphEase } })
      .to('#p0c', 0.03, { morphSVG: { shape: '#p9c', ease: morphEase } });

    TweenLite.to(morphA, animTime, { progress: 1, ease: animEase });
    TweenLite.to(morphB, animTime, { progress: 1, ease: animEase });
    TweenLite.to(morphC, animTime, {
      progress: 1,
      ease: animEase,
      onComplete: this.onIntroComplete,
    });
  }

  onIntroComplete = () => {
    const { onIntroComplete } = this.props;
    onIntroComplete();
  };

  renderPaths = () => {
    const paths = pathData.introPaths.map((path, index) => {
      return (
        <g id={`p${index}`} key={`p${index}`}>
          <path
            d={pathData.introPaths[index].c}
            id={`p${index}a`}
            fill={variables.BrandMainColor}
          ></path>
          <path
            d={pathData.introPaths[index].b}
            id={`p${index}b`}
            fill={variables.BrandSecondaryColor}
          ></path>
          <path
            d={pathData.introPaths[index].a}
            id={`p${index}c`}
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
      <styles.Intro className={className}>
        <div ref={div => (this.paths = div)}>
          <svg
            id="paths"
            viewBox="0 0 425 759"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            {this.renderPaths()}
          </svg>
        </div>
      </styles.Intro>
    );
  }
}

const styles = {};

styles.Intro = styled.div`
  border-radius: ${variables.BorderRadius};
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  transform: scale(1.5);
  top: 0;

  @media ${variables.device.tablet} {
    transform: scale(1);

    svg {
      width: 425px;
      height: 759px;
    }
  }

  #paths {
    position: absolute;
  }

  @media ${variables.device.tablet} {
    #paths {
      left: -20px;
      top: -85px;
    }
  }

  #p1a,
  #p1b,
  #p1c {
    visibility: hidden;
  }
  #p2a,
  #p2b,
  #p2c {
    visibility: hidden;
  }
  #p3a,
  #p3b,
  #p3c {
    visibility: hidden;
  }
  #p4a,
  #p4b,
  #p4c {
    visibility: hidden;
  }
  #p5a,
  #p5b,
  #p5c {
    visibility: hidden;
  }
  #p6a,
  #p6b,
  #p6c {
    visibility: hidden;
  }
  #p7a,
  #p7b,
  #p7c {
    visibility: hidden;
  }
  #p8a,
  #p8b,
  #p8c {
    visibility: hidden;
  }
  #p9a,
  #p9b,
  #p9c {
    visibility: hidden;
  }

  @media ${variables.device.tablet} {
    width: ${variables.ChatWidth}px;
    height: ${variables.ChatHeight};
  }
`;

export default Intro;
