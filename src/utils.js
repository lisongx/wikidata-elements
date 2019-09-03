import wdk from 'wikidata-sdk'

async function entityToProperty(entity, property, lang) {
  const propertyValue = entity.claims[property]
  if (wdk.isItemId(propertyValue)) {
    let item = await fetchEntityByItemId(propertyValue)
    let value = await entityToLabel(item, lang)
    return value
  } else {
    return propertyValue
  }
}

async function entityToLabel(entity, lang) {
  return entity.labels[lang]
}

async function fetchEntitiesByItemIds(itemIds) {
  const url = wdk.getEntities(itemIds)
  let response = await fetch(url)
  let res = await response.json()
  const {entities} = res
  const simplifiedEntities = wdk.simplify.entities(entities)
  return simplifiedEntities
}

async function fetchEntityByItemId(itemId) {
  let entities = await fetchEntitiesByItemIds([itemId])
  return entities[itemId]
}

export default fetchEntitiesByItemIds

export {fetchEntityByItemId, entityToProperty, entityToLabel}
