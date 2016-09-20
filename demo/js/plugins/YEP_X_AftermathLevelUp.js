//=============================================================================
// Yanfly Engine Plugins - Victory Aftermath Extension - Aftermath Level Up
// YEP_X_AftermathLevelUp.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_AftermathLevelUp = true;

var Yanfly = Yanfly || {};
Yanfly.ALU = Yanfly.ALU || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_VictoryAftermath.js) Adds a level up
 * portion to the Victory Aftermath sequences.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Level Up Title
 * @desc This is the text that appears in the title for level up.
 * %1 - Actor's Name    %2 - Level
 * @default %1 has reached Level %2!
 *
 * @param Enable Aftermath
 * @desc Enables/disables the level up portion by default.
 * NO - false     YES - true
 * @default true
 *
 * @param Font Size
 * @desc This is the font size used to display stat comparisons.
 * Default: 28
 * @default 28
 *
 * @param ---Skill Learn---
 * @default
 *
 * @param Skill Text Singular
 * @desc Text used to display learned skills singular.
 * @default Acquired Skill
 *
 * @param Skill Text Plural
 * @desc Text used to display learned skills plural.
 * @default Acquired Skills
 *
 * @param Skill List Width
 * @desc The pixel width of the skill list if it appears.
 * @default 200
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_VictoryAftermath.
 * Make sure this plugin is located under YEP_VictoryAftermath in the plugin
 * list.
 *
 * This adds a level up section to the Victory Aftermath sequence to show the
 * individual parameter changes the actor has acquired in addition to skills
 * that the actor may have learned. This segment will be omitted if there are
 * no actors to level up or if the game has the segment disabled. When there
 * are multiple actors leveling up, the Victory Aftermath will cycle through
 * each of the actors.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * While this plugin is plug and play (and doesn't require much change), if you
 * wish to change the order of when the level up process occurs, insert 'level'
 * in the 'Victory Order' parameter within the Victory Aftermath plugin's
 * parameters at the location to appear.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * You can use these plugin commands to adjust whether or not the Level Up
 * portion of the Victory Aftermath will occur.
 *
 * Plugin Command:
 * 
 *   ShowVictoryLevelUp
 *   This will cause the level up segment of the Victory Aftermath to appear if
 *   there is an actor that leveled up in the current battle.
 *
 *   HideVictoryLevelUp
 *   This will cause the level up segment of the Victory Aftermath to not
 *   appear at all regardless of any actors leveling up in that battle.
 */
//=============================================================================

if (Imported.YEP_VictoryAftermath) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_AftermathLevelUp');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ALUTitleFmt = String(Yanfly.Parameters['Level Up Title']);
Yanfly.Param.ALUEnable = eval(String(Yanfly.Parameters['Enable Aftermath']));
Yanfly.Param.ALUFontSize = Number(Yanfly.Parameters['Font Size']);

Yanfly.Param.ALUSkillSing = String(Yanfly.Parameters['Skill Text Singular']);
Yanfly.Param.ALUSkillPlur = String(Yanfly.Parameters['Skill Text Plural']);
Yanfly.Param.ALUSkillWidth = Number(Yanfly.Parameters['Skill List Width']);

Yanfly.Param.VAShowSkills = false;

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ALU.BattleManager_prepareVictoryInfo =
    BattleManager.prepareVictoryInfo;
BattleManager.prepareVictoryInfo = function() {
    this.prepareVictoryPreLevel();
    Yanfly.ALU.BattleManager_prepareVictoryInfo.call(this);
    this.prepareVictoryPostLevel();
};

BattleManager.prepareVictoryPreLevel = function() {
    var length = $gameParty.allMembers().length;
    this._leveledActors = [];
    for (var i = 0; i < length; ++i) {
      var actor = $gameParty.allMembers()[i];
      if (!actor) continue;
      actor._preVictoryLv = actor._level;
      actor._preVictoryParams = [];
      actor._preVictoryParams.push(actor.mhp);
      actor._preVictoryParams.push(actor.mmp);
      actor._preVictoryParams.push(actor.atk);
      actor._preVictoryParams.push(actor.def);
      actor._preVictoryParams.push(actor.mat);
      actor._preVictoryParams.push(actor.mdf);
      actor._preVictoryParams.push(actor.agi);
      actor._preVictoryParams.push(actor.luk);
    }
};

BattleManager.prepareVictoryPostLevel = function() {
    var length = $gameParty.allMembers().length;
    for (var i = 0; i < length; ++i) {
      var actor = $gameParty.allMembers()[i];
      if (!actor) continue;
      if (actor._preVictoryLv === actor._level) continue;
      this._leveledActors.push(actor);
      actor._postVictoryParams = [];
      actor._postVictoryParams.push(actor.mhp);
      actor._postVictoryParams.push(actor.mmp);
      actor._postVictoryParams.push(actor.atk);
      actor._postVictoryParams.push(actor.def);
      actor._postVictoryParams.push(actor.mat);
      actor._postVictoryParams.push(actor.mdf);
      actor._postVictoryParams.push(actor.agi);
      actor._postVictoryParams.push(actor.luk);
    }
};

BattleManager.aftermathLeveledActors = function() {
    return this._leveledActors;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.ALU.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.ALU.Game_System_initialize.call(this);
    this.initAftermathLevelUp();
};

Game_System.prototype.initAftermathLevelUp = function() {
    this._aftermathLevelUp = Yanfly.Param.ALUEnable;
};

Game_System.prototype.isShowAftermathLevelUp = function() {
    if (this._aftermathLevelUp === undefined) this.initAftermathLevelUp();
    return this._aftermathLevelUp;
};

Game_System.prototype.setShowAftermathLevelUp = function(value) {
    if (this._aftermathLevelUp === undefined) this.initAftermathLevelUp();
    this._aftermathLevelUp = value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.ALU.Game_Actor_clearVictoryData = Game_Actor.prototype.clearVictoryData;
Game_Actor.prototype.clearVictoryData = function() {
    Yanfly.ALU.Game_Actor_clearVictoryData.call(this);
    this._preVictoryParams = undefined;
    this._postVictoryParams = undefined;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.ALU.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.ALU.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowVictoryLevelUp') {
    $gameSystem.setShowAftermathLevelUp(true);
  }
  if (command === 'HideVictoryLevelUp') {
    $gameSystem.setShowAftermathLevelUp(false);
  }
};

//=============================================================================
// Window_VictoryLevelUp
//=============================================================================

function Window_VictoryLevelUp() {
    this.initialize.apply(this, arguments);
}

Window_VictoryLevelUp.prototype = Object.create(Window_Base.prototype);
Window_VictoryLevelUp.prototype.constructor = Window_VictoryLevelUp;

Window_VictoryLevelUp.prototype.initialize = function(actor) {
    var wy = this.fittingHeight(1);
    var ww = this.windowWidth();
    var wh = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, wy, ww, wh);
    this.openness = 0;
    this.setActor(actor);
};

