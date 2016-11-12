var path = require('path');
var webpack = require("webpack");

module.exports = {
	entry:{
		bundle:path.resolve(__dirname,'app/app.js'),
		vendor: ['react']
	},
	output:{
		path:path.resolve(__dirname,'build'),
		// path:'../config_manager/public/page',
		filename:'bundle.js'
	},
	resolve: {
    alias: {
      jquery: "jquery/src/jquery",
    }
  },
	externals: {
    'react': 'window.React',
    'react-dom':'window.ReactDOM'
  },
	module:{
		loaders:[
			{
				test:/\.jsx?$/,
				exclude:/node_modules/,
				loader:'babel',
				query:{
					presets:['es2015','react']
				}
			},
			{
				test:/\.(png|jpg|gif)$/,
				loader:'url-loader?limit=1024'
			},
			{
				test:/\.css$/,
				loader:'style!css'
			},
			{
				test:/\.json$/,
				loader:'json'
			}
		]
	},
	plugins:[
    new webpack.ProvidePlugin({
      $:"jquery",
      jQuery:"jquery",
      "window.jQuery":"jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}