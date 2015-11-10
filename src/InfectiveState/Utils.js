/* globals YED: false */

(function($InfectiveState) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $InfectiveState.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.InfectiveState
     */
    var Utils = {};

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.InfectiveState.Utils
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
     * @memberof YED.InfectiveState.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._infectiveState = [];
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.InfectiveState.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getInfectiveState = Utils.getInfectiveState;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.InfectiveState.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        var match,
            infective;

        match = notetag.match(Regexp.INFECT_ALLIES);
        if (match) {
            infective = {};

            infective.target = "allies";
            infective.number = "all";
            infective.stateId = Number(match[1]);
            infective.turns = Number(match[2]);
            infective.chance = Number(match[3]);

            obj._infectiveState.push(infective);
        }

        match = notetag.match(Regexp.INFECT_ENEMIES);
        if (match) {
            infective = {};

            infective.target = "enemies";
            infective.number = "all";
            infective.stateId = Number(match[1]);
            infective.turns = Number(match[2]);
            infective.chance = Number(match[3]);

            obj._infectiveState.push(infective);
        }

        match = notetag.match(Regexp.INFECT_X_ALLIES);
        if (match) {
            infective = {};

            infective.target = "allies";
            infective.number = Number(match[1]);
            infective.stateId = Number(match[2]);
            infective.turns = Number(match[3]);
            infective.chance = Number(match[4]);

            obj._infectiveState.push(infective);
        }

        match = notetag.match(Regexp.INFECT_X_ENEMIES);
        if (match) {
            infective = {};

            infective.target = "enemies";
            infective.number = Number(match[1]);
            infective.stateId = Number(match[2]);
            infective.turns = Number(match[3]);
            infective.chance = Number(match[4]);

            obj._infectiveState.push(infective);
        }

        match = notetag.match(Regexp.INFECT_X_RANDOM);
        if (match) {
            infective = {};

            infective.target = "all";
            infective.number = Number(match[1]);
            infective.stateId = Number(match[2]);
            infective.turns = Number(match[3]);
            infective.chance = Number(match[4]);

            obj._infectiveState.push(infective);
        }
    };

    /**
     * Get infective information.
     * Should be attached to state object.
     *
     * @function getInfectiveState
     * @memberof YED.InfectiveState.Utils
     * @return {Object[]} Infective Infos
     */
    Utils.getInfectiveState = function() {
        return this._infectiveState;
    };

    $InfectiveState.Utils = Utils;
}(YED.InfectiveState));
