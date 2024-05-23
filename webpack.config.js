const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production", // provides additional optimizations like minification, tree-shaking, scope hoisting, etc.
  entry: "./src/index.js", //entry point
  output: {
    //output path, if want dynamic output file name use wildcards
    path: path.resolve(__dirname, "public"),
    filename: "video-cc-widget.js",
  },
  ignoreWarnings: [
    //ignore these warnings, recommnded not to do
    { message: /entrypoint size limit/ },
    { message: /webpack performance recommendations/ },
    { message: /asset size limit/ },
  ],
  resolve: {
    //how to resolve module paths
    fallback: {
      //define additonal dir or mod to be used as fallbacks if it fails to find that module
      /**
       * Webex Browser SDK requires these
       * dev dependencies to be installed
       * at the root level
       * */
      stream: require.resolve("stream-browserify"), //in brower envs this is not available like in nodejs. Allows effecient process data instead of loading all at once into the memory
      crypto: require.resolve("crypto-browserify"), //browser-compatible implementation of Node.js's crypto module (encryption,decryption etc)
      util: require.resolve("util"),
      url: require.resolve("url"),
      querystring: require.resolve("querystring-es3"), //lightweight impl of the querystring module that is compatible with ES3 environments
      os: require.resolve("os-browserify/browser"), //retrieving information about the operating system and the current user's environment
      vm: require.resolve("vm-browserify"), //utilities for compiling and running JavaScript code in a sandboxed env
      fs: false, //file-related operations such as reading from and writing to files
    },
  },
  devServer: {
    //web server with live loading support
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true, //compress the output
    port: 8082,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: {
        //   loader: "babel-loader", // transpile your JavaScript code
        //   options: {
        //     //Preset:plugins that define how Babel should transpile js code
        //     presets: ["@babel/preset-env"], //determines which transformations and polyfills are needed
        //   },
        // },
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        use: ["lit-scss-loader", "extract-loader", "css-loader", "sass-loader"],
        //lit-scss-loader : Compatibility with litElement components
        //extract-loader : Extract CSS into a separate file
        //css-loader : Load CSS files, resolve url() and @import statements
        //sass-loader : Compile Sass to CSS
      },
      // {
      //   test: /\.html$/,
      //   loader: "html-loader",
      // },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000, // Inline files smaller than 10 kB
            },
          },
          // Fallback loader for larger files
          // {
          //   loader: "file-loader",
          //   options: {
          //     name: "[name].[ext]",
          //     outputPath: "assets/",
          //   },
          // },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.ProvidePlugin({
      //load modules whenever certain identifiers are encountered
      process: path.resolve(
        //if process is used in any of SDK code, replaces with this mode modules module
        path.join(__dirname, "node_modules/process/browser")
      ),
    }),
    new HtmlWebpackPlugin({
      // to automatically inject bundle files into HTML
      filename: "index.html", //output file name
      minify: false,
    }),
  ],
};
