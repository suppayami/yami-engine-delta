//=============================================================================
// Yanfly Engine Plugins - Grid-Free Doodads
// YEP_GridFreeDoodads.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_GridFreeDoodads = true;

var Yanfly = Yanfly || {};
Yanfly.GFD = Yanfly.GFD || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 Place Grid-Free Doodads into your game using an
 * in-game editor. Static and animated doodads can be used!
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Doodads Folder
 * @desc This is the path to your doodads folder.
 * @default img/doodads/
 *
 * @param Doodads Smoothing
 * @desc Default smooth out doodad edges or give them hard edges?
 * SMOOTH - true     HARD - false
 * @default false
 *
 * @param ---Grid Snap---
 * @default
 *
 * @param Default Grid Snap
 * @desc Do you want Grid Snap enabled by default?
 * YES - true     NO - false
 * @default false
 *
 * @param Grid Snap Width
 * @desc The default grid snap width.
 * @default 48
 *
 * @param Grid Snap Height
 * @desc The default grid snap height.
 * @default 48
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * In RPG Maker MV, tilesets are used for mapping purposes. Tileset A is used
 * for drawing land while Tilesets B through E are used to add doodads. But in
 * RPG Maker MV, doodads added by Tilesets B through E are locked to the grid
 * and add a rather unnatural feel to it. This plugin will allow you to break
 * free of the grid and add doodads unbound by the grid. Doodads can come in
 * all forms, from large to small, static and animated, you name it!
 *
 * ============================================================================
 * Instructions - Requirements
 * ============================================================================
 *
 * There's a couple of things you must do in order to get this plugin working.
 *
 * 1. You must have the Doodads.json inside your project's 'data' folder.
 * 2. You must have a 'doodads' folder inside of your project's 'img' folder
 *    (unless you named it something else in the plugin parameters).
 * 3. You must have your doodads within this folder.
 *
 * You can find the above resources from Yanfly.moe!
 *
 * ============================================================================
 * Instructions - Placing Doodads
 * ============================================================================
 *
 * To place doodads into your game, first, load up your game in Test Play mode.
 * You can do this by opening up your game in RPG Maker MV, go to 'Game', then
 * select 'PlayTest' (shortcut Ctrl+R).
 *
 * Once you've loaded onto a map that you want to place doodads on, press the
 * F10 key to access the doodad editor. From there, you can select the option:
 * 'Place Doodads' to start placing doodads.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *
 * ---Main Menu---
 * The main menu is the first menu you see when you press the F10 key on a map.
 *
 *   Place Doodads
 *   - This will take you do your doodads folder, where you can select a doodad
 *   to place on the map.
 *
 *   Edit Doodads
 *   - This will allow you to edit the doodads that you have already placed on
 *   the map. Here, you can select which doodads based on the layer they're on
 *   or from all doodads at once. Doodads are ordered based on their position
 *   from top to bottom, left to right.
 *
 *   Clear Doodads
 *   - This will clear all doodads on the map.
 *
 *   Toggle Region Overlay
 *   - This will cause an overlay of the regions to appear on your screen to
 *   show you what tiles are affected by which regions. Use it again to hide
 *   the regions.
 *   * WARNING: Using this on large maps for the first time will cause a bit of
 *   lag as the regions have to load. The larger the map, the longer the amount
 *   of time is required for it to load.
 *
 *   Cancel and Close
 *   - This will remove any changes made to the doodad settings on the map and
 *   close out of the Doodad Menu.
 *
 *   Save and Close
 *   - This will save any changes made to the doodad settings on the map and
 *   close out of the Doodad Menu.
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *
 * ---Doodad List---
 * The doodad list will show a list of all the doodads you can use for your map
 * based on the current folder it's in. There are three types of options you
 * can select from here:
 *
 *   IconSet
 *   - This will let you make a doodad out of an icon from the iconset.
 *   Take note that doodads made from icons are a bit more restrictive and
 *   cannot make use of hue changes. This will take you to a menu where you can
 *   select which icon you wish to use then go to the Doodad Placing Mode.
 *
 *   Folders
 *   - Folders will be marked with a / at the end of the name and will have an
 *   icon shared by all other folders. Selecting a folder will go into that
 *   folder's contents (and further).
 *
 *   Images
 *   - Images will show a small preview of themselves to the left of the name.
 *   These images can be used as doodads without any restrictions. Selecting an
 *   image will take you to the Doodad Placing Mode.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *
 * ---Doodad Placing Mode---
 * When you're in Doodad Placing Mode, you'll notice a small section of the
 * screen below with some instructional text.
 *
 *   Q E - Layer -/+
 *   - This allows you to decrease or increase the doodad's current layer.
 *
 *   T - Tweak Settings
 *   - Pressing this will open up the Doodad Settings menu.
 *
 *   W A S D - Move Screen
 *   - This will move the screen around so you can have a clear view of the map
 *   without needing to reposition the player character.
 *
 *   ↑←↓→ - Precision Move
 *   - Pressing the directional keys will allow you to move the doodad using
 *   the keyboard instead of the mouse. If you wish to move using the mouse,
 *   just click on the map somewhere to return control back to the mouse.
 *
 *   Z X - Place or Cancel
 *   - Pressing Z will place the doodad in its current state on the map.
 *   - Pressing X will return you back to the Doodad List (or the Icon Picker
 *   if you were placing a doodad made from an icon).
 *
 * There are some hidden keyboard commands that you can use. These are rewarded
 * to the users who read these instructions carefully. Hooray for you!
 *
 *   H - Hide/Show the Instruction Window
 *   - Pressing H will hide the instructional window so you can get a clear
 *   view of where you're placing the doodad. Pressing it again will make it
 *   show back up.123
 *
 *   1 2 3 4 5 6 7 8 9 0 - Quick Opacity Change
 *   - The 1 through 0 keys (not NumPad) will allow you to quickly adjust the
 *   opacity level of the doodad. 1 will set 10%, 2 sets 20%, 3 sets 30%, etc.
 *   However, 0 will set 100%.
 *
 *   G - Grid Snap Menu
 *   - This opens up the Grid Snap Menu where you can activate or deactivate
 *   Grid Snapping and the grid snapping parameters.
 *
 *   R - Region Overlay
 *   - This will cause an overlay of the regions to appear on your screen to
 *   show you what tiles are affected by which regions. Press R again to hide
 *   the regions.
 *   * WARNING: Using this on large maps for the first time will cause a bit of
 *   lag as the regions have to load. The larger the map, the longer the amount
 *   of time is required for it to load.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *
 * ---Doodad Settings---
 * When pressing 'T' during the Doodad Placing Mode or accessing individual
 * doodads, you will come across the Doodad Settings.
 *
 *   Change Position
 *   - Only selectable if accessed from individual doodad management. This will
 *   allow you to reposition the doodad.
 *
 *   Layer
 *   - This allows you to change the layer of the doodad. Higher layers will
 *   make the doodad appear above others (and characters) and lower layers will
 *   cause doodads to appear below.
 *
 *   Hue
 *   - Changing to hue will change the doodad's current color shift. Be warned
 *   as this process takes up a lot of processing power, and I highly advise
 *   against using doodads of different hues if you plan to export to mobile.
 *
 *   Opacity
 *   - Changes the opacity of the doodad. When the opacity value is higher, the
 *   doodad will be less transparent. When the opacity value is lower, it will
 *   be more transparent.
 *
 *   Scale X, Scale Y
 *   - This changes the amount of stretch on a doodad. X will cause a doodad to
 *   stretch horizontally while Y will cause the doodad to stretch vertically.
 *   If you decide to use a negative value, it will cause the doodad to mirror.
 *
 *   Anchor X, Anchor Y
 *   - This sets the base coordinates of the doodad to be located. How other
 *   doodads/objects of the same layer interact with this doodad will be based
 *   on its coordinates.
 *
 *   Frame Speed
 *   - If the doodad is animated, you can adjust the frame speed of the doodad
 *   here. The number represents the number of frames that must pass before the
 *   doodad updates to the next animation cell. This means lower numbers have
 *   faster animations while higher numbers have slower animations.
 *
 *   Blend
 *   - Allows you to change the blend modes of the doodads. Blend modes will
 *   cause color differences based on the blend mode type to fit in with the
 *   visual effects behind it.
 *
 *   Smooth
 *   - Let's you choose whether or not you want to load the doodad with either
 *   smooth or hard edges.
 *
 *   Delete Doodad
 *   - Only selectable if accessed from individual doodad management. This will
 *   let you delete the doodad and then return to the doodad management list.
 *
 *   Revert Settings
 *   - Cancels all of the settings made and returns back to your previous mode.
 *
 *   Accept Settings
 *   - Accepts all of the settings made and returns back to your previous mode.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *
 * ============================================================================
 * Instructions - Making Your Own Doodads
 * ============================================================================
 *
 * Doodads only have two requirements.
 *
 *   1. They must be PNG's.
 *   2. They must exist within the 'doodads' folder (or specified folder from
 *      the plugin parameters) or within a folder inside the 'doodads' folder.
 *
 * If a folder is placed inside of the 'doodads' folder, it will be listed as
 * on the doodads list as a directory tree to navigate through.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Making Animated Doodads
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *
 * Doodads can be made into animated doodads. An animated doodad is one that
 * will animate whenever the game's graphics update. Follow these steps to make
 * an animated doodad:
 *
 *   1. Create a doodad with a cell layout similar to a sprite.
 *   2. Each cell must be the same width and height as the other.
 *   3. When naming the doodad, add [AxB] in its name. Replace A and B with
 *      numbers representing the number of cells horizontally (A) and the
 *      number of cells vertically (B). A doodad with 3 horizontal cells and
 *      2 vertical cells would be named something like 'Torch [3x2].png'.
 *   4. The doodads cells will animate left to right. Once they reach all the
 *      way right, they will move down a row and update left to right again.
 *      The doodad named 'Torch [3x2].png' will update like such:
 *
 *      0   1   2
 *      3   4   5
 *
 * And that's how you would go about the creation of an animated doodad. If
 * this is confusing, look at some of the examples provided from Yanfly.moe.
 */
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.3.0") {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_GridFreeDoodads');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.GFDFolder = String(Yanfly.Parameters['Doodads Folder']);
Yanfly.Param.GFDSmooth = eval(String(Yanfly.Parameters['Doodads Smoothing']));

Yanfly.Param.GFDGridSnap = eval(String(Yanfly.Parameters['Default Grid Snap']));
Yanfly.Param.GFDGridWidth = Number(Yanfly.Parameters['Grid Snap Width']);
Yanfly.Param.GFDGridHeight = Number(Yanfly.Parameters['Grid Snap Height']);

var $dataDoodads = null;

//=============================================================================
// DataManager
//=============================================================================

if (!DataManager.isBattleTest() && !DataManager.isEventTest()) {

DataManager._databaseFiles.push({ name: '$dataDoodads', src: 'Doodads.json' });

}; // !DataManager.isBattleTest()

//=============================================================================
// Tilemap
//=============================================================================

Tilemap.prototype._compareChildOrder = function(a, b) {
  if (a.z !== b.z) {
    return a.z - b.z;
  } else if (a.y !== b.y) {
    return a.y - b.y;
  } else if (a.x !== b.x) {
    return a.x - b.x;
  } else {
    return a.spriteId - b.spriteId;
  }
};

//=============================================================================
// ImageManager
//=============================================================================

ImageManager.loadDoodad = function(filename, hue, smooth) {
  if (filename === 'IconSet') return ImageManager.loadSystem('IconSet');
  return this.loadBitmap(Yanfly.Param.GFDFolder, filename, hue, smooth);
};

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.0') {

ImageManager.isReady = function() {
    for (var key in this.cache._inner) {
        var bitmap = this.cache._inner[key].item;
        if (bitmap.isError()) {
          console.log('Failed to load: ' + decodeURIComponent(bitmap.url));
          this.cache._inner[key].item = this.loadEmptyBitmap();
          bitmap = this.cache._inner[key].item;
        }
        if (!bitmap.isReady()) {
            return false;
        }
    }
    return true;
};

} else { // Version 1.2.0 and Under

ImageManager.isReady = function() {
  for (var key in this._cache) {
    var bitmap = this._cache[key];
    if (bitmap.isError()) {
      console.log('Failed to load: ' + decodeURIComponent(bitmap.url));
      this._cache[key] = this.loadEmptyBitmap();
      var bitmap = this._cache[key];
    }
    if (!bitmap.isReady()) {
      return false;
    }
  }
  return true;
};

}; // End Check

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.doodads = function() {
  if ($dataDoodads) return $dataDoodads[this.mapId()];
};

Yanfly.GFD.Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
Game_Map.prototype.isEventRunning = function() {
  if ($gameTemp._modeGFD) return true;
  return Yanfly.GFD.Game_Map_isEventRunning.call(this);
};

//=============================================================================
// Sprite_Doodad
//=============================================================================

function Sprite_Doodad() {
  this.initialize.apply(this, arguments);
}

Sprite_Doodad.prototype = Object.create(Sprite_Base.prototype);
Sprite_Doodad.prototype.constructor = Sprite_Doodad;

Sprite_Doodad.prototype.initialize = function(data) {
  this._data = data;
  this._tileWidth = $gameMap.tileWidth();
  this._tileHeight = $gameMap.tileHeight();
  this._mapWidth = $gameMap.width() * this._tileWidth;
  this._mapHeight = $gameMap.height() * this._tileHeight;
  this._currentCount = 0;
  this._loadedData = false;
  Sprite_Base.prototype.initialize.call(this);
  this.initData();
};

Sprite_Doodad.prototype.initData = function() {
  this.initCustomDataA();
  this._currentCount = 0;
  this.x = this._data.x;
  this.y = this._data.y;
  this.z = this._data.z;
  this._iconIndex = this._data.iconIndex || 0;
  this._xFrames = this._data.xFrames || 1;
  this._yFrames = this._data.yFrames || 1;
  this._index = this._xFrames * this._yFrames - 1;
  this._frameUpdate = this._data.frameUpdate || 15;
  this.anchor.x = this._data.anchorX;
  this.anchor.y = this._data.anchorY;
  this.scale.x = this._data.scaleX / 100;
  this.scale.y = this._data.scaleY / 100;
  if (this.scale.x <= 0) {
    if (this.anchor.x === 0) {
      this.anchor.x = 1;
    } else if (this.anchor.x === 1) {
      this.anchor.x = 0;
    }
  }
  if (this.scale.y <= 0) {
    if (this.anchor.y === 0) {
      this.anchor.y = 1;
    } else if (this.anchor.y === 1) {
      this.anchor.y = 0;
    }
  }
  this.blendMode = this._data.blend || 0;
  this.opacity = this._data.opacity || 0;
  var folder = this._data.folder || '';
  var path = folder + this._data.bitmap;
  this.bitmap = ImageManager.loadDoodad(path, this._data.hue || 0,
    this._data.smooth || false);
  this.initCustomDataZ();
  this._loadedData = true;
};

