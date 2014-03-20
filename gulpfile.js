var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
  gulp.src(['jquery.bootstrap-chooser.js', 'gulpfile.js', 'tests/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});
