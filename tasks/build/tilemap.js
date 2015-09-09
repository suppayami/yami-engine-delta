var gulp   = require('gulp');
var concat = require('gulp-concat');
var utils = require('../utils');

var moduleName = 'Tilemap';
var fileName   = ['header.js',
                  'index.js',
                  'ImageManager.js',
                  'Data.js',
                  'Tileset.js',
                  'Layer.js',
                  'Core.js',
                  'bootstrap.js'];

var globs = utils.getGlobs(moduleName, fileName);

gulp.task('build-tilemap', function() {
    return gulp.src(globs)
        .pipe(concat(utils.baseModule + moduleName + '.js'))
        .pipe(gulp.dest('build/' + moduleName))
        .pipe(gulp.dest('demo/js/plugins'));
});
