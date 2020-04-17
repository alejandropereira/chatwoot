import React from 'react';
import styled from 'styled-components';
import variables from '../../utils/variables';

function Avatar({image, name, big, active, showIndicator}) {
  return (
    <styles.Avatar className="Avatar" big={big}>
      <styles.Image>
        <img src={image} alt={name} title={name} />
      </styles.Image>
      {showIndicator && (
        <styles.StatusIndicator active={active} />
      )}
    </styles.Avatar>
  );
}

const styles = {};

styles.Avatar = styled.div`
  width: ${variables.AvatarSmallSize};
  height: ${variables.AvatarSmallSize};
  position: relative;
  ${props => props.big && `
    width: ${variables.AvatarBigSize};
    height: ${variables.AvatarBigSize};
    margin: 0 0 0 -5px;
  `}
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
  ${props => props.active && `
    top: 25px;
    left: 29px;
    border: 1px solid #72B729;
    background: ${variables.ActiveColor};
  `}
`;

export default Avatar;
