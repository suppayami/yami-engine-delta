//=============================================================================
// Yanfly Engine Plugins - Equip Battle Skills
// YEP_EquipBattleSkills.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EquipBattleSkills = true;

var Yanfly = Yanfly || {};
Yanfly.EBS = Yanfly.EBS || {};

//=============================================================================
 /*:
 * @plugindesc Incorporates a new system where players can only bring
 * equipped skills to battle.
 * @author Yanfly Engine Plugins
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
 * @param All Equippable?
 * @desc Are all skills equippable? This includes skills outside of
 * the actor's current class. NO - false     YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a new gameplay mechanic where players have to choose
 * which skills to bring into battle. They can select what skills to bring from
 * the skill menu. In addition to being able to do that, equipped skills can
 * also add bonuses such as stat stats and/or passive states.
 *
 * Note: If you are using YEP_AutoPassiveStates.js, place this plugin below that
 * plugin to ensure compatibility.
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
 * Class, Skill, Weapon, Armor, and State Notetags:
 *   <Equip Skill Slots: +x>
 *   <Equip Skill Slots: -x>
 *   This increases or decreases the amount of skills the actor can equip for
 *   battle by x. This value will not allow the actor to bypass the Maximum
 *   Skills Limit.
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
Yanfly.Param.EBSEmptyText = String(Yanfly.Parameters['Empty Slot']);
Yanfly.Param.EBSEmptyColor = Number(Yanfly.Parameters['Empty Color']);
Yanfly.Icon.EmptyEquipSlot = Number(Yanfly.Parameters['Empty Icon']);
Yanfly.Param.EBSEquippedColor = Number(Yanfly.Parameters['Equipped Color']);
Yanfly.Param.EBSAllEquip = String(Yanfly.Parameters['All Equippable?']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.EBS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.EBS.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processEBSNotetags1($dataActors);
    this.processEBSNotetags2($dataSkills);
    this.processEBSNotetags3($dataClasses);
    this.processEBSNotetags3($dataSkills);
    this.processEBSNotetags3($dataWeapons);
    this.processEBSNotetags3($dataArmors);
    this.processEBSNotetags3($dataStates);
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
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.equipParamBonus = {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
    }
    obj.equipStates = [];
    obj.equippable = true;

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
// Game_Actor
//=============================================================================

Yanfly.EBS.Game_Actor_initSkills = Game_Actor.prototype.initSkills;
Game_Actor.prototype.initSkills = function() {
    this.clearEquipBattleSkills();
    Yanfly.EBS.Game_Actor_initSkills.call(this);
};

Game_Actor.prototype.clearEquipBattleSkills = function() {
    this._battleSkills = [];
    for (var i = 0; i < this.maxBattleSkills(); ++i) {
      this._battleSkills.push(0);
    }
};

Game_Actor.prototype.maxBattleSkills = function() {
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
    return value.clamp(1, Yanfly.Param.EBSMaxSlots);
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
    if (!hasLearnedSkill) {
      var slotId = this._battleSkills.indexOf(0);
      if (slotId !== -1) this.equipSkill(skillId, slotId);
    }
};

Yanfly.EBS.Game_Actor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function() {
    if ($gameParty.inBattle()) {
      return this.battleSkills();
    } else {
      return Yanfly.EBS.Game_Actor_skills.call(this);
    }
};

Yanfly.EBS.Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    this.clearUnequippableSkills();
    Yanfly.EBS.Game_Actor_refresh.call(this);
};

Game_Actor.prototype.equipSkill = function(skillId, slotId) {
    if (this._battleSkills.indexOf(skillId) >= 0) {
      var index = this._battleSkills.indexOf(skillId);
      this._battleSkills[index] = 0;
    }
    this._battleSkills[slotId] = skillId;
    this.clearUnequippableSkills();
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
  if (eval(Yanfly.Param.EBSAllEquip)) return true;
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

Yanfly.EBS.Game_Actor_states = Game_Actor.prototype.states;
Game_Actor.prototype.states = function() {
    var states_array = Yanfly.EBS.Game_Actor_states.call(this);
    states_array = states_array.concat(this.equipSkillStates());
    return states_array.filter(Yanfly.Util.onlyUnique);
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
// Window_SkillType
//=============================================================================

Yanfly.EBS.Window_SkillType_makeCommandList =
    Window_SkillType.prototype.makeCommandList;
Window_SkillType.prototype.makeCommandList = function() {
    if (this.findSymbol('battleSkills') === -1) {
      this.addCustomCommandBefore();
    }
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
    this.addEquipBattleSkillsCommand();
};

Window_SkillType.prototype.addEquipBattleSkillsCommand = function() {
    var name = Yanfly.Param.EBSCmdName;
    this.addCommand(name, 'skill', true, 'battleSkills');
};

//=============================================================================
// Window_SkillList
//=============================================================================

Yanfly.EBS.Window_SkillList_makeItemList =
    Window_SkillList.prototype.makeItemList;
Window_SkillList.prototype.makeItemList = function() {
    if (this._actor && this._stypeId === 'battleSkills') {
      this._data = this._actor.battleSkills();
    } else {
      Yanfly.EBS.Window_SkillList_makeItemList.call(this);
    }
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

Window_ActorCommand.prototype.addSkillCommands = function() {
    var name = TextManager.skill;
    this.addCommand(name, 'skill', true, 'battleSkills');
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
    this._data = [];
};

Window_SkillEquip.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
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
    if (!item.equippable) return false;
    if (eval(Yanfly.Param.EBSAllEquip)) return true;
    return this._actor.addedSkillTypes().contains(item.stypeId);
};

Window_SkillEquip.prototype.isEnabled = function(item) {
    return true;
};

Window_SkillEquip.prototype.makeItemList = function() {
    if (this._actor) {
      this._data = this._actor.skills().filter(function(item) {
        return this.includes(item);
      }, this);
      this._data.unshift(null);
      if (this._data.length > 1) this._data.push(null);
    } else {
      this._data = [];
    }
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
    var hpRate = this.actor().hp / this.actor().mhp;
		var mpRate = this.actor().mp / this.actor().mmp;
    this.actor().equipSkill(skillId, slotId);
    this.actor().setHp(parseInt(this.actor().mhp * hpRate));
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

//=============================================================================
// End of File
//=============================================================================