Sprite_Doodad.prototype.initCustomDataA = function() {
};

Sprite_Doodad.prototype.initCustomDataZ = function() {
};

Sprite_Doodad.prototype.update = function() {
  Sprite_Base.prototype.update.call(this);
  this.updatePosition();
  if (!this._loadedData) return;
  this.updateCustomA();
  this.updateFrame();
  this.updateCustomZ();
};

Sprite_Doodad.prototype.updatePosition = function() {
  this.x = this.screenX();
  this.y = this.screenY();
};

Sprite_Doodad.prototype.screenX = function() {
  var value = this._data.x;
  var display = $gameMap._displayX;
  value -= display * this._tileWidth;
  if (value + this.width < 0) value += this._mapWidth;
  return Math.round(value);
};

Sprite_Doodad.prototype.screenY = function() {
  var value = this._data.y;
  var display = $gameMap._displayY;
  value -= display * this._tileHeight;
  if (value + this.height < 0) value += this._mapHeight;
  return Math.round(value);
};

Sprite_Doodad.prototype.clear = function() {
  this.bitmap = new Bitmap(1, 1);
};

Sprite_Doodad.prototype.updateCustomA = function() {
};

Sprite_Doodad.prototype.updateFrame = function() {
  if (this._iconIndex) {
    var pw = Sprite_StateIcon._iconWidth;
    var ph = Sprite_StateIcon._iconHeight;
    var sx = this._iconIndex % 16 * pw;
    var sy = Math.floor(this._iconIndex / 16) * ph;
    return this.setFrame(sx, sy, pw, ph);
  }
  if (this._xFrames === 1 && this._yFrames === 1) return;
  var pw = Math.floor(this.bitmap.width / this._xFrames);
  var ph = Math.floor(this.bitmap.height / this._yFrames);
  var sx = this._index % this._xFrames * pw;
  var sy = Math.floor(this._index / this._xFrames) * ph;
  this.setFrame(sx, sy, pw, ph);
  if (this._currentCount > 0) return this._currentCount--;
  this._currentCount = this._frameUpdate;
  this._index++;
  if (this._index >= this._xFrames * this._yFrames) this._index = 0;
};

Sprite_Doodad.prototype.updateCustomZ = function() {
};

//=============================================================================
// Spriteset_Map
//=============================================================================

Yanfly.GFD.Spriteset_Map_createCharacters =
  Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
  Yanfly.GFD.Spriteset_Map_createCharacters.call(this);
  this.createDoodads();
};

Spriteset_Map.prototype.createDoodads = function() {
  this.removeCurrentDoodads();
  this.addMapDoodads();
};

Spriteset_Map.prototype.removeCurrentDoodads = function() {
  this._doodads = this._doodads || [];
  var length = this._doodads.length;
  for (var i = 0; i < length; ++i) {
    var sprite = this._doodads[i];
    this._tilemap.removeChild(sprite);
  }
};

Spriteset_Map.prototype.addMapDoodads = function() {
  this._doodads = [];
  var doodads = $gameMap.doodads();
  if (!doodads) return;
  var length = doodads.length;
  for (var i = 0; i < length; ++i) {
    var doodadData = doodads[i];
    this._doodads.push(new Sprite_Doodad(doodadData));
    this._tilemap.addChild(this._doodads[i]);
  }
};

//=============================================================================
// Play Test Only
//=============================================================================

if (Utils.isNwjs() && Utils.isOptionValid('test')) {

//=============================================================================
// TouchInput
//=============================================================================

Yanfly.GFD.TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
  Yanfly.GFD.TouchInput_onMouseMove.call(this, event);
  this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
  this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};

//=============================================================================
// StorageManager
//=============================================================================

StorageManager.saveDoodadSettings = function() {
  var data = JSON.stringify($dataDoodads, null, 2);
  var fs = require('fs');
  var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/');
  if (path.match(/^\/([A-Z]\:)/)) {
    path = path.slice(1);
  }
  var dirPath = decodeURIComponent(path);
  var filePath = dirPath + 'Doodads.json';
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  fs.writeFileSync(filePath, data);
};

//=============================================================================
// DoodadManager
//=============================================================================

function DoodadManager() {
  throw new Error('This is a static class');
};

DoodadManager.mapId = function() {
  return $gameMap.mapId();
};

DoodadManager.addNew = function(doodad) {
  $dataDoodads[this.mapId()] = $dataDoodads[this.mapId()] || [];
  $dataDoodads[this.mapId()].push(doodad);
  this.sortDoodads($dataDoodads[this.mapId()]);
  this.refresh();
};

DoodadManager.delete = function(doodad) {
  $dataDoodads[this.mapId()] = $dataDoodads[this.mapId()] || [];
  var index = $dataDoodads[this.mapId()].indexOf(doodad);
  if (index >= 0) $dataDoodads[this.mapId()].splice(index, 1);
  this.sortDoodads($dataDoodads[this.mapId()]);
  this.refresh();
};

DoodadManager.sortDoodads = function(arr) {
  arr.sort(function(a, b) {
    if (a.z !== b.z) {
      return b.z - a.z;
    } else if (a.y !== b.y) {
      return a.y - b.y;
    } else {
      return a.x - b.x;
    }
  });
};

DoodadManager.getTemplate = function(folderName, bitmapName) {
  return {
         folder: folderName || '',
         bitmap: bitmapName || '',
            hue: 0,
              x: 0,
              y: 0,
              z: 3,
      iconIndex: 0,
        anchorX: 0.5,
        anchorY: 1.0,
         scaleX: 100,
         scaleY: 100,
          blend: 0,
        opacity: 255,
        xFrames: 1,
        yFrames: 1,
    frameUpdate: 20,
         smooth: Yanfly.Param.GFDSmooth
  }
};

DoodadManager.refresh = function() {
  var scene = SceneManager._scene;
  if (scene) {
    scene._spriteset.createDoodads();
    scene._spriteset.update();
  }
};

DoodadManager.clearMap = function() {
  $dataDoodads[this.mapId()] = [];
  this.refresh();
};

DoodadManager.toggle = function() {
  if (!SceneManager._scene.isMap()) return;
  if ($gameTemp._modeGFD) return;
  if (SceneManager._scene._debugActive) return;
  /*
  if ($gameMap.isLoopHorizontal() || $gameMap.isLoopVertical()) {
    return console.log('Doodad support for looping maps is not yet included.');
  }
  */
  $gameTemp._modeGFD = !$gameTemp._modeGFD;
  SceneManager._scene.toggleGFDWindows()
};

DoodadManager.setCanvasMode = function(setting) {
  if (setting) {
    this._manualMove = false;
    this.setGridLockMode(Yanfly.Param.GFDGridSnap);
  }
  this._canvasMode = setting;
};

DoodadManager.setManualMove = function(setting) {
  if (setting) this.updateManualMove();
  this._manualMove = setting;
};

DoodadManager.setSettingsMode = function(setting) {
  if (setting) this.setManualMove(false);
  this._settingsMode = setting;
};

DoodadManager.layerList = function() {
  return [0, 0.1, 0.2, 1, 2, 3, 4, 5, 6, 7, 8];
};

DoodadManager.blendNames = function() {
  return ['Normal', 'Additive', 'Multiply', 'Screen', 'Overlay', 'Darken',
    'Lighten', 'Dodge', 'Burn', 'Hard Light', 'Soft Light', 'Difference',
    'Exclusion', 'Hue', 'Saturation', 'Color', 'Luminosity'];
};

DoodadManager.current = function() {
  return SceneManager._scene._currentDoodad;
};

DoodadManager.currentCopy = function() {
  return JsonEx.makeDeepCopy(SceneManager._scene._currentDoodad);
};

DoodadManager.updateManualMove = function() {
  if (this._manualMove !== false) return;
  this._manualX = TouchInput._mouseOverX || Math.floor(Graphics.boxWidth / 2);
  this._manualY = TouchInput._mouseOverY || Math.floor(Graphics.boxHeight / 2);
};

DoodadManager.updateCurrentDoodad = function() {
  if (SceneManager._scene._spriteset._doodadCursor) {
    SceneManager._scene._spriteset._doodadCursor.refreshSettings();
  }
  SceneManager._scene._spriteset.update();
};

DoodadManager.getXFrames = function(filename) {
  if (filename.match(/\[(\d+)x(\d+)\]/i)) {
    return parseInt(RegExp.$1);
  }
  return 1;
};

DoodadManager.getYFrames = function(filename) {
  if (filename.match(/\[(\d+)x(\d+)\]/i)) {
    return parseInt(RegExp.$2);
  }
  return 1;
};

DoodadManager.updateNewSettings = function() {
  if (this._canvasMode) {
    this.updateCurrentDoodad();
  } else {
    this.refresh();
  }
};

DoodadManager.revertSettings = function(doodad1, doodad2) {
  for (key in doodad1) {
    doodad1[key] = doodad2[key];
  }
};

DoodadManager.setGridLockMode = function(setting) {
  this._gridLockMode = setting;
};

DoodadManager.gridLockX = function() {
  this._gridLockX = this._gridLockX || Yanfly.Param.GFDGridWidth;
  return this._gridLockX;
};

DoodadManager.gridLockY = function() {
  this._gridLockY = this._gridLockY || Yanfly.Param.GFDGridHeight;
  return this._gridLockY;
};

DoodadManager.setEditMode = function(setting) {
  this._editMode = setting;
};

Yanfly.GFD.Graphics_onKeyDown = Graphics._onKeyDown;
Graphics._onKeyDown = function(event) {
  Yanfly.GFD.Graphics_onKeyDown.call(this, event);
  if (!event.ctrlKey && !event.altKey) DoodadManager.keyDown(event.keyCode);
};

