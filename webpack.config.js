const path = require('path');
const copywp = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js',
        background: './src/backround/background.js',
        options: './src/options/options.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'}
        ]
    },
    plugins: [
        new copywp([
            {from: "./src/assets", to: path.resolve(__dirname, 'build')}
        ], {})
    ]
};
