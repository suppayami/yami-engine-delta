//=============================================================================
// Yanfly Engine Plugins - Damage Extension - Armor Scaling
// YEP_X_ArmorScaling.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ArmorScaling = true;

var Yanfly = Yanfly || {};
Yanfly.ARS = Yanfly.ARS || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 (Requires YEP_DamageCore.js) Scale defensive
 * stats relative to a universal scale.
 * @author Yanfly Engine Plugins
 * 
 * @param ---Physical---
 * @default
 *
 * @param Positive Physical Rate
 * @desc This is the multiplier rate for physical attacks if the
 * calculated armor is a positive value.
 * @default value *= 100 / (100 + armor)
 *
 * @param Negative Physical Rate
 * @desc This is the multiplier rate for physical attacks if the
 * calculated armor is a negative value.
 * @default value *= 2 - (100 / (100 - armor))
 *
 * @param Physical Base Armor
 * @desc This is the physical base armor calculation.
 * @default target.def / 2
 *
 * @param ---Magical---
 * @default
 *
 * @param Positive Magical Rate
 * @desc This is the multiplier rate for magical attacks if the
 * calculated armor is a positive value.
 * @default value *= 100 / (100 + armor)
 *
 * @param Negative Magical Rate
 * @desc This is the multiplier rate for magical attacks if the
 * calculated armor is a negative value.
 * @default value *= 2 - (100 / (100 - armor))
 *
 * @param Magical Base Armor
 * @desc This is the magical base armor calculation.
 * @default target.mdf / 2
 *
 * @param ---Certain---
 * @default
 *
 * @param Positive Certain Rate
 * @desc This is the multiplier rate for certain attacks if the
 * calculated armor is a positive value.
 * @default value *= 100 / (100 + armor)
 *
 * @param Negative Certain Rate
 * @desc This is the multiplier rate for certain attacks if the
 * calculated armor is a negative value.
 * @default value *= 2 - (100 / (100 - armor))
 *
 * @param Certain Base Armor
 * @desc This is the certain hit base armor calculation.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_DamageCore.
 * Make sure this plugin is located under YEP_DamageCore in the plugin list.
 *
 * This plugin serves as a damage balancing plugin to make numbers across the
 * battlefield more universal for both actors and enemies alike and gets past
 * the flaws that ATK - DEF formulas have.
 *
 * ============================================================================
 * Armor Scaling
 * ============================================================================
 *
 * Armor Scaling allows the damage formula to be rid of "b.def * 2" and similar
 * calculations in favor of scaling the damage relative to the armor values
 * that the attack target has. The following is the armor scaling formula for
 * both positive and negative armor values:
 *
 *            Positive Armor                     Negative Armor
 *
 *                 100                                     100
 *     Rate = -------------                Rate = 2 - -------------
 *             100 + armor                             100 - armor
 *
 * To get an idea of how armor scaling will affect damage, you can visit
 * FlyingDream's Armor Scaling Calculator here:
 *
 *     http://yanfly.moe/tools/armorscalingcalculator/
 *
 * For quick reference, here's a table on how 1,000 base damage is affected.
 *
 * Armor Level   Rate%    Damage           Armor Level   Rate%    Damage
 *           1   99.01%   990                       -1   100.99%  1,010
 *           2   98.04%   980                       -2   101.96%  1,020
 *           3   97.09%   971                       -3   102.91%  1,029
 *           4   96.15%   962                       -4   103.85%  1,038
 *           5   95.24%   952                       -5   104.76%  1,048
 *           6   94.34%   943                       -6   105.66%  1,057
 *           7   93.46%   935                       -7   106.54%  1,065
 *           8   92.59%   926                       -8   107.41%  1,074
 *           9   91.74%   917                       -9   108.26%  1,083
 *          10   90.91%   909                      -10   109.09%  1,091
 *          25   80.00%   800                      -25   120.00%  1,200
 *          50   66.67%   667                      -50   133.33%  1,333
 *          75   57.14%   571                      -75   142.86%  1,429
 *         100   50.00%   500                     -100   150.00%  1,500
 *         150   40.00%   400                     -150   160.00%  1,600
 *         200   33.33%   333                     -200   166.67%  1,667
 *         250   28.57%   286                     -250   171.43%  1,714
 *         300   25.00%   250                     -300   175.00%  1,750
 *         350   22.22%   222                     -350   177.78%  1,778
 *         400   20.00%   200                     -400   180.00%  1,800
 *         450   18.18%   182                     -450   181.82%  1,818
 *         500   16.67%   167                     -500   183.33%  1,833
 *         550   15.38%   154                     -550   184.62%  1,846
 *         600   14.29%   143                     -600   185.71%  1,857
 *         650   13.33%   133                     -650   186.67%  1,867
 *         700   12.50%   125                     -700   187.50%  1,875
 *         750   11.76%   118                     -750   188.24%  1,882
 *         800   11.11%   111                     -800   188.89%  1,889
 *         850   10.53%   105                     -850   189.47%  1,895
 *         900   10.00%   100                     -900   190.00%  1,900
 *         950    9.52%    95                     -950   190.48%  1,905
 *         999    9.10%    91                     -999   190.90%  1,909
 *       9,999    0.99%    10                   -9,999   199.01%  1,990
 *      99,999    0.10%     1                  -99,999   199.90%  1,999
 *     999,999    0.01%     0                 -999,999   199.99%  2,000
 *   9,999,999    0.00%     0               -9,999,999   200.00%  2,000
 *
 * Using the default base armor formula of 2 defense points is equal to 1
 * armor, this means at 200 defense, a battler will take only 50% damage. At
 * 999 defense, the battler will take a little bit more than 16.67% damage.
 * At those values without armor scaling, damage can be entirely undone for
 * that very matter. This goes to show how effective armor scaling can be to
 * maintain long-term balancing.
 *
 * ============================================================================
 * Armor Reduction and Armor Penetration
 * ============================================================================
 *
 * There are various modifiers that can alter the armor level before the armor
 * scaling rate is applied to damage. Armor goes through four main steps and
 * they are as follows.
 *
 * 1. Armor Reduction, Flat
 * 2. Armor Reduction, Percentage
 * 3. Armor Penetration, Percentage
 * 4. Armor Penetration, Flat
 *
 * In step 1 (Armor Reduction, Flat), the target's armor is reduced by a value.
 * Flat armor reduction stacks additively. Flat armor reduction can reduce a
 * target's armor below zero. For example, if an enemy with 10 armor has their
 * armor reduced by 25, the enemy will have -15 armor. Armor reduction values
 * are provided by target and not the attacker.
 *
 * In step 2 (Armor Reduction, Percentage), the target's armor is multiplied by
 * a percentage (100% - the listed value). Percentage armor reduction stacks
 * multiplicatively and is ignored if the target's armor is 0 or less.
 * Percentage armor reduction makes a bigger difference on targets with higher
 * armor. For instance, with 40% armor reduction, a target with 200 armor will
 * lose 80 while a target with only 50 armor will lose 20. Armor reduction
 * values are provided by the target and not the attacker.
 *
 * In step 3 (Armor Penetration, Percentage), the target's armor is multiplied
 * by a percentage (100% - the listed value). Percentage armor penetration
 * stacks multiplicatively and is ignored if the target's armor is 0 or less.
 * Percentage armor penetration makes a bigger difference on targets with higher
 * armor. For instance, with 40% armor penetration, a target with 200 armor will
 * be considered as having 80 less while a target with only 50 armor will be
 * considered as having 20 less. Armor penetration values are provided by the
 * attacker and not the target.
 *
 * In step 4 (Armor Penetration, Flat), the target's armor is treated as being
 * reduced by an amount for purposes of damage calculation, but cannot be
 * reduced below 0. Flat armor penetration stacks additively. Armor penetration
 * values are provided by the attacker and not the target.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You may use these notetags to adjust various factors for armor scaling rates
 * and calculations.
 *
 * Skill and Item Notetags:
 *   <Armor Reduction: x>
 *   Causes the skill/item to reduce the target's armor level by x. This is
 *   calculated first above everything else.
 *
 *   <Armor Reduction: x%>
 *   Causes the skill/item to reduce the target's armor level by x%. This is
 *   calculated second but is ignored if the armor level is less than 0.
 *
 *   <Armor Penetration: x%>
 *   Causes the skill/item to reduce the target's armor level by x% (but will
 *   not go past 0). This is calculated third.
 *
 *   <Armor Penetration: x>
 *   Causes the skill/item to reduce the target's armor level by x (but will
 *   not go past 0). This is calculated last.
 *
 *   <Bypass Armor Scaling>
 *   This notetag allows you to bypass the armor scaling process for this
 *   individual skill/item.
 *
 * Actor, Class, Enemy, Weapon, Armor, State Notetags:
 *   <Physical Armor Reduction: x>
 *   Causes this actor to lose x armor when targeted by physical skills/items.
 *   This is calculated first.
 *
 *   <Magical Armor Reduction: x>
 *   Causes this actor to lose x armor when targeted by magical skills/items.
 *   This is calculated first.
 *
 *   <Certain Armor Reduction: x>
 *   Causes this actor to lose x armor when targeted by certain skills/items.
 *   This is calculated first.
 *
 *   <Physical Armor Reduction: x%>
 *   Causes this actor to lose x% armor when targeted by physical skills/items.
 *   This is calculated second.
 *
 *   <Magical Armor Reduction: x%>
 *   Causes this actor to lose x% armor when targeted by magical skills/items.
 *   This is calculated second.
 *
 *   <Certain Armor Reduction: x%>
 *   Causes this actor to lose x% armor when targeted by certain skills/items.
 *   This is calculated second.
 *
 *   <Physical Armor Penetration: x%>
 *   Causes this actor to cause the target to lose x% armor when using a
 *   physical skills/items. This is calculated third.
 *
 *   <Magical Armor Penetration: x%>
 *   Causes this actor to cause the target to lose x% armor when using a
 *   magical skills/items. This is calculated third.
 *
 *   <Certain Armor Penetration: x%>
 *   Causes this actor to cause the target to lose x% armor when using a
 *   physical skills/items. This is calculated third.
 *
 *   <Physical Armor Penetration: x>
 *   Causes this actor to cause the target to lose x armor but not drop below
 *   0 armor when using a physical skills/items. This is calculated last.
 *
 *   <Magical Armor Penetration: x>
 *   Causes this actor to cause the target to lose x armor but not drop below
 *   0 armor when using a magical skills/items. This is calculated last.
 *
 *   <Certain Armor Penetration: x>
 *   Causes this actor to cause the target to lose x armor but not drop below
 *   0 armor when using a certain skills/items. This is calculated last.
 *
 * ============================================================================
 * Lunatic Mode - Custom Armor Scaling
 * ============================================================================
 *
 * For those with some JavaScript experience, you can make use of Lunatic Mode
 * to calculate the way you want armor scaling done for particular skills and
 * items right within the notebox!
 *
 *   <Positive Armor Rate>
 *    value *= 100;
 *    value /= 100 + armor;
 *   </Positive Armor Rate>
 *   This enables you to set a custom positive armor calculation rate for the
 *   skill/item instead of using the default positive armor rate.
 *
 *   <Negative Armor Rate>
 *    value *= 2 - (100 / (100 - armor));
 *    value *= 1.5;
 *   </Negative Armor Rate>
 *   This enables you to set a custom negative armor calculation rate for the
 *   skill/item instead of using the default positive armor rate.
 *
 *   <Base Armor>
 *    armor = target.def;
 *    armor -= user.atk / 4;
 *   </Base Armor>
 *   This enables you to set a custom way for the skill/item to calculate the
 *   base armor value used for armor scaling.
 *
 * ============================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ============================================================================
 *
 * If you have YEP_BattleEngineCore.js installed with this plugin located
 * underneath it in the Plugin Manager, you can make use of these extra
 * armor scaling related action sequences.
 *
 *=============================================================================
 * ARMOR PENETRATION: X
 * ARMOR PENETRATION: X%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causes the skill to have a global armor pentration property of either x or
 * x% rate. This property is reset at the end of the action sequence.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: armor penetration: 20
 *                armor penetration: 30%
 *=============================================================================
 *
 *=============================================================================
 * ARMOR REDUCTION: X
 * ARMOR REDUCTION: X%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causes the skill to have a global armor reduction property of either x or
 * x% rate. This property is reset at the end of the action sequence.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: armor reduction: 20
 *                armor reduction: 30%
 *=============================================================================
 *
 *=============================================================================
 * RESET ARMOR PENETRATION
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Resets global set armor penetration properties.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: reset armor penetration
 *=============================================================================
 *
 *=============================================================================
 * RESET ARMOR REDUCTION
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Resets global set armor reduction properties.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: reset armor reduction
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.01:
 * - Fixed the notetag <Armor Reduction: x%> from not working with the intended
 * effect.
 * - Negative armor damage calculations are reworked to function as intended.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_DamageCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ArmorScaling');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ARSPPhysRate = String(Yanfly.Parameters['Positive Physical Rate']);
