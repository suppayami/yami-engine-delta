(function() {
    /**
     * Aliasing methods
     */
    var _Game_Action_testApply
        = Game_Action.prototype.testApply;
    var _Game_Action_applyItemUserEffect
        = Game_Action.prototype.applyItemUserEffect;

    /**
     * Get target states in order.
     *
     * @function external:Game_Action#getOrderedStates
     */
    Game_Action.prototype.getOrderedStates = function(target, order) {
        var states = target.states();

        if (order === 'low priority'
            || order === 'lower priority'
            || order === 'low') {
            states = states.reverse();
        }

        if (order === 'high priority'
            || order === 'higher priority'
            || order === 'high') {
            states = states; // default is high priority sort
        }

        if (order === 'random') {
            states = states.sort(function() {
                return Math.pow(-1, Math.floor(Math.random() * 10));
            });
        }

        if (order === 'last states'
            || order === 'last state'
            || order === 'last states') {
            states = target.result().addedStateObjects().reverse();
        }

        return states;
    };

    /**
     * Get stealable and transferrable states of skill.
     *
     * @function external:Game_Action#getTransferStealStates
     */
    Game_Action.prototype.getTransferStealStates = function(target, type) {
        var result  = [],
            item    = this.item(),
            subject = this.subject(),
            states,
            allows, info;

        if (type.toLowerCase() === 'steal') {
            allows = item.getAllowStealStates();
            info   = item.getStealStates();
            states = this.getOrderedStates(target, info[1]);
        }

        if (type.toLowerCase() === 'transfer') {
            allows = item.getAllowTransferStates();
            info   = item.getTransferStates();
            states = this.getOrderedStates(subject, info[1]);
        }

        for (var i = 0; i < states.length; i++) {
            if (allows.indexOf(states[i].id) < 0) {
                continue;
            }

            result.push(states[i].id);

            if (result.size >= info[0]) {
                break;
            }
        }

        return result;
    };

    /**
     * Effect for stealing states.
     *
     * @function external:Game_Action#itemEffectStealStates
     */
    Game_Action.prototype.itemEffectStealStates = function(target) {
        var result = target.result(),
            statesId = this.getTransferStealStates(target, 'steal'),
            subject = this.subject();

        if (!result.isHit()) {
            return false;
        }

        if (statesId.length === 0) {
            return false;
        }

        this.makeSuccess(target);

        for (var i = 0; i < statesId.length; i++) {
            subject.addState(statesId[i]);
            target.removeState(statesId[i]);
        }
    };

    /**
     * Effect for transferring states.
     *
     * @function external:Game_Action#itemEffectTransferStates
     */
    Game_Action.prototype.itemEffectTransferStates = function(target) {
        var result = target.result(),
            statesId = this.getTransferStealStates(target, 'transfer'),
            subject = this.subject();

        if (!result.isHit()) {
            return false;
        }

        if (statesId.length === 0) {
            return false;
        }

        this.makeSuccess(target);

        for (var i = 0; i < statesId.length; i++) {
            subject.removeState(statesId[i]);
            target.addState(statesId[i]);
        }
    };

    /**
     * Extending: Game_Action.prototype.testApply
     *
     * Add validate skill effect for transfer and steal states.
     */
    Game_Action.prototype.testApply = function(target) {
        if (this.getTransferStealStates(target, 'steal').length > 0) {
            return true;
        }

        if (this.getTransferStealStates(target, 'transfer').length > 0) {
            return true;
        }

        return _Game_Action_testApply.call(this, target);
    };

    /**
     * Extending: Game_Action.prototype.applyItemUserEffect
     *
     * Add transfer and steal states effect.
     */
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _Game_Action_applyItemUserEffect.call(this, target);

        this.itemEffectStealStates(target);
        this.itemEffectTransferStates(target);
    };
}());
