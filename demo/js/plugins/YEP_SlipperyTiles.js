//=============================================================================
// Yanfly Engine Plugins - Slippery Tiles
// YEP_SlipperyTiles.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SlipperyTiles = true;

var Yanfly = Yanfly || {};
Yanfly.Slip = Yanfly.Slip || {};

//=============================================================================
 /*:
 * @plugindesc You can create slippery tiles by marking them with either a
 * terrain tag or a region number.
 * @author Yanfly Engine Plugins
 *
 * @param Slippery Frame
 * @desc This is the frame used while characters are sliding.
 * @default 2
 *
 * @param Slippery Region
 * @desc Any tile marked with this region is a slippery tile
 * regardless of terrain tag. Use 0 to ignore.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction                                                     .
 * ============================================================================
 *
 * This plugin enables you to set which tiles are slippery tiles through either
 * regions or notetags. To use regions, change the parameter setting to which
 * region ID you would like to associate with a slippery tile.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Tileset Notetag:
 *   <Slippery Tile: x>
 *   <Slippery Tile: x, x, x>
 *   Tiles with terrain ID x will be designated as slippery tiles.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SlipperyTiles');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SlipRegion = Number(Yanfly.Parameters['Slippery Region']);
Yanfly.Param.SlipFrame = Number(Yanfly.Parameters['Slippery Frame']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Slip.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.Slip.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processSlipNotetags($dataTilesets);
		return true;
};

DataManager.processSlipNotetags = function(group) {
  var regexp1 = /<(?:SLIPPERY|slippery tile):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.slippery = [];

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(regexp1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.slippery = obj.slippery.concat(array);
      }
		}
	}
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.isSlippery = function(mx, my) {
    if (this.isValid(mx, my)) {
      if (Yanfly.Param.SlipRegion !== 0 &&
        this.regionId(mx, my) === Yanfly.Param.SlipRegion) return true;
      var tagId = this.terrainTag(mx, my);
      var slipTiles = this.tileset().slippery;
      return slipTiles.contains(tagId);
    }
    return false;
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Game_CharacterBase.prototype.onSlipperyFloor = function() {
    return $gameMap.isSlippery(this._x, this._y);
};

Game_CharacterBase.prototype.slipperyPose = function() {
    if (!this.onSlipperyFloor()) return false;
    if (this._stepAnime) return false;
    return true;
};

Yanfly.Slip.Game_CharacterBase_pattern = Game_CharacterBase.prototype.pattern;
Game_CharacterBase.prototype.pattern = function() {
    if (this.slipperyPose()) return Yanfly.Param.SlipFrame;
    return Yanfly.Slip.Game_CharacterBase_pattern.call(this);
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.Slip.Game_Player_isDashing = Game_Player.prototype.isDashing;
Game_Player.prototype.isDashing = function() {
    if (this.onSlipperyFloor()) return false;
    return Yanfly.Slip.Game_Player_isDashing.call(this);
};

Yanfly.Slip.Game_Player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    Yanfly.Slip.Game_Player_update.call(this, sceneActive);
    this.updateSlippery();
};

Game_Player.prototype.updateSlippery = function() {
    if ($gameMap.isEventRunning()) return;
    if (this.onSlipperyFloor() && !this.isMoving()) {
      $gameTemp.clearDestination();
			this.moveStraight(this._direction);
    }
};

//=============================================================================
// End of File
//=============================================================================
