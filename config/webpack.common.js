const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")
const Webpackbar = require("webpackbar")
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ISDEV } = require("./constants");

module.exports = {
    entry: ['react-hot-loader/patch', "./src/index.tsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: `js/[name]${ISDEV ? "" : ".[hash:8]"}.js`,
        environment: {
            arrowFunction: false,
            const: false,
        },
    },
    module: {
        rules: [
            // {
            //     test: /\.ts$/,
            //     use: [
            //         {
            //             loader: "babel-loader",
            //             options: {
            //                 presets: [
            //                     [
            //                         "@babel/preset-env",
            //                         {
            //                             targets: {
            //                                 chrome: "88",
            //                                 ie: "11",
            //                             },
            //                             corejs: "3",
            //                             useBuiltIns: "usage",
            //                         },
            //                     ],
            //                 ],
            //             },
            //         },
            //         "ts-loader",
            //     ],
            //     exclude: /node_modules/,
            // },
            {
                test: /\.(tsx?|js)$/,
                loader: "babel-loader",
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: ISDEV,
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions",
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "less-loader",
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: ISDEV,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // ?????????????????????????????????postcssOptions?????????
                            postcssOptions: {
                                ident: "postcss",
                                plugins: [
                                    // ???????????????flex???????????????bug
                                    require("postcss-flexbugs-fixes"),
                                    // ??????browserslist???????????????????????????????????????????????????css???????????????
                                    require("postcss-preset-env")({
                                        // ???????????????????????????
                                        autoprefixer: {
                                            // will add prefixes only for final and IE versions of specification
                                            flexbox: "no-2009",
                                        },
                                        stage: 3,
                                    }),
                                    // ??????browserslist?????????????????????normalize.css??????
                                    require("postcss-normalize"),
                                ],
                            },
                            // ????????????devtool????????????
                            sourceMap: ISDEV,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: ISDEV,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: ISDEV, // ????????????devtool????????????
                            importLoader: 0, // ?????????css-loader??????????????????loader??????
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // ?????????????????????????????????postcssOptions?????????
                            postcssOptions: {
                                ident: "postcss",
                                plugins: [
                                    // ???????????????flex???????????????bug
                                    require("postcss-flexbugs-fixes"),
                                    // ??????browserslist???????????????????????????????????????????????????css???????????????
                                    require("postcss-preset-env")({
                                        // ???????????????????????????
                                        autoprefixer: {
                                            // will add prefixes only for final and IE versions of specification
                                            flexbox: "no-2009",
                                        },
                                        stage: 3,
                                    }),
                                    // ??????browserslist?????????????????????normalize.css??????
                                    require("postcss-normalize"),
                                ],
                            },
                            // ????????????devtool????????????
                            sourceMap: ISDEV,
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10 * 1024, // ????????????10k???????????????base64?????????dataUrl
                            name: "[name].[contenthash:8].[ext]", // [hash]????????????[contenthash]???????????????????????????????????????????????????????????????????????????md5 hash??????
                            outputPath: "assets/imgaes", // ???????????????????????????????????????assets/images????????????
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[contenthash:8].[ext]",
                            outputPath: "assets/fonts",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new HardSourceWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            filename: "index.html",
            // ??????????????????V6?????????copy-webpack-plugin???????????????????????????????????????????????????
            cache: false,
            minify: ISDEV
                ? false
                : {
                      removeComments: true,
                      removeAttributeQuotes: true,
                      collapseWhitespace: true,
                      collapseBooleanAttributes: true,
                      collapseInlineTagWhitespace: true,
                      removeRedundantAttributes: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      minifyCSS: true,
                      minifyJS: true,
                      minifyURLs: true,
                      useShortDoctype: true,
                  },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, '../public'),
                    from: '*',
                    to: path.resolve(__dirname, './dist'),
                    toType: 'dir',
                },
            ],
        }),
        new Webpackbar({
            name: ISDEV ? 'starting' : 'building',
        }),
    ],
    resolve: {
        extensions: [".ts", ".js", ".jsx", ".tsx", ".json"],
    },
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDom'
    // },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            }
        }
    }
};
