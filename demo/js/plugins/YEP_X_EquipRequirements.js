//=============================================================================
// Yanfly Engine Plugins - Equip Core Extension - Equip Requirements
// YEP_X_EquipRequirements.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_EquipRequirements = true;

var Yanfly = Yanfly || {};
Yanfly.EqReq = Yanfly.EqReq || {};

//=============================================================================
 /*:
 * @plugindesc v1.05a (Requires YEP_EquipCore.js) Place requirements on
 * pieces of equipment before actors can use them!
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Requirement Window
 * @desc Add the requirement window for the Equip menu?
 * NO - false     YES - true
 * @default true
 *
 * @param Battle Test Ignore
 * @desc Ignore equip requirements during battle test?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Window---
 * @default
 *
 * @param Requirement Title
 * @desc The title used for equipment requirements.
 * @default Requirements
 *
 * @param No Requirement
 * @desc The text used to display no requirements needed.
 * @default No Requirements!
 *
 * @param Positive Color
 * @desc Text color used for positive color.
 * @default 24
 *
 * @param Negative Color
 * @desc Text color used for positive color.
 * @default 25
 *
 * @param At Least Text
 * @desc The text used to describe >= a parameter.
 * %1 - Parameter   %2 - Requirement   %3 - Compare
 * @default \c[16]Minimum %1:\c[0] %2 (%3)
 *
 * @param At Most Text
 * @desc The text used to describe >= a parameter.
 * %1 - Parameter   %2 - Requirement   %3 - Compare
 * @default \c[16]Maximum %1:\c[0] %2 (%3)
 *
 * @param Draw Classes
 * @desc Draw the classes required?
 * NO - false     YES - true
 * @default true
 *
 * @param Class Style
 * @desc If classes are drawn, what style to draw them in?
 * 0 - Name Only     1 - Icon Only     2 - Icon and Name
 * @default 0
 *
 * @param Class Text
 * @desc Text displayed to say what class is allowed.
 * @default Class:
 *
 * @param Draw Skills
 * @desc Draw the skills required?
 * NO - false     YES - true
 * @default true
 *
 * @param Skill Style
 * @desc If skills are drawn, what style to draw them in?
 * 0 - Name Only     1 - Icon Only     2 - Icon and Name
 * @default 2
 *
 * @param Skill Text
 * @desc Text displayed to say what skills are needed.
 * @default Skill:
 *
 * @param Draw Switches
 * @desc Draw the switch names required?
 * NO - false     YES - true
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_EquipCore.js to work.
 * Place this plugin beneath YEP_EquipCore.js in the Plugin Manager list.
 *
 * Place restrictions on when an actor can equip a weapon or piece of armor.
 * Set level requirements, stat requirements, switch requirements, and more.
 * This plugin will also provide a separate equipment requirement window to
 * show the player what is needed in order for gear to be equipped.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use these notetags to implement requirements onto your weapons and
 * armors. These notetags will have to be set up in a certain way:
 *
 * Weapon and Armor Notetags:
 *
 *   <Equip Requirement>
 *    requirement
 *    requirement
 *   </Equip Requirement>
 *   - The main requirements will have to be placed in between these notetags.
 *   You can have a multitude of requirements for your weapons/armors. Replace
 *   'requirement' with any of the following below:
 *
 * Weapon and Armor Requiprements:
 *
 *   param > x
 *   param >= x
 *   param === x
 *   param <= x
 *   param < x
 *   - Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *   'mdf', 'agi', or 'luk'. This will make the piece of equipment require the
 *   actor's base parameter to be greater than (>), greater than or equal to
 *   (>=), equal to (===), less than or equal to (<=), or less than (<). This
 *   is NOT the value for the total parameter, only the base parameter. The
 *   base parameter is calculated by the user's class parameter value, any
 *   bonuses received by equipment and/or permanent stat increases.
 *
 *   class: x
 *   class: name
 *   - This will make the piece of equipment require the actor to be class x.
 *   If 'name' is used, priority will be given to the class with the highest ID
 *   in the database. Insert multiple of these requirements to add more
 *   classes. Having multiple classes will mean that the actor can be any of
 *   those classes to be able to equip the gear.
 *
 *   skill: x
 *   skill: name
 *   - This will make the piece of equipment require the actor to have learned
 *   skill x. If 'name' is used, priority will be given to the skill with the
 *   highest ID in the database. Insert multiple of these requirements to add
 *   more skills. Having multiple skills means the actor must have learned ALL
 *   of the skills to be able to equip the gear.
 *   *NOTE: The actor needs to have LEARNED the skill. This means that if you
 *   have added a skill to the actor's skill library through a trait, it will
 *   not count.
 *
 *   switch: x
 *   - This will require switch X to be on. If it isn't, the piece of equipment
 *   cannot be worn. Insert multiple of these to add more switches that are
 *   are required to be on.
 *
 *   unique only
 *   - This will make the piece of equipment to be "unique", rendering the
 *   actor to be unable to wear more than 1 of its kind.
 *
 * ============================================================================
 * Lunatic Mode - Custom Equip Requirement Conditions
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use these notetags to give
 * certain pieces of equipment a special requirement before it can be equipped.
 *
 * Weapon and Armor Notetags:
 *
 *   <Custom Equip Requirement Condition>
 *    if (user.name() === 'Harold') {
 *      condition = true;
 *    } else {
 *      condition = false;
 *    }
 *   </Custom Equip Requirement Condition>
 *   The 'condition' variable will determine whether or not the piece of
 *   equipment can be worn by the user. If 'condition' returns 'true', then the
 *   piece of equipment can be worn. If 'condition' returns 'false', then the
 *   piece of equipment can't be worn.
 *
 * ============================================================================
 * Lunatic Mode - Custom Equip Requirement Text
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use these notetags to alter
 * the text displayed in the Requirement Window.
 *
 * Weapon and Armor Notetags:
 *
 *   <Custom Equip Requirement Text>
 *    text = user.name() + ' has used this sword since young!\n';
 *    text += 'This is another line for the text!'
 *   </Custom Equip Requirement Text>
 *   For those who would like to write custom text for the Requirement Window,
 *   you can use this notetag. Text codes are allowed here. Use \n for line
 *   breaks. If you plan on using text codes, \i[4] would appear as \\i[4].
 *   Whatever value the 'text' variable has at the end will determine the text
 *   that will be displayed.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05a:
 * - Fixed a bug that caused unremovable items to be removed.
 * - Added anti-crash for non-existent actors.
 *
 * Version 1.04:
 * - Fixed a bug that caused stat comparisons to remain after cancel.
 *
 * Version 1.03:
 * - Notetags now allows spaces (whitespace) to be before the requirements.
 *
 * Version 1.02:
 * - Fixed a bug where Optimize was able to bypass equip requirements.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_EquipCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_EquipRequirements');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EqReqWindow = String(Yanfly.Parameters['Requirement Window']);
Yanfly.Param.EqReqWindow = eval(Yanfly.Param.EqReqWindow);
Yanfly.Param.EqReqBTest = String(Yanfly.Parameters['Battle Test Ignore']);
Yanfly.Param.EqReqBTest = eval(Yanfly.Param.EqReqBTest);

Yanfly.Param.EqReqTitle = String(Yanfly.Parameters['Requirement Title']);
Yanfly.Param.EqReqNone = String(Yanfly.Parameters['No Requirement']);
Yanfly.Param.EqReqPosColor = Number(Yanfly.Parameters['Positive Color']);
Yanfly.Param.EqReqNegColor = Number(Yanfly.Parameters['Negative Color']);
Yanfly.Param.EqReqAtLeast = String(Yanfly.Parameters['At Least Text']);
Yanfly.Param.EqReqAtMost = String(Yanfly.Parameters['At Most Text']);
Yanfly.Param.EqReqClasses = eval(String(Yanfly.Parameters['Draw Classes']));
Yanfly.Param.EqReqClassStyle = Number(Yanfly.Parameters['Class Style']);
Yanfly.Param.EqReqClassText = String(Yanfly.Parameters['Class Text']);
Yanfly.Param.EqReqSkills = eval(String(Yanfly.Parameters['Draw Skills']));
Yanfly.Param.EqReqSkillStyle = Number(Yanfly.Parameters['Skill Style']);
Yanfly.Param.EqReqSkillText = String(Yanfly.Parameters['Skill Text']);
Yanfly.Param.EqReqSwitches = eval(String(Yanfly.Parameters['Draw Switches']));

//=============================================================================
// DataManager
//=============================================================================

Yanfly.EqReq.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.EqReq.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_EquipRequirements) {
    this.processEqReqNotetagsC($dataClasses);
    this.processEqReqNotetagsS($dataSkills);
    this.processEqReqNotetags1($dataWeapons);
    this.processEqReqNotetags1($dataArmors);
    Yanfly._loaded_YEP_X_EquipRequirements = true;
  }
  return true;
};

DataManager.processEqReqNotetagsC = function(group) {
  if (Yanfly.ClassIdRef) return;
  Yanfly.ClassIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ClassIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEqReqNotetagsS = function(group) {
  if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEqReqNotetags1 = function(group) {
  var noteA1 = /<(?:EQUIP REQUIREMENT|EQUIP REQUIREMENTS|REQUIREMENT)>/i;
  var noteA2 = /<\/(?:EQUIP REQUIREMENT|EQUIP REQUIREMENTS|REQUIREMENT)>/i;
  var noteB1 = /<(?:CUSTOM EQUIP REQUIREMENT TEXT)>/i;
  var noteB2 = /<\/(?:CUSTOM EQUIP REQUIREMENT TEXT)>/i;
  var noteC1 = /<(?:CUSTOM EQUIP REQUIREMENT CONDITION)>/i;
  var noteC2 = /<\/(?:CUSTOM EQUIP REQUIREMENT CONDITION)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.equipRequirements = {
      atLeast: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      atMost: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      classes: [],
      skills: [],
      switches: [],
      unique: false
    };
    var evalMode = 'none';
    obj.customEquipReqText = '';
    obj.customEquipReqCondition = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteA1)) {
        evalMode = 'equip requirements';
      } else if (line.match(noteA2)) {
        evalMode = 'none';
      } else if (evalMode === 'equip requirements') {
        this.makeEquipRequirement(obj, line);
      } else if (line.match(noteB1)) {
        evalMode = 'custom equip requirement text';
      } else if (line.match(noteB2)) {
        evalMode = 'none';
      } else if (evalMode === 'custom equip requirement text') {
        obj.customEquipReqText = obj.customEquipReqText + line + '\n';
      } else if (line.match(noteC1)) {
        evalMode = 'custom equip requirement condition';
      } else if (line.match(noteC2)) {
        evalMode = 'none';
      } else if (evalMode === 'custom equip requirement condition') {
        obj.customEquipReqCondition = obj.customEquipReqCondition + line + '\n';
      }
    }
  }
};

DataManager.makeEquipRequirement = function(obj, line) {
  if (line.match(/UNIQUE ONLY/i)) {
    obj.equipRequirements['unique'] = true;
  } else if (line.match(/SWITCH:[ ](\d+)/i)) {
    obj.equipRequirements['switches'].push(parseInt(RegExp.$1));
  } else if (line.match(/CLASS:[ ](\d+)/i)) {
    obj.equipRequirements['classes'].push(parseInt(RegExp.$1));
  } else if (line.match(/CLASS:[ ](.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (Yanfly.ClassIdRef[name]) {
      var id = Yanfly.ClassIdRef[name];
      obj.equipRequirements['classes'].push(id);
    }
  } else if (line.match(/SKILL:[ ](\d+)/i)) {
    obj.equipRequirements['skills'].push(parseInt(RegExp.$1));
  } else if (line.match(/SKILL:[ ](.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (Yanfly.SkillIdRef[name]) {
      var id = Yanfly.SkillIdRef[name];
      obj.equipRequirements['skills'].push(id);
    }
  } else if (line.match(/(.*)[ ]>=[ ](\d+)/i)) {
    var stat = String(RegExp.$1).toUpperCase();
    stat = this.getEquipRequirementStatIndex(stat);
    var value = parseInt(RegExp.$2);
    obj.equipRequirements['atLeast'][stat] = value;
  } else if (line.match(/(.*)[ ]>[ ](\d+)/i)) {
    var stat = String(RegExp.$1).toUpperCase();
    stat = this.getEquipRequirementStatIndex(stat);
    var value = parseInt(RegExp.$2) + 1;
    obj.equipRequirements['atLeast'][stat] = value;
  } else if (line.match(/(.*)[ ]<=[ ](\d+)/i)) {
    var stat = String(RegExp.$1).toUpperCase();
    stat = this.getEquipRequirementStatIndex(stat);
    var value = parseInt(RegExp.$2);
    obj.equipRequirements['atMost'][stat] = value;
  } else if (line.match(/(.*)[ ]<[ ](\d+)/i)) {
    var stat = String(RegExp.$1).toUpperCase();
    stat = this.getEquipRequirementStatIndex(stat);
    var value = parseInt(RegExp.$2) + 1;
    obj.equipRequirements['atMost'][stat] = value;
  } else if (line.match(/(.*)[ ](?:=|==|===)[ ](\d+)/i)) {
    var stat = String(RegExp.$1).toUpperCase();
    stat = this.getEquipRequirementStatIndex(stat);
    var value = parseInt(RegExp.$2);
    obj.equipRequirements['atLeast'][stat] = value;
    obj.equipRequirements['atMost'][stat] = value;
  }
};

DataManager.getEquipRequirementStatIndex = function(stat) {
  stat = stat.trim();
  if (['MAX HP', 'MAXHP', 'HP'].contains(stat)) {
    return 0;
  } else if (['MAX MP', 'MAXMP', 'MP', 'MAX SP', 'MAXSP',
  'SP'].contains(stat)) {
    return 1;
  } else if (['ATK', 'STR'].contains(stat)) {
    return 2;
  } else if (['DEF'].contains(stat)) {
    return 3;
  } else if (['MAT', 'INT', 'SPI'].contains(stat)) {
    return 4;
  } else if (['MDF', 'RES'].contains(stat)) {
    return 5;
  } else if (['AGI', 'SPD'].contains(stat)) {
    return 6;
  } else if (['LUK'].contains(stat)) {
    return 7;
  } else if (['LEVEL', 'LV', 'LVL'].contains(stat)) {
    return 8;
  }
  return null;
};

//=============================================================================
// MainCode
//=============================================================================

Yanfly.EqReq.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    this._equipReq = undefined;
    Yanfly.EqReq.Game_BattlerBase_refresh.call(this);
};

Yanfly.EqReq.Game_BattlerBase_canEquip = Game_BattlerBase.prototype.canEquip;
Game_BattlerBase.prototype.canEquip = function(item) {
    var value = Yanfly.EqReq.Game_BattlerBase_canEquip.call(this, item);
    if (!value) return false;
    if (BattleManager.isBattleTest() && Yanfly.Param.EqReqBTest) return value;
    if (!$gameTemp._optimizing) {
      if (SceneManager._scene instanceof Scene_Equip) return value;
      if (this._equipReq !== undefined) return this._equipReq;
    }
    this._equipReq = this.meetAllEquipRequirements(item)
    return this._equipReq;
};

Game_BattlerBase.prototype.equips = function() {
    return [];
};

Game_BattlerBase.prototype.meetAllEquipRequirements = function(item) {
  if (!item.equipRequirements) {
    if (item.baseItemId) {
      item.equipRequirements = DataManager.getBaseItem(item).equipRequirements;
    } else {
      return true;
    }
  }
  if (!this.meetEquipParamRequirements(item)) return false;
   if (!this.meetEquipClassRequirements(item)) return false;
  if (!this.meetEquipSkillRequirements(item)) return false;
  if (!this.meetEquipSwitchRequirements(item)) return false;
  if (!this.meetEquipUniqueRequirements(item)) return false;
  if (!this.meetEquipEvalRequirements(item)) return false;
  return true;
};

Game_BattlerBase.prototype.meetEquipParamRequirements = function(item) {
  var requirements = item.equipRequirements;
  for (var i = 0; i < 9; ++i) {
    if (i === 8) {
      var param = this.level;
    } else {
      var param = this.paramBase(i) + this.paramPlus(i);
    }
    if (requirements['atLeast'][i] > 0) {
      if (requirements['atLeast'][i] > param) return false;
    }
    if (requirements['atMost'][i] > 0) {
      if (requirements['atMost'][i] < param) return false;
    }
  }
  return true;
};

Game_BattlerBase.prototype.meetEquipClassRequirements = function(item) {
  var requirements = item.equipRequirements;
  var classes = requirements['classes'];
  if (classes.length <= 0) return true;
  if (classes.contains(this.currentClass().id)) return true;
  return false;
};

Game_BattlerBase.prototype.meetEquipSkillRequirements = function(item) {
  var requirements = item.equipRequirements;
  var skills = requirements['skills'];
  var length = skills.length;
  if (length <= 0) return true;
  for (var i = 0; i < length; ++i) {
    var skillId = skills[i];
    if (!this.isLearnedSkill(skillId)) return false;
  }
  return true;
};

Game_BattlerBase.prototype.meetEquipSwitchRequirements = function(item) {
  var requirements = item.equipRequirements;
  var switches = requirements['switches'];
  var length = switches.length;
  for (var i = 0; i < length; ++i) {
    var sw = switches[i];
    if (!$gameSwitches.value(sw)) return false;
  }
  return true;
};

Game_BattlerBase.prototype.meetEquipUniqueRequirements = function(item) {
  if (this.equips().contains(item)) return true;
  var requirements = item.equipRequirements;
  if (!requirements['unique']) return true;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    if (!obj) continue;
    if (obj.id === item.id) return false;
    if (obj.baseItemId && item.baseItemId) {
      if (obj.baseItemId === item.baseItemId) return false;
    }
  }
  return true;
};

Game_BattlerBase.prototype.meetEquipEvalRequirements = function(item) {
  if (item.customEquipReqCondition === '') return true;
  var condition = true;
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  eval(item.customEquipReqCondition);
  return condition;
};

//=============================================================================
// Window_EquipSlot
//=============================================================================

Window_EquipSlot.prototype.setRequirementWindow = function(target) {
    this._requirementWindow = target;
    this.update();
};

Yanfly.EqReq.Window_EqSlot_updateHelp = Window_EquipSlot.prototype.updateHelp;
Window_EquipSlot.prototype.updateHelp = function() {
    Yanfly.EqReq.Window_EqSlot_updateHelp.call(this);
    if (SceneManager._scene instanceof Scene_Equip && this._requirementWindow) {
      this._requirementWindow.setItem(this.item());
    }
};

//=============================================================================
// Window_EquipItem
//=============================================================================

Yanfly.EqReq.Window_EquipItem_isEnabled = Window_EquipItem.prototype.isEnabled;
Window_EquipItem.prototype.isEnabled = function(item) {
    if (item !== null && this._actor) {
      if (!this._actor.meetAllEquipRequirements(item)) return false;
    }
    return Yanfly.EqReq.Window_EquipItem_isEnabled.call(this, item);
};

Window_EquipItem.prototype.setRequirementWindow = function(target) {
    this._requirementWindow = target;
    this.update();
};

Yanfly.EqReq.Window_EqItem_updateHelp = Window_EquipItem.prototype.updateHelp;
Window_EquipItem.prototype.updateHelp = function() {
    Yanfly.EqReq.Window_EqItem_updateHelp.call(this);
    if (SceneManager._scene instanceof Scene_Equip && this._requirementWindow) {
      this._requirementWindow.setItem(this.item());
    }
};

//=============================================================================
// Window_EquipRequirement
//=============================================================================

function Window_EquipRequirement() {
    this.initialize.apply(this, arguments);
}

Window_EquipRequirement.prototype = Object.create(Window_Base.prototype);
Window_EquipRequirement.prototype.constructor = Window_EquipRequirement;

Window_EquipRequirement.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this._actor = null;
    this._item = null;
    this.refresh();
};

Window_EquipRequirement.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
    this.refresh();
};

Window_EquipRequirement.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
};

Window_EquipRequirement.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    rect.width = this.contents.width;
    rect.height = this.lineHeight();
    rect.x = 0;
    rect.y = index * rect.height;
    return rect;
};

Window_EquipRequirement.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_EquipRequirement.prototype.refresh = function() {
    this.contents.clear();
    this.checkActor();
    if (!this._actor) return;
    var length = Math.ceil(this.contents.height / this.lineHeight());
    for (var i = 0; i < length; ++i) {
      this.drawItem(i);
    }
    if (!this._item) return;
    var dy = this.drawRequirementTitle();
    if (this.drawRequirements(dy) === dy) this.drawNoRequirements(dy);
};

Window_EquipRequirement.prototype.checkActor = function() {
    if (this._actor) return;
    this.setActor(SceneManager._scene._actor);
};

Window_EquipRequirement.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
};

Window_EquipRequirement.prototype.drawRequirementTitle = function() {
    this.resetFontSettings();
    this.changeTextColor(this.systemColor());
    var ww = this.contents.width;
    this.drawText(Yanfly.Param.EqReqTitle, 0, 0, ww, 'center');
    return this.lineHeight();
};

Window_EquipRequirement.prototype.getRequirements = function() {
    var requirements = this._item.equipRequirements;
    if (!requirements) {
      if (this._item.baseItemId) {
        this._item.equipRequirements = 
          DataManager.getBaseItem(this._item).equipRequirements;
        requirements = this._item.equipRequirements;
      }
    }
    return requirements;
};

Window_EquipRequirement.prototype.drawRequirements = function(dy) {
    if (!this.getRequirements()) return dy;
    if (Yanfly.Param.EqReqClasses) dy = this.drawClassRequirements(dy);
    dy = this.drawLevelRequirements(dy);
    dy = this.drawParamRequirements(dy);
    if (Yanfly.Param.EqReqSkills) dy = this.drawSkillRequirements(dy);
    if (Yanfly.Param.EqReqSwitches) dy = this.drawSwitchRequirements(dy);
    dy = this.drawCustomText(dy);
    return dy;
};

Window_EquipRequirement.prototype.drawClassRequirements = function(dy) {
    if (this._item.equipRequirements['classes'].length <= 0) return dy;
    var style = Yanfly.Param.EqReqClassStyle;
    var classes = this._item.equipRequirements['classes'];
    var classTx = Yanfly.Param.EqReqClassText;
    var currentClassId = this._actor.currentClass().id;
    var length = classes.length;
    var ww = this.contents.width - this.textPadding();
    this.resetFontSettings();
    this.changePaintOpacity(true);
    this.changeTextColor(this.systemColor());
    this.drawText(classTx, this.textPadding(), dy, ww);
    var dx = this.textWidth(classTx) + this.textPadding();
    ww -= dx;
    if (style === 1 && Imported.YEP_ClassChangeCore) {
      for (var i = 0; i < length; ++i) {
        if (dx + Window_Base._iconHeight > this.contents.width) {
          dy += this.lineHeight();
          dx = this.textWidth(classTx) + this.textPadding();
        }
        var classId = classes[i];
        this.changePaintOpacity(classId === currentClassId);
        var iconIndex = $dataClasses[classId].iconIndex;
        this.drawIcon(iconIndex, dx, dy + 2);
        dx += Window_Base._iconHeight;
      }
      dy += this.lineHeight();
    } else if (style === 2 && Imported.YEP_ClassChangeCore) {
      for (var i = 0; i < length; ++i) {
        var classId = classes[i];
        this.changePaintOpacity(classId === currentClassId);
        var item = $dataClasses[classId];
        this.drawItemName(item, dx, dy, ww);
        dy += this.lineHeight();
      }
    } else {
      this.changeTextColor(this.normalColor());
      for (var i = 0; i < length; ++i) {
        var classId = classes[i];
        this.changePaintOpacity(classId === currentClassId);
        var name = $dataClasses[classId].name;
        this.drawText(name, dx, dy, ww);
        dy += this.lineHeight();
      }
    }
    return dy;
};

Window_EquipRequirement.prototype.drawLevelRequirements = function(dy) {
    this.resetFontSettings();
    this.changePaintOpacity(true);
    var wx = this.textPadding();
    if (this._item.equipRequirements['atLeast'][8] > 0) {
      var fmt = Yanfly.Param.EqReqAtLeast;
      var value1 = this._item.equipRequirements['atLeast'][8];
      if (this._actor.level >= value1) {
        var value2 = '\\c[' + Yanfly.Param.EqReqPosColor + ']';
      } else {
        var value2 = '\\c[' + Yanfly.Param.EqReqNegColor + ']';
      }
      value2 += Yanfly.Util.toGroup(this._actor.level) + '\\c[0]';
      value1 = Yanfly.Util.toGroup(value1);
      var text = fmt.format(TextManager.level, value1, value2);
      this.drawTextEx(text, wx, dy);
      dy += this.lineHeight();
    }
    if (this._item.equipRequirements['atMost'][8] > 0) {
      var fmt = Yanfly.Param.EqReqAtMost;
      var value1 = this._item.equipRequirements['atMost'][8];
      if (this._actor.level <= value1) {
        var value2 = '\\c[' + Yanfly.Param.EqReqPosColor + ']';
      } else {
        var value2 = '\\c[' + Yanfly.Param.EqReqNegColor + ']';
      }
      value2 += Yanfly.Util.toGroup(this._actor.level) + '\\c[0]';
      value1 = Yanfly.Util.toGroup(value1);
      var text = fmt.format(TextManager.level, value1, value2);
      this.drawTextEx(text, wx, dy);
      dy += this.lineHeight();
    }
    return dy;
};

Window_EquipRequirement.prototype.drawParamRequirements = function(dy) {
    this.resetFontSettings();
    this.changePaintOpacity(true);
    var wx = this.textPadding();
    for (var i = 0; i < 8; ++i) {
      if (this._item.equipRequirements['atLeast'][i] > 0) {
        var fmt = Yanfly.Param.EqReqAtLeast;
        var value1 = this._item.equipRequirements['atLeast'][i];
        var valueA = this._actor.paramBase(i) + this._actor.paramPlus(i);
        if (valueA >= value1) {
          var value2 = '\\c[' + Yanfly.Param.EqReqPosColor + ']';
        } else {
          var value2 = '\\c[' + Yanfly.Param.EqReqNegColor + ']';
        }
        value2 += Yanfly.Util.toGroup(valueA) + '\\c[0]';
        value1 = Yanfly.Util.toGroup(value1);
        var text = fmt.format(TextManager.param(i), value1, value2);
        this.drawTextEx(text, wx, dy);
        dy += this.lineHeight();
      }
      if (this._item.equipRequirements['atMost'][i] > 0) {
        var fmt = Yanfly.Param.EqReqAtMost;
        var value1 = this._item.equipRequirements['atMost'][i];
        if (valueA <= value1) {
          var value2 = '\\c[' + Yanfly.Param.EqReqPosColor + ']';
        } else {
          var value2 = '\\c[' + Yanfly.Param.EqReqNegColor + ']';
        }
        value2 += Yanfly.Util.toGroup(valueA) + '\\c[0]';
        value1 = Yanfly.Util.toGroup(value1);
        var text = fmt.format(TextManager.param(i), value1, value2);
        this.drawTextEx(text, wx, dy);
        dy += this.lineHeight();
      }
    }
    return dy;
};

Window_EquipRequirement.prototype.drawSkillRequirements = function(dy) {
    if (this._item.equipRequirements['skills'].length <= 0) return dy;
    var style = Yanfly.Param.EqReqSkillStyle;
    var skills = this._item.equipRequirements['skills'];
    var skillTx = Yanfly.Param.EqReqSkillText;
    var length = skills.length;
    var ww = this.contents.width - this.textPadding();
    this.resetFontSettings();
    this.changePaintOpacity(true);
    this.changeTextColor(this.systemColor());
    this.drawText(skillTx, this.textPadding(), dy, ww);
    var dx = this.textWidth(skillTx) + this.textPadding();
    ww -= dx;
    if (style === 1) {
      for (var i = 0; i < length; ++i) {
        if (dx + Window_Base._iconHeight > this.contents.width) {
          dy += this.lineHeight();
          dx = this.textWidth(skillTx) + this.textPadding();
        }
        var skillId = skills[i];
        this.changePaintOpacity(this._actor.isLearnedSkill(skillId));
        var iconIndex = $dataSkills[skillId].iconIndex;
        this.drawIcon(iconIndex, dx, dy + 2);
        dx += Window_Base._iconHeight;
      }
      dy += this.lineHeight();
    } else if (style === 2) {
      for (var i = 0; i < length; ++i) {
        var skillId = skills[i];
        this.changePaintOpacity(this._actor.isLearnedSkill(skillId));
        var item = $dataSkills[skillId];
        this.drawItemName(item, dx, dy, ww);
        dy += this.lineHeight();
      }
    } else {
      this.changeTextColor(this.normalColor());
      for (var i = 0; i < length; ++i) {
        var skillId = skills[i];
        this.changePaintOpacity(this._actor.isLearnedSkill(skillId));
        var name = $dataSkills[skillId].name;
        this.drawText(name, dx, dy, ww);
        dy += this.lineHeight();
      }
    }
    return dy;
};

Window_EquipRequirement.prototype.drawSwitchRequirements = function(dy) {
    this.resetFontSettings();
    this.changePaintOpacity(true);
    var switches = this._item.equipRequirements['switches'];
    var length = switches.length;
    for (var i = 0; i < length; ++i) {
      var sw = switches[i];
      var name = $dataSystem.switches[sw];
      name = name.replace(/<<(.*?)>>/i, '');
      this.changePaintOpacity($gameSwitches.value(sw));
      this.drawTextEx(name, this.textPadding(), dy);
      dy += this.lineHeight();
    }
    this.changePaintOpacity(true)
    return dy;
};

Window_EquipRequirement.prototype.drawCustomText = function(dy) {
    if (this._item.customEquipReqText === '') return dy;
    this.resetFontSettings();
    this.changePaintOpacity(true);
    var text = '';
    var a = this._actor;
    var user = this._actor;
    var subject = this._actor;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(this._item.customEquipReqText);
    this.drawTextEx(text, this.textPadding(), dy);
    return dy + this.lineHeight();
};

Window_EquipRequirement.prototype.drawNoRequirements = function(dy) {
    this.resetFontSettings();
    this.changePaintOpacity(true);
    this.changeTextColor(this.normalColor());
    var ww = this.contents.width;
    dy += this.lineHeight();
    this.drawText(Yanfly.Param.EqReqNone, 0, dy, ww, 'center');
    return dy;
};

//=============================================================================
// Scene_Equip
//=============================================================================

Yanfly.EqReq.Scene_Equip_createCompareWindow =
    Scene_Equip.prototype.createCompareWindow;
Scene_Equip.prototype.createCompareWindow = function() {
    Yanfly.EqReq.Scene_Equip_createCompareWindow.call(this);
    if (Yanfly.Param.EqReqWindow) this.createRequirementWindow();
};

Yanfly.EqReq.Scene_Equip_refreshActor =
    Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function() {
    Yanfly.EqReq.Scene_Equip_refreshActor.call(this);
    if (this._requirementWindow) this._requirementWindow.setActor(this.actor());
};

Yanfly.EqReq.Scene_Equip_commandOptimize =
    Scene_Equip.prototype.commandOptimize;
Scene_Equip.prototype.commandOptimize = function() {
    $gameTemp._optimizing = true;
    Yanfly.EqReq.Scene_Equip_commandOptimize.call(this);
    $gameTemp._optimizing = false;
    if (this._requirementWindow) this._requirementWindow.refresh();
};

Yanfly.EqReq.Scene_Equip_commandClear = Scene_Equip.prototype.commandClear;
Scene_Equip.prototype.commandClear = function() {
    Yanfly.EqReq.Scene_Equip_commandClear.call(this);
    if (this._requirementWindow) this._requirementWindow.refresh();
};

Scene_Equip.prototype.createRequirementWindow = function() {
    var wx = this._itemWindow.width;
    var wy = this._itemWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._itemWindow.height;
    this._requirementWindow = new Window_EquipRequirement(wx, wy, ww, wh);
    this._slotWindow.setRequirementWindow(this._requirementWindow);
    this._itemWindow.setRequirementWindow(this._requirementWindow);
    this.addWindow(this._requirementWindow);
    this._lowerRightWindows.push(this._requirementWindow);
};

Yanfly.EqReq.Scene_Equip_onSlotCancel = Scene_Equip.prototype.onSlotCancel;
Scene_Equip.prototype.onSlotCancel = function() {
    Yanfly.EqReq.Scene_Equip_onSlotCancel.call(this);
    if (this._requirementWindow) this._requirementWindow.setItem(null);
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

//=============================================================================
// End of File
//=============================================================================
};