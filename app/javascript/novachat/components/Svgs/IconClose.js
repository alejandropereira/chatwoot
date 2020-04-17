import React from "react";

const IconClose = ({ color = "#FFF" }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Close</title>
      <g
        stroke={color}
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="square"
      >
        <path d="M1.5 13.5L12.927 2.073M1.5 2.073L12.927 13.5" />
      </g>
    </svg>
  );
};

export default IconClose;
