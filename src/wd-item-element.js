/* @flow strict */

class WDItemElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.textContent = 'test'
  }

  disconnectedCallback() {}
}

export default WDItemElement

if (!window.customElements.get('wd-item')) {
  window.WDItemElement = WDItemElement
  window.customElements.define('wd-item', WDItemElement)
}
