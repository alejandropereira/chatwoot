import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loading from './Loading';
import ImageModal from './ImageModal';

const Image = ({ thumbUrl, fileUrl, fileName }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [url, setUrl] = React.useState(null);

  return (
    <React.Fragment>
      <styles.Img
        className="thumb"
        alt={fileName}
        src={thumbUrl}
        isLoaded={isLoaded}
      />
      <Loading />
      {url && (
        <ImageModal
          onClose={() => {
            setUrl(null);
          }}
          src={url}
        />
      )}
      <styles.Img
        onLoad={() => {
          setIsLoaded(true);
        }}
        onError={e => {
          setIsLoaded(false);
          e.target.onerror = null;
          e.target.src = fileUrl;
        }}
        onClick={() => {
          setUrl(fileUrl || thumbUrl);
        }}
        className="full"
        alt={fileName}
        src={thumbUrl}
        isLoaded={isLoaded}
      />
    </React.Fragment>
  );
};

Image.propTypes = {
  thumbUrl: PropTypes.string,
  fileUrl: PropTypes.string,
  fileName: PropTypes.string,
};

const styles = {};

styles.Img = styled.img`
  width: 100%;
  z-index: 2;

  &.full {
    transition: opacity 400ms ease 0ms;
    cursor: pointer;

    ${({ isLoaded }) =>
      isLoaded
        ? `
    opacity: 1;
    `
        : `opacity: 0; position: absolute;`}
  }

  &.thumb {
    filter: blur(20px);
    transform: scale(1.4);
    transition: visibility 0ms ease 300ms;

    ${({ isLoaded }) =>
      isLoaded
        ? `
    visibility: hidden;
    position: absolute;
    `
        : `visibility: visible;`}
  }
`;

export default Image;
