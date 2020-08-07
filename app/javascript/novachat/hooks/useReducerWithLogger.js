/* eslint-disable no-console */
import { useRef, useReducer, useMemo, useEffect } from 'react';

function enchanceDispatchWithLogger(dispatch) {
  // eslint-disable-next-line func-names
  return function(action) {
    console.groupCollapsed('Action Type:', action.type);
    return dispatch(action);
  };
}

function useReducerWithLogger(reducer, initialState) {
  let prevState = useRef(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchWithLogger = useMemo(() => {
    return enchanceDispatchWithLogger(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (state !== initialState) {
      console.log('Prev state: ', prevState.current);
      console.log('Next state: ', state);
      console.groupEnd();
    }
    prevState.current = state;
  }, [state]);

  return [state, dispatchWithLogger];
}

export default useReducerWithLogger;
