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
