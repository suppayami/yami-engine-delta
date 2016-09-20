//=============================================================================
// Yanfly Engine Plugins - Template
// YEP_SpecialParamFormula.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SpecialParamFormula = true;

var Yanfly = Yanfly || {};
Yanfly.SParam = Yanfly.SParam || {};

//=============================================================================
 /*:
 * @plugindesc v1.03 Control the formulas of special parameters for
 * TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @author Yanfly Engine Plugins
 *
 * @param ---SParam Formula---
 * @default
 *
 * @param TGR Formula
 * @desc The formula used to determine TGR: Target Rate
 * This is a formula.
 * @default (base + plus) * rate + flat
 *
 * @param GRD Formula
 * @desc The formula used to determine GRD: Guard Effect
 * This is a formula.
 * @default Math.max((base + plus) * rate + flat, 0.0000000001)
 *
 * @param REC Formula
 * @desc The formula used to determine REC: Recovery Rate
 * This is a formula.
 * @default (base + plus) * rate + flat
 *
 * @param PHA Formula
 * @desc The formula used to determine PHA: Pharmacology
 * This is a formula.
 * @default (base + plus) * rate + flat
 *
 * @param MCR Formula
 * @desc The formula used to determine MCR: MP Cost Rate
 * This is a formula.
 * @default (base + plus) * rate + flat
 *
 * @param TCR Formula
 * @desc The formula used to determine TCR: TP Charge Rate
 * This is a formula.
 * @default (base + plus) * rate + flat
 *
 * @param PDR Formula
 * @desc The formula used to determine PDR: Physical Damage%
 * This is a formula.
 * @default (base + plus) * rate + flat
 *
 * @param MDR Formula
 * @desc The formula used to determine MDR: Magical Damage%
 * This is a formula.
 * @default (base + plus) * rate + flat
 *
 * @param FDR Formula
 * @desc The formula used to determine FDR: Floor Damage%
 * This is a formula.
 * @default (base + plus) * rate + flat
 *
 * @param EXR Formula
 * @desc The formula used to determine EXR: Experience%
 * This is a formula.
 * @default (base + plus) * rate + flat
 *
 * @param ---Other Formula---
 * @default
 *
 * @param Guard Calculation
 * @desc The calculation used to determine the guard effect.
 * This is a formula.
 * @default damage / (damage > 0 && target.isGuard() ? 2 * target.grd : 1)
 *
 * @param Basic Floor Damage
 * @desc The basic floor damage calculation.
 * This is a formula.
 * @default 10
 *
 * @param Reserve EXP Rate
 * @desc The calculation used for reserve party member EXP
 * if enabled in Database > System. This is a formula.
 * @default 1
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The values for Special Parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR,
 * FDR, and EXR are lesser used and lesser known, but are only modified by
 * database object traits. This plugin enables you to utilize custom formulas
 * for these Special Parameters to alter them in such a way where MAT can alter
 * the MP Cost of skills and whatnot.
 *
 * ============================================================================
 * Instructions - Special Parameter Explanation
 * ============================================================================
 *
 * Special Parameters differ from Extra Parameters in the sense that their base
 * values are determined multiplicatively while Extra Parameters are determined
 * in an additive form. For those who aren't familiar with what the Special
 * Parameters (sparams) do, this is a list that will explain their standard
 * function in an RPG Maker MV project.
 *
 * ---
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * ---
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * ---
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * ---
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * ---
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * ---
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * ---
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * ---
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * ---
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * ---
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * ============================================================================
 * Instructions - Custom Formulas
 * ============================================================================
 *
 * The values calculated by the formulas in the plugin parameters are to come
 * out as float values. If the result value comes out as 0.1 for GRD, it will
 * be 10% GRD. Here is an example:
 *
 *   (base + plus) * rate + flat + user.def / 1000
 *
 * The 'user.def / 1000' is inserted at the end. Assuming everything else comes
 * out to be 10% and the user's DEF parameter is at 500, it will be 0.1 + 0.5
 * which means the total comes out to 0.6, hence a 60% GuaRD Effect.
 *
 * ============================================================================
 * Instructions - Understanding Formula Variables
 * ============================================================================
 *
 * So, what does the 'base', 'plus', 'rate', and 'flat' mean in the formulas?
 * This section will answer that in detail.
 *
 * Default plugin formula: (base + plus) * rate + flat
 *
 * BASE
 * - This value is determined by the default way RPG Maker MV determines the
 * value for that stat, and the way RPG Maker MV determines it for Special
 * Parameters (sparams) is by multiplying them all together with a base value
 * of 1. This means if you have multiple traits with 80%, 50%, and 120%, then
 * the multiplicative value of it comes out to 48%.
 *
 * PLUS
 * - This is a new variable added by this plugin. Its purpose is to function as
 * an addition to the base value. This addition can be done independently of
 * database items as you can do a user.addSParam to alter the base value of the
 * extra parameter. If using the default formula, this value is added to the
 * base before any rates are multiplied by it and any flats added to the total.
 *
 * RATE
 * - This is a new variable added by this plugin. Its purpose is to function as
 * a multiplicative modifier for the extra parameter value. This multiplicative
 * value is determined by various database objects through notetags. If using
 * the default formula, this value is multipled to the sum of the base and plus
 * values of the extra parameter before the flat is added to the total.
 *
 * FLAT
 * - This is a new variable added by this plugin. Its purpose is to function as
 * an additive modifier for the extra parameter value. This additive value is
 * determined by various database objects through notetags. If using the plugin
 * default formula, this value is added after the sum of the base and plus
 * values of the extra parameter stat are multiplied by the rate value.
 *
 * ============================================================================
 * Examples - Sample Formulas
 * ============================================================================
 *
 * The following are some sample formulas you can use to make the special
 * parameters a bit more dynamic:
 *
 * --- GRD ---
 * Math.max((base + plus) * rate + flat + (user.def / 1000), 0.0000000001)
 * - This will cause the GRD effect to gain more damage reduction from DEF.
 *
 * --- REC ---
 * (base + plus) * rate + flat + ((user.def + user.mdf) / 2000)
 * - This will increase the user's recovery rate from DEF and MDF.
 * 
 * --- MCR ---
 * (base + plus) * rate + flat - (user.mat / 3000)
 * - This will cause the MP cost to reduce from the user having more MAT.
 *
 * --- PDR ---
 * (base + plus) * rate + flat - (user.def / 4000)
 * - This will cause the user to take less physical damage by having more DEF.
 *
 * --- MDR ---
 * (base + plus) * rate + flat - (user.mdf / 4000)
 * - This will cause the user to take less magical damage by having more MDF.
 *
 * The above are some examples on how you can make your special parameters to
 * be affected by the other stats from the user.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to alter the various aspects that modify
 * the special parameter values:
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <stat Plus: +x%>
 *   <stat Plus: -x%>
 *   <stat Plus: +x.y>
 *   <stat Plus: -x.y>
 *   Replace 'stat' with 'tgr', 'grd', 'rec', 'pha', 'mcr', 'tcr', 'pdr',
 *   'mdr', 'fdr', or 'exr'. This is the value added to the base parameter
 *   before the rate and flat values contribute to the total parameter value
 *   assuming the plugin's default formula is utilized.
 *
 *   <stat Rate: x%>
 *   <stat Rate: x.y>
 *   Replace 'stat' with 'tgr', 'grd', 'rec', 'pha', 'mcr', 'tcr', 'pdr',
 *   'mdr', 'fdr', or 'exr'. This is the value multipled to the sum of the base
 *   and plus values of the parameter before added by the flat value assuming
 *   the plugin's default formula is utilized.
 *
 *   <stat Flat: +x%>
 *   <stat Flat: -x%>
 *   <stat Flat: +x.y>
 *   <stat Flat: -x.y>
 *   Replace 'stat' with 'tgr', 'grd', 'rec', 'pha', 'mcr', 'tcr', 'pdr',
 *   'mdr', 'fdr', or 'exr'. This is the value added finally to the sum of the
 *   base and plus values after being multiplied by the rate value assuming the
 *   plugin's default formula is utilized.
 *
 * ============================================================================
 * Lunatic Mode - New JavaScript Functions
 * ============================================================================
 *
 * You can use the following JavaScript functions to alter the special
 * parameter values of actors. In these listed functions, the 'actor' variable
 * is to be referenced by an actor: 
 *
 * ie. actor = $gameActors.actor(3);
 *
 * Function:
 *
 *   actor.clearSParamPlus()
 *   - Clears all of the actor's special parameter plus bonuses.
 *
 *   actor.setTgr(x)
 *   actor.setGrd(x)
 *   actor.setRec(x)
 *   actor.setPha(x)
 *   actor.setMcr(x)
 *   actor.setTcr(x)
 *   actor.setPdr(x)
 *   actor.setMdr(x)
 *   actor.setFdr(x)
 *   actor.setExr(x)
 *   - Sets the actor's respective special parameter value to x. Keep in mind
 *   that 1 is equal to 100% and 0.1 would be equal to 10%. Negative values
 *   will apply here, too.
 *
 *   actor.setTgrPlus(x)
 *   actor.setGrdPlus(x)
 *   actor.setRecPlus(x)
 *   actor.setPhaPlus(x)
 *   actor.setMcrPlus(x)
 *   actor.setTcrPlus(x)
 *   actor.setPdrPlus(x)
 *   actor.setMdrPlus(x)
 *   actor.setFdrPlus(x)
 *   actor.setExrPlus(x)
 *   - Sets the actor's respective special parameter plus value to x. Keep in
 *   mind that 1 is equal to 100% and 0.1 would be equal to 10%. Negative
 *   values will apply here, too.
 *
 *   actor.addTgr(x)
 *   actor.addGrd(x)
 *   actor.addRec(x)
 *   actor.addPha(x)
 *   actor.addMcr(x)
 *   actor.addTcr(x)
 *   actor.addPdr(x)
 *   actor.addMdr(x)
 *   actor.addFdr(x)
 *   actor.addExr(x)
 *   - Adds x to the actor's respective special parameter value. Keep in mind
 *   that 1 is equal to 100% and 0.1 would be equal to 10%. Negative values
 *   will decrease the special parameter.
 *
 *   actor.minusTgr(x)
 *   actor.minusGrd(x)
 *   actor.minusRec(x)
 *   actor.minusPha(x)
 *   actor.minusMcr(x)
 *   actor.minusTcr(x)
 *   actor.minusPdr(x)
 *   actor.minusMdr(x)
 *   actor.minusFdr(x)
 *   actor.minusExr(x)
 *   - Subtracts x from the actor's respective special parameter value. Keep in
 *   mind that 1 is equal to 100% and 0.1 would be equal to 10%. Negative
 *   values will add to the special parameter.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Fixed an issue with the battler.setSParam functions that made them take 
 * the wrong value due caching issues.
 *
 * Version 1.02:
 * - Fixed a bug that caused crashes when stepping over damage floors.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SpecialParamFormula');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SParamFormula = [];
Yanfly.Param.SParamFormula.push(String(Yanfly.Parameters['TGR Formula']));
Yanfly.Param.SParamFormula.push(String(Yanfly.Parameters['GRD Formula']));
Yanfly.Param.SParamFormula.push(String(Yanfly.Parameters['REC Formula']));
Yanfly.Param.SParamFormula.push(String(Yanfly.Parameters['PHA Formula']));
Yanfly.Param.SParamFormula.push(String(Yanfly.Parameters['MCR Formula']));
Yanfly.Param.SParamFormula.push(String(Yanfly.Parameters['TCR Formula']));
Yanfly.Param.SParamFormula.push(String(Yanfly.Parameters['PDR Formula']));
Yanfly.Param.SParamFormula.push(String(Yanfly.Parameters['MDR Formula']));
Yanfly.Param.SParamFormula.push(String(Yanfly.Parameters['FDR Formula']));
Yanfly.Param.SParamFormula.push(String(Yanfly.Parameters['EXR Formula']));

Yanfly.Param.SParamGrdCalc = String(Yanfly.Parameters['Guard Calculation']);
Yanfly.Param.SParamFloorDmg = String(Yanfly.Parameters['Basic Floor Damage']);
Yanfly.Param.SParamReserveExp = String(Yanfly.Parameters['Reserve EXP Rate']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.SParam.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.SParam.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_SpecialParamFormula) {
    this.processSParamNotetags($dataActors);
    this.processSParamNotetags($dataClasses);
    this.processSParamNotetags($dataEnemies);
    this.processSParamNotetags($dataWeapons);
    this.processSParamNotetags($dataArmors);
    this.processSParamNotetags($dataStates);
    Yanfly._loaded_YEP_SpecialParamFormula = true;
  }
  return true;
};

DataManager.processSParamNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.plusSParams = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    obj.rateSParams = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    obj.flatSParams = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(.*) PLUS:[ ]([\+\-]\d+)([%％])>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(RegExp.$2) * 0.01;
        var id = this.getSParamId(text);
        if (id !== null) obj.plusSParams[id] = rate;
      } else if (line.match(/<(.*) PLUS:[ ]([\+\-]\d+).(\d+)>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(String(RegExp.$2) + '.' + String(RegExp.$3));
        var id = this.getSParamId(text);
        if (id !== null) obj.plusSParams[id] = rate;
      } else if (line.match(/<(.*) RATE:[ ](\d+)([%％])>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(RegExp.$2) * 0.01;
        var id = this.getSParamId(text);
        if (id !== null) obj.rateSParams[id] = rate;
      } else if (line.match(/<(.*) RATE:[ ](\d+).(\d+)>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(String(RegExp.$2) + '.' + String(RegExp.$3));
        var id = this.getSParamId(text);
        if (id !== null) obj.rateSParams[id] = rate;
      } else if (line.match(/<(.*) FLAT:[ ]([\+\-]\d+)([%％])>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(RegExp.$2) * 0.01;
        var id = this.getSParamId(text);
        if (id !== null) obj.flatSParams[id] = rate;
      } else if (line.match(/<(.*) FLAT:[ ]([\+\-]\d+).(\d+)>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(String(RegExp.$2) + '.' + String(RegExp.$3));
        var id = this.getSParamId(text);
        if (id !== null) obj.flatSParams[id] = rate;
      }
    }
  }
};

DataManager.getSParamId = function(string) {
    if (['TGR', 'TARGET RATE'].contains(string)) {
      return 0;
    } else if (['GRD', 'GUARD EFFECT'].contains(string)) {
      return 1;
    } else if (['REC', 'RECOVERY', 'RECOVERY RATE'].contains(string)) {
      return 2;
    } else if (['PHA', 'PHARMACOLOGY', 'ITEM EFFECT'].contains(string)) {
      return 3;
    } else if (['MCR', 'MP COST', 'MP COST RATE'].contains(string)) {
      return 4;
    } else if (['TCR', 'TP COST', 'TP COST RATE'].contains(string)) {
      return 5;
    } else if (['PDR', 'PHYSICAL DAMAGE RATE'].contains(string)) {
      return 6;
    } else if (['MDR', 'MAGICAL DAMAGE RATE'].contains(string)) {
      return 7;
    } else if (['FDR', 'FLOOR DAMAGE RATE'].contains(string)) {
      return 8;
    } else if (['EXR', 'EXPERIENCE RATE', 'EXPERIENCE GAIN'].contains(string)) {
      return 9;
    } else {
      return null;
    }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.SParam.Game_BattlerBase_initMembers =
    Game_BattlerBase.prototype.initMembers; 
Game_BattlerBase.prototype.initMembers = function() {
    Yanfly.SParam.Game_BattlerBase_initMembers.call(this);
    this.clearSParamPlus();
};

Game_BattlerBase.prototype.clearSParamPlus = function(id) {
    this._sparamPlus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
};

Yanfly.SParam.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    this._sparam = undefined;
    Yanfly.SParam.Game_BattlerBase_refresh.call(this);
};

Yanfly.SParam.Game_BattlerBase_sparam = Game_BattlerBase.prototype.sparam;
Game_BattlerBase.prototype.sparam = function(id) {
    if (this._sparam && this._sparam[id] !== undefined) return this._sparam[id];
    if (this._sparam === undefined) this._sparam = {};
    var base = Yanfly.SParam.Game_BattlerBase_sparam.call(this, id);
    var plus = this.sparamPlus(id);
    var rate = this.sparamRate(id);
    var flat = this.sparamFlat(id);
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    this._sparam[id] = eval(Yanfly.Param.SParamFormula[id]);
    return this._sparam[id];
};

Game_BattlerBase.prototype.sparamPlus = function(id) {
    if (this._sparamPlus === undefined) this.clearSParamPlus();
    return this._sparamPlus[id];
};

Game_BattlerBase.prototype.sparamRate = function(id) {
    return 1;
};

Game_BattlerBase.prototype.sparamFlat = function(id) {
    return 0;
};

Game_BattlerBase.prototype.setSParam = function(id, value) {
    if (this._sparamPlus === undefined) this.clearSParamPlus();
    this._sparam = {};
    this._sparamPlus[id] = 0;
    this._sparamPlus[id] = value - this.sparam(id);
    this.refresh();
};

Game_BattlerBase.prototype.setTgr = function(value) {
    this.setSParam(0, value);
};

Game_BattlerBase.prototype.setGrd = function(value) {
    this.setSParam(1, value);
};

Game_BattlerBase.prototype.setRec = function(value) {
    this.setSParam(2, value);
};

Game_BattlerBase.prototype.setPha = function(value) {
    this.setSParam(3, value);
};

Game_BattlerBase.prototype.setMcr = function(value) {
    this.setSParam(4, value);
};

Game_BattlerBase.prototype.setTcr = function(value) {
    this.setSParam(5, value);
};

Game_BattlerBase.prototype.setPdr = function(value) {
    this.setSParam(6, value);
};

Game_BattlerBase.prototype.setMdr = function(value) {
    this.setSParam(7, value);
};

Game_BattlerBase.prototype.setFdr = function(value) {
    this.setSParam(8, value);
};

Game_BattlerBase.prototype.setExr = function(value) {
    this.setSParam(9, value);
};

Game_BattlerBase.prototype.setSParamPlus = function(id, value) {
    if (this._sparamPlus === undefined) this.clearSParamPlus();
    this._sparamPlus[id] = value;
    this.refresh();
};

Game_BattlerBase.prototype.setTgrPlus = function(value) {
    this.setSParamPlus(0, value);
};

Game_BattlerBase.prototype.setGrdPlus = function(value) {
    this.setSParamPlus(1, value);
};

Game_BattlerBase.prototype.setRecPlus = function(value) {
    this.setSParamPlus(2, value);
};

Game_BattlerBase.prototype.setPhaPlus = function(value) {
    this.setSParamPlus(3, value);
};

Game_BattlerBase.prototype.setMcrPlus = function(value) {
    this.setSParamPlus(4, value);
};

Game_BattlerBase.prototype.setTcrPlus = function(value) {
    this.setSParamPlus(5, value);
};

Game_BattlerBase.prototype.setPdrPlus = function(value) {
    this.setSParamPlus(6, value);
};

Game_BattlerBase.prototype.setMdrPlus = function(value) {
    this.setSParamPlus(7, value);
};

Game_BattlerBase.prototype.setFdrPlus = function(value) {
    this.setSParamPlus(8, value);
};

Game_BattlerBase.prototype.setExrPlus = function(value) {
    this.setSParamPlus(9, value);
};

Game_BattlerBase.prototype.addSParam = function(id, value) {
    if (this._sparamPlus === undefined) this.clearSParamPlus();
    this._sparamPlus[id] += value;
    this.refresh();
};

Game_BattlerBase.prototype.addTgr = function(value) {
    this.addSParam(0, value);
};

Game_BattlerBase.prototype.addGrd = function(value) {
    this.addSParam(1, value);
};

Game_BattlerBase.prototype.addRec = function(value) {
    this.addSParam(2, value);
};

Game_BattlerBase.prototype.addPha = function(value) {
    this.addSParam(3, value);
};

Game_BattlerBase.prototype.addMcr = function(value) {
    this.addSParam(4, value);
};

Game_BattlerBase.prototype.addTcr = function(value) {
    this.addSParam(5, value);
};

Game_BattlerBase.prototype.addPdr = function(value) {
    this.addSParam(6, value);
};

Game_BattlerBase.prototype.addMdr = function(value) {
    this.addSParam(7, value);
};

Game_BattlerBase.prototype.addFdr = function(value) {
    this.addSParam(8, value);
};

Game_BattlerBase.prototype.addExr = function(value) {
    this.addSParam(9, value);
};

Game_BattlerBase.prototype.minusTgr = function(value) {
    this.addSParam(0, -value);
};

Game_BattlerBase.prototype.minusGrd = function(value) {
    this.addSParam(1, -value);
};

Game_BattlerBase.prototype.minusRec = function(value) {
    this.addSParam(2, -value);
};

Game_BattlerBase.prototype.minusPha = function(value) {
    this.addSParam(3, -value);
};

Game_BattlerBase.prototype.minusMcr = function(value) {
    this.addSParam(4, -value);
};

Game_BattlerBase.prototype.minusTcr = function(value) {
    this.addSParam(5, -value);
};

Game_BattlerBase.prototype.minusPdr = function(value) {
    this.addSParam(6, -value);
};

Game_BattlerBase.prototype.minusMdr = function(value) {
    this.addSParam(7, -value);
};

Game_BattlerBase.prototype.minusFdr = function(value) {
    this.addSParam(8, -value);
};

Game_BattlerBase.prototype.minusExr = function(value) {
    this.addSParam(9, -value);
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.sparamPlus = function(id) {
    var value = Game_BattlerBase.prototype.sparamPlus.call(this, id);
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.plusSParams) value += obj.plusSParams[id];
    }
    return value;
};

Game_Battler.prototype.sparamRate = function(id) {
    var value = Game_BattlerBase.prototype.sparamRate.call(this, id);
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.rateSParams) value *= obj.rateSParams[id];
    }
    return value;
};

Game_Battler.prototype.sparamFlat = function(id) {
    var value = Game_BattlerBase.prototype.sparamFlat.call(this, id);
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.flatSParams) value += obj.flatSParams[id];
    }
    return value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.SParam.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.SParam.Game_Actor_setup.call(this, actorId);
    this.clearSParamPlus();
};

Game_Actor.prototype.sparamPlus = function(id) {
    var value = Game_Battler.prototype.sparamPlus.call(this, id);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.plusSParams) value += obj.plusSParams[id];
    }
    value += this.actor().plusSParams[id];
    value += this.currentClass().plusSParams[id];
    return value;
};

Game_Actor.prototype.sparamRate = function(id) {
    var value = Game_Battler.prototype.sparamRate.call(this, id);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.rateSParams) value *= obj.rateSParams[id];
    }
    value *= this.actor().rateSParams[id];
    value *= this.currentClass().rateSParams[id];
    return value;
};

Game_Actor.prototype.sparamFlat = function(id) {
    var value = Game_Battler.prototype.sparamFlat.call(this, id);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.flatSParams) value += obj.flatSParams[id];
    }
    value += this.actor().flatSParams[id];
    value += this.currentClass().flatSParams[id];
    return value;
};

Game_Actor.prototype.basicFloorDamage = function() {
    var value = 0;
    var a = this;
    var user = this;
    var subject = this;
    var b = this;
    var target = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    value = eval(Yanfly.Param.SParamFloorDmg);
    return value;
};

Game_Actor.prototype.benchMembersExpRate = function() {
    if (!$dataSystem.optExtraExp) return 0;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var rate = eval(Yanfly.Param.SParamReserveExp);
    return rate;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.sparamPlus = function(id) {
    var value = Game_Battler.prototype.sparamPlus.call(this, id);
    value += this.enemy().plusSParams[id];
    return value;
};

Game_Enemy.prototype.sparamRate = function(id) {
    var value = Game_Battler.prototype.sparamRate.call(this, id);
    value *= this.enemy().rateSParams[id];
    return value;
};

Game_Enemy.prototype.sparamFlat = function(id) {
    var value = Game_Battler.prototype.sparamFlat.call(this, id);
    value += this.enemy().flatSParams[id];
    return value;
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.applyGuard = function(damage, target) {
    var item = this.item();
    var skill = this.item()
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    return eval(Yanfly.Param.SParamGrdCalc);
};

//=============================================================================
// End of File
//=============================================================================
