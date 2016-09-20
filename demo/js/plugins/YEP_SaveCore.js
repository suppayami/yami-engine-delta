//=============================================================================
// Yanfly Engine Plugins - Save Core
// YEP_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SaveCore = true;

var Yanfly = Yanfly || {};
Yanfly.Save = Yanfly.Save || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 Alter the save menu for a more aesthetic layout
 * and take control over the file system's rules.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Max Files
 * @desc The maximum number of files for your game.
 * Default: 20
 * @default 24
 *
 * @param Saved Icon
 * @desc Icon ID used for a file slot with a save.
 * @default 231
 *
 * @param Empty Icon
 * @desc Icon ID used for an empty file slot.
 * @default 230
 *
 * @param Return After Saving
 * @desc Return to the previous scene after saving?
 * NO - false     YES - true     Default: true
 * @default false
 * 
 * @param Auto New Index
 * @desc For new games, automatically decide the save slot?
 * NO - false     YES - true     Default: true
 * @default true
 *
 * @param ---Action Window---
 * @default
 *
 * @param Load Command
 * @desc Text for the load command in the action window.
 * @default Load
 *
 * @param Save Command
 * @desc Text for the save command in the action window.
 * @default Save
 *
 * @param Delete Command
 * @desc Text for the delete command in the action window.
 * @default Delete
 *
 * @param ---Help Window---
 * @default
 *
 * @param Select Help
 * @desc Help text displayed when selecting a slot.
 * @default Please select a file slot.
 *
 * @param Load Help
 * @desc Help text displayed when selecting load option.
 * @default Loads the data from the saved game.
 *
 * @param Save Help
 * @desc Help text displayed when selecting save option.
 * @default Saves the current progress in your game.
 *
 * @param Delete Help
 * @desc Help text displayed when selecting delete option.
 * @default Deletes all data from this save file.
 *
 * @param ---Delete---
 * @default
 *
 * @param Delete Filename
 * @desc Used for the delete sound from the /audio/se/ folder.
 * Do NOT include the file extension.
 * @default Damage2
 *
 * @param Delete Volume
 * @desc Volume used for the delete sound.
 * @default 100
 *
 * @param Delete Pitch
 * @desc Pitch used for the delete sound.
 * @default 150
 *
 * @param Delete Pan
 * @desc Pan used for the delete sound.
 * @default 0
 *
 * @param ---Info Window---
 * @default
 *
 * @param Show Game Title
 * @desc Display the game title in the save file?
 * NO - false     YES - true
 * @default true
 *
 * @param Invalid Game Text
 * @desc Text used when the save is for a different game.
 * @default This save is for a different game.
 *
 * @param Empty Game Text
 * @desc Text used when the save is empty.
 * @default Empty
 *
 * @param Party Display
 * @desc The display type used for the party.
 * 0 - None; 1 - Characters; 2 - Faces; 3 - SV Actors
 * @default 2
 *
 * @param Party Y Position
 * @desc This is the base Y position for the party display.
 * Formulas can be used.
 * @default this.lineHeight() + Window_Base._faceHeight
 *
 * @param Show Actor Names
 * @desc Display the names of the actors?
 * NO - false     YES - true
 * @default true
 *
 * @param Name Font Size
 * @desc Font size used for names if names are displayed.
 * Default: 28
 * @default 20
 *
 * @param Show Actor Level
 * @desc Display the levels of the actors?
 * NO - false     YES - true
 * @default true
 *
 * @param Level Font Size
 * @desc Font size used for levels if levels are displayed.
 * Default: 28
 * @default 20
 *
 * @param Level Format
 * @desc The text format used to display levels.
 * %1 - Lv (Abbr)   %2 - Lv (Full)     %3 - Value
 * @default \c[16]%1 \c[0]%3
 *
 * @param Data Font Size
 * @desc Font size used for displaying data.
 * Default: 28
 * @default 20
 *
 * @param Data Column 1
 * @desc The data to be displayed in data column 1. Refer to help
 * file for data entries. Separate each entry with commas.
 * @default empty, playtime, save count, gold count
 *
 * @param Data Column 2
 * @desc The data to be displayed in data column 2. Refer to help
 * file for data entries. Separate each entry with commas.
 * @default location, variable 1, variable 2, variable 3
 *
 * @param Data Column 3
 * @desc The data to be displayed in data column 2. Refer to help
 * file for data entries. Separate each entry with commas.
 * @default empty, variable 4, variable 5, variable 6
 *
 * @param Data Column 4
 * @desc The data to be displayed in data column 2. Refer to help
 * file for data entries. Separate each entry with commas.
 * @default
 *
 * @param ---Vocabulary---
 * @default
 *
 * @param Map Location
 * @desc Text used to categorize 'Map Location'.
 * Leave empty to not use this category and center the data.
 * @default
 *
 * @param Playtime
 * @desc Text used to categorize 'Playtime'.
 * Leave empty to not use this category and center the data.
 * @default Playtime:
 *
 * @param Save Count
 * @desc Text used to categorize 'Save Count'.
 * Leave empty to not use this category and center the data.
 * @default Total Saves:
 *
 * @param Gold Count
 * @desc Text used to categorize 'Gold Count'.
 * Leave empty to not use this category and center the data.
 * @default %1:
 *
 * @param ---Technical---
 * @default
 *
 * @param Save Mode
 * @desc How the save system should work for your game:
 * local     web     auto
 * @default auto
 *
 * @param Local Config
 * @desc Filename for config when working with local saves.
 * Default: config.rpgsave
 * @default config.rpgsave
 *
 * @param Local Global
 * @desc Filename for global when working with local saves.
 * Default: global.rpgsave
 * @default global.rpgsave
 *
 * @param Local Save
 * @desc Filename for game saves when working with local saves.
 * %1 - File Slot. Default: config.rpgsave
 * @default file%1.rpgsave
 *
 * @param Web Config
 * @desc Filename for config when working with web saves.
 * %1 - Game Name. Default: RPG Config
 * @default RPG %1 Config
 *
 * @param Web Global
 * @desc Filename for global when working with web saves.
 * %1 - Game Name. Default: RPG Global
 * @default RPG %1 Global
 *
 * @param Web Save
 * @desc Filename for game saves when working with web saves.
 * %1 - Game Name. %2 - File Slot. Default: RPG File%1
 * @default RPG %1 File%2
 *
 * @param ---Confirmation---
 * @default
 *
 * @param Load Confirmation
 * @desc Show the load confirmation window when loading a
 * save file? NO - false     YES - true
 * @default true
 *
 * @param Load Text
 * @desc Text displayed when loading a save file.
 * @default Do you wish to load this save file?
 *
 * @param Save Confirmation
 * @desc Show the save confirmation window when overwriting a
 * save file? NO - false     YES - true
 * @default true
 *
 * @param Save Text
 * @desc Text displayed when overwriting a save file.
 * @default Do you wish to overwrite this save file?
 *
 * @param Delete Confirmation
 * @desc Show the save confirmation window when deleting a
 * save file? NO - false     YES - true
 * @default true
 *
 * @param Delete Text
 * @desc Text displayed when deleting a save file.
 * @default Do you wish to delete this save file?
 *
 * @param Confirm Yes
 * @desc Text used for the 'Yes' confirm command
 * @default Yes
 *
 * @param Confirm No
 * @desc Text used for the 'No' confirm command
 * @default No
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin provides a new save interface for the player. Along with a new
 * interface, the player can also load and delete saves straight from the menu
 * itself. This will in turn make the save command from the Main Menu always
 * available, but the save option within the new save menu will be enabled
 * depending on whether or not it is allowed or disallowed. From the interface,
 * the player is given more information regarding the save file including the
 * the location the player saved at, the amount of gold available, and any
 * variables that you want to show the player as well.
 *
 * ============================================================================
 * Instructions - Data Columns
 * ============================================================================
 *
 * For those who wish to show additional data in the save menu for each save
 * file, you can add various data categories within the 'Data Columns' inside
 * the plugin parameters. Separate each category with a comma (,). You can use
 * the following entries for data categories:
 *
 * Data Column Categories:
 *
 *   Empty
 *   - Leaves an empty box in the category location. This won't even show the
 *   dark rectangle in the category slot.
 *
 *   Null
 *   - Won't draw any text, but it will draw the dark rectangle in the
 *   category slot.
 *
 *   Location
 *   - Draws the current map location of the save file.
 *
 *   Playtime
 *   - Draws the playtime spent for the save file.
 *
 *   Save Count
 *   - Draws the number of times saved in that playthrough.
 *
 *   Gold Count
 *   - Draws the current gold count of the safe file.
 *
 *   Variable x
 *   - Draws the name of the variable and value of the variable. You can use
 *   text codes in the variable name. Any text between << and >> will be not
 *   be shown when drawn. If the variable name is empty, the value will be
 *   centered.
 *
 *   text: stuff
 *   left text: stuff
 *   center text: stuff
 *   right text: stuff
 *   - This will draw 'stuff' (Replace it with your own text) as text by itself
 *   with no data attached. Use 'left', 'center', or 'right' to decide the text
 *   alignment. If no alignment is used, it will default to 'left' alignment.
 *   You can use text codes within the drawn text.
 *
 * ============================================================================
 * Technical - Save Modes
 * ============================================================================
 *
 * For developers who are planning to publish their RPG Maker MV games on the
 * web, you may want to look into the 'Technical' parameters. Here, you can
 * force the game into thinking the game is running on 'local' or 'web' mode.
 * By default, you'll want it on 'auto' but the forced modes are for testing
 * purposes. Despite being for testing purposes, if you wish for your game to
 * adjust saves as per 'web' mode, you can keep it that way even if your game
 * is to be local-only. Games on the web, however, cannot use 'local' mode and
 * will automatically default to 'web' mode.
 *
 * ============================================================================
 * Technical - Save Files
 * ============================================================================
 *
 * The 'Local Config', 'Local Global', and 'Local Save' can have their filename
 * format changed to your liking. Personally, I don't recommend messing with
 * this unless you know what you're doing.
 *
 * ---
 *
 * However, if you are making a web-based (mobile included), I strongly suggest
 * you look into the 'Web Config', 'Web Global', and 'Web Save' parameters. By
 * default, RPG Maker MV defaults all of the saves to RPG FileX. All web-based
 * RPG Maker MV games would then use the same configuration, same global save
 * file, and all RPG Maker MV games played by an individual would share the
 * same save slots. This can be very problematic.
 *
 * This plugin's default settings will solve this sharing issue by making the
 * web save named accordingly to your game's name provided that you keep the
 * current plugin settings as is or adjust it accordingly. Now, your game will
 * have its own individual identity, use its own configuration, global, and
 * save files without clashing with any other RPG Maker MV games players may
 * have played.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Fixed a bug that caused the actor's default name to appear in the save
 * screen instead of the actor's current name (if it was changed.)
 *
 * Version 1.01:
 * - Added a wait time update for save info data to load when moving across the
 * various save files.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (!Utils.RPGMAKER_VERSION) {
  var errortext = '\nYou do not have RPG Maker MV version 1.1.0\n';
     errortext += 'or higher applied to your project. The update\n';
     errortext += 'is absolutely needed for YEP_SaveCore\n';
     errortext += 'to run. Your game will not start until you\n';
     errortext += 'have updated your project\'s files to at\n';
     errortext += 'least version 1.1.0 or higher or if you choose\n';
     errortext += 'to not use the YEP_SaveCore plugin.'
     errortext += '\n\n'
     errortext += 'Find the latest version at http://forums.rpgmakerweb.com/';
     errortext += '\n\n'
     errortext += 'If you do have MV version 1.1.0 or higher\n';
     errortext += 'and you are still getting this message, it is\n';
     errortext += 'because this project\'s rpg_core.js, rpg_managers.js,\n';
     errortext += 'rpg_objects.js, rpg_scenes.js, rpg_sprites.js, and\n';
     errortext += 'rpg_windows.js aren\'t updated. Create a new project\n';
     errortext += 'or go to the NewData folder in your RPG Maker MV root\n';
     errortext += 'folder. Copy the new js files (except plugins.js so it\n';
     errortext += 'won\'t overwrite your Plugin Manager Parameters) to\n';
     errortext += 'your current project!';
  SceneManager.run = function(sceneClass) {
    require('nw.gui').Window.get().showDevTools();
    throw new Error(errortext);
  };
};

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SaveCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SaveMaxFiles = Number(Yanfly.Parameters['Max Files']);
Yanfly.Param.SaveIconSaved = Number(Yanfly.Parameters['Saved Icon']);
Yanfly.Param.SaveIconEmpty = Number(Yanfly.Parameters['Empty Icon']);
Yanfly.Param.SavePop = eval(String(Yanfly.Parameters['Return After Saving']));
Yanfly.Param.SaveAutoIndex = eval(String(Yanfly.Parameters['Auto New Index']));

