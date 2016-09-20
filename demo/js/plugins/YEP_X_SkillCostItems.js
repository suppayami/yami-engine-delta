//=============================================================================
// Yanfly Engine Plugins - Skill Core Extension - Skill Cost Items
// YEP_X_SkillCostItems.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_SkillCostItems = true;

var Yanfly = Yanfly || {};
Yanfly.SCI = Yanfly.SCI || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 (Requires YEP_SkillCore.js) Skills can now have an
 * item cost attached to them.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Cost Style
 * @desc How do you want the costs to appear?
 * 0 - None   1 - Amount Over Icon   2 - Amount Then Icon
 * @default 2
 *
 * @param Font Size
 * @desc Font size used for item costs.
 * Default: 28
 * @default 20
 *
 * @param Amount Format
 * @desc How do you wish to display the amount cost?
 * %1 - Need    %2 - Owned
 * @default ×%1
 *
 * @param Amount Y Buffer
 * @desc The Y Buffer amount used to display the cost.
 * @default 4
 *
 * @param ---Gauges---
 * @default
 *
 * @param Gauge Color 1
 * @desc The text color used for item gauges.
 * @default 13
 *
 * @param Gauge Color 2
 * @desc The text color used for item gauges.
 * @default 5
 *
 * @param Display Name
 * @desc Display the Item Name by default for the gauge?
 * NO - false     YES - true
 * @default true
 *
 * @param Text Color
 * @desc Text color of the gauge name displayed.
 * Default: 16
 * @default 16
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_SkillCore.
 * Make sure this plugin is located under YEP_SkillCore in the plugin list.
 *
 * This plugin enables you to be able to set costs for skills using items. The
 * item costs will appear next to the other skill costs displaying the icons of
 * the items needed and the amount of the items to be used. Item costs using
 * this plugin can be altered by set and percentile amounts in addition to
 * being replaced altogether by a substitute item.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * To enable skills to utilize items as costs, use the following notetags:
 * 
 * Skill Notetags:
 *   <Item x Cost: y>
 *   <Weapon x Cost: y>
 *   <Armor x Cost: y>
 *   This will set the cost of the item, weapon, or armor x to require y of it
 *   before it can be used. If you are using YEP_ItemCore, independent items
 *   cannot be used as item costs as the game will not distinguish which of the
 *   independent items is fit to be used. If you use multiple of these tags,
 *   the skill will require all the listed items to be available for usage.
 *
 *   <Item Cost: x Potion>
 *   <Item Cost: x Sword>
 *   <Item Cost: x Feather Cap>
 *   If you prefer to use the names of the items instead, you can use the above
 *   notetag. This will make the skill require x amount of the named item,
 *   weapon, or armor. If you have multiple items with the same name, this
 *   notetag will give priority to the highest ID value in the order of items,
 *   weapons, then armors. If you are using YEP_ItemCore, independent items
 *   cannot be used as item costs as the game will not distinguish which of the
 *   independent items is fit to be used. If you use multiple of these tags,
 *   the skill will require all the listed items to be available for usage.
 *
 * Class, Weapon, Armor, State Notetags:
 *   <Swap Gauge x: Item y>
 *   <Swap Gauge x: Weapon y>
 *   <Swap Gauge x: Armor y>
 *   Swaps out gauge x to display how much of item, weapon, or armor y the
 *   player/party has. Priority is given in the following order:
 *   Weapons, Armors, States, Class, Enemy
 *
 *   <Swap Gauge x: Item Potion>
 *   <Swap Gauge x: Item Sword>
 *   <Swap Gauge x: Item Feather Cap>
 *   If you prefer to use the names of the items instead, you can use the above
 *   notetag. This will swap out gauge x to display how much of the mentioned
 *   item, weapon, or armor the player/party has. If you have multiple items
 *   with the same name, this notetag will give priority to the highest ID
 *   value in the order of items, weapons, then armors. Priority for the
 *   displayed gauge will be given in the following order: Weapons, Armors,
 *   States, Class, Enemy.
 *
 * Actor, Class, Weapon, Armor, and State Notetags:
 *   <Item x Cost: +y>
 *   <Item x Cost: -y>
 *   <Weapon x Cost: +y>
 *   <Weapon x Cost: -y>
 *   <Armor x Cost: +y>
 *   <Armor x Cost: -y>
 *   Increases or decreases the cost of item, weapon, or armor x when required
 *   by a value of y. If the item, weapon, or armor isn't required, then this
 *   effect does not apply to the skill cost.
 *
 *   <Item Cost: +x Potion>
 *   <Item Cost: -x Sword>
 *   <Item Cost: +x Feather Cap>
 *   If you prefer to use the names of the items instead, you can use the above
 *   notetag format. This will increase or decrease the mentioned item by x
 *   amount as long as the item is required as a cost. If you have multiple
 *   items with the same name, this notetag will give priority to the highest
 *   ID value in the order of items, weapons, then armors.
 *
 *   <Item x Cost: y%>
 *   <Weapon x Cost: y%>
 *   <Armor x Cost: y%>
 *   Alters the cost of item, weapon, or armor x by y%. If the item, weapon, or
 *   armor isn't required, then this effect does not apply to the skill cost.
 *
 *   <Item Cost: x% Potion>
 *   <Item Cost: x% Sword>
 *   <Item Cost: x% Feather Cap>
 *   If you prefer to use the names of the items instead, you can use the above
 *   notetag format. This will adjust the cost rate of the mentioned item by x%
 *   as long as the item is required as a cost. If you have multiple items with
 *   the same name, this notetag will give priority to the highest ID value in
 *   the order of items, weapons, then armors.
 *
 *   <Replace Type x Cost: Type y>
 *   Replace 'type' with either 'item', 'weapon', or 'armor'. This lets you
 *   exchange the costs used for a particular item for another (item y). The
 *   replacement is given priority to states, weapons, armors, class, and then
 *   actors.
 *
 *   <Replace Potion Cost: Ether>
 *   <Replace Sword Cost: Dagger>
 *   <Replace Feather Cap Cost: Bandana>
 *   If you prefer to use the names of the items instead, you can use the above
 *   notetag format. This lets you exchange the costs used for a particular
 *   item for another. The replacement is given priority to states, weapons,
 *   armors, class, and then actors. If you have multiple items with the same
 *   name, this notetag will give priority to the highest ID value in the order
 *   of items, weapons, then armors.
 *
 * Item, Weapon, Armor Notetags:
 *   <Item Gauge Color 1: x>
 *   <Item Gauge Color 2: x>
 *   If this item is the item used as gauge display, you can have it produce a
 *   unique color using text color x.
 *
 *   <Item Gauge Text: x>
 *   If this item is the item used as gauge display, you can have it show a
 *   different text other than its name. Replace x with what you want to write.
 *
 *   <Item Gauge Text Color: x>
 *   If you wish to use a text color other than the one predefined in the
 *   plugin's parameters, use this notetag and replace x with the text color
 *   you wish to label the gauge with.
 *
 * ============================================================================
 * Lunatic Mode - Custom Item Costs
 * ============================================================================
 *
 * For those with a bit of JavaScript knowledge, you can create dynamic item
 * costs for your skills using the following notetags:
 *
 * Skill Notetags:
 *
 *   <Custom Type x Cost>
 *    cost = user.level;
 *   </Custom Type x Cost>
 *   Replace 'type' with either 'item', 'weapon', or 'armor' to change the type
 *   and x as the ID of that item type. The 'cost' variable determines how much
 *   of the required item type is needed as the cost.
 *
 *   <Custom Item Cost: name>
 *    cost = user.level;
 *   </Custom Item Cost: name>
 *   For those who prefer to use names instead, replace 'name' with the name of
 *   the item to be used as the cost. The 'cost' variable determines how much
 *   of the named item is needed as the cost. If you have multiple items in
 *   your database with the same name, priority will be given to the item with
 *   the highest ID in the order of items, weapons, and armors.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.1.0.
 * 
 * Version 1.01:
 * - Fixed a bug that would display the wrong cost amount for multiple items.
 * - Shifted item icon cost 2 pixels down to match the skill icon Y level.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_SkillCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_SkillCostItems');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SCICostStyle = Number(Yanfly.Parameters['Cost Style']);
