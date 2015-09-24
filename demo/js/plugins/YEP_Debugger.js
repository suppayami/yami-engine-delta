//=============================================================================
// Yanfly Engine Plugins - Debugger
// YEP_Debugger.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Debugger = true;

var Yanfly = Yanfly || {};
Yanfly.Debug = Yanfly.Debug || {};

//=============================================================================
 /*:
 * @plugindesc This is Yanfly's debugger plugin tool given to faithful
 * supporters to help you testplay your game better!
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Auto New Game
 * @desc Auto
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Chances are, if you have this plugin, you are most likely contributing to
 * Yanfly's Patreon and supporting Yanfly! Much thanks and appreciations for
 * supporting!
 *
 * This plugin is made to help you test your game more efficiently by providing
 * extra debugging tools that don't normally come with RPG Maker MV. Note that
 * all of these features added by this plugin are disabled when the game is not
 * being played in Play Test or Battle Test mode.
 *
 * Features will be added regularly to this plugin so you can continue to test
 * and debug your game with the most updated tools available!
 *
 * ============================================================================
 * Starting Debug Locations
 * ============================================================================
 *
 * A large portion of games have their own debug rooms. However, it's a bit of
 * a tedious work each time to set the starting location of the player to the
 * debug room each time and return it back. This plugin adds a new solution to
 * reduce that tedious work.
 *
 * What this plugin does is add to your title screen's command window extra
 * options that appear only in debug menu. These options are linked to where
 * you have placed your vehicles in the editor and will allow you to start a
 * new game in that vehicle's default location. If a vehicle does not have a
 * starting location, the option will not appear in the window to select.
 *
 * The purpose of this feature is to allow you to teleport to your debug room
 * quickly without the need to constantly switch the player's start location.
 * As vehicles see very little use (and when they do, their start location in
 * the game is usually changed by an event), having a vehicle as a secondary
 * anchor point makes for a nice shortcut to your debug room.
 *
 * ============================================================================
 * Battle Commands
 * ============================================================================
 *
 * The Party command window (that window with 'Fight' and 'Escape') now has
 * three new commands added to it: Debug Win, Debug Lose, Debug Menu.
 *
 * Debug Win allows you to instantly win the battle. Quickly being able to
 * bypass battles while testing is important to testing as you do not have to
 * spend as much time with battles.
 *
 * Debug Lose allows you to instantly lose the battle by having the player's
 * party reach 0 HP for everyone. Sometimes you want to test a battle where the
 * player is destined to lose. Make use of this command to save you time.
 *
 * Debug Menu allows you to access the debug menu in the middle of battle. Fret
 * not for when you return, the battle will be exactly as it was before.
 *
 * ============================================================================
 * Field Map Debug Tools
 * ============================================================================
 *
 * Here's a list of debug tools you can use on the field map.
 *
 * - Walk Through Walls: Inherent in the game but holding the 'Control' button
 * as you walk allows you to pass through everything and anything. It will also
 * prevent battle encounters.
 *
 * - Click Teleport: You can hold down the 'Control' button and click an area
 * on the map to instantly teleport there. This does not trigger any on touch
 * events. All it does is just instantly teleport the player there.
 *
 * ============================================================================
 * End of Help
 * ============================================================================
 */
//=============================================================================

