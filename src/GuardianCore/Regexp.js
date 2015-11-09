/* globals YED: false */

(function($exports) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.Guardian.Core
     */
    var Regexp = {
        /**
         * Notetag for guardian
         */
        GUARDIAN: /<(?:guardian)>/i
    };

    $exports.Regexp = Regexp;
}(YED.Guardian.Core));
