/*:
 * Yami Engine Delta - Aura State
 *
 * @plugindesc v1.0.0 This plugin allows user to create an aura where nearby battlers will receive states based on the aura.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @help
 * States Notetags
 *
 * <Allies State Aura: X>
 * This aura will add state X to all allies.
 *
 * <Enemies State Aura: X>
 * This aura will add state X to all enemies.
 */

/**
 * @namespace AuraState
 * @memberof YED
 */

var YED = YED || {};

// init AuraState module
YED.AuraState = {};

/* globals YED: false */

(function($AuraState) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.AuraState
     */
    var Regexp = {
        /**
         * Aura for allies
         */
        ALLIES_AURA: /<Allies State Aura:[ ]*(\d+)>/i,

        /**
         * Aura for enemies
         */
        ENEMIES_AURA: /<Enemies State Aura:[ ]*(\d+)>/i
    };

    $AuraState.Regexp = Regexp;
}(YED.AuraState));

/* globals YED: false */

(function($AuraState) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $AuraState.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.AuraState
     */
    var Utils = {};

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.AuraState.Utils
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
     * @memberof YED.AuraState.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._auraState = {};

        obj._auraState.allies = [];
        obj._auraState.enemies = [];
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.AuraState.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getAuraState = Utils.getAuraState;
        obj.isAuraState = Utils.isAuraState;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.AuraState.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        var match;

        match = notetag.match(Regexp.ALLIES_AURA);
        if (match) {
            obj._auraState.allies.push(Number(match[1]));
        }

        match = notetag.match(Regexp.ENEMIES_AURA);
        if (match) {
            obj._auraState.enemies.push(Number(match[1]));
        }
    };

    /**
     * Get aura state infos.
     *
     * @function getAuraState
     * @memberof YED.AuraState.Utils
     * @return {Object}
     */
    Utils.getAuraState = function() {
        return this._auraState;
    };

    /**
     * Get aura state flag.
     *
     * @function isAuraState
     * @memberof YED.AuraState.Utils
     * @return {Boolean}
     */
    Utils.isAuraState = function() {
        return this._auraState.allies.length > 0
            || this._auraState.enemies.length > 0;
    };

    $AuraState.Utils = Utils;
}(YED.AuraState));

/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function($AuraState) {
    /**
     * Shorten Dependencies
     */
    var Utils = $AuraState.Utils;

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

        Utils.processNotetags.call(DataManager);

        return true;
    };
}(YED.AuraState));

(function() {
    /**
     * Aliasing methods
     */
    var _Game_Battler_initMembers
        = Game_Battler.prototype.initMembers;
    var _Game_Battler_refresh
        = Game_Battler.prototype.refresh;

    Game_Battler.prototype.initMembers = function() {
        _Game_Battler_initMembers.call(this);

        this._auraStates = [];
    };

    Game_Battler.prototype.auraStates = function() {
        return this._auraStates.map(function(id) {
            return $dataStates[id];
        });
    };

    Game_Battler.prototype.updateAuraState = function() {
        this._updateInactiveAura();
        this._updateActiveAura();
    };

    Game_Battler.prototype._updateInactiveAura = function() {
        var state,
            ids = [],
            index,
            alliesAura, enemiesAura,
            i;

        var removeStateParty = function(id) {
            $gameParty.members().forEach(function(actor) {
                actor.removeState(id);
            });
        };

        var removeStateTroop = function(id) {
            $gameTroop.members().forEach(function(enemy) {
                enemy.removeState(id);
            });
        };

        for (i = 0; i < this._auraStates.length; i++) {
            if (this.isStateAffected(this._auraStates[i])) {
                continue;
            }

            state = $dataStates[this._auraStates[i]];

            alliesAura = state.getAuraState().allies;
            enemiesAura = state.getAuraState().enemies;

            alliesAura.forEach(removeStateParty);
            enemiesAura.forEach(removeStateTroop);

            ids.push(this._auraStates[i]);
        }

        for (i = 0; i < ids.length; i++) {
            index = this._auraStates.indexOf(ids[i]);

            if (index > -1) {
                this._auraStates.splice(index, 1);
            }
        }
    };

    Game_Battler.prototype._updateActiveAura = function() {
        var states = this.states(),
            alliesAura, enemiesAura,
            state;

        var addStateParty = function(id) {
            $gameParty.members().forEach(function(actor) {
                actor.addState(id);
            });
        };

        var addStateTroop = function(id) {
            $gameTroop.members().forEach(function(enemy) {
                enemy.addState(id);
            });
        };

        for (var i = 0; i < states.length; i++) {
            if (!states[i].isAuraState()) {
                continue;
            }

            if (this._auraStates.indexOf(states[i].id) > -1) {
                continue;
            }

            this._auraStates.push(states[i].id);

            state = states[i];

            alliesAura = state.getAuraState().allies;
            enemiesAura = state.getAuraState().enemies;

            alliesAura.forEach(addStateParty);
            enemiesAura.forEach(addStateTroop);
        }
    };

    Game_Battler.prototype.refresh = function() {
        _Game_Battler_refresh.call(this);

        $gameParty.members().forEach(function(actor) {
            actor.updateAuraState();
        });

        $gameTroop.members().forEach(function(enemy) {
            enemy.updateAuraState();
        });
    };
}());
