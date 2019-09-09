import WBK from 'wikibase-sdk'
import WikibaseItem from './WikibaseItem'

const wbk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql'
})

async function fetchEntitiesByItemIds(itemIds) {
  const url = wbk.getEntities(itemIds)
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

export {fetchEntityByItemId, wbk}
