'use strict';
import babelify from 'babelify';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import concat from 'gulp-concat';
import gulp from 'gulp';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import plugins from 'gulp-load-plugins';

const removeHtmlComments = require('gulp-remove-html-comments');
const replace = require('gulp-replace');
const autoprefixer = require('gulp-autoprefixer');
const inlinesource = require('gulp-inline-source');
const del = require('del');
const fs = require('fs')

const dirs = {
  src: './src',
  dist: './dist'
};


const html = (done) => {
  if (fs.existsSync(`${dirs.src}/js/script.js`)) {

   gulp.src('./src/*.html')
    .pipe(inlinesource())
    .pipe(replace('$(', 'jQuery('))
    .pipe(replace('$', ''))
    .pipe(removeHtmlComments())
    .pipe(gulp.dest(`${dirs.dist}`));
  } 
  done();
};

const scripts = () => {
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
};

const app_scss = () => {
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
};


// CLEAN
const clean_scripts = () => {
  if (fs.existsSync(`${dirs.src}/js/script.js`)) {
    return del([
      `${dirs.src}/js/script.js`, `${dirs.src}/js/bundle.js`
    ]);
  }
  return;
};

const clean_htmls = () => {
  return del([
    `${dirs.dist}/*.html`
  ]);
};

const clean_css = () => {
  return del([
    `${dirs.src}/styles/*.css`,
    `${dirs.dist}/styles`
  ]);
};

const clean = () => {
  return del([
    'dist/js',
    'dist/styles',
    'src/styles/main.css',
    // we don't want to clean this file though so we negate the pattern
    //'!dist/mobile/deploy.json'
  ]);
};


const watch = () => {
  browserSync.init({
    server: `${dirs.dist}`,
    serveStaticOptions: {
      extensions: ['html']
    }
  });

  let filesJs = [`${dirs.src}/js/**/*.js`, `!${dirs.src}/js/script.js`, `!${dirs.src}/js/bundle.js`];

  gulp.watch(`${dirs.src}/*.html`, gulp.series('html')).on('change', browserSync.reload);
  gulp.watch(`${dirs.src}/styles/**/*.scss`, gulp.series('clean_htmls', 'clean_css', 'app_scss', 'html')).on('change', browserSync.reload);
  gulp.watch(filesJs, gulp.series('clean_htmls', 'clean_scripts', 'scripts', 'html')).on('change', browserSync.reload);
};


gulp.task('clean_htmls', clean_htmls);
gulp.task('clean_scripts', clean_scripts);
gulp.task('clean_css', clean_css);
gulp.task('scripts', scripts);
gulp.task('html', html);
gulp.task('clean', clean);
gulp.task('watch', watch);
gulp.task('app_scss', app_scss);

gulp.task('default',  gulp.series('clean', 'app_scss', 'scripts', 'html', 'watch'));
