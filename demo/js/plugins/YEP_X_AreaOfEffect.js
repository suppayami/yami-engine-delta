//=============================================================================
// Yanfly Engine Plugins - Target Core Extension - Area of Effect
// YEP_X_AreaOfEffect.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_AreaOfEffect = true;

var Yanfly = Yanfly || {};
Yanfly.AOE = Yanfly.AOE || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_BattleEngineCore & YEP_TargetCore)
 * Adds Area of Effect scopes for targeting allies or enemies.
 * @author Yanfly Engine Plugins
 *
 * @param ---Buffer---
 * @default
 *
 * @param Buffer X
 * @desc The default offset coordinate buffer for battlers.
 * @default 0
 *
 * @param Buffer Y
 * @desc The default offset coordinate buffer for battlers.
 * @default 0
 *
 * @param Center Animation
 * @desc Plays battle animation only on central target?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Circle---
 * @default
 *
 * @param Circle Graphic
 * @desc Default graphic used for AoE Circles.
 * Place this image inside img/pictures/
 * @default AoE_Circle
 *
 * @param Circle Blend
 * @desc Blend mode used for AoE Circles.
 * 0: Normal, 1: Additive, 2: Multiply, 3: Screen
 * @default 3
 *
 * @param Circle Height Rate
 * @desc Default height rate of AoE Circle.
 * @default 0.33
 *
 * @param ---Rectangle---
 * @default
 *
 * @param Rect Graphic
 * @desc Default graphic used for AoE Rectangles.
 * Place this image inside img/pictures/
 * @default AoE_Rect
 *
 * @param Rect Blend
 * @desc Blend mode used for AoE Rectangles.
 * 0: Normal, 1: Additive, 2: Multiply, 3: Screen
 * @default 3
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_BattleEngineCore and YEP_TargetCore. Make sure this
 * plugin is located under YEP_BattleEngineCore and YEP_TargetCore in the
 * plugin list.
 *
 * Sometimes, targeting one foe isn't enough and targeting all foes is too
 * many. The right mix in between would be area of effects to target only a
 * certain area of foes. This plugins enables area of effect targeting to come
 * in the forms of circular areas, column areas, row areas, and even the whole
 * screen.
 *
 * ============================================================================
 * Instructions - Understanding Area of Effect
 * ============================================================================
 *
 * Area of effect scopes don't necessarily select just one target but instead,
 * a group of targets that are close together. Any targets outside of range
 * from the area of effect zone will be added to the scope of targets for the
 * skill or item being used.
 *
 * Whether or not the targets will be struck is relative to the target's hitbox
 * settings. Normally, this is dependent on the target's graphic, but you can
 * set individual hitbox settings for the target using notetags as well.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to apply area of effect scopes for your
 * skills and items!
 *
 * Skill and Item Notetags:
 *
 *   --- AOE Circle Scope ---
 *
 *   <AOE Radius: x>
 *   Turns the skill into having a target scope with a circular AOE. x is the
 *   amount of pixels of the radius for the AOE Circle.
 *
 *   <AOE Height Rate: x%>
 *   Changes the height to be x% of the diameter of the AOE Circle.
 *
 *   <AOE Graphic: filename>
 *   If you wish to use a different image for the AOE circle for this skill or
 *   item, replace 'filename' with the filename of the graphic found within the
 *   img/pictures/ folder. Do not include the file extension. For example, the
 *   graphic 'aoeblue.png' will result in notetag <AOE Graphic: aoeblue>.
 *
 *   <AOE Hue: x>
 *   This will change the hue of the AOE circle to x. By default, the hue value
 *   is 0. This will alter the color of it.
 *
 *   <AOE Blend: x>
 *   This is the blend mode used for the AOE graphic. 0 is normal with no blend
 *   modes applied. 1 is additive. 2 is multiply. 3 is screen.
 *
 *   --- AOE Rectangle Scope ---
 *
 *   <Rect Column: x>
 *   This will make a rectangular area of effect scope that is x pixels wide.
 *   The area of effect zone is vertical and all targets within this zone will
 *   become targets for the action.
 *
 *   <Rect Row: x>
 *   This will make a rectangular area of effect scope that is x pixels tall.
 *   The area of effect zone is horizontal and all targets within this zone
 *   will become targets for the action.
 *
 *   <Rect Screen>
 *   This will target all units within the entirity of the screen. While it is
 *   the same as an all enemies/all allies scope, this can be used to give a
 *   visual representation of which units are selected as a target.
 *
 *   <Rect Graphic: filename>
 *   If you wish to use a different image for the AOE rectangle for this skill
 *   or item, replace 'filename' with the filename of the graphic found within
 *   the img/pictures/ folder. Do not include the file extension. For example,
 *   the graphic 'rectblue.png' will result in notetag <AOE Graphic: rectblue>.
 *
 *   <Rect Hue: x>
 *   This will change the hue of the AOE rectangle to x. By default, the hue
 *   value is 0. This will alter the color of it.
 *
 *   <Rect Blend: x>
 *   This is the blend mode used for the AOE graphic. 0 is normal with no blend
 *   modes applied. 1 is additive. 2 is multiply. 3 is screen.
 *
 *   --- Animation Settings ---
 *
 *   <AOE Center Animation>
 *   This will cause the animation for an AOE skill to be played to center on
 *   the first target of the AOE group, which is usually the center of the
 *   AOE targets.
 *
 *   <AOE Group Animation>
 *   This will cause the animation for an AOE skill to be played on all of the
 *   targets within the AOE group as if normally done.
 *
 * Actor and Enemy Notetags:
 *
 *   --- AOE Hitbox Settings ---
 *
 *   <AOE Buffer X: +x>
 *   <AOE Buffer X: -x>
 *
 *   <AOE Buffer Y: +x>
 *   <AOE Buffer Y: -x>
 *   Changes the buffer x/y of the battler when an AOE image is placed on the
 *   battler. This is also the offset from the center location at which the
 *   AOE targets will be calculated, too. If this notetag isn't used, the
 *   buffer value used will be from the plugin parameters.
 *
 *   <AOE Hitbox Width: x>
 *   <AOE Hitbox Height: x>
 *   This will adjust the hitbox of the battler to have an AOE hitbox width of
 *   x or an AOE hitbox height of x.
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore && Imported.YEP_TargetCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_AreaOfEffect');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.AOEBufferX = Number(Yanfly.Parameters['Buffer X']);
Yanfly.Param.AOEBufferY = Number(Yanfly.Parameters['Buffer Y']);
Yanfly.Param.AOECenterAni = eval(String(Yanfly.Parameters['Center Animation']));

