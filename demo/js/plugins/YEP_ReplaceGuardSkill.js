//=============================================================================
// Yanfly Engine Plugins - Replace Guard Skill
// YEP_ReplaceGuardSkill.js
// Last Updated: 2015.07.13
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_ReplaceGuardSkill"] = true;

//=============================================================================
/*:
 * @plugindesc Various factors from equipment, class, status effects can now
 * change an actor's default guard command to something else.
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
 *
 * ChangeLog:
 *   2015.07.16 - Code efficiency update.
 *   2015.07.12 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_ReplaceGuardSkill');
var _yep_rgs_DefaultGuard = Number(parameters['Default Guard'] || 1);

//=============================================================================
// DataManager
//=============================================================================

var _YEP_RGS_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_RGS_Scene_Boot_start.call(this);
	DataManager.processRGSNotetags1($dataWeapons);
  DataManager.processRGSNotetags1($dataArmors);
  DataManager.processRGSNotetags1($dataStates);
  DataManager.processRGSNotetags2($dataActors);
  DataManager.processRGSNotetags2($dataClasses);
  DataManager.processRGSNotetags3($dataSkills);
};

DataManager.processRGSNotetags1 = function(group) {
  var note1 = /<(?:CLASS|class)[ ](\d+)[ ](?:GUARD_SKILL|guard skil):[ ](\d+)>/i
  var note2 = /<(?:ACTOR|actor)[ ](\d+)[ ](?:GUARD_SKILL|guard skil):[ ](\d+)>/i
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.guardSkillId = {};
    obj.guardSkillActorId = {};

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:GUARD_SKILL|guard skill):[ ](\d+)>/i)) {
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
			if (line.match(/<(?:GUARD_SKILL|guard skill):[ ](\d+)>/i)) {
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
			if (line.match(/<(?:COMMAND_TEXT|command text):[ ](.*)>/i)) {
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
    return _yep_rgs_DefaultGuard;
};

Game_Actor.prototype.guardCommandText = function() {
    return $dataSkills[this.guardSkillId()].commandText;
};

//=============================================================================
// Scene_Battle
//=============================================================================

var _YEP_RGS_Scene_Battle_commandGuard = Scene_Battle.prototype.commandGuard;
Scene_Battle.prototype.commandGuard = function() {
    if (BattleManager.actor().guardSkillId() === _yep_rgs_DefaultGuard) {
      _YEP_RGS_Scene_Battle_commandGuard.call(this);
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
