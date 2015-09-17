/* globals LunaEngine: false */

(function() {
    // dependencies
    var GUI = LunaEngine.Core.Sprite.GUI;

    var GUIImage = function() {
        this.initialize.apply(this, arguments);

        this._path = "";
        this._hue  = 0;
        this._rect = [0,0,0,0];
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

    Object.defineProperty(GUIImage.prototype, 'rect', {
        get: function() {
            return this._rect;
        },
        set: function(value) {
            if (!this._rect.equals(value)) {
                this._rect = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIImage.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.path = this._getPath();
        this.hue  = this._getHue();
        this.rect = this._getRect();
    };

    GUIImage.prototype._refreshGUI = function() {
        var path = this._path,
            hue  = this._hue,
            rect = this._rect;

        this.bitmap = ImageManager.loadNormalBitmap(path, hue);
        this.setFrame(rect[0], rect[1], rect[2], rect[3]);
    };

    GUIImage.prototype._getPath = function() {
        return "";
    };

    GUIImage.prototype._getHue = function() {
        return 0;
    };

    GUIImage.prototype._getRect = function() {
        return [0,0,0,0];
    };

    LunaEngine.Core.Sprite.GUIImage = GUIImage;
}());
