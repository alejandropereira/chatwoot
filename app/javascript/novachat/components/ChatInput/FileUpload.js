import React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import IconPaperClip from '../../components/Svgs/IconPaperClip';

const FileUpload = ({ onFileUpload }) => {
  return (
    <Dropzone onDrop={([file]) => onFileUpload(file)}>
      {({ getRootProps, getInputProps }) => (
        <styles.FileUpload>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <IconPaperClip />
          </div>
        </styles.FileUpload>
      )}
    </Dropzone>
  );
};

const styles = {};

styles.FileUpload = styled.section`
  display: inline-block;
  cursor: pointer;

  svg {
    margin-right: 0px !important;
  }

  &:focus {
    outline: none;
  }
`;

export default FileUpload;