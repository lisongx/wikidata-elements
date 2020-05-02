# wikidata-elements

⚠️⚠️⚠️**This is still pretty much work in progress, API/naming will likely be changing very quickly**

[![Build Status](https://travis-ci.org/lisongx/wikidata-elements.svg?branch=master)](https://travis-ci.org/lisongx/wikidata-elements)

## Installation

Install via npm

```
$ npm install wikidata-elements
```

or just include the umd build using the CDN url

```html
<script src="https://unpkg.com/wikidata-elements@0.1.0/dist/wd-elements.umd.js"></script>
```

## Usage

Import the package if you installed it from npm:

```javascript
import 'wikidata-elements'
```

###  \<wd-entity\>

* Render entity's label

```html
<wd-entity entity-id="Q42" label lang="en">
```

=>  ```Douglas Adams```

* Render entity's description

```html
<wd-entity entity-id="Q42" description lang="en"/>
```

=> ```British author and humorist```

* Render entity's property

```html
<wd-entity entity-id="Q42" property="P345" />
```
=>  ```nm0010930```

###  \<a is="wd-link"\>

`wd-entity` only render text content, what if you want render things a link of `P856` or one's twitter url? Don't worry, we got you covered 😀.

So We extend the built-in `a` tag to support this custom beahviour. All the [attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes) for `a` would still work, you can continue use `target="_blank"` to control in the link to be open in a new tab.


* Render property url (like `P856`), by passing a P value to `property` attribute

```html
<a is="wd-link" entity-id="Q80" property="P856">
  Tim Berners-Lee's website
</a>
```

:arrow_down:

```html
<a
  is="wd-link" entity-id="Q80" property="P856"
  href="http://www.w3.org/People/Berners-Lee/"
>
  Tim Berners-Lee's website
</a>
```

* Render external id as link(like twitter username `P2002` ), using the same `propery` attribute.

```html
<a is="wd-link" entity-id="Q80" property="P2002">
  Tim on twitter
</a>
```

:arrow_down:

```html
<a
  is="wd-link" entity-id="Q80" property="P2002"
  href="https://twitter.com/timberners_lee"
>
  Tim on twitter
</a>
```

* Render wikimedia site link, by passing the sitename to the `site` attribute

```html
<a is="wd-link" entity-id="Q80" site="jawiki">
  ティム
</a>
```
:arrow_down:

```html
<a
  is="wd-link" entity-id="Q80" site="jawiki"
  href="https://ja.wikipedia.org/wiki/%E3%83%86%E3%82%A3%E3%83%A0%E3%83%BB%E3%83%90%E3%83%BC%E3%83%8A%E3%83%BC%E3%82%BA%EF%BC%9D%E3%83%AA%E3%83%BC"
>
  ティム
</a>
```

You can also pass a comma separated list of sitename, this we will render the first one it's available in the same order.

```html
<a is="wd-link" entity-id="Q80" site="zhwikiquote, enwikiquote">
  Tim's quote
</a>
```
:arrow_down:

```html
<a
  is="wd-link" entity-id="Q80" site="jawiki"
  href="https://en.wikiquote.org/wiki/Tim_Berners-Lee"
>
  Tim's quote
</a>
```

## 1st Example: Make your own wikipedia infobox

Simple markup for access the data you need from **Wikidata**

```html
<section id="douglas">
  <h1>
    <wd-entity entity-id="Q42" label lang="en"/>
  </h1>
  <table>
    <tr>
      <th>Profession</td>
      <td><wd-entity entity-id="Q42" description lang="en"/></td>
    </tr>
    <tr>
      <th>Place of Birth</td>
      <td><wd-entity entity-id="Q42" property="P19" lang="en"/></td>
    </tr>
    <tr>
      <th>Height</td>
      <td><wd-entity entity-id="Q42" property="P2048" lang="en"></wd-entity>m</td>
    </tr>
    <tr>
      <th>Website</td>
      <td><wd-entity entity-id="Q42" property="P856" lang="en"/></td>
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

We're using [pollyjs](https://github.com/Netflix/pollyjs) to record and replay all the http requests to wikidata in the test suits, this make the test cases more reliable.

To run our tests locally, first start the pollyjs process to record network request

```npm run listen-request```

and then just run the normal

```
npm run test
```

## See also

* [qLabel](https://googleknowledge.github.io/qlabel/) is a jQuery plugin to translate labels in a Website based on translations from Wikidata

## Contributing

Bug reports and pull requests are welcome on GitHub.
