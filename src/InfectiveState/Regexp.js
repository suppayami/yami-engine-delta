/* globals YED: false */

(function($InfectiveState) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.InfectiveState
     */
    var Regexp = {
        /**
         * Infect all allies
         */
        INFECT_ALLIES: /<Infect Allies (\d+):[ ]*(\d+),[ ]*(\d+)%?>/i,

        /**
         * Infect all enemies
         */
        INFECT_ENEMIES: /<Infect Enemies (\d+):[ ]*(\d+),[ ]*(\d+)%?>/i,

        /**
         * Infect X allies
         */
        INFECT_X_ALLIES: /<Infect (\d+) Allies (\d+):[ ]*(\d+),[ ]*(\d+)%?>/i,

        /**
         * Infect X enemies
         */
        INFECT_X_ENEMIES: /<Infect (\d+) Enemies (\d+):[ ]*(\d+),[ ]*(\d+)%?>/i,

        /**
         * Infect X random
         */
        INFECT_X_RANDOM: /<Infect (\d+) Random (\d+):[ ]*(\d+),[ ]*(\d+)%?>/i
    };

    $InfectiveState.Regexp = Regexp;
}(YED.InfectiveState));
