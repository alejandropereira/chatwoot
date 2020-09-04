import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Image from './Image';

const ImageContainer = ({ attachment }) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);
  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        setIsVisible(true);
        observerElement.unobserve(ref.current);
      }
    },
  });

  if (!attachment || attachment.fileType !== 'image') {
    return null;
  }

  return (
    <styles.Wrapper ref={ref}>
      {isVisible && <Image {...attachment} />}
    </styles.Wrapper>
  );
};

ImageContainer.propTypes = {
  attachment: PropTypes.object,
};

const styles = {};

styles.Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export default ImageContainer;
