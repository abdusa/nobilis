import gulp from 'gulp'
import pug from 'gulp-pug'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'
import changed from 'gulp-changed'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import eslint from 'gulp-eslint'
const browserSync = require('browser-sync').create()


// Pug Compile
gulp.task('pug', () => {
  return gulp.src('./src/views/index.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('public'))
})

// SASS Compile
gulp.task('sass', () => {
  return gulp.src('./src/styles/styles.sass')
    .pipe(plumber())
    .pipe(sass({
      precision: 4,
      includePaths: ['./src/styles/', './src/modules/'],
      outputStyle: 'expanded',
      indentWidth: 4,
    }))
    .pipe(postcss([autoprefixer({
      browsers: [
        "last 3 versions",
      ]
    })]))
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(browserSync.stream())
})

// browser Sync
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'public',
      index: 'index.html'
    },
    files: [
      'public/index.html',
      'public/assets/css/styles.css',
      'public/assets/js/main.js',
      'public/assets/img/**/*.{jpg, jpeg, png, gif, webp}'
    ],
    open: 'local',
    notify: false,
    injectChanges: true,
  })
})

// Handle vanilla javascript
gulp.task('js', () => {
  return gulp.src('src/scripts/main.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(changed('public/assets/js/main.js'))
    .pipe(gulp.dest('public/assets/js/'))
})

// Reloading browser if views changed
gulp.task('reload', () => {browserSync.reload()})

// Serve files
gulp.task('serve', ['pug', 'sass', 'browserSync'], () => {
  gulp.watch('./src/views/**/*.{jade,pug}', ['pug'])
  gulp.watch(['styles/**/*.{scss,sass}', 'modules/**/*.{scss,sass}'], {cwd: 'src'}, ['sass'])
  gulp.watch('./src/scripts/main.js', ['js'])
})