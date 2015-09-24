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

        this.bitmap = new Bitmap(1,1);

        this._text = "";
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
            return this.contents.fontFace;
        },
        set: function(value) {
            if (this.contents.fontFace !== value) {
                this.contents.fontFace = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIText.prototype, 'fontSize', {
        get: function() {
            return this.contents.fontSize;
        },
        set: function(value) {
            if (this.contents.fontSize !== value) {
                this.contents.fontSize = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIText.prototype, 'color', {
        get: function() {
            return this.contents.textColor;
        },
        set: function(value) {
            if (this.contents.textColor !== value) {
                this.contents.textColor = value;
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
            if (this.contents.outlineColor !== value) {
                this.contents.outlineColor = value;
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

        this.color = this._getTextColor();
        this.outlineColor = this._getOutlineColor();
    };

    GUIText.prototype._refreshGUI = function() {
        var text       = this.text,
            lines      = text.split('\n'),
            lineNumber = lines.length,
            width  = 0,
            height = 0;

        for (var i = 0; i < lineNumber; i++) {
            if (width < this.textWidth(lines[i])) {
                width = this.textWidth(lines[i]);
            }
        }

        width = width + this.textPadding() * 2;
        height = this.lineHeight() * lineNumber;

        this.bitmap = new Bitmap(width, height);
        this.drawTextEx(text, this.textPadding(), 0);
    };

    GUIText.prototype._getText = function() {
        return this._evalConfig(this.config.text) || "Test";
    };

    GUIText.prototype._getFontFace = function() {
        return this._evalConfig(this.config.fontFace) || this.standardFontFace();
    };

    GUIText.prototype._getFontSize = function() {
        return this._evalConfig(this.config.fontSize) || this.standardFontSize();
    };

    GUIText.prototype._getTextColor = function() {
        return this._evalConfig(this.config.textColor) || this.normalColor();
    };

    GUIText.prototype._getOutlineColor = function() {
        return this._evalConfig(this.config.outlineColor) || "rgba(0,0,0,0.5)";
    };

    GUIText.prototype.resetFontSettings = function() {
        this.contents.fontFace = this._getFontFace();
        this.contents.fontSize = this._getFontSize();

        this.contents.textColor = this._getTextColor();
        this.contents.outlineColor = this._getOutlineColor();
    };

    GUIText.prototype.textPadding = function() {
        return 2;
    };

    LunaEngine.Core.Sprite.GUIText = GUIText;
}());
