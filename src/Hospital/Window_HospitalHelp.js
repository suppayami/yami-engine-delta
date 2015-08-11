/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Utils = YED.Hospital.Utils;

    /**
     * Window shows command help.
     *
     * @class
     * @extends external:Window_Help
     * @memberof YED.Hospital
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} ww Window Width
     * @param {number} [wh] Window Height
     */
    var Window_HospitalHelp = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Help
     */
    Window_HospitalHelp.prototype = Object.create(Window_Help.prototype);
    Window_HospitalHelp.prototype.constructor = Window_HospitalHelp;

    /**
     * Initialize
     *
     * @constructs Window_HospitalHelp
     */
    Window_HospitalHelp.prototype.initialize = function(wx, wy, ww, wh) {
        wh = wh || this.windowHeight();

        Window_Help.prototype.initialize.call(this, 1);

        this.x = wx;
        this.y = wy;
        this.width  = ww;
        this.height = wh;

        this._textSymbol = '';
        this._windowCommand = null;
        this._windowActors = null;
    };

    /**
     * Window height for initialize.
     *
     * @return {number} Window Height
     */
    Window_HospitalHelp.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    /**
     * Refresh window contents.
     */
    Window_HospitalHelp.prototype.refresh = function() {
        this.contents.clear();
        this._drawHelpText();
    };

    /**
     * Clear window contents.
     */
    Window_Help.prototype.clear = function() {
        this.setSymbol('');
    };

    /**
     * Set window symbol for formatting texts.
     */
    Window_HospitalHelp.prototype.setSymbol = function(symbol, actor) {
        this._textSymbol = symbol;
        this._actor = actor;
        this.refresh();
    };

    /**
     * Get help text.
     *
     * @return {String} Help Text
     * @private
     */
    Window_HospitalHelp.prototype._getHelpText = function() {
        var text  = Utils.parameters[this._textSymbol],
            actor = this._actor;

        switch (this._textSymbol) {
        case 'Heal All Help (Treat)':
            text = text.format($gameParty.hospitalFee());
            break;
        case 'Actor Help (Treat)':
            text = text.format(actor.name());
            break;
        case 'Actor Help (Healthy)':
            text = text.format(actor.name());
            break;
        }

        return text;
    };

    /**
     * Draw help text.
     *
     * @private
     */
    Window_HospitalHelp.prototype._drawHelpText = function() {
        var text = '';

        if (this._textSymbol !== '') {
            text = this._getHelpText();
            this.drawTextEx(text, this.textPadding(), 0);
        }
    };

    YED.Hospital.Window_HospitalHelp = Window_HospitalHelp;
}());
