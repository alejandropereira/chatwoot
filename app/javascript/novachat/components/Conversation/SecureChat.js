import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import Loader from 'react-loader-spinner';
import { useForm } from 'react-hook-form';
import { request, gql } from 'graphql-request';
import Cookies from 'js-cookie';
import { useMutation, useQuery } from 'react-query';
import clsx from 'clsx';
import Button from '../Button';
import { SecureContext } from '../../context/SecureContext';
import { useTracked } from '../../App';
import AppContext from '../../context/AppContext';

export const Start = ({ onContinue, onClose, isLoading }) => (
  <styles.Wrapper>
    <styles.Box>
      {isLoading ? (
        <styles.Center>
          <Loader type="Oval" color="#2A1688" height={50} width={50} />
        </styles.Center>
      ) : (
        <>
          <h3>You are attempting to enter our Security Mode</h3>
          <p>
            In order to proceed we are going to verify you’re the one who we
            should talk to.
          </p>
        </>
      )}
      <Button onClick={onContinue} fWidth>
        Continue
      </Button>
    </styles.Box>
    <Button flat fWidth onClick={onClose}>
      Cancel Security Mode
    </Button>
  </styles.Wrapper>
);

export const SelectSmsOrEmail = ({ onClose, onSms, onEmail }) => {
  const [selected, setSelected] = useState('');
  const onContinue = () => {
    if (selected === 'sms') {
      onSms();
    } else {
      onEmail();
    }
  };
  return (
    <styles.Wrapper>
      <styles.Box>
        <h3>How do you want to get your security PIN?</h3>
        <styles.CheckBoxes>
          <styles.CheckBox
            selected={selected === 'sms'}
            onClick={() => setSelected('sms')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <h4>Text message</h4>
          </styles.CheckBox>
          <styles.CheckBox
            selected={selected === 'email'}
            onClick={() => setSelected('email')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h4>Email</h4>
          </styles.CheckBox>
        </styles.CheckBoxes>
        <Button disabled={selected === ''} onClick={onContinue} fWidth>
          Continue
        </Button>
      </styles.Box>
      <Button flat fWidth onClick={onClose}>
        Cancel Security Mode
      </Button>
    </styles.Wrapper>
  );
};

export const SelectPhone = ({ onClose, onSuccess, onEmail }) => {
  const inputRef = React.useRef();
  const [phone, setPhone] = React.useState('515-223-2345');

  React.useEffect(() => {
    const length = inputRef.current.value.length;
    inputRef.current.focus();
    inputRef.current.setSelectionRange(length, length);
  }, []);

  return (
    <styles.Wrapper>
      <styles.Box>
        <styles.HeadingWithIcon>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.085 10.4l-3.137-1.392a1.542 1.542 0 00-1.824.442l-.947 1.185a12.427 12.427 0 01-3.813-3.812l1.184-.946a1.541 1.541 0 00.444-1.826L5.6.914A1.539 1.539 0 003.808.05L1.155.74a1.545 1.545 0 00-1.14 1.705 15.976 15.976 0 0013.541 13.541 1.534 1.534 0 001.156-.307c.27-.21.463-.502.55-.832l.688-2.653a1.533 1.533 0 00-.864-1.793z"
              fill="#2A1688"
            />
          </svg>
          <h3>Confirm your phone number</h3>
        </styles.HeadingWithIcon>
        <InputMask
          ref={inputRef}
          mask="999-999-9999"
          className="input"
          onChange={e => setPhone(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onSuccess();
            }
          }}
          value={phone}
        />
      </styles.Box>
      <Button flat fWidth onClick={onEmail}>
        Try with email activation?
      </Button>
      <Button flat fWidth onClick={onClose}>
        Cancel Security Mode
      </Button>
    </styles.Wrapper>
  );
};

export const SelectEmail = ({ onSuccess, onSms, onClose, email }) => {
  const { register, handleSubmit, errors } = useForm();
  const {
    state: { graphqlClient },
  } = useContext(AppContext);

  const mutation = useMutation(variables =>
    graphqlClient.request(
      gql`
        mutation confirmEmailSendPin($email: String!) {
          confirmEmailSendPin(input: { email: $email }) {
            contact {
              email
            }
          }
        }
      `,
      variables
    )
  );
  const onSubmit = async data => {
    await mutation.mutateAsync(data);
    onSuccess();
  };

  // React.useEffect(() => {
  //   const length = inputRef.current.value.length;
  //   inputRef.current.focus();
  //   inputRef.current.setSelectionRange(length, length);
  // }, []);

  return (
    <styles.Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <styles.Box>
          <styles.HeadingWithIcon>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                d="M15 1H1c-.6 0-1 .4-1 1v1.4l8 4.5 8-4.4V2c0-.6-.4-1-1-1z"
                fill="#2A1688"
              />
              <path
                d="M7.5 9.9L0 5.7V14c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V5.7L8.5 9.9c-.28.14-.72.14-1 0z"
                fill="#2A1688"
              />
            </svg>
            <h3>Confirm your email</h3>
          </styles.HeadingWithIcon>
          <div className="field-group">
            <input
              name="email"
              ref={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
              type="text"
              className={clsx('input', errors.email && 'error')}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>
          <Button disabled={mutation.isLoading} type="submit" fWidth>
            {mutation.isLoading ? 'Loading...' : 'Continue'}
          </Button>
        </styles.Box>
        <Button flat fWidth onClick={onSms}>
          Try with SMS activation?
        </Button>
        <Button flat fWidth onClick={onClose}>
          Cancel Security Mode
        </Button>
      </form>
    </styles.Wrapper>
  );
};

export const SecurePin = ({ onClose, onSuccess, onRetry, isRetrying }) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);

  useEffect(() => {
    if (isRetrying) return;
    firstInputRef.current.focus();
  }, [firstInputRef, isRetrying]);

  return (
    <styles.Wrapper>
      <styles.Box>
        <h3>Your PIN has been sent at:</h3>
        <p>+1 202-555-0142</p>
        <styles.VerificationCode>
          <input
            ref={firstInputRef}
            value={first}
            onChange={e => {
              setFirst(e.target.value);
              secondInputRef.current.focus();
            }}
            type="text"
            maxLength="1"
          />
          <input
            ref={secondInputRef}
            value={second}
            onChange={e => {
              setSecond(e.target.value);
              thirdInputRef.current.focus();
            }}
            type="text"
            maxLength="1"
          />
          <input
            ref={thirdInputRef}
            value={third}
            onChange={e => {
              setThird(e.target.value);
              fourthInputRef.current.focus();
            }}
            type="text"
            maxLength="1"
          />
          <input
            ref={fourthInputRef}
            value={fourth}
            onChange={e => {
              setFourth(e.target.value);
              fourthInputRef.current.blur();
            }}
            onBlur={onSuccess}
            type="text"
            maxLength="1"
          />
        </styles.VerificationCode>
      </styles.Box>
      {isRetrying && (
        <styles.Center>
          <Loader type="Oval" color="#2A1688" height={50} width={50} />
        </styles.Center>
      )}
      {!isRetrying && (
        <Button flat fWidth onClick={onRetry}>
          Didn’t get the code?
        </Button>
      )}
      <Button flat fWidth onClick={onClose}>
        Cancel Security Mode
      </Button>
    </styles.Wrapper>
  );
};

