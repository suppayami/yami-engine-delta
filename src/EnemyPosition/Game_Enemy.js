(function() {
    var _Game_Enemy_screenX = Game_Enemy.prototype.screenX;
    var _Game_Enemy_screenY = Game_Enemy.prototype.screenY;

    Game_Enemy.prototype.screenX = function() {
        var result,
            position = this.enemy().getPosition(),
            offsets  = this.enemy().getPositionOffsets();

        result = position.x || _Game_Enemy_screenX.call(this);
        result = result + offsets.x;

        return result;
    };

    Game_Enemy.prototype.screenY = function() {
        var result,
            position = this.enemy().getPosition(),
            offsets  = this.enemy().getPositionOffsets();

        result = position.y || _Game_Enemy_screenY.call(this);
        result = result + offsets.y;

        return result;
    };
}());
