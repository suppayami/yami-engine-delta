/*:
 * Yami Engine Delta - Skill Shop
 *
 * @plugindesc v1.0.1 This plugin provides a skill shop for buying skills.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param [Basic Setting]
 * @default
 *
 * @param Default Price
 * @desc Default Gold Cost for buying skill.
 * @default 100
 *
 * @param [Visual Setting]
 * @default
 *
 * @param Gold Cost Text
 * @desc Text for gold cost to buy skill.
 * @default Gold Cost
 *
 * @param Item Cost Text
 * @desc Text for item cost to buy skill.
 * @default Requires
 *
 * @param Buy Command
 * @desc Text for Buy command.
 * @default Learn
 *
 * @param Cancel Command
 * @desc Text for Cancel command.
 * @default Leave
 *
 * @param Text Alignment
 * @desc How to align the text for the command window.
 * left     center     right
 * @default center
 *
 * @help
 * The following are Plugin Commands you may use with events.
 *
 * Plugin Command:
 *   OpenSkillShop(ID,ID,ID)    Opens up skill shop instantly with
 *     or                       skill list defined by ID. You can put
 *   OpenSkillShop ID ID ID     as many ID as you want into the command.
 *                              Remember not to put any whitespace into
 *                              the command.
 *
 * ============================================================================
 *
 * Skills
 * To change gold cost for buying the skill, use the following notetag:
 *   <Buy Cost Gold: X>
 *
 * To add more weapons/armors/items cost for buying the skill, use the
 * following notetag with X is the ID in database:
 *   <Buy Cost Weapon X: Y>
 *   <Buy Cost Armor X: Y>
 *   <Buy Cost Item X: Y>
 *
 * To add more custom text into the requirements, use the following notetag
 * with support of some message escape code (color, icon...):
 *   <Buy Custom Text>
 *   Line
 *   Line
 *   Line
 *   </Buy Custom Text>
 *
 * To add more condition to buy the skill, use the following notetag (Only
 * for advanced users, requires programming knowledge):
 *   <Buy Custom Require>          Example: <Buy Custom Require>
 *   Condition                              $gameSwitches.value(1)
 *   Condition                              actor.level > 10
 *   Condition                              </Buy Custom Require>
 *   </Buy Custom Require>
 *
 * To add more cost to buy the skill, use the following notetag (Only
 * for advanced users, requires programming knowledge):
 *   <Buy Custom Cost>          Example: <Buy Custom Cost>
 *   Eval Code                           actor.levelDown();
 *   </Buy Custom Cost>                  </Buy Custom Cost>
 * ============================================================================
 */

/**
 * @namespace SkillShop
 * @memberof YED
 */

var YED = YED || {};

// init SkillShop module
YED.SkillShop = {};

/**
 * Contains Windows for module.
 *
 * @namespace Windows
 * @memberof YED.SkillShop
 */
YED.SkillShop.Windows = {};

/**
 * Contains Scenes for module.
 *
 * @namespace Scenes
 * @memberof YED.SkillShop
 */
YED.SkillShop.Scenes  = {};

/* globals YED: false */

(function() {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.SkillShop
     */
    var Regexp = {
        /**
         * Gold cost for buying skill
         */
        GOLD_COST: /<buy cost gold:[ ]*(\d+)>/i,

        /**
         * Item/Armor/Weapon cost for buying skill
         */
        ITEM_COST: /<buy cost (.+) (\d+):[ ]*(\d+)>/i,

        /**
         * Custom require texts
         */
        CUSTOM_TEXT: /<buy custom text>/i,
        CUSTOM_TEXT_END: /<\/buy custom text>/i,

        /**
         * Custom requirements
         */
        CUSTOM_REQUIRE: /<buy custom require>/i,
        CUSTOM_REQUIRE_END: /<\/buy custom require>/i,

        /**
         * Custom costs
         */
        CUSTOM_COST: /<buy custom cost>/i,
        CUSTOM_COST_END: /<\/buy custom cost>/i
    };

    YED.SkillShop.Regexp = Regexp;
}());

/* globals YED: false */

