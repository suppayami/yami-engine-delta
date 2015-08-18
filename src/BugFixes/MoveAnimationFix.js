(function() {
    var _Game_CharacterBase_updateMove = Game_CharacterBase.prototype.updateMove;

    Game_CharacterBase.prototype.update = function() {
        if (this.isJumping()) {
            this.updateJump();
        } else if (this.isMoving()) {
            this.updateMove();
        }

        if (!this.isMoving()) {
            this.updateStop();
        }

        this.updateAnimation();
    };

    Game_CharacterBase.prototype.updateMove = function() {
        _Game_CharacterBase_updateMove.call(this);

        if (!this.isMoving()) {
            this.updateStop();
        }
    };

    Game_Event.prototype.updateSelfMovement = function() {
        _yami_Game_Event_updateSelfMovement.call(this);

        if (this.isNearTheScreen() && this.checkStop(this.stopCountThreshold())) {
            this.resetStopCount();
        }
    };
}());
