import gulp from 'gulp'
import pug from 'gulp-pug'
import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'


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
      includePaths: './src/styles/',
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('./public/assets/css/'))
})

// browser Sync
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'public',
      index: 'index.html'
    },
    open: 'local',
    notify: false
  })
})

// Reloading browser if views changed
gulp.task('reload', () => {browserSync.reload()})


// Serve files
gulp.task('serve', ['pug', 'browserSync'], () => {
    gulp.watch('src/views/index.pug', ['pug', 'reload'])
})