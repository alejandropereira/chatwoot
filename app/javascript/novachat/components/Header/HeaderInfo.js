import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TweenLite } from 'gsap';
import { Transition } from 'react-transition-group';
import Avatar from '../Avatar';
import variables from '../../utils/variables';

class HeaderInfo extends Component {
  constructor(props) {
    super(props);
    this.prevConversationTitle = null;
    this.userInfo = null;
  }

  render() {
    const { onMessages } = this.props;
    const selectedUser = {};
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
            <Avatar
              image={selectedUser.avatar || `https://i.pravatar.cc/150`}
              name={selectedUser.name || 'Wiredave'}
              active={selectedUser.active}
              showIndicator
            />
            <div className="UserInfoLabel">
              <div>{selectedUser.name || 'Wiredave'}</div>
              <div>{selectedUser.active ? 'Active' : 'Inactive'}</div>
            </div>
          </styles.UserInfo>
        </Transition>
      </styles.HeaderInfo>
    );
  }
}

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
