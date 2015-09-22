/* globals LunaEngine: false */

(function() {
    // dependencies
    var HUD = LunaEngine.Battle.HUD,
        HUDConfig = LunaEngine.Battle.Config.HUD;

    // alias
    var _Game_Battler_initMembers = Game_Battler.prototype.initMembers,
        _Game_Battler_clearAnimations = Game_Battler.prototype.clearAnimations,
        _Game_Battler_startAnimation = Game_Battler.prototype.startAnimation,
        _Window_BattleActor_maxCols = Window_BattleActor.prototype.maxCols,
        _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects,
        _Scene_Battle_start = Scene_Battle.prototype.start,
        _Scene_Battle_stop = Scene_Battle.prototype.stop,
        _Scene_Battle_updateStatusWindow = Scene_Battle.prototype.updateStatusWindow;

    Game_Battler.prototype.initMembers = function() {
        _Game_Battler_initMembers.call(this);

        this._lunaAnimations = [];
    };

    Game_Battler.prototype.clearAnimations = function() {
        _Game_Battler_clearAnimations.call(this);

        this._lunaAnimations = [];
    };

    Game_Battler.prototype.isLunaAnimationRequested = function() {
        return this._lunaAnimations.length > 0;
    };

    Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
        _Game_Battler_startAnimation.call(this, animationId, mirror, delay);

        this.startLunaAnimation(animationId, mirror, delay);
    };

    Game_Battler.prototype.startLunaAnimation = function(animationId, mirror, delay) {
        var data = { animationId: animationId, mirror: mirror, delay: delay };

        this._lunaAnimations.push(data);
    };

    Game_Battler.prototype.shiftLunaAnimation = function() {
        return this._lunaAnimations.shift();
    };

    Window_BattleActor.prototype.maxCols = function() {
        if (HUDConfig.direction === 'horizontal') {
            return $gameParty.battleMembers().length;
        }

        return _Window_BattleActor_maxCols.call(this);
    };

    Scene_Battle.prototype.createDisplayObjects = function() {
        _Scene_Battle_createDisplayObjects.call(this);
        this._createBattleLuna();
    };

    Scene_Battle.prototype._createBattleLuna = function() {
        this._lunaHUD = new HUD();
        this.addWindow(this._lunaHUD);
    };

    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.call(this);
        this._setupLuna();
    };

    Scene_Battle.prototype._setupLuna = function() {
        this._lunaHUD.refresh();
        this._statusWindow.y = 9999;
        this._actorWindow.y  = 9999;
    };

    Scene_Battle.prototype.stop = function() {
        _Scene_Battle_stop.call(this);
        this._lunaHUD.visible = false;
    };

    Scene_Battle.prototype.updateStatusWindow = function() {
        _Scene_Battle_updateStatusWindow.call(this);

        if ($gameMessage.isBusy()) {
            this._lunaHUD.visible = false;
        } else if (this.isActive() && !this._messageWindow.isClosing()) {
            this._lunaHUD.visible = this._statusWindow.isOpen();
        }

        this._updateLuna();
    };

    Scene_Battle.prototype._updateLuna = function() {
        this._updateSelectingActor();
    };

    Scene_Battle.prototype._updateSelectingActor = function() {
        this._lunaHUD.select(BattleManager.actor());

        if (this._actorWindow.active) {
            this._lunaHUD.select(this._actorWindow.actor());
        }
    };
}());
