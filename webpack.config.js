const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	devServer: {
		writeToDisk: true,
	},
	entry: './src/index.js',
	output: {
			path: path.resolve('./dist/neon'),
			filename: 'main.js'
	},
	plugins: [
		new CopyPlugin({
      patterns: [
        { from: "./index.html", to: "." },
      ],
    }),
	],
	module: {
			rules: [
					{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
					{
						// look for .css or .scss files
						test: /\.(css|scss)$/,
						// in the `src` directory
						use: [
							{
								loader: 'style-loader',
							},
							{
								loader: 'css-loader',
								options: {
									importLoaders: 1,
								},
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
								},
							},
						],
					},
          {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          },
		  {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			use: [
			  {
				loader: 'file-loader',
				options: {
				  name: '[name].[ext]',
				  outputPath: 'fonts/'
				}
			  }
			]
		  }
			]
	}
};
