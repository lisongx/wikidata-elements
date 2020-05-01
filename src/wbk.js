import WBK from 'wikibase-sdk'

// TODO: Expose API to allow user to set custom wikibase endpoint
const wbk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql',
})

export default wbk