Yanfly.Param.SaveCmdLoad = String(Yanfly.Parameters['Load Command']);
Yanfly.Param.SaveCmdSave = String(Yanfly.Parameters['Save Command']);
Yanfly.Param.SaveCmdDelete = String(Yanfly.Parameters['Delete Command']);

Yanfly.Param.SaveHelpSelect = String(Yanfly.Parameters['Select Help']);
Yanfly.Param.SaveLoadSelect = String(Yanfly.Parameters['Load Help']);
Yanfly.Param.SaveSaveSelect = String(Yanfly.Parameters['Save Help']);
Yanfly.Param.SaveDeleteSelect = String(Yanfly.Parameters['Delete Help']);

Yanfly.Param.SaveDeleteSound = {
  name:   String(Yanfly.Parameters['Delete Filename']),
  volume: Number(Yanfly.Parameters['Delete Volume']),
  pitch:  Number(Yanfly.Parameters['Delete Pitch']),
  pan:    Number(Yanfly.Parameters['Delete Pan'])
};

Yanfly.Param.SaveInfoTitle = String(Yanfly.Parameters['Show Game Title']);
Yanfly.Param.SaveInfoTitle = eval(Yanfly.Param.SaveInfoTitle);
Yanfly.Param.SaveInfoInvalid = String(Yanfly.Parameters['Invalid Game Text']);
Yanfly.Param.SaveInfoEmpty = String(Yanfly.Parameters['Empty Game Text']);
Yanfly.Param.SaveInfoPartyType = Number(Yanfly.Parameters['Party Display']);
Yanfly.Param.SaveInfoPartyType = Yanfly.Param.SaveInfoPartyType.clamp(0, 3);
Yanfly.Param.SaveInfoPartyY = String(Yanfly.Parameters['Party Y Position']);
Yanfly.Param.SaveInfoActorName = String(Yanfly.Parameters['Show Actor Names']);
Yanfly.Param.SaveInfoActorName = eval(Yanfly.Param.SaveInfoActorName);
Yanfly.Param.SaveInfoActorNameSz = Number(Yanfly.Parameters['Name Font Size']);
Yanfly.Param.SaveInfoActorLv = String(Yanfly.Parameters['Show Actor Level']);
Yanfly.Param.SaveInfoActorLv = eval(Yanfly.Param.SaveInfoActorLv);
Yanfly.Param.SaveInfoActorLvSz = Number(Yanfly.Parameters['Level Font Size']);
Yanfly.Param.SaveInfoActorLvFmt = String(Yanfly.Parameters['Level Format']);
Yanfly.Param.SaveInfoDataSz = Number(Yanfly.Parameters['Data Font Size']);
Yanfly.Param.SaveInfoDataCol1 = String(Yanfly.Parameters['Data Column 1']);
Yanfly.Param.SaveInfoDataCol1 = Yanfly.Param.SaveInfoDataCol1.split(',');
Yanfly.Param.SaveInfoDataCol2 = String(Yanfly.Parameters['Data Column 2']);
Yanfly.Param.SaveInfoDataCol2 = Yanfly.Param.SaveInfoDataCol2.split(',');
Yanfly.Param.SaveInfoDataCol3 = String(Yanfly.Parameters['Data Column 3']);
Yanfly.Param.SaveInfoDataCol3 = Yanfly.Param.SaveInfoDataCol3.split(',');
Yanfly.Param.SaveInfoDataCol4 = String(Yanfly.Parameters['Data Column 4']);
Yanfly.Param.SaveInfoDataCol4 = Yanfly.Param.SaveInfoDataCol4.split(',');

