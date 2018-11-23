'use strict';
import babelify from 'babelify';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import concat from 'gulp-concat';
import gulp from 'gulp';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import gulpSequence from 'gulp-sequence';
import plugins from 'gulp-load-plugins';

const removeHtmlComments = require('gulp-remove-html-comments');
const replace = require('gulp-replace');
const autoprefixer = require('gulp-autoprefixer');
const inlinesource = require('gulp-inline-source');
const del = require('del');

const dirs = {
  src: './src',
  dist: './dist'
};

gulp.task('watch', function () {
  browserSync.init({
    server: `${dirs.dist}`,
    serveStaticOptions: {
      extensions: ['html']
    }
  });

  gulp.watch(`${dirs.src}/*.html`, ['html']).on('change', browserSync.reload);
  gulp.watch(`${dirs.src}/styles/**/*.scss`, ['watchCss']).on('change', browserSync.reload);
  gulp.watch(`${dirs.src}/js/**/*.js`, ['watchJs']).on('change', browserSync.reload);
});

gulp.task('watchCss', function (cb) {
  gulpSequence('clean_htmls', 'clean_css', 'app_scss', 'html')(cb);
});

gulp.task('watchJs', function (cb) {
  gulpSequence('clean_htmls', 'clean_scripts', 'scripts', 'html')(cb);
});


gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(inlinesource())
    .pipe(replace('$(', 'jQuery('))
    .pipe(replace('$', ''))
    .pipe(removeHtmlComments())
    .pipe(gulp.dest(`${dirs.dist}`));
});

gulp.task('scripts', () => {
  var _entries = [`${dirs.src}/js/main.js`];

  gulp.src(_entries)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(`${dirs.src}/js/`));


  return browserify({
    entries: `${dirs.src}/js/bundle.js`,
    debug: true,
    transform: [
      babelify.configure({
        'presets': ['es2015']
      })
    ]
  })
    .bundle()
    .on('error', function () {
      var args = Array.prototype.slice.call(arguments);
      plugins().notify.onError({
        'title': 'Compile Error',
        'message': '<%= error.message %>'
      }).apply(this, args);
      this.emit('end');
    })
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(gulp.dest(`${dirs.src}/js`))
    .pipe(browserSync.stream());
});


gulp.task('app_scss', function () {
  var _entries = [`${dirs.src}/styles/main.scss`];
  return gulp.src(_entries)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 8 versions', 'ie 9'],
      map: true
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(`${dirs.src}/styles`))
    .pipe(gulp.dest(`${dirs.dist}/styles`))
    .pipe(browserSync.stream());
});


// CLEAN
gulp.task('clean_scripts', function () {
  return del([
    `${dirs.src}/js/script.js`, `${dirs.src}/js/bundle.js`
  ]);
});

gulp.task('clean_htmls', function() {
  return del([
    `${dirs.dist}/*.html`
  ]);
});

gulp.task('clean_css', function () {
  return del([
    `${dirs.src}/styles/*.css`,
    `${dirs.dist}/styles`
  ]);
});

gulp.task('clean', function () {
  return del([
    'dist/js',
    'dist/styles',
    'src/styles/main.css',
    // we don't want to clean this file though so we negate the pattern
    //'!dist/mobile/deploy.json'
  ]);
});

gulp.task('default', function(cb) {
  gulpSequence('clean', 'app_scss', 'scripts', 'html', 'watch')(cb);
});
