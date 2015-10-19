/* globals LunaEngine: false */

(function($LunaEngine, $Window_Base) {
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
        this._select = false;

        this._selectEnemy = false;
        this._selectAction = false;

        this._conditions = [];

        this.loadWindowskin();
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

    GUI.prototype.select = function() {
        this._select = true;
    };

    GUI.prototype.deselect = function() {
        this._select = false;
    };

    GUI.prototype.setSelectEnemy = function(flag) {
        this._selectEnemy = flag;
    };

    GUI.prototype.setSelectAction = function(flag) {
        this._selectAction = flag;
    };

    GUI.prototype._setupConfig = function(config) {
        var result = JSON.parse(JSON.stringify(config));

        for (var key in result) {
            if (typeof result[key] === 'string') {
                result[key] = this._evalConfig(result[key]);
            }
        }

        return result;
    };

    GUI.prototype._evalConfig = function(string) {
        var matches,
            evals,
            thisEval;

        if (!string) {
            return "";
        }

        thisEval = function(s) { return eval(s); };
        thisEval = thisEval.bind(this);

        matches = string.match(/\{[^{}]+\}/g);

        if (!matches) {
            return string;
        }

        evals = matches.map(thisEval);

        for (var i = 0; i < matches.length; i++) {
            string = string.replace(matches[i], evals[i]);
        }

        return string;
    };

    GUI.prototype._evalCondition = function(config) {
        var result = JSON.parse(JSON.stringify(config)),
            conditionals = result.conditional,
            cond,
            evaluate;

        if (!conditionals) {
            return result;
        }

        for (var i = 0; i < conditionals.length; i++) {
            cond = conditionals[i];

            if (!this._conditions[i]) {
                this._conditions[i] = new Function(
                    'return ' + cond.condition + ';'
                ).bind(this);
            }

            evaluate = this._conditions[i];

            if (!evaluate()) {
                continue;
            }

            for (var key in cond.properties) {
                result[key] = cond.properties[key];
            }
        }

        return result;
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
            return this._evalCondition(this._config);
        },
        set: function(value) {
            this._config = JSON.parse(JSON.stringify(value));
            this.setupGUI();
        },
        configurable: true
    });

    GUI.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);

        this.updateGUIParams();
        this.updateAnimation();
    };

    GUI.prototype.updateGUIParams = function() {
        this.updateGUIVisible();
        this.updateGUIPosition();
        this.updateGUIColor();
    };

    GUI.prototype.updateGUIVisible = function() {
        var visible = this._getVisible();

        if (this.visible !== visible) {
            this.visible = visible;
        }
    };

    GUI.prototype.updateGUIPosition = function() {
        var x = this._getX(),
            y = this._getY();

        if (this.x !== x || this.y !== y) {
            this.move(x, y);
        }
    };

    GUI.prototype.updateGUIColor = function() {
        var colorTone = this._getColorTone();

        this.setColorTone(colorTone);
    };

    GUI.prototype.updateAnimation = function() {
        if (!this.actor || !this._isShowAnimation()) {
            return;
        }

        this.setupAnimation();
    };

    GUI.prototype.setupAnimation = function() {
        while (this.actor.isLunaAnimationRequested()) {
            var data = this.actor.shiftLunaAnimation();
            var animation = $dataAnimations[data.animationId];
            var mirror = data.mirror;
            var delay = animation.position === 3 ? 0 : data.delay;
            this.startAnimation(animation, mirror, delay);
        }
    };

    GUI.prototype.refresh = function() {
        this._refreshGUI();
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

    GUI.prototype._getVisible = function() {
        if (this.config.visible === undefined) {
            return true;
        }

        return this.config.visible;
    };

    GUI.prototype._getConditions = function() {
        return this._config.conditional; // avoid infinite loops
    };

    GUI.prototype._isShowAnimation = function() {
        return !!this._config.showAnimation;
    };

    GUI.prototype.isSelectingActor = function() {
        return this._select;
    };

    GUI.prototype.isSelectingEnemy = function() {
        return this._selectEnemy;
    };

    GUI.prototype.isSelectingAction = function() {
        return this._selectAction;
    };

    GUI.prototype.loadWindowskin = $Window_Base.prototype.loadWindowskin;
    GUI.prototype.lineHeight = $Window_Base.prototype.lineHeight;
    GUI.prototype.standardFontFace = $Window_Base.prototype.standardFontFace;
    GUI.prototype.standardFontSize = $Window_Base.prototype.standardFontSize;
    GUI.prototype.textPadding = $Window_Base.prototype.textPadding;
    GUI.prototype.resetFontSettings = function() {};
    GUI.prototype.resetTextColor = $Window_Base.prototype.resetTextColor;
    GUI.prototype.textColor = $Window_Base.prototype.textColor;
    GUI.prototype.normalColor = $Window_Base.prototype.normalColor;
    GUI.prototype.systemColor = $Window_Base.prototype.systemColor;
    GUI.prototype.crisisColor = $Window_Base.prototype.crisisColor;
    GUI.prototype.deathColor = $Window_Base.prototype.deathColor;
    GUI.prototype.gaugeBackColor = $Window_Base.prototype.gaugeBackColor;
    GUI.prototype.hpGaugeColor1 = $Window_Base.prototype.hpGaugeColor1;
    GUI.prototype.hpGaugeColor2 = $Window_Base.prototype.hpGaugeColor2;
    GUI.prototype.mpGaugeColor1 = $Window_Base.prototype.mpGaugeColor1;
    GUI.prototype.mpGaugeColor2 = $Window_Base.prototype.mpGaugeColor2;
    GUI.prototype.mpCostColor = $Window_Base.prototype.mpCostColor;
    GUI.prototype.powerUpColor = $Window_Base.prototype.powerUpColor;
    GUI.prototype.powerDownColor = $Window_Base.prototype.powerDownColor;
    GUI.prototype.tpGaugeColor1 = $Window_Base.prototype.tpGaugeColor1;
    GUI.prototype.tpGaugeColor2 = $Window_Base.prototype.tpGaugeColor2;
    GUI.prototype.tpCostColor = $Window_Base.prototype.tpCostColor;
    GUI.prototype.pendingColor = $Window_Base.prototype.pendingColor;
    GUI.prototype.translucentOpacity = $Window_Base.prototype.translucentOpacity;
    GUI.prototype.changeTextColor = $Window_Base.prototype.changeTextColor;
    GUI.prototype.changePaintOpacity = $Window_Base.prototype.changePaintOpacity;
    GUI.prototype.drawText = $Window_Base.prototype.drawText;
    GUI.prototype.textWidth = $Window_Base.prototype.textWidth;
    GUI.prototype.drawTextEx = $Window_Base.prototype.drawTextEx;
    GUI.prototype.convertEscapeCharacters = $Window_Base.prototype.convertEscapeCharacters;
    GUI.prototype.actorName = $Window_Base.prototype.actorName;
    GUI.prototype.partyMemberName = $Window_Base.prototype.partyMemberName;
    GUI.prototype.processCharacter = $Window_Base.prototype.processCharacter;
    GUI.prototype.processNormalCharacter = $Window_Base.prototype.processNormalCharacter;
    GUI.prototype.processNewLine = $Window_Base.prototype.processNewLine;
    GUI.prototype.obtainEscapeCode = $Window_Base.prototype.obtainEscapeCode;
    GUI.prototype.obtainEscapeParam = $Window_Base.prototype.obtainEscapeParam;
    GUI.prototype.processEscapeCharacter = $Window_Base.prototype.processEscapeCharacter;
    GUI.prototype.processDrawIcon = $Window_Base.prototype.processDrawIcon;
    GUI.prototype.makeFontBigger = $Window_Base.prototype.makeFontBigger;
    GUI.prototype.makeFontSmaller = $Window_Base.prototype.makeFontSmaller;
    GUI.prototype.calcTextHeight = $Window_Base.prototype.calcTextHeight;
    GUI.prototype.drawIcon = $Window_Base.prototype.drawIcon;
    GUI.prototype.drawFace = $Window_Base.prototype.drawFace;
    GUI.prototype.drawCharacter = $Window_Base.prototype.drawCharacter;
    GUI.prototype.drawGauge = $Window_Base.prototype.drawGauge;

    $LunaEngine.Core.Sprite.GUI = GUI;
}(LunaEngine, Window_Base));
