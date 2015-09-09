/**
 * includes needed gulp plugins
 */

var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./tasks/build');

require('./tasks/build.js');
require('./tasks/jshint.js');
// require('./tasks/test.js');
require('./tasks/watch.js');