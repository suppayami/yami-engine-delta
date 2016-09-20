//=============================================================================
// Yanfly Engine Plugins - Weapon Animation
// YEP_WeaponAnimation.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_WeaponAnimation = true;

var Yanfly = Yanfly || {};
Yanfly.WA = Yanfly.WA || {};

//=============================================================================
 /*:
 * @plugindesc v1.03 This plugin allows you to go past the standard
 * weapon images and even using custom images.
 * @author Yanfly Engine Plugins
 *
 * @param Image Filepath
 * @desc The filepath used for custom weapon images.
 * @default img/weapons/
 *
 * @param Image Smoothing
 * @desc Enable image smoothing for weapons?
 * NO - false     YES - true
 * @default false
 *
 * @param Default Motion
 * @desc Default motion used for custom weapon images.
 * @default swing
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to give your swords different images despite being the same
 * sword type? Or how about your axes? Or any weapon? Now you can! On top of
 * that, you can even use custom images to accomplish this.
 *
 * Note: If you are using the YEP_BattleEngineCore, YEP_X_AnimatedSVEnemies, or
 * any of the Action Sequence Packs, place this plugin under those plugins in
 * the plugin list within the Plugin Manager for the best compatibility.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * For those who would like to give their weapons a little bit of a change, you
 * can make use of these notetags:
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Weapon Image: x>
 *   Replace x with a number above 0 and you'll get an image from img/system's
 *   weapon sheets. Each sheet contains 12 weapon images. If you wish to load a
 *   weapon from the first sheet, it'll be within 1-12. If you wish to load a
 *   weapon from the second sheet, it'll be within 13-24, and so on. The weapon
 *   sheets increase in increments of 12, which means that if you wish to load
 *   a weapon from weapon sheet 50, x will be between 589 to 600.
 *
 *   By default, these are the number values associated with each:
 *   1 - Dagger   7 - Long Bow  13 - Mace       19 - Slingshot  25 - Book
 *   2 - Sword    8 - Crossbow  14 - Rod        20 - Shotgun    26 - Custom
 *   3 - Flail    9 - Gun       15 - Club       21 - Rifle      27 - Custom
 *   4 - Axe     10 - Claw      16 - Chain      22 - Chainsaw   28 - Custom
 *   5 - Whip    11 - Glove     17 - Sword#2    23 - Railgun    29 - Custom
 *   6 - Staff   12 - Spear     18 - Iron Pipe  24 - Stun Rod   30 - Custom
 *
 *   <Weapon Image: filename>
 *   If you have created a custom folder to place unique weapon sheets, you can
 *   use this notetag to acquire them. The filename is case sensitive. Do not
 *   include the file extension. If your weapon sheet is called DaggerBlue.png,
 *   then the notetag you'd use would be <Weapon Image: DaggerBlue> only.
 *
 *   <Weapon Motion: thrust>
 *   <Weapon Motion: swing>
 *   <Weapon Motion: missile>
 *   This will dictate the motion the battler will use when attacking if you're
 *   using a custom weapon animation. If nothing is placed here, the motion
 *   will default to the 'Default Motion' value in the plugin parameters. You
 *   can use any of the following motions:
 *   walk     wait     chant     guard     damage     evade
 *   thrust   swing    missile   skill     spell      item
 *   escape   victory  dying     abnormal  sleep      dead
 *
 *   <Weapon Hue: x>
 *   For those who would like to use different hues with your weapon animation,
 *   use this notetag in the same notebox as the <Weapon Image: x> notetag to
 *   change the hue of the weapon animation to x.
 *
 *   <Weapon Animation: x>
 *   If you would like to override the attack animation when using this weapon,
 *   you can use x to dictate which animation will be used for regular attacks.
 *
 * ---
 *
 * If you haven't noticed yet, these notetags are made for actors, classes,
 * enemies, weapons, armors, and also states. What this means is, the weapon
 * animation changes will behave more like traits. Priorities will occur in the
 * following order:
 *
 *   States
 *   Weapons
 *   Armors
 *   Classes
 *   Actors
 *   Enemies
 *
 * This means that if a battler is affected by a state that would modify its
 * weapon appearance, any other weapon animation changes that the user would
 * have will be overwritten by the state's weapon animation change until the
 * state wears off.
 *
 * ============================================================================
 * Instructions - Custom Weapon Images
 * ============================================================================
 *
 * The weapon sheet format will follow RPG Maker MV's weapon sheet format in
 * individual frame dimensions. However, unlike RPG Maker MV's weapon sheet
 * format. That said, these custom weapon images will need to be made a certain
 * way in order to look properly with RPG Maker MV's default battlers.
 *
 * Here is the weapon sheet format:
 *
 *   Sheet Width:   288 Minimum
 *   Sheet Height:  64 Minimum
 *   Frame Width:   Sheet Width / 3
 *   Frame Height:  Sheet Height
 *
 * As long as you make them in that format, the weapon sheets will work with
 * RPG Maker's default battlers.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Fixed a bug that caused the <Weapon Animation: x> notetag to not work when
 * used by enemies.
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.01:
 * - Fixed a conflict with sideview enemies using no weapon animations.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_WeaponAnimation');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.WAFilepath = String(Yanfly.Parameters['Image Filepath']);
Yanfly.Param.WASmoothing = eval(String(Yanfly.Parameters['Image Smoothing']));
Yanfly.Param.WAMotion = String(Yanfly.Parameters['Default Motion']);
Yanfly.Param.WAMotion = Yanfly.Param.WAMotion.toLowerCase();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.WA.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.WA.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_WeaponAnimation) {
    this.processWANotetags1($dataActors);
    this.processWANotetags1($dataClasses);
    this.processWANotetags1($dataEnemies);
    this.processWANotetags1($dataWeapons);
    this.processWANotetags1($dataArmors);
    this.processWANotetags1($dataStates);
    Yanfly._loaded_YEP_WeaponAnimation = true;
  }
  return true;
};

DataManager.processWANotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.weaponImageIndex = 0;
    obj.weaponAttackMotion = undefined;
    obj.weaponAnimationId = 0;
    obj.weaponHue = undefined;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:WEAPON IMAGE):[ ](\d+)>/i)) {
        obj.weaponImageIndex = parseInt(RegExp.$1);
        if (obj.weaponAttackMotion) continue;
        var motion = $dataSystem.attackMotions[parseInt(RegExp.$1)];
        if (motion) {
          if (motion.type === 0) {
            obj.weaponAttackMotion = 'thrust';
          } else if (motion.type === 1) {
            obj.weaponAttackMotion = 'swing';
          } else {
            obj.weaponAttackMotion = 'missile';
          }
        } else {
          obj.weaponAttackMotion = Yanfly.Param.WAMotion;
        }
        if (obj.weaponHue === undefined) obj.weaponHue = 0;
      } else if (line.match(/<(?:WEAPON IMAGE):[ ](.*)>/i)) {
        obj.weaponImageIndex = String(RegExp.$1);
        obj.weaponAttackMotion = Yanfly.Param.WAMotion;
      } else if (line.match(/<(?:WEAPON MOTION):[ ](.*)>/i)) {
        obj.weaponAttackMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:WEAPON ANIMATION):[ ](\d+)>/i)) {
        obj.weaponAnimationId = parseInt(RegExp.$1);
      } else if (line.match(/<(?:WEAPON HUE):[ ](\d+)>/i)) {
        obj.weaponHue = parseInt(RegExp.$1);
      }
    }
  }
};

//=============================================================================
// ImageManager
//=============================================================================

ImageManager.loadWeapon = function(filename, hue) {
    var filepath = Yanfly.Param.WAFilepath;
    var smooth = Yanfly.Param.WASmoothing;
    return this.loadBitmap(filepath, filename, hue, smooth);
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.WA.Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    this._cacheWeaponImage = undefined;
    this._cacheWeaponHue = undefined;
    this._cacheWeaponMotion = undefined;
    this._cacheWeaponAni = undefined;
    Yanfly.WA.Game_Battler_refresh.call(this);
};

Yanfly.WA.Game_Battler_startWeaponAnimation =
    Game_Battler.prototype.startWeaponAnimation;
Game_Battler.prototype.startWeaponAnimation = function(id) {
    var unique = false;
    if (this.getUniqWeapAniId()) {
      id = this.getUniqWeapAniId();
      unique = true;
    }
    Yanfly.WA.Game_Battler_startWeaponAnimation.call(this, id);
    if (!unique) return;
    if (Imported.YEP_BattleEngineCore) {
      this.forceMotion(this.getUniqueWeaponMotion());
    } else {
      this.requestMotion(this.getUniqueWeaponMotion());
    }
};

Game_Battler.prototype.getUniqWeapAniId = function() {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.weaponImageIndex) {
        this._cacheWeaponImage = obj.weaponImageIndex;
        this._cacheWeaponHue = obj.weaponHue;
        return this._cacheWeaponImage;
      }
    }
    return undefined;
};

Game_Battler.prototype.getUniqueWeaponHue = function() {
    if (this._cacheWeaponHue === undefined) this.getUniqWeapAniId();
    return this._cacheWeaponHue ||0;
};

Game_Battler.prototype.getUniqueWeaponMotion = function() {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.weaponAttackMotion) {
        this._cacheWeaponMotion = obj.weaponAttackMotion;
        return this._cacheWeaponMotion;
      }
    }
    return undefined;
};

Game_Battler.prototype.getUniqueWeaponAni = function() {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.weaponAnimationId) {
        this._cacheWeaponAni = obj.weaponAnimationId;
        return this._cacheWeaponAni;
      }
    }
    return undefined;
};

Game_Battler.prototype.isWeaponAnimationRequested = function() {
    return this._weaponImageId !== 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.getUniqWeapAniId = function() {
    if (this._cacheWeaponImage !== undefined) return this._cacheWeaponImage;
    var id = Game_Battler.prototype.getUniqWeapAniId.call(this);
    if (id) {
      this._cacheWeaponImage = id;
      return this._cacheWeaponImage;
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.weaponImageIndex) {
        this._cacheWeaponImage = obj.weaponImageIndex;
        this._cacheWeaponHue = obj.weaponHue;
        return this._cacheWeaponImage;
      }
    }
    if (this.currentClass().weaponImageIndex) {
      this._cacheWeaponImage = this.currentClass().weaponImageIndex;
        this._cacheWeaponHue = this.currentClass().weaponHue;
      return this._cacheWeaponImage;
    }
    if (this.actor().weaponImageIndex) {
      this._cacheWeaponImage = this.actor().weaponImageIndex;
        this._cacheWeaponHue = this.actor().weaponHue;
      return this._cacheWeaponImage;
    }
    this._cacheWeaponImage = 0;
    return this._cacheWeaponImage;
};

Game_Actor.prototype.getUniqueWeaponMotion = function() {
    if (this._cacheWeaponMotion !== undefined) return this._cacheWeaponMotion;
    var motion = Game_Battler.prototype.getUniqueWeaponMotion.call(this);
    if (motion) {
      this._cacheWeaponMotion = motion;
      return this._cacheWeaponMotion;
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.weaponAttackMotion) {
        this._cacheWeaponMotion = obj.weaponAttackMotion;
        return this._cacheWeaponMotion;
      }
    }
    if (this.currentClass().weaponAttackMotion) {
      this._cacheWeaponMotion = this.currentClass().weaponAttackMotion;
      return this._cacheWeaponMotion;
    }
    if (this.actor().weaponAttackMotion) {
      this._cacheWeaponMotion = this.actor().weaponAttackMotion;
      return this._cacheWeaponMotion;
    }
    this._cacheWeaponMotion = 'thrust';
    return 'thrust';
};

Game_Actor.prototype.getUniqueWeaponAni = function() {
    if (this._cacheWeaponAni !== undefined) return this._cacheWeaponAni;
    var ani = Game_Battler.prototype.getUniqueWeaponAni.call(this);
    if (ani) {
      this._cacheWeaponAni = ani;
      return this._cacheWeaponAni;
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.weaponAnimationId) {
        this._cacheWeaponAni = obj.weaponAnimationId;
        return this.weaponAnimationId;
      }
    }
    if (this.currentClass().weaponAnimationId) {
      this._cacheWeaponAni = this.currentClass().weaponAnimationId;
      return this.weaponAnimationId;
    }
    if (this.actor().weaponAttackMotion) {
      this._cacheWeaponAni = this.actor().weaponAnimationId;
      return this.weaponAnimationId;
    }
    this.weaponAnimationId = 0;
    return this.weaponAnimationId;
};

Yanfly.WA.Game_Actor_attackAnimationId1 =
    Game_Actor.prototype.attackAnimationId1;
Game_Actor.prototype.attackAnimationId1 = function() {
    if (this.getUniqueWeaponAni()) return this.getUniqueWeaponAni();
    return Yanfly.WA.Game_Actor_attackAnimationId1.call(this);
};

Yanfly.WA.Game_Actor_attackAnimationId2 =
    Game_Actor.prototype.attackAnimationId2;
Game_Actor.prototype.attackAnimationId2 = function() {
    if (this.getUniqueWeaponAni()) return this.getUniqueWeaponAni();
    return Yanfly.WA.Game_Actor_attackAnimationId2.call(this);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.getUniqWeapAniId = function() {
    if (this._cacheWeaponImage !== undefined) return this._cacheWeaponImage;
    var id = Game_Battler.prototype.getUniqWeapAniId.call(this);
    if (id) {
      this._cacheWeaponImage = id;
      return this._cacheWeaponImage;
    }
    if (this.enemy().weaponImageIndex) {
      this._cacheWeaponImage = this.enemy().weaponImageIndex;
        this._cacheWeaponHue = this.enemy().weaponHue;
      return this._cacheWeaponImage;
    }
    this._cacheWeaponImage = undefined;
    return this._cacheWeaponImage;
};

Game_Enemy.prototype.getUniqueWeaponMotion = function() {
    if (this._cacheWeaponMotion !== undefined) return this._cacheWeaponMotion;
    var motion = Game_Battler.prototype.getUniqueWeaponMotion.call(this);
    if (motion) {
      this._cacheWeaponMotion = motion;
      return this._cacheWeaponMotion;
    }
    if (this.enemy().weaponAttackMotion) {
      this._cacheWeaponMotion = this.enemy().weaponAttackMotion;
      return this._cacheWeaponMotion;
    }
    this._cacheWeaponMotion = 'thrust';
    return this._cacheWeaponMotion;
};

Game_Enemy.prototype.getUniqueWeaponAni = function() {
    if (this._cacheWeaponAni !== undefined) return this._cacheWeaponAni;
    var ani = Game_Battler.prototype.getUniqueWeaponAni.call(this);
    if (ani) {
      this._cacheWeaponAni = ani;
      return this._cacheWeaponAni;
    }
    if (this.enemy().weaponAnimationId) {
      this._cacheWeaponAni = this.enemy().weaponAnimationId;
      return this.weaponAnimationId;
    }
    this.weaponAnimationId = 0;
    return this.weaponAnimationId;
};

Yanfly.WA.Game_Enemy_attackAnimationId = Game_Enemy.prototype.attackAnimationId;
Game_Enemy.prototype.attackAnimationId = function() {
    if (this.getUniqueWeaponAni()) return this.getUniqueWeaponAni();
    return Yanfly.WA.Game_Enemy_attackAnimationId.call(this);
};

if (Imported.YEP_X_AnimatedSVEnemies) {

Yanfly.WA.Game_Enemy_attackMotion = Game_Enemy.prototype.attackMotion;
Game_Enemy.prototype.attackMotion = function() {
    if (this._cacheWeaponMotion !== undefined) return this._cacheWeaponMotion;
    return Yanfly.WA.Game_Enemy_attackMotion.call(this);
};

Yanfly.WA.Game_Enemy_weaponImageId = Game_Enemy.prototype.weaponImageId;
Game_Enemy.prototype.weaponImageId = function() {
    if (this._cacheWeaponImage !== undefined) return this._cacheWeaponImage;
    return Yanfly.WA.Game_Enemy_weaponImageId.call(this);
};

}; // Imported.YEP_X_AnimatedSVEnemies

//=============================================================================
// Sprite_Weapon
//=============================================================================

Yanfly.WA.Sprite_Weapon_loadBitmap = Sprite_Weapon.prototype.loadBitmap;
Sprite_Weapon.prototype.loadBitmap = function() {
    if (this.isCustomGraphic()) return this.loadCustomBitmap();
    Yanfly.WA.Sprite_Weapon_loadBitmap.call(this);
};

Sprite_Weapon.prototype.isCustomGraphic = function() {
    return typeof this._weaponImageId === 'string';
};

Sprite_Weapon.prototype.loadCustomBitmap = function() {
    if (this.parent && this.parent._battler) {
      var hue = this.parent._battler.getUniqueWeaponHue();
    } else {
      var hue = 0;
    }
    this.bitmap = ImageManager.loadWeapon(this._weaponImageId, hue);
};

Yanfly.WA.Sprite_Weapon_updateFrame = Sprite_Weapon.prototype.updateFrame;
Sprite_Weapon.prototype.updateFrame = function() {
    if (this.isCustomGraphic()) {
      var w = Math.floor(this.bitmap.width / 3);
      var h = this.bitmap.height;
      var sx = this._pattern * w;
      var sy = 0;
      this.setFrame(sx, sy, w, h);
    } else {
      Yanfly.WA.Sprite_Weapon_updateFrame.call(this);
    }
};

Yanfly.WA.Sprite_Weapon_update = Sprite_Weapon.prototype.update;
Sprite_Weapon.prototype.update = function() {
    Yanfly.WA.Sprite_Weapon_update.call(this);
    this.updateFrame();
};

//=============================================================================
// End of File
//=============================================================================
