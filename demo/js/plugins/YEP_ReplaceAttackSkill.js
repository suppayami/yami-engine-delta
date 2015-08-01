//=============================================================================
// Yanfly Engine Plugins - Replace Attack Skill
// YEP_ReplaceAttackSkill.js
// Last Updated: 2015.07.16
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_ReplaceAttackSkill"] = true;

//=============================================================================
/*:
 * @plugindesc This allows pieces of equipment to change an actor's basic
 * attack to a different skill.
 * @author Yanfly Engine Plugins
 *
 * @param Default Attack
 * @desc This is the default skill actors will use for basic attacks.
 * Default: 1
 * @default 1
 *
 * @help
 * Actors, classes, weapons, armors, and states can now alter the basic
 * "Attack" command into using a different skill. Using the following notetags,
 * you can adjust the various settings for the skill used as a basic attack.
 *
 * If an actor has multiple traits that may affect the skill to replace the
 * basic attack with, there will be a certain priority given.
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
 *   - Default Attack
 * LOWEST PRIORITY
 *
 * Actor Notetag
 *   <Attack Skill: x>
 *   This actor will have a unique attack skill instead of the general basic
 *   attack. This does not overwrite any equipment notetags but will take
 *   priority over the class specific notetag.
 *
 * Class Notetag
 *   <Attack Skill: x>
 *   This class will have a unique attack skill instead of the general basic
 *   attack. This does not overwrite any equipment notetags.
 *
 * Weapon, Armor, and State Notetags
 *   <Attack Skill: x>
 *   This will cause the user's attack skill to change to x. Priority will
 *   first be given to states, then weapons, then armor.
 *
 *   <Actor x Attack Skill: y>
 *   If actor x has the item equipped, the actor's attack skill will change to
 *   skill y. This will take priority over the class, weapon, armor, and
 *   state tags.
 *
 *   <Class x Attack Skill: y>
 *   If actor x has the item equipped, the actor's attack skill will change to
 *   skill y. This will take priority over the weapon, armor, and state tags.
 *
 * Skill Notetag
 *   <Command Text: x>
 *   If the skill is used to replace "Attack", it will use x as the command
 *   name instead of "Attack". If this notetag isn't present, it will use the
 *   skills name itself as the command text.
 *
 * ChangeLog:
 *   2015.07.16 - Code efficiency update.
 *   2015.07.12 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_ReplaceAttackSkill');
var _yep_ras_DefaultAttack = Number(parameters['Default Attack'] || 1);

//=============================================================================
// DataManager
//=============================================================================

var _YEP_RAS_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_RAS_Scene_Boot_start.call(this);
	DataManager.processRASNotetags1($dataWeapons);
  DataManager.processRASNotetags1($dataArmors);
  DataManager.processRASNotetags1($dataStates);
  DataManager.processRASNotetags2($dataActors);
  DataManager.processRASNotetags2($dataClasses);
  DataManager.processRASNotetags3($dataSkills);
};

DataManager.processRASNotetags1 = function(group) {
  var note1 = /<(?:CLASS|class)[ ](\d+)[ ](?:ATTACK_SKILL|attack skil):[ ](\d+)>/i
  var note2 = /<(?:ACTOR|actor)[ ](\d+)[ ](?:ATTACK_SKILL|attack skil):[ ](\d+)>/i
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.attackSkillId = {};
    obj.attackSkillActorId = {};

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:ATTACK_SKILL|attack skill):[ ](\d+)>/i)) {
        obj.attackSkillId[0] = parseInt(RegExp.$1);
			} else if (line.match(note1)) {
        obj.attackSkillId[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(note2)) {
        obj.attackSkillActorId[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      }
		}
	}
};

DataManager.processRASNotetags2 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:ATTACK_SKILL|attack skill):[ ](\d+)>/i)) {
        obj.attackSkillId = parseInt(RegExp.$1);
      }
		}
	}
};

DataManager.processRASNotetags3 = function(group) {
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

Game_Actor.prototype.attackSkillId = function() {
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (state && state.attackSkillActorId[this._actorId]) {
        return states.attackSkillActorId[this._actorId];
      }
    }
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (state && state.attackSkillId[this._actorId]) {
        return states.attackSkillId[this._actorId];
      }
    }
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (state && state.attackSkillId[0]) {
        return states.attackSkillId[0];
      }
    }
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
      var equip = equips[i];
      if (equip && equip.attackSkillActorId[this._actorId]) {
        return equip.attackSkillActorId[this._actorId];
      }
    }
    for (var i = 0; i < equips.length; i++) {
      var equip = equips[i];
      if (equip && equip.attackSkillId[this._classId]) {
        return equip.attackSkillId[this._classId];
      }
    }
    for (var i = 0; i < equips.length; i++) {
      var equip = equips[i];
      if (equip && equip.attackSkillId[0]) {
        return equip.attackSkillId[0];
      }
    }
    if (this.actor().attackSkillId) return this.actor().attackSkillId;
    if (this.currentClass().attackSkillId) {
      return this.currentClass().attackSkillId; }
    return _yep_ras_DefaultAttack;
};

Game_Actor.prototype.attackCommandText = function() {
    return $dataSkills[this.attackSkillId()].commandText;
};

//=============================================================================
// Scene_Battle
//=============================================================================

var _YEP_RAS_Scene_Battle_commandAttack = Scene_Battle.prototype.commandAttack;
Scene_Battle.prototype.commandAttack = function() {
    if (BattleManager.actor().attackSkillId() === _yep_ras_DefaultAttack) {
      _YEP_RAS_Scene_Battle_commandAttack.call(this);
    } else {
      var skill = $dataSkills[BattleManager.actor().attackSkillId()];
      var action = BattleManager.inputtingAction();
      action.setSkill(skill.id);
      BattleManager.actor().setLastBattleSkill(skill);
      this.onSelectAction();
    }
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.addAttackCommand = function() {
    var text = this._actor.attackCommandText();
    this.addCommand(text, 'attack', this._actor.canAttack());
};

//=============================================================================
// End of File
//=============================================================================
