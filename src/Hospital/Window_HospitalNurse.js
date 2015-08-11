/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Utils = YED.Hospital.Utils;

    /**
     * Window shows nurse face and her messages.
     *
     * @class
     * @extends external:Window_Base
     * @memberof YED.Hospital
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} ww Window Width
     * @param {number} [wh] Window Height
     */
    var Window_HospitalNurse = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    Window_HospitalNurse.prototype = Object.create(Window_Base.prototype);
    Window_HospitalNurse.prototype.constructor = Window_HospitalNurse;

    /**
     * Initialize
     *
     * @constructs Window_HospitalNurse
     */
    Window_HospitalNurse.prototype.initialize = function(wx, wy, ww, wh) {
        wh = wh || this.windowHeight();

        Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
        this.loadImages();
        this.refresh();
    };

    /**
     * Window height for initialize.
     *
     * @return {number} Window Height
     */
    Window_HospitalNurse.prototype.windowHeight = function() {
        return this.fittingHeight(4);
    };

    /**
     * Load and cache Faceset for Nurse Face.
     */
    Window_HospitalNurse.prototype.loadImages = function() {
        var faceName = Utils.parameters['Nurse Face'][0];

        ImageManager.loadFace(faceName);
    };

    /**
     * Refresh window contents.
     */
    Window_HospitalNurse.prototype.refresh = function() {
        this.contents.clear();

        this._drawNurseFace();
        this._drawNurseName();
        this._drawNurseMessage();
    };

    /**
     * Draw nurse face.
     *
     * @private
     */
    Window_HospitalNurse.prototype._drawNurseFace = function() {
        var faceName  = Utils.parameters['Nurse Face'][0],
            faceIndex = Utils.parameters['Nurse Face'][1];

        this.drawFace(faceName, faceIndex, 0, 0);
    };

    /**
     * Draw nurse name.
     *
     * @private
     */
    Window_HospitalNurse.prototype._drawNurseName = function() {
        var nurseName = Utils.parameters['Nurse Name'],
            dx = Window_Base._faceWidth + this.textPadding();

        this.drawTextEx(nurseName, dx, 0);
    };

    /**
     * Draw nurse message.
     *
     * @private
     */
    Window_HospitalNurse.prototype._drawNurseMessage = function() {
        var nurseMessage = Utils.parameters['Nurse Message'],
            dx = Window_Base._faceWidth + this.textPadding();

        this.drawTextEx(nurseMessage, dx, this.lineHeight());
    };

    YED.Hospital.Window_HospitalNurse = Window_HospitalNurse;
}());
