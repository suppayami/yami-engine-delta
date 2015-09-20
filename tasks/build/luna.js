var gulp   = require('gulp');
var concat = require('gulp-concat');
var utils = require('../utils');

var moduleName = 'LunaEngine';
var fileName   = ['index.js',
                  'Battle/Config.js',
                  'Core/Sprite/GUI.js',
                  'Core/Sprite/GUIText.js',
                  'Core/Sprite/GUIFace.js',
                  'Core/Sprite/GUIImage.js',
                  'Battle/GUIBase.js',
                  'Battle/HUD.js',
                  'Battle/bootstrap.js'];

var globs = utils.getGlobs(moduleName, fileName);

gulp.task('build-luna', function() {
    return gulp.src(globs)
        .pipe(concat(utils.baseModule + moduleName + '.js'))
        .pipe(gulp.dest('build/' + moduleName))
        .pipe(gulp.dest('demo/js/plugins'));
});
