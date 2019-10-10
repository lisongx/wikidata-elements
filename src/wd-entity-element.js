import {fetchEntity} from './utils'

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
    const description = this.hasAttribute('description')
    const lang = this.getAttribute('lang')

    fetchEntity({id: entityId}).then(entity => {
      let q = null

      if (description) {
        q = entity.getDescription(lang)
      } else if (property) {
        q = entity.getProperty(property, lang)
      } else {
        q = entity.getLabel(lang)
      }
      return q.then(value => {
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