Yanfly.Param.ARSNPhysRate = String(Yanfly.Parameters['Negative Physical Rate']);
Yanfly.Param.ARSBPhysArmor = String(Yanfly.Parameters['Physical Base Armor']);
Yanfly.Param.ARSPMagRate = String(Yanfly.Parameters['Positive Magical Rate']);
Yanfly.Param.ARSNMagRate = String(Yanfly.Parameters['Negative Magical Rate']);
Yanfly.Param.ARSBMagArmor = String(Yanfly.Parameters['Magical Base Armor']);
Yanfly.Param.ARSPCerRate = String(Yanfly.Parameters['Positive Certain Rate']);
Yanfly.Param.ARSNCerRate = String(Yanfly.Parameters['Negative Certain Rate']);
Yanfly.Param.ARSBCerArmor = String(Yanfly.Parameters['Certain Base Armor']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.ARS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.ARS.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_ArmorScaling) {
  	this.processARSNotetags1($dataSkills);
    this.processARSNotetags1($dataItems);
  	this.processARSNotetags2($dataActors);
  	this.processARSNotetags2($dataClasses);
  	this.processARSNotetags2($dataEnemies);
  	this.processARSNotetags2($dataWeapons);
  	this.processARSNotetags2($dataArmors);
  	this.processARSNotetags2($dataStates);
    Yanfly._loaded_YEP_X_ArmorScaling = true;
  }
	return true;
};

