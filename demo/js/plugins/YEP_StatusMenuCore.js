//=============================================================================
// Yanfly Engine Plugins - Status Menu Core
// YEP_StatusMenuCore.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_StatusMenuCore = true;

var Yanfly = Yanfly || {};
Yanfly.Status = Yanfly.Status || {};

//=============================================================================
 /*:
 * @plugindesc Changes the Status menu for your characters into a hub that
 * displays more character information.
 * @author Yanfly Engine Plugins
 *
 * @param ---Settings---
 * @default
 *
 * @param Command Order
 * @desc This is the order in which the command menu will appear. Use
 * a space to separate the individual commands.
 * @default General Parameters Custom Cancel
 *
 * @param Command Window Width
 * @desc This is the window width for the Command Window.
 * @default 240
 *
 * @param Command Window Rows
 * @desc This is the number of rows for the Command Window.
 * @default 4
 *
 * @param Command Alignment
 * @desc This is the text alignment for the Command Window.         .
 * left     center     right
 * @default center
 *
 * @param ---General---
 * @default
 *
 * @param General Command
 * @desc This is how the command for 'General' will appear.
 * @default General
 *
 * @param Parameters Text
 * @desc This is how the word 'Parameters' will appear.
 * @default Parameters
 *
 * @param Experience Text
 * @desc This is how the word 'Experience' will appear.
 * @default Experience
 *
 * @param Total Format
 * @desc This is the word total experience.
 * @default Total %1 for Next %2
 *
 * @param ---Parameters---
 * @default
 *
 * @param Parameters Command
 * @desc This is how the command for 'Parameters' will appear.
 * @default Parameters
 *
 * @param Graph Text
 * @desc This is how the words for 'Parameter Graph' appear.
 * @default Parameter Graph
 *
 * @param ATK Color
 * @desc This is the gauge color for ATK.                           .
 * #Color1 #Color2
 * @default #ed1c24 #f26c4f
 *
 * @param DEF Color
 * @desc This is the gauge color for DEF.                           .
 * #Color1 #Color2
 * @default #f7941d #fdc689
 *
 * @param MAT Color
 * @desc This is the gauge color for MAT.                           .
 * #Color1 #Color2
 * @default #605ca8 #bd8cbf
 *
 * @param MDF Color
 * @desc This is the gauge color for MDF.                           .
 * #Color1 #Color2
 * @default #448ccb #a6caf4
 *
 * @param AGI Color
 * @desc This is the gauge color for AGI.                           .
 * #Color1 #Color2
 * @default #39b54a #82ca9c
 *
 * @param LUK Color
 * @desc This is the gauge color for LUK.                           .
 * #Color1 #Color2
 * @default #fff568 #fffac3
 *
 * @help
 * This plugin replaces the Status menu with a whole new layout. Including the
 * function to display more information regarding the actor. You can change the
 * order commands appear in game with the Command Order parameter.
 *
 * To add more commands, insert extension plugins under this plugin in the
 * Plugin Manager. Then, it will appear automatically in the Command Order
 * where you placed the 'Custom' string or elsewhere if you've placed the
 * extension plugin's keyword elsewhere.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_StatusMenuCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.StatusCmdOrder = String(Yanfly.Parameters['Command Order']);
Yanfly.Param.StatusCmdWidth = Number(Yanfly.Parameters['Command Window Width']);
Yanfly.Param.StatusCmdRows = Number(Yanfly.Parameters['Command Window Rows']);
Yanfly.Param.StatusCmdAlign = String(Yanfly.Parameters['Command Alignment']);
Yanfly.Param.StatusGeneral = String(Yanfly.Parameters['General Command']);
Yanfly.Param.StatusParamText = String(Yanfly.Parameters['Parameters Text']);
Yanfly.Param.StatusExpText = String(Yanfly.Parameters['Experience Text']);
Yanfly.Param.StatusTotalFmt = String(Yanfly.Parameters['Total Format']);
Yanfly.Param.StatusParameters = String(Yanfly.Parameters['Parameters Command']);
Yanfly.Param.StatusGraphText = String(Yanfly.Parameters['Graph Text']);
Yanfly.Param.ColorParam2Gauge = String(Yanfly.Parameters['ATK Color']);
Yanfly.Param.ColorParam3Gauge = String(Yanfly.Parameters['DEF Color']);
Yanfly.Param.ColorParam4Gauge = String(Yanfly.Parameters['MAT Color']);
Yanfly.Param.ColorParam5Gauge = String(Yanfly.Parameters['MDF Color']);
Yanfly.Param.ColorParam6Gauge = String(Yanfly.Parameters['AGI Color']);
Yanfly.Param.ColorParam7Gauge = String(Yanfly.Parameters['LUK Color']);

//=============================================================================
// Window_StatusCommand
//=============================================================================

function Window_StatusCommand() {
    this.initialize.apply(this, arguments);
}

Window_StatusCommand.prototype = Object.create(Window_Command.prototype);
Window_StatusCommand.prototype.constructor = Window_StatusCommand;

Window_StatusCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this._actor = null;
};

Window_StatusCommand.prototype.windowWidth = function() {
    return Yanfly.Param.StatusCmdWidth;
};

Window_StatusCommand.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
    this.refresh();
		this.select(0);
};

Window_StatusCommand.prototype.numVisibleRows = function() {
    return Yanfly.Param.StatusCmdRows;
};

Window_StatusCommand.prototype.makeCommandList = function() {
		this._commandOrder = Yanfly.Param.StatusCmdOrder.split(' ');
		for (var i = 0; i < this._commandOrder.length; ++i) {
			var command = this._commandOrder[i];
			this.createCommand(command);
		}
};

Window_StatusCommand.prototype.createCommand = function(command) {
    if (['GENERAL', 'MAIN'].contains(command.toUpperCase())) {
			var text = Yanfly.Param.StatusGeneral;
			this.addCommand(text, 'general', true);
		} else if (['PARAMETER', 'PARAMETERS'].contains(command.toUpperCase())) {
			var text = Yanfly.Param.StatusParameters;
			this.addCommand(text, 'parameters', true);
		} else if (['CANCEL', 'FINISH'].contains(command.toUpperCase())) {
			this.addCommand(TextManager.cancel, 'cancel', true);
		} else if (['CUSTOM', 'ORIGINAL'].contains(command.toUpperCase())) {
			this.addCustomCommands();
		}
};

Window_StatusCommand.prototype.addCustomCommands = function() {
};

Window_StatusCommand.prototype.setInfoWindow = function(infoWindow) {
		this._infoWindow = infoWindow;
};

Window_StatusCommand.prototype.update = function() {
    Window_Command.prototype.update.call(this);
		if (this._infoWindow) this._infoWindow.setSymbol(this.currentSymbol());
};

Window_StatusCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.StatusCmdAlign;
};

//=============================================================================
// Window_StatusInfo
//=============================================================================

function Window_StatusInfo() {
    this.initialize.apply(this, arguments);
}

Window_StatusInfo.prototype = Object.create(Window_Base.prototype);
Window_StatusInfo.prototype.constructor = Window_StatusInfo;

Window_StatusInfo.prototype.initialize = function(y, commandWindow) {
    var width = Graphics.boxWidth;
		var height = Graphics.boxHeight - y;
		this._commandWindow = commandWindow;
		Window_Base.prototype.initialize.call(this, 0, y, width, height);
		this.findParamLimits();
};

Window_StatusInfo.prototype.findParamLimits = function() {
		this._largestParam = 1;
		this._smallestParam = $gameActors.actor(1).paramMax(2);
		for (var i = 0; i < $gameParty.members().length; ++i) {
			var actor = $gameParty.members()[i];
			if (!actor) continue;
			for (var j = 2; j < 8; ++j) {
				this._largestParam = Math.max(this._largestParam, actor.param(j));
				this._smallestParam = Math.min(this._smallestParam, actor.param(j));
			}
		}
};

Window_StatusInfo.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
    this.refresh();
};

Window_StatusInfo.prototype.setSymbol = function(symbol) {
    var needRefresh = this._symbol !== symbol;
		this._symbol = symbol;
		if (needRefresh) this.refresh();
};

Window_StatusInfo.prototype.refresh = function() {
    this.contents.clear();
		this.drawInfoContents(this._symbol);
};

Window_StatusInfo.prototype.drawInfoContents = function(symbol) {
		if (symbol === 'general') {
			this.drawGeneral();
		} else if (symbol === 'parameters') {
			this.drawParameters();
		} else {
			this.drawGeneral();
		}
};

Window_StatusInfo.prototype.drawGeneral = function() {
		var dx = this.standardPadding() / 2;
		var dy = this.lineHeight() / 2;
		var dw = (this.contents.width - this.standardPadding()) / 2;
		var dh = this.lineHeight();
		var text;
		this.changeTextColor(this.systemColor());
		this.drawText(Yanfly.Param.StatusParamText, dx, dy, dw, 'center');
		dx += this.contents.width / 2;
		this.drawText(Yanfly.Param.StatusExpText, dx, dy, dw, 'center');
		this.drawGeneralParam(dx, dy, dw, dh);
		this.drawGeneralExp(dx, dy, dw, dh);
};

Window_StatusInfo.prototype.drawGeneralParam = function() {
    var rect = new Rectangle();
    rect.width = (this.contents.width - this.standardPadding()) / 2;
    rect.y = this.lineHeight() * 2;
    rect.height = this.lineHeight();
    var dx = rect.x + this.textPadding();
    var dw = rect.width - this.textPadding() * 2;
    this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    this.changeTextColor(this.systemColor());
		this.drawText(TextManager.level, dx, rect.y, dw, 'left');
		this.changeTextColor(this.normalColor());
		text = Yanfly.Util.toGroup(this._actor.level);
		this.drawText(text, dx, rect.y, dw, 'right');
    for (var i = 0; i < 8; ++i) {
      if (i < 2) {
        rect.y += this.lineHeight();
      } else if (i === 2) {
        rect.y += this.lineHeight();
        rect.width /= 2;
        dw = rect.width - this.textPadding() * 2;
      } else if (i % 2 === 0) {
        rect.x = 0;
        dx = rect.x + this.textPadding();
        rect.y += this.lineHeight();
      } else {
        rect.x += rect.width;
        dx += rect.width;
      }
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
      this.changeTextColor(this.systemColor());
  		this.drawText(TextManager.param(i), dx, rect.y, dw, 'left');
  		this.changeTextColor(this.normalColor());
  		text = Yanfly.Util.toGroup(this._actor.param(i));
  		this.drawText(text, dx, rect.y, dw, 'right');
    }
};

Window_StatusInfo.prototype.drawGeneralExp = function(dx, dy, dw, dh) {
    dy = this.lineHeight() * 2;
    dw = (this.contents.width - this.textPadding()) / 2;
    dx = this.textPadding() + dw;
    this.changeTextColor(this.systemColor());
    text = TextManager.expTotal.format(TextManager.exp);
    this.drawText(text, dx, dy, dw, 'left');
    dy += this.lineHeight();
    this.changeTextColor(this.normalColor());
    text = Yanfly.Util.toGroup(this._actor.currentExp());
    this.drawText(text, dx, dy, dw, 'right');
    dy += this.lineHeight();
    this.changeTextColor(this.systemColor());
    text = TextManager.expNext.format(TextManager.level);
    this.drawText(text, dx, dy, dw, 'left');
    dy += this.lineHeight();
    this.changeTextColor(this.normalColor());
    text = Yanfly.Util.toGroup(this._actor.nextRequiredExp());
    if (this._actor.isMaxLevel()) text = '-------';
    this.drawText(text, dx, dy, dw, 'right');
    dy += this.lineHeight();
    this.changeTextColor(this.systemColor());
    text = Yanfly.Param.StatusTotalFmt.format(TextManager.exp,
        TextManager.level);
    this.drawText(text, dx, dy, dw, 'left');
    dy += this.lineHeight();
    this.changeTextColor(this.normalColor());
    text = Yanfly.Util.toGroup(this._actor.nextLevelExp());
    if (this._actor.isMaxLevel()) text = '-------';
    this.drawText(text, dx, dy, dw, 'right');
};

Window_StatusInfo.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_StatusInfo.prototype.drawParameters = function() {
		var dx = 0;
		var dy = this.lineHeight() / 2;
		var dw = this.contents.width;
		var dh = this.lineHeight();
		var dw2;
		var text;
		this.changeTextColor(this.systemColor());
		this.drawText(Yanfly.Param.StatusGraphText, dx, dy, dw, 'center');
		dy = this.lineHeight();
		dx = this.standardPadding();
		dw -= this.standardPadding() * 2;
		for (var i = 2; i < 8; ++i) {
			dy += this.lineHeight();
			var rate = this.drawParamGauge(dx, dy, dw, i);
			this.changeTextColor(this.systemColor());
			this.drawText(TextManager.param(i), dx + 4, dy, dw - 4);
			text = Yanfly.Util.toGroup(this._actor.param(i))
			this.changeTextColor(this.normalColor());
			dw2 = dw * rate;
			this.drawText(text, dx, dy, dw2 - 4, 'right');
		}
};

Window_StatusInfo.prototype.drawParamGauge = function(dx, dy, dw, paramId) {
		var rate = this.calcParamRate(paramId);
		var array = eval('Yanfly.Param.ColorParam' + paramId + 'Gauge').split(' ');
		this.drawGauge(dx, dy, dw, rate, array[0], array[1]);
		return rate;
};

Window_StatusInfo.prototype.calcParamRate = function(paramId) {
		if (this._largestParam === this._smallestParam) return 1.0;
		var rate = parseFloat(this._actor.param(paramId) - this._smallestParam) /
							 parseFloat(this._largestParam - this._smallestParam);
		rate *= 0.7;
		rate += 0.3;
		return rate;
};

//=============================================================================
// Scene_Status
//=============================================================================

Scene_Status.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
		this.createCommandWindow();
		this.createStatusWindow();
		this.createInfoWindow();
    this.refreshActor();
};

Scene_Status.prototype.refreshActor = function() {
		var actor = this.actor();
		this._statusWindow.setActor(actor);
		this._helpWindow.setText(actor.profile());
		this._infoWindow.setActor(actor);
};

Scene_Status.prototype.onActorChange = function() {
    this.refreshActor();
    this._commandWindow.activate();
};

Scene_Status.prototype.createCommandWindow = function() {
		this._commandWindow = new Window_StatusCommand();
		this._commandWindow.x = 0;
		this._commandWindow.y = this._helpWindow.height;
		this.setCommandWindowHandlers();
		this.addWindow(this._commandWindow);
};

Scene_Status.prototype.setCommandWindowHandlers = function() {
		this._commandWindow.setHandler('cancel', this.popScene.bind(this));
		this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup',   this.previousActor.bind(this));
};

Scene_Status.prototype.createStatusWindow = function() {
    var wx = this._commandWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._commandWindow.height;
    this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
};

Scene_Status.prototype.createInfoWindow = function() {
		var wy = this._helpWindow.height + this._commandWindow.height;
		this._infoWindow = new Window_StatusInfo(wy, this._commandWindow);
		this._commandWindow.setInfoWindow(this._infoWindow);
		this.addWindow(this._infoWindow);
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
