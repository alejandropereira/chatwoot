import React, { useState, useRef, useEffect, useContext } from 'react';
import InputMask from 'react-input-mask';
import Loader from 'react-loader-spinner';
import { request, gql } from 'graphql-request';
import Cookies from 'js-cookie';
import { useMutation, useQuery } from 'react-query';
import Button from '../../Button';
import { SecureContext } from '../../../context/SecureContext';
import { useTracked } from '../../../App';
import AppContext from '../../../context/AppContext';
import SelectEmail from './SelectEmail';
import SecurePin from './SecurePin';
import styles from './styles';

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

export const SecureMode = ({ onSuccess }) => {
  const {
    state: { graphqlClient, currentConversation },
  } = useContext(AppContext);

  const mutation = useMutation(variables =>
    graphqlClient.request(
      gql`
        mutation unsecureConversation($conversationId: ID!) {
          unsecureConversation(input: { conversationId: $conversationId }) {
            conversation {
              secured
            }
          }
        }
      `,
      variables
    )
  );

  return (
    <styles.SecureGreenBox>
      <strong>Secure Mode</strong>
      {!mutation.isLoading && (
        <span
          css={`
            cursor: pointer;
          `}
          onClick={async () => {
            await mutation.mutateAsync({
              conversationId: currentConversation.uuid,
            });
            onSuccess();
          }}
        >
          Click to leave
        </span>
      )}
      {mutation.isLoading && (
        <span
          css={`
            margin-right: 12px;
          `}
        >
          <Loader type="Oval" color="#ffffff" height={20} width={20} />
        </span>
      )}
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
  const [{ websiteToken, currentConversation }] = useTracked();

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

  useEffect(() => {
    if (currentConversation.secured) {
      send('SECURE');
    }
  }, [currentConversation.secured]);

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
        onSuccess={data => send({ type: 'PIN', data })}
        onSms={() => send('SMS')}
        onClose={() => send('CLOSE')}
      />
    );
  if (state.matches('pin') || state.matches('retrypin'))
    return (
      <SecurePin
        data={state.context.data}
        isRetrying={state.matches('retrypin')}
        onRetry={() => send('RETRYPIN')}
        onSuccess={() => send('SECURE')}
        onClose={() => send('CLOSE')}
      />
    );
  if (state.matches('secure'))
    return <SecureMode onSuccess={() => send('CLOSE')} />;
  if (state.matches('close')) return <End />;
  return null;
}
