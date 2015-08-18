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
     * @memberof YED.Hospital.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} [wh] Window Height
     */
    var HospitalCommand = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Command
     */
    HospitalCommand.prototype = Object.create(Window_Command.prototype);
    HospitalCommand.prototype.constructor = HospitalCommand;

    /**
     * Initialize Window when created.
     *
     * @constructs HospitalCommand
     */
    HospitalCommand.prototype.initialize = function(wx, wy, ww, wh) {
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
    HospitalCommand.prototype.windowWidth = function() {
        return 240;
    };

    /**
     * Get visible rows for height setting.
     *
     * @return {number} Rows
     */
    HospitalCommand.prototype.numVisibleRows = function() {
        return 4;
    };

    /**
     * Get text align setting.
     *
     * @return {String} Align setting
     */
    HospitalCommand.prototype.itemTextAlign = function() {
        return Utils.parameters['Text Alignment'];
    };

    /**
     * Make commands list for Window.
     */
    HospitalCommand.prototype.makeCommandList = function() {
        this._addHealCommand();
        this._addCustomCommand();
        this._addExitCommand();
    };

    /**
     * Update help window
     */
    HospitalCommand.prototype.updateHelp = function() {
        var symbol = this._getHelpSymbol();
        this._helpWindow.setSymbol(symbol);
    };

    /**
     * Add heal commands to Window.
     *
     * @private
     */
    HospitalCommand.prototype._addHealCommand = function() {
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
    HospitalCommand.prototype._addCustomCommand = function() {
        // made for future add-ons
    };

    /**
     * Add exit command to Window.
     *
     * @private
     */
    HospitalCommand.prototype._addExitCommand = function() {
        var text = Utils.parameters['Exit Command'];

        this.addCommand(text, 'cancel', true);
    };

    /**
     * Get text symbol for displaying help
     *
     * @private
     */
    HospitalCommand.prototype._getHelpSymbol = function() {
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

    YED.Hospital.Windows.HospitalCommand = HospitalCommand;
}());
