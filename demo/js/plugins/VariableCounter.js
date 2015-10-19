//=============================================================================
// Yanfly Engine Plugins - Template
// VariableCounter.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.VariableCounter = true;

var Yanfly = Yanfly || {};
Yanfly.VCN = Yanfly.VCN || {};

//=============================================================================
 /*:
 * @plugindesc ------------------------------------------------------
 * @author Yanfly Engine Plugins
 *
 * @param Window Text
 * @desc Use text codes here
 * @default \v[1]/\c[6]\v[2]\c[0] \c[4]Plugins\c[0]
 *
 * @help
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * showVCN      Shows the variable counter.
 * hideVCN      Hides the variable counter.
 * refreshVCN   Refreshes the variable counter.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('VariableCounter');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.VCNWindowText = String(Yanfly.Parameters['Window Text']);

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.VCN.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.VCN.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'showVCN') SceneManager._scene.showVCN();
		if (command === 'hideVCN') SceneManager._scene.hideVCN();
    if (command === 'refreshVCN') SceneManager._scene.refreshVCN();
};

//=============================================================================
// Window_VCN
//=============================================================================

function Window_VCN() {
    this.initialize.apply(this, arguments);
}

Window_VCN.prototype = Object.create(Window_Base.prototype);
Window_VCN.prototype.constructor = Window_VCN;

Window_VCN.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.opacity = 0;
};

Window_VCN.prototype.windowWidth = function() {
    return 240;
};

Window_VCN.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_VCN.prototype.refresh = function() {
    this.contents.clear();
    this.x = Graphics.boxWidth - this.width;
    this.y = 0;
    this.drawData();
};

Window_VCN.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

Window_VCN.prototype.drawData = function() {
    var text = Yanfly.Param.VCNWindowText;
    var wx = this.contents.width - this.textWidthEx(text);
    this.drawTextEx(text, wx, 0);
};

Window_VCN.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.VCN.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    Yanfly.VCN.Scene_Map_createAllWindows.call(this);
    this.createVCNWindow();
};

Scene_Map.prototype.createVCNWindow = function() {
    this._vcnWindow = new Window_VCN();
    this.addChild(this._vcnWindow);
    /*this._vcnWindow.hide();*/
};

Scene_Map.prototype.showVCN = function() {
    this._vcnWindow.show();
};

Scene_Map.prototype.hideVCN = function() {
    this._vcnWindow.hide();
};

Scene_Map.prototype.refreshVCN = function() {
    this._vcnWindow.refresh();
};

//=============================================================================
// End of File
//=============================================================================
