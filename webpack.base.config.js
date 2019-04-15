'use strict';
/**
 *
 *          ┌─┐       ┌─┐
 *       ┌──┘ ┴───────┘ ┴──┐
 *       │                 │
 *       │       ───       │
 *       │  ─┬┘       └┬─  │
 *       │                 │
 *       │       ─┴─       │
 *       │                 │
 *       └───┐         ┌───┘
 *           │         │
 *           │         │
 *           │         │
 *           │         └──────────────┐
 *           │                        │
 *           │                        ├─┐
 *           │                        ┌─┘
 *           │                        │
 *           └─┐  ┐  ┌───────┬──┐  ┌──┘
 *             │ ─┤ ─┤       │ ─┤ ─┤
 *             └──┴──┘       └──┴──┘
 *
 *        神兽保佑 （神兽来源与网络） 代码无BUG!
 *
**/
const path = require('path');
const os = require('os'); // 系统操作函数
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname);
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length - 1}); // 指定线程池个数
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const EXCLUDE = /node_modules|bower_components/;
const SRC_PATH = path.resolve(ROOT_PATH, './src');
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, './node_modules');

function pathResolve(dir) {
    return path.join(__dirname, dir);
}

let fontAwesomePath = path.join(
    __dirname,
    './node_modules/font-awesome/css/font-awesome.css'
);
let fetchPath = path.join(
    __dirname,
    './node_modules/whatwg-fetch/fetch.js'
);
let fetchJsonpPath = path.join(
    __dirname,
    './node_modules/fetch-jsonp/build/fetch-jsonp.js'
);
let jqueryPath = path.join(
    __dirname,
    './node_modules/jquery/dist/jquery.js'
);
let momentPath = path.join(
    __dirname,
    './node_modules/moment/moment.js'
);
let localforagePath = path.join(
    __dirname,
    './node_modules/localforage/dist/localforage.js'
);
module.exports = {
	context: SRC_PATH,
	module: {
        rules: [
            { 
                test: /\.txt$/, 
                use: 'raw-loader' 
            },
            {
                test: /\.js$/,
                exclude: EXCLUDE,
                loader: 'happypack/loader?id=babel',
                include: [SRC_PATH, pathResolve('./node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    hotReload: process.env.NODE_ENV !== 'production' ? true : false,
                    loaders: {
                        scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax',
                        less: 'vue-style-loader!css-loader!postcss-loader!less-loader',
                        css: 'vue-style-loader!css-loader!postcss-loader',
                        js : [
                            { loader: 'cache-loader' },
                            { loader: 'babel-loader', options: { presets: ['env'] } }
                        ],
                        cssModules: {
                            localIdentName: '[path][name]-[local]-[hash:base64:5]',
                            camelCase: true
                        },
                        extractCSS: true
                    }
                }
            },
            {
                test: /\.tpl$/,
                loader: 'html-loader'
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : 
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './' 
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            importLoaders: 1,
                            localIdentName: '[hash:base64]'
                        }
                    },
                    "postcss-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            indentedSyntax: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : 
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './' 
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            importLoaders: 1,
                            localIdentName: '[hash:base64]'
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : 
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './' 
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            importLoaders: 1,
                            localIdentName: '[hash:base64]'
                        }
                    },
                    'postcss-loader',
                    "less-loader"
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : 
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './' 
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            importLoaders: 1,
                            localIdentName: '[hash:base64]'
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            indentedSyntax: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|md|ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './static/assets/image/[md5:hash:base64:10].[ext]'
                }
            },
            {
                test: /\.(mp4|ogg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './static/assets/video/[md5:hash:base64:10].[ext]'
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=images/svg+xml']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff",
                options: {
                    name: './static/assets/fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
                options: {
                    name: './static/assets/fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    resolveLoader: {
        modules: [
            NODE_MODULES_PATH // 指定node_modules所在位置 当你import第三方模块式 直接从这个路径下搜寻
        ],
        extensions: ['.js', '.css', '.vue', '.less', '.json', '.*']
    },
    resolve: {
        alias: {
            jQuery: jqueryPath,
            fetch: fetchPath,
            fetchJsonp: fetchJsonpPath,
            moment: momentPath,
            fontAwesome: fontAwesomePath,
            localforage: localforagePath
        },
        enforceExtension: false
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({ // 定义环境变量
            "process.env": JSON.stringify(process.env.NODE_ENV)
        }),
        new FriendlyErrorsPlugin(),
        new webpack.ProvidePlugin({
            moment: 'moment',
            $: 'jQuery',
            jquery: 'jQuery',
            jQuery: 'jQuery',
            'window.jQuery': 'jQuery'
        }),
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new MiniCssExtractPlugin({
            filename: "./static/css/[name].[chunkhash].css",
            chunkFilename: "./static/css/[id].css"
        }),
        new VueLoaderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}