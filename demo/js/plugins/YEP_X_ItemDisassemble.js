//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Item Disassemble
// YEP_X_ItemDisassemble.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemDisassemble = true;

var Yanfly = Yanfly || {};
Yanfly.IDA = Yanfly.IDA || {};

//=============================================================================
 /*:
 * @plugindesc v1.03 (Requires YEP_ItemCore.js) Grants the option to
 * break down items in the item menu into other items.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Disassemble Command
 * @desc The command text used for disassembling items.
 * %1 - Item Name
 * @default Disassemble %1
 *
 * @param Disassemble List
 * @desc The text used to list the disassemble items.
 * @default Disassemble Items
 *
 * @param Item Quantity 1
 * @desc This is how item quantity is drawn in the list of items.
 * %1 - Quantity     %2 - Item Name
 * @default ×%1 %2
 *
 * @param Item Quantity 2
 * @desc This is how item quantity is drawn in the list of items.
 * %1 - Quantity1   %2 - Quantity2     %3 - Item Name
 * @default ×%1-×%2 %3
 *
 * @param Rate Font Size
 * @desc This is the text's font size used for the success rate.
 * Default: 28f
 * @default 20
 *
 * @param ---Disassemble Sound---
 * @default
 *
 * @param Disassemble Sound
 * @desc This is the default disassemble sound filename.
 * This is case-sensitive. Do not include file extension.
 * @default Break
 *
 * @param Disassemble Volume
 * @desc This is the default disassemble sound volume.
 * @default 100
 *
 * @param Disassemble Pitch
 * @desc This is the default disassemble sound pitch.
 * @default 150
 *
 * @param Disassemble Pan
 * @desc This is the default disassemble sound pan.
 * @default 0
 *
 * @param ---Result Sound---
 * @default
 *
 * @param Result Sound
 * @desc This is the default result sound filename.
 * This is case-sensitive. Do not include file extension.
 * @default Item1
 *
 * @param Result Volume
 * @desc This is the default result sound volume.
 * @default 100
 *
 * @param Result Pitch
 * @desc This is the default result sound pitch.
 * @default 100
 *
 * @param Result Pan
 * @desc This is the default result sound pan.
 * @default 0
 *
 * @param ---Empty Sound---
 * @default
 *
 * @param Empty Sound
 * @desc This is the no salvage results sound filename.
 * This is case-sensitive. Do not include file extension.
 * @default Buzzer2
 *
 * @param Empty Volume
 * @desc This is the no salvage results sound volume.
 * @default 100
 *
 * @param Empty Pitch
 * @desc This is the no salvage results sound pitch.
 * @default 100
 *
 * @param Empty Pan
 * @desc This is the no salvage results sound pan.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_ItemCore.
 * Make sure this plugin is located under YEP_ItemCore in the plugin list.
 *
 * Sometimes, there are items that are simply not useful to the player anymore.
 * In that case, why not give players the option to break down the item into
 * something a little bit more useful? Using this plugin, players can break
 * down and disassemble items, weapons, and armors into something else. Using
 * different types of disassemblers, the player can get different types of
 * items back, too.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Making items be disassemble-able can be done with these notetags:
 *
 * Item, Weapon, and Armor Notetags:
 * 
 *   <Disassemble Pool>
 *    item
 *    item
 *   </Disassemble Pool>
 *   This is the pool of items that will be given when using any disassemblers.
 *   Replace the 'item' in the notetag setup with one of the syntax in the
 *   notetag Item Pool Format list below.
 *
 *   <Disassemble Pool: type>
 *    item
 *    item
 *   </Disassemble Pool: type>
 *   This is the pool of items made specifically for the disassembler type.
 *   The items listed in this pool will only drop if the disassembler's type
 *   matches this pool's type. Replace the 'item' in the notetag setup with
 *   one of the syntax in the notetag Item Pool Format list below.
 *
 *   --- Item Pool Format ---
 *
 *   item x
 *   weapon x
 *   armor x
 *   name
 *   - This adds item, weapon, or armor ID x to the disassemble pool. If you
 *   plan on using the item's name and multiple objects in the database have
 *   the same name, priority will be given to items, weapons, then armors in
 *   that order. Then, priority is then given to the entry with the highest ID.
 *
 *   item x: y%
 *   weapon x: y%
 *   armor x: y%
 *   name: y%
 *   - If you wish for a chance of getting an item when disassembling instead
 *   of a 100% chance of getting it, you can use this format. For the item,
 *   there will be a y% chance of getting the item when disassembling.
 *
 *   x2 item y
 *   x3 weapon y
 *   x4 armor y
 *   x5 name
 *   - When disassembling, items can yield quantities. You can set the amount
 *   of an item given when disassembling using this setup.
 *
 *   x2-3 item y
 *   x3-5 weapon y
 *   x5-8 armor y
 *   x8-10 name
 *   - If you wish for there to be random quantity amounts, you can use this
 *   disassembling format to set the amount of quantity given of an item from
 *   a minimum amount to a maximum amount.
 *
 *   x2 item y: z%
 *   x3 weapon y: z%
 *   x4 armor y: z%
 *   x5 name: z%
 *   - To make an item yield a larger quantity than 1 with a random success
 *   rate of doing it, use the above format for the item line.
 *
 *   x2-3 item y: z%
 *   x3-5 weapon y: z%
 *   x5-8 armor y: z%
 *   x8-10 name: z%
 *   - To give a random amount of item quantities while having a random success
 *   rate of acquiring them item during a disassembling process, use the above
 *   item line format.
 *
 *   ---
 *
 *   *NOTE: When turning an item into a Disassembler, it will become a
 *   non-Independent item.
 *
 *   <Disassembler>
 *   - This item can be used to disassemble all types of items. This will fall
 *   under the 'All' category.
 *
 *   <Disassembler: +x%>
 *   <Disassembler: -x%>
 *   - This item can be used to disassemble all types of items with a +/- x%
 *   success rate than normal. This will fall under the 'All' category.
 *
 *   <Disassembler: type>
 *   - This item can be used to disassemble item categories for 'All' and
 *   'type' where 'type' is the disassemble pool type. Insert multiples of this
 *   notetag if you want this item to be able to disassemble more pool types.
 *
 *   <Disassembler: type +x%>
 *   <Disassembler: type -x%>
 *   - This item can be used to disassemble item categories for 'All' and
 *   'type' where 'type' is the disassemble pool type. This has a success rate
 *   change of +/-% than normal. Insert multiples of this notetag if you want
 *   this item to be able to disassemble more pool types.
 *
 *   <Disassemble Sound Name: filename>
 *   <Disassemble Sound Volume: x>
 *   <Disassemble Sound Pitch: x>
 *   <Disassemble Sound Pan: +x> or <Disassemble Sound Pan: -x>
 *   - When this item is disassembled, it will play this sound effect. The
 *   filename is case sensitive. Do not include the filename extension.
 *
 * ============================================================================
 * Lunatic Mode - Custom Disassembled Effect
 * ============================================================================
 *
 * For those with JavaScript experience, you can have custom effects occur when
 * an item is disassembled using the following notetag:
 *
 * Item, Weapon, and Armor Notetags:
 *
 *   <Custom Disassembled Effect>
 *    if (targetItem.name === 'Great Sword') {
 *      results.push($dataItems[1]);
 *    } else if (effectItem.name === 'Salvage Kit') {
 *      results.push($dataItems[2]);
 *    }
 *   </Custom Disassembled Effect>
 *   - The 'results' variable is an array that contains all of the items that
 *   have been collected. The variable 'targetItem' refers to the item being
 *   disassembled and 'effectItem' refers to the item disassembling the target
 *   item. This will occur before any custom disassembler effects.
 *   *NOTE: This requires that item to have items to gain when disassembling to
 *   begin with or else the item cannot be disassembled.
 *
 * ============================================================================
 * Lunatic Mode - Custom Disassembler Effect
 * ============================================================================
 *
 * For those with JavaScript experience, you can have custom effects occur when
 * an item is used to disassemble using the following notetag:
 *
 * Item, Weapon, and Armor Notetags:
 *
 *   <Custom Disassembler Effect>
 *    if (targetItem.name === 'Great Sword') {
 *      results.push($dataItems[1]);
 *    } else if (effectItem.name === 'Salvage Kit') {
 *      results.push($dataItems[2]);
 *    }
 *   </Custom Disassembler Effect>
 *   - The 'results' variable is an array that contains all of the items that
 *   have been collected. The variable 'targetItem' refers to the item being
 *   disassembled and 'effectItem' refers to the item disassembling the target
 *   item. This will occur after any custom disassembled effects.
 *   *NOTE: This item is required to have a disassembler type.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * You can use the following plugin commands to alter Item Disassemble related
 * aspects of your game:
 *
 * Plugin Command:
 *
 *   ShowItemDisassemble
 *   - Shows the Disassemble command in the item menu if the item permits
 *   disassembling.
 *
 *   HideItemDisassemble
 *   - Hides the Disassemble command in the item menu regardless.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Fixed a bug that caused NaN values to appear for the displayed rates.
 *
 * Version 1.02:
 * - Fixed a typo within the code. Please update Item Core, Item Disassemble,
 * Attachable Augments, and More Currencies if you are using those plugins.
 *
 * Version 1.01:
 * - Fixed a bug that didn't update the info window properly.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_ItemCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ItemDisassemble');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IDACmdNameFmt = String(Yanfly.Parameters['Disassemble Command']);
Yanfly.Param.IDADisList = String(Yanfly.Parameters['Disassemble List']);
Yanfly.Param.IDAQuantityFmt1 = String(Yanfly.Parameters['Item Quantity 1']);
Yanfly.Param.IDAQuantityFmt2 = String(Yanfly.Parameters['Item Quantity 2']);
Yanfly.Param.IDARateSize = Number(Yanfly.Parameters['Rate Font Size']);

Yanfly.Param.IDASoundName = String(Yanfly.Parameters['Disassemble Sound']);
Yanfly.Param.IDASoundVol = Number(Yanfly.Parameters['Disassemble Volume']);
Yanfly.Param.IDASoundPitch = Number(Yanfly.Parameters['Disassemble Pitch']);
Yanfly.Param.IDASoundPan = Number(Yanfly.Parameters['Disassemble Pan']);

Yanfly.Param.IDAResultSound = {
  name: String(Yanfly.Parameters['Result Sound']),
  volume: Number(Yanfly.Parameters['Result Volume']),
  pitch: Number(Yanfly.Parameters['Result Pitch']),
  pan: Number(Yanfly.Parameters['Result Pan'])
}

Yanfly.Param.IDAEmptytSound = {
  name: String(Yanfly.Parameters['Empty Sound']),
  volume: Number(Yanfly.Parameters['Empty Volume']),
  pitch: Number(Yanfly.Parameters['Empty Pitch']),
  pan: Number(Yanfly.Parameters['Empty Pan'])
}

//=============================================================================
// DataManager
//=============================================================================

Yanfly.IDA.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.IDA.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ItemDisassemble) {
    this.processIDANotetagsI($dataItems);
    this.processIDANotetagsW($dataWeapons);
    this.processIDANotetagsA($dataArmors);
    this.processIDANotetags1($dataItems);
    this.processIDANotetags1($dataWeapons);
    this.processIDANotetags1($dataArmors);
    Yanfly._loaded_YEP_X_ItemDisassemble = true;
  }
  
  return true;
};

DataManager.processIDANotetagsI = function(group) {
  if (Yanfly.ItemIdRef) return;
  Yanfly.ItemIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ItemIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processIDANotetagsW = function(group) {
  if (Yanfly.WeaponIdRef) return;
  Yanfly.WeaponIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.WeaponIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processIDANotetagsA = function(group) {
  if (Yanfly.ArmorIdRef) return;
  Yanfly.ArmorIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ArmorIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processIDANotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.disassemblerTypes = [];
    obj.disassemblerRates = [];
    obj.disassembleItems = {};
    obj.canDisassemble = true;
    obj.disassembleSound = {
      name:   Yanfly.Param.IDASoundName,
      volume: Yanfly.Param.IDASoundVol,
      pitch:  Yanfly.Param.IDASoundPitch,
      pan:    Yanfly.Param.IDASoundPan
    };
    var evalMode = 'none';
    var evalType = 'none';
    obj.customDisassembledEval = '';
    obj.customDisassemblerEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<DISASSEMBLE POOL>/i)) {
        evalMode = 'disassemble pool';
        evalType = 'ALL';
        obj.disassembleItems[evalType] = obj.disassembleItems[evalType] || [];
      } else if (line.match(/<\/DISASSEMBLE POOL>/i)) {
        evalMode = 'none';
        evalType = 'none';
      } else if (line.match(/<DISASSEMBLE POOL:[ ](.*)>/i)) {
        evalMode = 'disassemble pool';
        evalType = String(RegExp.$1).toUpperCase().trim();
        obj.disassembleItems[evalType] = obj.disassembleItems[evalType] || [];
      } else if (line.match(/<\/DISASSEMBLE POOL:[ ](.*)>/i)) {
        evalMode = 'none';
        evalType = 'none';
      } else if (evalMode === 'disassemble pool') {
        obj.disassembleItems[evalType] = obj.disassembleItems[evalType] || [];
        obj.disassembleItems[evalType].push(line.trim());
      } else if (line.match(/<DISASSEMBLER>/i)) {
        obj.nonIndependent = true;
        if (!obj.disassemblerTypes.contains('ALL')) {
          obj.disassemblerTypes.push('ALL');
          obj.disassemblerRates.push(0);
        }
      } else if (line.match(/<DISASSEMBLER:[ ]([\+\-]\d+)([%％])>/i)) {
        obj.nonIndependent = true;
        var rate = parseFloat(RegExp.$1) * 0.01;
        if (!obj.disassemblerTypes.contains('ALL')) {
          obj.disassemblerTypes.push('ALL');
          obj.disassemblerRates.push(rate);
        }
      } else if (line.match(/<DISASSEMBLER:[ ](.*)[ ]([\+\-]\d+)([%％])>/i)) {
        obj.nonIndependent = true;
        var type = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2) * 0.01;
        if (!obj.disassemblerTypes.contains('ALL')) {
          obj.disassemblerTypes.push('ALL');
          obj.disassemblerRates.push(rate);
        }
        if (!obj.disassemblerTypes.contains(type)) {
          obj.disassemblerTypes.push(type);
          obj.disassemblerRates.push(rate);
        }
      } else if (line.match(/<DISASSEMBLER:[ ](.*)>/i)) {
        obj.nonIndependent = true;
        var type = String(RegExp.$1).toUpperCase().trim();
        if (!obj.disassemblerTypes.contains('ALL')) {
          obj.disassemblerTypes.push('ALL');
          obj.disassemblerRates.push(0);
        }
        if (!obj.disassemblerTypes.contains(type)) {
          obj.disassemblerTypes.push(type);
          obj.disassemblerRates.push(0);
        }
      } else if (line.match(/<DISASSEMBLE SOUND NAME:[ ](.*)>/i)) {
        obj.disassembleSound['name'] = String(RegExp.$1);
      } else if (line.match(/<DISASSEMBLE SOUND VOLUME:[ ](\d+)>/i)) {
        obj.disassembleSound['volume'] = parseInt(RegExp.$1);
      } else if (line.match(/<DISASSEMBLE SOUND PITCH:[ ](\d+)>/i)) {
        obj.disassembleSound['pitch'] = parseInt(RegExp.$1);
      } else if (line.match(/<DISASSEMBLE SOUND PAN:[ ]([\+\-]\d+)>/i)) {
        obj.disassembleSound['pan'] = parseInt(RegExp.$1);
      } else if (line.match(/<CUSTOM DISASSEMBLED EFFECT>/i)) {
        evalMode = 'custom disassembled effect';
      } else if (line.match(/<\/CUSTOM DISASSEMBLED EFFECT>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom disassembled effect') {
        obj.customDisassembledEval += line + '\n';
      } else if (line.match(/<CUSTOM DISASSEMBLER EFFECT>/i)) {
        evalMode = 'custom disassembler effect';
      } else if (line.match(/<\/CUSTOM DISASSEMBLER EFFECT>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom disassembler effect') {
        obj.customDisassemblerEval += line + '\n';
      }
    }
  }
};

//=============================================================================
// ItemManager
//=============================================================================

ItemManager.checkDisassemblePool = function(item) {
    if (!item) return;
    if (item.disassembleItems) return;
    if (item.baseItemId) {
      var base = DataManager.getBaseItem(item);
      item.disassembleItems = JsonEx.makeDeepCopy(base.disassembleItems);
    }
};

ItemManager.getDisassembleItems = function(item, type) {
    if (!item || !type) return [];
    if (!item.disassembleItems) {
      if (item.baseItemId) {
        var base = DataManager.getBaseItem(item);
        item.disassembleItems = JsonEx.makeDeepCopy(base.disassembleItems);
      } else {
        return [];
      }
    }
    var pool = item.disassembleItems[type] || [];
    var results = [];
    var length = pool.length;
    for (var i = 0; i < length; ++i) {
      var line = pool[i];
      if (!line) continue;
      this.makeDisassembleItems(line.toUpperCase().trim(), type, results);
    }
    return results;
};

ItemManager.makeDisassembleItems = function(line, type, results) {
    var item = null;
    var rate = 1.0;
    var quantity = [1, 1];
    if (line.match(/X(\d+)-(\d+)[ ](.*)/i)) {
      quantity = [parseInt(RegExp.$1), parseInt(RegExp.$2)];
      line = String(RegExp.$3);
    } else if (line.match(/X(\d+)-X(\d+)[ ](.*)/i)) {
      quantity = [parseInt(RegExp.$1), parseInt(RegExp.$2)];
      line = String(RegExp.$3);
    } else if (line.match(/X(\d+)[ ](.*)/i)) {
      var value = parseInt(RegExp.$1);
      quantity = [value, value];
      line = String(RegExp.$2);
    }
    if (line.match(/(.*):[ ](\d+)([%％])/i)) {
      line = String(RegExp.$1);
      rate = parseFloat(RegExp.$2) * 0.01;
    }
    if (line.match(/ITEM[ ](\d+)/i)) {
      var id = parseInt(RegExp.$1);
      var item = $dataItems[id];
    } else if (line.match(/WEAPON[ ](\d+)/i)) {
      var id = parseInt(RegExp.$1);
      var item = $dataWeapons[id];
    } else if (line.match(/ARMOR[ ](\d+)/i)) {
      var id = parseInt(RegExp.$1);
      var item = $dataArmors[id];
    } else if (Yanfly.ItemIdRef[line]) {
      var id = Yanfly.ItemIdRef[line];
      var item = $dataItems[id];
    } else if (Yanfly.WeaponIdRef[line]) {
      var id = Yanfly.WeaponIdRef[line];
      var item = $dataWeapons[id];
    } else if (Yanfly.ArmorIdRef[line]) {
      var id = Yanfly.ArmorIdRef[line];
      var item = $dataArmors[id];
    }
    if (item) results.push([item, quantity, rate, type])
};

ItemManager.isDisassembler = function(item) {
    if (!item.disassemblerTypes) return;
    return item.disassemblerTypes.length > 0;
};

ItemManager.disassemble = function(targetItem, effectItem) {
    var results = [];
    var pool = [];
    var types = effectItem.disassemblerTypes;
    var rates = effectItem.disassemblerRates;
    var length = types.length;
    for (var i = 0; i < length; ++i) {
      var type = types[i];
      pool = pool.concat(this.getDisassembleItems(targetItem, type));
    }
    length = pool.length;
    for (var i = 0; i < length; ++i) {
      var data = pool[i];
      if (!data) continue;
      var item = data[0]
      var quantity1 = data[1][0];
      var quantity2 = data[1][1];
      if (quantity1 > quantity2) {
        quantity1 = quantity2;
        quantity2 = data[1][0];
      }
      var rate = data[2];
      var type = data[3];
      var index = types.indexOf(type);
      rate += rates[index] || 0;
      if (Math.random() < rate) {
        var total = Yanfly.Util.getRandomInt(quantity1, quantity2);
        for (var j = 0; j < total; ++j) {
          results.push(item);
          $gameParty.gainItem(item, 1);
        }
      }
    }
    this.disassembleEval(results, targetItem, effectItem);
    return results;
};

ItemManager.disassembleEval = function(results, targetItem, effectItem) {
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (targetItem.customDisassembledEval) {
      eval(targetItem.customDisassembledEval)
    }
    if (effectItem.customDisassemblerEval) {
      eval(effectItem.customDisassemblerEval)
    }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.IDA.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.IDA.Game_System_initialize.call(this);
    this.initItemDisassemble();
};

Game_System.prototype.initItemDisassemble = function() {
    this._showItemDisassemble = true;
};

Game_System.prototype.isShowItemDisassemble = function() {
    if ($gameTemp._equipCustomize) return false;
    if (this._showItemDisassemble === undefined) this.initItemDisassemble();
    return this._showItemDisassemble;
};

Game_System.prototype.setShowItemDisassemble = function(value) {
    if (this._showItemDisassemble === undefined) this.initItemDisassemble();
    this._showItemDisassemble = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.IDA.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.IDA.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowItemDisassemble') {
    $gameSystem.setShowItemDisassemble(true);
  } else if (command === 'HideItemDisassemble') {
    $gameSystem.setShowItemDisassemble(false);
  }
};

//=============================================================================
// Window_ItemActionCommand
//=============================================================================

Yanfly.IDA.Window_ItemActionCommand_addCustomCommandsB =
    Window_ItemActionCommand.prototype.addCustomCommandsB;
Window_ItemActionCommand.prototype.addCustomCommandsB = function() {
    Yanfly.IDA.Window_ItemActionCommand_addCustomCommandsB.call(this);
    if (this.isAddDisassembleCommand()) this.addDisassembleCommand();
};

Window_ItemActionCommand.prototype.isAddDisassembleCommand = function() {
    if (!this._item) return false;
    if (!$gameSystem.isShowItemDisassemble()) return false;
    return Object.keys(this._item.disassembleItems).length > 0;
};

Window_ItemActionCommand.prototype.isEnableDisassembleCommand = function() {
    if (!this._item.canDisassemble) return false;
    if (this.isEquippedItem()) return false;
    if (!this._item.disassembleItems) {
      var base = DataManager.getBaseItem(this._item);
      this._item.disassembleItems = JsonEx.makeDeepCopy(base.disassembleItems);
    }
    return Object.keys(this._item.disassembleItems).length > 0;
};

Window_ItemActionCommand.prototype.isEquippedItem = function() {
    var length = $gameParty.members().length;
    for (var a = 0; a < length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      var equipsLength = actor.equips().length;
      for (var i = 0; i < equipsLength; ++i) {
        var equip = actor.equips()[i];
        if (equip && equip.baseItemId) {
          if (equip === this._item) return true;
        }
      }
    }
    return false;
};

Window_ItemActionCommand.prototype.addDisassembleCommand = function() {
    var enabled = this.isEnableDisassembleCommand();
    var fmt = Yanfly.Param.IDACmdNameFmt;
    var name = '\\i[' + this._item.iconIndex + ']';
    if (this._item.textColor !== undefined) {
      name += '\\c[' + this._item.textColor + ']';
    }
    name += this._item.name;
    var text = fmt.format(name);
    this.addCommand(text, 'disassemble', enabled);
};

//=============================================================================
// Window_DisassemblePool
//=============================================================================

function Window_DisassemblePool() {
    this.initialize.apply(this, arguments);
}

Window_DisassemblePool.prototype = Object.create(Window_Base.prototype);
Window_DisassemblePool.prototype.constructor = Window_DisassemblePool;

Window_DisassemblePool.prototype.initialize = function(x, y, w, h) {
    this._currentItem = null;
    this._types = ['ALL'];
    this._rates = [0];
    Window_Base.prototype.initialize.call(this, x, y, w, h);
    this.hide();
};

Window_DisassemblePool.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateCurrentItem();
    this.updateVisibility();
};

Window_DisassemblePool.prototype.setTypes = function(types, rates) {
    this._types = types.slice();
    this._rates = rates.slice();
    this.refresh();
};

Window_DisassemblePool.prototype.updateCurrentItem = function() {
    if (this._currentItem === SceneManager._scene.item()) return;
    this.refresh();
};

Window_DisassemblePool.prototype.updateVisibility = function() {
    var win = SceneManager._scene._itemActionWindow;
    if (!win) return;
    var current = this.visible;
    var visible = win.visible && win.currentSymbol() === 'disassemble';
    win = SceneManager._scene._disassemblerListWindow;
    if (win && win.visible) visible = true;
    this.visible = visible;
    if (current !== this.visible) {
      this._types = ['ALL'];
      this.refresh();
    }
};

Window_DisassemblePool.prototype.refresh = function() {
    this.contents.clear();
    this._currentItem = SceneManager._scene.item();
    var dx = this.textPadding();
    var dy = 0;
    var dw = this.contentsWidth() - dx * 2;
    this.drawItemName(this._currentItem, dx, dy, dw);
    this.drawItemNumber(this._currentItem, dx, dy, dw);
    this.changeTextColor(this.systemColor());
    var text = Yanfly.Param.IDADisList;
    dy += this.lineHeight();
    this.drawText(text, dx, dy, dw, 'center');
    this.drawDisassembleItems();
};

Window_DisassemblePool.prototype.drawItemNumber = function(item, dx, dy, dw) {
    if (DataManager.isIndependent(item)) return;
    this.resetFontSettings();
    var value = $gameParty.numItems(item);
    var text = '×' + Yanfly.Util.toGroup(value);
    if (Yanfly.Param.ItemQuantitySize) {
      this.contents.fontSize = Yanfly.Param.ItemQuantitySize;
    }
    this.drawText(text, dx, dy, dw - this.textPadding(), 'right');
    this.resetFontSettings();
};

Window_DisassemblePool.prototype.drawDisassembleItems = function() {
    var dx = this.textPadding();
    var dy = this.lineHeight() * 2;
    var dw = this.contentsWidth() - dx * 2;
    var length = this._types.length;
    for (var i = 0; i < length; ++i) {
      var type = this._types[i];
      dy = this.drawDisassembleTypePool(dy, type);
    }
};

Window_DisassemblePool.prototype.drawDisassembleTypePool = function(dy, type) {
    var pool = ItemManager.getDisassembleItems(this._currentItem, type);
    if (!pool) return dy;
    var index = this._types.indexOf(type);
    var rateBonus = this._rates[index] || 0;
    var length = pool.length;
    var fmt1 = Yanfly.Param.IDAQuantityFmt1;
    var fmt2 = Yanfly.Param.IDAQuantityFmt2;
    var dx = this.textPadding();
    this.resetFontSettings();
    var dw = this.contentsWidth() - dx * 2;
    for (var i = 0; i < length; ++i) {
      var data = pool[i];
      if (!data) continue;
      var item = data[0];
      var quantity1 = data[1][0];
      var quantity2 = data[1][1];
      if (quantity1 > quantity2) {
        quantity1 = quantity2;
        quantity2 = data[1][0];
      }
      quantity1 = Yanfly.Util.toGroup(quantity1);
      quantity2 = Yanfly.Util.toGroup(quantity2);
      var rate = data[2] + rateBonus;
      var name = '\\i[' + item.iconIndex + ']' + item.name;
      if (quantity1 === quantity2) {
        var text = fmt1.format(quantity1, name);
      } else {
        var text = fmt2.format(quantity1, quantity2, name);
      }
      this.drawTextEx(text, dx, dy);
      rate = rate.clamp(0, 1);
      rate = (rate * 100).toFixed(0);
      text = rate + '%';
      this.contents.fontSize = Yanfly.Param.IDARateSize;
      this.drawText(text, dx, dy, dw, 'right');
      this.resetFontSettings();
      dy += this.lineHeight();
    }
    return dy;
};

//=============================================================================
// Window_DisassemblerList
//=============================================================================

function Window_DisassemblerList() {
    this.initialize.apply(this, arguments);
}

Window_DisassemblerList.prototype = Object.create(Window_ItemList.prototype);
Window_DisassemblerList.prototype.constructor = Window_DisassemblerList;

Window_DisassemblerList.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this._helpIndex = -1;
    this.hide();
};

Window_DisassemblerList.prototype.setPoolWindow = function(win) {
    this._poolWindow = win;
};

Window_DisassemblerList.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
    this.select(0);
};

Window_DisassemblerList.prototype.includes = function(item) {
    if (!item) return false;
    if (DataManager.isIndependent(item)) return false;
    if (!this.containsType(item)) return false;
    return true;
};

Window_DisassemblerList.prototype.containsType = function(item) {
    if (!item) return;
    if (!this._item) return;
    ItemManager.checkDisassemblePool(this._item);
    var types = item.disassemblerTypes;
    var length = types.length;
    if (length <= 0) return false;
    for (var i = 0; i < length; ++i) {
      var type = types[i];
      if (this._item.disassembleItems[type]) {
        if (this._item.disassembleItems[type].length > 0) return true;
      }
    }
    return false;
};

Window_DisassemblerList.prototype.isEnabled = function(item) {
    return item;
};

Window_DisassemblerList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
};

Window_DisassemblerList.prototype.updateHelp = function() {
    Window_ItemList.prototype.updateHelp.call(this);
    this.updateHelpIndex();
};

Window_DisassemblerList.prototype.updateHelpIndex = function() {
    if (!this._poolWindow) return;
    if (this._helpIndex === this.index()) return;
    this.updatePool();
};

Window_DisassemblerList.prototype.updatePool = function() {
    this._helpIndex = this.index();
    var item = this.item();
    if (!item) {
      var types = [];
      var rates = [];
    } else {
      var types = item.disassemblerTypes;
      var rates = item.disassemblerRates;
    }
    this._poolWindow.setTypes(types, rates);
};

Window_DisassemblerList.prototype.playOkSound = function() {
    var sound = {
      name:   Yanfly.Param.IDASoundName,
      volume: Yanfly.Param.IDASoundVol,
      pitch:  Yanfly.Param.IDASoundPitch,
      pan:    Yanfly.Param.IDASoundPan
    };
    if (this.item() && this.item().disassembleSound) {
      sound = this.item().disassembleSound;
    }
    AudioManager.playSe(sound);
};

//=============================================================================
// Window_DisassembleResult
//=============================================================================

function Window_DisassembleResult() {
    this.initialize.apply(this, arguments);
}

Window_DisassembleResult.prototype = Object.create(Window_Selectable.prototype);
Window_DisassembleResult.prototype.constructor = Window_DisassembleResult;

Window_DisassembleResult.prototype.initialize = function() {
    var x = Math.floor(Graphics.boxWidth / 8);
    var y = this.fittingHeight(1);
    var width = Math.floor(Graphics.boxWidth * 3 / 4);
    var height = Graphics.boxHeight - this.fittingHeight(1) * 2;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._data = [];
    this.openness = 0;
    this.deactivate();
};

Window_DisassembleResult.prototype.setResults = function(results) {
    this._data = results;
    this.refresh();
    this.open();
    this.activate();
    this.select(0);
};

Window_DisassembleResult.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_DisassembleResult.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (!item) return;
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.drawItemName(item, rect.x, rect.y, rect.width);
};

Window_DisassembleResult.prototype.playOkSound = function() {
    if (this._data.length > 0) {
      AudioManager.playSe(Yanfly.Param.IDAResultSound);
    } else {
      AudioManager.playSe(Yanfly.Param.IDAEmptytSound);
    }
};

//=============================================================================
// Scene_Item
//=============================================================================

Yanfly.IDA.Scene_Item_createInfoWindow = Scene_Item.prototype.createInfoWindow;
Scene_Item.prototype.createInfoWindow = function() {
    Yanfly.IDA.Scene_Item_createInfoWindow.call(this);
    this.createDisassembleWindows();
};

Scene_Item.prototype.createDisassembleWindows = function() {
    this.createDisassemblePoolWindow();
    this.createDisassemblerListWindow();
    this.createDisassembleResultWindow();
};

Scene_Item.prototype.createDisassemblePoolWindow = function() {
    var x = this._infoWindow.x;
    var y = this._infoWindow.y;
    var w = this._infoWindow.width;
    var h = this._infoWindow.height;
    this._disassemblePoolWindow = new Window_DisassemblePool(x, y, w, h);
    this.addWindow(this._disassemblePoolWindow);
};

Scene_Item.prototype.createDisassemblerListWindow = function() {
    var x = this._itemWindow.x;
    var y = this._itemWindow.y;
    var w = this._itemWindow.width;
    var h = this._itemWindow.height;
    this._disassemblerListWindow = new Window_DisassemblerList(x, y, w, h);
    this._disassemblerListWindow.setHelpWindow(this._helpWindow);
    this._disassemblerListWindow.setPoolWindow(this._disassemblePoolWindow);
    this.addWindow(this._disassemblerListWindow);
    this._disassemblerListWindow.setHandler('cancel',
      this.onDisassemblerListCancel.bind(this));
    this._disassemblerListWindow.setHandler('ok',
      this.onDisassemblerListOk.bind(this));
};

Scene_Item.prototype.createDisassembleResultWindow = function() {
    this._disassembleResultWindow = new Window_DisassembleResult();
    this.addWindow(this._disassembleResultWindow);
    this._disassembleResultWindow.setHandler('ok',
      this.closeDisassembleLootWindow.bind(this));
};

Yanfly.IDA.Scene_Item_createActionWindow =
    Scene_Item.prototype.createActionWindow;
Scene_Item.prototype.createActionWindow = function() {
    Yanfly.IDA.Scene_Item_createActionWindow.call(this);
    this._itemActionWindow.setHandler('disassemble',
      this.onActionDisassemble.bind(this));
};

Scene_Item.prototype.onActionDisassemble = function() {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    this._disassemblerListWindow.show();
    this._disassemblerListWindow.activate();
    this._disassemblerListWindow.setItem(this.item());
    this._disassemblerListWindow.select(0);
    this._disassemblerListWindow.updatePool();
    this._disassemblePoolWindow.refresh();
};

Scene_Item.prototype.onDisassemblerListCancel = function() {
    this._disassemblerListWindow.hide();
    this._disassemblerListWindow.deactivate();
    this._itemActionWindow.show();
    this._itemActionWindow.activate();
    this._helpWindow.setItem(this.item());
};

Scene_Item.prototype.onDisassemblerListOk = function() {
    var effectItem = this._disassemblerListWindow.item();
    if (effectItem) {
      var results = ItemManager.disassemble(this.item(), effectItem);
    } else {
      var results = [];
    }
    $gameParty.loseItem(this.item(), 1);
    this._disassemblePoolWindow.refresh();
    $gameParty.consumeItem(effectItem);
    this._disassembleResultWindow.setResults(results)
};

Scene_Item.prototype.closeDisassembleLootWindow = function() {
    this._disassembleResultWindow.close();
    if (this.isCloseDisassembleWindow()) {
      this._disassemblerListWindow.setItem(null);
      this._disassemblerListWindow.hide();
      this._disassemblerListWindow.deactivate();
      this._itemActionWindow.setItem(null);
      this._itemActionWindow.hide();
      this._itemActionWindow.deactivate();
      this._itemWindow.activate();
      this._itemWindow.refresh();
      this._helpWindow.setItem(this.item());
      if (!this._itemWindow.item()) {
        var index = Math.max(0, this._itemWindow.maxItems() - 1);
        this._itemWindow.select(index);
      }
    } else {
      this._disassemblerListWindow.refresh();
      this._disassemblerListWindow.activate();
    }
    this._infoWindow.setItem(this.item());
};

Scene_Item.prototype.isCloseDisassembleWindow = function() {
    if (DataManager.isIndependent(this.item())) return true;
    return $gameParty.numItems(this.item()) <= 0;
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

Yanfly.Util.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//=============================================================================
// End of File
//=============================================================================
}; // Imported.YEP_ItemCore