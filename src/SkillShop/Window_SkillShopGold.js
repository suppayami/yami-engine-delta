/* globals YED: false */

(function($SkillShop) {
    /**
     * Window shows party gold.
     *
     * @class
     * @extends external:Window_Gold
     * @memberof YED.SkillShop.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} [wh] Window Height
     */
    var SkillShopGold = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    SkillShopGold.prototype = Object.create(Window_Gold.prototype);
    SkillShopGold.prototype.constructor = SkillShopGold;

    SkillShopGold.prototype.windowWidth = function() {
        return Graphics.boxWidth / 2;
    };

    /**
     * Initialize
     *
     * @constructs SkillShopGold
     */
    SkillShopGold.prototype.initialize = function(wx, wy) {
        Window_Gold.prototype.initialize.call(this, wx, wy);
    };

    $SkillShop.Windows.SkillShopGold = SkillShopGold;
}(YED.SkillShop));