DataManager.processARSNotetags1 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    var armorScaleMode = 0;
		if (obj.hitType === 1) {
			obj.positiveArmorScale = Yanfly.Param.ARSPPhysRate;
			obj.negativeArmorScale = Yanfly.Param.ARSNPhysRate;
			obj.baseArmorScale = Yanfly.Param.ARSBPhysArmor;
		} else if (obj.hitType === 2) {
			obj.positiveArmorScale = Yanfly.Param.ARSPMagRate;
			obj.negativeArmorScale = Yanfly.Param.ARSNMagRate;
			obj.baseArmorScale = Yanfly.Param.ARSBMagArmor;
		} else {
			obj.positiveArmorScale = Yanfly.Param.ARSPCerRate;
			obj.negativeArmorScale = Yanfly.Param.ARSNCerRate;
			obj.baseArmorScale = Yanfly.Param.ARSBCerArmor;
		}
		obj.armorReductionFlat = 0;
		obj.armorReductionRate = 0.0;
		obj.armorPenetrationFlat = 0;
		obj.armorPenetrationRate = 0.0;

    for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:POSITIVE ARMOR RATE)>/i)) {
				armorScaleMode = 1;
        obj.positiveArmorScale = '';
			} else if (line.match(/<\/(?:POSITIVE ARMOR RATE)>/i)) {
				armorScaleMode = 0;
			} else if (line.match(/<(?:NEGATIVE ARMOR RATE)>/i)) {
				armorScaleMode = -1;
        obj.negativeArmorScale = '';
			} else if (line.match(/<\/(?:NEGATIVE ARMOR RATE)>/i)) {
				armorScaleMode = 0;
			} else if (line.match(/<(?:BASE ARMOR)>/i)) {
				armorScaleMode = 2;
        obj.baseArmorScale = '';
			} else if (line.match(/<\/(?:BASE ARMOR)>/i)) {
				armorScaleMode = 0;
			} else if (line.match(/<(?:ARMOR REDUCTION):[ ](\d+)>/i)) {
				obj.armorReductionFlat = parseInt(RegExp.$1);
			} else if (line.match(/<(?:ARMOR REDUCTION):[ ](\d+)([%％])>/i)) {
				obj.armorReductionRate = parseFloat(RegExp.$1 * 0.01);
			} else if (line.match(/<(?:ARMOR PENETRATION):[ ](\d+)>/i)) {
				obj.armorPenetrationFlat = parseInt(RegExp.$1);
			} else if (line.match(/<(?:ARMOR PENETRATION):[ ](\d+)([%％])>/i)) {
				obj.armorPenetrationRate = parseFloat(RegExp.$1 * 0.01);
			} else if (line.match(/<(?:BYPASS ARMOR SCALING)>/i)) {
        obj.positiveArmorScale = '';
        obj.negativeArmorScale = '';
      } else if (armorScaleMode === 1) {
        obj.positiveArmorScale = obj.positiveArmorScale + line + '\n';
      } else if (armorScaleMode === -1) {
				obj.negativeArmorScale = obj.negativeArmorScale + line + '\n';
			} else if (armorScaleMode === 2) {
				obj.baseArmorScale = obj.baseArmorScale + line + '\n';
			}
		}
	}
};

