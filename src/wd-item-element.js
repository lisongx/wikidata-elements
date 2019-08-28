import { fetchEntityByItemId } from './utils'

class WDItemElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const itemId = this.getAttribute('item-id')
    const lang = this.getAttribute('label-lang')

    fetchEntityByItemId(itemId).then(value => {
      const label = value.labels[lang]
      if (label) {
        this.textContent = label
      }
    })
  }

  disconnectedCallback() { }
}

export default WDItemElement

if (!window.customElements.get('wd-item')) {
  window.WDItemElement = WDItemElement
  window.customElements.define('wd-item', WDItemElement)
}
