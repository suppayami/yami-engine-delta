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
         * Variable require for buying skill (using game variables)
         */
        VARIABLE_REQUIRE: /<buy require variable (\d+):[ ]*(\d+)>/i,

        /**
         * Switch require for buying skill
         */
        SWITCH_NEED: /<buy require switch (\d+):[ ]*(true|false)>/i
    };

    YED.SkillShop.Regexp = Regexp;
}());
