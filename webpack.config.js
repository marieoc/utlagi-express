const path = require('path');

module.exports = {
    entry: { // point d'entrée (import/export)
        main: path.resolve(__dirname, './assets/js/index.js')
    },
    output: { // point de sortie du bundle
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/js')
    },
    resolve: {
        alias: {
          assets: path.resolve(__dirname, 'assets/')
        }
    },
    module: { // loader babel (polyfiles + react) pour interprêter le jsx
        rules: [{
            test: /\.(js|jsx)$/, // replace /\.js$/ by /\.(js|jsx)$/
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                      ['@babel/preset-env', {
                        "targets": "defaults" 
                      }],
                      ['@babel/preset-react', {runtime:"automatic"}]
                    ]
                }
            }
        }, ]
    }
};

// , {runtime:"automatic"}