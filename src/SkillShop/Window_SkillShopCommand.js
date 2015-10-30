/* globals YED: false */

(function($SkillShop) {
    /**
     * Shorten Dependencies
     */
    var Utils = $SkillShop.Utils;

    /**
     * Window shows commands for Skill Shop Scene.
     *
     * @class
     * @extends external:Window_Command
     * @memberof YED.SkillShop.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} [wh] Window Height
     */
    var SkillShopCommand = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Command
     */
    SkillShopCommand.prototype = Object.create(Window_Command.prototype);
    SkillShopCommand.prototype.constructor = SkillShopCommand;

    /**
     * Initialize Window when created.
     *
     * @constructs SkillShopCommand
     */
    SkillShopCommand.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();
        wh = wh || this.windowHeight();

        Window_Command.prototype.initialize.call(this, wx, wy);

        this.width = ww;
        this.height = wh;
    };

    /**
     * Window width for initialize.
     *
     * @return {number} Window Width
     */
    SkillShopCommand.prototype.windowWidth = function() {
        return 240;
    };

    /**
     * Get visible rows for height setting.
     *
     * @return {number} Rows
     */
    SkillShopCommand.prototype.numVisibleRows = function() {
        return 4;
    };

    /**
     * Get text align setting.
     *
     * @return {String} Align setting
     */
    SkillShopCommand.prototype.itemTextAlign = function() {
        return Utils.parameters['Text Alignment'];
    };

    /**
     * Make commands list for Window.
     */
    SkillShopCommand.prototype.makeCommandList = function() {
        this._addBuyCommand();
        this._addCustomCommand();
        this._addExitCommand();
    };

    /**
     * Add buy commands to Window.
     *
     * @private
     */
    SkillShopCommand.prototype._addBuyCommand = function() {
        var buyText = Utils.parameters['Buy Command'];

        this.addCommand(buyText, 'buySkill', true);
    };

    /**
     * Add custom commands (for any add-on) to Window.
     *
     * @private
     */
    SkillShopCommand.prototype._addCustomCommand = function() {
        // made for future add-ons
    };

    /**
     * Add exit command to Window.
     *
     * @private
     */
    SkillShopCommand.prototype._addExitCommand = function() {
        var text = Utils.parameters['Cancel Command'];

        this.addCommand(text, 'cancel', true);
    };

    $SkillShop.Windows.SkillShopCommand = SkillShopCommand;
}(YED.SkillShop));
