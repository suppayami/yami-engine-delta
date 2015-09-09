//=============================================================================
// Yanfly Engine Plugins - Stop All Move
// YEP_StopAllMove.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_StopAllMove = true;

var Yanfly = Yanfly || {};
Yanfly.SAM = Yanfly.SAM || {};

//=============================================================================
 /*:
 * @plugindesc Recover a function from the old RPG Makers where you can
 * cause all Events and/or the Player to be unable to move.
 * @author Yanfly Engine Plugins
 *
 * @help
 * Recover a function from the old RPG Makers where you can cause all Events
 * and/or the Player to be unable to move. To do so, make use of the following
 * Plugin Commands:
 *
 * Plugin Command:
 *   StopEventMove      Stops all events from being able to move.
 *   AllowEventMove     Enables events to be able to move again.
 *
 *   StopPlayerMove     Stops the player from being able to move.
 *   AllowPlayerMove    Enables player to be able to move again.
 */
//=============================================================================

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.SAM.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.SAM.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'StopEventMove') $gameSystem.stopEventMove(true);
		if (command === 'AllowEventMove') $gameSystem.stopEventMove(false);
		if (command === 'StopPlayerMove') $gameSystem.stopPlayerMove(true);
		if (command === 'AllowPlayerMove') $gameSystem.stopPlayerMove(false);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.SAM.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
		Yanfly.SAM.Game_System_initialize.call(this);
		this.initStopMove();
};

Game_System.prototype.initStopMove = function() {
		this._stopEventMove = false;
		this._stopPlayerMove = false;
};

Game_System.prototype.isEventMoveStopped = function() {
		if (this._stopEventMove === undefined) this.initStopMove();
		return this._stopEventMove;
};

Game_System.prototype.isPlayerMoveStopped = function() {
		if (this._stopPlayerMove === undefined) this.initStopMove();
		return this._stopPlayerMove;
};

Game_System.prototype.stopEventMove = function(value) {
		if (this._stopEventMove === undefined) this.initStopMove();
		this._stopEventMove = value;
};

Game_System.prototype.stopPlayerMove = function(value) {
		if (this._stopPlayerMove === undefined) this.initStopMove();
		this._stopPlayerMove = value;
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.SAM.Game_Player_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
    if ($gameSystem.isPlayerMoveStopped()) return;
		Yanfly.SAM.Game_Player_moveByInput.call(this);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.SAM.Game_Event_updateSelfMovement =
		Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if ($gameSystem.isEventMoveStopped()) return;
		Yanfly.SAM.Game_Event_updateSelfMovement.call(this);
};

//=============================================================================
// End of File
//=============================================================================
