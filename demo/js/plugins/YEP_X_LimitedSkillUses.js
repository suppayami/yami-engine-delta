//=============================================================================
// Yanfly Engine Plugins - Skill Core Extension - Limited Skill Uses
// YEP_X_LimitedSkillUses.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_LimitedSkillUses = true;

var Yanfly = Yanfly || {};
Yanfly.LSU = Yanfly.LSU || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 (Requires YEP_SkillCore.js) Make certain skills have
 * a limited amount of times they can be used in battle.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Limited Use Icon
 * @desc The icon used for limited uses. Set 0 to hide.
 * @default 160
 *
 * @param Font Size
 * @desc Font size used for limited uses.
 * Default: 28
 * @default 20
 *
 * @param Text Color
 * @desc The text color used for limited uses.
 * @default 0
 *
 * @param Cost Format
 * @desc The text format for limited uses. Leave empty to hide.
 * %1 - Current     %2 - Maximum
 * @default %1/%2
 *
 * @param Empty Icon
 * @desc The icon used for empty limited uses. Set 0 to hide.
 * @default 168
 *
 * @param Empty Text
 * @desc The text displayed when a skill's uses are used up.
 * @default Empty
 *
 * @param Absolute Max
 * @desc This is the absolute maximum value Limited Uses can
 * go up to and cannot go past.
 * @default 100
 *
 * @param Bypass Limits
 * @desc This is a list of skills that cannot be limited.
 * Separate each skill ID with a space.
 * @default 1 2 3 4 5 6 7
 *
 * @param ---Defaults---
 * @default
 *
 * @param Limit All Skills
 * @desc Give limits to all skills by default?
 * NO - false     YES - true
 * @default false
 *
 * @param Limit Charges
 * @desc The default amount of limit charges for skills.
 * @default 2
 *
 * @param Recover All
 * @desc Restore all charges when using Recover All event?
 * NO - false     YES - true
 * @default true
 *
 * @param Victory Recover
 * @desc How many uses are recovered after winning a battle.
 * @default 10
 *
 * @param Escape Recover
 * @desc How many uses are recovered after escaping a battle.
 * @default 5
 *
 * @param Lose Recover
 * @desc How many uses are recovered after losing a battle.
 * @default 5
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_SkillCore.
 * Make sure this plugin is located under YEP_SkillCore in the plugin list.
 *
 * This plugin enables you to set a limited amount of times certain skills (or
 * all skills) can be used per battle or ever. This adds a different type of
 * skill currency and balance mechanic in limiting the amount of times a skill
 * can be used without directly having to alter MP, TP, or the like.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use these notetags to govern the various Limited Uses aspects of
 * your skills.
 *
 * Skill Notetags:
 *
 *   <Unlimited Use>
 *   If you've enabled 'Limit All Skills' in the plugin parameters, this will
 *   forcefully make the skill unlimited use. If you use this notetag, it will
 *   override any of the Limited Use settings.
 *
 *   <Limit Uses: x>
 *   This will set the number of times the skill can be used to x. If the skill
 *   has 0 charges left, the skill cannot be used.
 *
 *   <Recover All Uses>
 *   <Not Recover All Uses>
 *   When using the recover all command, depending on the settings within the
 *   plugin parameters, all limited use charges are recovered or not. These
 *   notetags will enable you to utilize the other setting for the skill.
 *
 *   <Victory Uses Recover: x>
 *   <Escape uses Recover: x>
 *   <Lose Uses Recover: x>
 *   When the player wins a battle, escapes a battle, or loses a battle, the
 *   skill use will recover x amount of uses for the respective outcome. If the
 *   notetags aren't used, the amounts restored will be equal to settings made
 *   in the plugin's parameters.
 *
 *   <After Battle Uses Recover: x>
 *   This will set the recovery rate of victory, escape, or loss of battle to
 *   be equal to x indiscriminately.
 *
 * Skill and Item Notetags:
 *
 *   <Global Limited Uses: +x>
 *   <Global Limited Uses: -x>
 *   This will change the target's limited uses by +x or -x for all skills.
 *   +x will increase the amount of times the skills can be used. -x will
 *   decrease the amount of times the skills can be used.
 *
 *   <SType x Limited Uses: +y>
 *   <SType x Limited Uses: -y>
 *   This will change the target's limited uses by +y or -y for all skills of
 *   the skill type x. +y will increase the amount of times the skills can be
 *   used. -y will decrease the amount of times the skills can be used.
 *
 *   <Skill x Limited Uses: +y>
 *   <Skill x Limited Uses: -y>
 *   <Skill name Limited Uses: +y>
 *   <Skill name Limited Uses: -y>
 *   This will change the target's limited uses by +y or -y for skill x. If
 *   you use the named notetag varient and have multiple skills in the database
 *   with the same name, priority will be given to the skill with the highest
 *   ID. +y will increase the amount of times the skills can be used. -y will
 *   decrease the amount of times the skills can be used.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Global Use Max: +x>
 *   <Global Use Max: -x>
 *   A battler affected by this property will have any Limited Use skills alter
 *   the maximum times used by +x or -x.
 *
 *   <SType x Use Max: +y>
 *   <SType x Use Max: -y>
 *   A battler affected by this property will have Limited Use skills from
 *   skill type x alter the maximum times used by +y or -y.
 *
 *   <Skill x Use Max: +y>
 *   <Skill x Use Max: -y>
 *   <Skill name Use Max: +y>
 *   <Skill name Use Max: -y>
 *   A battler affected by this property will have Limited Use for skill x (or
 *   named if you're using that version of the notetag instead) alter the
 *   maximum times used by +y or -y. If you are using the named version of the
 *   notetag and have multiple skills in the database with the same name, then
 *   priority will be given to the skill with the highest ID.
 *
 * ============================================================================
 * Lunatic Mode - Altering Target's Limited Uses
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following notetags to
 * perform conditional changes to the target's Limited Uses.
 *
 * Skill and Item Notetags:
 *
 *   --- --- ---
 *
 *   <Custom Global Limited Uses>
 *    value += user.level;
 *   </Custom Global Limited Uses>
 *   The 'value' variable is the number of uses the user will gain for all
 *   Limited Use skills.
 *
 *   --- --- ---
 *
 *   <Custom SType x Limited Uses>
 *    value += user.level;
 *   </Custom SType x Limited Uses>
 *   The 'value' variable is the number of uses the user will gain for all
 *   Limited Use skills of skill type x.
 *
 *   --- --- ---
 *
 *   <Custom Skill x Limited Uses>
 *    value += user.level;
 *   </Custom Skill x Limited Uses>
 *
 *   or
 *
 *   <Custom Skill name Limited Uses>
 *    value += user.level;
 *   </Custom Skill name Limited Uses>
 *
 *   The 'value' variable is the number of uses the user will gain for all
 *   Limited Use skills of skill x. If you are using the named version of the
 *   notetag and you have multiple skills in your database with the same name,
 *   priority will be given to the skill with the highest ID.
 *
 *   --- --- ---
 *
 * ============================================================================
 * Lunatic Mode - Conditional Max Uses
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following notetags to
 * perform conditional changes to the target's Limited Use Maximums.
 *
 * Actor, Class, Enemy, Weapon, Armor, State Notetags:
 *
 *   --- --- ---
 *
 *   <Custom Global Use Max>
 *    value += user.level;
 *   </Custom Global Use Max>
 *   The 'value' variable is the maximum uses the target will gain for all
 *   Limited Use skills.
 *
 *   --- --- ---
 *
 *   <Custom SType x Use Max>
 *    value += user.level;
 *   </Custom SType x Use Max>
 *   The 'value' variable is the maximum uses the target will gain for all
 *   Limited Use skills of skill type x.
 *
 *   --- --- ---
 *
 *   <Custom Skill x Use Max>
 *    value += user.level;
 *   </Custom Skill x Use Max>
 *
 *   or
 *
 *   <Custom Skill name Use Max>
 *    value += user.level;
 *   </Custom Skill name Use Max>
 *
 *   The 'value' variable is the maximum uses the target will gain for all
 *   Limited Use skills of skill x. If you are using the named version of the
 *   notetag and you have multiple skills in your database with the same name,
 *   priority will be given to the skill with the highest ID.
 *
 *   --- --- ---
 *
 * * Note: Keep in mind that none of the adjustments here will bypass the 
 * 'Absolute Max' setting in the plugin parameters. That is the ceiling.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02a:
 * - Updated for RPG Maker MV version 1.1.0.
 * - Fixed notetag category in documentation for Lunatic Mode - Conditional Max
 * Uses. Updated from Skill and Items to Actor, Class, Enemy, Weapon, Armor,
 * and State Notetags.
 *
 * Version 1.01a:
 * - Optimization Update.
 * - Various functions in the skill window will now return their x positions.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_SkillCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_LimitedSkillUses');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Icon.LimitedUse = Number(Yanfly.Parameters['Limited Use Icon']);
Yanfly.Param.LSUFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.LSUTextColor = Number(Yanfly.Parameters['Text Color']);
Yanfly.Param.LSUFormat = String(Yanfly.Parameters['Cost Format']);
Yanfly.Icon.LimitedEmpty = Number(Yanfly.Parameters['Empty Icon']);
Yanfly.Param.LSUEmpty = String(Yanfly.Parameters['Empty Text']);
Yanfly.Param.LimitedAbsMax = Number(Yanfly.Parameters['Absolute Max']);
Yanfly.Param.LSUBypass = String(Yanfly.Parameters['Bypass Limits']);
Yanfly.Param.LSUBypass = Yanfly.Param.LSUBypass.split(' ');
for (Yanfly.i = 0; Yanfly.i < Yanfly.Param.LSUBypass.length; ++Yanfly.i) {
  Yanfly.Param.LSUBypass[Yanfly.i] = parseInt(Yanfly.Param.LSUBypass[Yanfly.i]);
};

Yanfly.Param.LSUDefLimitAll = String(Yanfly.Parameters['Limit All Skills']);
Yanfly.Param.LSUDefLimitAll = eval(Yanfly.Param.LSUDefLimitAll);
Yanfly.Param.LSUDefCharges = Number(Yanfly.Parameters['Limit Charges']);
Yanfly.Param.LSURecoverAll = eval(String(Yanfly.Parameters['Recover All']));
Yanfly.Param.LSUVictoryRecover = Number(Yanfly.Parameters['Victory Recover']);
Yanfly.Param.LSUEscapeRecover = Number(Yanfly.Parameters['Escape Recover']);
Yanfly.Param.LSULoseRecover = Number(Yanfly.Parameters['Lose Recover']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LSU.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LSU.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_LimitedSkillUses) {
    this.processLSUNotetagsS($dataSkills);
    this.processLSUNotetags1($dataSkills);
    this.processLSUNotetags2($dataSkills);
    this.processLSUNotetags2($dataItems);
    this.processLSUNotetags3($dataActors);
    this.processLSUNotetags3($dataClasses);
    this.processLSUNotetags3($dataEnemies);
    this.processLSUNotetags3($dataWeapons);
    this.processLSUNotetags3($dataArmors);
    this.processLSUNotetags3($dataStates);
    Yanfly._loaded_YEP_X_LimitedSkillUses = true;
  }
  return true;
};

