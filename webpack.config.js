/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/scripts/index.js",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  entry: {
    index: "./src/scripts/index.js",
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // clean: true,
  },
  plugins: [],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