DoodadManager.keyDown = function(code) {
  if (!$gameTemp) return;
  if (code === 121) { // F10
    this.toggle();
  } else if ($gameTemp._modeGFD && code === 82) { // R
    SceneManager._scene._spriteset.toggleRegionOverlayWindow();
  } else if (this._canvasMode && this._settingsMode && this._editMode) {
    if (SceneManager._scene._gfdGridMenuWindow.active) return;
    this.updateTripleMode(code);
    this.updateCurrentDoodad();
  } else if (this._settingsMode) {
    this.updateSettingsMode(code);
  } else if (this._canvasMode) {
    if (SceneManager._scene._gfdGridMenuWindow.active) return;
    this.updateCanvasMode(code);
    this.updateCurrentDoodad();
  } else if (this._editMode) {
    this.updateEditMode(code);
  }
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.centerScreenPlayer = function() {
  $gamePlayer.center($gamePlayer.x, $gamePlayer.y);
};

Game_Map.prototype.centerScreenDoodad = function(doodad) {
  var x = doodad.x / this.tileWidth();
  var y = doodad.y / this.tileHeight();
  var centerX = (Graphics.width / this.tileWidth() - 1) / 2.0;
  var centerY = (Graphics.height / this.tileHeight() - 1) / 2.0;
  this.setDisplayPos(x - centerX, y - centerY);
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.GFD.Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
  if ($gameTemp._modeGFD) return false;
  return Yanfly.GFD.Game_Player_canMove.call(this);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.GFD.Game_Event_updateSelfMovement =
    Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
  if ($gameTemp._modeGFD) return;
  Yanfly.GFD.Game_Event_updateSelfMovement.call(this);
};

//=============================================================================
// Sprite_Doodad
//=============================================================================

Yanfly.GFD.Sprite_Doodad_update = Sprite_Doodad.prototype.update;
Sprite_Doodad.prototype.update = function() {
  Yanfly.GFD.Sprite_Doodad_update.call(this);
  if (!this._loadedData) return;
  this.updateSettingsOpacity();
};

Sprite_Doodad.prototype.updateSettingsOpacity = function() {
  this.opacity = this._data.opacity;
  if (DoodadManager._canvasMode) {
    if (DoodadManager.current().z !== this._data.z) this.opacity /= 2;
  } else if (DoodadManager._editMode) {
    var doodad = SceneManager._scene._gfdPickDoodadListWindow.currentExt();
    if (doodad) {
      if (doodad !== this._data) this.opacity /= 2;
      if (doodad.z !== this._data.z) this.opacity /= 2;
    }
  }
};

//=============================================================================
// Sprite_DoodadCursor
//=============================================================================

function Sprite_DoodadCursor() {
  this.initialize.apply(this, arguments);
}

Sprite_DoodadCursor.prototype = Object.create(Sprite_Doodad.prototype);
Sprite_DoodadCursor.prototype.constructor = Sprite_DoodadCursor;

Sprite_DoodadCursor.prototype.initData = function() {
  if (TouchInput._mouseOverX === undefined) {
    TouchInput._mouseOverX = Math.floor(Graphics.boxWidth / 2);
    TouchInput._mouseOverY = Math.floor(Graphics.boxHeight / 2);
  }
  Sprite_Doodad.prototype.initData.call(this);
};

Sprite_DoodadCursor.prototype.refreshSettings = function() {
  this._data = DoodadManager.current();
  this.initData();
};

Sprite_DoodadCursor.prototype.update = function() {
  Sprite_Doodad.prototype.update.call(this);
  this.updatePosition();
};

Sprite_DoodadCursor.prototype.updatePosition = function() {
  if (DoodadManager._manualMove) {
    this.x = DoodadManager._manualX;
    this.y = DoodadManager._manualY;
  } else {
    this.x = TouchInput._mouseOverX;
    this.y = TouchInput._mouseOverY;
  }
};

Sprite_DoodadCursor.prototype.updatePosition = function() {
  var win = SceneManager._scene._gfdCanvasWindow;
  this.x = win.rawDoodadX();
  this.y = win.rawDoodadY();
};

//=============================================================================
// Spriteset_Map
//=============================================================================

Spriteset_Map.prototype.clearDoodadCursor = function() {
  if (this._doodadCursor) {
    this._doodadCursor.clear();
    this._tilemap.removeChild(this._doodadCursor);
  }
};

Spriteset_Map.prototype.setDoodadCursor = function(doodad) {
  this.clearDoodadCursor();
  this._doodadCursor = new Sprite_DoodadCursor(doodad);
  this._tilemap.addChild(this._doodadCursor);
};

Spriteset_Map.prototype.toggleRegionOverlayWindow = function() {
  if (this._regionOverlayWindowOn) {
    this.closeRegionOverlayWindow();
  } else {
    this.showRegionOverlayWindow();
  }
};

Spriteset_Map.prototype.showRegionOverlayWindow = function() {
  this._regionOverlayWindowOn = true;
  if (!this._regionOverlayWindow) this.addRegionOverlayWindow();
  this._regionOverlayWindow.show();
  this._regionOverlayWindow.activate();
  if (this._regionOverlayWindowH) {
    this._regionOverlayWindowH.show();
    this._regionOverlayWindowH.activate();
  }
  if (this._regionOverlayWindowV) {
    this._regionOverlayWindowV.show();
    this._regionOverlayWindowV.activate();
  }
  if (this._regionOverlayWindowHV) {
    this._regionOverlayWindowHV.show();
    this._regionOverlayWindowHV.activate();
  }
};

Spriteset_Map.prototype.closeRegionOverlayWindow = function() {
  this._regionOverlayWindowOn = false;
  if (!this._regionOverlayWindow) return;
  this._regionOverlayWindow.hide();
  this._regionOverlayWindow.deactivate();
  if (this._regionOverlayWindowH) {
    this._regionOverlayWindowH.hide();
    this._regionOverlayWindowH.deactivate();
  }
  if (this._regionOverlayWindowV) {
    this._regionOverlayWindowV.hide();
    this._regionOverlayWindowV.deactivate();
  }
  if (this._regionOverlayWindowHV) {
    this._regionOverlayWindowHV.hide();
    this._regionOverlayWindowHV.deactivate();
  }
};

Spriteset_Map.prototype.addRegionOverlayWindow = function() {
  if (this._regionOverlayWindow) return;
  Graphics.startLoading();
  Graphics._loadingCount = 255;
  Graphics.updateLoading();
  this._regionOverlayWindow = new Window_GFD_RegionOverlay();
  this._tilemap.addChild(this._regionOverlayWindow);
  this._regionOverlayWindow.updatePosition();
  var win = this._regionOverlayWindow;
  if ($gameMap.isLoopHorizontal()) {
    this._regionOverlayWindowH = new Window_GFD_RegionOverlay();
    this._regionOverlayWindowH._pX = $gameMap.width() * $gameMap.tileWidth();
    this._tilemap.addChild(this._regionOverlayWindowH);
    this._regionOverlayWindowH.updatePosition();
  }
  if ($gameMap.isLoopVertical()) {
    this._regionOverlayWindowV = new Window_GFD_RegionOverlay();
    this._regionOverlayWindowV._pY = $gameMap.height() * $gameMap.tileHeight();
    this._tilemap.addChild(this._regionOverlayWindowV);
    this._regionOverlayWindowV.updatePosition();
  }
  if ($gameMap.isLoopHorizontal() && $gameMap.isLoopVertical()) {
    this._regionOverlayWindowHV = new Window_GFD_RegionOverlay();
    this._regionOverlayWindowHV._pX = $gameMap.width() * $gameMap.tileWidth();
    this._regionOverlayWindowHV._pY = $gameMap.height() * $gameMap.tileHeight();
    this._tilemap.addChild(this._regionOverlayWindowHV);
    this._regionOverlayWindowHV.updatePosition();
  }
  Graphics.endLoading();
};

//=============================================================================
// Window
//=============================================================================

Yanfly.GFD.Window_initialize = Window.prototype.initialize;
Window.prototype.initialize = function() {
  Yanfly.GFD.Window_initialize.call(this);
  this._isGFDWindow = false;
};

Window.prototype.setGFD = function() {
  this._isGFDWindow = true;
  this.opacity = 0;
  this.backOpacity = 0;
  this.contentsOpacity = 0;
  this.openness = 255;
  this.deactivate();
};

Window.prototype.isGFD = function() {
  return this._isGFDWindow;
};

Yanfly.GFD.Window_isOpen = Window.prototype.isOpen;
Window.prototype.isOpen = function() {
  if (this.isGFD()) return this.opacity >= 255;
  return Yanfly.GFD.Window_isOpen.call(this);
};

Yanfly.GFD.Window_isClosed = Window.prototype.isClosed;
Window.prototype.isClosed = function() {
  if (this.isGFD()) return this.opacity <= 0;
  return Yanfly.GFD.Window_isClosed.call(this);
};

//=============================================================================
// Window
//=============================================================================

Yanfly.GFD.Window_Base_updateOpen = Window_Base.prototype.updateOpen;
Window_Base.prototype.updateOpen = function() {
  if (this.isGFD() && this._opening) {
    this.opacity += 32;
    this.backOpacity += 24;
    this.contentsOpacity += 32;
    if (this.isOpen()) this._opening = false;
  } else {
    Yanfly.GFD.Window_Base_updateOpen.call(this);
  }
};

Yanfly.GFD.Window_Base_updateClose = Window_Base.prototype.updateClose;
Window_Base.prototype.updateClose = function() {
  if (this.isGFD() && this._closing) {
    this.opacity -= 32;
    this.backOpacity -= 24;
    this.contentsOpacity -= 32;
    if (this.isClosed()) this._closing = false;
  } else {
    Yanfly.GFD.Window_Base_updateClose.call(this);
  }
};

Yanfly.GFD.Window_Base_updateTone = Window_Base.prototype.updateTone;
Window_Base.prototype.updateTone = function() {
  if (this.isGFD()) {
    var tone = [100, -50, -50, 0];
    this.setTone(tone[0], tone[1], tone[2]);
  } else {
    Yanfly.GFD.Window_Base_updateTone.call(this);
  }
};

//=============================================================================
// Window_GFD_Menu
//=============================================================================

function Window_GFD_Menu() {
  this.initialize.apply(this, arguments);
}

Window_GFD_Menu.prototype = Object.create(Window_Command.prototype);
Window_GFD_Menu.prototype.constructor = Window_GFD_Menu;

Window_GFD_Menu.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.setGFD();
};

Window_GFD_Menu.prototype.windowWidth = function() {
  return 400;
};

Window_GFD_Menu.prototype.makeCommandList = function() {
  this.addCommand('Place Doodads', 'place');
  this.addCommand('Edit Doodads', 'edit');
  this.addCommand('Clear Doodads', 'clear');
  this.addCommand('', 'none', false);
  this.addCommand('Toggle Region Overlay', 'regionOverlay');
  this.addCommand('', 'none', false);
  this.addCommand('Cancel and Close', 'revert');
  this.addCommand('Save and Close', 'save');
};

//=============================================================================
// Window_GFD_List
//=============================================================================

function Window_GFD_List() {
  this.initialize.apply(this, arguments);
}

Window_GFD_List.prototype = Object.create(Window_Command.prototype);
Window_GFD_List.prototype.constructor = Window_GFD_List;

Window_GFD_List.prototype.initialize = function() {
  this._folder = [];
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.setGFD();
};

Window_GFD_List.prototype.windowWidth = function() {
  return 400;
};

Window_GFD_List.prototype.windowHeight = function() {
  return Graphics.boxHeight;
};

Window_GFD_List.prototype.folder = function() {
  return this._folder;
};

Window_GFD_List.prototype.folderPath = function() {
  var text = '';
  var length = this._folder.length;
  for (var i = 0; i < length; ++i) {
    var folder = this._folder[i];
    text += folder + '/';
  }
  return text;
};

Window_GFD_List.prototype.addFolder = function(name) {
  this._folder.push(name);
};

Window_GFD_List.prototype.deleteFolder = function() {
  return this._folder.pop();
};

Window_GFD_List.prototype.makeCommandList = function() {
  if (this.folderPath().length <= 0) {
    this.addCommand('IconSet', 'iconSet', true);
  } else {
    this.addCommand('../Previous Folder', 'cancel', true);
  }
  this.addFolderList();
  this.addFileList();
};

Window_GFD_List.prototype.getLocalPath = function() {
  var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/,
    '/' + Yanfly.Param.GFDFolder + this.folderPath() + '/');
  if (path.match(/^\/([A-Z]\:)/)) {
    path = path.slice(1);
  }
  path = decodeURI(path);
  return path;
};

Window_GFD_List.prototype.addFolderList = function() {
  var fs = require('fs');
  var results = [];
  var path = this.getLocalPath();
  fs.readdirSync(path).forEach(function(file) {
    name = file;
    file = path + '/' + name;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results.push(name);
    }
  });
  var length = results.length;
  for (var i = 0; i < length; ++i) {
    var folder = results[i];
    if (folder) {
      this.addCommand(folder + '/', 'folder', true, folder);
    }
  }
};

Window_GFD_List.prototype.addFileList = function() {
  var fs = require('fs');
  var results = [];
  var path = this.getLocalPath();
  fs.readdirSync(path).forEach(function(file) {
    name = file;
    file = path + '/' + name;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      // Do nothing
    } else if (name.match(/.png/g)) {
      name = name.replace(/.png/g, '');
      results.push(name);
    }
  });
  var length = results.length;
  for (var i = 0; i < length; ++i) {
    var file = results[i];
    if (file) {
      this.addCommand(file, 'file', true, file);
    }
  }
};

Window_GFD_List.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  var symbol = this.commandSymbol(index);
  var ext = this._list[index].ext;
  var icon = 0;
  var indent = false;
  var text = this.commandName(index);
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  switch (symbol) {
  case 'iconSet':
    icon = 2;
    break;
  case 'folder':
    icon = 164;
    break;
  case 'file':
    indent = true;
    this.drawDoodadImage(index, ext);
    text = text.replace(/\[(\d+)x(\d+)\]/g, '');
    break;
  }
  if (icon > 0 || indent) {
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    rect.x += Window_Base._iconWidth + 4;
    rect.width -= Window_Base._iconWidth + 4;
  }
  this.drawText(text, rect.x, rect.y, rect.width, align);
};

Window_GFD_List.prototype.drawDoodadImage = function(index, filename) {
  var bitmap = ImageManager.loadDoodad(this.folderPath() + filename, 0, true);
  if (bitmap.width <= 0) {
    return setTimeout(this.drawDoodadImage.bind(this, index, filename), 5);
  }
  var rect = this.itemRectForText(index);
  var xframes = DoodadManager.getXFrames(filename);
  var yframes = DoodadManager.getYFrames(filename);
  var pw = Math.floor(bitmap.width / xframes);
  var ph = Math.floor(bitmap.height / yframes);
  var dw = pw;
  var dh = ph;
  if (dw > Window_Base._iconWidth) {
    var rate = Window_Base._iconWidth / dw;
    dw *= rate;
    dh *= rate;
  }
  if (dh > Window_Base._iconHeight) {
    var rate = Window_Base._iconHeight / dh;
    dw *= rate;
    dh *= rate;
  }
  var dx = rect.x + 2 + (Window_Base._iconWidth - dw) / 2;
  var dy = rect.y + 2 + (Window_Base._iconHeight - dh) / 2;
  this.contents.blt(bitmap, 0, 0, pw, ph, dx, dy, dw, dh);
};

//=============================================================================
// Window_GFD_Icons
//=============================================================================

function Window_GFD_Icons() {
  this.initialize.apply(this, arguments);
}

Window_GFD_Icons.prototype = Object.create(Window_Command.prototype);
Window_GFD_Icons.prototype.constructor = Window_GFD_Icons;

Window_GFD_Icons.prototype.initialize = function() {
  var x = Math.floor((Graphics.boxWidth - this.windowWidth()) / 2);
  this._folder = [];
  Window_Command.prototype.initialize.call(this, x, 0);
  this.setGFD();
};

Window_GFD_Icons.prototype.windowWidth = function() {
  var contentswidth = this.maxCols() * (Window_Base._iconWidth + 4);
  return contentswidth + this.standardPadding() * 2;
};

Window_GFD_Icons.prototype.windowHeight = function() {
  return Graphics.boxHeight;
};

Window_GFD_Icons.prototype.spacing = function() {
  return 0;
};

Window_GFD_Icons.prototype.maxCols = function() {
  return 16;
};

Window_GFD_Icons.prototype.itemWidth = function() {
  return this.lineHeight();
};

Window_GFD_Icons.prototype.makeCommandList = function() {
  var bitmap = ImageManager.loadSystem('IconSet');
  var rows = Math.floor(bitmap.height / Window_Base._iconHeight);
  var length = rows * this.maxCols();
  for (var i = 0; i < length; ++i) {
    this.addCommand('', 'iconIndex', i > 0, i);
  }
};

Window_GFD_Icons.prototype.drawItem = function(index) {
  var rect = this.itemRect(index);
  var icon = this._list[index].ext;
  this.changePaintOpacity(true);
  this.drawIcon(icon, rect.x + 2, rect.y + 2);
};

//=============================================================================
// Window_GFD_Canvas
//=============================================================================

function Window_GFD_Canvas() {
    this.initialize.apply(this, arguments);
}

Window_GFD_Canvas.prototype = Object.create(Window_Selectable.prototype);
Window_GFD_Canvas.prototype.constructor = Window_GFD_Canvas;

Window_GFD_Canvas.prototype.initialize = function() {
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  this._tileWidth = $gameMap.tileWidth();
  this._tileHeight = $gameMap.tileHeight();
  Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
  this.refresh();
  this.opacity = 0;
  this.backOpacity = 0;
  this.hide();
  this.deactivate();
};

Window_GFD_Canvas.prototype.standardPadding = function() {
  return 0;
};

Window_GFD_Canvas.prototype.select = function(index) {
};

