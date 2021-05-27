import { Controller } from 'stimulus';
import tippy from 'tippy.js';

export default class extends Controller {
  static targets = ['trigger', 'content'];

  connect() {
    this.contentTarget.classList.add('hidden');

    this.tippy = tippy(this.triggerTarget, {
      theme: 'light-border',
      allowHTML: true,
      trigger: 'click',
      placement: 'auto',
      interactive: true,
      content: this.contentTarget.innerHTML,
    });
    document.addEventListener(
      'stimulus-reflex:after',
      this.handleAfterReflex.bind(this)
    );
  }

  handleAfterReflex(event) {
    this.hide();
  }

  hide() {
    this.tippy.hide();
  }

  disconnect() {
    this.tippy.destroy();
    document.removeEventListener(
      'stimulus-reflex:after',
      this.handleAfterReflex.bind(this)
    );
  }
}
