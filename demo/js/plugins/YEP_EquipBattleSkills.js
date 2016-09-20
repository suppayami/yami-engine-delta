//=============================================================================
// Yanfly Engine Plugins - Equip Battle Skills
// YEP_EquipBattleSkills.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EquipBattleSkills = true;

var Yanfly = Yanfly || {};
Yanfly.EBS = Yanfly.EBS || {};

//=============================================================================
 /*:
 * @plugindesc v1.06b Adds a new system where players can only bring
 * equipped skills to battle.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Command Name
 * @desc From the Skill menu, this is the command name to bring the
 * player to the equip skill menu.
 * @default Equip Skills
 *
 * @param Starting Skill Slots
 * @desc This is the starting number of skills a player can bring
 * into battle by default.
 * @default 4
 *
 * @param Maximum Skills
 * @desc This is the maximum number of skills that a player can equip.
 * No bonuses can go past this point.
 * @default 8
 *
 * @param All Equippable?
 * @desc Are all skills equippable? This includes skills outside of
 * the actor's skill types. NO - false     YES - true
 * @default false
 *
 * @param ---Windows---
 * @default
 *
 * @param Empty Slot
 * @desc This is how the text an empty slot would appear.
 * @default - Empty -
 *
 * @param Empty Color
 * @desc This is the text color used to display the empty text.
 * @default 16
 *
 * @param Empty Icon
 * @desc This is the icon used for empty.
 * @default 16
 *
 * @param Equipped Color
 * @desc This is the color of an already equipped skill.
 * @default 17
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a new gameplay mechanic where players have to choose
 * which skills to bring into battle. They can select what skills to bring from
 * the skill menu. In addition to being able to do that, equipped skills can
 * also add bonuses such as stats and/or passive states.
 *
 * Note: During Battle Test, equip skill slots will be disabled for the sake of
 * better battle testing control.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following notetags adjust various aspects about equippable battle skills.
 *
 * Actor Notetag:
 *   <Starting Skill Slots: x>
 *   This sets the actor's starting skill slots to x amount. This value will
 *   not allow the actor to bypass the Maximum Skills limit.
 *
 * Skill Notetags:
 *   <Equip stat: +x>
 *   <Equip stat: -x>
 *   Replace 'stat' with 'HP', 'MP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or
 *   'LUK' to have that stat increase or decrease by x amount while the skill
 *   is equipped for battle.
 *
 *   <Equip State: x>
 *   <Equip State: x, x, x>
 *   <Equip State: x through x>
 *   This causes the actor to be affected by state x while the skill is
 *   equipped for battle.
 *
 *   <Unequippable>
 *   This skill cannot be equipped no matter what.
 *
 *   <All Access Equippable>
 *   This makes the skill equippable whether the actor has the available skill
 *   type needed for the skill or not.
 *
 *   <Access Only Equippable>
 *   This makes the skill equippable only for actors with the specific skill
 *   type. Actors without access to the skill type cannot equip it.
 *
 * Class, Skill, Weapon, Armor, and State Notetags:
 *   <Equip Skill Slots: +x>
 *   <Equip Skill Slots: -x>
 *   This increases or decreases the amount of skills the actor can equip for
 *   battle by x. This value will not allow the actor to bypass the Maximum
 *   Skills Limit.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * You can use the following plugin commands to increase or decrease the amount
 * of battle slots for specific actors.
 *
 * Plugin Command:
 *
 *   IncreaseActorBattleSlots 3 by 4
 *   - This will increase actor 3's number of battle skill slots by 4. The
 *   total amount of battle skill slots cannot go beyond the 'Maximum Skills'
 *   plugin parameter.
 *
 *   DecreaseActorBattleSlots 5 by 2
 *   - This will decrease actor 5's number of battle skill slots by 2. The
 *   total amount of battle skill slots cannot go beneath 1.
 *
 * ============================================================================
 * Lunatic Mode - New JavaScript Functions
 * ============================================================================
 *
 * For those with JavaScript experience, you can use the following newly added
 * functions from this plugin within script calls or Lunatic Mode notetags.
 *
 * JavaScript Function:
 *
 *   actor.clearBattleSkillMaxPlus()
 *   - This clears any bonus skill equip slots available for the actor.
 *
 *   actor.getBattleSkillMaxPlus()
 *   - This returns the amount of bonus equip slots available for the actor.
 *
 *   actor.setBattleSkillMaxPlus(x)
 *   - This sets the amount of available bonus equip slots for the actor to x.
 *   This value can go negative, but it cannot force the actor to have less
 *   than 1 available equip slot. This can go positive but it cannot force the
 *   actor to have more than the 'Maximum Skills' plugin parameter value.
 *
 *   actor.increaseBattleSkillSlots(x)
 *   - This will raise the maximum amount of equip skill slots for the actor to
 *   x but cannot go beyond the 'Maximum Skills' plugin parameter value.
 *
 *   actor.decreaseBattleSkillSlots(x)
 *   - This will lower the maximum amount of equip skill slots for the actor to
 *   x but cannot go under a minimum of 1 battle equip slot.
 *
 *   actor.maxBattleSkills()
 *   - This returns the amount of battle skills the actor can equip currently.
 *
 *   actor.battleSkills()
 *   - This returns an array of the skills in their object form that the actor
 *   has equipped currently.
 *
 *   actor.battleSkillsRaw()
 *   - This returns an array of the skills in their ID form that the actor has
 *   equipped currently.
 *
 *   actor.equipSkill(id, slot)
 *   - This will cause the actor to equip skill ID into the specific slot.
 *   This will bypass whether or not the actor can equip the skill or not.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Here are some plugin commands you can use for your game!
 *
 * Plugin Command:
 * 
 *   EnableEquipBattleSkills
 *   - This will enable the 'Equip Skills' command in the skill menu.
 *
 *   DisableEquipBattleSkills
 *   - This will disable the 'Equip Skills' command in the skill menu.
 *
 *   ShowEquipBattleSkills
 *   - This will show the 'Equip Skills' command in the skill menu.
 *
 *   HideEquipBattleSkills
 *   - This will hide the 'Equip Skills' command in the skill menu.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.06b:
 * - Users with Skill Core and using the <Hide in Battle> notetag will now have
 * those skills hidden while in the battle if equipped.
 * - Fixed a crash that occurs when no skills are equipped.
 * - Optimization update for future plugins.
 *
 * Version 1.05a:
 * - Compatibility update with Skill Core's <Hide if Learned Skill: x> notetag.
 * - Updated to remove skills that are already equipped and to become hidden if
 * learning a new skill through the <Hide if Learned Skill: x> notetag.
 *
 * Version 1.04:
 * - Fixed an error stacking state.
 * - Fixed drawing errors when actors have 0 MaxMP.
 *
 * Version 1.03:
 * - Added four new plugin commands to enable, disable, show, and hide the
 * 'Equip Skills' command from the skill menu.
 *
 * Version 1.02:
 * - Fixed a bug that caused certain passive states to not appear correctly.
 *
 * Version 1.01:
 * - Fixed a bug that prevented increasing or decreasing battle skill slots
 * from working properly.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EquipBattleSkills');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.EBSCmdName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.EBSStartSlots = Number(Yanfly.Parameters['Starting Skill Slots']);
Yanfly.Param.EBSMaxSlots = Number(Yanfly.Parameters['Maximum Skills']);
Yanfly.Param.EBSAllEquip = eval(String(Yanfly.Parameters['All Equippable?']));

Yanfly.Param.EBSEmptyText = String(Yanfly.Parameters['Empty Slot']);
Yanfly.Param.EBSEmptyColor = Number(Yanfly.Parameters['Empty Color']);
Yanfly.Icon.EmptyEquipSlot = Number(Yanfly.Parameters['Empty Icon']);
Yanfly.Param.EBSEquippedColor = Number(Yanfly.Parameters['Equipped Color']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.EBS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.EBS.DataManager_isDatabaseLoaded.call(this)) return false;

    if (!Yanfly._loaded_YEP_EquipBattleSkills) {
  		this.processEBSNotetags1($dataActors);
      this.processEBSNotetags2($dataSkills);
      this.processEBSNotetags3($dataClasses);
      this.processEBSNotetags3($dataSkills);
      this.processEBSNotetags3($dataWeapons);
      this.processEBSNotetags3($dataArmors);
      this.processEBSNotetags3($dataStates);
      Yanfly._loaded_YEP_EquipBattleSkills = true;
    };
		return true;
};

DataManager.processEBSNotetags1 = function(group) {
	var note1 = /<(?:STARTING SKILL SLOTS|starting skill slots):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.startingSkillSlots = Yanfly.Param.EBSStartSlots;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.startingSkillSlots = parseInt(RegExp.$1);
			}
		}
	}
};

DataManager.processEBSNotetags2 = function(group) {
	var note1 = /<(?:EQUIP)[ ](.*):[ ]([\+\-]\d+)>/i;
  var note2 = /<(?:EQUIP STATE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3 = /<(?:EQUIP STATE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note4 = /<(?:UNEQUIPPABLE|cannot equip)>/i;
  var note5 = /<(?:ALL ACCESS EQUIPPABLE|ALL CLASS EQUIPPABLE)>/i;
  var note6 = /<(?:ACCESS ONLY EQUIPPABLE|CLASS ONLY EQUIPPABLE)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.equipParamBonus = {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
    }
    obj.equipStates = [];
    obj.equippable = true;
    obj.allEquippable = Yanfly.Param.EBSAllEquip;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        switch (stat) {
					case 'HP':
          case 'MAXHP':
          case 'MAX HP':
						obj.equipParamBonus[0] = value;
						break;
					case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
						obj.equipParamBonus[1] = value;
						break;
					case 'ATK':
          case 'STR':
						obj.equipParamBonus[2] = value;
						break;
					case 'DEF':
						obj.equipParamBonus[3] = value;
						break;
					case 'MAT':
          case 'INT':
          case 'SPI':
						obj.equipParamBonus[4] = value;
						break;
					case 'MDF':
          case 'RES':
						obj.equipParamBonus[5] = value;
						break;
					case 'AGI':
          case 'SPD':
						obj.equipParamBonus[6] = value;
						break;
					case 'LUK':
						obj.equipParamBonus[7] = value;
						break;
				}
			} else if (line.match(note2)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.equipStates = obj.equipStates.concat(array);
      } else if (line.match(note3)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
					parseInt(RegExp.$2));
        obj.equipStates = obj.equipStates.concat(range);
      } else if (line.match(note4)) {
        obj.equippable = false;
      } else if (line.match(note5)) {
        obj.allEquippable = true;
      } else if (line.match(note6)) {
        obj.allEquippable = false;
      }
		}
	}
};

DataManager.processEBSNotetags3 = function(group) {
	var note1 = /<(?:EQUIP SKILL SLOTS|equip skill slot):[ ]([\+\-]\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.equipSkillSlots = 0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.equipSkillSlots = parseInt(RegExp.$1);
			}
		}
	}
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.EBS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.EBS.Game_System_initialize.call(this);
    this.initEquipBattleSkills();
};

Game_System.prototype.initEquipBattleSkills = function() {
    this._enableEquipBattleSkills = true;
    this._showEquipBattleSkills = true;
};

Game_System.prototype.isEnableEquipBattleSkills = function() {
    if (this._enableEquipBattleSkills === undefined) {
      this.initEquipBattleSkills();
    }
    return this._enableEquipBattleSkills;
};

Game_System.prototype.setEnableEquipBattleSkills = function(value) {
    if (this._enableEquipBattleSkills === undefined) {
      this.initEquipBattleSkills();
    }
    this._enableEquipBattleSkills = value;
};

Game_System.prototype.isShowEquipBattleSkills = function() {
    if (this._showEquipBattleSkills === undefined) {
      this.initEquipBattleSkills();
    }
    return this._showEquipBattleSkills;
};

Game_System.prototype.setShowEquipBattleSkills = function(value) {
    if (this._showEquipBattleSkills === undefined) {
      this.initEquipBattleSkills();
    }
    this._showEquipBattleSkills = value;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.EBS.Game_BattlerBase_states = Game_BattlerBase.prototype.states;
Game_BattlerBase.prototype.states = function() {
    var array = Yanfly.EBS.Game_BattlerBase_states.call(this);
    if (this.isActor()) {
      array = array.concat(this.equipSkillStates());
      this.sortEquippedStates(array);
    }
    return array.filter(Yanfly.Util.onlyUnique);
};

Game_BattlerBase.prototype.sortEquippedStates = function(array) {
    array.sort(function(a, b) {
      var p1 = a.priority;
      var p2 = b.priority;
      if (p1 !== p2) return p2 - p1;
      return a - b;
    });
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.EBS.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    Yanfly.EBS.Game_Battler_onBattleEnd.call(this);
    this._setMaxBattleSkills = undefined;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.EBS.Game_Actor_initSkills = Game_Actor.prototype.initSkills;
Game_Actor.prototype.initSkills = function() {
    this.clearEquipBattleSkills();
    this.clearBattleSkillMaxPlus();
    Yanfly.EBS.Game_Actor_initSkills.call(this);
};

Game_Actor.prototype.clearEquipBattleSkills = function() {
    this._battleSkills = [];
    for (var i = 0; i < this.maxBattleSkills(); ++i) {
      this._battleSkills.push(0);
    }
};

Game_Actor.prototype.clearBattleSkillMaxPlus = function() {
    this._battleSkillMaxPlus = 0;
};

Game_Actor.prototype.getBattleSkillMaxPlus = function() {
    if (this._battleSkillMaxPlus === undefined) {
      this.clearBattleSkillMaxPlus();
    }
    return this._battleSkillMaxPlus;
};

Game_Actor.prototype.setBattleSkillMaxPlus = function(value) {
    if (this._battleSkillMaxPlus === undefined) {
      this.clearBattleSkillMaxPlus();
    }
    this._battleSkillMaxPlus = value;
    this.refresh();
};

Game_Actor.prototype.increaseBattleSkillSlots = function(value) {
    value += this.getBattleSkillMaxPlus();
    this.setBattleSkillMaxPlus(value);
};

Game_Actor.prototype.decreaseBattleSkillSlots = function(value) {
    value -= this.getBattleSkillMaxPlus();
    this.setBattleSkillMaxPlus(value);
};

Game_Actor.prototype.maxBattleSkills = function() {
  if (this._setMaxBattleSkills !== undefined) return this._setMaxBattleSkills;
  var value = this.actor().startingSkillSlots;
  value += this.currentClass().equipSkillSlots;
  for (var i = 0; i < this.battleSkillsRaw().length; ++i) {
    var skill = $dataSkills[this.battleSkillsRaw()[i]];
    if (skill) value += skill.equipSkillSlots;
  }
  for (var i = 0; i < this.equips().length; ++i) {
    var equip = this.equips()[i];
    if (equip) value += equip.equipSkillSlots;
  }
  for (var i = 0; i < this.states().length; ++i) {
    var state = this.states()[i];
    if (state) value += state.equipSkillSlots;
  }
  value += this.getBattleSkillMaxPlus();
  this._setMaxBattleSkills = value.clamp(1, Yanfly.Param.EBSMaxSlots);
  return this._setMaxBattleSkills;
};

Game_Actor.prototype.battleSkills = function() {
    if (this._battleSkills === undefined) this.clearEquipBattleSkills();
    if (!$gameParty.inBattle()) this.clearUnequippableSkills();
    var skills = [];
    for (var i = 0; i < this.maxBattleSkills(); ++i) {
      if (this._battleSkills[i] === undefined) this._battleSkills[i] = 0;
      var skillId = this._battleSkills[i];
      var skill = $dataSkills[skillId];
      if (skill === undefined) skill = null;
      skills.push(skill);
    };
    for (;;) {
      if (this._battleSkills.length <= this.maxBattleSkills()) break;
      this._battleSkills.pop();
    }
    return skills;
};

Game_Actor.prototype.battleSkillsRaw = function() {
    if (this._battleSkills === undefined) this.clearEquipBattleSkills();
    return this._battleSkills;
};

Yanfly.EBS.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    var hasLearnedSkill = this.isLearnedSkill(skillId);
    Yanfly.EBS.Game_Actor_learnSkill.call(this, skillId);
    this.removeHiddenEquippedSkill(skillId);
    if (!hasLearnedSkill) {
      var slotId = this._battleSkills.indexOf(0);
      if (slotId !== -1) this.equipSkill(skillId, slotId);
    }
};

Game_Actor.prototype.removeHiddenEquippedSkill = function(skillId) {
    if (!Imported.YEP_SkillCore) return;
    var length = this._battleSkills.length;
    for (var i = 0; i < length; ++i) {
      var id = this._battleSkills[i];
      var skill = $dataSkills[id];
      if (!skill) continue;
      if (skill.hideIfLearnedSkill.contains(skillId)) this.equipSkill(0, i);
    }
};

Yanfly.EBS.Game_Actor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function() {
    if (this.isGetBattleSkills()) {
      return this.battleSkills();
    } else {
      return Yanfly.EBS.Game_Actor_skills.call(this);
    }
};

Game_Actor.prototype.isGetBattleSkills = function() {
    if (DataManager.isBattleTest()) return false;
    if ($gameTemp._disableBattleSkills) return false;
    return $gameParty.inBattle();
};

Yanfly.EBS.Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    if (!$gameParty.inBattle()) {
      this._setMaxBattleSkills = undefined;
      this.clearUnequippableSkills();
    }
    Yanfly.EBS.Game_Actor_refresh.call(this);
};

Game_Actor.prototype.equipSkill = function(skillId, slotId) {
    if (this._battleSkills.indexOf(skillId) >= 0) {
      var index = this._battleSkills.indexOf(skillId);
      this._battleSkills[index] = 0;
    }
    this._battleSkills[slotId] = skillId;
    this.clearUnequippableSkills();
    this.refresh();
};

Game_Actor.prototype.clearUnequippableSkills = function() {
    for (var i = 0; i < this._battleSkills.length; ++i) {
      var skill = $dataSkills[this._battleSkills[i]];
      if (!skill) continue;
      if (!this.canEquipSkill(skill)) this._battleSkills[i] = 0;
    }
};

Game_Actor.prototype.canEquipSkill = function(skill) {
  if (!skill.equippable) return false;
  if (skill.allEquippable) return true;
  return this.addedSkillTypes().contains(skill.stypeId);
};

Yanfly.EBS.Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId) {
    var value = Yanfly.EBS.Game_Actor_paramPlus.call(this, paramId);
    for (var i = 0; i < this.battleSkillsRaw().length; ++i) {
      var skill = $dataSkills[this.battleSkillsRaw()[i]];
      if (skill === null) continue;
      value += skill.equipParamBonus[paramId];
    }
    return value;
};

Game_Actor.prototype.equipSkillStates = function() {
    var array = [];
    for (var s = 0; s < this.battleSkillsRaw().length; ++s) {
      var skill = $dataSkills[this.battleSkillsRaw()[s]];
      if (skill === null) continue;
      for (var i = 0; i < skill.equipStates.length; ++i) {
        var state = $dataStates[skill.equipStates[i]];
        if (state && !array.contains(state)) array.push(state);
      }
    }
    this.sortEquipStates(array);
    return array;
};

Game_Actor.prototype.sortEquipStates = function(array) {
		array.sort(function(a, b) {
			var p1 = a.priority;
			var p2 = b.priority;
			if (p1 !== p2) return p2 - p1;
			return a - b;
		});
}

Yanfly.EBS.Game_Actor_isStateAffected =
    Game_Actor.prototype.isStateAffected;
Game_Actor.prototype.isStateAffected = function(stateId) {
    if (this.equipSkillStates().contains($dataStates[stateId])) return true;
    return Yanfly.EBS.Game_Actor_isStateAffected.call(this, stateId);
};

Yanfly.EBS.Game_Actor_isStateAddable = Game_Actor.prototype.isStateAddable;
Game_Actor.prototype.isStateAddable = function(stateId) {
		if (this.equipSkillStates().contains($dataStates[stateId])) return false;
    return Yanfly.EBS.Game_Actor_isStateAddable.call(this, stateId);
};

Yanfly.EBS.Game_Actor_removeState = Game_Actor.prototype.removeState;
Game_Actor.prototype.removeState = function(stateId) {
		if (this.equipSkillStates().contains($dataStates[stateId])) return;
    Yanfly.EBS.Game_Actor_removeState.call(this, stateId);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.EBS.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.EBS.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'IncreaseActorBattleSlots') {
    var actorId = parseInt(args[0]);
    var value = parseInt(args[2]);
    $gameActors.actor(actorId).increaseBattleSkillSlots(value);
  } else if (command === 'DecreaseActorBattleSlots') {
    var actorId = parseInt(args[0]);
    var value = parseInt(args[2]);
    $gameActors.actor(actorId).decreaseBattleSkillSlots(value);
  } else if (command === 'EnableEquipBattleSkills') {
    $gameSystem.setEnableEquipBattleSkills(true);
  } else if (command === 'DisableEquipBattleSkills') {
    $gameSystem.setEnableEquipBattleSkills(false);
  } else if (command === 'ShowEquipBattleSkills') {
    $gameSystem.setShowEquipBattleSkills(true);
  } else if (command === 'HideEquipBattleSkills') {
    $gameSystem.setShowEquipBattleSkills(false);
  }
};

//=============================================================================
// Window_SkillType
//=============================================================================

Yanfly.EBS.Window_SkillType_makeCommandList =
    Window_SkillType.prototype.makeCommandList;
Window_SkillType.prototype.makeCommandList = function() {
    this.addCustomCommandBefore();
    Yanfly.EBS.Window_SkillType_makeCommandList.call(this);
};

if (!Window_SkillType.prototype.addCustomCommandBefore) {
  Window_SkillType.prototype.addCustomCommandBefore = function() {
  };
}

Yanfly.EBS.Window_SkillType_addCustomCommandBefore =
    Window_SkillType.prototype.addCustomCommandBefore;
Window_SkillType.prototype.addCustomCommandBefore = function() {
  Yanfly.EBS.Window_SkillType_addCustomCommandBefore.call(this);
  if (this.findExt('battleSkills') === -1) this.addEquipBattleSkillsCommand();
};

Window_SkillType.prototype.addEquipBattleSkillsCommand = function() {
    if (!$gameSystem.isShowEquipBattleSkills()) return;
    var name = Yanfly.Param.EBSCmdName;
    var enabled = $gameSystem.isEnableEquipBattleSkills();
    this.addCommand(name, 'skill', enabled, 'battleSkills');
};

//=============================================================================
// Window_SkillList
//=============================================================================

Yanfly.EBS.Window_SkillList_makeItemList =
    Window_SkillList.prototype.makeItemList;
Window_SkillList.prototype.makeItemList = function() {
    if (this._actor && this._stypeId === 'battleSkills') {
      this._data = this._actor.battleSkills().filter(function(item) {
        return this.includesBattleEquip(item);
      }, this);
    } else {
      $gameTemp._disableBattleSkills = true;
      Yanfly.EBS.Window_SkillList_makeItemList.call(this);
      $gameTemp._disableBattleSkills = false;
    }
};

Window_SkillList.prototype.includesBattleEquip = function(item) {
    if (!item) return true;
    if ($gameParty.inBattle() && item.hideInBattle) return false;
    return true;
};

Yanfly.EBS.Window_SkillList_drawItem = Window_SkillList.prototype.drawItem;
Window_SkillList.prototype.drawItem = function(index) {
    if (this._data[index] === null) {
      this.drawEmptySlot(index);
    } else {
      Yanfly.EBS.Window_SkillList_drawItem.call(this, index);
    }
};

Window_SkillList.prototype.drawEmptySlot = function(index) {
    var rect = this.itemRect(index);
    this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    this.changePaintOpacity(false);
    this.changeTextColor(this.textColor(Yanfly.Param.EBSEmptyColor));
    var text = Yanfly.Param.EBSEmptyText;
    this.drawText(text, rect.x, rect.y, rect.width, 'center');
};

Window_SkillList.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Yanfly.EBS.Window_SkillList_isEnabled = Window_SkillList.prototype.isEnabled;
Window_SkillList.prototype.isEnabled = function(item) {
    if (this._stypeId === 'battleSkills' && !$gameParty.inBattle()) {
      return this.isBattleSkillEnabled(item);
    } else {
      return Yanfly.EBS.Window_SkillList_isEnabled.call(this, item);
    }
};

Window_SkillList.prototype.isBattleSkillEnabled = function(item) {
    return true;
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Yanfly.EBS.Window_ActorCommand_addSkillCommands =
    Window_ActorCommand.prototype.addSkillCommands;
Window_ActorCommand.prototype.addSkillCommands = function() {
    if (DataManager.isBattleTest()) {
      Yanfly.EBS.Window_ActorCommand_addSkillCommands.call(this);
    } else {
      var name = TextManager.skill;
      this.addCommand(name, 'skill', true, 'battleSkills');
    }
};

//=============================================================================
// Window_StatCompare
//=============================================================================

function Window_StatCompare() {
    this.initialize.apply(this, arguments);
}

Window_StatCompare.prototype = Object.create(Window_Base.prototype);
Window_StatCompare.prototype.constructor = Window_StatCompare;

Window_StatCompare.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this._actor = null;
    this._tempActor = null;
    this.refresh();
};

Window_StatCompare.prototype.createWidths = function() {
    this._paramNameWidth = 0;
    this._paramValueWidth = 0;
    this._arrowWidth = this.textWidth('\u2192' + ' ');
    var buffer = this.textWidth(' ');
    for (var i = 0; i < 8; ++i) {
      var value1 = this.textWidth(TextManager.param(i));
      var value2 = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(i)));
      this._paramNameWidth = Math.max(value1, this._paramNameWidth);
      this._paramValueWidth = Math.max(value2, this._paramValueWidth);
    }
    this._bonusValueWidth = this._paramValueWidth;
    this._bonusValueWidth += this.textWidth('(+)') + buffer;
    this._paramNameWidth += buffer;
    this._paramValueWidth;
    if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth +
      this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
};

Window_StatCompare.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
    this.createWidths();
    this.refresh();
};

Window_StatCompare.prototype.refresh = function() {
    this.contents.clear();
    if (!this._actor) return;
    for (var i = 0; i < 8; ++i) {
        this.drawItem(0, this.lineHeight() * i, i);
    }
};

Window_StatCompare.prototype.setTempActor = function(tempActor) {
    if (this._tempActor === tempActor) return;
    this._tempActor = tempActor;
    this.refresh();
};

Window_StatCompare.prototype.drawItem = function(x, y, paramId) {
    this.drawDarkRect(x, y, this.contents.width, this.lineHeight());
    this.drawParamName(y, paramId);
    this.drawCurrentParam(y, paramId);
    this.drawRightArrow(y);
    if (!this._tempActor) return;
    this.drawNewParam(y, paramId);
    this.drawParamDifference(y, paramId);
};

Window_StatCompare.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_StatCompare.prototype.drawParamName = function(y, paramId) {
    var x = this.textPadding();
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), x, y, this._paramNameWidth);
};

Window_StatCompare.prototype.drawCurrentParam = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
    this.resetTextColor();
    var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawRightArrow = function(y) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
};

Window_StatCompare.prototype.drawNewParam = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawParamDifference = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    if (diffvalue === 0) return;
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    var text = Yanfly.Util.toGroup(diffvalue);
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

//=============================================================================
// Window_SkillEquip
//=============================================================================

function Window_SkillEquip() {
    this.initialize.apply(this, arguments);
}

Window_SkillEquip.prototype = Object.create(Window_Selectable.prototype);
Window_SkillEquip.prototype.constructor = Window_SkillEquip;

Window_SkillEquip.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._skillList = undefined;
    this._data = [];
};

Window_SkillEquip.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this._skillList = undefined;
        this.refresh();
        this.resetScroll();
    }
};

Window_SkillEquip.prototype.setListWindow = function(listWindow) {
    this._listWindow = listWindow;
    this.callUpdateHelp();
};

Window_SkillEquip.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_SkillEquip.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_SkillEquip.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_SkillEquip.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_SkillEquip.prototype.includes = function(item) {
    if (!item) return false;
    if (Imported.YEP_SkillCore) {
      if (item.hideIfLearnedSkill) {
        var length = item.hideIfLearnedSkill.length;
        for (var i = 0; i < length; ++i) {
          var skillId = item.hideIfLearnedSkill[i];
          if (this._actor.isLearnedSkill(skillId)) return false;
        }
      }
    }
    return this._actor.canEquipSkill(item);
};

Window_SkillEquip.prototype.isEnabled = function(item) {
    return true;
};

Window_SkillEquip.prototype.makeItemList = function() {
    if (this._actor) {
      var max = Math.floor(this.contentsHeight() / this.lineHeight());
      this._data = this.getSkills().filter(function(item) {
        return this.includes(item);
      }, this);
      this._data.unshift(null);
      if (this._data.length > max) this._data.push(null);
    } else {
      this._data = [];
    }
};

Window_SkillEquip.prototype.getSkills = function() {
    if (this._skillList === undefined) this._skillList = this._actor.skills();
    return this._skillList;
};

Window_SkillEquip.prototype.drawItem = function(index) {
    var skill = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    if (skill !== null) {
      this.drawSkill(skill, rect);
    } else if (skill === null) {
      this.drawEmpty(rect);
    }
};

Window_SkillEquip.prototype.drawSkill = function(skill, rect) {
    this.changePaintOpacity(this.isEnabled(skill));
    this.drawItemName(skill, rect.x, rect.y, rect.width);
    this.changePaintOpacity(true);
};

Window_SkillEquip.prototype.drawEmpty = function(rect) {
    this.changeTextColor(this.normalColor());
    this.changePaintOpacity(true);
    this.drawEmptySlot(rect);
};

Window_SkillEquip.prototype.drawItemName = function(item, x, y, width) {
    if (!item) return;
    var iconBoxWidth = Window_Base._iconWidth + 4;
    this.changeTextColor(this.skillColor(item));
    this.drawIcon(item.iconIndex, x + 2, y + 2);
    this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
};

Window_SkillEquip.prototype.skillColor = function(skill) {
    if (this._actor.battleSkillsRaw().contains(skill.id)) {
      return this.textColor(Yanfly.Param.EBSEquippedColor);
    }
    return this.normalColor();
};

Window_SkillEquip.prototype.drawEmptySlot = function(rect) {
    var ibw = Window_Base._iconWidth + 4;
    var text = Yanfly.Param.EBSEmptyText;
    this.resetTextColor();
    this.drawIcon(Yanfly.Icon.EmptyEquipSlot, rect.x + 2, rect.y + 2);
    this.drawText(text, rect.x + ibw, rect.y, rect.width - ibw);
};

Window_SkillEquip.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    if (this._actor && this._statusWindow && this._listWindow) {
        var actor = JsonEx.makeDeepCopy(this._actor);
        var slotId = this._listWindow.index();
        if (this.item() !== null) {
          var skillId = this.item().id;
        } else {
          var skillId = 0;
        }
        actor.equipSkill(skillId, slotId);
        this._statusWindow.setTempActor(actor);
    }
};

Window_SkillEquip.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_SkillEquip.prototype.playOkSound = function() {
};

//=============================================================================
// Scene_Skill
//=============================================================================

Yanfly.EBS.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
    Yanfly.EBS.Scene_Skill_create.call(this);
    this.createSkillEquipWindow();
    this.createCompareWindow();
};

Yanfly.EBS.Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
Scene_Skill.prototype.refreshActor = function() {
    Yanfly.EBS.Scene_Skill_refreshActor.call(this);
    var actor = this.actor();
    if (this._skillEquipWindow) this._skillEquipWindow.setActor(actor);
    if (this._compareWindow) this._compareWindow.setActor(actor);
};

Scene_Skill.prototype.createSkillEquipWindow = function() {
  var wx = 0;
  var wy = this._statusWindow.y + this._statusWindow.height;
  var ww = Graphics.boxWidth / 2;
  var wh = Graphics.boxHeight - wy;
  this._skillEquipWindow = new Window_SkillEquip(wx, wy, ww, wh);
  this._skillEquipWindow.setHelpWindow(this._helpWindow);
  this._skillEquipWindow.setListWindow(this._itemWindow);
  this._skillEquipWindow.setHandler('ok', this.onSkillEqOk.bind(this));
  this._skillEquipWindow.setHandler('cancel', this.onSkillEqCancel.bind(this));
  this._skillEquipWindow.hide();
  this.addWindow(this._skillEquipWindow);
  this._skillEquipWindow.setActor(this.actor());
};

Scene_Skill.prototype.createCompareWindow = function() {
    if (this._compareWindow) return;
    var wx = this._skillEquipWindow.width;
		var wy = this._skillEquipWindow.y;
		var ww = Graphics.boxWidth - wx;
		var wh = Graphics.boxHeight - wy;
		this._compareWindow = new Window_StatCompare(wx, wy, ww, wh);
    this._skillEquipWindow.setStatusWindow(this._compareWindow);
    this._compareWindow.hide();
    this.addWindow(this._compareWindow);
    this._compareWindow.setActor(this.actor());
};

Yanfly.EBS.Scene_Skill_onItemOk = Scene_Skill.prototype.onItemOk;
Scene_Skill.prototype.onItemOk = function() {
    if (this._skillTypeWindow.currentExt() === 'battleSkills') {
      this.openSkillEquipWindows();
    } else {
      Yanfly.EBS.Scene_Skill_onItemOk.call(this);
    }
};

Scene_Skill.prototype.openSkillEquipWindows = function() {
    this._skillEquipWindow.refresh();
    this._skillEquipWindow.activate();
    this._skillEquipWindow.select(0);
    this._skillEquipWindow.show();
    this._compareWindow.show();
    this._itemWindow.hide();
};

Scene_Skill.prototype.onSkillEqOk = function() {
    SoundManager.playEquip();
    if (this._skillEquipWindow.item() !== null) {
      var skillId = this._skillEquipWindow.item().id;
    } else {
      var skillId = 0;
    }
    var slotId = this._itemWindow.index();
    var hpRate = this.actor().hp / Math.max(1, this.actor().mhp);
    var mpRate = this.actor().mp / Math.max(1, this.actor().mmp);
    this.actor().equipSkill(skillId, slotId);
    var max = this.actor().isDead() ? 0 : 1;
    var hpAmount = Math.max(max, parseInt(this.actor().mhp * hpRate));
    this.actor().setHp(hpAmount);
    this.actor().setMp(parseInt(this.actor().mmp * mpRate));
    this.onSkillEqCancel();
    this._statusWindow.refresh();
    this._itemWindow.refresh();
};

Scene_Skill.prototype.onSkillEqCancel = function() {
    this._skillEquipWindow.deactivate();
    this._skillEquipWindow.deselect();
    this._skillEquipWindow.hide();
    this._compareWindow.hide();
    this._itemWindow.show();
    this._itemWindow.activate();
    if (this._itemWindow.index() > this.actor().maxBattleSkills() - 1) {
      this._itemWindow.select(this.actor().maxBattleSkills() - 1);
    }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
		Yanfly.Util.toGroup = function(inVal) {
				return inVal;
		}
};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