DataManager.processARSNotetags2 = function(group) {
	var note01 = /<(?:PHYSICAL ARMOR REDUCTION):[ ](\d+)>/i;
	var note02 = /<(?:PHYSICAL ARMOR REDUCTION):[ ](\d+)([%％])>/i;
	var note03 = /<(?:PHYSICAL ARMOR PENETRATION):[ ](\d+)([%％])>/i;
	var note04 = /<(?:PHYSICAL ARMOR PENETRATION):[ ](\d+)>/i;
	var note05 = /<(?:MAGICAL ARMOR REDUCTION):[ ](\d+)>/i;
	var note06 = /<(?:MAGICAL ARMOR REDUCTION):[ ](\d+)([%％])>/i;
	var note07 = /<(?:MAGICAL ARMOR PENETRATION):[ ](\d+)([%％])>/i;
	var note08 = /<(?:MAGICAL ARMOR PENETRATION):[ ](\d+)>/i;
	var note09 = /<(?:CERTAIN ARMOR REDUCTION):[ ](\d+)>/i;
	var note10 = /<(?:CERTAIN ARMOR REDUCTION):[ ](\d+)([%％])>/i;
	var note11 = /<(?:CERTAIN ARMOR PENETRATION):[ ](\d+)([%％])>/i;
	var note12 = /<(?:CERTAIN ARMOR PENETRATION):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.physArmorRedFlat = 0;
		obj.physArmorRedRate = 0.0;
		obj.physArmorPenRate = 0.0;
		obj.physArmorPenFlat = 0;
		obj.magArmorRedFlat = 0;
		obj.magArmorRedRate = 0.0;
		obj.magArmorPenRate = 0.0;
		obj.magArmorPenFlat = 0;
		obj.cerArmorRedFlat = 0;
		obj.cerArmorRedRate = 0.0;
		obj.cerArmorPenRate = 0.0;
		obj.cerArmorPenFlat = 0;

    for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note01)) {
				obj.physArmorRedFlat = parseInt(RegExp.$1);
			} else if (line.match(note02)) {
				obj.physArmorRedRate = parseFloat(RegExp.$1 * 0.01);
			} else if (line.match(note03)) {
				obj.physArmorPenRate = parseFloat(RegExp.$1 * 0.01);
			} else if (line.match(note04)) {
				obj.physArmorPenFlat = parseInt(RegExp.$1);
			} else if (line.match(note05)) {
				obj.magArmorRedFlat = parseInt(RegExp.$1);
			} else if (line.match(note06)) {
				obj.magArmorRedRate = parseFloat(RegExp.$1 * 0.01);
			} else if (line.match(note07)) {
				obj.magArmorPenRate = parseFloat(RegExp.$1 * 0.01);
			} else if (line.match(note08)) {
				obj.magArmorPenFlat = parseInt(RegExp.$1);
			} else if (line.match(note09)) {
				obj.cerArmorRedFlat = parseInt(RegExp.$1);
			} else if (line.match(note10)) {
				obj.cerArmorRedRate = parseFloat(RegExp.$1 * 0.01);
			} else if (line.match(note11)) {
				obj.cerArmorPenRate = parseFloat(RegExp.$1 * 0.01);
			} else if (line.match(note12)) {
				obj.cerArmorPenFlat = parseInt(RegExp.$1);
			}
		}
	}
};

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_BattleEngineCore) {
Yanfly.ARS.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
  BattleManager.processActionSequence = function(actionName, actionArgs) {
		// ARMOR PENETRATION
    if (actionName === 'ARMOR PENETRATION') {
      return this.actionArmorPenetration(actionArgs);
    }
    // ARMOR REDUCTION
    if (actionName === 'ARMOR REDUCTION') {
      return this.actionArmorReduction(actionArgs);
    }
		// RESET ARMOR PENETRATION
    if (actionName === 'RESET ARMOR PENETRATION') {
      return this.actionResetArmorPenetration();
    }
		// RESET ARMOR REDUCTION
    if (actionName === 'RESET ARMOR REDUCTION') {
      return this.actionResetArmorReduction();
    }
    return Yanfly.ARS.BattleManager_processActionSequence.call(this,
      actionName, actionArgs);
  };
};

