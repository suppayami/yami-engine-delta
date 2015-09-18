/* globals LunaEngine: false */

(function() {
    var HUD = function() {
        this.initialize.apply(this, arguments);
    };

    HUD.prototype = Object.create(Window_Base.prototype);
    HUD.prototype.constructor = HUD;

    HUD.prototype.initialize = function() {
        Window_Base.prototype.initialize.call(this);
    };

    LuanEngine.Battle.HUD = HUD;
}());
