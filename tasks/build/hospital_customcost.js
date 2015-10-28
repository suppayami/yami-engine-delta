var gulp   = require('gulp');
var concat = require('gulp-concat');
var utils = require('../utils');

var moduleName = 'Hospital_CustomCost';
var fileName   = ['header.js',
                  'index.js',
                  'Utils.js',
                  'loader.js',
                  'Game_Actor.js',
                  'Window_HospitalActors.js'];

var globs = utils.getGlobs(moduleName, fileName);

gulp.task('build-hospital-cc', function() {
    return gulp.src(globs)
        .pipe(concat(utils.baseModule + moduleName + '.js'))
        .pipe(gulp.dest('build/' + moduleName))
        .pipe(gulp.dest('demo/js/plugins'));
});
