//=============================================================================
// Yanfly Engine Plugins - Force Advantage
// YEP_ForceAdvantage.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ForceAdvantage = true;

var Yanfly = Yanfly || {};
Yanfly.FAdv = Yanfly.FAdv || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 This plugin allows you to force pre-emptive,
 * surprise, or normal initiatives for battles.
 * @author Yanfly Engine Plugins
 *
 * @param Neutral Event
 * @desc This common event will play with neutral advantage.
 * Place 0 to not use this parameter.
 * @default 0
 *
 * @param Pre-Emptive Event
 * @desc This common event will play with pre-emptive strikes.
 * Place 0 to not use this parameter.
 * @default 0
 *
 * @param Surprise Event
 * @desc This common event will play with surprise strikes.
 * Place 0 to not use this parameter.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables you to force a battle advantage on the next upcoming
 * battle, whether it is forced or a random encounter. These advantages can be
 * either pre-emptive strikes, surprise attacks, or even forcing a completely
 * normal battle with no advantage. This plugin also enables specific common
 * events to play upon different battle types.
 *
 * If you are using the YEP_BattleEngineCore.js, place this plugin underneath
 * the YEP_BattleEngineCore.js in the plugin's folder for better compatibility.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Use the following plugin commands to force a battle advantage on the next
 * upcoming battle:
 *
 * Plugin Command:
 *
 *   ForceAdvantage Pre-Emptive
 *   ForceAdvantage Preemptive
 *   ForceAdvantage First Strike
 *   ForceAdvantage Player
 *   - Forces a pre-emptive strike giving the player the advantage.
 *
 *   ForceAdvantage Surprise
 *   ForceAdvantage Back Attack
 *   ForceAdvantage Enemy
 *   - Forces a surprise attack giving the enemy party the advantage.
 *
 *   ForceAdvantage None
 *   ForceAdvantage Normal
 *   ForceAdvantage Neutral
 *   - Forces a neutral advantage where neither party has the advantage.
 *
 *   ForceAdvantage Clear
 *   - Clears any forced advantage settings imposed by the above commands.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ForceAdvantage');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.FAdvNeutral = Number(Yanfly.Parameters['Neutral Event']);
Yanfly.Param.FAdvPreemptive = Number(Yanfly.Parameters['Pre-Emptive Event']);
Yanfly.Param.FAdvSurprise = Number(Yanfly.Parameters['Surprise Event']);

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.FAdv.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    this.checkForceAdvantage(this._forceAdvantage);
    this._forceAdvantage = undefined;
    Yanfly.FAdv.BattleManager_startBattle.call(this);
    this.reserveForceAdvantageCommonEvents();
};

BattleManager.checkForceAdvantage = function(str) {
  if (str === undefined) return;
  var str = str.toUpperCase();
  if (['PRE-EMPTIVE', 'PREEMPTIVE', 'FIRST STRIKE', 'PLAYER'].contains(str)) {
    this._preemptive = true;
    this._surprise = false;
  } else if (['SURPRISE', 'BACK ATTACK', 'ENEMY'].contains(str)) {
    this._preemptive = false;
    this._surprise = true;
  } else if (['NONE', 'NORMAL', 'NEUTRAL'].contains(str)) {
    this._preemptive = false;
    this._surprise = false;
  }
};

BattleManager.reserveForceAdvantageCommonEvents = function() {
    if (this._preemptive) {
      var eventId = Yanfly.Param.FAdvPreemptive;
    } else if (this._surprise) {
      var eventId = Yanfly.Param.FAdvSurprise;
    } else {
      var eventId = Yanfly.Param.FAdvNeutral;
    }
    if (eventId > 0) $gameTemp.reserveCommonEvent(eventId);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.FAdv.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.FAdv.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ForceAdvantage') {
    var str = String(args[0]).toUpperCase();
    if (str === 'CLEAR') str = undefined;
    BattleManager._forceAdvantage = str;
  }
};

//=============================================================================
// End of File
//=============================================================================
