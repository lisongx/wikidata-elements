const pollyjs = window['@pollyjs/core']
const FetchAdapter = window['@pollyjs/adapter-fetch']
const RESTPersister = window['@pollyjs/persister-rest']
const Polly = pollyjs.Polly

describe('wd-item', function() {
  pollyjs.setupMocha({
    adapters: [FetchAdapter],
    recordIfMissing: true,
    expiryStrategy: 'record',
    persister: RESTPersister
  })

  describe('element creation', function() {
    it('creates from document.createElement', function() {
      const el = document.createElement('wd-item')
      assert.equal('WD-ITEM', el.nodeName)
    })

    it('creates from constructor', function() {
      const el = new window.WDItemElement()
      assert.equal('WD-ITEM', el.nodeName)
    })
  })

  describe('wd-item label display', function() {
    it('use en lang', function(done) {
      document.body.innerHTML = '<wd-item item-id="Q42" label lang="en"/>'
      const item = document.querySelector('wd-item')
      assert.equal(item.textContent, '')
      setTimeout(() => {
        assert.equal(item.textContent, 'Douglas Adams')
        done()
      }, 1500)
    })

    it('use zh-hans', function(done) {
      document.body.innerHTML = '<wd-item item-id="Q42" label lang="zh-hans"/>'
      const item = document.querySelector('wd-item')
      assert.equal(item.textContent, '')
      setTimeout(() => {
        assert.equal(item.textContent, '道格拉斯·亚当斯')
        done()
      }, 1500)
    })
  })

  describe('wd-item property display', function() {
    it('should render external id property', function(done) {
      document.body.innerHTML = '<wd-item item-id="Q42" property="P345" />'
      const item = document.querySelector('wd-item')
      assert.equal(item.textContent, '')
      setTimeout(() => {
        assert.equal(item.textContent, 'nm0010930')
        done()
      }, 1500)
    })

    it('should render the label of the reference for the property', function(done) {
      document.body.innerHTML = '<wd-item item-id="Q42" property="P25" lang="en" />'
      const item = document.querySelector('wd-item')
      assert.equal(item.textContent, '')
      setTimeout(() => {
        assert.equal(item.textContent, 'Janet Adams')
        done()
      }, 1500)
    })
  })
})
