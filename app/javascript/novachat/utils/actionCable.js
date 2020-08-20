import BaseActionCableConnector from '../../shared/helpers/BaseActionCableConnector';
import { types } from '../reducers';

class ActionCableConnector extends BaseActionCableConnector {
  constructor(app, pubsubToken) {
    super(app, pubsubToken);
    this.events = {
      'message.created': this.onMessageCreated,
      'message.updated': this.onMessageUpdated,
      // 'message.updated': this.onMessageUpdated,
      // 'conversation.typing_on': this.onTypingOn,
      // 'conversation.typing_off': this.onTypingOff,
    };
  }

  onMessageCreated = data => {
    if (!data.content) return;

    this.app.dispatch({
      type: types.APPEND_MESSAGE,
      payload: data,
    });
  };

  onMessageUpdated = data => {
    this.app.dispatch({
      type: types.APPEND_MESSAGE,
      payload: data,
    });
  };

  // onMessageUpdated = data => {
  //   this.app.dispatch('conversation/updateMessage', data);
  // };

  // onTypingOn = () => {
  //   this.clearTimer();
  //   this.app.$store.dispatch('conversation/toggleAgentTyping', {
  //     status: 'on',
  //   });
  //   this.initTimer();
  // };

  // onTypingOff = () => {
  //   this.clearTimer();
  //   this.app.$store.dispatch('conversation/toggleAgentTyping', {
  //     status: 'off',
  //   });
  // };

  // clearTimer = () => {
  //   if (this.CancelTyping) {
  //     clearTimeout(this.CancelTyping);
  //     this.CancelTyping = null;
  //   }
  // };

  // initTimer = () => {
  //   // Turn off typing automatically after 30 seconds
  //   this.CancelTyping = setTimeout(() => {
  //     this.onTypingOff();
  //   }, 30000);
  // };
}

// export const refreshActionCableConnector = pubsubToken => {
//   if (!pubsubToken) {
//     return;
//   }
//   window.chatwootPubsubToken = pubsubToken;
//   window.actionCable.disconnect();
//   window.actionCable = new ActionCableConnector(
//     window.WOOT_WIDGET,
//     window.chatwootPubsubToken
//   );
// };

export default ActionCableConnector;
