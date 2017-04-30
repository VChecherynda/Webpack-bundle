const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/app.js',
	output: {
		path: __dirname + '/dist',
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	devServer: {
		contentBase: __dirname + './dist',
  		compress: true,
  		stats: 'errors-only',
  		open: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Project Demo',
			hash: true,
			template: './src/index.ejs'
		}),
		new ExtractTextPlugin('style.css')
	]
}
