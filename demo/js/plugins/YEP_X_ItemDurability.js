//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Item Durability
// YEP_X_ItemDurability.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemDurability = true;

var Yanfly = Yanfly || {};
Yanfly.IDur = Yanfly.IDur || {};

//=============================================================================
 /*:
 * @plugindesc v1.01a (Requires YEP_ItemCore.js) Independent equipment
 * now have durability, which when runs out, will break.
 * @author Yanfly Engine Plugins
 *
 * @param ---Defaults---
 * @default
 *
 * @param Default Durability
 * @desc This is the default durability value for independent
 * equipment when made. Set to -1 to bypass durability.
 * @default 100
 *
 * @param Durability Variance
 * @desc The random variance value for durability.
 * @default 5
 *
 * @param Durability Maximum
 * @desc Default maximum value for durability.
 * @default 200
 *
 * @param ---Durability Drop---
 * @default
 *
 * @param Physical Action
 * @desc When performing physical actions, drop all equipped weapons
 * durability by this much.
 * @default -1
 *
 * @param Magical Action
 * @desc When performing magical actions, drop all equipped weapons
 * durability by this much.
 * @default 0
 *
 * @param Certain Action
 * @desc When performing certain hit actions, drop all equipped weapons
 * durability by this much.
 * @default 0
 *
 * @param Damage All Armor
 * @desc When receiving damage, damage all armors or 1 random?
 * RANDOM - false     ALL - true
 * @default false
 *
 * @param Physical Damage
 * @desc When performing physical actions, drop all equipped weapons
 * durability by this much.
 * @default -2
 *
 * @param Magical Damage
 * @desc When performing magical actions, drop all equipped weapons
 * durability by this much.
 * @default -1
 *
 * @param Certain Damage
 * @desc When performing certain hit actions, drop all equipped weapons
 * durability by this much.
 * @default -1
 *
 * @param ---Breaking---
 * @default
 *
 * @param Broken Text
 * @desc The text shown when an item breaks mid-battle.
 * %1 - User's name     %2 - Item Name     %3 - Item Icon
 * @default %1's %3%2 broke!
 *
 * @param Broken Wait
 * @desc If using the Battle Engine Core, this is how many frames
 * the message will wait.
 * @default 60
 *
 * @param Break Sound
 * @desc This is the default break sound filename.
 * This is case-sensitive. Do not include file extension.
 * @default Crash
 *
 * @param Break Volume
 * @desc This is the default break sound volume.
 * @default 100
 *
 * @param Break Pitch
 * @desc This is the default break sound pitch.
 * @default 150
 *
 * @param Break Pan
 * @desc This is the default break sound pan.
 * @default 0
 *
 * @param ---Repair---
 * @default
 *
 * @param Show Repair
 * @desc Show the repair equipment option when selecting equips?
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Repair
 * @desc Enable the repair equipment option when selecting equips?
 * NO - false     YES - true
 * @default true
 *
 * @param Repair Command
 * @desc Command text for repairing eslected equipment.
 * %1 - Equipment Name
 * @default Repair %1
 *
 * @param Repair Sound
 * @desc This is the default repair sound filename.
 * This is case-sensitive. Do not include file extension.
 * @default Skill2
 *
 * @param Repair Volume
 * @desc This is the default repair sound volume.
 * @default 100
 *
 * @param Repair Pitch
 * @desc This is the default repair sound pitch.
 * @default 150
 *
 * @param Repair Pan
 * @desc This is the default repair sound pan.
 * @default 0
 *
 * @param ---Window Info---
 * @default
 *
 * @param Show Durability
 * @desc Show durability values for equipment?
 * NO - false     YES - true
 * @default true
 *
 * @param Durability Text
 * @desc Text used to display durability:
 * @default Durability
 *
 * @param Durability Format
 * @desc The format in displaying the durability value.
 * %1 - Current Durability     %2 - Maximum Durability
 * @default %1
 *
 * @param Show Unbreakable
 * @desc Show the durability value if item is unbreakable?
 * NO - false     YES - true
 * @default true
 *
 * @param Unbreakable Text
 * @desc The text used to indicate an item is unbreakable.
 * @default Unbreakable
 *
 * @param ---Durability Color---
 * @default
 *
 * @param Unbreakable
 * @desc Text color used for unbreakable items.
 * @default 23
 *
 * @param Max Durability
 * @desc Text color when durability is equal to its max.
 * @default 29
 *
 * @param 190% Durability
 * @desc Text color when durability is above 190% default.
 * @default 29
 *
 * @param 175% Durability
 * @desc Text color when durability is above 175% default.
 * @default 24
 *
 * @param 150% Durability
 * @desc Text color when durability is above 150% default.
 * @default 24
 *
 * @param 120% Durability
 * @desc Text color when durability is above 120% default.
 * @default 4
 *
 * @param 110% Durability
 * @desc Text color when durability is above 110% default.
 * @default 0
 *
 * @param 100% Durability
 * @desc Text color when durability is above 100% default.
 * @default 0
 *
 * @param 80% Durability
 * @desc Text color when durability is above 80% default.
 * @default 0
 *
 * @param 50% Durability
 * @desc Text color when durability is above 80% default.
 * @default 6
 *
 * @param 25% Durability
 * @desc Text color when durability is above 25% default.
 * @default 17
 *
 * @param 10% Durability
 * @desc Text color when durability is above 10% default.
 * @default 2
 *
 * @param 1% Durability
 * @desc Text color when durability is above 1% default.
 * @default 18
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_ItemCore.
 * Make sure this plugin is located under YEP_ItemCore in the plugin list.
 *
 * Independent Weapons and Armors will now have a Durability value. Over the
 * course of battle, equipment durability will drop based on actions performed,
 * damage taken, and the like. When a piece of equipment's durability value
 * reaches 0, the piece of equipment will break. Durability can be repaired by
 * items and increased by skills, too.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following notetags can be used to adjust item durability for equipment.
 *
 * Weapon and Armor Notetags:
 * 
 *   <Durability: x>
 *   This sets the item's default durability value to x. This is the starting
 *   durability value for the item. If this notetag isn't used, the independent
 *   equipment will refer to the value in the plugin parameters.
 *
 *   <Durability Variance: x>
 *   This alters the starting durability value with a variance of x. This means
 *   there can be a variance of -x to +x for the durability starting value.
 *
 *   <Durability Maximum: x>
 *   This is the maximum durability value the independent equipment can have.
 *   When repairing durability, the item's durability value cannot exceed this
 *   amount. This amount is dependent on the base item's durability value.
 *
 *   <Bypass Durability>
 *   <Unbreakable>
 *   This sets the item to not have bypass the durability system and making the
 *   independent item unbreakable.
 *
 *   <Break Sound Name: filename>
 *   <Break Sound Volume: x>
 *   <Break Sound Pitch: x>
 *   <Break Sound Pan: +x>
 *   <Break Sound Pan: -x>
 *   This changes the sound effect played when using this piece of equipment is
 *   broken in battle. Filenames are case sensitive and do not include the file
 *   extension into the filename.
 *
 * Item, Weapon, Armor Notetags:
 *
 *   <Repair Durability: x>
 *   This will repair any weapon or armor's durability by x. The repair effect
 *   is accessed from the weapon or armor's action menu.
 *
 *   <Repair Weapon: x>
 *   <Repair Armor: x>
 *   This will specifically repair only weapons or armors by x amount. The
 *   repair effect is accessed from the weapon or armor's action menu.
 *
 *   <Repair WType x: y>
 *   <Repair AType x: y>
 *   This will specifically repair only weapon-type x or armor-type x by y
 *   amount. The repair is accessed from the weapon or armor's action menu.
 *
 *   <Repair Sound Name: filename>
 *   <Repair Sound Volume: x>
 *   <Repair Sound Pitch: x>
 *   <Repair Sound Pan: +x>
 *   <Repair Sound Pan: -x>
 *   This changes the sound effect played when using this item to repair the
 *   durability of another item.
 *
 *   <Unbreakable Durability>
 *   Removes the equipment's durability and makes it unbreakable.
 *
 *   <Unbreakable Weapon>
 *   <Unbreakable Armor>
 *   Removes the weapon or armor's durability and makes it unbreakable.
 *
 *   <Unbreakable WType x>
 *   <Unbreakable AType x>
 *   Removes durability for specifically weapon-type x or armor-type x and
 *   makes it unbreakable. Filenames are case sensitive and do not include the
 *   file extension into the filename.
 *
 * Skill and Item Notetags:
 *
 *   <User Weapon Durability: +x>
 *   <User Weapon Durability: -x>
 *   Each hit of this skill/item will cause all of the user's weapon(s)
 *   durability to be altered by +x or -x. If it reaches 0 or lower, the weapon
 *   will break.
 *
 *   <User All Weapon Durability: +x>
 *   <User All Weapon Durability: -x>
 *   Each hit of this skill/item will cause all of the user's weapon(s)
 *   durability to be altered by +x or -x. If it reaches 0 or lower, the weapon
 *   will break.
 *
 *   <User Random Weapon Durability: +x>
 *   <User Random Weapon Durability: -x>
 *   Each hit of this skill/item will cause a random weapon equipped by the
 *   user to have its durability altered by +x or -x. If it reaches 0 or lower,
 *   the weapon will break.
 *
 *   <User Armor Durability: +x>
 *   <User Armor Durability: -x>
 *   Each hit of this skill/item will cause the user's armor(s) durability to
 *   be altered by +x or -x. Depending on the 'Damage All' plugin parameter,
 *   this will affect either all armors or affect a random armor piece. If the
 *   item reaches 0 or lower, the armor will break.
 *
 *   <User All Armor Durability: +x>
 *   <User All Armor Durability: -x>
 *   Each hit of this skill/item will cause all of the user's armor(s)
 *   durability to be altered by +x or -x. If it reaches 0 or lower, the armor
 *   will break.
 *
 *   <User Random Armor Durability: +x>
 *   <User Random Armor Durability: -x>
 *   Each hit of this skill/item will cause a random armor equipped by the
 *   user to have its durability altered by +x or -x. If it reaches 0 or lower,
 *   the armor will break.
 *
 *   <Target Weapon Durability: +x>
 *   <Target Weapon Durability: -x>
 *   Each hit of this skill/item will cause all of the target's weapon(s)
 *   durability to be altered by +x or -x. If it reaches 0 or lower, the weapon
 *   will break.
 *
 *   <Target All Weapon Durability: +x>
 *   <Target All Weapon Durability: -x>
 *   Each hit of this skill/item will cause all of the target's weapon(s)
 *   durability to be altered by +x or -x. If it reaches 0 or lower, the weapon
 *   will break.
 *
 *   <Target Random Weapon Durability: +x>
 *   <Target Random Weapon Durability: -x>
 *   Each hit of this skill/item will cause a random weapon equipped by the
 *   target to have its durability altered by +x or -x. If it reaches 0 or
 *   lower, the weapon will break.
 *
 *   <Target Armor Durability: +x>
 *   <Target Armor Durability: -x>
 *   Each hit of this skill/item will cause the target's armor(s) durability to
 *   be altered by +x or -x. Depending on the 'Damage All' plugin parameter,
 *   this will affect either all armors or affect a random armor piece. If the
 *   item reaches 0 or lower, the armor will break.
 *
 *   <Target All Armor Durability: +x>
 *   <Target All Armor Durability: -x>
 *   Each hit of this skill/item will cause all of the target's armor(s)
 *   durability to be altered by +x or -x. If it reaches 0 or lower, the armor
 *   will break.
 *
 *   <Target Random Armor Durability: +x>
 *   <Target Random Armor Durability: -x>
 *   Each hit of this skill/item will cause a random armor equipped by the
 *   target to have its durability altered by +x or -x. If it reaches 0 or
 *   lower, the armor will break.
 *
 * ============================================================================
 * Lunatic Mode - Custom Break Effect
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use this notetag to have your
 * weapons and/or armors produce special effects when they break.
 *
 * Weapon and Armor Notetags:
 *
 *   <Custom Break Effect>
 *    var newItem = $dataitems[1];
 *    $gameParty.gainItem(newItem, 1);
 *   </Custom Break Effect>
 *   This effect will only occur if the item breaks as a result of durability
 *   reaching 0 or lower from an action.
 *
 * ============================================================================
 * Lunatic Mode - Custom Repair Effect
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use this notetag to have your
 * repair item perform a custom effect when it is used to repair a piece of
 * equipment.
 *
 * Item, Weapon, and Armor Notetags:
 *
 *   <Custom Repair Effect>
 *    item.price += 200;
 *   </Custom Repair Effect>
 *   The 'item' variable refers to the item being repaired. Any changes made to
 *   it will be saved for the independent item.
 *
 * ============================================================================
 * Lunatic Mode - Custom Weapon/Armor Durability Modifiers
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use these notetags to have
 * your skill and item actions alter the target's equipment durability.
 *
 * Skill and Item Notetags:
 *
 *   ---
 *
 *   <Custom User All Weapon Durability>
 *    value -= user.atk;
 *   </Custom User All Weapon Durability>
 *
 *   <Custom User Random Weapon Durability>
 *    value -= user.atk;
 *   </Custom User Random Weapon Durability>
 *
 *   <Custom User All Armor Durability>
 *    value -= user.atk;
 *   </Custom User All Armor Durability>
 *
 *   <Custom User Random Armor Durability>
 *    value -= user.atk;
 *   </Custom User Random Armor Durability>
 *   The 'value' variable determines how to affect the user's weapon/armor. If
 *   'value' is negative, durability will drop. If 'value' is positive, then
 *   durability will increase. If the user's equipment reaches 0 or lower,
 *   the equipment will break.
 *
 *   ---
 *
 *   <Custom Target All Weapon Durability>
 *    value -= user.atk;
 *   </Custom Target All Weapon Durability>
 *
 *   <Custom Target Random Weapon Durability>
 *    value -= user.atk;
 *   </Custom Target Random Weapon Durability>
 *
 *   <Custom Target All Armor Durability>
 *    value -= user.atk;
 *   </Custom Target All Armor Durability>
 *
 *   <Custom Target Random Armor Durability>
 *    value -= user.atk;
 *   </Custom Target Random Armor Durability>
 *   The 'value' variable determines how to affect the target's weapon/armor.
 *   If 'value' is negative, durability will drop. If 'value' is positive, then
 *   durability will increase. If the target's equipment reaches 0 or lower,
 *   the equipment will break.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * There are a few plugin commands you can utilize to show/hide the Repair
 * option in the Item Action Window and/or enable/disable it.
 *
 * Plugin Commands
 *
 *   ShowRepairDurability
 *   HideRepairDurability
 *   - This will show/hide the Repair command in the Item Action Window.
 *
 *   EnableRepairDurability
 *   DisableRepairDurability
 *   - This will enable/disable the Repair command in the Item Action Window.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01a:
 * - Updated for RPG Maker MV version 1.1.0.
 * - Optimization update.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_ItemCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ItemDurability');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IDurDefaultDur = Number(Yanfly.Parameters['Default Durability']);
Yanfly.Param.IDurDefaultVar = Number(Yanfly.Parameters['Durability Variance']);
Yanfly.Param.IDurDefaultMax = Number(Yanfly.Parameters['Durability Maximum']);
Yanfly.Param.IDurDefaultMax = Math.max(1, Yanfly.Param.IDurDefaultMax);

Yanfly.Param.IDurPhysicalAction = Number(Yanfly.Parameters['Physical Action']);
Yanfly.Param.IDurMagicalAction = Number(Yanfly.Parameters['Magical Action']);
Yanfly.Param.IDurCertainAction = Number(Yanfly.Parameters['Certain Action']);
Yanfly.Param.IDurDamageAllArmor = String(Yanfly.Parameters['Damage All Armor']);
Yanfly.Param.IDurDamageAllArmor = eval(Yanfly.Param.IDurDamageAllArmor);
Yanfly.Param.IDurPhysicalDmg = Number(Yanfly.Parameters['Physical Damage']);
Yanfly.Param.IDurMagicalDmg = Number(Yanfly.Parameters['Magical Damage']);
Yanfly.Param.IDurCertainDmg = Number(Yanfly.Parameters['Certain Damage']);

Yanfly.Param.IDurBrokenText = String(Yanfly.Parameters['Broken Text']);
Yanfly.Param.IDurBrokenWait = Number(Yanfly.Parameters['Broken Wait']);
Yanfly.Param.IDurBreakName = String(Yanfly.Parameters['Break Sound']);
Yanfly.Param.IDurBreakVol = Number(Yanfly.Parameters['Break Volume']);
Yanfly.Param.IDurBreakPitch = Number(Yanfly.Parameters['Break Pitch']);
Yanfly.Param.IDurBreakPan = Number(Yanfly.Parameters['Break Pan']);

Yanfly.Param.IDurShowRepair = eval(String(Yanfly.Parameters['Show Repair']));
Yanfly.Param.IDurEnRepair = eval(String(Yanfly.Parameters['Enable Repair']));
Yanfly.Param.IDurCmdRepair = String(Yanfly.Parameters['Repair Command']);
Yanfly.Param.IDurRepairName = String(Yanfly.Parameters['Repair Sound']);
Yanfly.Param.IDurRepairVol = Number(Yanfly.Parameters['Repair Volume']);
Yanfly.Param.IDurRepairPitch = Number(Yanfly.Parameters['Repair Pitch']);
Yanfly.Param.IDurRepairPan = Number(Yanfly.Parameters['Repair Pan']);

Yanfly.Param.IDurShowDur = eval(String(Yanfly.Parameters['Show Durability']));
Yanfly.Param.IDurText = String(Yanfly.Parameters['Durability Text']);
Yanfly.Param.IDurFmt = String(Yanfly.Parameters['Durability Format']);
Yanfly.Param.IDurShowUnbr = eval(String(Yanfly.Parameters['Show Unbreakable']));
Yanfly.Param.IDurUnbreakable = String(Yanfly.Parameters['Unbreakable Text']);

Yanfly.Param.IDurColor = {
  unbreak: Number(Yanfly.Parameters['Unbreakable']),
      max: Number(Yanfly.Parameters['Max Durability']),
  rate190: Number(Yanfly.Parameters['190% Durability']),
  rate175: Number(Yanfly.Parameters['175% Durability']),
  rate150: Number(Yanfly.Parameters['150% Durability']),
  rate120: Number(Yanfly.Parameters['120% Durability']),
  rate110: Number(Yanfly.Parameters['110% Durability']),
  rate100: Number(Yanfly.Parameters['100% Durability']),
   rate80: Number(Yanfly.Parameters['80% Durability']),
   rate50: Number(Yanfly.Parameters['50% Durability']),
   rate25: Number(Yanfly.Parameters['25% Durability']),
   rate10: Number(Yanfly.Parameters['10% Durability']),
    rate1: Number(Yanfly.Parameters['1% Durability']),
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.IDur.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.IDur.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_ItemDurability) {
    this.processIDurNotetags1($dataWeapons);
    this.processIDurNotetags1($dataArmors);
    this.processIDurNotetags2($dataItems);
    this.processIDurNotetags2($dataWeapons);
    this.processIDurNotetags2($dataArmors);
    this.processIDurNotetags3($dataSkills);
    this.processIDurNotetags3($dataItems);
    Yanfly._loaded_YEP_X_ItemDurability = true;
  }
  return true;
};

DataManager.processIDurNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.durability = Yanfly.Param.IDurDefaultDur;
    obj.durVariance = Yanfly.Param.IDurDefaultVar;
    obj.durMax = Yanfly.Param.IDurDefaultMax;
    obj.breakSound = {
      name:   Yanfly.Param.IDurBreakName,
      volume: Yanfly.Param.IDurBreakVol,
      pitch:  Yanfly.Param.IDurBreakPitch,
      pan:    Yanfly.Param.IDurBreakPan
    };
    var evalMode = 'none';
    obj.breakEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<DURABILITY:[ ](\d+)>/i)) {
        obj.durability = Math.max(1, parseInt(RegExp.$1));
      } else if (line.match(/<DURABILITY VARIANCE:[ ](\d+)>/i)) {
        obj.durVariance = parseInt(RegExp.$1);
      } else if (line.match(/<DURABILITY MAXIMUM:[ ](\d+)>/i)) {
        obj.durMax = parseInt(RegExp.$1);
      } else if (line.match(/<(?:UNBREAKABLE|BYPASS DURABILITY)>/i)) {
        obj.durability = -1;
      } else if (line.match(/<BREAK SOUND NAME:[ ](.*)>/i)) {
        obj.breakSound['name'] = String(RegExp.$1);
      } else if (line.match(/<BREAK SOUND VOLUME:[ ](\d+)>/i)) {
        obj.breakSound['volume'] = parseInt(RegExp.$1);
      } else if (line.match(/<BREAK SOUND PITCH:[ ](\d+)>/i)) {
        obj.breakSound['pitch'] = parseInt(RegExp.$1);
      } else if (line.match(/<BREAK SOUND PAN:[ ]([\+\-]\d+)>/i)) {
        obj.breakSound['pan'] = parseInt(RegExp.$1);
      } else if (line.match(/<CUSTOM BREAK EFFECT>/i)) {
        evalMode = 'custom break effect';
      } else if (line.match(/<\/CUSTOM BREAK EFFECT>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom break effect') {
        obj.breakEval = obj.breakEval + line + '\n';
      }
    }
  }
};

DataManager.processIDurNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.repairWeaponType = [0];
    obj.repairArmorType = [0];
    obj.repairSound = {
      name:   Yanfly.Param.IDurRepairName,
      volume: Yanfly.Param.IDurRepairVol,
      pitch:  Yanfly.Param.IDurRepairPitch,
      pan:    Yanfly.Param.IDurRepairPan
    };
    obj.repairWeaponUnbreakable = [false];
    obj.repairArmorUnbreakable = [false];
    var evalMode = 'none';
    obj.repairDurabilityEval = ''

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<REPAIR WEAPON:[ ](\d+)>/i)) {
        obj.repairWeaponType[0] = parseInt(RegExp.$1);
      } else if (line.match(/<REPAIR ARMOR:[ ](\d+)>/i)) {
        obj.repairArmorType[0] = parseInt(RegExp.$1);
      } else if (line.match(/<REPAIR DURABILITY:[ ](\d+)>/i)) {
        var value = parseInt(RegExp.$1);
        obj.repairWeaponType[0] = value;
        obj.repairArmorType[0] = value;
      } else if (line.match(/<REPAIR WTYPE[ ](\d+):[ ](\d+)>/i)) {
        obj.repairWeaponType[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<REPAIR ATYPE[ ](\d+):[ ](\d+)>/i)) {
        obj.repairArmorType[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<UNBREAKABLE WEAPON>/i)) {
        obj.repairWeaponUnbreakable[0] = true;
      } else if (line.match(/<UNBREAKABLE ARMOR>/i)) {
        obj.repairArmorUnbreakable[0] = true;
      } else if (line.match(/<UNBREAKABLE DURABILITY>/i)) {
        obj.repairWeaponUnbreakable[0] = true;
        obj.repairArmorUnbreakable[0] = true;
      } else if (line.match(/<UNBREAKABLE WTYPE[ ](\d+)>/i)) {
        obj.repairWeaponUnbreakable[parseInt(RegExp.$1)] = true;
      } else if (line.match(/<UNBREAKABLE ATYPE[ ](\d+)>/i)) {
        obj.repairArmorUnbreakable[parseInt(RegExp.$1)] = true;
      } else if (line.match(/<REPAIR SOUND NAME:[ ](.*)>/i)) {
        obj.repairSound['name'] = String(RegExp.$1);
      } else if (line.match(/<REPAIR SOUND VOLUME:[ ](\d+)>/i)) {
        obj.repairSound['volume'] = parseInt(RegExp.$1);
      } else if (line.match(/<REPAIR SOUND PITCH:[ ](\d+)>/i)) {
        obj.repairSound['pitch'] = parseInt(RegExp.$1);
      } else if (line.match(/<REPAIR SOUND PAN:[ ]([\+\-]\d+)>/i)) {
        obj.repairSound['pan'] = parseInt(RegExp.$1);
      } else if (line.match(/<CUSTOM REPAIR EFFECT>/i)) {
        evalMode = 'custom repair eval';
      } else if (line.match(/<\/CUSTOM REPAIR EFFECT>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom repair eval') {
        obj.repairDurabilityEval = obj.repairDurabilityEval + line + '\n';
      }
    }
  }
};

DataManager.processIDurNotetags3 = function(group) {
  var noteA1 = /<USER WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteA2 = /<USER ALL WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteA3 = /<USER RANDOM WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteB1 = /<USER ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteB2 = /<USER ALL ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteB3 = /<USER RANDOM ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteC1 = /<TARGET WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteC2 = /<TARGET ALL WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteC3 = /<TARGET RANDOM WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteD1 = /<TARGET ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteD2 = /<TARGET ALL ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteD3 = /<TARGET RANDOM ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.userAllWeaponDurability = 0;
    obj.userRandomWeaponDurability = 0;
    obj.userAllArmorDurability = 0;
    obj.userRandomArmorDurability = 0;
    obj.targetAllWeaponDurability = 0;
    obj.targetRandomWeaponDurability = 0;
    obj.targetAllArmorDurability = 0;
    obj.targetRandomArmorDurability = 0;
    if ([1, 2, 3, 4, 5, 6].contains(obj.scope)) {
      if (obj.hitType === Game_Action.HITTYPE_PHYSICAL) {
        obj.userAllWeaponDurability = Yanfly.Param.IDurPhysicalAction;
        if (Yanfly.Param.IDurDamageAllArmor) {
          obj.targetAllArmorDurability = Yanfly.Param.IDurPhysicalDmg;
        } else {
          obj.targetRandomArmorDurability = Yanfly.Param.IDurPhysicalDmg;
        }
      } else if (obj.hitType === Game_Action.HITTYPE_MAGICAL) {
        obj.userAllWeaponDurability = Yanfly.Param.IDurMagicalAction;
        if (Yanfly.Param.IDurDamageAllArmor) {
          obj.targetAllArmorDurability = Yanfly.Param.IDurMagicalDmg;
        } else {
          obj.targetRandomArmorDurability = Yanfly.Param.IDurMagicalDmg;
        }
      } else if (obj.hitType === Game_Action.HITTYPE_CERTAIN) {
        obj.userAllWeaponDurability = Yanfly.Param.IDurCertainAction;
        if (Yanfly.Param.IDurDamageAllArmor) {
          obj.targetAllArmorDurability = Yanfly.Param.IDurCertainDmg;
        } else {
          obj.targetRandomArmorDurability = Yanfly.Param.IDurCertainDmg;
        }
      }
    }
    var evalMode = 'none';
    var evalKey = '';
    obj.durabilityEval = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteA1)) {
        obj.userAllWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteA2)) {
        obj.userAllWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteA3)) {
        obj.userRandomWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteB1)) {
        if (Yanfly.Param.IDurDamageAllArmor) {
          obj.userAllArmorDurability = parseInt(RegExp.$1);
        } else {
          obj.userRandomArmorDurability = parseInt(RegExp.$1);
        }
      } else if (line.match(noteB2)) {
        obj.userAllArmorDurability = parseInt(RegExp.$1);
      } else if (line.match(noteB3)) {
        obj.userRandomArmorDurability = parseInt(RegExp.$1);
      } else if (line.match(noteC1)) {
        obj.targetAllWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteC2)) {
        obj.targetAllWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteC3)) {
        obj.targetRandomWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteD1)) {
        if (Yanfly.Param.IDurDamageAllArmor) {
          obj.targetAllArmorDurability = parseInt(RegExp.$1);
        } else {
          obj.targetRandomArmorDurability = parseInt(RegExp.$1);
        }
      } else if (line.match(noteD2)) {
        obj.targetAllArmorDurability = parseInt(RegExp.$1);
      } else if (line.match(noteD3)) {
        obj.targetRandomArmorDurability = parseInt(RegExp.$1);
      } else if (line.match(/<CUSTOM[ ](.*)[ ](.*)[ ](.*)[ ]DURABILITY>/i)) {
        var target = String(RegExp.$1).toLowerCase();
        var type = String(RegExp.$2).toLowerCase();
        var equip = String(RegExp.$3).toLowerCase();
        if (!['user', 'target'].contains(target)) continue;
        if (!['all', 'random'].contains(type)) continue;
        if (!['weapon', 'armor'].contains(equip)) continue;
        evalMode = 'custom durability';
        evalKey = target + type + equip;
        obj.durabilityEval[evalKey] = '';
      } else if (line.match(/<\/CUSTOM[ ](.*)[ ](.*)[ ](.*)[ ]DURABILITY>/i)) {
        evalMode = 'none';
        evalKey = '';
      } else if (evalMode === 'custom durability') {
        obj.durabilityEval[evalKey] = obj.durabilityEval[evalKey] + line + '\n';
      }
    }
  }
};

DataManager.getDurability = function(item) {
    if (this.isItem(item)) return -1;
    if (!this.isIndependent(item)) return -1;
    if (item.durability === undefined) ItemManager.makeDurability(item);
    return item.durability;
};

DataManager.getMaxDurability = function(item) {
    if (this.isItem(item)) return -1;
    if (!this.isIndependent(item)) return -1;
    var baseItem = this.getBaseItem(item);
    return baseItem.durMax;
};

//=============================================================================
// ItemManager
//=============================================================================

Yanfly.IDur.ItemManager_setNewIndependentItem =
    ItemManager.setNewIndependentItem;
ItemManager.setNewIndependentItem = function(baseItem, newItem) {
  Yanfly.IDur.ItemManager_setNewIndependentItem.call(this, baseItem, newItem);
  var variance = $gameTemp.varianceStock() ? 0 : baseItem.durVariance;
  this.makeDurability(newItem, variance);
};

ItemManager.makeDurability = function(item, variance) {
    if (DataManager.isItem(item)) return;
    variance = variance || 0;
    var baseItem = DataManager.getBaseItem(item);
    item.durability = baseItem.durability;
    if (item.durability <= 0) return;
    if (variance >= 0) this.makeDurabilityVariance(item, variance);
    this.clampDurability(item);
};

ItemManager.makeDurabilityVariance = function(item, variance) {
    var randomValue = variance * 2 + 1;
    var offset = variance;
    item.durability += Math.floor(Math.random() * randomValue - offset);
};

ItemManager.clampDurability = function(item) {
    var baseItem = DataManager.getBaseItem(item);
    item.durability = item.durability.clamp(0, baseItem.durMax);
};

ItemManager.applyRepairDurabilityEffects = function(item, effectItem) {
    this.setUnbreakableRepairDurability(item, effectItem);
    this.addRepairDurability(item, effectItem);
};

ItemManager.setUnbreakableRepairDurability = function(item, effectItem) {
    if (DataManager.isWeapon(item)) {
      var type = item.wtypeId;
      var array1 = effectItem.repairWeaponUnbreakable;
    } else {
      var type = item.atypeId;
      var array1 = effectItem.repairArmorUnbreakable;
    }
    if (array1) {
      if (array1[0] || array1[type]) item.durability = -1;
    }
};

ItemManager.addRepairDurability = function(item, effectItem) {
    if (item.durability < 0) return;
    if (DataManager.isWeapon(item)) {
      var type = item.wtypeId;
      var array1 = effectItem.repairWeaponType;
    } else {
      var type = item.atypeId;
      var array1 = effectItem.repairArmorType;
    }
    if (array1) {
      item.durability += array1[0] || 0;
      if (array1[type] && array1[type] > 0) item.durability += array1[type];
    }
    this.clampDurability(item);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.IDur.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.IDur.Game_System_initialize.call(this);
    this.initItemDurabilitySettings();
};

Game_System.prototype.initItemDurabilitySettings = function() {
    this._showRepairDurability = Yanfly.Param.IDurShowRepair;
    this._enableRepairDurability = Yanfly.Param.IDurEnRepair;
};

Game_System.prototype.isShowRepairDurability = function() {
    if (this._showRepairDurability === undefined) {
      this.initItemDurabilitySettings();
    }
    return this._showRepairDurability;
};

Game_System.prototype.setShowRepairDurability = function(value) {
    if (this._showRepairDurability === undefined) {
      this.initItemDurabilitySettings();
    }
    this._showRepairDurability = value;
};

Game_System.prototype.isEnableRepairDurability = function() {
    if (this._enableRepairDurability === undefined) {
      this.initItemDurabilitySettings();
    }
    return this._enableRepairDurability;
};

Game_System.prototype.setEnableRepairDurability = function(value) {
    if (this._enableRepairDurability === undefined) {
      this.initItemDurabilitySettings();
    }
    this._enableRepairDurability = value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.durabilityBreakItem = function(obj) {
    if (!obj) return;
    this.discardEquip(obj);
    this.playDurabilityBreakSound(obj);
    this.customDurabilityBreakEval(obj);
    var scene = SceneManager._scene;
    var win = scene._logWindow;
    if (!win) return;
    var fmt = Yanfly.Param.IDurBrokenText;
    var text = fmt.format(this.name(), obj.name, '\\i[' + obj.iconIndex + ']');
    if (Imported.YEP_BattleEngineCore) text = '<CENTER>' + text;
    win._lines.push(text);
    win.refresh();
    if (!Imported.YEP_BattleEngineCore) return;
    if (this._waitEnabled) return;
    this._waitEnabled = true;
    var frames = Yanfly.Param.IDurBrokenWait;
    if (frames > 0) BattleManager._actionList.push(['WAIT', [frames]]);
};

Game_Actor.prototype.customDurabilityBreakEval = function(item) {
    var baseItem = DataManager.getBaseItem(item);
    var effect = item.breakEval || baseItem.breakEval;
    if (!effect) return;
    if (effect === '') return;
    var a = this;
    var user = this;
    var subject = this;
    var b = this;
    var target = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(effect);
};

Game_Actor.prototype.playDurabilityBreakSound = function(obj) {
    var sound = obj.breakSound;
    if (!sound) {
      sound = {
        name:   Yanfly.Param.IDurBreakName,
        volume: Yanfly.Param.IDurBreakVol,
        pitch:  Yanfly.Param.IDurBreakPitch,
        pan:    Yanfly.Param.IDurBreakPan
      }
    }
    AudioManager.playSe(sound);
};

Game_Actor.prototype.damageAllWeaponDurability = function(value) {
    this.damageAllDurability(value, this.weapons());
};

Game_Actor.prototype.damageAllArmorDurability = function(value) {
    this.damageAllDurability(value, this.armors());
};

Game_Actor.prototype.damageAllDurability = function(value, group) {
    if (value === 0) return;
    var length = group.length;
    var removed = [];
    for (var i = 0; i < length; ++i) {
      var obj = group[i];
      if (!obj) continue;
      if (!obj.baseItemId) continue;
      if (obj.durability < 0) continue;
      obj.durability += value;
      if (obj.durability <= 0) removed.push(obj);
    }
    length = removed.length;
    for (var i = 0; i < length; ++i) {
      var obj = removed[i];
      this.durabilityBreakItem(obj);
    }
};

Game_Actor.prototype.damageRandomWeaponDurability = function(value) {
    this.damageRandomDurability(value, this.weapons());
};

Game_Actor.prototype.damageRandomArmorDurability = function(value) {
    this.damageRandomDurability(value, this.armors());
};

Game_Actor.prototype.damageRandomDurability = function(value, group) {
    if (value === 0) return;
    var length = group.length;
    var valid = [];
    for (var i = 0; i < length; ++i) {
      var obj = group[i];
      if (!obj) continue;
      if (!obj.baseItemId) continue;
      if (obj.durability < 0) continue;
      valid.push(obj)
    }
    var item = valid[Math.floor(Math.random() * valid.length)];
    if (!item) return;
    item.durability += value;
    if (item.durability <= 0) this.durabilityBreakItem(item);
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.IDur.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.IDur.Game_Action_applyItemUserEffect.call(this, target);
    if (this.isApplyDurabilityEffects()) this.applyDurabilityEffects(target);
};

Game_Action.prototype.isApplyDurabilityEffects = function() {
    return true;
};

Game_Action.prototype.applyDurabilityEffects = function(target) {
    if (this.subject().isActor()) {
      var value = this.item().userAllWeaponDurability;
      value = this.durabilityEval('userallweapon', target, value);
      this.subject().damageAllWeaponDurability(value);
      var value = this.item().userRandomWeaponDurability;
      value = this.durabilityEval('userrandomweapon', target, value);
      this.subject().damageRandomWeaponDurability(value);
      var value = this.item().userAllArmorDurability;
      value = this.durabilityEval('userallarmor', target, value);
      this.subject().damageAllArmorDurability(value);
      var value = this.item().userRandomArmorDurability;
      value = this.durabilityEval('userrandomarmor', target, value);
      this.subject().damageRandomArmorDurability(value);
      this.subject()._waitEnabled = false;
    }
    if (target && target.isActor()) {
      var value = this.item().targetAllWeaponDurability;
      value = this.durabilityEval('targetallweapon', target, value);
      target.damageAllWeaponDurability(value);
      var value = this.item().targetRandomWeaponDurability;
      value = this.durabilityEval('targetrandomweapon', target, value);
      target.damageRandomWeaponDurability(value);
      var value = this.item().targetAllArmorDurability;
      value = this.durabilityEval('targetallarmor', target, value);
      target.damageAllArmorDurability(value);
      var value = this.item().targetRandomArmorDurability;
      value = this.durabilityEval('targetrandomarmor', target, value);
      target.damageRandomArmorDurability(value);
      target._waitEnabled = false;
    }
};

Game_Action.prototype.durabilityEval = function(type, target, value) {
    var formula = this.item().durabilityEval[type];
    if (!formula) return value;
    if (formula === '') return value;
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var item = this.item();
    var skill = this.item();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(formula);
    return value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.IDur.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.IDur.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowRepairDurability') {
    $gameSystem.setShowRepairDurability(true);
  } else if (command === 'HideRepairDurability') {
    $gameSystem.setShowRepairDurability(false);
  } else if (command === 'EnableRepairDurability') {
    $gameSystem.setEnableRepairDurability(true);
  } else if (command === 'DisableRepairDurability') {
    $gameSystem.setEnableRepairDurability(false);
  }
};

//=============================================================================
// Window_ItemInfo
//=============================================================================

Yanfly.IDur.Window_ItemInfo_drawItemInfoC =
    Window_ItemInfo.prototype.drawItemInfoC;
Window_ItemInfo.prototype.drawItemInfoC = function(dy) {
    dy = Yanfly.IDur.Window_ItemInfo_drawItemInfoC.call(this, dy);
    if (this.isDrawDurability()) dy = this.drawItemDurability(dy);
    return dy;
};

Window_ItemInfo.prototype.isDrawDurability = function() {
    if (DataManager.isItem(this._item)) return false;
    if (!Yanfly.Param.IDurShowUnbr) {
      if (DataManager.getDurability(this._item) < 0) return false;
    }
    return Yanfly.Param.IDurShowDur;
};

Window_ItemInfo.prototype.drawItemDurability = function(dy) {
    this.resetFontSettings();
    this.changeTextColor(this.systemColor());
    var text = Yanfly.Param.IDurText;
    var dx = this.textPadding();
    var dw = this.contents.width - this.textPadding() * 2;
    this.drawText(text, dx, dy, dw);
    var fmt = Yanfly.Param.IDurFmt;
    var cur = DataManager.getDurability(this._item);
    var max = DataManager.getMaxDurability(this._item);
    if (cur > 0) {
      this.changeTextColor(this.textColor(this.durabilityColor(cur, max)));
      text = fmt.format(cur, max)
    } else {
      this.changeTextColor(this.textColor(Yanfly.Param.IDurColor['unbreak']));
      text = Yanfly.Param.IDurUnbreakable;
    }
    this.drawText(text, dx, dy, dw, 'right');
    this.resetFontSettings();
    dy += this.lineHeight();
    return dy;
};

Window_ItemInfo.prototype.durabilityColor = function(cur, max) {
    var value = DataManager.getBaseItem(this._item).durability;
    if (cur === max) {
      return Yanfly.Param.IDurColor['max'];
    } else if (cur >= 1.90 * value) {
      return Yanfly.Param.IDurColor['rate190'];
    } else if (cur >= 1.75 * value) {
      return Yanfly.Param.IDurColor['rate175'];
    } else if (cur >= 1.50 * value) {
      return Yanfly.Param.IDurColor['rate150'];
    } else if (cur >= 1.20 * value) {
      return Yanfly.Param.IDurColor['rate120'];
    } else if (cur >= 1.10 * value) {
      return Yanfly.Param.IDurColor['rate110'];
    } else if (cur >= 1.00 * value) {
      return Yanfly.Param.IDurColor['rate100'];
    } else if (cur >= 0.80 * value) {
      return Yanfly.Param.IDurColor['rate80'];
    } else if (cur >= 0.50 * value) {
      return Yanfly.Param.IDurColor['rate50'];
    } else if (cur >= 0.25 * value) {
      return Yanfly.Param.IDurColor['rate25'];
    } else if (cur >= 0.10 * value) {
      return Yanfly.Param.IDurColor['rate10'];
    } else {
      return Yanfly.Param.IDurColor['rate1'];
    }
};

//=============================================================================
// Window_ItemActionCommand
//=============================================================================

Yanfly.IDur.Window_ItemActionCommand_addCustomCommandsC =
    Window_ItemActionCommand.prototype.addCustomCommandsC;
Window_ItemActionCommand.prototype.addCustomCommandsC = function() {
    Yanfly.IDur.Window_ItemActionCommand_addCustomCommandsC.call(this);
    this.addRepairCommand();
};

Window_ItemActionCommand.prototype.addRepairCommand = function() {
    if (Yanfly.Param.IDurCmdRepair === '') return;
    if (!$gameSystem.isShowRepairDurability()) return;
    var enabled = DataManager.isIndependent(this._item);
    if (!enabled) return;
    enabled = this.isRepairDurabilityEnabled();
    var fmt = Yanfly.Param.IDurCmdRepair;
    text = '\\i[' + this._item.iconIndex + ']';
    if (this._item.textColor !== undefined) {
      text += '\\c[' + this._item.textColor + ']';
    }
    text += this._item.name;
    text = fmt.format(text);
    this.addCommand(text, 'repair', enabled);
};

Window_ItemActionCommand.prototype.isRepairDurabilityEnabled = function() {
    if (this._item.durability < 0) return false;
    return $gameSystem.isEnableRepairDurability();
};

//=============================================================================
// Window_RepairItemList
//=============================================================================

function Window_RepairItemList() {
    this.initialize.apply(this, arguments);
}

Window_RepairItemList.prototype = Object.create(Window_ItemList.prototype);
Window_RepairItemList.prototype.constructor = Window_RepairItemList;

Window_RepairItemList.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this.hide();
    this.deactivate();
};

Window_RepairItemList.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
    this.select(0);
};

Window_RepairItemList.prototype.includes = function(item) {
    if (!item) return false;
    if (!this.containsType(item)) return false;
    return true;
};

Window_RepairItemList.prototype.containsType = function(item) {
    if (item.repairDurabilityEval !== '') return true;
    if (DataManager.isWeapon(this._item)) {
      var type = this._item.wtypeId;
      var array1 = item.repairWeaponType;
      var array2 = item.repairWeaponUnbreakable;
    } else if (DataManager.isArmor(this._item)) {
      var type = this._item.atypeId;
      var array1 = item.repairArmorType;
      var array2 = item.repairArmorUnbreakable;
    } else {
      return false;
    }
    if (array1) {
      if (array1[0] && array1[0] > 0) return true;
      if (array1[type] && array1[type] > 0) return true;
    }
    if (array2) {
      if (array2[0]) return true;
      if (array2[type]) return true;
    }
    return false;
};

Window_RepairItemList.prototype.isEnabled = function(item) {
    if (!item) return false;
    if (item.repairDurabilityEval !== '') return true;
    if (DataManager.isWeapon(this._item)) {
      var arr = item.repairWeaponUnbreakable;
      var type = this._item.wtypeId;
    } else if (DataManager.isArmor(this._item)) {
      var arr = item.repairArmorUnbreakable;
      var type = this._item.atypeId;
    }
    if (arr) {
      if (arr[0]) return true;
      if (arr[type]) return true;
    }
    var cur = DataManager.getDurability(this._item);
    var max = DataManager.getMaxDurability(this._item);
    if (cur < 0) return false;
    return cur < max;
};

Window_RepairItemList.prototype.selectLast = function() {
};

Window_RepairItemList.prototype.playOkSound = function() {
    if (!this.item()) return;
    var sound = this.item().repairSound;
    if (!sound) {
      sound = {
        name:   Yanfly.Param.IDurRepairName,
        volume: Yanfly.Param.IDurRepairVol,
        pitch:  Yanfly.Param.IDurRepairPitch,
        pan:    Yanfly.Param.IDurRepairPan
      }
    }
    AudioManager.playSe(sound);
};

Window_RepairItemList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) this._data.push(null);
};

//=============================================================================
// Scene_Item
//=============================================================================

Yanfly.IDur.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function() {
    Yanfly.IDur.Scene_Item_createItemWindow.call(this);
    this.createRepairListWindow();
};

Yanfly.IDur.Scene_Item_createActionWindow =
    Scene_Item.prototype.createActionWindow;
Scene_Item.prototype.createActionWindow = function() {
    Yanfly.IDur.Scene_Item_createActionWindow.call(this);
    this._itemActionWindow.setHandler('repair', this.onActionRepair.bind(this));
};

Scene_Item.prototype.createRepairListWindow = function() {
    var wy = this._itemWindow.y;
    var ww = this._itemWindow.width;
    var wh = this._itemWindow.height;
    this._repairListWindow = new Window_RepairItemList(0, wy, ww, wh);
    this._repairListWindow.setHelpWindow(this._helpWindow);
    this._repairListWindow.setHandler('ok', this.onRepairListOk.bind(this));
    this._repairListWindow.setHandler('cancel',
      this.onRepairListCancel.bind(this));
    this.addWindow(this._repairListWindow);
};

Scene_Item.prototype.onActionRepair = function() {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    this._repairListWindow.show();
    this._repairListWindow.activate();
    this._repairListWindow.setItem(this.item());
};

Scene_Item.prototype.onRepairListOk = function() {
    var effectItem = this._repairListWindow.item();
    ItemManager.applyRepairDurabilityEffects(this.item(), effectItem);
    this.onRepairEval(effectItem);
    if (effectItem.consumable) $gameParty.loseItem(effectItem, 1);
    this._repairListWindow.refresh();
    this._repairListWindow.activate();
    this._statusWindow.refresh();
    this._infoWindow.refresh();
    this._itemWindow.refresh();
    this._itemActionWindow.refresh();
    var index = this._repairListWindow.index();
    if (this._repairListWindow.maxItems() <= index) {
      index = this._repairListWindow.maxItems() - 1;
      this._repairListWindow.select(index);
    }
};

Scene_Item.prototype.onRepairListCancel = function() {
    this._repairListWindow.hide();
    this._repairListWindow.deactivate();
    this._itemActionWindow.show();
    this._itemActionWindow.activate();
    this._helpWindow.setItem(this.item());
};

Scene_Item.prototype.onRepairEval = function(effectItem) {
    var effect = effectItem.repairDurabilityEval;
    if (!effect) return;
    if (effect === '') return;
    var item = this.item();
    eval(effectItem.repairDurabilityEval);
};

//=============================================================================
// End of File
//=============================================================================
};