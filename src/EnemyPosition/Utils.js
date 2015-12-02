/* globals YED: false */

(function($EnemyPosition) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $EnemyPosition.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.EnemyPosition
     */
    var Utils = {};

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.EnemyPosition.Utils
     */
    Utils.processNotetags = function() {
        var group = $dataEnemies,    // shorten group name
            obj,
            notedata, line;

        for (var i = 1; i < group.length; i++) {
            obj = group[i];
            notedata = obj.note.split(/[\r\n]+/);

            Utils._processProperties.call(this, obj);
            Utils._processMethods.call(this, obj);

            for (var n = 0; n < notedata.length; n++) {
                line = notedata[n];
                Utils._processNotetag.call(this, obj, line);
            }
        }
    };

    /**
     * Add new properties into object.
     *
     * @function _processProperties
     * @memberof YED.EnemyPosition.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._positionX = null;
        obj._positionY = null;

        obj._positionOffsetX = 0;
        obj._positionOffsetY = 0;
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.EnemyPosition.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getPosition = Utils.getPosition;
        obj.getPositionOffsets = Utils.getPositionOffsets;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.EnemyPosition.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        var match;

        match = notetag.match(Regexp.POSITION_X);
        if (match) {
            obj._positionX = Number(match[1]);
        }

        match = notetag.match(Regexp.POSITION_Y);
        if (match) {
            obj._positionY = Number(match[1]);
        }

        match = notetag.match(Regexp.OFFSET_X);
        if (match) {
            obj._positionOffsetX = Number(match[1]);
        }

        match = notetag.match(Regexp.OFFSET_Y);
        if (match) {
            obj._positionOffsetY = Number(match[1]);
        }
    };

    /**
     * Get position.
     *
     * @function getPosition
     * @memberof YED.EnemyPosition.Utils
     * @return {Object} {x,y}
     */
    Utils.getPosition = function() {
        var result = {};

        result.x = this._positionX;
        result.y = this._positionY;

        return result;
    };

    /**
     * Get position offsets.
     *
     * @function getPositionOffsets
     * @memberof YED.EnemyPosition.Utils
     * @return {Object} {x,y}
     */
    Utils.getPositionOffsets = function() {
        var result = {};

        result.x = this._positionOffsetX;
        result.y = this._positionOffsetY;

        return result;
    };

    $EnemyPosition.Utils = Utils;
}(YED.EnemyPosition));
