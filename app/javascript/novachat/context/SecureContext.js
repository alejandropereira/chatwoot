import React from 'react';
import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';

export const SecureContext = React.createContext();

export const secureMachine = Machine({
  id: 'secure',
  initial: 'closed',
  context: {
    secure: false,
  },
  states: {
    closed: {
      on: {
        OPEN: 'start',
      },
    },
    start: {
      on: {
        CONTINUE: 'method',
        CLOSE: 'closed',
      },
    },
    method: {
      on: {
        SMS: 'sms',
        EMAIL: 'email',
        CLOSE: 'closed',
      },
    },
    sms: {
      on: {
        PIN: 'pin',
        EMAIL: 'email',
        CLOSE: 'closed',
      },
    },
    email: {
      on: {
        PIN: 'pin',
        SMS: 'sms',
        CLOSE: 'closed',
      },
    },
    pin: {
      on: {
        SECURE: 'secure',
        RETRYPIN: 'retrypin',
        CLOSE: 'closed',
      },
    },
    retrypin: {
      after: {
        // after 1 second, transition to yellow
        1000: 'pin',
      },
    },
    secure: {
      entry: assign({
        secure: (context, event) => (context.secure = true),
      }),
      on: {
        CLOSE: {
          target: 'close',
          actions: assign({
            secure: (context, event) => (context.secure = false),
          }),
        },
      },
    },
    close: {
      after: {
        // after 1 second, transition to yellow
        1000: 'closed',
      },
    },
  },
});

export const SecureProvider = ({ children }) => {
  const value = useMachine(secureMachine);
  return (
    <SecureContext.Provider value={value}>{children}</SecureContext.Provider>
  );
};
