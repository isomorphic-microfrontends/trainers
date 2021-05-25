import singleSpaNext from './single-spa-next'

const lifecycles = singleSpaNext()

export const { bootstrap, mount, unmount } = lifecycles