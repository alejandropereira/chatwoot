import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import styled from 'styled-components';

function ListItem({ text, onClick, agent, date, attachment }) {
  return (
    <div className="ListItem" onClick={onClick}>
      {agent && (
        <Avatar
          big
          image={agent.avatarUrl || null}
          name={agent.name}
          key={agent.id}
        />
      )}
      <div className="ListItemInfo">
        {agent && <h5>{agent.name}</h5>}
        {text && (
          <styles.LastMessage
            className="LastMessage"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
        {attachment && attachment.fileType === 'image' && (
          <styles.LastMessage className="LastMessage">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>{' '}
            Picture Message
          </styles.LastMessage>
        )}
      </div>
      <div className="ListItemDate">{date}</div>
    </div>
  );
}

ListItem.propTypes = {
  text: PropTypes.string,
  date: PropTypes.string,
  agent: PropTypes.object,
  attachment: PropTypes.object,
  onClick: PropTypes.func,
};

const styles = {};

styles.LastMessage = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
`;

export default ListItem;