Window_GFD_Canvas.prototype.refresh = function() {
  this.contents.clear();
  var dh = this.lineHeight() * 6;
  var dy = this.contents.height - dh;
  var dx = Window_Base._faceWidth;
  var dw = this.contents.width - dx * 2;
  this.drawDarkRect(0, dy, this.contents.width, dh);
  dy += this.lineHeight() / 2;
  var text = 'Q E - Layer -/+';
  this.drawText(text, dx, dy + this.lineHeight() * 0, dw);
  var text = 'Layer: ' + this.currentLayer();
  this.drawText(text, dx, dy + this.lineHeight() * 0, dw, 'right');
  if (DoodadManager._editMode) {
    var text = 'G - Grid Settings';
  } else {
    var text = 'T - Tweak Settings';
  }
  this.drawText(text, dx, dy + this.lineHeight() * 1, dw);
  var text = 'W A S D - Move Screen';
  this.drawText(text, dx, dy + this.lineHeight() * 2, dw);
  var text = 'X: ' + Yanfly.Util.toGroup(this.currentDoodadX());
  this.drawText(text, dx, dy + this.lineHeight() * 2, dw, 'right');
  var text = '↑←↓→ - Precision Move';
  this.drawText(text, dx, dy + this.lineHeight() * 3, dw);
  var text = 'Y: ' + Yanfly.Util.toGroup(this.currentDoodadY());
  this.drawText(text, dx, dy + this.lineHeight() * 3, dw, 'right');
  var text = 'Z X - Place / Return';
  this.drawText(text, dx, dy + this.lineHeight() * 4, dw);
};

Window_GFD_Canvas.prototype.drawDarkRect = function(dx, dy, dw, dh) {
  var color = this.gaugeBackColor();
  this.changePaintOpacity(false);
  this.contents.fillRect(dx, dy, dw, dh, color);
  this.changePaintOpacity(true);
};

Window_GFD_Canvas.prototype.currentLayer = function() {
  if (!DoodadManager.current()) return 5;
  var index = DoodadManager.layerList().indexOf(DoodadManager.current().z);
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][index];
};

Window_GFD_Canvas.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  if (!this.active) return;
  this.updateOpacity();
  this.updateRefresh();
  this.updateClick();
};

Window_GFD_Canvas.prototype.updateOpacity = function() {
  if (this.isReduceOpacity()) {
    this.contentsOpacity -= 32;
  } else {
    this.contentsOpacity += 32;
  }
  this.contentsOpacity = this.contentsOpacity.clamp(100, 255);
};

Window_GFD_Canvas.prototype.isReduceOpacity = function() {
  var y = this.contents.height - this.lineHeight() * 6;
  if (TouchInput._mouseOverY > y) return true;
  if (DoodadManager._manualMove && DoodadManager._manualY > y) return true;
  return false;
};

Window_GFD_Canvas.prototype.rawDoodadX = function() {
  if (DoodadManager._manualMove) {
    var value = DoodadManager._manualX;
  } else {
    var value = TouchInput._mouseOverX;
  }
  if (DoodadManager._gridLockMode && DoodadManager.current()) {
    var w = DoodadManager._gridLockX;
    value = Math.floor(value / w) * w;
    value += Math.floor(this._tileWidth * DoodadManager.current().anchorX);
    value -= Math.floor(this._tileWidth * ($gameMap._displayX -
      Math.floor($gameMap._displayX)));
  }
  return Math.floor(value);
};

Window_GFD_Canvas.prototype.currentDoodadX = function() {
  var value = this.rawDoodadX();
  value += $gameMap._displayX * this._tileWidth;
  if ($gameMap.isLoopHorizontal()) {
    value = value % ($gameMap.width() * this._tileWidth);
  }
  return Math.floor(value);
};

Window_GFD_Canvas.prototype.rawDoodadY = function() {
  if (DoodadManager._manualMove) {
    var value = DoodadManager._manualY;
  } else {
    var value = TouchInput._mouseOverY;
  }
  if (DoodadManager._gridLockMode && DoodadManager.current()) {
    var h = DoodadManager._gridLockY;
    value = Math.floor(value / h) * h;
    value += Math.floor(this._tileHeight * DoodadManager.current().anchorY);
    value -= Math.floor(this._tileHeight * ($gameMap._displayY -
      Math.floor($gameMap._displayY)));
  }
  return Math.floor(value);
};

Window_GFD_Canvas.prototype.currentDoodadY = function() {
  var value = this.rawDoodadY();
  value += $gameMap._displayY * this._tileHeight;
  if ($gameMap.isLoopVertical()) {
    value = value % ($gameMap.height() * this._tileHeight);
  }
  return Math.floor(value);
};

Window_GFD_Canvas.prototype.updateRefresh = function() {
  var refresh = false;
  if (this.currentDoodadX() !== this._currentDoodadX) refresh = true;
  if (this.currentDoodadY() !== this._currentDoodadY) refresh = true;
  if (refresh) this.refresh();
};

Window_GFD_Canvas.prototype.updateClick = function() {
  if (!this.isOpenAndActive()) return;
  if (!TouchInput.isTriggered()) return;
  if (!this.isTouchedInsideFrame()) return;
  if (DoodadManager._manualMove) {
    SoundManager.playCursor();
    DoodadManager.setManualMove(false);
  } else if (DoodadManager._editMode) {
    SoundManager.playUseItem();
    var doodad = DoodadManager.current();
    doodad.x = this.currentDoodadX();
    doodad.y = this.currentDoodadY();
    DoodadManager.refresh();
  } else {
    SoundManager.playUseItem();
    var doodad = DoodadManager.currentCopy();
    doodad.x = this.currentDoodadX();
    doodad.y = this.currentDoodadY();
    DoodadManager.addNew(doodad);
  }
};

DoodadManager.updateCanvasMode = function(code) {
  if (code === 81) { // Q
    SoundManager.playCursor();
    var index = (this.layerList().indexOf(this.current().z) - 1).clamp(0, 10);
    this.current().z = this.layerList()[index];
    SceneManager._scene._gfdCanvasWindow.refresh();
  } else if (code === 69) { // E
    SoundManager.playCursor();
    var index = (this.layerList().indexOf(this.current().z) + 1).clamp(0, 10);
    this.current().z = this.layerList()[index];
    SceneManager._scene._gfdCanvasWindow.refresh();
  } else if (code === 84) { // T
    SoundManager.playEquip();
    SceneManager._scene.openGFDDoodadSettings(DoodadManager.current());
  } else if (code === 87) { // W
    if (!$gameMap.isScrolling()) $gameMap.startScroll(8, 1, 6);
  } else if (code === 65) { // A
    if (!$gameMap.isScrolling()) $gameMap.startScroll(4, 1, 6);
  } else if (code === 83) { // S
    if (!$gameMap.isScrolling()) $gameMap.startScroll(2, 1, 6);
  } else if (code === 68) { // D
    if (!$gameMap.isScrolling()) $gameMap.startScroll(6, 1, 6);
  } else if (code === 38) { // Up
    this.setManualMove(true);
    this._manualY -= DoodadManager._gridLockMode ? DoodadManager._gridLockY : 1;
    this.adjustManualMove();
  } else if (code === 37) { // Left
    this.setManualMove(true);
    this._manualX -= DoodadManager._gridLockMode ? DoodadManager._gridLockX : 1;
    this.adjustManualMove();
  } else if (code === 40) { // Down
    this.setManualMove(true);
    this._manualY += DoodadManager._gridLockMode ? DoodadManager._gridLockY : 1;
    this.adjustManualMove();
  } else if (code === 39) { // Right
    this.setManualMove(true);
    this._manualX += DoodadManager._gridLockMode ? DoodadManager._gridLockX : 1;
    this.adjustManualMove();
  } else if (code === 72) { // H
    SoundManager.playEquip();
    SceneManager._scene._gfdCanvasWindow.visible = 
      !SceneManager._scene._gfdCanvasWindow.visible;
  } else if (code === 90) { // Z
    SoundManager.playUseItem();
    var doodad = DoodadManager.currentCopy();
    doodad.x = SceneManager._scene._gfdCanvasWindow.currentDoodadX();
    doodad.y = SceneManager._scene._gfdCanvasWindow.currentDoodadY();
    DoodadManager.addNew(doodad);
  } else if (code === 88 || code === 27) { // X or ESC
    SoundManager.playCancel();
    SceneManager._scene.exitDoodadPlacingMode();
  } else if (code === 49) { // 1
    SoundManager.playCancel();
    this.current().opacity = Math.floor(255 * 0.10);
  } else if (code === 50) { // 2
    SoundManager.playCancel();
    this.current().opacity = Math.floor(255 * 0.20);
  } else if (code === 51) { // 3
    SoundManager.playCancel();
    this.current().opacity = Math.floor(255 * 0.30);
  } else if (code === 52) { // 4
    SoundManager.playCancel();
    this.current().opacity = Math.floor(255 * 0.40);
  } else if (code === 53) { // 5
    SoundManager.playCancel();
    this.current().opacity = Math.floor(255 * 0.50);
  } else if (code === 54) { // 6
    SoundManager.playCancel();
    this.current().opacity = Math.floor(255 * 0.60);
  } else if (code === 55) { // 7
    SoundManager.playCancel();
    this.current().opacity = Math.floor(255 * 0.70);
  } else if (code === 56) { // 8
    SoundManager.playCancel();
    this.current().opacity = Math.floor(255 * 0.80);
  } else if (code === 57) { // 9
    SoundManager.playCancel();
    this.current().opacity = Math.floor(255 * 0.90);
  } else if (code === 48) { // 0
    SoundManager.playCancel();
    this.current().opacity = 255;
  } else if (code === 71) { // G
    SoundManager.playEquip();
    SceneManager._scene.openGFDGridMenuWindow();
  }
};

DoodadManager.adjustManualMove = function() {
  this._manualX = this._manualX.clamp(0, Graphics.boxWidth - 1);
  this._manualY = this._manualY.clamp(0, Graphics.boxHeight - 1);
};

DoodadManager.updateTripleMode = function(code) {
  if (code === 90) { // Z
    SoundManager.playUseItem();
    var doodad = this.current();
    doodad.x = SceneManager._scene._gfdCanvasWindow.currentDoodadX();
    doodad.y = SceneManager._scene._gfdCanvasWindow.currentDoodadY();
    this.refresh();
  } else if (code === 84) { // T
    return;
  } else {
    this.updateCanvasMode(code);
  }
};

//=============================================================================
// Window_GFD_Settings
//=============================================================================

function Window_GFD_Settings() {
  this.initialize.apply(this, arguments);
}

Window_GFD_Settings.prototype = Object.create(Window_Command.prototype);
Window_GFD_Settings.prototype.constructor = Window_GFD_Settings;

Window_GFD_Settings.prototype.initialize = function() {
  this._doodad = undefined;
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.setGFD();
};

Window_GFD_Settings.prototype.windowWidth = function() {
  return 400;
};

Window_GFD_Settings.prototype.windowHeight = function() {
  return Graphics.boxHeight;
};

Window_GFD_Settings.prototype.setDoodad = function(doodad) {
  this._prevDoodad = JsonEx.makeDeepCopy(doodad);
  this._doodad = doodad;
  this.refresh();
};

Window_GFD_Settings.prototype.makeCommandList = function() {
  this.addCommand('Change Position', 'position', !DoodadManager._canvasMode);
  this.addCommand('', 'none', false);
  this.addCommand('Layer', 'layer');
  this.addCommand('Hue', 'hue', this._doodad && this._doodad.iconIndex <= 0);
  this.addCommand('Opacity', 'opacity');
  this.addCommand('Scale X', 'scaleX');
  this.addCommand('Scale Y', 'scaleY');
  this.addCommand('Anchor X', 'anchorX');
  this.addCommand('Anchor Y', 'anchorY');
  this.addCommand('Frame Speed', 'frameSpeed', this.isAnimated());
  this.addCommand('Blend', 'blend');
  this.addCommand('Smooth', 'smooth');
  this.addCustomCommands();
  this.addCommand('', 'none', false);
  this.addCommand('Delete Doodad', 'delete', !DoodadManager._canvasMode);
  this.addCommand('Revert Settings', 'revert');
  this.addCommand('Accept Settings', 'accept');
};

Window_GFD_Settings.prototype.isAnimated = function() {
  if (!this._doodad) return false;
  if (this._doodad.xFrames > 1) return true;
  if (this._doodad.yFrames > 1) return true;
  return false;
};

Window_GFD_Settings.prototype.drawItem = function(index) {
  Window_Command.prototype.drawItem.call(this, index);
  if (!this._doodad) return;
  var symbol = this.commandSymbol(index);
  var rect = this.itemRectForText(index);
  var text = '';
  switch (symbol) {
  case 'layer':
    text = this.layerText();
    break;
  case 'hue':
    text = this._doodad.hue;
    break;
  case 'opacity':
    text = this._doodad.opacity;
    break;
  case 'scaleX':
    text = this._doodad.scaleX + '%';
    break;
  case 'scaleY':
    text = this._doodad.scaleY + '%';
    break;
  case 'anchorX':
    if (this._doodad.anchorX <= 0) {
      text = 'Left'
    } else if (this._doodad.anchorX >= 1) {
      text = 'Right'
    } else {
      text = 'Center'
    }
    break;
  case 'anchorY':
    if (this._doodad.anchorY <= 0) {
      text = 'Head'
    } else if (this._doodad.anchorY >= 1) {
      text = 'Base'
    } else {
      text = 'Middle'
    }
    break;
  case 'frameSpeed':
    if (this.isAnimated()) {
      var text = Yanfly.Util.toGroup(this._doodad.frameUpdate);
    } else {
      var text = 'Not Animated';
    }
    break;
  case 'blend':
    var text = this.blendText();
    break;
  case 'smooth':
    var text = this._doodad.smooth ? 'Smooth' : 'Hard';
    break;
  }
  this.drawText(text, rect.x, rect.y, rect.width, 'right');
};

Window_GFD_Settings.prototype.layerText = function() {
  var layers = ['Lowest(0)', 'Lower(1)', 'Low(2)', 'Below Char(3)',
    'Under(4)', 'Same as Char(5)', 'Upper(6)', 'Above Char(7)', 'High(8)',
    'Higher(9)', 'Highest(10)'];
  var index = DoodadManager.layerList().indexOf(this._doodad.z);
  return layers[index];
};

Window_GFD_Settings.prototype.blendText = function() {
  var blends = DoodadManager.blendNames();
  var index = this._doodad.blend;
  return blends[index];
};

Window_GFD_Settings.prototype.revert = function() {
  DoodadManager.revertSettings(this._doodad, this._prevDoodad);
  DoodadManager.updateCurrentDoodad();
  DoodadManager.updateNewSettings();
  this.refresh();
};

