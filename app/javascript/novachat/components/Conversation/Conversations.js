import React from 'react';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import List from './List';
import variables from '../../utils/variables';

const Conversations = ({ onChatList, onListItemClick, onBackHome }) => {
  return (
    <Transition
      unmountOnExit
      in={onChatList}
      addEndListener={(node, done) => {
        onChatList
          ? TweenLite.to(node, 0.5, {
              top: 0,
              opacity: 1,
              onComplete: done,
            })
          : TweenLite.to(node, 0.5, {
              left: -variables.ChatWidth,
              delay: onBackHome ? 0 : 1,
              onComplete: done,
            });
      }}
    >
      <List users={[]} onListItemClick={onListItemClick} />
    </Transition>
  );
};

export default Conversations;
