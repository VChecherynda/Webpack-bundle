const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	devServer: {
		contentBase: __dirname + "/dist",
  		compress: true,
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
		new ExtractTextPlugin('style.css')
	]
}
