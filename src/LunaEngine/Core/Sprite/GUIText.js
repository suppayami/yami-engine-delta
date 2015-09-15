/* globals LunaEngine: false */

(function() {
    // dependencies
    var GUI = LunaEngine.Core.Sprite.GUI;

    var GUIText = function() {
        this.initialize.apply(this, arguments);
    };

    GUIText.prototype = Object.create(GUI.prototype);
    GUIText.prototype.constructor = GUIText;

    GUIText.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);

        this.bitmap = new Bitmap(1,1);
    };

    GUIText.prototype.refresh = function() {
        var text       = this.value,
            lines      = text.split('\n'),
            lineNumber = lines.length,
            width  = 0,
            height = 0;

        for (var i = 0; i < lineNumber; i++) {
            if (width < this.textWidth(lines[i])) {
                width = this.textWidth(lines[i]);
            }
        }

        height = this.lineHeight() * lineNumber;

        this.bitmap.resize(width, height);
        this.bitmap.clear();
        this.bitmap.drawTextEx(text, 0, 0);
    };

    GUIText.prototype._getCurrentValue = function() {
        // "Text" || Number
        return "";
    };

    LunaEngine.Core.Sprite.GUIText = GUIText;
}());
