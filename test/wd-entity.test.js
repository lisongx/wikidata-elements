import {expect} from '@open-wc/testing'

describe('wd-entity', function () {
  const assertTextContent = (done, html, textContent) => {
    document.body.innerHTML = html
    const item = document.querySelector('wd-entity')
    expect(item.textContent).to.equal('')

    setTimeout(() => {
      expect(item.textContent).to.equal(textContent)
      done()
    }, 1500)
  }

  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('wd-entity')
      expect('WD-ENTITY').to.equal(el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.WDEntityElement()
      expect('WD-ENTITY').to.equal(el.nodeName)
    })
  })

  describe('wd-entity label display', function () {
    it('use en lang', function (done) {
      assertTextContent(
        done,
        '<wd-entity entity-id="Q42" lang="en"/>',
        'Douglas Adams'
      )
    })

    it('use zh-hans', function (done) {
      assertTextContent(
        done,
        '<wd-entity entity-id="Q42" lang="zh-hans"/>',
        '道格拉斯·亚当斯'
      )
    })

    it('can display label for property', function (done) {
      assertTextContent(
        done,
        '<wd-entity entity-id="P735" lang="en"/>',
        'given name'
      )
    })
  })

  describe('wd-entity render description ', function () {
    it('can render when have a description attribute and en', function (done) {
      assertTextContent(
        done,
        '<wd-entity entity-id="Q42" description lang="en"/>',
        'British author and humorist'
      )
    })

    it('can render when have a description attribute and zh lang', function (done) {
      assertTextContent(
        done,
        '<wd-entity entity-id="Q42" description lang="zh-hant"/>',
        '英國作家'
      )
    })
  })

  describe('wd-entity property display', function () {
    it('should render external id property', function (done) {
      assertTextContent(
        done,
        '<wd-entity entity-id="Q42" property="P345" />',
        'nm0010930'
      )
    })

    it('should render the label of the reference for the property', function (done) {
      assertTextContent(
        done,
        '<wd-entity entity-id="Q42" property="P25" lang="en" />',
        'Janet Adams'
      )
    })
  })
})
