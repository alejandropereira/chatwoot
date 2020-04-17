import React from "react";

const IconLeft = ({ color = "#FFF" }) => {
  return (
    <svg
      width="10"
      height="15"
      viewBox="0 0 10 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Back Arrow</title>
      <path
        d="M9 14L2 7.5 9 1"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default IconLeft;
