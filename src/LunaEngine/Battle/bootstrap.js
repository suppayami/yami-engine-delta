/* globals LunaEngine: false */

(function() {
    // dependencies
    var HUD = LunaEngine.Battle.HUD,
        HUDConfig = LunaEngine.Battle.Config.HUD;

    // alias
    var _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers,
        _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome,
        _Window_BattleActor_maxCols = Window_BattleActor.prototype.maxCols,
        _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects,
        _Scene_Battle_start = Scene_Battle.prototype.start,
        _Scene_Battle_stop = Scene_Battle.prototype.stop,
        _Scene_Battle_updateStatusWindow = Scene_Battle.prototype.updateStatusWindow;

    Game_Actor.prototype.isSpriteVisible = function() {
        if (!HUDConfig.showAnimation) {
            return false;
        }

        return true;
    };

    Sprite_Actor.prototype.initMembers = function() {
        _Sprite_Actor_initMembers.call(this);
        this._setupLuna();
    };

    Sprite_Actor.prototype._setupLuna = function() {
        if ($gameSystem.isSideView()) {
            return;
        }

        this.opacity = 0;
    };

    Sprite_Actor.prototype.setActorHome = function(index) {
        if ($gameSystem.isSideView()) {
            _Sprite_Actor_setActorHome.call(this, index);
            return;
        }

        this.setHome(this._getGUIX(index), this._getGUIY(index));
    };

    Sprite_Actor.prototype._getGUIX = function(index) {
        var x = 0;

        if (HUDConfig.direction === 'horizontal') {
            x = Math.round(HUDConfig.width / HUDConfig.grid * index);
            x += HUDConfig.width / HUDConfig.grid / 2
        }

        x += HUDConfig.x;

        return x;
    };

    Sprite_Actor.prototype._getGUIY = function(index) {
        var y = 0;

        if (HUDConfig.direction === 'vertical') {
            y = Math.round(HUDConfig.height / HUDConfig.grid * index);
        }

        y += HUDConfig.y;

        return y;
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
        // this._statusWindow.y = 9999;
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

    Scene_Battle.prototype.updateWindowPositions = function() {
        // destroy
    };

    Scene_Battle.prototype._updateLuna = function() {
        this._updateSelectingActor();
        this._updateSelectingEnemy();
        this._updateSelectingAction();
    };

    Scene_Battle.prototype._updateSelectingActor = function() {
        this._lunaHUD.select(BattleManager.actor());

        if (this._actorWindow.active) {
            this._lunaHUD.select(this._actorWindow.actor());
        }
    };

    Scene_Battle.prototype._updateSelectingEnemy = function() {
        this._lunaHUD.setSelectEnemy(this._enemyWindow.active);
    };

    Scene_Battle.prototype._updateSelectingAction = function() {
        var flag = this._skillWindow.active || this._itemWindow.active;

        this._lunaHUD.setSelectAction(flag);
    };
}());
