import {parseArrayHTMLAttribute} from './utils'
import WikibaseEntity from './WikibaseEntity'

class WDLinkElement extends HTMLAnchorElement {
  constructor() {
    super()
    console.log('init')
  }

  static get observedAttributes() {
    return ['item-id']
  }

  connectedCallback() {
    const entityId = this.getAttribute('item-id')
    this.renderElement(entityId)
  }

  attributeChangedCallback(name, _, newValue) {
    console.log('Custom square element attributes changed.');
    if (name == 'item-id') {
      this.renderElement(newValue)
    }
  }

  renderElement(entityId) {
    const property = this.getAttribute('property')
    const site = this.getAttribute('site')

    if (!(property || site)) {
      throw new Error("You need either 'property' or 'site' in the attributes")
    }

    WikibaseEntity.getEntity({id: entityId}).then(entity => {
      let q = null

      if (property) {
        q = entity.getProperty(property)
      } else {
        entity.getSiteLink(parseArrayHTMLAttribute(site)).then(({link, title}) => {
          console.log('link', link)
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
