const path = require("path")
const {merge} = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const PurgeCssWebpackPlugin = require("purgecss-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const glob = require("glob")
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new PurgeCssWebpackPlugin({
            paths: glob.sync(`${path.resolve(__dirname, '../src')}/**/*.{tsx,less,scss,css}`, +{ nodir: true }),
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false,
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log']
                    }
                },
            })
        ]
    }
})
