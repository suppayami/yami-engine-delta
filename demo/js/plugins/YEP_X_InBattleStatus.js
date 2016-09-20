//=============================================================================
// Yanfly Engine Plugins - In-Battle Status
// YEP_X_InBattleStatus.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_InBattleStatus = true;

var Yanfly = Yanfly || {};
Yanfly.IBS = Yanfly.IBS || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_BattleEngineCore.js) Adds a 'Status'
 * option in the Party Window in battle.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Command Text
 * @desc The text used for 'Status' command text in the Party Window.
 * @default Status
 *
 * @param Show Command
 * @desc Show the in battle 'Status' command by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Window X
 * @desc The default X location used for the in-battle status window.
 * You can use formulas.
 * @default 0
 *
 * @param Window Y
 * @desc The default Y location used for the in-battle status window.
 * You can use formulas.
 * @default this.fittingHeight(2)
 *
 * @param Window Width
 * @desc The default width used for the in-battle status window.
 * You can use formulas.
 * @default Graphics.boxWidth
 *
 * @param Window Height
 * @desc The default height used for the in-battle status window.
 * You can use formulas.
 * @default Graphics.boxHeight - this.fittingHeight(2) - this.fittingHeight(4)
 *
 * @param ---Status List---
 * @default
 *
 * @param Status Width
 * @desc The width of the status list.
 * You can use formulas.
 * @default Math.max(312, Graphics.boxWidth / 4);
 *
 * @param State Help Front
 * @desc Text placed in front of each state's help description.
 * %1 - State Icon     %2 - State Name
 * @default \i[%1]%2
 *
 * @param State Help End
 * @desc Text placed in end of each state's help description.
 * %1 - State Icon     %2 - State Name
 * @default
 *
 * @param Healthy Icon
 * @desc Icon ID used to indicate the battler is healthy (no states).
 * @default 127
 *
 * @param Healthy Text
 * @desc Text used to label the healthy status.
 * @default Healthy
 *
 * @param Healthy Help
 * @desc Text displayed in help window when selected.
 * @default User is currently unaffected by status effects.
 *
 * @param ---Buffs List---
 * @default
 *
 * @param MaxHP Buff Text
 * @desc The text used to display the MaxHP Buff Name.
 * @default MaxHP Up
 *
 * @param MaxHP Buff Help
 * @desc The text used for the MaxHP help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Raises Maximum Health to %1%.
 *
 * @param MaxMP Buff Text
 * @desc The text used to display the MaxMP Buff Name.
 * @default MaxMP Up
 *
 * @param MaxMP Buff Help
 * @desc The text used for the MaxMP help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Raises Maximum Mana to %1%.
 *
 * @param ATK Buff Text
 * @desc The text used to display the ATK Buff Name.
 * @default ATK Up
 *
 * @param ATK Buff Help
 * @desc The text used for the ATK help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Raises Attack to %1%.
 *
 * @param DEF Buff Text
 * @desc The text used to display the DEF Buff Name.
 * @default DEF Up
 *
 * @param DEF Buff Help
 * @desc The text used for the DEF help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Raises Defense to %1%.
 *
 * @param MAT Buff Text
 * @desc The text used to display the MAT Buff Name.
 * @default MAT Up
 *
 * @param MAT Buff Help
 * @desc The text used for the MAT help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Raises Magic Attack to %1%.
 *
 * @param MDF Buff Text
 * @desc The text used to display the MDF Buff Name.
 * @default MDF Up
 *
 * @param MDF Buff Help
 * @desc The text used for the MDF help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Raises Magic Defense to %1%.
 *
 * @param AGI Buff Text
 * @desc The text used to display the AGI Buff Name.
 * @default AGI Up
 *
 * @param AGI Buff Help
 * @desc The text used for the AGI help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Raises Agility to %1%.
 *
 * @param LUK Buff Text
 * @desc The text used to display the LUK Buff Name.
 * @default LUK Up
 *
 * @param LUK Buff Help
 * @desc The text used for the LUK help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Raises Luck to %1%.
 *
 * @param ---Debuffs List---
 * @default
 *
 * @param MaxHP Debuff Text
 * @desc The text used to display the MaxHP Debuff Name.
 * @default MaxHP Down
 *
 * @param MaxHP Debuff Help
 * @desc The text used for the MaxHP help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Lowers Maximum Health to %1%.
 *
 * @param MaxMP Debuff Text
 * @desc The text used to display the MaxMP Debuff Name.
 * @default MaxMP Down
 *
 * @param MaxMP Debuff Help
 * @desc The text used for the MaxMP help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Lowers Maximum Mana to %1%.
 *
 * @param ATK Debuff Text
 * @desc The text used to display the ATK Debuff Name.
 * @default ATK Down
 *
 * @param ATK Debuff Help
 * @desc The text used for the ATK help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Lowers Attack to %1%.
 *
 * @param DEF Debuff Text
 * @desc The text used to display the DEF Debuff Name.
 * @default DEF Down
 *
 * @param DEF Debuff Help
 * @desc The text used for the DEF help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Lowers Defense to %1%.
 *
 * @param MAT Debuff Text
 * @desc The text used to display the MAT Debuff Name.
 * @default MAT Down
 *
 * @param MAT Debuff Help
 * @desc The text used for the MAT help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Lowers Magic Attack to %1%.
 *
 * @param MDF Debuff Text
 * @desc The text used to display the MDF Debuff Name.
 * @default MDF Down
 *
 * @param MDF Debuff Help
 * @desc The text used for the MDF help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Lowers Magic Defense to %1%.
 *
 * @param AGI Debuff Text
 * @desc The text used to display the AGI Debuff Name.
 * @default AGI Down
 *
 * @param AGI Debuff Help
 * @desc The text used for the AGI help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Lowers Agility to %1%.
 *
 * @param LUK Debuff Text
 * @desc The text used to display the LUK Debuff Name.
 * @default LUK Down
 *
 * @param LUK Debuff Help
 * @desc The text used for the LUK help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default Lowers Luck to %1%.
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_BattleEngineCore. Make sure this plugin is located
 * under YEP_BattleEngineCore in the plugin list.
 *
 * In battle by default, there's no way to check your party's status. This
 * plugin will add a new 'Status' command to the Party Command Window (with
 * Fight and Escape) to allow players to check party members. Here, the player
 * can view each party member's current parameters, get a list of all states,
 * buffs, and debuffs. The player can scroll through the list and view newly
 * added help descriptions of the states, buffs, and debuffs in a help window.
 *
 * *Note: If you are using YEP_X_BattleSysCTB.js, place this plugin under that
 * plugin for the best compatibility results.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * For those who would like to add help descriptions to states, use these
 * following notetags:
 *
 * State Notetags:
 *
 *   <Help Description>
 *    text
 *    text
 *   </Help Description>
 *   - This will set the help description of the state to the text used in the
 *   notetag. You can use text codes.
 *
 * ============================================================================
 * Text Codes
 * ============================================================================
 *
 * By using certain text codes in your messages, you can have the game replace
 * them with the following:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * State Help     Function
 *   \th[x]       - Replaced by the text used in state x's help description.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * For those who would like to change whether the 'Status' option is shown or
 * hidden midway through the game, you can use the following plugin commands:
 *
 * Plugin Commands:
 *
 *   ShowInBattleStatus
 *   - This will cause the 'Status' command to show.
 *
 *   HideInBattleStatus
 *   - This will cause the 'Status' command to not show.
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_InBattleStatus');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IBSCmdName = String(Yanfly.Parameters['Command Text']);
Yanfly.Param.IBSCmdShow = eval(String(Yanfly.Parameters['Show Command']));
Yanfly.Param.IBSWinX = String(Yanfly.Parameters['Window X']);
Yanfly.Param.IBSWinY = String(Yanfly.Parameters['Window Y']);
Yanfly.Param.IBSWinWidth = String(Yanfly.Parameters['Window Width']);
Yanfly.Param.IBSWinHeight = String(Yanfly.Parameters['Window Height']);

