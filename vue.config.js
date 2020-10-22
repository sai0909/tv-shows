// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/tv-shows/' : '/',
  devServer: {
    proxy: 'https://api.tvmaze.com'
  }
}
