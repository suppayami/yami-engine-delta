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
