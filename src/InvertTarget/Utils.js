/* globals YED: false */

(function($InvertTarget) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $InvertTarget.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.InvertTarget
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf  YED.InvertTarget.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.InvertTarget.Utils
     */
    Utils.processParameters = function() {
        var parameters = PluginManager.parameters('YED_InvertTarget'),
            result     = Utils.parameters;

        result['Invert Keys (Keyboard)'] =
            parameters['Invert Keys (Keyboard)'].split(' ');

        result['Invert Keys (Gamepad)'] =
            parameters['Invert Keys (Gamepad)'].split(' ');
    };

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.InvertTarget.Utils
     */
    Utils.processNotetags = function() {
        var group = $dataSkills,    // shorten group name
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
     * @memberof YED.InvertTarget.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._invertTarget = true;
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.InvertTarget.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getInvertTarget = Utils.getInvertTarget;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.InvertTarget.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        var match;

        match = notetag.match(Regexp.NOT_INVERT);
        if (match) {
            obj._invertTarget = true;
        }
    };

    /**
     * Get invert target flag.
     *
     * @function getInvertTarget
     * @memberof YED.InvertTarget.Utils
     * @return {Boolean} Invertable!
     */
    Utils.getInvertTarget = function() {
        return !!this._invertTarget;
    };

    $InvertTarget.Utils = Utils;
}(YED.InvertTarget));
