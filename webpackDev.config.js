const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
      static: './build',
      open: false,
   },
   entry: './src/index.js',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [ "style-loader", "css-loader", "sass-loader", ],
         },
         {
            test: /\.html$/i,
            loader: "html-loader",
          },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         title: 'Todo List',
         template: './src/template/index.ejs',
      })
   ],
};