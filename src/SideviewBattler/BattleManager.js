(function () {
    if (!Imported.YEP_BattleEngineCore) {
        return;
    }

    var _BattleManager_processActionSequence = BattleManager.processActionSequence;
    BattleManager.processActionSequence = function (actionName, actionArgs) {
        if (actionName.match(/CUSTOM MOTION[ ](.*)/i)) {
            return this.actionCustomMotionTarget(String(RegExp.$1), actionArgs);
        }
        return _BattleManager_processActionSequence.call(this,
            actionName, actionArgs);
    };

    BattleManager.actionCustomMotionTarget = function (name, actionArgs) {
        var movers = this.makeActionTargets(actionArgs[0]);
        if (movers.length < 1) return true;
        if (actionArgs[1] && actionArgs[1].toUpperCase() === 'NO WEAPON') {
            var showWeapon = false;
        } else {
            var showWeapon = true;
        }
        movers.forEach(function (mover) {
            mover.forceMotion(name.toLowerCase());
        });
        return false;
    };
} ());