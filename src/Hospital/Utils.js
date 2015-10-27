/* globals YED: false */

(function($exports, $PluginManager, $Regexp) {
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
        var parameters   = $PluginManager.parameters('YED_Hospital'),
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
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.Hospital.Utils
     */
    Utils.processNotetags = function() {
        Utils._processNotetags.call(this, $dataStates);
    };

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function _processNotetags
     * @memberof YED.Hospital.Utils
     * @param  {Object} $data Data object
     * @private
     */
    Utils._processNotetags = function($data) {
        var group = $data,
            obj,
            notedata,
            line;

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
     * @memberof YED.Hospital.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._noHospital = false;
        obj._hospitalFee = Utils.parameters['State Price'];
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.Hospital.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getNoHospital = Utils.getNoHospital;
        obj.getHospitalFee = Utils.getHospitalFee;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.Hospital.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        var match;

        match = notetag.match($Regexp.RETAIN);
        if (match) {
            obj._noHospital = true;
        }

        match = notetag.match($Regexp.STATE_COST);
        if (match) {
            obj._hospitalFee = parseInt(match[1]) || 0;
        }
    };

    /**
     * Get no hospitalizable flag.
     * Should be attached to state object.
     *
     * @function getNoHospital
     * @memberof YED.Hospital.Utils
     * @return {Boolean} No Hospitalized
     */
    Utils.getNoHospital = function() {
        return !!this._noHospital;
    };

    /**
     * Get hospital fee.
     * Should be attached to state object.
     *
     * @function getHospitalFee
     * @memberof YED.Hospital.Utils
     * @return {Number} Hospital Fee
     */
    Utils.getHospitalFee = function() {
        return this._hospitalFee;
    };

    /**
     * Go to Hospital Scene.
     * Should be called with Game_Interpreter object as current object.
     *
     * @function gotoHospitalScene
     * @memberof YED.Hospital.Utils
     */
    Utils.gotoHospitalScene = function() {
        var scene = YED.Hospital.Scenes.Hospital;

        SceneManager.push(scene);
    };

    $exports.Utils = Utils;
}(YED.Hospital, PluginManager, YED.Hospital.Regexp));
