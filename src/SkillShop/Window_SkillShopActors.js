/* globals YED: false */

(function($SkillShop) {
    /**
     * Window shows actors list for shop.
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
    var SkillShopActors = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    SkillShopActors.prototype =
        Object.create(Window_Selectable.prototype);
    SkillShopActors.prototype.constructor = SkillShopActors;

    /**
     * Initialize
     *
     * @constructs SkillShopActors
     */
    SkillShopActors.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();

        Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);

        this._windowStatus = null;
        this.refresh();
    };

    /**
     * Define Properties
     */
    Object.defineProperties(SkillShopActors.prototype, {
        /**
         * Window to show current actor status.
         *
         * @member {Window_SkillStatus}
         * @memberof YED.SkillShop.Windows.SkillShopActors#
         */
        windowStatus: {
            get: function() {
                return this._windowStatus;
            },

            set: function(window) {
                this._windowStatus = window;
                this._callUpdateStatus();
            },

            configurable: true
        }
    });

    /**
     * Window height for initialize.
     *
     * @return {number} Window Height
     */
    SkillShopActors.prototype.windowWidth = function() {
        return Graphics.boxWidth / 2;
    };

    /**
     * Refresh Window contents.
     */
    SkillShopActors.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    /**
     * Get actors list.
     */
    SkillShopActors.prototype.makeItemList = function() {
        this._data = $gameParty.members();
    };

    /**
     * Get current actor.
     *
     * @return {Game_Actor} Current select actor
     */
    SkillShopActors.prototype.actor = function() {
        return this._data[this.index()];
    };

    /**
     * Get party current size.
     *
     * @return {number} Total actors
     */
    SkillShopActors.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    /**
     * Draw actor status.
     *
     * @param  {number} index Actor Index
     */
    SkillShopActors.prototype.drawItem = function(index) {
        var actor = this._data[index],
            rect = this.itemRect(index);

        this.drawActorFace(actor, rect.x + 1, rect.y + 1, rect.height - 2, rect.height - 2);
        this.drawActorName(actor, rect.x + rect.height + 4, rect.y, rect.width);
    };

    /**
     * Draw face mini.
     */
    Window_Base.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
        var bitmap = ImageManager.loadFace(faceName);
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sw = pw;
        var sh = ph;
        var dx = x;
        var dy = y;
        var sx = faceIndex % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;

        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, width, height);
    };

    /**
     * Draw actor name.
     */
    SkillShopActors.prototype.drawActorName = function(actor, x, y, width) {
        this.drawText(actor.name(), x, y, width);
    };

    /**
     * Select item at certain index.
     *
     * @param {number} index Item index.
     */
    SkillShopActors.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);

        this._callUpdateStatus();
    };

    /**
     * Call update Status Window.
     */
    SkillShopActors.prototype._callUpdateStatus = function() {
        if (this.active && this.windowStatus) {
            this._updateStatus();
        }
    };

    /**
     * Update Status Window.
     */
    SkillShopActors.prototype._updateStatus = function() {
        this.windowStatus.setActor(this.actor());
    };

    $SkillShop.Windows.SkillShopActors = SkillShopActors;
}(YED.SkillShop));
