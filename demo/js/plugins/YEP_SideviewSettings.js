//=============================================================================
// Yanfly Engine Plugins - Sideview Settings
// YEP_SideviewSettings.js
// Last Updated: 2015.06.25
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_SideviewSettings"] = true;

//=============================================================================
 /*:
 * @plugindesc Change the settings for sideview battlers.
 * @author Yanfly Engine Plugins
 *
 * @param Default X Anchor
 * @desc Default value used for your sprites's X Anchor.            .
 * Default: 0.5
 * @default 0.5
 *
 * @param Default Y Anchor
 * @desc Default value used for your sprites's Y Anchor.            .
 * Default: 1.0
 * @default 1.0
 *
 * @help
 *                                                                  .
 *
 * ChangeLog:
 *   2015.07.10 - Completed.
 */
//=============================================================================

(function() {

var parameters = PluginManager.parameters('YEP_SideviewSettings');

//=============================================================================
// DataManager
//=============================================================================

var _YEP_SVS_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_SVS_Scene_Boot_start.call(this);
	DataManager.processSVSNotetags($dataActors);
};

var _yep_svs_anchorX = Number(parameters['Default X Anchor'] || 0.5);
var _yep_svs_anchorY = Number(parameters['Default Y Anchor'] || 1.0);
DataManager.processSVSNotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.anchorX = _yep_svs_anchorX;
    obj.anchorY = _yep_svs_anchorY;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:ANCHOR_X|anchor x):[ ](\d+)[.](\d+)>/i)) {
				obj.anchorX = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
			} else if (line.match(/<(?:ANCHOR_Y|anchor Y):[ ](\d+)[.](\d+)>/i)) {
				obj.anchorY = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
			}
		}
	}
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.anchorX = function() {
    return _yep_svs_anchorX;
};

Game_Battler.prototype.anchorY = function() {
    return _yep_svs_anchorY;
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Actor.prototype.anchorX = function() {
    return this.actor().anchorX;
};

Game_Actor.prototype.anchorY = function() {
    return this.actor().anchorY;
};

//=============================================================================
// Sprite_Actor
//=============================================================================

var _YEP_SVS_Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
Sprite_Actor.prototype.updateBitmap = function() {
    var name = this._actor.battlerName();
    var needUpdate = false;
    if (this._battlerName !== name) needUpdate = true;
    _YEP_SVS_Sprite_Actor_updateBitmap.call(this);
    if (needUpdate) this.adjustAnchor();
};

Sprite_Actor.prototype.adjustAnchor = function() {
    this._mainSprite.anchor.x = this._actor.anchorX();
    this._mainSprite.anchor.y = this._actor.anchorY();
};

})();

//=============================================================================
// End of File
//=============================================================================