Yanfly.Param.AOECirGraphic = String(Yanfly.Parameters['Circle Graphic']);
Yanfly.Param.AOECirBlend = Number(Yanfly.Parameters['Circle Blend']);
Yanfly.Param.AOECirHeightRate = Number(Yanfly.Parameters['Circle Height Rate']);

Yanfly.Param.AOERectGraphic = String(Yanfly.Parameters['Rect Graphic']);
Yanfly.Param.AOERectBlend = Number(Yanfly.Parameters['Rect Blend']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.AOE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.AOE.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_AreaOfEffect) {
    this.processAOENotetags2($dataActors);
    this.processAOENotetags2($dataEnemies);
    Yanfly._loaded_YEP_X_AreaOfEffect = true;
  }
  
  return true;
};

Yanfly.AOE.DataManager_processTargetNotetags1 =
    DataManager.processTargetNotetags1;
DataManager.processTargetNotetags1 = function(group) {
    Yanfly.AOE.DataManager_processTargetNotetags1.call(this, group);
    this.processAOENotetags1(group);
};

DataManager.processAOENotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.aoeCircleRadius = 0;
    obj.aoeCircleGraphic = Yanfly.Param.AOECirGraphic;
    obj.aoeCircleHue = 0;
    obj.aoeCircleBlend = Yanfly.Param.AOECirBlend;
    obj.aoeCircleHeightRate = Yanfly.Param.AOECirHeightRate;
    obj.aoeCenterAnimation = Yanfly.Param.AOECenterAni;
    obj.aoeRectColumn = 0;
    obj.aoeRectRow = 0;
    obj.aoeRectAll = false;
    obj.aoeRectGraphic = Yanfly.Param.AOERectGraphic
    obj.aoeRectHue = 0;
    obj.aoeRectBlend = Yanfly.Param.AOERectBlend;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<AOE RADIUS:[ ](\d+)>/i)) {
        obj.aoeCircleRadius = parseInt(RegExp.$1);
      } else if (line.match(/<AOE GRAPHIC:[ ](.*)>/i)) {
        obj.aoeCircleGraphic = String(RegExp.$1);
      } else if (line.match(/<AOE HUE:[ ](\d+)>/i)) {
        obj.aoeCircleHue = parseInt(RegExp.$1);
      } else if (line.match(/<AOE BLEND:[ ](\d+)>/i)) {
        obj.aoeCircleBlend = parseInt(RegExp.$1);
      } else if (line.match(/<AOE HEIGHT:[ ](\d+)([%％])>/i)) {
        obj.aoeCircleHeightRate = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<AOE CENTER ANIMATION>/i)) {
        obj.aoeCenterAnimation = true;
      } else if (line.match(/<AOE GROUP ANIMATION>/i)) {
        obj.aoeCenterAnimation = false;
      } else if (line.match(/<RECT GRAPHIC:[ ](.*)>/i)) {
        obj.aoeRectGraphic = String(RegExp.$1);
      } else if (line.match(/<RECT HUE:[ ](\d+)>/i)) {
        obj.aoeRectHue = parseInt(RegExp.$1);
      } else if (line.match(/<RECT BLEND:[ ](\d+)>/i)) {
        obj.aoeRectBlend = parseInt(RegExp.$1);
      } else if (line.match(/<RECT COLUMN:[ ](\d+)>/i)) {
        obj.aoeRectColumn = parseInt(RegExp.$1);
        obj.aoeRectRow = 0;
      } else if (line.match(/<RECT ROW:[ ](\d+)>/i)) {
        obj.aoeRectRow = parseInt(RegExp.$1);
        obj.aoeRectColumn = 0;
      } else if (line.match(/<RECT SCREEN>/i)) {
        obj.aoeRectAll = true;
        obj.aoeRectColumn = 0;
        obj.aoeRectRow = 0;
      }
    }
  }
};

