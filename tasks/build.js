var gulp = require('gulp');

gulp.task('build', ['lint-engine'], function() {
    gulp.start('build-retainstateondeath');
    gulp.start('build-hospital');
    gulp.start('build-skillshop');
    gulp.start('build-tilemap');
    gulp.start('build-luna');
    gulp.start('build-luna-battle-config');
    gulp.start('build-transferstealstates');
});
