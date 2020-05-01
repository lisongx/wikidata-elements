import {fetchEntity} from './utils'
import wbk from './wbk'

class WikibaseEntity {
  constructor(entity) {
    // Original entitiy saved for future usage
    this.entity = entity
    this.simplifyEntity = wbk.simplify.entity(entity)
  }

  static getEntity(args) {
    return fetchEntity(args).then((entity) => new WikibaseEntity(entity))
  }

  formatUrl(value) {
    const templates = this.simplifyEntity.claims.P1630
    if (templates.length === 0) {
      throw new Error(
        `The property ${this.simplifyEntity.id} do not have a format url property (P1630)`
      )
    }
    const formatUrlTemplate = templates[0]
    // TODO: double check if that's possbile to more than 1 placeholder in the formatter?
    return formatUrlTemplate.replace('$1', value)
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
      if (!lang) {
        throw new Error(
          'You need to have provide a lang argument to display the property'
        )
      }

      return this.constructor
        .getEntity({id: propertyValue})
        .then((item) => item.getLabel(lang))
    } else {
      return Promise.resolve(propertyValue)
    }
  }

  getPropertyLink(property) {
    const propertyItemList = wbk.simplify.propertyClaims(
      this.entity.claims[property],
      {
        keepTypes: true,
      }
    )

    if (propertyItemList.length >= 0) {
      const propertyItem = propertyItemList[0]
      const {type, value} = propertyItem

      if (type === 'url') {
        return Promise.resolve(value)
      } else if (type === 'external-id') {
        // TODO add options to fetch less data because we only to format the external id
        return this.constructor
          .getEntity({id: property})
          .then((item) => item.formatUrl(value))
      } else {
        throw new Error('This property is not a valid url or external id')
      }
    }

    // return Promise.resolve(propertyValue)
  }

  getSiteLink(sitenames) {
    const sitelinks = this.entity.sitelinks

    for (var sitename of sitenames) {
      const sitelink = sitelinks[sitename]
      if (sitelink) {
        return Promise.resolve({
          ...sitelink,
          link: wbk.getSitelinkUrl(sitelink),
        })
      }
    }

    return Promise.reject()
  }
}

export default WikibaseEntity
