/* globals YED: false */

(function($EnemyPosition) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.EnemyPosition
     */
    var Regexp = {
        /**
         * Offset X
         */
        POSITION_X: /<(?:Position X):[ ]*([-]?\d+)>/i,

        /**
         * Offset X
         */
        POSITION_Y: /<(?:Position Y):[ ]*([-]?\d+)>/i,

        /**
         * Offset X
         */
        OFFSET_X: /<(?:Position Offset X):[ ]*([-]?\d+)>/i,

        /**
         * Offset Y
         */
        OFFSET_Y: /<(?:Position Offset Y):[ ]*([-]?\d+)>/i
    };

    $EnemyPosition.Regexp = Regexp;
}(YED.EnemyPosition));