Yanfly.Param.SCIFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.SCIAmountFmt = String(Yanfly.Parameters['Amount Format']);
Yanfly.Param.SCIYBuffer = Number(Yanfly.Parameters['Amount Y Buffer']);

Yanfly.Param.SCIGauge1 = Number(Yanfly.Parameters['Gauge Color 1']);
Yanfly.Param.SCIGauge2 = Number(Yanfly.Parameters['Gauge Color 2']);
Yanfly.Param.SCIDisplayName = eval(String(Yanfly.Parameters['Display Name']));
Yanfly.Param.SCIDisplayColor = Number(Yanfly.Parameters['Text Color']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.SCI.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.SCI.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_SkillCostItems) {
    this.processSCINotetagsI($dataItems);
    this.processSCINotetagsW($dataWeapons);
    this.processSCINotetagsA($dataArmors);
    this.processSCINotetags1($dataSkills);
    this.processSCINotetags2($dataActors);
    this.processSCINotetags2($dataClasses);
    this.processSCINotetags2($dataEnemies);
    this.processSCINotetags2($dataWeapons);
    this.processSCINotetags2($dataArmors);
    this.processSCINotetags2($dataStates);
    this.processSCINotetags3($dataItems);
    this.processSCINotetags3($dataWeapons);
    this.processSCINotetags3($dataArmors);
    Yanfly._loaded_YEP_X_SkillCostItems = true;
  }
  return true;
};