DataManager.processLSUNotetagsS = function(group) {
  if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processLSUNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.isLimitedUse = Yanfly.Param.LSUDefLimitAll;
    obj.limitUses = Yanfly.Param.LSUDefCharges;
    obj.limitRecoverAllUses = Yanfly.Param.LSURecoverAll;
    obj.limitBattleRecover = [
      Yanfly.Param.LSUVictoryRecover,
      Yanfly.Param.LSUEscapeRecover,
      Yanfly.Param.LSULoseRecover
    ];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:LIMIT USES|LIMIT USE|LIMITED USE):[ ](\d+)>/i)) {
        obj.limitUses = parseInt(RegExp.$1);
        obj.isLimitedUse = true;
      } else if (line.match(/<(?:RECOVER ALL USES)>/i)) {
        obj.limitRecoverAllUses = true;
      } else if (line.match(/<(?:NOT RECOVER ALL USES)>/i)) {
        obj.limitRecoverAllUses = false;
      } else if (line.match(/<(?:VICTORY USES RECOVER):[ ](\d+)>/i)) {
        obj.limitBattleRecover[0] = parseInt(RegExp.$1);
      } else if (line.match(/<(?:ESCAPE USES RECOVER):[ ](\d+)>/i)) {
        obj.limitBattleRecover[1] = parseInt(RegExp.$1);
      } else if (line.match(/<(?:LOSE USES RECOVER):[ ](\d+)>/i)) {
        obj.limitBattleRecover[2] = parseInt(RegExp.$1);
      } else if (line.match(/<(?:AFTER BATTLE USES RECOVER):[ ](\d+)>/i)) {
        obj.limitBattleRecover[0] = parseInt(RegExp.$1);
        obj.limitBattleRecover[1] = parseInt(RegExp.$1);
        obj.limitBattleRecover[2] = parseInt(RegExp.$1);
      }
    }

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:UNLIMITED USE)>/i)) {
        obj.isLimitedUse = false;
      }
    }
  }
};

