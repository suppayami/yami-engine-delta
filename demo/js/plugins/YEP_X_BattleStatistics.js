//=============================================================================
// Yanfly Engine Plugins - Status Menu Extension - Battle Statistics
// YEP_X_BattleStatistics.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_BattleStatistics = true;

var Yanfly = Yanfly || {};
Yanfly.BStats = Yanfly.BStats || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_StatusMenuCore.js) Logs the battle
 * statistics of actors for your players to view.
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @desc This is the text used for the command name in the Status
 * Menu command list.
 * @default Statistics
 *
 * @param Battle Count Text
 * @desc This is the category text for Battle Count.
 * @default Battles Initiated
 *
 * @param Battle Count Format
 * @desc This is how the text format will appear.
 * %1 - Actor Battles  %2 - Party Battles  %3 - Percentage
 * @default %1 out of %2 Battles (%3%)
 *
 * @param Kill Count Text
 * @desc This is the category text for Kill Count.
 * @default Kills
 *
 * @param Kill Count Format
 * @desc This is how the text format will appear.
 * %1 - Kill Ratio
 * @default %1 Kills per Battle
 *
 * @param Death Count Text
 * @desc This is the category text for Death Count.
 * @default Deaths
 *
 * @param Death Count Format
 * @desc This is how the text format will appear.
 * %1 - Death Ratio
 * @default %1 Deaths per Battle
 *
 * @param Assist Count Text
 * @desc This is the category text for Assist Count.
 * @default Assists
 *
 * @param Assist Count Format
 * @desc This is how the text format will appear.
 * %1 - Assist Ratio
 * @default %1 Assists per Battle
 *
 * @param Damage Dealt
 * @desc This is the category text for Damage Dealt.
 * @default Damage Dealt
 *
 * @param Damage Taken
 * @desc This is the category text for Damage Taken.
 * @default Damage Taken
 *
 * @param Healing Dealt
 * @desc This is the category text for Healing Dealt.
 * @default Healing Performed
 *
 * @param Healing Taken
 * @desc This is the category text for Healing Taken.
 * @default Healing Received
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_StatusMenuCore.
 * Make sure this plugin is located under YEP_StatusMenuCore in the
 * plugin list.
 *
 * If you wish to place the Battle Statistics tab in the Status Menu in a
 * specific spot, place 'Statistics' without the quotes in the Status Menu
 * Core's Command Order parameter. If it's not present there, it will
 * automatically order itself in the 'Custom' tab.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * This plugin is plug-and-play. All battle information will be recorded in the
 * Battle Statistics tab. The information will be as follows:
 *
 * Battles Initiated
 * How many battles the actor was present in the starting party and what ratio.
 *
 * Kills/Deaths/Assists
 * Displays information about how many kills, deaths, and assists performed by
 * the actor overall. Kills rise when the actor defeats an enemy. Deaths rise
 * if the actor falls in battle. Assists rise if the actor is present during an
 * enemy kill.
 *
 * Damage Dealt
 * Total amount of damage dealt by the actor over the course of the game.
 *
 * Damage Taken
 * Total amount of damage taken by the actor over the course of the game.
 *
 * Healing Dealt
 * Total amount of healing dealt by the actor over the course of the game.
 *
 * Healing Taken
 * Total amount of healing taken by the actor over the course of the game.
 */
//=============================================================================

if (Imported.YEP_StatusMenuCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_BattleStatistics');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BStatsCmdName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.BStatsBCountText = String(Yanfly.Parameters['Battle Count Text']);
Yanfly.Param.BStatsBCountFmt = String(Yanfly.Parameters['Battle Count Format']);
Yanfly.Param.BStatsKCountText = String(Yanfly.Parameters['Kill Count Text']);
Yanfly.Param.BStatsKCountFmt = String(Yanfly.Parameters['Kill Count Format']);
Yanfly.Param.BStatsDCountText = String(Yanfly.Parameters['Death Count Text']);
Yanfly.Param.BStatsDCountFmt = String(Yanfly.Parameters['Death Count Format']);
Yanfly.Param.BStatsACountText = String(Yanfly.Parameters['Assist Count Text']);
Yanfly.Param.BStatsACountFmt = String(Yanfly.Parameters['Assist Count Format']);
Yanfly.Param.BStatsDmgDealt = String(Yanfly.Parameters['Damage Dealt']);
Yanfly.Param.BStatsDmgTaken = String(Yanfly.Parameters['Damage Taken']);
Yanfly.Param.BStatsHealDealt = String(Yanfly.Parameters['Healing Dealt']);
Yanfly.Param.BStatsHealTaken = String(Yanfly.Parameters['Healing Taken']);

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.BStats.Game_BattlerBase_addNewState =
		Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
    if (stateId === this.deathStateId()) this.updateBattleStats();
		Yanfly.BStats.Game_BattlerBase_addNewState.call(this, stateId);
};

