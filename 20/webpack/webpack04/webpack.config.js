const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const glob = require("glob");
const TxtWebpackPlugin = require("./plugins/txt-webpack-plugin");
const fileWebpackPlugin = require("./plugins/file-webpack-plugin");

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

// const { entry, htmlWebpackPlugins } = setMpa();

module.exports = {
    devtool: "inline-source-map",
    mode: 'development',
    entry: './src/index.js',
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
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader',
                    }
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
                test: /\.vue$/, use: [{
                    loader: "vue-loader"
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
        compress: true,
        open: true,
        hot: true,
        // hotOnly:true,
        port: 9000,
        proxy: {
            "/api": "http://localhost:3000/"
        }
    },
    plugins: [
        // new webpack.ProgressPlugin(),
        // new TxtWebpackPlugin({
        //     name: "逗点"
        // }),
        new fileWebpackPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[contenthash:6].css",

        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: true
        }),
    ],
}