DataManager.processAOENotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.aoeBufferX = Yanfly.Param.AOEBufferX;
    obj.aoeBufferY = Yanfly.Param.AOEBufferY;
    obj.aoeHitboxW = 0;
    obj.aoeHitboxH = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<AOE BUFFER X:[ ]([\+\-]\d+)>/i)) {
        obj.aoeBufferX = parseInt(RegExp.$1);
      } else if (line.match(/<AOE BUFFER Y:[ ]([\+\-]\d+)>/i)) {
        obj.aoeBufferY = parseInt(RegExp.$1);
      } else if (line.match(/<AOE HITBOX WIDTH:[ ](\d+)>/i)) {
        obj.aoeHitboxW = parseInt(RegExp.$1);
      } else if (line.match(/<AOE HITBOX HEIGHT:[ ](\d+)>/i)) {
        obj.aoeHitboxH = parseInt(RegExp.$1);
      }
    }
  }
};

Yanfly.AOE.DataManager_setDefaultActions = DataManager.setDefaultActions;
DataManager.setDefaultActions = function(obj) {
    if (obj.aoeCenterAnimation && this.isAoeSkill(obj)) {
      this.setAoeActions(obj);
    } else {
      Yanfly.AOE.DataManager_setDefaultActions.call(this, obj);
    }
};

DataManager.isAoeSkill = function(obj) {
    if (obj.aoeCircleRadius > 0) return true;
    if (obj.aoeRectColumn > 0) return true;
    if (obj.aoeRectRow > 0) return true;
    return obj.aoeRectAll;
};

