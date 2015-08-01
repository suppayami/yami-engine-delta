/**
 * includes needed gulp plugins
 */

var gulp = require('gulp');

require('./tasks/build.js');
require('./tasks/jshint.js');
require('./tasks/test.js');
require('./tasks/watch.js');