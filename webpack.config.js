var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
      main: ['webpack-hot-middleware/client', './client/index.js']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/static/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    },
    devtool: 'source-map'
}