Game_BattlerBase.prototype.updateBattleStats = function() {
		if (!$gameParty.inBattle()) return;
		if (this.isActor()) this.increaseDeathCount();
		if (this.isEnemy()) {
			for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
				var actor = $gameParty.battleMembers()[i];
				if (!actor) continue;
				if (actor === BattleManager._subject) {
					actor.increaseKillCount();
				} else {
					actor.increaseAssistCount();
				}
			}
		}
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.BStats.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.BStats.Game_Battler_onBattleStart.call(this);
    if (!this.isActor()) return;
		if (this._battleCount === undefined) this.initBattleStatistics();
		if (this.isBattleMember()) this._battleCount++;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.BStats.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.BStats.Game_Actor_setup.call(this, actorId);
		this.initBattleStatistics();
};

Game_Actor.prototype.initBattleStatistics = function() {
		this._battleCount = 0;
		this._killCount = 0;
		this._deathCount = 0;
		this._assistCount = 0;
		this._totalDamageDealt = 0;
		this._totalDamageTaken = 0;
		this._totalHealingDealt = 0;
		this._totalHealingTaken = 0;
};

Game_Actor.prototype.battleCount = function() {
    if (this._battleCount === undefined) this.initBattleStatistics();
		return this._battleCount;
};

Game_Actor.prototype.killCount = function() {
    if (this._killCount === undefined) this.initBattleStatistics();
		return this._killCount;
};

Game_Actor.prototype.killCountRatio = function() {
    if (this._killCount === undefined) this.initBattleStatistics();
		return this._killCount / Math.max(this._battleCount, 1);
};

Game_Actor.prototype.increaseKillCount = function(value) {
    value = value || 1;
		if (this._killCount === undefined) this.initBattleStatistics();
		this._killCount += value;
};

Game_Actor.prototype.deathCount = function() {
    if (this._deathCount === undefined) this.initBattleStatistics();
		return this._deathCount;
};

Game_Actor.prototype.deathCountRatio = function() {
    if (this._deathCount === undefined) this.initBattleStatistics();
		return this._deathCount / Math.max(this._battleCount, 1);
};

Game_Actor.prototype.increaseDeathCount = function(value) {
    value = value || 1;
		if (this._deathCount === undefined) this.initBattleStatistics();
		this._deathCount += value;
};

Game_Actor.prototype.assistCount = function() {
    if (this._assistCount === undefined) this.initBattleStatistics();
		return this._assistCount;
};

Game_Actor.prototype.assistCountRatio = function() {
    if (this._assistCount === undefined) this.initBattleStatistics();
		return this._assistCount / Math.max(this._battleCount, 1);
};

Game_Actor.prototype.increaseAssistCount = function(value) {
    value = value || 1;
		if (this._assistCount === undefined) this.initBattleStatistics();
		this._assistCount += value;
};

Game_Actor.prototype.totalDamageDealt = function() {
    if (this._totalDamageDealt === undefined) this.initBattleStatistics();
		return this._totalDamageDealt;
};

Game_Actor.prototype.increaseTotalDamageDealt = function(value) {
    value = value || 1;
		if (this._totalDamageDealt === undefined) this.initBattleStatistics();
		this._totalDamageDealt += value;
};

Game_Actor.prototype.totalDamageTaken = function() {
    if (this._totalDamageTaken === undefined) this.initBattleStatistics();
		return this._totalDamageTaken;
};

