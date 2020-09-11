import React from 'react';
import styled from 'styled-components';

const Loading = ({ color = 'white' }) => {
  return (
    <styles.Wrapper color={color}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </styles.Wrapper>
  );
};

const styles = {};

styles.Wrapper = styled.div`
  position: absolute;
  width: 70px;
  height: 65px;
  z-index: 1;
  transform: scale(0.6);

  div {
    -webkit-transform-origin: 32px 32px;
    -ms-transform-origin: 32px 32px;
    transform-origin: 32px 32px;
    -webkit-animation: 1.2s opaque ease-in-out infinite both;
    animation: 1.2s opaque ease-in-out infinite both;
  }

  div::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 30px;
    width: 5px;
    height: 18px;
    border-radius: 10px;

    ${({ color }) => `background-color: ${color};`}
  }

  div:nth-child(1) {
    -webkit-transform: rotate(0);
    -ms-transform: rotate(0);
    transform: rotate(0);
  }
  div:nth-child(2) {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg);
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  div:nth-child(3) {
    -webkit-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  div:nth-child(4) {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  div:nth-child(5) {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  div:nth-child(6) {
    -webkit-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
    transform: rotate(150deg);
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }
  div:nth-child(7) {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  div:nth-child(8) {
    -webkit-transform: rotate(210deg);
    -ms-transform: rotate(210deg);
    transform: rotate(210deg);
    -webkit-animation-delay: 0.7s;
    animation-delay: 0.7s;
  }
  div:nth-child(9) {
    -webkit-transform: rotate(240deg);
    -ms-transform: rotate(240deg);
    transform: rotate(240deg);
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }
  div:nth-child(10) {
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
  }
  div:nth-child(11) {
    -webkit-transform: rotate(300deg);
    -ms-transform: rotate(300deg);
    transform: rotate(300deg);
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }
  div:nth-child(12) {
    -webkit-transform: rotate(330deg);
    -ms-transform: rotate(330deg);
    transform: rotate(330deg);
    -webkit-animation-delay: 1.1s;
    animation-delay: 1.1s;
  }
  div:nth-child(13) {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
    -webkit-animation-delay: 1.2s;
    animation-delay: 1.2s;
  }

  @keyframes opaque {
    0% {
      opacity: 0.1;
    }
    40% {
      opacity: 1;
    }
    80% {
      opacity: 0.1;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

export default Loading;
