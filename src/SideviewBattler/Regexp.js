/* globals YED: false */

(function($SideviewBattler) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.SideviewBattler
     */
    var Regexp = {
        /**
         * Filename for battler
         */
        FILENAME: /<Sideview Battler:[ ]*(.*)>/i,

        /**
         * Default type of set for battler
         */
        DEFAULT_TYPE: /<Sideview Battler Default>/i,

        /**
         * Default frames
         */
        FRAMES: /<Sideview Battler Frames:[ ]*(\d+)>/i,

        /**
         * Default frames
         */
        SPEED: /<Sideview Battler Speed:[ ]*(\d+)>/i,

        /**
         * Frame sizes
         */
        SIZES: /<Sideview Battler Size:[ ]*(\d+),[ ]*(\d+)>/i,

        /**
         * Enable Weapon
         */
        WEAPON_ENABLE: /<Sideview Battler Weapon:[ ]*(true|false)>/i,

        /**
         * Motions setup
         */
        MOTION_QUICK: /<Sideview Battler Motion:[ ]*(.*),[ ]*(\d+)>/i,

        /**
         * Motions setup
         */
        MOTION_BEGIN: /<Sideview Battler Motion>/i,

        /**
         * Motions setup
         */
        MOTION_END: /<\/Sideview Battler Motion>/i,

        /**
         * Motions setup
         */
        MOTION_NAME: /Name:[ ]*(.*)/i,

        /**
         * Motions setup
         */
        MOTION_INDEX: /Index:[ ]*(\d+)/i,

        /**
         * Motions setup
         */
        MOTION_LOOP: /Loop/i,

        /**
         * Motions setup
         */
        MOTION_FRAMES: /Frames:[ ]*(\d+)/i,

        /**
         * Motions setup
         */
        MOTION_SPEED: /Speed:[ ]*(\d+)/i,
    };

    $SideviewBattler.Regexp = Regexp;
}(YED.SideviewBattler));
