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
