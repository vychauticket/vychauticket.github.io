const helpers = require('./helpers');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

const pathsToClean = [
    helpers.root("../dist")
];
const cleanOptions = {
    root: helpers.root(".."),
    verbose: true,
    dry: false
};


let config = {
    entry: {
        polyfills: `bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${helpers.root("..")}/.bootstraprc!bootstrap-loader/no-op.js`,
        main: helpers.root('/src/main.ts'),
        login: helpers.root('/src/login.ts')
    },
    output: {
        path: helpers.root('../dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js',
        publicPath: helpers.subsite('/')
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".ts", ".js", ".html"],
        alias: {
            "vue$": "vue/dist/vue.esm.js",
            "@": helpers.root("/src"),
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]((?!vue|@progress).*)[\\/]/,
                    name: "common",
                    chunks: "all"
                },
                vues: {
                    test: /[\\/]node_modules[\\/]((vue).*)[\\/]/,
                    name: "vue",
                    chunks: "all"
                },
                vendors: {
                    test: /[\\/]node_modules[\\/](@progress)[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            enforce: "pre",
            loader: "tslint-loader"
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: "awesome-typescript-loader"
        },
        {
            test: /\.html$/,
            loader: "raw-loader",
            exclude: helpers.root("src/index.html")
        }]
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new NamedModulesPlugin(),
        new CopyWebpackPlugin([{
            from: "ClientApp/src/assets",
            to: "./assets"
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery'
          })
    ]
};

module.exports = config;
