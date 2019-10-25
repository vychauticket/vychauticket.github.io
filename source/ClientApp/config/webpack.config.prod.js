const webpack = require("webpack")
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const autoprefixer = require("autoprefixer")
const webpackConfig = require("./webpack.config.base")
const helpers = require("./helpers")
const DefinePlugin = require("webpack/lib/DefinePlugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const env = require("../environment/prod.env")

//const extractSass = new ExtractTextPlugin({
//  filename: 'css/[name].[contenthash].css',
//  disable: process.env.NODE_ENV === 'development'
//})

webpackConfig.mode = "production";

webpackConfig.output.publicPath = helpers.subsite("dist/");

webpackConfig.module.rules = [...webpackConfig.module.rules,
{
    test: /\.scss$/,
    use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                plugins: () => [autoprefixer],
                sourceMap: false
            }
        },
        "sass-loader",
        {
            loader: "sass-resources-loader",
            options: {
                resources: [
                    helpers.root("src/sass/_variables.scss"),
                    helpers.root("../node_modules/@fortawesome/fontawesome-free/scss/solid.scss"),
                    helpers.root("../node_modules/bootstrap/scss/_functions.scss"),
                    helpers.root("../node_modules/bootstrap/scss/_variables.scss"),
                    helpers.root("../node_modules/bootstrap/scss/_mixins.scss")
                ]
            }
        }
    ]
},
{
    test: /\.(jpg|png|gif)$/,
    loader: 'file-loader',
    options: {
        regExp: /(img\/.*)/,
        name: '[name].[ext]',
        publicPath: '../',
        outputPath: 'assets/img/'
    }
},
    {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    loader: 'file-loader',
    options: {
        regExp: /(fonts\/.*)/,
        name: '[name].[ext]',
        publicPath: "../assets/fonts/",
        outputPath: "assets/fonts/"
    }
    },
    {
        test: /\.css$/,
        use: [
            "style-loader",
            "css-loader"
        ]
    },
]

// ensure ts lint fails the build
webpackConfig.module.rules[0].options = {
    failOnHint: false
}

webpackConfig.optimization.minimizer = [
    new TerserPlugin({
        parallel: true,
        terserOptions: {
            ecma: 6
        }
    })
]

webpackConfig.plugins = [...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
        filename: "css/[name].[hash].css",
    }),
    new OptimizeCssAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
            discardUnused: false,
            discardComments: { removeAll: true }
        },
        canPrint: true
    }),
    new HtmlWebpackPlugin({
        inject: true,
        filename: "index.html",
        template: helpers.root("/src/index.html"),
        favicon: helpers.root("/src/favicon.ico"),
        chunks: ["main", "polyfills", "common", "vue", "vendors"],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    }),
    new HtmlWebpackPlugin({
        inject: true,
        filename: "login.html",
        template: helpers.root("/src/login.html"),
        favicon: helpers.root("/src/favicon.ico"),
        chunks: ["login", "polyfills", "common", "vue", "vendors"],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    }),
    // new HtmlWebpackHarddiskPlugin(),
    new CompressionPlugin({
        asset: "[path].gz[query]",
        test: /\.js$/
    }),
    new DefinePlugin({
        "process.env": env
    }),
    new FaviconsWebpackPlugin(helpers.root("/src/icon.png"))
]
webpackConfig.devServer = {
    port: 9001,
    // proxy: {
    //     "*": {
    //         target: "http://localhost:45874",
    //         changeOrigin: true
    //     }
    // },
    historyApiFallback: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    contentBase: helpers.root("/src"),
    hot: true,
    writeToDisk: true
}
module.exports = webpackConfig
