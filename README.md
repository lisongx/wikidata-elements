# wikidata-elements

Custom elements in the web for reusing [Wikidata](https://www.wikidata.org/wiki/Wikidata:Main_Page)

[![Build Status](https://travis-ci.org/lisongx/wd-elements.svg?branch=master)](https://travis-ci.org/lisongx/wd-elements)


## Usage

###  \<wd-entity\>

* Render entity's label

```<wd-entity id="Q42" label lang='en'>``` =>  ```Douglas Adams```

* Render entity's description

```<wd-entity id="Q42" description lang="en"/>``` => ```British author and humorist```

* Render entity's property

```<wd-entity id="Q42" property="P345" />``` => ```nm0010930```



## Tests

To run our tests, you can just:

```
npm run test
```

We're using [pollyjs](https://github.com/Netflix/pollyjs) to record and replay all the http requests to wikidata in the test suits.

If you need to record new requests, remember to run `npm run record-request`.