DataManager.processSCINotetagsI = function(group) {
  if (Yanfly.ItemIdRef) return;
  Yanfly.ItemIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ItemIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processSCINotetagsW = function(group) {
  if (Yanfly.WeaponIdRef) return;
  Yanfly.WeaponIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.WeaponIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processSCINotetagsA = function(group) {
  if (Yanfly.ArmorIdRef) return;
  Yanfly.ArmorIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ArmorIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processSCINotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.useItemCost = [];
    obj.useWeaponCost = [];
    obj.useArmorCost = [];
    var evalMode = 'none';
    var evalLine = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<ITEM[ ](\d+)[ ]COST:[ ](\d+)>/i)) {
        var item = $dataItems[parseInt(RegExp.$1)];
        var cost = parseInt(RegExp.$2);
        this.processSCIObjItemCost(obj, item, cost, '');
      } else if (line.match(/<WEAPON[ ](\d+)[ ]COST:[ ](\d+)>/i)) {
        var item = $dataWeapons[parseInt(RegExp.$1)];
        var cost = parseInt(RegExp.$2);
        this.processSCIObjItemCost(obj, item, cost, '');
      } else if (line.match(/<ARMOR[ ](\d+)[ ]COST:[ ](\d+)>/i)) {
        var item = $dataArmors[parseInt(RegExp.$1)];
        var cost = parseInt(RegExp.$2);
        this.processSCIObjItemCost(obj, item, cost, '');
      } else if (line.match(/<ITEM COST:[ ](\d+)[ ](.*)>/i)) {
        var cost = parseInt(RegExp.$1);
        var name = String(RegExp.$2).toUpperCase();
        if (Yanfly.ItemIdRef[name]) {
          var id = Yanfly.ItemIdRef[name];
          var item = $dataItems[id];
        } else if (Yanfly.WeaponIdRef[name]) {
          var id = Yanfly.WeaponIdRef[name];
          var item = $dataWeapons[id];
        } else if (Yanfly.ArmorIdRef[name]) {
          var id = Yanfly.ArmorIdRef[name];
          var item = $dataArmors[id];
        } else {
          continue;
        }
        this.processSCIObjItemCost(obj, item, cost, '');
      } else if (line.match(/<CUSTOM ITEM[ ](\d+)[ ]COST>/i)) {
        evalMode = 'custom item cost';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM ITEM[ ](\d+)[ ]COST>/i)) {
        var item = $dataItems[parseInt(RegExp.$1)];
        this.processSCIObjItemCost(obj, item, 0, evalLine);
        evalMode = 'none';
        evalLine = '';
      } else if (line.match(/<CUSTOM WEAPON[ ](\d+)[ ]COST>/i)) {
        evalMode = 'custom item cost';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM WEAPON[ ](\d+)[ ]COST>/i)) {
        var item = $dataWeapons[parseInt(RegExp.$1)];
        this.processSCIObjItemCost(obj, item, 0, evalLine);
        evalMode = 'none';
        evalLine = '';
      } else if (line.match(/<CUSTOM ARMOR[ ](\d+)[ ]COST>/i)) {
        evalMode = 'custom item cost';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM ARMOR[ ](\d+)[ ]COST>/i)) {
        var item = $dataArmors[parseInt(RegExp.$1)];
        this.processSCIObjItemCost(obj, item, 0, evalLine);
        evalMode = 'none';
        evalLine = '';
      } else if (line.match(/<CUSTOM ITEM COST:[ ](.*)>/i)) {
        evalMode = 'custom item cost';
        evalLine = '';
      } else if (line.match(/<\/CUSTOM ITEM COST:[ ](.*)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.ItemIdRef[name]) {
          var id = Yanfly.ItemIdRef[name];
          var item = $dataItems[id];
        } else if (Yanfly.WeaponIdRef[name]) {
          var id = Yanfly.WeaponIdRef[name];
          var item = $dataWeapons[id];
        } else if (Yanfly.ArmorIdRef[name]) {
          var id = Yanfly.ArmorIdRef[name];
          var item = $dataArmors[id];
        } else {
          evalMode = 'none';
          evalLine = '';
          continue;
        }
        this.processSCIObjItemCost(obj, item, 0, evalLine);
        evalMode = 'none';
        evalLine = '';
      } else if (evalMode === 'custom item cost') {
        evalLine = evalLine + line + '\n';
      }
    }
  }
};