DoodadManager.updateSettingsMode = function(code) {
  var win = SceneManager._scene._gfdSettingsWindow;
  if (!win.active) return;
  var doodad = win._doodad;
  var symbol = win.currentSymbol();
  var value = 1;
  if (Input.isPressed('shift')) value *= 10;
  if (code === 37) { // Left
    switch (symbol) {
    case 'delete':
    case 'revert':
    case 'accept':
    case 'none':
      return;
      break;
    case 'layer':
      if (this.layerList().indexOf(doodad.z) <= 0) return;
      var index = (this.layerList().indexOf(doodad.z) - 1).clamp(0, 10);
      doodad.z = this.layerList()[index];
      break;
    case 'hue':
      if (doodad.iconIndex > 0) return;
      if (doodad.hue <= 0) return;
      doodad.hue = (doodad.hue - value).clamp(0, 360);
      break;
    case 'opacity':
      if (doodad.opacity <= 0) return;
      doodad.opacity = (doodad.opacity - value).clamp(0, 255);
      break;
    case 'scaleX':
      if (doodad.scaleX <= -1000) return;
      value *= 5;
      if (Input.isPressed('shift')) value = 1;
      doodad.scaleX = (doodad.scaleX - value).clamp(-1000, 1000);
      break;
    case 'scaleY':
      if (doodad.scaleY <= -1000) return;
      value *= 5;
      if (Input.isPressed('shift')) value = 1;
      doodad.scaleY = (doodad.scaleY - value).clamp(-1000, 1000);
      break;
    case 'anchorX':
      if (doodad.anchorX <= 0) return;
      doodad.anchorX = (doodad.anchorX - 0.5).clamp(0, 1);
      break;
    case 'anchorY':
      if (doodad.anchorY <= 0) return;
      doodad.anchorY = (doodad.anchorY - 0.5).clamp(0, 1);
      break;
    case 'frameSpeed':
      if (!win.isAnimated()) return;
      doodad.frameUpdate = Math.max(1, doodad.frameUpdate - value);
      break;
    case 'blend':
      if (doodad.blend <= 0) return;
      doodad.blend = (doodad.blend - 1).clamp(0, 3);
      break;
    case 'smooth':
      doodad.smooth = !doodad.smooth;
      break;
    default:
      return this.inputLeft(doodad, symbol, value);
      break;
    }
  } else if (code === 39) { // Right
    switch (symbol) {
    case 'delete':
    case 'revert':
    case 'accept':
    case 'none':
      return;
      break;
    case 'layer':
      if (this.layerList().indexOf(doodad.z) >= 10) return;
      var index = (this.layerList().indexOf(doodad.z) + 1).clamp(0, 10);
      doodad.z = this.layerList()[index];
      break;
    case 'hue':
      if (doodad.iconIndex > 0) return;
      if (doodad.hue >= 360) return;
      doodad.hue = (doodad.hue + value).clamp(0, 360);
      break;
    case 'opacity':
      if (doodad.opacity >= 255) return;
      doodad.opacity = (doodad.opacity + value).clamp(0, 255);
      break;
    case 'scaleX':
      if (doodad.scaleX >= 1000) return;
      value *= 5;
      if (Input.isPressed('shift')) value = 1;
      doodad.scaleX = (doodad.scaleX + value).clamp(-1000, 1000);
      break;
    case 'scaleY':
      if (doodad.scaleY >= 1000) return;
      value *= 5;
      if (Input.isPressed('shift')) value = 1;
      doodad.scaleY = (doodad.scaleY + value).clamp(-1000, 1000);
      break;
    case 'anchorX':
      if (doodad.anchorX >= 1) return;
      doodad.anchorX = (doodad.anchorX + 0.5).clamp(0, 1);
      break;
    case 'anchorY':
      if (doodad.anchorY >= 1) return;
      doodad.anchorY = (doodad.anchorY + 0.5).clamp(0, 1);
      break;
    case 'frameSpeed':
      if (!win.isAnimated()) return;
      doodad.frameUpdate = Math.max(1, doodad.frameUpdate + value);
      break;
    case 'blend':
      if (doodad.blend >= 3) return;
      doodad.blend = (doodad.blend + 1).clamp(0, 3);
      break;
    case 'smooth':
      doodad.smooth = !doodad.smooth;
      break;
    default:
      return this.inputRight(doodad, symbol, value);
      break;
    }
  } else {
    return;
  }
  SoundManager.playCursor();
  win.refresh();
  this.updateNewSettings();
};

Window_GFD_Settings.prototype.addCustomCommands = function() {
};

DoodadManager.inputLeft = function(doodad, symbol, value) {
};

DoodadManager.inputRight = function(doodad, symbol, value) {
};

//=============================================================================
// Window_GFD_SettingsLayers
//=============================================================================

function Window_GFD_SettingsLayers() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsLayers.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsLayers.prototype.constructor = Window_GFD_SettingsLayers;

Window_GFD_SettingsLayers.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsLayers.prototype.windowWidth = function() {
  return 400;
};

Window_GFD_SettingsLayers.prototype.makeCommandList = function() {
  this.addCommand('10. Highest Layer', 'layer', true, 8);
  this.addCommand(' 9. Hgher Layer', 'layer', true, 7);
  this.addCommand(' 8. High Layer', 'layer', true, 6);
  this.addCommand(' 7. Above Characters', 'layer', true, 5);
  this.addCommand(' 6. Upper Layer', 'layer', true, 4);
  this.addCommand(' 5. Same as Characters', 'layer', true, 3);
  this.addCommand(' 4. Under Layer', 'layer', true, 2);
  this.addCommand(' 3. Below Characters', 'layer', true, 1);
  this.addCommand(' 2. Low Layer', 'layer', true, 0.2);
  this.addCommand(' 1. Lower Layer', 'layer', true, 0.1);
  this.addCommand(' 0. Lowest Layer', 'layer', true, 0);
};

//=============================================================================
// Window_GFD_SettingsHue
//=============================================================================

function Window_GFD_SettingsHue() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsHue.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsHue.prototype.constructor = Window_GFD_SettingsHue;

Window_GFD_SettingsHue.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsHue.prototype.windowWidth = function() {
  return this.lineHeight() * 6 + this.standardPadding() * 2;
};

Window_GFD_SettingsHue.prototype.maxCols = function() {
  return 6;
};

Window_GFD_SettingsHue.prototype.spacing = function() {
  return 0;
};

Window_GFD_SettingsHue.prototype.makeCommandList = function() {
  for (var i = 0; i < 36; ++i) {
    this.addCommand('', 'hue', true, i * 10);
  }
};

Window_GFD_SettingsHue.prototype.drawItem = function(index) {
  if (!this.doodad()) return;
  this.drawDoodadImage(index);
};

Window_GFD_SettingsHue.prototype.doodad = function() {
  return SceneManager._scene._gfdSettingsWindow._doodad;
};

Window_GFD_SettingsHue.prototype.drawDoodadImage = function(index) {
  var filename = this.doodad().bitmap;
  var path = this.doodad().folder + filename;
  var hue = this._list[index].ext;
  var bitmap = ImageManager.loadDoodad(path, hue, true);
  if (bitmap.width <= 0) {
    return setTimeout(this.drawDoodadImage.bind(this, index, filename), 5);
  }
  var rect = this.itemRect(index);
  var xframes = DoodadManager.getXFrames(filename);
  var yframes = DoodadManager.getYFrames(filename);
  var pw = Math.floor(bitmap.width / xframes);
  var ph = Math.floor(bitmap.height / yframes);
  var dw = pw;
  var dh = ph;
  if (dw > Window_Base._iconWidth) {
    var rate = Window_Base._iconWidth / dw;
    dw *= rate;
    dh *= rate;
  }
  if (dh > Window_Base._iconHeight) {
    var rate = Window_Base._iconHeight / dh;
    dw *= rate;
    dh *= rate;
  }
  var dx = rect.x + 2 + (Window_Base._iconWidth - dw) / 2;
  var dy = rect.y + 2 + (Window_Base._iconHeight - dh) / 2;
  this.contents.blt(bitmap, 0, 0, pw, ph, dx, dy, dw, dh);
};

//=============================================================================
// Window_GFD_SettingsOpacity
//=============================================================================

function Window_GFD_SettingsOpacity() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsOpacity.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsOpacity.prototype.constructor = Window_GFD_SettingsOpacity;

Window_GFD_SettingsOpacity.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsOpacity.prototype.makeCommandList = function() {
  this.addCommand('100%', 'opacity', true, Math.floor(255 * 1.00));
  this.addCommand(' 90%', 'opacity', true, Math.floor(255 * 0.90));
  this.addCommand(' 80%', 'opacity', true, Math.floor(255 * 0.80));
  this.addCommand(' 70%', 'opacity', true, Math.floor(255 * 0.70));
  this.addCommand(' 60%', 'opacity', true, Math.floor(255 * 0.60));
  this.addCommand(' 50%', 'opacity', true, Math.floor(255 * 0.50));
  this.addCommand(' 40%', 'opacity', true, Math.floor(255 * 0.40));
  this.addCommand(' 30%', 'opacity', true, Math.floor(255 * 0.30));
  this.addCommand(' 20%', 'opacity', true, Math.floor(255 * 0.20));
  this.addCommand(' 10%', 'opacity', true, Math.floor(255 * 0.10));
  this.addCommand('  0%', 'opacity', true, Math.floor(255 * 0.00));
};

Window_GFD_SettingsOpacity.prototype.drawItem = function(index) {
  Window_Command.prototype.drawItem.call(this, index);
  var rect = this.itemRectForText(index);
  var text = this._list[index].ext;
  this.drawText(text, rect.x, rect.y, rect.width, 'right');
};

//=============================================================================
// Window_GFD_SettingsScale
//=============================================================================

function Window_GFD_SettingsScale() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsScale.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsScale.prototype.constructor = Window_GFD_SettingsScale;

Window_GFD_SettingsScale.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsScale.prototype.makeCommandList = function() {
  this.addCommand(' 1000%', 'scale', true,  1000);
  this.addCommand('  800%', 'scale', true,   800);
  this.addCommand('  600%', 'scale', true,   600);
  this.addCommand('  400%', 'scale', true,   400);
  this.addCommand('  200%', 'scale', true,   200);
  this.addCommand('  100%', 'scale', true,   100);
  this.addCommand('   75%', 'scale', true,    75);
  this.addCommand('   50%', 'scale', true,    50);
  this.addCommand('   25%', 'scale', true,    25);
  this.addCommand('    0%', 'scale', true,     0);
  this.addCommand('  -25%', 'scale', true,   -25);
  this.addCommand('  -50%', 'scale', true,   -50);
  this.addCommand('  -75%', 'scale', true,   -75);
  this.addCommand(' -100%', 'scale', true,  -100);
  this.addCommand(' -200%', 'scale', true,  -200);
  this.addCommand(' -400%', 'scale', true,  -400);
  this.addCommand(' -600%', 'scale', true,  -600);
  this.addCommand(' -800%', 'scale', true,  -800);
  this.addCommand('-1000%', 'scale', true, -1000);
};

Window_GFD_SettingsScale.prototype.itemTextAlign = function() {
  return 'center';
};

//=============================================================================
// Window_GFD_SettingsAnchorX
//=============================================================================

function Window_GFD_SettingsAnchorX() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsAnchorX.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsAnchorX.prototype.constructor = Window_GFD_SettingsAnchorX;

Window_GFD_SettingsAnchorX.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsAnchorX.prototype.makeCommandList = function() {
  this.addCommand('Left', 'anchorX', true, 0);
  this.addCommand('Center', 'anchorX', true, 0.5);
  this.addCommand('Right', 'anchorX', true, 1);
};

Window_GFD_SettingsAnchorX.prototype.itemTextAlign = function() {
  return 'center';
};

//=============================================================================
// Window_GFD_SettingsAnchorY
//=============================================================================

function Window_GFD_SettingsAnchorY() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsAnchorY.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsAnchorY.prototype.constructor = Window_GFD_SettingsAnchorY;

Window_GFD_SettingsAnchorY.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsAnchorY.prototype.makeCommandList = function() {
  this.addCommand('Head', 'anchorY', true, 0);
  this.addCommand('Middle', 'anchorY', true, 0.5);
  this.addCommand('Base', 'anchorY', true, 1);
};

Window_GFD_SettingsAnchorY.prototype.itemTextAlign = function() {
  return 'center';
};

//=============================================================================
// Window_GFD_SettingsFrameSpeed
//=============================================================================

function Window_GFD_SettingsFrameSpeed() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsFrameSpeed.prototype =
  Object.create(Window_Command.prototype);
Window_GFD_SettingsFrameSpeed.prototype.constructor =
  Window_GFD_SettingsFrameSpeed;

Window_GFD_SettingsFrameSpeed.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsFrameSpeed.prototype.makeCommandList = function() {
  this.addCommand(' 1:Very Fast', 'frameUpdate', true, 1);
  this.addCommand(' 5:Faster', 'frameUpdate', true, 5);
  this.addCommand('10:Fast', 'frameUpdate', true, 10);
  this.addCommand('15:Quick', 'frameUpdate', true, 15);
  this.addCommand('20:Normal', 'frameUpdate', true, 20);
  this.addCommand('25:Average', 'frameUpdate', true, 25);
  this.addCommand('30:Slow', 'frameUpdate', true, 30);
  this.addCommand('35:Slower', 'frameUpdate', true, 35);
  this.addCommand('40:Very Slow', 'frameUpdate', true, 40);
  this.addCommand('45:Mega Slow', 'frameUpdate', true, 45);
  this.addCommand('50:Super Slow', 'frameUpdate', true, 50);
  this.addCommand('55:Ultra Slow', 'frameUpdate', true, 55);
  this.addCommand('60:Full Snail', 'frameUpdate', true, 60);
};

//=============================================================================
// Window_GFD_SettingsBlend
//=============================================================================

function Window_GFD_SettingsBlend() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsBlend.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsBlend.prototype.constructor = Window_GFD_SettingsBlend;

