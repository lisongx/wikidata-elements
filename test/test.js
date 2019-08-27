describe('wd-item', function() {
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
      document.body.innerHTML = '<wd-item></wd-item>'
    })

    afterEach(function() {
      document.body.innerHTML = ''
    })

    it('initiates', function() {
      const ce = document.querySelector('wd-item')
      assert.equal(ce.textContent, 'test')
    })
  })
})
