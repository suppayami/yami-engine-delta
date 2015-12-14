/* globals YED: false */

(function($InvertTarget) {
    /**
     * Aliasing methods
     */
    var _Scene_Battle_update
        = Scene_Battle.prototype.update;
    var _Scene_Battle_startActorCommandSelection
        = Scene_Battle.prototype.startActorCommandSelection;

    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);

        this._updateInvertTarget();
    };

    Scene_Battle.prototype.startActorCommandSelection = function() {
        _Scene_Battle_startActorCommandSelection.call(this);

        BattleManager.inputtingAction().clearInvert();
    };

    Scene_Battle.prototype._isChoosingTargets = function() {
        return (this._actorWindow.active ||
                this._enemyWindow.active);
    };

    Scene_Battle.prototype._updateInvertTarget = function() {
        var keyNameKeyboard
            = $InvertTarget.Utils.parameters['Invert Keys (Keyboard)'],
            keyNameGamepad
            = $InvertTarget.Utils.parameters['Invert Keys (Gamepad)'],
            triggered = function(key) {
                return Input.isTriggered(key);
            },
            input;

        input = BattleManager.inputtingAction();

        if (!input) {
            return;
        }

        if (!this._isChoosingTargets()) {
            return;
        }

        if (!input.item()) {
            return;
        }

        if (keyNameKeyboard.some(triggered) ||
            keyNameGamepad.some(triggered)) {
            if (!input.toggleInvert()) {
                return;
            }

            if (this._actorWindow.active) {
                this._actorWindow.deactivate();
                this._actorWindow.hide();
                this.selectEnemySelection();
            }

            if (this._enemyWindow.active) {
                this._enemyWindow.deactivate();
                this._enemyWindow.hide();
                this.selectActorSelection();
            }
        }
    };
}(YED.InvertTarget));
