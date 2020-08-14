import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { EmojiButton } from '@joeattardi/emoji-button';
import IconSmile from '../../components/Svgs/IconSmile';

const EmojiPicker = ({ onChange }) => {
  const pickerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    pickerRef.current = new EmojiButton({
      emojiVersion: '1.0',
      position: 'top-end',
      autoHide: false,
    });

    return () => pickerRef.current.destroyPicker();
  }, [pickerRef]);

  const togglePicker = useCallback(() => {
    pickerRef.current.togglePicker(triggerRef.current);
  }, [pickerRef.current, triggerRef.current]);

  useEffect(() => {
    pickerRef.current.on('emoji', onChange);
    return () => {
      pickerRef.current.off('emoji', onChange);
    };
  }, [pickerRef.current]);

  return (
    <div
      ref={triggerRef}
      onClick={togglePicker}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <IconSmile />
    </div>
  );
};

EmojiPicker.propTypes = {
  onChange: PropTypes.func,
};

export default EmojiPicker;
