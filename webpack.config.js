const path = require("path");
const MiniCss = require('mini-css-extract-plugin');

module.exports = function (_, webpackEnv) {
    const isDevelopment = webpackEnv.mode === 'development';
    const isProduction = webpackEnv.mode === 'production';

    const miniCss = new MiniCss({
        filename: 'style.css'
    });

    const getStyleLoaders = () => {
        return [
            isDevelopment && 'style-loader',
            isProduction && MiniCss.loader,
            {
                loader: 'css-loader',
                options: {
                    esModule: true,
                    sourceMap: isDevelopment,
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: ['autoprefixer']
                    }
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    implementation: require('sass'),
                    sourceMap: isDevelopment
                }
            }
        ].filter(Boolean);

    };

    return {
        /** "mode"
         * the environment - development, production, none. tells webpack
         * to use its built-in optimizations accordingly. default is production
         */
        // mode: "development",
        /** "entry"
         * the entry point
         */
        entry: "./index.js",
        output: {
            /** "path"
             * the folder path of the output file
             */
            path: path.resolve(__dirname, "public"),
            /** "filename"
             * the name of the output file
             */
            filename: "main.js"
        },
        /** "target"
         * setting "node" as target app (server side), and setting it as "web" is
         * for browser (client side). Default is "web"
         */
        target: "web",
        devServer: {
            /** "port"
             * port of dev server
             */
            port: "5000",
            /** "static"
             * This property tells Webpack what static file it should serve
             */
            static: ["./public"],
            /** "open"
             * opens the browser after server is successfully started
             */
            open: true,
            /** "hot"
             * enabling and disabling HMR. takes "true", "false" and "only".
             * "only" is used if enable Hot Module Replacement without page
             * refresh as a fallback in case of build failures
             */
            hot: true ,
            /** "liveReload"
             * disable live reload on the browser. "hot" must be set to false for this to work
             */
            liveReload: true
        },
        resolve: {
            /** "extensions"
             * If multiple files share the same name but have different extensions, webpack will
             * resolve the one with the extension listed first in the array and skip the rest.
             * This is what enables users to leave off the extension when importing
             */
            extensions: ['.js','.jsx','.json']
        },
        module:{
            /** "rules"
             * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx'
             * file inside of a require()/import statement, use the babel-loader to transform it before you
             * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from
             * being searched"
             */
            rules: [
                {
                    test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
                    exclude: /node_modules/, //folder to be excluded
                    use:  'babel-loader' //loader which we are going to use
                },
                {
                    test: /\.s?css$/,
                    use: getStyleLoaders()
                }

            ]
        },
        plugins: [miniCss],
    }
}