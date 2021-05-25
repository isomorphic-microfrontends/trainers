const path = require('path')

module.exports = {
  // basePath: 'http://localhost:3000',
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    if (!isServer) {
      config.output.libraryTarget = 'system'
      delete config.output.library
      config.entry().then((entry) => {
        // Use a custom main entrypoint, so we can expose the mount/unmount functions to single-spa
        entry.main = path.resolve(process.cwd(), 'single-spa/main.js')
        config.entry = entry;
        console.log('entry', entry)
      })
      config.externals = ['react', 'react-dom', /@isomorphic-mf\/.+/]
      // console.log('config', config)
    }

    return config
  }
}