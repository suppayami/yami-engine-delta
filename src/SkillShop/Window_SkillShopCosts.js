/* globals YED: false */

(function($SkillShop) {
    /**
     * Shorten Dependencies
     */
    var Utils = $SkillShop.Utils;

    /**
     * Window shows buying costs for skill.
     *
     * @class
     * @extends external:Window_Base
     * @memberof YED.SkillShop.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} wh Window Height
     */
    var SkillShopCosts = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    SkillShopCosts.prototype = Object.create(Window_Base.prototype);
    SkillShopCosts.prototype.constructor = SkillShopCosts;

    /**
     * Initialize
     *
     * @constructs SkillShopCosts
     */
    SkillShopCosts.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();

        Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);

        this._skill = null;
        this.refresh();
    };

    /**
     * Define Properties
     */
    Object.defineProperties(SkillShopCosts.prototype, {
        /**
         * Current skill.
         *
         * @member {Object}
         * @memberof YED.SkillShop.Windows.SkillShopCosts#
         */
        skill: {
            get: function() {
                return this._skill;
            },

            set: function(skill) {
                this._skill = skill;
                this.refresh();
            },

            configurable: true
        }
    });

    /**
     * Window height for initialize.
     *
     * @return {number} Window Width
     */
    SkillShopCosts.prototype.windowWidth = function() {
        return Graphics.boxWidth / 2;
    };

    /**
     * Refresh window contents.
     */
    SkillShopCosts.prototype.refresh = function() {
        var rect = new Rectangle();

        rect.x = 2;
        rect.y = 0;
        rect.width = this.contentsWidth() - 2;
        rect.height = this.lineHeight();

        this.contents.clear();
        this.resetFontSettings();

        if (!this.skill) {
            return;
        }

        this.drawItemName(this.skill, rect.x, rect.y, rect.width);
        // ---
        rect.y += this.lineHeight();
        // ---
        this._drawCostGold(this.skill, rect);
        // ---
        this._drawCostItems(this.skill, rect);
        // ---
        this._drawCostCustom(this.skill, rect);
    };

    /**
     * Draw gold cost for skill.
     */
    SkillShopCosts.prototype._drawCostGold = function(item, rect) {
        var text = Utils.parameters['Gold Cost Text'];

        if (item.getBuyCostGold() <= 0) {
            return;
        }

        this.changeTextColor(this.systemColor());
        this.drawText(text, rect.x, rect.y, rect.width);

        this.drawCurrencyValue(item.getBuyCostGold(),
            this._currencyUnit(), rect.x, rect.y, rect.width);

        rect.y += this.lineHeight();
    };

    /**
     * Draw gold cost for skill.
     */
    SkillShopCosts.prototype._drawCostItems = function(item, rect) {
        var text = Utils.parameters['Item Cost Text'],
            itemCosts = item.getBuyCostItems(),
            cost;

        if (itemCosts.length === 0) {
            return;
        }

        this.changeTextColor(this.systemColor());
        this.drawText(text, rect.x, rect.y, rect.width);

        rect.y += this.lineHeight();

        for (var i = 0; i < itemCosts.length; i++) {
            cost = itemCosts[i];

            this.drawItemName(cost[0], rect.x, rect.y,
                rect.width - this._numberWidth());

            this.drawText('x', rect.x, rect.y,
                rect.width - this.textWidth('00'), 'right');
            this.drawText(cost[1], rect.x, rect.y, rect.width, 'right');

            rect.y += this.lineHeight();
        }
    };

    /**
     * Draw gold cost for skill.
     */
    SkillShopCosts.prototype._drawCostCustom = function(item, rect) {
        var customCosts = item.getBuyCustomText();

        this.drawTextEx(customCosts, rect.x, rect.y);
    };

    /**
     * Get currency unit.
     *
     * @return {String} Currency Unit
     */
    SkillShopCosts.prototype._currencyUnit = function() {
        return TextManager.currencyUnit;
    };

    /**
     * Get number width for item requirements.
     */
    SkillShopCosts.prototype._numberWidth = function() {
        return this.textWidth('000');
    };

    $SkillShop.Windows.SkillShopCosts = SkillShopCosts;
}(YED.SkillShop));
