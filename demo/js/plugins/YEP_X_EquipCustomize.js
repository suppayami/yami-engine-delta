//=============================================================================
// Yanfly Engine Plugins - Equip Extension - Equip Customize Command
// YEP_X_EquipCustomize.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_EquipCustomize = true;

var Yanfly = Yanfly || {};
Yanfly.ECC = Yanfly.ECC || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_ItemCore && YEP_EquipCore.js)
 * Adds a 'Customize' command to the Equip menu.
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @desc The text used for the command name in the Equip menu.
 * @default Customize
 *
 * @param Default Enable
 * @desc Show the Customize command in the Equip menu by default?
 * NO - false     YES - true
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_ItemCore && YEP_EquipCore.js. Make sure this plugin
 * is located under both of those plugins in the plugin list.
 *
 * Games that use the YEP_X_ItemUpgradeSlots, YEP_X_ItemDurability, and
 * YEP_X_AttachAugment plugins may notice that it's not too intuitive to
 * modify items from the item menu when they're equipped to the actors in the
 * equip menu. This plugin will add a "Customize" option to the Equip menu that
 * will function as a shortcut to the Item menu for quick customization access.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * There's a couple of plugin commands you can use with this plugin.
 *
 * Plugin Command:
 *
 *   ShowEquipCustomize
 *   - This will show the 'Customize' command in the equip menu.
 *
 *   HideEquipCustomize
 *   - This will hide the 'Customize' command in the equip menu.
 */
//=============================================================================

if (Imported.YEP_ItemCore && Imported.YEP_EquipCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_EquipCustomize');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ItemSceneItem = 'true';
Yanfly.Param.ItemShEquipped = 'false';

Yanfly.Param.EECName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.EECEnable = String(Yanfly.Parameters['Default Enable']);

//=============================================================================
// Game_System
//=============================================================================

Yanfly.ECC.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.ECC.Game_System_initialize.call(this);
    this.initECC();
};

Game_System.prototype.initECC = function() {
    this._ECCShown = Yanfly.Param.EECEnable;
};

Game_System.prototype.isEquipCustomizable = function() {
    if (this._ECCShown === undefined) this.initECC();
    return this._ECCShown;
};

Game_System.prototype.setEquipCustomizable = function(value) {
    if (this._ECCShown === undefined) this.initECC();
    this._ECCShown = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.ECC.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.ECC.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowEquipCustomize') $gameSystem.setEquipCustomizable(true);
  if (command === 'HideEquipCustomize') $gameSystem.setEquipCustomizable(false);
};

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.addCommandAt = function(index, name, symbol, en, ext) {
    if (en === undefined) enabled = true;
    if (ext === undefined) ext = null;
    var obj = { name: name, symbol: symbol, enabled: en, ext: ext};
    this._list.splice(index, 0, obj);
};

//=============================================================================
// Window_EquipCommand
//=============================================================================

Yanfly.ECC.Window_EquipCommand_addCustomCommand =
    Window_EquipCommand.prototype.addCustomCommand;
Window_EquipCommand.prototype.addCustomCommand = function() {
    Yanfly.ECC.Window_EquipCommand_addCustomCommand.call(this);
    if ($gameSystem.isEquipCustomizable()) this.addEquipCustomizeCommand();
};

Window_EquipCommand.prototype.addEquipCustomizeCommand = function() {
    var index = this.findSymbol('equip') + 1;
    if ($gameParty.inBattle()) {
      var enabled = BattleManager.isBattleTest();
    } else {
      var enabled = true;
    }
    this.addCommandAt(index, Yanfly.Param.EECName, 'customize', enabled);
};

//=============================================================================
// Window_EquipSlot
//=============================================================================

Window_EquipSlot.prototype.playOkSound = function() {
    var win = SceneManager._scene._commandWindow;
    if (win && win.currentSymbol() === 'customize' && !this.item()) return;
    Window_Selectable.prototype.playOkSound.call(this);
};

//=============================================================================
// Scene_Equip
//=============================================================================

