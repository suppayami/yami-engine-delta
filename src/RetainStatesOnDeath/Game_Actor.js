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