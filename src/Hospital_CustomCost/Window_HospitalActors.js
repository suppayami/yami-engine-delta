/* globals YED: false */

(function($Hospital) {
    var HospitalActors = $Hospital.Windows.HospitalActors;

    /**
     * Draw actor hospital fees.
     *
     * @param  {Game_Actor} actor Actor
     * @param  {number} x     Draw at X
     * @param  {number} y     Draw at Y
     * @param  {number} width Limit Text Width
     */
    HospitalActors.prototype.drawActorHospital = function(actor, x, y, width) {
        var items = actor.getHospitalItemCosts();

        width = width || 168;

        if (items.length > 0) {
            this.drawItemCosts(actor, x, y, width);
        }

        if (items.length === 0) {
            this.drawCurrencyValue(actor.hospitalFee(),
                this.currencyUnit(), x, y, width);
        }
    };

    /**
     * Draw actor hospital fees.
     *
     * @param  {Game_Actor} actor Actor
     * @param  {number} x     Draw at X
     * @param  {number} y     Draw at Y
     * @param  {number} width Limit Text Width
     */
    HospitalActors.prototype.drawItemCosts = function(actor, x, y, width) {
        var items = actor.getHospitalItemCosts(),
            itemWidth = Window_Base._iconWidth + this.textPadding(),
            dx = x;

        width = width || 168;
        items = items.slice(0, Math.floor(width / itemWidth));
        dx    = dx + width;

        for (var i = items.length - 1; i >= 0; i--) {
            dx -= Window_Base._iconWidth;
            this.drawIcon(items[i][0].iconIndex, dx, y);

            dx -= Window_Base._iconWidth;
            dx -= this.textPadding() / 2;
            this.drawText(items[i][1]+"x", dx, y, Window_Base._iconWidth + this.textPadding() / 2, 0);

            dx -= this.textPadding() / 2;
        }
    };
}(YED.Hospital));
