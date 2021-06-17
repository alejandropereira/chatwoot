import { Controller } from 'stimulus';
import StimulusReflex from 'stimulus_reflex';

export default class extends Controller {
  connect() {
    StimulusReflex.register(this);
    document.addEventListener('sidebar:updated', this.handleRefresh.bind(this));
  }

  disconnect() {
    document.removeEventListener(
      'sidebar:updated',
      this.handleRefresh.bind(this)
    );
  }

  handleRefresh() {
    console.log('refresh');
    this.stimulate('Sidebar#update');
  }
}
