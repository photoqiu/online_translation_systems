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
process.env.NODE_ENV = 'development';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, './node_modules');
const APP_INDEX_FILE = path.resolve(ROOT_PATH, './app_index.js'); //根目录文件
const devconfig = require('./webpack.base.config.js');
const DIST_PATH = path.resolve(ROOT_PATH, './');
const openUrl = 'http://132.232.35.109:9000/';
const webPackDevServer = require('webpack-dev-server');
devconfig.watch = true;
devconfig.mode = "development";
devconfig.devtool = 'cheap-module-eval-source-map';
devconfig.optimization = {
    runtimeChunk: {
        name: entrypoint => `${entrypoint.name}`
    },
    minimize: false,
    splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'initial',
                minChunks: 1,
                minSize: 1   
            },
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                chunks: 'async',
                name: 'vendor',
                priority: -20,
                reuseExistingChunk: true,
                enforce: true
            },
            index: {
                chunks: 'all',
                name: 'index',
                priority: -20,
                reuseExistingChunk: true,
                enforce: true
            }
        }
    }
};
devconfig.entry = {
    commons:['vuex-router-sync', 'vue-i18n', 'vue-types'],
    vendor: ['vue', 'vue-router', 'vuex'],
    index: [
        'babel-polyfill',
        'babel-register',
        'whatwg-fetch',
        'fetch-jsonp',
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
        NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        DEBUG: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
);
devconfig.stats = {
    colors: true,
    reasons: true,
    chunks: false
};
devconfig.devServer = {
    watchOptions : {
        aggregateTimeout: 300,
        poll: 1000
    },
    proxy: {
        '/login': {
            target: 'http://39.105.127.20:8280/',
            pathRewrite: {'^/login' : '/login'}
        },
        '/recommend': {
            target: 'http://39.105.127.20:8280/',
            pathRewrite: {'^/recommend' : '/recommend'}
        },
        '/category':{
            target: 'http://39.105.127.20:8280/',
            pathRewrite: {'^/category' : '/category'}
        },
        '/comment':{
            target: 'http://39.105.127.20:8280/',
            pathRewrite: {'^/comment' : '/comment'}
        },
        '/banner': {
            target: 'http://39.105.127.20:8280/',
            pathRewrite: {'^/banner' : '/banner'}
        },
        '/consult': {
            target: 'http://39.105.127.20:8280/',
            pathRewrite: {'^/consult' : '/consult'}
        },
        '/strategy': {
            target: 'http://39.105.127.20:8280/',
            pathRewrite: {'^/strategy' : '/strategy'}
        },
        '/collect': {
            target: 'http://39.105.127.20:8280/',
            pathRewrite: {'^/collect' : '/collect'}
        },
        '/course': {
            target: 'http://39.105.127.20:8280/',
            pathRewrite: {'^/course' : '/course'}
        },
        '/service': {
            target: 'http://39.105.127.20:8280/',
            pathRewrite: {'^/service' : '/service'}
        }
    },
    hot: true,
    noInfo: true,
    inline: true,
    progress: true,
    publicPath: "/",
    port: 9000,
    host: "127.0.0.1",
    contentBase: path.join(__dirname, 'dist'),
    stats: {
        colors: true
    },
    overlay: {
        warnings: true,
        errors: true
    },
    historyApiFallback: {
        index: path.join(__dirname, '/src/public/index.html') // 所有404的请求全部访问该配置下的url
    },
    compress: true,
    disableHostCheck: true
};

module.exports = devconfig;