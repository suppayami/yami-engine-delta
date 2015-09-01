/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Regexp = YED.SkillShop.Regexp;

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

        result['Requirements Text'] =
            String(parameters['Requirements Text'] || 'Requirements');
    };

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.SkillShop.Utils
     */
    Utils.processNotetags = function() {
        var group = $dataStates,    // shorten group name
            obj,
            notedata,
            line;

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
     * @memberof YED.SkillShop.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._buyCost = {};

        obj._buyCost.goldCost = Utils.parameters['Default Price'];
        obj._buyCost.itemCost = [];
        obj._buyCost.variableCost = [];

        obj._buyCost.switchRequire = [];
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
        obj.getBuyCost = Utils.getBuyCost;
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
    Utils._processNotetag = function(obj, notetag) {
        var buyCost = obj._buyCost,
            match,
            type,
            id,
            number,
            flag;

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

        match = notetag.match(Regexp.VARIABLE_COST);
        if (match) {
            id = Number(match[1]);
            number = Number(match[2]);

            buyCost.variableCost.push([id, number]);
        }

        match = notetag.match(Regexp.SWITCH_NEED);
        if (match) {
            id = Number(match[1]);
            flag = match[2].toLowerCase() === 'true' ? true : false;

            buyCost.switchRequire.push([id, flag]);
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
            el,
            id,
            amount,
            item,
            i,
            type;

        for (i = 0; i < itemCost.length; i++) {
            el = itemCost[i];

            type = el[0];
            id = el[1];
            amount = el[2];

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

    YED.SkillShop.Utils = Utils;
}());
