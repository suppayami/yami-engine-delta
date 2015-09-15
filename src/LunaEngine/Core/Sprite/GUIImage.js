/* globals LunaEngine: false */

(function() {
    // dependencies
    var GUI = LunaEngine.Core.Sprite.GUI;

    var GUIImage = function() {
        this.initialize.apply(this, arguments);
    };

    GUIImage.prototype = Object.create(GUI.prototype);
    GUIImage.prototype.constructor = GUIImage;

    GUIImage.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);
    };

    GUIImage.prototype.refresh = function() {
        this.bitmap = ImageManager.loadNormalBitmap(this.value, 0);
    };

    GUIImage.prototype._getCurrentValue = function() {
        // img/folder/file.png
        return "";
    };

    LunaEngine.Core.Sprite.GUIImage = GUIImage;
}());
