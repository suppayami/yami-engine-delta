/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function() {
    /**
     * Shorten Dependencies
     */
    var Utils = YED.RetainStateOnDeath.Utils;
    /**
     * Aliasing methods
     */
    var _Scene_Boot_start = Scene_Boot.prototype.start;

    /**
     * Extending: Scene_Boot.prototype.start
     *
     * Add notetags processing for module.
     */
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);

        Utils.processNotetags.call(DataManager);
    };
}());
