import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import variables from '../../utils/variables';
import mixins from '../../utils/mixins';
import IconClose from '../../components/Svgs/IconClose';

const CloseChatButton = ({ onCloseClick }) => (
  <styles.CloseButton onClick={onCloseClick}>
    <IconClose />
  </styles.CloseButton>
);

CloseChatButton.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
};

const styles = {};

styles.CloseButton = styled.button`
  border-radius: 60px;
  width: 60px;
  height: 60px;
  background: ${variables.BrandMainColor};
  border: none;
  margin: 10px 0;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  overflow: hidden;
  position: absolute;
  right: 0px;
  bottom: -90px;
  display: none;

  .IconClose {
    width: 12px;
  }
  ${mixins.dropShadow};

  &:focus {
    outline: none;
  }

  @media ${variables.device.tablet} {
    display: block;
  }
`;

export default CloseChatButton;
