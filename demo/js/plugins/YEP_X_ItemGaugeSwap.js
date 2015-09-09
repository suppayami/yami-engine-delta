//=============================================================================
// Yanfly Engine Plugins - Gauge Swap Extension - Item Gauge
// YEP_X_ItemGaugeSwap.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemGaugeSwap = true;

var Yanfly = Yanfly || {};
Yanfly.IGS = Yanfly.IGS || {};

//=============================================================================
 /*:
 * @plugindesc (Requires YEP_GaugeSwapCore.js) Shows the quantity of an
 * item in place of a gauge.
 * @author Yanfly Engine Plugins
 *
 * @help
 * This plugin requires YEP_GaugeSwapCore.
 * Make sure this plugin is located under YEP_GaugeSwapCore in the plugin
 * list.
 *
 * For some classes, they might not use MP or TP, but instead, depend on items.
 * This plugin allows you to use YEP_GaugeSwapCore to swap out a gauge in
 * favor of an item and the amount of that item left.
 *
 * Class Notetags:
 *   <Swap Gauge x: Item y>
 *   <Swap Gauge x: Weapon y>
 *   <Swap Gauge x: Armor y>
 *   Swaps out gauge x (1, 2, or 3) to display item, weapon, or armor y and the
 *   amount of that item, weapon, or armor the party has left. This will
 *   automatically match the icon used to be that of the item, weapon, or armor.
 *
 *   <Swap Gauge Icon x: y>
 *   Changes the item icon for gauge x (1, 2, or 3) to icon y. This will replace
 *   the icon automatically selected by the previous tag.
 */
//=============================================================================

if (Imported.YEP_GaugeSwapCore) {

//=============================================================================
// DataManager
//=============================================================================

Yanfly.IGS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.IGS.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processIGSNotetags($dataClasses);
		return true;
};

DataManager.processIGSNotetags = function(group) {
	var note1 = /<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i;
  var note2 = /<(?:SWAP GAUGE ICON|swap gauge icon)[ ](\d+):[ ](.*)>/i;
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

Yanfly.IGS.Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    if (actor.gauge1().match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
      this.drawItemGaugeSwap(actor, 1, x, y, width);
    } else {
      Yanfly.IGS.Window_Base_drawActorHp.call(this, actor, x, y, width);
    }
};

Yanfly.IGS.Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    if (actor.gauge2().match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
      this.drawItemGaugeSwap(actor, 2, x, y, width);
    } else {
      Yanfly.IGS.Window_Base_drawActorMp.call(this, actor, x, y, width);
    }
};

Yanfly.IGS.Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    if (actor.gauge3().match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
      this.drawItemGaugeSwap(actor, 3, x, y, width);
    } else {
      Yanfly.IGS.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

Window_Base.prototype.drawItemGaugeSwap = function(actor, id, wx, wy, ww) {
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
    this.drawText(Yanfly.Util.toGroup(quantity), wx, wy, ww, 'right');
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
