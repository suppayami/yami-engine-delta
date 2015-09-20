/* globals LunaEngine: false */

(function() {
    // dependencies
    var GUI = LunaEngine.Core.Sprite.GUI;

    var GUIFace = function() {
        this.initialize.apply(this, arguments);
    };

    GUIFace.prototype = Object.create(GUI.prototype);
    GUIFace.prototype.constructor = GUIFace;

    GUIFace.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);

        this.bitmap = new Bitmap(Window_Base._faceWidth,
            Window_Base._faceHeight);

        this._faceName = "";
        this._faceIndex = 0;
    };

    GUIFace.prototype.setupGUI = function() {
        GUI.prototype.setupGUI.call(this);

        this.faceName  = this._getFaceName();
        this.faceIndex = this._getFaceIndex();

        ImageManager.loadFace(this.faceName);
    };

    Object.defineProperty(GUIFace.prototype, 'faceName', {
        get: function() {
            return this._faceName;
        },
        set: function(value) {
            if (this._faceName !== value) {
                this._faceName = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIFace.prototype, 'faceIndex', {
        get: function() {
            return this._faceIndex;
        },
        set: function(value) {
            if (this._faceIndex !== value) {
                this._faceIndex = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIFace.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.faceName  = this._getFaceName();
        this.faceIndex = this._getFaceIndex();
    };

    GUIFace.prototype._refreshGUI = function() {
        var faceName  = this.faceName,
            faceIndex = this.faceIndex;

        this.bitmap.clear();
        this.drawFace(faceName, faceIndex, 0, 0);
    };

    GUIFace.prototype._getFaceName = function() {
        return this.config.faceName || "";
    };

    GUIFace.prototype._getFaceIndex = function() {
        return this.config.faceIndex || 0;
    };

    LunaEngine.Core.Sprite.GUIFace = GUIFace;
}());
