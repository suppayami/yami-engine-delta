/* globals LunaEngine: false */

(function() {
    // dependencies
    var GUI = LunaEngine.Core.Sprite.GUI;

    var GUIGauge = function() {
        this.initialize.apply(this, arguments);

        this._gaugeWidth  = 0;
        this._gaugeHeight = 0;

        this._rate   = 0;

        this._color1 = '';
        this._color2 = '';

        this._backColor    = '';
        this._outlineColor = '';

        this._direction = 'horizontal';
    };

    GUIGauge.prototype = Object.create(GUI.prototype);
    GUIGauge.prototype.constructor = GUIGauge;

    GUIGauge.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);
    };

    Object.defineProperty(GUIGauge.prototype, 'gaugeWidth', {
        get: function() {
            return this._gaugeWidth;
        },
        set: function(value) {
            if (this._gaugeWidth !== value) {
                this._gaugeWidth = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'gaugeHeight', {
        get: function() {
            return this._gaugeHeight;
        },
        set: function(value) {
            if (this._gaugeHeight !== value) {
                this._gaugeHeight = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'color1', {
        get: function() {
            return this._color1;
        },
        set: function(value) {
            if (this._color1 !== value) {
                this._color1 = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'color2', {
        get: function() {
            return this._color2;
        },
        set: function(value) {
            if (this._color2 !== value) {
                this._color2 = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'rate', {
        get: function() {
            return Math.floor(this._rate);
        },
        set: function(value) {
            if (Math.floor(this._rate) !== Math.floor(value)) {
                this._rate = Math.floor(value);
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'backColor', {
        get: function() {
            return this._backColor;
        },
        set: function(value) {
            if (this._backColor !== value) {
                this._backColor = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'outlineColor', {
        get: function() {
            return this._outlineColor;
        },
        set: function(value) {
            if (this._outlineColor !== value) {
                this._outlineColor = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'direction', {
        get: function() {
            return this._direction;
        },
        set: function(value) {
            if (this._direction !== value) {
                this._direction = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIGauge.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.gaugeWidth  = this._getGaugeWidth();
        this.gaugeHeight = this._getGaugeHeight();

        this.rate = this._getRate();

        this.color1 = this._getColor1();
        this.color2 = this._getColor2();

        this.backColor    = this._getBackColor();
        this.outlineColor = this._getOutlineColor();

        this.direction = this._getDirection();
    };

    GUIGauge.prototype._refreshGUI = function() {
        if (this.gaugeWidth === 0 || this.gaugeHeight === 0) {
            return;
        }

        this.bitmap = new Bitmap(this.gaugeWidth, this.gaugeHeight);
        this.drawGauge(0,0,this.gaugeWidth,this.rate,this.color1,this.color2);
    };

    GUI.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
        var fillW,
            fillH,
            height = this.gaugeHeight;

        if (this.direction === 'horizontal') {
            fillW = Math.floor(width * rate);
            fillH = height;
        }

        if (this.direction === 'vertical') {
            fillH = Math.floor(height * rate);
            fillW = width;
        }

        this.contents.fillRect(x, y, width, height, this.outlineColor);
        this.contents.fillRect(x+1, y+1, width-2, height-2, this.backColor);
        this.contents.gradientFillRect(x+1, y+1, fillW-2, fillH-2, color1, color2);
    };

    GUIGauge.prototype._getGaugeWidth = function() {
        return this.config.width || 0;
    };

    GUIGauge.prototype._getGaugeHeight = function() {
        return this.config.height || 0;
    };

    GUIGauge.prototype._getRate = function() {
        return eval(this.config.rate) || 1.0;
    };

    GUIGauge.prototype._getColor1 = function() {
        return this._evalConfig(this.config.color1) || '#000000';
    };

    GUIGauge.prototype._getColor2 = function() {
        return this._evalConfig(this.config.color2) || '#000000';
    };

    GUIGauge.prototype._getBackColor = function() {
        return this._evalConfig(this.config.backColor) || '#000000';
    };

    GUIGauge.prototype._getOutlineColor = function() {
        return this._evalConfig(this.config.outlineColor) || '#000000';
    };

    GUIGauge.prototype._getDirection = function() {
        return this.config.direction || 'horizontal';
    };

    LunaEngine.Core.Sprite.GUIGauge = GUIGauge;
}());
