import {fetchEntityById, wbk} from './utils'

class WikibaseEntity {
  constructor(entity) {
    //   Original entitiy saved for future usage
    this.entity = entity
    this.simplifyEntity = wbk.simplify.entity(entity)
  }

  getLabel(lang) {
    return Promise.resolve(this.simplifyEntity.labels[lang])
  }

  getProperty(property, lang) {
    const propertyValue = this.simplifyEntity.claims[property]

    if (wbk.isItemId(propertyValue)) {
      return fetchEntityById(propertyValue).then(item => item.getLabel(lang))
    } else {
      return Promise.resolve(propertyValue)
    }
  }
}

export default WikibaseEntity
