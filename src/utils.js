// Inject setimmediate polyfill in order to use dataloader in browser
import 'setimmediate'

import DataLoader from 'dataloader'
import wbk from './wbk'

async function fetchEntitiesByIds({ids}) {
  const url = wbk.getEntities({ids})
  let response = await fetch(url)
  let res = await response.json()
  const {entities} = res
  const entityInstances = Object()
  for (let [entityId, entity] of Object.entries(entities)) {
    entityInstances[entityId] = entity
  }
  return entityInstances
}

async function batchGetEntities(keys) {
  const entities = await fetchEntitiesByIds({ids: keys})
  return keys.map((key) => entities[key])
}

const entityLoader = new DataLoader(batchGetEntities)

async function fetchEntity({id}) {
  return await entityLoader.load(id)
}

function parseArrayHTMLAttribute(value) {
  const listOfValues = value.split(',')
  return listOfValues.map((v) => v.trim())
}

export default fetchEntitiesByIds

export {fetchEntity, parseArrayHTMLAttribute}
