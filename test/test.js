const polly = window['@pollyjs/core']

describe('wd-item', function() {
  // console.log('polly', polly)

  // polly.setupMocha({
  //   adapters: ['fetch'],
  //   // persister: 'local-storage',
  // })

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

  describe('after tree insertion', function() {
    beforeEach(function() {
      document.body.innerHTML = '<wd-item item-id="Q42" label lang="en"/>'
    })

    it('initiates', function(done) {
      const item = document.querySelector('wd-item')
      setTimeout(() => {
        assert.equal(item.textContent, 'Douglas Adams')
        done();
      }, 1000);
    })
  })
})
