//=============================================================================
// Yanfly Engine Plugins - Battle Portraits
// YEP_BattlePortraits.js
// Last Updated: 2015.07.18
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_BattlePortraits"] = true;

//=============================================================================
/*:
 * @plugindesc While actors select their actions, they will display their own
 * battle portraits.
 * @author Yanfly Engine Plugins
 *
 * @param Portraits Folder
 * @desc This will be the folder you want to store your battle portraits in.
 * Save your images there.
 * @default img/battleportraits/
 *
 * @param Portrait X
 * @desc This adjusts where you want the portrait's x position to be on the
 * screen. The x origin is the image's center.
 * @default 200
 *
 * @param Portrait Y
 * @desc This adjusts where you want the portrait's y position to be on the
 * screen. The origin is the image's bottom.
 * @default Graphics.boxHeight
 *
 * @param Fade Rate
 * @desc This is the rate at which battle portraits fade in and out. The
 * higher the number, the faster.
 * @default 24
 *
 * @param Smoothing
 * @desc Do you want the battle portraits to have image smoothing?  .
 * No - false     Yes - true
 * @default true
 *
 * @help
 * Once you have an Event Picture shown, create a Plugin Command Event and
 * type in one of the following commands to have this plugin do what you want:
 *
 * Actor:
 *   <Portrait: x>
 *   This actor's battle portrait becomes filename x located in the
 *   "battleportraits" folder inside the "img" folder unless specified inside
 *   another folder.
 *
 * Weapon & Armor Notetags:
 *   <Actor x Portrait: y>
 *   If actor x is wearing this piece of equipment, the battle portrait
 *   becomes replaced with filename y located in the "battleportraits" folder
 *   inside the "img" folder unless specified inside another folder. It will
 *   give priority to the pieces of equipment types listed earlier in the
 *   equipment list and the actor's own battle portrait.
 *
 * State Notetags:
 *   <Actor x Portrait: y>
 *   If actor x is affected by this state, the battle portrait becomes replaced
 *   with filename y located in the "battleportraits" folder inside the "img"
 *   folder unless specified inside another folder. This notetag will give
 *   priority to states with higher priorities than others and will also take
 *   priority over any pieces of equipment and the actor's own battle portrait.
 *
 * ChangeLog:
 *   2015.07.18 - Code Efficiency Update.
 *   2015.07.14 - Added "Smoothing" parameter.
 *   2015.07.10 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_BattlePortraits');

//=============================================================================
// Scene_Boot
//=============================================================================

var _YEP_BTP_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_BTP_Scene_Boot_start.call(this);
	DataManager.processBTPNotetags1($dataActors);
	DataManager.processBTPNotetags2($dataWeapons);
	DataManager.processBTPNotetags2($dataArmors);
	DataManager.processBTPNotetags2($dataStates);
};

DataManager.processBTPNotetags1 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.battleportrait = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:PORTRAIT|portrait):[ ](.*)>/i)) {
				obj.battleportrait = RegExp.$1;
			}
		}
	}
};

DataManager.processBTPNotetags2 = function(group) {
	var note1 = /<(?:ACTOR|actor)[ ](\d+)[ ](?:PORTRAIT|portrait):[ ](.*)>/i
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.battleportrait = [];

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.battleportrait[parseInt(RegExp.$1)] = RegExp.$2;
			}
		}
	}
};

//=============================================================================
// ImageManager
//=============================================================================

var _yep_btp_portraits_folder = String(parameters['Portraits Folder'] ||
                                'img/battleportraits/');
var _yep_btp_smoothing = String(parameters['Smoothing'] || 'true');
ImageManager.loadBattlePortrait = function(filename, hue) {
		var smoothing = eval(_yep_btp_smoothing);
    return this.loadBitmap(_yep_btp_portraits_folder, filename, hue, smoothing);
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.battlePortrait = function(name) {
		var states = this.states();
		for (var i = 0; i < states.length; i++) {
				var item = states[i];
				if (item && item.battleportrait[this._actorId] !== undefined) {
					return item.battleportrait[this._actorId];
				}
		}
		var equips = this.equips();
		for (var i = 0; i < equips.length; i++) {
				var item = equips[i];
				if (item && item.battleportrait[this._actorId] !== undefined) {
					return item.battleportrait[this._actorId];
				}
		}
    return $dataActors[this.actorId()].battleportrait;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

var _YES_BTP_Spriteset_Battle_createLowerLayer =
    Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _YES_BTP_Spriteset_Battle_createLowerLayer.call(this);
    this.createBattlePortraits();
};

Spriteset_Battle.prototype.createBattlePortraits = function() {
    this._battleportraits = [];
    for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
        var actor = $gameParty.members()[i];
        this._battleportraits[i] = new Sprite_BattlePortrait(actor);
        this._battleField.addChild(this._battleportraits[i]);
    }
};

//=============================================================================
// Spriteset_BattlePortrait
//=============================================================================

Sprite_BattlePortrait = function() {
    this.initialize.apply(this, arguments);
}

Sprite_BattlePortrait.prototype = Object.create(Sprite.prototype);
Sprite_BattlePortrait.prototype.constructor = Sprite_BattlePortrait;

Sprite_BattlePortrait.prototype.initialize = function(actor) {
    this._actor = actor;
    Sprite.prototype.initialize.call(this);
    this._portraitName = '';
    this.opacity = 0;
    this.visible = true;
    this.update();
    this.setOrigin();
    this.setinitpos();
};

Sprite_BattlePortrait.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateBitmap();
    this.updateOpacity();
};

Sprite_BattlePortrait.prototype.updateBitmap = function() {
		if (this._actor) {
				var portrait = this._actor.battlePortrait();
				if (portrait !== this._portraitName) {
		      this._portraitName = portrait;
		      this.loadBitmap();
		    }
		}
};

Sprite_BattlePortrait.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadBattlePortrait(this._portraitName);
};

Sprite_BattlePortrait.prototype.setOrigin = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 1.0;
};

var _yep_btp_portraits_x = String(parameters['Portrait X'] || '200');
var _yep_btp_portraits_y = String(parameters['Portrait Y'] ||
                            'Graphics.boxHeight');
Sprite_BattlePortrait.prototype.setinitpos = function() {
    this.x = eval(_yep_btp_portraits_x);
    this.y = eval(_yep_btp_portraits_y);
};

var _yep_btp_faderate = Number(parameters['Fade Rate'] || 24);
Sprite_BattlePortrait.prototype.updateOpacity = function() {
  if (BattleManager.actor() == this._actor) {
    this.opacity += _yep_btp_faderate;
  } else {
    this.opacity -= _yep_btp_faderate;
  }
};

//=============================================================================
// End of File
//=============================================================================
