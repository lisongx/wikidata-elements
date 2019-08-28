/* @flow strict */

import wdk from 'wikidata-sdk'

class WDItemElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const url = wdk.getEntities('Q42')
    this.textContent = url
  }

  disconnectedCallback() {}
}

export default WDItemElement

if (!window.customElements.get('wd-item')) {
  window.WDItemElement = WDItemElement
  window.customElements.define('wd-item', WDItemElement)
}
