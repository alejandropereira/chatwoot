import React from "react";

const IconSmile = ({ color = "#929292" }) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>smiley-face-icon</title>
      <path
        d="M9.5.748a9.5 9.5 0 110 19 9.5 9.5 0 010-19zm0 .76a8.74 8.74 0 100 17.48 8.74 8.74 0 000-17.48zm-3.42 6.84a.76.76 0 100-1.52.76.76 0 000 1.52zm6.84 0a.76.76 0 100-1.52.76.76 0 000 1.52zm-3.434 6.08c-2.646 0-4.166-1.52-4.166-1.52v.76s1.52 1.52 4.166 1.52c2.646 0 4.194-1.52 4.194-1.52v-.76s-1.548 1.52-4.194 1.52z"
        fill={color}
        fillRule="nonzero"
      />
    </svg>
  );
};

export default IconSmile;
