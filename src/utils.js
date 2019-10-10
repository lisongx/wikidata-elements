import WBK from 'wikibase-sdk'
import WikibaseEntity from './WikibaseEntity'

// TODO: Expose API to allow user to set custom endpoint
const wbk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql'
})

async function fetchEntitiesByIds({ids}) {
  const url = wbk.getEntities({ids})
  let response = await fetch(url)
  let res = await response.json()
  const {entities} = res
  const entityInstances = Object()
  for (let [entityId, entity] of Object.entries(entities)) {
    entityInstances[entityId] = new WikibaseEntity(entity)
  }
  return entityInstances
}

async function fetchEntity({id}) {
  let entities = await fetchEntitiesByIds({
    ids: [id]
  })
  return entities[id]
}

export default fetchEntitiesByIds

export {fetchEntity, wbk}
