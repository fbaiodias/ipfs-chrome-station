import path from 'path'
import webpack from 'webpack'

export default {
  entry: {
    popup: [ path.join(__dirname, '../chrome/app/popup/index') ],
    background: [ path.join(__dirname, '../chrome/app/background/index') ]
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.optimize.DedupePlugin()
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compressor: {
    //     warnings: false
    //   }
    // })
  ],
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    alias: {
      http: 'stream-http',
      https: 'https-browserify'
    },
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        include: /node_modules\/(hoek|qs|wreck|boom)/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  externals: {
    net: '{}',
    fs: '{}',
    tls: '{}',
    console: '{}',
    'require-dir': '{}'
  },
  timeout: 60000
}
