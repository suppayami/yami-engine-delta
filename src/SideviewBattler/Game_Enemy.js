(function() {
    /**
     * Aliasing methods
     */
    var _Game_Enemy_battlerName
        = Game_Enemy.prototype.battlerName;

    Game_Enemy.prototype.battlerName = function() {
        if (this.isSideviewBattler()) {
            return this.getSideviewFilename();
        }

        return _Game_Enemy_battlerName.call(this);
    };
}());
