import React from 'react';
import styled from 'styled-components';
import getUuid from '../../../widget/helpers/uuid';
import { types } from '../../reducers';
import { useTracked } from '../../App';

const DragAndDropFile = ({ dragOpen, setDragOpen }) => {
  const [{ onMessages }, dispatch] = useTracked();
  if (!onMessages || !dragOpen) return null;

  return (
    <styles.DragAndDrop
      onDrop={e => {
        e.preventDefault();
        e.stopPropagation();
        let files = [...e.dataTransfer.files];
        if (files && files.length > 0) {
          let [file] = files;
          dispatch({
            type: types.SET_PREVIEW_FILE_UPLOAD,
            payload: {
              id: getUuid(),
              fileName: file.name,
              fileType: /image/i.test(file.type) ? 'image' : 'file',
              thumbUrl: URL.createObjectURL(file),
              file,
            },
          });
        }
        setDragOpen(false);
      }}
    >
      <h5>Drag files here to upload</h5>
    </styles.DragAndDrop>
  );
};

const styles = {};

styles.DragAndDrop = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2em;
`;

export default DragAndDropFile;
