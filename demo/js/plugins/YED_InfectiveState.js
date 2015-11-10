/*:
 * Yami Engine Delta - Infective State
 *
 * @plugindesc v1.0.0 Make a state can be infected to nearby battlers.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @help
 * There is no Configuration and Plugin Command.
 *
 * ============================================================================
 *
 * States
 * <Infect Allies X: Y, Y%>
 * Infects all allies with state X after Y turns with a chance of Z%.
 *
 * <Infect Enemies X: Y, Y%>
 * Infects all enemies with state X after Y turns with a chance of Z%.
 *
 * <Infect N Allies X: Y, Y%>
 * Infects N allies with state X after Y turns with a chance of Z%.
 *
 * <Infect N Enemies X: Y, Y%>
 * Infects N allies with state X after Y turns with a chance of Z%.
 *
 * <Infect N Random X: Y, Y%>
 * Infects N battlers with state X after Y turns with a chance of Z%.
 *
 * ============================================================================
 */

/**
 * @namespace InfectiveState
 * @memberof YED
 */

var YED = YED || {};

// init InfectiveState module
YED.InfectiveState = {};

/* globals YED: false */

(function($InfectiveState) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.InfectiveState
     */
    var Regexp = {
        /**
         * Infect all allies
         */
        INFECT_ALLIES: /<Infect Allies (\d+):[ ]*(\d+),[ ]*(\d+)%?>/i,

        /**
         * Infect all enemies
         */
        INFECT_ENEMIES: /<Infect Enemies (\d+):[ ]*(\d+),[ ]*(\d+)%?>/i,

        /**
         * Infect X allies
         */
        INFECT_X_ALLIES: /<Infect (\d+) Allies (\d+):[ ]*(\d+),[ ]*(\d+)%?>/i,

        /**
         * Infect X enemies
         */
        INFECT_X_ENEMIES: /<Infect (\d+) Enemies (\d+):[ ]*(\d+),[ ]*(\d+)%?>/i,

        /**
         * Infect X random
         */
        INFECT_X_RANDOM: /<Infect (\d+) Random (\d+):[ ]*(\d+),[ ]*(\d+)%?>/i
    };

    $InfectiveState.Regexp = Regexp;
}(YED.InfectiveState));

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

/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function($InfectiveState) {
    /**
     * Shorten Dependencies
     */
    var Utils = $InfectiveState.Utils;

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
}(YED.InfectiveState));

(function() {
    BattleManager.displayInfectedStates = function(target) {
        this._logWindow.displayAffectedStatus(target);
    };
}());

(function() {
    /**
     * Aliasing methods
     */
    var _Game_Battler_onTurnEnd
        = Game_Battler.prototype.onTurnEnd;
    var _Game_Battler_onBattleEnd
        = Game_Battler.prototype.onBattleEnd;

    /**
     * Get all infective states on battler.
     *
     * @function external:Game_Battler#getInfectiveStates
     */
    Game_Battler.prototype.getInfectiveStates = function() {
        return this.states().filter(function(state) {
            return state.getInfectiveState().length > 0;
        });
    };

    /**
     * Get targets for state infection.
     *
     * @function external:Game_Battler#getInfectiveTargets
     */
    Game_Battler.prototype.getInfectiveTargets = function(info) {
        var targets = [];

        if (info.target === 'all') {
            targets = this.friendsUnit().members();
            targets = targets.concat(this.opponentsUnit().members());
        }

        if (info.target === 'allies') {
            targets = this.friendsUnit().members();
        }

        if (info.target === 'enemies') {
            targets = this.opponentsUnit().members();
        }

        if (targets.indexOf(this) > -1) {
            targets.splice(targets.indexOf(this), 1);
        }

        if (info.number === 'all') {
            return targets;
        }

        return targets.sort(function() {
            return Math.pow(-1, Math.floor(Math.random() * 10));
        }).slice(0, info.number);
    };

    /**
     * Correct infective states turn count.
     *
     * @function external:Game_Battler#correctInfectiveStates
     */
    Game_Battler.prototype.correctInfectiveStates = function() {
        var infectiveStates = this.getInfectiveStates(),
            infos, stateId;

        this._infectionTurns = this._infectionTurns || {};

        for (var key in this._infectionTurns) {
            if (infectiveStates.indexOf($dataStates[key]) < 0) {
                delete this._infectionTurns[key];
            }
        }

        for (var i = 0; i < infectiveStates.length; i++) {
            infos = infectiveStates[i].getInfectiveState();
            stateId = infectiveStates[i].id;

            if (!this._infectionTurns[stateId]) {
                this._infectionTurns[stateId] = {};
            }

            for (var j = 0; j < infos.length; j++) {
                if (!(j in this._infectionTurns[stateId])) {
                    this._infectionTurns[stateId][j] = infos[j].turns;
                }
            }
        }
    };

    /**
     * Update State Infections.
     *
     * @function external:Game_Battler#updateInfectiveState
     */
    Game_Battler.prototype.updateInfectiveState = function() {
        var infectiveStates = this.getInfectiveStates(),
            infos, stateId, info, targets,
            infectionTurns,
            infectFn = function(target) {
                target.addState(info.stateId);
                BattleManager.displayInfectedStates(target);
            }; // shorten

        this.correctInfectiveStates();

        if (infectiveStates.length === 0) {
            return;
        }

        infectionTurns = this._infectionTurns;

        for (var i = 0; i < infectiveStates.length; i++) {
            infos = infectiveStates[i].getInfectiveState();
            stateId = infectiveStates[i].id;

            for (var j = 0; j < infos.length; j++) {
                info = infos[j];

                infectionTurns[stateId][j] -= 1;

                if (infectionTurns[stateId][j] > 0) {
                    continue;
                }

                infectionTurns[stateId][j] = info.turns;

                if (Math.random() > (info.chance / 100)) {
                    continue;
                }

                targets = this.getInfectiveTargets(info);
                targets.forEach(infectFn);
            }
        }
    };

    /**
     * Clear all infective state turn count.
     *
     * @function external:Game_Battler#clearInfectiveState
     */
    Game_Battler.prototype.clearInfectiveState = function() {
        this._infectionTurns = {};
    };

    /**
     * Extending: Game_Battler.prototype.onTurnEnd
     *
     * Update infective states.
     */
    Game_Battler.prototype.onTurnEnd = function() {
        _Game_Battler_onTurnEnd.call(this);

        this.updateInfectiveState();
    };

    /**
     * Extending: Game_Battler.prototype.onBattleEnd
     *
     * Clear all infective state turn count.
     */
    Game_Battler.prototype.onBattleEnd = function() {
        _Game_Battler_onBattleEnd.call(this);

        this.clearInfectiveState();
    };
}());
