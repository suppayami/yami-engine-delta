//=============================================================================
// Yanfly Engine Plugins - Hide Empty Skill Types
// YEP_HideEmptySkillTypes.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_HideEmptySkillTypes = true;

var Yanfly = Yanfly || {};
Yanfly.HEST = Yanfly.HEST || {};

//=============================================================================
 /*:
 * @plugindesc Actor Command menu will now hide skill types for the actor
 * if the actor doesn't have any skills learned for it.
 * @author Yanfly Engine Plugins
 *
 * @help
 * In the event you wish for actors to have multiple skill types, the actor
 * command window can look rather odd when there's skill types listed under the
 * actions but no available skills inside of them. This plugin sets the skill
 * types without any skills inside of them to be temporarily 'removed' until
 * the actor in question possesses a skill of that type.
 */
//=============================================================================

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.HEST.Game_BattlerBase_addedSkillTypes =
    Game_BattlerBase.prototype.addedSkillTypes;
Game_BattlerBase.prototype.addedSkillTypes = function() {
    var types = [];
    var skillTypes = Yanfly.HEST.Game_BattlerBase_addedSkillTypes.call(this);
    skillTypes.forEach(function(skillType) {
      if (this.hasSkillOfType(skillType)) types.push(skillType);
    }, this);
    return types;
};

Game_BattlerBase.prototype.hasSkillOfType = function(skillType) {
    for (var i = 0; i < this.skills().length; ++i) {
      var skill = this.skills()[i];
      if (!skill) continue;
      if (skill.stypeId === skillType) return true;
    }
    return false;
};

//=============================================================================
// End of File
//=============================================================================
