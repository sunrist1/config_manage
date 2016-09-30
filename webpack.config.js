var path = require('path');
var webpack = require("webpack");

module.exports = {
	entry:path.resolve(__dirname,'app/app.js'),
	output:{
		path:path.resolve(__dirname,'build'),
		filename:'bundle.js'
	},
	resolve: {
    alias: {
      jquery: "jquery/src/jquery"
    }
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
    })
  ]
}