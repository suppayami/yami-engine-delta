(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    var _Game_Actor_initialize = Game_Actor.prototype.initialize;
    var _Game_Actor_die = Game_Actor.prototype.die;

    /**
     * Extending: Game_Actor.prototype.initialize
     *
     * Add setup retain state on death for Game_Actor.
     */
    Game_Actor.prototype.initialize = function(actorId) {
        // actual initialize
        _Game_Actor_initialize.call(this, actorId);

        // setup retain states on death
        this.setupRetainStateOnDeath();
    };

    /**
     * Setup retain state on death for Game Actor
     *
     * @function external:Game_Actor#setupRetainStateOnDeath
     */
    Game_Actor.prototype.setupRetainStateOnDeath = function() {
        this._retainStateOnDeath = [];
    };

    /**
     * Extending: Game_Actor.prototype.die
     *
     * Add store and restore states methods.
     */
    Game_Actor.prototype.die = function() {
        // store states
        this.storeRetainStateOnDeath();

        // actual die
        _Game_Actor_die.call(this);

        // restore states
        this.restoreRetainStateOnDeath();

        console.log(this.states());
    };

    /**
     * Store current states that need to be retained on death.
     *
     * @function external:Game_Actor#storeRetainStateOnDeath
     */
    Game_Actor.prototype.storeRetainStateOnDeath = function() {
        var state,      // for iterator
            storeData,  // data hash
            states = this.states();

        for (var i = 0; i < states.length; i++) {
            state = states[i];

            if (state.isRetainStateOnDeath()) {
                storeData = {};
                storeData.id   = state.id;
                storeData.turn = this._stateTurns[state.id];
                storeData.step = this._stateSteps[state.id];

                this._retainStateOnDeath.push(storeData);
            }
        }
    };

    /**
     * Restore the retained on death states.
     *
     * @function external:Game_Actor#restoreRetainStateOnDeath
     */
    Game_Actor.prototype.restoreRetainStateOnDeath = function() {
        var storeData; // data hash

        for (var i = 0; i < this._retainStateOnDeath.length; i++) {
            storeData = this._retainStateOnDeath[i];

            this.addNewState(storeData.id);
            this._stateTurns[storeData.id] = storeData.turn;
            this._stateSteps[storeData.id] = storeData.step;
        }

        this._retainStateOnDeath = [];
    };
}());
},{}],2:[function(require,module,exports){
/**
 * Enum for RegExp, used to notetags
 *
 * @readonly
 * @enum {RegExp}
 * @memberof YED.RetainStateOnDeath
 */
var Regexp = {
    /**
     * Retain on death notetag for state
     */
    RETAIN: /<(?:retain on death)>/i
};

// exports
module.exports = Regexp;
},{}],3:[function(require,module,exports){
// requires
var Regexp = require('./Regexp');

/**
 * Contains utility tools for module.
 *
 * @namespace Utils
 * @memberof YED.RetainStateOnDeath
 */
var Utils = {};

/**
 * Process notetag function.
 * Should be called with DataManager as current object.
 *
 * @function processNotetag
 * @memberof YED.RetainStateOnDeath.Utils
 */
Utils.processNotetag = function() {
    var group = $dataStates,    // shorten group name
        obj,                    // for iterator
        notedata,               // for iterator
        line;                   // for iterator

    for (var i = 1; i < group.length; i++) {
        obj = group[i];
        notedata = obj.note.split(/[\r\n]+/);

        // add methods
        obj.isRetainStateOnDeath = Utils.isRetainStateOnDeath;

        // parse notetag
        for (var n = 0; n < notedata.length; n++) {
            line = notedata[n];

            if (line.match(Regexp.RETAIN)) {
                obj._retainStateOnDeath = true;
            }
        }
    }
};

/**
 * Check if the state is retained on death.
 * Should be attached to state object.
 *
 * @function isRetainStateOnDeath
 * @memberof YED.RetainStateOnDeath.Utils
 * @return {Boolean} Retain flag
 */
Utils.isRetainStateOnDeath = function() {
    return !!this._retainStateOnDeath;
};

module.exports = Utils;
},{"./Regexp":2}],4:[function(require,module,exports){
/*:
 * Yami Engine Delta - Retain States On Death
 *
 * @plugindesc Makes some kinds of state to be retained on actors
 * even when they die.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @help
 * Place this under any kind of core plugin.
 * There is no Configuration and Plugin Command.
 *
 * ============================================================================
 *
 * States
 * To make a state to be retained on death, use the following notetag:
 *   <retain on death>
 *
 * ============================================================================
 */

/**
 * @namespace RetainStateOnDeath
 * @memberof YED
 */

var YED = YED || {};

// init Tilemap module
YED.RetainStateOnDeath = {
    Regexp: require('./Regexp'),
    Utils:  require('./Utils')
};

require('./loader');
require('./Game_Actor');
},{"./Game_Actor":1,"./Regexp":2,"./Utils":3,"./loader":5}],5:[function(require,module,exports){
// requires
var Utils = require('./Utils');

/**
 * Pre-processes and notetag parsing
 */
(function() {
    // Aliasing: Scene_Boot.start
    var _Scene_Boot_start = Scene_Boot.prototype.start;

    /**
     * Extending: Scene_Boot.prototype.start
     *
     * Add notetags processing for module.
     */
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);

        Utils.processNotetag.call(DataManager);
    };
}());
},{"./Utils":3}]},{},[4]);
