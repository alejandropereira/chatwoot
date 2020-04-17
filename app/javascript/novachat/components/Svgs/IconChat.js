import React from "react";

const IconChat = ({ color = "#FFF" }) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>IconChat</title>
      <g fill={color} fillRule="nonzero">
        <path d="M16.08 0H.707C.283 0 0 .354 0 .78v11.19c0 .426.283.78.708.78H12.75L17 17V.78c0-.426-.425-.78-.92-.78zm-.497 13.6l-2.266-2.267h-11.9V1.417h14.166V13.6z" />
        <path d="M4.25 5.667h8.5v1h-8.5zM4.25 7.083h8.5v1h-8.5zM4.25 4.25h8.5v1h-8.5z" />
      </g>
    </svg>
  );
};

export default IconChat;
