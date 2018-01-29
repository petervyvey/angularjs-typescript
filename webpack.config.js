var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: {
        app: path.resolve(__dirname, './src/application.ts'),
        // vendor: ['angular',],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'attentia-maps-poc',
            // favicon: './favicon.ico',
            template: 'src/index.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new DashboardPlugin(),
    ],
    module: {
        rules: [
            // Angular Template HTML
            {
                test: /\.thtml$/,
                use: [
                    {
                        loader: 'ngtemplate-loader',
                        options: {
                            exportAsEs6Default: true
                        }
                    },
                    'html-loader',
                ],
            },
            // HTML
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        exportAsEs6Default: true
                    }
                }
            },
            // TypeScript
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            // CSS
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },

            // SASS
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },

            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    'file-loader'
                ]
            },

            // Images
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    // url-loader: like file-loader, but inlines everything small enough using base64
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2048
                        }
                    },

                    // minify images
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            bypassOnDebug: true,
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 1,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
                            },
                        },
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jpg', '.png', '.html'],
        alias: {
            "@services/*": "src/services/*",
            "@components/*": "src/components/*",
            "@lib/*": "src/lib/*",
            "@ngrx/*": "src/lib/ngrx/*",
            "@store/*": "src/store/*"
        }
    },
};
