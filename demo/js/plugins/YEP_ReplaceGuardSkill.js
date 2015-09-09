//=============================================================================
// Yanfly Engine Plugins - Replace Guard Skill
// YEP_ReplaceGuardSkill.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ReplaceGuardSkill = true;

var Yanfly = Yanfly || {};
Yanfly.RGS = Yanfly.RGS || {};

//=============================================================================
/*:
 * @plugindesc Various factors from equipment, class, status effects can
 * now change an actor's default guard command.
 * @author Yanfly Engine Plugins
 *
 * @param Default Guard
 * @desc This is the default skill actors will use for basic guarding.
 * Default: 2
 * @default 2
 *
 * @help
 * Actors, classes, weapons, armors, and states can now alter the basic
 * "Guard" command into using a different skill. Using the following notetags,
 * you can adjust the various settings for the skill used as guarding.
 *
 * If an actor has multiple traits that may affect the skill to replace the
 * guard command with, there will be a certain priority given.
 *
 * HIGHEST PRIORITY
 *   - State Property: Actor Specific
 *   - State Property: Class Specific
 *   - State Property: General
 *   - Equip Property: Actor Specific
 *   - Equip Property: Class Specific
 *   - Equip Property: General
 *   - Actor Specific
 *   - Class Specific
 *   - Default Guard
 * LOWEST PRIORITY
 *
 * Actor Notetag
 *   <Guard Skill: x>
 *   This actor will have a unique guard skill instead of the general basic
 *   guard. This does not overwrite any equipment notetags but will take
 *   priority over the class specific notetag.
 *
 * Class Notetag
 *   <Guard Skill: x>
 *   This class will have a unique guard skill instead of the general basic
 *   guard. This does not overwrite any equipment notetags.
 *
 * Weapon, Armor, and State Notetags
 *   <Guard Skill: x>
 *   This will cause the user's guard skill to change to x. Priority will
 *   first be given to states, then weapons, then armor.
 *
 *   <Actor x Guard Skill: y>
 *   If actor x has the item equipped, the actor's guard skill will change to
 *   skill y. This will take priority over the class, weapon, armor, and
 *   state tags.
 *
 *   <Class x Guard Skill: y>
 *   If actor x has the item equipped, the actor's guard skill will change to
 *   skill y. This will take priority over the weapon, armor, and state tags.
 *
 * Skill Notetag
 *   <Command Text: x>
 *   If the skill is used to replace "Guard", it will use x as the command
 *   name instead of "Guard". If this notetag isn't present, it will use the
 *   skills name itself as the command text.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ReplaceGuardSkill');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.RGSDefaultGuard = Number(Yanfly.Parameters['Default Guard']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.RGS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.RGS.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processRGSNotetags1($dataWeapons);
	  this.processRGSNotetags1($dataArmors);
	  this.processRGSNotetags1($dataStates);
	  this.processRGSNotetags2($dataActors);
	  this.processRGSNotetags2($dataClasses);
	  this.processRGSNotetags3($dataSkills);
		return true;
};

DataManager.processRGSNotetags1 = function(group) {
  var note1 = /<(?:CLASS)[ ](\d+)[ ](?:GUARD SKILL):[ ](\d+)>/i
  var note2 =	/<(?:ACTOR)[ ](\d+)[ ](?:GUARD SKILL):[ ](\d+)>/i
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.guardSkillId = {};
    obj.guardSkillActorId = {};

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:GUARD SKILL):[ ](\d+)>/i)) {
        obj.guardSkillId[0] = parseInt(RegExp.$1);
			} else if (line.match(note1)) {
        obj.guardSkillId[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(note2)) {
        obj.guardSkillActorId[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      }
		}
	}
};

DataManager.processRGSNotetags2 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:GUARD SKILL):[ ](\d+)>/i)) {
        obj.guardSkillId = parseInt(RegExp.$1);
      }
		}
	}
};

DataManager.processRGSNotetags3 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.commandText = obj.name;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:COMMAND TEXT):[ ](.*)>/i)) {
        obj.commandText = String(RegExp.$1);
      }
		}
	}
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.guardSkillId = function() {
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (state && state.guardSkillActorId[this._actorId]) {
        return states.guardSkillActorId[this._actorId];
      }
    }
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (state && state.guardSkillId[this._actorId]) {
        return states.guardSkillId[this._actorId];
      }
    }
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (state && state.guardSkillId[0]) {
        return states.guardSkillId[0];
      }
    }
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
      var equip = equips[i];
      if (equip && equip.guardSkillActorId[this._actorId]) {
        return equip.guardSkillActorId[this._actorId];
      }
    }
    for (var i = 0; i < equips.length; i++) {
      var equip = equips[i];
      if (equip && equip.guardSkillId[this._classId]) {
        return equip.guardSkillId[this._classId];
      }
    }
    for (var i = 0; i < equips.length; i++) {
      var equip = equips[i];
      if (equip && equip.guardSkillId[0]) {
        return equip.guardSkillId[0];
      }
    }
    if (this.actor().guardSkillId) return this.actor().guardSkillId;
    if (this.currentClass().guardSkillId) {
      return this.currentClass().guardSkillId; }
    return Yanfly.Param.RGSDefaultGuard;
};

Game_Actor.prototype.guardCommandText = function() {
    return $dataSkills[this.guardSkillId()].commandText;
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.RGS.Scene_Battle_commandGuard = Scene_Battle.prototype.commandGuard;
Scene_Battle.prototype.commandGuard = function() {
    if (BattleManager.actor().guardSkillId() === Yanfly.Param.RGSDefaultGuard) {
      Yanfly.RGS.Scene_Battle_commandGuard.call(this);
    } else {
      var skill = $dataSkills[BattleManager.actor().guardSkillId()];
      var action = BattleManager.inputtingAction();
      action.setSkill(skill.id);
      BattleManager.actor().setLastBattleSkill(skill);
      this.onSelectAction();
    }
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.addGuardCommand = function() {
    var text = this._actor.guardCommandText();
    this.addCommand(text, 'guard', this._actor.canGuard());
};

//=============================================================================
// End of File
//=============================================================================
