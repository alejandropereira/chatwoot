import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TweenLite } from 'gsap';
import { Transition } from 'react-transition-group';
import Avatar from '../Avatar';
import variables from '../../utils/variables';
import { SecureContext } from '../../context/SecureContext';

const SecureMode = () => {
  const [state, send] = React.useContext(SecureContext);

  return (
    <styles.SecureMode>
      {state.matches('secure') ? (
        <svg
          onClick={() => send('CLOSE')}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g clipPath="url(#clip0)">
            <path fill="#3C269A" d="M6 4.8h12v14.4H6z" />
            <path fill="#fff" d="M6 4.8h12v14.4H6z" />
            <path
              d="M12 8.25a1.5 1.5 0 00-1.5 1.5v1.5h3v-1.5a1.5 1.5 0 00-1.5-1.5z"
              fill="#65A322"
            />
            <path
              d="M21.182 3.023l-9-2.25a.732.732 0 00-.364 0l-9 2.25a.75.75 0 00-.568.727v10.5a9.75 9.75 0 0019.5 0V3.75a.75.75 0 00-.568-.727zM16.5 17.25a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V12a.75.75 0 01.75-.75H9v-1.5a3 3 0 116 0v1.5h.75a.75.75 0 01.75.75v5.25z"
              fill="#65A322"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          onClick={() => send('OPEN')}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g opacity=".3" clipPath="url(#clip0)">
            <path fill="#3C269A" d="M6 4.8h12v14.4H6z" />
            <path
              d="M12 8.25a1.5 1.5 0 00-1.5 1.5v1.5h3v-1.5a1.5 1.5 0 00-1.5-1.5z"
              fill="#F1F8FF"
            />
            <path
              d="M21.182 3.023l-9-2.25a.732.732 0 00-.364 0l-9 2.25a.75.75 0 00-.568.727v10.5a9.75 9.75 0 0019.5 0V3.75a.75.75 0 00-.568-.727zM16.5 17.25a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V12a.75.75 0 01.75-.75H9v-1.5a3 3 0 116 0v1.5h.75a.75.75 0 01.75.75v5.25z"
              fill="#F1F8FF"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      )}
    </styles.SecureMode>
  );
};

const HeaderInfo = ({ onMessages, agent, webWidget }) => {
  return (
    <styles.HeaderInfo className="HeaderInfo">
      <Transition
        unmountOnExit
        in={onMessages}
        addEndListener={(node, done) =>
          onMessages
            ? TweenLite.to(node, 0.3, {
                bottom: 0,
                opacity: 1,
                delay: 1,
                onComplete: done,
              })
            : TweenLite.to(node, 0.3, {
                bottom: -30,
                opacity: 0,
                onComplete: done,
              })
        }
      >
        <styles.UserInfo className="UserInfo">
          {agent ? (
            <Avatar
              image={agent.avatarUrl}
              name={agent.name}
              active={agent.availabilityStatus}
              showIndicator
            />
          ) : (
            <Avatar
              image={webWidget.widget.channel.avatarUrl}
              name={webWidget.widget.channel.name}
              showIndicator={false}
            />
          )}
          <div className="UserInfoLabel">
            <div>{agent ? agent.name : webWidget.widget.channel.name}</div>
            {agent && (
              <div>{agent.availabilityStatus ? 'Active' : 'Inactive'}</div>
            )}
          </div>
          <SecureMode />
        </styles.UserInfo>
      </Transition>
    </styles.HeaderInfo>
  );
};

HeaderInfo.propTypes = {
  agent: PropTypes.object,
  webWidget: PropTypes.object,
  onMessages: PropTypes.bool,
};

const styles = {};

styles.HeaderInfo = styled.div`
  width: ${variables.ChatWidth}px;
  height: ${variables.HeaderSmall}px;
  position: absolute;
  left: 0;
  width: 100%;
  ${'' /* pointer-events: none; */}
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

styles.SecureMode = styled.button`
  margin-left: auto;
  margin-right: 25px;
  background: none;
  border: none;

  &:focus {
    outline: none;
  }

  svg {
    width: 25px;
    cursor: pointer;
  }
`;

export default HeaderInfo;
