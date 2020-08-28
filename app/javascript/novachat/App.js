import './utils/wdyr';
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-tracked';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { createGlobalStyle } from 'styled-components';
import reducer, { initialState } from './reducers';
import useReducerWithLogger from './hooks/useReducerWithLogger';
import reset from 'styled-reset';
import variables from './utils/variables';
import Chat from './components/Chat';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Avenir Next';
    font-style: normal;
    font-weight: 400;
    src: url('./fonts/AvenirNext.ttc.eot'); /* IE9 Compat Modes */
    src: local('Avenir Next'), local('OpenSans'),
         url('./fonts/AvenirNext.ttc.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/AvenirNext.ttc.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/AvenirNext.ttc.woff') format('woff'), /* Modern Browsers */
         url('./fonts/AvenirNext.ttc.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/AvenirNext.ttc.svg#OpenSans') format('svg'); /* Legacy iOS */
  }

  body{
    font-family: ${variables.MainFontFamily};
    color: ${variables.MainFontColor};
    font-size: ${variables.MainFontSize};
    line-height: 20px;
    background: ${
      process.env.NODE_ENV === 'production' ? 'transparent' : '#F1F0F2'
    };
  }
`;

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
