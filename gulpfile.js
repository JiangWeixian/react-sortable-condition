const path = require('path')
const through2 = require('through2')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
const rimraf = require('rimraf')
const merge2 = require('merge2')
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const tsDefaultReporter = ts.reporter.defaultReporter()

// config
const config = require('./build/gulp.config')

function compileStylus(modules) {
  return gulp
    .src(['components/**/*.styl'])
    .pipe(
      stylus({
        import: [
          path.resolve(__dirname, 'components/style/colors.styl'),
          path.resolve(
            __dirname,
            './node_modules/@ruguoapp/antd-stylus-plugin/lib/style/themes/index.styl',
          ),
        ],
      }),
    )
    .pipe(postcss([config.postcssPlugins.autoprefixer, config.postcssPlugins.cssmodules]))
    .pipe(gulp.dest(modules === false ? config.dirs.es : config.dirs.lib))
}

function babelify(js, modules) {
  const babelConfig = config.getBabelConfig(modules)
  delete babelConfig.cacheDirectory
  let stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function z(file, encoding, next) {
      this.push(file.clone())
      next()
    }),
  )
  return stream.pipe(gulp.dest(modules === false ? config.dirs.es : config.dirs.lib))
}

function compile(modules) {
  rimraf.sync(modules !== false ? config.dirs.lib : config.dirs.es)
  const styles = compileStylus(modules)
  const assets = gulp
    .src(['./components/**/*.@(png|svg)'])
    .pipe(gulp.dest(modules === false ? config.dirs.es : config.dirs.lib))
  let error = 0
  const source = ['components/**/*.tsx', 'components/**/*.ts', 'typings/**/*.d.ts']
  // allow jsx file in src/xxx/
  if (config.tsConfig.allowJs) {
    source.unshift('components/**/*.jsx')
  }
  const tsResult = gulp.src(source).pipe(
    ts(config.tsConfig, {
      error(e) {
        tsDefaultReporter.error(e)
        error = 1
      },
      finish: tsDefaultReporter.finish,
    }),
  )

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1)
    }
  }

  tsResult.on('finish', check)
  tsResult.on('end', check)
  const tsFilesStream = babelify(tsResult.js, modules)
  const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? config.dirs.es : config.dirs.lib))
  return merge2([styles, tsFilesStream, tsd, assets])
}

gulp.task('compile-with-es', done => {
  console.log('[Parallel] Compile to es...')
  compile(false).on('finish', done)
})

gulp.task('compile-with-lib', done => {
  console.log('[Parallel] Compile to lib...')
  compile().on('finish', done)
})

gulp.task('styles', done => {
  console.log('[Parallel] Compile to style...')
  compileStylus(false).on('finish', done)
})

gulp.task('compile', gulp.series(gulp.parallel('compile-with-es', 'compile-with-lib')))
