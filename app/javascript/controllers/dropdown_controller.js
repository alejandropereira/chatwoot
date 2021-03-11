import { Controller } from 'stimulus';
import tippy from "tippy.js";

export default class extends Controller {
  static targets = ["template"];

  connect() {
    this.templateTarget.classList.remove("hidden");

    this.tippy = tippy(this.element, {
      theme: "light-border",
      allowHTML: true,
      trigger: "click",
      placement: "auto",
      interactive: true,
      content: this.templateTarget
    });
  }

  disconnect() {
    this.tippy.destroy();
  }
}