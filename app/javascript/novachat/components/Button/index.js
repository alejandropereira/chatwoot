import React from 'react';
import styled from 'styled-components';
import variables from '../../utils/variables';

function Button({
  text,
  icon: Icon,
  flat,
  onClick,
  className,
  children,
  fWidth = false,
  disabled = false,
}) {
  return (
    <styles.Button
      fWidth={fWidth}
      flat={flat}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {Icon && typeof Icon !== 'string' && <Icon />}
      {Icon && typeof Icon === 'string' && <img src={Icon} alt={text} />}
      {text || children}
    </styles.Button>
  );
}

const styles = {};

styles.Button = styled.button`
  font-family: ${variables.MainFontFamily};
  font-size: ${variables.MainFontSize};
  border-radius: 40px;
  background: ${variables.BrandMainColor};
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
  white-space: nowrap;
  ${props =>
    props.fWidth &&
    `
    width: 100%;
    justify-content: center;
  `}

  ${props =>
    props.flat &&
    `
    color: ${variables.BrandMainColor};
    background: transparent;
    padding: 10px 15px;
  `}
  img, svg {
    width: 17px;
    height: 17px;
    margin: 0 10px 0 0;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;
