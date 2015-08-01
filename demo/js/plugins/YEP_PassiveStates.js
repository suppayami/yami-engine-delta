//=============================================================================
// Yanfly Engine Plugins - Passive States
// YEP_Passive States.js
// Last Updated: 2015.07.18
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_PassiveStates"] = true;

//=============================================================================
/*:
 * @plugindesc This pluging allows for some states to function as passives for
 * actors, inherent in equips, and enemies.
 * @author Yanfly Engine Plugins
 *
 * @help
 * Passive states are states that are always active. You can think of them as
 * an extension of traits but with more flexibility.
 *
 * Actor, Class, Weapon, Armor, Enemy Notetags:
 *   <Passive State: x>
 *   <Passive State: x, x, x>
 *   This will allow the actor or enemy to have state x as a passive state.
 *   If placed inside a weapon or armor notebox, the user will have that
 *   passive state.
 *
 *   <Passive State: x to y>
 *   This will add the states x through y (in a sequence) for the actor or
 *   enemy to have as a passive state. If placed inside a weapon or armor
 *   notebox, the user will have that passive state.
 *
 * ChangeLog:
 *   2015.07.18 - Code efficiency update.
 *   2015.07.10 - Complete.
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

var _YEP_PS_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_PS_Scene_Boot_start.call(this);
	DataManager.processPSNotetags($dataActors);
	DataManager.processPSNotetags($dataClasses);
	DataManager.processPSNotetags($dataEnemies);
	DataManager.processPSNotetags($dataWeapons);
	DataManager.processPSNotetags($dataArmors);
};

DataManager.processPSNotetags = function(group) {
  var note1 = /<(?:PASSIVE_STATE|passive state):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 =
    /<(?:PASSIVE_STATE|passive state):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.passiveStates = [];

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.passiveStates = obj.passiveStates.concat(array);
      } else if (line.match(note2)) {
        var range = getRange(parseInt(RegExp.$1), parseInt(RegExp.$2));
        obj.passiveStates = obj.passiveStates.concat(range);
      }
		}
	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

var _YEP_PS_Game_BattlerBase_isStateAffected =
    Game_BattlerBase.prototype.isStateAffected;
Game_BattlerBase.prototype.isStateAffected = function(stateId) {
    if (this.isPassiveStateAffected(stateId)) return true;
    return _YEP_PS_Game_BattlerBase_isStateAffected.call(this, stateId);
};

var _YEP_PS_Game_BattlerBase_states = Game_BattlerBase.prototype.states;
Game_BattlerBase.prototype.states = function() {
    var states_array = _YEP_PS_Game_BattlerBase_states.call(this);
    states_array = states_array.concat(this.passiveStates());
    return states_array.filter(onlyUnique);
};

Game_BattlerBase.prototype.isPassiveStateAffected = function(stateId) {
    if (this._passivestates == null) this._passivestates = [];
    return this._passivestates.contains(stateId);
}

Game_BattlerBase.prototype.passiveStates = function() {
		this._passiveStates = [];
		if (this.isActor() && this.actor().passiveStates !== undefined) {
			this.makePassiveStates(this.actor());
			if (this.currentClass()) this.makePassiveStates(this.currentClass());
			this.equips().forEach(function(item) {
				if (item) {
					this.makePassiveStates(item);
				}
	    }, this);
		} else if (this.isEnemy() && this.enemy().passiveStates !== undefined) {
			this.makePassiveStates(this.enemy());
		};
		return this.constructPassiveStates();
};

Game_BattlerBase.prototype.makePassiveStates = function(obj) {
		if (!obj) return;
		if (!obj.passiveStates) return;
		for (var i = 0; i < obj.passiveStates.length; ++i) {
			var stateId = obj.passiveStates[i]
			if ($dataStates[stateId] && !this._passiveStates.contains(stateId)) {
				this._passiveStates.push(stateId);
				this._stateTurns[stateId] = 0;
				this._stateSteps[stateId] = 0;
			}
		}
		this.sortPassiveStates();
};

Game_BattlerBase.prototype.sortPassiveStates = function() {
		this._passiveStates.sort(function(a, b) {
				var p1 = $dataStates[a].priority;
				var p2 = $dataStates[b].priority;
				if (p1 !== p2) {
						return p2 - p1;
				}
				return a - b;
		});
}

Game_BattlerBase.prototype.constructPassiveStates = function() {
		var states = [];
		if (Input.isRepeated('ok')) {
		}
		for (var i = 0; i < this._passiveStates.length; ++i) {
			var stateId = this._passiveStates[i];
			if ($dataStates[stateId]) {
				states.push($dataStates[stateId]);
			}
		}
		return states;
}

//=============================================================================
// Game_BattlerBase
//=============================================================================

var _YEP_PS_Game_Battler_isStateAddable = Game_Battler.prototype.isStateAddable;
Game_Battler.prototype.isStateAddable = function(stateId) {
		if (this.isPassiveStateAffected(stateId)) return false;
    return _YEP_PS_Game_Battler_isStateAddable.call(this, stateId);
};

var _YEP_PS_Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
		if (this.isPassiveStateAffected(stateId)) return;
    _YEP_PS_Game_Battler_removeState.call(this, stateId);
};

//=============================================================================
// New Functions
//=============================================================================

getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
