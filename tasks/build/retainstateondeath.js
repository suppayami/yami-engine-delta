var gulp   = require('gulp');
var concat = require('gulp-concat');
var utils = require('../utils');

var moduleName = 'RetainStatesOnDeath';
var fileName   = ['header.js',
                  'index.js',
                  'Regexp.js',
                  'Utils.js',
                  'loader.js',
                  'Game_Actor.js'];

var globs = utils.getGlobs(moduleName, fileName);

gulp.task('build-retainstateondeath', function() {
    return gulp.src(globs)
        .pipe(concat(moduleName + '.js'))
        .pipe(gulp.dest('build/' + moduleName))
        .pipe(gulp.dest('demo/js/plugins'));
});