(function() {
    if (!Imported.YEP_X_AnimatedSVEnemies) {
        return;
    }
    /**
     * Aliasing methods
     */
    var _Sprite_Enemy_initMembers
        = Sprite_Enemy.prototype.initMembers;
    var _Sprite_Enemy_setupWeaponAnimation
        = Sprite_Enemy.prototype.setupWeaponAnimation;
    var _Sprite_Enemy_startMotion
        = Sprite_Enemy.prototype.startMotion;
    var _Sprite_Enemy_forceMotion
        = Sprite_Enemy.prototype.forceMotion;
    var _Sprite_Enemy_updateFrame
        = Sprite_Enemy.prototype.updateFrame;
    var _Sprite_Enemy_updateMotionCount
        = Sprite_Enemy.prototype.updateMotionCount;

    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_initMembers.call(this);

        this._motionName = "";
    };

    Sprite_Enemy.prototype.setupWeaponAnimation = function() {
        if (this._enemy.isUseWeapon()) {
            _Sprite_Enemy_setupWeaponAnimation.call(this);
            return;
        }

        this._enemy.clearWeaponAnimation();
    };

    Sprite_Enemy.prototype.startMotion = function(motionType) {
        if (this._enemy.isSideviewBattler()) {
            this.startSideviewMotion(motionType);
            return;
        }

        _Sprite_Enemy_startMotion.call(this, motionType);
    };

    Sprite_Enemy.prototype.forceMotion = function(motionType) {
        if (this._enemy.isSideviewBattler()) {
            this.forceSideviewMotion(motionType);
            return;
        }

        _Sprite_Enemy_forceMotion.call(this, motionType);
    };

    Sprite_Enemy.prototype.startSideviewMotion = function(motionType) {
        if (this._motionName !== motionType) {
            this._motionName = motionType;
            this._motionCount = 0;
            this._pattern = 0;
        }
    };

    Sprite_Enemy.prototype.forceSideviewMotion = function(motionType) {
        this._motionName = motionType;
        this._motionCount = 0;
        this._pattern = 0;
    };

    Sprite_Enemy.prototype.getCurrentMotion = function() {
        return this._enemy.getSideviewMotion(this._motionName);
    };

    Sprite_Enemy.prototype.frameSizes = function() {
        return this._enemy.getSideviewSizes();
    };

    Sprite_Enemy.prototype.motionFrames = function() {
        var motionName = this._motionName;

        if (this._enemy.isSideviewBattler()) {
            return this._enemy.getSideviewFrames(motionName);
        }

        return 3;
    };

    Sprite_Enemy.prototype.motionSpeed = function() {
        var motionName = this._motionName;

        if (this._enemy.isSideviewBattler()) {
            return this._enemy.getSideviewSpeed(motionName);
        }

        return 12;
    };

    Sprite_Enemy.prototype.updateMotionCount = function() {
        if (this._enemy.isSideviewBattler()) {
            this.updateSideviewMotionCount();
            return;
        }

        _Sprite_Enemy_updateMotionCount.call(this);
    };

    Sprite_Enemy.prototype.updateSideviewMotionCount = function() {
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

    Sprite_Enemy.prototype.updateFrame = function() {
        if (this._enemy.isSideviewBattler()) {
            if (Imported.YEP_X_AnimatedSVEnemies) {
                this.updateSideviewFrame();
                return;
            }

            this.updateSideviewFrame();
            return;
        }

        _Sprite_Enemy_updateFrame.call(this);
    };

    // compatible with YEP - Animated Sideview Enemies
    Sprite_Enemy.prototype.updateSideviewFrame = function() {
        var bitmap = this._mainSprite.bitmap,
            motion = this.getCurrentMotion(),
            frameSizes = this.frameSizes();

        Sprite_Battler.prototype.updateFrame.call(this);

        if (bitmap.width <= 0) {
            return;
        }

        this._effectTarget = this._mainSprite;

        var motionIndex = motion.index;
        var pattern = this._pattern;
        var cw = frameSizes[0];
        var ch = frameSizes[1];
        var cx = pattern;
        var cy = motionIndex;
        var cdh = 0;

        if (this._effectType === 'bossCollapse') {
          cdh = ch - this._effectDuration;
        }

        this.setFrame(cx * cw, cy * ch, cw, ch);
        this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch - cdh);
        this.adjustMainBitmapSettings(bitmap);
        this.adjustSVShadowSettings();
    };
}());
