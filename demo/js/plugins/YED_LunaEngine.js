/**
 * @namespace LunaEngine
 */

var LunaEngine = LunaEngine || {};

/**
 * @namespace Core
 * @memberof LunaEngine
 */

LunaEngine.Core = {};
LunaEngine.Core.Sprite = {};

/**
 * @namespace Battle
 * @memberof LunaEngine
 */

LunaEngine.Battle = {};
LunaEngine.Battle.Sprite = {};

/* globals LunaEngine: false */

(function() {
    // Status Spritesets
    var HUD = {
        /* Position */
        x: 192,
        y: 444,

        /* Grid and size */
        width:  624,
        height: 180,
        grid:   4,
        direction: 'horizontal',

        /* Background */
        background: {
            type:  'window', // 'window' or 'image'
            image: 'Window'  // Windowskin or path to image
                             // image should be full path
                             // Example: img/system/BG.png
        }
    };

    // Status Elements
    var GUISprites = {
        spriteFace: {
            /* GUI Type */
            class: 'GUIFace',

            /* Position */
            x: 0,
            y: 0,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            faceName:  '{this.actor.faceName()}',
            faceIndex: '{this.actor.faceIndex()}',

            /* Conditional Properties */
            conditional: [
                {
                    condition: 'this.actor.isDead()',
                    properties: {
                        tone: [0,0,0,255]
                    }
                },

                {
                    condition: 'this.actor.hpRate() < 0.5',
                    properties: {
                        tone: [96,0,0,0]
                    }
                },

                {
                    condition: 'this.isSelectingActor()',
                    properties: {
                        tone: [64,64,64,0]
                    }
                }
            ]
        }, // spriteFace

        spriteName: {
            /* GUI Type */
            class: 'GUIText',

            /* Position */
            x: 0,
            y: 0,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            text: '{this.actor.name()}',

            fontFace: '{this.standardFontFace()}',
            fontSize: '{this.standardFontSize()}',

            textColor: '{this.normalColor()}',
            outlineColor: 'rgba(0,0,0,0.5)',

            /* Conditional Properties */
            conditional: [
                {
                    condition: 'this.actor.isDead()',
                    properties: {
                        textColor: '{this.deathColor()}'
                    }
                },

                {
                    condition: 'this.actor.hpRate() < 0.5',
                    properties: {
                        textColor: '{this.crisisColor()}'
                    }
                }
            ]
        }, // spriteName

        spriteHPNumber: {
            /* GUI Type */
            class: 'GUIText',

            /* Position */
            x: 0,
            y: 72,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            text: 'HP: {this.actor.hp} / {this.actor.mhp}',

            fontFace: '{this.standardFontFace()}',
            fontSize: '{this.standardFontSize()}',

            textColor: '{this.normalColor()}',
            outlineColor: 'rgba(0,0,0,0.5)',

            /* Conditional Properties */
            conditional: [

            ]
        }, // spriteHPNumber

        spriteMPNumber: {
            /* GUI Type */
            class: 'GUIText',

            /* Position */
            x: 0,
            y: 108,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            text: 'MP: {this.actor.mp} / {this.actor.mmp}',

            fontFace: '{this.standardFontFace()}',
            fontSize: '{this.standardFontSize()}',

            textColor: '{this.normalColor()}',
            outlineColor: 'rgba(0,0,0,0.5)',

            /* Conditional Properties */
            conditional: [

            ]
        } // spriteMPNumber
    };

    LunaEngine.Battle.Config.HUD = HUD;
    LunaEngine.Battle.Config.GUISprites = GUISprites;
}());

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
        this._config = {};
        this._attach = {};
    };

    GUI.prototype.setupGUI = function() {
        this.updateGUIParams();
    };

    GUI.prototype.attach = function(name, object) {
        if (!!this._attach[name] && this._attach[name] === object) {
            return;
        }

        this._attach[name] = object;
        this.updateGUIParams();

        Object.defineProperty(this, name, {
            get: function() {
                return this._attach[name];
            },
            configurable: true
        });
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

    Object.defineProperty(GUI.prototype, 'config', {
        get: function() {
            return this._config;
        },
        set: function(value) {
            if (this._config !== value) {
                this._config = value;
                this.setupGUI();
            }
        },
        configurable: true
    });

    GUI.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);

        this.updateGUIParams();
    };

    GUI.prototype.updateGUIParams = function() {
        this.updateGUIPosition();
        this.updateGUIColor();
    };

    GUI.prototype.updateGUIPosition = function() {
        var x = this._getX(),
            y = this._getY();

        this.move(x, y);
    };

    GUI.prototype.updateGUIColor = function() {
        var colorTone = this._getColorTone();

        this.setColorTone(colorTone);
    };

    GUI.prototype._refreshGUI = function() {
        // polymorph!
    };

    GUI.prototype._getX = function() {
        return this.config.x || 0;
    };

    GUI.prototype._getY = function() {
        return this.config.y || 0;
    };

    GUI.prototype._getColorTone = function() {
        return this.config.tone || [0,0,0,0];
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

        height = this.lineHeight() * lineNumber;

        this.bitmap.clear();
        this.bitmap.resize(width, height);
        this.bitmap.drawTextEx(text, 0, 0);
    };

    GUIText.prototype._getText = function() {
        return this.config.text || "";
    };

    GUIText.prototype._getFontFace = function() {
        return this.config.fontFace || this.standardFontFace();
    };

    GUIText.prototype._getFontSize = function() {
        return this.config.fontSize || this.standardFontSize();
    };

    GUIText.prototype._getTextColor = function() {
        return this.config.textColor || this.normalColor();
    };

    GUIText.prototype._getOutlineColor = function() {
        return this.config.outlineColor || "rgba(0,0,0,0.5)";
    };

    LunaEngine.Core.Sprite.GUIText = GUIText;
}());

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
        this.bitmap.drawFace(faceName, faceIndex, 0, 0);
    };

    GUIFace.prototype._getFaceName = function() {
        return this.config.faceName || "";
    };

    GUIFace.prototype._getFaceIndex = function() {
        return this.config.faceIndex || 0;
    };

    LunaEngine.Core.Sprite.GUIFace = GUIFace;
}());

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
        return this.config.imagePath || "";
    };

    GUIImage.prototype._getHue = function() {
        return this.config.hue || 0;
    };

    GUIImage.prototype._getRect = function() {
        return this.config.rect || [0,0,0,0];
    };

    LunaEngine.Core.Sprite.GUIImage = GUIImage;
}());