DataManager.processLSUNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.globalLimitedUses = 0;
    obj.stypeLimitedUses = {};
    obj.skillLimitedUses = {};
    var evalMode = 'none';
    var evalLine = '';
    obj.globalLimitedUsesEval = '';
    obj.stypeLimitedUsesEval = {};
    obj.skillLimitedUsesEval = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<GLOBAL LIMITED USES:[ ]([\+\-]\d+)>/i)) {
        obj.globalLimitedUses = parseInt(RegExp.$1);
      } else if (line.match(/<STYPE[ ](\d+)[ ]LIMITED USES:[ ]([\+\-]\d+)>/i)) {
        obj.stypeLimitedUses[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<SKILL[ ](\d+)[ ]LIMITED USES:[ ]([\+\-]\d+)>/i)) {
        obj.skillLimitedUses[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<SKILL[ ](.*)[ ]LIMITED USES:[ ]([\+\-]\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.skillLimitedUses[id] = parseInt(RegExp.$2);
      } else if (line.match(/<CUSTOM GLOBAL LIMITED USES>/i)) {
        evalMode = 'customGlobalLimitedUses';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM GLOBAL LIMITED USES>/i)) {
        evalMode = 'none';
        evalLine = '';
      } else if (evalMode === 'customGlobalLimitedUses') {
        obj.globalLimitedUsesEval = obj.globalLimitedUsesEval + line + '\n';
      } else if (line.match(/<CUSTOM STYPE[ ](\d+)[ ]LIMITED USES>/i)) {
        evalMode = 'customStypeLimitedUses';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM STYPE[ ](\d+)[ ]LIMITED USES>/i)) {
        var id = parseInt(RegExp.$1);
        obj.stypeLimitedUsesEval[id] = evalLine;
        evalMode = 'none';
        evalLine = '';
      } else if (evalMode === 'customStypeLimitedUses') {
        evalLine = evalLine + line + '\n';
      } else if (line.match(/<CUSTOM SKILL[ ](.*)[ ]LIMITED USES>/i)) {
        evalMode = 'customSkillLimitedUses';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM SKILL[ ](\d+)[ ]LIMITED USES>/i)) {
        var id = parseInt(RegExp.$1);
        obj.skillLimitedUsesEval[id] = evalLine;
        evalMode = 'none';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM SKILL[ ](.*)[ ]LIMITED USES>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var id = Yanfly.SkillIdRef[name] || 0;
        obj.skillLimitedUsesEval[id] = evalLine;
        evalMode = 'none';
        evalLine = '';
      } else if (evalMode === 'customSkillLimitedUses') {
        evalLine = evalLine + line + '\n';
      }
    }
  }
};

