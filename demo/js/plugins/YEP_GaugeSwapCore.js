//=============================================================================
// Yanfly Engine Plugins - Gauge Swap Core
// YEP_GaugeSwapCore.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_GaugeSwapCore = true;

var Yanfly = Yanfly || {};
Yanfly.GSC = Yanfly.GSC || {};

//=============================================================================
 /*:
 * @plugindesc Swap around HP, MP, and TP Gauges with this plugin. With
 * plugin extensions, other things can be used, too.
 * @author Yanfly Engine Plugins
 *
 * @help
 * This plugin lets you swap around the HP, MP, and TP Gauges to any order
 * you want assuming that all the plugins you use will keep the same order of
 * HP, MP, and TP and does not override the default gauge drawing process. If
 * you use any plugin extensions, they can be swaped in as well.
 *
 * Note: If you do not have 'Display TP in Battle' checked under the System tab
 * in the database, nothing will be shown for the third slot.
 *
 * Class Notetag:
 *   <Swap Gauge x: y>
 *   This will change gauge x (1, 2, or 3) to y. Replace y with 'HP', 'MP', or
 *   'TP' to have it display that gauge type in that gauge slot. If you wish
 *   for that slot to display nothing, insert 'Nothing' or 'Null' in place of
 *   y in the notetag.
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

Yanfly.GSC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.GSC.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processGSCNotetags($dataClasses);
	  this.processGSCNotetags($dataEnemies);
		return true;
};

DataManager.processGSCNotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.gauge1 = 'HP';
    obj.gauge2 = 'MP';
    obj.gauge3 = 'TP';

		obj.gaugeIcon1 = 0;
		obj.gaugeIcon2 = 0;
		obj.gaugeIcon3 = 0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i)) {
        var gauge = parseInt(RegExp.$1);
        var text = String(RegExp.$2).toUpperCase();
        if (['HP', 'MP', 'TP', 'NOTHING', 'NULL'].contains(text)) {
          if (gauge === 1) obj.gauge1 = text;
          if (gauge === 2) obj.gauge2 = text;
          if (gauge === 3) obj.gauge3 = text;
        }
      }
		}
	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.gauge1 = function() {
    return 'HP';
};

Game_BattlerBase.prototype.gauge2 = function() {
    return 'MP';
};

Game_BattlerBase.prototype.gauge3 = function() {
    return 'TP';
};

Game_BattlerBase.prototype.gaugeIcon1 = function() {
    return 0;
};

Game_BattlerBase.prototype.gaugeIcon2 = function() {
    return 0;
};

Game_BattlerBase.prototype.gaugeIcon3 = function() {
    return 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.gauge1 = function() {
    return this.currentClass().gauge1;
};

Game_Actor.prototype.gauge2 = function() {
    return this.currentClass().gauge2;
};

Game_Actor.prototype.gauge3 = function() {
    return this.currentClass().gauge3;
};

Game_Actor.prototype.gaugeIcon1 = function() {
    return this.currentClass().gaugeIcon1;
};

Game_Actor.prototype.gaugeIcon2 = function() {
    return this.currentClass().gaugeIcon2;
};

Game_Actor.prototype.gaugeIcon3 = function() {
    return this.currentClass().gaugeIcon3;
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.GSC.Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    if (actor.gauge1() === 'HP') {
      Yanfly.GSC.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge1() === 'MP') {
      Yanfly.GSC.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge1() === 'TP') {
      Yanfly.GSC.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

Yanfly.GSC.Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    if (actor.gauge2() === 'HP') {
      Yanfly.GSC.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge2() === 'MP') {
      Yanfly.GSC.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge2() === 'TP') {
      Yanfly.GSC.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

Yanfly.GSC.Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    if (actor.gauge3() === 'HP') {
      Yanfly.GSC.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge3() === 'MP') {
      Yanfly.GSC.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge3() === 'TP') {
      Yanfly.GSC.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

//=============================================================================
// End of File
//=============================================================================
