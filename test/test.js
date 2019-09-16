const pollyjs = window['@pollyjs/core']
const FetchAdapter = window['@pollyjs/adapter-fetch']
const RESTPersister = window['@pollyjs/persister-rest']
const Polly = pollyjs.Polly

describe('wd-entity', function() {
  pollyjs.setupMocha({
    adapters: [FetchAdapter],
    recordIfMissing: true,
    expiryStrategy: 'record',
    persister: RESTPersister,
    matchRequestsBy: {
      headers: false
    }
  })

  describe('element creation', function() {
    it('creates from document.createElement', function() {
      const el = document.createElement('wd-entity')
      assert.equal('WD-ENTITY', el.nodeName)
    })

    it('creates from constructor', function() {
      const el = new window.WDEntityElement()
      assert.equal('WD-ENTITY', el.nodeName)
    })
  })

  describe('wd-item label display', function() {
    it('use en lang', function(done) {
      document.body.innerHTML = '<wd-entity id="Q42" label lang="en"/>'
      const item = document.querySelector('wd-entity')
      assert.equal(item.textContent, '')
      setTimeout(() => {
        assert.equal(item.textContent, 'Douglas Adams')
        done()
      }, 1500)
    })

    it('use zh-hans', function(done) {
      document.body.innerHTML = '<wd-entity id="Q42" label lang="zh-hans"/>'
      const item = document.querySelector('wd-entity')
      assert.equal(item.textContent, '')
      setTimeout(() => {
        assert.equal(item.textContent, '道格拉斯·亚当斯')
        done()
      }, 1500)
    })
  })

  describe('wd-entity property display', function() {
    it('should render external id property', function(done) {
      document.body.innerHTML = '<wd-entity id="Q42" property="P345" />'
      const item = document.querySelector('wd-entity')
      assert.equal(item.textContent, '')
      setTimeout(() => {
        assert.equal(item.textContent, 'nm0010930')
        done()
      }, 1500)
    })

    it('should render the label of the reference for the property', function(done) {
      document.body.innerHTML = '<wd-entity id="Q42" property="P25" lang="en" />'
      const item = document.querySelector('wd-entity')
      assert.equal(item.textContent, '')
      setTimeout(() => {
        assert.equal(item.textContent, 'Janet Adams')
        done()
      }, 1500)
    })
  })
})
