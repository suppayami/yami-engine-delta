/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Regexp = YED.RetainStateOnDeath.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.RetainStateOnDeath
     */
    var Utils = {};

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.RetainStateOnDeath.Utils
     */
    Utils.processNotetags = function() {
        var group = $dataStates,    // shorten group name
            obj,
            notedata,
            line;

        for (var i = 1; i < group.length; i++) {
            obj = group[i];
            notedata = obj.note.split(/[\r\n]+/);

            Utils._processMethods.call(this, obj);

            for (var n = 0; n < notedata.length; n++) {
                line = notedata[n];
                Utils._processNotetag.call(this, obj, line);
            }
        }
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.RetainStateOnDeath.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.isRetainStateOnDeath = Utils.isRetainStateOnDeath;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.RetainStateOnDeath.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        if (notetag.match(Regexp.RETAIN)) {
            obj._retainStateOnDeath = true;
        }
    };

    /**
     * Check if the state is retained on death.
     * Should be attached to state object.
     *
     * @function isRetainStateOnDeath
     * @memberof YED.RetainStateOnDeath.Utils
     * @return {Boolean} Retain flag
     */
    Utils.isRetainStateOnDeath = function() {
        return !!this._retainStateOnDeath;
    };

    YED.RetainStateOnDeath.Utils = Utils;
}());
