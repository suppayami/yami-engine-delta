/* globals LunaEngine: false */

(function() {
    // dependencies
    var GUI = LunaEngine.Core.Sprite.GUI;

    var GUIImage = function() {
        this.initialize.apply(this, arguments);

        this._path = "";
        this._hue  = 0;
    };

    GUIImage.prototype.setupGUI = function() {
        GUI.prototype.setupGUI.call(this);

        this.path = this._getPath();
        this.hue  = this._getHue();

        ImageManager.loadNormalBitmap(this.path, this.hue);
    };

    GUIImage.prototype = Object.create(GUI.prototype);
    GUIImage.prototype.constructor = GUIImage;

    GUIImage.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);
    };

    Object.defineProperty(GUIImage.prototype, 'path', {
        get: function() {
            return this._path;
        },
        set: function(value) {
            if (this._path !== value) {
                this._path = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIImage.prototype, 'hue', {
        get: function() {
            return this._hue;
        },
        set: function(value) {
            if (this._hue !== value) {
                this._hue = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIImage.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.path = this._getPath();
        this.hue  = this._getHue();
    };

    GUIImage.prototype._refreshGUI = function() {
        var path = this._path,
            hue  = this._hue;

        this.bitmap = ImageManager.loadNormalBitmap(path, hue);
    };

    GUIImage.prototype._getPath = function() {
        return this._evalConfig(this.config.imagePath) || "";
    };

    GUIImage.prototype._getHue = function() {
        return this.config.hue || 0;
    };

    LunaEngine.Core.Sprite.GUIImage = GUIImage;
}());