DataManager.processSCIObjItemCost = function(obj, item, cost, code) {
    if (!item) return;
    if (Imported.YEP_ItemCore && this.isIndependent(item)) return;
    var arr = [item.id, cost, code];
    if (this.isItem(item)) {
      obj.useItemCost.push(arr);
    } else if (this.isWeapon(item)) {
      obj.useWeaponCost.push(arr);
    } else if (this.isArmor(item)) {
      obj.useArmorCost.push(arr);
    }
};

DataManager.processSCINotetags2 = function(group) {
  var note1 = /<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i;
  var note2 = /<(?:SWAP GAUGE ICON|swap gauge icon)[ ](\d+):[ ](.*)>/i;
  var noteR1 = /<REPLACE[ ](.*)[ ](\d+)[ ]COST:[ ](.*)[ ](\d+)>/i;
  var noteR2 = /<REPLACE[ ](.*)[ ]COST:[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.itemGaugeColor1 = Yanfly.Param.SCIGauge1
    obj.itemGaugeColor2 = Yanfly.Param.SCIGauge2
    obj.useItemCostSet = {};
    obj.useWeaponCostSet = {};
    obj.useArmorCostSet = {};
    obj.useItemCostRate = {};
    obj.useWeaponCostRate = {};
    obj.useArmorCostRate = {};
    obj.replaceItemCost = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var gauge = parseInt(RegExp.$1);
        var text = String(RegExp.$2).toUpperCase();
        if (text.match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
          if (gauge === 1) obj.gauge1 = text;
          if (gauge === 2) obj.gauge2 = text;
          if (gauge === 3) obj.gauge3 = text;
        } else if (text.match(/(?:ITEM|WEAPON|ARMOR)[ ](.*)/i)) {
          var name = String(RegExp.$1).toUpperCase();
          if (Yanfly.ItemIdRef[name]) {
            var id = Yanfly.ItemIdRef[name];
          } else if (Yanfly.WeaponIdRef[name]) {
            var id = Yanfly.WeaponIdRef[name];
          } else if (Yanfly.ArmorIdRef[name]) {
            var id = Yanfly.ArmorIdRef[name];
          }
          var text = 'ITEM ' + id;
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
      } else if (line.match(/<ITEM[ ](\d+)[ ]COST:[ ]([\+\-]\d+)>/i)) {
        obj.useItemCostSet[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<WEAPON[ ](\d+)[ ]COST:[ ]([\+\-]\d+)>/i)) {
        obj.useWeaponCostSet[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<ARMOR[ ](\d+)[ ]COST:[ ]([\+\-]\d+)>/i)) {
        obj.useArmorCostSet[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<ITEM[ ](\d+)[ ]COST:[ ](\d+)([%％])>/i)) {
        var value = parseFloat(RegExp.$2) * 0.01;
        obj.useItemCostRate[parseInt(RegExp.$1)] = value;
      } else if (line.match(/<WEAPON[ ](\d+)[ ]COST:[ ](\d+)([%％])>/i)) {
        var value = parseFloat(RegExp.$2) * 0.01;
        obj.useWeaponCostRate[parseInt(RegExp.$1)] = value;
      } else if (line.match(/<ARMOR[ ](\d+)[ ]COST:[ ](\d+)([%％])>/i)) {
        var value = parseFloat(RegExp.$2) * 0.01;
        obj.useArmorCostRate[parseInt(RegExp.$1)] = value;
      } else if (line.match(/<ITEM COST:[ ]([\+\-]\d+)[ ](.*)>/i)) {
        var value = parseInt(RegExp.$1);
        var name = String(RegExp.$2).toUpperCase();
        if (Yanfly.ItemIdRef[name]) {
          var id = Yanfly.ItemIdRef[name];
          obj.useItemCostSet[id] = value;
        } else if (Yanfly.WeaponIdRef[name]) {
          var id = Yanfly.WeaponIdRef[name];
          obj.useWeaponCostSet[id] = value;
        } else if (Yanfly.ArmorIdRef[name]) {
          var id = Yanfly.ArmorIdRef[name];
          obj.useArmorCostSet[id] = value;
        }
      } else if (line.match(/<ITEM COST:[ ](\d+)([%％])[ ](.*)>/i)) {
        var value = parseFloat(RegExp.$1) * 0.01;
        var name = String(RegExp.$3).toUpperCase();
        if (Yanfly.ItemIdRef[name]) {
          var id = Yanfly.ItemIdRef[name];
          obj.useItemCostRate[id] = value;
        } else if (Yanfly.WeaponIdRef[name]) {
          var id = Yanfly.WeaponIdRef[name];
          obj.useWeaponCostRate[id] = value;
        } else if (Yanfly.ArmorIdRef[name]) {
          var id = Yanfly.ArmorIdRef[name];
          obj.useArmorCostRate[id] = value;
        }
      } else if (line.match(noteR1)) {
        var type1 = String(RegExp.$1).toUpperCase();
        var id1 = parseInt(RegExp.$2);
        var type2 = String(RegExp.$3).toUpperCase();
        var id2 = parseInt(RegExp.$4);
        if (!['ITEM', 'WEAPON', 'ARMOR'].contains(type1)) continue;
        if (!['ITEM', 'WEAPON', 'ARMOR'].contains(type2)) continue;
        obj.replaceItemCost[type1 + ' ' + id1] = type2 + ' ' + id2;
      } else if (line.match(noteR2)) {
        var name1 = String(RegExp.$1).toUpperCase();
        var name2 = String(RegExp.$2).toUpperCase();
        if (Yanfly.ItemIdRef[name1]) {
          var id = Yanfly.ItemIdRef[name1];
          var type1 = 'ITEM ' + id;
        } else if (Yanfly.WeaponIdRef[name1]) {
          var id = Yanfly.WeaponIdRef[name1];
          var type1 = 'WEAPON ' + id;
        } else if (Yanfly.ArmorIdRef[name1]) {
          var id = Yanfly.ArmorIdRef[name1];
          var type1 = 'ARMOR ' + id;
        } else {
          continue;
        }
        if (Yanfly.ItemIdRef[name2]) {
          var id = Yanfly.ItemIdRef[name2];
          var type2 = 'ITEM ' + id;
        } else if (Yanfly.WeaponIdRef[name2]) {
          var id = Yanfly.WeaponIdRef[name2];
          var type2 = 'WEAPON ' + id;
        } else if (Yanfly.ArmorIdRef[name2]) {
          var id = Yanfly.ArmorIdRef[name2];
          var type2 = 'ARMOR ' + id;
        } else {
          continue;
        }
        obj.replaceItemCost[type1] = type2;
      }
    }
  }
};

