var gulp   = require('gulp');
var concat = require('gulp-concat');
var utils = require('../utils');

var moduleName = 'Hospital';
var fileName   = ['header.js',
                  'index.js',
                  'Regexp.js',
                  'Utils.js',
                  'loader.js',
                  'Game_Actor.js',
                  'Game_Party.js',
                  'Window_HospitalActors.js',
                  'Window_HospitalNurse.js',
                  'Window_HospitalCommand.js',
                  'Window_HospitalHelp.js',
                  'Scene_Hospital.js',
                  'Game_Interpreter.js'];

var globs = utils.getGlobs(moduleName, fileName);

gulp.task('build-hospital', function() {
    return gulp.src(globs)
        .pipe(concat(utils.baseModule + moduleName + '.js'))
        .pipe(gulp.dest('build/' + moduleName))
        .pipe(gulp.dest('demo/js/plugins'));
});
