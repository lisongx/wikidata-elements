// Inject setimmediate polyfill in order to use dataloader in browser
import 'setimmediate'

import WBK from 'wikibase-sdk'
import WikibaseEntity from './WikibaseEntity'
import DataLoader from 'dataloader'

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

async function batchGetEntities(keys) {
  const entities = await fetchEntitiesByIds({ids: keys})
  return keys.map(key => entities[key])
}

const entityLoader = new DataLoader(batchGetEntities)

async function fetchEntity({id}) {
  return await entityLoader.load(id)
}

export default fetchEntitiesByIds

export {fetchEntity, wbk}