Window_VictoryLevelUp.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_VictoryLevelUp.prototype.windowHeight = function() {
    return Graphics.boxHeight - this.fittingHeight(1);
};

Window_VictoryLevelUp.prototype.createPresets = function() {
  var actor = this._actor;
  this.contents.fontSize = Yanfly.Param.ALUFontSize;
  this._paramNameWidth = this.textWidth(TextManager.level);
  this._paramValueWidth = this.textWidth(Yanfly.Util.toGroup(actor.maxLevel()));
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
  var validArea = this.itemRect(0).width;
  if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth +
    this._bonusValueWidth > validArea) this._bonusValueWidth = 0;
};

Window_VictoryLevelUp.prototype.setActor = function(actor) {
    this._actor = actor;
    this.createPresets();
    this.refresh();
};

Window_VictoryLevelUp.prototype.refresh = function() {
    this.contents.clear();
    var bitmap = ImageManager.loadFace(this._actor.faceName());
    if (bitmap.width <= 0) return setTimeout(this.refresh.bind(this), 5);
    this.resetFontSettings();
    this.resetTextColor();
    this.drawActorAppearance();
    this.drawDarkRects();
    this.drawStatChanges();
    this.drawLearnedSkillsTitle();
};

Window_VictoryLevelUp.prototype.widthArea = function() {
    if (this._widthArea) return this._widthArea;
    var widthArea = Yanfly.Param.ALUSkillWidth + this.standardPadding() * 2;
    var ww = Window_Base._faceWidth;
    this._widthArea = Math.max(ww, widthArea);
    return this._widthArea;
};

Window_VictoryLevelUp.prototype.drawActorAppearance = function() {
    var widthArea = this.widthArea();
    var ww = Window_Base._faceWidth;
    var wh = Window_Base._faceHeight;
    var wx = (widthArea - ww) / 2;
    var wy = 0;
    this.drawActorFace(this._actor, wx, wy, ww, wh);
    var text = this._actor.name();
    this.drawText(text, 0, wh, widthArea, 'center');
    this.changeTextColor(this.powerUpColor());
    var text = '+' + Yanfly.Util.toGroup(this._actor._expGained) + ' ';
    text += TextManager.exp;
    this.drawText(text, 0, wh + this.lineHeight(), widthArea, 'center');
};

