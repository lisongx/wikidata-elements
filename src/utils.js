import WBK from 'wikibase-sdk'
import WikibaseEntity from './WikibaseEntity'

// TODO: Expose API to allow user to set custom endpoint
const wbk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql'
})

async function fetchEntitiesByIds(itemIds) {
  const url = wbk.getEntities(itemIds)
  let response = await fetch(url)
  let res = await response.json()
  const {entities} = res
  const entityInstances = Object()
  for (let [itemId, entity] of Object.entries(entities)) {
    entityInstances[itemId] = new WikibaseEntity(entity)
  }
  return entityInstances
}

async function fetchEntityById(itemId) {
  let entities = await fetchEntitiesByIds([itemId])
  return entities[itemId]
}

export default fetchEntitiesByIds

export {fetchEntityById, wbk}