(function($SkillShop) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $SkillShop.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.SkillShop
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf YED.SkillShop.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.SkillShop.Utils
     */
    Utils.processParameters = function() {
        var parameters = PluginManager.parameters('YED_SkillShop'),
            result     = Utils.parameters;

        result['Default Price'] =
            Number(parameters['Default Price'] || 0);

        result['Gold Cost Text'] =
            String(parameters['Gold Cost Text'] || 'Gold Cost');

        result['Item Cost Text'] =
            String(parameters['Item Cost Text'] || 'Requires');

        result['Buy Command'] =
            String(parameters['Buy Command'] || 'Learn');

        result['Cancel Command'] =
            String(parameters['Cancel Command'] || 'Leave');

        result['Text Alignment'] =
            String(parameters['Text Alignment'] || 'Leave');
    };

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.SkillShop.Utils
     */
    Utils.processNotetags = function() {
        var group = $dataSkills,    // shorten group name
            obj,
            notedata, line,
            helpers = {}; // multiline notetag

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
    };

    /**
     * Add new properties into object.
     *
     * @function _processProperties
     * @memberof YED.SkillShop.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._buyCost = {};

        obj._buyCost.goldCost = Utils.parameters['Default Price'];
        obj._buyCost.itemCost = [];
        obj._buyCost.customCost = [];
        obj._buyCost.customRequire = [];
        obj._buyCost.customText = "";
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.SkillShop.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getBuyCostGold = Utils.getBuyCostGold;
        obj.getBuyCostItems = Utils.getBuyCostItems;

        obj.getBuyCustomCost = Utils.getBuyCustomCost;
        obj.getBuyCustomRequire = Utils.getBuyCustomRequire;
        obj.getBuyCustomText = Utils.getBuyCustomText;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.SkillShop.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag, helpers) {
        var buyCost = obj._buyCost,
            match,
            type, id, number; // item cost

        match = notetag.match(Regexp.GOLD_COST);
        if (match) {
            buyCost.goldCost = Number(match[1]);
        }

        match = notetag.match(Regexp.ITEM_COST);
        if (match) {
            type = match[1].toUpperCase();
            id = Number(match[2]);
            number = Number(match[3]);
            buyCost.itemCost.push([type, id, number]);
        }

        match = notetag.match(Regexp.CUSTOM_TEXT);
        if (match) {
            helpers.customTextFlag = true;
            helpers.customText = "";
            return;
        }

        match = notetag.match(Regexp.CUSTOM_TEXT_END);
        if (match) {
            helpers.customTextFlag = false;
            buyCost.customText = helpers.customText;
            return;
        }

        match = notetag.match(Regexp.CUSTOM_REQUIRE);
        if (match) {
            helpers.customRequireFlag = true;
            return;
        }

        match = notetag.match(Regexp.CUSTOM_REQUIRE_END);
        if (match) {
            helpers.customRequireFlag = false;
            return;
        }

        match = notetag.match(Regexp.CUSTOM_COST);
        if (match) {
            helpers.customCostFlag = true;
            helpers.customCost = "";
            return;
        }

        match = notetag.match(Regexp.CUSTOM_COST_END);
        if (match) {
            helpers.customCostFlag = false;
            buyCost.customCost.push(helpers.customCost);
            return;
        }

        if (helpers.customTextFlag) {
            helpers.customText += notetag + "\n";
        }

        if (helpers.customRequireFlag) {
            buyCost.customRequire.push(notetag);
        }

        if (helpers.customCostFlag) {
            helpers.customCost += "\n" + notetag;
        }
    };

    /**
     * Get skill buying gold cost.
     * Should be attached to skill object.
     *
     * @function getBuyCostGold
     * @memberof YED.SkillShop.Utils
     * @return {Number} Gold Cost
     */
    Utils.getBuyCostGold = function() {
        return this._buyCost.goldCost;
    };

    /**
     * Get skill buying items cost.
     * Should be attached to skill object.
     *
     * @function getBuyCostItems
     * @memberof YED.SkillShop.Utils
     * @return {Array[]} Item Cost - [ItemObject, Amount]
     */
    Utils.getBuyCostItems = function() {
        var result = [],
            itemCost = this._buyCost.itemCost,
            cost,
            id,
            amount,
            item,
            type;

        for (var i = 0; i < itemCost.length; i++) {
            cost = itemCost[i];

            type = cost[0];
            id = cost[1];
            amount = cost[2];

            switch (type) {
            case 'WEAPON':
                item = $dataWeapons[id];
                break;
            case 'ARMOR':
                item = $dataArmors[id];
                break;
            case 'ITEM':
                item = $dataItems[id];
                break;
            }
            result.push([item, amount]);
        }

        return result;
    };

    /**
     * Get skill buying custom cost.
     * Should be attached to skill object.
     *
     * @function getBuyCustomCost
     * @memberof YED.SkillShop.Utils
     * @return {String[]} Eval Strings
     */
    Utils.getBuyCustomCost = function() {
        return this._buyCost.customCost;
    };

    /**
     * Get skill buying custom require.
     * Should be attached to skill object.
     *
     * @function getBuyCustomRequire
     * @memberof YED.SkillShop.Utils
     * @return {String[]} Eval Strings
     */
    Utils.getBuyCustomRequire = function() {
        return this._buyCost.customRequire;
    };

    /**
     * Get skill buying custom text.
     * Should be attached to skill object.
     *
     * @function getBuyCustomText
     * @memberof YED.SkillShop.Utils
     * @return {Object} {text, icon, color}
     */
    Utils.getBuyCustomText = function() {
        return this._buyCost.customText;
    };

    /**
     * Go to SkillShop Scene.
     * Should be called with Game_Interpreter object as current object.
     *
     * @function gotoHospitalScene
     * @memberof YED.SkillShop.Utils
     */
    Utils.gotoSkillShopScene = function(skillIds) {
        var scene = YED.SkillShop.Scenes.SkillShop;

        SceneManager.push(scene);
        SceneManager.prepareNextScene(skillIds);
    };

    $SkillShop.Utils = Utils;
}(YED.SkillShop));

