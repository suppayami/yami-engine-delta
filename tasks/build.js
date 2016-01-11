var gulp = require('gulp');

gulp.task('build', ['lint-engine'], function() {
    gulp.start('build-retainstateondeath');
    gulp.start('build-hospital');
    gulp.start('build-skillshop');
    gulp.start('build-tilemap');
    gulp.start('build-luna');
    gulp.start('build-luna-battle-config');
    gulp.start('build-transferstealstates');
    gulp.start('build-wordwrap');
    gulp.start('build-hospital-cc');
    gulp.start('make:single-state');
    gulp.start('make:enemy-position');
    gulp.start('make:invert-target');
    gulp.start('make:aura-state');
    gulp.start('make:sideview-battler');
});
