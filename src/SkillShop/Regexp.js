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
         * Custom require texts
         */
        CUSTOM_TEXT: /<buy custom text>/i,
        CUSTOM_TEXT_END: /<\/buy custom text>/i,

        /**
         * Custom requirements
         */
        CUSTOM_REQUIRE: /<buy custom require>/i,
        CUSTOM_REQUIRE_END: /<\/buy custom require>/i,

        /**
         * Custom costs
         */
        CUSTOM_COST: /<buy custom cost>/i,
        CUSTOM_COST_END: /<\/buy custom cost>/i
    };

    YED.SkillShop.Regexp = Regexp;
}());
