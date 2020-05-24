import React from 'react';
import Avatar from '../Avatar';

function ListItem({ text, onClick, agent, date }) {
  return (
    <div className="ListItem" onClick={onClick}>
      <Avatar
        big
        image={agent.avatarUrl || null}
        name={agent.name}
        key={agent.id}
      />
      <div className="ListItemInfo">
        <h5>{agent.name}</h5>
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
