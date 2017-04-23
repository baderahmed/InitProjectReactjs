
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProd = process.env.NODE_ENV == "production";
var cssLoaders = ["style-loader", "css-loader", "sass-loader"];

if (isProd) {
  cssLoaders = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", "sass-loader"],
    publicPath: "/dist"
  });
}

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname +'/dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      { test: /\.hbs$/, loader: "handlebars-loader" },
      { test: /\.scss$/, use: cssLoaders }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    stats: 'errors-only',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template using Handlebars',
      /*minify: {
        collapseWhitespace: true,
      },*/
      hash: true,
      excludeChunks: ['contact'],
      //filename: './../index.html',
      template: './src/templates/main.hbs'
    }),
    new HtmlWebpackPlugin({
      title: 'Contact page',
      /*minify: {
        collapseWhitespace: true,
      },*/
      chunks: ['contact'],
      hash: true,
      filename: './contact.html',
      template: './src/templates/contact.hbs'
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
};