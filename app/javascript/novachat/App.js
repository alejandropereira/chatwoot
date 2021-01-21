import './utils/wdyr';
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-tracked';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import reducer, { initialState } from './reducers';
import useReducerWithLogger from './hooks/useReducerWithLogger';
import Chat from './components/Chat';
import GlobalStyle from './GlobalStyle';

const client = new ApolloClient({
  ssrMode: typeof window !== 'undefined',
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: '/graphql' }),
});

const useValue = () =>
  process.env.NODE_ENV === 'development'
    ? useReducerWithLogger(reducer, initialState)
    : useReducer(reducer, initialState);
const { Provider, useTracked } = createContainer(useValue);

const App = ({ websiteToken }) => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Provider>
      <Chat websiteToken={websiteToken} />
    </Provider>
  </ApolloProvider>
);

App.propTypes = {
  websiteToken: PropTypes.string,
};

export { useTracked };

export default App;
