import React from "react";

function ListItem({ text, onClick, name, date, active, image }) {
  return (
    <div className="ListItem" onClick={onClick}>
      <img src={image} alt="name" className="ListItemAvatar" />
      <div className="ListItemInfo">
        <h5>{name}</h5>
        <div
          className="LastMessage"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <div className="ListItemDate">{date}</div>
    </div>
  );
}

export default ListItem;
