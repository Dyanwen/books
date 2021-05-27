const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const glob = require("glob");

const setMpa = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    entryFiles.map((item, index) => {
        const entryFile = item;
        const matchFile = entryFile.match(/src\/(.*)\/index\.js$/);
        const pageName = matchFile[1];

        entry[pageName] = entryFile
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `./src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: [pageName]
        }))
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMpa();

module.exports = {
    devtool: "inline-source-map",
    mode: 'development',
    entry,
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].[contenthash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader", "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
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
                test: /\.js$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
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
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        proxy: {
            "/api": "http://localhost:3000/"
        },
        hot: true,
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: "css/[contenthash:6].css",

        // }),
        ...htmlWebpackPlugins
    ],
}

