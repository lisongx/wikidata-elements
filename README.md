# wikidata-elements

[![Build Status](https://travis-ci.org/lisongx/wd-elements.svg?branch=master)](https://travis-ci.org/lisongx/wd-elements)

## Installation

Install via npm

```
$ npm install wikidata-elements
```

or just include the umd build using the CDN url

```html
<script src="https://unpkg.com/wikidata-elements@0.0.1/dist/wd-elements.umd.js"></script>>
```


## Usage

###  \<wd-entity\>

* Render entity's label

```html
<wd-entity id="Q42" label lang="en">
```

=>  ```Douglas Adams```

* Render entity's description

```html
<wd-entity id="Q42" description lang="en"/>
```

=> ```British author and humorist```

* Render entity's property

```html
<wd-entity id="Q42" property="P345" />
```
=>  ```nm0010930```



## Tests

To run our tests, you can just:

```
npm run test
```

We're using [pollyjs](https://github.com/Netflix/pollyjs) to record and replay all the http requests to wikidata in the test suits.

If you need to record new requests, remember to run `npm run record-request`.


## Contributing

Bug reports and pull requests are welcome on GitHub.
