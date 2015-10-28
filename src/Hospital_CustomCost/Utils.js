/* globals YED: false */

(function($exports, $PluginManager) {
    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.Hospital.CustomCost
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf  YED.Hospital.CustomCost.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.Hospital.CustomCost.Utils
     */
    Utils.processParameters = function() {
        var parameters = $PluginManager.parameters('YED_Hospital_CustomCost'),
            result     = Utils.parameters;

        result['Enable Default Eval']
            = eval(parameters['Enable Default Eval']);

        result['HP Price (Eval)'] = parameters['HP Price (Eval)'];
        result['MP Price (Eval)'] = parameters['MP Price (Eval)'];
        result['State Price (Eval)'] = parameters['State Price (Eval)'];

        result['Hospital Weapon Costs']
            = eval("[" + parameters['Hospital Weapon Costs'] + "]");
        result['Hospital Armor Costs']
            = eval("[" + parameters['Hospital Armor Costs'] + "]");
        result['Hospital Item Costs']
            = eval("[" + parameters['Hospital Item Costs'] + "]");
    };

    $exports.Utils = Utils;
}(YED.Hospital.CustomCost, PluginManager));
