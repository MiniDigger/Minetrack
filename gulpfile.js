var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var gif = require('gulp-if');
var stripJsonComments = require('gulp-strip-json-comments');

var inProduction = true;

gulp.task('default', function () {
    return gulp.src('servers.json')
        .pipe(stripJsonComments())
        .pipe(gulp.dest('dist'));
});

gulp.task('build-assets-css', function() {
  gulp.src('assets/css/main.css')
    .pipe(gif(inProduction, cssmin()))
    .pipe(gulp.dest('production-assets/css'));
});

gulp.task('build-assets-js', function() {
  gulp.src('assets/js/*')
    .pipe(gif(inProduction, uglify()))
    .pipe(gulp.dest('production-assets/js'));
});

gulp.task('build-assets', ['build-assets-css', 'build-assets-js']);

gulp.task('watch-app', function() {
  nodemon({
    script: 'app.js',
    ext: 'js json',
    env: {'NODE_ENV': 'development'}
  });
});