BattleManager.actionArmorPenetration = function(actionArgs) {
    if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var value = parseFloat(RegExp.$1 * 0.01);
			$gameSystem._armorPenRate = value;
		} else if (actionArgs[0].match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
    	$gameSystem._armorPenFlat = value;
    } else {
      return true;
    }
    return true;
};

BattleManager.actionArmorReduction = function(actionArgs) {
    if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var value = parseFloat(RegExp.$1 * 0.01);
			$gameSystem._armorRedRate = value;
		} else if (actionArgs[0].match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
    	$gameSystem._armorRedFlat = value;
    } else {
      return true;
    }
    return true;
};

BattleManager.actionResetArmorPenetration = function() {
		$gameSystem._armorPenRate = 0.0;
    $gameSystem._armorPenFlat = 0;
    return true;
};

BattleManager.actionResetArmorReduction = function() {
		$gameSystem._armorRedRate = 0.0;
    $gameSystem._armorRedFlat = 0;
    return true;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.ARS.Game_System_rDS = Game_System.prototype.resetDamageSettings;
Game_System.prototype.resetDamageSettings = function() {
    Yanfly.ARS.Game_System_rDS.call(this);
		this._armorRedFlat = 0;
		this._armorRedRate = 0.0;
		this._armorPenRate = 0.0;
		this._armorPenFlat = 0;
};

Game_System.prototype.armorReductionFlat = function() {
		if (this._armorRedFlat === undefined) this.resetDamageSettings();
		return this._armorRedFlat;
};

Game_System.prototype.armorReductionRate = function() {
		if (this._armorRedRate === undefined) this.resetDamageSettings();
		return this._armorRedRate;
};

Game_System.prototype.armorPenetrationRate = function() {
		if (this._armorPenRate === undefined) this.resetDamageSettings();
		return this._armorPenRate;
};

Game_System.prototype.armorPenetrationFlat = function() {
		if (this._armorPenFlat === undefined) this.resetDamageSettings();
		return this._armorPenFlat;
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.certainArmorReductionFlat = function() {
		var value = 0;
		if ($gameParty.inBattle()) value += $gameSystem.armorReductionFlat();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value += state.cerArmorRedFlat;
		}
		return value;
};

Game_Battler.prototype.physicalArmorReductionFlat = function() {
		var value = 0;
		if ($gameParty.inBattle()) value += $gameSystem.armorReductionFlat();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value += state.physArmorRedFlat;
		}
		return value;
};

