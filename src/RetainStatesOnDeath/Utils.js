/* globals YED: false */

(function() {
    // shorten dependencies
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
    Utils.processNotetag = function() {
        var group = $dataStates,    // shorten group name
            obj,                    // for iterator
            notedata,               // for iterator
            line;                   // for iterator

        for (var i = 1; i < group.length; i++) {
            obj = group[i];
            notedata = obj.note.split(/[\r\n]+/);

            // add methods
            obj.isRetainStateOnDeath = Utils.isRetainStateOnDeath;

            // parse notetag
            for (var n = 0; n < notedata.length; n++) {
                line = notedata[n];

                if (line.match(Regexp.RETAIN)) {
                    obj._retainStateOnDeath = true;
                }
            }
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
