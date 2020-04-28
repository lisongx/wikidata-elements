
import FetchAdapter from '@pollyjs/adapter-fetch'
import RESTPersister from '@pollyjs/persister-rest'
import { setupMocha as setupPolly } from '@pollyjs/core';

import '../src/index.js'

setupPolly({
  adapters: [FetchAdapter],
  recordIfMissing: true,
  expiryStrategy: 'record',
  persister: RESTPersister,
  matchRequestsBy: {
    headers: false,
    body: true
  }
})

