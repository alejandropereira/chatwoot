import clsx from 'clsx';
import { gql } from 'graphql-request';
import React, { useRef, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { useMutation } from 'react-query';
import AppContext from '../../../context/AppContext';
import Button from '../../Button';
import styles from './styles';

const SecurePin = ({ onClose, onSuccess, onRetry, isRetrying, data }) => {
  const { register, handleSubmit } = useForm();
  const formRef = useRef();
  const firstInputRef = useRef();
  const secondInputRef = useRef();
  const thirdInputRef = useRef();
  const fourthInputRef = useRef();
  const {
    state: { graphqlClient, currentConversation },
  } = useContext(AppContext);

  const mutation = useMutation(variables =>
    graphqlClient.request(
      gql`
        mutation confirmPinSecureChat(
          $conversationId: ID!
          $verificationPin: String!
        ) {
          confirmPinSecureChat(
            input: {
              conversationId: $conversationId
              verificationPin: $verificationPin
            }
          ) {
            conversation {
              secured
            }
          }
        }
      `,
      variables
    )
  );
  const onSubmit = async values => {
    await mutation.mutateAsync({
      conversationId: currentConversation.uuid,
      verificationPin: [
        values.first,
        values.second,
        values.third,
        values.fourth,
      ].join(''),
    });
    onSuccess();
  };

  useEffect(() => {
    if (isRetrying) return;
    firstInputRef.current.focus();
  }, [firstInputRef, isRetrying]);

  return (
    <styles.Wrapper>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <styles.Box>
          <h3>Your PIN has been sent at:</h3>
          <p>{data}</p>
          <styles.VerificationCode>
            <input
              name="first"
              className={clsx(mutation.isError && 'error')}
              ref={e => {
                register(e, { required: true });
                firstInputRef.current = e;
              }}
              onPaste={e => {
                e.stopPropagation();
                e.preventDefault();
                const code = e.clipboardData.getData('Text').split('');
                if (code.length === 4) {
                  firstInputRef.current.value = code[0];
                  secondInputRef.current.value = code[1];
                  thirdInputRef.current.value = code[2];
                  fourthInputRef.current.value = code[3];
                  formRef.current.dispatchEvent(
                    new Event('submit', { cancelable: true })
                  );
                }
              }}
              onChange={() => {
                secondInputRef.current.focus();
              }}
              type="text"
              maxLength="1"
            />
            <input
              name="second"
              ref={e => {
                register(e, { required: true });
                secondInputRef.current = e;
              }}
              onChange={() => {
                thirdInputRef.current.focus();
              }}
              type="text"
              maxLength="1"
            />
            <input
              name="third"
              ref={e => {
                register(e, { required: true });
                thirdInputRef.current = e;
              }}
              onChange={() => {
                fourthInputRef.current.focus();
              }}
              type="text"
              maxLength="1"
            />
            <input
              name="fourth"
              ref={e => {
                register(e, { required: true });
                fourthInputRef.current = e;
              }}
              onChange={() => {
                formRef.current.dispatchEvent(
                  new Event('submit', { cancelable: true })
                );
              }}
              type="text"
              maxLength="1"
            />
          </styles.VerificationCode>
          {mutation.isError && (
            <span className="error error-code" tw="mt-10">
              {/* {mutation.error.message.split(':')[0]} */}
              The code you entered is wrong!
            </span>
          )}
        </styles.Box>
        {isRetrying ||
          (mutation.isLoading && (
            <styles.Center>
              <Loader type="Oval" color="#2A1688" height={50} width={50} />
            </styles.Center>
          ))}
        {!isRetrying && (
          <Button flat fWidth onClick={onRetry}>
            Didn’t get the code?
          </Button>
        )}
        <Button flat fWidth onClick={onClose}>
          Cancel Security Mode
        </Button>
      </form>
    </styles.Wrapper>
  );
};

export default SecurePin;
