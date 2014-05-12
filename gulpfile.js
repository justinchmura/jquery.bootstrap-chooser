'use strict';

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var header = require('gulp-header');
var qunit = require('gulp-qunit');

var pkg = require('./package.json');
var scripts = ['./*.js'];
var css = ['./*.css'];
var build = './build';

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
''].join('\n');

gulp.task('jslint', function () {
  gulp.src(scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jsmin', ['jslint'], function () {
  gulp.src(['jquery.bootstrap-chooser.js'])
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(build));
});

gulp.task('csslint', function () {
  gulp.src(css).pipe(csslint());
});

gulp.task('cssmin', function () {
  gulp.src(['jquery.bootstrap-chooser.css'])
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssmin())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(build));
});

gulp.task('build', ['jsmin', 'cssmin'], function () {
  
});

gulp.task('test', function () {
});

gulp.task('default', ['jslint', 'csslint', 'test']);
