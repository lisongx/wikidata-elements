const pollyjs = window['@pollyjs/core']
const FetchAdapter = window['@pollyjs/adapter-fetch']
const RESTPersister = window['@pollyjs/persister-rest']
const Polly = pollyjs.Polly

pollyjs.setupMocha({
  adapters: [FetchAdapter],
  recordIfMissing: true,
  expiryStrategy: 'error',
  persister: RESTPersister,
  matchRequestsBy: {
    headers: false,
    body: true,
  },
})
