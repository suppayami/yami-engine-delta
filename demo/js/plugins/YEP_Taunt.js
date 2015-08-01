//=============================================================================
// Yanfly Engine Plugins - Taunt
// YEP_Taunt.js
// Last Updated: 2015.07.25
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_Taunt"] = true;

//=============================================================================
 /*:
 * @plugindesc Adds a Taunt mechanic to battle. Units with a taunt status will
 * force the enemy team to focus them as action targets.
 * @author Yanfly Engine Plugins
 *
 * @help
 * Taunts add a new mechanic to battle. Whenever a unit has a member with a
 * taunt trait, the opposing unit's single target attacks and skills must focus
 * on the taunting unit. This adds aggro control for either unit and can add a
 * new level of depth for battle. Taunts are divided up into physical, magical,
 * and certain hit taunts which respectively aggro physical actions, magical
 * actions, and certain hit actions.
 *
 * If there are multiple users with taunt, the rival party can select which
 * taunt user to attack. This is to prevent a lockdown caused by a rival unit
 * making the battle impossible to progress.
 *
 * Actor, Class, Weapon, Armor, State, Enemy Notetags:
 *   <Physical Taunt>
 *   <Magical Taunt>
 *   <Certain Taunt>
 *   These three notetags enable the database object of choice to have the
 *   respective taunt mechanic against those types of actions. Physical taunts
 *   will cause the user to aggro all physical type of actions from the rival
 *   team. The same goes for magical taunts and certain taunts of their nature.
 *
 *   <Null Physical Taunt>
 *   <Null Magical Taunt>
 *   <Null Certain Taunt>
 *   This nullifies the respective taunt trait on the user (not the attacker).
 *   What this means is if a user originally has taunt through some form or
 *   means, having a null taunt trait applied will remove that taunt effect and
 *   the user will be treated as a normal target.
 *
 *   <Ignore Physical Taunt>
 *   <Ignore Magical Taunt>
 *   <Ignore Certain Taunt>
 *   This allows an attacker with this trait to ignore any taunts of the
 *   respective nature and gain access to all possible targets as if no taunts
 *   are in place.
 *
 * Skill and Item Notetag:
 *   <Bypass Taunt>
 *   This causes this skill/item to ignore taunts altogether and the skill/item
 *   is able to select single targets as if no taunts existed on the field.
 *
 * ChangeLog:
 *   2015.07.25 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_Taunt');

var _YEP_Taunt_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_Taunt_Scene_Boot_start.call(this);
	DataManager.processTauntNotetags1($dataActors);
  DataManager.processTauntNotetags1($dataClasses);
  DataManager.processTauntNotetags1($dataWeapons);
  DataManager.processTauntNotetags1($dataArmors);
  DataManager.processTauntNotetags1($dataStates);
  DataManager.processTauntNotetags1($dataEnemies);
  DataManager.processTauntNotetags2($dataSkills);
  DataManager.processTauntNotetags2($dataEnemies);
};

DataManager.processTauntNotetags1 = function(group) {
	var note1 = /<(?:PHYSICAL_TAUNT|physical taunt)>/i;
  var note2 = /<(?:MAGICAL_TAUNT|magical taunt)>/i;
  var note3 = /<(?:CERTAIN_TAUNT|certain taunt)>/i;
  var note4 = /<(?:NULL_PHYSICAL_TAUNT|null physical taunt)>/i;
  var note5 = /<(?:NULL_MAGICAL_TAUNT|null magical taunt)>/i
  var note6 = /<(?:NULL_CERTAIN_TAUNT|null certain taunt)>/i
  var note7 = /<(?:IGNORE_PHYSICAL_TAUNT|ignore physical taunt)>/i
  var note8 = /<(?:IGNORE_MAGICAL_TAUNT|ignore magical taunt)>/i
  var note9 = /<(?:IGNORE_CERTAIN_TAUNT|ignore certain taunt)>/i
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.physTaunt = false;
    obj.magicTaunt = false;
    obj.certainTaunt = false;

    obj.nullPhysTaunt = false;
    obj.nullMagicTaunt = false;
    obj.nullCertainTaunt = false;

    obj.ignorePhysTaunt = false;
    obj.ignoreMagicTaunt = false;
    obj.ignoreCertainTaunt = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.physTaunt = true;
			} else if (line.match(note2)) {
				obj.magicTaunt = true;
      } else if (line.match(note3)) {
        obj.certainTaunt = true;
      } else if (line.match(note4)) {
				obj.nullPhysTaunt = true;
			} else if (line.match(note5)) {
				obj.nullMagicTaunt = true;
      } else if (line.match(note6)) {
        obj.nullCertainTaunt = true;
      } else if (line.match(note7)) {
				obj.ignorePhysTaunt = true;
			} else if (line.match(note8)) {
				obj.ignoreMagicTaunt = true;
      } else if (line.match(note9)) {
        obj.ignoreCertainTaunt = true;
      }
		}
	}
};

DataManager.processTauntNotetags2 = function(group) {
	var note1 = /<(?:BYPASS_TAUNT|bypass taunt)>/i;
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.bypassTaunt = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.bypassTaunt = true;
			}
		}
	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.tauntPhysical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.physTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.tauntMagical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.magicTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.tauntCertain = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.certainTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.nullTauntPhysical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.nullPhysTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.nullTauntMagical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.nullMagicTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.nullTauntCertain = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.nullCertainTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.ignoreTauntPhysical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.ignorePhysTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.ignoreTauntMagical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.ignoreMagicTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.ignoreTauntCertain = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.ignoreCertainTaunt) return true;
    }
    return false;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.tauntPhysical = function() {
    if (this.nullTauntPhysical()) return false;
    if (this.actor().physTaunt) return true;
    if (this.currentClass().physTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.physTaunt) return true;
    }
    return Game_BattlerBase.prototype.tauntPhysical.call(this);
};

Game_Actor.prototype.tauntMagical = function() {
    if (this.nullTauntMagical()) return false;
    if (this.actor().magicTaunt) return true;
    if (this.currentClass().magicTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.magicTaunt) return true;
    }
    return Game_BattlerBase.prototype.tauntMagical.call(this);
};

Game_Actor.prototype.tauntCertain = function() {
    if (this.nullTauntCertain()) return false;
    if (this.actor().certainTaunt) return true;
    if (this.currentClass().certainTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.certainTaunt) return true;
    }
    return Game_BattlerBase.prototype.tauntCertain.call(this);
};

Game_Actor.prototype.nullTauntPhysical = function() {
    if (this.actor().nullPhysTaunt) return true;
    if (this.currentClass().nullPhysTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.nullPhysTaunt) return true;
    }
    return Game_BattlerBase.prototype.nullTauntPhysical.call(this);
};

Game_Actor.prototype.nullTauntMagical = function() {
    if (this.actor().nullMagicTaunt) return true;
    if (this.currentClass().nullMagicTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.nullMagicTaunt) return true;
    }
    return Game_BattlerBase.prototype.nullTauntMagical.call(this);
};

Game_Actor.prototype.nullTauntCertain = function() {
    if (this.actor().nullCertainTaunt) return true;
    if (this.currentClass().nullCertainTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.nullCertainTaunt) return true;
    }
    return Game_BattlerBase.prototype.nullTauntCertain.call(this);
};

Game_Actor.prototype.ignoreTauntPhysical = function() {
  if (this.actor().ignorePhysTaunt) return true;
  if (this.currentClass().ignorePhysTaunt) return true;
  for (var i = 0; i < this.equips().length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.ignorePhysTaunt) return true;
  }
  return Game_BattlerBase.prototype.ignoreTauntPhysical.call(this);
};

Game_Actor.prototype.ignoreTauntMagical = function() {
  if (this.actor().ignoreMagicTaunt) return true;
  if (this.currentClass().ignoreMagicTaunt) return true;
  for (var i = 0; i < this.equips().length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.ignoreMagicTaunt) return true;
  }
  return Game_BattlerBase.prototype.ignoreTauntMagical.call(this);
};

Game_Actor.prototype.ignoreTauntCertain = function() {
  if (this.actor().ignoreCertainTaunt) return true;
  if (this.currentClass().ignoreCertainTaunt) return true;
  for (var i = 0; i < this.equips().length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.ignoreCertainTaunt) return true;
  }
  return Game_BattlerBase.prototype.ignoreTauntCertain.call(this);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.tauntPhysical = function() {
    if (this.enemy().physTaunt) return true;
    return Game_BattlerBase.prototype.tauntPhysical.call(this);
};

Game_Enemy.prototype.tauntMagical = function() {
    if (this.enemy().magicTaunt) return true;
    return Game_BattlerBase.prototype.tauntMagical.call(this);
};

Game_Enemy.prototype.tauntCertain = function() {
    if (this.enemy().certainTaunt) return true;
    return Game_BattlerBase.prototype.tauntCertain.call(this);
};

Game_Enemy.prototype.nullTauntPhysical = function() {
    if (this.enemy().nullPhysTaunt) return true;
    return Game_BattlerBase.prototype.nullTauntPhysical.call(this);
};

Game_Enemy.prototype.nullTauntMagical = function() {
    if (this.enemy().nullMagicTaunt) return true;
    return Game_BattlerBase.prototype.nullTauntMagical.call(this);
};

Game_Enemy.prototype.nullTauntCertain = function() {
    if (this.enemy().nullCertainTaunt) return true;
    return Game_BattlerBase.prototype.nullTauntCertain.call(this);
};

Game_Enemy.prototype.ignoreTauntPhysical = function() {
    if (this.enemy().ignorePhysTaunt) return true;
    return Game_BattlerBase.prototype.ignoreTauntPhysical.call(this);
};

Game_Enemy.prototype.ignoreTauntMagical = function() {
    if (this.enemy().ignoreMagicTaunt) return true;
    return Game_BattlerBase.prototype.ignoreTauntMagical.call(this);
};

Game_Enemy.prototype.ignoreTauntCertain = function() {
    if (this.enemy().nullCertainTaunt) return true;
    return Game_BattlerBase.prototype.ignoreTauntCertain.call(this);
};

//=============================================================================
// Game_Unit
//=============================================================================

var _YEP_Taunt_Game_Unit_aliveMembers = Game_Unit.prototype.aliveMembers;
Game_Unit.prototype.aliveMembers = function() {
    if (this._inBattle && $gameTemp._taunt) return this.tauntMembers();
    return _YEP_Taunt_Game_Unit_aliveMembers.call(this);
};

Game_Unit.prototype.physicalTauntMembers = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.tauntPhysical();
    });
};

Game_Unit.prototype.magicalTauntMembers = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.tauntMagical();
    });
};

Game_Unit.prototype.certainTauntMembers = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.tauntCertain();
    });
};

Game_Unit.prototype.tauntMembers = function() {
    var action;
    if (BattleManager.isInputting()) {
      action = BattleManager.inputtingAction();
    } else {
      action = $gameTemp._tauntAction;
    }
    if (!action.isTauntable()) {
      return _YEP_Taunt_Game_Unit_aliveMembers.call(this);
    }
    if (action.isPhysical() && this.physicalTauntMembers().length > 0) {
      return this.physicalTauntMembers();
    } else if (action.isMagical() && this.magicalTauntMembers().length > 0) {
      return this.magicalTauntMembers();
    } else if (action.isCertainHit() && this.certainTauntMembers().length > 0) {
      return this.certainTauntMembers();
    }
    return _YEP_Taunt_Game_Unit_aliveMembers.call(this);
};

//=============================================================================
// Game_Action
//=============================================================================

var _YEP_Taunt_Game_Action_makeTargets =
    Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
    if (this.isValid() && this.isTauntable()) {
      $gameTemp._taunt = true;
      $gameTemp._tauntAction = this;
    }
    var value = _YEP_Taunt_Game_Action_makeTargets.call(this);
    if (this.isValid() && this.isTauntable()) {
      $gameTemp._taunt = false;
    }
    return value;
};

Game_Action.prototype.isTauntable = function() {
    if (!this.checkItemScope([1])) return false;
    if (this.item().bypassTaunt) return false;
    if (this.isPhysical() && this.subject().ignoreTauntPhysical()) return false;
    if (this.isMagical() && this.subject().ignoreTauntMagical()) return false;
    if (this.isCertainHit() && this.subject().ignoreTauntCertain()) return false;
    return true;
};

//=============================================================================
// Scene_Battle
//=============================================================================

var _YEP_Taunt_Scene_Battle_selectEnemySelection =
    Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    $gameTemp._taunt = true;
    _YEP_Taunt_Scene_Battle_selectEnemySelection.call(this);
    $gameTemp._taunt = false;
};

//=============================================================================
// End of File
//=============================================================================
