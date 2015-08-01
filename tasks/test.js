var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');
var watch = require('gulp-watch');

var paths = require('./paths.js');

gulp.task('test', ['lint-test', 'build-test'], function() {
    return gulp.src(['build/test/**/*[Ss]pec.js'])
        .pipe(jasmine({
            integration: true,
            vendor: ['vendor/**/*.js'],
            includeStackTrace: true,
            keepRunner: '.',
            jasmineVersion: '2.3'
        }));
});