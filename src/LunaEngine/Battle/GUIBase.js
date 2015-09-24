/* globals LunaEngine: false */

(function() {
    var SpriteClasses = LunaEngine.Core.Sprite,
        GUIText = LunaEngine.Core.Sprite.GUIText,
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

    GUIBase.prototype.refresh = function() {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.refresh();
        }
    };

    GUIBase.prototype.select = function() {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.select();
        }
    };

    GUIBase.prototype.deselect = function() {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.deselect();
        }
    };

    GUIBase.prototype.setSelectEnemy = function(flag) {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.setSelectEnemy(flag);
        }
    };

    GUIBase.prototype.setSelectAction = function(flag) {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.setSelectAction(flag);
        }
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

            sprite.setupGUI();
        }
    };

    GUIBase.prototype._getSpriteClass = function(config) {
        var Class;

        Class = SpriteClasses[config.class];
        return Class;
    };

    LunaEngine.Battle.GUIBase = GUIBase;
}());
