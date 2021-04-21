const path = require('path');
module.exports = {
	devServer: {
		writeToDisk: true,
	},

	entry: './src/index.js',
	output: {
			path: path.resolve('./dist/neon'),
			filename: 'main.js'
	},

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
        }
        
			]
	}
};
