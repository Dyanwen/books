const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
    // inline是将map文件放在了bundle文件中，增大了bundle的体积，不会生成独立的map文件，
    // eval，开启source-map增大了构建速度
    // 
    devtool: "inline-source-map",
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
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    { loader: 'postcss-loader' },
                    { loader: 'less-loader', }
                ]
            },
            { test: /\.ts$/, use: 'ts-loader' },
            {
                test: /\.(png|gif|jpe?g|bmp)$/, use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name][hash:6].[ext]",
                        outputPath: "images/",
                        limit: 1024 * 2 // 小于这个值使用url-loader
                    }
                }]
            },
            {
                test: /\.(eot|svg|woff2|woff|ttf)$/, use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name][hash:6].[ext]",
                        outputPath: "assets/",
                    }
                }]
            },
        ],
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