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
     * @memberof YED.Hospital.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} ww Window Width
     * @param {number} [wh] Window Height
     */
    var HospitalNurse = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    HospitalNurse.prototype = Object.create(Window_Base.prototype);
    HospitalNurse.prototype.constructor = HospitalNurse;

    /**
     * Initialize
     *
     * @constructs HospitalNurse
     */
    HospitalNurse.prototype.initialize = function(wx, wy, ww, wh) {
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
    HospitalNurse.prototype.windowHeight = function() {
        return this.fittingHeight(4);
    };

    /**
     * Load and cache Faceset for Nurse Face.
     */
    HospitalNurse.prototype.loadImages = function() {
        var faceName = Utils.parameters['Nurse Face'][0];

        ImageManager.loadFace(faceName);
    };

    /**
     * Refresh window contents.
     */
    HospitalNurse.prototype.refresh = function() {
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
    HospitalNurse.prototype._drawNurseFace = function() {
        var faceName  = Utils.parameters['Nurse Face'][0],
            faceIndex = Utils.parameters['Nurse Face'][1];

        this.drawFace(faceName, faceIndex, 0, 0);
    };

    /**
     * Draw nurse name.
     *
     * @private
     */
    HospitalNurse.prototype._drawNurseName = function() {
        var nurseName = Utils.parameters['Nurse Name'],
            dx = Window_Base._faceWidth + this.textPadding();

        this.drawTextEx(nurseName, dx, 0);
    };

    /**
     * Draw nurse message.
     *
     * @private
     */
    HospitalNurse.prototype._drawNurseMessage = function() {
        var nurseMessage = Utils.parameters['Nurse Message'],
            dx = Window_Base._faceWidth + this.textPadding();

        this.drawTextEx(nurseMessage, dx, this.lineHeight());
    };

    YED.Hospital.Windows.HospitalNurse = HospitalNurse;
}());
