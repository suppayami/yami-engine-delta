//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Attachable Augments
// YEP_X_AttachAugments.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_AttachAugments = true;

var Yanfly = Yanfly || {};
Yanfly.Augment = Yanfly.Augment || {};

//=============================================================================
 /*:
 * @plugindesc v1.08a (Requires YEP_ItemCore.js) Players can attach and
 * detach augments to independent equipment.
 * @author Yanfly Engine Plugins
 *
 * @param ---Default---
 * @default
 *
 * @param Weapon Slots
 * @desc The default augment slots your weapon uses.
 * Separate each slot with a comma.
 * @default Glyph, Mark, Orb, Orb
 *
 * @param Armor Slots
 * @desc The default augment slots your weapon uses.
 * Separate each slot with a comma.
 * @default Sphere, Orb, Orb, Orb
 *
 * @param Enable Augments
 * @desc Enable augments by default at game start in action window?
 * NO - false     YES - true
 * @default true
 *
 * @param Show Augments
 * @desc Show augments by default at game start in info window?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Command Window---
 * @default
 *
 * @param Augment Slot Format
 * @desc This is how the augment slots will appear:
 * %1 - Slot Name     %2 - Equipment Name
 * @default \c[16]%1:\c[0] %2
 *
 * @param No Augment Text
 * @desc This is how a slot appears if it has no augments.
 * @default \c[7]- None -
 *
 * @param Remove Augment
 * @desc Text used to remove augments from item.
 * @default \i[16]Detach Augment
 *
 * @param ---Info Window---
 * @default
 *
 * @param Show Augment Info
 * @desc Show Augments in the info window?
 * NO - false     YES - true
 * @default true
 *
 * @param Info Title
 * @desc Text used to display augments.
 * @default Augments
 *
 * @param Title Alignment
 * @desc What alignment do you want to use for the title?
 * left     center     right
 * @default center
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_ItemCore.
 * Make sure this plugin is located under YEP_ItemCore in the plugin list.
 *
 * Attachable Augments is an extension plugin made for the Item Core plugin. It
 * allows equipment to be able to attach augment components to various slots,
 * that you can define individually per item. These slots can be of a certain
 * category unique to that item or global across all items. The effects used
 * with the augment can involve parameter changes, adding skills, adjust state
 * resistances, place attack elements, and more!
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to setup how augments work in your game
 * and affect your equipment.
 *
 * Weapon and Armor Notetags:
 *
 *   <Augment Slots>
 *    Rune
 *    Glyph
 *    Orb
 *    Mark
 *   </Augment Slots>
 *   This allows you to set what kind of augments are used for the item. The
 *   names used for the augment slots are the augment types used for that item.
 *
 *   <No Augment Slots>
 *   This makes the item have no augment slots.
 *
 * Item, Weapon, Armor Notetags
 *
 *   <Augment: type>
 *    augment effect
 *    augment effect
 *   </Augment: type>
 *   This will change the item into a non-Independent item. This item can be
 *   used to augment equipment that contain the appropriate augment 'type'.
 *   This particular notetag will decide the augment effect for attaching the
 *   augment component and the reverse effect for detaching the component.
 *   Insert multiple sets of these notetags to allow different augment effects
 *   when used on different augment slot types.
 *
 *   <Augment Attach: type>
 *    augment effect
 *    augment effect
 *   </Augment Attach: type>
 *   This will change the item into a non-Independent item. This item can be
 *   used to augment equipment that contain the appropriate augment 'type'.
 *   This notetag will decide only the augment effects that are applied when
 *   the augment component is attached to the equipment and not when detached.
 *   Insert multiple sets of these notetags to allow different augment effects
 *   when used on different augment slot types.
 *
 *   <Augment Detach: type>
 *    augment effect
 *    augment effect
 *   </Augment Detach: type>
 *   This will change the item into a non-Independent item. This item can be
 *   used to augment equipment that contain the appropriate augment 'type'.
 *   This notetag will decide only the augment effects that are applied when
 *   the augment component is detached from the equipment and not attached.
 *   Insert multiple sets of these notetags to allow different augment effects
 *   when used on different augment slot types.
 *
 * ============================================================================
 * Augment Effect List
 * ============================================================================
 *
 * The following is a list of effects you can use for the <Augment: type>,
 * <Augment Attach: type>, <Augment Detatch: type> notetags to have it apply
 * the desired effects to the upgraded item.
 *
 * --- Effects ---
 *
 * Param: +x
 * Param: -x
 * - Replace 'Param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 * or 'LUK'. This will increase/decrease the parameter for the item by x.
 *
 * ---
 *
 * Param: +x%
 * Param: -x%
 * - Replace 'Param'  with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 * 'LUK', 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG',
 * 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', or 'EXR'.
 * This will increase/decrease the rate for that parameter for the item by x%.
 * Refer to the Base Parameter Control, Extra Parameter Formula, and Special
 * Parameter Formula plugins for more information regarding these stats.
 *
 * ---
 *
 * Boost: +x
 * Boost: -x
 * - This will increase or decrease the boost count of the item by x.
 *
 * ---
 *
 * Price: +x
 * Price: -x
 * - This will increase or decrease the price of the item by x.
 *
 * ---
 *
 * Cannot Detach
 * - This makes the augment unable to be detached once applied.
 *
 * ---
 *
 * Add Attack Element: x
 * Remove Attack Element: x
 * - Add/Remove Attack Element 'x' to item. You can use either the name or the
 * ID of the element. If the name is used and you have multiple elements in
 * your database with the same name, priority will be given to the element with
 * the highest ID.
 *
 * ---
 *
 * Add Attack State: x
 * Add Attack State: x, y%
 * Remove Attack State: x
 * Remove Attack State: x, y%
 * - Add/Remove Attack State 'x' to item. You can use either the name of the ID
 * of the state. If the name is used and you have multiple states in your
 * database with the same name, priority will be given to the state with the
 * highest ID. If 'y' is used, then the success rate of landing the state will
 * be y%. If 'y' is not used, the success rate of landing the state is 100%.
 *
 * ---
 *
 * Add Debuff Rate: param, x%
 * Add Debuff Rate: param, +x%
 * Add Debuff Rate: param, -x%
 * Remove Debuff Rate: param, x%
 * Remove Debuff Rate: param, +x%
 * Remove Debuff Rate: param, -x%
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 * or LUK. Add/remove the debuff affliction rate of the parameter for the item
 * to 'x%' rate.
 *
 * ---
 *
 * Add Element Rate: x, y%
 * Add Element Rate: x, +y%
 * Add Element Rate: x, -y%
 * Remove Element Rate: x, y%
 * Remove Element Rate: x, +y%
 * Remove Element Rate: x, -y%
 * - Add/Remove element rate 'x' to item. You can use either the name or the
 * ID of the element. If the name is used and you have multiple elements in
 * your database with the same name, priority will be given to the element with
 * the highest ID. The item's element rate for 'x' will be 'y%' rate.
 *
 * ---
 *
 * Add Passive State: x
 * Remove Passive State: x
 * - Requires YEP_AutoPassiveStates.js installed. Add/Remove passive state 'x'
 * to item. You can use either the name or the ID of the state. If the name is
 * used and you have multiple states in your database with the same name,
 * priority will be given to the state with the highest ID.
 *
 * ---
 *
 * Add Skill: x
 * Remove Skill: x
 * - Add/Remove skill 'x' to item. You can use either the name or the ID of the
 * skill. If the name is used and you have multiple skills in your database
 * with the same name, priority will be given to the skill with the highest ID.
 * This will make the skill temporarily usable by the actor as long as the item
 * is equipped with the augment on it.
 *
 * ---
 *
 * Add Skill Type: x
 * Add SType: x
 * Remove Skill Type: x
 * Remove SType: x
 * - Add/Remove skill type 'x' to item. You can use either the name or the ID
 * of the skill type. If the name is used and you have multiple skills in your
 * database with the same name, priority will be given to the skill type with
 * the highest ID. This will make the skill type temporarily usable by the
 * actor as long as the item is equipped with the augment on it.
 *
 * ---
 *
 * Add State Rate: x, y%
 * Add State Rate: x, +y%
 * Add State Rate: x, -y%
 * Remove State Rate: x, y%
 * Remove State Rate: x, +y%
 * Remove State Rate: x, -y%
 * - Add/Remove state rate for state 'x' to item. You can use either the name
 * or the ID of the state. If the name is used and you have multiple states in
 * your database with the same name, priority will be given to the state with
 * the highest ID. The item's state rate for 'x' will be 'y%' rate.
 *
 * ---
 *
 * Add State Resist: x
 * Remove State Resist: x
 * - Add/Remove state resist for state 'x' to item. You can use either the name
 * or the ID of the state. If the name is used and you have multiple states in
 * your database with the same name, priority will be given to the state with
 * the highest ID.
 *
 * ---
 *
 * Change Base Name: x
 * Cancel Base Name: x
 * - Changes/Cancels the base name of the item to 'x' while the augment is on
 * the item. If an item has multiple augments that alter the base name, then
 * priority is given to the first augment that alters the base name.
 *
 * ---
 *
 * Change Icon: x
 * Cancel Icon: x
 * - Changes/cancels the icon of the item to 'x' while the augment is on the
 * item. If an item has multiple augments that alter the icon, then priority is
 * given to the first augment that alters the icon.
 *
 * ---
 *
 * Change Prefix: x
 * Cancel Prefix: x
 * - Changes/Cancels the prefix of the item to 'x' while the augment is on the
 * item. If an item has multiple augments that alter the prefix, then priority
 * is given to the first augment that alters the priority.
 *
 * ---
 *
 * Change Priority Name: x
 * Cancel Priority Name: x
 * - Changes/Cancels the priority name of the item to 'x' while the augment is
 * on the item. If an item has multiple augments that alter the priority name,
 * then priority is given to the first augment that alters the priority name.
 *
 * ---
 *
 * Change Suffix: x
 * Cancel Suffix: x
 * - Changes/Cancels the suffix of the item to 'x' while the augment is on the
 * item. If an item has multiple augments that alter the suffix, then priority
 * is given to the first augment that alters the suffix.
 *
 * ---
 *
 * Change Text Color: x
 * Cancel Text Color: x
 * - Changes/Cancels the text color used for the item to 'x' while the augment
 * is on the item. If an item has multiple augments that alter the text color,
 * then priority is given to the first augment that alters text color.
 *
 * ============================================================================
 * Lunatic Mode - Attach and Detach Evals
 * ============================================================================
 *
 * For those with JavaScript experience, you can use the following Lunatic Mode
 * notetags to make custom effects regarding the attaching and detaching of
 * certain augments.
 *
 * --- Attach ---
 *
 * <Augment Attach Eval: type>
 *  item.price += $gameParty.highestLevel();
 *  item.params[0] += $gameParty.highestLevel();
 * </Augment Attach Eval: type>
 * The 'type' refers to the slot type used for the augment. The 'item' variable
 * refers to the main item being augmented. The 'effectItem' variable refers to
 * the item being used as an augment component. This eval will only run when
 * the augment is being attached.
 *
 * --- Detach ---
 *
 * <Augment Detach Eval: type>
 *  item.price -= $gameParty.highestLevel();
 *  item.params[0] -= $gameParty.highestLevel();
 * </Augment Detach Eval: type>
 * The 'type' refers to the slot type used for the augment. The 'item' variable
 * refers to the main item being augmented. The 'effectItem' variable refers to
 * the item being used as an augment component. This eval will only run when
 * the augment is being attached.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * There's a couple of pluging commands you can use with this plugin.
 *
 * Plugin Command:
 *
 *   EnableAugments
 *   - This will enable augments in the item action menu. With them enabled,
 *   the player can now attach and detach augments to their items.
 *
 *   DisableAugments
 *   - This will disable augments in the item action menu and hide their
 *   options so that the player will be unable to attach or detach augments
 *   from their items.
 *
 *   ShowAugments
 *   - This will show the augments in the item info window when looking at
 *   item details.
 *
 *   HideAugments
 *   - This will hide the augments in the item info window when looking at
 *   item details.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.08a:
 * - Fixed a typo within the code. Please update Item Core, Item Disassemble,
 * Attachable Augments, and More Currencies if you are using those plugins.
 * - Optimization update.
 *
 * Version 1.07:
 * - Fixed a bug that caused adding attack state augments without a rate to not
 * work properly.
 *
 * Version 1.06:
 * - Fixed a bug that caused certain named augment settings to not work
 * work properly upon reloading a game.
 *
 * Version 1.05:
 * - Fixed a bug that specifically made the LUK: +x% and LUK: -x% augments not
 * work properly.
 *
 * Version 1.04:
 * - Added +y% and -y% versions of attachments for various augment effects.
 *
 * Version 1.03:
 * - Bug fixed for Add Element Rate: x, y% not working properly.
 *
 * Verison 1.02a:
 * - Fixed a bug that caused Independent Item-types to crash the game when used
 * within the menu.
 * - Fixed a bug that caused custom Lunatic Mode effects to not operate unless
 * there existed basic augment effects.
 * - Fixed a bug that caused param% changes to not function correctly.
 *
 * Version 1.01:
 * - Fixed a bug that caused a crash when equipping "empty" augments.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_ItemCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_AttachAugments');
Yanfly.Param = Yanfly.Param || {};

Yanfly.makeAttachableAugmentParameterSettings = function() {
  var array = String(Yanfly.Parameters['Weapon Slots']).split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    array[i] = array[i].trim();
  }
  Yanfly.Param.AugmentWeapons = array;
  var array = String(Yanfly.Parameters['Armor Slots']).split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    array[i] = array[i].trim();
  }
  Yanfly.Param.AugmentArmors = array;
};
Yanfly.makeAttachableAugmentParameterSettings();

Yanfly.Param.AugmentEnable = eval(String(Yanfly.Parameters['Enable Augments']));
Yanfly.Param.AugmentShow = eval(String(Yanfly.Parameters['Show Augments']));

Yanfly.Param.AugmentSlotFmt = String(Yanfly.Parameters['Augment Slot Format']);
Yanfly.Param.AugmentNoneText = String(Yanfly.Parameters['No Augment Text']);
Yanfly.Param.AugmentRemoveText = String(Yanfly.Parameters['Remove Augment']);

Yanfly.Param.AugmentShow = eval(String(Yanfly.Parameters['Show Augment Info']));
Yanfly.Param.AugmentInfoTitle = String(Yanfly.Parameters['Info Title']);
Yanfly.Param.AugmentInfoAlign = String(Yanfly.Parameters['Title Alignment']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Augment.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Augment.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly.YEP_X_AttachAugments) {
    this.processAugmentNotetagsS($dataSkills);
    this.processAugmentNotetagsT($dataStates);
    this.processAugmentNotetagsSys($dataSystem);
    this.processAugmentNotetags1($dataWeapons, true);
    this.processAugmentNotetags1($dataArmors, false);
    this.processAugmentNotetags2($dataItems);
    this.processAugmentNotetags2($dataWeapons);
    this.processAugmentNotetags2($dataArmors);
    Yanfly.YEP_X_AttachAugments = true;
  }
  
  return true;
};

DataManager.processAugmentNotetagsS = function(group) {
  if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processAugmentNotetagsT = function(group) {
  if (Yanfly.StateIdRef) return;
  Yanfly.StateIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.StateIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processAugmentNotetagsSys = function(group) {
  Yanfly.STypeIdRef = {};
  for (var i = 1; i < group.skillTypes.length; ++i) {
    var name = group.skillTypes[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, '');
    Yanfly.STypeIdRef[name] = i;
  }
  Yanfly.ElementIdRef = {};
  for (var i = 1; i < group.elements.length; ++i) {
    var name = group.elements[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, '');
    Yanfly.ElementIdRef[name] = i;
  }
};

DataManager.processAugmentNotetags1 = function(group, isWeapon) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    if (isWeapon) {
      obj.augmentSlots = JsonEx.makeDeepCopy(Yanfly.Param.AugmentWeapons);
    } else {
      obj.augmentSlots = JsonEx.makeDeepCopy(Yanfly.Param.AugmentArmors);
    }
    
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:AUGMENT SLOT|AUGMENT SLOTS)>/i)) {
        var evalMode = 'augment slots';
        obj.augmentSlots = [];
      } else if (line.match(/<\/(?:AUGMENT SLOT|AUGMENT SLOTS)>/i)) {
        var evalMode = 'none';
      } else if (evalMode === 'augment slots') {
        obj.augmentSlots.push(line.trim());
      } else if (line.match(/<(?:NO AUGMENTS|NO AUGMENT SLOTS)>/i)) {
        obj.augmentSlots = [];
      }
    }
  }
};

DataManager.processAugmentNotetags2 = function(group, isWeapon) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.augmentTypes = [];
    obj.augmentDataAttach = {};
    obj.augmentDataDetach = {};
    var evalMode = 'none';
    var evalType = 'none';
    obj.augmentEvalAttach = {};
    obj.augmentEvalDetach = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<AUGMENT:[ ](.*)>/i)) {
        var evalMode = 'augment auto';
        var evalType = String(RegExp.$1).toUpperCase().trim();
        this.makeAugmentEvalType(obj, evalType);
      } else if (line.match(/<\/AUGMENT:[ ](.*)>/i)) {
        var evalMode = 'none';
        var evalType = 'none';
      } else if (evalMode === 'augment auto') {
        obj.augmentDataAttach[evalType].push(line);
        obj.augmentDataDetach[evalType].push(this.reverseAugmentAutoLine(line));
      } else if (line.match(/<AUGMENT ATTACH:[ ](.*)>/i)) {
        var evalMode = 'augment attach';
        var evalType = String(RegExp.$1).toUpperCase().trim();
        this.makeAugmentEvalType(obj, evalType);
      } else if (line.match(/<\/AUGMENT ATTACH:[ ](.*)>/i)) {
        var evalMode = 'none';
        var evalType = 'none';
      } else if (evalMode === 'augment attach') {
        obj.augmentDataAttach[evalType].push(line);
      } else if (line.match(/<AUGMENT DETACH:[ ](.*)>/i)) {
        var evalMode = 'augment detach';
        var evalType = String(RegExp.$1).toUpperCase().trim();
        this.makeAugmentEvalType(obj, evalType);
      } else if (line.match(/<\/AUGMENT DETACH:[ ](.*)>/i)) {
        var evalMode = 'none';
        var evalType = 'none';
      } else if (evalMode === 'augment detach') {
        obj.augmentDataDetach[evalType].push(line);
      } else if (line.match(/<AUGMENT ATTACH EVAL:[ ](.*)>/i)) {
        var evalMode = 'augment eval attach';
        var evalType = String(RegExp.$1).toUpperCase().trim();
        this.makeAugmentEvalType(obj, evalType);
      } else if (line.match(/<\/AUGMENT ATTACH EVAL:[ ](.*)>/i)) {
        var evalMode = 'none';
        var evalType = 'none';
      } else if (evalMode === 'augment eval attach') {
        obj.augmentEvalAttach[evalType] += line + '\n';
      } else if (line.match(/<AUGMENT DETACH EVAL:[ ](.*)>/i)) {
        var evalMode = 'augment eval detach';
        var evalType = String(RegExp.$1).toUpperCase().trim();
        this.makeAugmentEvalType(obj, evalType);
      } else if (line.match(/<\/AUGMENT DETACH EVAL:[ ](.*)>/i)) {
        var evalMode = 'none';
        var evalType = 'none';
      } else if (evalMode === 'augment eval detach') {
        obj.augmentEvalDetach[evalType] += line + '\n';
      }
    }
  }
};

DataManager.reverseAugmentAutoLine = function(line) {
    if (line.match(/ADD[ ](.*):(.*)/i)) {
      var str1 = String(RegExp.$1);
      var str2 = String(RegExp.$2);
      return 'REMOVE ' + str1 + ':' + str2;
    } else if (line.match(/REMOVE[ ](.*):(.*)/i)) {
      var str1 = String(RegExp.$1);
      var str2 = String(RegExp.$2);
      return 'ADD ' + str1 + ':' + str2;
    } else if (line.match(/CHANGE[ ](.*):(.*)/i)) {
      var str1 = String(RegExp.$1);
      var str2 = String(RegExp.$2);
      return 'CANCEL ' + str1 + ':' + str2;
    } else if (line.match(/CANCEL[ ](.*):(.*)/i)) {
      var str1 = String(RegExp.$1);
      var str2 = String(RegExp.$2);
      return 'CHANGE ' + str1 + ':' + str2;
    } else if (line.match(/(.*):[ ]([\+\-]\d+)([%％])/i)) {
    //  var str = String(RegExp.$1);
    //  var value = parseInt(RegExp.$2) * -1;
    //  if (value > 0) value = '+' + value;
    //  return str + ': ' + value + '%';
      return line;
    } else if (line.match(/(.*):[ ]([\+\-]\d+)/i)) {
      var str = String(RegExp.$1);
      var value = parseInt(RegExp.$2) * -1;
      if (value > 0) value = '+' + value;
      return str + ': ' + value;
    }
    return line;
};

DataManager.makeAugmentEvalType = function(obj, evalType) {
    obj.nonIndependent = true;
    obj.augmentDataAttach[evalType] = obj.augmentDataAttach[evalType] || [];
    obj.augmentDataDetach[evalType] = obj.augmentDataDetach[evalType] || [];
    obj.augmentEvalAttach[evalType] = obj.augmentEvalAttach[evalType] || '';
    obj.augmentEvalDetach[evalType] = obj.augmentEvalDetach[evalType] || '';
    obj.augmentTypes.push(evalType);
};

//=============================================================================
// ItemManager
//=============================================================================

ItemManager.checkAugmentSlots = function(item) {
    if (DataManager.isItem(item)) return;
    if (item.augmentSlots === undefined) {
      var baseItem = DataManager.getBaseItem(item);
      item.augmentSlots = JsonEx.makeDeepCopy(baseItem.augmentSlots);
    }
    item.augmentSlotEnable = item.augmentSlotEnable || [];
    item.augmentSlotItems = item.augmentSlotItems || [];
    var length = item.augmentSlots.length;
    for (var i = 0; i < length; ++i) {
      if (item.augmentSlotEnable[i] === undefined) {
        item.augmentSlotEnable[i] = true;
      }
      if (item.augmentSlotItems[i] === undefined) {
        item.augmentSlotItems[i] = 'none';
      }
    }
};

ItemManager.applyAugmentEffects = function(item, effectItem, slotId, gain) {
    if (!item) return;
    gain = gain || 0;
    this.checkAugmentSlots(item);
    if (item.augmentSlotItems[slotId] !== 'none') {
      var augment = this.removeAugmentFromSlot(item, slotId);
      if (augment) $gameParty.gainItem(augment, gain);
    }
    this.installAugmentToSlot(item, effectItem, slotId);
    $gameParty.loseItem(effectItem, gain);
    this.augmentRefreshParty(item);
};

ItemManager.removeAugmentFromSlot = function(item, slotId) {
    $gameTemp._augmentSetting = 'detach';
    var type = item.augmentSlots[slotId].toUpperCase().trim();
    var augment = this.augmentInSlot(item, slotId);
    if (!augment) {
      $gameTemp._augmentSetting = undefined;
      return augment;
    }
    var list = augment.augmentDataDetach[type];
    if (list && list.length > 0)  {
      this.processAugmentList(item, augment, slotId, list);
    }
    var code = augment.augmentEvalDetach[type];
    this.processAugmentEval(code, item, augment, slotId);
    $gameTemp._augmentSetting = undefined;
    return augment;
};

ItemManager.removeAllAugments = function(item) {
    var augments = [];
    this.checkAugmentSlots(item);
    var length = item.augmentSlotItems.length;
    for (var i = 0; i < length; ++i) {
      var augment = this.removeAugmentFromSlot(item, i);
      augments.push(augment);
    }
    return augments;
};

ItemManager.installAugmentToSlot = function(item, effectItem, slotId) {
    $gameTemp._augmentSetting = 'attach';
    var type = item.augmentSlots[slotId].toUpperCase().trim();
    if (DataManager.isItem(effectItem)) {
      item.augmentSlotItems[slotId] = 'item ' + effectItem.id;
    } else if (DataManager.isWeapon(effectItem)) {
      item.augmentSlotItems[slotId] = 'weapon ' + effectItem.id;
    } else if (DataManager.isArmor(effectItem)) {
      item.augmentSlotItems[slotId] = 'armor ' + effectItem.id;
    } else if (effectItem === null) {
      item.augmentSlotItems[slotId] = 'none';
      $gameTemp._augmentSetting = undefined;
      return;
    }
    if (!effectItem) {
      $gameTemp._augmentSetting = undefined;
      return;
    }
    var list = effectItem.augmentDataAttach[type];
    if (list && list.length > 0) {
      this.processAugmentList(item, effectItem, slotId, list);
    }
    var code = effectItem.augmentEvalAttach[type];
    this.processAugmentEval(code, item, effectItem, slotId);
    $gameTemp._augmentSetting = undefined;
};

ItemManager.installAugments = function(item, augments) {
    this.checkAugmentSlots(item);
    var length = augments.length;
    for (var i = 0; i < length; ++i) {
      var augment = augments[i];
      this.installAugmentToSlot(item, augment, i);
    }
};

ItemManager.augmentInSlot = function(item, slotId) {
  var augment = item.augmentSlotItems[slotId];
  if (augment.match(/ITEM[ ](\d+)/i)) {
    var id = parseInt(RegExp.$1);
    var item = $dataItems[id];
    return item || null;
  } else if (augment.match(/WEAPON[ ](\d+)/i)) {
    var id = parseInt(RegExp.$1);
    var item = $dataWeapons[id];
    return item || null;
  } else if (augment.match(/ARMOR[ ](\d+)/i)) {
    var id = parseInt(RegExp.$1);
    var item = $dataArmors[id];
    return item || null;
  }
  return null;
};

ItemManager.augmentRefreshParty = function(item) {
    var length = $gameParty.allMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = $gameParty.allMembers()[i];
      if (member && member.equips().contains(item)) member.refresh();
    }
};

ItemManager.processAugmentList = function(item, effectItem, slotId, list) {
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var line = list[i];
    this.processAugmentEffect(line, item, effectItem, slotId);
  }
};

ItemManager.processAugmentEffect = function(line, mainItem, effectItem, slot) {
  // CANNOT DETACH
  if (line.match(/CANNOT DETACH/i)) {
    return this.applyAugmentCanotDetach(mainItem, slot);
  }
  // ADD ATTACK ELEMENT: x
  if (line.match(/ADD ATTACK ELEMENT:[ ](.*)/i)) {
    var element = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentAttackElement(mainItem, element, true);
  } else if (line.match(/REMOVE ATTACK ELEMENT:[ ](.*)/i)) {
    var element = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentAttackElement(mainItem, element, false);
  }
  // ADD ATTACK STATE: x
  if (line.match(/ADD ATTACK STATE:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentAttackState(mainItem, text, true);
  } else if (line.match(/REMOVE ATTACK STATE:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentAttackState(mainItem, text, false);
  }
  // ADD DEBUFF RATE: x
  if (line.match(/ADD DEBUFF:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentDebuff(mainItem, text, true);
  } else if (line.match(/REMOVE DEBUFF:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentDebuff(mainItem, text, false);
  }
  // ADD ELEMENT RATE: x
  if (line.match(/ADD ELEMENT RATE:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentElement(mainItem, text, true);
  } else if (line.match(/REMOVE ELEMENT RATE:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentElement(mainItem, text, false);
  }
  // ADD PASSIVE STATE: x
  if (Imported.YEP_AutoPassiveStates) {
    if (line.match(/ADD PASSIVE STATE:[ ](.*)/i)) {
      var text = String(RegExp.$1).toUpperCase().trim();
      return this.applyAugmentPassiveState(mainItem, text, true);
    } else if (line.match(/REMOVE PASSIVE STATE:[ ](.*)/i)) {
      var text = String(RegExp.$1).toUpperCase().trim();
      return this.applyAugmentPassiveState(mainItem, text, false);
    }
  }
  // ADD SKILL: x
  if (line.match(/ADD SKILL:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentSkill(mainItem, text, true);
  } else if (line.match(/REMOVE SKILL:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentSkill(mainItem, text, false);
  }
  // ADD SKILL TYPE: x
  if (line.match(/ADD SKILL TYPE:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentSkillType(mainItem, text, true);
  } else if (line.match(/ADD STYPE:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentSkillType(mainItem, text, true);
  } else if (line.match(/REMOVE SKILL TYPE:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentSkillType(mainItem, text, false);
  } else if (line.match(/REMOVE STYPE:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentSkillType(mainItem, text, false);
  }
  // ADD STATE RATE: x
  if (line.match(/ADD STATE RATE:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentStateRate(mainItem, text, true);
  } else if (line.match(/REMOVE STATE RATE:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentStateRate(mainItem, text, false);
  }
  // ADD STATE RESIST: x
  if (line.match(/ADD STATE RESIST:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentStateResist(mainItem, text, true);
  } else if (line.match(/REMOVE STATE RESIST:[ ](.*)/i)) {
    var text = String(RegExp.$1).toUpperCase().trim();
    return this.applyAugmentStateResist(mainItem, text, false);
  }
  // CHANGE BASE NAME: x
  if (line.match(/CHANGE BASE NAME:[ ](.*)/i)) {
    var text = String(RegExp.$1).trim();
    return this.applyAugmentSetBaseName(mainItem, text, slot, true);
  } else if (line.match(/CANCEL BASE NAME:[ ](.*)/i)) {
    var text = String(RegExp.$1).trim();
    return this.applyAugmentSetBaseName(mainItem, text, slot, false);
  }
  // CHANGE PREFIX: x
  if (line.match(/CHANGE PREFIX:[ ](.*)/i)) {
    var text = String(RegExp.$1).trim();
    return this.applyAugmentSetPrefix(mainItem, text, slot, true);
  } else if (line.match(/CANCEL PREFIX:[ ](.*)/i)) {
    var text = String(RegExp.$1).trim();
    return this.applyAugmentSetPrefix(mainItem, text, slot, false);
  }
  // CHANGE SUFFIX: x
  if (line.match(/CHANGE SUFFIX:[ ](.*)/i)) {
    var text = String(RegExp.$1).trim();
    return this.applyAugmentSetSuffix(mainItem, text, slot, true);
  } else if (line.match(/CANCEL SUFFIX:[ ](.*)/i)) {
    var text = String(RegExp.$1).trim();
    return this.applyAugmentSetSuffix(mainItem, text, slot, false);
  }
  // CHANGE PRIORITY NAME: x
  if (line.match(/CHANGE PRIORITY NAME:[ ](.*)/i)) {
    var text = String(RegExp.$1).trim();
    return this.applyAugmentSetPriorityName(mainItem, text, slot, true);
  } else if (line.match(/CANCEL PRIORITY NAME:[ ](.*)/i)) {
    var text = String(RegExp.$1).trim();
    return this.applyAugmentSetPriorityName(mainItem, text, slot, false);
  }
  // CHANGE ICON: x
  if (line.match(/CHANGE ICON:[ ](\d+)/i)) {
    var icon = parseInt(RegExp.$1);
    return this.applyAugmentSetIcon(mainItem, icon, slot, true);
  } else if (line.match(/CANCEL ICON:[ ](\d+)/i)) {
    var icon = parseInt(RegExp.$1);
    return this.applyAugmentSetIcon(mainItem, icon, slot, false);
  }
  // CHANGE TEXT COLOR: x
  if (line.match(/CHANGE TEXT COLOR:[ ](\d+)/i)) {
    var color = parseInt(RegExp.$1);
    return this.applyAugmentSetTextColor(mainItem, color, slot, true);
  } else if (line.match(/CANCEL TEXT COLOR:[ ](\d+)/i)) {
    var color = parseInt(RegExp.$1);
    return this.applyAugmentSetTextColor(mainItem, color, slot, false);
  }
  // PARAM: +/-X%
  if (line.match(/(.*):[ ]([\+\-]\d+)([%％])/i)) {
    var param = String(RegExp.$1).toUpperCase().trim();
    var value = parseFloat(RegExp.$2);
    return this.applyAugmentParamRate(mainItem, param, value);
  }
  // PARAM: +/-X
  if (line.match(/(.*):[ ]([\+\-]\d+)/i)) {
    var param = String(RegExp.$1).toUpperCase().trim();
    var value = parseInt(RegExp.$2);
    return this.applyAugmentParamPlus(mainItem, param, value);
  }
};

ItemManager.adjustItemTrait = function(mainItem, code, dataId, value, add) {
    if (add) {
      this.addTraitToItem(mainItem, code, dataId, value);
    } else {
      this.deleteTraitFromItem(mainItem, code, dataId, value);
    }
};

ItemManager.addTraitToItem = function(mainItem, code, dataId, value) {
    var trait = {
      code: code,
      dataId: dataId,
      value: value
    }
    mainItem.traits.push(trait);
};

ItemManager.deleteTraitFromItem = function(mainItem, code, dataId, value) {
    var index = this.getMatchingTraitIndex(mainItem, code, dataId, value);
    if (index >= 0) mainItem.traits.splice(index, 1);
};

ItemManager.getMatchingTraitIndex = function(mainItem, code, dataId, value) {
  var i = mainItem.traits.length;
  while (i--) {
    var trait = mainItem.traits[i];
    if (trait.code !== code) continue;
    if (trait.dataId !== dataId) continue;
    if (trait.value !== value) continue;
    return i;
  }
  return i;
}

ItemManager.applyAugmentCanotDetach = function(mainItem, slotId) {
    mainItem.augmentSlotEnable[slotId] = false;
};

ItemManager.applyAugmentAttackElement = function(mainItem, element, add) {
    if (element.match(/(\d+)/i)) {
      var id = parseInt(RegExp.$1);
    } else {
      var id = Yanfly.ElementIdRef[element];
      if (!id) return;
    }
    var code = Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
    this.adjustItemTrait(mainItem, code, id, 0, add);
};

ItemManager.applyAugmentAttackState = function(mainItem, text, add) {
    if (text.match(/(\d+),[ ](\d+)([%％])/i)) {
      var id = parseInt(RegExp.$1);
      var rate = parseFloat(RegExp.$2) * 0.01;
    } else if (text.match(/(.*),[ ](\d+)([%％])/i)) {
      var name = String(RegExp.$1);
      var rate = parseFloat(RegExp.$2) * 0.01;
      var id = Yanfly.StateIdRef[name];
      if (!id) return;
    } else if (text.match(/(\d+)/i)) {
      var id = parseInt(RegExp.$1);
      var rate = 1.0;
    } else {
      var id = Yanfly.StateIdRef[text];
      if (!id) return;
      var rate = 1.0;
    }
    var code = Game_BattlerBase.TRAIT_ATTACK_STATE;
    this.adjustItemTrait(mainItem, code, id, rate, add);
};

ItemManager.applyAugmentDebuff = function(mainItem, element, add) {
    if (text.match(/(.*),[ ](\d+)([%％])/i)) {
      var param = String(RegExp.$1);
      var rate = parseFloat(RegExp.$2) * 0.01;
      if (!id) return;
    } else if (text.match(/(.*),[ ]([\+\-]\d+)([%％])/i)) {
      var add = $gameTemp._augmentSetting === 'attach';
      var name = String(RegExp.$1);
      var rate = parseFloat(RegExp.$2) * 0.01;
      rate += 1;
    } else {
      return;
    }
    if (['MAXHP', 'MHP', 'MAX HP', 'HP'].contains(param)) {
      var paramId = 0;
    } else if (['MAXMP', 'MMP', 'MAX MP', 'MP'].contains(param)) {
      var paramId = 1;
    } else if (['ATK', 'STR'].contains(param)) {
      var paramId = 2;
    } else if (['DEF'].contains(param)) {
      var paramId = 3;
    } else if (['MAT', 'INT', 'SPI'].contains(param)) {
      var paramId = 4;
    } else if (['MDF', 'RES'].contains(param)) {
      var paramId = 5;
    } else if (['AGI', 'SPD'].contains(param)) {
      var paramId = 6;
    } else if (['LUK'].contains(param)) {
      var paramId = 7;
    } else {
      return;
    }
    var code = Game_BattlerBase.TRAIT_DEBUFF_RATE;
    this.adjustItemTrait(mainItem, code, paramId, rate, add);
};

ItemManager.applyAugmentElement = function(mainItem, text, add) {
    if (text.match(/(\d+),[ ](\d+)([%％])/i)) {
      var id = parseInt(RegExp.$1);
      var rate = parseFloat(RegExp.$2) * 0.01;
    } else if (text.match(/(.*),[ ](\d+)([%％])/i)) {
      var name = String(RegExp.$1);
      var rate = parseFloat(RegExp.$2) * 0.01;
      var id = Yanfly.ElementIdRef[name];
      if (!id) return;
    } else if (text.match(/(\d+),[ ]([\+\-]\d+)([%％])/i)) {
      var add = $gameTemp._augmentSetting === 'attach';
      var id = parseInt(RegExp.$1);
      var rate = parseFloat(RegExp.$2) * 0.01;
      rate += 1;
    } else if (text.match(/(.*),[ ]([\+\-]\d+)([%％])/i)) {
      var add = $gameTemp._augmentSetting === 'attach';
      var name = String(RegExp.$1);
      var id = Yanfly.ElementIdRef[name];
      var rate = parseFloat(RegExp.$2) * 0.01;
      rate += 1;
    } else {
      return;
    }
    var code = Game_BattlerBase.TRAIT_ELEMENT_RATE;
    this.adjustItemTrait(mainItem, code, id, rate, add);
};

ItemManager.applyAugmentPassiveState = function(mainItem, text, add) {
    if (text.match(/(\d+)/i)) {
      var id = parseInt(RegExp.$1);
    } else {
      var id = Yanfly.StateIdRef[text];
      if (!id) return;
    }
    mainItem.passiveStates = mainItem.passiveStates || [];
    if (add) {
      mainItem.passiveStates.push(id);
    } else {
      var index = mainItem.passiveStates.indexOf(id);
      if (index >= 0) mainItem.passiveStates.splice(index, 1);
    }
};

ItemManager.applyAugmentSkill = function(mainItem, text, add) {
    if (text.match(/(\d+)/i)) {
      var id = parseInt(RegExp.$1);
    } else {
      var id = Yanfly.SkillIdRef[text];
      if (!id) return;
    }
    var code = Game_BattlerBase.TRAIT_SKILL_ADD;
    this.adjustItemTrait(mainItem, code, id, 1, add);
};

ItemManager.applyAugmentSkillType = function(mainItem, text, add) {
    if (text.match(/(\d+)/i)) {
      var id = parseInt(RegExp.$1);
    } else {
      var id = Yanfly.STypeIdRef[text];
      if (!id) return;
    }
    var code = Game_BattlerBase.TRAIT_STYPE_ADD;
    this.adjustItemTrait(mainItem, code, id, 1, add);
};

ItemManager.applyAugmentStateRate = function(mainItem, text, add) {
    if (text.match(/(\d+),[ ](\d+)([%％])/i)) {
      var id = parseInt(RegExp.$1);
      var rate = parseFloat(RegExp.$2) * 0.01;
    } else if (text.match(/(.*),[ ](\d+)([%％])/i)) {
      var name = String(RegExp.$1);
      var rate = parseFloat(RegExp.$2) * 0.01;
      var id = Yanfly.StateIdRef[name];
      if (!id) return;
    } else if (text.match(/(\d+),[ ]([\+\-]\d+)([%％])/i)) {
      var add = $gameTemp._augmentSetting === 'attach';
      var id = parseInt(RegExp.$1);
      var rate = parseFloat(RegExp.$2) * 0.01;
      rate += 1;
    } else if (text.match(/(.*),[ ]([\+\-]\d+)([%％])/i)) {
      var add = $gameTemp._augmentSetting === 'attach';
      var name = String(RegExp.$1);
      var id = Yanfly.StateIdRef[name];
      var rate = parseFloat(RegExp.$2) * 0.01;
      rate += 1;
    } else {
      return;
    }
    var code = Game_BattlerBase.TRAIT_STATE_RATE;
    this.adjustItemTrait(mainItem, code, id, rate, add);
};

ItemManager.getAugmentFirstValue = function(array, def) {
    var length = array.length;
    for (var i = 0; i < length; ++i) {
      var item = array[i];
      if (item === null) continue;
      if (item !== undefined) return item;
    }
    return def;
};

ItemManager.applyAugmentStateResist = function(mainItem, text, add) {
    if (text.match(/(\d+)/i)) {
      var id = parseInt(RegExp.$1);
    } else {
      var id = Yanfly.StateIdRef[text];
      if (!id) return;
    }
    var code = Game_BattlerBase.TRAIT_STATE_RESIST;
    this.adjustItemTrait(mainItem, code, id, 1, add);
};

ItemManager.applyAugmentSetBaseName = function(mainItem, text, slot, add) {
    mainItem.augmentBaseNames = mainItem.augmentBaseNames || [];
    if (add) {
      mainItem.augmentBaseNames[slot] = text;
    } else {
      mainItem.augmentBaseNames[slot] = undefined;
    }
    var baseName = DataManager.getBaseItem(mainItem).name;
    var name = this.getAugmentFirstValue(mainItem.augmentBaseNames, baseName);
    this.setBaseName(mainItem, name);
    this.updateItemName(mainItem);
};

ItemManager.applyAugmentSetPrefix = function(mainItem, text, slot, add) {
    mainItem.augmentPrefixes = mainItem.augmentPrefixes || [];
    if (add) {
      mainItem.augmentPrefixes[slot] = text;
    } else {
      mainItem.augmentPrefixes[slot] = undefined;
    }
    var name = this.getAugmentFirstValue(mainItem.augmentPrefixes, '');
    this.setNamePrefix(mainItem, name);
    this.updateItemName(mainItem);
};

ItemManager.applyAugmentSetSuffix = function(mainItem, text, slot, add) {
    mainItem.augmentSuffixes = mainItem.augmentSuffixes || [];
    if (add) {
      mainItem.augmentSuffixes[slot] = text;
    } else {
      mainItem.augmentSuffixes[slot] = undefined;
    }
    var name = this.getAugmentFirstValue(mainItem.augmentSuffixes, '');
    this.setNameSuffix(mainItem, name);
    this.updateItemName(mainItem);
};

ItemManager.applyAugmentSetPriorityName = function(mainItem, text, slot, add) {
    mainItem.augmentPriorityNames = mainItem.augmentPriorityNames || [];
    if (add) {
      mainItem.augmentPriorityNames[slot] = text;
    } else {
      mainItem.augmentPriorityNames[slot] = undefined;
    }
    var name = this.getAugmentFirstValue(mainItem.augmentPriorityNames, '');
    this.setPriorityName(mainItem, name);
    this.updateItemName(mainItem);
};

ItemManager.applyAugmentSetIcon = function(mainItem, icon, slot, add) {
    mainItem.augmentIcons = mainItem.augmentIcons || [];
    if (add) {
      mainItem.augmentIcons[slot] = icon;
    } else {
      mainItem.augmentIcons[slot] = undefined;
    }
    var baseIcon = DataManager.getBaseItem(mainItem).iconIndex;
    var id = this.getAugmentFirstValue(mainItem.augmentIcons, baseIcon);
    mainItem.iconIndex = id;
};

ItemManager.applyAugmentSetTextColor = function(mainItem, color, slot, add) {
    mainItem.augmentTextColor = mainItem.augmentTextColor || [];
    if (add) {
      mainItem.augmentTextColor[slot] = color;
    } else {
      mainItem.augmentTextColor[slot] = undefined;
    }
    var id = this.getAugmentFirstValue(mainItem.augmentTextColor, 0);
    mainItem.textColor = id;
};

Yanfly.Param.AugmentXParams = 
  ['HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'];
Yanfly.Param.AugmentSParams = 
  ['TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'];

ItemManager.applyAugmentParamRate = function(mainItem, param, value) {
  var add = $gameTemp._augmentSetting === 'attach';
  value = parseFloat(value * 0.01);
  var rate = value + 1;
  if (['MAXHP', 'MHP', 'MAX HP', 'HP'].contains(param)) {
    var code = Game_BattlerBase.TRAIT_PARAM;
    var id = 0;
  } else if (['MAXMP', 'MMP', 'MAX MP', 'MP'].contains(param)) {
    var code = Game_BattlerBase.TRAIT_PARAM;
    var id = 1;
  } else if (['ATK', 'STR'].contains(param)) {
    var code = Game_BattlerBase.TRAIT_PARAM;
    var id = 2;
  } else if (['DEF'].contains(param)) {
    var code = Game_BattlerBase.TRAIT_PARAM;
    var id = 3;
  } else if (['MAT', 'INT', 'SPI'].contains(param)) {
    var code = Game_BattlerBase.TRAIT_PARAM;
    var id = 4;
  } else if (['MDF', 'RES'].contains(param)) {
    var code = Game_BattlerBase.TRAIT_PARAM;
    var id = 5;
  } else if (['AGI', 'SPD'].contains(param)) {
    var code = Game_BattlerBase.TRAIT_PARAM;
    var id = 6;
  } else if (['LUK'].contains(param)) {
    var code = Game_BattlerBase.TRAIT_PARAM;
    var id = 7;
  } else if (Yanfly.Param.AugmentXParams.contains(param)) {
    var code = Game_BattlerBase.TRAIT_XPARAM;
    var id = Yanfly.Param.AugmentXParams.indexOf(param);
    rate -= 1;
  } else if (Yanfly.Param.AugmentSParams.contains(param)) {
    var code = Game_BattlerBase.TRAIT_SPARAM;
    var id = Yanfly.Param.AugmentSParams.indexOf(param);
  } else {
    return;
  }
  this.adjustItemTrait(mainItem, code, id, rate, add);
};

ItemManager.applyAugmentParamPlus = function(mainItem, param, value) {
  if (['MAXHP', 'MHP', 'MAX HP', 'HP'].contains(param)) {
    var paramId = 0;
  } else if (['MAXMP', 'MMP', 'MAX MP', 'MP'].contains(param)) {
    var paramId = 1;
  } else if (['ATK', 'STR'].contains(param)) {
    var paramId = 2;
  } else if (['DEF'].contains(param)) {
    var paramId = 3;
  } else if (['MAT', 'INT', 'SPI'].contains(param)) {
    var paramId = 4;
  } else if (['MDF', 'RES'].contains(param)) {
    var paramId = 5;
  } else if (['AGI', 'SPD'].contains(param)) {
    var paramId = 6;
  } else if (['LUK'].contains(param)) {
    var paramId = 7;
  } else if (['PRICE', 'COST'].contains(param)) {
    mainItem.price += value;
    return;
  } else if (['BOOST'].contains(param)) {
    mainItem.boostCount += value;
    this.updateItemName(mainItem);
    return;
  } else {
    return;
  }
  mainItem.params[paramId] += value;
};

ItemManager.processAugmentEval = function(code, item, effectItem, slotId) {
    if (code === '') return;
    var mainItem = item;
    var weapon = item;
    var armor = item;
    var baseItem = DataManager.getBaseItem(item);
    var baseWeapon = baseItem;
    var baseArmor = baseArmor;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(code);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Augment.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.Augment.Game_System_initialize.call(this);
    this.initAugments();
};

Game_System.prototype.initAugments = function() {
    this._augmentsEnabled = Yanfly.Param.AugmentEnable;
    this._augmentsShow = Yanfly.Param.AugmentShow;
};

Game_System.prototype.isAugmentEnabled = function() {
    if (this._augmentsEnabled === undefined) this.initAugments();
    return this._augmentsEnabled;
};

Game_System.prototype.setAugmentEnable = function(value) {
    if (this._augmentsEnabled === undefined) this.initAugments();
    this._augmentsEnabled = value;
};

Game_System.prototype.isAugmentShown = function() {
    if (this._augmentsShow === undefined) this.initAugments();
    return this._augmentsShow;
};

Game_System.prototype.setAugmentShow = function(value) {
    if (this._augmentsShow === undefined) this.initAugments();
    this._augmentsShow = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Augment.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Augment.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'EnableAugments') $gameSystem.setAugmentEnable(true);
  if (command === 'DisableAugments') $gameSystem.setAugmentEnable(false);
  if (command === 'ShowAugments') $gameSystem.setAugmentShow(true);
  if (command === 'HideAugments') $gameSystem.setAugmentShow(false);
};

//=============================================================================
// Window_ItemInfo
//=============================================================================

if (Yanfly.Param.AugmentShow) {

Yanfly.Augment.Window_ItemInfo_drawItemInfoF =
    Window_ItemInfo.prototype.drawItemInfoF;
Window_ItemInfo.prototype.drawItemInfoF = function(dy) {
    dy = Yanfly.Augment.Window_ItemInfo_drawItemInfoF.call(this, dy);
    dy = this.drawAugmentInfo(dy);
    return dy;
};

Window_ItemInfo.prototype.drawAugmentInfo = function(dy) {
  if (!$gameSystem.isAugmentShown()) return dy;
  var item = this._item;
  var baseItem = DataManager.getBaseItem(item);
  if (!DataManager.isIndependent(item)) return dy;
  if (DataManager.isItem(item)) return dy;
  if (Yanfly.Param.AugmentInfoTitle !== '') {
    this.resetFontSettings();
    this.changePaintOpacity(true);
    this.changeTextColor(this.systemColor());
    var align = Yanfly.Param.AugmentInfoAlign;
    this.drawText(Yanfly.Param.AugmentInfoTitle, this.textPadding(), dy,
      this.contentsWidth() - this.textPadding() * 2, align);
    this.resetFontSettings();
    dy += this.lineHeight();
  }
  ItemManager.checkAugmentSlots(item);
  var length = item.augmentSlotItems.length;
  for (var i = 0; i < length; ++i) {
    this.drawAugmentData(i, dy);
    dy += this.lineHeight();
  }
  return dy;
};

Window_ItemInfo.prototype.drawAugmentData = function(slot, dy) {
    var text = this._item.augmentSlotItems[slot];
    if (text.match(/NONE/i)) {
      text = Yanfly.Param.AugmentNoneText;
    } else if (text.match(/ITEM[ ](\d+)/i)) {
      var id = parseInt(RegExp.$1);
      var item = $dataItems[id];
      if (item) {
        text = '\\i[' + item.iconIndex + ']' + item.name;
      } else {
        text = Yanfly.Param.AugmentNoneText;
      }
    } else if (text.match(/WEAPON[ ](\d+)/i)) {
      var id = parseInt(RegExp.$1);
      var item = $dataWeapons[id];
      if (item) {
        text = '\\i[' + item.iconIndex + ']' + item.name;
      } else {
        text = Yanfly.Param.AugmentNoneText;
      }
    } else if (text.match(/ARMOR[ ](\d+)/i)) {
      var id = parseInt(RegExp.$1);
      var item = $dataArmors[id];
      if (item) {
        text = '\\i[' + item.iconIndex + ']' + item.name;
      } else {
        text = Yanfly.Param.AugmentNoneText;
      }
    }
    this.drawTextEx(text, this.textPadding(), dy);
};

}; // Yanfly.Param.AugmentShow

//=============================================================================
// Window_ItemActionCommand
//=============================================================================

Yanfly.Augment.Window_ItemActionCommand_addCustomCommandsF =
    Window_ItemActionCommand.prototype.addCustomCommandsF;
Window_ItemActionCommand.prototype.addCustomCommandsF = function() {
  Yanfly.Augment.Window_ItemActionCommand_addCustomCommandsF.call(this);
  if (this.isAugmentable()) this.addAugmentSlots();
};

Window_ItemActionCommand.prototype.isAugmentable = function() {
    if (!$gameSystem.isAugmentEnabled()) return false;
    if (DataManager.isItem(this._item)) return false;
    return DataManager.isIndependent(this._item);
};

Window_ItemActionCommand.prototype.addAugmentSlots = function() {
    ItemManager.checkAugmentSlots(this._item);
    var length = this._item.augmentSlots.length;
    for (var i = 0; i < length; ++i) {
      var enabled = this._item.augmentSlotEnable[i];
      var fmt = Yanfly.Param.AugmentSlotFmt;
      var slot = this._item.augmentSlots[i];
      var name = this.getAugmentSlotItemName(i);
      var text = fmt.format(slot, name);
      this.addCommand(text, 'augment', enabled, i);
    }
    this.changePaintOpacity(true);
};

Window_ItemActionCommand.prototype.getAugmentSlotItemName = function(slot) {
    var str = this._item.augmentSlotItems[slot];
    if (str.match(/NONE/i)) {
      return Yanfly.Param.AugmentNoneText;
    } else if (str.match(/ITEM[ ](\d+)/i)) {
      var id = parseInt(RegExp.$1);
      var item = $dataItems[id];
      if (item) {
        return '\\i[' + item.iconIndex + ']' + item.name;
      } else {
        this._item.augmentSlotItems[slot] = 'none';
        return Yanfly.Param.AugmentNoneText;
      }
    } else if (str.match(/WEAPON[ ](\d+)/i)) {
      var id = parseInt(RegExp.$1);
      var item = $dataWeapons[id];
      if (item) {
        return '\\i[' + item.iconIndex + ']' + item.name;
      } else {
        this._item.augmentSlotItems[slot] = 'none';
        return Yanfly.Param.AugmentNoneText;
      }
    } else if (str.match(/ARMOR[ ](\d+)/i)) {
      var id = parseInt(RegExp.$1);
      var item = $dataArmors[id];
      if (item) {
        return '\\i[' + item.iconIndex + ']' + item.name;
      } else {
        this._item.augmentSlotItems[slot] = 'none';
        return Yanfly.Param.AugmentNoneText;
      }
    }
};

//=============================================================================
// Window_AugmentItemList
//=============================================================================

function Window_AugmentItemList() {
    this.initialize.apply(this, arguments);
}

Window_AugmentItemList.prototype = Object.create(Window_ItemList.prototype);
Window_AugmentItemList.prototype.constructor = Window_AugmentItemList;

Window_AugmentItemList.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this._slotId = -1;
    this.hide();
    this.deactivate();
};

Window_AugmentItemList.prototype.setItem = function(item, slotId) {
    if (this._item === item && this._slotId === slotId) return;
    ItemManager.checkAugmentSlots(item);
    this._item = item;
    this._slotId = slotId;
    this.refresh();
    this.select(0);
};

Window_AugmentItemList.prototype.includes = function(item) {
    if (!item) return false;
    if (DataManager.isIndependent(item)) return false;
    if (!this.containsType(item)) return false;
    return true;
};

Window_AugmentItemList.prototype.containsType = function(item) {
    if (!this._item) return false;
    var type = this._item.augmentSlots[this._slotId].toUpperCase().trim();
    return item.augmentTypes.contains(type);
};

Window_AugmentItemList.prototype.isEnabled = function(item) {
    if (item === null) return true;
    return true;
};

Window_AugmentItemList.prototype.selectLast = function() {
};

Window_AugmentItemList.prototype.playOkSound = function() {
    SoundManager.playEquip();
};

Window_AugmentItemList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
      return this.includes(item);
    }, this);
    if (this._item && this._item.augmentSlotItems[this._slotId] !== 'none') {
      this._data.unshift(null);
    }
};

Window_AugmentItemList.prototype.drawItem = function(index) {
    if (this._data[index] === null) this.drawEmptyIcon(index);
    Window_ItemList.prototype.drawItem.call(this, index);
};

Window_AugmentItemList.prototype.drawEmptyIcon = function(index) {
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(true);
    var text = Yanfly.Param.AugmentRemoveText;
    this.drawTextEx(text, rect.x, rect.y);
};

//=============================================================================
// Scene_Item
//=============================================================================

Yanfly.Augment.Scene_Item_createItemWindow = 
  Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function() {
  Yanfly.Augment.Scene_Item_createItemWindow.call(this);
  this.createAugmentListWindow();
};

Yanfly.Augment.Scene_Item_createActionWindow =
    Scene_Item.prototype.createActionWindow;
Scene_Item.prototype.createActionWindow = function() {
  Yanfly.Augment.Scene_Item_createActionWindow.call(this);
  this._itemActionWindow.setHandler('augment', this.onActionAugment.bind(this));
};

Scene_Item.prototype.createAugmentListWindow = function() {
    var wy = this._itemWindow.y;
    var ww = this._itemWindow.width;
    var wh = this._itemWindow.height;
    this._augmentListWindow = new Window_AugmentItemList(0, wy, ww, wh);
    this._augmentListWindow.setHelpWindow(this._helpWindow);
    this._augmentListWindow.setHandler('ok', this.onAugmentListOk.bind(this));
    this._augmentListWindow.setHandler('cancel',
      this.onAugmentListCancel.bind(this));
    this.addWindow(this._augmentListWindow);
};

Scene_Item.prototype.onActionAugment = function() {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    this._augmentListWindow.show();
    this._augmentListWindow.activate();
    var slotId = this._itemActionWindow.currentExt();
    this._augmentListWindow.setItem(this.item(), slotId);
};

Scene_Item.prototype.onAugmentListOk = function() {
    var effectItem = this._augmentListWindow.item();
    var slotId = this._itemActionWindow.currentExt();
    ItemManager.applyAugmentEffects(this.item(), effectItem, slotId, 1);
    this._augmentListWindow.refresh();
    this._augmentListWindow.activate();
    this._statusWindow.refresh();
    this._infoWindow.refresh();
    this._itemWindow.refresh();
    this._itemActionWindow.refresh();
    var index = this._augmentListWindow.index();
    this.onAugmentListCancel();
};

Scene_Item.prototype.onAugmentListCancel = function() {
    this._augmentListWindow.hide();
    this._augmentListWindow.deactivate();
    this._itemActionWindow.show();
    this._itemActionWindow.activate();
    this._helpWindow.setItem(this.item());
    this._augmentListWindow.select(0);
};

//=============================================================================
// End of File
//=============================================================================
};