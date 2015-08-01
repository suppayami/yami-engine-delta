//=============================================================================
// Yanfly Engine Plugins - Gauge Switch Extension - Item Gauge
// YEP_X_ItemGaugeSwitch.js
// Last Updated: 2015.07.28
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_X_ItemGaugeSwitch"] = true;

//=============================================================================
 /*:
 * @plugindesc (Requires YEP_GaugeSwitchCore.js) Shows the quantity of an item
 * in place of a gauge.
 * @author Yanfly Engine Plugins
 *
 * @help
 * This plugin requires YEP_GaugeSwitchCore.
 * Make sure this plugin is located under YEP_GaugeSwitchCore in the plugin
 * list.
 *
 * For some classes, they might not use MP or TP, but instead, depend on items.
 * This plugin allows you to use YEP_GaugeSwitchCore to swap out a gauge in
 * favor of an item and the amount of that item left.
 *
 * Class Notetags:
 *   <Switch Gauge x: Item y>
 *   <Switch Gauge x: Weapon y>
 *   <Switch Gauge x: Armor y>
 *   Swaps out gauge x (1, 2, or 3) to display item, weapon, or armor y and the
 *   amount of that item, weapon, or armor the party has left. This will
 *   automatically match the icon used to be that of the item, weapon, or armor.
 *
 *   <Switch Gauge Icon x: y>
 *   Changes the item icon for gauge x (1, 2, or 3) to icon y. This will replace
 *   the icon automatically selected by the previous tag.
 *
 * ChangeLog:
 *   2015.07.28 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_X_ItemGaugeSwitch');

//=============================================================================
// DataManager
//=============================================================================

var _YEP_IGS_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_IGS_Scene_Boot_start.call(this);
	DataManager.processIGSNotetags($dataClasses);
};

DataManager.processIGSNotetags = function(group) {
	var note1 = /<(?:SWITCH_GAUGE|switch gauge)[ ](\d+):[ ](.*)>/i;
  var note2 = /<(?:SWITCH_GAUGE_ICON|switch gauge icon)[ ](\d+):[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
        var gauge = parseInt(RegExp.$1);
        var text = String(RegExp.$2).toUpperCase();
        if (text.match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
          if (gauge === 1) obj.gauge1 = text;
          if (gauge === 2) obj.gauge2 = text;
          if (gauge === 3) obj.gauge3 = text;
        }
      } else if (line.match(note2)) {
        var gauge = parseInt(RegExp.$1);
        var icon = parseInt(RegExp.$2);
        if (gauge === 1) obj.gaugeIcon1 = icon;
        if (gauge === 2) obj.gaugeIcon2 = icon;
        if (gauge === 3) obj.gaugeIcon3 = icon;
      }
		}
	}
};

//=============================================================================
// Window_Base
//=============================================================================

var _YEP_IGS_Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    if (actor.gauge1().match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
      this.drawItemGaugeSwitch(actor, 1, x, y, width);
    } else {
      _YEP_IGS_Window_Base_drawActorHp.call(this, actor, x, y, width);
    }
};

var _YEP_IGS_Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    if (actor.gauge2().match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
      this.drawItemGaugeSwitch(actor, 2, x, y, width);
    } else {
      _YEP_IGS_Window_Base_drawActorMp.call(this, actor, x, y, width);
    }
};

var _YEP_IGS_Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    if (actor.gauge3().match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
      this.drawItemGaugeSwitch(actor, 3, x, y, width);
    } else {
      _YEP_IGS_Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

Window_Base.prototype.drawItemGaugeSwitch = function(actor, id, wx, wy, ww) {
    ww = ww || 186;
    if (id === 1) text = actor.gauge1();
    if (id === 2) text = actor.gauge2();
    if (id === 3) text = actor.gauge3();
    if (text.match(/ITEM[ ](\d+)/i)) {
      var item = $dataItems[parseInt(RegExp.$1)];
    } else if (text.match(/WEAPON[ ](\d+)/i)) {
      var item = $dataWeapons[parseInt(RegExp.$1)];
    } else if (text.match(/ARMOR[ ](\d+)/i)) {
      var item = $dataArmors[parseInt(RegExp.$1)];
    }
    var quantity = $gameParty.numItems(item);
    var icon = item.iconIndex;
    if (id === 1 && actor.gaugeIcon1() > 0) icon = actor.gaugeIcon1();
    if (id === 2 && actor.gaugeIcon2() > 0) icon = actor.gaugeIcon2();
    if (id === 3 && actor.gaugeIcon3() > 0) icon = actor.gaugeIcon3();
    ww -= Window_Base._iconWidth;
    this.drawIcon(icon, wx + ww, wy + 2);
    ww -= 2;
    this.resetFontSettings();
    this.resetTextColor();
    this.drawText(toGroup(quantity), wx, wy, ww, 'right');
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
