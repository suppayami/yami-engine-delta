var gulp   = require('gulp');
var concat = require('gulp-concat');
var utils = require('../utils');

var moduleName = 'TransferStealStates';
var fileName   = ['header.js',
                  'index.js',
                  'Regexp.js',
                  'Utils.js',
                  'loader.js',
                  'Game_Action.js'];

var globs = utils.getGlobs(moduleName, fileName);

gulp.task('build-transferstealstates', function() {
    return gulp.src(globs)
        .pipe(concat(utils.baseModule + moduleName + '.js'))
        .pipe(gulp.dest('build/' + moduleName))
        .pipe(gulp.dest('demo/js/plugins'));
});
