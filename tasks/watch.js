var gulp = require('gulp');

var paths = require('./paths.js');

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['build']);
});