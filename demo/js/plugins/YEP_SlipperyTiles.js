//=============================================================================
// Yanfly Engine Plugins - Slippery Tiles
// YEP_SlipperyTiles.js
// Last Updated: 2015.07.16
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_SlipperyTiles"] = true;

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
 * @default 248
 *
 * @help
 *                                                                  .
 *
 * ChangeLog:
 *   2015.07.16 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_SlipperyTiles');

//=============================================================================
// DataManager
//=============================================================================

var _YEP_Slip_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_Slip_Scene_Boot_start.call(this);
	DataManager.processSlipNotetags($dataTilesets);
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

var _yep_slip_slipRegion = Number(parameters['Slippery Region'] || 248);
Game_Map.prototype.isSlippery = function(mx, my) {
    if (this.isValid(mx, my)) {
      if (_yep_slip_slipRegion !== 0 &&
        this.regionId(mx, my) === _yep_slip_slipRegion) return true;
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

var _YEP_Slip_Game_CharacterBase_pattern = Game_CharacterBase.prototype.pattern;
var _yep_slip_slipFrame = Number(parameters['Slippery Frame'] || 2);
Game_CharacterBase.prototype.pattern = function() {
    if (this.slipperyPose()) return _yep_slip_slipFrame;
    return _YEP_Slip_Game_CharacterBase_pattern.call(this);
};

//=============================================================================
// Game_Player
//=============================================================================

var _YEP_Slip_Game_Player_isDashing = Game_Player.prototype.isDashing;
Game_Player.prototype.isDashing = function() {
    if (this.onSlipperyFloor()) return false;
    return _YEP_Slip_Game_Player_isDashing.call(this);
};

var _YEP_Slip_Game_Player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    _YEP_Slip_Game_Player_update.call(this, sceneActive);
    this.updateSlippery();
};

Game_Player.prototype.updateSlippery = function() {
    if ($gameMap.isEventRunning()) return;
    if (this.onSlipperyFloor() && !this.isMoving()) {
      this.moveStraight(this._direction);
    }
};

//=============================================================================
// End of File
//=============================================================================
