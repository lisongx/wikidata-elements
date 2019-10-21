# wikidata-elements

⚠️⚠️⚠️**This is still pretty much work in progress, API/naming will likely be chaning very often**

[![Build Status](https://travis-ci.org/lisongx/wd-elements.svg?branch=master)](https://travis-ci.org/lisongx/wd-elements)

## Installation

Install via npm

```
$ npm install wikidata-elements
```

or just include the umd build using the CDN url

```html
<script src="https://unpkg.com/wikidata-elements@0.0.1/dist/wd-elements.umd.js"></script>
```

## Usage

Import the package if you installed it from npm:

```javascript
import 'wikidata-elements'
```

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

## 1st Example: Make your own wikipedia infobox

Simple markup for access the data you need from **Wikidata**

```html
<section id="douglas">
  <h1>
    <wd-entity id="Q42" label lang="en"/>
  </h1>
  <table>
    <tr>
      <th>Profession</td>
      <td><wd-entity id="Q42" description lang="en"/></td>
    </tr>
    <tr>
      <th>Place of Birth</td>
      <td><wd-entity id="Q42" property="P19" lang="en"/></td>
    </tr>
    <tr>
      <th>Height</td>
      <td><wd-entity id="Q42" property="P2048" lang="en"></wd-entity>m</td>
    </tr>
    <tr>
      <th>Website</td>
      <td><wd-entity id="Q42" property="P856" lang="en"/></td>
    </tr>
  </table>
</section>
```

Style it whatever you want it, using the tool you have

```css
  <style>
    #douglas h1 {
      color: #BF6766;
    }
    #douglas table {
      text-align: center;
      color: #e9e9e9;
      background: #AF5F3C;
    }
    #douglas table th {
      padding: 10px;
      background-color: #F05E1C;
    }

  </style>
```

Then you would have this not so bad infobox in the page, try this in [JSBin](https://jsbin.com/qejiwicuze/edit?html,output) if you wanna play with it.

<img width="331" alt="Your infobox" src="https://user-images.githubusercontent.com/349342/67250338-e35ce880-f462-11e9-9015-cc1e21f1a249.png">

## Tests

To run our tests, you can just:

```
npm run test
```

We're using [pollyjs](https://github.com/Netflix/pollyjs) to record and replay all the http requests to wikidata in the test suits.

If you need to record new requests, remember to run `npm run record-request`.


## Contributing

Bug reports and pull requests are welcome on GitHub.
