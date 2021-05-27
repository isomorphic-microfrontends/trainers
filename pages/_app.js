import '../styles/globals.css'
import { useEffect } from 'react'

let numMounts = 0;

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    if (numMounts++ > 0) {
      // This is hacky and hopefully a better implementation will be found.
      // NextJS remounting doesn't recreate the router singleton, so we
      // have to readd its popstate listener every time except the first time.
      window.addEventListener('popstate', router.onPopState)
    }
    return () => {
      // NextJS doesn't clean up its popstate listener manually, so we do it for it
      window.removeEventListener('popstate', router.onPopState)
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