/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function($SkillShop) {
    /**
     * Shorten Dependencies
     */
    var Utils = $SkillShop.Utils;

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
}(YED.SkillShop));

(function() {
    /**
     * Checks requirements for buying skill.
     *
     * @function external:Game_Actor#canBuySkill
     * @param {Object} skill Skill Object
     * @return {Boolean} Can buy skill
     */
    Game_Actor.prototype.canBuySkill = function(skill) {
        var result = true;

        if (!skill) {
            return false;
        }

        if (this.isLearnedSkill(skill.id)) {
            return false;
        }

        result = result && this._canBuySkillGold(skill);
        result = result && this._canBuySkillItems(skill);
        result = result && this._canBuySkillCustom(skill);

        return result;
    };

    /**
     * Buy skill for actor.
     *
     * @function external:Game_Actor#buySkill
     * @param {Object} skill Skill Object
     */
    Game_Actor.prototype.buySkill = function(skill) {
        if (!skill) {
            return;
        }

        if (this.isLearnedSkill(skill)) {
            return;
        }

        this.learnSkill(skill.id);
        this._paySkillBuyCost(skill);
    };

    /**
     * Checks gold requirement for buying skill.
     *
     * @function external:Game_Actor#_canBuySkillGold
     * @param {Object} skill Skill Object
     * @return {Boolean} Can buy skill
     * @private
     */
    Game_Actor.prototype._canBuySkillGold = function(skill) {
        return $gameParty.gold() >= skill.getBuyCostGold();
    };

    /**
     * Checks items requirement for buying skill.
     *
     * @function external:Game_Actor#_canBuySkillItems
     * @param {Object} skill Skill Object
     * @return {Boolean} Can buy skill
     * @private
     */
    Game_Actor.prototype._canBuySkillItems = function(skill) {
        var itemRequires = skill.getBuyCostItems(),
            require, item, quantity;

        for (var i = 0; i < itemRequires.length; i++) {
            require = itemRequires[i];
            item = require[0];
            quantity = require[1];

            if ($gameParty.numItems(item) < quantity) {
                return false;
            }
        }

        return true;
    };

    /**
     * Checks custom requirement for buying skill.
     *
     * @function external:Game_Actor#_canBuySkillCustom
     * @param {Object} skill Skill Object
     * @return {Boolean} Can buy skill
     * @private
     */
    Game_Actor.prototype._canBuySkillCustom = function(skill) {
        var customRequires = skill.getBuyCustomRequire(),
            actor = this, // jshint ignore:line
            evalResult;

        for (var i = 0; i < customRequires.length; i++) {
            try {
                evalResult = eval(customRequires[i]);
            } catch (err) {
                console.log(err.message);
                throw new Error('[YED_SkillShop] There are problems with custom requirements for skill ID' + skill.id);
            }

            if (!evalResult) {
                return false;
            }
        }

        return true;
    };

    /**
     * Pay costs for buying skill.
     *
     * @function external:Game_Actor#_paySkillBuyCost
     * @param {Object} skill Skill Object
     * @private
     */
    Game_Actor.prototype._paySkillBuyCost = function(skill) {
        this._paySkillBuyCostGold(skill);
        this._paySkillBuyCostItems(skill);
        this._paySkillBuyCostCustom(skill);
    };

    /**
     * Pay gold cost for buying skill.
     *
     * @function external:Game_Actor#_paySkillBuyCostGold
     * @param {Object} skill Skill Object
     * @private
     */
    Game_Actor.prototype._paySkillBuyCostGold = function(skill) {
        $gameParty.loseGold(skill.getBuyCostGold());
    };

    /**
     * Pay items cost for buying skill.
     *
     * @function external:Game_Actor#_paySkillBuyCostItems
     * @param {Object} skill Skill Object
     * @private
     */
    Game_Actor.prototype._paySkillBuyCostItems = function(skill) {
        var itemCosts = skill.getBuyCostItems(),
            cost, item, quantity;

        for (var i = 0; i < itemCosts.length; i++) {
            cost = itemCosts[i];
            item = cost[0];
            quantity = cost[1];

            $gameParty.loseItem(item, quantity, false);
        }
    };

    /**
     * Pay custom cost for buying skill.
     *
     * @function external:Game_Actor#_paySkillBuyCostCustom
     * @param {Object} skill Skill Object
     * @private
     */
    Game_Actor.prototype._paySkillBuyCostCustom = function(skill) {
        var customCosts = skill.getBuyCustomCost(),
            actor = this; // jshint ignore:line

        for (var i = 0; i < customCosts.length; i++) {
            try {
                eval(customCosts[i]);
            } catch (err) {
                console.log(err.message);
                throw new Error('[YED_SkillShop] There are problems with custom cost for skill ID' + skill.id);
            }
        }
    };
}());

