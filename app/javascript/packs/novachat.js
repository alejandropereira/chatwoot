import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import variables from '../novachat/utils/variables';
import Chat from '../novachat/components/Chat';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Avenir Next';
    font-style: normal;
    font-weight: 400;
    src: url('../novachat/fonts/AvenirNext.ttc.eot'); /* IE9 Compat Modes */
    src: local('Avenir Next'), local('OpenSans'),
         url('../novachat/fonts/AvenirNext.ttc.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('../novachat/fonts/AvenirNext.ttc.woff2') format('woff2'), /* Super Modern Browsers */
         url('../novachat/fonts/AvenirNext.ttc.woff') format('woff'), /* Modern Browsers */
         url('../novachat/fonts/AvenirNext.ttc.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../novachat/fonts/AvenirNext.ttc.svg#OpenSans') format('svg'); /* Legacy iOS */
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

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <Chat />
  </React.Fragment>
);
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  );
});