Game_Actor.prototype.increaseTotalDamageTaken = function(value) {
    value = value || 1;
		if (this._totalDamageTaken === undefined) this.initBattleStatistics();
		this._totalDamageTaken += value;
};

Game_Actor.prototype.totalHealingDealt = function() {
    if (this._totalHealingDealt === undefined) this.initBattleStatistics();
		return this._totalHealingDealt;
};

Game_Actor.prototype.increaseTotalHealingDealt = function(value) {
    value = value || 1;
		if (this._totalHealingDealt === undefined) this.initBattleStatistics();
		this._totalHealingDealt += value;
};

Game_Actor.prototype.totalHealingTaken = function() {
    if (this._totalHealingTaken === undefined) this.initBattleStatistics();
		return this._totalHealingTaken;
};

Game_Actor.prototype.increaseTotalHealingTaken = function(value) {
		value = value || 1;
		if (this._totalHealingTaken === undefined) this.initBattleStatistics();
		this._totalHealingTaken += value;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.BStats.Game_Action_executeHpDamage =
		Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    Yanfly.BStats.Game_Action_executeHpDamage.call(this, target, value);
		if (this.subject().isActor()) {
			if (value > 0) this.subject().increaseTotalDamageDealt(value);
			if (value < 0) this.subject().increaseTotalHealingDealt(-value);
		}
		if (target.isActor()) {
			if (value > 0) target.increaseTotalDamageTaken(value);
			if (value < 0) target.increaseTotalHealingTaken(-value);
		}
};

//=============================================================================
// Window_StatusCommand
//=============================================================================

Yanfly.BStats.Window_StatusCommand_createCommand =
		Window_StatusCommand.prototype.createCommand;
Window_StatusCommand.prototype.createCommand = function(command) {
		if (command.toUpperCase() === 'STATISTICS') {
			var text = Yanfly.Param.BStatsCmdName;
			this.addCommand(text, 'battleStatistics', true);
		} else {
			Yanfly.BStats.Window_StatusCommand_createCommand.call(this, command);
		}
};

Yanfly.BStats.Window_StatusCommand_addCustomCommands =
		Window_StatusCommand.prototype.addCustomCommands;
Window_StatusCommand.prototype.addCustomCommands = function() {
		Yanfly.BStats.Window_StatusCommand_addCustomCommands.call(this);
		if (this.findSymbol('battleStatistics') > -1) return;
		var text = Yanfly.Param.BStatsCmdName;
		this.addCommand(text, 'battleStatistics', true);
};

//=============================================================================
// Window_StatusInfo
//=============================================================================

Yanfly.BStats.Window_StatusInfo_drawInfoContents =
		Window_StatusInfo.prototype.drawInfoContents;
Window_StatusInfo.prototype.drawInfoContents = function(symbol) {
		if (symbol === 'battleStatistics') {
			this.drawBattleStatistics();
		} else {
			Yanfly.BStats.Window_StatusInfo_drawInfoContents.call(this, symbol);
		}
};

Window_StatusInfo.prototype.drawBattleStatistics = function() {
		this.resetFontSettings();
		this.drawBattleCount();
		this.drawKDACount();
		this.drawKDARatios();
		this.drawTotalDamageHealing();
};

Window_StatusInfo.prototype.drawBattleCount = function() {
		this.drawDarkRect(0, 0, this.contents.width, this.lineHeight());
		this.changeTextColor(this.systemColor());
		var p = this.textPadding();
		var text = Yanfly.Param.BStatsBCountText;
		this.drawText(text, p, 0, this.contents.width - p * 2);
		this.changeTextColor(this.normalColor());
		var fmt = Yanfly.Param.BStatsBCountFmt;
		var n1 = Yanfly.Util.toGroup(this._actor.battleCount());
		var n2 = Yanfly.Util.toGroup($gameSystem.battleCount());
		var n3 = parseInt(100 * this._actor.battleCount() / Math.max(1,
			$gameSystem.battleCount()));
		text = fmt.format(n1, n2, n3);
		this.drawText(text, p, 0, this.contents.width - p * 2, 'right');
};