DataManager.processSCINotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.itemGaugeColor1 = Yanfly.Param.SCIGauge1
    obj.itemGaugeColor2 = Yanfly.Param.SCIGauge2
    obj.itemGaugeText = Yanfly.Param.SCIDisplayName ? obj.name : '';
    obj.itemGaugeTextColor = Yanfly.Param.SCIDisplayColor;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:ITEM GAUGE COLOR 1):[ ](\d+)>/i)) {
        obj.itemGaugeColor1 = parseInt(RegExp.$1);
      } else if (line.match(/<(?:ITEM GAUGE COLOR 2):[ ](\d+)>/i)) {
        obj.itemGaugeColor2 = parseInt(RegExp.$1);
      } else if (line.match(/<(?:ITEM GAUGE TEXT):[ ](.*)>/i)) {
        obj.itemGaugeText = String(RegExp.$1);
      } else if (line.match(/<(?:ITEM GAUGE TEXT COLOR):[ ](\d+)>/i)) {
        obj.itemGaugeTextColor = parseInt(RegExp.$1);
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.SCI.Game_BattlerBase_canPaySkillCost =
    Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    if (!this.canPaySkillItemCost(skill)) return;
    return Yanfly.SCI.Game_BattlerBase_canPaySkillCost.call(this, skill);
};

Game_BattlerBase.prototype.canPaySkillItemCost = function(skill) {
    return true;
};

Game_BattlerBase.prototype.skillItemCost = function(skill) {
    return [];
};