Game_Battler.prototype.magicalArmorReductionFlat = function() {
		var value = 0;
		if ($gameParty.inBattle()) value += $gameSystem.armorReductionFlat();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value += state.magArmorRedFlat;
		}
		return value;
};

Game_Battler.prototype.certainArmorReductionRate = function() {
		var value = 1.0;
		if ($gameParty.inBattle()) value *= 1 - $gameSystem.armorReductionRate();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value *= 1.0 - state.cerArmorRedRate;
		}
		return value;
};

Game_Battler.prototype.physicalArmorReductionRate = function() {
		var value = 1.0;
		if ($gameParty.inBattle()) value *= 1 - $gameSystem.armorReductionRate();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value *= 1.0 - state.physArmorRedRate;
		}
		return value;
};

Game_Battler.prototype.magicalArmorReductionRate = function() {
		var value = 1.0;
		if ($gameParty.inBattle()) value *= 1 - $gameSystem.armorReductionRate();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value *= 1.0 - state.magArmorRedRate;
		}
		return value;
};

Game_Battler.prototype.certainArmorPenetrationRate = function() {
		var value = 1.0;
		if ($gameParty.inBattle()) value *= 1 - $gameSystem.armorPenetrationRate();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value *= 1.0 - state.cerArmorPenRate;
		}
		return value;
};

Game_Battler.prototype.physicalArmorPenetrationRate = function() {
		var value = 1.0;
		if ($gameParty.inBattle()) value *= 1 - $gameSystem.armorPenetrationRate();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value *= 1.0 - state.physArmorPenRate;
		}
		return value;
};

Game_Battler.prototype.magicalArmorPenetrationRate = function() {
		var value = 1.0;
		if ($gameParty.inBattle()) value *= 1 - $gameSystem.armorPenetrationRate();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value *= 1.0 - state.magArmorPenRate;
		}
		return value;
};

Game_Battler.prototype.certainArmorPenetrationFlat = function() {
		var value = 0;
		if ($gameParty.inBattle()) value += $gameSystem.armorPenetrationFlat();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value += state.cerArmorPenFlat;
		}
		return value;
};

Game_Battler.prototype.physicalArmorPenetrationFlat = function() {
		var value = 0;
		if ($gameParty.inBattle()) value += $gameSystem.armorPenetrationFlat();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value += state.physArmorPenFlat;
		}
		return value;
};

Game_Battler.prototype.magicalArmorPenetrationFlat = function() {
		var value = 0;
		if ($gameParty.inBattle()) value += $gameSystem.armorPenetrationFlat();
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state) value += state.magArmorPenFlat;
		}
		return value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.certainArmorReductionFlat = function() {
		var value = Game_Battler.prototype.certainArmorReductionFlat.call(this);
		value += this.actor().cerArmorRedFlat;
		value += this.currentClass().cerArmorRedFlat;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value += equip.cerArmorRedFlat;
		}
		return value;
};

Game_Actor.prototype.physicalArmorReductionFlat = function() {
		var value = Game_Battler.prototype.physicalArmorReductionFlat.call(this);
		value += this.actor().physArmorRedFlat;
		value += this.currentClass().physArmorRedFlat;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value += equip.physArmorRedFlat;
		}
		return value;
};

Game_Actor.prototype.magicalArmorReductionFlat = function() {
		var value = Game_Battler.prototype.magicalArmorReductionFlat.call(this);
		value += this.actor().magArmorRedFlat;
		value += this.currentClass().magArmorRedFlat;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value += equip.magArmorRedFlat;
		}
		return value;
};

Game_Actor.prototype.certainArmorReductionRate = function() {
		var value = Game_Battler.prototype.certainArmorReductionRate.call(this);
		value *= 1.0 - this.actor().cerArmorRedRate;
		value *= 1.0 - this.currentClass().cerArmorRedRate;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value *= 1.0 - equip.cerArmorRedRate;
		}
		return value;
};

Game_Actor.prototype.physicalArmorReductionRate = function() {
		var value = Game_Battler.prototype.physicalArmorReductionRate.call(this);
		value *= 1.0 - this.actor().physArmorRedRate;
		value *= 1.0 - this.currentClass().physArmorRedRate;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value *= 1.0 - equip.physArmorRedRate;
		}
		return value;
};

Game_Actor.prototype.magicalArmorReductionRate = function() {
		var value = Game_Battler.prototype.magicalArmorReductionRate.call(this);
		value *= 1.0 - this.actor().magArmorRedRate;
		value *= 1.0 - this.currentClass().magArmorRedRate;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value *= 1.0 - equip.magArmorRedRate;
		}
		return value;
};

Game_Actor.prototype.certainArmorPenetrationRate = function() {
		var value = Game_Battler.prototype.certainArmorPenetrationRate.call(this);
		value *= 1.0 - this.actor().cerArmorPenRate;
		value *= 1.0 - this.currentClass().cerArmorPenRate;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value *= 1.0 - equip.cerArmorPenRate;
		}
		return value;
};

