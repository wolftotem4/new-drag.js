const path = require("path")

module.exports = {
    entry: "./index.js",
    output: {
        filename: "dragjs.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
        library: "DragJs"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
