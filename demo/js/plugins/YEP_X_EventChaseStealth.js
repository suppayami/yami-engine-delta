//=============================================================================
// Yanfly Engine Plugins - Event Chase Player Extension - Event Chase Stealth
// YEP_X_EventChaseStealth.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_EventChaseStealth = true;

var Yanfly = Yanfly || {};
Yanfly.ECS = Yanfly.ECS || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 (Requires YEP_EventChasePlayer.js) Enables a stealth
 * mechanic for the Event Chase Player plugin.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Player Transparency
 * @desc This is the transparency rate of the player while
 * in stealth mode.
 * @default 0.5
 *
 * @param Disable Dash
 * @desc Disable dashing while in Stealth Mode?
 * @default true
 *
 * @param Move Speed
 * @desc The move speed while in Stealth Mode.
 * @default 3
 *
 * @param ---Stealth Regions---
 * @default
 *
 * @param Stealth Regions
 * @desc These are the Region ID's that make the player unable
 * to be seen by events. Separate ID's with a space.
 * @default 0
 *
 * @param ---Stealth Gauge---
 * @default
 *
 * @param Show Gauge
 * @desc Show the stealth gauge?
 * NO - false     YES - true
 * @default true
 *
 * @param Gauge Opacity
 * @desc This is the opacity of the gauge.
 * @default 100
 *
 * @param Show Timer
 * @desc Display Timer while in stealth mode?
 * NO - false     YES - true
 * @default true
 *
 * @param Unlimited Text
 * @desc The text to display while in unlimited Stealth Mode.
 * @default ∞
 *
 * @param Gauge X
 * @desc The x location of the stealth gauge.
 * This is a formula
 * @default 96
 *
 * @param Gauge Y
 * @desc The y location of the stealth gauge.
 * This is a formula
 * @default Graphics.boxHeight - 84
 *
 * @param Gauge Width
 * @desc The width of the stealth gauge.
 * This is a formula.
 * @default Graphics.boxWidth - 192
 *
 * @param Gauge Height
 * @desc The height of the stealth gauge.
 * This is a formula.
 * @default 36
 *
 * @param Gauge Color 1
 * @desc This is the text color 1 of the gauge.
 * @default 9
 *
 * @param Gauge Color 2
 * @desc This is the text color 2 of the gauge.
 * @default 13
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_EventChasePlayer. Make sure this plugin is located
 * under YEP_EventChasePlayer in the plugin list. Make sure it is the most
 * updated version of Event Chase Player.
 *
 * Grants your player the ability to go Stealth Mode for either a limited set
 * amount of time or an unlimited amount of time. While in Stealth Mode, the
 * player will not alert any events set by the Event Chase Player plugin. This
 * plugin also includes region areas that are considered stealth regions.
 *
 * ============================================================================
 * Instructions - Stealth Regions
 * ============================================================================
 *
 * Stealth Regions are places on the map that you can mark using RPG Maker MV's
 * region ID's. You can decide which of the regions will be considered Stealth
 * Regions within the Plugin Parameters or by using the following notetags
 * inside of a map's notebox:
 *
 * <Stealth Regions: x>
 * <Stealth Regions: x, x, x>
 * <Stealth Regions: x to y>
 * This will set regions x (or x to y) as Stealth Regions.
 *
 * While the player is inside of the Stealth Region, any event that is outside
 * of the Stealth Region cannot detect the player. However, if the player is
 * inside of the Stealth Region and the enemy is also inside the very same
 * Stealth Region with the matching Region ID, the enemy can detect the player.
 *
 * However, if the player is inside of a Stealth Region with a different ID
 * than the Stealth Region the enemy is in, the enemy will not detect the
 * the player.
 *
 * Once the player is detected, Stealth Regions stop applying and the alerted
 * event will chase the player (or flee from) even if the player runs into
 * another Stealth Region. The Stealth Regions remain disabled until the event
 * is no longer chasing (or fleeing from) the player.
 *
 * ============================================================================
 * Instructions - Stealth Mode
 * ============================================================================
 * 
 * To enter Stealth Mode, you'll have to utilize the plugin commands found in
 * the plugin commands section a bit lower. While in Stealth Mode, if enabled,
 * the Stealth Gauge will appear to alert the player how much longer the player
 * will remain in Stealth Mode before it automatically disappears.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * You can use the following Plugin Commands to adjust Stealth Mode in your
 * game mid-game!
 *
 * Plugin Command:
 *
 *   StealthTime x
 *   - Puts the player character into Stealth Mode for x frames. Once the
 *   timer is up, the player exits Stealth Mode.
 *
 *   StealthMode On
 *   - Puts the player character into Stealth Mode. There is no timer for this.
 *
 *   StealthMode Off
 *   - Puts the player character out of Stealth Mode. This also resets the
 *   Stealth Timer to 0.
 *
 *   EnableStealthDash
 *   - Enables the player to be able to dash while in Stealth Mode.
 *
 *   DisableStealthDash
 *   - Disables the player from being able to dash while in Stealth Mode.
 *
 *   SetStealthMoveSpeed x
 *   - Sets the move speed while in Stealth Mode to x.
 *
 *   HideStealthGauge
 *   - This prevents the Stealth Gauge from being shown at all.
 *
 *   ShowStealthGauge
 *   - This will show the Stealth Gauge whenever the player is in Stealth Mode.
 *
 *   EnableDifferentStealthSpeed
 *   - Sets the player to have a different move speed when in Stealth Mode.
 *
 *   DisableDifferentStealthSpeed
 *   - The player won't have a different move speed when in Stealth Mode.
 *
 * ============================================================================
 * Lunatic Mode - New JavaScript Functions
 * ============================================================================
 *
 * For those who wish to use Script Calls for Conditional Branches and/or
 * adjust Stealth Mode with Script Calls, you can use these new functions:
 *
 * $gamePlayer.isStealthMode()
 * - This checks if the player is in Stealth Mode. If the player is, this will
 * return true. If the player isn't, this will return false.
 *
 * $gamePlayer.setStealthMode(true)
 * $gamePlayer.setStealthMode(false)
 * - This will set the player to unlimited Stealth Mode if true. If false, this
 * will remove Stealth Mode from the player even if the player is on a Stealth
 * Mode timer.
 *
 * $gamePlayer.setStealthTimer(x)
 * - This sets the amount of frames the player will be in Stealth Mode for.
 * Replace x with the desired number of frames.
 *
 * $gameMap.isStealthRegion(x)
 * - This will check if region x is a Stealth Region. If it is, this will
 * return true. If it isn't, this will return false.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Fixed a bug where changing the stealth movement speed would affect all
 * events on the map.
 *
 * Version 1.01:
 * - Added 'EnableDifferentStealthSpeed' and 'DisableDifferentStealthSpeed'
 * plugin commands to enable different stealth movement speed adjustments.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_EventChasePlayer) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_EventChaseStealth');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ECSPlayerTrans = Number(Yanfly.Parameters['Player Transparency']);
