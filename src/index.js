"use strict";

const path = require("path");

class WebpackFullhashTxtPlugin {
    constructor(options) {
        this.options = options;
        if (typeof options.cb !== 'function') {
            throw new Error('You must set the cb option');
        }
    }

    apply(compiler) {
        if (compiler.hooks) {
            compiler.hooks.emit.tap({ name: 'WebpackFullhashTxtPlugin' }, function(compilation) {

                const hashMap = {
                    hash: compilation.fullHash
                };

                /*compilation.chunks.forEach(function (item) {
                    if(!item.isInitial()) {
                        return;
                    }
                    hashMap[item.name] = {
                        chunkHash: item.hash,
                        files: item.files,
                        // contentHash: item.contentHash
                    };
                });*/

                this.options.cb(hashMap);
            });
        } else {
            compiler.plugin("emit", (compilation, callback) => {
                const hashMap = {
                    hash: compilation.fullHash
                };
                compilation.chunks.forEach(chunk => {
                    /*if(!chunk.isInitial()) {
                        callback();
                        return;
                    }

                    hashMap[chunk.name] = {
                        chunkHash: chunk.hash,
                        files: chunk.files,
                        // contentHash: chunk.contentHash
                    };*/
                    callback();
                });

                this.options.cb(hashMap);
            });
        }
    }
}
module.exports = WebpackFullhashTxtPlugin;