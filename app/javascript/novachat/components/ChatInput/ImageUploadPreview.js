import React from 'react';
import styled from 'styled-components';
import { useTracked } from '../../App';

const ImageUploadPreview = ({ onRemove }) => {
  const [{ previewFile, onMessages }] = useTracked();

  if (!previewFile.thumbUrl || !onMessages) {
    return null;
  }

  return (
    <styles.Wrapper>
      <div
        style={{
          width: '50px',
          position: 'relative',
        }}
      >
        <styles.CloseBtn onClick={onRemove}>X</styles.CloseBtn>
        <div
          style={{
            borderRadius: '5px',
            width: '50px',
            height: '50px',
            overflow: 'hidden',
          }}
        >
          <img
            src={previewFile.thumbUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill',
            }}
          />
        </div>
      </div>
    </styles.Wrapper>
  );
};

const styles = {};

styles.Wrapper = styled.div`
  padding: 15px 20px 10px;
  border-top: 1px solid #efefef;
`;

styles.CloseBtn = styled.button`
  padding: 2px 3px;
  background: white;
  width: 20px;
  border-radius: 100%;
  border: 1px solid #efefef;
  color: #c3c3c3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: -8px;
  right: -8px;
  transition: all 300ms;

  &:hover {
    background: #efefef;
  }
`;

export default ImageUploadPreview;
