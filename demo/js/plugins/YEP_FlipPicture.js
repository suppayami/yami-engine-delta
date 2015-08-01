//=============================================================================
// Yanfly Engine Plugins - Flip Picture
// YEP_FlipPicture.js
// Last Updated: 2015.07.10
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_FlipPicture"] = true;

//=============================================================================
/*:
 * @plugindesc This pluging allows you the ability to flip Event Pictures
 * and unflip them through a simple plugin command.
 * @author Yanfly Engine Plugins
 *
 * @help
 * Once you have an Event Picture shown, create a Plugin Command Event and
 * type in one of the following commands to have this plugin do what you want:
 *
 * Plugin Command:
 *   FlipPicture 3      - Flips Picture #3 in the Event
 *   UnflipPicture 4    - Unflips Picture #4 in the Event
 *
 * Keep in mind that if you're using the "Upper Left" option for the picture's
 * origin, a flipped image will have the upper right corner for the picture's
 * origin instead.
 *
 * ChangeLog:
 *   2015.07.10 - Completed.
 */
//=============================================================================

//=============================================================================
// Game_Interpreter
//=============================================================================

var _YEP_FP_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _YEP_FP_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'FlipPicture') {
        $gameScreen.picture(args[0]).changeMirror(true);
    }
    if (command === 'UnflipPicture') {
        $gameScreen.picture(args[0]).changeMirror(false);
    }
};

var _YEP_FP_Game_Picture_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
    _YEP_FP_Game_Picture_initialize.call(this);
    this.initMirror();
};

Game_Picture.prototype.initMirror = function() {
    this._mirror = false;
};

Game_Picture.prototype.mirror = function() {
    return this._mirror;
};

Game_Picture.prototype.changeMirror = function(mirror) {
    this._mirror = mirror;
};

//=============================================================================
// Sprite_Picture
//=============================================================================

var _YEP_FP_Sprite_Picture_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
    _YEP_FP_Sprite_Picture_update.call(this);
    if (this.visible) this.updateMirror();
};

Sprite_Picture.prototype.updateMirror = function() {
    var picture = this.picture();
    if (picture.mirror() == true && this.scale.x > 0) {
      this.scale.x *= -1;
    } else if (picture.mirror() == false && this.scale.x < 0) {
      this.scale.x *= -1;
    }
};

//=============================================================================
// End of File
//=============================================================================
