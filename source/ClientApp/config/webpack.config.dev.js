const helpers = require("./helpers")
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.base")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin")
const DefinePlugin = require("webpack/lib/DefinePlugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const env = require("../environment/dev.env")

const publicPath = "/dist/";

// webpackConfig.output.publicPath = publicPath;

// webpackConfig.devtool = "inline-source-map";

webpackConfig.mode = "development";

webpackConfig.module.rules = [...webpackConfig.module.rules,    
{
    test: /\.scss$/,
    use: [
        "style-loader",
        "css-loader",
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
    test: /\.css$/,
    use: [
        "style-loader",
        "css-loader"
    ]
},
{
    test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
    use: [{
        loader: "file-loader",
        options: {
            // regExp: /(fonts\/.*)/,
            name: "[name].[ext]",
            publicPath: `../ClientAlerting${publicPath}assets/fonts/`,
            outputPath: "assets/fonts/"
        }
    }]
}
]

webpackConfig.plugins = [...webpackConfig.plugins,
    new HtmlWebpackPlugin({
        inject: true,
        filename: "index.html",
        template: helpers.root("/src/index.html"),
        favicon: helpers.root("/src/favicon.ico"),
        chunks: ["main", "polyfills", "common", "vue", "vendors"]
    }),
    new HtmlWebpackPlugin({
        inject: true,
        filename: "login.html",
        template: helpers.root("/src/login.html"),
        favicon: helpers.root("/src/favicon.ico"),
        chunks: ["login", "polyfills", "common", "vue", "vendors"]
    }),
    new HtmlWebpackHarddiskPlugin(),

    new MiniCssExtractPlugin({
        filename: "css/[name].css",
    }),
    new DefinePlugin({
        "process.env": env
    })
]

webpackConfig.devServer = {
    port: 9000,
    //proxy: {
    //    "*": {
    //        target: "http://localhost:9000/ClientAlerting/",
    //        changeOrigin: true
    //    }
    //},
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
