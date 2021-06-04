import React from 'react';
import { useForm } from 'react-hook-form';
import { format, parseISO, addMinutes } from 'date-fns';
import 'twin.macro';
import styles from './styles';
import { useMutation } from 'react-query';
import { request, gql } from 'graphql-request';

const Confirmation = ({ time, date, contact, conversationId, next }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      ...contact,
    },
  });

  const createEvent = useMutation(data =>
    request(
      '/graphql',
      gql`
        mutation createEvent(
          $startTime: String!
          $endTime: String!
          $name: String!
          $email: String!
          $conversationId: String!
          $content: String!
        ) {
          createEvent(
            input: {
              startTime: $startTime
              endTime: $endTime
              name: $name
              email: $email
              conversationId: $conversationId
              content: $content
            }
          ) {
            eventId
          }
        }
      `,
      {
        ...data,
      }
    )
  );
  const onSubmit = async data => {
    await createEvent.mutateAsync({
      ...data,
      startTime: time,
      endTime: addMinutes(parseISO(time), 15).toISOString(),
      conversationId,
      content: `Confirmed: 15 Minute Meeting\n\n You are scheduled with AGENT on ${format(
        date,
        'eeee, LLLL dd, yyyy'
      )} at ${format(parseISO(time), 'k:mm aaa')}`,
    });
    next();
  };
  // const onSubmit = async data => {
  //   await createEvent.mutateAsync({
  //     ...data,
  //     startTime: time,
  //     endTime: addMinutes(parseISO(time), 15).toISOString(),
  //     conversationId,
  //     content: `Confirmed: 15 Minute Meeting

  //     You are scheduled with AGENT on ${format(
  //       date,
  //       "eeee, LLLL dd, yyyy"
  //     )} at ${format(parseISO(time), "k:mm aaa")}`,
  //   });
  //   next();
  // };

  return (
    <styles.Wrapper>
      <span className="dayName">Schedule Meeting</span>
      <styles.Heading>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <strong tw="text-purple-600 text-sm!">
          {format(parseISO(time), 'k:mm aaa')} -{' '}
          {format(addMinutes(parseISO(time), 15), 'k:mm aaa')},{' '}
          {format(date, 'eeee, LLLL dd, yyyy')}
        </strong>
      </styles.Heading>
      <styles.Panel>
        <styles.Form onSubmit={handleSubmit(onSubmit)}>
          <div tw="flex flex-col mb-2">
            <label tw="mb-1">Name</label>
            <input name="name" type="text" ref={register({ required: true })} />
            {errors.name && (
              <span tw="text-xs text-red-500 pt-1">This field is required</span>
            )}
          </div>
          <div tw="flex flex-col mb-4">
            <label tw="mb-1">Email</label>
            <input
              name="email"
              type="text"
              ref={register({ required: true })}
            />
            {errors.email && (
              <span tw="text-xs text-red-500 pt-1">This field is required</span>
            )}
          </div>
          <styles.Button disabled={createEvent.isLoading} type="submit">
            {createEvent.isLoading ? 'Loading...' : 'Confirm meeting!'}
          </styles.Button>
        </styles.Form>
      </styles.Panel>
    </styles.Wrapper>
  );
};

export default Confirmation;
