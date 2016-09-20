//=============================================================================
// Yanfly Engine Plugins - Icon Balloons
// YEP_IconBalloons.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_IconBalloons = true;

var Yanfly = Yanfly || {};
Yanfly.IBalloon = Yanfly.IBalloon || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 Allows you to use icons for your on-map balloons
 * over your characters and events!
 * @author Yanfly Engine Plugins
 *
 * @param Empty Filename
 * @desc This is the filename of your empty balloon. Do not include
 * file extension here.
 * @default EmptyBalloon
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV provides us with 15 Balloon Animations to use to allow our
 * events to show emotions with. Sometimes, this just isn't enough. However,
 * this plugin allows you to use icons from your IconSet to extend the number
 * of balloon types you can use.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Use these plugin commands to get icon balloons playing on the player/events.
 *
 * Plugin Commands
 *
 *   ---
 *
 *   ShowIconBalloon x on Player
 *   ShowIconBalloon x on Player, Wait
 *
 *   ShowIconBalloon x on Event y
 *   ShowIconBalloon x on Event y, Wait
 *
 *   ShowIconBalloon x on Follower y
 *   ShowIconBalloon x on Follower y, Wait
 *   - This will cause the Icon Balloon using icon index x to appear on the
 *   player, event y, or follower y. If 'wait' is used, then the event will
 *   wait until the balloon has finished playing.
 *
 *   ---
 *
 *   ShowIconBalloon x to y on Player
 *   ShowIconBalloon x to y on Player, Wait
 *
 *   ShowIconBalloon x to y on Event z
 *   ShowIconBalloon x to y on Event z, Wait
 *
 *   ShowIconBalloon x to y on Follower z
 *   ShowIconBalloon x to y on Follower z, Wait
 *   - This will cause the Icon Balloon start on icon index x and move through
 *   to y, the next icon upward each few frames up to icon index y. This icon
 *   balloon will be played on the player, event z, or follower z. If 'wait' is
 *   used, then the event will wait until the balloon has finished playing.
 *   When using this command, x cannot be greater than y.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_IconBalloons');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IBallonFilename = String(Yanfly.Parameters['Empty Filename']);

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.IBalloon.Game_CharacterBase_initMembers =
  Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
  Yanfly.IBalloon.Game_CharacterBase_initMembers.call(this);
  this._iconBalloon = [];
};

Game_CharacterBase.prototype.iconBalloonId = function() {
  return this._iconBalloon || [];
};

Game_CharacterBase.prototype.setIconBalloon = function(iconIndex1, iconIndex2) {
  this._iconBalloon = [iconIndex1, iconIndex2];
};

Game_CharacterBase.prototype.startIconBalloon = function() {
  this._iconBalloon = [];
  this._iconBalloonPlaying = true;
};

Game_CharacterBase.prototype.isIconBalloonPlaying = function() {
  return this._iconBalloon.length > 0 || this._iconBalloonPlaying;
};

Game_CharacterBase.prototype.endIconBalloon = function() {
  this._iconBalloon = [];
  this._iconBalloonPlaying = false;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.IBalloon.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.IBalloon.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowIconBalloon') {
    var str = this.argsToString(args);
    if (this.canShowIconBalloons()) this.processIconBalloons(str);
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
    var str = '';
    var length = args.length;
    for (var i = 0; i < length; ++i) {
      str += args[i] + ' ';
    }
    return str.trim();
};

Game_Interpreter.prototype.canShowIconBalloons = function() {
  return !$gameParty.inBattle();
};

Game_Interpreter.prototype.processIconBalloons = function(str) {

  if (str.match(/(\d+)[ ]TO[ ](\d+)[ ](.*)/i)) {
    var iconIndex1 = parseInt(RegExp.$1);
    var iconIndex2 = parseInt(RegExp.$2);
    var str = String(RegExp.$3).trim();
    if (iconIndex1 > iconIndex2) return;
  } else if (str.match(/(\d+)[ ](.*)/i)) {
    var iconIndex1 = parseInt(RegExp.$1);
    var iconIndex2 = iconIndex1;
    var str = String(RegExp.$2).trim();
  } else {
    return;
  }
  if (!iconIndex1) return;
  if (!iconIndex2) return;
  if (!str) return;
  var waiting = false;
  if (str.match(/WAIT/i)) waiting = true;
  if (str.match(/PLAYER/i)) {
    $gamePlayer.setIconBalloon(iconIndex1, iconIndex2);
    this._character = $gamePlayer;
  } else if (str.match(/EVENT[ ](\d+)/i)) {
    var eventId = parseInt(RegExp.$1);
    var ev = $gameMap.event(eventId);
    if (ev) {
      ev.setIconBalloon(iconIndex1, iconIndex2);
      this._character = ev;
    }
  } else if (str.match(/FOLLOWER[ ](\d+)/i)) {
    var followerIndex = Math.max(0, parseInt(RegExp.$1) - 1);
    var follower = $gamePlayer.followers().follower(followerIndex);
    if (follower) {
      follower.setIconBalloon(iconIndex1, iconIndex2);
      this._character = follower;
    }
  }
  this._waitMode = '';
  if (waiting) this.setWaitMode('iconBalloon');
};

Yanfly.IBalloon.Game_Interpreter_updateWaitMode =
  Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
  if (this._waitMode === 'iconBalloon') {
    return this._character.isIconBalloonPlaying();
  } else {
    return Yanfly.IBalloon.Game_Interpreter_updateWaitMode.call(this);
  }
};