Game_BattlerBase.prototype.combineSkillItemCostEntries = function(array) {
    var objData = [];
    var amtData = [];
    for (var i = 0; i < array.length; ++i) {
      var obj = array[i][0];
      var amt = array[i][1];
      if (objData.contains(obj)) {
        var index = objData.indexOf(obj);
        amtData[index] += amt;
        amtData[index] = Math.floor(amtData[index]);
        amtData[index] = Math.max(0, amtData[index]);
      } else {
        objData.push(obj);
        amtData.push(amt);
      }
    }
    var data = [];
    for (var i = 0; i < objData.length; ++i) {
      data.push([objData[i], amtData[i]]);
    }
    return data;
};

Game_BattlerBase.prototype.extractSkillItemCost = function(array, type) {
    var data = [];
    var max = array.length;
    for (var i = 0; i < max; ++i) {
      var id = array[i][0];
      var cost = array[i][1];
      var code = array[i][2];
      if (type === 0) {
        var item = $dataItems[id];
      } else if (type === 1) {
        var item = $dataWeapons[id];
      } else if (type === 2) {
        var item = $dataArmors[id];
      } else {
        continue;
      }
      if (!item) continue;

      cost = this.applySkillItemCostEval(item, cost, code);
      cost = this.applySkillItemCostModifier(item, cost);
      item = this.applySkillItemReplace(item);
      data.push([item, cost]);
    }
    return data;
};

Game_BattlerBase.prototype.applySkillItemCostEval = function(item, cost, code) {
    if (code === '') return cost;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(code);
    return cost;
};

Game_BattlerBase.prototype.applySkillItemCostModifier = function(item, cost) {
    cost *= this.getSkillItemCostRate(item);
    cost += this.getSkillItemCostSet(item);
    return Math.floor(Math.max(0, cost));
};

Game_BattlerBase.prototype.getSkillItemCostRate = function(item) {
    var rate = 1;
    var max = this.states().length;
    for (var i = 0; i < max; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      rate *= this.getSkillItemCostObjRate(item, state);
    }
    return rate;
};

Game_BattlerBase.prototype.getSkillItemCostObjRate = function(item, obj) {
    if (!item) return 1;
    if (!obj) return 1;
    if (DataManager.isItem(item) && obj.useItemCostRate) {
      return obj.useItemCostRate[item.id] || 1;
    } else if (DataManager.isWeapon(item) && obj.useWeaponCostRate) {
      return obj.useWeaponCostRate[item.id] || 1;
    } else if (DataManager.isArmor(item) && obj.useArmorCostRate) {
      return obj.useArmorCostRate[item.id] || 1;
    }
    return 1;
};

Game_BattlerBase.prototype.getSkillItemCostSet = function(item) {
    var bonus = 0;
    var max = this.states().length;
    for (var i = 0; i < max; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      bonus += this.getSkillItemCostObjSet(item, state);
    }
    return bonus;
};

Game_BattlerBase.prototype.getSkillItemCostObjSet = function(item, obj) {
    if (!item) return 0;
    if (!obj) return 0;
    if (DataManager.isItem(item) && obj.useItemCostSet) {
      return obj.useItemCostSet[item.id] || 0;
    } else if (DataManager.isWeapon(item) && obj.useWeaponCostSet) {
      return obj.useWeaponCostSet[item.id] || 0;
    } else if (DataManager.isArmor(item) && obj.useArmorCostSet) {
      return obj.useArmorCostSet[item.id] || 0;
    }
    return 0;
};

Yanfly.SCI.Game_BattlerBase_paySkillCost = 
    Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Yanfly.SCI.Game_BattlerBase_paySkillCost.call(this, skill);
    this.paySkillItemCost(skill);
};

Game_BattlerBase.prototype.paySkillItemCost = function(skill) {
    var array = this.skillItemCost(skill);
    var max = array.length;
    for (var i = 0; i < max; ++i) {
      var item = array[i][0];
      var cost = array[i][1];
      this.payIndividualSkillItemCost(item, cost);
    }
};

Game_BattlerBase.prototype.payIndividualSkillItemCost = function(item, cost) {
};

Game_BattlerBase.prototype.numItems = function(item) {
    return $gameParty.maxItems(item);
};

Game_BattlerBase.prototype.maxItems = function(item) {
    return $gameParty.maxItems(item);
};

Game_BattlerBase.prototype.applySkillItemReplace = function(item) {
    var type = '';
    if (DataManager.isItem(item)) type = 'ITEM ' + item.id;
    if (DataManager.isWeapon(item)) type = 'WEAPON ' + item.id;
    if (DataManager.isArmor(item)) type = 'ARMOR ' + item.id;
    var substitute = this.makeSkillItemReplace(type);
    return substitute || item;
};

