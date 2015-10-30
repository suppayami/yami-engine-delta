(function() {
    /**
     * Checks requirements for buying skill.
     *
     * @function external:Game_Actor#canBuySkill
     * @param {Object} skill Skill Object
     * @return {Boolean} Can buy skill
     */
    Game_Actor.prototype.canBuySkill = function(skill) {
        var result = true;

        if (!skill) {
            return false;
        }

        if (this.isLearnedSkill(skill.id)) {
            return false;
        }

        result = result && this._canBuySkillGold(skill);
        result = result && this._canBuySkillItems(skill);
        result = result && this._canBuySkillCustom(skill);

        return result;
    };

    /**
     * Buy skill for actor.
     *
     * @function external:Game_Actor#buySkill
     * @param {Object} skill Skill Object
     */
    Game_Actor.prototype.buySkill = function(skill) {
        if (!skill) {
            return;
        }

        if (this.isLearnedSkill(skill)) {
            return;
        }

        this.learnSkill(skill.id);
        this._paySkillBuyCost(skill);
    };

    /**
     * Checks gold requirement for buying skill.
     *
     * @function external:Game_Actor#_canBuySkillGold
     * @param {Object} skill Skill Object
     * @return {Boolean} Can buy skill
     * @private
     */
    Game_Actor.prototype._canBuySkillGold = function(skill) {
        return $gameParty.gold() >= skill.getBuyCostGold();
    };

    /**
     * Checks items requirement for buying skill.
     *
     * @function external:Game_Actor#_canBuySkillItems
     * @param {Object} skill Skill Object
     * @return {Boolean} Can buy skill
     * @private
     */
    Game_Actor.prototype._canBuySkillItems = function(skill) {
        var itemRequires = skill.getBuyCostItems(),
            require, item, quantity;

        for (var i = 0; i < itemRequires.length; i++) {
            require = itemRequires[i];
            item = require[0];
            quantity = require[1];

            if ($gameParty.numItems(item) < quantity) {
                return false;
            }
        }

        return true;
    };

    /**
     * Checks custom requirement for buying skill.
     *
     * @function external:Game_Actor#_canBuySkillCustom
     * @param {Object} skill Skill Object
     * @return {Boolean} Can buy skill
     * @private
     */
    Game_Actor.prototype._canBuySkillCustom = function(skill) {
        var customRequires = skill.getBuyCustomRequire(),
            actor = this, // jshint ignore:line
            evalResult;

        for (var i = 0; i < customRequires.length; i++) {
            try {
                evalResult = eval(customRequires[i]);
            } catch (err) {
                console.log(err.message);
                throw new Error('[YED_SkillShop] There are problems with custom requirements for skill ID' + skill.id);
            }

            if (!evalResult) {
                return false;
            }
        }

        return true;
    };

    /**
     * Pay costs for buying skill.
     *
     * @function external:Game_Actor#_paySkillBuyCost
     * @param {Object} skill Skill Object
     * @private
     */
    Game_Actor.prototype._paySkillBuyCost = function(skill) {
        this._paySkillBuyCostGold(skill);
        this._paySkillBuyCostItems(skill);
        this._paySkillBuyCostCustom(skill);
    };

    /**
     * Pay gold cost for buying skill.
     *
     * @function external:Game_Actor#_paySkillBuyCostGold
     * @param {Object} skill Skill Object
     * @private
     */
    Game_Actor.prototype._paySkillBuyCostGold = function(skill) {
        $gameParty.loseGold(skill.getBuyCostGold());
    };

    /**
     * Pay items cost for buying skill.
     *
     * @function external:Game_Actor#_paySkillBuyCostItems
     * @param {Object} skill Skill Object
     * @private
     */
    Game_Actor.prototype._paySkillBuyCostItems = function(skill) {
        var itemCosts = skill.getBuyCostItems(),
            cost, item, quantity;

        for (var i = 0; i < itemCosts.length; i++) {
            cost = itemCosts[i];
            item = cost[0];
            quantity = cost[1];

            $gameParty.loseItem(item, quantity, false);
        }
    };

    /**
     * Pay custom cost for buying skill.
     *
     * @function external:Game_Actor#_paySkillBuyCostCustom
     * @param {Object} skill Skill Object
     * @private
     */
    Game_Actor.prototype._paySkillBuyCostCustom = function(skill) {
        var customCosts = skill.getBuyCustomCost(),
            actor = this; // jshint ignore:line

        for (var i = 0; i < customCosts.length; i++) {
            try {
                eval(customCosts[i]);
            } catch (err) {
                console.log(err.message);
                throw new Error('[YED_SkillShop] There are problems with custom cost for skill ID' + skill.id);
            }
        }
    };
}());
