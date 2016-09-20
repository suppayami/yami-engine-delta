//=============================================================================
// Yanfly Engine Plugins - Skill Learn
// YEP_SkillLearnSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SkillLearnSystem = true;

var Yanfly = Yanfly || {};
Yanfly.SLS = Yanfly.SLS || {};

//=============================================================================
 /*:
 * @plugindesc v1.11 Allows actors to learn skills from the skill menu
 * through crafting them via items or otherwise.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Learn Command
 * @desc How the command for learning skills appear in the skill
 * command window.
 * @default Learn Skills
 *
 * @param Show Command
 * @desc Show the Learn command in the main menu by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Command
 * @desc Enable the Learn command in the main menu by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Integrate
 * @desc Integrate Learn Skills into the Skill scene?
 * NO - false     YES - true
 * @default false
 *
 * @param ---Confirm Learn---
 * @default
 *
 * @param Confirm Window
 * @desc For non-integrated menu, show a learn confirmation?
 * NO - false     YES - true
 * @default true
 *
 * @param Confirm Text
 * @desc If using the confirm window, this is the text used.
 * %1 - Actor     %2 - Skill Name
 * @default Have %1 learn %2?
 *
 * @param Confirm Yes
 * @desc Text used to display yes.
 * @default Yes
 *
 * @param Confirm No
 * @desc Text used to display no.
 * @default No
 *
 * @param ---Skill Learn---
 * @default
 *
 * @param Learned Text
 * @desc Text showing the skill has been learned.
 * @default Learned
 *
 * @param Learned Size
 * @desc Font size for the text showing the skill has been learned.
 * Default: 28
 * @default 20
 *
 * @param Learn Cost
 * @desc Text used to list what are the learn costs for the skill.
 * @default Learn Skill Cost
 *
 * @param Cost Size
 * @desc Font size used for the cost of learning a skill.
 * Default: 28
 * @default 20
 *
 * @param Show Gold Window
 * @desc Shows the gold window when learning a new skill.
 * NO - false     YES - true
 * @default true
 *
 * @param ---Default---
 * @default
 *
 * @param Default Gold Cost
 * @desc Default gold cost of learning new skills.
 * @default 1000
 *
 * @param Default JP Cost
 * @desc Default JP cost of learning new skills.
 * Requires YEP_JobPoints.js
 * @default 100
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables your game's actors to learn skills from the skill menu.
 * This can be done via either gold, items, or Job Points. It provides the
 * player an alternate way of acquiring skills aside from leveling up.
 *
 * This plugin can be used with YEP_JobPoints.js.
 *
 * It is recommended to place this plugin under the YEP_JobPoints.js plugin
 * in the Plugin Manager.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Use the following notetags to make use of the Skill Learn System.
 *
 * Class Notetag:
 *   <Learn Skill: x>
 *   <Learn Skill: x, x, x>
 *   <Learn Skill: x to y>
 *   Enables the class to be able to learn skill(s) x from the menu. Replace
 *   x with the skill's ID. If x to y is used, this enables the class to learn
 *   all the skills from x to y. Replace x and y with skill ID's.
 *
 * Skill Notetags:
 *   <Learn Cost: x Gold>
 *   Sets the gold cost of learning this skill to x gold.
 *
 *   <Learn Cost: x JP>
 *   Sets the JP cost of learning this skill to x JP. This note requires
 *   YEP_JobPoints.js in order to work.
 *
 *   <Learn Cost>        or     <Learn Cost>
 *    Item x: y                  item name: y
 *    Weapon x: y                item name: y
 *    Armor x: y                </Learn Cost>
 *   </Learn Cost>
 *   Allows you to set the item, weapon, and armor costs of learning the skill.
 *   Replace x with the item's ID and y with the quantity of that item needed.
 *   If you decide to use the item name variant, replace the item name with the
 *   item's name as it appears in the database. If multiple items share the
 *   same name, the item with the highest ID will be used in the order of item,
 *   weapon, and then armor.
 *   *Note: If you are using YEP_ItemCore.js and Independent Items, the learn
 *   costs will not include independent items.
 *
 *   <Learn Require Level: x>
 *   Causes the skill to require the actor's current level to be at least x
 *   before the skill even appears on the list to learn.
 *
 *   <Learn Require Skill: x>
 *   <Learn Require Skill: x, x, x>
 *   <Learn Require Skill: x to y>
 *   In order for the skill to appear, the actor must know the other skill(s)
 *   of x. If x to y is used, the actor must know all the skills from x to y.
 *   Replace x and/or y with skill ID's.
 *
 *   <Learn Require Switch: x>
 *   <Learn Require Switch: x, x, x>
 *   <Learn Require Switch: x to y>
 *   In order for the skill to appear, the switch(es) x must be on. If x to y
 *   is used, all of the switches from x to y must be on in order for the skill
 *   to appear. Replace x and/or y with switch ID's.
 *
 * ============================================================================
 * Lunatic Mode - Custom Requirements and Costs
 * ============================================================================
 *
 * For those who understand a bit of JavaScript and wish to go further with
 * customizing the process for the skill learning process, you can use the
 * following notetags:
 *
 * Skill Notetags:
 *
 *   <Learn Show Eval>
 *    value = true;
 *    value = false;
 *   </Learn Show Eval>
 *   For using a custom code to hide or show the skill, you can use these
 *   notetags. Returning value as true will cause the skill to appear
 *   regardless of all other requirements being unmet while returning value as
 *   false will cause the skill to appear regardless of all other requirements
 *   being met.
 *
 *   <Learn Require Eval>
 *    value = true;
 *    value = false;
 *   </Learn Require Eval>
 *   For those who wish to use their own custom requirements using code. This
 *   must return value as true in order for the skill to appear to be
 *   learnable. Avoid using comments that may potentially block out further
 *   code.
 *
 *   <Learn Cost Eval>
 *    code
 *    code
 *   </Learn Cost Eval>
 *   For those who know JavaScript, you can have custom actions be performed
 *   after learning the skill through the learn skill menu.
 *
 *   <Learn Custom Text>
 *    text
 *    text
 *   </Learn Custom Text>
 *   This will be the custom text shown underneath all the main costs. You can
 *   use text codes for this.
 *
 * ============================================================================
 * Lunatic Mode - Custom JP Costs
 * ============================================================================
 *
 * For those who have basic JavaScript knowledge and would like to make the JP
 * costs for skills dynamic, you can use the following notetags:
 *
 * Skill Notetags:
 *
 *   <Custom Learn JP Cost>
 *    cost = user.level * 100;
 *   </Custom Learn JP Cost>
 *   The 'cost' variable is the value that will be returned as a result of this
 *   Lunatic Mode notetag. The value returned here from this code will be added
 *   on top of the <Learn Cost: x JP> value.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * You can use the following Plugin Commands from the Event Editor to alter
 * whether or not you want the 'Learn Skill' command to appear in the skill
 * scene or to have it enabled.
 *
 * Plugin Command:
 *   ShowLearnSkill            Shows the 'Learn Skill' command.
 *   HideLearnSkill            Hides the 'Learn Skill' command.
 *   EnableLearnSkill          Enables the 'Learn Skill' command.
 *   DisableLearnSkill         Disables the 'Learn Skill' command.
 *   OpenLearnSkill actor x    Opens Learn Skill menu for actor x.
 *   OpenLearnSkill party x    Opens Learn Skill menu for party member x.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.11:
 * - Removed dependency on YEP_JobPoints.js if using Integrated skill learn.
 *
 * Version 1.10:
 * - Added <Custom Learn JP Cost> Lunatic Mode notetag. Look in the plugin's
 * helpfile for more details!
 *
 * Version 1.09:
 * - Compatibility update with Class Change Core's <Use Nickname> notetag.
 *
 * Version 1.08:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.07:
 * - Updated the <Learn Require Level: x> notetag. If you are using the Class
 * Change Core, the requirement will now depend on the level of the class.
 *
 * Version 1.06b:
 * - Added 'Confirm Window', 'Confirm Text', 'Confirm Yes', 'Confirm No' to the
 * plugin's parameters. This confirm window only appears for non-integrated
 * menus as the integrated menus have a class confirmation window already.
 * - Confirm Text now supports text codes.
 * - Fixed a visual bug when learning skills.
 *
 * Version 1.05:
 * - Fixed a bug with the 'OpenLearnSkill party x' plugin command not opening
 * the correct party member.
 *
 * Version 1.04:
 * - Fixed a bug that would duplicate non-independent items.
 * - Fixed a bug with class portraits not updating properly.
 *
 * Version 1.03a:
 * - Fixed a bug where JP values weren't updated upon learning.
 * - Fixed a bug where the help description didn't update if a skill vanished.
 *
 * Version 1.02:
 * - Reversed the display for item requirements so it is now Held/Needed.
 * - Preparations for compatibility for Class Change Core.
 *
 * Version 1.01:
 * - Added an actor refresh to learn and forget skills.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SkillLearnSystem');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SLSCommand = String(Yanfly.Parameters['Learn Command']);
Yanfly.Param.SLSShowLearn = String(Yanfly.Parameters['Show Command']);
Yanfly.Param.SLSEnableLearn = String(Yanfly.Parameters['Enable Command']);
Yanfly.Param.SLSIntegrate = String(Yanfly.Parameters['Integrate']);

Yanfly.Param.SLSConfirmWin = eval(String(Yanfly.Parameters['Confirm Window']));
Yanfly.Param.SLSConfirmText = String(Yanfly.Parameters['Confirm Text']);
Yanfly.Param.SLSConfirmYes = String(Yanfly.Parameters['Confirm Yes']);
Yanfly.Param.SLSConfirmNo = String(Yanfly.Parameters['Confirm No']);

Yanfly.Param.SLSLearnText = String(Yanfly.Parameters['Learned Text']);
Yanfly.Param.SLSLearnSize = Number(Yanfly.Parameters['Learned Size']);
Yanfly.Param.SLSLearnCost = String(Yanfly.Parameters['Learn Cost']);
Yanfly.Param.SLSCostSize = Number(Yanfly.Parameters['Cost Size']);
Yanfly.Param.SLSItemCostFmt = String(Yanfly.Parameters['Item Cost']);
Yanfly.Param.SLSGoldWindow = String(Yanfly.Parameters['Show Gold Window']);

Yanfly.Param.SLSDefaultGold = Number(Yanfly.Parameters['Default Gold Cost']);
Yanfly.Param.SLSDefaultJp = Number(Yanfly.Parameters['Default JP Cost']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.SLS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.SLS.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_SkillLearnSystem) {
    this.processSLSNotetagsI($dataItems);
    this.processSLSNotetagsW($dataWeapons);
    this.processSLSNotetagsA($dataArmors);
    this.processSLSNotetags1($dataClasses);
    this.processSLSNotetags2($dataSkills);
    Yanfly._loaded_YEP_SkillLearnSystem = true;
  }
  return true;
};

DataManager.processSLSNotetagsI = function(group) {
  if (Yanfly.ItemIdRef) return;
  Yanfly.ItemIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ItemIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processSLSNotetagsW = function(group) {
  if (Yanfly.WeaponIdRef) return;
  Yanfly.WeaponIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.WeaponIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processSLSNotetagsA = function(group) {
  if (Yanfly.ArmorIdRef) return;
  Yanfly.ArmorIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ArmorIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processSLSNotetags1 = function(group) {
  var note1 = /<(?:LEARN SKILL|learn skills):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 =
    /<(?:LEARN SKILL|learn skills):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.learnSkills = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.learnSkills = obj.learnSkills.concat(array);
      } else if (line.match(note2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.learnSkills = obj.learnSkills.concat(range);
      }
    }
  }
};

DataManager.processSLSNotetags2 = function(group) {
  var note1 = /<(?:LEARN COST)>/i;
  var note2 = /<\/(?:LEARN COST)>/i;
  var note3 = /<(?:LEARN COST):[ ](\d+)[ ](?:GOLD)>/i;
  var note4 = /<(?:LEARN COST):[ ](\d+)[ ](?:JP)>/i;
  var note5 = /<(?:LEARN REQUIRE LEVEL):[ ](\d+)>/i;
  var note6 = /<(?:LEARN REQUIRE SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note7 = /<(?:LEARN REQUIRE SKILL):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note8 = /<(?:LEARN REQUIRE SWITCH):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note9 = /<(?:LEARN REQUIRE SWITCH):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note10 = /<(?:LEARN REQUIRE EVAL)>/i;
  var note11 = /<\/(?:LEARN REQUIRE EVAL)>/i;
  var note12 = /<(?:LEARN COST EVAL)>/i;
  var note13 = /<\/(?:LEARN COST EVAL)>/i;
  var note14 = /<(?:LEARN CUSTOM TEXT)>/i;
  var note15 = /<\/(?:LEARN CUSTOM TEXT)>/i;
  var note16 = /<(?:LEARN SHOW EVAL)>/i;
  var note17 = /<\/(?:LEARN SHOW EVAL)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.learnCost = [];
    obj.learnCostGold = Yanfly.Param.SLSDefaultGold;
    obj.learnCostJp = Yanfly.Param.SLSDefaultJp;
    obj.learnRequireLevel = 0;
    obj.learnRequireSkill = [];
    obj.learnRequireSwitch = [];
    obj.learnRequireEval = '';
    obj.learnCostEval = '';
    obj.learnShowEval = '';
    obj.learnCustomText = '';
    var mode = 'none';
    obj.customLearnJpCostEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        mode = 'learn';
      } else if (line.match(note2)) {
        mode = 'none';
      } else if (mode === 'learn') {
        this.addLearnSkillCost(obj, line);
      } else if (line.match(note3)) {
        obj.learnCostGold = parseInt(RegExp.$1);
      } else if (line.match(note4)) {
        obj.learnCostJp = parseInt(RegExp.$1);
      } else if (line.match(note5)) {
        obj.learnRequireLevel = parseInt(RegExp.$1);
      } else if (line.match(note6)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.learnRequireSkill = obj.learnRequireSkill.concat(array);
      } else if (line.match(note7)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.learnRequireSkill = obj.learnRequireSkill.concat(range);
      } else if (line.match(note8)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.learnRequireSwitch = obj.learnRequireSwitch.concat(array);
      } else if (line.match(note9)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.learnRequireSwitch = obj.learnRequireSwitch.concat(range);
      } else if (line.match(note10)) {
        mode = 'learnRequireEval';
      } else if (line.match(note11)) {
        mode = 'none';
      } else if (line.match(note12)) {
        mode = 'learnCostEval';
      } else if (line.match(note13)) {
        mode = 'none';
      } else if (line.match(note14)) {
        mode = 'learnCustomText';
      } else if (line.match(note15)) {
        mode = 'none';
      } else if (line.match(note16)) {
        mode = 'learnShowEval';
      } else if (line.match(note17)) {
        mode = 'none';
      } else if (mode === 'learnRequireEval') {
        obj.learnRequireEval = obj.learnRequireEval + line + '\n';
      } else if (mode === 'learnCostEval') {
        obj.learnCostEval = obj.learnCostEval + line + '\n';
      } else if (mode === 'learnCustomText') {
        obj.learnCustomText = obj.learnCustomText + line + '\n';
      } else if (mode === 'learnShowEval') {
        obj.learnShowEval = obj.learnShowEval + line + '\n';
      } else if (line.match(/<(?:CUSTOM LEARN JP COST)>/i)) {
        mode = 'customLearnJpCost';
      } else if (line.match(/<\/(?:CUSTOM LEARN JP COST)>/i)) {
        mode = 'none';
      } else if (mode === 'customLearnJpCost') {
        obj.customLearnJpCostEval = obj.customLearnJpCostEval + line + '\n';
      }
    }
  }
};

DataManager.addLearnSkillCost = function(obj, line) {
    if (!obj) return;
    if (!line) return;
    if (line.match(/ITEM[ ](\d+):[ ](\d+)/i)) {
      var item = $dataItems[parseInt(RegExp.$1)];
      if (!item) return;
      if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) return;
      obj.learnCost.push(line);
    } else if (line.match(/WEAPON[ ](\d+):[ ](\d+)/i)) {
      var item = $dataWeapons[parseInt(RegExp.$1)];
      if (!item) return;
      if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) return;
      obj.learnCost.push(line);
    } else if (line.match(/ARMOR[ ](\d+):[ ](\d+)/i)) {
      var item = $dataArmors[parseInt(RegExp.$1)];
      if (!item) return;
      if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) return;
      obj.learnCost.push(line);
    } else if (line.match(/GOLD:[ ](\d+)/i)) {
      obj.learnCostGold = parseInt(RegExp.$1);
    } else if (line.match(/JP:[ ](\d+)/i)) {
      obj.learnCostJp = parseInt(RegExp.$1);
    } else if (line.match(/(.*):[ ](\d+)/i)) {
      var name = String(RegExp.$1).toUpperCase();
      var amount = parseInt(RegExp.$2);
      if (Yanfly.ItemIdRef[name]) {
        var id = Yanfly.ItemIdRef[name];
        var item = $dataItems[id];
        if (!item) return;
        if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) return;
        obj.learnCost.push('ITEM ' + id + ': ' + amount);
      } else if (Yanfly.WeaponIdRef[name]) {
        var id = Yanfly.WeaponIdRef[name];
        var item = $dataWeapons[id];
        if (!item) return;
        if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) return;
        obj.learnCost.push('WEAPON ' + id + ': ' + amount);
      } else if (Yanfly.ArmorIdRef[name]) {
        var id = Yanfly.ArmorIdRef[name];
        var item = $dataArmors[id];
        if (!item) return;
        if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) return;
        obj.learnCost.push('ARMOR ' + id + ': ' + amount);
      }
    }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.SLS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.SLS.Game_System_initialize.call(this);
    this.initSkillLearnSystem();
};

Game_System.prototype.initSkillLearnSystem = function() {
    this._showLearnSkill = eval(Yanfly.Param.SLSShowLearn);
    this._enableLearnSkill = eval(Yanfly.Param.SLSEnableLearn);
};

Game_System.prototype.isShowLearnSkill = function() {
    if (this._showLearnSkill === undefined) this.initSkillLearnSystem();
    return this._showLearnSkill;
};

Game_System.prototype.isEnableLearnSkill = function() {
    if (this._enableLearnSkill === undefined) this.initSkillLearnSystem();
    return this._enableLearnSkill;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.availableClasses = function() {
    if (!Imported.YEP_ClassChangeCore) return 1;
    return this.unlockedClasses().length;
};

Game_Actor.prototype.sufficientJpLearnSkill = function(skill, classId) {
  if (!skill) return false;
  if (!Imported.YEP_JobPoints) return true;
  var jpCost = skill.learnCostJp;
  jpCost += this.customLearnSkillJpCost(skill);
  if (this.currentClass().learnSkills.contains(skill.id)) {
    if (this.jp(classId) >= jpCost) return true;
  }
  if (Imported.YEP_ClassChangeCore && eval(Yanfly.Param.SLSIntegrate)) {
    for (var i = 0; i < this.unlockedClasses().length; ++i) {
      classId = this.unlockedClasses()[i];
      if (!$dataClasses[classId]) continue;
      if (!$dataClasses[classId].learnSkills.contains(skill.id)) continue;
      if (this.jp(classId) >= jpCost) return true;
    }
  } else if (Imported.YEP_ClassChangeCore && $dataClasses[classId]) {
    if ($dataClasses[classId].learnSkills.contains(skill.id)) {
      if (this.jp(classId) >= jpCost) return true;
    }
  }
  return false;
};

Game_Actor.prototype.canLearnSkill = function(skill, classId) {
    if (!skill) return false;
    if (skill.learnCostGold > $gameParty.gold()) return false;
    if (!this.sufficientJpLearnSkill(skill, classId)) return false;
    if (!$gameParty.sufficientItemLearnSkill(skill)) return false;
    return true;
};

Yanfly.SLS.Game_Actor_releaseUnequippableItems =
    Game_Actor.prototype.releaseUnequippableItems;
Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
    if (Yanfly.SLS.PreventReleaseItem) return;
    Yanfly.SLS.Game_Actor_releaseUnequippableItems.call(this, forcing);
};

Game_Actor.prototype.customLearnSkillJpCost = function(skill) {
    if (!skill) return 0;
    if (skill.customLearnJpCostEval === '') return 0;
    var cost = 0;
    var item = skill;
    var a = this;
    var b = this;
    var user = this;
    var target = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.customLearnJpCostEval);
    return cost;
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.sufficientItemLearnSkill = function(skill) {
    if (!skill) return false;
    for (var i = 0; i < skill.learnCost.length; ++i) {
      var line = skill.learnCost[i];
      var obj = null;
      var value = 0;
      if (line.match(/ITEM[ ](\d+):[ ](\d+)/i)) {
        obj = $dataItems[parseInt(RegExp.$1)];
        value = parseInt(RegExp.$2);
      } else if (line.match(/WEAPON[ ](\d+):[ ](\d+)/i)) {
        obj = $dataWeapons[parseInt(RegExp.$1)];
        value = parseInt(RegExp.$2);
      } else if (line.match(/ARMOR[ ](\d+):[ ](\d+)/i)) {
        obj = $dataArmors[parseInt(RegExp.$1)];
        value = parseInt(RegExp.$2);
      }
      if (!obj) continue;
      if (value > $gameParty.numItems(obj)) return false;
    }
    return true;
};

Game_Party.prototype.processLearnSkillCost = function(skill) {
    if (!skill) return false;
    for (var i = 0; i < skill.learnCost.length; ++i) {
      var line = skill.learnCost[i];
      var obj = null;
      var value = 0;
      if (line.match(/ITEM[ ](\d+):[ ](\d+)/i)) {
        obj = $dataItems[parseInt(RegExp.$1)];
        value = parseInt(RegExp.$2);
      } else if (line.match(/WEAPON[ ](\d+):[ ](\d+)/i)) {
        obj = $dataWeapons[parseInt(RegExp.$1)];
        value = parseInt(RegExp.$2);
      } else if (line.match(/ARMOR[ ](\d+):[ ](\d+)/i)) {
        obj = $dataArmors[parseInt(RegExp.$1)];
        value = parseInt(RegExp.$2);
      }
      if (!obj) continue;
      $gameParty.loseItem(obj, value, false);
    }
    return true;
};

Yanfly.SLS.Game_Party_setupBattleTest = Game_Party.prototype.setupBattleTest;
Game_Party.prototype.setupBattleTest = function() {
    Yanfly.SLS.Game_Party_setupBattleTest.call(this);
    this.setupLearnSkillBattleTest();
};

Game_Party.prototype.setupLearnSkillBattleTest = function() {
    for (var i = 0; i < this.members().length; ++i) {
      var actor = this.members()[i];
      if (!actor) continue;
      var classData = actor.currentClass();
      for (var j = 0; j < classData.learnSkills.length; ++j) {
        var skillId = classData.learnSkills[j];
        if (!$dataSkills[skillId]) continue;
        if ($dataSkills[skillId].name === '') continue;
        actor.learnSkill(skillId);
      }
      actor.refresh();
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.SLS.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.SLS.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'ShowLearnSkill') $gameSystem._showLearnSkill = true;
    if (command === 'HideLearnSkill') $gameSystem._showLearnSkill = false;
    if (command === 'EnableLearnSkill') $gameSystem._enableLearnSkill = true;
    if (command === 'DisableLearnSkill') $gameSystem._enableLearnSkill = false;
    if (command === 'OpenLearnSkill') this.openLearnSkill(args);
};

Game_Interpreter.prototype.openLearnSkill = function(args) {
    if ($gameParty.inBattle()) return;
    if (!args) return;
    if (!args[0]) return;
    if (args[0].toLowerCase() === 'actor') {
      var actorId = parseInt(args[1]);
      var actor = $gameActors.actor(actorId)
    } else if (args[0].toLowerCase() === 'party') {
      var index = parseInt(args[1]) - 1;
      index = index.clamp(0, $gameParty.members().length - 1);
      var actor = $gameParty.members()[index];
    } else {
      return;
    }
    ImageManager.loadFace(actor.faceName());
    this.loadPartyFaces();
    $gameParty.setMenuActor(actor);
    SceneManager.push(Scene_LearnSkill);
};

Game_Interpreter.prototype.loadPartyFaces = function() {
    for (var i = 0; i < $gameParty.members().length; ++i) {
      var actor = $gameParty.members()[i];
      if (actor) ImageManager.loadFace(actor.faceName());
    }
};

//=============================================================================
// Window_SkillType
//=============================================================================

Yanfly.SLS.Window_SkillType_makeCommandList =
    Window_SkillType.prototype.makeCommandList;
Window_SkillType.prototype.makeCommandList = function() {
    Yanfly.SLS.Window_SkillType_makeCommandList.call(this);
    if (this.findExt('learnSkills') === -1) this.addLearnSkillsCommand();
};

Window_SkillType.prototype.addLearnSkillsCommand = function() {
    if (!$gameSystem.isShowLearnSkill()) return;
    var name = Yanfly.Param.SLSCommand;
    var enabled = $gameSystem.isEnableLearnSkill();
    this.addCommand(name, 'skill', enabled, 'learnSkills');
};

Window_SkillType.prototype.setClassListWindow = function(classWindow) {
    this._classListWindow = classWindow;
};

Window_SkillType.prototype.setSkillLearnWindow = function(learnWindow) {
    this._skillLearnWindow = learnWindow;
};

Window_SkillType.prototype.setGoldWindow = function(goldWindow) {
    this._goldWindow = goldWindow;
};

Window_SkillType.prototype.setSkillLearnDataWindow = function(learnDataWindow) {
    this._skillLearnDataWindow = learnDataWindow;
    this.update();
};

Yanfly.SLS.Window_SkillType_update = Window_SkillType.prototype.update;
Window_SkillType.prototype.update = function() {
    if (this.currentExt() === 'learnSkills' && this._actor) {
      Window_Command.prototype.update.call(this);
      if (this.isSkillLearnIntegrated()) {
        this._classListWindow.show();
      } else if (this._skillLearnWindow) {
        this._skillLearnWindow.show();
      }
      this._skillWindow.hide();
      if (this._goldWindow) this._goldWindow.show();
      this._skillLearnDataWindow.show();
    } else {
      Yanfly.SLS.Window_SkillType_update.call(this);
      this._skillWindow.show();
      if (this._classListWindow) this._classListWindow.hide();
      if (this._skillLearnWindow) this._skillLearnWindow.hide();
      if (this._goldWindow) this._goldWindow.hide();
      if (this._skillLearnDataWindow) this._skillLearnDataWindow.hide();
    }
};

Window_SkillType.prototype.isSkillLearnIntegrated = function() {
    if (!this._classListWindow) return false;
    if (this._actor.availableClasses() <= 1) return false;
    return eval(Yanfly.Param.SLSIntegrate);
};

//=============================================================================
// Window_SkillLearn
//=============================================================================

function Window_SkillLearn() {
    this.initialize.apply(this, arguments);
}

Window_SkillLearn.prototype = Object.create(Window_SkillList.prototype);
Window_SkillLearn.prototype.constructor = Window_SkillLearn;

Window_SkillLearn.prototype.maxCols = function() {
    return 1;
};

Window_SkillLearn.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this.contents.clear();
    this.setClass(null);
    this._actor = actor;
    this.refresh();
    this.resetScroll();
    this.setClass(this._actor.currentClass().id);
};

Window_SkillLearn.prototype.setClass = function(classId) {
    if (this._classId === classId) return;
    this._classId = classId;
    this.makeItemList();
    this.refresh();
};

Window_SkillLearn.prototype.getClass = function() {
    return $dataClasses[this._classId];
};

Window_SkillLearn.prototype.makeItemList = function() {
    if (this._actor && this.getClass()) {
      this.createSkillLearnData();
    } else {
      this._data = [];
    }
};

Window_SkillLearn.prototype.createSkillLearnData = function() {
    this._data = [];
    for (var i = 0; i < this.getClass().learnSkills.length; ++i) {
      var skillId = this.getClass().learnSkills[i];
      var skill = $dataSkills[skillId];
      if (skill && this.includes(skill)) this._data.push(skill);
    }
    this._data = this._data.sort(function(a, b) { return a.id - b.id; });
    this._data = this._data.filter(Yanfly.Util.onlyUnique);
};

Window_SkillLearn.prototype.includes = function(skill) {
    if (skill.name === '') return false;
    if (!this.meetsRequirements(skill)) return false;
    return true;
};

Window_SkillLearn.prototype.meetsRequirements = function(skill) {
    var evalValue = this.getEvalLine(skill.learnShowEval);
    if (evalValue !== undefined) return evalValue;
    if (Imported.YEP_ClassChangeCore) {
      var classLevel = this._actor.classLevel(this._classId);
      if (skill.learnRequireLevel > classLevel) return false;
    } else {
      if (skill.learnRequireLevel > this._actor.level) return false;
    }
    for (var i = 0; i < skill.learnRequireSkill.length; ++i) {
      var skillId = skill.learnRequireSkill[i];
      if (!$dataSkills[skillId]) continue;
      if (!this._actor.isLearnedSkill(skillId)) return false;
    }
    for (var i = 0; i < skill.learnRequireSwitch.length; ++i) {
      var switchId = skill.learnRequireSwitch[i];
      if (!$gameSwitches.value(switchId)) return false;
    }
    return true;
};

Window_SkillLearn.prototype.isEnabled = function(item) {
    if (!this._actor) return false;
    if (!item) return false;
    if (this._actor.isLearnedSkill(item.id)) return false;
    if ($gamePlayer.isDebugThrough()) return true;
    if (!this._actor.canLearnSkill(item, this._classId)) return false;
    if (!this.meetsRequirements(item)) return false;
    var evalValue = this.getEvalLine(item.learnRequireEval);
    if (evalValue !== undefined) return evalValue;
    return true;
};

Window_SkillLearn.prototype.getEvalLine = function(evalLine) {
    if (evalLine.length <= 0) return undefined;
    var value = undefined;
    var a = this._actor;
    var user = this._actor;
    var subject = this._actor;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(evalLine);
    return value;
};

Window_SkillLearn.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (!skill) return;
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(skill));
    this.drawItemName(skill, rect.x, rect.y, rect.width);
    this.drawItemLearned(skill, rect.x, rect.y, rect.width);
    this.changePaintOpacity(true);
};

Window_SkillLearn.prototype.drawItemLearned = function(skill, wx, wy, ww) {
    if (!this._actor.isLearnedSkill(skill.id)) {
      this.drawSkillCost(skill, wx, wy, ww);
      return;
    }
    var text = Yanfly.Param.SLSLearnText;
    this.contents.fontSize = Yanfly.Param.SLSLearnSize;
    this.drawText(text, wx, wy, ww, 'right');
    this.resetFontSettings();
};

Window_SkillLearn.prototype.setDataWindow = function(learnDataWindow) {
    this._skillLearnDataWindow = learnDataWindow;
    this.update();
};

Window_SkillLearn.prototype.update = function() {
    Window_SkillList.prototype.update.call(this);
    if (this._skillLearnDataWindow && this.item()) {
      this._skillLearnDataWindow.setSkill(this.item());
      if (this._classId) this._skillLearnDataWindow.setClass(this._classId);
    }
};

//=============================================================================
// Window_SkillLearnClass
//=============================================================================

if (Imported.YEP_ClassChangeCore) {

function Window_SkillLearnClass() {
    this.initialize.apply(this, arguments);
}

Window_SkillLearnClass.prototype = Object.create(Window_ClassList.prototype);
Window_SkillLearnClass.prototype.constructor = Window_SkillLearnClass;

Window_SkillLearnClass.prototype.initialize = function(x, y, width, height) {
    Window_ClassList.prototype.initialize.call(this, x, y, width, height);
    this._skill = null;
};

Window_SkillLearnClass.prototype.setSkill = function(skill) {
    if (this._skill === skill) return;
    this._skill = skill;
    this.refresh();
    this.resetScroll();
};

Window_SkillLearnClass.prototype.makeItemList = function() {
    if (this._actor && this._skill) {
      this._data = [];
      for (var i = 0; i < this._actor.unlockedClasses().length; ++i) {
        var classId = this._actor.unlockedClasses()[i];
        var item = $dataClasses[classId];
        if (!item) continue;
        if (item.learnSkills.contains(this._skill.id)) {
          this._data.push(classId);
        }
      }
    } else {
      this._data = [];
    }
    this._data.sort(function(a, b) { return a - b });
};

Window_SkillLearnClass.prototype.isEnabled = function(classId) {
    if (!this._skill) return false;
    var item = $dataClasses[classId];
    if (!item) return false;
    if (Imported.YEP_JobPoints) {
      var jpCost = this._skill.learnCostJp;
      jpCost += this._actor.customLearnSkillJpCost(this._skill);
      if (jpCost > this._actor.jp(item.id)) return false;
    }
    return Window_ClassList.prototype.isEnabled.call(this, classId);
};

Window_SkillLearnClass.prototype.drawClassLevel = function(item, wx, wy, ww) {
    if (!Imported.YEP_JobPoints) return;
    var value = Yanfly.Util.toGroup(this._actor.jp(item.id));
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var fmt = Yanfly.Param.JpMenuFormat;
    var text = fmt.format(value, Yanfly.Param.Jp, icon);
    this.resetFontSettings();
    this.changeTextColor(this.normalColor());
    this.contents.fontSize = Yanfly.Param.CCCLvFontSize;
    wx += ww - this.textWidthEx(text);
    this.drawTextEx(text, wx, wy);
};

Window_SkillLearnClass.prototype.selectLast = function() {
    this._index = this._data.indexOf(this._actor._classId);
    if (this._index < 0) this._index = 0;
    this.select(this._index);
};

} // Imported.YEP_ClassChangeCore

//=============================================================================
// Window_SkillLearnData
//=============================================================================

function Window_SkillLearnData() {
    this.initialize.apply(this, arguments);
}

Window_SkillLearnData.prototype = Object.create(Window_Base.prototype);
Window_SkillLearnData.prototype.constructor = Window_SkillLearnData;

Window_SkillLearnData.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this._actor = null;
    this._classId = null;
    this._skill = null;
    this.refresh();
};

Window_SkillLearnData.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this.setClass(null);
    this.setSkill(null);
    this.contents.clear();
    this._actor = actor;
    this.refresh();
};

Window_SkillLearnData.prototype.setClass = function(classId) {
    if (this._classId === classId) return;
    this._classId = classId;
    this.refresh();
};

Window_SkillLearnData.prototype.setSkill = function(skill) {
    if (this._skill === skill) return;
    this._skill = skill;
    this.refresh();
};

Window_SkillLearnData.prototype.refresh = function() {
    this.contents.clear();
    this.resetFontSettings();
    this.resetTextColor();
    this.drawDarkRectangles();
    if (!this._skill) return;
    this.drawSkillData();
};

Window_SkillLearnData.prototype.drawDarkRectangles = function(dx, dy, dw, dh) {
    var wx = 0;
    var wy = 0;
    var ww = this.contents.width;
    var wh = this.lineHeight();
    for (;;) {
      if (wy + wh > this.contents.height) break;
      this.drawDarkRect(wx, wy, ww, wh);
      wy += this.lineHeight();
    }
};

Window_SkillLearnData.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_SkillLearnData.prototype.drawSkillData = function() {
    this.drawItemName(this._skill, 0, 0, this.contents.width);
    var wy = this.lineHeight();
    wy = this.drawRequirements(wy);
    wy = this.drawCostText(wy);
    wy = this.drawGoldCosts(wy);
    wy = this.drawJpCosts(wy);
    wy = this.drawOtherCosts(wy);
    wy = this.drawCustomText(wy);
    return wy;
};

Window_SkillLearnData.prototype.drawRequirements = function(wy) {
    return wy;
};

Window_SkillLearnData.prototype.drawCostText = function(wy) {
    if (!this.hasLearnCost()) return wy;
    var text = Yanfly.Param.SLSLearnCost;
    this.changeTextColor(this.systemColor());
    this.drawText(text, 0, wy, this.contents.width, 'center');
    wy += this.lineHeight();
    return wy;
};

Window_SkillLearnData.prototype.hasLearnCost = function() {
    if (this._skill.learnCostGold > 0) return true;
    if (Imported.YEP_JobPoints) {
      var cost = this._skill.learnCostJp;
      cost += this._actor.customLearnSkillJpCost(this._skill);
      return cost > 0;
    } 
    if (this._skill.learnCost.length > 0) return true;
    return false;
};

Window_SkillLearnData.prototype.drawGoldCosts = function(wy) {
    if (this._skill.learnCostGold <= 0) return wy;
    var text = '';
    if (Imported.YEP_CoreEngine && Yanfly.Icon.Gold > 0) {
      text = '\\i[' + Yanfly.Icon.Gold + ']';
    }
    text += TextManager.currencyUnit;
    var wx = this.drawTextEx(text, 0, wy);
    var ww = this.contents.width - wx - 4;
    var costText = Yanfly.Util.toGroup(this._skill.learnCostGold);
    this.contents.fontSize = Yanfly.Param.SLSCostSize;
    if (this._skill.learnCostGold > $gameParty.gold()) {
      this.changeTextColor(this.powerDownColor());
    } else {
      this.changeTextColor(this.powerUpColor());
    }
    this.drawText(costText, wx, wy, ww, 'right');
    this.resetFontSettings();
    this.resetTextColor();
    wy += this.lineHeight();
    return wy;
};

Window_SkillLearnData.prototype.drawJpCosts = function(wy) {
    if (!Imported.YEP_JobPoints) return wy;
    var cost = this._skill.learnCostJp;
    cost += this._actor.customLearnSkillJpCost(this._skill);
    if (cost <= 0) return wy;
    var text = '';
    if (Yanfly.Icon.Jp > 0) text = '\\i[' + Yanfly.Icon.Jp + ']';
    text += Yanfly.Param.Jp;
    var wx = this.drawTextEx(text, 0, wy);
    var ww = this.contents.width - wx - 4;
    var costText = Yanfly.Util.toGroup(cost);
    this.contents.fontSize = Yanfly.Param.SLSCostSize;
    if (this._actor.sufficientJpLearnSkill(this._skill, this._classId)) {
      this.changeTextColor(this.powerUpColor());
    } else {
      this.changeTextColor(this.powerDownColor());
    }
    this.drawText(costText, wx, wy, ww, 'right');
    this.resetFontSettings();
    this.resetTextColor();
    wy += this.lineHeight();
    return wy;
};

Window_SkillLearnData.prototype.drawOtherCosts = function(wy) {
    if (this._skill.learnCost.length <= 0) return wy;
    for (var i = 0; i < this._skill.learnCost.length; ++i) {
      if (wy + this.lineHeight() > this.contents.height) break;
      this.resetFontSettings();
      this.resetTextColor();
      var ww = this.contents.width;
      var line = this._skill.learnCost[i];
      var obj = null;
      var value = 0;
      if (line.match(/ITEM[ ](\d+):[ ](\d+)/i)) {
        obj = $dataItems[parseInt(RegExp.$1)];
        value = parseInt(RegExp.$2);
      } else if (line.match(/WEAPON[ ](\d+):[ ](\d+)/i)) {
        obj = $dataWeapons[parseInt(RegExp.$1)];
        value = parseInt(RegExp.$2);
      } else if (line.match(/ARMOR[ ](\d+):[ ](\d+)/i)) {
        obj = $dataArmors[parseInt(RegExp.$1)];
        value = parseInt(RegExp.$2);
      }
      if (!obj) continue;
      this.drawItemName(obj, 0, wy, ww);
      this.contents.fontSize = Yanfly.Param.SLSCostSize;
      var text = '/' + Yanfly.Util.toGroup(value);
      this.drawText(text, 0, wy, ww - 4, 'right');
      if ($gameParty.numItems(obj) >= value) {
        this.changeTextColor(this.powerUpColor());
      } else {
        this.changeTextColor(this.powerDownColor());
      }
      ww -= this.textWidth(text);
      var held = Yanfly.Util.toGroup($gameParty.numItems(obj))
      this.drawText(held, 0, wy, ww - 4, 'right');
      this.resetFontSettings();
      this.resetTextColor();
      wy += this.lineHeight();
    }
    return wy;
};

Window_SkillLearnData.prototype.drawCustomText = function(wy) {
    if (this._skill.learnCustomText === '') return wy;
    this.drawTextEx(this._skill.learnCustomText, 4, wy);
    return wy;
};

//=============================================================================
// Window_SkillLearnCommand
//=============================================================================

function Window_SkillLearnCommand() {
    this.initialize.apply(this, arguments);
}

Window_SkillLearnCommand.prototype = Object.create(Window_Command.prototype);
Window_SkillLearnCommand.prototype.constructor = Window_SkillType;

Window_SkillLearnCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this._actor = null;
};

Window_SkillLearnCommand.prototype.windowWidth = function() {
    return 240;
};

Window_SkillLearnCommand.prototype.numVisibleRows = function() {
    return 4;
};

Window_SkillLearnCommand.prototype.itemTextAlign = function() {
    if (Imported.YEP_SkillCore) return Yanfly.Param.SCCTextAlign;
    return Window_Command.prototype.itemTextAlign.call(this);
};

Window_SkillLearnCommand.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this.contents.clear();
    this._actor = actor;
    this.refresh();
};

Window_SkillLearnCommand.prototype.setStatusWindow = function(w) {
    this._statusWindow = w;
};

Window_SkillLearnCommand.prototype.setSkillLearnWindow = function(w) {
    this._skillLearnWindow = w;
};

Window_SkillLearnCommand.prototype.setSkillLearnDataWindow = function(w) {
    this._skillLearnDataWindow = w;
    this.update();
};

Window_SkillLearnCommand.prototype.makeCommandList = function() {
    if (!this._actor) return;
    this.addClassCommand(this._actor.currentClass().id);
    this._currentClass = this._actor.currentClass().id;
    if (!Imported.YEP_ClassChangeCore) return;
    for (var i = 0; i < this._actor.unlockedClasses().length; ++i) {
      classId = this._actor.unlockedClasses()[i];
      if (classId === this._actor.currentClass().id) continue;
      if ($dataClasses[classId]) this.addClassCommand(classId);
    }
};

Window_SkillLearnCommand.prototype.addClassCommand = function(classId) {
    var actorClass = $dataClasses[classId];
    if (!actorClass) return;
    var name = actorClass.name;
    if (actorClass.useNickname) {
      name = this._actor.nickname();
    }
    this.addCommand(name, 'class', true, classId);
};

Window_SkillLearnCommand.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    if (this._helpWindow && this.active) {
      var classId = this.currentExt();
      this._helpWindow.setItem($dataClasses[classId]);
    }
    if (this._skillLearnWindow) {
      var classId = this.currentExt();
      this._skillLearnWindow.setClass(classId);
    }
    if (this._statusWindow && this._currentClassIndex !== this.index()) {
      this._currentClassIndex = this.index();
      var actor = JsonEx.makeDeepCopy(this._actor);
      if (!actor) return;
      var classId = this.currentExt();
      this._currentClass = this.currentExt();
      var hpRate = actor.hp / actor.mhp;
      var mpRate = actor.mp / Math.max(1, actor.mmp);
      Yanfly.SLS.PreventReleaseItem = true;
      if (Imported.YEP_ClassChangeCore) {
        actor.changeClass(classId, eval(Yanfly.Param.CCCMaintainLv));
      } else {
        actor.changeClass(classId, false);
      }
      var max = actor.isDead() ? 0 : 1;
      var hpAmount = Math.max(max, parseInt(actor.mhp * hpRate));
      actor.setHp(hpAmount);
      actor.setMp(parseInt(actor.mmp * mpRate));
      this._statusWindow.setActor(actor);
      Yanfly.SLS.PreventReleaseItem = false;
    }
};

Yanfly.SLS.Window_Command_drawItem = Window_Command.prototype.drawItem;
Window_SkillLearnCommand.prototype.drawItem = function(index) {
    if (Imported.YEP_ClassChangeCore) {
      this.drawItemEx(index);
    } else {
      Yanfly.SLS.Window_Command_drawItem.call(this, index);
    }
};

Window_SkillLearnCommand.prototype.drawItemEx = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    var classId = this._list[index].ext;
    this.drawIcon($dataClasses[classId].iconIndex, rect.x, rect.y);
    rect.x += Window_Base._iconWidth + 4;
    rect.width -= Window_Base._iconWidth + 4;
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width);
};

//=============================================================================
// Window_SkillLearnConfirm
//=============================================================================

function Window_SkillLearnConfirm() {
    this.initialize.apply(this, arguments);
}

Window_SkillLearnConfirm.prototype = Object.create(Window_Command.prototype);
Window_SkillLearnConfirm.prototype.constructor = Window_SkillLearnConfirm;

Window_SkillLearnConfirm.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
};

Window_SkillLearnConfirm.prototype.makeCommandList = function() {
    this.addCommand(Yanfly.Param.SLSConfirmYes, 'confirm');
    this.addCommand(Yanfly.Param.SLSConfirmNo, 'cancel');
};

Window_SkillLearnConfirm.prototype.setData = function(actor, skill) {
    var fmt = Yanfly.Param.SLSConfirmText;
    this._text = fmt.format(actor.name(), skill.name);
    var ww = this.textWidthEx(this._text) + this.standardPadding() * 4;
    this.width = ww;
    this.refresh();
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
    this.drawTextEx(this._text, this.textPadding(), 0);
};

Window_SkillLearnConfirm.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_SkillLearnConfirm.prototype.itemTextAlign = function() {
    return 'center';
};

Window_SkillLearnConfirm.prototype.windowHeight = function() {
    return this.fittingHeight(3);
};

Window_SkillLearnConfirm.prototype.itemRect = function(index) {
    var rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.y += this.lineHeight();
    return rect;
};

//=============================================================================
// Scene_Skill
//=============================================================================

Yanfly.SLS.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
    Yanfly.SLS.Scene_Skill_create.call(this);
    this.createClassListWindow();
    this.createSkillLearnWindow();
    this.createGoldWindow();
    this.createSkillLearnClassWindow();
    this.createSkillLearnDataWindow();
};

Yanfly.SLS.Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
Scene_Skill.prototype.refreshActor = function() {
  Yanfly.SLS.Scene_Skill_refreshActor.call(this);
  var actor = this.actor();
  if (this._classListWindow) this._classListWindow.setActor(actor);
  if (this._skillLearnWindow) this._skillLearnWindow.setActor(actor);
  if (this._skillLearnClassWindow) this._skillLearnClassWindow.setActor(actor);
  if (this._skillLearnDataWindow) this._skillLearnDataWindow.setActor(actor);
};

Scene_Skill.prototype.createClassListWindow = function() {
    if (!Imported.YEP_ClassChangeCore) return;
    if (this._classListWindow) return;
    var wx = 0;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._classListWindow = new Window_ClassList(wx, wy, ww, wh);
    this._classListWindow.setHelpWindow(this._helpWindow);
    this._classListWindow.setHandler('ok', this.onClassOk.bind(this));
    this._classListWindow.setHandler('cancel', this.onClassCancel.bind(this));
    this._skillTypeWindow.setClassListWindow(this._classListWindow);
    this._classListWindow.hide();
    this._classListWindow.setActor(this.actor());
    this.addWindow(this._classListWindow);
};

Scene_Skill.prototype.createSkillLearnWindow = function() {
    var wx = 0;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._skillLearnWindow = new Window_SkillLearn(wx, wy, ww, wh);
    this._skillLearnWindow.setHelpWindow(this._helpWindow);
    this._skillLearnWindow.setHandler('ok', this.onLearnOk.bind(this));
    this._skillLearnWindow.setHandler('cancel', this.onLearnCancel.bind(this));
    this._skillTypeWindow.setSkillLearnWindow(this._skillLearnWindow);
    this._skillLearnWindow.hide();
    this._skillLearnWindow.setActor(this.actor());
    this._skillLearnWindow.setClass(this.actor().currentClass().id);
    this.addWindow(this._skillLearnWindow);
};

Scene_Skill.prototype.createGoldWindow = function() {
    if (!eval(Yanfly.Param.SLSGoldWindow)) return;
    var wx = Graphics.boxWidth / 2;
    this._goldWindow = new Window_Gold(wx, 0);
    this._goldWindow.width = Graphics.boxWidth / 2;
    this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
    this._skillTypeWindow.setGoldWindow(this._goldWindow);
    this._goldWindow.hide();
    this._goldWindow.createContents();
    this._goldWindow.refresh();
    this.addWindow(this._goldWindow);
};

Scene_Skill.prototype.createSkillLearnClassWindow = function() {
    if (!Imported.YEP_ClassChangeCore) return;
    if (this._skillLearnClassWindow) return;
    var wx = 0;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._skillLearnClassWindow = new Window_SkillLearnClass(wx, wy, ww, wh);
    this._skillLearnClassWindow.setHelpWindow(this._helpWindow);
    this._skillLearnClassWindow.setHandler('ok',
      this.onSLCOk.bind(this));
    this._skillLearnClassWindow.setHandler('cancel',
      this.onSLCCancel.bind(this));
    this._skillLearnClassWindow.hide();
    this._skillLearnClassWindow.setActor(this.actor());
    this.addWindow(this._skillLearnClassWindow);
};

Scene_Skill.prototype.createSkillLearnDataWindow = function() {
    var wx = Graphics.boxWidth / 2;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    if (this._goldWindow) wh -= this._goldWindow.height;
    this._skillLearnDataWindow = new Window_SkillLearnData(wx, wy, ww, wh);
    this._skillTypeWindow.setSkillLearnDataWindow(this._skillLearnDataWindow);
    this._skillLearnWindow.setDataWindow(this._skillLearnDataWindow);
    this._skillLearnDataWindow.setActor(this.actor());
    this._skillLearnDataWindow.hide();
    this.addWindow(this._skillLearnDataWindow);
};

Yanfly.SLS.Scene_Skill_commandSkill = Scene_Skill.prototype.commandSkill;
Scene_Skill.prototype.commandSkill = function() {
    if (this._skillTypeWindow.currentExt() === 'learnSkills') {
      this.commandLearnSkill();
    } else {
      Yanfly.SLS.Scene_Skill_commandSkill.call(this);
    }
};

Scene_Skill.prototype.commandLearnSkill = function() {
    if (!eval(Yanfly.Param.SLSIntegrate)) {
      SceneManager.push(Scene_LearnSkill);
    } else if (this._classListWindow && this.actor().availableClasses() > 1) {
      this._classListWindow.activate();
      this._classListWindow.selectLast();
    } else if (this._skillLearnWindow) {
      this._skillLearnWindow.activate();
      this._skillLearnWindow.selectLast();
    }
};

Scene_Skill.prototype.onClassOk = function() {
    var item = this._classListWindow.item();
    this._skillLearnWindow.setClass(item);
    this._classListWindow.hide();
    this._skillLearnWindow.show();
    this._skillLearnWindow.activate();
    this._skillLearnWindow.selectLast();
};

Scene_Skill.prototype.onClassCancel = function() {
    this._classListWindow.deselect();
    this._skillTypeWindow.activate();
    this._helpWindow.setItem(null);
};

Scene_Skill.prototype.onLearnOk = function() {
    var skill = this._skillLearnWindow.item();
    if (this.actor().availableClasses() === 1) {
      var classId = this.actor().currentClass().id;
      this.processLearnSkill(skill, classId);
    } else if (this._skillLearnClassWindow) {
      this._skillLearnWindow.hide();
      this._skillLearnClassWindow.show();
      this._skillLearnClassWindow.setSkill(skill);
      this._skillLearnClassWindow.activate();
      this._skillLearnClassWindow.selectLast();
    }
};

Scene_Skill.prototype.processLearnSkill = function(skill, classId) {
  this._skillLearnWindow.activate();
  this.actor().learnSkill(skill.id);
  SoundManager.playUseSkill();
  $gameParty.loseGold(skill.learnCostGold);
  $gameParty.processLearnSkillCost(skill);
  if (Imported.YEP_JobPoints) {
    var cost = skill.learnCostJp;
    cost += this.actor().customLearnSkillJpCost(skill);
    this.actor().loseJp(cost, classId);
  }
  this.processLearnCostEval(skill, classId);
  this.actor().refresh();
  this._skillLearnWindow.refresh();
  this._skillLearnWindow.updateHelp();
  this._statusWindow.refresh();
  if (this._goldWindow) this._goldWindow.refresh();
  if (this._classListWindow) this._classListWindow.refresh();
  this._skillLearnDataWindow.refresh();
  this._skillTypeWindow.refresh();
};

Scene_Skill.prototype.processLearnCostEval = function(skill, classId) {
    if (skill.learnCostEval === '') return;
    var a = this.actor();
    var user = this.actor();
    var subject = this.actor();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.learnCostEval);
};

Scene_Skill.prototype.onLearnCancel = function() {
    this._skillLearnWindow.deselect();
    this._skillLearnDataWindow.setSkill(null);
    if (this._classListWindow && this._actor.availableClasses() > 1) {
      this._skillLearnWindow.hide();
      this._classListWindow.show();
      this._classListWindow.activate();
      this._classListWindow.selectLast();
    } else {
      this._skillTypeWindow.activate();
      this._helpWindow.setItem(null);
    }
};

Scene_Skill.prototype.onSLCOk = function() {
    var skill = this._skillLearnWindow.item();
    var classId = this._skillLearnClassWindow.item();
    this.processLearnSkill(skill, classId);
    this.onSLCCancel();
};

Scene_Skill.prototype.onSLCCancel = function() {
    this._skillLearnClassWindow.hide();
    this._skillLearnWindow.activate();
    this._skillLearnWindow.show();
};

//=============================================================================
// Scene_LearnSkill
//=============================================================================

function Scene_LearnSkill() {
    this.initialize.apply(this, arguments);
}

Scene_LearnSkill.prototype = Object.create(Scene_ItemBase.prototype);
Scene_LearnSkill.prototype.constructor = Scene_LearnSkill;

Scene_LearnSkill.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Scene_LearnSkill.prototype.onActorChange = function() {
    this.refreshActor();
    this.adjustSelection();
};

Scene_LearnSkill.prototype.adjustSelection = function() {
    if (Imported.YEP_ClassChangeCore) {
      this._commandWindow.activate();
    } else {
      this.commandClass();
      this._commandWindow.deactivate();
    }
};

Scene_LearnSkill.prototype.start = function() {
    Scene_ItemBase.prototype.start.call(this);

};

Scene_LearnSkill.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCommandWindow();
    this.createStatusWindow();
    this.createSkillLearnWindow();
    this.createGoldWindow();
    this.createSkillLearnDataWindow();
    this.createConfirmWindow();
    this.refreshActor();
    this.adjustSelection();
};

Scene_LearnSkill.prototype.refreshActor = function() {
    var actor = this.actor();
    this._commandWindow.setActor(actor);
    this._statusWindow.setActor(actor);
    this._skillLearnWindow.setActor(actor);
    this._skillLearnDataWindow.setActor(actor);
};

Scene_LearnSkill.prototype.createCommandWindow = function() {
    var wy = this._helpWindow.height;
    this._commandWindow = new Window_SkillLearnCommand(0, wy);
    this._commandWindow.setHelpWindow(this._helpWindow);
    this._commandWindow.setHandler('class',    this.commandClass.bind(this));
    this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
    this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup',   this.previousActor.bind(this));
    this._commandWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._commandWindow);
};

Scene_LearnSkill.prototype.createStatusWindow = function() {
    var wx = this._commandWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._commandWindow.height;
    this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
    this._commandWindow.setStatusWindow(this._statusWindow);
    this.addWindow(this._statusWindow);
};

Scene_LearnSkill.prototype.createSkillLearnWindow = function() {
  var wx = 0;
  var wy = this._statusWindow.y + this._statusWindow.height;
  var ww = Graphics.boxWidth / 2;
  var wh = Graphics.boxHeight - wy;
  this._skillLearnWindow = new Window_SkillLearn(wx, wy, ww, wh);
  this._skillLearnWindow.setHelpWindow(this._helpWindow);
  this._skillLearnWindow.setHandler('ok', this.onLearnOk.bind(this));
  this._skillLearnWindow.setHandler('cancel', this.onLearnCancel.bind(this));
  if (!Imported.YEP_ClassChangeCore) {
    var win = this._skillLearnWindow
    win.setHandler('pagedown', this.onLearnPageDn.bind(this));
    win.setHandler('pageup',   this.onLearnPageUp.bind(this));
  }
  this._commandWindow.setSkillLearnWindow(this._skillLearnWindow);
  this._skillLearnWindow.setActor(this.actor());
  this._skillLearnWindow.setClass(this.actor().currentClass().id);
  this.addWindow(this._skillLearnWindow);
};

Scene_LearnSkill.prototype.createGoldWindow = function() {
    if (!eval(Yanfly.Param.SLSGoldWindow)) return;
    var wx = Graphics.boxWidth / 2;
    this._goldWindow = new Window_Gold(wx, 0);
    this._goldWindow.width = Graphics.boxWidth / 2;
    this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
    this._goldWindow.createContents();
    this._goldWindow.refresh();
    this.addWindow(this._goldWindow);
};

Scene_LearnSkill.prototype.createSkillLearnDataWindow = function() {
    var wx = Graphics.boxWidth / 2;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    if (this._goldWindow) wh -= this._goldWindow.height;
    this._skillLearnDataWindow = new Window_SkillLearnData(wx, wy, ww, wh);
    this._commandWindow.setSkillLearnDataWindow(this._skillLearnDataWindow);
    this._skillLearnWindow.setDataWindow(this._skillLearnDataWindow);
    this._skillLearnDataWindow.setActor(this.actor());
    this.addWindow(this._skillLearnDataWindow);
};

Scene_LearnSkill.prototype.createConfirmWindow = function() {
    this._confirmWindow = new Window_SkillLearnConfirm();
    var win = this._confirmWindow;
    win.setHandler('confirm', this.onConfirmOk.bind(this));
    win.setHandler('cancel',  this.onConfirmCancel.bind(this));
    this.addWindow(this._confirmWindow);
};

Scene_LearnSkill.prototype.commandClass = function() {
    var item = this._commandWindow.currentExt();
    this._skillLearnWindow.setClass(item);
    this._skillLearnWindow.show();
    this._skillLearnWindow.activate();
    this._skillLearnWindow.selectLast();
};

Scene_LearnSkill.prototype.onLearnOk = function() {
    var skill = this._skillLearnWindow.item();
    var classId = this._commandWindow.currentExt();
    this.confirmLearnSkill(skill, classId);
};

Scene_LearnSkill.prototype.refreshStatus = function() {
    var actor = JsonEx.makeDeepCopy(this.actor());
    if (!actor) return;
    var classId = this._commandWindow.currentExt();
    this._commandWindow._currentClass = this._commandWindow.currentExt();
    var hpRate = actor.hp / actor.mhp;
    var mpRate = actor.mp / Math.max(1, actor.mmp);
    Yanfly.SLS.PreventReleaseItem = true;
    if (Imported.YEP_ClassChangeCore) {
      actor.changeClass(classId, eval(Yanfly.Param.CCCMaintainLv));
    } else {
      actor.changeClass(classId, false);
    }
    var max = actor.isDead() ? 0 : 1;
    var hpAmount = Math.max(max, parseInt(actor.mhp * hpRate));
    actor.setHp(hpAmount);
    actor.setMp(parseInt(actor.mmp * mpRate));
    this._statusWindow.setActor(actor);
    Yanfly.SLS.PreventReleaseItem = false;
};

Scene_LearnSkill.prototype.processLearnSkill = function(skill, classId) {
  this._skillLearnWindow.activate();
  this.actor().learnSkill(skill.id);
  SoundManager.playUseSkill();
  $gameParty.loseGold(skill.learnCostGold);
  $gameParty.processLearnSkillCost(skill);
  if (Imported.YEP_JobPoints) {
    var cost = skill.learnCostJp;
    cost += this.actor().customLearnSkillJpCost(skill);
    this.actor().loseJp(cost, classId);
  }
  this.processLearnCostEval(skill, classId);
  this.actor().refresh();
  this._skillLearnWindow.refresh();
  this._skillLearnWindow.updateHelp();
  this.refreshStatus();
  if (this._goldWindow) this._goldWindow.refresh();
  if (this._classListWindow) this._classListWindow.refresh();
  this._skillLearnDataWindow.refresh();
  this._commandWindow.refresh();
};

Scene_LearnSkill.prototype.confirmLearnSkill = function(skill, classId) {
    if (Yanfly.Param.SLSConfirmWin) {
      this.startConfirmWindow(skill)
    } else {
      this.processLearnSkill(skill, classId);
    }
};

Scene_LearnSkill.prototype.processLearnCostEval = function(skill, classId) {
    if (skill.learnCostEval === '') return;
    var a = this.actor();
    var user = this.actor();
    var subject = this.actor();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.learnCostEval);
};

Scene_LearnSkill.prototype.onLearnCancel = function() {
    if (Imported.YEP_ClassChangeCore) {
      this._skillLearnWindow.deselect();
      this._skillLearnDataWindow.setSkill(null);
      this._commandWindow.activate();
      this._helpWindow.setItem(null);
    } else {
      this.popScene();
    }
};

Scene_LearnSkill.prototype.onLearnPageDn = function() {
    this.nextActor();
};

Scene_LearnSkill.prototype.onLearnPageUp = function() {
    this.previousActor();
};

Scene_LearnSkill.prototype.startConfirmWindow = function(skill) {
    this._confirmWindow.setData(this._actor, skill);
    this._confirmWindow.open();
    this._confirmWindow.activate();
    this._confirmWindow.select(0);
};

Scene_LearnSkill.prototype.onConfirmOk = function() {
    var skill = this._skillLearnWindow.item();
    var classId = this._commandWindow.currentExt();
    this.processLearnSkill(skill, classId);
    this._confirmWindow.close();
};

Scene_LearnSkill.prototype.onConfirmCancel = function() {
    this._confirmWindow.deactivate();
    this._confirmWindow.close();
    this._skillLearnWindow.activate();
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
