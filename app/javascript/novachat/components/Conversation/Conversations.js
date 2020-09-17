import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import List from './List';
import variables from '../../utils/variables';

const Conversations = ({
  onChatList,
  onListItemClick,
  onBackHome,
  conversations,
  refetchConversations,
}) => {
  useEffect(() => {
    if (onChatList) {
      refetchConversations();
    }
  }, [onChatList]);

  return (
    <Transition
      unmountOnExit
      in={onChatList}
      appear
      addEndListener={(node, done) =>
        onChatList
          ? TweenLite.to(node, 0.5, {
              top: 0,
              opacity: 1,
              onComplete: done,
            })
          : TweenLite.to(node, 0.5, {
              opacity: 0,
              left: -variables.ChatWidth,
              // delay: onBackHome ? 0 : 1,
              onComplete: done,
            })
      }
    >
      <List conversations={conversations} onListItemClick={onListItemClick} />
    </Transition>
  );
};

Conversations.propTypes = {
  onChatList: PropTypes.bool,
  onBackHome: PropTypes.bool,
  onListItemClick: PropTypes.func,
  refetchConversations: PropTypes.func,
  conversations: PropTypes.array,
};

export default Conversations;