Game_BattlerBase.prototype.makeSkillItemReplace = function(type) {
    var max = this.states().length;
    for (var i = 0; i < max; ++i) {
      var state = this.states()[i];
      if (state && this.hasSkillItemReplace(state, type)) {
        return this.getSkillItemReplace(state, type);
      }
    }
    return null;
};

Game_BattlerBase.prototype.hasSkillItemReplace = function(obj, type) {
    if (obj.replaceItemCost) {
      return obj.replaceItemCost[type];
    }
    return false;
};

Game_BattlerBase.prototype.getSkillItemReplace = function(obj, type) {
    if (obj.replaceItemCost) {
      var text = obj.replaceItemCost[type];
      if (text.match(/ITEM[ ](\d+)/i)) {
        return $dataItems[parseInt(RegExp.$1)];
      } else if (text.match(/WEAPON[ ](\d+)/i)) {
        return $dataWeapons[parseInt(RegExp.$1)];
      } else if (text.match(/ARMOR[ ](\d+)/i)) {
        return $dataArmors[parseInt(RegExp.$1)];
      }
    }
    return null;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.canPaySkillItemCost = function(skill) {
    var array = this.skillItemCost(skill);
    var max = array.length;
    for (var i = 0; i < max; ++i) {
      var item = array[i][0];
      var cost = array[i][1];
      if (this.numItems(item) < cost) return false;
    }
    return Game_BattlerBase.prototype.canPaySkillItemCost.call(this, skill);
};

Game_Actor.prototype.skillItemCost = function(skill) {
    var array = Game_BattlerBase.prototype.skillItemCost.call(this, skill);
    array = array.concat(this.extractSkillItemCost(skill.useItemCost, 0));
    array = array.concat(this.extractSkillItemCost(skill.useWeaponCost, 1));
    array = array.concat(this.extractSkillItemCost(skill.useArmorCost, 2));
    array = this.combineSkillItemCostEntries(array);
    return array;
};

Game_Actor.prototype.payIndividualSkillItemCost = function(item, cost) {
    $gameParty.loseItem(item, cost, false);
};

Game_Actor.prototype.numItems = function(item) {
    return $gameParty.numItems(item);
};

Game_Actor.prototype.maxItems = function(item) {
    return $gameParty.maxItems(item);
};

Game_Actor.prototype.getSkillItemCostRate = function(item) {
    var rate = Game_Battler.prototype.getSkillItemCostRate.call(this, item);
    rate *= this.getSkillItemCostObjRate(item, this.actor());
    rate *= this.getSkillItemCostObjRate(item, this.currentClass());
    var max = this.equips().length;
    for (var i = 0; i < max; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      rate *= this.getSkillItemCostObjRate(item, equip);
    }
    return rate;
};

Game_Actor.prototype.getSkillItemCostSet = function(item) {
    var bonus = Game_Battler.prototype.getSkillItemCostSet.call(this, item);
    bonus += this.getSkillItemCostObjSet(item, this.actor());
    bonus += this.getSkillItemCostObjSet(item, this.currentClass());
    var max = this.equips().length;
    for (var i = 0; i < max; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      bonus += this.getSkillItemCostObjSet(item, equip);
    }
    return bonus;
};

Game_Actor.prototype.makeSkillItemReplace = function(type) {
    var state = Game_Battler.prototype.makeSkillItemReplace.call(this, type);
    if (state) return state;
    var max = this.equips().length;
    for (var i = 0; i < max; ++i) {
      var equip = this.equips()[i];
      if (equip && this.hasSkillItemReplace(equip, type)) {
        return this.getSkillItemReplace(equip, type);
      }
    }
    if (this.hasSkillItemReplace(this.currentClass(), type)) {
      return this.getSkillItemReplace(this.currentClass(), type);
    }
    if (this.hasSkillItemReplace(this.actor(), type)) {
      return this.getSkillItemReplace(this.actor(), type);
    }
    return null;
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.SCI.Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    if (actor.gauge1().match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
      this.drawItemGaugeSwap(actor, 1, x, y, width);
    } else {
      Yanfly.SCI.Window_Base_drawActorHp.call(this, actor, x, y, width);
    }
};

Yanfly.SCI.Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    if (actor.gauge2().match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
      this.drawItemGaugeSwap(actor, 2, x, y, width);
    } else {
      Yanfly.SCI.Window_Base_drawActorMp.call(this, actor, x, y, width);
    }
};

