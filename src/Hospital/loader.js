/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function() {
    // shorten dependencies
    var Utils = YED.Hospital.Utils;
    // Aliasing: Scene_Boot.start
    var _Scene_Boot_start = Scene_Boot.prototype.start;

    /**
     * Extending: Scene_Boot.prototype.start
     *
     * Add notetags processing for module.
     */
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);

        Utils.processParameters.call(DataManager);
    };
}());
