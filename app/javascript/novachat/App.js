import './utils/wdyr';
import 'regenerator-runtime/runtime';
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-tracked';
import Cookies from 'js-cookie';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import reducer, { initialState } from './reducers';
import useReducerWithLogger from './hooks/useReducerWithLogger';
import Chat from './components/Chat';
import GlobalStyle from './GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = widgetToken =>
  new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: '/graphql',
      headers: {
        'X-Widget-Token': widgetToken,
        'X-Auth-Token': Cookies.get('cw_conversation'),
      },
    }),
  });

const useValue = () =>
  process.env.NODE_ENV === 'development'
    ? useReducerWithLogger(reducer, initialState)
    : useReducer(reducer, initialState);
const { Provider, useTracked } = createContainer(useValue);

const queryClient = new QueryClient();

const App = ({ websiteToken }) => (
  <QueryClientProvider client={queryClient}>
    <ApolloProvider client={client(websiteToken)}>
      <GlobalStyle />
      <Provider>
        <Chat websiteToken={websiteToken} />
      </Provider>
    </ApolloProvider>
  </QueryClientProvider>
);

App.propTypes = {
  websiteToken: PropTypes.string,
};

export { useTracked };

export default App;
