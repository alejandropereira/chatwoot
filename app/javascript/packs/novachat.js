import React from 'react';
import ReactDOM from 'react-dom';
import App from '../novachat/App';

class NovachatMessenger {
  constructor(props) {
    this.props = props;
  }

  render() {
    const div = document.createElement('div');
    div.setAttribute('id', 'novachat__root');
    ReactDOM.render(<App {...this.props} />, document.body.appendChild(div));
  }
}

window.NovachatMessenger = NovachatMessenger;
