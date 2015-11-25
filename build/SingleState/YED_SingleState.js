/*:
 * Yami Engine Delta - Single State
 *
 * @plugindesc v1.0.0 This plugin restricts battlers to be affected by only one state.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param Replace State
 * @desc Allows replacing old state with the new one.
 * @default false
 *
 * @help
 * States Notetags
 *
 * To make state an exception, which can be added when battler has a state.
 *   <Not Single State>
 */

/**
 * @namespace SingleState
 * @memberof YED
 */

var YED = YED || {};

// init SingleState module
YED.SingleState = {};

/* globals YED: false */

(function($SingleState) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.SingleState
     */
    var Regexp = {
        /**
         * Makes state not single ~
         */
        NOT_SINGLE: /<(?:not single state)>/i
    };

    $SingleState.Regexp = Regexp;
}(YED.SingleState));

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

/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function($SingleState) {
    /**
     * Shorten Dependencies
     */
    var Utils = $SingleState.Utils;

    /**
     * Aliasing methods
     */
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;

    /**
     * Extending: DataManager.isDatabaseLoaded
     *
     * Add notetags and parameters processing for module.
     */
    DataManager.isDatabaseLoaded = function() {
        var loaded = _DataManager_isDatabaseLoaded.call(this);

        if (!loaded) {
            return false;
        }

        Utils.processParameters.call(DataManager);
        Utils.processNotetags.call(DataManager);

        return true;
    };
}(YED.SingleState));

/* globals YED: false */

(function($SingleState) {
    /**
     * Shorten Dependencies
     */
    var Utils = $SingleState.Utils;

    /**
     * Aliasing methods
     */
    var _Game_Battler_addState
        = Game_Battler.prototype.addState;
    var _Game_Battler_isStateAddable
        = Game_Battler.prototype.isStateAddable;

    Game_Battler.prototype.addState = function(stateId) {
        var replace = Utils.parameters['Replace State'],
            dead = this.isDead(),
            addable = this.isStateAddable(stateId),
            notSingle = $dataStates[stateId].getNotSingleState();

        if (!dead && addable && replace && !notSingle) {
            for (var i = 0; i < this.states().length; i++) {
                if (this.states()[i].getNotSingleState()) {
                    continue;
                }

                this.eraseState(this.states()[i].id);
                this.refresh();
            }
        }

        _Game_Battler_addState.call(this, stateId);
    };

    Game_Battler.prototype.isStateAddable = function(stateId) {
        var result = _Game_Battler_isStateAddable.call(this, stateId),
            single = true;

        if (!Utils.parameters['Replace State']) {
            single = !this.states().some(function(state) {
                return !state.getNotSingleState();
            }) || this.states().length === 0;
            single = single || $dataStates[stateId].getNotSingleState();
        }

        result = result && single;

        return result;
    };
}(YED.SingleState));
