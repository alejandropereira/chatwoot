import React from "react";

const IconPaperClip = ({ color = "#929292" }) => {
  return (
    <svg
      width="17"
      height="20"
      viewBox="0 0 17 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>paperclip-icon</title>
      <path
        d="M14.296 9.824l-6.97 7.969c-1.283 1.465-3.555 1.66-5.07.441a3.355 3.355 0 01-.423-4.871L11.41 2.417a2.314 2.314 0 013.173-.28 2.096 2.096 0 01.27 3.037L5.261 16.137a.92.92 0 01-1.263.105.839.839 0 01-.107-1.215l6.97-7.967-.688-.553-6.965 7.962a1.677 1.677 0 00.21 2.437c.758.611 1.89.516 2.53-.216l9.588-10.96a2.938 2.938 0 00-.373-4.257c-1.329-1.069-3.314-.897-4.44.39L1.143 12.815a4.198 4.198 0 00.533 6.083c1.897 1.527 4.737 1.277 6.345-.56l6.964-7.96-.688-.554z"
        fill={color}
        fillRule="nonzero"
      />
    </svg>
  );
};

export default IconPaperClip;
