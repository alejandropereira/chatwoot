import { Controller } from 'stimulus';
import CableReady from 'cable_ready';
import consumer from '../channels/consumer';

export default class extends Controller {
  static values = { id: String };

  static targets = ['messages', 'input'];

  connect() {
    consumer.subscriptions.create(
      {
        channel: 'ConversationChannel',
        conversation_id: this.idValue,
      },
      {
        received(data) {
          if (data.cableReady) CableReady.perform(data.operations);
        },
      }
    );
    this.initialScroll(100);
  }

  initialScroll(delay = 10) {
    const messages = this.messagesTarget;
    this.inputTarget.value = '';
    this.inputTarget.focus();
    setTimeout(() => {
      messages.scrollTop = messages.scrollHeight;
    }, delay);
  }

  scroll(event, delay = 10) {
    if (event.detail.isAgent) {
      this.inputTarget.value = '';
      this.inputTarget.focus();
    }
    const messages = this.messagesTarget;
    setTimeout(() => {
      messages.scrollTop = messages.scrollHeight;
    }, delay);
  }
}
