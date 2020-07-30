import React, { useRef, useEffect } from 'react';
import { EmojiButton } from '@joeattardi/emoji-button';
import IconSmile from '../../components/Svgs/IconSmile';

const EmojiPicker = ({ onChange }) => {
  const pickerRef = useRef(
    new EmojiButton({
      emojiVersion: '1.0',
      position: 'top-end',
      autoHide: false,
    })
  );
  const triggerRef = useRef(null);

  const togglePicker = () => {
    pickerRef.current.togglePicker(triggerRef.current);
  };

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

export default EmojiPicker;