Game_Actor.prototype.physicalArmorPenetrationRate = function() {
		var value = Game_Battler.prototype.physicalArmorPenetrationRate.call(this);
		value *= 1.0 - this.actor().physArmorPenRate;
		value *= 1.0 - this.currentClass().physArmorPenRate;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value *= 1.0 - equip.physArmorPenRate;
		}
		return value;
};

Game_Actor.prototype.magicalArmorPenetrationRate = function() {
		var value = Game_Battler.prototype.magicalArmorPenetrationRate.call(this);
		value *= 1.0 - this.actor().magArmorPenRate;
		value *= 1.0 - this.currentClass().magArmorPenRate;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value *= 1.0 - equip.magArmorPenRate;
		}
		return value;
};

Game_Actor.prototype.certainArmorPenetrationFlat = function() {
		var value = Game_Battler.prototype.certainArmorPenetrationFlat.call(this);
		value += this.actor().cerArmorPenFlat;
		value += this.currentClass().cerArmorPenFlat;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value += equip.cerArmorPenFlat;
		}
		return value;
};

Game_Actor.prototype.physicalArmorPenetrationFlat = function() {
		var value = Game_Battler.prototype.physicalArmorPenetrationFlat.call(this);
		value += this.actor().physArmorPenFlat;
		value += this.currentClass().physArmorPenFlat;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value += equip.physArmorPenFlat;
		}
		return value;
};

Game_Actor.prototype.magicalArmorPenetrationFlat = function() {
		var value = Game_Battler.prototype.magicalArmorPenetrationFlat.call(this);
		value += this.actor().magArmorPenFlat;
		value += this.currentClass().magArmorPenFlat;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip) value += equip.magArmorPenFlat;
		}
		return value;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.certainArmorReductionFlat = function() {
		var value = Game_Battler.prototype.certainArmorReductionFlat.call(this);
		value += this.enemy().cerArmorRedFlat;
		return value;
};

Game_Enemy.prototype.physicalArmorReductionFlat = function() {
		var value = Game_Battler.prototype.physicalArmorReductionFlat.call(this);
		value += this.enemy().physArmorRedFlat;
		return value;
};

Game_Enemy.prototype.magicalArmorReductionFlat = function() {
		var value = Game_Battler.prototype.magicalArmorReductionFlat.call(this);
		value += this.enemy().magArmorRedFlat;
		return value;
};

Game_Enemy.prototype.certainArmorReductionRate = function() {
		var value = Game_Battler.prototype.certainArmorReductionRate.call(this);
		value *= 1.0 - this.enemy().cerArmorRedRate;
		return value;
};

Game_Enemy.prototype.physicalArmorReductionRate = function() {
		var value = Game_Battler.prototype.physicalArmorReductionRate.call(this);
		value *= 1.0 - this.enemy().physArmorRedRate;
		return value;
};

Game_Enemy.prototype.magicalArmorReductionRate = function() {
		var value = Game_Battler.prototype.magicalArmorReductionRate.call(this);
		value *= 1.0 - this.enemy().magArmorRedRate;
		return value;
};

Game_Enemy.prototype.certainArmorPenetrationRate = function() {
		var value = Game_Battler.prototype.certainArmorPenetrationRate.call(this);
		value *= 1.0 - this.enemy().cerArmorPenRate;
		return value;
};

Game_Enemy.prototype.physicalArmorPenetrationRate = function() {
		var value = Game_Battler.prototype.physicalArmorPenetrationRate.call(this);
		value *= 1.0 - this.enemy().physArmorPenRate;
		return value;
};

Game_Enemy.prototype.magicalArmorPenetrationRate = function() {
		var value = Game_Battler.prototype.magicalArmorPenetrationRate.call(this);
		value *= 1.0 - this.enemy().magArmorPenRate;
		return value;
};

Game_Enemy.prototype.certainArmorPenetrationFlat = function() {
		var value = Game_Battler.prototype.certainArmorPenetrationFlat.call(this);
		value += this.enemy().cerArmorPenFlat;
		return value;
};

Game_Enemy.prototype.physicalArmorPenetrationFlat = function() {
		var value = Game_Battler.prototype.physicalArmorPenetrationFlat.call(this);
		value += this.enemy().physArmorPenFlat;
		return value;
};

