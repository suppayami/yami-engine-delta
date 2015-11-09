/*:
 * Yami Engine Delta - Skill Shop
 *
 * @plugindesc v1.0.0 This plugin provides a skill shop for buying skills.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param [Basic Setting]
 * @default
 *
 * @param Default Price
 * @desc Default Gold Cost for buying skill.
 * @default 100
 *
 * @param [Visual Setting]
 * @default
 *
 * @param Gold Cost Text
 * @desc Text for gold cost to buy skill.
 * @default Gold Cost
 *
 * @param Item Cost Text
 * @desc Text for item cost to buy skill.
 * @default Requires
 *
 * @param Buy Command
 * @desc Text for Buy command.
 * @default Learn
 *
 * @param Cancel Command
 * @desc Text for Cancel command.
 * @default Leave
 *
 * @param Text Alignment
 * @desc How to align the text for the command window.
 * left     center     right
 * @default center
 *
 * @help
 * The following are Plugin Commands you may use with events.
 *
 * Plugin Command:
 *   OpenSkillShop(ID,ID,ID)    Opens up skill shop instantly with
 *     or                       skill list defined by ID. You can put
 *   OpenSkillShop ID ID ID     as many ID as you want into the command.
 *                              Remember not to put any whitespace into
 *                              the command.
 *
 * ============================================================================
 *
 * Skills
 * To change gold cost for buying the skill, use the following notetag:
 *   <Buy Cost Gold: X>
 *
 * To add more weapons/armors/items cost for buying the skill, use the
 * following notetag with X is the ID in database:
 *   <Buy Cost Weapon X: Y>
 *   <Buy Cost Armor X: Y>
 *   <Buy Cost Item X: Y>
 *
 * To add more custom text into the requirements, use the following notetag
 * with support of some message escape code (color, icon...):
 *   <Buy Custom Text>
 *   Line
 *   Line
 *   Line
 *   </Buy Custom Text>
 *
 * To add more condition to buy the skill, use the following notetag (Only
 * for advanced users, requires programming knowledge):
 *   <Buy Custom Require>          Example: <Buy Custom Require>
 *   Condition                              $gameSwitches.value(1)
 *   Condition                              actor.level > 10
 *   Condition                              </Buy Custom Require>
 *   </Buy Custom Require>
 *
 * To add more cost to buy the skill, use the following notetag (Only
 * for advanced users, requires programming knowledge):
 *   <Buy Custom Cost>          Example: <Buy Custom Cost>
 *   Eval Code                           actor.levelDown();
 *   </Buy Custom Cost>                  </Buy Custom Cost>
 * ============================================================================
 */