Yanfly.trimSaveDataColumns = function(array) {
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    array[i] = array[i].trim();
  }
  if (length === 1 && array[0] === '') array.splice(0);
};

Yanfly.trimSaveDataColumns(Yanfly.Param.SaveInfoDataCol1);
Yanfly.trimSaveDataColumns(Yanfly.Param.SaveInfoDataCol2);
Yanfly.trimSaveDataColumns(Yanfly.Param.SaveInfoDataCol3);
Yanfly.trimSaveDataColumns(Yanfly.Param.SaveInfoDataCol4);

Yanfly.Param.SaveVocabLocation = String(Yanfly.Parameters['Map Location']);
Yanfly.Param.SaveVocabPlaytime = String(Yanfly.Parameters['Playtime']);
Yanfly.Param.SaveVocabSaveCount = String(Yanfly.Parameters['Save Count']);
Yanfly.Param.SaveVocabGoldCount = String(Yanfly.Parameters['Gold Count']);

Yanfly.Param.SaveTechSaveMode = String(Yanfly.Parameters['Save Mode']).trim();
Yanfly.Param.SaveTechSaveMode = Yanfly.Param.SaveTechSaveMode.toLowerCase();
Yanfly.Param.SaveTechLocalConfig = String(Yanfly.Parameters['Local Config']);
Yanfly.Param.SaveTechLocalGlobal = String(Yanfly.Parameters['Local Global']);
Yanfly.Param.SaveTechLocalSave = String(Yanfly.Parameters['Local Save']);
Yanfly.Param.SaveTechWebConfig = String(Yanfly.Parameters['Web Config']);
Yanfly.Param.SaveTechWebGlobal = String(Yanfly.Parameters['Web Global']);
Yanfly.Param.SaveTechWebSave = String(Yanfly.Parameters['Web Config']);

