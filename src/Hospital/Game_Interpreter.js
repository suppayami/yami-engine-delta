/* globals YED: false */

(function() {
    /**
     * Aliasing methods
     */
    var _Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;

    /**
     * Extending: Game_Interpreter.prototype.pluginCommand
     *
     * Add go to Hospital Scene Plugin Command.
     */
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        // actual initialize
        _Game_Interpreter_pluginCommand.call(this, command, args);

        // Hospital Plugin Command
        if (command === 'OpenHospital') {
            YED.Utils.gotoHospitalScene.call(this);
        }
    };
}());
