import React from 'react';
import styled from 'styled-components';
import variables from '../../utils/variables';

function Avatar({ image, name, big, active, showIndicator }) {
  const getInitials = username => {
    const parts = username ? username.split(/[ -]/) : [];
    let initials = '';
    for (let i = 0; i < parts.length; i += 1) {
      initials += parts[i].charAt(0);
    }
    if (initials.length > 2 && initials.search(/[A-Z]/) !== -1) {
      initials = initials.replace(/[a-z]+/g, '');
    }
    initials = initials.substr(0, 2).toUpperCase();
    return initials;
  };
  return (
    <styles.Avatar className="Avatar" big={big}>
      {image && (
        <styles.Image>
          <img src={image} alt={name} title={name} />
        </styles.Image>
      )}
      {!image && <styles.Initials>{getInitials(name)}</styles.Initials>}
      {showIndicator && <styles.StatusIndicator active={active} />}
    </styles.Avatar>
  );
}

const styles = {};

styles.Avatar = styled.div`
  width: ${variables.AvatarSmallSize};
  height: ${variables.AvatarSmallSize};
  position: relative;
  ${props =>
    props.big &&
    `
    width: ${variables.AvatarBigSize};
    height: ${variables.AvatarBigSize};
    margin: 0 0 0 -5px;
  `}
`;

styles.Initials = styled.div`
  width: 100%;
  height: 100%;
  background: #2a1688;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  border-radius: 40px;
  overflow: hidden;
  border: 1px solid white;
`;

styles.Image = styled.div`
  border-radius: 40px;
  overflow: hidden;
  border: 1px solid white;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
  }
`;

styles.StatusIndicator = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  position: absolute;
  top: 24px;
  left: 28px;
  ${props =>
    props.active &&
    `
    top: 25px;
    left: 29px;
    border: 1px solid #72B729;
    background: ${variables.ActiveColor};
  `}
`;

export default Avatar;
