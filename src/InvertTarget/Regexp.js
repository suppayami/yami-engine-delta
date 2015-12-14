/* globals YED: false */

(function($InvertTarget) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.InvertTarget
     */
    var Regexp = {
        /**
         * Makes state not single ~
         */
        NOT_INVERT: /<(?:not invert)>/i
    };

    $InvertTarget.Regexp = Regexp;
}(YED.InvertTarget));