//=============================================================================
// Sprite_Character
//=============================================================================

Yanfly.IBalloon.Sprite_Character_setupBalloon =
  Sprite_Character.prototype.setupBalloon;
Sprite_Character.prototype.setupBalloon = function() {
  Yanfly.IBalloon.Sprite_Character_setupBalloon.call(this);
  if (this._character.iconBalloonId().length > 0) {
    this.startIconBalloon();
    this._character.startIconBalloon();
  }
};

Sprite_Character.prototype.startIconBalloon = function() {
  if (!this._iconBalloonSprite) {
    this._iconBalloonSprite = new Sprite_IconBalloon();
  }
  this._iconBalloonSprite.setup(this._character.iconBalloonId());
  this.parent.addChild(this._iconBalloonSprite);
};

Yanfly.IBalloon.Sprite_Character_updateBalloon =
  Sprite_Character.prototype.updateBalloon;
Sprite_Character.prototype.updateBalloon = function() {
  Yanfly.IBalloon.Sprite_Character_updateBalloon.call(this);
  this.updateIconBalloon();
};

Sprite_Character.prototype.updateIconBalloon = function() {
  if (this._iconBalloonSprite) {
    this._iconBalloonSprite.x = this.x;
    this._iconBalloonSprite.y = this.y - this.height;
    if (!this._iconBalloonSprite.isPlaying()) this.endIconBalloon();
  }
};

Sprite_Character.prototype.endIconBalloon = function() {
  if (this._iconBalloonSprite) {
    this.parent.removeChild(this._iconBalloonSprite);
    this._iconBalloonSprite = null;
    this._character.endIconBalloon();
  }
};

Sprite_Character.prototype.isIconBalloonPlaying = function() {
    return !!this._iconBalloonSprite;
};

//=============================================================================
// Sprite_IconBalloon
//=============================================================================

function Sprite_IconBalloon() {
  this.initialize.apply(this, arguments);
}

Sprite_IconBalloon.prototype = Object.create(Sprite_Balloon.prototype);
Sprite_IconBalloon.prototype.constructor = Sprite_IconBalloon;

Sprite_IconBalloon.prototype.initialize = function() {
  Sprite_Balloon.prototype.initialize.call(this);
};

Sprite_IconBalloon.prototype.loadBitmap = function() {
  this.bitmap = ImageManager.loadSystem(Yanfly.Param.IBallonFilename);
  this.setFrame(0, 0, 0, 0);
};

Sprite_IconBalloon.prototype.setup = function(iconData) {
  this._duration = 8 * this.speed() + this.waitTime();
  if (this._icon) {
    this._icon.setIconIndex(iconData);
  } else {
    this._icon = new Sprite_GrowingBalloonIcon(iconData, this._duration);
    this.addChild(this._icon);
  }
};

Sprite_IconBalloon.prototype.updateFrame = function() {
  var w = 48;
  var h = 48;
  var sx = this.frameIndex() * w;
  var sy = 0;
  this.setFrame(sx, sy, w, h);
};

//=============================================================================
// Sprite_GrowingBalloonIcon
//=============================================================================

function Sprite_GrowingBalloonIcon() {
    this.initialize.apply(this, arguments);
}

Sprite_GrowingBalloonIcon.prototype = Object.create(Sprite_Base.prototype);
Sprite_GrowingBalloonIcon.prototype.constructor = Sprite_Balloon;

Sprite_GrowingBalloonIcon.prototype.initialize = function(iconData, duration) {
  this._speed = 6;
  this._duration = duration;
  this._count = 0;
  this._growth = 1 / (duration / this._speed) || 1;
  Sprite_Base.prototype.initialize.call(this);
  this.setIconIndex(iconData);
  this.loadBitmap();
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  var buffer = -28;
  this.y = buffer;
};

Sprite_GrowingBalloonIcon.prototype.loadBitmap = function() {
  this.bitmap = ImageManager.loadSystem('IconSet');
  this.setFrame(0, 0, 0, 0);
};

Sprite_GrowingBalloonIcon.prototype.setIconIndex = function(iconData) {
  this._iconIndex = iconData[0];
  this._iconIndexGoal = iconData[1];
  this._waitFrames = this._duration * 2 / 3
  this._waitFrames /= Math.max(1, iconData[1] - iconData[0]);
  this._count = this._waitFrames;
  if (this._iconIndex === this._iconIndexGoal) {
    this.scale.y = 0;
  } else {
    this.scale.y = 1;
  }
};

Sprite_GrowingBalloonIcon.prototype.update = function() {
  Sprite.prototype.update.call(this);
  this.scale.y = Math.min(1, this.scale.y + this._growth);
  this.updateFrame();
  this.updateCount();
};

Sprite_GrowingBalloonIcon.prototype.updateFrame = function() {
  var pw = Sprite_StateIcon._iconWidth;
  var ph = Sprite_StateIcon._iconHeight;
  var sx = this._iconIndex % 16 * pw;
  var sy = Math.floor(this._iconIndex / 16) * ph;
  this.setFrame(sx, sy, pw, ph);
};

Sprite_GrowingBalloonIcon.prototype.updateCount = function() {
  this._count -= 1;
  if (this._count <= 0) {
    this._iconIndex = Math.min(this._iconIndexGoal, this._iconIndex + 1);
    this._count = this._waitFrames;
  }
};

//=============================================================================
// End of File
//=============================================================================