/* globals YED: false */

(function($SkillShop) {
    /**
     * Shorten Dependencies
     */
    var Utils = $SkillShop.Utils;

    /**
     * Window shows commands for Skill Shop Scene.
     *
     * @class
     * @extends external:Window_Command
     * @memberof YED.SkillShop.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} [wh] Window Height
     */
    var SkillShopCommand = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Command
     */
    SkillShopCommand.prototype = Object.create(Window_Command.prototype);
    SkillShopCommand.prototype.constructor = SkillShopCommand;

    /**
     * Initialize Window when created.
     *
     * @constructs SkillShopCommand
     */
    SkillShopCommand.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();
        wh = wh || this.windowHeight();

        Window_Command.prototype.initialize.call(this, wx, wy);

        this.width = ww;
        this.height = wh;
    };

    /**
     * Window width for initialize.
     *
     * @return {number} Window Width
     */
    SkillShopCommand.prototype.windowWidth = function() {
        return 240;
    };

    /**
     * Get visible rows for height setting.
     *
     * @return {number} Rows
     */
    SkillShopCommand.prototype.numVisibleRows = function() {
        return 4;
    };

    /**
     * Get text align setting.
     *
     * @return {String} Align setting
     */
    SkillShopCommand.prototype.itemTextAlign = function() {
        return Utils.parameters['Text Alignment'];
    };

    /**
     * Make commands list for Window.
     */
    SkillShopCommand.prototype.makeCommandList = function() {
        this._addBuyCommand();
        this._addCustomCommand();
        this._addExitCommand();
    };

    /**
     * Add buy commands to Window.
     *
     * @private
     */
    SkillShopCommand.prototype._addBuyCommand = function() {
        var buyText = Utils.parameters['Buy Command'];

        this.addCommand(buyText, 'buySkill', true);
    };

    /**
     * Add custom commands (for any add-on) to Window.
     *
     * @private
     */
    SkillShopCommand.prototype._addCustomCommand = function() {
        // made for future add-ons
    };

    /**
     * Add exit command to Window.
     *
     * @private
     */
    SkillShopCommand.prototype._addExitCommand = function() {
        var text = Utils.parameters['Cancel Command'];

        this.addCommand(text, 'cancel', true);
    };

    $SkillShop.Windows.SkillShopCommand = SkillShopCommand;
}(YED.SkillShop));

/* globals YED: false */

