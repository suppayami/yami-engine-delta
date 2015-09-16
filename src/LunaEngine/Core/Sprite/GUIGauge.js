/* globals LunaEngine: false */

(function() {
    // dependencies
    var GUI = LunaEngine.Core.Sprite.GUI;

    var GUIGauge = function() {
        this.initialize.apply(this, arguments);
    };

    GUIGauge.prototype = Object.create(GUI.prototype);
    GUIGauge.prototype.constructor = GUIGauge;

    GUIGauge.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);

        this.bitmap = new Bitmap(1,1);
    };

    GUIGauge.prototype.drawGUI = function() {

    };

    LunaEngine.Core.Sprite.GUIGauge = GUIGauge;
}());
