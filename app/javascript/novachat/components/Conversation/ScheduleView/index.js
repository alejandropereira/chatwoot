import React, { useEffect, useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'twin.macro';
import Cookies from 'js-cookie';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import styles from './styles';
import { ScheduleContext } from '../../../context/ScheduleContext';
import request, { gql } from 'graphql-request';
import { useTracked } from '../../../App';
import { useMutation, useQuery } from 'react-query';
import Confirmation from './Confirmation';

const ScheduleView = () => {
  const [state, send] = useContext(ScheduleContext);
  const [{ websiteToken, currentConversation }] = useTracked();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toISOString());
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

  const onChangeCalendar = date => {
    setDate(date);
    send('CONTINUE');
  };

  const getRanges = () => {
    let items = [];
    for (var hour = 8; hour < 19; hour++) {
      items.push([hour, 0]);
      items.push([hour, 30]);
    }
    return items;
  };

  if (state.matches('calendar')) {
    return (
      <styles.Wrapper>
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
          <strong>15 Minute Meeting</strong>
        </styles.Heading>
        <h2>Select Date</h2>
        <Calendar
          minDate={addDays(new Date(), 1)}
          onChange={onChangeCalendar}
          value={date}
        />
      </styles.Wrapper>
    );
  }

  if (state.matches('time')) {
    return (
      <styles.Wrapper>
        <span className="dayName">{format(date, 'eeee')}</span>
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
          <strong>{format(date, 'LLLL dd, yyyy')}</strong>
        </styles.Heading>
        <h3>Select Time</h3>
        <styles.TimeItems>
          {getRanges().map(([hour, minute], i) => (
            <div key={i} style={{ display: 'flex' }}>
              <styles.TimeItem
                onClick={() =>
                  setTime(new Date(date.setHours(hour, minute)).toISOString())
                }
              >{`${format(
                new Date(date.setHours(hour, minute)),
                'k:mm aaa'
              )}`}</styles.TimeItem>
              {time === new Date(date.setHours(hour, minute)).toISOString() && (
                <styles.Confirm onClick={() => send('CONTINUE')}>
                  Confirm
                </styles.Confirm>
              )}
            </div>
          ))}
        </styles.TimeItems>
      </styles.Wrapper>
    );
  }

  if (state.matches('confirmation')) {
    return (
      <Confirmation
        time={time}
        date={date}
        conversationId={currentConversation.uuid}
        contact={contactInfo.data?.contact}
        next={() => send('CONTINUE')}
      />
    );
  }
  return null;
};

export default ScheduleView;
