//=============================================================================
// Yanfly Engine Plugins - Button Events
// YEP_ButtonEvents.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ButtonEvents = true;

var Yanfly = Yanfly || {};
Yanfly.BEV = Yanfly.BEV || {};

//=============================================================================
 /*:
 * @plugindesc This lets you assign common events to your buttons
 * to be called when pressed on the field map.
 * @author Yanfly Engine Plugins
 *
 * @param OK Event
 * @desc By default, this is the Z, Enter, and Space buttons.
 * Use 0 for no event.
 * @default 0
 *
 * @param Cancel Event
 * @desc By default, this is the X, Escape, and Numpad 0 buttons.
 * Disable Menu Access to use this. Use 0 for no event.
 * @default 0
 *
 * @param Up Event
 * @desc By default, this is the Up and Numpad 8 buttons.
 * Use 0 for no event.
 * @default 0
 *
 * @param Right Event
 * @desc By default, this is the Right and Numpad 6 buttons.
 * Use 0 for no event.
 * @default 0
 *
 * @param Down Event
 * @desc By default, this is the Down and Numpad 2 buttons.
 * Use 0 for no event.
 * @default 0
 *
 * @param Left Event
 * @desc By default, this is the Left and Numpad 4 buttons.
 * Use 0 for no event.
 * @default 0
 *
 * @param Shift Event
 * @desc By default, this is the Shift button.
 * Use 0 for no event.
 * @default 0
 *
 * @param PageUp Event
 * @desc By default, this is the Q and Page Up buttons.
 * Use 0 for no event.
 * @default 0
 *
 * @param PageDown Event
 * @desc By default, this is the W and Page Down buttons.
 * Use 0 for no event.
 * @default 0
 *
 * @param E Event
 * @desc A new key binding! This is the E button.
 * Use 0 for no event.
 * @default 0
 *
 * @param R Event
 * @desc A new key binding! This is the R button.
 * Use 0 for no event.
 * @default 0
 *
 * @param A Event
 * @desc A new key binding! This is the A button.
 * Use 0 for no event.
 * @default 0
 *
 * @param S Event
 * @desc A new key binding! This is the S button.
 * Use 0 for no event.
 * @default 0
 *
 * @param D Event
 * @desc A new key binding! This is the D button.
 * Use 0 for no event.
 * @default 0
 *
 * @param F Event
 * @desc A new key binding! This is the F button.
 * Use 0 for no event.
 * @default 0
 *
 * @param C Event
 * @desc A new key binding! This is the C button.
 * Use 0 for no event.
 * @default 0
 *
 * @param V Event
 * @desc A new key binding! This is the V button.
 * Use 0 for no event.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV only has a few buttons that be used on the field map. They are
 * the OK, Cancel, Up, Right, Down, and Left buttons. Now, you can bind common
 * events to these keys to have them run when pressed on the field so long as
 * the scene isn't changing or another event is being ran.
 *
 * This plugin adds 8 more keys on top of the game accessible keys. Now, the
 * main left side of the keyboard can be used for common event bindings:
 *
 *                          Q     W     E     R
 *                          A     S     D     F
 *                          Z     X     C     V
 *
 * *Note: This plugin conflicts with KeyboardConfig.js for the time being. The
 * two scripts cannot be ran together at the moment.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * Modify the plugin's parameters by inputting the ID of the common event you
 * want ran to that button configuration. When that button is pressed on the
 * field map while the scene isn't changing or another event isn't running, the
 * common event will take place.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ButtonEvents');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ButtonEvents = {
    ok:       Number(Yanfly.Parameters['OK Event']),
    cancel:   Number(Yanfly.Parameters['Cancel Event']),
    up:       Number(Yanfly.Parameters['Up Event']),
    right:    Number(Yanfly.Parameters['Right Event']),
    down:     Number(Yanfly.Parameters['Down Event']),
    left:     Number(Yanfly.Parameters['Left Event']),
    shift:    Number(Yanfly.Parameters['Shift Event']),
    pageup:   Number(Yanfly.Parameters['PageUp Event']),
    pagedown: Number(Yanfly.Parameters['PageDown Event']),
    extra1:   Number(Yanfly.Parameters['E Event']),
    extra2:   Number(Yanfly.Parameters['R Event']),
    extra3:   Number(Yanfly.Parameters['A Event']),
    extra4:   Number(Yanfly.Parameters['S Event']),
    extra5:   Number(Yanfly.Parameters['D Event']),
    extra6:   Number(Yanfly.Parameters['F Event']),
    extra7:   Number(Yanfly.Parameters['C Event']),
    extra8:   Number(Yanfly.Parameters['V Event'])
};

//=============================================================================
// Input
//=============================================================================

Input.keyMapper[69] = 'extra1';
Input.keyMapper[82] = 'extra2';
Input.keyMapper[65] = 'extra3';
Input.keyMapper[83] = 'extra4';
Input.keyMapper[68] = 'extra5';
Input.keyMapper[70] = 'extra6';
Input.keyMapper[67] = 'extra7';
Input.keyMapper[86] = 'extra8';

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.BEV.Scene_Map_updateScene = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {
    Yanfly.BEV.Scene_Map_updateScene.call(this);
    if (SceneManager.isSceneChanging()) return;
    if ($gameMap.isEventRunning()) return;
    this.updateButtonEvents();
};

Scene_Map.prototype.updateButtonEvents = function() {
    for (var key in Yanfly.Param.ButtonEvents) {
      var eventId = Yanfly.Param.ButtonEvents[key];
      if (eventId <= 0) continue;
      if (!Input.isTriggered(key)) continue;
      $gameTemp.reserveCommonEvent(eventId);
      break;
    }
};

//=============================================================================
// End of File
//=============================================================================
