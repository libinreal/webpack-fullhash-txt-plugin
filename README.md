# webpack-fullhash-txt-plugin
Use the webpack fullhash txt plugin, you can output the fullhash into a custom file, this is useful for version controlling of the whole project.

## Install
npm
```bash
$ npm install webpack-fullhash-txt-plugin --save 
```
yarn
```bash
$ yarn add webpack-fullhash-txt-plugin --save
```

## Usage
```javascript
// webpack.config.js
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf');
const WebpackFullhashTxtPlugin = require('webpack-fullhash-txt-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[chunkhash:8].css'
    }),
    new WebpackFullhashTxtPlugin({
      // You must set the cb option
      cb: function(hashMap) {
        console.log(hashMap);
        /* do something, the hashMap like this:
        {
          hash: '6f0486fb6449204e4b3db696f95df4bc',
          app: {
            chunkHash: 'e03808e758b346644766a53e7996ef40',
            files: [ 'css/app_e03808e7.css', 'js/app_e03808e7.js' ]
          },
          vendor: {
            chunkHash: 'fdf3345a25608a6df7614afaf3896002',
            files: [ 'js/vendor_fdf3345a.js' ]
          }
        }*/
        fs.writeFileSync(path.join(__dirname, '../app_fullhash.txt'), JSON.stringify(hashMap));
      }
    }),
    ...
  ]
}

// app_fullhash.txt
// before
3e4664288adaead0fee990c7240bac80
// after
ad6359ce856882e3g19c3c1a98070e8e
```