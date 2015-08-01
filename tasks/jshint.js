var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint-engine', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint-test', function() {
    return gulp.src('test/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});