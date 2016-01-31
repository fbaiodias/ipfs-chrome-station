import path from 'path'
import webpack from 'webpack'

const port = 3000
const entry = [
  `webpack-dev-server/client?http://localhost:${port}`,
  'webpack/hot/only-dev-server'
]

export default {
  devtool: 'eval-cheap-module-source-map',
  entry: {
    popup: [ path.join(__dirname, '../chrome/app/popup/index'), ...entry ],
    background: [ path.join(__dirname, '../chrome/app/background/index'), ...entry ]
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: `http://localhost:${port}/js/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      'process.env': {
        DEVTOOLS: !!process.env.DEVTOOLS || true,
        DEVTOOLS_EXT: !!process.env.DEVTOOLS_EXT
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: [ 'react-hmre' ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
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
    fs: '{}',
    net: '{}',
    tls: '{}',
    'require-dir': '{}'
  },
  node: {
    Buffer: true
  }
}
