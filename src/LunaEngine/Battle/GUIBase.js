/* globals LunaEngine: false */

(function() {
    var GUIBase = function() {
        this.initialize.apply(this, arguments);
    };

    GUIBase.prototype = Object.create(Sprite.prototype);
    GUIBase.prototype.constructor = GUIBase;

    GUIBase.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
    };

    LuanEngine.Battle.GUIBase = GUIBase;
}());
