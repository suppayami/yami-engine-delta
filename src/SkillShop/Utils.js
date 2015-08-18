/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Regexp = YED.SkillShop.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.SkillShop
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf YED.SkillShop.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.SkillShop.Utils
     */
    Utils.processParameters = function() {
        var parameters = PluginManager.parameters('YED_SkillShop'),
            result     = Utils.parameters;

        result['Default Price'] =
            Number(parameters['Default Price'] || 0);

        result['Requirements Text'] =
            String(parameters['Requirements Text'] || 'Requirements');
    };

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.SkillShop.Utils
     */
    Utils.processNotetag = function() {
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
                Utils._processProperties.call(this, obj, line);
            }
        }
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.SkillShop.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.isRetainStateOnDeath = Utils.isRetainStateOnDeath;
    };

    /**
     * Add new properties into object.
     *
     * @function _processProperties
     * @memberof YED.SkillShop.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processProperties = function(obj, notetag) {
        if (notetag.match(Regexp.RETAIN)) {
            obj._retainStateOnDeath = true;
        }
    };

    YED.SkillShop.Utils = Utils;
}());
