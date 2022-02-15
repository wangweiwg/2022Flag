const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // {
            //     test: /.(png|jpg|gift|jpeg|webp)$/,
            //     use: 'file-loader'
            // },
            {
                test: /.(png|jpg|gift|jpeg|webp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40960
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3000,
        static: './',
        hot: true
        // static: {
        //     directory: path.join(__dirname, '/'),
        //     publicPath: '/',
        //     serveIndex: true,
        //     watch: {
        //         ignore: './node_modules/'
        //     }
        // },
    }
}