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
