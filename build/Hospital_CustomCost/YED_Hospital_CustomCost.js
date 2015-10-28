/*:
 * Yami Engine Delta - Hospital - Custom Costs
 *
 * @plugindesc v1.0.0 Provides YED_Hospital custom costs for recovering.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param [Default Eval Price]
 * @default
 *
 * @param Enable Default Eval
 * @desc Enable the Price in this section.
 * @default true
 *
 * @param HP Price (Eval)
 * @desc Needed money for recovering full HP. Evalable.
 * actor refers to actor object.
 * @default (1 - actor.hpRate()) * 100 * 50 * actor.level
 *
 * @param MP Price (Eval)
 * @desc Needed money for recovering full MP. Evalable.
 * actor refers to actor object.
 * @default (1 - actor.mpRate()) * 100 * 100 * actor.level
 *
 * @param State Price (Eval)
 * @desc Needed money for removing a state. Evalable.
 * actor refers to actor object. price refers to default fee.
 * @default price * actor.level
 *
 * @param [Cost Weapons]
 * @default
 *
 * @param Hospital Weapon Costs
 * @desc Needed weapons for fully recovering. Array of [WeaponID, Quantity]
 * @default
 *
 * @param [Cost Armors]
 * @default
 *
 * @param Hospital Armor Costs
 * @desc Needed armors for fully recovering. Array of [ArmorID, Quantity]
 * @default
 *
 * @param [Cost Items]
 * @default
 *
 * @param Hospital Item Costs
 * @desc Needed items for fully recovering. Array of [ItemID, Quantity]
 * @default
 *
 * @help
 * The following are Plugin Commands you may use with events.
 *
 * Plugin Command:
 *   OpenHospital       Opens up the Hospital Scene from the field.
 */

/**
 * @namespace Hospital
 * @memberof YED
 */

var YED = YED || {};

// catch empty module
if (!YED.Hospital) {
    throw new Error('[YED_Hospital_CustomCost] Plugin YED_Hospital not found');
}

/**
 * Contains module CustomCost for module Hospital.
 *
 * @namespace CustomCost
 * @memberof YED.Hospital
 */
YED.Hospital.CustomCost = {};

/* globals YED: false */

(function($exports, $PluginManager) {
    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.Hospital.CustomCost
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf  YED.Hospital.CustomCost.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.Hospital.CustomCost.Utils
     */
    Utils.processParameters = function() {
        var parameters = $PluginManager.parameters('YED_Hospital_CustomCost'),
            result     = Utils.parameters;

        result['Enable Default Eval']
            = eval(parameters['Enable Default Eval']);

        result['HP Price (Eval)'] = parameters['HP Price (Eval)'];
        result['MP Price (Eval)'] = parameters['MP Price (Eval)'];
        result['State Price (Eval)'] = parameters['State Price (Eval)'];

        result['Hospital Weapon Costs']
            = eval("[" + parameters['Hospital Weapon Costs'] + "]");
        result['Hospital Armor Costs']
            = eval("[" + parameters['Hospital Armor Costs'] + "]");
        result['Hospital Item Costs']
            = eval("[" + parameters['Hospital Item Costs'] + "]");
    };

    $exports.Utils = Utils;
}(YED.Hospital.CustomCost, PluginManager));

/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function($Utils) {
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

        $Utils.processParameters.call(DataManager);

        return true;
    };
}(YED.Hospital.CustomCost.Utils));

/* globals YED: false */

