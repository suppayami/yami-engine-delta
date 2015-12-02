/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function($EnemyPosition) {
    /**
     * Shorten Dependencies
     */
    var Utils = $EnemyPosition.Utils;

    /**
     * Aliasing methods
     */
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;

    /**
     * Extending: DataManager.isDatabaseLoaded
     *
     * Add notetags and parameters processing for module.
     */
    DataManager.isDatabaseLoaded = function() {
        var loaded = _DataManager_isDatabaseLoaded.call(this);

        if (!loaded) {
            return false;
        }

        Utils.processNotetags.call(DataManager);

        return true;
    };
}(YED.EnemyPosition));
