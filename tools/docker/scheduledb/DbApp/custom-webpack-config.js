const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        TSSGAPPURL: JSON.stringify(process.env.FRONTEND_URL || 'http://localhost'),
        TSSGAPP_PORT: JSON.stringify(process.env.FRONTEND_URL || '4200'),
        TSSGAPIURL: JSON.stringify(process.env.BACKEND_BASE_URL || 'http://localhost'),
        TSSGAPIPORT: JSON.stringify(process.env.BACKEND_BASE_PORT || '7010')
      }
    })
  ]
}