DataManager.setAoeActions = function(obj) {
    obj.setupActions = Yanfly.BEC.DefaultActionSetup.slice();
    if (obj.aoeCenterAnimation) {
      obj.wholeActions = [
        ['PERFORM ACTION'],
        ['ACTION ANIMATION', ['FIRST']], 
        ['WAIT FOR ANIMATION']
      ];
    } else {
      obj.wholeActions = [
        ['PERFORM ACTION'],
        ['ACTION ANIMATION', ['TARGETS']], 
        ['WAIT FOR ANIMATION']
      ];
    }
    this.addActionEffects(obj, obj.wholeActions);
    obj.targetActions = [];
    obj.followActions = Yanfly.BEC.DefaultActionFollow.slice();
    obj.finishActions = Yanfly.BEC.DefaultActionFinish.slice();
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.AOE.BattleManager_startAllSelection = BattleManager.startAllSelection;
BattleManager.startAllSelection = function() {
    if (this.inputtingAction().isAoe()) {
      this._customTargetSelectGroup = this.inputtingAction().makeTargets();
    } else {
      Yanfly.AOE.BattleManager_startAllSelection.call(this);
    }
};

Yanfly.AOE.BattleManager_makeActionTargets =
    BattleManager.makeActionTargets;
BattleManager.makeActionTargets = function(string) {
    if ('FIRST' === string.toUpperCase()) {
      return [this._targets[0]];
    }
    return Yanfly.AOE.BattleManager_makeActionTargets.call(this, string);
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.aoeX = function() {
    return this.spritePosX() + this.aoeBufferX();
};

Game_Battler.prototype.aoeY = function() {
    return this.spritePosY() + this.aoeBufferY();
};

Game_Battler.prototype.aoeBufferX = function() {
    return 0;
};

Game_Battler.prototype.aoeBufferY = function() {
    return 0;
};

Game_Battler.prototype.aoeWidth = function() {
    return this.spriteWidth();
};

Game_Battler.prototype.aoeHeight = function() {
    return this.spriteHeight();
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.aoeBufferX = function() {
    return this.actor().aoeBufferX;
};

Game_Actor.prototype.aoeBufferY = function() {
    return this.actor().aoeBufferY;
};

Game_Actor.prototype.aoeWidth = function() {
    return this.actor().aoeHitboxW || this.spriteWidth();
};

Game_Actor.prototype.aoeHeight = function() {
    return this.actor().aoeHitboxH || this.spriteHeight();
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.aoeBufferX = function() {
    return this.enemy().aoeBufferX;
};

Game_Enemy.prototype.aoeBufferY = function() {
    return this.enemy().aoeBufferY;
};

Game_Enemy.prototype.aoeWidth = function() {
    return this.enemy().aoeHitboxW || this.spriteWidth();
};

Game_Enemy.prototype.aoeHeight = function() {
    return this.enemy().aoeHitboxH || this.spriteHeight();
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.isAoe = function() {
    return this.isAoeCircle() || this.isAoeRect();
};

Game_Action.prototype.isAoeCircle = function() {
    return this.item().aoeCircleRadius > 0;
};

Game_Action.prototype.isAoeRect = function() {
    if (this.item().aoeRectColumn > 0) return true;
    if (this.item().aoeRectRow > 0) return true;
    return this.item().aoeRectAll;
};

Yanfly.AOE.Game_Action_makeTargets = Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
    var targets = Yanfly.AOE.Game_Action_makeTargets.call(this);
    if (this.isAoe()) this.addAoeTargets(targets);
    return targets;
};

Game_Action.prototype.addAoeTargets = function(targets) {
    if (this.isAoeCircle()) this.addAoeCircleTargets(targets);
    if (this.isAoeRect()) this.addAoeRectTargets(targets);
};

Game_Action.prototype.addAoeCircleTargets = function(targets) {
    var main = targets[0];
    if (!main) return;
    if (this.isForFriend()) {
      var group = this.friendsUnit().aliveMembers();
    } else {
      var group = this.opponentsUnit().aliveMembers();
    }
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (!member) continue;
      if (targets.contains(member)) continue;
      if (this.isInsideAoeCircle(main, member)) targets.push(member);
    }
};

Game_Action.prototype.isInsideAoeCircle = function(main, target) {
    var skill = this.item();
    var radius = skill.aoeCircleRadius;
    var height = skill.aoeCircleHeightRate;
    var mainX = main.aoeX();
    var mainY = main.aoeY();
    var targetX = target.aoeX();
    var targetY = target.aoeY();
    if (mainX > targetX) {
      targetX = Math.min(mainX, target.aoeX() + target.aoeWidth() / 2);
    } else if (mainX < targetX) {
      targetX = Math.max(mainX, target.aoeX() - target.aoeWidth() / 2);
    }
    if (mainY > targetY) {
      targetY = Math.min(mainY, target.aoeY());
    } else if (mainY < targetY) {
      targetY = Math.max(mainY, target.aoeY() - target.aoeHeight());
    }
    var x =  (targetX - mainX) * Math.cos(0) + (targetY - mainY) * Math.sin(0);
    var y = -(targetX - mainX) * Math.sin(0) + (targetY - mainY) * Math.cos(0);
    var a = radius; var b = radius * Math.max(height, 0.001);
    var c = (Math.pow(x, 2) / Math.pow(a, 2));
    c += (Math.pow(y, 2) / Math.pow(b, 2));
    return c <= 1;
};

Game_Action.prototype.addAoeRectTargets = function(targets) {
    var main = targets[0];
    if (!main) return;
    if (this.isForFriend()) {
      var group = this.friendsUnit().aliveMembers();
    } else {
      var group = this.opponentsUnit().aliveMembers();
    }
    var rect = this.aoeRect(main);
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (!member) continue;
      if (targets.contains(member)) continue;
      if (this.isInsideAoeRect(rect, member)) targets.push(member);
    }
};

Game_Action.prototype.aoeRect = function(main) {
    var skill = this.item();
    var rect = new Rectangle();
    if (skill.aoeRectAll) {
      rect.width = Graphics.boxWidth;
      rect.height = Graphics.boxHeight;
      rect.x = 0;
      rect.y = 0;
    } else if (skill.aoeRectColumn > 0) {
      rect.width = skill.aoeRectColumn;
      rect.height = Graphics.boxHeight;
      rect.x = main.aoeX() - rect.width / 2;
      rect.y = 0;
    } else if (skill.aoeRectRow > 0) {
      rect.width = Graphics.boxWidth;
      rect.height = skill.aoeRectRow;
      rect.x = 0;
      rect.y = main.aoeY() - rect.height / 2;
    }
    return rect;
};

Game_Action.prototype.isInsideAoeRect = function(r1, target) {
    var r2 = new Rectangle();
    r2.x = target.aoeX() - target.aoeWidth() / 2;
    r2.y = target.aoeY() - target.aoeHeight();
    r2.width = target.aoeWidth();
    r2.height = target.aoeHeight();
    return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || 
      r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
};

//=============================================================================
// Sprite_AoeCircle
//=============================================================================

function Sprite_AoeCircle() {
    this.initialize.apply(this, arguments);
}

Sprite_AoeCircle.prototype = Object.create(Sprite_Base.prototype);
Sprite_AoeCircle.prototype.constructor = Sprite_AoeCircle;

Sprite_AoeCircle.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this.initMembers();
};

Sprite_AoeCircle.prototype.initMembers = function() {
    this._glowRate = 8;
    this._radius = 0;
    this._aoeGraphic = true;
    this._currentImage = '';
    this.hide();
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

Sprite_AoeCircle.prototype.setup = function(skill) {
    this._skill = skill;
    if (this._skill.aoeCircleRadius <= 0) return;
    this._targetIndex = -1;
    this._radius = this._skill.aoeCircleRadius;
    this.show();
    this.createBitmap();
    this._glowRate = 8;
    this.opacity = 0;
};

Sprite_AoeCircle.prototype.createBitmap = function() {
    var filename = this._skill.aoeCircleGraphic;
    var hue = this._skill.aoeCircleHue;
    this.bitmap = ImageManager.loadPicture(filename, hue);
    this.blendMode = this._skill.aoeCircleBlend;
};

Sprite_AoeCircle.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (!this.visible) return;
    this.updateLocation();
    this.updateScale();
    this.updateOpacity();
};

Sprite_AoeCircle.prototype.updateLocation = function() {
    var scene = SceneManager._scene;
    if (scene._enemyWindow && scene._enemyWindow.active) {
      var target = scene._enemyWindow.enemy();
    } else if (scene._actorWindow && scene._actorWindow.active) {
      var target = scene._actorWindow.actor();
    } else {
      return;
    }
    this.x = target.aoeX();
    this.y = target.aoeY();
    if (this._targetIndex !== target.index()) {
      BattleManager.inputtingAction().setTarget(target.index());
      this._targetIndex = target.index();
      BattleManager.startAllSelection();
    }
};

Sprite_AoeCircle.prototype.updateScale = function() {
    var diameter = this._radius * 2;
    this.scale.x = diameter / (Math.max(1, this.bitmap.width));
    this.scale.y = this.scale.x * this._skill.aoeCircleHeightRate;
};

Sprite_AoeCircle.prototype.updateOpacity = function() {
    this.opacity += this._glowRate;
    if (this.opacity >= 255) {
      this._glowRate = -8;
    } else if (this.opacity <= 64) {
      this._glowRate = 8;
    }
};

//=============================================================================
// Sprite_AoeRect
//=============================================================================

function Sprite_AoeRect() {
    this.initialize.apply(this, arguments);
}

Sprite_AoeRect.prototype = Object.create(Sprite_Base.prototype);
Sprite_AoeRect.prototype.constructor = Sprite_AoeRect;

Sprite_AoeRect.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this.initMembers();
};

