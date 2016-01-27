var devMode = (process.env.NODE_ENV !== "production");
if (devMode)
{
    const arg = process.argv[process.argv.length - 1];
    if (arg && arg.trim() === "-p")
    {
        devMode = false;
    }
}

const fs = require("fs");
const path = require("path");

const webpack = require("webpack");

// NOTE: All the paths defined in plugins are related to output.path.
const plugins = [
    new webpack.ProvidePlugin({
        "mx": "./src/mx"
    })
];

if (!devMode)
{
    plugins.push(function() {
        this.plugin("done", function(stats) {
            const packageJSON = require("./package.json");
            var version = packageJSON.version.split(".");
            version[2] = parseInt(version[2]) + 1;
            packageJSON.version = version.join(".");

            fs.writeFileSync(
                path.join(__dirname, "./package.json"),
                JSON.stringify(packageJSON, null, 2)
            );
        });
    });
}


module.exports = {
    // This is the root of client source codes.
    context: path.join(__dirname, "./"),
    entry: {
        mx: "./src/mx",
        injection: "./src/js"
    },
    output: {
        // webpack-dev-server will server output.path as output.publicPath
        path: path.join(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: "[name].js",
        chunkFilename: "[id]/[id].js",
        libraryTarget: devMode ? "var" : "commonjs",
        library: "mx"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: plugins
};
