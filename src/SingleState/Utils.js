/* globals YED: false */

(function($SingleState) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $SingleState.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.SingleState
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf  YED.SingleState.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.SingleState.Utils
     */
    Utils.processParameters = function() {
        var parameters = PluginManager.parameters('YED_SingleState'),
            result     = Utils.parameters;

        result['Replace State'] =
            eval(parameters['Replace State'].toLowerCase());
    };

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.SingleState.Utils
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
     * @memberof YED.SingleState.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._notSingleState = false;
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.SingleState.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getNotSingleState = Utils.getNotSingleState;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.SingleState.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        var match;

        match = notetag.match(Regexp.NOT_SINGLE);
        if (match) {
            obj._notSingleState = true;
        }
    };

    /**
     * Get not single state flag.
     *
     * @function getNotSingleState
     * @memberof YED.SingleState.Utils
     * @return {Boolean} Single State?!
     */
    Utils.getNotSingleState = function() {
        return !!this._notSingleState;
    };

    $SingleState.Utils = Utils;
}(YED.SingleState));
