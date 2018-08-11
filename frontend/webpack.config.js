const path = require("path");
const glob = require('glob');
const webpack = require('webpack');

const CSS_LOADER_CONFIG = [
    {
        loader: 'css-loader',
        options: {
            sourceMap: true
        }
    }, {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
            includePaths: glob
                .sync('/node_modules/*')
                .map((d) => path.join(__dirname, d))
        }
    }
];

module.exports = {
    context: __dirname,
    mode: "development",
    entry: './scripts/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.s?css$/,
                loaders: [
                    'style-loader',
                    'css-loader', {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: ['./node_modules']
                        }
                    }
                ]
            }, {
                exclude: /(node_modules|bower_components)/,
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['url-loader?limit=10000', 'img-loader']
            }
        ]
    },
    devtool: "eval",
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
}