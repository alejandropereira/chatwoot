import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';
import { timeDifferenceForDate } from '../../utils';

const List = ({ onListItemClick, conversations }) => {
  return (
    <div className="List">
      {conversations.map(conversation => {
        return (
          <ListItem
            agent={conversation.assignee}
            secured={
              conversation.messages.collection[0] &&
              conversation.messages.collection[0].secured
            }
            text={
              conversation.messages.collection[0] &&
              conversation.messages.collection[0].content
            }
            attachment={
              conversation.messages.collection[0] &&
              conversation.messages.collection[0].attachments &&
              conversation.messages.collection[0].attachments[0]
            }
            key={conversation.id}
            date={timeDifferenceForDate(
              conversation.messages.collection[0] &&
                conversation.messages.collection[0].createdAt
            )}
            onClick={() => onListItemClick(conversation)}
          />
        );
      })}
    </div>
  );
};

List.propTypes = {
  onListItemClick: PropTypes.func,
  conversations: PropTypes.array,
};

export default List;