Yanfly.Param.IBSStatusListWidth = String(Yanfly.Parameters['Status Width']);
Yanfly.Param.IBSStateHelp1 = String(Yanfly.Parameters['State Help Front']);
Yanfly.Param.IBSStateHelp2 = String(Yanfly.Parameters['State Help End']);
Yanfly.Param.IBSHealthyIcon = Number(Yanfly.Parameters['Healthy Icon']);
Yanfly.Param.IBSHealthyText = String(Yanfly.Parameters['Healthy Text']);
Yanfly.Param.IBSHealthyHelp = String(Yanfly.Parameters['Healthy Help']);

Yanfly.Param.IBSBuffText = [];
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['MaxHP Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['MaxMP Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['ATK Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['DEF Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['MAT Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['MDF Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['AGI Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['LUK Buff Text']));
Yanfly.Param.IBSBuffHelp = [];
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['MaxHP Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['MaxMP Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['ATK Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['DEF Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['MAT Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['MDF Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['AGI Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['LUK Buff Help']));

Yanfly.Param.IBSDebuffText = [];
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['MaxHP Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['MaxMP Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['ATK Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['DEF Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['MAT Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['MDF Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['AGI Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['LUK Debuff Text']));
Yanfly.Param.IBSDebuffHelp = [];
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['MaxHP Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['MaxMP Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['ATK Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['DEF Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['MAT Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['MDF Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['AGI Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['LUK Debuff Help']));

//=============================================================================
// DataManager
//=============================================================================

Yanfly.IBS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.IBS.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_InBattleStatus) {
    this.processIBSNotetags1($dataStates);
    Yanfly._loaded_YEP_X_InBattleStatus = true;
  }
  
  return true;
};

DataManager.processIBSNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var fmt1 = Yanfly.Param.IBSStateHelp1;
    obj.description = fmt1.format(obj.iconIndex, obj.name);
    var descLength = obj.description.length;
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i)) {
        evalMode = 'help description';
      } else if (line.match(/<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'help description') {
        if (obj.description.length > descLength) obj.description += '\n';
        obj.description += line;
      }
    }

    var fmt2 = Yanfly.Param.IBSStateHelp2;
    obj.description += fmt2.format(obj.iconIndex, obj.name);
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.IBS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.IBS.Game_System_initialize.call(this);
  this.initIBSSettings();
};

Game_System.prototype.initIBSSettings = function() {
  this._showInBattleStatus = Yanfly.Param.IBSCmdShow;
};

Game_System.prototype.isShowInBattleStatus = function() {
  if (this._showInBattleStatus === undefined) this.initIBSSettings();
  return this._showInBattleStatus;
};

Game_System.prototype.setShowInBattleStatus = function(value) {
  if (this._showInBattleStatus === undefined) this.initIBSSettings();
  this._showInBattleStatus = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.IBS.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.IBS.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowInBattleStatus') {
    $gameSystem.setShowInBattleStatus(true);
  } else if (command === 'HideInBattleStatus') {
    $gameSystem.setShowInBattleStatus(false);
  }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.IBS.Window_Base_convertEscapeCharacters =
  Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
  text = this.convertStateHelpText(text);
  return Yanfly.IBS.Window_Base_convertEscapeCharacters.call(this, text);
};

Window_Base.prototype.convertStateHelpText = function(text) {
  text = text.replace(/\\V\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\\V\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\\TH\[(\d+)\]/gi, function() {
    return $dataStates[parseInt(arguments[1])].description;
  }.bind(this));
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bTH\[(\d+)\]/gi, function() {
    return $dataStates[parseInt(arguments[1])].description;
  }.bind(this));
  return text;
};

if (Imported.YEP_X_MessageMacros1) {

Yanfly.IBS.Window_Base_convertMacroText =
    Window_Base.prototype.convertMacroText;
Window_Base.prototype.convertMacroText = function(text) {
  text = Yanfly.IBS.Window_Base_convertMacroText.call(this, text);
  text = this.convertStateHelpText(text);
  return text;
};

}; // Imported.YEP_X_MessageMacros1

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.addCommandAt = function(index, name, symbol, en, ext) {
  if (en === undefined) enabled = true;
  if (ext === undefined) ext = null;
  var obj = { name: name, symbol: symbol, enabled: en, ext: ext};
  this._list.splice(index, 0, obj);
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Yanfly.IBS.Window_PartyCommand_makeCommandList =
  Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  Yanfly.IBS.Window_PartyCommand_makeCommandList.call(this);
  this.makeInBattleStatusCommand();
};

Window_PartyCommand.prototype.makeInBattleStatusCommand = function() {
  if (!$gameSystem.isShowInBattleStatus()) return;
  var index = this.findSymbol('escape');
  var text = Yanfly.Param.IBSCmdName;
  this.addCommandAt(index, text, 'inBattleStatus', true);
};

//=============================================================================
// Window_InBattleStatus
//=============================================================================

function Window_InBattleStatus() {
    this.initialize.apply(this, arguments);
}

Window_InBattleStatus.prototype = Object.create(Window_Base.prototype);
Window_InBattleStatus.prototype.constructor = Window_InBattleStatus;

Window_InBattleStatus.prototype.initialize = function() {
  var x = eval(Yanfly.Param.IBSWinX);
  var y = eval(Yanfly.Param.IBSWinY);
  var w = eval(Yanfly.Param.IBSWinWidth);
  var h = eval(Yanfly.Param.IBSWinHeight);
  this._battler = $gameParty.battleMembers()[0];
  Window_Base.prototype.initialize.call(this, x, y, w, h);
  this.hide();
};

Window_InBattleStatus.prototype.setBattler = function(battler) {
  this._battler = battler;
  this.refresh();
};

Window_InBattleStatus.prototype.refresh = function() {
  this.contents.clear();
  if (!this._battler) return;
  var x = this.standardPadding() + eval(Yanfly.Param.IBSStatusListWidth);
  this.drawActorFace(this._battler, x, 0, Window_Base._faceWidth);
  var x2 = x + Window_Base._faceWidth + this.standardPadding();
  var w = this.contents.width - x2;
  this.drawActorSimpleStatus(this._battler, x2, 0, w);
  w = this.contents.width - x;
  var y = Math.ceil(this.lineHeight() * 4.5);
  var h = this.contents.height - y;
  if (h >= this.lineHeight() * 6) {
    for (var i = 2; i < 8; ++i) {
      this.drawParam(i, x, y, w, this.lineHeight());
      y += this.lineHeight();
    }
  } else {
    w = Math.floor(w / 2);
    x2 = x;
    for (var i = 2; i < 8; ++i) {
      this.drawParam(i, x2, y, w, this.lineHeight());
      if (i % 2 === 0) {
        x2 += w;
      } else {
        x2 = x;
        y += this.lineHeight();
      }
    }
  }
};

Window_InBattleStatus.prototype.drawParam = function(paramId, dx, dy, dw, dh) {
  this.drawDarkRect(dx, dy, dw, dh);
  var level = this._battler._buffs[paramId];
  var icon = this._battler.buffIconIndex(level, paramId);
  this.drawIcon(icon, dx + 2, dy + 2);
  dx += Window_Base._iconWidth + 4;
  dw -= Window_Base._iconWidth + 4 + this.textPadding() + 2;
  this.changeTextColor(this.systemColor());
  this.drawText(TextManager.param(paramId), dx, dy, dw);
  var value = this._battler.param(paramId);
  this.changeTextColor(this.paramchangeTextColor(level));
  this.drawText(Yanfly.Util.toGroup(value), dx, dy, dw, 'right');
};

Window_InBattleStatus.prototype.drawDarkRect = function(dx, dy, dw, dh) {
  var color = this.gaugeBackColor();
  this.changePaintOpacity(false);
  this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
  this.changePaintOpacity(true);
};

//=============================================================================
// Window_InBattleStateList
//=============================================================================

function Window_InBattleStateList() {
    this.initialize.apply(this, arguments);
}

Window_InBattleStateList.prototype = Object.create(Window_Selectable.prototype);
Window_InBattleStateList.prototype.constructor = Window_InBattleStateList;

Window_InBattleStateList.prototype.initialize = function(parentWindow) {
  this._parentWindow = parentWindow;
  this._battler = $gameParty.battleMembers()[0];
  var x = parentWindow.x;
  var y = parentWindow.y;
  var width = eval(Yanfly.Param.IBSStatusListWidth);
  width += this.standardPadding() * 2;
  width = Math.ceil(width);
  var height = parentWindow.height;
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this.deactivate();
  this.backOpacity = 0;
  this.opacity = 0;
  this.hide();
  this._data = [];
};

Window_InBattleStateList.prototype.setStatusWindow = function(win) {
  this._statusWindow = win;
};

Window_InBattleStateList.prototype.setBattler = function(battler) {
  this._battler = battler;
  this._parentWindow.setBattler(battler);
  this.refresh();
  this.select(0);
  if (this._statusWindow) {
    var index = $gameParty.battleMembers().indexOf(battler)
    this._statusWindow.select(index);
  }
};

Window_InBattleStateList.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_InBattleStateList.prototype.item = function() {
  var index = this.index();
  return this._data && index >= 0 ? this._data[index] : null;
};

Window_InBattleStateList.prototype.includes = function(item) {
  if (!item) return false;
  if (item.name.length <= 0) return false;
  if (item.iconIndex <= 0) return false;
  return true;
};

Window_InBattleStateList.prototype.makeItemList = function() {
  this._data = [];
  if (this._battler) {
    var states = this._battler.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (this.includes(state)) this._data.push(state);
    }
    for (var i = 0; i < 8; ++i) {
      if (this._battler.isBuffAffected(i) ||
      this._battler.isDebuffAffected(i)) {
        this._data.push('buff ' + i);
      }
    }
  }
  if (this._data.length <= 0) this._data.push(null);
};

Window_InBattleStateList.prototype.drawItem = function(index) {
  var item = this._data[index];
  var rect = this.itemRect(index);
  rect.width -= this.textPadding();
  if (item === null) {
    var icon = Yanfly.Param.IBSHealthyIcon;
    var text = Yanfly.Param.IBSHealthyText;
    var ibw = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    this.drawText(text, rect.x + ibw, rect.y, rect.width - ibw);
  } else if (typeof item === 'string' && item.match(/BUFF[ ](\d+)/i)) {
    var paramId = parseInt(RegExp.$1);
    var level = this._battler._buffs[paramId];
    var icon = this._battler.buffIconIndex(level, paramId);
    var ibw = Window_Base._iconWidth + 4;
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    if (level > 0) {
      var text = Yanfly.Param.IBSBuffText[paramId];
    } else {
      var text = Yanfly.Param.IBSDebuffText[paramId];
    }
    this.drawText(text, rect.x + ibw, rect.y, rect.width - ibw);
    if (!Imported.YEP_BuffsStatesCore) return;
    this.drawBuffTurns(this._battler, paramId, rect.x + 2, rect.y);
    if (Yanfly.Param.BSCShowBuffRate) {
      this.drawBuffRate(this._battler, paramId, rect.x + 2, rect.y);
    }
  } else if (item) {
    this.drawItemName(item, rect.x, rect.y, rect.width);
    if (!Imported.YEP_BuffsStatesCore) return;
    if (item.autoRemovalTiming > 0) {
      this.drawStateTurns(this._battler, item, rect.x + 2, rect.y);
    }
    this.drawStateCounter(this._battler, item, rect.x + 2, rect.y);
  }
};

Window_InBattleStateList.prototype.updateHelp = function() {
  if (this.item() === null) {
    var text = Yanfly.Param.IBSHealthyHelp;
    this._helpWindow.setText(text);
  } else if (typeof this.item() === 'string' &&
  this.item().match(/BUFF[ ](\d+)/i)) {
    var paramId = parseInt(RegExp.$1);
    var level = this._battler._buffs[paramId];
    if (level > 0) {
      var fmt = Yanfly.Param.IBSBuffHelp[paramId];
    } else {
      var fmt = Yanfly.Param.IBSDebuffHelp[paramId];
    }
    var rate = Math.floor(this._battler.paramBuffRate(paramId) * 100);
    var turns = this._battler._buffTurns[paramId];
    var text = fmt.format(rate, Math.abs(level), turns);
    this._helpWindow.setText(text);
  } else if (this.item()) {
    this.setHelpWindowItem(this.item());
  }
};

Window_InBattleStateList.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_InBattleStateList.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  if (this.active && this._battler) this.updateLeftRight();
};

Window_InBattleStateList.prototype.updateLeftRight = function() {
  var index = $gameParty.battleMembers().indexOf(this._battler);
  var current = index;
  if (Input.isRepeated('left')) {
    index -= 1;
  } else if (Input.isRepeated('right')) {
    index += 1;
  }
  index = index.clamp(0, $gameParty.battleMembers().length - 1);
  if (current !== index) {
    var battler = $gameParty.battleMembers()[index];
    this.setBattler(battler);
    SoundManager.playCursor();
  }
};

//=============================================================================
// Window_CTBIcon
//=============================================================================

if (Imported.YEP_X_BattleSysCTB) {

Yanfly.IBS.Window_CTBIcon_isReduceOpacity =
  Window_CTBIcon.prototype.isReduceOpacity;
Window_CTBIcon.prototype.isReduceOpacity = function() {
  if (SceneManager._scene._inBattleStatusWindow) {
    if (SceneManager._scene._inBattleStatusWindow.visible) return true;
  }
  return Yanfly.IBS.Window_CTBIcon_isReduceOpacity.call(this);
};

}; // Imported.YEP_X_BattleSysCTB

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.setInBattleStatusWindow = function(win) {
  this._inBattleStatusWindow = win;
};

Yanfly.IBS.Window_BattleStatus_update = Window_BattleStatus.prototype.update;
Window_BattleStatus.prototype.update = function() {
  Yanfly.IBS.Window_BattleStatus_update.call(this);
  this.processInBattleStatusTouch();
};

Window_BattleStatus.prototype.processInBattleStatusTouch = function() {
  if (!this._inBattleStatusWindow) return;
  if (!this._inBattleStatusWindow.active) return;
  if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
    this.onInBattleStatusTouch();
  }
};

Window_BattleStatus.prototype.onInBattleStatusTouch = function() {
  var lastIndex = this.index();
  var x = this.canvasToLocalX(TouchInput.x);
  var y = this.canvasToLocalY(TouchInput.y);
  var hitIndex = this.hitTest(x, y);
  if (hitIndex >= 0) {
    var actor = $gameParty.battleMembers()[hitIndex];
    var win = this._inBattleStatusWindow;
    if (win && actor) {
      win.setBattler(actor);
      SoundManager.playCursor();
    }
  }
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.IBS.Scene_Battle_createAllWindows =
  Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  Yanfly.IBS.Scene_Battle_createAllWindows.call(this);
  this.createInBattleStatusWindows();
};

Scene_Battle.prototype.createInBattleStatusWindows = function() {
  this._inBattleStatusWindow = new Window_InBattleStatus();
  this.addChild(this._inBattleStatusWindow);
  var win = this._inBattleStatusWindow;
  this._inBattleStateList = new Window_InBattleStateList(win);
  this._inBattleStateList.setHelpWindow(this._helpWindow);
  this._inBattleStateList.setStatusWindow(this._statusWindow);
  this.addChild(this._inBattleStateList);
  this._inBattleStateList.setHandler('cancel', 
    this.onInBattleStatusCancel.bind(this));
  this._statusWindow.setInBattleStatusWindow(this._inBattleStateList);
};

Yanfly.IBS.Scene_Battle_createPartyCommandWindow =
  Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  Yanfly.IBS.Scene_Battle_createPartyCommandWindow.call(this);
  var win = this._partyCommandWindow;
  win.setHandler('inBattleStatus', this.commandInBattleStatus.bind(this));
};

Scene_Battle.prototype.commandInBattleStatus = function() {
  this._helpWindow.show();
  this._inBattleStatusWindow.show();
  this._inBattleStateList.show();
  this._inBattleStateList.activate();
  this._inBattleStateList.setBattler($gameParty.battleMembers()[0]);
  if (Imported.YEP_X_PartyLimitGauge) {
    this._showPartyLimitGauge = $gameSystem.isShowPartyLimitGauge();
    this._showTroopLimitGauge = $gameSystem.isShowTroopLimitGauge();
    $gameSystem.setShowPartyLimitGauge(false);
    $gameSystem.setShowTroopLimitGauge(false);
  }
};

Scene_Battle.prototype.onInBattleStatusCancel = function() {
  this._helpWindow.hide();
  this._inBattleStatusWindow.hide();
  this._inBattleStateList.hide();
  this._inBattleStateList.deactivate();
  this._partyCommandWindow.activate();
  this._statusWindow.deselect();
  if (Imported.YEP_X_PartyLimitGauge) {
    $gameSystem.setShowPartyLimitGauge(this._showPartyLimitGauge);
    $gameSystem.setShowTroopLimitGauge(this._showTroopLimitGauge);
  }
};

Yanfly.IBS.Scene_Battle_isAnyInputWindowActive =
  Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
  if (this._inBattleStateList && this._inBattleStateList.active) return true;
  return Yanfly.IBS.Scene_Battle_isAnyInputWindowActive.call(this);
};

if (Imported.YEP_X_BattleSysCTB) {

Yanfly.IBS.Scene_Battle_updateWindowPositionsCTB =
  Scene_Battle.prototype.updateWindowPositionsCTB;
Scene_Battle.prototype.updateWindowPositionsCTB = function() {
  if (this._inBattleStatusWindow && this._inBattleStatusWindow.visible) {
    return;
  }
  Yanfly.IBS.Scene_Battle_updateWindowPositionsCTB.call(this);
};

}; // Imported.YEP_X_BattleSysCTB

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