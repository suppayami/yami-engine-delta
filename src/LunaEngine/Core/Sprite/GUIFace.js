/* globals LunaEngine: false */

(function() {
    // dependencies
    var GUI = LunaEngine.Core.Sprite.GUI;

    var GUIFace = function() {
        this.initialize.apply(this, arguments);
    };

    GUIFace.prototype = Object.create(GUI.prototype);
    GUIFace.prototype.constructor = GUIFace;

    GUIFace.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);

        this.bitmap = new Bitmap(Window_Base._faceWidth,
            Window_Base._faceHeight);
    };

    GUIFace.prototype.refresh = function() {
        var faceName = this.value[0],
            faceIndex = this.value[1];

        this.bitmap.clear();
        this.bitmap.drawFace(faceName, faceIndex, 0, 0);
    };

    GUIFace.prototype._getCurrentValue = function() {
        // [faceName, faceIndex]
        return ["", 0];
    };

    LunaEngine.Core.Sprite.GUIFace = GUIFace;
}());
