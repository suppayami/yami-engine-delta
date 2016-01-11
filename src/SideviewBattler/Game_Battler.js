(function() {
    Game_Battler.prototype.getBattler = function() {
        var battler;

        if (this.isActor()) {
            battler = this.actor();
        }

        if (this.isEnemy()) {
            battler = this.enemy();
        }

        return !!battler ? battler : null;
    };

    Game_Battler.prototype.getSideviewBattler = function() {
        var battler = this.getBattler();

        return !!battler ? battler.getSideviewBattler() : null;
    };

    Game_Battler.prototype.isSideviewBattler = function() {
        var battler = this.getBattler();

        return !!battler ? battler.isSideviewBattler() : false;
    };

    Game_Battler.prototype.isUseWeapon = function() {
        var sideviewBattler = this.getSideviewBattler();

        if (!this.isSideviewBattler()) {
            return true;
        }

        return sideviewBattler.weapon;
    };

    Game_Battler.prototype.getSideviewFilename = function() {
        var sideviewBattler = this.getSideviewBattler();

        if (!this.isSideviewBattler()) {
            return null;
        }

        return sideviewBattler.filename;
    };

    Game_Battler.prototype.getSideviewSizes = function() {
        var sideviewBattler = this.getSideviewBattler();

        if (!this.isSideviewBattler()) {
            return null;
        }

        return sideviewBattler.sizes;
    };

    Game_Battler.prototype.getSideviewMotions = function() {
        var sideviewBattler = this.getSideviewBattler();

        if (!this.isSideviewBattler()) {
            return null;
        }

        return sideviewBattler.motions;
    };

    Game_Battler.prototype.getFallbackMotion = function() {
        var motions = this.getSideviewMotions();

        if (!this.isSideviewBattler()) {
            return null;
        }

        if (!!motions.other) {
            return motions.other;
        }

        return motions.walk;
    };

    Game_Battler.prototype.getSideviewMotion = function(motionName) {
        var motions = this.getSideviewMotions();

        if (!motionName) {
            return null;
        }

        if (!this.isSideviewBattler()) {
            return null;
        }

        if (!motions[motionName]) {
            return this.getFallbackMotion();
        }

        return motions[motionName];
    };

    Game_Battler.prototype.getSideviewFrames = function(motionName) {
        var sideviewBattler = this.getSideviewBattler(),
            motion = this.getSideviewMotion(motionName);

        if (!this.isSideviewBattler()) {
            return null;
        }

        if (!!motion && !!motion.frames) {
            return motion.frames;
        }

        return sideviewBattler.frames;
    };

    Game_Battler.prototype.getSideviewSpeed = function(motionName) {
        var sideviewBattler = this.getSideviewBattler(),
            motion = this.getSideviewMotion(motionName);

        if (!this.isSideviewBattler()) {
            return null;
        }

        if (!!motion && !!motion.speed) {
            return motion.speed;
        }

        return sideviewBattler.speed;
    };
}());
