/*:
 * Yami Engine Delta - Invert Target
 *
 * @plugindesc v1.0.1 This plugin allows player to use skill on the other team, for example use healing on an enemy.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param Invert Keys (Keyboard)
 * @desc A list of keyName.
 * For example: pageup pagedown
 * @default pageup pagedown shift
 *
 * @param Invert Keys (Gamepad)
 * @desc A list of keyName.
 * For example: pageup pagedown
 * @default pageup pagedown shift
 *
 * @help
 * Compatibility
 * ---
 * If you use YEP - Battle Engine Core, this plugin should be put above that.
 *
 * ==============================================
 * Item & Skill Notetags
 * ---
 * <No Invert>
 * Make the skill/item cannot be inverted.
 */

/**
 * @namespace InvertTarget
 * @memberof YED
 */

var YED = YED || {};

// init InvertTarget module
YED.InvertTarget = {};

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

/* globals YED: false */

(function($InvertTarget) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $InvertTarget.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.InvertTarget
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf  YED.InvertTarget.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.InvertTarget.Utils
     */
    Utils.processParameters = function() {
        var parameters = PluginManager.parameters('YED_InvertTarget'),
            result     = Utils.parameters;

        result['Invert Keys (Keyboard)'] =
            parameters['Invert Keys (Keyboard)'].split(' ');

        result['Invert Keys (Gamepad)'] =
            parameters['Invert Keys (Gamepad)'].split(' ');
    };

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.InvertTarget.Utils
     */
    Utils.processNotetags = function() {
        var groups = [$dataSkills, $dataItems], group,
            obj,
            notedata, line;

        for (var j = 0; j < groups.length; j++) {
            group = groups[j];
            
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
        }
    };

    /**
     * Add new properties into object.
     *
     * @function _processProperties
     * @memberof YED.InvertTarget.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._invertTarget = true;
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.InvertTarget.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getInvertTarget = Utils.getInvertTarget;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.InvertTarget.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        var match;

        match = notetag.match(Regexp.NOT_INVERT);
        if (match) {
            obj._invertTarget = true;
        }
    };

    /**
     * Get invert target flag.
     *
     * @function getInvertTarget
     * @memberof YED.InvertTarget.Utils
     * @return {Boolean} Invertable!
     */
    Utils.getInvertTarget = function() {
        return !!this._invertTarget;
    };

    $InvertTarget.Utils = Utils;
}(YED.InvertTarget));

/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function($InvertTarget) {
    /**
     * Shorten Dependencies
     */
    var Utils = $InvertTarget.Utils;

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

        Utils.processParameters.call(DataManager);
        Utils.processNotetags.call(DataManager);

        return true;
    };
}(YED.InvertTarget));

(function() {
    /**
     * Aliasing methods
     */
    var _Game_Action_clear
        = Game_Action.prototype.clear;
    var _Game_Action_setSkill
        = Game_Action.prototype.setSkill;
    var _Game_Action_setItem
        = Game_Action.prototype.setItem;
    var _Game_Action_needsSelection
        = Game_Action.prototype.needsSelection;
    var _Game_Action_friendsUnit
        = Game_Action.prototype.friendsUnit;
    var _Game_Action_opponentsUnit
        = Game_Action.prototype.opponentsUnit;

    Game_Action.prototype.clear = function() {
        _Game_Action_clear.call(this);

        this.clearInvert();
    };

    Game_Action.prototype.clearInvert = function() {
        this._invertTarget = false;
    };

    Game_Action.prototype.toggleInvert = function() {
        if (!this.item()) {
            return false;
        }

        if (!this.item().getInvertTarget()) {
            return false;
        }

        this._invertTarget = !this._invertTarget;

        return true;
    };

    Game_Action.prototype.setSkill = function(skillId) {
        _Game_Action_setSkill.call(this, skillId);

        this.clearInvert();
    };

    Game_Action.prototype.setItem = function(itemId) {
        _Game_Action_setItem.call(this, itemId);

        this.clearInvert();
    };

    Game_Action.prototype.needsSelection = function() {
        var result = _Game_Action_needsSelection.call(this),
            forAll = this.checkItemScope([2, 8]);

        return result || forAll;
    };

    Game_Action.prototype.friendsUnit = function() {
        var friendsUnit   = _Game_Action_friendsUnit.call(this),
            opponentsUnit = _Game_Action_opponentsUnit.call(this);

        if (this._invertTarget) {
            return opponentsUnit;
        }

        return friendsUnit;
    };

    Game_Action.prototype.opponentsUnit = function() {
        var friendsUnit   = _Game_Action_friendsUnit.call(this),
            opponentsUnit = _Game_Action_opponentsUnit.call(this);

        if (this._invertTarget) {
            return friendsUnit;
        }

        return opponentsUnit;
    };
}());

/* globals YED: false */

(function($InvertTarget) {
    /**
     * Aliasing methods
     */
    var _Scene_Battle_update
        = Scene_Battle.prototype.update;
    var _Scene_Battle_startActorCommandSelection
        = Scene_Battle.prototype.startActorCommandSelection;

    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);

        this._updateInvertTarget();
    };

    Scene_Battle.prototype.startActorCommandSelection = function() {
        _Scene_Battle_startActorCommandSelection.call(this);

        BattleManager.inputtingAction().clearInvert();
    };

    Scene_Battle.prototype._isChoosingTargets = function() {
        return (this._actorWindow.active ||
                this._enemyWindow.active);
    };

    Scene_Battle.prototype._updateInvertTarget = function() {
        var keyNameKeyboard
            = $InvertTarget.Utils.parameters['Invert Keys (Keyboard)'],
            keyNameGamepad
            = $InvertTarget.Utils.parameters['Invert Keys (Gamepad)'],
            triggered = function(key) {
                return Input.isTriggered(key);
            },
            input;

        input = BattleManager.inputtingAction();

        if (!input) {
            return;
        }

        if (!this._isChoosingTargets()) {
            return;
        }

        if (!input.item()) {
            return;
        }

        if (keyNameKeyboard.some(triggered) ||
            keyNameGamepad.some(triggered)) {
            if (!input.toggleInvert()) {
                return;
            }

            if (this._actorWindow.active) {
                this._actorWindow.deactivate();
                this._actorWindow.hide();
                this.selectEnemySelection();
                
                return;
            }

            if (this._enemyWindow.active) {
                this._enemyWindow.deactivate();
                this._enemyWindow.hide();
                this.selectActorSelection();
                
                return;
            }
        }
    };
}(YED.InvertTarget));