if (Utils.isNwjs() && Utils.isOptionValid('test')) {

Yanfly.Debug.Command      = 'Debug Menu';
Yanfly.Debug.StartBoat    = 'Debug:Boat';
Yanfly.Debug.StartShip    = 'Debug:Ship';
Yanfly.Debug.StartAirship = 'Debug:Airship';
Yanfly.Debug.BattleWin    = 'Debug Win';
Yanfly.Debug.BattleLose   = 'Debug Lose';

Yanfly.Debug.CmdQuick    = 'Quick';
Yanfly.Debug.CmdSwitch   = 'Switches';
Yanfly.Debug.CmdVariable = 'Variables';

Yanfly.Debug.QuickItemsx1    = 'Gain All Items x1';
Yanfly.Debug.QuickItemsx10   = 'Gain All Items x10';
Yanfly.Debug.QuickItemsMax   = 'Gain All Items xMax';
Yanfly.Debug.QuickWeaponsx1  = 'Gain All Weapons x1';
Yanfly.Debug.QuickWeaponsx10 = 'Gain All Weapons x10';
Yanfly.Debug.QuickWeaponsMax = 'Gain All Weapons xMax';
Yanfly.Debug.QuickArmorsx1  = 'Gain All Armors x1';
Yanfly.Debug.QuickArmorsx10 = 'Gain All Armors x10';
Yanfly.Debug.QuickArmorsMax = 'Gain All Armors xMax';

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Debugger');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.Variable = String(Yanfly.Parameters['Variable']);

//=============================================================================
// DataManager
//=============================================================================

DataManager.debugStart = function(vehicle) {
    DataManager._debugStart = true;
    this.createGameObjects();
    this.selectSavefileForNewGame();
    $gameParty.setupStartingMembers();
    $gamePlayer.reserveTransfer(vehicle.startMapId,
        vehicle.startX, vehicle.startY);
    Graphics.frameCount = 0;
};

//=============================================================================
// Game_Vehicle
//=============================================================================

Yanfly.Debug.Game_Vehicle_loadSystemSettings =
    Game_Vehicle.prototype.loadSystemSettings;
Game_Vehicle.prototype.loadSystemSettings = function() {
    if (DataManager._debugStart) {
      var vehicle = this.vehicle();
      this._mapId = 0;
      this.setPosition(0, 0);
      this.setImage(vehicle.characterName, vehicle.characterIndex);
    } else {
      Yanfly.Debug.Game_Vehicle_loadSystemSettings.call(this);
    }
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

if (!Imported.YEP_MainMenuManager) {
  Yanfly.Debug.Window_MenuCommand_addGameEndCommand =
      Window_MenuCommand.prototype.addGameEndCommand;
  Window_MenuCommand.prototype.addGameEndCommand = function() {
      this.addDebugCommand();
      Yanfly.Debug.Window_MenuCommand_addGameEndCommand.call(this);
  };

  Window_MenuCommand.prototype.addDebugCommand = function() {
      this.addCommand(Yanfly.Debug.Command, 'debug');
  };
};

//=============================================================================
// Window_TitleCommand
//=============================================================================

Yanfly.Debug.Window_TitleCommand_makeCommandList =
    Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    Yanfly.Debug.Window_TitleCommand_makeCommandList.call(this);
    this.addDebugCommands();
};

Window_TitleCommand.prototype.addDebugCommands = function() {
    if ($dataSystem.boat.startMapId > 0) {
      this.addCommand(Yanfly.Debug.StartBoat, 'startBoat');
    }
    if ($dataSystem.ship.startMapId > 0) {
      this.addCommand(Yanfly.Debug.StartShip, 'startShip');
    }
    if ($dataSystem.airship.startMapId > 0) {
      this.addCommand(Yanfly.Debug.StartAirship, 'startAirship');
    }
};

Yanfly.Debug.Window_TitleCommand_selectLast =
    Window_TitleCommand.prototype.selectLast;
Window_TitleCommand.prototype.selectLast = function() {
    Yanfly.Debug.Window_TitleCommand_selectLast.call(this);
    if ($dataSystem.boat.startMapId > 0) {
      this.selectSymbol('startBoat');
    } else if ($dataSystem.ship.startMapId > 0) {
      this.selectSymbol('startShip');
    } else if ($dataSystem.airship.startMapId > 0) {
      this.selectSymbol('startAirship');
    }
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Yanfly.Debug.Window_PartyCommand_makeCommandList =
    Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
    Yanfly.Debug.Window_PartyCommand_makeCommandList.call(this);
    this.addCommand(Yanfly.Debug.BattleWin, 'debugWin');
    this.addCommand(Yanfly.Debug.BattleLose, 'debugLose');
    this.addCommand(Yanfly.Debug.Command, 'debug');
};

//=============================================================================
// Window_DebugCommand
//=============================================================================

function Window_DebugCommand() {
    this.initialize.apply(this, arguments);
}

Window_DebugCommand.prototype = Object.create(Window_Command.prototype);
Window_DebugCommand.prototype.constructor = Window_DebugCommand;

Window_DebugCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this._actor = null;
};

Window_DebugCommand.prototype.windowWidth = function() {
    return 240;
};

Window_DebugCommand.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_DebugCommand.prototype.makeCommandList = function() {
		this.addCommand(Yanfly.Debug.CmdQuick, 'quick', true);
    this.addCommand(Yanfly.Debug.CmdSwitch, 'switch', true);
    this.addCommand(Yanfly.Debug.CmdVariable, 'variable', true);
};

