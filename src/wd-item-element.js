import {fetchEntityByItemId, entityToLabel, entityToProperty} from './utils'

class WDItemElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const itemId = this.getAttribute('item-id')
    this.renderItem(itemId)
  }

  renderItem(itemId) {
    const property = this.getAttribute('property')
    const displayLabel = this.hasAttribute('label')
    const lang = this.getAttribute('lang')

    fetchEntityByItemId(itemId).then(entity => {
      let q = null

      if (displayLabel) {
        q = entityToLabel(entity, lang)
      } else if (property) {
        q = entityToProperty(entity, property, lang)
      } else {
        this.textContent = ''
        return
      }
      q.then(value => {
        this.textContent = value
      })
    })
  }

  disconnectedCallback() {}
}

export default WDItemElement

if (!window.customElements.get('wd-item')) {
  window.WDItemElement = WDItemElement
  window.customElements.define('wd-item', WDItemElement)
}
