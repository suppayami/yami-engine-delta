(function() {
    var _Sprite_Actor_refreshMotion
        = Sprite_Actor.prototype.refreshMotion;

    Sprite_Actor.prototype.refreshMotion = function() {
        var actor = this._actor,
            motionGuard = Sprite_Actor.MOTIONS['guard'];

        if (actor) {
            if (this._motion === motionGuard && !BattleManager.isInputting()) {
                return;
            }

            _Sprite_Actor_refreshMotion.call(this);
        }
    };
}());