Window_DebugCommand.prototype.itemTextAlign = function() {
    return 'center';
};

//=============================================================================
// Window_DebugQuick
//=============================================================================

function Window_DebugQuick() {
    this.initialize.apply(this, arguments);
}

Window_DebugQuick.prototype = Object.create(Window_Command.prototype);
Window_DebugQuick.prototype.constructor = Window_DebugQuick;

Window_DebugQuick.prototype.initialize = function(dummyWindow) {
    this._dummyWindow = dummyWindow;
    var wx = dummyWindow.x;
    var wy = dummyWindow.y;
    Window_Command.prototype.initialize.call(this, wx, wy);
    this._actor = null;
};

Window_DebugQuick.prototype.windowWidth = function() {
    return this._dummyWindow.width;
};

Window_DebugQuick.prototype.windowHeight = function() {
    return this._dummyWindow.height;
};

Window_DebugQuick.prototype.makeCommandList = function() {
    this.addCommand(Yanfly.Debug.QuickItemsx1, 'item1');
    this.addCommand(Yanfly.Debug.QuickWeaponsx1, 'wep1');
    this.addCommand(Yanfly.Debug.QuickArmorsx1, 'arm1');
    this.addCommand(' ', 'nothing', false);
    this.addCommand(Yanfly.Debug.QuickItemsx10, 'item10');
    this.addCommand(Yanfly.Debug.QuickWeaponsx10, 'wep10');
    this.addCommand(Yanfly.Debug.QuickArmorsx10, 'arm10');
    this.addCommand(' ', 'nothing', false);
    this.addCommand(Yanfly.Debug.QuickItemsMax, 'itemMax');
    this.addCommand(Yanfly.Debug.QuickWeaponsMax, 'wepMax');
    this.addCommand(Yanfly.Debug.QuickArmorsMax, 'armMax');
};

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.Debug.Scene_Title_createCommandWindow =
    Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
  Yanfly.Debug.Scene_Title_createCommandWindow.call(this);
  DataManager._debugStart = false;
  this._commandWindow.setHandler('startBoat', this.debugBoat.bind(this));
  this._commandWindow.setHandler('startShip', this.debugShip.bind(this));
  this._commandWindow.setHandler('startAirship', this.debugAirship.bind(this));
};

Scene_Title.prototype.debugBoat = function() {
    DataManager.debugStart($dataSystem.boat);
    SceneManager.goto(Scene_Map);
};

Scene_Title.prototype.debugShip = function() {
    DataManager.debugStart($dataSystem.ship);
    SceneManager.goto(Scene_Map);
};

Scene_Title.prototype.debugAirship = function() {
    DataManager.debugStart($dataSystem.airship);
    SceneManager.goto(Scene_Map);
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.Debug.Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
    Yanfly.Debug.Scene_Map_processMapTouch.call(this);
    if (TouchInput.isTriggered() && Input.isPressed('control')) {
      $gamePlayer.locate($gameTemp.destinationX(), $gameTemp.destinationY());
    }
};

//=============================================================================
// Scene_Menu
//=============================================================================

if (!Imported.YEP_MainMenuManager) {
  Yanfly.Debug.Scene_Menu_createCommandWindow =
      Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    Yanfly.Debug.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('debug', this.commandDebug.bind(this));
  };
};

Scene_Menu.prototype.commandDebug = function() {
    SceneManager.push(Scene_Debug);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Debug.Scene_Battle_createPartyCommandWindow =
    Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  Yanfly.Debug.Scene_Battle_createPartyCommandWindow.call(this);
  this._partyCommandWindow.setHandler('debug', this.debugMenu.bind(this));
  this._partyCommandWindow.setHandler('debugWin', this.debugWin.bind(this));
  this._partyCommandWindow.setHandler('debugLose', this.debugLose.bind(this));
};

Scene_Battle.prototype.debugMenu = function() {
    SceneManager.push(Scene_Debug);
};

Scene_Battle.prototype.debugWin = function() {
    $gameTroop.members().forEach(function(enemy) {
      enemy.setHp(0);
      enemy.performCollapse();
    });
    BattleManager.startTurn();
};

Scene_Battle.prototype.debugLose = function() {
    $gameParty.battleMembers().forEach(function(actor) {
      actor.setHp(0);
      actor.performCollapse();
      actor.requestMotion('dead');
    });
    BattleManager.startTurn();
};

