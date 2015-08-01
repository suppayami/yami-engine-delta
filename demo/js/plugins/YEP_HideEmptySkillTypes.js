//=============================================================================
// Yanfly Engine Plugins - Hide Empty Skill Types
// YEP_Template.js
// Last Updated: 2015.07.25
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_HideEmptySkillTypes"] = true;

//=============================================================================
 /*:
 * @plugindesc Actor Command menu will now hide skill types for the actor if
 * the actor doesn't have any skills learned for it.
 * @author Yanfly Engine Plugins
 *
 * @help
 * In the event you wish for actors to have multiple skill types, the actor
 * command window can look rather odd when there's skill types listed under the
 * actions but no available skills inside of them. This plugin sets the skill
 * types without any skills inside of them to be temporarily 'removed' until
 * the actor in question possesses a skill of that type.
 *
 * ChangeLog:
 *   2015.07.25 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_HideEmptySkillTypes');

//=============================================================================
// Game_BattlerBase
//=============================================================================

var _YEP_HEST_Game_BattlerBase_ast =Game_BattlerBase.prototype.addedSkillTypes;
Game_BattlerBase.prototype.addedSkillTypes = function() {
    var types = [];
    _YEP_HEST_Game_BattlerBase_ast.call(this).forEach(function(skillType) {
      if (this.hasSkillOfType(skillType)) types.push(skillType);
    }, this);
    return types;
};

Game_BattlerBase.prototype.hasSkillOfType = function(skillType) {
    for (var i = 0; i < this.skills().length; ++i) {
      var skill = this.skills()[i];
      if (skill.stypeId === skillType) return true;
    }
    return false;
};

//=============================================================================
// End of File
//=============================================================================