DataManager.processLSUNotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.globalUseMax = 0;
    obj.stypeUseMax = {};
    obj.skillUseMax = {};
    var evalMode = 'none';
    var evalLine = '';
    obj.globalUseMaxEval = '';
    obj.stypeUseMaxEval = {};
    obj.skillUseMaxEval = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<GLOBAL USE MAX:[ ]([\+\-]\d+)>/i)) {
        obj.globalUseMax = parseInt(RegExp.$1);
      } else if (line.match(/<STYPE[ ](\d+)[ ]USE MAX:[ ]([\+\-]\d+)>/i)) {
        obj.stypeUseMax[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<SKILL[ ](\d+)[ ]USE MAX:[ ]([\+\-]\d+)>/i)) {
        obj.skillUseMax[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<SKILL[ ](.*)[ ]USE MAX:[ ]([\+\-]\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.skillUseMax[id] = parseInt(RegExp.$2);
      } else if (line.match(/<CUSTOM GLOBAL USE MAX>/i)) {
        evalMode = 'customGlobalMaxUse';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM GLOBAL USE MAX>/i)) {
        evalMode = 'none';
        evalLine = '';
      } else if (evalMode === 'customGlobalMaxUse') {
        obj.globalUseMaxEval = obj.globalUseMaxEval + line + '\n';
      } else if (line.match(/<CUSTOM STYPE[ ](\d+)[ ]USE MAX>/i)) {
        evalMode = 'customStypeMaxUse';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM STYPE[ ](\d+)[ ]USE MAX>/i)) {
        var id = parseInt(RegExp.$1);
        obj.stypeUseMaxEval[id] = evalLine;
        evalMode = 'none';
        evalLine = '';
      } else if (evalMode === 'customStypeMaxUse') {
        evalLine = evalLine + line + '\n';
      } else if (line.match(/<CUSTOM SKILL[ ](.*)[ ]USE MAX>/i)) {
        evalMode = 'customSkillMaxUse';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM SKILL[ ](\d+)[ ]USE MAX>/i)) {
        var id = parseInt(RegExp.$1);
        obj.skillUseMaxEval[id] = evalLine;
        console.log(id);
        evalMode = 'none';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM SKILL[ ](.*)[ ]USE MAX>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var id = Yanfly.SkillIdRef[name] || 0;
        obj.skillUseMaxEval[id] = evalLine;
        evalMode = 'none';
        evalLine = '';
      } else if (evalMode === 'customSkillMaxUse') {
        evalLine = evalLine + line + '\n';
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.LSU.BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    $gameParty.recoverLimitedSkillUses(result);
    Yanfly.LSU.BattleManager_endBattle.call(this, result);
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.LSU.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    this._cacheLimitedUseMax = {};
    Yanfly.LSU.Game_BattlerBase_refresh.call(this);
};

