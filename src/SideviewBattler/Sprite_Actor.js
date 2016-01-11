(function() {
    /**
     * Aliasing methods
     */
    var _Sprite_Actor_initMembers
        = Sprite_Actor.prototype.initMembers;
    var _Sprite_Actor_setupWeaponAnimation
        = Sprite_Actor.prototype.setupWeaponAnimation;
    var _Sprite_Actor_startMotion
        = Sprite_Actor.prototype.startMotion;
    var _Sprite_Actor_forceMotion
        = Sprite_Actor.prototype.forceMotion;
    var _Sprite_Actor_motionSpeed
        = Sprite_Actor.prototype.motionSpeed;
    var _Sprite_Actor_updateFrame
        = Sprite_Actor.prototype.updateFrame;
    var _Sprite_Actor_updateMotionCount
        = Sprite_Actor.prototype.updateMotionCount;

    Sprite_Actor.prototype.initMembers = function() {
        _Sprite_Actor_initMembers.call(this);

        this._motionName = "";
    };

    Sprite_Actor.prototype.setupWeaponAnimation = function() {
        if (this._actor.isUseWeapon()) {
            _Sprite_Actor_setupWeaponAnimation.call(this);
            return;
        }

        this._actor.clearWeaponAnimation();
    };

    Sprite_Actor.prototype.startMotion = function(motionType) {
        if (this._actor.isSideviewBattler()) {
            this.startSideviewMotion(motionType);
            return;
        }

        _Sprite_Actor_startMotion.call(this, motionType);
    };

    Sprite_Actor.prototype.forceMotion = function(motionType) {
        if (this._actor.isSideviewBattler()) {
            this.forceSideviewMotion(motionType);
            return;
        }

        _Sprite_Actor_forceMotion.call(this, motionType);
    };

    Sprite_Actor.prototype.startSideviewMotion = function(motionType) {
        if (this._motionName !== motionType) {
            this._motionName = motionType;
            this._motionCount = 0;
            this._pattern = 0;
        }
    };

    Sprite_Actor.prototype.forceSideviewMotion = function(motionType) {
        this._motionName = motionType;
        this._motionCount = 0;
        this._pattern = 0;
    };

    Sprite_Actor.prototype.getCurrentMotion = function() {
        return this._actor.getSideviewMotion(this._motionName);
    };

    Sprite_Actor.prototype.frameSizes = function() {
        return this._actor.getSideviewSizes();
    };

    Sprite_Actor.prototype.motionFrames = function() {
        var motionName = this._motionName;

        if (this._actor.isSideviewBattler()) {
            return this._actor.getSideviewFrames(motionName);
        }

        return 3;
    };

    Sprite_Actor.prototype.motionSpeed = function() {
        var motionName = this._motionName;

        if (this._actor.isSideviewBattler()) {
            return this._actor.getSideviewSpeed(motionName);
        }

        return _Sprite_Actor_motionSpeed.call(this);
    };

    Sprite_Actor.prototype.updateFrame = function() {
        if (this._actor.isSideviewBattler()) {
            this.updateSideviewFrame();
            return;
        }

        _Sprite_Actor_updateFrame.call(this);
    };

    Sprite_Actor.prototype.updateSideviewFrame = function() {
        var bitmap = this._mainSprite.bitmap,
            motion = this.getCurrentMotion(),
            frameSizes = this.frameSizes();

        Sprite_Battler.prototype.updateFrame.call(this);

        if (bitmap) {
            var motionIndex = motion.index;
            var pattern = this._pattern;
            var cw = frameSizes[0];
            var ch = frameSizes[1];
            var cx = pattern;
            var cy = motionIndex;
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };

    Sprite_Actor.prototype.updateMotionCount = function() {
        if (this._actor.isSideviewBattler()) {
            this.updateSideviewMotionCount();
            return;
        }

        _Sprite_Actor_updateMotionCount.call(this);
    };

    Sprite_Actor.prototype.updateSideviewMotionCount = function() {
        var motion = this.getCurrentMotion(),
            speed  = this.motionSpeed(),
            frames = this.motionFrames();

        if (!!motion && ++this._motionCount >= speed) {
            if (!!motion.loop) {
                this._pattern = (this._pattern + 1) % frames;
            } else if (this._pattern < frames - 1) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };
}());
