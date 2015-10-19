//=============================================================================
// TDS Battle Cut In
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_BattleCutIn = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.BattleCutIn = _TDS_.BattleCutIn || {}
//=============================================================================
 /*:
 * @plugindesc This script allows you to show cut in images.
 * @author TDS
 *
 * @help
 * ============================================================================
 * * Plugin Commands: BattleCutIn
 * ============================================================================
 *
 *  BattleCutIn SetPicture FILENAME
 *   ^ (Sets the cut in image filename)
 *   ^ FILENAME = Cut in filename. (On Picture Folder)
 *   ^ Example: BattleCutIn SetPicture cutin2
 *
 *  BattleCutIn SetSpeed X Y
 *   ^ (Sets the Cut In Image scrolling Speeds.)
 *   ^ X = X Speed.
 *   ^ Y = Y Speed. (Optional, Default is 0)
 *   ^ Example: BattleCutIn SetSpeed -25
 *
 *  BattleCutIn Show
 *   ^ (Shows the Battle Cut In Image. It only changes the visibility flag
 *      and makes it visible. Opacity is handled differently.)
 *
 *  BattleCutIn Hide
 *   ^ (Hides the Battle Cut In Image. It only changes the visibility flag
 *      and makes it invisible. Opacity is handled differently.)
 *
 *  BattleCutIn Fade TARGET DURATION
 *   ^ (Fades the Battle Cut In Image towards a target opacity.)
 *   ^ TARGET = Target Opacity. (0-255)
 *   ^ DURATION = Duration in frames to reach target opacity.
 *   ^ Example: BattleCutIn Fade 160 30
 *
 *  BattleCutIn FadeIn DURATION
 *   ^ (Fades in the Battle Cut In Image. Sets the Opacity to 255.)
 *   ^ DURATION = Duration in frames to fully appear (255 opacity).
 *   ^ Example: BattleCutIn FadeIn 15
 *
 *  BattleCutIn FadeOut DURATION
 *   ^ (Fades out the Battle Cut In Image. Sets the Opacity to 0.)
 *   ^ DURATION = Duration in frames to fully disappear (0 opacity).
 *   ^ Example: BattleCutIn FadeOut 15
 */
//=============================================================================

//=============================================================================
// ** Game_Temp
//-----------------------------------------------------------------------------
// The game object class for temporary data that is not included in save data.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.BattleCutIn.Game_Temp_settings_initialize = Game_Temp.prototype.initialize;
//=============================================================================
// * Initialize Object
//=============================================================================
Game_Temp.prototype.initialize = function() {
  // Run Original Method
  _TDS_.BattleCutIn.Game_Temp_settings_initialize.call(this)
  // Clear Cut In Settings
  this.clearCutInSettings()
};
//=============================================================================
// * Clear Cut in Settings
//=============================================================================
Game_Temp.prototype.clearCutInSettings = function() {
  // Initialize Battle Cut in Settings
  this.battleCutInSettings = {name: 'cutin1', speed: new Point(0, 0), visible: false,}
}


//=============================================================================
// ** Spriteset_Battle
//-----------------------------------------------------------------------------
// The set of sprites on the battle screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.BattleCutIn.Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
//=============================================================================
// * Create Lower Layer
//=============================================================================
Spriteset_Battle.prototype.createLowerLayer = function() {
  // Run Original Method
  _TDS_.BattleCutIn.Spriteset_Battle_createLowerLayer.call(this)
  // Create Battle Cut In Sprite
  this.createBattleCutIn()
};
//=============================================================================
// * Create Battle Cut In
//=============================================================================
Spriteset_Battle.prototype.createBattleCutIn = function() {
  // Create Battle Cut In Sprite
  this._battleCutInSprite = new Sprite_Battle_Cut_In();
  this.addChild(this._battleCutInSprite)
}