Yanfly.Param.ECSStealthDash = eval(String(Yanfly.Parameters['Disable Dash']));
Yanfly.Param.ECSMoveSpeed = Number(Yanfly.Parameters['Move Speed']);

Yanfly.Param.ECSRegions = String(Yanfly.Parameters['Stealth Regions']);
Yanfly.Param.ECSRegions = Yanfly.Param.ECSRegions.split(' ');
for (Yanfly.i = 0; Yanfly.i < Yanfly.Param.ECSRegions.length; ++Yanfly.i) {
  Yanfly.Param.ECSRegions[Yanfly.i] = 
    parseInt(Yanfly.Param.ECSRegions[Yanfly.i]);
};

Yanfly.Param.ECSShowGauge = eval(String(Yanfly.Parameters['Show Gauge']));
Yanfly.Param.ECSSOpacity = Number(Yanfly.Parameters['Gauge Opacity']);
Yanfly.Param.ECSShowTimer = eval(String(Yanfly.Parameters['Show Timer']));
Yanfly.Param.ECSSUnlimited = String(Yanfly.Parameters['Unlimited Text']);
Yanfly.Param.ECSSGaugeX = String(Yanfly.Parameters['Gauge X']);
Yanfly.Param.ECSSGaugeY = String(Yanfly.Parameters['Gauge Y']);
Yanfly.Param.ECSSGaugeW = String(Yanfly.Parameters['Gauge Width']);
Yanfly.Param.ECSSGaugeH = String(Yanfly.Parameters['Gauge Height']);
Yanfly.Param.ECSSGaugeColor1 = Number(Yanfly.Parameters['Gauge Color 1']);
Yanfly.Param.ECSSGaugeColor2 = Number(Yanfly.Parameters['Gauge Color 2']);

