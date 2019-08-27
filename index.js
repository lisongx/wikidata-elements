/* @flow strict */

class WDElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.textContent = ':wave:'
  }

  disconnectedCallback() {}
}

export default WDElement

if (!window.customElements.get('wd-element')) {
  window.WDElement = WDElement
  window.customElements.define('wd-element', WDElement)
}
