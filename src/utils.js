import wdk from 'wikidata-sdk'

const fetchEntitiesByItemIds = itemIds => {
  const url = wdk.getEntities(itemIds)
  return fetch(url)
    .then(response => response.json())
    .then(res => {
      const { entities } = res
      const simplifiedEntities = wdk.simplify.entities(entities)
      console.log(entities, simplifiedEntities)
      return simplifiedEntities
    })
}

const fetchEntityByItemId = itemId => {
  return fetchEntitiesByItemIds([itemId]).then(entities => entities[itemId])
}

export default fetchEntitiesByItemIds

export { fetchEntityByItemId }