//==============================================================================================
// ** Sprite_Battle_Cut_In
//----------------------------------------------------------------------------------------------
//  This sprite is used to display cut in images in battle.
//==============================================================================================
function Sprite_Battle_Cut_In() { this.initialize.apply(this, arguments); }
Sprite_Battle_Cut_In.prototype = Object.create(TilingSprite.prototype);
Sprite_Battle_Cut_In.prototype.constructor = Sprite_Battle_Cut_In;
//==============================================================================================
// * Initialize Object
//==============================================================================================
Sprite_Battle_Cut_In.prototype.initialize = function() {
  // Super Call
  TilingSprite.prototype.initialize.call(this);
  // Set Cut In Name
  this.cutInName = $gameTemp.battleCutInSettings.name;
  // Set Opacity to 0
  this.opacity = 0
  // Set Visibility to false
  this.visible = false;
  // Clear Fade Target & Fade Speed
  this.fadeTarget = null ; this.fadeSpeed = 0;
  // Update Bitmap
  this.updateBitmap()
};
//==============================================================================================
// * Update Bitmap
//==============================================================================================
Sprite_Battle_Cut_In.prototype.updateBitmap = function() {
  // Set Bitmap
  this.bitmap = ImageManager.loadPicture(this.cutInName)
  // Add Load Listener to Bitmap
  this.bitmap.addLoadListener(function(){ this.move(0, 0, Graphics.width, this.bitmap.height) }.bind(this))
}
//==============================================================================================
// * The opacity of the window without contents (0 to 255).
//==============================================================================================
Object.defineProperty(Sprite_Battle_Cut_In.prototype, 'opacity', {
    get: function() { return this.alpha * 255; },
    set: function(value) { this.alpha = value.clamp(0, 255) / 255; },
});
//==============================================================================================
// * Frame Update
//==============================================================================================
Sprite_Battle_Cut_In.prototype.update = function() {
  // Super Call
  TilingSprite.prototype.update.call(this);
  // Get Settings
  var settings = $gameTemp.battleCutInSettings;
  // Set Visibility
  this.visible = settings.visible;
  // Update Bitmap if Necessary
  if (this.cutInName != settings.name) { this.cutInName = settings.name ; this.updateBitmap() }
  // Update Origin Position
  this.origin.x += settings.speed.x ; this.origin.y += settings.speed.y;
  if (this.fadeTarget != null) {
    // Get TSource value
    var value = this.opacity, target = this.fadeTarget, speed  = this.fadeSpeed
    // // Clamp value
    if (target < value) { value = Math.max(value - speed, target) }
    if (target > value) { value = Math.min(value + speed, target) }
    // Set Opacity
    this.opacity = value;
    // Stop Fading if Target has been reached
    if (this.opacity === this.fadeTarget) { this.fadeTarget = null}
  }
  // If Fade Settings Exist
  if (settings.fade) {
    // If Fade Duration is 0 or less
    if (settings.fade.duration <= 0) { return this.opacity = settings.fade.target }
    // Set Fade Target
    this.fadeTarget = settings.fade.target;
    // Set Fade Speed
    this.fadeSpeed = Math.abs(this.opacity - settings.fade.target) / settings.fade.duration
    // Delete Fade Settings
    delete settings.fade
  }
}


//==============================================================================================
// ** Game_Interpreter
//----------------------------------------------------------------------------------------------
// The interpreter for running event commands.
//==============================================================================================
// Alias Listing
//==============================================================================================
_TDS_.BattleCutIn.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
//=============================================================================
// * Plugin Command
//=============================================================================
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  // Run Original Method
  _TDS_.BattleCutIn.Game_Interpreter_pluginCommand.call(this,command,args)
  // If a Battle Cut In Command
  if (command === 'BattleCutIn') {
    // Get Settings
    var settings = $gameTemp.battleCutInSettings
    switch (args[0]) {
      case 'Show': ; settings.visible = true ; break;
      case 'Hide': ; settings.visible = false ; break;
      case 'SetPicture': ; settings.name = args[1] ; break;
      case 'SetSpeed': // (1: X Speed, 2: Y Speed)
        settings.speed.set(parseInt(args[1]), parseInt(args[2] || 0))
        break;
      case 'Fade': // (1: Target, 2: Duration)
        // Delete Fade Object
        delete settings.fade
        // Create Fade Object
        settings.fade = {target: parseInt(args[1] || 255), duration: parseInt(args[2])}
        break;
      case 'FadeIn': // (1: Duration)
        // Delete Fade Object
        delete settings.fade
        // Create Fade Object
        settings.fade = {target: 255, duration: parseInt(args[1])}
        break;
      case 'FadeOut': // (1: Duration)
        // Delete Fade Object
        delete settings.fade
        // Create Fade Object
        settings.fade = {target: 0, duration: parseInt(args[1])}
        break;
    }
  }
};
