var gulp   = require('gulp');
var concat = require('gulp-concat');
var utils = require('../utils');

var moduleName = 'LunaBattleConfig';
var fileName   = ['index.js',
                  'Config.js'];

var globs = utils.getGlobs(moduleName, fileName);

gulp.task('build-luna-battle-config', function() {
    return gulp.src(globs)
        .pipe(concat(utils.baseModule + moduleName + '.js'))
        .pipe(gulp.dest('build/' + moduleName))
        .pipe(gulp.dest('demo/js/plugins'));
});
