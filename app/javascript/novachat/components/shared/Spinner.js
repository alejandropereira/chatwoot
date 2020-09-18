import React from 'react';
import styled from 'styled-components';

const Spinner = props => {
  return <styles.Spinner {...props} />;
};

const styles = {};

styles.Spinner = styled.div`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  position: relative;
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  padding: $zero 2.4rem;
  vertical-align: middle;

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.4rem;
    height: 2.4rem;
    margin-top: -1rem;
    margin-left: -1rem;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.7);
    border-top-color: #2a1688;
    animation: spinner 0.9s linear infinite;
  }

  ${({ size }) =>
    size === 'small' &&
    `
      width: 1.6rem;
      height: 1.6rem;

      &:before {
        width: 1.6rem;
        height: 1.6rem;
        margin-top: -0.8rem;
      }
  `}

  ${({ mr }) =>
    mr &&
    `
      margin-right: ${mr}px;
  `}

  ${({ ml }) =>
    ml &&
    `
    margin-left: ${ml}px;
`}
`;

export default Spinner;