//=============================================================================
// DataManager
//=============================================================================

DataManager.processECSNotetags = function() {
  if (!$dataMap) return;
  $dataMap.regionStealth = Yanfly.Param.ECSRegions.slice();
  if (!$dataMap.note) return;
  var noteA = /<STEALTH REGIONS:[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var noteB = /<STEALTH REGIONS:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var notedata = $dataMap.note.split(/[\r\n]+/);
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(noteA)) {
      var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.regionStealth = $dataMap.regionStealth.concat(array);
    } else if (line.match(noteB)) {
      var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
        parseInt(RegExp.$2));
      $dataMap.regionStealth = $dataMap.regionStealth.concat(range);
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.ECS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.ECS.Game_System_initialize.call(this);
    this.initStealthGauge();
};

Game_System.prototype.initStealthGauge = function() {
    this._showStealthGauge = Yanfly.Param.ECSShowGauge;
    this._differentStealthSpeed = true;
};

Game_System.prototype.isShowStealthGauge = function() {
    if (this._showStealthGauge === undefined) this.initStealthGauge();
    return this._showStealthGauge;
};

Game_System.prototype.setShowStealthGauge = function(value) {
    if (this._showStealthGauge === undefined) this.initStealthGauge();
    this._showStealthGauge = value;
};

Game_System.prototype.isDifferentStealthSpeed = function() {
    if (this._differentStealthSpeed === undefined) this.initStealthGauge();
    return this._differentStealthSpeed;
};

Game_System.prototype.setDifferentStealthSpeed = function(value) {
    if (this._differentStealthSpeed === undefined) this.initStealthGauge();
    this._differentStealthSpeed = value;
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.ECS.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    if ($dataMap) DataManager.processECSNotetags();
    Yanfly.ECS.Game_Map_setup.call(this, mapId);
};

Yanfly.ECS.Game_Map_isDashDisabled = Game_Map.prototype.isDashDisabled;
Game_Map.prototype.isDashDisabled = function() {
    if ($gamePlayer.isStealthMode()) return $gamePlayer.disableStealthDash();
    return Yanfly.ECS.Game_Map_isDashDisabled.call(this);
};

Game_Map.prototype.isStealthRegion = function(id) {
  if ($dataMap.regionStealth === undefined) DataManager.processECSNotetags();
  if (id === 0) return false;
  return $dataMap.regionStealth.contains(id);
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.ECS.Game_CharacterBase_realMoveSpeed =
    Game_CharacterBase.prototype.realMoveSpeed;
Game_CharacterBase.prototype.realMoveSpeed = function() {
  if (this.isStealthMode() && $gameSystem.isDifferentStealthSpeed()) {
    return this.stealthMoveSpeed() + (this.isDashing() ? 1 : 0);
  }
  return Yanfly.ECS.Game_CharacterBase_realMoveSpeed.call(this);
};

Game_CharacterBase.prototype.stealthMoveSpeed = function() {
  return Yanfly.Param.ECSMoveSpeed;
};

Yanfly.ECS.Game_CharacterBase_opacity = Game_CharacterBase.prototype.opacity;
Game_CharacterBase.prototype.opacity = function() {
  var opacity = Yanfly.ECS.Game_CharacterBase_opacity.call(this);
  if (this.isStealthMode()) opacity *= this.stealthTransparencyRate();
  return opacity;
};

Game_CharacterBase.prototype.isStealthMode = function() {
  return false;
};

Game_CharacterBase.prototype.stealthTransparencyRate = function() {
  return Yanfly.Param.ECSPlayerTrans;
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.ECS.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    Yanfly.ECS.Game_Player_initMembers.call(this);
    this.initEventChaseStealth();
};

Game_Player.prototype.initEventChaseStealth = function() {
    this._chaseStealthTimer = 0;
    this._chaseStealthPerm = false;
    this._disableStealthDash = Yanfly.Param.ECSStealthDash;
    this._stealthMoveSpeed = Yanfly.Param.ECSMoveSpeed;
};

Yanfly.ECS.Game_Player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    Yanfly.ECS.Game_Player_update.call(this, sceneActive);
    if (sceneActive) this.updateStealthTimer();
};

