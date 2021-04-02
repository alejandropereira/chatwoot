import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['item', 'toggler'];

  toggle() {
    this.itemTarget.classList.toggle('hidden');
    this.togglerTarget.classList.toggle('right-72');
  }
}
