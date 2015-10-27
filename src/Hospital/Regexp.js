/* globals YED: false */

(function($exports) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.Hospital
     */
    var Regexp = {
        /**
         * Notetag for retain states on hospitalizing
         */
        RETAIN: /<(?:no hospital)>/i,

        /**
         * Notetag for state fee on hospitalizing
         */
        STATE_COST: /<hospital fee:[ ]*(\d+)>/i
    };

    $exports.Regexp = Regexp;
}(YED.Hospital));