Game_Player.prototype.isStealthMode = function() {
    if (this._chaseStealthTimer === undefined) this.initEventChaseStealth();
    if (this._chaseStealthTimer > 0) return true;
    return this._chaseStealthPerm;
};

Game_Player.prototype.setStealthTimer = function(frames) {
    if (this._chaseStealthTimer === undefined) this.initEventChaseStealth();
    this._maxChaseStealthTimer = frames;
    this._chaseStealthTimer = frames;
};

Game_Player.prototype.updateStealthTimer = function() {
    if (this._chaseStealthTimer === undefined) this.initEventChaseStealth();
    this._chaseStealthTimer--;
};

Game_Player.prototype.setStealthMode = function(value) {
    if (this._chaseStealthPerm === undefined) this.initEventChaseStealth();
    this._chaseStealthPerm = value;
    if (value === false) this.setStealthTimer(0);
};

Game_Player.prototype.disableStealthDash = function() {
    if (this._disableStealthDash === undefined) this.initEventChaseStealth();
    return this._disableStealthDash;
};

Game_Player.prototype.setStealthDashDisable = function(value) {
    this._disableStealthDash = value;
};

Game_Player.prototype.stealthMoveSpeed = function() {
    if (this._stealthMoveSpeed === undefined) this.initEventChaseStealth();
    return this._stealthMoveSpeed;
};

Game_Player.prototype.setStealthMoveSpeed = function(value) {
    if (this._stealthMoveSpeed === undefined) this.initEventChaseStealth();
    this._stealthMoveSpeed = Math.max(1, value);
};

Game_Player.prototype.getCurChaseStealthTimer = function() {
    if (this._chaseStealthPerm) return 1;
    return this._chaseStealthTimer || 0;
};

Game_Player.prototype.getMaxChaseStealthTimer = function() {
    if (this._chaseStealthPerm) return 1;
    return this._maxChaseStealthTimer || 1;
};

Yanfly.ECS.Game_Player_triggerAction = Game_Player.prototype.triggerAction;
Game_Player.prototype.triggerAction = function() {
    var value = Yanfly.ECS.Game_Player_triggerAction.call(this);
    if (value) this.setStealthMode(false);
    return value;
};

Yanfly.ECS.Game_Player_triggerButtonAction =
    Game_Player.prototype.triggerButtonAction;
Game_Player.prototype.triggerButtonAction = function() {
    var value = Yanfly.ECS.Game_Player_triggerButtonAction.call(this);
    if (value) this.setStealthMode(false);
    return value;
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.ECS.Game_Event_canSeePlayer = Game_Event.prototype.canSeePlayer;
Game_Event.prototype.canSeePlayer = function() {
    if (this.meetStealthModeConditions()) {
      this.stealthClearChaseSettings();
      return false;
    }
    return Yanfly.ECS.Game_Event_canSeePlayer.call(this);
};

Yanfly.ECS.Game_Event_chaseConditions = Game_Event.prototype.chaseConditions;
Game_Event.prototype.chaseConditions = function(dis) {
    if ($gamePlayer.isStealthMode()) {
      this.stealthClearChaseSettings();
      return false;
    }
    return Yanfly.ECS.Game_Event_chaseConditions.call(this, dis);
};

Yanfly.ECS.Game_Event_fleeConditions = Game_Event.prototype.fleeConditions;
Game_Event.prototype.fleeConditions = function(dis) {
    if ($gamePlayer.isStealthMode()) {
      this.stealthClearChaseSettings();
      return false;
    }
    return Yanfly.ECS.Game_Event_fleeConditions.call(this, dis);
};

Game_Event.prototype.meetStealthModeConditions = function(dis) {
    if ($gamePlayer.isStealthMode()) return true;
    var id = $gamePlayer.regionId();
    if ($gameMap.isStealthRegion(id)) {
      if (id !== this.regionId()) return true;
    }
    return false;
};

Game_Event.prototype.stealthClearChaseSettings = function() {
    if (this._chasePlayer) this.endEventChase();
    if (this._fleePlayer) this.endEventFlee();
    this._alertLock = 0;
    this._alertPlayer = false;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.ECS.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.ECS.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'StealthMode') {
    if (args[0].toUpperCase() === 'ON') {
      $gamePlayer.setStealthMode(true);
    } else if (args[0].toUpperCase() === 'OFF') {
      $gamePlayer.setStealthMode(false);
    }
  } else if (command === 'StealthTime') {
    var value = parseInt(args[0]);
    $gamePlayer.setStealthTimer(value);
  } else if (command === 'EnableStealthDash') {
    $gamePlayer.setStealthDashDisable(false);
  } else if (command === 'DisableStealthDash') {
    $gamePlayer.setStealthDashDisable(true);
  } else if (command === 'SetStealthMoveSpeed') {
    var value = parseInt(args[0]);
    $gamePlayer.setStealthMoveSpeed(value);
  } else if (command === 'HideStealthGauge') {
    $gameSystem.setShowStealthGauge(false);
  } else if (command === 'ShowStealthGauge') {
    $gameSystem.setShowStealthGauge(true);
  } else if (command === 'EnableDifferentStealthSpeed') {
    $gameSystem.setDifferentStealthSpeed(true);
  } else if (command === 'DisableDifferentStealthSpeed') {
    $gameSystem.setDifferentStealthSpeed(false);
  }
};

