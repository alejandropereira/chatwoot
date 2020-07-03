import React from 'react';
import ReactDOM from 'react-dom';
import App from '../novachat/App';

class NovachatMessenger {
  constructor(props) {
    this.props = props;
  }

  render() {
    ReactDOM.render(
      <App {...this.props} />,
      document.body.appendChild(document.createElement('div'))
    );
  }
}

window.NovachatMessenger = NovachatMessenger;
