const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        login: './src/login.js',
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].[contenthash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"
                    // { loader: 'style-loader' },
                    // {
                    //     loader: 'css-loader',
                    //     options: {
                    //         modules: true
                    //     }
                    // },
                ]
            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader
            //         },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true
            //             }
            //         },
            //         { loader: 'postcss-loader' },
            //         { loader: 'less-loader', }
            //     ]
            // },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader.js' },
                    { loader: 'css-loader.js', },
                    { loader: 'less-loader.js', }
                ]
            },
            { test: /\.ts$/, use: 'ts-loader' },
            {
                test: /\.js$/, use: [
                    {
                        loader: 'replace.js',
                    },
                    {
                        loader: 'async.js',
                        options: {
                            name: 'adfasd'
                        }
                    }
                ]
            },
        ],
    },
    resolveLoader: {
        modules: ['node_modules', './loader']
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[contenthash:6].css",

        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: "./src/login.html",
            filename: "login.html",
            chunks: ['login']
        }),
    ],
}