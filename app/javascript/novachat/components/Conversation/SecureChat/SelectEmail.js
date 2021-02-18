import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import clsx from 'clsx';
import { gql } from 'graphql-request';
import AppContext from '../../../context/AppContext';
import styles from './styles';
import Button from '../../Button';

export default function SelectEmail({ onSuccess, onSms, onClose, email }) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email,
    },
  });
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
}
