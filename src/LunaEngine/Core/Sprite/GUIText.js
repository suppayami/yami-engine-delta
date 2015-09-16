/* globals LunaEngine: false */

(function() {
    // dependencies
    var GUI = LunaEngine.Core.Sprite.GUI;

    var GUIText = function() {
        this.initialize.apply(this, arguments);
    };

    GUIText.prototype = Object.create(GUI.prototype);
    GUIText.prototype.constructor = GUIText;

    GUIText.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);

        this._text = "";
        this._fontFace = this.standardFontFace();
        this._fontSize = this.standardFontSize();
        this._textColor = this.normalColor();
        this._outlineColor = "rgba(0,0,0,0.5)";

        this.bitmap = new Bitmap(1,1);
    };

    Object.defineProperty(GUIText.prototype, 'text', {
        get: function() {
            return this._text;
        },
        set: function(value) {
            if (this._text !== value) {
                this._text = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIText.prototype, 'fontFace', {
        get: function() {
            return this._fontFace;
        },
        set: function(value) {
            if (this._fontFace !== value) {
                this.contents.fontFace = value;

                this._fontFace = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIText.prototype, 'fontSize', {
        get: function() {
            return this._fontSize;
        },
        set: function(value) {
            if (this._fontSize !== value) {
                this.contents.fontSize = value;

                this._fontSize = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIText.prototype, 'textColor', {
        get: function() {
            return this._textColor;
        },
        set: function(value) {
            if (this._textColor !== value) {
                this.contents.textColor = value;

                this._textColor = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIText.prototype, 'outlineColor', {
        get: function() {
            return this._outlineColor;
        },
        set: function(value) {
            if (this._outlineColor !== value) {
                this.contents.outlineColor = value;

                this._outlineColor = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIText.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.text = this._getText();

        this.fontFace = this._getFontFace();
        this.fontSize = this._getFontSize();

        this.textColor = this._getTextColor();
        this.outlineColor = this._getOutlineColor();
    };

    GUIText.prototype._refreshGUI = function() {
        var text       = this._text,
            lines      = text.split('\n'),
            lineNumber = lines.length,
            width  = 0,
            height = 0;

        for (var i = 0; i < lineNumber; i++) {
            if (width < this.textWidth(lines[i])) {
                width = this.textWidth(lines[i]);
            }
        }

        height = this.lineHeight() * lineNumber;

        this.bitmap.clear();
        this.bitmap.resize(width, height);
        this.bitmap.drawTextEx(text, 0, 0);
    };

    GUIImage.prototype._getText = function() {
        return "";
    };

    GUIImage.prototype._getFontFace = function() {
        return this.standardFontFace();
    };

    GUIImage.prototype._getFontSize = function() {
        return this.standardFontSize();
    };

    GUIImage.prototype._getTextColor = function() {
        return this.normalColor();
    };

    GUIImage.prototype._getOutlineColor = function() {
        return "rgba(0,0,0,0.5)";
    };

    LunaEngine.Core.Sprite.GUIText = GUIText;
}());
