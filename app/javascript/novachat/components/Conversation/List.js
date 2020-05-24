import React from 'react';
import ListItem from '../ListItem';
import { timeDifferenceForDate } from '../../utils';

const List = ({ onListItemClick, conversations }) => {
  return (
    <div className="List">
      {conversations.map(conversation => {
        return (
          <ListItem
            agent={conversation.assignee}
            text={conversation.messages.collection[0].content}
            key={conversation.id}
            date={timeDifferenceForDate(
              conversation.messages.collection[0].createdAt
            )}
            onClick={() => onListItemClick(conversation)}
          />
        );
      })}
    </div>
  );
};

export default List;
