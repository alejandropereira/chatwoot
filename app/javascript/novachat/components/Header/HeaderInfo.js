import React from 'react';
import styled from 'styled-components';
import { TweenLite } from 'gsap';
import { Transition } from 'react-transition-group';
import Avatar from '../Avatar';
import variables from '../../utils/variables';

const HeaderInfo = ({ onMessages, agent }) => {
  return (
    <styles.HeaderInfo className="HeaderInfo">
      <Transition
        unmountOnExit
        in={onMessages}
        addEndListener={(node, done) => {
          onMessages
            ? TweenLite.to(node, 0.3, {
                bottom: 0,
                opacity: 1,
                onComplete: done,
              })
            : TweenLite.to(node, 0.3, {
                bottom: -30,
                opacity: 0,
                onComplete: done,
              });
        }}
      >
        <styles.UserInfo className="UserInfo">
          {agent && (
            <Avatar
              image={agent.avatarUrl}
              name={agent.name}
              active={agent.availabilityStatus}
              showIndicator
            />
          )}
          {agent && (
            <div className="UserInfoLabel">
              <div>{agent.name}</div>
              <div>{agent.availabilityStatus ? 'Active' : 'Inactive'}</div>
            </div>
          )}
        </styles.UserInfo>
      </Transition>
    </styles.HeaderInfo>
  );
};

const styles = {};

styles.HeaderInfo = styled.div`
  width: ${variables.ChatWidth}px;
  height: ${variables.HeaderSmall}px;
  position: absolute;
  left: 0;
  width: 100%;
  pointer-events: none;
`;

styles.UserInfo = styled.div`
  height: ${variables.HeaderSmall}px;
  position: absolute;
  bottom: -30px;
  opacity: 0;
  position: relative;
  display: flex;
  margin: 0 0 0 55px;
  align-items: center;
  .UserInfoLabel {
    margin: 0 13px;
  }
`;

export default HeaderInfo;
