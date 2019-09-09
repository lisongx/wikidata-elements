import wdk from 'wikidata-sdk'
import WikibaseItem from './WikibaseItem'

async function fetchEntitiesByItemIds(itemIds) {
  const url = wdk.getEntities(itemIds)
  let response = await fetch(url)
  let res = await response.json()
  const {entities} = res
  const entityInstances = Object()
  for (let [itemId, entity] of Object.entries(entities)) {
    entityInstances[itemId] = new WikibaseItem(entity)
  }
  return entityInstances
}

async function fetchEntityByItemId(itemId) {
  let entities = await fetchEntitiesByItemIds([itemId])
  return entities[itemId]
}

export default fetchEntitiesByItemIds

export {fetchEntityByItemId}
