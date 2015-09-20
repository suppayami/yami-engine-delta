/* globals LunaEngine: false */

(function() {
    // dependencies
    var HUD = LunaEngine.Battle.HUD;

    // alias
    var _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects,
        _Scene_Battle_start = Scene_Battle.prototype.start,
        _Scene_Battle_stop = Scene_Battle.prototype.stop,
        _Scene_Battle_updateStatusWindow = Scene_Battle.prototype.updateStatusWindow;

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
        this._statusWindow.y = 999;
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
        if (this._actorWindow.active) {
            this._lunaHUD.select(this._actorWindow.actor());
        }

        this._lunaHUD.select(BattleManager.actor());
    }
}());
