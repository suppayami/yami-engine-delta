//=============================================================================
// Yanfly Engine Plugins - Base Troop Events
// YEP_BaseTroopEvents.js
// Last Updated: 2015.07.10
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_BaseTroopEvents"] = true;

//=============================================================================
/*:
 * @plugindesc Enabling this plugin will cause all troops to have events
 * occur in every fight.
 * @author Yanfly Engine Plugins
 *
 * @param Base Troop ID
 * @desc Change this value to the Troop ID you want all of the recurring
 * troop events to draw from.
 * @default 1
 *
 * @help
 * For all the eventers out there who love to customize their battles through
 * custom event pages, you can now save yourself some time by drawing all the
 * event pages from a base troop event to occur in every fight. All of the
 * events will be present in every single battle.
 *
 * ChangeLog:
 *   2015.07.10 - Completed.
 */
//=============================================================================

Array.prototype.extend = function (other_array) {
    other_array.forEach(function(v) {this.push(v)}, this);
}

//=============================================================================
// DataManager
//=============================================================================

var _YEP_BTE_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_BTE_Scene_Boot_start.call(this);
	DataManager.processBTEPages();
};

var parameters = PluginManager.parameters('YEP_BaseTroopEvents');
var _yep_BaseTroopID = Number(parameters['Base Troop ID'] || '1');

DataManager.processBTEPages = function() {
	for (var n = 1; n < $dataTroops.length; n++) {
		var base_troop = $dataTroops[_yep_BaseTroopID];
		var troop = $dataTroops[n];
		if (n !== _yep_BaseTroopID && _yep_BaseTroopID > 0) {
			troop.pages.extend(base_troop.pages);
		}
	}
};

//=============================================================================
// End of File
//=============================================================================
