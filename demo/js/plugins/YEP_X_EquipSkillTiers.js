//=============================================================================
// Yanfly Engine Plugins - Equip Battle Skills Extension - Tiers
// YEP_X_EquipSkillTiers.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_EquipSkillTiers = true;

var Yanfly = Yanfly || {};
Yanfly.ESTier = Yanfly.ESTier || {};

//=============================================================================
 /*:
 * @plugindesc v1.01 (Requires YEP_EquipBattleSkills.js) Places equippable
 * skills in tiers to limit what players can equip.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Sort by Tier?
 * @desc Sort equippable skills by tier?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Tier 1---
 * @default
 *
 * @param Tier 1 Enabled
 * @desc Is tier 1 enabled?
 * NO - false     YES - true
 * @default true
 *
 * @param Tier 1 Name
 * @desc This is the name of tier 1 skills.
 * @default Common
 *
 * @param Tier 1 Icon
 * @desc This is the icon used for tier 1 skills.
 * @default 307
 *
 * @param Tier 1 Maximum
 * @desc The maximum number of equipped skills for tier 1.
 * @default 8
 *
 * @param ---Tier 2---
 * @default
 *
 * @param Tier 2 Enabled
 * @desc Is tier 2 enabled?
 * NO - false     YES - true
 * @default true
 *
 * @param Tier 2 Name
 * @desc This is the name of tier 2 skills.
 * @default Uncommon
 *
 * @param Tier 2 Icon
 * @desc This is the icon used for tier 2 skills.
 * @default 309
 *
 * @param Tier 2 Maximum
 * @desc The maximum number of equipped skills for tier 2.
 * @default 6
 *
 * @param ---Tier 3---
 * @default
 *
 * @param Tier 3 Enabled
 * @desc Is tier 3 enabled?
 * NO - false     YES - true
 * @default true
 *
 * @param Tier 3 Name
 * @desc This is the name of tier 3 skills.
 * @default Rare
 *
 * @param Tier 3 Icon
 * @desc This is the icon used for tier 3 skills.
 * @default 310
 *
 * @param Tier 3 Maximum
 * @desc The maximum number of equipped skills for tier 3.
 * @default 4
 *
 * @param ---Tier 4---
 * @default
 *
 * @param Tier 4 Enabled
 * @desc Is tier 4 enabled?
 * NO - false     YES - true
 * @default true
 *
 * @param Tier 4 Name
 * @desc This is the name of tier 4 skills.
 * @default Epic
 *
 * @param Tier 4 Icon
 * @desc This is the icon used for tier 4 skills.
 * @default 311
 *
 * @param Tier 4 Maximum
 * @desc The maximum number of equipped skills for tier 4.
 * @default 3
 *
 * @param ---Tier 5---
 * @default
 *
 * @param Tier 5 Enabled
 * @desc Is tier 5 enabled?
 * NO - false     YES - true
 * @default true
 *
 * @param Tier 5 Name
 * @desc This is the name of tier 5 skills.
 * @default Legendary
 *
 * @param Tier 5 Icon
 * @desc This is the icon used for tier 5 skills.
 * @default 312
 *
 * @param Tier 5 Maximum
 * @desc The maximum number of equipped skills for tier 5.
 * @default 2
 *
 * @param ---Tier 6---
 * @default
 *
 * @param Tier 6 Enabled
 * @desc Is tier 6 enabled?
 * NO - false     YES - true
 * @default true
 *
 * @param Tier 6 Name
 * @desc This is the name of tier 6 skills.
 * @default Ultimate
 *
 * @param Tier 6 Icon
 * @desc This is the icon used for tier 6 skills.
 * @default 308
 *
 * @param Tier 6 Maximum
 * @desc The maximum number of equipped skills for tier 6.
 * @default 1
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_EquipBattleSkills. Make sure this plugin is located
 * under YEP_EquipBattleSkills in the plugin list.
 *
 * This plugin imposes a limit upon actors to limit what skills can be equipped
 * based on tiers. The player must abide by the limits before being able to
 * exit the menu allowing for better control over gameplay balance.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that alter the tier settings of skills.
 *
 * Skill Notetag
 *   <Skill Tier: x>
 *   Sets the skill's tier to x, making it limited by the restrictions applied
 *   by the actor.
 *
 * Actor, Class, Skill, Weapon, Armor, and State Notetags
 *   <Skill Tier x Slots: +y>
 *   <Skill Tier x Slots: -y>
 *   Increases or decreases the skill tier for tier x by y slots. The changes
 *   made here do not go under 0 nor do they bypass the maximum battle skills
 *   equip limit.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Added anti-crash measures when equipping skills.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_EquipBattleSkills) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_EquipSkillTiers');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.ESTSort = eval(String(Yanfly.Parameters['Sort by Tier?']));

Yanfly.Param.ESTierEnabled = {};
Yanfly.Param.ESTierName = {};
Yanfly.Icon.ESTier = {};
Yanfly.Param.ESTierMaximum = {};
for (Yanfly.i = 1; Yanfly.i <= 6; ++Yanfly.i) {
  Yanfly.line = "String(Yanfly.Parameters['Tier " + Yanfly.i + " Enabled'])";
  Yanfly.Param.ESTierEnabled[Yanfly.i] = eval(eval(Yanfly.line));
  Yanfly.line = "String(Yanfly.Parameters['Tier " + Yanfly.i + " Name'])";
  Yanfly.Param.ESTierName[Yanfly.i] = eval(Yanfly.line);
  Yanfly.line = "Number(Yanfly.Parameters['Tier " + Yanfly.i + " Icon'])";
  Yanfly.Icon.ESTier[Yanfly.i] = eval(Yanfly.line);
  Yanfly.line = "Number(Yanfly.Parameters['Tier " + Yanfly.i + " Maximum'])";
  Yanfly.Param.ESTierMaximum[Yanfly.i] = eval(Yanfly.line);
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.ESTier.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.ESTier.DataManager_isDatabaseLoaded.call(this)) return false;

    if (!Yanfly._loaded_YEP_X_EquipSkillTiers) {
  		this.processESTierNotetags1($dataSkills);
      this.processESTierNotetags2($dataActors);
      this.processESTierNotetags2($dataClasses);
      this.processESTierNotetags2($dataSkills);
      this.processESTierNotetags2($dataWeapons);
      this.processESTierNotetags2($dataArmors);
      this.processESTierNotetags2($dataStates);
      Yanfly._loaded_YEP_X_EquipSkillTiers = true;
    }

		return true;
};

DataManager.processESTierNotetags1 = function(group) {
	var note1 = /<(?:SKILL TIER):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.equipTier = 1;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
        var value = parseInt(RegExp.$1).clamp(1, 6);
        if (Yanfly.Param.ESTierEnabled[value]) obj.equipTier = value;
			}
		}
	}
};

DataManager.processESTierNotetags2 = function(group) {
	var note1 = /<(?:SKILL TIER)[ ](\d+)[ ](?:SLOTS|SLOT):[ ]([\+\-]\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.equipTierSlot = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
    };

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				var tier = parseInt(RegExp.$1).clamp(1, 6);
        obj.equipTierSlot[tier] = parseInt(RegExp.$2);
			}
		}
	}
};

//=============================================================================
// Game_System
//=============================================================================

Game_System.prototype.usedSkillTiers = function() {
    var tiers = [];
    for (var i = 1; i <= 6; ++i) {
      if (Yanfly.Param.ESTierEnabled[i]) tiers.push(i);
    }
    return tiers;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.getEquipSkillTierCount = function(tier) {
    var value = 0;
    for (var i = 0; i < this.battleSkillsRaw().length; ++i) {
      if (this.battleSkillsRaw()[i] === 0) continue;
      var skill = $dataSkills[this.battleSkillsRaw()[i]];
      if (skill.equipTier === tier) value += 1;
    }
    return value;
};

Game_Actor.prototype.getEquipSkillTierMax = function(tier) {
    var value = Yanfly.Param.ESTierMaximum[tier];
    value = value.clamp(0, this.maxBattleSkills());
    value += this.actor().equipTierSlot[tier];
    value += this.currentClass().equipTierSlot[tier];
    for (var i = 0; i < this.battleSkillsRaw().length; ++i) {
      var skill = $dataSkills[this.battleSkillsRaw()[i]];
      if (skill) value += skill.equipTierSlot[tier];
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) value += state.equipTierSlot[tier];
    }
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip) value += equip.equipTierSlot[tier];
    }
    return value.clamp(0, Yanfly.Param.EBSMaxSlots);
};

Game_Actor.prototype.equipSkillTiersOk = function() {
    var tiers = $gameSystem.usedSkillTiers();
    for (var i = 0; i < tiers.length; ++i) {
      var tier = tiers[i];
      var cur = this.getEquipSkillTierCount(tier);
      var max = this.getEquipSkillTierMax(tier);
      if (cur > max) return false;
    }
    return true;
};

Yanfly.ESTier.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    var hasLearnedSkill = this.isLearnedSkill(skillId);
    if (!hasLearnedSkill) this._learningSkill = true;
    Yanfly.ESTier.Game_Actor_learnSkill.call(this, skillId);
    if (!hasLearnedSkill) this._learningSkill = undefined;
};

Yanfly.ESTier.Game_Actor_equipSkill = Game_Actor.prototype.equipSkill;
Game_Actor.prototype.equipSkill = function(skillId, slotId) {
    if (this._learningSkill) {
      var skill = $dataSkills[skillId]; 
      if (skill) {
        var tier = skill.equipTier;
        var cur = this.getEquipSkillTierCount(tier);
        var max = this.getEquipSkillTierMax(tier);
        if (cur >= max) return;
      }
    }
    Yanfly.ESTier.Game_Actor_equipSkill.call(this, skillId, slotId);
};

//=============================================================================
// Window_SkillList
//=============================================================================

Yanfly.ESTier.Window_SkillList_isCancelEnabled =
    Window_SkillList.prototype.isCancelEnabled;
Window_SkillList.prototype.isCancelEnabled = function() {
    if (this._actor && this._stypeId === 'battleSkills') {
      if (!this._actor.equipSkillTiersOk()) return false;
    }
    return Yanfly.ESTier.Window_SkillList_isCancelEnabled.call(this);
};

//=============================================================================
// Window_SkillEquip
//=============================================================================

if (Yanfly.Param.ESTSort) {

Yanfly.ESTier.Window_SkillEquip_getSkills = 
    Window_SkillEquip.prototype.getSkills;
Window_SkillEquip.prototype.getSkills = function() {
    Yanfly.ESTier.Window_SkillEquip_getSkills.call(this);
    this._skillList.sort(function(a, b) {
      var t1 = a.equipTier;
      var t2 = b.equipTier;
      if (t1 !== t2) {
        return t1 - t2;
      }
      return a.name === b.name ? 0 : +(a.name > b.name) || -1;
    });
    return this._skillList;
};

}; // Yanfly.Param.ESTSort

Yanfly.ESTier.Window_SkillEquip_drawSkill =
    Window_SkillEquip.prototype.drawSkill;
Window_SkillEquip.prototype.drawSkill = function(skill, rect) {
    Yanfly.ESTier.Window_SkillEquip_drawSkill.call(this, skill, rect);
    this.drawSkillTierIcon(skill, rect);
};

Window_SkillEquip.prototype.drawSkillTierIcon = function(skill, rect) {
    this.resetFontSettings();
    this.resetTextColor();
    var tier = skill.equipTier;
    var icon = Yanfly.Icon.ESTier[tier];
    this.drawIcon(icon, rect.width - 4 - Window_Base._iconWidth, rect.y + 2);
};

//=============================================================================
// Window_SkillEquipStatus
//=============================================================================

function Window_SkillEquipStatus() {
    this.initialize.apply(this, arguments);
}

Window_SkillEquipStatus.prototype = Object.create(Window_Base.prototype);
Window_SkillEquipStatus.prototype.constructor = Window_SkillEquipStatus;

Window_SkillEquipStatus.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
};

Window_SkillEquipStatus.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_SkillEquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (!this._actor) return;
    var dw = Window_Base._faceWidth;
    var dh = Window_Base._faceHeight;
    var x = dw + this.standardPadding();
    var x2 = x + Window_Base._faceWidth + (2 * this.textPadding());
    this.drawActorFace(this._actor, 0, 0, dw, dh);
    this.drawActorName(this._actor, x, 0);
    this.drawActorClass(this._actor, x2, 0);
    this.drawTiers();
};

Window_SkillEquipStatus.prototype.drawTiers = function() {
    var tiers = $gameSystem.usedSkillTiers();
    var dx = Window_Base._faceWidth + this.standardPadding();
    var dy = this.lineHeight();
    var dw = this.contents.width - dx;
    if (tiers.length > 3) {
      dw -= this.textPadding() * 2;
      dw /= 2;
    }
    for (var j = 0; j < tiers.length; ++j) {
      var tier = tiers[j];
      this.drawTierInfo(tier, dx, dy, dw);
      if (tier % 3 === 0) {
        dy = this.lineHeight();
        dx += dw + this.textPadding();
      } else {
        dy += this.lineHeight();
      }
    }
};

Window_SkillEquipStatus.prototype.drawTierInfo = function(tier, dx, dy, dw) {
    var icon = Yanfly.Icon.ESTier[tier];
    var name = Yanfly.Param.ESTierName[tier];
    var ibw = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(icon, dx + 2, dy + 2);
    this.drawText(name, dx + ibw, dy, dw - ibw);
    var cur = this._actor.getEquipSkillTierCount(tier);
    var max = this._actor.getEquipSkillTierMax(tier);
    var text = cur + '/' + max;
    if (cur > max) {
      this.changeTextColor(this.powerDownColor());
    } else if (cur === max) {
      this.changeTextColor(this.crisisColor());
    } else {
      this.changeTextColor(this.normalColor());
    }
    this.drawText(text, dx + ibw, dy, dw - ibw, 'right');
};

//=============================================================================
// Scene_Skill
//=============================================================================

Yanfly.ESTier.Scene_Skill_createStatusWindow =
    Scene_Skill.prototype.createStatusWindow;
Scene_Skill.prototype.createStatusWindow = function() {
    Yanfly.ESTier.Scene_Skill_createStatusWindow.call(this);
    var wx = this._skillTypeWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._skillTypeWindow.height;
    this._statusEquipWindow = new Window_SkillEquipStatus(wx, wy, ww, wh);
    this._statusEquipWindow.hide();
    this.addWindow(this._statusEquipWindow);
};

Yanfly.ESTier.Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
Scene_Skill.prototype.refreshActor = function() {
    Yanfly.ESTier.Scene_Skill_refreshActor.call(this);
    var actor = this.actor();
    if (this._statusEquipWindow) this._statusEquipWindow.setActor(actor);
};

Yanfly.ESTier.Scene_Skill_commandSkill = Scene_Skill.prototype.commandSkill;
Scene_Skill.prototype.commandSkill = function() {
    Yanfly.ESTier.Scene_Skill_commandSkill.call(this);
    if (this._skillTypeWindow.currentExt() === 'battleSkills') {
      this._statusWindow.hide();
      this._statusEquipWindow.show();
      this._statusEquipWindow.refresh();
    };
};

Yanfly.ESTier.Scene_Skill_onItemCancel = Scene_Skill.prototype.onItemCancel;
Scene_Skill.prototype.onItemCancel = function() {
    Yanfly.ESTier.Scene_Skill_onItemCancel.call(this);
    if (this._skillTypeWindow.currentExt() === 'battleSkills') {
      this._statusWindow.show();
      this._statusEquipWindow.hide();
      this._statusEquipWindow.refresh();
    }
};

Yanfly.ESTier.Scene_Skill_onSkillEqOk = Scene_Skill.prototype.onSkillEqOk;
Scene_Skill.prototype.onSkillEqOk = function() {
    Yanfly.ESTier.Scene_Skill_onSkillEqOk.call(this);
    this._statusEquipWindow.refresh();
};

Yanfly.ESTier.Scene_Skill_onSkillEqCancel =
    Scene_Skill.prototype.onSkillEqCancel;
Scene_Skill.prototype.onSkillEqCancel = function() {
    Yanfly.ESTier.Scene_Skill_onSkillEqCancel.call(this);
    this._statusEquipWindow.refresh();
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

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

//=============================================================================
// End of File
//=============================================================================
};
