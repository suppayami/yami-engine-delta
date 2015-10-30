/* globals YED: false */

(function($SkillShop) {
    /**
     * Window shows skills list for shop.
     *
     * @class
     * @extends external:Window_Selectable
     * @memberof YED.SkillShop.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} wh Window Height
     */
    var SkillShopSkills = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    SkillShopSkills.prototype =
        Object.create(Window_Selectable.prototype);
    SkillShopSkills.prototype.constructor = SkillShopSkills;

    /**
     * Initialize
     *
     * @constructs SkillShopSkills
     */
    SkillShopSkills.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();

        Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);

        this._windowCost = null;
        this._data = [];
        this._actor = null;
    };

    /**
     * Define Properties
     */
    Object.defineProperties(SkillShopSkills.prototype, {
        /**
         * Window to show current skill costs.
         *
         * @member {YED.SkillShop.Windows.SkillShopCosts}
         * @memberof YED.SkillShop.Windows.SkillShopSkills#
         */
        windowCost: {
            get: function() {
                return this._windowCost;
            },

            set: function(window) {
                this._windowCost = window;
                this._callUpdateCost();
            },

            configurable: true
        },

        /**
         * Skills list.
         *
         * @member {Object}
         * @memberof YED.SkillShop.Windows.SkillShopSkills#
         */
        data: {
            get: function() {
                return this._data;
            },

            set: function(data) {
                this._data = data.map(function(id) {
                    return $dataSkills[id];
                });
            },

            configurable: true
        },

        /**
         * Current Actor
         *
         * @member {Game_Actor}
         * @memberof YED.SkillShop.Windows.SkillShopSkills#
         */
        actor: {
            get: function() {
                return this._actor;
            },

            set: function(actor) {
                this._actor = actor;
                this.refresh();
            },

            configurable: true
        }
    });

    /**
     * Window height for initialize.
     *
     * @return {number} Window Height
     */
    SkillShopSkills.prototype.windowWidth = function() {
        return Graphics.boxWidth / 2;
    };

    /**
     * Refresh Window contents.
     */
    SkillShopSkills.prototype.refresh = function() {
        this.createContents();
        this.drawAllItems();
    };

    /**
     * Get current skill.
     *
     * @return {Object} Current select skill
     */
    SkillShopSkills.prototype.skill = function() {
        return this._data[this.index()];
    };

    /**
     * Get skills list size.
     *
     * @return {number} Total skills
     */
    SkillShopSkills.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    /**
     * Check if current skill is boughtable.
     *
     * @return {Boolean} Enabled Flag
     */
    SkillShopSkills.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.skill());
    };

    /**
     * Check if current skill is boughtable.
     *
     * @return {Boolean} Enabled Flag
     */
    SkillShopSkills.prototype.isEnabled = function(skill) {
        return !!skill ? this.actor.canBuySkill(skill) : false;
    };

    /**
     * Draw skill name.
     *
     * @param  {number} index Skill Index
     */
    SkillShopSkills.prototype.drawItem = function(index) {
        var skill = this._data[index],
            rect = this.itemRect(index);

        this.changePaintOpacity(this.isEnabled(skill));
        this.drawItemName(skill, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    };

    /**
     * Select item at certain index.
     *
     * @param {number} index Item index.
     */
    SkillShopSkills.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);

        this._callUpdateCost();
    };

    /**
     * Update Help Window.
     */
    SkillShopSkills.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.skill());
    };

    /**
     * Call update Cost Window.
     */
    SkillShopSkills.prototype._callUpdateCost = function() {
        if (this.active && this.windowCost) {
            this._updateCost();
        }
    };

    /**
     * Update Cost Window.
     */
    SkillShopSkills.prototype._updateCost = function() {
        this.windowCost.skill = this.skill();
    };

    $SkillShop.Windows.SkillShopSkills = SkillShopSkills;
}(YED.SkillShop));
