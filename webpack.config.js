const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
      static: './docs',
      open: false,
   },
   entry: './src/index.js',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'docs'),
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
            ],
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