Window_GFD_SettingsBlend.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsBlend.prototype.makeCommandList = function() {
  var blends = DoodadManager.blendNames();
  this.addCommand(blends[0], 'blend', true, 0);
  this.addCommand(blends[1], 'blend', true, 1);
  this.addCommand(blends[2], 'blend', true, 2);
  this.addCommand(blends[3], 'blend', true, 3);
  return;
  this.addCommand(blends[4], 'blend', true, 4);
  this.addCommand(blends[5], 'blend', true, 5);
  this.addCommand(blends[6], 'blend', true, 6);
  this.addCommand(blends[7], 'blend', true, 7);
  this.addCommand(blends[8], 'blend', true, 8);
  this.addCommand(blends[9], 'blend', true, 9);
  this.addCommand(blends[10], 'blend', true, 10);
  this.addCommand(blends[11], 'blend', true, 11);
  this.addCommand(blends[12], 'blend', true, 12);
  this.addCommand(blends[13], 'blend', true, 13);
  this.addCommand(blends[14], 'blend', true, 14);
  this.addCommand(blends[15], 'blend', true, 15);
  this.addCommand(blends[16], 'blend', true, 16);
};

Window_GFD_SettingsBlend.prototype.itemTextAlign = function() {
  return 'center';
};

//=============================================================================
// Window_GFD_SettingsSmooth
//=============================================================================

function Window_GFD_SettingsSmooth() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsSmooth.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsSmooth.prototype.constructor = Window_GFD_SettingsSmooth;

Window_GFD_SettingsSmooth.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsSmooth.prototype.makeCommandList = function() {
  this.addCommand('Smooth', 'smooth', true, true);
  this.addCommand('Hard', 'smooth', true, false);
};

Window_GFD_SettingsSmooth.prototype.itemTextAlign = function() {
  return 'center';
};

//=============================================================================
// Window_GFD_GridMenu
//=============================================================================

function Window_GFD_GridMenu() {
  this.initialize.apply(this, arguments);
}

Window_GFD_GridMenu.prototype = Object.create(Window_Command.prototype);
Window_GFD_GridMenu.prototype.constructor = Window_GFD_GridMenu;

Window_GFD_GridMenu.prototype.initialize = function() {
  var x = (Graphics.boxWidth - this.windowWidth()) / 2;
  var y = (Graphics.boxHeight - this.fittingHeight(4)) / 2;
  Window_Command.prototype.initialize.call(this, x, y);
  this.setGFD();
};

Window_GFD_GridMenu.prototype.makeCommandList = function() {
  var enabled = DoodadManager._gridLockMode;
  if (enabled) {
    this.addCommand('Set Grid Free', 'toggleGrid');
  } else {
    this.addCommand('Set Grid Snap', 'toggleGrid');
  }
  this.addCommand('', 'none', false);
  this.addCommand('Width', 'gridX', enabled, DoodadManager.gridLockX());
  this.addCommand('Height', 'gridY', enabled, DoodadManager.gridLockY());
};

Window_GFD_GridMenu.prototype.drawItem = function(index) {
  Window_Command.prototype.drawItem.call(this, index);
  var symbol = this.commandSymbol(index);
  if (symbol === 'gridX' || symbol === 'gridY') {
    var rect = this.itemRectForText(index);
    var ext = Yanfly.Util.toGroup(this._list[index].ext);
    this.drawText(ext, rect.x, rect.y, rect.width, 'right');
  }
};

Window_GFD_GridMenu.prototype.update = function() {
  Window_Command.prototype.update.call(this);
  if (!this.active) return;
  this.updateLeftRight();
};

Window_GFD_GridMenu.prototype.updateLeftRight = function() {
  if (Input.isRepeated('left')) {
    var value = -1;
  } else if (Input.isRepeated('right')) {
    var value = 1;
  } else {
    return;
  }
  var symbol = this.commandSymbol(this.index());
  var changed = false;
  if (symbol === 'gridX') {
    DoodadManager._gridLockX = Math.max(1, DoodadManager._gridLockX + value);
    var changed = true;
  } else if (symbol === 'gridY') {
    DoodadManager._gridLockY = Math.max(1, DoodadManager._gridLockY + value);
    var changed = true;
  }
  if (changed) {
    SoundManager.playCursor();
    this.refresh();
  }
};

//=============================================================================
// Window_GFD_PickDoodadLayer
//=============================================================================

function Window_GFD_PickDoodadLayer() {
  this.initialize.apply(this, arguments);
}

Window_GFD_PickDoodadLayer.prototype = Object.create(Window_Command.prototype);
Window_GFD_PickDoodadLayer.prototype.constructor = Window_GFD_PickDoodadLayer;

Window_GFD_PickDoodadLayer.prototype.initialize = function() {
  this._doodads = $gameMap.doodads() || [];
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.setGFD();
};

Window_GFD_PickDoodadLayer.prototype.windowWidth = function() {
  return 400;
};

Window_GFD_PickDoodadLayer.prototype.windowHeight = function() {
  return Graphics.boxHeight;
};

Window_GFD_PickDoodadLayer.prototype.makeCommandList = function() {
  this.makeTotalNumbers();
  this.addCommand('Finish Edit', 'cancel', true);
  this.addCommand('', 'none', false);
  this.addCommand('All Doodads', 'edit', true, 100);
  this.addCommand('', 'none', false);
  this.addCommand('10. Highest Layer', 'edit', this._doodadsTotal[8], 8);
  this.addCommand(' 9. Hgher Layer', 'edit', this._doodadsTotal[7], 7);
  this.addCommand(' 8. High Layer', 'edit', this._doodadsTotal[6], 6);
  this.addCommand(' 7. Above Char', 'edit', this._doodadsTotal[5], 5);
  this.addCommand(' 6. Upper Layer', 'edit', this._doodadsTotal[4], 4);
  this.addCommand(' 5. Same as Char', 'edit', this._doodadsTotal[3], 3);
  this.addCommand(' 4. Under Layer', 'edit', this._doodadsTotal[2], 2);
  this.addCommand(' 3. Below Char', 'edit', this._doodadsTotal[1], 1);
  this.addCommand(' 2. Low Layer', 'edit', this._doodadsTotal[0.2], 0.2);
  this.addCommand(' 1. Lower Layer', 'edit', this._doodadsTotal[0.1], 0.1);
  this.addCommand(' 0. Lowest Layer', 'edit', this._doodadsTotal[0], 0);
};

Window_GFD_PickDoodadLayer.prototype.makeTotalNumbers = function() {
  this._doodads = $gameMap.doodads() || [];
  this._doodadsTotal = {};
  for (var n = 0; n < 11; ++n) {
    var layer = [8, 7, 6, 5, 4, 3, 2, 1, 0.2, 0.1, 0][n];
    var length = this._doodads.length;
    var total = 0;
    for (var i = 0; i < length; ++i) {
      var doodad = this._doodads[i];
      if (doodad && doodad.z === layer) total += 1;
    }
    this._doodadsTotal[layer] = total
  }
};

Window_GFD_PickDoodadLayer.prototype.drawItem = function(index) {
  Window_Command.prototype.drawItem.call(this, index);
  if (this.commandSymbol(index) !== 'edit') return;
  var ext = this._list[index].ext;
  if (ext >= 100) {
    var total = this._doodads.length;
  } else {
    var total = this._doodadsTotal[ext];
  }
  var rect = this.itemRectForText(index);
  var text = 'x' + Yanfly.Util.toGroup(total);
  this.drawText(text, rect.x, rect.y, rect.width, 'right');
};

//=============================================================================
// Window_GFD_PickDoodadList
//=============================================================================

function Window_GFD_PickDoodadList() {
  this.initialize.apply(this, arguments);
}

Window_GFD_PickDoodadList.prototype = Object.create(Window_Command.prototype);
Window_GFD_PickDoodadList.prototype.constructor = Window_GFD_PickDoodadList;

Window_GFD_PickDoodadList.prototype.initialize = function() {
  this._doodads = $gameMap.doodads() || [];
  this._layer = -1;
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.setGFD();
};

Window_GFD_PickDoodadList.prototype.windowWidth = function() {
  return 400;
};

Window_GFD_PickDoodadList.prototype.windowHeight = function() {
  return Graphics.boxHeight;
};

Window_GFD_PickDoodadList.prototype.setLayer = function(layer) {
  this._layer = layer;
  this.refresh();
  this.select(0);
};

Window_GFD_PickDoodadList.prototype.makeCommandList = function() {
  this._doodads = $gameMap.doodads() || [];
  this.addCommand('Return to Layer List', 'cancel');
  var length = this._doodads.length;
  for (var i = 0; i < length; ++i) {
    var doodad = this._doodads[i];
    if (!doodad) continue;
    if (doodad.z !== this._layer && this._layer !== 100) continue;
    var text = doodad.bitmap.replace(/\[(\d+)x(\d+)\]/g, '');
    this.addCommand(text, 'doodad', true, doodad);
  }
};

Window_GFD_PickDoodadList.prototype.drawItem = function(index) {
  if (this.commandSymbol(index) === 'doodad') {
    var doodad = this._list[index].ext;
    var rect = this.itemRect(index);
    if (doodad.iconIndex > 0) {
      this.drawIcon(doodad.iconIndex, rect.x + 2, rect.y + 2);
    } else {
      this.drawDoodadImage(index, doodad);
    }
    rect.x += Window_Base._iconWidth + 4;
    rect.width -= Window_Base._iconWidth + 4;
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width);
  } else {
    Window_Command.prototype.drawItem.call(this, index);
  }
};

Window_GFD_PickDoodadList.prototype.drawDoodadImage = function(index, data) {
  var folder = data.folder;
  var filename = data.bitmap;
  var hue = data.hue;
  var bitmap = ImageManager.loadDoodad(folder + filename, hue, true);
  if (bitmap.width <= 0) {
    return setTimeout(this.drawDoodadImage.bind(this, index, data), 5);
  }
  var rect = this.itemRect(index);
  var xframes = DoodadManager.getXFrames(filename);
  var yframes = DoodadManager.getYFrames(filename);
  var pw = Math.floor(bitmap.width / xframes);
  var ph = Math.floor(bitmap.height / yframes);
  var dw = pw;
  var dh = ph;
  if (dw > Window_Base._iconWidth) {
    var rate = Window_Base._iconWidth / dw;
    dw *= rate;
    dh *= rate;
  }
  if (dh > Window_Base._iconHeight) {
    var rate = Window_Base._iconHeight / dh;
    dw *= rate;
    dh *= rate;
  }
  var dx = rect.x + 2 + (Window_Base._iconWidth - dw) / 2;
  var dy = rect.y + 2 + (Window_Base._iconHeight - dh) / 2;
  this.contents.blt(bitmap, 0, 0, pw, ph, dx, dy, dw, dh);
};

Window_GFD_PickDoodadList.prototype.select = function(index) {
  Window_Command.prototype.select.call(this, index);
  if (!this.active) return;
  var ext = this.currentExt();
  if (ext) {
    $gameMap.centerScreenDoodad(ext);
    this.x = (ext.x > 400) ? 0 : Graphics.boxWidth - 400;
  } else {
    $gameMap.centerScreenPlayer();
  }
};

DoodadManager.updateEditMode = function(code) {
  var win = SceneManager._scene._gfdPickDoodadListWindow;
  if (!win.active) return;
  if (code === 8 || code === 46) {
    var doodad = win.currentExt();
    if (!doodad) return;
    this.delete(doodad);
    SoundManager.playUseSkill();
    win.refresh();
    var index = win.index();
    index = Math.min(index, win.maxItems() - 1);
    win.select(index);
  }
};

//=============================================================================
// Window_GFD_RegionOverlay
//=============================================================================

function Window_GFD_RegionOverlay() {
  this.initialize.apply(this, arguments);
}

Window_GFD_RegionOverlay.prototype = Object.create(Window_Base.prototype);
Window_GFD_RegionOverlay.prototype.constructor = Window_GFD_RegionOverlay;

Window_GFD_RegionOverlay.prototype.initialize = function() {
  var width = $gameMap.width() * $gameMap.tileWidth();
  var height = $gameMap.height() * $gameMap.tileHeight();
  this._mapWidth = $gameMap.width();
  this._mapHeight = $gameMap.width();
  this._tileWidth = $gameMap.tileWidth();
  this._tileHeight = $gameMap.tileHeight();
  this._pX = 0;
  this._pY = 0;
  Window_Base.prototype.initialize.call(this, 0, 0, width, height);
  this.opacity = 0;
  this.backOpacity = 0;
  this.z = 9000;
  this.contentsOpacity = 128
  this.refresh();
};

Window_GFD_RegionOverlay.prototype.standardPadding = function() {
  return 0;
};

Window_GFD_RegionOverlay.prototype.refresh = function() {
  this.contents.clear();
  for (var x = 0; x < this._mapWidth; ++x) {
    for (var y = 0; y < this._mapHeight; ++y) {
      if ($gameMap.regionId(x, y) > 0) this.drawRegion(x, y);
    }
  }
};

Window_GFD_RegionOverlay.prototype.drawRegion = function(x, y) {
  var regionId = $gameMap.regionId(x, y);
  var rect = this.regionRect(x, y);
  this.drawRegionColor(regionId, rect);
  this.contents.drawText(regionId, rect.x, rect.y, rect.width,
    rect.height, 'center');
};

Window_GFD_RegionOverlay.prototype.regionRect = function(dx, dy) {
  return {
    x: dx * this._tileWidth,
    y: dy * this._tileHeight,
    width: this._tileWidth,
    height: this._tileHeight
  }
};

Window_GFD_RegionOverlay.prototype.drawRegionColor = function(id, rect) {
  var color = '#ed145b';
  switch (id % 12) {
  case 0:
    color = '#ed145b';
    break;
  case 1:
    color = '#ed1c24';
    break;
  case 2:
    color = '#f7941d';
    break;
  case 3:
    color = '#fff200';
    break;
  case 4:
    color = '#a3d39c';
    break;
  case 5:
    color = '#00a651';
    break;
  case 6:
    color = '#00a99d';
    break;
  case 7:
    color = '#00bff3';
    break;
  case 8:
    color = '#0072bc';
    break;
  case 9:
    color = '#0054a6';
    break;
  case 10:
    color = '#a864a8';
    break;
  case 11:
    color = '#f06eaa';
    break;
  }
  this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
};

Window_GFD_RegionOverlay.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  if (!this.active) return;
  this.updatePosition();
};

Window_GFD_RegionOverlay.prototype.updatePosition = function() {
  this.x = this.screenX();
  this.y = this.screenY();
};