//=============================================================================
// Scene_Debug
//=============================================================================

Scene_Debug.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCommandWindow();
    this.createDummyWindow();
};

Scene_Debug.prototype.selectCmdWindow = function() {
    this.hideWindows();
    this._dummyWindow.show();
    this._commandWindow.activate();
};

Scene_Debug.prototype.hideWindows = function() {
    if (this._dummyWindow) this._dummyWindow.hide();
    if (this._quickWindow) this._quickWindow.hide();
};

Scene_Debug.prototype.createCommandWindow = function() {
		this._commandWindow = new Window_DebugCommand();
		this._commandWindow.x = 0;
		this._commandWindow.y = this._helpWindow.height;
    this._commandWindow.height = Graphics.boxHeight - this._commandWindow.y;
    this._commandWindow.refresh();
		this.setCommandWindowHandlers();
		this.addWindow(this._commandWindow);
};

Scene_Debug.prototype.setCommandWindowHandlers = function() {
		this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandWindow.setHandler('quick', this.cmdQuick.bind(this));
};

Scene_Debug.prototype.createDummyWindow = function() {
    var wx = this._commandWindow.width;
    var wy = this._commandWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = Graphics.boxHeight - wy;
    this._dummyWindow = new Window_Base(wx, wy, ww, wh);
    this.addWindow(this._dummyWindow);
};

Scene_Debug.prototype.cmdQuick = function() {
    this.hideWindows();
    this.createQuickWindow();
    this._quickWindow.show();
    this._quickWindow.activate();
};

Scene_Debug.prototype.createQuickWindow = function() {
    if (this._quickWindow) return;
    this._quickWindow = new Window_DebugQuick(this._dummyWindow);
    this.addWindow(this._quickWindow);
    this._quickWindow.setHandler('cancel', this.selectCmdWindow.bind(this));
    this._quickWindow.setHandler('item1', this.gainItems1.bind(this));
    this._quickWindow.setHandler('item10', this.gainItems10.bind(this));
    this._quickWindow.setHandler('itemMax', this.gainItemsMax.bind(this));
    this._quickWindow.setHandler('wep1', this.gainWep1.bind(this));
    this._quickWindow.setHandler('wep10', this.gainWep10.bind(this));
    this._quickWindow.setHandler('wepMax', this.gainWepMax.bind(this));
    this._quickWindow.setHandler('arm1', this.gainArm1.bind(this));
    this._quickWindow.setHandler('arm10', this.gainArm10.bind(this));
    this._quickWindow.setHandler('armMax', this.gainArmMax.bind(this));
};

Scene_Debug.prototype.isItemValid = function(item) {
    if (!item) return false;
    if (item.name.length <= 0) return false;
    return true;
};

Scene_Debug.prototype.gainItems1 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataItems.length; ++i) {
      var item = $dataItems[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 1);
    }
};

Scene_Debug.prototype.gainItems10 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataItems.length; ++i) {
      var item = $dataItems[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 10);
    }
};

Scene_Debug.prototype.gainItemsMax = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataItems.length; ++i) {
      var item = $dataItems[i];
      if (this.isItemValid(item)) {
        $gameParty.gainItem(item, $gameParty.maxItems(item));
      }
    }
};

Scene_Debug.prototype.gainWep1 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataWeapons.length; ++i) {
      var item = $dataWeapons[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 1);
    }
};

Scene_Debug.prototype.gainWep10 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataWeapons.length; ++i) {
      var item = $dataWeapons[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 10);
    }
};

Scene_Debug.prototype.gainWepMax = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataWeapons.length; ++i) {
      var item = $dataWeapons[i];
      if (this.isItemValid(item)) {
        $gameParty.gainItem(item, $gameParty.maxItems(item));
      }
    }
};

Scene_Debug.prototype.gainArm1 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataArmors.length; ++i) {
      var item = $dataArmors[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 1);
    }
};

Scene_Debug.prototype.gainArm10 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataArmors.length; ++i) {
      var item = $dataArmors[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 10);
    }
};

Scene_Debug.prototype.gainArmMax = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataArmors.length; ++i) {
      var item = $dataArmors[i];
      if (this.isItemValid(item)) {
        $gameParty.gainItem(item, $gameParty.maxItems(item));
      }
    }
};

//=============================================================================
// End of File
//=============================================================================
};
