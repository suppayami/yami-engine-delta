(function() {
    /**
     * Aliasing methods
     */
    var _Game_Action_clear
        = Game_Action.prototype.clear;
    var _Game_Action_setSkill
        = Game_Action.prototype.setSkill;
    var _Game_Action_setItem
        = Game_Action.prototype.setItem;
    var _Game_Action_needsSelection
        = Game_Action.prototype.needsSelection;
    var _Game_Action_friendsUnit
        = Game_Action.prototype.friendsUnit;
    var _Game_Action_opponentsUnit
        = Game_Action.prototype.opponentsUnit;

    Game_Action.prototype.clear = function() {
        _Game_Action_clear.call(this);

        this.clearInvert();
    };

    Game_Action.prototype.clearInvert = function() {
        this._invertTarget = false;
    };

    Game_Action.prototype.toggleInvert = function() {
        if (!this.item()) {
            return false;
        }

        if (!this.item().getInvertTarget()) {
            return false;
        }

        this._invertTarget = !this._invertTarget;

        return true;
    };

    Game_Action.prototype.setSkill = function(skillId) {
        _Game_Action_setSkill.call(this, skillId);

        this.clearInvert();
    };

    Game_Action.prototype.setItem = function(itemId) {
        _Game_Action_setItem.call(this, itemId);

        this.clearInvert();
    };

    Game_Action.prototype.needsSelection = function() {
        var result = _Game_Action_needsSelection.call(this),
            forAll = this.checkItemScope([2, 8]);

        return result || forAll;
    };

    Game_Action.prototype.friendsUnit = function() {
        var friendsUnit   = _Game_Action_friendsUnit.call(this),
            opponentsUnit = _Game_Action_opponentsUnit.call(this);

        if (this._invertTarget) {
            return opponentsUnit;
        }

        return friendsUnit;
    };

    Game_Action.prototype.opponentsUnit = function() {
        var friendsUnit   = _Game_Action_friendsUnit.call(this),
            opponentsUnit = _Game_Action_opponentsUnit.call(this);

        if (this._invertTarget) {
            return friendsUnit;
        }

        return opponentsUnit;
    };
}());