Window_VictoryLevelUp.prototype.drawDarkRects = function() {
    for (var i = 0; i < 9; ++i) {
      var rect = this.itemRect(i);
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    }
};

Window_VictoryLevelUp.prototype.itemRect = function(index) {
  var rect = new Rectangle();
  rect.x = Yanfly.Param.ALUSkillWidth + this.standardPadding() * 2;
  rect.y = index * this.lineHeight();
  rect.width = this.contents.width;
  rect.width -= this.widthArea() * 2;
  rect.height = this.lineHeight();
  return rect;
};

Window_VictoryLevelUp.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_VictoryLevelUp.prototype.drawStatChanges = function() {
    this.contents.fontSize = Yanfly.Param.ALUFontSize;
    for (var i = 0; i < 9; ++i) {
      var rect = this.itemRect(i);
      this.drawRightArrow(rect);
      this.drawParamName(i, rect);
      this.drawCurrentParam(i, rect);
      this.drawNewParam(i, rect);
      this.drawParamDifference(i, rect);
    }
};

Window_VictoryLevelUp.prototype.drawParamName = function(index, rect) {
    var x = rect.x + this.textPadding();
    var y = rect.y;
    if (index === 0) {
      var text = TextManager.level;
    } else {
      var text = TextManager.param(index - 1);
    }
    this.changeTextColor(this.systemColor());
    this.drawText(text, x, y, this._paramNameWidth);
};

Window_VictoryLevelUp.prototype.drawRightArrow = function(rect) {
    var x = rect.width + this.textPadding() + rect.x;
    var y = rect.y;
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
};

Window_VictoryLevelUp.prototype.drawCurrentParam = function(index, rect) {
    var x = rect.width - this.textPadding() + rect.x;
    var y = rect.y;
    x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
    this.resetTextColor();
    if (index === 0) {
      var text = Yanfly.Util.toGroup(this._actor._preVictoryLv);
    } else {
      var text = Yanfly.Util.toGroup(this._actor._preVictoryParams[index - 1]);
    }
    this.drawText(text, x, y, this._paramValueWidth, 'right');
};

Window_VictoryLevelUp.prototype.drawNewParam = function(index, rect) {
    var x = rect.width - this.textPadding() + rect.x;
    x -= this._paramValueWidth + this._bonusValueWidth;
    var y = rect.y;
    if (index === 0) {
      var newValue = this._actor.level;
      var diffvalue = newValue - this._actor._preVictoryLv;
    } else {
      var newValue = this._actor._postVictoryParams[index - 1];
      var diffvalue = newValue - this._actor._preVictoryParams[index - 1];
    }
    var text = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(text, x, y, this._paramValueWidth, 'right');
};

