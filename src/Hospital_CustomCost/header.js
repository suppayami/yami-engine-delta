/*:
 * Yami Engine Delta - Hospital - Custom Costs
 *
 * @plugindesc v1.0.0 Provides YED_Hospital custom costs for recovering.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param [Default Eval Price]
 * @default
 *
 * @param Enable Default Eval
 * @desc Enable the Price in this section.
 * @default true
 *
 * @param HP Price (Eval)
 * @desc Needed money for recovering full HP. Evalable.
 * actor refers to actor object.
 * @default (1 - actor.hpRate()) * 100 * 50 * actor.level
 *
 * @param MP Price (Eval)
 * @desc Needed money for recovering full MP. Evalable.
 * actor refers to actor object.
 * @default (1 - actor.mpRate()) * 100 * 100 * actor.level
 *
 * @param State Price (Eval)
 * @desc Needed money for removing a state. Evalable.
 * actor refers to actor object. price refers to default fee.
 * @default price * actor.level
 *
 * @param [Cost Weapons]
 * @default
 *
 * @param Hospital Weapon Costs
 * @desc Needed weapons for fully recovering. Array of [WeaponID, Quantity]
 * @default
 *
 * @param [Cost Armors]
 * @default
 *
 * @param Hospital Armor Costs
 * @desc Needed armors for fully recovering. Array of [ArmorID, Quantity]
 * @default
 *
 * @param [Cost Items]
 * @default
 *
 * @param Hospital Item Costs
 * @desc Needed items for fully recovering. Array of [ItemID, Quantity]
 * @default
 *
 * @help
 * The following are Plugin Commands you may use with events.
 *
 * Plugin Command:
 *   OpenHospital       Opens up the Hospital Scene from the field.
 */
