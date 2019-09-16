import {fetchEntityById} from './utils'

class WDEntityElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const entityId = this.getAttribute('id')
    this.renderItem(entityId)
  }

  renderItem(entityId) {
    const property = this.getAttribute('property')
    const displayLabel = this.hasAttribute('label')
    const lang = this.getAttribute('lang')

    fetchEntityById(entityId).then(entity => {
      let q = null

      if (displayLabel) {
        q = entity.getLabel(lang)
      } else if (property) {
        q = entity.getProperty(property, lang)
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

export default WDEntityElement

if (!window.customElements.get('wd-entity')) {
  window.WDEntityElement = WDEntityElement
  window.customElements.define('wd-entity', WDEntityElement)
}