Sprite_AoeRect.prototype.initMembers = function() {
    this._glowRate = 8;
    this._aoeGraphic = true;
    this._currentImage = '';
    this.hide();
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

Sprite_AoeRect.prototype.setup = function(skill) {
    this._skill = skill;
    if (this._skill.aoeRectColumn > 0) {
      this._widthPixels = this._skill.aoeRectColumn;
      this._heightPixels = Graphics.boxWidth;
    } else if (this._skill.aoeRectRow > 0) {
      this._widthPixels = Graphics.boxWidth;
      this._heightPixels = this._skill.aoeRectRow;
    } else if (this._skill.aoeRectAll) {
      this._widthPixels = Graphics.boxWidth;
      this._heightPixels = Graphics.boxWidth;
    } else {
      return;
    }
    this._targetIndex = -1;
    this.show();
    this.createBitmap();
    this._glowRate = 8;
    this.opacity = 0;
};

Sprite_AoeRect.prototype.createBitmap = function() {
    var filename = this._skill.aoeRectGraphic;
    var hue = this._skill.aoeRectHue;
    this.bitmap = ImageManager.loadPicture(filename, hue);
    this.blendMode = this._skill.aoeRectBlend;
};

Sprite_AoeRect.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (!this.visible) return;
    this.updateLocation();
    this.updateScale();
    this.updateOpacity();
};

