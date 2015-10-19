Spriteset_Battle.prototype.createBattleback = function() {
    var margin = 32;
    var x = -this._battleField.x - margin;
    var y = -this._battleField.y - margin;
    var width = Graphics.width + margin * 2;
    var height = Graphics.height + margin * 2;
    this._back1Sprite = new TilingSprite();
    this._back2Sprite = new TilingSprite();
    this._back1Sprite.bitmap = this.battleback1Bitmap();
    this._back2Sprite.bitmap = this.battleback2Bitmap();
    this._back1Sprite.move(x, y, width, height);
    this._back2Sprite.move(x, y, width, height);
    this._battleField.addChild(this._back1Sprite);
    this._battleField.addChild(this._back2Sprite);

    this.battleBackFilter = new PIXI.TwistFilter()
    this.battleBackFilter.angle = 10
    this.battleBackFilter.radius = 1
    this.battleBackFilter.offset.x = 0.5
    this.battleBackFilter.offset.y = 0.5

    this._back1Sprite.filters = [this.battleBackFilter]
    this._back2Sprite.filters = [this.battleBackFilter]
    this.BattleBackFilterSettings = {amplitude: 0.2, angle: 0, angleSpeed: 0.01}
};


Spriteset_Battle.prototype.updateBattleback = function() {

  this._back1Sprite.origin.y -= 1
  this._back2Sprite.origin.y -= 1
//      this.battleBackFilter.angle += 0.1
//      var pos = (this.BattleBackFilterSettings.amplitude * Math.sin(this.BattleBackFilterSettings.angle))
//      this.BattleBackFilterSettings.angle += this.BattleBackFilterSettings.angleSpeed
//      this.battleBackFilter.offset.x = 0.5 + pos
    if (!this._battlebackLocated) {
        this.locateBattleback();
        this._battlebackLocated = true;
    }
};
