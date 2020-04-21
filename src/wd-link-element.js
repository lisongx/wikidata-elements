import {fetchEntity, parseArrayHTMLAttribute} from './utils'

class WDLinkElement extends HTMLAnchorElement {
  constructor() {
    super()
    console.log('this inner html', this.innerHTML)
    this.provideChildren = this.innerHTML;
  }

  connectedCallback() {
    const entityId = this.getAttribute('item-id')
    this.renderElement(entityId)
  }

  renderElement(entityId) {
    const property = this.getAttribute('property')
    const site = this.getAttribute('site')

    if (!(property || site)) {
      throw new Error("You need either 'property' or 'site' in the attributes")
    }

    fetchEntity({id: entityId}).then(entity => {
      let q = null

      if (property) {
        q = entity.getProperty(property)
      } else {
        console.log('entity', entity)
        entity.getSiteLink(parseArrayHTMLAttribute(site)).then(({link, title}) => {
          this.setAttribute('href', link);
          if (!this.providedText) {
            this.textContent = title;
          }
        })
      }
    })
  }
}

export default WDLinkElement

if (!window.customElements.get('wd-link')) {
  window.WDLinkElement = WDLinkElement
  window.customElements.define('wd-link', WDLinkElement, { extends: 'a' })
}