Window_GFD_RegionOverlay.prototype.screenX = function() {
  var value = this._pX;
  var display = $gameMap._displayX;
  value -= display * this._tileWidth;
  return Math.round(value);
};

Window_GFD_RegionOverlay.prototype.screenY = function() {
  var value = this._pY;
  var display = $gameMap._displayY;
  value -= display * this._tileHeight;
  return Math.round(value);
};

//=============================================================================
// Scene_Base
//=============================================================================

Scene_Base.prototype.isMap = function() {
  return false;
};

//=============================================================================
// Scene_Map
//=============================================================================

Scene_Map.prototype.isMap = function() {
  return true;
};

Yanfly.GFD.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
  Yanfly.GFD.Scene_Map_createAllWindows.call(this);
  this.createGFDWindows();
};

Yanfly.GFD.Scene_Map_updateScene = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {
  if ($gameTemp._modeGFD) return;
  Yanfly.GFD.Scene_Map_updateScene.call(this);
};

Scene_Map.prototype.toggleGFDWindows = function() {
  if ($gameTemp._modeGFD) {
    this.openGFDWindows();
  } else {
    this.closeGFDWindows();
  }
};

Yanfly.GFD.Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
Scene_Map.prototype.isMenuEnabled = function() {
  if ($gameTemp._modeGFD) return false;
  return Yanfly.GFD.Scene_Map_isMenuEnabled.call(this);
};

Yanfly.GFD.Scene_Map_isDebugCalled = Scene_Map.prototype.isDebugCalled;
Scene_Map.prototype.isDebugCalled = function() {
  if ($gameTemp._modeGFD) return false;
  return Yanfly.GFD.Scene_Map_isDebugCalled.call(this);
};

Scene_Map.prototype.createGFDWindows = function() {
  this._gfdWindows = [];
  this.createGFDMenuWindow();
  this.createGFDListWindow();
  this.createGFDIconWindow();
  this.createGFDCanvasWindow();
  this.createGFDSettingsWindow();
  this.createGFDSettingsSubwindows();
  this.createGFDGridMenuWindow();
  this.createGFDPickDoodadLayerWindow();
  this.createGFDPickDoodadListWindow();
};

Scene_Map.prototype.createGFDMenuWindow = function() {
  this._gfdMenuWindow = new Window_GFD_Menu();
  this.addChild(this._gfdMenuWindow);
  this._gfdWindows.push(this._gfdMenuWindow);
  var win = this._gfdMenuWindow;
  win.setHandler('cancel', this.cancelGFDWindows.bind(this));
  win.setHandler('edit', this.cmdGFDEditDoodads.bind(this));
  win.setHandler('place', this.cmdGFDMenuPlace.bind(this));
  win.setHandler('save', this.cmdGFDMenuSave.bind(this));
  win.setHandler('revert', this.cmdGFDMenuRevert.bind(this));
  win.setHandler('clear', this.cmdGFDMenuClear.bind(this));
  win.setHandler('regionOverlay', this.cmdGFDMenuRegionOverlay.bind(this));
};

Scene_Map.prototype.createGFDListWindow = function() {
  this._gfdListWindow = new Window_GFD_List();
  this.addChild(this._gfdListWindow);
  this._gfdWindows.push(this._gfdListWindow);
  var win = this._gfdListWindow;
  win.setHandler('cancel', this.cancelGFDList.bind(this));
  win.setHandler('folder', this.cmdGFDListFolder.bind(this));
  win.setHandler('iconSet', this.cmdGFDListIcons.bind(this));
  win.setHandler('file', this.cmdGFDListFile.bind(this));
};

Scene_Map.prototype.createGFDIconWindow = function() {
  this._gfdIconWindow = new Window_GFD_Icons();
  this.addChild(this._gfdIconWindow);
  this._gfdWindows.push(this._gfdIconWindow);
  var win = this._gfdIconWindow;
  win.setHandler('cancel', this.cancelGFDIcon.bind(this));
  win.setHandler('iconIndex', this.cmdGFDIconIndex.bind(this));
};

Scene_Map.prototype.createGFDCanvasWindow = function() {
  this._gfdCanvasWindow = new Window_GFD_Canvas();
  this.addChild(this._gfdCanvasWindow);
  this._gfdWindows.push(this._gfdCanvasWindow);
};

Scene_Map.prototype.createGFDSettingsWindow = function() {
  this._gfdSettingsWindow = new Window_GFD_Settings();
  this.addChild(this._gfdSettingsWindow);
  this._gfdWindows.push(this._gfdSettingsWindow);
  var win = this._gfdSettingsWindow;
  win.setHandler('cancel', this.cancelGFDSett.bind(this));
  win.setHandler('revert', this.cmdGFDSettingsRevert.bind(this));
  win.setHandler('accept', this.cmdGFDSettingsAccept.bind(this));
  win.setHandler('layer', this.cmdGFDSettingsLayer.bind(this));
  win.setHandler('hue', this.cmdGFDSettingsHue.bind(this));
  win.setHandler('opacity', this.cmdGFDSettingsOpacity.bind(this));
  win.setHandler('scaleX', this.cmdGFDSettingsScale.bind(this));
  win.setHandler('scaleY', this.cmdGFDSettingsScale.bind(this));
  win.setHandler('anchorX', this.cmdGFDSettingsAnchorX.bind(this));
  win.setHandler('anchorY', this.cmdGFDSettingsAnchorY.bind(this));
  win.setHandler('frameSpeed', this.cmdGFDSettingsFrameSpeed.bind(this));
  win.setHandler('blend', this.cmdGFDSettingsBlend.bind(this));
  win.setHandler('smooth', this.cmdGFDSettingsSmooth.bind(this));
  win.setHandler('delete', this.cmdGFDSettingsDelete.bind(this));
  win.setHandler('position', this.cmdGFDSettingsPosition.bind(this));
};

Scene_Map.prototype.createGFDSettingsSubwindows = function() {
  this.createGFDSettingsLayersWindow();
  this.createGFDSettingsHueWindow();
  this.createGFDSettingsOpacityWindow();
  this.createGFDSettingsScaleWindow();
  this.createGFDSettingsAnchorXWindow();
  this.createGFDSettingsAnchorYWindow();
  this.createGFDSettingsFrameSpeedWindow();
  this.createGFDSettingsBlendWindow();
  this.createGFDSettingsSmoothWindow();
};

Scene_Map.prototype.createGFDSettingsLayersWindow = function() {
  this._gfdSettingsLayersWindow = new Window_GFD_SettingsLayers();
  this.addChild(this._gfdSettingsLayersWindow);
  this._gfdWindows.push(this._gfdSettingsLayersWindow);
  var win = this._gfdSettingsLayersWindow;
  win.setHandler('cancel', this.cancelGFDSettLayer.bind(this));
  win.setHandler('layer', this.cmdGFDSettLayerOk.bind(this));
};

Scene_Map.prototype.createGFDSettingsHueWindow = function() {
  this._gfdSettingsHueWindow = new Window_GFD_SettingsHue();
  this.addChild(this._gfdSettingsHueWindow);
  this._gfdWindows.push(this._gfdSettingsHueWindow);
  var win = this._gfdSettingsHueWindow;
  win.setHandler('cancel', this.cancelGFDSettHue.bind(this));
  win.setHandler('hue', this.cmdGFDSettHueOk.bind(this));
};

Scene_Map.prototype.createGFDSettingsOpacityWindow = function() {
  this._gfdSettingsOpacityWindow = new Window_GFD_SettingsOpacity();
  this.addChild(this._gfdSettingsOpacityWindow);
  this._gfdWindows.push(this._gfdSettingsOpacityWindow);
  var win = this._gfdSettingsOpacityWindow;
  win.setHandler('cancel', this.cancelGFDSettOpacity.bind(this));
  win.setHandler('opacity', this.cmdGFDSettOpacityOk.bind(this));
};

Scene_Map.prototype.createGFDSettingsScaleWindow = function() {
  this._gfdSettingsScaleWindow = new Window_GFD_SettingsScale();
  this.addChild(this._gfdSettingsScaleWindow);
  this._gfdWindows.push(this._gfdSettingsScaleWindow);
  var win = this._gfdSettingsScaleWindow;
  win.setHandler('cancel', this.cancelGFDSettScale.bind(this));
  win.setHandler('scale', this.cmdGFDSettScaleOk.bind(this));
};

Scene_Map.prototype.createGFDSettingsAnchorXWindow = function() {
  this._gfdSettingsAnchorXWindow = new Window_GFD_SettingsAnchorX();
  this.addChild(this._gfdSettingsAnchorXWindow);
  this._gfdWindows.push(this._gfdSettingsAnchorXWindow);
  var win = this._gfdSettingsAnchorXWindow;
  win.setHandler('cancel', this.cancelGFDSettAnchorX.bind(this));
  win.setHandler('anchorX', this.cmdGFDSettAnchorXOk.bind(this));
};

Scene_Map.prototype.createGFDSettingsAnchorYWindow = function() {
  this._gfdSettingsAnchorYWindow = new Window_GFD_SettingsAnchorY();
  this.addChild(this._gfdSettingsAnchorYWindow);
  this._gfdWindows.push(this._gfdSettingsAnchorYWindow);
  var win = this._gfdSettingsAnchorYWindow;
  win.setHandler('cancel', this.cancelGFDSettAnchorY.bind(this));
  win.setHandler('anchorY', this.cmdGFDSettAnchorYOk.bind(this));
};

Scene_Map.prototype.createGFDSettingsFrameSpeedWindow = function() {
  this._gfdSettingsFrameSpeedWindow = new Window_GFD_SettingsFrameSpeed();
  this.addChild(this._gfdSettingsFrameSpeedWindow);
  this._gfdWindows.push(this._gfdSettingsFrameSpeedWindow);
  var win = this._gfdSettingsFrameSpeedWindow;
  win.setHandler('cancel', this.cancelGFDSettFrameSpeed.bind(this));
  win.setHandler('frameUpdate', this.cmdGFDSettFrameSpeedOk.bind(this));
};

Scene_Map.prototype.createGFDSettingsBlendWindow = function() {
  this._gfdSettingsBlendWindow = new Window_GFD_SettingsBlend();
  this.addChild(this._gfdSettingsBlendWindow);
  this._gfdWindows.push(this._gfdSettingsBlendWindow);
  var win = this._gfdSettingsBlendWindow;
  win.setHandler('cancel', this.cancelGFDSettBlend.bind(this));
  win.setHandler('blend', this.cmdGFDSettBlendOk.bind(this));
};

Scene_Map.prototype.createGFDSettingsSmoothWindow = function() {
  this._gfdSettingsSmoothWindow = new Window_GFD_SettingsSmooth();
  this.addChild(this._gfdSettingsSmoothWindow);
  this._gfdWindows.push(this._gfdSettingsSmoothWindow);
  var win = this._gfdSettingsSmoothWindow;
  win.setHandler('cancel', this.cancelGFDSettSmooth.bind(this));
  win.setHandler('smooth', this.cmdGFDSettSmoothOk.bind(this));
};

Scene_Map.prototype.createGFDGridMenuWindow = function() {
  this._gfdGridMenuWindow = new Window_GFD_GridMenu();
  this.addChild(this._gfdGridMenuWindow);
  this._gfdWindows.push(this._gfdGridMenuWindow);
  var win = this._gfdGridMenuWindow;
  win.setHandler('cancel', this.cancelGFDGridMenu.bind(this));
  win.setHandler('toggleGrid', this.cmdGFDGridMenuToggleGrid.bind(this));
};

Scene_Map.prototype.createGFDPickDoodadLayerWindow = function() {
  this._gfdPickDoodadLayerWindow = new Window_GFD_PickDoodadLayer();
  this.addChild(this._gfdPickDoodadLayerWindow);
  this._gfdWindows.push(this._gfdPickDoodadLayerWindow);
  var win = this._gfdPickDoodadLayerWindow;
  win.setHandler('cancel', this.cancelGFDPickDoodadLayer.bind(this));
  win.setHandler('edit', this.openGFDPickDoodadList.bind(this));
};

Scene_Map.prototype.createGFDPickDoodadListWindow = function() {
  this._gfdPickDoodadListWindow = new Window_GFD_PickDoodadList();
  this.addChild(this._gfdPickDoodadListWindow);
  this._gfdWindows.push(this._gfdPickDoodadListWindow);
  var win = this._gfdPickDoodadListWindow;
  win.setHandler('cancel', this.cancelGFDPickDoodadList.bind(this));
  win.setHandler('doodad', this.cmdGFDDoodadListSelect.bind(this));
};

Scene_Map.prototype.openGFDWindows = function() {
  $gameTemp._prevDoodadSettings = JsonEx.makeDeepCopy($dataDoodads);
  this._gfdMenuWindow.activate();
  this._gfdMenuWindow.open();
  this._gfdMenuWindow.select(0);
  this._gfdMenuWindow.refresh();
};

Scene_Map.prototype.cancelGFDWindows = function() {
  this._gfdMenuWindow.activate();
  if (this._gfdMenuWindow.currentSymbol() === 'revert') {
    this.cmdGFDMenuRevert();
  } else {
    this._gfdMenuWindow.selectSymbol('revert');
  }
};

Scene_Map.prototype.closeGFDMode = function() {
  $gameTemp._modeGFD = false;
  this.closeGFDWindows();
  $gamePlayer.center($gamePlayer.x, $gamePlayer.y);
  DoodadManager.refresh();
  this._spriteset.closeRegionOverlayWindow();
};

Scene_Map.prototype.closeGFDWindows = function() {
  var length = this._gfdWindows.length;
  for (var i = 0; i < length; ++i) {
    var win = this._gfdWindows[i];
    if (!win) continue;
    win.deactivate();
    win.close();
  }
};

Scene_Map.prototype.cmdGFDMenuPlace = function() {
  this._gfdMenuWindow.close();
  this._gfdListWindow.open();
  this._gfdListWindow.activate();
  this._gfdListWindow.refresh();
  this._gfdListWindow.select(0);
};

Scene_Map.prototype.cmdGFDMenuSave = function() {
  StorageManager.saveDoodadSettings();
  $gameTemp._prevDoodadSettings = JsonEx.makeDeepCopy($dataDoodads);
  SoundManager.playSave();
  this.closeGFDMode();
};

