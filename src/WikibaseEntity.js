import {fetchEntity, wbk} from './utils'

class WikibaseEntity {
  constructor(entity) {
    //   Original entitiy saved for future usage
    this.entity = entity
    this.simplifyEntity = wbk.simplify.entity(entity)
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
      return fetchEntity({id: propertyValue}).then(item => item.getLabel(lang))
    } else {
      return Promise.resolve(propertyValue)
    }
  }

  getSiteLink(sitenames) {
    const sitelinks = this.entity.sitelinks;

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
