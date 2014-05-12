'use strict';

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var qunit = require('gulp-qunit');

var files = ['./*.js'];

gulp.task('lint', function () {
  gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
