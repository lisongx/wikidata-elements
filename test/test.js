describe('wd-element', function() {
  describe('element creation', function() {
    it('creates from document.createElement', function() {
      const el = document.createElement('wd-element')
      assert.equal('WD-ELEMENT', el.nodeName)
    })

    it('creates from constructor', function() {
      const el = new window.WDElement()
      assert.equal('WD-ELEMENT', el.nodeName)
    })
  })

  describe('after tree insertion', function() {
    beforeEach(function() {
      document.body.innerHTML = '<wd-element></wd-element>'
    })

    afterEach(function() {
      document.body.innerHTML = ''
    })

    it('initiates', function() {
      const ce = document.querySelector('wd-element')
      assert.equal(ce.textContent, ':wave:')
    })
  })
})
