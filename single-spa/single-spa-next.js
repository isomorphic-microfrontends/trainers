import { displayContent } from 'next/dist/client/dev/fouc'
import initNext from 'next/dist/client/index.js'
import { unmountComponentAtNode } from 'react-dom'

export default function singleSpaNext(opts) {
  let renderCtx, render

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
      await render(renderCtx)
    },
    async unmount(props) {
      const unmounted = unmountComponentAtNode(document.getElementById('__next'))
      if (!unmounted) {
        throw Error(`single-spa-next: unmountComponentAtNode() returned false, indicating the application failed to unmount`)
      }
    }
  }
}