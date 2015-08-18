/* globals YED: false */

(function() {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.SkillShop
     */
    var Regexp = {
        /**
         * Gold cost for buying skill
         */
        GOLD_COST: /<buy cost gold:[ ]*(\d+)>/i,

        /**
         * Item/Armor/Weapon cost for buying skill
         */
        ITEM_COST: /<buy cost (.+) (\d+):[ ]*(\d+)>/i,

        /**
         * Variable cost for buying skill (using game variables)
         */
        VARIABLE_COST: /<buy cost variable (\d+):[ ]*(\d+)>/i,

        /**
         * Switch should be true for buying skill (using game switches)
         */
        SWITCH_NEED: /<buy need switch(?:\:)?[ ]*(\d+)>/i
    };

    YED.SkillShop.Regexp = Regexp;
}());
