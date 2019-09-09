import wbk from 'wikidata-sdk'
import {fetchEntityByItemId} from './utils'

class WikibaseItem {
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
      return fetchEntityByItemId(propertyValue).then(item => item.getLabel(lang))
    } else {
      return Promise.resolve(propertyValue)
    }
  }
}

export default WikibaseItem
