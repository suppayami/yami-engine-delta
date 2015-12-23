/* globals YED: false */

(function($AuraState) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $AuraState.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.AuraState
     */
    var Utils = {};

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.AuraState.Utils
     */
    Utils.processNotetags = function() {
        var group = $dataStates,    // shorten group name
            obj,
            notedata, line;

        for (var i = 1; i < group.length; i++) {
            obj = group[i];
            notedata = obj.note.split(/[\r\n]+/);

            Utils._processProperties.call(this, obj);
            Utils._processMethods.call(this, obj);

            for (var n = 0; n < notedata.length; n++) {
                line = notedata[n];
                Utils._processNotetag.call(this, obj, line);
            }
        }
    };

    /**
     * Add new properties into object.
     *
     * @function _processProperties
     * @memberof YED.AuraState.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._auraState = {};

        obj._auraState.allies = [];
        obj._auraState.enemies = [];
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.AuraState.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getAuraState = Utils.getAuraState;
        obj.isAuraState = Utils.isAuraState;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.AuraState.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        var match;

        match = notetag.match(Regexp.ALLIES_AURA);
        if (match) {
            obj._auraState.allies.push(Number(match[1]));
        }

        match = notetag.match(Regexp.ENEMIES_AURA);
        if (match) {
            obj._auraState.enemies.push(Number(match[1]));
        }
    };

    /**
     * Get aura state infos.
     *
     * @function getAuraState
     * @memberof YED.AuraState.Utils
     * @return {Object}
     */
    Utils.getAuraState = function() {
        return this._auraState;
    };

    /**
     * Get aura state flag.
     *
     * @function isAuraState
     * @memberof YED.AuraState.Utils
     * @return {Boolean}
     */
    Utils.isAuraState = function() {
        return this._auraState.allies.length > 0
            || this._auraState.enemies.length > 0;
    };

    $AuraState.Utils = Utils;
}(YED.AuraState));
