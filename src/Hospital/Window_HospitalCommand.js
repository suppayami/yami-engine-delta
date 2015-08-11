/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Utils = YED.Hospital.Utils;

    /**
     * Window shows commands for Hospital Scene.
     *
     * @class
     * @extends external:Window_Command
     * @memberof YED.Hospital
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} [wh] Window Height
     */
    var Window_HospitalCommand = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Command
     */
    Window_HospitalCommand.prototype = Object.create(Window_Command.prototype);
    Window_HospitalCommand.prototype.constructor = Window_HospitalCommand;

    /**
     * Initialize Window when created.
     *
     * @constructs Window_HospitalCommand
     */
    Window_HospitalCommand.prototype.initialize = function(wx, wy, ww, wh) {
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
    Window_HospitalCommand.prototype.windowWidth = function() {
        return 240;
    };

    /**
     * Get visible rows for height setting.
     *
     * @return {number} Rows
     */
    Window_HospitalCommand.prototype.numVisibleRows = function() {
        return 4;
    };

    /**
     * Get text align setting.
     *
     * @return {String} Align setting
     */
    Window_HospitalCommand.prototype.itemTextAlign = function() {
        return Utils.parameters['Text Alignment'];
    };

    /**
     * Make commands list for Window.
     */
    Window_HospitalCommand.prototype.makeCommandList = function() {
        this._addHealCommand();
        this._addCustomCommand();
        this._addExitCommand();
    };

    /**
     * Update help window
     */
    Window_HospitalCommand.prototype.updateHelp = function() {
        var symbol = this._getHelpSymbol();
        this._helpWindow.setSymbol(symbol);
    };

    /**
     * Add heal commands to Window.
     *
     * @private
     */
    Window_HospitalCommand.prototype._addHealCommand = function() {
        var healOneText = Utils.parameters['Heal One Command'],
            healAllText = Utils.parameters['Heal All Command'],
            enableHealAll = $gameParty.isHospitalizable();

        this.addCommand(healOneText, 'healOne', true);
        this.addCommand(healAllText, 'healAll', enableHealAll);
    };

    /**
     * Add custom commands (for any add-on) to Window.
     *
     * @private
     */
    Window_HospitalCommand.prototype._addCustomCommand = function() {
        // made for future add-ons
    };

    /**
     * Add exit command to Window.
     *
     * @private
     */
    Window_HospitalCommand.prototype._addExitCommand = function() {
        var text = Utils.parameters['Exit Command'];

        this.addCommand(text, 'cancel', true);
    };

    /**
     * Get text symbol for displaying help
     *
     * @private
     */
    Window_HospitalCommand.prototype._getHelpSymbol = function() {
        var symbol = '';

        switch (this.currentSymbol()) {
        case 'healOne':
            symbol = 'Heal One Help';
            break;
        case 'healAll':
            if ($gameParty.isHealthy()) {
                symbol = 'Heal All Help (Healthy)';
            } else {
                symbol = 'Heal All Help (Treat)';
            }
            break;
        case 'cancel':
            symbol = 'Exit Help';
            break;
        }

        return symbol;
    };

    YED.Hospital.Window_HospitalCommand = Window_HospitalCommand;
}());
