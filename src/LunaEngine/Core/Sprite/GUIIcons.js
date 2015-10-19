/* globals LunaEngine: false */

(function($LunaEngine, $Window_Base, $Bitmap) {
    // dependencies
    var GUI = $LunaEngine.Core.Sprite.GUI;

    var GUIIcons = function() {
        this.initialize.apply(this, arguments);

        this._iconIds = [];

        this._maxIcons  = 1;
        this._direction = 'horizontal';

        this._fnGetIcons = null;
    };

    GUIIcons.prototype = Object.create(GUI.prototype);
    GUIIcons.prototype.constructor = GUIIcons;

    GUIIcons.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);
    };

    Object.defineProperty(GUIIcons.prototype, 'iconIds', {
        get: function() {
            return this._iconIds;
        },
        set: function(value) {
            if (!this._iconIds.equals(value)) {
                this._iconIds = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIIcons.prototype, 'maxIcons', {
        get: function() {
            return this._maxIcons;
        },
        set: function(value) {
            if (this._maxIcons !== value) {
                this._maxIcons = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIIcons.prototype, 'direction', {
        get: function() {
            return this._direction.toLowerCase();
        },
        set: function(value) {
            if (this._direction !== value) {
                this._direction = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIIcons.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.iconIds = this._getIconIds();
        this.maxIcons = this._getMaxIcons();
        this.direction = this._getDirection();
    };

    GUIIcons.prototype._refreshGUI = function() {
        var width = $Window_Base._iconWidth,
            height = $Window_Base._iconHeight,
            x = 0,
            y = 0;

        if (this.direction === 'horizontal') {
            x = width;
            width = width * this.maxIcons;
        }

        if (this.direction === 'vertical') {
            y = height;
            height = height * this.maxIcons;
        }

        this.bitmap = new $Bitmap(width, height);

        for (var i = 0; i < this.iconIds.length; i++) {
            this.drawIcon(this.iconIds[i], x * i, y * i);
        }
    };

    GUIIcons.prototype._getIconIds = function() {
        var iconIds = this.config.iconIds;

        if (!this._fnGetIcons && !!this.actor) {
            this._fnGetIcons = new Function(
                'return ' + iconIds + ';'
            ).bind(this);
        }

        if (!!this._fnGetIcons) {
            return this._fnGetIcons();
        }

        return [];
    };

    GUIIcons.prototype._getMaxIcons = function() {
        return this.config.maxIcons || 1;
    };

    GUIIcons.prototype._getDirection = function() {
        return this.config.direction || 'horizontal';
    };

    $LunaEngine.Core.Sprite.GUIIcons = GUIIcons;
}(LunaEngine, Window_Base, Bitmap));
