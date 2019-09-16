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

  const assertTextContent = (done, html, textContent) => {
    document.body.innerHTML = html
    const item = document.querySelector('wd-entity')
    assert.equal(item.textContent, '')
    setTimeout(() => {
      assert.equal(item.textContent, textContent)
      done()
    }, 1000)
  }

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

  describe('wd-entity label display', function() {
    it('use en lang', function(done) {
      assertTextContent(done, '<wd-entity id="Q42" label lang="en"/>', 'Douglas Adams')
    })

    it('use zh-hans', function(done) {
      assertTextContent(done, '<wd-entity id="Q42" label lang="zh-hans"/>', '道格拉斯·亚当斯')
    })
  })

  describe('wd-entity property display', function() {
    it('should render external id property', function(done) {
      assertTextContent(done, '<wd-entity id="Q42" property="P345" />', 'nm0010930')
    })

    it('should render the label of the reference for the property', function(done) {
      assertTextContent(done, '<wd-entity id="Q42" property="P25" lang="en" />', 'Janet Adams')
    })
  })
})
