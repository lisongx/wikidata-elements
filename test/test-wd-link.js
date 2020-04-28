describe('wd-link', function() {
  describe('element creation', function() {
    it('creates from document.createElement', function() {
      const el = document.createElement('a', {is: 'wd-link'})
      expect(el.nodeName).to.equal('A')
      expect(el.constructor).to.equal(window.WDLinkElement)
    })

    it('creates from constructor', function() {
      const el = new window.WDLinkElement()
      expect(el.nodeName).to.equal('A')
    })
  })
})
