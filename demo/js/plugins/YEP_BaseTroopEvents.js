//=============================================================================
// Yanfly Engine Plugins - Base Troop Events
// YEP_BaseTroopEvents.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BaseTroopEvents = true;

var Yanfly = Yanfly || {};
Yanfly.BTE = Yanfly.BTE || {};

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
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BaseTroopEvents');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BaseTroopID = Number(Yanfly.Parameters['Base Troop ID']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.BTE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.BTE.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processBTEPages();
		return true;
};

DataManager.processBTEPages = function() {
	for (var n = 1; n < $dataTroops.length; n++) {
		var base_troop = $dataTroops[Yanfly.Param.BaseTroopID];
		var troop = $dataTroops[n];
		if (n !== Yanfly.Param.BaseTroopID && Yanfly.Param.BaseTroopID > 0) {
			troop.pages.extend(base_troop.pages);
		}
	}
};

//=============================================================================
// New Function
//=============================================================================

Array.prototype.extend = function (other_array) {
    other_array.forEach(function(v) {this.push(v)}, this);
}

//=============================================================================
// End of File
//=============================================================================
