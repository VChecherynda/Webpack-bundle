const HtmlWebpackPlugin = require('html-webpack-plugin'); // Для подключения *.html templates
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // Для подключения *.css через <link>, а не через <style> 
const webpack = require('webpack');
const path = require('path');

const isProd = process.argv.indexOf('-p') !== -1; // true or false
const cssDev = ['style-loader','css-loader','sass-loader'];
const cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: ['css-loader','sass-loader']
})

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
	entry: {
		app: './src/app.js',
		contact: './src/contact.js',

	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				// use: ExtractTextPlugin.extract({
				// 	fallback: 'style-loader',
				// 	use: ['css-loader', 'sass-loader']
				// })
				use: cssConfig
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: 'pug-html-loader'
			},
			{
		        test: /\.(jpe?g|png|gif|svg)$/i,
		        use: [
   					'file-loader?name=img/[name].[ext]',
   					// 'file-loader?name=[name].[ext]&outputPath=img/&publicPath=img/',
			        {
				      loader: 'image-webpack-loader',
				      options: {}
				    }
				]    
	      	}﻿
		]
	},
	devServer: {
		contentBase: __dirname + "/dist",
  		compress: true,
  		hot: true,
  		stats: 'errors-only' // Show only errors
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Project Demo',
			hash: true,
			template: './src/index.html' // Load a custom template 
		}),
		new HtmlWebpackPlugin({
			title: 'Contact Page',
			hash: true,
			filename: 'contact.html',
			template: './src/contact.html' 
		}),
		new ExtractTextPlugin({
			filename: 'style.css',
			disable: !isProd
		}),
		
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NamedModulesPlugin()
	]
}
