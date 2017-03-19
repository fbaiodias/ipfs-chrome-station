import 'babel-polyfill'
import fs from 'fs'
import gulp from 'gulp'
import merge from 'merge-stream'
import gutil from 'gulp-util'
import pug from 'gulp-pug'
import rename from 'gulp-rename'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import prodConfig from './webpack/prod.config'
import devConfig from './webpack/dev.config'

const port = 3000

/*
 * common tasks
 */
gulp.task('replace-webpack-code', () => {
  const replaceTasks = [ {
    from: './webpack/replace/JsonpMainTemplate.runtime.js',
    to: './node_modules/webpack/lib/JsonpMainTemplate.runtime.js'
  }, {
    from: './webpack/replace/log-apply-result.js',
    to: './node_modules/webpack/hot/log-apply-result.js'
  } ]
  replaceTasks.forEach(task => fs.writeFileSync(task.to, fs.readFileSync(task.from)))
})

/*
 * dev tasks
 */

gulp.task('webpack-dev-server', () => {
  let myConfig = Object.create(devConfig)
  new WebpackDevServer(webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('Please load the unpacked extension with `./dev` folder.\n  (see https://developer.chrome.com/extensions/getstarted#unpacked)')
  }), {
    publicPath: myConfig.output.publicPath,
    stats: {colors: true},
    noInfo: true,
    hot: true,
    historyApiFallback: true
    // https: true
  }).listen(port, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', `listening at port ${port}`)
  })
})

gulp.task('views:dev', () => {
  return gulp.src('./chrome/views/*.pug')
    .pipe(pug({
      locals: {
        env: 'dev',
        devToolsExt: !!process.env.DEVTOOLS_EXT || true
      }
    }))
    .pipe(gulp.dest('./dev'))
})

gulp.task('copy:dev', () => {
  const manifest = gulp.src('./chrome/manifest.dev.json')
    .pipe(rename('manifest.json'))
    .pipe(gulp.dest('./dev'))
  const assets = gulp.src('./chrome/assets/**/*').pipe(gulp.dest('./dev'))
  return merge(manifest, assets)
})

/*
 * build tasks
 */

gulp.task('webpack:build', (callback) => {
  let myConfig = Object.create(prodConfig)
  webpack(myConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err)
    }
    gutil.log('[webpack:build]', stats.toString({ colors: true }))
    callback()
  })
})

gulp.task('views:build', () => {
  return gulp.src('./chrome/views/*.pug')
    .pipe(pug({
      locals: { env: 'prod' }
    }))
    .pipe(gulp.dest('./build'))
})

gulp.task('copy:build', () => {
  const manifest = gulp.src('./chrome/manifest.prod.json')
    .pipe(rename('manifest.json'))
    .pipe(gulp.dest('./build'))
  const assets = gulp.src('./chrome/assets/**/*').pipe(gulp.dest('./build'))
  return merge(manifest, assets)
})

gulp.task('default', [ 'replace-webpack-code', 'webpack-dev-server', 'views:dev', 'copy:dev' ])
gulp.task('build', [ 'replace-webpack-code', 'webpack:build', 'views:build', 'copy:build' ])
