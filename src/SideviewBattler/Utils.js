/* globals YED: false */

(function($SideviewBattler) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $SideviewBattler.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.SideviewBattler
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf YED.SideviewBattler.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.SideviewBattler.Utils
     */
    Utils.processParameters = function() {
        var parameters = PluginManager.parameters('YED_SideviewBattler'),
            result     = Utils.parameters;

        result['Default Frames'] =
            Number(parameters['Default Frames'] || 0);

        result['Default Speed'] =
            Number(parameters['Default Speed']  || 0);

        result['Default Frame Width'] =
            Number(parameters['Default Frame Width']  || 0);

        result['Default Frame Height'] =
            Number(parameters['Default Frame Height']  || 0);

        result['Enable Weapon'] =
            eval(parameters['Enable Weapon'].toLowerCase());
    };

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.SideviewBattler.Utils
     */
    Utils.processNotetags = function() {
        var groups = [$dataActors, $dataEnemies],
            group, obj,
            notedata, line,
            helpers = {}; // multiline notetag

        for (var j = 0; j < groups.length; j++) {
            group = groups[j];

            for (var i = 1; i < group.length; i++) {
                obj = group[i];
                notedata = obj.note.split(/[\r\n]+/);

                Utils._processProperties.call(this, obj);
                Utils._processMethods.call(this, obj);

                for (var n = 0; n < notedata.length; n++) {
                    line = notedata[n];
                    Utils._processNotetag.call(this, obj, line, helpers);
                }
            }
        }
    };

    /**
     * Add new properties into object.
     *
     * @function _processProperties
     * @memberof YED.SideviewBattler.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._sideviewBattler = {
            filename: "",
            default : false,
            frames  : Utils.parameters['Default Frames'],
            speed   : Utils.parameters['Default Speed'],
            weapon  : Utils.parameters['Enable Weapon'],
            sizes   : [
                Utils.parameters['Default Frame Width'],
                Utils.parameters['Default Frame Height']
            ],
            motions : {}
        };
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.SideviewBattler.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getSideviewBattler = Utils.getSideviewBattler;
        obj.isSideviewBattler = Utils.isSideviewBattler;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.SideviewBattler.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag, helpers) {
        var sideviewBattler = obj._sideviewBattler,
            match,
            motion;

        match = notetag.match(Regexp.FILENAME);
        if (match) {
            sideviewBattler.filename = String(match[1]);
        }

        match = notetag.match(Regexp.DEFAULT_TYPE);
        if (match) {
            sideviewBattler.default = true;
        }

        match = notetag.match(Regexp.FRAMES);
        if (match) {
            sideviewBattler.frames = Number(match[1]);
        }

        match = notetag.match(Regexp.SPEED);
        if (match) {
            sideviewBattler.speed = Number(match[1]);
        }

        match = notetag.match(Regexp.SIZES);
        if (match) {
            sideviewBattler.sizes[0] = Number(match[1]);
            sideviewBattler.sizes[1] = Number(match[2]);
        }

        match = notetag.match(Regexp.WEAPON_ENABLE);
        if (match) {
            sideviewBattler.weapon = eval(match[1].toLowerCase());
        }

        match = notetag.match(Regexp.MOTION_QUICK);
        if (match) {
            motion = {};

            motion.name = match[1].toLowerCase();
            motion.index = Number(match[2]);

            sideviewBattler.motions[motion.name] = motion;
        }

        match = notetag.match(Regexp.MOTION_BEGIN);
        if (match) {
            helpers.motionFlag = true;
            helpers.motion = {};
            return;
        }

        match = notetag.match(Regexp.MOTION_END);
        if (match) {
            motion = helpers.motion;

            helpers.motionFlag = false;
            sideviewBattler.motions[motion.name] = motion;
            return;
        }

        if (helpers.motionFlag) {
            motion = helpers.motion;

            match = notetag.match(Regexp.MOTION_NAME);
            if (match) {
                motion.name = match[1].toLowerCase();
            }

            match = notetag.match(Regexp.MOTION_INDEX);
            if (match) {
                motion.index = Number(match[1]);
            }

            match = notetag.match(Regexp.MOTION_LOOP);
            if (match) {
                motion.loop = true;
            }

            match = notetag.match(Regexp.MOTION_FRAMES);
            if (match) {
                motion.frames = Number(match[1]);
            }

            match = notetag.match(Regexp.MOTION_SPEED);
            if (match) {
                motion.speed = Number(match[1]);
            }
        }
    };

    /**
     * Get sideview battler infos.
     * Should be attached to actor/enemy object.
     *
     * @function getSideviewBattler
     * @memberof YED.SideviewBattler.Utils
     * @return {Object}
     */
    Utils.getSideviewBattler = function() {
        return this._sideviewBattler;
    };

    /**
     * Check if is sideview battler.
     * Should be attached to actor/enemy object.
     *
     * @function getSideviewBattler
     * @memberof YED.SideviewBattler.Utils
     * @return {Object}
     */
    Utils.isSideviewBattler = function() {
        return this._sideviewBattler.filename !== ""
            && !this._sideviewBattler.default;
    };

    $SideviewBattler.Utils = Utils;
}(YED.SideviewBattler));
