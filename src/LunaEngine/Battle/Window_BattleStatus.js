/* globals LunaEngine: false */

(function() {

    var Config = LunaEngine.Battle.Config.HUD;
    var _Window_BattleStatus_update
        = Window_BattleStatus.prototype.update;

    Window_BattleStatus.prototype.windowWidth = function() {
        return Config.background.window.width;
    };

    Window_BattleStatus.prototype.windowHeight = function() {
        return Config.background.window.height;
    };

    Window_BattleStatus.prototype.refresh = function() {
        this.contents.clear();

        this.x = Config.x + Config.background.offsetX;
        this.y = Config.y + Config.background.offsetY;

        if (Config.background.type === 'image') {
            this._refreshImageBackground();
        }
        // this.drawAllItems();
    };

    Window_BattleStatus.prototype._refreshImageBackground = function() {
        var bitmap
            = ImageManager.loadSystem(Config.background.image.filename);

        this.opacity = 0;
        this._backgroundSprite = this._backgroundSprite || new Sprite(bitmap);
        this._backgroundSprite.bitmap = bitmap;

        this.addChild(this._backgroundSprite);
    };

    Window_BattleStatus.prototype.drawItem = function(index) {
        // destroy
    };

    Window_BattleStatus.prototype.updateCursor = function() {
        // destroy cursor
        this.setCursorRect(0, 0, 0, 0);
    };

    Window_BattleStatus.prototype.update = function() {
        _Window_BattleStatus_update.call(this);

        this._updateBackgroundSprite();
    };

    Window_BattleStatus.prototype._updateBackgroundSprite = function() {
        if (!this._backgroundSprite) {
            return;
        }

        this._backgroundSprite.visible = this.openness === 255;
    };

}());