/* globals LunaEngine: false */

(function() {
    var GUIText = LunaEngine.Core.Sprite.GUIText,
        GUIFace = LunaEngine.Core.Sprite.GUIFace,
        GUIImage = LunaEngine.Core.Sprite.GUIImage;

    var GUIBase = function() {
        this.initialize.apply(this, arguments);
    };

    GUIBase.prototype = Object.create(Sprite.prototype);
    GUIBase.prototype.constructor = GUIBase;

    GUIBase.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);

        this._config = {};
        this._actor  = null;
        this._guiSprites = [];
    };

    Object.defineProperty(GUIBase.prototype, 'config', {
        get: function() {
            return this._config;
        },
        set: function(value) {
            if (this._config !== value) {
                this._config = value;
                this.setupGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIBase.prototype, 'actor', {
        get: function() {
            return this._actor;
        },
        set: function(value) {
            if (this._actor !== value) {
                this._actor = value;
                this.onActorChange();
            }
        },
        configurable: true
    });

    GUIBase.prototype.setupGUI = function() {
        this._createSprites();
    };

    GUIBase.prototype.onActorChange = function() {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.attach('actor', this.actor);
        }
    };

    GUIBase.prototype._createSprites = function() {
        var spriteConfig,
            Class,
            sprite;

        for (var key in this.config) {
            spriteConfig = this.config[key];

            Class = this._getSpriteClass(spriteConfig);
            sprite = new Class();

            sprite.attach('actor', this.actor);
            sprite.config = spriteConfig;

            this._guiSprites.push(sprite);
            this.addChild(sprite);
        }
    };

    GUIBase.prototype._getSpriteClass = function(config) {
        var Class;

        switch (config.class) {
        case 'GUIText':
            Class = GUIText;
            break;
        case 'GUIFace':
            Class = GUIFace;
            break;
        case 'GUIImage':
            Class = GUIImage;
            break;
        }

        return Class;
    };

    LunaEngine.Battle.GUIBase = GUIBase;
}());

/* globals LunaEngine: false */

(function() {
    var Config  = LunaEngine.Battle.Config.HUD,
        GUIConfig = LunaEngine.Battle.Config.GUISprites,
        GUIBase = LunaEngine.Battle.GUIBase;

    var HUD = function() {
        this.initialize.apply(this, arguments);
    };

    HUD.prototype = Object.create(Sprite.prototype);
    HUD.prototype.constructor = HUD;

    HUD.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);

        this._guiSpritesets = [];
        this.setupGUI();
    };

    HUD.prototype.setupGUI = function() {
        var battlers = $gameParty.battleMembers(),
            guiBase;

        for (var i = 0; i < battlers.length; i++) {
            guiBase = new GUIBase();

            guiBase.x = this._getGUIX(i);
            guiBase.y = this._getGUIY(i);

            guiBase.actor = battlers[i];
            guiBase.config = this._getGUIConfig();

            this._guiSpritesets.push(guiBase);
            this.addChild(guiBase);
        }
    };

    HUD.prototype.update = function() {
        Sprite.prototype.update.call(this);

        this.updateActors();
        this.updatePosition();
    };

    HUD.prototype.updateActors = function() {
        var battlers = $gameParty.battleMembers(),
            spriteset;

        for (var i = 0; i < this._guiSpritesets.length; i++) {
            spriteset = this._guiSpritesets[i];

            if (!battlers[i]) {
                this.removeChild(spriteset);
            }

            spriteset.actor = battlers[i];
        }
    };

    HUD.prototype.updateActors = function() {
        var spriteset;

        for (var i = 0; i < this._guiSpritesets.length; i++) {
            spriteset = this._guiSpritesets[i];

            spriteset.x = this._getGUIX(i);
            spriteset.y = this._getGUIY(i);
        }
    };

    HUD.prototype._getX = function() {
        return Config.x || 0;
    };

    HUD.prototype._getY = function() {
        return Config.y || 0;
    };

    HUD.prototype._getGUIX = function(index) {
        if (Config.direction === 'horizontal') {
            return Math.round(Config.width / Config.grid * index);
        }

        return 0;
    };

    HUD.prototype._getGUIY = function(index) {
        if (Config.direction === 'vertical') {
            return Math.round(Config.height / Config.grid * index);
        }

        return 0;
    };

    HUD.prototype._getGUIConfig = function() {
        return GUIConfig;
    };

    LunaEngine.Battle.HUD = HUD;
}());
