import React from 'react';
import styled from 'styled-components';
import variables from '../../utils/variables';
import mixins from '../../utils/mixins';
import IconRight from '../../img/IconRight.svg';
import IconCheck from '../../img/IconCheck.svg';

function RequestBubble({label, sent, sendUserData, onChange}) {
  return (
    <styles.RequestBubble className="RequestBubble" sent={sent}>
      {label}
      <form onSubmit={sendUserData}>
        <div className="Form">
          <input type="text" onChange={onChange}/>
          {sent ?
            (
              <img src={IconCheck} className="Check" alt="Icon Check"/>
            ):
            (
              <button onClick={sendUserData}>
                <img src={IconRight} alt="Icon Right"/>
              </button>
            )
          }
        </div>
      </form>
    </styles.RequestBubble>
  );
}

const styles = {};

styles.RequestBubble = styled.div`
  width: 284px;
  background: white;
  border-radius: 5px;
  padding: 18px 23px;
  margin: 0 0 0 15px;
  box-sizing: border-box;
  ${mixins.dropShadow};
  border-top: 2px solid ${variables.BrandMainColor};
  .Form {
    display: flex;
    position: relative;
    input{
      flex: 1;
      padding: 11px 5px;
      border: 1px solid #E1E1E1;
      border-right: none;
      outline: none;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      ${sent => sent && `
        border-radius: 5px;
        padding-right: 36px;
      `}
      box-shadow: inset 0 0 7px #E1E1E1;
      font-family: ${variables.MainFontFamily};
    }
    button {
      background: ${variables.BrandMainColor};
      color: white;
      border: none;
      outline: none;
      width: 39px;
      height: 39px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      img {
        position: relative;
        top: 1px;
      }
    }
    .Check {
      position: absolute;
      right: 15px;
      top: 13px;
    }
  }
`;

export default RequestBubble;