(function($SkillShop) {
    /**
     * Window shows actors list for shop.
     *
     * @class
     * @extends external:Window_Selectable
     * @memberof YED.SkillShop.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} wh Window Height
     */
    var SkillShopActors = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    SkillShopActors.prototype =
        Object.create(Window_Selectable.prototype);
    SkillShopActors.prototype.constructor = SkillShopActors;

    /**
     * Initialize
     *
     * @constructs SkillShopActors
     */
    SkillShopActors.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();

        Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);

        this._windowStatus = null;
        this.refresh();
    };

    /**
     * Define Properties
     */
    Object.defineProperties(SkillShopActors.prototype, {
        /**
         * Window to show current actor status.
         *
         * @member {Window_SkillStatus}
         * @memberof YED.SkillShop.Windows.SkillShopActors#
         */
        windowStatus: {
            get: function() {
                return this._windowStatus;
            },

            set: function(window) {
                this._windowStatus = window;
                this._callUpdateStatus();
            },

            configurable: true
        }
    });

    /**
     * Window height for initialize.
     *
     * @return {number} Window Height
     */
    SkillShopActors.prototype.windowWidth = function() {
        return Graphics.boxWidth / 2;
    };

    /**
     * Refresh Window contents.
     */
    SkillShopActors.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    /**
     * Get actors list.
     */
    SkillShopActors.prototype.makeItemList = function() {
        this._data = $gameParty.members();
    };

    /**
     * Get current actor.
     *
     * @return {Game_Actor} Current select actor
     */
    SkillShopActors.prototype.actor = function() {
        return this._data[this.index()];
    };

    /**
     * Get party current size.
     *
     * @return {number} Total actors
     */
    SkillShopActors.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    /**
     * Draw actor status.
     *
     * @param  {number} index Actor Index
     */
    SkillShopActors.prototype.drawItem = function(index) {
        var actor = this._data[index],
            rect = this.itemRect(index);

        this.drawActorFace(actor, rect.x + 1, rect.y + 1, rect.height - 2, rect.height - 2);
        this.drawActorName(actor, rect.x + rect.height + 4, rect.y, rect.width);
    };

    /**
     * Draw face mini.
     */
    SkillShopActors.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
        var bitmap = ImageManager.loadFace(faceName);
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sw = pw;
        var sh = ph;
        var dx = x;
        var dy = y;
        var sx = faceIndex % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;

        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, width, height);
    };

    /**
     * Draw actor name.
     */
    SkillShopActors.prototype.drawActorName = function(actor, x, y, width) {
        this.drawText(actor.name(), x, y, width);
    };

    /**
     * Select item at certain index.
     *
     * @param {number} index Item index.
     */
    SkillShopActors.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);

        this._callUpdateStatus();
    };

    /**
     * Call update Status Window.
     */
    SkillShopActors.prototype._callUpdateStatus = function() {
        if (this.active && this.windowStatus) {
            this._updateStatus();
        }
    };

    /**
     * Update Status Window.
     */
    SkillShopActors.prototype._updateStatus = function() {
        this.windowStatus.setActor(this.actor());
    };

    $SkillShop.Windows.SkillShopActors = SkillShopActors;
}(YED.SkillShop));

/* globals YED: false */

(function($SkillShop) {
    /**
     * Window shows skills list for shop.
     *
     * @class
     * @extends external:Window_Selectable
     * @memberof YED.SkillShop.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} wh Window Height
     */
    var SkillShopSkills = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    SkillShopSkills.prototype =
        Object.create(Window_Selectable.prototype);
    SkillShopSkills.prototype.constructor = SkillShopSkills;

    /**
     * Initialize
     *
     * @constructs SkillShopSkills
     */
    SkillShopSkills.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();

        Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);

        this._windowCost = null;
        this._data = [];
        this._actor = null;
    };

    /**
     * Define Properties
     */
    Object.defineProperties(SkillShopSkills.prototype, {
        /**
         * Window to show current skill costs.
         *
         * @member {YED.SkillShop.Windows.SkillShopCosts}
         * @memberof YED.SkillShop.Windows.SkillShopSkills#
         */
        windowCost: {
            get: function() {
                return this._windowCost;
            },

            set: function(window) {
                this._windowCost = window;
                this._callUpdateCost();
            },

            configurable: true
        },

        /**
         * Skills list.
         *
         * @member {Object}
         * @memberof YED.SkillShop.Windows.SkillShopSkills#
         */
        data: {
            get: function() {
                return this._data;
            },

            set: function(data) {
                this._data = data.map(function(id) {
                    return $dataSkills[id];
                });
            },

            configurable: true
        },

        /**
         * Current Actor
         *
         * @member {Game_Actor}
         * @memberof YED.SkillShop.Windows.SkillShopSkills#
         */
        actor: {
            get: function() {
                return this._actor;
            },

            set: function(actor) {
                this._actor = actor;
                this.refresh();
            },

            configurable: true
        }
    });

    /**
     * Window height for initialize.
     *
     * @return {number} Window Height
     */
    SkillShopSkills.prototype.windowWidth = function() {
        return Graphics.boxWidth / 2;
    };

    /**
     * Refresh Window contents.
     */
    SkillShopSkills.prototype.refresh = function() {
        this.createContents();
        this.drawAllItems();
    };

    /**
     * Get current skill.
     *
     * @return {Object} Current select skill
     */
    SkillShopSkills.prototype.skill = function() {
        return this._data[this.index()];
    };

    /**
     * Get skills list size.
     *
     * @return {number} Total skills
     */
    SkillShopSkills.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    /**
     * Check if current skill is boughtable.
     *
     * @return {Boolean} Enabled Flag
     */
    SkillShopSkills.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.skill());
    };

    /**
     * Check if current skill is boughtable.
     *
     * @return {Boolean} Enabled Flag
     */
    SkillShopSkills.prototype.isEnabled = function(skill) {
        return !!skill ? this.actor.canBuySkill(skill) : false;
    };

    /**
     * Draw skill name.
     *
     * @param  {number} index Skill Index
     */
    SkillShopSkills.prototype.drawItem = function(index) {
        var skill = this._data[index],
            rect = this.itemRect(index);

        this.changePaintOpacity(this.isEnabled(skill));
        this.drawItemName(skill, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    };

    /**
     * Select item at certain index.
     *
     * @param {number} index Item index.
     */
    SkillShopSkills.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);

        this._callUpdateCost();
    };

    /**
     * Update Help Window.
     */
    SkillShopSkills.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.skill());
    };

    /**
     * Call update Cost Window.
     */
    SkillShopSkills.prototype._callUpdateCost = function() {
        if (this.active && this.windowCost) {
            this._updateCost();
        }
    };

    /**
     * Update Cost Window.
     */
    SkillShopSkills.prototype._updateCost = function() {
        this.windowCost.skill = this.skill();
    };

    $SkillShop.Windows.SkillShopSkills = SkillShopSkills;
}(YED.SkillShop));

