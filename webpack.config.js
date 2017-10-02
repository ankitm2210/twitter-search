var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Path = require('path');


var isProduction = process.env.NODE_ENV === 'production';

var cssOutputPath = isProduction ? '/styles/app.[hash].css' : '/styles/app.css';
var devToolConfig = isProduction ? 'source-map' : 'cheap-eval-source-map';

var config = {
    entry: {
        app: './src/client/index.js',
    },

    output: {
        path: Path.join(__dirname, './dist/scripts'),
        filename: 'app',
    },

    devtool: devToolConfig,

    module: {
        rules: [
              {
                test: /\.js$/, //Check for all js files
                loader: 'babel-loader',
                query: {
                  presets: [ "babel-preset-react", "babel-preset-stage-2" ].map(require.resolve)
                }
              },
              {
                test: /\.(sass|scss)$/, //Check for sass or scss file names
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ]
              },
              {
                test: /\.json$/,
                loader: "json-loader"  //JSON loader
              }
         ]
    },

    devServer: {
        contentBase: __dirname + '/src',
    }

};

module.exports = config;