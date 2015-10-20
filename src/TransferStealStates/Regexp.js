/* globals YED: false */

(function($TransferStealStates) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.TransferStealStates
     */
    var Regexp = {
        /**
         * Allows states to be stolen
         */
        STEAL_ALLOW: /<steal allow:[ ]*(.+)>/i,

        /**
         * Allows states to be transfered
         */
        TRANSFER_ALLOW: /<transfer allow:[ ]*(.+)>/i,

        /**
         * Steal (n) states with different priority
         */
        STEAL_STATES: /<steal (\d+) (?:states|state):[ ]*(.+)>/i,

        /**
         * Transfer (n) states with different priority
         */
        TRANSFER_STATES: /<transfer (\d+) (?:states|state):[ ]*(.+)>/i
    };

    $TransferStealStates.Regexp = Regexp;
}(YED.TransferStealStates));
