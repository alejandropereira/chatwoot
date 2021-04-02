import { Controller } from '@stimulus/core';
import { useTransition } from 'stimulus-use';

export default class extends Controller {
  connect() {
    useTransition(this);
    this.enter();

    setTimeout(() => {
      this.leave();
    }, 3000);
  }
}