Yanfly.Param.SaveConfirmLoad = String(Yanfly.Parameters['Load Confirmation']);
Yanfly.Param.SaveConfirmLoad = eval(Yanfly.Param.SaveConfirmLoad);
Yanfly.Param.SaveConfirmLoadTx = String(Yanfly.Parameters['Load Text']);
Yanfly.Param.SaveConfirmSave = String(Yanfly.Parameters['Save Confirmation']);
Yanfly.Param.SaveConfirmSave = eval(Yanfly.Param.SaveConfirmSave);
Yanfly.Param.SaveConfirmSaveTx = String(Yanfly.Parameters['Save Text']);
Yanfly.Param.SaveConfirmDel = String(Yanfly.Parameters['Delete Confirmation']);
Yanfly.Param.SaveConfirmDel = eval(Yanfly.Param.SaveConfirmDel);
Yanfly.Param.SaveConfirmDelTx = String(Yanfly.Parameters['Delete Text']);
Yanfly.Param.SaveConfirmYes = String(Yanfly.Parameters['Confirm Yes']);
Yanfly.Param.SaveConfirmNo = String(Yanfly.Parameters['Confirm No']);

//=============================================================================
// DataManager
//=============================================================================

DataManager.maxSavefiles = function() {
    return Yanfly.Param.SaveMaxFiles;
};

Yanfly.Save.DataManager_selectSavefileForNewGame =
    DataManager.selectSavefileForNewGame;
DataManager.selectSavefileForNewGame = function() {
    Yanfly.Save.DataManager_selectSavefileForNewGame.call(this);
    if (Yanfly.Param.SaveAutoIndex) return;
    this._lastAccessedId = 1;
};

//=============================================================================
// StorageManager
//=============================================================================

Yanfly.Save.StorageManager_isLocalMode = StorageManager.isLocalMode;
StorageManager.isLocalMode = function() {
  if (Yanfly.Param.SaveTechSaveMode === 'local') {
    if (!Utils.isNwjs()) return false;
    return true;
  } else if (Yanfly.Param.SaveTechSaveMode === 'web') {
    return false;
  } else {
    return Yanfly.Save.StorageManager_isLocalMode.call(this);
  }
};

StorageManager.localFilePath = function(savefileId) {
  var name;
  if (savefileId < 0) {
    name = Yanfly.Param.SaveTechLocalConfig;
  } else if (savefileId === 0) {
    name = Yanfly.Param.SaveTechLocalGlobal;
  } else {
    name = Yanfly.Param.SaveTechLocalSave.format(savefileId);
  }
  return this.localFileDirectoryPath() + name;
};

Yanfly.Save.StorageManager_webStorageKey = StorageManager.webStorageKey;
StorageManager.webStorageKey = function(savefileId) {
  if (!$dataSystem) return Yanfly.Save.StorageManager_webStorageKey.call(this);
  var title = $dataSystem.gameTitle;
  this.loadConfig();
  if (savefileId < 0) {
    return Yanfly.Param.SaveTechWebConfig.format(title);
  } else if (savefileId === 0) {
    return Yanfly.Param.SaveTechWebGlobal.format(title);
  } else {
    return Yanfly.Param.SaveTechWebSave.format(savefileId);
  }
};