Yanfly.ECC.Scene_Equip_createCommandWindow =
    Scene_Equip.prototype.createCommandWindow;
Scene_Equip.prototype.createCommandWindow = function() {
    Yanfly.ECC.Scene_Equip_createCommandWindow.call(this);
    this._commandWindow.setHandler('customize', this.commandEquip.bind(this));
};

Yanfly.ECC.Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function() {
    Yanfly.ECC.Scene_Equip_refreshActor.call(this);
    if ($gameTemp._customizeReturning) {
      var index = this._commandWindow.findSymbol('customize');
      this._commandWindow.select(index);
      this._commandWindow.deactivate();
      this._commandWindow._scrollY = $gameTemp._commandScrollY;
      $gameTemp._commandScrollY = 0;
      this._slotWindow.activate();
      this._slotWindow.select($gameTemp._slotIndex);
      this._slotWindow._scrollY = $gameTemp._slotScrollY;
      $gameTemp._customizeReturning = false;
      $gameTemp._slotIndex = 0;
      $gameTemp._slotScrollY = 0;
      this._slotWindow.updateHelp();
    }
};

Yanfly.ECC.Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
Scene_Equip.prototype.onSlotOk = function() {
    if (this._commandWindow.currentSymbol() === 'customize') {
      return this.customizeSlot();
    }
    Yanfly.ECC.Scene_Equip_onSlotOk.call(this);
};

Scene_Equip.prototype.customizeSlot = function() {
    var item = this._slotWindow.item();
    if (item === null) {
      this._slotWindow.activate();
      return SoundManager.playBuzzer();
    }
    $gameTemp._equipCustomize = true;
    $gameTemp._slotIndex = this._slotWindow.index();
    $gameTemp._customizeItem = item;
    $gameTemp._commandScrollY = this._commandWindow._scrollY;
    $gameTemp._slotScrollY = this._slotWindow._scrollY;
    SceneManager.push(Scene_EquipCustomize);
};

//=============================================================================
// Scene_EquipCustomize
//=============================================================================

function Scene_EquipCustomize() {
    this.initialize.apply(this, arguments);
}

Scene_EquipCustomize.prototype = Object.create(Scene_Item.prototype);
Scene_EquipCustomize.prototype.constructor = Scene_Item;

Scene_EquipCustomize.prototype.initialize = function() {
    Scene_Item.prototype.initialize.call(this);
};

Scene_EquipCustomize.prototype.createCategoryWindow = function() {
    Scene_Item.prototype.createCategoryWindow.call(this);
    this._categoryWindow.deactivate();
    this._categoryWindow.hide();
    var wy = this._helpWindow.height;
    this._commandWindow = new Window_EquipCommand(0, wy, 240);
    this.addWindow(this._commandWindow);
    this._commandWindow.deactivate();
    var index = this._commandWindow.findSymbol('customize');
    this._commandWindow.select(index);
};

Scene_EquipCustomize.prototype.item = function() {
    return $gameTemp._customizeItem;
};

Scene_EquipCustomize.prototype.createItemWindow = function() {
    Scene_Item.prototype.createItemWindow.call(this);
    this._itemWindow._data = [$gameTemp._customizeItem];
    this._itemWindow.select(1);
    this._itemWindow.hide();
};

Scene_EquipCustomize.prototype.createActionWindow = function() {
    Scene_Item.prototype.createActionWindow.call(this);
    this.setCustomizedItem();
};

Scene_EquipCustomize.prototype.setCustomizedItem = function() {
    this._helpWindow.setItem(this.item());
    this._statusWindow.setItem(this.item());
    this._infoWindow.setItem(this.item());
    this._itemActionWindow.setItem(this.item());
};

Scene_EquipCustomize.prototype.onActionCancel = function() {
    $gameTemp._customizeItem = null;
    $gameTemp._customizeReturning = true;
    $gameTemp._equipCustomize = false;
    SceneManager.pop();
};

Scene_EquipCustomize.prototype.onUpgradeFullReset = function() {
    ItemManager._fullReset = false;
    this.onActionCancel();
};

//=============================================================================
// End of File
//=============================================================================
};