const {merge} = require('webpack-merge')
const common = require('./webpack.common')
const {SERVER_PORT, SERVER_HOST} = require('./constants')
const proxySetting = require('./proxySetting')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        host: SERVER_HOST,
        port: SERVER_PORT,
        // stats: 'errors-only',
        compress: true,
        open: false,
        hot: true, // 热更新
        proxy: proxySetting
    },
})
