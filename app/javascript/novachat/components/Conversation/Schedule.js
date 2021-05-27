import React from 'react';
import styled from 'styled-components';
import variables from '../../utils/variables';

const Schedule = ({ text }) => {
  return (
    <styles.Bubble>
      {text}
      <styles.Button>Find a Time</styles.Button>
    </styles.Bubble>
  );
};

const styles = {};

styles.Bubble = styled.div`
  max-width: 250px;
  border-top: 2px ${variables.BrandMainColor} solid;
  border-radius: 5px;
  padding: 18px 23px;
  margin: 0 0 0 15px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  word-break: break-word;
`;

styles.Button = styled.button`
  background: ${variables.BrandMainColor};
  color: white;
  border: none;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 300ms;

  &:hover {
    opacity: 0.8;
  }
`;

export default Schedule;
