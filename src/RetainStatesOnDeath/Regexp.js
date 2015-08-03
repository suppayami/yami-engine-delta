/**
 * Enum for RegExp, used to notetags
 *
 * @readonly
 * @enum {RegExp}
 * @memberof YED.RetainStateOnDeath
 */
var Regexp = {
    /**
     * Retain on death notetag for state
     */
    RETAIN: /<(?:retain on death)>/i
};

// exports
module.exports = Regexp;