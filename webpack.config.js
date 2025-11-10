const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require('dotenv').config();

module.exports = {
  mode: "production", 
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "",
  },
plugins: [
  new HtmlWebpackPlugin({
    template: "./src/template.html",
  }),
  new webpack.DefinePlugin({
    "process.env.API_KEY": JSON.stringify(process.env.API_KEY)
  })
],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: "./dist",
    open: true,
  },
};
