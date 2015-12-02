/*:
 * Yami Engine Delta - Enemy Position
 *
 * @plugindesc v1.0.0 This plugin moves enemy sprites to certain positions or by offsets in battle. Works well for bigger resolution.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @help
 * Enemy Notetags
 *
 * To move enemy sprite to position X, use this notetag (with N is a number):
 *   <Position X: N>
 *
 * To move enemy sprite to position Y, use this notetag (with N is a number):
 *   <Position Y: N>
 *
 * To move enemy sprite by an offset of X, use this notetag (with N is a number):
 *   <Position Offset X: N>
 *
 * To move enemy sprite by an offset of Y, use this notetag (with N is a number):
 *   <Position Offset Y: N>
 */

/**
 * @namespace EnemyOffset
 * @memberof YED
 */

var YED = YED || {};

// init EnemyOffset module
YED.EnemyOffset = {};

/* globals YED: false */

(function($EnemyOffset) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.EnemyOffset
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

    $EnemyOffset.Regexp = Regexp;
}(YED.EnemyOffset));

/* globals YED: false */

(function($EnemyOffset) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $EnemyOffset.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.EnemyOffset
     */
    var Utils = {};

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.EnemyOffset.Utils
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
     * @memberof YED.EnemyOffset.Utils
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
     * @memberof YED.EnemyOffset.Utils
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
     * @memberof YED.EnemyOffset.Utils
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
     * @memberof YED.EnemyOffset.Utils
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
     * @memberof YED.EnemyOffset.Utils
     * @return {Object} {x,y}
     */
    Utils.getPositionOffsets = function() {
        var result = {};

        result.x = this._positionOffsetX;
        result.y = this._positionOffsetY;

        return result;
    };

    $EnemyOffset.Utils = Utils;
}(YED.EnemyOffset));

/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function($EnemyOffset) {
    /**
     * Shorten Dependencies
     */
    var Utils = $EnemyOffset.Utils;

    /**
     * Aliasing methods
     */
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;

    /**
     * Extending: DataManager.isDatabaseLoaded
     *
     * Add notetags and parameters processing for module.
     */
    DataManager.isDatabaseLoaded = function() {
        var loaded = _DataManager_isDatabaseLoaded.call(this);

        if (!loaded) {
            return false;
        }

        Utils.processNotetags.call(DataManager);

        return true;
    };
}(YED.EnemyOffset));

(function() {
    var _Game_Enemy_screenX = Game_Enemy.prototype.screenX;
    var _Game_Enemy_screenY = Game_Enemy.prototype.screenY;

    Game_Enemy.prototype.screenX = function() {
        var result,
            position = this.enemy().getPosition(),
            offsets  = this.enemy().getPositionOffsets();

        result = position.x || _Game_Enemy_screenX.call(this);
        result = result + offsets.x;

        return result;
    };

    Game_Enemy.prototype.screenY = function() {
        var result,
            position = this.enemy().getPosition(),
            offsets  = this.enemy().getPositionOffsets();

        result = position.y || _Game_Enemy_screenY.call(this);
        result = result + offsets.y;

        return result;
    };
}());
