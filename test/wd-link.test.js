import {expect, html, fixture, waitUntil} from '@open-wc/testing'

describe('wd-link', function () {
  const waitElementRendered = async (el) => {
    return waitUntil(() => el.href !== '', "Element didn't render properly! ")
  }

  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('a', {is: 'wd-link'})
      expect(el.nodeName).to.equal('A')
      expect(el.constructor).to.equal(window.WDLinkElement)
    })

    it('creates from constructor', function () {
      const el = new window.WDLinkElement()
      expect(el.nodeName).to.equal('A')
    })
  })

  describe('render site link', function () {
    const tim = 'Q80'
    const text = 'Tim Berners-Lee'

    it('with 1 site argument', async () => {
      const el = await fixture(
        html`<a is="wd-link" entity-id="${tim}" site="enwiki">${text}</a>`
      )
      await waitElementRendered(el)

      expect(el.href).to.equal('https://en.wikipedia.org/wiki/Tim_Berners-Lee')
      expect(el.textContent).to.equal(text)
    })

    it('with multiple site argument in priority orders', async () => {
      const el = await fixture(
        html`<a is="wd-link" entity-id="${tim}" site="zhwikiquote, enwikiquote"
          >${text}</a
        >`
      )
      await waitElementRendered(el)

      expect(el.href).to.equal('https://en.wikiquote.org/wiki/Tim_Berners-Lee')
      expect(el.textContent).to.equal(text)
    })

    it('with property that represent an URL(e.g, P856)', async () => {
      const el = await fixture(
        html`<a is="wd-link" entity-id="${tim}" property="P856">${text}</a>`
      )
      await waitElementRendered(el)

      expect(el.href).to.equal('http://www.w3.org/People/Berners-Lee/')
      expect(el.textContent).to.equal(text)
    })

    it('with external id property', async () => {
      const el = await fixture(
        html`<a is="wd-link" entity-id="${tim}" property="P2002">${text}</a>`
      )
      await waitElementRendered(el)

      expect(el.href).to.equal('https://twitter.com/timberners_lee')
      expect(el.textContent).to.equal(text)
    })
  })
})
