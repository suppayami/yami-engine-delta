/* globals YED: false */

(function($SingleState) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.SingleState
     */
    var Regexp = {
        /**
         * Makes state not single ~
         */
        NOT_SINGLE: /<(?:not single state)>/i
    };

    $SingleState.Regexp = Regexp;
}(YED.SingleState));