/* globals YED: false */

(function($SkillShop) {
    /**
     * Shorten Dependencies
     */
    var Utils = $SkillShop.Utils;

    /**
     * Window shows buying costs for skill.
     *
     * @class
     * @extends external:Window_Base
     * @memberof YED.SkillShop.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} wh Window Height
     */
    var SkillShopCosts = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    SkillShopCosts.prototype = Object.create(Window_Base.prototype);
    SkillShopCosts.prototype.constructor = SkillShopCosts;

    /**
     * Initialize
     *
     * @constructs SkillShopCosts
     */
    SkillShopCosts.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();

        Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);

        this._skill = null;
        this.refresh();
    };

    /**
     * Define Properties
     */
    Object.defineProperties(SkillShopCosts.prototype, {
        /**
         * Current skill.
         *
         * @member {Object}
         * @memberof YED.SkillShop.Windows.SkillShopCosts#
         */
        skill: {
            get: function() {
                return this._skill;
            },

            set: function(skill) {
                this._skill = skill;
                this.refresh();
            },

            configurable: true
        }
    });

    /**
     * Window height for initialize.
     *
     * @return {number} Window Width
     */
    SkillShopCosts.prototype.windowWidth = function() {
        return Graphics.boxWidth / 2;
    };

    /**
     * Refresh window contents.
     */
    SkillShopCosts.prototype.refresh = function() {
        var rect = new Rectangle();

        rect.x = 2;
        rect.y = 0;
        rect.width = this.contentsWidth() - 2;
        rect.height = this.lineHeight();

        this.contents.clear();
        this.resetFontSettings();

        if (!this.skill) {
            return;
        }

        this.drawItemName(this.skill, rect.x, rect.y, rect.width);
        // ---
        rect.y += this.lineHeight();
        // ---
        this._drawCostGold(this.skill, rect);
        // ---
        this._drawCostItems(this.skill, rect);
        // ---
        this._drawCostCustom(this.skill, rect);
    };

    /**
     * Draw gold cost for skill.
     */
    SkillShopCosts.prototype._drawCostGold = function(item, rect) {
        var text = Utils.parameters['Gold Cost Text'];

        if (item.getBuyCostGold() <= 0) {
            return;
        }

        this.changeTextColor(this.systemColor());
        this.drawText(text, rect.x, rect.y, rect.width);

        this.drawCurrencyValue(item.getBuyCostGold(),
            this._currencyUnit(), rect.x, rect.y, rect.width);

        rect.y += this.lineHeight();
    };

    /**
     * Draw gold cost for skill.
     */
    SkillShopCosts.prototype._drawCostItems = function(item, rect) {
        var text = Utils.parameters['Item Cost Text'],
            itemCosts = item.getBuyCostItems(),
            cost;

        if (itemCosts.length === 0) {
            return;
        }

        this.changeTextColor(this.systemColor());
        this.drawText(text, rect.x, rect.y, rect.width);

        rect.y += this.lineHeight();

        for (var i = 0; i < itemCosts.length; i++) {
            cost = itemCosts[i];

            this.drawItemName(cost[0], rect.x, rect.y,
                rect.width - this._numberWidth());

            this.drawText('x', rect.x, rect.y,
                rect.width - this.textWidth('00'), 'right');
            this.drawText(cost[1], rect.x, rect.y, rect.width, 'right');

            rect.y += this.lineHeight();
        }
    };

    /**
     * Draw gold cost for skill.
     */
    SkillShopCosts.prototype._drawCostCustom = function(item, rect) {
        var customCosts = item.getBuyCustomText();

        this.drawTextEx(customCosts, rect.x, rect.y);
    };

    /**
     * Get currency unit.
     *
     * @return {String} Currency Unit
     */
    SkillShopCosts.prototype._currencyUnit = function() {
        return TextManager.currencyUnit;
    };

    /**
     * Get number width for item requirements.
     */
    SkillShopCosts.prototype._numberWidth = function() {
        return this.textWidth('000');
    };

    $SkillShop.Windows.SkillShopCosts = SkillShopCosts;
}(YED.SkillShop));