Game_BattlerBase.prototype.initSkillLimitedUses = function() {
    this._skillLimitedUses = {};
};

Yanfly.LSU.Game_BattlerBase_meetsSkillConditions =
    Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    if (this.isSkillLimitedEmpty(skill)) return false;
    return Yanfly.LSU.Game_BattlerBase_meetsSkillConditions.call(this, skill);
};

Game_BattlerBase.prototype.isSkillLimitedUse = function(skill) {
    if (!skill) return false;
    if (Yanfly.Param.LSUBypass.contains(skill.id)) return false;
    return skill.isLimitedUse;
};

Game_BattlerBase.prototype.isSkillLimitedEmpty = function(skill) {
    if (this.isSkillLimitedUse(skill)) {
      if (this.skillLimitedUseCurrent(skill.id) <= 0) return true;
    }
    return false;
};

Game_BattlerBase.prototype.getObjLimitedUseMax = function(obj, skill) {
  if (!obj) return 0;
  var value = 0;
  if (obj.globalUseMax) value += obj.globalUseMax;
  if (obj.stypeUseMax) {
    if (obj.stypeUseMax[skill.stypeId]) value += obj.stypeUseMax[skill.stypeId];
  }
  if (obj.skillUseMax) {
    if (obj.skillUseMax[skill.id]) value += obj.skillUseMax[skill.id];
  }
  value = this.getObjLimitUseMaxEval(obj, skill, value);
  return value;
};

Game_BattlerBase.prototype.getObjLimitUseMaxEval = function(obj, skill, value) {
  var a = this;
  var user = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  if (obj.globalUseMaxEval !== '') eval(obj.globalUseMaxEval);
  if (obj.stypeUseMaxEval[skill.stypeId]) {
    eval(obj.stypeUseMaxEval[skill.stypeId]);
  }
  if (obj.skillUseMaxEval[skill.id]) {
    eval(obj.skillUseMaxEval[skill.id]);
  }
  return value;
};

Game_BattlerBase.prototype.skillLimitedUseMax = function(skillId) {
    var skill = $dataSkills[skillId];
    if (!skill) return 0;
    var value = skill.limitUses;
    return value;
};

Game_BattlerBase.prototype.skillLimitedUseCurrent = function(skillId) {
    var skill = $dataSkills[skillId];
    if (!skill) return 0;
    if (this._skillLimitedUses === undefined) this.initSkillLimitedUses();
    if (this._skillLimitedUses[skillId] === undefined) {
      this._skillLimitedUses[skillId] = 0;
    }
    var value = this.skillLimitedUseMax(skillId);
    value -= this._skillLimitedUses[skillId];
    return Math.max(0, value);
};

Yanfly.LSU.Game_BattlerBase_paySkillCost =
    Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Yanfly.LSU.Game_BattlerBase_paySkillCost.call(this, skill);
    if (!skill) return;
    if (this.isSkillLimitedUse(skill)) this.paySkillLimitedUseCost(skill.id);
};