export const SecureMode = () => {
  return (
    <styles.SecureGreenBox>
      <strong>Secure Mode</strong>
      <span>Click to leave</span>
    </styles.SecureGreenBox>
  );
};

export const End = () => (
  <styles.Wrapper>
    <styles.Box center>
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 67">
        <path
          d="M29.588 42.98c-.359 0-.703-.142-.957-.396l-6.77-6.771a1.355 1.355 0 111.914-1.915l5.624 5.622 11.264-16.269a1.354 1.354 0 112.226 1.541L30.701 42.398a1.354 1.354 0 01-.99.583h-.123z"
          fill="url(#paint0_linear)"
        />
        <circle
          cx="33.5"
          cy="33.5"
          r="32.5"
          transform="rotate(-180 33.5 33.5)"
          stroke="url(#paint1_linear)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="43.148"
            y1="42.98"
            x2="22.852"
            y2="21.324"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1C046D" />
            <stop offset="1" stopColor="#5D49C7" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="33.5"
            y1="1"
            x2="33.5"
            y2="66"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1D046D" />
            <stop offset="1" stopColor="#5C48C7" />
          </linearGradient>
        </defs>
      </svg>
      <h3>Security Mode Ended</h3>
      <p className="bigger">
        You have sucessfully left NovaChat’s Security Mode
      </p>
    </styles.Box>
  </styles.Wrapper>
);

export default function SecureChat() {
  const [state, send] = React.useContext(SecureContext);
  const [{ websiteToken }] = useTracked();

  const query = gql`
    query getContact($websiteToken: String!, $token: String!) {
      contact(websiteToken: $websiteToken, token: $token) {
        id
        name
        email
        phoneNumber
      }
    }
  `;

  const contactInfo = useQuery('Contact', () =>
    request('/graphql', query, {
      websiteToken,
      token: Cookies.get('cw_conversation'),
    })
  );

  if (state.matches('start'))
    return (
      <Start
        onContinue={() => send('CONTINUE')}
        onClose={() => send('CLOSE')}
        isLoading={contactInfo.isLoading}
      />
    );
  if (state.matches('method'))
    return (
      <SelectSmsOrEmail
        onSms={() => send('SMS')}
        onEmail={() => send('EMAIL')}
        onClose={() => send('CLOSE')}
      />
    );
  if (state.matches('sms'))
    return (
      <SelectPhone
        onSuccess={() => send('PIN')}
        onEmail={() => send('EMAIL')}
        onClose={() => send('CLOSE')}
      />
    );
  if (state.matches('email'))
    return (
      <SelectEmail
        email={contactInfo.data.contact.email}
        onSuccess={() => send('PIN')}
        onSms={() => send('SMS')}
        onClose={() => send('CLOSE')}
      />
    );
  if (state.matches('pin') || state.matches('retrypin'))
    return (
      <SecurePin
        isRetrying={state.matches('retrypin')}
        onRetry={() => send('RETRYPIN')}
        onSuccess={() => send('SECURE')}
        onClose={() => send('CLOSE')}
      />
    );
  if (state.matches('secure')) return <SecureMode />;
  if (state.matches('close')) return <End />;
  return null;
}

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
