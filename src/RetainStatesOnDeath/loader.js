// requires
var Utils = require('./Utils');

/**
 * Pre-processes and notetag parsing
 */
(function() {
    // Aliasing: Scene_Boot.start
    var _Scene_Boot_start = Scene_Boot.prototype.start;

    /**
     * Extending: Scene_Boot.prototype.start
     *
     * Add notetags processing for module.
     */
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);

        Utils.processNotetag.call(DataManager);
    };
}());