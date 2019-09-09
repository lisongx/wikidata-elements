[![Build Status](https://travis-ci.org/lisongx/wd-elements.svg?branch=master)](https://travis-ci.org/lisongx/wd-elements)


## Tests

To run our tests, you can just:

```
npm run test
```

We're using [pollyjs](https://github.com/Netflix/pollyjs) to record and replay all the http requests to wikidata in the test suits.

If you need to record new requests, remember to run `npm run record-request`.
