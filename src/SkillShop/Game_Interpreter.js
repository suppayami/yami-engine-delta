/* globals YED: false */

(function($SkillShop) {
    /**
     * Shorten Dependencies
     */
    var Utils = $SkillShop.Utils;

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
        var match, ids;

        // actual pluginCommand
        _Game_Interpreter_pluginCommand.call(this, command, args);

        // SkillShop Plugin Command
        match = command.match(/OpenSkillShop\((.+)\)/i);
        if (match) {
            ids = match[1].split(',').map(function(id) {
                return parseInt(id);
            });

            Utils.gotoSkillShopScene.call(this, ids);
        }

        // SkillShop Plugin Command
        match = command.match(/OpenSkillShop/i);
        if (match) {
            Utils.gotoSkillShopScene.call(this, args);
        }
    };
}(YED.SkillShop));
