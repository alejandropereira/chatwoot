import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';
import { timeDifferenceForDate } from '../../utils';

class List extends Component {
  static propTypes = {
    users: PropTypes.array,
    onListItemClick: PropTypes.func,
  };

  onListItemClick = (conversation) => {
    const { onListItemClick } = this.props;
    onListItemClick(conversation);
  };

  render() {
    const { users: conversations } = this.props;
    return (
      <div className="List">
        {conversations.map((conversation) => {
          return (
            <ListItem
              image={
                (conversation.assignee && conversation.assignee.avatarUrl) ||
                'https://avatars.io/twitter/ddsa'
              }
              name={conversation.assignee && conversation.assignee.displayName}
              text={
                (conversation.lastMessage &&
                  conversation.lastMessage.message.htmlContent) ||
                'Start Chatting...'
              }
              key={conversation.key}
              date={timeDifferenceForDate(conversation.createdAt)}
              active={true}
              onClick={() => this.onListItemClick(conversation)}
            />
          );
        })}
      </div>
    );
  }
}

export default List;
