/* globals YED: false */

(function($AuraState) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.AuraState
     */
    var Regexp = {
        /**
         * Aura for allies
         */
        ALLIES_AURA: /<Allies State Aura:[ ]*(\d+)>/i,

        /**
         * Aura for enemies
         */
        ENEMIES_AURA: /<Enemies State Aura:[ ]*(\d+)>/i
    };

    $AuraState.Regexp = Regexp;
}(YED.AuraState));