/* globals YED: false */

(function($SkillShop) {
    /**
     * Window shows party gold.
     *
     * @class
     * @extends external:Window_Gold
     * @memberof YED.SkillShop.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} [wh] Window Height
     */
    var SkillShopGold = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    SkillShopGold.prototype = Object.create(Window_Gold.prototype);
    SkillShopGold.prototype.constructor = SkillShopGold;

    SkillShopGold.prototype.windowWidth = function() {
        return Graphics.boxWidth / 2;
    };

    /**
     * Initialize
     *
     * @constructs SkillShopGold
     */
    SkillShopGold.prototype.initialize = function(wx, wy) {
        Window_Gold.prototype.initialize.call(this, wx, wy);
    };

    $SkillShop.Windows.SkillShopGold = SkillShopGold;
}(YED.SkillShop));

/* globals YED: false */

(function($SkillShop) {
    /**
     * Shorten Dependencies
     */
    var Windows = $SkillShop.Windows;

    /**
     * Scene for Hospital.
     *
     * @class
     * @extends external:Scene_MenuBase
     * @memberof YED.SkillShop.Scenes
     */
    var SkillShop = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Scene_MenuBase
     */
    SkillShop.prototype = Object.create(Scene_MenuBase.prototype);
    SkillShop.prototype.constructor = SkillShop;

    /**
     * Initialize
     *
     * @constructs SkillShop
     */
    SkillShop.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    /**
     * Prepare skills list.
     */
    SkillShop.prototype.prepare = function(skillIds) {
        this._skillIds = skillIds;
        this._prepareImages();
    };

    /**
     * Create Windows.
     */
    SkillShop.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._createGoldWindow();
        this._createHelpWindow();
        this._createCommandWindow();
        this._createStatusWindow();
        this._createActorsWindow();
        this._createSkillsWindow();
        this._createCostWindow();
    };

    /**
     * Refresh Windows.
     */
    SkillShop.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this._statusWindow.setActor($gameParty.members()[0]);
    };

    /**
     * Create Gold Window.
     *
     * @private
     */
    SkillShop.prototype._createGoldWindow = function() {
        this._goldWindow = new Windows.SkillShopGold(0, 0);
        this._goldWindow.x = 0;
        this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
        this.addWindow(this._goldWindow);
    };

    /**
     * Create Help Window.
     *
     * @private
     */
    SkillShop.prototype._createHelpWindow = function() {
        this._helpWindow = new Window_Help();
        this.addWindow(this._helpWindow);
    };

    /**
     * Create Command Window.
     *
     * @private
     */
    SkillShop.prototype._createCommandWindow = function() {
        this._commandWindow = new Windows.SkillShopCommand(0, 0);
        this._commandWindow.y = this._helpWindow.y + this._helpWindow.height;

        this._commandWindow.setHandler('buySkill',
            this._commandBuySkill.bind(this));
        this._commandWindow.setHandler('cancel',
            this.popScene.bind(this));

        this.addWindow(this._commandWindow);
    };

    /**
     * Create Status Window.
     *
     * @private
     */
    SkillShop.prototype._createStatusWindow = function() {
        var wx = this._commandWindow.width,
            wy = this._commandWindow.y,
            ww = Graphics.boxWidth - this._commandWindow.width,
            wh = this._commandWindow.height;

        this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
        this.addWindow(this._statusWindow);
    };

    /**
     * Create Actors Window.
     *
     * @private
     */
    SkillShop.prototype._createActorsWindow = function() {
        var wx = 0,
            wy = this._commandWindow.y + this._commandWindow.height,
            ww = null, // get default width
            wh = Graphics.boxHeight - wy - this._goldWindow.height;

        this._actorsWindow = new Windows.SkillShopActors(wx, wy, ww, wh);
        this._actorsWindow.windowStatus = this._statusWindow;

        this._actorsWindow.setHandler('ok', this._onActorOk.bind(this));
        this._actorsWindow.setHandler('cancel', this._onActorCancel.bind(this));

        this.addWindow(this._actorsWindow);
    };

    /**
     * Create Skills Window.
     *
     * @private
     */
    SkillShop.prototype._createSkillsWindow = function() {
        var wx = 0,
            wy = this._actorsWindow.y,
            ww = null, // get default width
            wh = Graphics.boxHeight - wy - this._goldWindow.height;

        this._skillsWindow = new Windows.SkillShopSkills(wx, wy, ww, wh);
        this._skillsWindow.data = this._skillIds;
        this._skillsWindow.setHelpWindow(this._helpWindow);
        this._skillsWindow.hide();

        this._skillsWindow.setHandler('ok', this._onSkillOk.bind(this));
        this._skillsWindow.setHandler('cancel', this._onSkillCancel.bind(this));

        this.addWindow(this._skillsWindow);
    };

    /**
     * Create Cost Window.
     *
     * @private
     */
    SkillShop.prototype._createCostWindow = function() {
        var wx = this._actorsWindow.width,
            wy = this._actorsWindow.y,
            ww = null, // get default width
            wh = Graphics.boxHeight - wy;

        this._costWindow = new Windows.SkillShopCosts(wx, wy, ww, wh);
        this._skillsWindow.windowCost = this._costWindow;
        this.addWindow(this._costWindow);
    };

    /**
     * Handler for command buySkill
     *
     * @private
     */
    SkillShop.prototype._commandBuySkill = function() {
        this._actorsWindow.activate();
        this._actorsWindow.select(0);
    };

    /**
     * Handler for actor selection
     *
     * @private
     */
    SkillShop.prototype._onActorOk = function() {
        this._actorsWindow.hide();

        this._skillsWindow.actor = this._actorsWindow.actor();
        this._skillsWindow.show();
        this._skillsWindow.activate();
        this._skillsWindow.select(0);
    };

    /**
     * Handler for actor cancel
     *
     * @private
     */
    SkillShop.prototype._onActorCancel = function() {
        this._commandWindow.activate();

        this._actorsWindow.deselect();
        this._statusWindow.setActor($gameParty.members()[0]);
    };

    /**
     * Handler for skill selection
     *
     * @private
     */
    SkillShop.prototype._onSkillOk = function() {
        var actor = this._skillsWindow.actor,
            skill = this._skillsWindow.skill();

        actor.buySkill(skill);

        this._skillsWindow.activate();
        this._skillsWindow.refresh();

        this._statusWindow.refresh();

        this._goldWindow.refresh();
    };

    /**
     * Handler for skill cancel
     *
     * @private
     */
    SkillShop.prototype._onSkillCancel = function() {
        this._actorsWindow.activate();
        this._actorsWindow.show();

        this._skillsWindow.hide();
        this._skillsWindow.deselect();
        this._costWindow.skill = null;
    };

    /**
     * Prepare images.
     *
     * @private
     */
    SkillShop.prototype._prepareImages = function() {
        var members = $gameParty.members();

        for (var i = 0; i < members.length; i++) {
            ImageManager.loadFace(members[i].faceName());
        }
    };

    $SkillShop.Scenes.SkillShop = SkillShop;
}(YED.SkillShop));

/* globals YED: false */

(function($SkillShop) {
    /**
     * Shorten Dependencies
     */
    var Utils = $SkillShop.Utils;

    /**
     * Aliasing methods
     */
    var _Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;

    /**
     * Extending: Game_Interpreter.prototype.pluginCommand
     *
     * Add go to Hospital Scene Plugin Command.
     */
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        var match, ids;

        // actual pluginCommand
        _Game_Interpreter_pluginCommand.call(this, command, args);

        // SkillShop Plugin Command
        match = command.match(/OpenSkillShop\((.+)\)/i);
        if (match) {
            ids = match[1].split(',').map(function(id) {
                return parseInt(id);
            });

            Utils.gotoSkillShopScene.call(this, ids);
        }

        // SkillShop Plugin Command
        match = command.match(/OpenSkillShop/i);
        if (match) {
            Utils.gotoSkillShopScene.call(this, args);
        }
    };
}(YED.SkillShop));
