import { useEffect } from 'react';

const CopyPasteImageUpload = ({ onFileUpload }) => {
  const onPaste = e => {
    if (e.clipboardData && e.clipboardData.items) {
      onFileUpload(e.clipboardData.items[0].getAsFile());
    }
  };

  useEffect(() => {
    window.addEventListener('paste', onPaste, false);
    return () => window.removeEventListener('paste', onPaste);
  }, []);

  return null;
};

export default CopyPasteImageUpload;
