var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var globby = require('globby');
var through = require('through2');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var paths = require('./paths.js');

gulp.task('build-test', ['lint-test'], function() {
    globby(paths.test, function(err, entries) {
        entries.forEach(function(entry) {
            var b = browserify({
                entries: entry
            });

            var bundledStream = through();

            var folders = entry.split('/');
            var path    = folders[folders.length-2]+"/"+folders[folders.length-1];

            path = "test/" + path;

            bundledStream.pipe(source(path)).pipe(buffer()).pipe(gulp.dest('./build/'));
            b.bundle().pipe(bundledStream);
        });
    });
});

gulp.task('build', ['lint-engine'], function() {
    globby(paths.scripts, function(err, entries) {
        entries.forEach(function(entry) {
            var b = browserify({
                entries: entry
            });

            var bundledStream = through();

            var folders = entry.split('/');
            var path    = folders[folders.length-2]+".js";
            var dest    = './build/' + folders[folders.length-2]+"/"
            var demo    = './demo/js/plugins/'

            bundledStream.pipe(source(path))
                .pipe(buffer())
                .pipe(gulp.dest(dest))
                .pipe(gulp.dest(demo));

            b.bundle().pipe(bundledStream);
        });
    });
});