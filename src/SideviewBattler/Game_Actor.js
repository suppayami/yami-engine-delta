(function() {
    /**
     * Aliasing methods
     */
    var _Game_Actor_battlerName
        = Game_Actor.prototype.battlerName;

    Game_Actor.prototype.battlerName = function() {
        if (this.isSideviewBattler()) {
            return this.getSideviewFilename();
        }

        return _Game_Actor_battlerName.call(this);
    };
}());
