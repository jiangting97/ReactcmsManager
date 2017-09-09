var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')
var config = {
    context: __dirname,
    entry:'./src/js/root.js',
    output:{
        path:__dirname,
        filename:'bundle.js'
    },
    // devServer:{
    //     inline:true,
    //     port:7777
    // },

    module:{
        loaders:[
            {
                test:/\.js?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['es2015','react']
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.less$/,exclude:/node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }


        ]
    },
    plugins:[
        new ExtractTextPlugin("[name].css")
    ]
}

module.exports = config;