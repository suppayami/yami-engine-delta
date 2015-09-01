//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Visual HP Gauge
// YEP_X_VisualHpGauge.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_VisualHpGauge = true;

var Yanfly = Yanfly || {};
Yanfly.VHG = Yanfly.VHG || {};

//=============================================================================
 /*:
 * @plugindesc (Requires YEP_BattleEngineCore.js) Reveal HP Gauges when a
 * battler is selected or takes damage in battle.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Display Actor
 * @desc Do you wish to display the HP Gauge for actors?            .
 * NO - false     YES - true
 * @default true
 *
 * @param Defeat First
 * @desc Enemies must be defeated first before showing the HP Gauge.
 * NO - false     YES - true
 * @default false
 *
 * @param ---Appearance---
 * @default
 *
 * @param Minimum Gauge Width
 * @desc This is the minimum width in pixels for HP Gauges.
 * @default 144
 *
 * @param Gauge Height
 * @desc This is the height in pixels for HP Gauges.
 * @default 18
 *
 * @param Back Color
 * @desc This is the text color used for the back of HP Gauges.
 * @default 19
 *
 * @param HP Color 1
 * @desc This is the text color used for the 1st part of HP Gauges.
 * @default 20
 *
 * @param HP Color 2
 * @desc This is the text color used for the 2nd part of HP Gauges.
 * @default 21
 *
 * @param Gauge Duration
 * @desc This is the frames the HP gauge will continue to show after
 * it finishes draining or filling.
 * @default 30
 *
 * @help
 * This plugin requires YEP_BattleEngineCore.
 * Make sure this plugin is located under YEP_BattleEngineCore in the plugin
 * list.
 *
 * This plugin shows the HP Gauges of enemies as they're selected or while they
 * take damage. You can also opt for actors to show their HP Gauge as well.
 * Adjust the parameters to change the way you want the HP Gauges to appear.
 *
 * Class and Enemy Notetags:
 *   <Hide HP Gauge>
 *   This HP gauge will always be hidden if this notetag is present.
 *
 *   <Show HP Gauge>
 *   This HP gauge will always be shown if this notetag is present while the
 *   target is selected or taking damage.
 *
 *   <HP Gauge Width: x>
 *   This will set the battler's HP Gauge width to x pixels. However, if this
 *   width is less than the minimum width, the minimum width will take priority.
 *
 *   <HP Gauge Height: x>
 *   This set's the HP Gauge height to x pixels.
 *
 *   <HP Gauge Back Color: x>
 *   This changes the HP Gauge's back color to x text color.
 *
 *   <HP Gauge Color 1: x>
 *   This changes the HP Gauge's color 1 to x text color.
 *
 *   <HP Gauge Color 2: x>
 *   This changes the HP Gauge's color 2 to x text color.
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_VisualHpGauge');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.VHGDisplayActor = String(Yanfly.Parameters['Display Actor']);
Yanfly.Param.VHGDefeatFirst = String(Yanfly.Parameters['Defeat First']);
Yanfly.Param.VHGMinHpWidth = Number(Yanfly.Parameters['Minimum Gauge Width']);
Yanfly.Param.VHGGaugeHeight = Number(Yanfly.Parameters['Gauge Height']);
Yanfly.Param.VHGBackColor = Number(Yanfly.Parameters['Back Color']);
Yanfly.Param.VHGHpColor1 = Number(Yanfly.Parameters['HP Color 1']);
Yanfly.Param.VHGHpColor2 = Number(Yanfly.Parameters['HP Color 2']);
Yanfly.Param.VHGGaugeDuration = Number(Yanfly.Parameters['Gauge Duration']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.VHG.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.VHG.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processVHGNotetags($dataClasses);
		this.processVHGNotetags($dataEnemies);
		return true;
};

DataManager.processVHGNotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.hideHpGauge = false;
		obj.showHpGauge = false;
		obj.hpGaugeWidth = 0;
		obj.hpGaugeHeight = Yanfly.Param.VHGGaugeHeight;
		obj.hpGaugeBackColor = Yanfly.Param.VHGBackColor;
		obj.hpGaugeColor1 = Yanfly.Param.VHGHpColor1;
		obj.hpGaugeColor2 = Yanfly.Param.VHGHpColor2;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:HIDE HP GAUGE)>/i)) {
				obj.hideHpGauge = true;
			} else if (line.match(/<(?:SHOW HP GAUGE)>/i)) {
				obj.showHpGauge = true;
			} else if (line.match(/<(?:HP GAUGE WIDTH):[ ](\d+)>/i)) {
				obj.hpGaugeWidth = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HP GAUGE HEIGHT):[ ](\d+)>/i)) {
				obj.hpGaugeHeight = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HP GAUGE BACK COLOR):[ ](\d+)>/i)) {
				obj.hpGaugeBackColor = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HP GAUGE COLOR 1):[ ](\d+)>/i)) {
				obj.hpGaugeColor1 = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HP GAUGE COLOR 2):[ ](\d+)>/i)) {
				obj.hpGaugeColor2 = parseInt(RegExp.$1);
			}
		}
	}
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.VHG.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.VHG.Game_System_initialize.call(this);
		this.initShownHpGauge();
};

Game_System.prototype.initShownHpGauge = function() {
    this._shownHpGauge = [];
};

Game_System.prototype.showHpGaugeEnemy = function(id) {
    if (this._shownHpGauge === undefined) this._shownHpGauge();
		if (!eval(Yanfly.Param.VHGDefeatFirst)) return true;
		return this._shownHpGauge.contains(id);
};

Game_System.prototype.addHpGaugeEnemy = function(id) {
    if (this._shownHpGauge === undefined) this._shownHpGauge();
		if (this._shownHpGauge.contains(id)) return;
		this._shownHpGauge.push(id);
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.hpGaugeVisible = function() {
		if (this._noHpGauge) return false;
		return true;
};

Game_Battler.prototype.hpGaugeWidth = function() {
		var width = Math.max(this.spriteWidth(),	Yanfly.Param.VHGMinHpWidth);
		return (width & 1) ? width + 1 : width;
};

Game_Battler.prototype.hpGaugeHeight = function() {
		return Yanfly.Param.VHGGaugeHeight;
};

Game_Battler.prototype.hpGaugeBackColor = function() {
		return Yanfly.Param.VHGBackColor;
};

Game_Battler.prototype.hpGaugeColor1 = function() {
		return Yanfly.Param.VHGHpColor1;
};

Game_Battler.prototype.hpGaugeColor2 = function() {
		return Yanfly.Param.VHGHpColor2;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.hpGaugeVisible = function() {
		if (this.currentClass().showHpGauge) return true;
		if (!eval(Yanfly.Param.VHGDisplayActor)) return false;
		if (this.currentClass().hideHpGauge) return false;
		return Game_Battler.prototype.hpGaugeVisible.call(this);
};

Game_Actor.prototype.hpGaugeWidth = function() {
		if (this.currentClass().hpGaugeWidth > 0) {
			var width = this.currentClass().hpGaugeWidth;
		} else {
			var width = this.spriteWidth();
		}
		width = Math.max(width,	Yanfly.Param.VHGMinHpWidth);
		return (width & 1) ? width + 1 : width;
};

Game_Actor.prototype.hpGaugeHeight = function() {
		return this.currentClass().hpGaugeHeight;
};

Game_Actor.prototype.hpGaugeBackColor = function() {
		return this.currentClass().hpGaugeBackColor;
};

Game_Actor.prototype.hpGaugeColor1 = function() {
		return this.currentClass().hpGaugeColor1;
};

Game_Actor.prototype.hpGaugeColor2 = function() {
		return this.currentClass().hpGaugeColor2;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.hpGaugeVisible = function() {
		if (this.enemy().showHpGauge) return true;
		if (!$gameSystem.showHpGaugeEnemy(this._enemyId)) return false;
		if (this.enemy().hideHpGauge) return false;
		return Game_Battler.prototype.hpGaugeVisible.call(this);
};

Yanfly.VHG.Game_Enemy_die = Game_Enemy.prototype.die;
Game_Enemy.prototype.die = function() {
    Yanfly.VHG.Game_Enemy_die.call(this);
		if (eval(Yanfly.Param.VHGDefeatFirst)) {
			if (!$gameSystem.showHpGaugeEnemy(this._enemyId)) {
				this._noHpGauge = true;
			}
		}
		$gameSystem.addHpGaugeEnemy(this._enemyId);
};

Yanfly.VHG.Game_Enemy_revive = Game_Enemy.prototype.revive;
Game_Enemy.prototype.revive = function() {
    if (this._hp === 0) this._noHpGauge = false;
		Yanfly.VHG.Game_Enemy_revive.call(this);
};

Game_Enemy.prototype.hpGaugeWidth = function() {
		if (this.enemy().hpGaugeWidth > 0) {
			var width = this.enemy().hpGaugeWidth;
		} else {
			var width = this.spriteWidth();
		}
		width = Math.max(width,	Yanfly.Param.VHGMinHpWidth);
		return (width & 1) ? width + 1 : width;
};

Game_Enemy.prototype.hpGaugeHeight = function() {
		return this.enemy().hpGaugeHeight;
};

Game_Enemy.prototype.hpGaugeBackColor = function() {
		return this.enemy().hpGaugeBackColor;
};

Game_Enemy.prototype.hpGaugeColor1 = function() {
		return this.enemy().hpGaugeColor1;
};

Game_Enemy.prototype.hpGaugeColor2 = function() {
		return this.enemy().hpGaugeColor2;
};


//=============================================================================
// Sprite_HpGauge
//=============================================================================

function Sprite_HpGauge() {
    this.initialize.apply(this, arguments);
}

Sprite_HpGauge.prototype = Object.create(Sprite.prototype);
Sprite_HpGauge.prototype.constructor = Sprite_HpGauge;

Sprite_HpGauge.prototype.initialize = function(parentSprite) {
    this._parentSprite = parentSprite;
		Sprite.prototype.initialize.call(this);
		this.loadWindowskin();
		this.createFrontGauge();
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
};

Sprite_HpGauge.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem('Window');
};

Sprite_HpGauge.prototype.createFrontGauge = function() {
    this._frontGauge = new Sprite_FrontGauge(this);
		this.addChild(this._frontGauge);
};

Sprite_HpGauge.prototype.getBattler = function() {
		return this._parentSprite._battler;
};

Sprite_HpGauge.prototype.createBitmap = function() {
		this._battler = this.getBattler();
		var width = this._battler.hpGaugeWidth();
		var height = this._battler.hpGaugeHeight();
		this.bitmap = new Bitmap(width, height);
		this.bitmap.smooth = true;
		this.bitmap.fillRect(0, 0, width, height, this.gaugeBackColor());
		this._frontGauge.createBitmap(width, height, this._battler);
};

Sprite_HpGauge.prototype.textColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return this.windowskin.getPixel(px, py);
};

Sprite_HpGauge.prototype.gaugeBackColor = function() {
		var colorId = this.getBattler().hpGaugeBackColor();
		return this.textColor(colorId);
};

Sprite_HpGauge.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this.getBattler()) {
			if (this.getBattler() !== this._battler) this.createBitmap();
			this.updatePosition();
		}
		this.updateOpacity();
};

Sprite_HpGauge.prototype.updatePosition = function() {
    this.x = this.getBattler().spritePosX();
		this.y = this.getBattler().spritePosY();
};

Sprite_HpGauge.prototype.updateOpacity = function() {
    if (this.getBattler() && this.getBattler().hpGaugeVisible()) {
			if (this._battler.isSelected()) {
				this.opacity = 255;
			} else if (this._frontGauge.isUpdatingWidth()) {
				this.opacity = 255;
			} else {
				this.opacity = 0;
			}
		} else {
			this.opacity = 0;
		}
};

//=============================================================================
// Scene_Battle
//=============================================================================

function Sprite_FrontGauge() {
    this.initialize.apply(this, arguments);
}

Sprite_FrontGauge.prototype = Object.create(Sprite.prototype);
Sprite_FrontGauge.prototype.constructor = Sprite_FrontGauge;

Sprite_FrontGauge.prototype.initialize = function(parentSprite) {
		this._parentSprite = parentSprite;
		Sprite.prototype.initialize.call(this);
		this.loadWindowskin();
		this.anchor.y = 0.5;
};

Sprite_FrontGauge.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem('Window');
};

Sprite_FrontGauge.prototype.textColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return this.windowskin.getPixel(px, py);
};

Sprite_FrontGauge.prototype.createBitmap = function(width, height, battler) {
		this._battler = battler;
		this._gaugeHp = this.currentBattlerHp();
		this._gaugeDur = 0;
		this.bitmap = new Bitmap(width - 2, height);
		this.bitmap.smooth = true;
		var color1 = this.hpGaugeColor1();
		var color2 = this.hpGaugeColor2();
		this.bitmap.gradientFillRect(0, 1, width - 2, height - 2, color1, color2);
};

Sprite_FrontGauge.prototype.hpGaugeColor1 = function() {
    var colorId = this._battler.hpGaugeColor1();
		return this.textColor(colorId);
};

Sprite_FrontGauge.prototype.hpGaugeColor2 = function() {
    var colorId = this._battler.hpGaugeColor2();
		return this.textColor(colorId);
};

Sprite_FrontGauge.prototype.update = function() {
    Sprite.prototype.update.call(this);
		if (this._battler) {
			this.updatePosition();
			this.updateWidth();
		}
};

Sprite_FrontGauge.prototype.updatePosition = function() {
    this.x = -this._parentSprite.width / 2 + 1;
};

Sprite_FrontGauge.prototype.updateWidth = function() {
		if (this.currentBattlerHp() > this._gaugeHp) {
			this._gaugeHp = this._gaugeHp + this.increment();
			this._gaugeHp = Math.min(this.currentBattlerHp(), this._gaugeHp);
			this._gaugeDur = Yanfly.Param.VHGGaugeDuration;
		} else if (this.currentBattlerHp() < this._gaugeHp) {
			this._gaugeHp = this._gaugeHp - this.increment();
			this._gaugeHp = Math.max(this.currentBattlerHp(), this._gaugeHp);
			this._gaugeDur = Yanfly.Param.VHGGaugeDuration;
		}
		var width = this._gaugeHp * this._battler.hpGaugeWidth();
		width /= this._battler.mhp;
		width -= 2;
		this.width = width;
};

Sprite_FrontGauge.prototype.increment = function() {
		return Math.max(this._battler.mhp / 100, 5);
};

Sprite_FrontGauge.prototype.updateOpacity = function() {
		this.opacity = this._parentSprite.opacity;
};

Sprite_FrontGauge.prototype.currentBattlerHp = function() {
		return this._battler.hp;
};

Sprite_FrontGauge.prototype.isUpdatingWidth = function() {
		if (this.currentBattlerHp() !== this._gaugeHp) return true;
		this._gaugeDur--;
		return (this._gaugeDur > 0);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Spriteset_Battle.prototype.createVisualHpGauges = function() {
    this._visualHpGauges = [];
		for (var i = 0; i < this.battlerSprites().length; ++i) {
			this._visualHpGauges[i] = new Sprite_HpGauge(this.battlerSprites()[i]);
			this.addChild(this._visualHpGauges[i]);
		}
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.VHG.Scene_Battle_createDisplayObjects =
		Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    Yanfly.VHG.Scene_Battle_createDisplayObjects.call(this);
		this.createVisualHpGauges();
};

Scene_Battle.prototype.createVisualHpGauges = function() {
    this._spriteset.createVisualHpGauges();
};

//=============================================================================
// End of File
//=============================================================================
};
