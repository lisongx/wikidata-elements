import {parseArrayHTMLAttribute} from './utils'
import WikibaseEntity from './WikibaseEntity'

class WDLinkElement extends HTMLAnchorElement {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['entity-id', 'site', 'property']
  }

  connectedCallback() {
    const entityId = this.getAttribute('entity-id')
    this.renderElement(entityId)
  }

  attributeChangedCallback(_, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.renderElement(this.getAttribute('entity-id'))
    }
  }

  renderElement(entityId) {
    const property = this.getAttribute('property')
    const site = this.getAttribute('site')

    if (!(property || site)) {
      throw new Error("You need either 'property' or 'site' in the attributes")
    }

    WikibaseEntity.getEntity({id: entityId}).then(entity => {
      if (property) {
        entity.getProperty(property).then(value => {
          this.setAttribute('href', value)
        })
      } else {
        entity.getSiteLink(parseArrayHTMLAttribute(site)).then(({link, title}) => {
          this.setAttribute('href', link)
          if (!this.innerText) {
            this.innerHTML = title
          }
        })
      }
    })
  }
}

export default WDLinkElement

if (!window.customElements.get('wd-link')) {
  window.WDLinkElement = WDLinkElement
  window.customElements.define('wd-link', WDLinkElement, {extends: 'a'})
}
