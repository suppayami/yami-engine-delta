/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Utils = YED.Hospital.Utils;

    /**
     * Calculate hospital fees for actor.
     *
     * @function external:Game_Actor#hospitalFee
     * @return {number} Total hospital fees
     */
    Game_Actor.prototype.hospitalFee = function() {
        var fee    = 0,
            states = this.getHospitalStates();

        fee += this.getHospitalHpFeeRate();
        fee += this.getHospitalMpFeeRate();

        for (var i = 0; i < states.length; i++) {
            fee += this.getHospitalStateFeeRate(states[i]);
        }

        return fee;
    };

    /**
     * Get hospital fee for each HP lost.
     *
     * @function external:Game_Actor#getHospitalHpFeeRate
     * @return {number} Hospital HP Fee Rate
     */
    Game_Actor.prototype.getHospitalHpFeeRate = function() {
        var lostHp = Math.max(this.mhp - this._hp, 0);

        return Utils.parameters['HP Price'] * lostHp;
    };

    /**
     * Get hospital fee for each MP lost.
     *
     * @function external:Game_Actor#getHospitalMpFeeRate
     * @return {number} Hospital MP Fee Rate
     */
    Game_Actor.prototype.getHospitalMpFeeRate = function() {
        var lostMp = Math.max(this.mmp - this._mp, 0);

        return Utils.parameters['MP Price'] * lostMp;
    };

    /**
     * Get hospital fee for each state to be removed.
     *
     * @function external:Game_Actor#getHospitalStateFeeRate
     * @param  {Object} state State object
     * @return {number} Hospital State Fee Rate
     */
    Game_Actor.prototype.getHospitalStateFeeRate = function(state) {
        return state.getHospitalFee();
    };

    /**
     * Get states need to be hospitalized.
     *
     * @function external:Game_Actor#getHospitalStates
     * @return {Object[]} States Array
     */
    Game_Actor.prototype.getHospitalStates = function() {
        return this.states().filter(function(state) {
            return !state.getNoHospital();
        });
    };

    /**
     * Recover and pay the hospital fee.
     *
     * @function external:Game_Actor#hospitalize
     */
    Game_Actor.prototype.hospitalize = function() {
        this._hospitalPay();
        this._hospitalRecover();
    };

    /**
     * Check if actor is healthy.
     *
     * @function external:Game_Actor#isHealthy
     * @return {Boolean} Is healthy
     */
    Game_Actor.prototype.isHealthy = function() {
        return this._hp >= this.mhp
            && this._mp >= this.mmp
            && this.getHospitalStates().length === 0;
    };

    /**
     * Check if actor needs to be hospitalized.
     *
     * @function external:Game_Actor#isHospitalizable
     * @return {Boolean} Need hospitalize
     */
    Game_Actor.prototype.isHospitalizable = function() {
        var notHealthy = !this.isHealthy(),
            enoughMoney = $gameParty.gold() >= this.hospitalFee();

        return notHealthy && enoughMoney;
    };

    /**
     * Hospital Recover method.
     *
     * @function external:Game_Actor#_hospitalRecover
     * @private
     */
    Game_Actor.prototype._hospitalRecover = function() {
        var states = this.getHospitalStates();

        for (var i = 0; i < states.length; i++) {
            this.removeState(states[i].id);
        }

        this._hp = this.mhp;
        this._mp = this.mmp;
    };

    /**
     * Hospital Paying Fee method.
     *
     * @function external:Game_Actor#_hospitalPay
     * @private
     */
    Game_Actor.prototype._hospitalPay = function() {
        $gameParty.loseGold(this.hospitalFee());
    };
}());
