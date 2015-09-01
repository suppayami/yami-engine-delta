var gulp = require('gulp');

// gulp.task('build-test', ['lint-test'], function() {
//     globby(paths.test, function(err, entries) {
//         entries.forEach(function(entry) {
//             var b = browserify({
//                 entries: entry
//             });

//             var bundledStream = through();

//             var folders = entry.split('/');
//             var path    = folders[folders.length-2]+"/"+folders[folders.length-1];

//             path = "test/" + path;

//             bundledStream.pipe(source(path)).pipe(buffer()).pipe(gulp.dest('./build/'));
//             b.bundle().pipe(bundledStream);
//         });
//     });
// });

gulp.task('build', ['lint-engine'], function() {
    gulp.start('build-retainstateondeath');
    gulp.start('build-hospital');
    gulp.start('build-skillshop');
    gulp.start('build-tilemap');
});
