(function() {

    /**
     * Calculate hospital fees for the whole party.
     *
     * @function external:Game_Party#hospitalFee
     * @return {number} Total hospital fees
     */
    Game_Party.prototype.hospitalFee = function() {
        var members = this.members(),
            fee     = 0;

        for (var i = 0; i < members.length; i++) {
            fee += members[i].hospitalFee();
        }

        return fee;
    };

    /**
     * Recover and pay the hospital fee.
     *
     * @function external:Game_Party#hospitalize
     */
    Game_Party.prototype.hospitalize = function() {
        var members = this.members();

        for (var i = 0; i < members.length; i++) {
            members[i].hospitalize();
        }
    };

    /**
     * Check if party is healthy.
     *
     * @function external:Game_Party#isHealthy
     * @return {Boolean} Is healthy
     */
    Game_Party.prototype.isHealthy = function() {
        var members = this.members();

        for (var i = 0; i < members.length; i++) {
            if (!members[i].isHealthy()) {
                return false;
            }
        }

        return true;
    };

    /**
     * Check if party needs to be hospitalized.
     *
     * @function external:Game_Party#isHospitalizable
     * @return {Boolean} Need hospitalize
     */
    Game_Party.prototype.isHospitalizable = function() {
        var members = this.members();

        if ($gameParty.gold() < this.hospitalFee()) {
            return false;
        }

        for (var i = 0; i < members.length; i++) {
            if (members[i].isHospitalizable()) {
                return true;
            }
        }

        return false;
    };
}());
