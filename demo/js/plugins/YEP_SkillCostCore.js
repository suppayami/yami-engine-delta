//=============================================================================
// Yanfly Engine Plugins - Skill Cost Core
// YEP_SkillCostCore.js
// Last Updated: 2015.07.28
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_SkillCostCore"] = true;

//=============================================================================/*:
/*:
 * @plugindesc Skill Costs can now cost HP, more MP, percentages of MP, more
 * TP, and even percentages of TP.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Cost Padding
 * @desc If a skill has multiple costs, this is the amount of pixels
 * used as padding in between the costs.
 * @default 4
 *
 * @param ---HP Costs---
 * @default
 *
 * @param HP Format
 * @desc Adjusts the way HP cost appears in the skill list window.  .
 * %1 - Cost     %2 - MP
 * @default %1%2
 *
 * @param HP Font Size
 * @desc Adjusts the font size used to display HP.                  .
 * Default: 28
 * @default 20
 *
 * @param HP Text Color
 * @desc Adjusts the text color used from the Window skin for HP.   .
 * Default: 21
 * @default 18
 *
 * @param HP Icon
 * @desc Choose what icon to use to represent HP costs.             .
 * Use 0 if you wish to not use an icon.
 * @default 162
 *
 * @param ---MP Costs---
 * @default
 *
 * @param MP Format
 * @desc Adjusts the way MP cost appears in the skill list window.  .
 * %1 - Cost     %2 - MP
 * @default %1%2
 *
 * @param MP Font Size
 * @desc Adjusts the font size used to display MP.                  .
 * Default: 28
 * @default 20
 *
 * @param MP Text Color
 * @desc Adjusts the text color used from the Window skin for MP.   .
 * Default: 23
 * @default 23
 *
 * @param MP Icon
 * @desc Choose what icon to use to represent MP costs.             .
 * Use 0 if you wish to not use an icon.
 * @default 165
 *
 * @param ---TP Costs---
 * @default
 *
 * @param TP Format
 * @desc Adjusts the way TP cost appears in the skill list window.  .
 * %1 - Cost     %2 - TP
 * @default %1%2
 *
 * @param TP Font Size
 * @desc Adjusts the font size used to display TP.                  .
 * Default: 28
 * @default 20
 *
 * @param TP Text Color
 * @desc Adjusts the text color used from the Window skin for TP.   .
 * Default: 29
 * @default 29
 *
 * @param TP Icon
 * @desc Choose what icon to use to represent TP costs.             .
 * Use 0 if you wish to not use an icon.
 * @default 164
 *
 * @help
 * To use this plugin, adjust the paramters to your liking. You can use the
 * various notetags in your skills to give them expanded skill costs.
 *
 * Skill Notetags:
 *   <HP Cost: x>
 *   Changes the skill to have x as its HP cost. RPG Maker MV's editor lacks
 *   HP cost functions so this would allow skills to use HP as their cost.
 *
 *   <HP Cost: x%>
 *   Changes the skill to cost a percentage of the character's MaxHP value.
 *
 *   <MP Cost: x>
 *   Changes the skill to have x as its MP cost.
 *   This helps bypass the database's hard limit of 9999.
 *
 *   <MP Cost: x%>
 *   Changes the skill to cost a percentage of the character's MaxMP value.
 *
 *   <TP Cost: x>
 *   Changes the skill to have x as its TP cost.
 *   This helps bypass the database's hard limit of 99.
 *
 *   <TP Cost: x%>
 *   Changes the skill to cost a percentage of the character's MaxTP value.
 *   Although the default MaxTP is 100, this tag will be useful for any
 *   plugins that will alter a character's MaxTP values.
 *
 * ChangeLog:
 *   2015.07.28 - Converted into a Core.
 *   2015.07.10 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_SkillCostCore');

//=============================================================================
// DataManager
//=============================================================================

var _YEP_SCC_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_SCC_Scene_Boot_start.call(this);
	DataManager.processSCCNotetags($dataSkills);
};

DataManager.processSCCNotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.hpCost = 0;
		obj.hpCostPer = 0.0;
		obj.mpCostPer = 0.0;
		obj.tpCostPer = 0.0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:MP_COST|mp cost):[ ](\d+)>/i)) {
				obj.mpCost = parseInt(RegExp.$1);
			} else if (line.match(/<(?:MP_COST|mp cost):[ ](\d+)([%％])>/i)) {
				obj.mpCostPer = parseFloat(RegExp.$1 * 0.01);
			} else if (line.match(/<(?:TP_COST|tp cost):[ ](\d+)>/i)) {
				obj.tpCost = parseInt(RegExp.$1);
			} else if (line.match(/<(?:TP_COST|tp cost):[ ](\d+)([%％])>/i)) {
				obj.tpCostPer = parseFloat(RegExp.$1 * 0.01);
			} else if (line.match(/<(?:HP_COST|hp cost):[ ](\d+)>/i)) {
				obj.hpCost = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HP_COST|hp cost):[ ](\d+)([%％])>/i)) {
				obj.hpCostPer = parseFloat(RegExp.$1 * 0.01);
			}
		}
	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.skillHpCost = function(skill) {
	var cost = skill.hpCost;
	cost += this.mhp * skill.hpCostPer;
	return Math.floor(cost);
};

Game_BattlerBase.prototype.skillMpCost = function(skill) {
	var cost = skill.mpCost;
	cost += this.mmp * skill.mpCostPer;
	return Math.floor(cost * this.mcr);
};

Game_BattlerBase.prototype.skillTpCost = function(skill) {
	var cost = skill.tpCost;
	cost += this.maxTp() * skill.tpCostPer;
  return Math.floor(cost);
};

var _YEP_SCC_Game_BattlerBase_canPaySkillCost =
		Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
		if (!this.canPaySkillHpCost(skill)) return false;
    return _YEP_SCC_Game_BattlerBase_canPaySkillCost.call(this, skill);
};

Game_BattlerBase.prototype.canPaySkillHpCost = function(skill) {
		return this._hp > this.skillHpCost(skill);
};

var _YEP_SCC_Game_BattlerBase_paySkillCost =
		Game_BattlerBase.prototype.paySkillCost
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    _YEP_SCC_Game_BattlerBase_paySkillCost.call(this, skill);
		this.paySkillHpCost(skill);
};

Game_BattlerBase.prototype.paySkillHpCost = function(skill) {
		this._hp -= this.skillHpCost(skill);
};

//=============================================================================
// Window_SkillList
//=============================================================================

var _yep_scc_CostPadding = Number(parameters['Cost Padding'] || 4);
Window_SkillList.prototype.drawSkillCost = function(skill, wx, wy, width) {
    var dw = width;
		dw = this.drawTpCost(skill, wx, wy, dw);
		dw = this.drawMpCost(skill, wx, wy, dw);
		dw = this.drawHpCost(skill, wx, wy, dw);
		dw = this.drawOtherCost(skill, wx, wy, dw);
		return dw;
};

var _yep_scc_TP_Format    = String(parameters['TP Format'] || '%1%2');
var _yep_scc_TP_FontSize  = Number(parameters['TP Font Size'] || 28);
var _yep_scc_TP_TextColor = Number(parameters['TP Text Color'] || 29);
var _yep_scc_TP_Icon      = Number(parameters['TP Icon'] || 0);
Window_SkillList.prototype.drawTpCost = function(skill, wx, wy, dw) {
		if (this._actor.skillTpCost(skill) <= 0) { return dw;	}
		if (_yep_scc_TP_Icon > 0) {
			var iw = wx + dw - Window_Base._iconWidth;
			this.drawIcon(_yep_scc_TP_Icon, iw, wy + 2);
			dw -= Window_Base._iconWidth + 2;
		}
		this.changeTextColor(this.textColor(_yep_scc_TP_TextColor));
		var fmt = _yep_scc_TP_Format;
		var text = fmt.format(toGroup(this._actor.skillTpCost(skill)),
			TextManager.tpA);
		this.contents.fontSize = _yep_scc_TP_FontSize;
		this.drawText(text, wx, wy, dw, 'right');
		this.resetFontSettings();
		return dw - this.textWidth(text) - _yep_scc_CostPadding;
};

var _yep_scc_MP_Format    = String(parameters['MP Format'] || '%1%2');
var _yep_scc_MP_FontSize  = Number(parameters['MP Font Size'] || 28);
var _yep_scc_MP_TextColor = Number(parameters['MP Text Color'] || 23);
var _yep_scc_MP_Icon      = Number(parameters['MP Icon'] || 0);
Window_SkillList.prototype.drawMpCost = function(skill, wx, wy, dw) {
		if (this._actor.skillMpCost(skill) <= 0) { return dw;	}
		if (_yep_scc_MP_Icon > 0) {
			var iw = wx + dw - Window_Base._iconWidth;
			this.drawIcon(_yep_scc_MP_Icon, iw, wy + 2);
			dw -= Window_Base._iconWidth + 2;
		}
		this.changeTextColor(this.textColor(_yep_scc_MP_TextColor));
		var fmt = _yep_scc_MP_Format;
		var text = fmt.format(toGroup(this._actor.skillMpCost(skill)),
			TextManager.mpA);
		this.contents.fontSize = _yep_scc_MP_FontSize;
		this.drawText(text, wx, wy, dw, 'right');
		this.resetFontSettings();
		return dw - this.textWidth(text) - _yep_scc_CostPadding;
};

var _yep_scc_HP_Format    = String(parameters['HP Format'] || '%1%2');
var _yep_scc_HP_FontSize  = Number(parameters['HP Font Size'] || 28);
var _yep_scc_HP_TextColor = Number(parameters['HP Text Color'] || 21);
var _yep_scc_HP_Icon      = Number(parameters['HP Icon'] || 0);
Window_SkillList.prototype.drawHpCost = function(skill, wx, wy, dw) {
		if (this._actor.skillHpCost(skill) <= 0) { return dw;	}
		if (_yep_scc_HP_Icon > 0) {
			var iw = wx + dw - Window_Base._iconWidth;
			this.drawIcon(_yep_scc_HP_Icon, iw, wy + 2);
			dw -= Window_Base._iconWidth + 2;
		}
		this.changeTextColor(this.textColor(_yep_scc_HP_TextColor));
		var fmt = _yep_scc_HP_Format;
		var text = fmt.format(toGroup(this._actor.skillHpCost(skill)),
			TextManager.hpA);
		this.contents.fontSize = _yep_scc_HP_FontSize;
		this.drawText(text, wx, wy, dw, 'right');
		this.resetFontSettings();
		return dw - this.textWidth(text) - _yep_scc_CostPadding;
};

Window_SkillList.prototype.drawOtherCost = function(skill, wx, wy, dw) {
		return dw;
};

//=============================================================================
// Other Functions
//=============================================================================

if (typeof toGroup !== 'function'){
		toGroup = function(inVal) {
				return inVal;
		}
}

//=============================================================================
// End of File
//=============================================================================
