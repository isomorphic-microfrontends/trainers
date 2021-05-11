module.exports = {
  // basePath: 'http://localhost:3000',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.output.libraryTarget = 'system'
      delete config.output.library
      // config.entry().then(entry => {
      //   console.log('entry', entry)
      // })
      // console.log('config', config)
    }

    return config
  }
}