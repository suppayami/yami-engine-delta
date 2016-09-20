//=============================================================================
// Yanfly Engine Plugins - Self Switches & Variables
// YEP_SelfSwVar.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SelfSwVar = true;

var Yanfly = Yanfly || {};
Yanfly.SSV = Yanfly.SSV || {};

//=============================================================================
 /*:
 * @plugindesc v1.01 Self Switches and Self Variables functionality
 * without the need for plugin commands or script calls.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV comes with Self Switch functionality. However, the number of
 * Self Switches provided is a mere 4 in total, not enough for some of the more
 * complex events. This plugin will let you extend the number of Self Switches.
 * Self Variables, on the other hand, do not exist in RPG Maker MV, so this
 * plugin will provide functionality for that as well.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In order to set up your custom Self Switches and Self Variables, you must
 * first do a few things.
 *
 *   1. Open up your Switches/Variables list in the editor.
 *   2. Name the Switch to have 'Self Sw' in its name.
 *      - or -
 *      Name the Variable to have 'Self Var' in its name.
 *
 * Now, any time you use these following event commands, if the Self Switch or
 * Self Variable is the focus, it will be used instead of the actual Switch or
 * actual variable:
 *
 *   Self Switches:
 *     - Control Switches
 *     - Conditional Branch
 *     - Set Movement Route (Switch ON/Switch Off)
 *
 *   Self Variables:
 *     - Show Text (using the \v[x] codes)
 *     - Input Number
 *     - Select Item
 *     - Control Variables
 *     - Conditional Branch
 *     - Change Gold
 *     - Change Items
 *     - Change Weapons
 *     - Change Armors
 *     - Change HP
 *     - Change MP
 *     - Change TP
 *     - Recover All
 *     - Change EXP
 *     - Change Level
 *     - Change Parameter
 *     - Change Skill
 *     - Change Equipment
 *     - Change Enemy HP
 *     - Change Enemy MP
 *     - Change Enemy TP
 *     - Transfer Player
 *     - Set Vehicle Location
 *     - Set Event Location
 *     - Show Picture
 *     - Move Picture
 *     - Get Location Info
 *
 * Note that not all plugins that use variables will be necessarily compatible
 * with the custom made Self Switches and Self Variables. Of the YEP library,
 * these plugins are compatible with this plugin:
 *
 *   - YEP_EventMiniLabel
 *   - YEP_MapSelectSkill
 *
 * Non-Yanfly Engine Plugins may or may not be compatible.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Those who would like to remotely control Self Switches and Self Variables
 * can use the following plugin commands:
 *
 * Plugin Commands:
 *
 *   SelfSwitch Map x, Event y, Switch z to true
 *   SelfSwitch Map x, Event y, Switch z to false
 *   SelfSwitch Map x, Event y, Switch z to code
 *   - This will change the Self Switch used for map 'x', event 'y', and
 *   switch 'z' to the value of 'code' value. You can replace 'code' with a
 *   'true' or 'false' value or a piece of code like '$gameSwitches.value(4)'.
 *
 *   SelfVariable Map x, Event y, Variable z to 12345
 *   SelfVariable Map x, Event y, Variable z to value + 100
 *   SelfVariable Map x, Event y, Variable z to code
 *   - This will change the Self Variable used for map 'x', event 'y', and
 *   switch 'z' to the value of 'code' value. You can replace 'code' with a
 *   number like '12345', a calculation using 'value' (the current value of the
 *   Self Variable), or a piece of code like '$gameVariables.value(4)'.
 *
 * ============================================================================
 * Lunatic Mode - Script Calls
 * ============================================================================
 *
 * For those who'd rather deal altering self switches and/or self variables
 * inside of the script call event instead, you can use these script calls:
 *
 * Script Call:
 *
 *   this.getSelfSwitchValue(mapId, eventId, switchId)
 *   - Replace mapId with the map ID the event exists on. Replace eventId with
 *   the ID of the event. And replace the switchId with the ID of the switch.
 *   This will get the true/false value of that event's self switch.
 *
 *   this.getSelfVariableValue(mapId, eventId, varId)
 *   - Replace mapId with the map ID the event exists on. Replace eventId with
 *   the ID of the event. And replace the varId with the ID of the variable.
 *   This will get the value of that event's self variable.
 *
 *   this.setSelfSwitchValue(mapId, eventId, switchId, true)
 *   this.setSelfSwitchValue(mapId, eventId, switchId, false)
 *   - Replace mapId with the map ID the event exists on. Replace eventId with
 *   the ID of the event. And replace the switchId with the ID of the switch.
 *   This will set that self switch to true or false.
 *
 *   this.getSelfVariableValue(mapId, eventId, varId, value)
 *   - Replace mapId with the map ID the event exists on. Replace eventId with
 *   the ID of the event. And replace the varId with the ID of the variable.
 *   This will set that self variable to the value inserted.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Fixed a conflict that made self variables not work properly with the Input
 * Number event, select item event while a parallel process has a variable
 * being changed in the background.
 * - Added Self-Variable support for Transfer Player, Set Vehicle Location, Set
 * Event Location, Show Picture, Move Picture, and Get Location Info events.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

DataManager.isSelfSwitch = function(switchId) {
  var sw = $dataSystem.switches[switchId];
  return sw && sw.match(/SELF[ ]SW/i);
};

DataManager.isSelfVariable = function(variableId) {
  var va = $dataSystem.variables[variableId];
  return va && va.match(/SELF[ ]VAR/i);
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.getSelfSwVarEvent = function() {
  return this._selfSwVarEvent;
};

Game_Temp.prototype.setSelfSwVarEvent = function(mapId, eventId) {
  this._selfSwVarEvent = [mapId, eventId];
};

Game_Temp.prototype.clearSelfSwVarEvent = function() {
  this._selfSwVarEvent = undefined;
};

Game_Temp.prototype.getSelfSwVarEvBrdge = function() {
  return this._selfSwVarEvBridge;
};

Game_Temp.prototype.setSelfSwVarEvBridge = function(mapId, eventId) {
  this.setSelfSwVarEvent(mapId, eventId);
  this._selfSwVarEvBridge = [mapId, eventId];
};

Game_Temp.prototype.clearSelfSwVarEvBridge = function() {
  this._selfSwVarEvent = this._selfSwVarEvBridge;
  this._selfSwVarEvBridge = undefined;
};

Game_Temp.prototype.getSelfSwVarEventOneTimeClear = function() {
  return this._selfSwVarEventOneTimeClear;
};

Game_Temp.prototype.setSelfSwVarEventOneTimeClear = function(value) {
  this._selfSwVarEventOneTimeClear = value;
};

Game_Temp.prototype.getPersistingSelfSwVarEvent = function() {
  return this._selfPersistingSwVarEvent;
};

Game_Temp.prototype.setPersistingSelfSwVarEvent = function(mapId, eventId) {
  this._selfPersistingSwVarEvent = [mapId, eventId];
};

Game_Temp.prototype.carryPersistingSelfSwVarEvent = function() {
  this._revertSelfSwVarEvent = this._selfSwVarEvent;
  this._selfSwVarEvent = [];
  if (!this._selfPersistingSwVarEvent) return;
  this._selfSwVarEvent.push(this._selfPersistingSwVarEvent[0]);
  this._selfSwVarEvent.push(this._selfPersistingSwVarEvent[1]);
};

Game_Temp.prototype.revertSelfSwVarEvent = function() {
  this._selfSwVarEvent = this._revertSelfSwVarEvent;
};

//=============================================================================
// Game_Character
//=============================================================================

Yanfly.SSV.Game_Character_processMoveCommand =
  Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
  if (this._mapId && this._eventId) {
    $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  }
  Yanfly.SSV.Game_Character_processMoveCommand.call(this, command);
  if (this._mapId && this._eventId) {
    $gameTemp.clearSelfSwVarEvent();
  }
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.SSV.Game_Event_meetsConditions = Game_Event.prototype.meetsConditions;
Game_Event.prototype.meetsConditions = function(page) {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  var value = Yanfly.SSV.Game_Event_meetsConditions.call(this, page);
  $gameTemp.clearSelfSwVarEvent();
  return value;
};

//=============================================================================
// Game_Switches
//=============================================================================

Yanfly.SSV.Game_Switches_value = Game_Switches.prototype.value;
Game_Switches.prototype.value = function(switchId) {
  if (DataManager.isSelfSwitch(switchId) && $gameTemp.getSelfSwVarEvent()) {
    var mapId = $gameTemp.getSelfSwVarEvent()[0];
    var eventId = $gameTemp.getSelfSwVarEvent()[1];
    var switchId = 'SELF SWITCH ' + switchId;
    var key = [mapId, eventId, switchId];
    return $gameSelfSwitches.value(key);
  } else {
    return Yanfly.SSV.Game_Switches_value.call(this, switchId);
  }
};

Yanfly.SSV.Game_Switches_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
  if (switchId <= 0) return;
  if (DataManager.isSelfSwitch(switchId) && $gameTemp.getSelfSwVarEvent()) {
    var mapId = $gameTemp.getSelfSwVarEvent()[0];
    var eventId = $gameTemp.getSelfSwVarEvent()[1];
    var switchId = 'SELF SWITCH ' + switchId;
    var key = [mapId, eventId, switchId];
    $gameSelfSwitches.setValue(key, value);
  } else {
    Yanfly.SSV.Game_Switches_setValue.call(this, switchId, value);
  }
};

//=============================================================================
// Game_Variables
//=============================================================================

Yanfly.SSV.Game_Variables_value = Game_Variables.prototype.value;
Game_Variables.prototype.value = function(variableId) {
  if (DataManager.isSelfVariable(variableId) && $gameTemp.getSelfSwVarEvent()) {
    var mapId = $gameTemp.getSelfSwVarEvent()[0];
    var eventId = $gameTemp.getSelfSwVarEvent()[1];
    var variableId = 'SELF VARIABLE ' + variableId;
    var key = [mapId, eventId, variableId];
    return $gameSelfSwitches.value(key);
  } else {
    return Yanfly.SSV.Game_Variables_value.call(this, variableId);
  }
};

Yanfly.SSV.Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
  if (variableId <= 0) return;
  if (DataManager.isSelfVariable(variableId) && $gameTemp.getSelfSwVarEvent()) {
    var mapId = $gameTemp.getSelfSwVarEvent()[0];
    var eventId = $gameTemp.getSelfSwVarEvent()[1];
    var variableId = 'SELF VARIABLE ' + variableId;
    var key = [mapId, eventId, variableId];
    $gameSelfSwitches.setValue(key, value);
  } else {
    Yanfly.SSV.Game_Variables_setValue.call(this, variableId, value);
  }
};

//=============================================================================
// Game_SelfSwitches
//=============================================================================

Yanfly.SSV.Game_SelfSwitches_value = Game_SelfSwitches.prototype.value;
Game_SelfSwitches.prototype.value = function(key) {
  if (key[2].match(/SELF[ ]VAR/i)) {
    this._data[key] = this._data[key] || 0;
    return this._data[key];
  }
  return Yanfly.SSV.Game_SelfSwitches_value.call(this, key);
};

Yanfly.SSV.Game_SelfSwitches_setValue = Game_SelfSwitches.prototype.setValue;
Game_SelfSwitches.prototype.setValue = function(key, value) {
  if (key[2].match(/SELF[ ]VAR/i)) {
    this._data[key] = value;
    this.onChange();
  } else {
    Yanfly.SSV.Game_SelfSwitches_setValue.call(this, key, value)
  }
};

Yanfly.SSV.Game_SelfSwitches_onChange = Game_SelfSwitches.prototype.onChange;
Game_SelfSwitches.prototype.onChange = function() {
  Yanfly.SSV.Game_SelfSwitches_onChange.call(this);
  if ($gameTemp.getSelfSwVarEventOneTimeClear()) {
    $gameTemp.setSelfSwVarEventOneTimeClear(false);
    $gameTemp.clearSelfSwVarEvent();
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Show Text
Yanfly.SSV.Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function() {
  $gameTemp.setPersistingSelfSwVarEvent(this._mapId, this._eventId);
  return Yanfly.SSV.Game_Interpreter_command101.call(this);
};

// Select Item
Yanfly.SSV.Game_Interpreter_command104 = Game_Interpreter.prototype.command104;
Game_Interpreter.prototype.command104 = function() {
  $gameTemp.setSelfSwVarEventOneTimeClear(true);
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  return Yanfly.SSV.Game_Interpreter_command104.call(this);
};

// Conditional Branch
Yanfly.SSV.Game_Interpreter_command111 = Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command111.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Control Switches
Yanfly.SSV.Game_Interpreter_command121 = Game_Interpreter.prototype.command121;
Game_Interpreter.prototype.command121 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command121.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Control Variables
Yanfly.SSV.Game_Interpreter_command122 = Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command122.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Transfer Player
Yanfly.SSV.Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
Game_Interpreter.prototype.command201 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command201.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return false;
};

// Set Vehicle Location
Yanfly.SSV.Game_Interpreter_command202 = Game_Interpreter.prototype.command202;
Game_Interpreter.prototype.command202 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command202.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Set Event Location
Yanfly.SSV.Game_Interpreter_command203 = Game_Interpreter.prototype.command203;
Game_Interpreter.prototype.command203 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command203.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Show Picture
Yanfly.SSV.Game_Interpreter_command231 = Game_Interpreter.prototype.command231;
Game_Interpreter.prototype.command231 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command231.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Move Picture
Yanfly.SSV.Game_Interpreter_command232 = Game_Interpreter.prototype.command232;
Game_Interpreter.prototype.command232 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command232.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Get Location Info
Yanfly.SSV.Game_Interpreter_command285 = Game_Interpreter.prototype.command285;
Game_Interpreter.prototype.command285 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command285.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

Yanfly.SSV.Game_Interpreter_operateValue =
  Game_Interpreter.prototype.operateValue;
Game_Interpreter.prototype.operateValue = function(op1, type, op2) {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  value = Yanfly.SSV.Game_Interpreter_operateValue.call(this, op1, type, op2);
  $gameTemp.clearSelfSwVarEvent();
  return value;
};

Yanfly.SSV.Game_Interpreter_setupItemChoice =
  Game_Interpreter.prototype.setupItemChoice;
Game_Interpreter.prototype.setupItemChoice = function(params) {
  $gameTemp.setSelfSwVarEvBridge(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_setupItemChoice.call(this, params);
};

Yanfly.SSV.Game_Interpreter_setupNumInput =
  Game_Interpreter.prototype.setupNumInput;
Game_Interpreter.prototype.setupNumInput = function(params) {
  $gameTemp.setSelfSwVarEvBridge(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_setupNumInput.call(this, params);
};

Yanfly.SSV.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.SSV.Game_Interpreter_pluginCommand.call(this, command, args);
  // Compatibility Update
  if (command === 'MapSelectSkill') {
    $gameTemp.setSelfSwVarEventOneTimeClear(true);
    $gameTemp.setSelfSwVarEvBridge(this._mapId, this._eventId);
  // SelfSwitch
  } else if (command === 'SelfSwitch') {
    var line = this.argsToString(args);
    this.adjustSelfSwitch(line);
  // SelfVariable
  } else if (command === 'SelfVariable') {
    var line = this.argsToString(args);
    this.adjustSelfVariable(line);
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
    var str = '';
    var length = args.length;
    for (var i = 0; i < length; ++i) {
      str += args[i] + ' ';
    }
    return str.trim();
};

Game_Interpreter.prototype.adjustSelfSwitch = function(line) {
  var eventId;
  var switchId;
  if (line.match(/(.*)[ ]TO[ ](.*)/i)) {
    var data = String(RegExp.$1);
    var code = String(RegExp.$2).trim();
  } else {
    return;
  }
  if (line.match(/EVENT[ ](\d+)/i)) eventId = parseInt(RegExp.$1);
  if (eventId === undefined) return;
  if (line.match(/MAP[ ](\d+)/i)) mapId = parseInt(RegExp.$1);
  if (mapId === undefined) return;
  if (line.match(/SWITCH[ ](\d+)/i)) switchId = parseInt(RegExp.$1);
  if (switchId === undefined) return;
  if (!DataManager.isSelfSwitch(switchId)) return;
  var key = [mapId, eventId, 'SELF SWITCH ' + switchId];
  var value = $gameSelfSwitches.value(key);
  value = eval(code);
  $gameSelfSwitches.setValue(key, value);
};

Game_Interpreter.prototype.adjustSelfVariable = function(line) {
  var eventId;
  var varId;
  if (line.match(/(.*)[ ]TO[ ](.*)/i)) {
    var data = String(RegExp.$1);
    var code = String(RegExp.$2).trim();
  } else {
    return;
  }
  if (line.match(/EVENT[ ](\d+)/i)) eventId = parseInt(RegExp.$1);
  if (eventId === undefined) return;
  if (line.match(/MAP[ ](\d+)/i)) mapId = parseInt(RegExp.$1);
  if (mapId === undefined) return;
  if (line.match(/VARIABLE[ ](\d+)/i)) varId = parseInt(RegExp.$1);
  if (varId === undefined) return;
  if (!DataManager.isSelfVariable(varId)) return;
  var key = [mapId, eventId, 'SELF VARIABLE ' + varId];
  var value = $gameSelfSwitches.value(key);
  value = eval(code);
  $gameSelfSwitches.setValue(key, value);
};

// New Script Calls

Game_Interpreter.prototype.getSelfSwitchValue = function(mapId, eventId, id) {
  var key = [mapId, eventId, 'SELF SWITCH ' + id];
  return $gameSelfSwitches.value(key);
};

Game_Interpreter.prototype.getSelfVariableValue = function(mapId, eventId, id) {
  var key = [mapId, eventId, 'SELF VARIABLE ' + id];
  return $gameSelfSwitches.value(key);
};

Game_Interpreter.prototype.setSelfSwitchValue = function(m, e, id, value) {
  var key = [m, e, 'SELF SWITCH ' + id];
  $gameSelfSwitches.setValue(key, value);
};

Game_Interpreter.prototype.setSelfVariableValue = function(m, e, id, value) {
  var key = [m, e, 'SELF VARIABLE ' + id];
  $gameSelfSwitches.setValue(key, value);
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.SSV.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
  $gameTemp.carryPersistingSelfSwVarEvent();
  Yanfly.SSV.Window_Message_startMessage.call(this);
  $gameTemp.revertSelfSwVarEvent();
};

//=============================================================================
// Window_NumberInput
//=============================================================================

Yanfly.SSV.Window_NumberInput_processOk =
  Window_NumberInput.prototype.processOk;
Window_NumberInput.prototype.processOk = function() {
  $gameTemp.clearSelfSwVarEvBridge();
  Yanfly.SSV.Window_NumberInput_processOk.call(this);
  $gameTemp.clearSelfSwVarEvent();
};

//=============================================================================
// Window_EventItem
//=============================================================================

Yanfly.SSV.Window_EventItem_onOk = Window_EventItem.prototype.onOk;
Window_EventItem.prototype.onOk = function() {
  $gameTemp.clearSelfSwVarEvBridge();
  Yanfly.SSV.Window_EventItem_onOk.call(this);
  $gameTemp.clearSelfSwVarEvent();
};

//=============================================================================
// End of File
//=============================================================================
