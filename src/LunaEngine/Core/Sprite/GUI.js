/* globals LunaEngine: false */

(function() {
    var GUI = function() {
        this.initialize.apply(this, arguments);
    };

    GUI.prototype = Object.create(Sprite_Base.prototype);
    GUI.prototype.constructor = GUI;

    GUI.prototype.initialize = function() {
        Sprite_Base.prototype.initialize.call(this);

        this._windowskin = null; // for textColor
    };

    GUI.prototype.setupGUI = function() {
        this.updateGUIParams();
    };

    /**
     * The image used as a window skin.
     *
     * @property windowskin
     * @type Bitmap
     */
    Object.defineProperty(GUI.prototype, 'windowskin', {
        get: function() {
            return this._windowskin;
        },
        set: function(value) {
            if (this._windowskin !== value) {
                this._windowskin = value;
            }
        },
        configurable: true
    });

    /**
     * The image used as a window skin.
     *
     * @property windowskin
     * @type Bitmap
     */
    Object.defineProperty(GUI.prototype, 'contents', {
        get: function() {
            return this.bitmap;
        },
        configurable: true
    });

    GUI.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);

        this.updateGUIParams();
    };

    GUI.prototype.updateGUIParams = function() {
        this.updateGUIPosition();
    };

    GUI.prototype.updateGUIPosition = function() {
        var x = this._getX(),
            y = this._getY();

        this.move(x, y);
    };

    GUI.prototype.refresh = function() {
        // polymorph!
    };

    GUI.prototype._getX = function() {
        return 0;
    };

    GUI.prototype._getY = function() {
        return 0;
    };

    GUI.prototype.loadWindowskin = Window_Base.prototype.loadWindowskin;
    GUI.prototype.lineHeight = Window_Base.prototype.lineHeight;
    GUI.prototype.standardFontFace = Window_Base.prototype.standardFontFace;
    GUI.prototype.standardFontSize = Window_Base.prototype.standardFontSize;
    GUI.prototype.textPadding = Window_Base.prototype.textPadding;
    GUI.prototype.resetFontSettings = Window_Base.prototype.resetFontSettings;
    GUI.prototype.resetTextColor = Window_Base.prototype.resetTextColor;
    GUI.prototype.textColor = Window_Base.prototype.textColor;
    GUI.prototype.normalColor = Window_Base.prototype.normalColor;
    GUI.prototype.systemColor = Window_Base.prototype.systemColor;
    GUI.prototype.crisisColor = Window_Base.prototype.crisisColor;
    GUI.prototype.deathColor = Window_Base.prototype.deathColor;
    GUI.prototype.gaugeBackColor = Window_Base.prototype.gaugeBackColor;
    GUI.prototype.hpGaugeColor1 = Window_Base.prototype.hpGaugeColor1;
    GUI.prototype.hpGaugeColor2 = Window_Base.prototype.hpGaugeColor2;
    GUI.prototype.mpGaugeColor1 = Window_Base.prototype.mpGaugeColor1;
    GUI.prototype.mpGaugeColor2 = Window_Base.prototype.mpGaugeColor2;
    GUI.prototype.mpCostColor = Window_Base.prototype.mpCostColor;
    GUI.prototype.powerUpColor = Window_Base.prototype.powerUpColor;
    GUI.prototype.powerDownColor = Window_Base.prototype.powerDownColor;
    GUI.prototype.tpGaugeColor1 = Window_Base.prototype.tpGaugeColor1;
    GUI.prototype.tpGaugeColor2 = Window_Base.prototype.tpGaugeColor2;
    GUI.prototype.tpCostColor = Window_Base.prototype.tpCostColor;
    GUI.prototype.pendingColor = Window_Base.prototype.pendingColor;
    GUI.prototype.translucentOpacity = Window_Base.prototype.translucentOpacity;
    GUI.prototype.changeTextColor = Window_Base.prototype.changeTextColor;
    GUI.prototype.changePaintOpacity = Window_Base.prototype.changePaintOpacity;
    GUI.prototype.drawText = Window_Base.prototype.drawText;
    GUI.prototype.textWidth = Window_Base.prototype.textWidth;
    GUI.prototype.drawTextEx = Window_Base.prototype.drawTextEx;
    GUI.prototype.convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    GUI.prototype.actorName = Window_Base.prototype.actorName;
    GUI.prototype.partyMemberName = Window_Base.prototype.partyMemberName;
    GUI.prototype.processCharacter = Window_Base.prototype.processCharacter;
    GUI.prototype.processNormalCharacter = Window_Base.prototype.processNormalCharacter;
    GUI.prototype.processNewLine = Window_Base.prototype.processNewLine;
    GUI.prototype.obtainEscapeCode = Window_Base.prototype.obtainEscapeCode;
    GUI.prototype.obtainEscapeParam = Window_Base.prototype.obtainEscapeParam;
    GUI.prototype.processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    GUI.prototype.processDrawIcon = Window_Base.prototype.processDrawIcon;
    GUI.prototype.makeFontBigger = Window_Base.prototype.makeFontBigger;
    GUI.prototype.makeFontSmaller = Window_Base.prototype.makeFontSmaller;
    GUI.prototype.calcTextHeight = Window_Base.prototype.calcTextHeight;
    GUI.prototype.drawIcon = Window_Base.prototype.drawIcon;
    GUI.prototype.drawFace = Window_Base.prototype.drawFace;
    GUI.prototype.drawCharacter = Window_Base.prototype.drawCharacter;
    GUI.prototype.drawGauge = Window_Base.prototype.drawGauge;

    LunaEngine.Core.Sprite.GUI = GUI;
}());
