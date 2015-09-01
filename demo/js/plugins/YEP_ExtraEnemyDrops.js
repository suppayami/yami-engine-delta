//=============================================================================
// Yanfly Engine Plugins - Extra Enemy Drops
// YEP_ExtraEnemyDrops.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ExtraEnemyDrops = true;

var Yanfly = Yanfly || {};
Yanfly.EED = Yanfly.EED || {};

//=============================================================================
 /*:
 * @plugindesc This plugin allows for enemies to drop more than just
 * three items maximum.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables you to have your enemies drop more than just three drops
 * after defeating them in battle through the use of notetags. By placing the
 * proper notetags into the enemy's notebox, you can not only give them more
 * items to drop, but also have them drop at rates that aren't normally possible
 * through the editor as well.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Insert the following notetags into the enemy's notebox to have them drop
 * more than the usual three items. Inserting multiple copies of a notetag type
 * will add more drops to the enemy's drop item pool.
 *
 * Enemy Notetags:
 *   <Drop Item x: y%>
 *   This will cause item x to drop at y% rate. Inserting multiple copies of
 *   this notetag will cause the enemy to have more chances to drop more items.
 *
 *   <Drop Weapon x: y%>
 *   This will cause weapon x to drop at y% rate. Inserting multiple copies of
 *   this notetag will cause the enemy to have more chances to drop more items.
 *
 *   <Drop Armor x: y%>
 *   This will cause armor x to drop at y% rate. Inserting multiple copies of
 *   this notetag will cause the enemy to have more chances to drop more items.
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

Yanfly.EED.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.EED.DataManager_isDatabaseLoaded.call(this)) return false;
		DataManager.processEEDNotetags($dataEnemies);
		return true;
};

DataManager.processEEDNotetags = function(group) {
	var note1 = /<(?:DROP ITEM|drop i)[ ](\d+):[ ](\d+)([%％])>/i;
  var note2 = /<(?:DROP WEAPON|drop w)[ ](\d+):[ ](\d+)([%％])>/i;
  var note3 = /<(?:DROP ARMOR|drop a)[ ](\d+):[ ](\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
    if (obj.dropsMade) continue;
    obj.dropsMade = true;
		for (var i = 0; i < obj.dropItems.length; ++i) {
      var dropItem = obj.dropItems[i];
      dropItem.rate = 1 / dropItem.denominator;
    }
    var notedata = obj.note.split(/[\r\n]+/);
    for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				var itemId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        var newItem = {
          dataId: itemId, denominator: 1, kind: 1, rate: rate
        }
        obj.dropItems.push(newItem);
			} else if (line.match(note2)) {
				var itemId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        var newItem = {
          dataId: itemId, denominator: 1, kind: 2, rate: rate
        }
        obj.dropItems.push(newItem);
			} else if (line.match(note3)) {
				var itemId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        var newItem = {
          dataId: itemId, denominator: 1, kind: 3, rate: rate
        }
        obj.dropItems.push(newItem);
			}
		}
	}
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.makeDropItems = function() {
    var drops = []
    for (var i = 0; i < this.enemy().dropItems.length; ++i) {
      var dropItem = this.enemy().dropItems[i];
      if (!dropItem) continue;
      var kind = dropItem.kind;
      if (kind < 1 || kind > 3) continue;
      var rate = dropItem.rate * this.dropItemRate();
      var dataId = dropItem.dataId;
      if (Math.random() < rate) {
        var item = this.itemObject(kind, dataId);
        if (item) drops.push(item);
      }
    }
    return drops;
};

//=============================================================================
// End of File
//=============================================================================
