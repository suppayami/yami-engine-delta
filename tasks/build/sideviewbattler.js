var gulp   = require('gulp');
var concat = require('gulp-concat');
var utils = require('../utils');

var moduleName = 'SideviewBattler';
var fileName   = ['header.js',
                  'index.js',
                  'Regexp.js',
                  'Utils.js',
                  'loader.js',
                  'BattleManager.js',
                  'Game_Battler.js',
                  'Game_Actor.js',
                  'Game_Enemy.js',
                  'Sprite_Actor.js',
                  'Sprite_Enemy.js',
                  'Game_Party.js'];

var globs = utils.getGlobs(moduleName, fileName);

gulp.task('make:sideview-battler', function() {
    return gulp.src(globs)
        .pipe(concat(utils.baseModule + moduleName + '.js'))
        .pipe(gulp.dest('build/' + moduleName))
        .pipe(gulp.dest('demo/js/plugins'));
});
