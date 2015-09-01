//=============================================================================
// Yanfly Engine Plugins - Job Points
// YEP_JobPoints.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_JobPoints = true;

var Yanfly = Yanfly || {};
Yanfly.Jp = Yanfly.Jp || {};

//=============================================================================
 /*:
 * @plugindesc This plugin by itself doesn't do much, but it enables actors
 * to acquire JP (job points) used for other plugins.
 * @author Yanfly Engine Plugins
 *
 * @param JP Text
 * @desc This changes how you want JP to appear in the game.
 * @default JP
 *
 * @param JP Icon
 * @desc This is the icon used for JP. Use 0 if you wish to use no icon.
 * @default 89
 *
 * @param JP Per Action
 * @desc This is the amount of JP an actor gains for his/her current class
 * whenever he/she performs an action.
 * @default 10 + Math.randomInt(10)
 *
 * @param JP Per Level
 * @desc This is the amount of JP an actor gains per level up.
 * @default 100 * this._level + Math.randomInt(100)
 *
 * @param JP Per Enemy
 * @desc This is the amount of JP given per defeated enemy.
 * @default 50 + Math.randomInt(10)
 *
 * @param JP Gained in Battle
 * @desc Adjusts how the gained JP text is shown after battle.      .
 * %1 - Actor     %2 Value     %3 JP
 * @default %1 gains %2%3!
 *
 * @help
 * This plugin by itself will not change any major game functions, but instead,
 * it works in combination with other plugins that make use of this plugin's
 * functions should you decide to incorporate Job Points into your game.
 *
 * When Job Points are earned, they are given to the actor's current class. If
 * the actor were to switch classes, then the Job Points will be changed to
 * that class's Job Points until reverted back.
 * Actor Notetags
 *   <Starting JP: x>
 *   Sets the actor's starting JP value to be x for the actor's initial class.
 *
 *   <Class x Starting JP: y>
 *   Sets the actor's starting JP value for class x to be y.
 *
 *   <JP Rate: x%>
 *   This changes the rate of JP gained by x%. By default, all objects have a
 *   default rate of 100%. Increasing this to 200% will increase JP gained by
 *   twice as much while 50% will halve the amount of JP gained.
 *
 * Skill and Item Notetags
 *   <JP Gain: x>
 *   This makes it so that the actor using this skill or item will gain x amount
 *   of JP instead of the default amount of JP found in the parameters.
 *
 *   <Target JP Gain: x>
 *   This makes it so that the target actor affected by this skill or item will
 *   gain x amount of JP.
 *
 * Class, Weapon, Armor, and State Notetag
 *   <JP Rate: x%>
 *   This changes the rate of JP gained by x%. By default, all objects have a
 *   default rate of 100%. Increasing this to 200% will increase JP gained by
 *   twice as much while 50% will halve the amount of JP gained.
 *
 * Enemy Notetag
 *   <JP: x>
 *   When the enemy is defeated, the party members present will gain x JP each.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_JobPoints');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.Jp = String(Yanfly.Parameters['JP Text']);
Yanfly.Icon.Jp = Number(Yanfly.Parameters['JP Icon']);
Yanfly.Param.JpPerAction = String(Yanfly.Parameters['JP Per Action']);
Yanfly.Param.JpPerEnemy = String(Yanfly.Parameters['JP Per Enemy']);
Yanfly.Param.JpTextFormat = String(Yanfly.Parameters['JP Gained in Battle']);
Yanfly.Param.JpPerLevel = String(Yanfly.Parameters['JP Per Level']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Jp.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.Jp.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processJPNotetags1($dataActors);
	  this.processJPNotetags2($dataSkills);
	  this.processJPNotetags2($dataItems);
		this.processJPNotetags3($dataEnemies);
		this.processJPNotetags4($dataClasses);
		this.processJPNotetags4($dataWeapons);
		this.processJPNotetags4($dataArmors);
		this.processJPNotetags4($dataStates);
		return true;
};

DataManager.processJPNotetags1 = function(group) {
  var note1 = /<(?:STARTING JP):[ ](\d+)>/i;
  var note2 = /<(?:CLASS)[ ](\d+)[ ](?:STARTING JP):[ ](\d+)>/i;
	var note3 = /<(?:JP RATE):[ ](\d+)([%％])>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.startingJp = {};
		obj.jpRate = 1.0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.startingJp[obj.classId] = parseInt(RegExp.$1);
			} else if (line.match(note2)) {
        obj.startingJp[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(note3)) {
				obj.jpRate = parseFloat(RegExp.$1 * 0.01);
			}
		}
	}
};

DataManager.processJPNotetags2 = function(group) {
  var note1 = /<(?:GAIN JP):[ ](\d+)>/i;
  var note2 = /<(?:TARGET GAIN JP):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.gainJp = Yanfly.Param.JpPerAction;
    obj.targetGainJp = 0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.gainJp = parseInt(RegExp.$1);
			} else if (line.match(note2)) {
				obj.targetGainJp = parseInt(RegExp.$1);
			}
		}
	}
};

DataManager.processJPNotetags3 = function(group) {
  var note1 = /<(?:JP):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.jp = Yanfly.Param.JpPerEnemy;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.jp = parseInt(RegExp.$1);
			}
		}
	}
};

DataManager.processJPNotetags4 = function(group) {
  var note1 = /<(?:JP RATE):[ ](\d+)([%％])>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.jpRate = 1.0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.jpRate = parseFloat(RegExp.$1 * 0.01);
			}
		}
	}
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Jp.BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    Yanfly.Jp.BattleManager_makeRewards.call(this);
    this._rewards.jp = $gameTroop.jpTotal();
};

Yanfly.Jp.BattleManager_displayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function() {
    Yanfly.Jp.BattleManager_displayRewards.call(this);
		this.gainJp();
};

BattleManager.gainJp = function() {
		var jp = $gameTroop.jpTotal();
		$gameMessage.newPage();
		$gameParty.members().forEach(function(actor) {
			actor.gainJp(jp);
			var fmt = Yanfly.Param.JpTextFormat;
			var text = fmt.format(actor.name(), Yanfly.Util.toGroup(actor.battleJp()),
				Yanfly.Param.Jp);
			$gameMessage.add('\\.' + text);
		});
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.Jp.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
    Yanfly.Jp.Game_Battler_useItem.call(this, item);
    if (this.isActor()) this.gainJp(eval(item.gainJp), this._classId);
};

Yanfly.Jp.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.Jp.Game_Battler_onBattleStart.call(this);
		this._battleJp = 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Jp.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.Jp.Game_Actor_setup.call(this, actorId);
    this.initJp();
};

Game_Actor.prototype.jp = function(classId) {
    if (!this._jp) this.initJp();
		if (!this._jp) return 0;
    if (!this._jp[classId]) this._jp[classId] = 0;
    return this._jp[classId];
};

Game_Actor.prototype.initJp = function() {
    var actor = this.actor();
    for (var i = 0; i < $dataClasses.length; i++) {
			if (actor.startingJp) {
				var jp = actor.startingJp[i] || 0;
				this.setJp(i, jp);
			}
    }
};

Game_Actor.prototype.setJp = function(value, classId) {
    classId = classId || this._classId;
		if (!this._jp) this._jp = {};
    if (!this._jp[classId]) this._jp[classId] = 0;
    this._jp[classId] = Math.max(0, value);
};

Game_Actor.prototype.jpRate = function() {
		var rate = 1.0;
		rate *= this.actor().jpRate;
		rate *= this.currentClass().jpRate;
		var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item) rate *= item.jpRate;
    }
		var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (state) rate *= state.jpRate;
    }
		return rate;
};

Game_Actor.prototype.gainJp = function(value, classId) {
		classId = classId || this._classId;
		value = Math.floor(value * this.jpRate());
		if ($gameParty.inBattle()) {
			this._battleJp += value;
		}
		this.setJp(this.jp(classId) + value, classId);
};

Game_Actor.prototype.loseJp = function(value, classId) {
		classId = classId || this._classId;
		this.setJp(this.jp(classId) - value, classId);
};

Game_Actor.prototype.battleJp = function() {
		return this._battleJp;
};

Yanfly.Jp.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    Yanfly.Jp.Game_Actor_levelUp.call(this);
		this.gainJp(eval(Yanfly.Param.JpPerLevel), this._classId);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.jp = function() {
    return eval(this.enemy().jp);
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.jpTotal = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r + enemy.jp();
    }, 0);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
		Yanfly.Util.toGroup = function(inVal) {
				return inVal;
		}
};

//=============================================================================
// End of File
//=============================================================================