Game_BattlerBase.prototype.paySkillLimitedUseCost = function(skillId, value) {
    var skill = $dataSkills[skillId];
    if (value === undefined) value = 1;
    if (this._skillLimitedUses === undefined) this.initSkillLimitedUses();
    if (this._skillLimitedUses[skillId] === undefined) {
      this._skillLimitedUses[skillId] = 0;
    }
    var max = this.skillLimitedUseMax(skillId);
    this._skillLimitedUses[skillId] += value;
    this.setSkillLimitedUse(skillId, this._skillLimitedUses[skillId]);
};

Game_BattlerBase.prototype.setSkillLimitedUse = function(skillId, value) {
    var skill = $dataSkills[skillId];
    if (!this.isSkillLimitedUse(skill)) return;
    if (this._skillLimitedUses === undefined) this.initSkillLimitedUses();
    var max = (value === 0) ? 0 : this.skillLimitedUseMax(skillId);
    this._skillLimitedUses[skillId] = Math.floor(value.clamp(0, max));
};

Yanfly.LSU.Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function() {
    Yanfly.LSU.Game_BattlerBase_recoverAll.call(this);
    this.recoverAllLimitedSkillUses();
};

Game_BattlerBase.prototype.recoverAllLimitedSkillUses = function() {
    if (!this.isActor()) return;
    var length = this.skills().length;
    for (var i = 0; i < length; ++i) {
      var skill = this.skills()[i];
      if (!skill) continue;
    if (!this.isSkillLimitedUse(skill)) continue;
      if (skill.limitRecoverAllUses) this.setSkillLimitedUse(skill.id, 0);
    }
};

Game_BattlerBase.prototype.recoverLimitedSkillUsesBattle = function(result) {
    var length = this.skills().length;
    for (var i = 0; i < length; ++i) {
      var skill = this.skills()[i];
      if (!skill) continue;
    if (!this.isSkillLimitedUse(skill)) continue;
      var value = this.skillLimitedUseRecovery(skill.id, result);
      this.paySkillLimitedUseCost(skill.id, -value)
    }
};

Game_BattlerBase.prototype.skillLimitedUseRecovery = function(skillId, result) {
    var skill = $dataSkills[skillId];
    if (!skill) return 0;
    if (!this.isSkillLimitedUse(skill)) return 0;
    var value = skill.limitBattleRecover[result];
    return value;
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.LSU.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    Yanfly.LSU.Game_Battler_initMembers.call(this);
    this.initSkillLimitedUses();
};

Game_Battler.prototype.alterLimitedUses = function(item, user) {
    var length = this.skills().length;
    for (var i = 0; i < length; ++i) {
      var skill = this.skills()[i];
      if (!skill) continue;
      if (!this.isSkillLimitedUse(skill)) continue;
      var value = this.getAlterLimitedUses(item, user, skill);
      this.paySkillLimitedUseCost(skill.id, -value);
    }
};

Game_Battler.prototype.getAlterLimitedUses = function(item, user, skill) {
    var value = item.globalLimitedUses;
    if (item.stypeLimitedUses[skill.stypeId]) {
      value += item.stypeLimitedUses[skill.stypeId];
    }
    if (item.skillLimitedUses[skill.id]) {
      value += item.skillLimitedUses[skill.id];
    }
    value = this.getAltLimitUseEval(item, user, skill, value);
    return value;
};

Game_Battler.prototype.getAltLimitUseEval = function(obj, user, skill, value) {
  var item = obj;
  var a = this;
  var user = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  if (obj.globalLimitedUsesEval !== '') eval(obj.globalLimitedUsesEval);
  if (obj.stypeLimitedUsesEval[skill.stypeId]) {
    eval(obj.stypeLimitedUsesEval[skill.stypeId]);
  }
  if (obj.skillLimitedUsesEval[skill.id]) {
    eval(obj.skillLimitedUsesEval[skill.id]);
  }
  return value;
};

