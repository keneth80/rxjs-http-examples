'use strict';

const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const commonConfig = require('./webpack.config.common');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    mode: 'production',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single',
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    warnings: false,
                    compress: {
                        warnings: false,
                        unused: true,
                    },
                    ecma: 6,
                    mangle: true,
                    unused: true,
                },
                sourceMap: true,
            }),

            new OptimizeCSSAssetsPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: false
            })
        ]
    }
});