(function($Utils) {
    /**
     * Aliasing methods
     */
    var _Game_Actor_getHospitalHpFeeRate
        = Game_Actor.prototype.getHospitalHpFeeRate;
    var _Game_Actor_getHospitalMpFeeRate
        = Game_Actor.prototype.getHospitalMpFeeRate;
    var _Game_Actor_getHospitalStateFeeRate
        = Game_Actor.prototype.getHospitalStateFeeRate;
    var _Game_Actor_isHospitalizable
        = Game_Actor.prototype.isHospitalizable;
    var _Game_Actor__hospitalPay
        = Game_Actor.prototype._hospitalPay;

    /**
     * Get hospital fee for each HP lost.
     *
     * @function external:Game_Actor#getHospitalHpFeeRate
     * @return {number} Hospital HP Fee Rate
     */
    Game_Actor.prototype.getHospitalHpFeeRate = function() {
        var actor  = this,
            fee    = 0,
            errMsg = '[YED_Hospital_CustomCost] Has problems with HP Price (Eval)';

        if (!$Utils.parameters['Enable Default Eval']) {
            return _Game_Actor_getHospitalHpFeeRate.call(this);
        }

        try {
            fee = eval($Utils.parameters['HP Price (Eval)']);
        } catch (err) {
            throw new Error(errMsg);
        }

        if (isNaN(parseInt(fee))) {
            throw new Error(errMsg);
        }

        return Math.round(fee);
    };

    /**
     * Get hospital fee for each MP lost.
     *
     * @function external:Game_Actor#getHospitalMpFeeRate
     * @return {number} Hospital MP Fee Rate
     */
    Game_Actor.prototype.getHospitalMpFeeRate = function() {
        var actor = this,
            fee   = 0,
            errMsg = '[YED_Hospital_CustomCost] Has problems with MP Price (Eval)';

        if (!$Utils.parameters['Enable Default Eval']) {
            return _Game_Actor_getHospitalMpFeeRate.call(this);
        }

        try {
            fee = eval($Utils.parameters['MP Price (Eval)']);
        } catch (err) {
            throw new Error(errMsg);
        }

        if (isNaN(parseInt(fee))) {
            throw new Error(errMsg);
        }

        return Math.round(fee);
    };

    /**
     * Get hospital fee for each state to be removed.
     *
     * @function external:Game_Actor#getHospitalStateFeeRate
     * @param  {Object} state State object
     * @return {number} Hospital State Fee Rate
     */
    Game_Actor.prototype.getHospitalStateFeeRate = function(state) {
        var actor  = this,
            price  = _Game_Actor_getHospitalStateFeeRate.call(this, state),
            fee    = 0,
            errMsg = '[YED_Hospital_CustomCost] Has problems with State Price (Eval)';

        if (!$Utils.parameters['Enable Default Eval']) {
            return _Game_Actor_getHospitalStateFeeRate.call(this, state);
        }

        try {
            fee = eval($Utils.parameters['State Price (Eval)']);
        } catch (err) {
            throw new Error(errMsg);
        }

        if (isNaN(parseInt(fee))) {
            throw new Error(errMsg);
        }

        return Math.round(fee);
    };

    Game_Actor.prototype.getHospitalItemCosts = function() {
        var weapons = $Utils.parameters['Hospital Weapon Costs'],
            armors  = $Utils.parameters['Hospital Armor Costs'],
            items   = $Utils.parameters['Hospital Item Costs'],
            results;

        weapons = weapons.map(function(item) {
            return [$dataWeapons[item[0]], item[1]];
        });

        armors = armors.map(function(item) {
            return [$dataArmors[item[0]], item[1]];
        });

        items = items.map(function(item) {
            return [$dataItems[item[0]], item[1]];
        });

        results = weapons.concat(armors);
        results = results.concat(items);

        return results;
    };

    /**
     * Check if actor needs to be hospitalized.
     *
     * @function external:Game_Actor#isHospitalizable
     * @return {Boolean} Need hospitalize
     */
    Game_Actor.prototype.isHospitalizable = function() {
        var isHospitalizable = _Game_Actor_isHospitalizable.call(this),
            hasItems = this.hasHospitalItems();

        return isHospitalizable && hasItems;
    };

    /**
     * Check if party has enough items for hospitalize.
     *
     * @function external:Game_Actor#hasHospitalItems
     * @return {Boolean} Has enough items
     */
    Game_Actor.prototype.hasHospitalItems = function() {
        var items = this.getHospitalItemCosts();

        for (var i = 0; i < items.length; i++) {
            if ($gameParty.numItems(items[i][0]) < items[i][1]) {
                return false;
            }
        }

        return true;
    };

    /**
     * Hospital Paying Fee method.
     *
     * @function external:Game_Actor#_hospitalPay
     * @private
     */
    Game_Actor.prototype._hospitalPay = function() {
        _Game_Actor__hospitalPay.call(this);

        this._hospitalPayItems();
    };

    /**
     * Hospital Paying Items method.
     *
     * @function external:Game_Actor#_hospitalPayItems
     * @private
     */
    Game_Actor.prototype._hospitalPayItems = function() {
        var items = this.getHospitalItemCosts();

        for (var i = 0; i < items.length; i++) {
            $gameParty.gainItem(items[i][0], -items[i][1]);
        }
    };
}(YED.Hospital.CustomCost.Utils));

/* globals YED: false */

(function($Hospital) {
    var HospitalActors = $Hospital.Windows.HospitalActors;

    /**
     * Draw actor hospital fees.
     *
     * @param  {Game_Actor} actor Actor
     * @param  {number} x     Draw at X
     * @param  {number} y     Draw at Y
     * @param  {number} width Limit Text Width
     */
    HospitalActors.prototype.drawActorHospital = function(actor, x, y, width) {
        var items = actor.getHospitalItemCosts();

        width = width || 168;

        if (items.length > 0) {
            this.drawItemCosts(actor, x, y, width);
        }

        if (items.length === 0) {
            this.drawCurrencyValue(actor.hospitalFee(),
                this.currencyUnit(), x, y, width);
        }
    };

    /**
     * Draw actor hospital fees.
     *
     * @param  {Game_Actor} actor Actor
     * @param  {number} x     Draw at X
     * @param  {number} y     Draw at Y
     * @param  {number} width Limit Text Width
     */
    HospitalActors.prototype.drawItemCosts = function(actor, x, y, width) {
        var items = actor.getHospitalItemCosts(),
            itemWidth = Window_Base._iconWidth + this.textPadding(),
            dx = x;

        width = width || 168;
        items = items.slice(0, Math.floor(width / itemWidth));
        dx    = dx + width;

        for (var i = items.length - 1; i >= 0; i--) {
            dx -= Window_Base._iconWidth;
            this.drawIcon(items[i][0].iconIndex, dx, y);

            dx -= Window_Base._iconWidth;
            dx -= this.textPadding() / 2;
            this.drawText(items[i][1]+"x", dx, y, Window_Base._iconWidth + this.textPadding() / 2, 0);

            dx -= this.textPadding() / 2;
        }
    };
}(YED.Hospital));