Window_StatusInfo.prototype.drawKDACount = function() {
		var p = this.textPadding();
		var lh = this.lineHeight();
		var dw = this.contents.width / 2;
		this.drawDarkRect(0, lh * 1, dw, lh);
		this.drawDarkRect(0, lh * 2, dw, lh);
		this.drawDarkRect(0, lh * 3, dw, lh);
		this.changeTextColor(this.systemColor());
		var text = Yanfly.Param.BStatsKCountText;
		this.drawText(text, p, lh * 1, this.contents.width - p * 2);
		text = Yanfly.Param.BStatsDCountText;
		this.drawText(text, p, lh * 2, this.contents.width - p * 2);
		text = Yanfly.Param.BStatsACountText;
		this.drawText(text, p, lh * 3, this.contents.width - p * 2);
		this.changeTextColor(this.powerUpColor());
		text = Yanfly.Util.toGroup(this._actor.killCount());
		this.drawText(text, p, lh * 1, dw - p * 2, 'right');
		this.changeTextColor(this.powerDownColor());
		text = Yanfly.Util.toGroup(this._actor.deathCount());
		this.drawText(text, p, lh * 2, dw - p * 2, 'right');
		this.changeTextColor(this.normalColor());
		text = Yanfly.Util.toGroup(this._actor.assistCount());
		this.drawText(text, p, lh * 3, dw - p * 2, 'right');
};

Window_StatusInfo.prototype.drawKDARatios = function() {
		var p = this.textPadding();
		var lh = this.lineHeight();
		var dw = this.contents.width / 2;
		this.drawDarkRect(dw, lh * 1, dw, lh);
		this.drawDarkRect(dw, lh * 2, dw, lh);
		this.drawDarkRect(dw, lh * 3, dw, lh);
		this.changeTextColor(this.normalColor());
		var fmt = Yanfly.Param.BStatsKCountFmt;
		var ratio = Yanfly.Util.toGroup(this._actor.killCountRatio().toFixed(2));
		var text = fmt.format(ratio);
		this.drawText(text, dw + p, lh * 1, dw - p * 2, 'right');
		fmt = Yanfly.Param.BStatsDCountFmt;
		ratio = Yanfly.Util.toGroup(this._actor.deathCountRatio().toFixed(2));
		text = fmt.format(ratio);
		this.drawText(text, dw + p, lh * 2, dw - p * 2, 'right');
		fmt = Yanfly.Param.BStatsACountFmt;
		ratio = Yanfly.Util.toGroup(this._actor.assistCountRatio().toFixed(2));
		text = fmt.format(ratio);
		this.drawText(text, dw + p, lh * 3, dw - p * 2, 'right');
};

Window_StatusInfo.prototype.drawTotalDamageHealing = function() {
		var lh = this.lineHeight();
		var p = this.textPadding();
		this.drawDarkRect(0, lh * 4, this.contents.width, lh);
		this.drawDarkRect(0, lh * 5, this.contents.width, lh);
		this.drawDarkRect(0, lh * 6, this.contents.width, lh);
		this.drawDarkRect(0, lh * 7, this.contents.width, lh);
		this.changeTextColor(this.systemColor());
		var text = Yanfly.Param.BStatsDmgDealt;
		this.drawText(text, p, lh * 4, this.contents.width - p * 2);
		text = Yanfly.Param.BStatsDmgTaken;
		this.drawText(text, p, lh * 5, this.contents.width - p * 2);
		text = Yanfly.Param.BStatsHealDealt;
		this.drawText(text, p, lh * 6, this.contents.width - p * 2);
		text = Yanfly.Param.BStatsHealTaken;
		this.drawText(text, p, lh * 7, this.contents.width - p * 2);
		this.changeTextColor(this.normalColor());
		text = Yanfly.Util.toGroup(this._actor.totalDamageDealt());
		this.drawText(text, p, lh * 4, this.contents.width - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.totalDamageTaken());
		this.drawText(text, p, lh * 5, this.contents.width - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.totalHealingDealt());
		this.drawText(text, p, lh * 6, this.contents.width - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.totalHealingTaken());
		this.drawText(text, p, lh * 7, this.contents.width - p * 2, 'right');
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
