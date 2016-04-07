var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var stylish = require('jshint-stylish');
var path = require('path');

var jsfiles = ['lib/**/*.js'];

gulp.task('lint', function() {
  return gulp.src(jsfiles)
    .pipe(jshint())
    .pipe(jscs())
    .pipe(jshint.reporter(stylish))
    .pipe(jscs.reporter());
});

gulp.task('test', function() {
  return gulp.src(path.join(__dirname, 'test', 'index.js'), { read: false })
    .pipe(mocha());
});

gulp.task('default', ['lint', 'test']);
