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
process.env.NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, './node_modules');
const APP_INDEX_FILE = path.resolve(ROOT_PATH, './app_index.js'); //根目录文件
const devconfig = require('./webpack.base.config.js');
const DIST_PATH = path.resolve(ROOT_PATH, './');
const openUrl = 'http://132.232.35.109:9000/';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webPackDevServer = require('webpack-dev-server');
devconfig.watch = false;
devconfig.mode = "production";
devconfig.devtool = 'cheap-module-source-map';
devconfig.optimization = {
    namedChunks: true,
    usedExports: true,
    namedModules: true,
    noEmitOnErrors: true,
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
                ecma: 8,
                warnings: false,
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                },
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_classnames: undefined,
                keep_fnames: false,
                safari10: false
            },
            cache: true,
            sourceMap: true
        })
    ],
    splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            },
            css: {
                test: /\.(css|sass|scss|less)$/,
                name: 'styles',
                chunks: 'all',
                minChunks: 2,
                enforce: true
            },
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'commons',
                chunks: 'initial',
                minChunks: 2,
                maxInitialRequests: 5, // The default limit is too small to showcase the effect
                minSize: 0   
            },
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                chunks: 'async',
                name: 'vendor',
                priority: -10,
                enforce: true
            },
            index: {
                chunks: 'async',
                name: 'index',
                priority: -10,
                enforce: true
            }
        }
    }
};
devconfig.entry = {
    commons:['babel-polyfill',
        'babel-register',
        'whatwg-fetch',
        'fetch-jsonp', 'vuex-router-sync', 'vue-i18n', 'vue-types'],
    vendor: ['vue', 'vue-router', 'vuex'],
    index: [
        
        APP_INDEX_FILE
    ]
};
devconfig.plugins.push(
    new HtmlWebpackPlugin({
        template: path.resolve(ROOT_PATH, './src/templates/index/index.html'),
        filename: 'index.html',
        chunksSortMode: 'manual',
        inject: true,
        hash: true,
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            html5: true,
            minifyCSS: true,
            removeComments: true,
            decodeEntities: true,
            preserveLineBreaks: true,
            removeEmptyAttributes: true
        },
        chunks: ['runtime', 'vendor', 'commons', 'index']
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': "'development'"
        },
        'SERVICE_URL': JSON.stringify("http://127.0.0.1:9000")
    }),
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
        DEBUG: false
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
    }),
    new webpack.NamedModulesPlugin()
);
devconfig.stats = {
    colors: true,
    reasons: true,
    chunks: false
};

module.exports = devconfig;