StorageManager.loadConfig = function() {
  if (this._configLoaded) return;
  this._configLoaded = true;
  ConfigManager.load();
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Save.BattleManager_setBattleTest = BattleManager.setBattleTest;
BattleManager.setBattleTest = function(battleTest) {
    Yanfly.Save.BattleManager_setBattleTest.call(this, battleTest);
    if (battleTest) StorageManager.loadConfig();
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawSvActor = function(actor, x, y) {
    var filename = actor.battlerName();
    var bitmap = ImageManager.loadSvActor(filename);
    var pw = bitmap.width / 9;
    var ph = bitmap.height / 6;
    var sx = 0;
    var sy = 0;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Window_MenuCommand.prototype.isSaveEnabled = function() {
    if (DataManager.isEventTest()) return false;
    return true;
};

//=============================================================================
// Window_SavefileList
//=============================================================================

Window_SavefileList.prototype.itemHeight = function() {
    return this.lineHeight();
};

Window_SavefileList.prototype.drawItem = function(index) {
    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
    var rect = this.itemRect(index);
    this.resetTextColor();
    //if (this._mode === 'load') this.changePaintOpacity(valid);
    this.changePaintOpacity(valid);
    var icon = valid ? Yanfly.Param.SaveIconSaved : Yanfly.Param.SaveIconEmpty;
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    this.drawFileId(id, rect.x + Window_Base._iconWidth + 4, rect.y);
};

Window_SavefileList.prototype.playOkSound = function() {
    Window_Selectable.prototype.playOkSound.call(this);
};

//=============================================================================
// Window_SaveAction
//=============================================================================

function Window_SaveAction() {
    this.initialize.apply(this, arguments);
}

Window_SaveAction.prototype = Object.create(Window_HorzCommand.prototype);
Window_SaveAction.prototype.constructor = Window_SaveAction;

Window_SaveAction.prototype.initialize = function(x, y, mode) {
    this._width = Graphics.boxWidth - x;
    this._currentFile = 0;
    this._mode = mode;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this.deactivate();
    this.deselect();
};

Window_SaveAction.prototype.windowWidth = function() {
    return this._width;
};

Window_SaveAction.prototype.maxCols = function() {
    return 3;
};

Window_SaveAction.prototype.savefileId = function() {
    return SceneManager._scene._listWindow.index() + 1;
};

Window_SaveAction.prototype.makeCommandList = function() {
    var id = this.savefileId();
    var enabled = DataManager.isThisGameFile(id);
    var valid = DataManager.loadSavefileInfo(id);
    this.addCommand(this.getCommandName('load'), 'load', valid);
    this.addCommand(this.getCommandName('save'), 'save', this.isSaveEnabled());
    this.addCommand(this.getCommandName('delete'), 'delete', enabled);
};

Window_SaveAction.prototype.getCommandName = function(type) {
    if (type === 'load') {
      return Yanfly.Param.SaveCmdLoad;
    } else if (type === 'save') {
      return Yanfly.Param.SaveCmdSave;
    } else {
      return Yanfly.Param.SaveCmdDelete;
    }
};

Window_SaveAction.prototype.isSaveEnabled = function() {
    if (this._mode !== 'save') return false;
    return $gameSystem.isSaveEnabled();
};

Window_SaveAction.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this.savefileId() !== this._currentFile) this.updateIndex();
};

Window_SaveAction.prototype.updateIndex = function() {
    this._currentFile = this.savefileId();
    this.refresh();
};

Window_SaveAction.prototype.playOkSound = function() {
};

Window_SaveAction.prototype.updateHelp = function() {
    var text = '';
    if (this.currentSymbol() === 'load') {
      text = Yanfly.Param.SaveLoadSelect;
    } else if (this.currentSymbol() === 'save') {
      text = Yanfly.Param.SaveSaveSelect;
    } else if (this.currentSymbol() === 'delete') {
      text = Yanfly.Param.SaveDeleteSelect;
    }
    this._helpWindow.setText(text);
};

//=============================================================================
// Window_SaveInfo
//=============================================================================

function Window_SaveInfo() {
    this.initialize.apply(this, arguments);
}

Window_SaveInfo.prototype = Object.create(Window_Base.prototype);
Window_SaveInfo.prototype.constructor = Window_SaveInfo;

Window_SaveInfo.prototype.initialize = function(x, y, width, height, mode) {
  this._currentFile = 0;
  this._waitTime = 0;
  this._mode = mode;
  Window_Base.prototype.initialize.call(this, x, y, width, height);
};

Window_SaveInfo.prototype.resetFontSettings = function() {
  Window_Base.prototype.resetFontSettings.call(this);
  if (this._drawLevel) this.contents.fontSize = Yanfly.Param.SaveInfoActorLvSz;
  if (this._drawData) this.contents.fontSize = Yanfly.Param.SaveInfoDataSz;
};

Window_SaveInfo.prototype.savefileId = function() {
  return SceneManager._scene._listWindow.index() + 1;
};

Window_SaveInfo.prototype.drawDarkRect = function(dx, dy, dw, dh) {
  var color = this.gaugeBackColor();
  this.changePaintOpacity(false);
  this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
  this.changePaintOpacity(true);
};

Window_SaveInfo.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  if (this.savefileId() !== this._currentFile) this.updateIndex();
  if (this._waitTime > 0) this.updateTimer();
};

Window_SaveInfo.prototype.systemColorEx = function() {
    if (Imported.YEP_CoreEngine) {
      return '\\c[' + Yanfly.Param.ColorSystem + ']';
    } else {
      return '\\c[16]';
    }
};

Window_SaveInfo.prototype.updateIndex = function() {
  var id = this.savefileId();
  this._currentFile = id;
  this._waitTime = 30;
  this.contents.clear();
};

Window_SaveInfo.prototype.updateTimer = function() {
  this._waitTime -= 1;
  if (this._waitTime > 0) return;
  var id = this.savefileId();
  this._valid = DataManager.isThisGameFile(id);
  this._info = DataManager.loadSavefileInfo(id);
  this.refresh();
};

Window_SaveInfo.prototype.refresh = function() {
  this.contents.clear();
  this.resetFontSettings();
  var dy = 0;
  dy = this.drawGameTitle(dy);
  if (!this._valid) return this.drawInvalidText(dy);
  this._saveContents = StorageManager.load(this.savefileId());
  this.drawContents(dy);
};

Window_SaveInfo.prototype.drawGameTitle = function(dy) {
  if (!Yanfly.Param.SaveInfoTitle) return dy;
  if (!this._info) return dy;
  if (!this._info.title) return dy;
  this.resetFontSettings();
  var text = this._info.title;
  this.drawText(text, 0, dy, this.contents.width, 'center');
  return dy + this.lineHeight();
};

Window_SaveInfo.prototype.drawInvalidText = function(dy) {
  this.drawDarkRect(0, dy, this.contents.width, this.contents.height - dy);
  dy = (this.contents.height - dy - this.lineHeight()) / 2;
  if (this._info) {
    var text = Yanfly.Param.SaveInfoInvalid;
  } else {
    var text = Yanfly.Param.SaveInfoEmpty;
  }
  this.changeTextColor(this.systemColor());
  this.drawText(text, 0, dy, this.contents.width, 'center');
};

Window_SaveInfo.prototype.drawContents = function(dy) {
  if (!this._saveContents) {
    return setTimeout(this.drawContents.bind(this, dy), 50);
  }
  this._saveContents = JsonEx.parse(this._saveContents);
  dy = this.drawPartyGraphics(dy);
  dy = this.drawPartyNames(dy);
  dy = this.drawPartyLevels(dy);
  this.drawColumnData(dy);
};