Game_Enemy.prototype.magicalArmorPenetrationFlat = function() {
		var value = Game_Battler.prototype.magicalArmorPenetrationFlat.call(this);
		value += this.enemy().magArmorPenFlat;
		return value;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.ARS.Game_Action_applyDamageRate =
		Game_Action.prototype.applyDamageRate;
Game_Action.prototype.applyDamageRate = function(value, baseDamage, target) {
    value = this.scaleCertainArmor(value, baseDamage, target);
    return Yanfly.ARS.Game_Action_applyDamageRate.call(this, value,
			baseDamage, target);
};

Yanfly.ARS.Game_Action_applyPhysicalRate =
		Game_Action.prototype.applyPhysicalRate;
Game_Action.prototype.applyPhysicalRate = function(value, baseDamage, target) {
    value = this.scalePhysicalArmor(value, baseDamage, target);
    return Yanfly.ARS.Game_Action_applyPhysicalRate.call(this, value,
			baseDamage, target);
};

Yanfly.ARS.Game_Action_applyMagicalRate =
		Game_Action.prototype.applyMagicalRate;
Game_Action.prototype.applyMagicalRate = function(value, baseDamage, target) {
	value = this.scaleMagicalArmor(value, baseDamage, target);
	return Yanfly.ARS.Game_Action_applyMagicalRate.call(this, value,
		baseDamage, target);
};

Game_Action.prototype.scaleCertainArmor = function(value, baseDamage, target) {
		if (baseDamage <= 0) return value;
		if (!this.isCertainHit()) return value;
		var armor = this.getBaseArmor(value, baseDamage, target);
		armor = this.applyCertainArmorScale(armor, target);
		var item = this.item();
		var a = this.subject();
		var b = target;
		var user = this.subject();
		var subject = this.subject();
		var s = $gameSwitches._data;
		var v = $gameVariables._data;
		if (armor >= 0) {
			eval(item.positiveArmorScale);
		} else {
			eval(item.negativeArmorScale);
		}
		return value;
};

Game_Action.prototype.scalePhysicalArmor = function(value, baseDamage, target) {
		if (baseDamage <= 0) return value;
		var armor = this.getBaseArmor(value, baseDamage, target);
		armor = this.applyPhysicalArmorScale(armor, target);
		var item = this.item();
		var a = this.subject();
		var b = target;
		var user = this.subject();
		var subject = this.subject();
		var s = $gameSwitches._data;
		var v = $gameVariables._data;
		if (armor >= 0) {
			eval(item.positiveArmorScale);
		} else {
			eval(item.negativeArmorScale);
		}
		return value;
};

Game_Action.prototype.scaleMagicalArmor = function(value, baseDamage, target) {
		if (baseDamage <= 0) return value;
		var armor = this.getBaseArmor(value, baseDamage, target);
		armor = this.applyMagicalArmorScale(armor, target);
		var item = this.item();
		var a = this.subject();
		var b = target;
		var user = this.subject();
		var subject = this.subject();
		var s = $gameSwitches._data;
		var v = $gameVariables._data;
		if (armor >= 0) {
			eval(item.positiveArmorScale);
		} else {
			eval(item.negativeArmorScale);
		}
		return value;
};

Game_Action.prototype.getBaseArmor = function(value, baseDamage, target) {
		var armor = 0;
		var item = this.item();
		var a = this.subject();
		var b = target;
		var user = this.subject();
		var subject = this.subject();
		var s = $gameSwitches._data;
		var v = $gameVariables._data;
		armor = eval(item.baseArmorScale);
		return armor;
};

Game_Action.prototype.applyCertainArmorScale = function(armor, target) {
		armor -= this.item().armorReductionFlat;
		armor -= target.certainArmorReductionFlat();
		if (armor > 0) {
      armor *= 1 - this.item().armorReductionRate;
      armor *= target.certainArmorReductionRate();
      armor *= 1 - this.item().armorPenetrationRate;
			armor *= this.subject().certainArmorPenetrationRate();
      armor -= this.item().armorPenetrationFlat;
			armor -= Math.min(armor, this.subject().certainArmorPenetrationFlat());
		}
		return armor;
};

Game_Action.prototype.applyPhysicalArmorScale = function(armor, target) {
		armor -= this.item().armorReductionFlat;
		armor -= target.physicalArmorReductionFlat();
		if (armor > 0) {
      armor *= 1 - this.item().armorReductionRate;
      armor *= target.physicalArmorReductionRate();
      armor *= 1 - this.item().armorPenetrationRate;
			armor *= this.subject().physicalArmorPenetrationRate();
      armor -= this.item().armorPenetrationFlat;
			armor -= Math.min(armor, this.subject().physicalArmorPenetrationFlat());
		}
		return armor;
};

Game_Action.prototype.applyMagicalArmorScale = function(armor, target) {
		armor -= this.item().armorReductionFlat;
		armor -= target.magicalArmorReductionFlat();
		if (armor > 0) {
      armor *= 1 - this.item().armorReductionRate;
			armor *= target.magicalArmorReductionRate();
      armor *= 1 - this.item().armorPenetrationRate;
			armor *= this.subject().magicalArmorPenetrationRate();
      armor -= this.item().armorPenetrationFlat;
			armor -= Math.min(armor, this.subject().magicalArmorPenetrationFlat());
		}
		return armor;
};

//=============================================================================
// End of File
//=============================================================================
};
