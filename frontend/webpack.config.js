const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
       new HtmlWebpackPlugin({
           template: 'src/index.html',
           filename: 'index.html'
       }) 
    ],
    module: {
        rules: [
            {   
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    performance: {
        hints: false
    },
    devServer: {
        contentBase: './build',
        historyApiFallback: true
    }
};