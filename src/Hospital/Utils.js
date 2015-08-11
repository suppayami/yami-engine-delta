/* globals YED: false */

(function() {
    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.Hospital
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf  YED.Hospital.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.Hospital.Utils
     */
    Utils.processParameters = function() {
        var parameters   = PluginManager.parameters('YED_Hospital'),
            result       = Utils.parameters,
            nurseFaceStr = String(parameters['Nurse Face'] || 'People4, 1'),
            nurseFace    = [];

        nurseFace = nurseFaceStr.split(',');

        result['HP Price'] =
            Number(parameters['HP Price'] || 0);
        result['MP Price'] =
            Number(parameters['MP Price'] || 0);
        result['State Price'] =
            Number(parameters['State Price'] || 0);

        result['Nurse Face'] =
            [nurseFace[0], Number(nurseFace[1])];
        result['Nurse Name'] =
            String(parameters['Nurse Name'] || 'Nurse');
        result['Nurse Message'] =
            String(parameters['Nurse Message'] || 'Hello!');

        result['Heal One Help'] =
            String(parameters['Heal One Help'] || '');
        result['Heal All Help (Treat)'] = //
            String(parameters['Heal All Help (Treat)'] || '');
        result['Heal All Help (Healthy)'] = //
            String(parameters['Heal All Help (Healthy)'] || '');
        result['Exit Help'] =
            String(parameters['Exit Help'] || '');

        result['Actor Help (Treat)'] =
            String(parameters['Actor Help (Treat)'] || '');
        result['Actor Help (Healthy)'] =
            String(parameters['Actor Help (Healthy)'] || '');

        result['Heal One Command'] =
            String(parameters['Heal One Command'] || 'Heal One');
        result['Heal All Command'] =
            String(parameters['Heal All Command'] || 'Heal All');
        result['Exit Command'] =
            String(parameters['Exit Command'] || 'Exit');

        result['Text Alignment'] =
            String(parameters['Text Alignment'] || 'center');
        result['Text Alignment'] = result['Text Alignment'].toLowerCase();
    };

    /**
     * Go to Hospital Scene.
     * Should be called with Game_Interpreter object as current object.
     *
     * @function gotoHospitalScene
     * @memberof YED.Hospital.Utils
     */
    Utils.gotoHospitalScene = function() {
        var scene = YED.Hospital.Scene_Hospital;

        SceneManager.push(scene);
    };

    YED.Hospital.Utils = Utils;
}());