//=============================================================================
// Window_StealthGauge
//=============================================================================

function Window_StealthGauge() {
    this.initialize.apply(this, arguments);
}

Window_StealthGauge.prototype = Object.create(Window_Base.prototype);
Window_StealthGauge.prototype.constructor = Window_StealthGauge;

Window_StealthGauge.prototype.initialize = function(numLines) {
    var wx = eval(Yanfly.Param.ECSSGaugeX);
    var wy = eval(Yanfly.Param.ECSSGaugeY);
    var ww = eval(Yanfly.Param.ECSSGaugeW);
    var wh = eval(Yanfly.Param.ECSSGaugeH);
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this.opacity = 0;
};

Window_StealthGauge.prototype.standardPadding = function() {
    return 0;
};

Window_StealthGauge.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this.isUpdate()) {
      this.visible = false;
      return;
    }
    this.visible = true;
    this.refresh();
};

Window_StealthGauge.prototype.isUpdate = function() {
    if (!$gameSystem.isShowStealthGauge()) return false;
    if ($gameMessage.isBusy()) return false;
    return $gamePlayer.isStealthMode();
};

Window_StealthGauge.prototype.refresh = function() {
    this.contents.clear();
    this.drawStealthGauge();
    if (Yanfly.Param.ECSShowTimer) this.drawStealthTimer();
};

Window_StealthGauge.prototype.drawStealthGauge = function() {
    this.contents.paintOpacity = Yanfly.Param.ECSSOpacity;
    var ww = this.contents.width;
    var wh = this.contents.height;
    this.contents.fillRect(0, 0, ww, wh, this.gaugeBackColor());
    var color1 = this.textColor(Yanfly.Param.ECSSGaugeColor1);
    var color2 = this.textColor(Yanfly.Param.ECSSGaugeColor2);
    var rate = $gamePlayer.getCurChaseStealthTimer();
    rate /= $gamePlayer.getMaxChaseStealthTimer();
    ww -= 2;
    wh -= 2;
    ww = Math.ceil(ww * rate);
    this.contents.gradientFillRect(1, 1, ww, wh, color1, color2);
    this.contents.paintOpacity = 255;
};

Window_StealthGauge.prototype.drawStealthTimer = function() {
    if ($gamePlayer._chaseStealthPerm) {
      var text = Yanfly.Param.ECSSUnlimited;
    } else {
      var value = $gamePlayer.getCurChaseStealthTimer();
      var sec = Math.floor(value / 60);
      var mil = value % 60;
      var text = sec.padZero(2) + ':' + mil.padZero(2);
    }
    var ww = this.contents.width;
    var wh = this.contents.height;
    this.contents.drawText(text, 0, 0, ww, wh, 'center');
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.ECS.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    Yanfly.ECS.Scene_Map_createAllWindows.call(this);
    this.createStealthWindow();
};

Scene_Map.prototype.createStealthWindow = function() {
    this._stealthWindow = new Window_StealthGauge();
    this.addChild(this._stealthWindow);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

//=============================================================================
// End of File
//=============================================================================
};