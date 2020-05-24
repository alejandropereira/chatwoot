import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { TweenLite, Power4 } from 'gsap';

import Button from '../Button';
import Avatar from '../Avatar';
import IconChat from '../../components/Svgs/IconChat';
import variables from '../../utils/variables';
import mixins from '../../utils/mixins';

const AGENTS = gql`
  query agents($websiteToken: String!) {
    agents(websiteToken: $websiteToken) {
      id
      avatarUrl
      name
      availabilityStatus
    }
  }
`;

function UserList({
  onHome,
  onBackHome,
  onPrevChatClick,
  onListItemClick,
  agents,
}) {
  const { loading, error, data } = useQuery(AGENTS, {
    variables: {
      websiteToken: 'dYh5GQtcMgCM1KTozn5f29a2',
    },
  });

  return (
    <Transition
      unmountOnExit
      in={onHome}
      addEndListener={(node, done) => {
        onHome
          ? TweenLite.to(node, 1.5, {
              opacity: 1,
              top: 100,
              ease: Power4.easeOut,
              delay: onBackHome ? 0 : 2.5,
              onComplete: done,
            })
          : TweenLite.to(node, 0.5, {
              opacity: 0,
              top: 0,
              ease: Power4.easeOut,
              onComplete: done,
            });
      }}
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
                onListItemClick({ key: 'volatile', id: 'volatile' })
              }
              icon={IconChat}
            />
            <Button text="previous chats" flat onClick={onPrevChatClick} />
          </styles.Buttons>
        </div>
      </styles.UserList>
    </Transition>
  );
}

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
