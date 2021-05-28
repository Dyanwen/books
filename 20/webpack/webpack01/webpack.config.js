const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require("path");
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        a: './src/a.module.js',
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        // [name] [hash] [chunkhash] [contenthash]
        filename: '[name].[contenthash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            },
            { test: /\.ts$/, use: 'ts-loader' },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'main.html'
        }),
    ],
}