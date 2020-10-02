import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BodyEnd from './BodyEnd';

const ImageModal = ({ src, onClose }) => {
  return (
    <BodyEnd>
      <styles.Backdrop onClick={onClose}>
        <styled.Container>
          <styles.CloseBtn>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              focusable="false"
              width="1em"
              height="1em"
              style={{
                msTransform: 'rotate(360deg)',
                WebkitTransform: 'rotate(360deg)',
                transform: 'rotate(360deg)',
              }}
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 512 512"
            >
              <path
                d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"
                fill="#626262"
              />
            </svg>
          </styles.CloseBtn>
          <img src={src} alt="Hola" />
        </styled.Container>
      </styles.Backdrop>
    </BodyEnd>
  );
};

ImageModal.propTypes = {
  src: PropTypes.string,
  onClose: PropTypes.func,
};

const styles = {};

styles.Backdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9990;
`;

styles.CloseBtn = styled.div`
  border-radius: 50%;
  color: #1f2d3d;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1.6rem;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  background: #f4f6fb;

  &:hover {
    background: #eaecef;
  }
`;

styled.Container = styled.div`
  border-radius: 0.4rem;
  background: white;
  position: relative;
  text-align: center;

  img {
    max-width: 80%;
  }
`;

export default ImageModal;
