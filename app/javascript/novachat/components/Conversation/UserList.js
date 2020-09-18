import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { TweenLite, Power4 } from 'gsap';
import Button from '../Button';
import Avatar from '../Avatar';
import IconChat from '../../components/Svgs/IconChat';
import variables from '../../utils/variables';
import mixins from '../../utils/mixins';

function UserList({
  onHome,
  onBackHome,
  onPrevChatClick,
  onListItemClick,
  agents,
  conversations,
}) {
  return (
    <Transition
      unmountOnExit
      in={onHome}
      appear
      addEndListener={(node, done) =>
        onHome
          ? TweenLite.to(node, 1.5, {
              opacity: 1,
              top: 115,
              ease: Power4.easeOut,
              delay: onBackHome ? 0 : 2,
              onComplete: done,
            })
          : TweenLite.to(node, 0.5, {
              opacity: 0,
              top: 0,
              ease: Power4.easeOut,
              onComplete: done,
            })
      }
    >
      <styles.UserList className="UserList">
        <div>
          <h3>Start a conversation</h3>
          <h4>The team member will be with you shortly!</h4>
          <styles.Users>
            {agents.map(agent => {
              return (
                <Avatar
                  big
                  image={agent.avatarUrl || null}
                  name={agent.name}
                  key={agent.id}
                />
              );
            })}
          </styles.Users>
          <styles.Buttons>
            <Button
              text="New conversation"
              onClick={() =>
                onListItemClick({ key: 'volatile', uuid: 'volatile' })
              }
              icon={IconChat}
            />
            {conversations.length > 0 && (
              <Button text="previous chats" flat onClick={onPrevChatClick} />
            )}
          </styles.Buttons>
        </div>
      </styles.UserList>
    </Transition>
  );
}

UserList.propTypes = {
  onHome: PropTypes.bool,
  onBackHome: PropTypes.bool,
  onPrevChatClick: PropTypes.func,
  onListItemClick: PropTypes.func,
  agents: PropTypes.array,
  conversations: PropTypes.array,
};

const styles = {};

styles.UserList = styled.div`
  opacity: 0;
  border-radius: ${variables.BorderRadius};
  background: white;
  width: 346px;
  height: 216px;
  ${mixins.dropShadow}
  padding: 30px 26px;
  box-sizing: border-box;
  top: 250px;
  position: absolute;
  left: 15px;
`;

styles.Users = styled.div`
  margin: 10px 0 0 0;
  display: flex;
`;

styles.Buttons = styled.div`
  display: flex;
  margin: 10px 0 0 0;
`;

export default UserList;