Yanfly.SCI.Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    if (actor.gauge3().match(/(?:ITEM|WEAPON|ARMOR)[ ](\d+)/i)) {
      this.drawItemGaugeSwap(actor, 3, x, y, width);
    } else {
      Yanfly.SCI.Window_Base_drawActorTp.call(this, actor, x, y, width);
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
    var icon = item.iconIndex;
    if (id === 1 && actor.gaugeIcon1() > 0) icon = actor.gaugeIcon1();
    if (id === 2 && actor.gaugeIcon2() > 0) icon = actor.gaugeIcon2();
    if (id === 3 && actor.gaugeIcon3() > 0) icon = actor.gaugeIcon3();
    this.drawItemGaugeMain(actor, item, wx, wy, ww);
    var iw = this.drawItemGaugeIcon(icon, wx, wy);
    wx += iw;
    ww -= iw;
    var size = this.contents.fontSize;
    this.drawItemGaugeName(actor, item, wx, wy, ww);
    this.contents.fontSize = size;
    var cur = actor.numItems(item);
    var max = actor.maxItems(item);
    var color = this.normalColor();
    this.drawCurrentAndMax(cur, max, wx, wy, ww, color, color);
};

Window_Base.prototype.drawItemGaugeName = function(actor, item, wx, wy, ww) {
    ww -= this.textWidth(Yanfly.Util.toGroup(actor.numItems(item)));
    ww -= this.textWidth(Yanfly.Util.toGroup(actor.maxItems(item)));
    ww -= this.textWidth('/');
    var text = item.itemGaugeText;
    for (;;) {
      var nameWidth = this.textWidth(text);
      if (nameWidth > ww) {
        this.contents.fontSize -= 1;
      } else {
        break;
      }
      if (this.contents.fontSize < 1) break;
    }
    this.changeTextColor(this.textColor(item.itemGaugeTextColor));
    this.drawText(text, wx, wy, ww);
};

Window_Base.prototype.drawItemGaugeMain = function(actor, item, wx, wy, ww) {
    var color1 = this.textColor(item.itemGaugeColor1);
    var color2 = this.textColor(item.itemGaugeColor2);
    var rate = actor.numItems(item) / actor.maxItems(item);
    this.drawGauge(wx, wy, ww, rate, color1, color2);
};

Window_Base.prototype.drawItemGaugeIcon = function(icon, wx, wy) {
    this.drawIcon(icon, wx, wy);
    return Window_Base._iconWidth + 4;
};

//=============================================================================
// Window_SkillList
//=============================================================================

Yanfly.SCI.Window_SkillList_drawTpCost = Window_SkillList.prototype.drawTpCost;
Window_SkillList.prototype.drawTpCost = function(skill, wx, wy, dw) {
    dw = this.drawSkillItemCost(skill, wx, wy, dw);
    return Yanfly.SCI.Window_SkillList_drawTpCost.call(this, skill, wx, wy, dw);
};

Window_SkillList.prototype.drawSkillItemCost = function(skill, wx, wy, dw) {
    if (Yanfly.Param.SCICostStyle === 0) return dw;
    var array = this._actor.skillItemCost(skill);
    var max = array.length;
    if (max <= 0) return dw;
    this.contents.fontSize = Yanfly.Param.SCIFontSize;
    dw -= 2;
    for (var i = 0; i < max; ++i) {
      var arr = array[max - i - 1];
      var item = arr[0];
      var cost = arr[1];
      dw = this.drawSoloItemCost(item, cost, wx, wy, dw);
    }
    var returnWidth = dw - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawSoloItemCost = function(item, cost, wx, wy, dw) {
    var x = wx + dw - Window_Base._iconWidth;
    this.drawIcon(item.iconIndex, x, wy + 2);
    var amt1 = Yanfly.Util.toGroup(cost);
    var amt2 = Yanfly.Util.toGroup(this._actor.numItems(item));
    var fmt = Yanfly.Param.SCIAmountFmt;
    var text = fmt.format(amt1, amt2);
    if (Yanfly.Param.SCICostStyle === 1) {
      var iconWidth = Window_Base._iconWidth + 4;
      this.drawText(text, wx, wy + Yanfly.Param.SCIYBuffer, dw, 'right');
      dw -= Math.max(iconWidth, this.textWidth(text));
    } else if (Yanfly.Param.SCICostStyle === 2) {
      var iconWidth = Window_Base._iconWidth;
      dw -= iconWidth;
      this.drawText(text, wx, wy + Yanfly.Param.SCIYBuffer, dw, 'right');
      dw -= this.textWidth(text);
    }
    return dw;
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
