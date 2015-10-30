var gulp   = require('gulp');
var concat = require('gulp-concat');
var utils = require('../utils');

var moduleName = 'SkillShop';
var fileName   = ['header.js',
                  'index.js',
                  'Regexp.js',
                  'Utils.js',
                  'loader.js',
                  'Game_Actor.js',
                  'Window_SkillShopCommand.js',
                  'Window_SkillShopActors.js',
                  'Window_SkillShopSkills.js',
                  'Window_SkillShopCosts.js',
                  'Window_SkillShopGold.js',
                  'Scene_SkillShop.js',
                  'Game_Interpreter.js'];

var globs = utils.getGlobs(moduleName, fileName);

gulp.task('build-skillshop', function() {
    return gulp.src(globs)
        .pipe(concat(utils.baseModule + moduleName + '.js'))
        .pipe(gulp.dest('build/' + moduleName))
        .pipe(gulp.dest('demo/js/plugins'));
});
