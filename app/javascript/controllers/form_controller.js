import ApplicationController from './application_controller.js';

export default class extends ApplicationController {
  static targets = ['button'];
  beforeReflex(form) {
    this.text = this.buttonTarget.value;
    this.buttonTarget.value = 'Loading...';
    this.buttonTarget.disabled = true;
  }

  afterReflex(form) {
    this.buttonTarget.value = this.text;
    this.buttonTarget.disabled = false;
    form.reset();
  }
}
