/* globals LunaEngine: false */

(function() {
    var Base = function() {
        this.initialize.apply(this, arguments);
    };

    Base.prototype = Object.create(Sprite_Base.prototype);
    Base.prototype.constructor = Base;

    Base.prototype.initialize = function() {

    };

    LunaEngine.Core.Sprite.Base = Base;
}());
