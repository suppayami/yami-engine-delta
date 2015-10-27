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
 * @default (1 - actor.hpRate()) * 100
 *
 * @param MP Price (Eval)
 * @desc Needed money for recovering full MP. Evalable.
 * @default (1 - actor.mpRate()) * 200
 *
 * @param State Price (Eval)
 * @desc Needed money for removing all states. Evalable.
 * @default actor.states().length * 200
 *
 * @param [Cost Weapons]
 * @default
 *
 * @param HP Weapon Costs
 * @desc Needed weapons for recovering full HP. Array of [WeaponID, Quantity]
 * @default [1, 5], [2, 10]
 *
 * @param MP Weapon Costs
 * @desc Needed weapons for recovering full MP. Array of [WeaponID, Quantity]
 * @default [1, 5], [2, 10]
 *
 * @param State Weapon Costs
 * @desc Needed weapons for removing all states. Array of [WeaponID, Quantity]
 * @default [1, 5], [2, 10]
 *
 * @param [Cost Armors]
 * @default
 *
 * @param HP Armor Costs
 * @desc Needed armors for recovering full HP. Array of [ArmorID, Quantity]
 * @default [1, 5], [2, 10]
 *
 * @param MP Armor Costs
 * @desc Needed armors for recovering full MP. Array of [ArmorID, Quantity]
 * @default [1, 5], [2, 10]
 *
 * @param State Armor Costs
 * @desc Needed armors for removing all states. Array of [ArmorID, Quantity]
 * @default [1, 5], [2, 10]
 *
 * @param [Cost Items]
 * @default
 *
 * @param HP Item Costs
 * @desc Needed items for recovering full HP. Array of [ItemID, Quantity]
 * @default [1, 5], [2, 10]
 *
 * @param MP Item Costs
 * @desc Needed items for recovering full MP. Array of [ItemID, Quantity]
 * @default [1, 5], [2, 10]
 *
 * @param State Item Costs
 * @desc Needed items for removing all states. Array of [ItemID, Quantity]
 * @default [1, 5], [2, 10]
 *
 * @help
 * The following are Plugin Commands you may use with events.
 *
 * Plugin Command:
 *   OpenHospital       Opens up the Hospital Scene from the field.
 */

/**
 * @namespace Hospital
 * @memberof YED
 */

var YED = YED || {};


