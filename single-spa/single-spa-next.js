import { displayContent } from 'next/dist/client/dev/fouc'
import initNext from 'next/dist/client/index.js'
import { unmountComponentAtNode } from 'react-dom'

export default function singleSpaNext(opts) {
  let renderCtx, render, originalNextEl = document.querySelector(`#single-spa-application\\:\\@isomorphic-mf\\/trainers #__next`)

  return {
    async bootstrap() {
      const res = await initNext({})
      renderCtx = res.renderCtx
      render = res.render
    },
    async mount() {
      await new Promise((resolve) => {
        displayContent(resolve)
      })
      let applicationContainer = document.getElementById('single-spa-application:@isomorphic-mf/trainers')
      let nextEl = applicationContainer.querySelector('#__next')
      if (!nextEl) {
        applicationContainer.appendChild(originalNextEl)
      }
      await render(renderCtx)
    },
    async unmount(props) {
      const unmounted = unmountComponentAtNode(originalNextEl)
      if (!unmounted) {
        throw Error(`single-spa-next: unmountComponentAtNode() returned false, indicating the application failed to unmount`)
      }
    }
  }
}