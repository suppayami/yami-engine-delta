(function() {
    var _Game_Character_setMoveRoute = Game_Event.prototype.setMoveRoute;
    var _Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;

    Game_Character.prototype.queueMoveRoute = function(moveRoute) {
        this._originalMoveRoute       = moveRoute;
        this._originalMoveRouteIndex  = 0;
    };

    Game_Character.prototype.setMoveRoute = function(moveRoute) {
        if (!this._moveRouteForcing) {
            _Game_Character_setMoveRoute.call(this, moveRoute);
        } else {
            this.queueMoveRoute(moveRoute);
        }
    };
}());