Sprite_AoeRect.prototype.updateLocation = function() {
    var scene = SceneManager._scene;
    if (scene._enemyWindow && scene._enemyWindow.active) {
      var target = scene._enemyWindow.enemy();
    } else if (scene._actorWindow && scene._actorWindow.active) {
      var target = scene._actorWindow.actor();
    } else {
      return;
    }
    if (this._skill.aoeRectColumn > 0) {
      this.x = target.aoeX();
      this.y = Graphics.boxHeight / 2;
    } else if (this._skill.aoeRectRow > 0) {
      this.x = Graphics.boxWidth / 2;
      this.y = target.aoeY();
    } else if (this._skill.aoeRectAll) {
      this.x = Graphics.boxWidth / 2;
      this.y = Graphics.boxHeight;
    } else {
    }
    if (this._targetIndex !== target.index()) {
      BattleManager.inputtingAction().setTarget(target.index());
      this._targetIndex = target.index();
      BattleManager.startAllSelection();
    }
};

Sprite_AoeRect.prototype.updateScale = function() {
    this.scale.x = this._widthPixels / (Math.max(1, this.bitmap.width));
    this.scale.y = this._heightPixels / (Math.max(1, this.bitmap.height));
};

Sprite_AoeRect.prototype.updateOpacity = function() {
    this.opacity += this._glowRate;
    if (this.opacity >= 255) {
      this._glowRate = -8;
    } else if (this.opacity <= 64) {
      this._glowRate = 8;
    }
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Yanfly.AOE.Spriteset_Battle_createBattleback =
    Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {
    Yanfly.AOE.Spriteset_Battle_createBattleback.call(this);
    this.createAoeSprites();
};

Spriteset_Battle.prototype.createAoeSprites = function() {
    this._aoeCircleSprite = new Sprite_AoeCircle();
    this._battleField.addChild(this._aoeCircleSprite);
    this._aoeRectSprite = new Sprite_AoeRect();
    this._battleField.addChild(this._aoeRectSprite);
};

Spriteset_Battle.prototype.setupAoe = function(action) {
    if (!action) return;
    if (!action.item()) return;
    this._aoeCircleSprite.setup(action.item());
    this._aoeRectSprite.setup(action.item());
};

Spriteset_Battle.prototype.closeAoe = function() {
    this._aoeCircleSprite.hide();
    this._aoeRectSprite.hide();
    BattleManager.clearCustomTargetSelectGroup();
};

Spriteset_Battle.prototype.battleFieldDepthCompare = function(a, b) {
    if (a.tilePosition && !b.tilePosition) return -1;
    if (b.tilePosition && !a.tilePosition) return 1;
    if (a._aoeGraphic && !b._aoeGraphic) return -1;
    if (b._aoeGraphic && !a._aoeGraphic) return 1;
    var priority = BattleManager.getSpritePriority();
    if (a._battler && b._battler && priority !== 0) {
      if (priority === 1) {
        if (a._battler.isActor() && b._battler.isEnemy()) return 1;
        if (a._battler.isEnemy() && b._battler.isActor()) return -1;
      } else if (priority === 2) {
        if (a._battler.isActor() && b._battler.isEnemy()) return -1;
        if (a._battler.isEnemy() && b._battler.isActor()) return 1;
      }
    }
    if (a.z < b.z) return -1;
    if (a.z > b.z) return 1;
    if (a.y < b.y) return -1;
    if (a.y > b.y) return 1;
    return 0;
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.AOE.Scene_Battle_selectEnemySelection =
    Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    Yanfly.AOE.Scene_Battle_selectEnemySelection.call(this);
    this._spriteset.setupAoe(BattleManager.inputtingAction());
};

Yanfly.AOE.Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    Yanfly.AOE.Scene_Battle_onEnemyOk.call(this);
    this._spriteset.closeAoe();
};

Yanfly.AOE.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    Yanfly.AOE.Scene_Battle_onEnemyCancel.call(this);
    this._spriteset.closeAoe();
};

Yanfly.AOE.Scene_Battle_selectActorSelection =
    Scene_Battle.prototype.selectActorSelection;
Scene_Battle.prototype.selectActorSelection = function() {
    Yanfly.AOE.Scene_Battle_selectActorSelection.call(this);
    this._spriteset.setupAoe(BattleManager.inputtingAction());
};

Yanfly.AOE.Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.onActorOk = function() {
    Yanfly.AOE.Scene_Battle_onActorOk.call(this);
    this._spriteset.closeAoe();
};

Yanfly.AOE.Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    Yanfly.AOE.Scene_Battle_onActorCancel.call(this);
    this._spriteset.closeAoe();
};

//=============================================================================
// End of File
//=============================================================================
};