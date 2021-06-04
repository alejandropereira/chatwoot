import React from 'react';
import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';

export const ScheduleContext = React.createContext();

export const scheduleMachine = Machine({
  id: 'schedule',
  initial: 'closed',
  context: {},
  states: {
    closed: {
      on: {
        OPEN: 'calendar',
        CLOSE: 'closed',
      },
    },
    calendar: {
      on: {
        CONTINUE: 'time',
        CLOSE: 'closed',
      },
    },
    time: {
      on: {
        CONTINUE: 'confirmation',
        CLOSE: 'closed',
      },
    },
    confirmation: {
      on: {
        CONTINUE: 'confirm',
        CLOSE: 'closed',
      },
    },
    confirm: {
      after: {
        1000: 'closed',
      },
    },
  },
});

export const ScheduleProvider = ({ children }) => {
  const value = useMachine(scheduleMachine);
  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};
