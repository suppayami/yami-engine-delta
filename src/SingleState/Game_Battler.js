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