Game_Battler.prototype.skillLimitedUseMax = function(skillId) {
  var skill = $dataSkills[skillId];
  if (!skill) return 0;
  var value = Game_BattlerBase.prototype.skillLimitedUseMax.call(this, skillId);
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    value += this.getObjLimitedUseMax(obj, skill);
  }
  return value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.skillLimitedUseMax = function(skillId) {
  var skill = $dataSkills[skillId];
  if (!skill) return 0;
  if (this._cacheLimitedUseMax[skillId] !== undefined) {
    return this._cacheLimitedUseMax[skillId];
  }
  var value = Game_Battler.prototype.skillLimitedUseMax.call(this, skillId);
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    value += this.getObjLimitedUseMax(obj, skill);
  }
  value += this.getObjLimitedUseMax(this.actor(), skill);
  value += this.getObjLimitedUseMax(this.currentClass(), skill);
  value = value.clamp(0, Yanfly.Param.LimitedAbsMax)
  this._cacheLimitedUseMax[skillId] = value;
  return this._cacheLimitedUseMax[skillId];
};

//=============================================================================
// Game_Enemy
//=============================================================================

if (!Game_Enemy.prototype.skills) {
    Game_Enemy.prototype.skills = function() {
      var skills = []
      for (var i = 0; i < this.enemy().actions.length; ++i) {
        var skill = $dataSkills[this.enemy().actions[i].skillId]
        if (skill) skills.push(skill);
      }
      return skills;
    }
};

Game_Enemy.prototype.skillLimitedUseMax = function(skillId) {
  var skill = $dataSkills[skillId];
  if (!skill) return 0;
  if (this._cacheLimitedUseMax[skillId] !== undefined) {
    return this._cacheLimitedUseMax[skillId];
  }
  var value = Game_Battler.prototype.skillLimitedUseMax.call(this, skillId);
  value += this.getObjLimitedUseMax(this.enemy(), skill);
  value = value.clamp(0, Yanfly.Param.LimitedAbsMax)
  this._cacheLimitedUseMax[skillId] = value;
  return this._cacheLimitedUseMax[skillId];
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.LSU.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.LSU.Game_Action_applyItemUserEffect.call(this, target);
    if (target && this.item()) {
      target.alterLimitedUses(this.item(), this.subject());
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.recoverLimitedSkillUses = function(result) {
    var length = this.allMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = this.allMembers()[i];
      if (member) member.recoverLimitedSkillUsesBattle(result);
    }
};

//=============================================================================
// Window_SkillList
//=============================================================================

Yanfly.LSU.Window_SkillList_drawSkillCost =
    Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, wx, wy, width) {
    if (skill && this._actor.isSkillLimitedEmpty(skill)) {
      return this.drawSkillLimitEmpty(skill, wx, wy, width);
    }
    return Yanfly.LSU.Window_SkillList_drawSkillCost.call(this, skill, wx,
      wy, width);
};

Window_SkillList.prototype.drawSkillLimitEmpty = function(skill, wx, wy, ww) {
    if (Yanfly.Icon.LimitedEmpty > 0) {
      var iw = wx + ww - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.LimitedEmpty, iw, wy + 2);
      ww -= Window_Base._iconWidth + 2;
    }
    this.contents.fontSize = Yanfly.Param.LSUFontSize;
    this.changeTextColor(this.textColor(Yanfly.Param.LSUTextColor));
    var text = Yanfly.Param.LSUEmpty;
    this.drawText(text, wx, wy, ww, 'right');
    var returnWidth = ww - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetTextColor();
    this.resetFontSettings();
    return returnWidth;
};

Yanfly.LSU.Window_SkillList_dOC = Window_SkillList.prototype.drawOtherCost;
Window_SkillList.prototype.drawOtherCost = function(skill, wx, wy, dw) {
    dw = this.drawLimitedSkillUses(skill, wx, wy, dw);
    return Yanfly.LSU.Window_SkillList_dOC.call(this, skill, wx, wy, dw);
};

Window_SkillList.prototype.drawLimitedSkillUses = function(skill, wx, wy, dw) {
    if (!this._actor.isSkillLimitedUse(skill)) return dw;
    if (Yanfly.Param.LSUFormat === '') return dw;
    if (Yanfly.Icon.LimitedUse > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.LimitedUse, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.contents.fontSize = Yanfly.Param.LSUFontSize;
    this.changeTextColor(this.textColor(Yanfly.Param.LSUTextColor));
    var fmt = Yanfly.Param.LSUFormat;
    var current = this._actor.skillLimitedUseCurrent(skill.id);
    current = Yanfly.Util.toGroup(current);
    var max = this._actor.skillLimitedUseMax(skill.id);
    max = Yanfly.Util.toGroup(max);
    var text = fmt.format(current, max);
    this.contents.fontSize = Yanfly.Param.LSUFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetTextColor();
    this.resetFontSettings();
    return returnWidth;
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