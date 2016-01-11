//=============================================================================
// Yanfly Engine Plugins - Status Menu Core
// YEP_StatusMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_StatusMenuCore = true;

var Yanfly = Yanfly || {};
Yanfly.Status = Yanfly.Status || {};

//=============================================================================
 /*:
 * @plugindesc v1.01a Changes the Status menu for your characters into
 * a hub that displays more character information.
 * @author Yanfly Engine Plugins
 *
 * @param ---Settings---
 * @default
 *
 * @param Command Order
 * @desc This is the order in which the command menu will appear. Use
 * a space to separate the individual commands.
 * @default General Parameters Elements States Attributes Custom Cancel
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
 * @desc This is the text alignment for the Command Window.
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
 * @param EXP Gauge Color 1
 * @desc The skin color used in EXP Gauge Color 1 shown in the
 * status window.
 * @default 30
 *
 * @param EXP Gauge Color 2
 * @desc The skin color used in EXP Gauge Color 2 shown in the
 * status window.
 * @default 31
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
 * @desc This is the gauge color for ATK.
 * #Color1 #Color2
 * @default #ed1c24 #f26c4f
 *
 * @param DEF Color
 * @desc This is the gauge color for DEF.
 * #Color1 #Color2
 * @default #f7941d #fdc689
 *
 * @param MAT Color
 * @desc This is the gauge color for MAT.
 * #Color1 #Color2
 * @default #605ca8 #bd8cbf
 *
 * @param MDF Color
 * @desc This is the gauge color for MDF.
 * #Color1 #Color2
 * @default #448ccb #a6caf4
 *
 * @param AGI Color
 * @desc This is the gauge color for AGI.
 * #Color1 #Color2
 * @default #39b54a #82ca9c
 *
 * @param LUK Color
 * @desc This is the gauge color for LUK.
 * #Color1 #Color2
 * @default #fff568 #fffac3
 *
 * @param ---Resist Colors---
 * @default
 *
 * @param Above 300%
 * @desc This is the text color for rates over 300%.
 * @default 10
 *
 * @param 200% to 300%
 * @desc This is the text color for rates over 200%.
 * @default 20
 *
 * @param 150% to 200%
 * @desc This is the text color for rates over 150%.
 * @default 14
 *
 * @param 120% to 150%
 * @desc This is the text color for rates over 120%.
 * @default 6
 *
 * @param 100% to 120%
 * @desc This is the text color for rates over 100%.
 * @default 0
 *
 * @param 80% to 100%
 * @desc This is the text color for rates over 80%.
 * @default 24
 *
 * @param 50% to 80%
 * @desc This is the text color for rates over 50%.
 * @default 29
 *
 * @param 1% to 50%
 * @desc This is the text color for rates over 1%.
 * @default 23
 *
 * @param Exactly 0%
 * @desc This is the text color for rates exactly 0%.
 * @default 31
 *
 * @param Below 0%
 * @desc This is the text color for rates below 0%.
 * @default 27
 *
 * @param ---Elements---
 * @default
 *
 * @param Elements Command
 * @desc This is how the command for 'Elements' will appear.
 * @default Elements
 *
 * @param Elements Decimal
 * @desc How many decimal places to display for rates.
 * @default 2
 *
 * @param Element Column 1
 * @desc These are the element ID's drawn in column 1.
 * Separate these element ID's with a space.
 * @default 1
 *
 * @param Element Column 2
 * @desc These are the element ID's drawn in column 2.
 * Separate these element ID's with a space.
 * @default 2 3 4 5 6 7 8 9
 *
 * @param Element Column 3
 * @desc These are the element ID's drawn in column 3.
 * Separate these element ID's with a space.
 * @default
 *
 * @param Element Column 4
 * @desc These are the element ID's drawn in column 4.
 * Separate these element ID's with a space.
 * @default
 *
 * @param ---State---
 * @default
 *
 * @param States Command
 * @desc This is how the command for 'States' will appear.
 * @default States
 *
 * @param States Decimal
 * @desc How many decimal places to display for rates.
 * @default 2
 *
 * @param States Column 1
 * @desc These are the state ID's drawn in column 1.
 * Separate these state ID's with a space.
 * @default 1 4 5 6
 *
 * @param States Column 2
 * @desc These are the state ID's drawn in column 2.
 * Separate these state ID's with a space.
 * @default 7 8 9 10
 *
 * @param States Column 3
 * @desc These are the state ID's drawn in column 3.
 * Separate these state ID's with a space.
 * @default
 *
 * @param States Column 4
 * @desc These are the state ID's drawn in column 4.
 * Separate these state ID's with a space.
 * @default
 *
 * @param ---Attributes---
 * @default
 *
 * @param Attributes Command
 * @desc This is how the command for 'Attributes' will appear.
 * @default Attributes
 *
 * @param Attribute Font Size
 * @desc The font size used to display attributes.
 * Default: 28
 * @default 20
 *
 * @param Attribute Decimal
 * @desc How many decimal places to display for rates.
 * @default 0
 *
 * @param Attributes Column 1
 * @desc These are the attributes drawn in column 1.
 * Separate these attributes with a space.
 * @default exr hit eva cri cev mev mrf cnt
 *
 * @param Attributes Column 2
 * @desc These are the attributes drawn in column 2.
 * Separate these attributes with a space.
 * @default mcr tcr pdr mdr fdr grd rec pha
 *
 * @param Attributes Column 3
 * @desc These are the attributes drawn in column 3.
 * Separate these attributes with a space.
 * @default hrg mrg trg tgr
 *
 * @param Attributes Column 4
 * @desc These are the attributes drawn in column 4.
 * Separate these attributes with a space.
 * @default
 *
 * @param hit Name
 * @desc The text name used for this attribute.
 * @default Hit Rate
 *
 * @param eva Name
 * @desc The text name used for this attribute.
 * @default Evasion Rate
 *
 * @param cri Name
 * @desc The text name used for this attribute.
 * @default Critical Hit Rate
 *
 * @param cev Name
 * @desc The text name used for this attribute.
 * @default Critical Evasion Rate
 *
 * @param mev Name
 * @desc The text name used for this attribute.
 * @default Magic Evasion Rate
 *
 * @param mrf Name
 * @desc The text name used for this attribute.
 * @default Magic Reflect Rate
 *
 * @param cnt Name
 * @desc The text name used for this attribute.
 * @default Counter Rate
 *
 * @param hrg Name
 * @desc The text name used for this attribute.
 * @default HP Regen Rate
 *
 * @param mrg Name
 * @desc The text name used for this attribute.
 * @default MP Regen Rate
 *
 * @param trg Name
 * @desc The text name used for this attribute.
 * @default TP Regen Rate
 *
 * @param tgr Name
 * @desc The text name used for this attribute.
 * @default Aggro Rate
 *
 * @param grd Name
 * @desc The text name used for this attribute.
 * @default Guard Effect
 *
 * @param rec Name
 * @desc The text name used for this attribute.
 * @default Recovery Effect
 *
 * @param pha Name
 * @desc The text name used for this attribute.
 * @default Pharmacology Effect
 *
 * @param mcr Name
 * @desc The text name used for this attribute.
 * @default MP Cost Rate
 *
 * @param tcr Name
 * @desc The text name used for this attribute.
 * @default TP Charge Rate
 *
 * @param pdr Name
 * @desc The text name used for this attribute.
 * @default Physical Damage Rate
 *
 * @param mdr Name
 * @desc The text name used for this attribute.
 * @default Magical Damage Rate
 *
 * @param fdr Name
 * @desc The text name used for this attribute.
 * @default Floor Damage Rate
 *
 * @param exr Name
 * @desc The text name used for this attribute.
 * @default Experience Rate
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin replaces the Status menu with a whole new layout. Including the
 * function to display more information regarding the actor. You can change the
 * order commands appear in game with the Command Order parameter.
 *
 * To add more commands, insert extension plugins under this plugin in the
 * Plugin Manager. Then, it will appear automatically in the Command Order
 * where you placed the 'Custom' string or elsewhere if you've placed the
 * extension plugin's keyword elsewhere.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * You can add and remove commands from the Command Window by changing the
 * 'Command Order' parameter. Here is a list of commands you may use:
 *
 *    General
 *    - Displays the current current stats and EXP for the actor.
 *
 *    Parameters
 *    - Displays a parameter gauge of the actor relative to other stats.
 *
 *    Elements
 *    - Displays the listed elements and their elemental rates.
 *
 *    States
 *    - Displays the listed states and their status infliction rates.
 *
 *    Attributes
 *    - Displays the listed attributes and their rates.
 *
 *    Custom
 *    - If you have any custom status window items to display, they will
 *    appear here.
 *
 *    Cancel
 *    - Adds a cancel command for leaving the Status Menu.
 *
 * ============================================================================
 * Adding Icons to Elements and Attributes
 * ============================================================================
 *
 * You can use icons for elements and attributes by using text codes.
 *
 * In the RPG Maker MV editor's database, types tab, for the elements, name
 * them as such:
 *
 * \i[64]Fire
 *
 * This will enable you to give the element an icon. You can also change the
 * text color and such using any of the available text codes.
 *
 * The same is applied for Attributes except you modify it within this plugin's
 * parameters. If you wish to display 'HP Regen Rate' with an icon, name it:
 *
 * \i[72]HP Regen Rate
 *
 * The icons will be drawn for the said attributes in addition to any other
 * text code modifications used.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01a:
 * - Converted Window_StatusInfo to Window_Selectable for those who would like
 * to use it as such.
 *
 * Version 1.00:
 * - Finished Plugin!
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
Yanfly.Param.ColorExp1 = Number(Yanfly.Parameters['EXP Gauge Color 1']);
Yanfly.Param.ColorExp2 = Number(Yanfly.Parameters['EXP Gauge Color 2']);

Yanfly.Param.StatusParameters = String(Yanfly.Parameters['Parameters Command']);
Yanfly.Param.StatusGraphText = String(Yanfly.Parameters['Graph Text']);
Yanfly.Param.ColorParam2Gauge = String(Yanfly.Parameters['ATK Color']);
Yanfly.Param.ColorParam3Gauge = String(Yanfly.Parameters['DEF Color']);
Yanfly.Param.ColorParam4Gauge = String(Yanfly.Parameters['MAT Color']);
Yanfly.Param.ColorParam5Gauge = String(Yanfly.Parameters['MDF Color']);
Yanfly.Param.ColorParam6Gauge = String(Yanfly.Parameters['AGI Color']);
Yanfly.Param.ColorParam7Gauge = String(Yanfly.Parameters['LUK Color']);

Yanfly.Param.ColorResistS = Number(Yanfly.Parameters['Above 300%']);
Yanfly.Param.ColorResistA = Number(Yanfly.Parameters['200% to 300%']);
Yanfly.Param.ColorResistB = Number(Yanfly.Parameters['150% to 200%']);
Yanfly.Param.ColorResistC1 = Number(Yanfly.Parameters['120% to 150%']);
Yanfly.Param.ColorResistC2 = Number(Yanfly.Parameters['100% to 120%']);
Yanfly.Param.ColorResistC3 = Number(Yanfly.Parameters['80% to 100%']);
Yanfly.Param.ColorResistD = Number(Yanfly.Parameters['50% to 80%']);
Yanfly.Param.ColorResistE = Number(Yanfly.Parameters['1% to 50%']);
Yanfly.Param.ColorResistF = Number(Yanfly.Parameters['Exactly 0%']);
Yanfly.Param.ColorResistG = Number(Yanfly.Parameters['Below 0%']);

Yanfly.Param.StatusElements = String(Yanfly.Parameters['Elements Command']);
Yanfly.Param.StatusEleDec = Number(Yanfly.Parameters['Elements Decimal']);
Yanfly.Param.StatusEleCol1 = String(Yanfly.Parameters['Element Column 1']);
Yanfly.Param.StatusEleCol1 = Yanfly.Param.StatusEleCol1.split(' ');
Yanfly.Param.StatusEleCol2 = String(Yanfly.Parameters['Element Column 2']);
Yanfly.Param.StatusEleCol2 = Yanfly.Param.StatusEleCol2.split(' ');
Yanfly.Param.StatusEleCol3 = String(Yanfly.Parameters['Element Column 3']);
Yanfly.Param.StatusEleCol3 = Yanfly.Param.StatusEleCol3.split(' ');
Yanfly.Param.StatusEleCol4 = String(Yanfly.Parameters['Element Column 4']);
Yanfly.Param.StatusEleCol4 = Yanfly.Param.StatusEleCol4.split(' ');

Yanfly.Param.StatusStates = String(Yanfly.Parameters['States Command']);
Yanfly.Param.StatusStatesDec = Number(Yanfly.Parameters['States Decimal']);
Yanfly.Param.StatusStateCol1 = String(Yanfly.Parameters['States Column 1']);
Yanfly.Param.StatusStateCol1 = Yanfly.Param.StatusStateCol1.split(' ');
Yanfly.Param.StatusStateCol2 = String(Yanfly.Parameters['States Column 2']);
Yanfly.Param.StatusStateCol2 = Yanfly.Param.StatusStateCol2.split(' ');
Yanfly.Param.StatusStateCol3 = String(Yanfly.Parameters['States Column 3']);
Yanfly.Param.StatusStateCol3 = Yanfly.Param.StatusStateCol3.split(' ');
Yanfly.Param.StatusStateCol4 = String(Yanfly.Parameters['States Column 4']);
Yanfly.Param.StatusStateCol4 = Yanfly.Param.StatusStateCol4.split(' ');

Yanfly.Param.StatusAttributes = String(Yanfly.Parameters['Attributes Command']);
Yanfly.Param.StatusAttriCol1 = String(Yanfly.Parameters['Attributes Column 1']);
Yanfly.Param.StatusAttriCol1 = Yanfly.Param.StatusAttriCol1.split(' ');
Yanfly.Param.StatusAttriCol2 = String(Yanfly.Parameters['Attributes Column 2']);
Yanfly.Param.StatusAttriCol2 = Yanfly.Param.StatusAttriCol2.split(' ');
Yanfly.Param.StatusAttriCol3 = String(Yanfly.Parameters['Attributes Column 3']);
Yanfly.Param.StatusAttriCol3 = Yanfly.Param.StatusAttriCol3.split(' ');
Yanfly.Param.StatusAttriCol4 = String(Yanfly.Parameters['Attributes Column 4']);
Yanfly.Param.StatusAttriCol4 = Yanfly.Param.StatusAttriCol4.split(' ');
Yanfly.Param.StatusAttrSize = Number(Yanfly.Parameters['Attribute Font Size']);
Yanfly.Param.StatusAttrDec = Number(Yanfly.Parameters['Attribute Decimal']);
Yanfly.Param.StatusAttr_hit = String(Yanfly.Parameters['hit Name']);
Yanfly.Param.StatusAttr_eva = String(Yanfly.Parameters['eva Name']);
Yanfly.Param.StatusAttr_cri = String(Yanfly.Parameters['cri Name']);
Yanfly.Param.StatusAttr_cev = String(Yanfly.Parameters['cev Name']);
Yanfly.Param.StatusAttr_mev = String(Yanfly.Parameters['mev Name']);
Yanfly.Param.StatusAttr_mrf = String(Yanfly.Parameters['mrf Name']);
Yanfly.Param.StatusAttr_cnt = String(Yanfly.Parameters['cnt Name']);
Yanfly.Param.StatusAttr_hrg = String(Yanfly.Parameters['hrg Name']);
Yanfly.Param.StatusAttr_mrg = String(Yanfly.Parameters['mrg Name']);
Yanfly.Param.StatusAttr_trg = String(Yanfly.Parameters['trg Name']);
Yanfly.Param.StatusAttr_tgr = String(Yanfly.Parameters['tgr Name']);
Yanfly.Param.StatusAttr_grd = String(Yanfly.Parameters['grd Name']);
Yanfly.Param.StatusAttr_rec = String(Yanfly.Parameters['rec Name']);
Yanfly.Param.StatusAttr_pha = String(Yanfly.Parameters['pha Name']);
Yanfly.Param.StatusAttr_mcr = String(Yanfly.Parameters['mcr Name']);
Yanfly.Param.StatusAttr_tcr = String(Yanfly.Parameters['tcr Name']);
Yanfly.Param.StatusAttr_pdr = String(Yanfly.Parameters['pdr Name']);
Yanfly.Param.StatusAttr_mdr = String(Yanfly.Parameters['mdr Name']);
Yanfly.Param.StatusAttr_fdr = String(Yanfly.Parameters['fdr Name']);
Yanfly.Param.StatusAttr_exr = String(Yanfly.Parameters['exr Name']);

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
    command = command.toUpperCase();
    if (['GENERAL', 'MAIN'].contains(command)) {
			var text = Yanfly.Param.StatusGeneral;
			this.addCommand(text, 'general', true);
		} else if (['CANCEL', 'FINISH'].contains(command)) {
			this.addCommand(TextManager.cancel, 'cancel', true);
		} else if (['CUSTOM', 'ORIGINAL'].contains(command)) {
			this.addCustomCommands();
		} else if (['PARAMETER', 'PARAMETERS'].contains(command)) {
      var text = Yanfly.Param.StatusParameters;
      this.addCommand(text, 'parameters', true);
    } else if (['ELEMENT', 'ELEMENTS'].contains(command)) {
      var text = Yanfly.Param.StatusElements;
      this.addCommand(text, 'elements', true);
    } else if (['STATE', 'STATES'].contains(command)) {
      var text = Yanfly.Param.StatusStates;
      this.addCommand(text, 'states', true);
    } else if (['ATTRIBUTE', 'ATTRIBUTES'].contains(command)) {
      var text = Yanfly.Param.StatusAttributes;
      this.addCommand(text, 'attributes', true);
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

Window_StatusCommand.prototype.playOkSound = function() {
    if (this.isPlayOkSound()) SoundManager.playOk();
};

Window_StatusCommand.prototype.isPlayOkSound = function() {
    if (this.currentSymbol() === 'cancel') return true;
    return false;
};

//=============================================================================
// Window_StatusInfo
//=============================================================================

function Window_StatusInfo() {
    this.initialize.apply(this, arguments);
}

Window_StatusInfo.prototype = Object.create(Window_Selectable.prototype);
Window_StatusInfo.prototype.constructor = Window_StatusInfo;

Window_StatusInfo.prototype.initialize = function(y, commandWindow) {
    var width = Graphics.boxWidth;
		var height = Graphics.boxHeight - y;
		this._commandWindow = commandWindow;
		Window_Selectable.prototype.initialize.call(this, 0, y, width, height);
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

Window_StatusInfo.prototype.resetFontSettings = function() {
    if (this._bypassResetText) return;
    Window_Base.prototype.resetFontSettings.call(this);
};

Window_StatusInfo.prototype.resetTextColor = function() {
    if (this._bypassResetTextColor) return;
    Window_Base.prototype.resetTextColor.call(this);
};

Window_StatusInfo.prototype.refresh = function() {
    this.contents.clear();
		this.drawInfoContents(this._symbol);
};

Window_StatusInfo.prototype.drawInfoContents = function(symbol) {
    this.resetFontSettings();
    if (!symbol) return;
    switch (symbol.toLowerCase()) {
    case 'parameters':
      this.drawParameters();
      break;
    case 'elements':
      this.drawElements();
      break;
    case 'states':
      this.drawStates();
      break;
    case 'attributes':
      this.drawAttributes();
      break;
    default:
      this.drawGeneral();
      break;
    }
};

Window_StatusInfo.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
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

Window_StatusInfo.prototype.actorCurrentExpRate = function(actor) {
    var actorLv = actor.level;
    if (actorLv === actor.maxLevel()) return 1.0;
    var nowExp = actor.currentExp() - actor.expForLevel(actorLv);
    var nextExp = actor.expForLevel(actorLv + 1) - actor.expForLevel(actorLv);
    return (1.0 * nowExp / nextExp).clamp(0.0, 1.0);
};

Window_StatusInfo.prototype.actorExpRate = function(actor) {
    var actorLv = actor.level;
    if (actorLv === actor.maxLevel()) return 1.0;
    var nowExp = actor.currentExp();
    var nextExp = actor.expForLevel(actorLv + 1);
    return (1.0 * nowExp / nextExp).clamp(0.0, 1.0);
};

Window_StatusInfo.prototype.drawExpGauge = function(actor, rate, rect) {
    var color1 = this.textColor(Yanfly.Param.ColorExp1);
    var color2 = this.textColor(Yanfly.Param.ColorExp2);
    var wy = rect.y;
    this.drawGauge(rect.x, wy, rect.width, rate, color1, color2);
};

Window_StatusInfo.prototype.drawGeneralExp = function(dx, dy, dw, dh) {
    dy = this.lineHeight() * 2;
    dw = (this.contents.width - this.textPadding()) / 2;
    dx = this.textPadding() + dw;
    // Current Exp
    this.changeTextColor(this.systemColor());
    text = TextManager.expTotal.format(TextManager.exp);
    this.drawText(text, dx, dy, dw, 'left');
    dy += this.lineHeight();
    this.changeTextColor(this.normalColor());
    text = Yanfly.Util.toGroup(this._actor.currentExp());
    this.drawText(text, dx, dy, dw, 'right');
    // To Next Level
    dy += this.lineHeight();
    this.changeTextColor(this.systemColor());
    text = TextManager.expNext.format(TextManager.level);
    this.drawText(text, dx, dy, dw, 'left');
    dy += this.lineHeight();
    var rect = new Rectangle();
    rect.x = dx; rect.y = dy; rect.width = dw;
    var rate = this.actorCurrentExpRate(this._actor);
    this.drawExpGauge(this._actor, rate, rect);
    this.changeTextColor(this.normalColor());
    text = Yanfly.Util.toGroup(this._actor.nextRequiredExp());
    if (this._actor.isMaxLevel()) text = '-------';
    this.drawText(text, dx, dy, dw, 'right');
    // Total EXP for Next Level
    dy += this.lineHeight();
    this.changeTextColor(this.systemColor());
    text = Yanfly.Param.StatusTotalFmt.format(TextManager.exp,
        TextManager.level);
    this.drawText(text, dx, dy, dw, 'left');
    dy += this.lineHeight();
    var rect = new Rectangle();
    rect.x = dx; rect.y = dy; rect.width = dw;
    var rate = this.actorExpRate(this._actor);
    this.drawExpGauge(this._actor, rate, rect);
    this.changeTextColor(this.normalColor());
    text = Yanfly.Util.toGroup(this._actor.nextLevelExp());
    if (this._actor.isMaxLevel()) text = '-------';
    this.drawText(text, dx, dy, dw, 'right');
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

Window_StatusInfo.prototype.getMaxArrayCols = function(array) {
    var maxCols = 0;
    for (var i = 0; i < array.length; ++i) {
      var arr = array[i];
      if (arr[0] !== '') ++maxCols;
    }
    return maxCols;
};

Window_StatusInfo.prototype.getMaxArrayRows = function(array) {
    var maxRows = 0;
    for (var i = 0; i < array.length; ++i) {
      var arr = array[i];
      maxRows = Math.max(maxRows, arr.length);
    }
    return maxRows;
};

Window_StatusInfo.prototype.getArrayX = function() {
    return this.standardPadding() * 1.5;
};

Window_StatusInfo.prototype.getArrayY = function() {
    return 0;
};

Window_StatusInfo.prototype.getArrayDW = function(maxCols) {
    var dw = this.contents.width - this.standardPadding() * 3;
    dw /= maxCols;
    dw += this.standardPadding() / maxCols;
    dw -= this.standardPadding();
    return dw;
};

Window_StatusInfo.prototype.setRateColor = function(rate) {
    var colorId = 0;
    if (rate >= 3.0) {
      colorId = Yanfly.Param.ColorResistS;
    } else if (rate >= 2.0) {
      colorId = Yanfly.Param.ColorResistA;
    } else if (rate >= 1.5) {
      colorId = Yanfly.Param.ColorResistB;
    } else if (rate >= 1.2) {
      colorId = Yanfly.Param.ColorResistC1;
    } else if (rate >= 1.0) {
      colorId = Yanfly.Param.ColorResistC2;
    } else if (rate >= 0.8) {
      colorId = Yanfly.Param.ColorResistC3;
    } else if (rate >= 0.5) {
      colorId = Yanfly.Param.ColorResistD;
    } else if (rate > 0) {
      colorId = Yanfly.Param.ColorResistE;
    } else if (rate === 0) {
      colorId = Yanfly.Param.ColorResistF;
    } else {
      colorId = Yanfly.Param.ColorResistG;
    }
    this.changeTextColor(this.textColor(colorId));
};

Window_StatusInfo.prototype.drawElements = function() {
    this.drawElementColumnRects();
    this.drawElementInfo();
};

Window_StatusInfo.prototype.elementArray = function() {
    var array = [
      Yanfly.Param.StatusEleCol1,
      Yanfly.Param.StatusEleCol2,
      Yanfly.Param.StatusEleCol3,
      Yanfly.Param.StatusEleCol4
    ];
    return array;
};

Window_StatusInfo.prototype.drawElementColumnRects = function() {
    var maxCols = this.getMaxArrayCols(this.elementArray());
    var maxRows = this.getMaxArrayRows(this.elementArray());
    if (maxCols <= 0) return;
    var dx = this.getArrayX();
    var dy = this.getArrayY();
    var dw = this.getArrayDW(maxCols);
    for (var i = 0; i < maxCols; ++i) {
      for (var j = 0; j < maxRows; ++j) {
        this.drawDarkRect(dx, dy, dw, this.lineHeight());
        dy += this.lineHeight();
      }
      dx += dw;
      dx += (maxCols > 1) ? this.standardPadding() : 0;
      dy = 0;
    }
};

Window_StatusInfo.prototype.drawElementInfo = function() {
    var maxCols = this.getMaxArrayCols(this.elementArray());
    var maxRows = this.getMaxArrayRows(this.elementArray());
    if (maxCols <= 0) return;
    var infoArray = this.elementArray();
    var dx = this.getArrayX();
    var dy = this.getArrayY();
    var dw = this.getArrayDW(maxCols);
    for (var i = 0; i < maxCols; ++i) {
      for (var j = 0; j < infoArray[i].length; ++j) {
        var eleId = infoArray[i][j];
        this.drawElementData(eleId, dx, dy, dw)
        dy += this.lineHeight();
      }
      dx += dw;
      dx += (maxCols > 1) ? this.standardPadding() : 0;
      dy = 0;
    }
};

Window_StatusInfo.prototype.drawElementData = function(eleId, dx, dy, dw) {
    eleId = parseInt(eleId);
    var eleName = $dataSystem.elements[eleId];
    var eleRate = this._actor.elementRate(eleId);
    dx += this.textPadding();
    dw -= this.textPadding() * 2;
    this._bypassResetTextColor = true;
    this.changeTextColor(this.systemColor());
    this.drawTextEx(eleName, dx, dy);
    this._bypassResetTextColor = false;
    this.setRateColor(eleRate);
    var text = (eleRate * 100).toFixed(Yanfly.Param.StatusEleDec) + '%';
    this.drawText(text, dx, dy, dw, 'right');
};

Window_StatusInfo.prototype.drawStates = function() {
    this.drawStatesColumnRects();
    this.drawStatesInfo();
};

Window_StatusInfo.prototype.stateArray = function() {
    var array = [
      Yanfly.Param.StatusStateCol1,
      Yanfly.Param.StatusStateCol2,
      Yanfly.Param.StatusStateCol3,
      Yanfly.Param.StatusStateCol4
    ];
    return array;
};

Window_StatusInfo.prototype.drawStatesColumnRects = function() {
    var maxCols = this.getMaxArrayCols(this.stateArray());
    var maxRows = this.getMaxArrayRows(this.stateArray());
    if (maxCols <= 0) return;
    var dx = this.getArrayX();
    var dy = this.getArrayY();
    var dw = this.getArrayDW(maxCols);
    for (var i = 0; i < maxCols; ++i) {
      for (var j = 0; j < maxRows; ++j) {
        this.drawDarkRect(dx, dy, dw, this.lineHeight());
        dy += this.lineHeight();
      }
      dx += dw;
      dx += (maxCols > 1) ? this.standardPadding() : 0;
      dy = 0;
    }
};

Window_StatusInfo.prototype.drawStatesInfo = function() {
    var maxCols = this.getMaxArrayCols(this.stateArray());
    var maxRows = this.getMaxArrayRows(this.stateArray());
    if (maxCols <= 0) return;
    var infoArray = this.stateArray();
    var dx = this.getArrayX();
    var dy = this.getArrayY();
    var dw = this.getArrayDW(maxCols);
    for (var i = 0; i < maxCols; ++i) {
      for (var j = 0; j < infoArray[i].length; ++j) {
        var stateId = infoArray[i][j];
        this.drawStatesData(stateId, dx, dy, dw)
        dy += this.lineHeight();
      }
      dx += dw;
      dx += (maxCols > 1) ? this.standardPadding() : 0;
      dy = 0;
    }
};

Window_StatusInfo.prototype.drawStatesData = function(stateId, dx, dy, dw) {
    stateId = parseInt(stateId);
    var stateRate = this._actor.stateRate(stateId);
    if (this._actor.isStateResist(stateId)) stateRate = 0;
    dx += this.textPadding();
    dw -= this.textPadding() * 2;
    this._bypassResetTextColor = true;
    this.changeTextColor(this.systemColor());
    this.drawItemName($dataStates[stateId], dx, dy, dw);
    this._bypassResetTextColor = false;
    this.setRateColor(stateRate);
    var text = (stateRate * 100).toFixed(Yanfly.Param.StatusStatesDec) + '%';
    this.drawText(text, dx, dy, dw, 'right');
};



Window_StatusInfo.prototype.drawAttributes = function() {
    this.drawAttributesColumnRects();
    this.drawAttributesInfo();
};

Window_StatusInfo.prototype.attributesArray = function() {
    var array = [
      Yanfly.Param.StatusAttriCol1,
      Yanfly.Param.StatusAttriCol2,
      Yanfly.Param.StatusAttriCol3,
      Yanfly.Param.StatusAttriCol4
    ];
    return array;
};

Window_StatusInfo.prototype.drawAttributesColumnRects = function() {
    var maxCols = this.getMaxArrayCols(this.attributesArray());
    var maxRows = this.getMaxArrayRows(this.attributesArray());
    if (maxCols <= 0) return;
    var dx = this.getArrayX();
    var dy = this.getArrayY();
    var dw = this.getArrayDW(maxCols);
    for (var i = 0; i < maxCols; ++i) {
      for (var j = 0; j < maxRows; ++j) {
        this.drawDarkRect(dx, dy, dw, this.lineHeight());
        dy += this.lineHeight();
      }
      dx += dw;
      dx += (maxCols > 1) ? this.standardPadding() : 0;
      dy = 0;
    }
};

Window_StatusInfo.prototype.drawAttributesInfo = function() {
    var maxCols = this.getMaxArrayCols(this.attributesArray());
    var maxRows = this.getMaxArrayRows(this.attributesArray());
    if (maxCols <= 0) return;
    var infoArray = this.attributesArray();
    var dx = this.getArrayX();
    var dy = this.getArrayY();
    var dw = this.getArrayDW(maxCols);
    for (var i = 0; i < maxCols; ++i) {
      for (var j = 0; j < infoArray[i].length; ++j) {
        var attribute = infoArray[i][j].toLowerCase();
        this.drawAttributeData(attribute, dx, dy, dw)
        dy += this.lineHeight();
      }
      dx += dw;
      dx += (maxCols > 1) ? this.standardPadding() : 0;
      dy = 0;
    }
};

Window_StatusInfo.prototype.drawAttributeData = function(attr, dx, dy, dw) {
    var actor = this._actor;
    this.contents.fontSize = Yanfly.Param.StatusAttrSize;
    switch (attr) {
    case 'hit':
      this.drawAttributeName(Yanfly.Param.StatusAttr_hit, dx, dy, dw);
      this.drawAttributeRate(actor.hit, dx, dy, dw);
      break;
    case 'eva':
      this.drawAttributeName(Yanfly.Param.StatusAttr_eva, dx, dy, dw);
      this.drawAttributeRate(actor.eva, dx, dy, dw);
      break;
    case 'cri':
      this.drawAttributeName(Yanfly.Param.StatusAttr_cri, dx, dy, dw);
      this.drawAttributeRate(actor.cri, dx, dy, dw);
      break;
    case 'cev':
      this.drawAttributeName(Yanfly.Param.StatusAttr_cev, dx, dy, dw);
      this.drawAttributeRate(actor.cev, dx, dy, dw);
      break;
    case 'mev':
      this.drawAttributeName(Yanfly.Param.StatusAttr_mev, dx, dy, dw);
      this.drawAttributeRate(actor.mev, dx, dy, dw);
      break;
    case 'mrf':
      this.drawAttributeName(Yanfly.Param.StatusAttr_mrf, dx, dy, dw);
      this.drawAttributeRate(actor.mrf, dx, dy, dw);
      break;
    case 'cnt':
      this.drawAttributeName(Yanfly.Param.StatusAttr_cnt, dx, dy, dw);
      this.drawAttributeRate(actor.cnt, dx, dy, dw);
      break;
    case 'hrg':
      this.drawAttributeName(Yanfly.Param.StatusAttr_hrg, dx, dy, dw);
      this.drawAttributeRate(actor.hrg, dx, dy, dw);
      break;
    case 'mrg':
      this.drawAttributeName(Yanfly.Param.StatusAttr_mrg, dx, dy, dw);
      this.drawAttributeRate(actor.mrg, dx, dy, dw);
      break;
    case 'trg':
      this.drawAttributeName(Yanfly.Param.StatusAttr_trg, dx, dy, dw);
      this.drawAttributeRate(actor.trg, dx, dy, dw);
      break;
    case 'tgr':
      this.drawAttributeName(Yanfly.Param.StatusAttr_tgr, dx, dy, dw);
      this.drawAttributeRate(actor.tgr, dx, dy, dw);
      break;
    case 'grd':
      this.drawAttributeName(Yanfly.Param.StatusAttr_grd, dx, dy, dw);
      this.drawAttributeRate(actor.grd, dx, dy, dw);
      break;
    case 'rec':
      this.drawAttributeName(Yanfly.Param.StatusAttr_rec, dx, dy, dw);
      this.drawAttributeRate(actor.rec, dx, dy, dw);
      break;
    case 'pha':
      this.drawAttributeName(Yanfly.Param.StatusAttr_pha, dx, dy, dw);
      this.drawAttributeRate(actor.pha, dx, dy, dw);
      break;
    case 'mcr':
      this.drawAttributeName(Yanfly.Param.StatusAttr_mcr, dx, dy, dw);
      this.drawAttributeRate(actor.mcr, dx, dy, dw);
      break;
    case 'tcr':
      this.drawAttributeName(Yanfly.Param.StatusAttr_tcr, dx, dy, dw);
      this.drawAttributeRate(actor.tcr, dx, dy, dw);
      break;
    case 'pdr':
      this.drawAttributeName(Yanfly.Param.StatusAttr_pdr, dx, dy, dw);
      this.drawAttributeRate(actor.pdr, dx, dy, dw);
      break;
    case 'mdr':
      this.drawAttributeName(Yanfly.Param.StatusAttr_mdr, dx, dy, dw);
      this.drawAttributeRate(actor.mdr, dx, dy, dw);
      break;
    case 'fdr':
      this.drawAttributeName(Yanfly.Param.StatusAttr_fdr, dx, dy, dw);
      this.drawAttributeRate(actor.fdr, dx, dy, dw);
      break;
    case 'exr':
      this.drawAttributeName(Yanfly.Param.StatusAttr_exr, dx, dy, dw);
      this.drawAttributeRate(actor.exr, dx, dy, dw);
      break;
    default:
      break;
    }
};

Window_StatusInfo.prototype.drawAttributeName = function(name, dx, dy, dw) {
    this.changeTextColor(this.systemColor());
    dx += this.textPadding();
    dw -= this.textPadding() * 2;
    dy += Math.floor((this.standardFontSize() - this.contents.fontSize) / 2);
    this._bypassResetText = true;
    this.changeTextColor(this.systemColor());
    this.drawTextEx(name, dx, dy, dw);
    this._bypassResetText = false;
};

Window_StatusInfo.prototype.drawAttributeRate = function(rate, dx, dy, dw) {
    var value = (rate * 100).toFixed(Yanfly.Param.StatusAttrDec) + '%';
    this.setRateColor(rate);
    this.drawAttributeValue(value, dx, dy, dw);
};

Window_StatusInfo.prototype.drawAttributeValue = function(value, dx, dy, dw) {
    dx += this.textPadding();
    dw -= this.textPadding() * 2;
    this.drawText(value, dx, dy, dw, 'right');
};

Window_StatusInfo.prototype.maxPageItems = function() {
    return this.maxItems();
};

Window_Selectable.prototype.maxItems = function() {
    return 1;
};

Window_StatusInfo.prototype.drawItem = function(index) {
    this.clearItem(index);
};

Window_StatusInfo.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
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
    this._infoWindow.setHandler('cancel', this.onInfoCancel.bind(this));
};

Scene_Status.prototype.onInfoCancel = function() {
    this._commandWindow.activate();
    this._infoWindow.deselect();
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