Window_SaveInfo.prototype.drawPartyGraphics = function(dy) {
  if (Yanfly.Param.SaveInfoPartyType === 0) return dy;
  dy = eval(Yanfly.Param.SaveInfoPartyY);
  var length = this._saveContents.party.maxBattleMembers();
  var dw = this.contents.width / length;;
  dw = Math.floor(dw);
  var dx = Math.floor(dw / 2);
  for (var i = 0; i < length; ++i) {
    var actorId = this._saveContents.party._actors[i];
    var member = this._saveContents.actors._data[actorId];
    if (member) {
      if (Yanfly.Param.SaveInfoPartyType === 1) {
        var name = member.characterName();
        var index = member.characterIndex();
        this.drawCharacter(name, index, dx, dy);
      } else if (Yanfly.Param.SaveInfoPartyType === 2) {
        var fh = Window_Base._faceHeight;
        var fw = Window_Base._faceWidth;
        var fx = dx - Math.floor(Math.min(fh, dw) / 2);
        var dif = Math.floor(Math.max(0, dw - fw) / 2);
        var name = member.faceName();
        var index = member.faceIndex();
        this.drawFace(name, index, fx - dif, dy - fh, dw, fh);
      } else if (Yanfly.Param.SaveInfoPartyType === 3) {
        this.drawSvActor(member, dx, dy);
      }
    }
    dx += dw;
  }
  return dy;
};

Window_SaveInfo.prototype.drawCharacter = function(name, index, x, y) {
    var bitmap = ImageManager.loadCharacter(name);
    if (bitmap.width <= 0) {
      return setTimeout(this.drawCharacter.bind(this, name, index, x, y), 50);
    }
    Window_Base.prototype.drawCharacter.call(this, name, index, x, y);
};

Window_SaveInfo.prototype.drawFace = function(name, index, x, y, w, h) {
    var bitmap = ImageManager.loadFace(name);
    if (bitmap.width <= 0) {
      return setTimeout(this.drawFace.bind(this, name, index, x, y, w, h), 50);
    }
    Window_Base.prototype.drawFace.call(this, name, index, x, y, w, h);
};

Window_SaveInfo.prototype.drawSvActor = function(actor, x, y) {
    var filename = actor.battlerName();
    var bitmap = ImageManager.loadSvActor(filename);
    if (bitmap.width <= 0) {
      return setTimeout(this.drawSvActor.bind(this, actor, x, y), 50);
    }
    Window_Base.prototype.drawSvActor.call(this, actor, x, y);
};

Window_SaveInfo.prototype.drawPartyNames = function(dy) {
  if (!Yanfly.Param.SaveInfoActorName) return dy;
  this.resetFontSettings();
  this.contents.fontSize = Yanfly.Param.SaveInfoActorNameSz;
  var length = this._saveContents.party.maxBattleMembers();
  var dw = this.contents.width / length;;
  dw = Math.floor(dw);
  var dx = 0;
  for (var i = 0; i < length; ++i) {
    var actorId = this._saveContents.party._actors[i];
    var member = this._saveContents.actors._data[actorId];
    if (member) {
      var name = member._name;
      this.drawText(name, dx, dy, dw, 'center');
    }
    dx += dw
  }
  return dy += this.lineHeight();
};

Window_SaveInfo.prototype.drawPartyLevels = function(dy) {
  if (!Yanfly.Param.SaveInfoActorLv) return dy;
  this._drawLevel = true;
  var length = this._saveContents.party.maxBattleMembers();
  var dw = this.contents.width / length;;
  dw = Math.floor(dw);
  var dx = 0;
  var fmt = Yanfly.Param.SaveInfoActorLvFmt;
  for (var i = 0; i < length; ++i) {
    var actorId = this._saveContents.party._actors[i];
    var member = this._saveContents.actors._data[actorId];
    if (member) {
      var lv = Yanfly.Util.toGroup(member.level);
      var text = fmt.format(TextManager.levelA, TextManager.level, lv);
      var tw = this.textWidthEx(text);
      var dif = Math.floor(Math.max(0, dw - tw) / 2);
      this.drawTextEx(text, dx + dif, dy);
    }
    dx += dw
  }
  this._drawLevel = false;
  return dy += this.lineHeight();
};

Window_SaveInfo.prototype.drawColumnData = function(dy) {
    var totalColumns = 0;
    var drawnArrays = [];
    if (Yanfly.Param.SaveInfoDataCol1.length > 0) {
      totalColumns += 1;
      drawnArrays.push(Yanfly.Param.SaveInfoDataCol1);
    }
    if (Yanfly.Param.SaveInfoDataCol2.length > 0) {
      totalColumns += 1;
      drawnArrays.push(Yanfly.Param.SaveInfoDataCol2);
    }
    if (Yanfly.Param.SaveInfoDataCol3.length > 0) {
      totalColumns += 1;
      drawnArrays.push(Yanfly.Param.SaveInfoDataCol3);
    }
    if (Yanfly.Param.SaveInfoDataCol4.length > 0) {
      totalColumns += 1;
      drawnArrays.push(Yanfly.Param.SaveInfoDataCol4);
    }
    if (totalColumns <= 0) return;
    var dw = Math.floor(this.contents.width / totalColumns);
    var dif = totalColumns > 1 ? this.textPadding() : 0;
    for (var i = 0; i < totalColumns; ++i) {
      var column = drawnArrays[i];
      var dx = i * dw;
      this.drawColumn(column, dx, dy, dw - dif);
    }
};

Window_SaveInfo.prototype.drawColumn = function(column, dx, dy, dw) {
    var length = column.length;
    var tp = this.textPadding();
    for (var i = 0; i < length; ++i) {
      this.resetFontSettings();
      this.contents.fontSize = Yanfly.Param.SaveInfoDataSz;
      var data = column[i];
      if (data.toUpperCase().trim() !== 'EMPTY') {
        this.drawDarkRect(dx, dy, dw, this.lineHeight());
        this.drawData(data, dx + tp, dy, dw - tp * 2);
      }
      dy += this.lineHeight();
    }
};

