(function() {
    var _Scene_Boot_initialize = Scene_Boot.prototype.initialize;

    Graphics.loadDefaultFont = function() {
        var name = 'GameFont',
            span = document.createElement('span'),
            text = document.createTextNode('Loading Font...');

        span.style.color = 'transparent';
        span.style.fontFamily = 'GameFont';
        span.appendChild(text);
        document.body.appendChild(span);
    };

    Scene_Boot.prototype.initialize = function() {
        _Scene_Boot_initialize.call(this);
        Graphics.loadDefaultFont();
    };

    Scene_Boot.prototype.isGameFontLoaded = function() {
        if (Graphics.isFontLoaded('GameFont')) {
            return true;
        } else {
            var elapsed = Date.now() - this._startDate;
            if (elapsed >= 60000) {
                throw new Error('Failed to load GameFont');
            }
        }
    };
}());
