//=============================================================================
// Yanfly Engine Plugins - PreLoad Battle
// YEP_PreLoadBattle.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_PreLoadBattle = true;

var Yanfly = Yanfly || {};
Yanfly.PLB = Yanfly.PLB || {};

//=============================================================================
 /*:
 * @plugindesc For online games, this plugin will preload resources used by
 * the game at the start of battle.
 * @author Yanfly Engine Plugins
 *
 * @help
 * This is a utility plugin to allow online RPG Maker MV games to preload
 * sources at the start of battle. For maximum compatibility, place this plugin
 * towards the bottom of your plugin list under any plugins that may affect
 * the battle flow.
 *
 * Skill and Item Notetags:
 *   <preload ani: x>
 *   <preload ani: x, x, x>
 *   <preload ani: x to x>
 *   Should these notetags be in any possessed item of the player's inventory
 *   at the start of battle or in the skill list of a battle participant at the
 *   start of battle, the game will preload the animation(x) in addition to the
 *   animation of the object.
 *   *Note: If YEP_BattleEngineCore is being used, this plugin automatically
 *   loads the cast animation of skills present at the start of battle if they
 *   have a set cast animation.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_PreLoadBattle');
Yanfly.Param = Yanfly.Param || {};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.PLB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.PLB.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processPLBNotetags($dataSkills);
		this.processPLBNotetags($dataItems);
		return true;
};

DataManager.processPLBNotetags = function(group) {
	var note1 = /<(?:PRELOAD ANI):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<(?:PRELOAD ANI):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.preloadAnimations = [];

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.preloadAnimations = obj.preloadAnimations.concat(array);
      } else if (line.match(note2)) {
				var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
					parseInt(RegExp.$2));
        obj.passiveStates = obj.passiveStates.concat(range);
			}
		}
	}
};

//=============================================================================
// BattleManager
//=============================================================================

BattleManager.preloadResources = function() {
		this.preloadMembers($gameParty.allMembers());
		this.preloadMembers($gameTroop.members());
		this.preloadItems();
};

BattleManager.preloadMembers = function(members) {
		members.forEach(function(member) {
			member.preloadResources();
		});
};

BattleManager.preloadItems = function() {
		$gameParty.items().forEach(function(item) {
			if (item) {
				var animationId = item.animationId;
				var animation = $dataAnimations[animationId];
				this.preloadAnimation(animation);
				for (var i = 0; i < item.preloadAnimations.length; ++i) {
					animationId = item.preloadAnimations[i];
					animation = $dataAnimations[animationId];
					BattleManager.preloadAnimation(animation);
				}
			}
		}, this);
};

BattleManager.preloadAnimation = function(animation) {
		if (!animation) return;
		var name1 = animation.animation1Name;
		var name2 = animation.animation2Name;
		var hue1 = animation.animation1Hue;
		var hue2 = animation.animation2Hue;
		ImageManager.loadAnimation(name1, hue1);
		ImageManager.loadAnimation(name2, hue2);
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.preloadResources = function() {
    this.preloadBattlers();
		this.preloadSkillAnimations();
};

Game_Battler.prototype.preloadBattlers = function() {
};

Game_Battler.prototype.preloadSkillAnimations = function() {
    this.preloadSkillList(this.skills());
};

Game_Battler.prototype.preloadSkillList = function(skills) {
		skills.forEach(function(skill) {
			if (skill) {
				var animationId = skill.animationId;
				var animation = $dataAnimations[animationId];
				BattleManager.preloadAnimation(animation);
				for (var i = 0; i < skill.preloadAnimations.length; ++i) {
					animationId = skill.preloadAnimations[i];
					animation = $dataAnimations[animationId];
					BattleManager.preloadAnimation(animation);
				}
				if (Imported.YEP_BattleEngineCore && skill.castAnimation > 0) {
					animation = $dataAnimations[skill.castAnimation];
					BattleManager.preloadAnimation(animation);
				}
			}
		}, this);
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.preloadBattlers = function() {
		Game_Battler.prototype.preloadBattlers.call(this);
		if ($gameSystem.isSideView()) {
			var name = this.battlerName();
			ImageManager.loadSvActor(name);
		}
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.preloadBattlers = function() {
		Game_Battler.prototype.preloadBattlers.call(this);
		var name = this.battlerName();
    var hue = this.battlerHue();
		if ($gameSystem.isSideView()) {
      ImageManager.loadSvEnemy(name, hue);
    } else {
      ImageManager.loadEnemy(name, hue);
    }
};

if (!Game_Enemy.prototype.skills) {
		Game_Enemy.prototype.skills = function() {
			var skills = []
			for (var i = 0; i < this.enemy().actions.length; ++i) {
				var skill = $dataSkills[this.enemy().actions[i].skillId]
				if (skill) skills.push(skill);
			}
			return skills;
		}
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.PLB.Scene_Battle_createDisplayObjects =
		Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
		Yanfly.PLB.Scene_Battle_createDisplayObjects.call(this);
		BattleManager.preloadResources();
};

//=============================================================================
// New Function
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

//=============================================================================
// End of File
//=============================================================================
