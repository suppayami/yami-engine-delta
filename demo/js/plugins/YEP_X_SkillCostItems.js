//=============================================================================
// Yanfly Engine Plugins - Skill Cost Extension - Items
// YEP_X_SkillCostItems.js
// Last Updated: 2015.07.28
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_X_SkillCostItems"] = true;

//=============================================================================
 /*:
 * @plugindesc (Requires YEP_SkillCostCore.js) Skills can now have an item cost
 * attached to them.
 * @author Yanfly Engine Plugins
 *
 * @param Item Cost Format
 * @desc Adjusts the way Item cost appears in the skill list window..
 * %1 - Cost     %2 - In Stock     %3 - Name
 * @default %1
 *
 * @param Item Font Size
 * @desc Adjusts the font size used to display item costs.          .
 * Default: 28
 * @default 20
 *
 * @param Item Text Color
 * @desc Adjusts the text color used from the Window skin for items.
 * @default 0
 *
 * @param Show Item Icon
 * @desc Show the icon of the item required for the cost?           .
 * NO - false     YES - true
 * @default true
 *
 * @help
 * This plugin requires YEP_SkillCostCore.
 * Make sure this plugin is located under YEP_SkillCostCore in the plugin list.
 *                                                                  .
 * Skill Notetags:
 *   <Item x Cost: y>
 *   <Weapon x Cost: y>
 *   <Armor x Cost: y>
 *   This will cause the skill to require either item, weapon, or armor x in
 *   y amount in order to be used. Using any of the three notetags will
 *   override the previous item-based skill cost. This will by default set the
 *   item cost icon and item cost text to that of the item, weapon, or armor x.
 *
 *   <Item Cost Icon: x>
 *   Must be placed below the item-based cost notetag in order to occur. This
 *   will change the icon for the item-based skill cost if you are using icons.
 *
 *   <Item Cost Text: x>
 *   Must be placed below the item-based cost notetag in order to occur. This
 *   will change the text used for the item-based skill cost.
 *
 * ChangeLog:
 *   2015.07.28 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_X_SkillCostItems');

//=============================================================================
// DataManager
//=============================================================================

var _YEP_SCI_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_SCI_Scene_Boot_start.call(this);
	DataManager.processSCINotetags($dataSkills);
};

DataManager.processSCINotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.itemCostValue = 0;
		obj.itemCostItem = null;
		obj.itemCostIcon = 0;
    obj.itemCostText = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<ITEM[ ](\d+)[ ]COST:[ ](\d+)>/i)) {
        obj.itemCostItem = $dataItems[parseInt(RegExp.$1)];
        obj.itemCostValue = Math.max(1, parseInt(RegExp.$2));
        obj.itemCostIcon = obj.itemCostItem.iconIndex;
        obj.itemCostText = obj.itemCostItem.name;
      } else if (line.match(/<WEAPON[ ](\d+)[ ]COST:[ ](\d+)>/i)) {
        obj.itemCostItem = $dataWeapons[parseInt(RegExp.$1)];
        obj.itemCostValue = Math.max(1, parseInt(RegExp.$2));
        obj.itemCostIcon = obj.itemCostItem.iconIndex;
        obj.itemCostText = obj.itemCostItem.name;
      } else if (line.match(/<ARMOR[ ](\d+)[ ]COST:[ ](\d+)>/i)) {
        obj.itemCostItem = $dataArmors[parseInt(RegExp.$1)];
        obj.itemCostValue = Math.max(1, parseInt(RegExp.$2));
        obj.itemCostIcon = obj.itemCostItem.iconIndex;
        obj.itemCostText = obj.itemCostItem.name;
      } else if (line.match(/<(?:ITEM_COST_ICON|item cost icon):[ ](\d+)>/i)) {
        obj.itemCostIcon = parseInt(RegExp.$1);
      } else if (line.match(/<(?:ITEM_COST_TEXT|item cost text):[ ](.*)>/i)) {
        obj.itemCostText = String(RegExp.$1);
      }
		}
	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

var _YEP_SCI_Game_BattlerBase_canPaySkillCost =
    Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    if (!this.canPaySkillItemCost(skill)) return false;
    return _YEP_SCI_Game_BattlerBase_canPaySkillCost.call(this, skill);
};

Game_BattlerBase.prototype.canPaySkillItemCost = function(skill) {
    return true;
};

var _YEP_SCI_Game_Battlerbase_paySkillCost =
    Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    _YEP_SCI_Game_Battlerbase_paySkillCost.call(this, skill);
    this.paySkillItemCost(skill);
};

Game_BattlerBase.prototype.paySkillItemCost = function(skill) {
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.canPaySkillItemCost = function(skill) {
    if (skill.itemCostItem) {
      var item = skill.itemCostItem;
      if (skill.itemCostValue > $gameParty.numItems(item)) return false;
    }
    return Game_BattlerBase.prototype.canPaySkillItemCost.call(this, skill);
};

Game_BattlerBase.prototype.paySkillItemCost = function(skill) {
    var item = skill.itemCostItem;
    var value = skill.itemCostValue;
    $gameParty.loseItem(item, value);
};

//=============================================================================
// Window_SkillList
//=============================================================================

var _YEP_SCI_Window_SList_drawOtherCost =
    Window_SkillList.prototype.drawOtherCost;
Window_SkillList.prototype.drawOtherCost = function(skill, wx, wy, dw) {
		dw = this.drawSkillItemCost(skill, wx, wy, dw);
    return _YEP_SCI_Window_SList_drawOtherCost.call(this, skill, wx, wy, dw);
};

var _yep_sci_showIcon = String(parameters['Show Item Icon'] || 'true');
var _yep_sci_textColor = Number(parameters['Item Text Color'] || 0);
var _yep_sci_fontSize = Number(parameters['Item Font Size'] || 28);
var _yep_sci_costFormat = String(parameters['Item Cost Format'] || '%1');
Window_SkillList.prototype.drawSkillItemCost = function(skill, wx, wy, dw) {
		if (!skill.itemCostItem) { return dw;	}
		if (eval(_yep_sci_showIcon) && skill.itemCostIcon > 0) {
			var iw = wx + dw - Window_Base._iconWidth;
			this.drawIcon(skill.itemCostIcon, iw, wy + 2);
			dw -= Window_Base._iconWidth + 2;
		}
		this.changeTextColor(this.textColor(_yep_sci_textColor));
		var fmt = _yep_sci_costFormat;
		var text = fmt.format(toGroup(toGroup(skill.itemCostValue)),
			toGroup($gameParty.numItems(skill.itemCostItem)), skill.itemCostText);
		this.contents.fontSize = _yep_sci_fontSize;
		this.drawText(text, wx, wy, dw, 'right');
		this.resetFontSettings();
		return dw - this.textWidth(text) - _yep_scc_CostPadding;
};

//=============================================================================
// End of File
//=============================================================================
