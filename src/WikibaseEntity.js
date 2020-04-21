import {fetchEntity} from './utils'
import wbk from './wbk'

class WikibaseEntity {
  constructor(entity) {
    // Original entitiy saved for future usage
    this.entity = entity
    this.simplifyEntity = wbk.simplify.entity(entity)
  }

  static getEntity(args) {
    return fetchEntity(args).then(entity => new WikibaseEntity(entity))
  }

  getLabel(lang) {
    return Promise.resolve(this.simplifyEntity.labels[lang])
  }

  getDescription(lang) {
    return Promise.resolve(this.simplifyEntity.descriptions[lang])
  }

  getProperty(property, lang) {
    const propertyValue = this.simplifyEntity.claims[property]

    if (wbk.isItemId(propertyValue)) {
      return this.constructor.getEntity({id: propertyValue}).then(item => item.getLabel(lang))
    } else {
      return Promise.resolve(propertyValue)
    }
  }

  getSiteLink(sitenames) {
    const sitelinks = this.entity.sitelinks

    for (var sitename of sitenames) {
      const sitelink = sitelinks[sitename]
      if (sitelink) {
        return Promise.resolve({
          ...sitelink,
          link: wbk.getSitelinkUrl(sitelink)
        })
      }
    }

    return Promise.reject()
  }
}

export default WikibaseEntity