Window_SaveInfo.prototype.drawData = function(data, dx, dy, dw) {
  if (data.toUpperCase().trim() === 'NULL') {
    return;
  } else if (data.toUpperCase().trim() === 'LOCATION') {
    this.drawLocation(dx, dy, dw);
  } else if (data.toUpperCase().trim() === 'PLAYTIME') {
    this.drawPlaytime(dx, dy, dw);
  } else if (data.toUpperCase().trim() === 'SAVE COUNT') {
    this.drawSaveCount(dx, dy, dw);
  } else if (data.toUpperCase().trim() === 'GOLD COUNT') {
    this.drawGoldCount(dx, dy, dw);
  } else if (data.match(/VARIABLE[ ](\d+)/i)) {
    this.drawVariable(parseInt(RegExp.$1), dx, dy, dw);
  } else if (data.match(/(.*)[ ]TEXT:(.*)/i)) {
    this.drawDataText(String(RegExp.$1), String(RegExp.$2), dx, dy, dw);
  } else if (data.match(/TEXT:(.*)/i)) {
    this.drawDataText('left', String(RegExp.$1), dx, dy, dw);
  }
};

Window_SaveInfo.prototype.drawLocation = function(dx, dy, dw) {
    var id = this._saveContents.map._mapId;
    var text = $dataMapInfos[id].name;
    if (Yanfly.Param.SaveVocabLocation.length > 0) {
      this.changeTextColor(this.systemColor());
      this.drawText(Yanfly.Param.SaveVocabLocation, dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawPlaytime = function(dx, dy, dw) {
    if (!this._info.playtime) return;
    var text = this._info.playtime;
    if (Yanfly.Param.SaveVocabPlaytime.length > 0) {
      this.changeTextColor(this.systemColor());
      this.drawText(Yanfly.Param.SaveVocabPlaytime, dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawSaveCount = function(dx, dy, dw) {
    var text = Yanfly.Util.toGroup(this._saveContents.system._saveCount);
    if (Yanfly.Param.SaveVocabSaveCount.length > 0) {
      this.changeTextColor(this.systemColor());
      this.drawText(Yanfly.Param.SaveVocabSaveCount, dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawGoldCount = function(dx, dy, dw) {
    var text = Yanfly.Util.toGroup(this._saveContents.party._gold);
    if (Yanfly.Param.SaveVocabGoldCount.length > 0) {
      this.changeTextColor(this.systemColor());
      var fmt = Yanfly.Param.SaveVocabGoldCount;
      this.drawText(fmt.format(TextManager.currencyUnit), dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      var fmt = '\\c[0]%1' + this.systemColorEx() + '%2';
      var ftext = fmt.format(text, TextManager.currencyUnit);
      this._drawData = true;
      var fw = this.textWidthEx(ftext);
      dx += Math.max(0, Math.floor((dw - fw) / 2));
      this.drawTextEx(ftext, dx, dy);
      this._drawData = false;
    }
};

Window_SaveInfo.prototype.drawVariable = function(id, dx, dy, dw) {
    var varName = $dataSystem.variables[id];
    varName = varName.replace(/<<(.*?)>>/i, '');
    var text = Yanfly.Util.toGroup(this._saveContents.variables.value(id));
    var diff = Math.max(0, (this.standardFontSize() - 
      this.contents.fontSize) / 2);
    if (varName.length > 0) {
      this._drawData = true;
      this.changeTextColor(this.systemColor());
      dy += diff;
      this.drawTextEx(this.systemColorEx() + varName, dx, dy, dw, 'left');
      dy -= diff;
      this.changeTextColor(this.normalColor());
      this._drawData = false;
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawDataText = function(align, text, dx, dy, dw) {
    this._drawData = true;
    dy += Math.max(0, (this.standardFontSize() - this.contents.fontSize) / 2);
    var align = align.toLowerCase().trim();
    var text = text.trim();
    if (align === 'left') {
      this.drawTextEx(text, dx, dy);
    } else if (align === 'right') {
      var tw = this.textWidthEx(text);
      this.drawTextEx(text, dx + dw - tw, dy);
    } else {
      var tw = this.textWidthEx(text);
      this.drawTextEx(text, dx + (dw - tw) / 2, dy);
    }
    this._drawData = false;
};

//=============================================================================
// Window_SaveConfirm
//=============================================================================

function Window_SaveConfirm() {
    this.initialize.apply(this, arguments);
}

Window_SaveConfirm.prototype = Object.create(Window_Command.prototype);
Window_SaveConfirm.prototype.constructor = Window_SaveConfirm;

Window_SaveConfirm.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
};

Window_SaveConfirm.prototype.makeCommandList = function() {
    this.addCommand(Yanfly.Param.SaveConfirmYes, 'confirm');
    this.addCommand(Yanfly.Param.SaveConfirmNo, 'cancel');
};

Window_SaveConfirm.prototype.setData = function(text) {
    this._text = text;
    var ww = this.textWidthEx(this._text) + this.standardPadding() * 2;
    ww += this.textPadding() * 2;
    this.width = ww;
    this.refresh();
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
    this.drawTextEx(this._text, this.textPadding(), 0);
};

Window_SaveConfirm.prototype.itemTextAlign = function() {
    return 'center';
};

Window_SaveConfirm.prototype.windowHeight = function() {
    return this.fittingHeight(3);
};

Window_SaveConfirm.prototype.itemRect = function(index) {
    var rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.y += this.lineHeight();
    return rect;
};

//=============================================================================
// Scene_File
//=============================================================================

Scene_File.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    if (this._loadSuccess) $gameSystem.onAfterLoad();
};

Scene_Load.prototype.terminate = function() {
    Scene_File.prototype.terminate.call(this);
};

Scene_File.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    DataManager.loadAllSavefileImages();
    this.createHelpWindow();
    this.createListWindow();
    this.createActionWindow();
    this.createInfoWindow();
    this.createConfirmWindow();
};

Scene_File.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(2);
    this._helpWindow.setText(Yanfly.Param.SaveHelpSelect);
    this.addWindow(this._helpWindow);
};

Scene_File.prototype.createListWindow = function() {
    var x = 0;
    var y = this._helpWindow.height;
    var width = 240;
    var height = Graphics.boxHeight - y;
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this.addWindow(this._listWindow);
    this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
    this._listWindow.setHandler('cancel', this.popScene.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.setMode(this.mode());
    this._listWindow.refresh();
    
};

Scene_File.prototype.createActionWindow = function() {
    var x = this._listWindow.width;
    var y = this._listWindow.y;
    this._actionWindow = new Window_SaveAction(x, y, this.mode());
    this.addWindow(this._actionWindow);
    this._actionWindow.setHelpWindow(this._helpWindow);
    this._actionWindow.setHandler('load', this.onActionLoad.bind(this));
    this._actionWindow.setHandler('save', this.onActionSave.bind(this));
    this._actionWindow.setHandler('delete', this.onActionDelete.bind(this));
    this._actionWindow.setHandler('cancel', this.onActionCancel.bind(this));
};

Scene_File.prototype.createInfoWindow = function() {
    var x = this._actionWindow.x;
    var y = this._actionWindow.y + this._actionWindow.height;
    var width = Graphics.boxWidth - x;
    var height = Graphics.boxHeight - y;
    this._infoWindow = new Window_SaveInfo(x, y, width, height, this.mode());
    this.addWindow(this._infoWindow);
};

Scene_File.prototype.createConfirmWindow = function() {
    this._confirmWindow = new Window_SaveConfirm();
    var win = this._confirmWindow;
    win.setHandler('confirm', this.onConfirmOk.bind(this));
    win.setHandler('cancel',  this.onConfirmCancel.bind(this));
    this.addWindow(this._confirmWindow);
};

Scene_File.prototype.onSavefileOk = function() {
    this._actionWindow.activate();
    if (this.mode() === 'load') {
      this._actionWindow.select(0);
    } else if (this.mode() === 'save') {
      this._actionWindow.select(1);
    }
};

Scene_Save.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
};

Scene_Load.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
};

Scene_File.prototype.onActionLoad = function() {
    if (Yanfly.Param.SaveConfirmLoad) {
      this.startConfirmWindow(Yanfly.Param.SaveConfirmLoadTx);
    } else {
      this.performActionLoad();
    }
};

Scene_File.prototype.performActionLoad = function() {
    if (DataManager.loadGame(this.savefileId())) {
        this.onLoadSuccess();
    } else {
        this.onLoadFailure();
    }
};

Scene_File.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
};

Scene_Load.prototype.onLoadSuccess = function() {
    Scene_File.prototype.onLoadSuccess.call(this);
};

Scene_File.prototype.onLoadFailure = function() {
    SoundManager.playBuzzer();
    this.onActionCancel();
};

Scene_Load.prototype.onLoadFailure = function() {
    Scene_File.prototype.onLoadFailure.call(this);
};

Scene_File.prototype.reloadMapIfUpdated = function() {
  if ($gameSystem.versionId() === $dataSystem.versionId) return;
  $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
  $gamePlayer.requestMapReload();
};

Scene_File.prototype.onActionSave = function() {
  var id = this.savefileId();
  if (Yanfly.Param.SaveConfirmSave && StorageManager.exists(id)) {
    this.startConfirmWindow(Yanfly.Param.SaveConfirmSaveTx);
  } else {
    this.performActionSave();
  }
};

Scene_File.prototype.performActionSave = function() {
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(this.savefileId())) {
      this.onSaveSuccess();
    } else {
      this.onSaveFailure();
    }
};

Scene_File.prototype.onSaveSuccess = function() {
    SoundManager.playSave();
    StorageManager.cleanBackup(this.savefileId());
    if (Yanfly.Param.SavePop) {
      this.popScene();
    } else {
      this._listWindow.refresh();
      this._actionWindow._currentFile = this.savefileId() - 1;
      this._infoWindow._currentFile = this.savefileId() - 1;
      this.onActionCancel();
    }
};

Scene_Save.prototype.onSaveSuccess = function() {
    Scene_File.prototype.onSaveSuccess.call(this);
};

Scene_File.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();
    this.onActionCancel();
};

Scene_Save.prototype.onSaveFailure = function() {
    Scene_File.prototype.onSaveFailure.call(this);
};

Scene_File.prototype.onActionDelete = function() {
    if (Yanfly.Param.SaveConfirmDel) {
      this.startConfirmWindow(Yanfly.Param.SaveConfirmDelTx);
    } else {
      this.performActionDelete();
    }
};

Scene_File.prototype.performActionDelete = function() {
    AudioManager.playSe(Yanfly.Param.SaveDeleteSound);
    StorageManager.remove(this.savefileId());
    this.onActionCancel();
    this._listWindow.refresh();
    this._actionWindow._currentFile = this.savefileId() - 1;
    this._infoWindow._currentFile = this.savefileId() - 1;
};

Scene_File.prototype.onActionCancel = function() {
    this._actionWindow.deselect();
    this._listWindow.activate();
    this._helpWindow.setText(Yanfly.Param.SaveHelpSelect);
};

Scene_File.prototype.startConfirmWindow = function(text) {
    SoundManager.playOk();
    this._confirmWindow.setData(text);
    this._confirmWindow.open();
    this._confirmWindow.activate();
    this._confirmWindow.select(0);
};

Scene_File.prototype.onConfirmOk = function() {
    this._confirmWindow.deactivate();
    this._confirmWindow.close();
    if (this._actionWindow.currentSymbol() === 'load') {
      setTimeout(this.performActionLoad.bind(this), 200);
    } else if (this._actionWindow.currentSymbol() === 'save') {
      setTimeout(this.performActionSave.bind(this), 200);
    } else if (this._actionWindow.currentSymbol() === 'delete') {
      setTimeout(this.performActionDelete.bind(this), 200);
    } else {
      this.onConfirmCancel();
    }
};

Scene_File.prototype.onConfirmCancel = function() {
    var index = this._actionWindow.index();
    this._confirmWindow.deactivate();
    this._confirmWindow.close();
    this.onSavefileOk();
    this._actionWindow.select(index);
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