Scene_Map.prototype.cmdGFDMenuRevert = function() {
  $dataDoodads = JsonEx.makeDeepCopy($gameTemp._prevDoodadSettings);

  this.closeGFDMode();
};

Scene_Map.prototype.cmdGFDMenuClear = function() {
  DoodadManager.clearMap();
  this._gfdMenuWindow.refresh();
  this._gfdMenuWindow.activate();
};

Scene_Map.prototype.cmdGFDMenuRegionOverlay = function() {
  this._gfdMenuWindow.activate();
  this._spriteset.toggleRegionOverlayWindow();
};

Scene_Map.prototype.cancelGFDList = function() {
  if (this._gfdListWindow.folder().length <= 0) {
    this._gfdListWindow.close();
    this._gfdMenuWindow.open();
    this._gfdMenuWindow.activate();
    this._gfdMenuWindow.refresh();
    this._gfdMenuWindow.select(0);
  } else {
    this._gfdListWindow.activate();
    var folder = this._gfdListWindow.deleteFolder();
    this._gfdListWindow.refresh();
    this._gfdListWindow.selectExt(folder);
  }
};

Scene_Map.prototype.cmdGFDListFolder = function() {
  var folder = this._gfdListWindow.currentExt();
  this._gfdListWindow.addFolder(folder);
  this._gfdListWindow.activate();
  this._gfdListWindow.refresh();
  this._gfdListWindow.select(0);
};

Scene_Map.prototype.cmdGFDListIcons = function() {
  this._gfdListWindow.close();
  this._gfdIconWindow.open();
  this._gfdIconWindow.activate();
  this._gfdIconWindow.select(0);
};

Scene_Map.prototype.cancelGFDIcon = function() {
  this._gfdIconWindow.close();
  this._gfdListWindow.open();
  this._gfdListWindow.activate();
  this._gfdListWindow.refresh();
  this._gfdListWindow.select(0);
};

Scene_Map.prototype.cmdGFDIconIndex = function() {
  this._gfdIconWindow.close();
  this._currentDoodad = DoodadManager.getTemplate('', 'IconSet');
  this._currentDoodad.iconIndex = this._gfdIconWindow.index();
  this.enterDoodadPlacingMode();
};

Scene_Map.prototype.cmdGFDListFile = function() {
  this._gfdListWindow.close();
  var path = this._gfdListWindow.folderPath();
  var name = this._gfdListWindow.currentExt();
  this._currentDoodad = DoodadManager.getTemplate(path, name);
  this._currentDoodad.xFrames = DoodadManager.getXFrames(name);
  this._currentDoodad.yFrames = DoodadManager.getYFrames(name);
  this.enterDoodadPlacingMode();
};

Scene_Map.prototype.enterDoodadPlacingMode = function() {
  DoodadManager.setCanvasMode(true);
  this._spriteset.setDoodadCursor(this._currentDoodad);
  this._gfdCanvasWindow.open();
  this._gfdCanvasWindow.show();
  this._gfdCanvasWindow.activate();
  this._gfdCanvasWindow.refresh();
};

Scene_Map.prototype.exitDoodadPlacingMode = function() {
  DoodadManager.setCanvasMode(false);
  this._gfdCanvasWindow.close();
  this._gfdCanvasWindow.hide();
  this._gfdCanvasWindow.deactivate();
  if (DoodadManager._settingsMode && DoodadManager._editMode) {
    this._gfdSettingsWindow.open();
    this._gfdSettingsWindow.activate();
    this._gfdSettingsWindow.refresh();
  } else if (this._currentDoodad.iconIndex <= 0) {
    this._gfdListWindow.open();
    this._gfdListWindow.activate();
  } else {
    this._gfdIconWindow.open();
    this._gfdIconWindow.activate();
  }
  this._spriteset.clearDoodadCursor();
};

Scene_Map.prototype.openGFDDoodadSettings = function(doodad) {
  this._gfdSettingsWindow.setDoodad(doodad);
  this._gfdSettingsWindow.open();
  this._gfdSettingsWindow.activate();
  this._gfdSettingsWindow.selectSymbol('accept');
  DoodadManager.setSettingsMode(true);
  this._gfdCanvasWindow.hide();
  this._gfdCanvasWindow.deactivate();
};

Scene_Map.prototype.cancelGFDSett = function() {
  this._gfdSettingsWindow.activate();
  if (this._gfdSettingsWindow.currentSymbol() === 'revert') {
    this._gfdSettingsWindow.revert();
    this.cmdGFDSettingsAccept();
  } else {
    this._gfdSettingsWindow.selectSymbol('revert');
  }
};

Scene_Map.prototype.cmdGFDSettingsRevert = function() {
  this._gfdSettingsWindow.revert();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettingsAccept = function() {
  DoodadManager.setSettingsMode(false);
  this._gfdSettingsWindow.close();
  if (DoodadManager._canvasMode) {
    this._gfdCanvasWindow.show();
    this._gfdCanvasWindow.activate();
  } else if (DoodadManager._editMode) {
    this._gfdPickDoodadListWindow.open();
    this._gfdPickDoodadListWindow.refresh();
    this._gfdPickDoodadListWindow.activate();
    var index = this._gfdPickDoodadListWindow.index();
    index = Math.min(index, this._gfdPickDoodadListWindow.maxItems() - 1);
    this._gfdPickDoodadListWindow.select(index);
  }
};

Scene_Map.prototype.cmdGFDSettingsLayer = function() {
  this._gfdSettingsLayersWindow.activate();
  this._gfdSettingsLayersWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  var layer = doodad.z;
  this._gfdSettingsLayersWindow.selectExt(layer);
};

Scene_Map.prototype.cancelGFDSettLayer = function() {
  this._gfdSettingsLayersWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettLayerOk = function() {
  var ext = this._gfdSettingsLayersWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.z = ext;
  DoodadManager.updateNewSettings();
  this.cancelGFDSettLayer();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettingsHue = function() {
  this._gfdSettingsHueWindow.activate();
  this._gfdSettingsHueWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  var hue = Math.floor(doodad.hue / 10) * 10;
  this._gfdSettingsHueWindow.selectExt(hue);
  this._gfdSettingsHueWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettHue = function() {
  this._gfdSettingsHueWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettHueOk = function() {
  var ext = this._gfdSettingsHueWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.hue = ext;
  DoodadManager.updateNewSettings();
  this.cancelGFDSettHue();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettingsOpacity = function() {
  this._gfdSettingsOpacityWindow.activate();
  this._gfdSettingsOpacityWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  var index = 0;
  for (var i = 0; i < this._gfdSettingsOpacityWindow.maxItems(); ++i) {
    var ext = this._gfdSettingsOpacityWindow._list[i].ext;
    if (doodad.opacity <= ext) index = i;
  }
  this._gfdSettingsOpacityWindow.select(index);
  this._gfdSettingsOpacityWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettOpacity = function() {
  this._gfdSettingsOpacityWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettOpacityOk = function() {
  var ext = this._gfdSettingsOpacityWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.opacity = ext;
  DoodadManager.updateNewSettings();
  this.cancelGFDSettOpacity();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettingsScale = function() {
  this._gfdSettingsScaleWindow.activate();
  this._gfdSettingsScaleWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  if (this._gfdSettingsWindow.currentSymbol() === 'scaleX') {
    var value = doodad.scaleX;
  } else {
    var value = doodad.scaleY;
  }
  var index = 0;
  for (var i = 0; i < this._gfdSettingsScaleWindow.maxItems(); ++i) {
    var ext = this._gfdSettingsScaleWindow._list[i].ext;
    if (value <= ext) index = i;
  }
  this._gfdSettingsScaleWindow.select(index);
  this._gfdSettingsScaleWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettScale = function() {
  this._gfdSettingsScaleWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettScaleOk = function() {
  var ext = this._gfdSettingsScaleWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  if (this._gfdSettingsWindow.currentSymbol() === 'scaleX') {
    doodad.scaleX = ext;
  } else {
    doodad.scaleY = ext;
  }
  DoodadManager.updateNewSettings();
  this.cancelGFDSettScale();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettingsAnchorX = function() {
  this._gfdSettingsAnchorXWindow.activate();
  this._gfdSettingsAnchorXWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  this._gfdSettingsAnchorXWindow.selectExt(doodad.anchorX);
  this._gfdSettingsAnchorXWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettAnchorX = function() {
  this._gfdSettingsAnchorXWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettAnchorXOk = function() {
  var ext = this._gfdSettingsAnchorXWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.anchorX = ext;
  DoodadManager.updateNewSettings();
  this.cancelGFDSettAnchorX();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettingsAnchorY = function() {
  this._gfdSettingsAnchorYWindow.activate();
  this._gfdSettingsAnchorYWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  this._gfdSettingsAnchorYWindow.selectExt(doodad.anchorY);
  this._gfdSettingsAnchorYWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettAnchorY = function() {
  this._gfdSettingsAnchorYWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettAnchorYOk = function() {
  var ext = this._gfdSettingsAnchorYWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.anchorY = ext;
  DoodadManager.updateNewSettings();
  this.cancelGFDSettAnchorY();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettingsFrameSpeed = function() {
  this._gfdSettingsFrameSpeedWindow.activate();
  this._gfdSettingsFrameSpeedWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  var index = 0;
  for (var i = 0; i < this._gfdSettingsFrameSpeedWindow.maxItems(); ++i) {
    var ext = this._gfdSettingsFrameSpeedWindow._list[i].ext;
    if (doodad.frameUpdate >= ext) index = i;
  }
  this._gfdSettingsFrameSpeedWindow.select(index);
  this._gfdSettingsFrameSpeedWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettFrameSpeed = function() {
  this._gfdSettingsFrameSpeedWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettFrameSpeedOk = function() {
  var ext = this._gfdSettingsFrameSpeedWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.frameUpdate = ext;
  DoodadManager.updateNewSettings();
  this.cancelGFDSettFrameSpeed();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettingsBlend = function() {
  this._gfdSettingsBlendWindow.activate();
  this._gfdSettingsBlendWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  this._gfdSettingsBlendWindow.selectExt(doodad.blend);
  this._gfdSettingsBlendWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettBlend = function() {
  this._gfdSettingsBlendWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettBlendOk = function() {
  var ext = this._gfdSettingsBlendWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.blend = ext;
  DoodadManager.updateNewSettings();
  this.cancelGFDSettBlend();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettingsSmooth = function() {
  this._gfdSettingsSmoothWindow.activate();
  this._gfdSettingsSmoothWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  this._gfdSettingsSmoothWindow.selectExt(doodad.smooth);
  this._gfdSettingsSmoothWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettSmooth = function() {
  this._gfdSettingsSmoothWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettSmoothOk = function() {
  var ext = this._gfdSettingsSmoothWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.smooth = ext;
  DoodadManager.updateNewSettings();
  this.cancelGFDSettSmooth();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.openGFDGridMenuWindow = function() {
  this._gfdCanvasWindow.hide();
  this._gfdCanvasWindow.deactivate();
  this._gfdGridMenuWindow.open();
  this._gfdGridMenuWindow.refresh();
  this._gfdGridMenuWindow.activate();
  this._gfdGridMenuWindow.select(0);
};

Scene_Map.prototype.cancelGFDGridMenu = function() {
  this._gfdCanvasWindow.show();
  this._gfdCanvasWindow.activate();
  this._gfdGridMenuWindow.close();
};

Scene_Map.prototype.cmdGFDGridMenuToggleGrid = function() {
  DoodadManager.setGridLockMode(!DoodadManager._gridLockMode);
  this._gfdGridMenuWindow.activate();
  this._gfdGridMenuWindow.refresh();
};

Scene_Map.prototype.cmdGFDEditDoodads = function() {
  this._gfdMenuWindow.close();
  this._gfdPickDoodadLayerWindow.activate();
  this._gfdPickDoodadLayerWindow.open();
  this._gfdPickDoodadLayerWindow.refresh();
  this._gfdPickDoodadLayerWindow.select(0);
};

Scene_Map.prototype.cancelGFDPickDoodadLayer = function() {
  this._gfdMenuWindow.activate();
  this._gfdMenuWindow.open();
  this._gfdMenuWindow.refresh();
  this._gfdPickDoodadLayerWindow.close();
};

Scene_Map.prototype.openGFDPickDoodadList = function() {
  DoodadManager.setEditMode(true);
  var ext = this._gfdPickDoodadLayerWindow.currentExt();
  this._gfdPickDoodadListWindow.activate();
  this._gfdPickDoodadListWindow.open();
  this._gfdPickDoodadListWindow.setLayer(ext);
  this._gfdPickDoodadLayerWindow.close();
};

Scene_Map.prototype.cancelGFDPickDoodadList = function() {
  DoodadManager.setEditMode(false);
  this._gfdPickDoodadLayerWindow.activate();
  this._gfdPickDoodadLayerWindow.open();
  this._gfdPickDoodadLayerWindow.refresh();
  this._gfdPickDoodadListWindow.close();
  $gameMap.centerScreenPlayer();
};

Scene_Map.prototype.cmdGFDDoodadListSelect = function() {
  this._gfdPickDoodadListWindow.close();
  var doodad = this._gfdPickDoodadListWindow.currentExt();
  this.openGFDDoodadSettings(doodad);
};

Scene_Map.prototype.cmdGFDSettingsDelete = function() {
  var doodad = this._gfdSettingsWindow._doodad;
  DoodadManager.delete(doodad);
  SoundManager.playUseSkill();
  this.cmdGFDSettingsAccept();
};

Scene_Map.prototype.cmdGFDSettingsPosition = function() {
  this._currentDoodad = this._gfdSettingsWindow._doodad;
  this.enterDoodadPlacingMode();
  this._gfdSettingsWindow.close();
};

//=============================================================================
// End of Play Test Only
//=============================================================================

}; // Play Test Only

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
} else { // (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.3.0")

var text = '';
text += 'You are getting this error because you are trying to run Grid-Free ';
text += 'Doodads while your project files are lower than version 1.3.0. \n\n';
text += 'Please visit this thread for instructions on how to update your ';
text += 'project files to 1.3.0 or higher: \n\n';
text += 'http://forums.rpgmakerweb.com/index.php?/topic/';
text += '66712-rpg-maker-mv-v131-fixes/';
console.log(text);
require('nw.gui').Window.get().showDevTools();

};