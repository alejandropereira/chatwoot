import styled from 'styled-components';

const styles = {};

styles.Wrapper = styled.div`
  height: 100%;
  padding: 25px;
`;

styles.Box = styled.div`
  background: #faf9ff;
  border: 1.38655px solid rgba(44, 24, 140, 0.1);
  padding: 25px;
  border-radius: 6.93277px;
  margin-bottom: 25px;

  ${({ center }) => center && `text-align: center;`}

  .field-group {
    margin-bottom: 35px;
  }

  h3 {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #0f0f0f;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.831932px;
    color: #0f0f0f;
    line-height: 1.5;
    margin-bottom: 35px;

    &.bigger {
      font-size: 17px;
    }
  }

  svg {
    width: 65px;
    margin-bottom: 20px;
  }

  input.input {
    border: 1.35577px solid rgba(44, 24, 140, 0.1);
    height: 45px;
    width: 100%;
    background: transparent;
    border-radius: 5px;
    font-size: 14px;
    color: #253256;
    padding: 0 20px;

    &.error {
      border-color: red;
      outline-color: red;
    }
  }

  span.error {
    color: red;
    font-size: 11px;

    &.error-code {
      text-align: center;
      width: 100%;
      display: block;
      margin-top: 15px;
    }
  }
`;

styles.HeadingWithIcon = styled.div`
  display: flex;

  svg {
    margin-right: 15px;
    width: 16px;
  }
`;

styles.CheckBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: -10px;
`;

styles.CheckBox = styled.div`
  border-radius: 5px;
  border: 1px solid rgba(44, 24, 140, 0.1);
  background: transparent;
  flex: 1;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  margin-right: 10px;
  cursor: pointer;
  color: #2a1688;

  svg {
    margin-bottom: 12px;
  }

  h4 {
    font-size: 15px;
    color: #0f0f0f;
  }

  ${props =>
    props.selected &&
    `
    color: white;
    background: #2a1688;
    
    h4 {
      color: white;
    }
  `}
`;

styles.VerificationCode = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    width: 50px;
    height: 70px;
    background: transparent;
    border: 1.35577px solid rgba(44, 24, 140, 0.1);
    text-align: center;
    border-radius: 6.77885px;
    font-size: 40px;
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

styles.SecureGreenBox = styled.div`
  color: white;
  background: #6bd12d;
  box-shadow: 0px 1px 0px #dde2f4;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: absolute;
  z-index: 10;
  width: 90%;

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #6bd12d;
    right: 35px;
    top: -8px;
  }

  span {
    opacity: 0.7;
  }
`;

styles.Center = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export default styles;