Window_VictoryLevelUp.prototype.drawParamDifference = function(index, rect) {
    if (this._bonusValueWidth <= 0) return;
    var x = rect.width - this.textPadding() + rect.x;
    x -= this._bonusValueWidth;
    var y = rect.y;
    if (index === 0) {
      var newValue = this._actor.level;
      var diffvalue = newValue - this._actor._preVictoryLv;
    } else {
      var newValue = this._actor._postVictoryParams[index - 1];
      var diffvalue = newValue - this._actor._preVictoryParams[index - 1];
    }
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

Window_VictoryLevelUp.prototype.drawLearnedSkillsTitle = function() {
    var total = this._actor._victorySkills.length;
    if (total <= 0) return;
    this.resetFontSettings();
    this.resetTextColor();
    this.changeTextColor(this.systemColor());
    if (total > 1) {
      var text = Yanfly.Param.ALUSkillPlur;
    } else {
      var text = Yanfly.Param.ALUSkillSing;
    }
    var rect = this.itemRect(0);
    var wx = rect.x + rect.width;
    var wy = 0;
    this.drawText(text, wx, wy, this.widthArea(), 'center');
};

//=============================================================================
// Window_VictorySkills
//=============================================================================

function Window_VictorySkills() {
    this.initialize.apply(this, arguments);
}

Window_VictorySkills.prototype = Object.create(Window_Selectable.prototype);
Window_VictorySkills.prototype.constructor = Window_VictorySkills;

Window_VictorySkills.prototype.initialize = function(actor) {
    var ww = this.windowWidth();
    var wx = Graphics.boxWidth - ww;
    var wh = this.windowHeight();
    var wy = Graphics.boxHeight - wh;
    Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
    this.opacity = 0;
    this.openness = 0;
    this.setActor(actor);
};

Window_VictorySkills.prototype.windowWidth = function() {
    if (this._widthArea) return this._widthArea;
    var widthArea = Yanfly.Param.ALUSkillWidth + this.standardPadding() * 3;
    var ww = Window_Base._faceWidth;
    this._widthArea = Math.max(ww, widthArea);
    return this._widthArea;
};

Window_VictorySkills.prototype.windowHeight = function() {
    var value = Graphics.boxHeight;
    value -= this.fittingHeight(1);
    value -= this.lineHeight();
    return value;
};

Window_VictorySkills.prototype.setActor = function(actor) {
    this._actor = actor;
    this.select(0);
    if (this._actor._victorySkills.length <= 0) this.select(-1);
    this.activate();
    this.refresh();
};

Window_VictorySkills.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_VictorySkills.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_VictorySkills.prototype.makeItemList = function() {
    this._data = this._actor._victorySkills.slice();
};

Window_VictorySkills.prototype.drawItem = function(index) {
    var item = $dataSkills[this._data[index]];
    if (!item) return;
    var rect = this.itemRect(index);
    this.drawItemName(item, rect.x, rect.y, rect.width);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.ALU.Scene_Battle_addCustomVictorySteps =
    Scene_Battle.prototype.addCustomVictorySteps;
Scene_Battle.prototype.addCustomVictorySteps = function(array) {
    array = Yanfly.ALU.Scene_Battle_addCustomVictorySteps.call(this, array);
    if (!array.contains('LEVEL')) array.push('LEVEL');
    return array;
};

Yanfly.ALU.Scene_Battle_updateVictorySteps =
    Scene_Battle.prototype.updateVictorySteps;
Scene_Battle.prototype.updateVictorySteps = function() {
    Yanfly.ALU.Scene_Battle_updateVictorySteps.call(this);
    if (this.isVictoryStep('LEVEL')) this.updateVictoryLevelUp();
};

Scene_Battle.prototype.updateVictoryLevelUp = function() {
    if (!this._victoryLevelWindow) {
      this.createVictoryLevelUp();
    } else if (this.victoryTriggerContinue()) {
      this.continueVictoryLevelUp();
    }
};

Scene_Battle.prototype.createVictoryLevelUp = function() {
    if (this.meetVictoryLevelUpConditions()) {
      this.setupNextAftermathLevelUpActor();
    } else {
      this.processNextVictoryStep();
    }
};

Scene_Battle.prototype.meetVictoryLevelUpConditions = function() {
    if (!$gameSystem.isShowAftermathLevelUp()) return false;
    return BattleManager.aftermathLeveledActors().length > 0;
};

Scene_Battle.prototype.continueVictoryLevelUp = function() {
    if (this.meetVictoryLevelUpConditions()) {
      SoundManager.playOk();
      this.setupNextAftermathLevelUpActor();
    } else {
      this.finishVictoryLevelUp();
    }
};

Scene_Battle.prototype.finishVictoryLevelUp = function() {
    SoundManager.playOk();
    this._victoryLevelWindow.close();
    this._victorySkillWindow.close();
    this._victorySkillWindow.deactivate();
    this.processNextVictoryStep();
};

Scene_Battle.prototype.setupNextAftermathLevelUpActor = function() {
    this._levelUpActor = BattleManager.aftermathLeveledActors().shift();
    var fmt = Yanfly.Param.ALUTitleFmt;
    var text = fmt.format(this._levelUpActor.name(), this._levelUpActor.level);
    this._victoryTitleWindow.refresh(text);
    if (!this._victoryLevelWindow) {
      this._victoryLevelWindow = new Window_VictoryLevelUp(this._levelUpActor);
      this.addWindow(this._victoryLevelWindow);
      this._victoryLevelWindow.open();
      this._victorySkillWindow = new Window_VictorySkills(this._levelUpActor);
      this.addChild(this._victorySkillWindow);
      this._victorySkillWindow.open();
    } else {
      this._victoryLevelWindow.setActor(this._levelUpActor);
      this._victorySkillWindow.setActor(this._levelUpActor);
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

//=============================================================================
// End of File
//=============================================================================
}; // Imported.YEP_VictoryAftermath