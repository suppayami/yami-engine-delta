//=============================================================================
// Yanfly Engine Plugins - Element Core
// YEP_ElementCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ElementCore = true;

var Yanfly = Yanfly || {};
Yanfly.Ele = Yanfly.Ele || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 Manage the way elements work in this game from
 * absorbing elements, reflecting elements, and more!
 * @author Yanfly Engine Plugins
 *
 * @param Multi-Element Rulings
 * @desc If a skill/item has multiple elements, then use these rules:
 * 0 - Lowest; 1 - Add; 2 - Multiply; 3 - Highest; 4 - Average
 * @default 2
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Elemental control in RPG Maker MV is pretty lacking. The calculation of how
 * multiple elements are handled aren't very clear nor are they too intuitive
 * when it comes to certain aspects. This plugin also gives way to skills and
 * items having more than one element, battlers being able to absorb, reflect,
 * amplify elemental damage, and more!
 *
 * * Note: If you are using the Battle Engine Core, place this plugin under the
 * Battle Engine Core in the plugin list for additional features.
 *
 * * Note: If you are using the Damage Core, place this plugin underneath the
 * Damage Core plugin in the list for maximum compatibility.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Use these notetags if you wish to modify various aspects of elements for
 * your database objects.
 *
 * Skill and Item Notetags
 *
 *   <Bypass Element Reflect>
 *   - Allows this skill/item to ignore elemental reflect properties. This will
 *   not bypass reflect properties as a whole, however.
 *
 *   <Multiple Elements: x>
 *   <Multiple Elements: x to y>
 *   <Multiple Elements: x, x, x>
 *   <Multiple Elements: name, name, name>
 *   - This adds elements x (or name) to the skill/item in addition to the
 *   skill/item's current element. Skills and items with multiple elements will
 *   follow the Multi-Element Rule when calculating damage rate. Insert more of
 *   this notetag to insert more elements.
 *
 *   <Multi-Element Rule: Lowest>
 *   <Multi-Element Rule: Add>
 *   <Multi-Element Rule: Multiply>
 *   <Multi-Element Rule: Highest>
 *   <Multi-Element Rule: Average>
 *   - This allows you to set the rule for this skill/item if it has multiple
 *   elements. Either the lowest rate, the additive sum of all rates, the
 *   multiplicative product of all rates, or the highest rate will be used. If
 *   average is used, it will be the average of all element rates.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Element Absorb: x>
 *   <Element Absorb: x, x, x>
 *   <Element Absorb: name>
 *   <Element Absorb: name, name, name>
 *   - Causes element x to be absorbed and heals the battler. When an element
 *   is absorbed, the rate goes down by 200% instead of being just an inverse.
 *   This is so that battlers that are originally resistant to the element will
 *   absorb more of the element while battlers that are originally vulnerable
 *   to the element will absorb less of the element. The minimum amount
 *   absorbed is 0.01%.
 *
 *   <Element Reflect x: +y%>
 *   <Element Reflect x: -y%>
 *   <Element Reflect name: +y%>
 *   <Element Reflect name: -y%>
 *   - Increases or decreases the rate to reflect element x by y%. If a skill
 *   or item has multiple elements, the reflect rate is added for each element
 *   used by the skill/item.
 *
 *   <Element Magnify x: +y%>
 *   <Element Magnify x: -y%>
 *   <Element Magnify name: +y%>
 *   <Element Magnify name: -y%>
 *   - If the user performs a skill or item that utilizes element x (or name),
 *   increase or decrease its damage by y%. If a skill or item has multiple
 *   elements, the rate is increased additively for each element and adjusted
 *   multiplicatively with base rate. This bottoms out at 0%.
 *
 *   <Element Amplify x: +y%>
 *   <Element Amplify x: -y%>
 *   <Element Amplify name: +y%>
 *   <Element Amplify name: -y%>
 *   - If the user performs a skill or item that utilizes element x (or name),
 *   increase or decrease its damage by y%. If a skill or item has multiple
 *   elements, the rate is increased additively for each element and adjusted
 *   additively for base rate.
 *
 *   <Element Null>
 *   - This will cause the battler to not have elemental attacks when using
 *   skills and items. However, this will not bypass the 'Force Element' action
 *   sequence effect.
 *
 *   <Force Element x Rate: y%>
 *   <Force Element name Rate: y%>
 *   - This forces the battler's elemental rate for x (or named) to be y%. This
 *   will work in a priority setting of states (highest priority to lowest),
 *   equips (first to last), then class, then actor/enemy if more than one
 *   notetag is used for the same element. If y is negative, the element is
 *   absorbed.
 *
 * ============================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ============================================================================
 *
 * If you have YEP_BattleEngineCore.js installed with this plugin located
 * underneath it in the Plugin Manager, you can make use of these extra
 * damage related action sequences.
 *
 *=============================================================================
 * ADD ELEMENT: X
 * ADD ELEMENT: X, X, X
 * ADD ELEMENT: NAME
 * ADD ELEMENT: NAME, NAME, NAME
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will add more elements to the currently existing elements. This will
 * not include forced elements.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: add element: 4
 *                add element: 5, 6, 7
 *                add element: fire
 *                add element: ice, wind, water
 *=============================================================================
 *
 *=============================================================================
 * CLEAR ELEMENT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will clear any ___ Element action sequence settings and revert element
 * calculation back to normal.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: clear element
 *=============================================================================
 *
 *=============================================================================
 * FORCE ELEMENT: X
 * FORCE ELEMENT: X, X, X
 * FORCE ELEMENT: NAME
 * FORCE ELEMENT: NAME, NAME, NAME
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will override elemental settings for elemental damage rate calculations
 * except for customized calculations that aim at specific elements.  This will
 * ignore all other elements.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: force element: 4
 *                force element: 5, 6, 7
 *                force element: fire
 *                force element: ice, wind, water
 *=============================================================================
 *
 *=============================================================================
 * NULL ELEMENT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will force the elements to null. Calculated elemental damage will
 * always return neutral rate. Using this will clear the Force Element action
 * sequence effect.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: null element
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Added <Element x Magnify: +y%>, <Element x Magnify: -y%> notetags. These
 * notetags different from the Amplify counterparts in a way where the Amplify
 * notetags will shift the element rate additively. These will alter the rate
 * multiplicatively.
 *
 * Version 1.01:
 * - Optimized element rate calculation where if no elements are present, then
 * damage rate will default to 100%.
 *
  * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ElementCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EleMultiRule = Number(Yanfly.Parameters['Multi-Element Rulings']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Ele.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Ele.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_ElementCore) {
    this.processElementNotetagsSys($dataSystem);
    this.processElementNotetags1($dataSkills);
    this.processElementNotetags1($dataItems);
    this.processElementNotetags2($dataActors);
    this.processElementNotetags2($dataClasses);
    this.processElementNotetags2($dataEnemies);
    this.processElementNotetags2($dataWeapons);
    this.processElementNotetags2($dataArmors);
    this.processElementNotetags2($dataStates);
    Yanfly._loaded_YEP_ElementCore = true;
  }
  
  return true;
};

DataManager.processElementNotetagsSys = function(group) {
  Yanfly.ElementIdRef = {};
  for (var i = 1; i < group.elements.length; ++i) {
    var name = group.elements[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, '');
    Yanfly.ElementIdRef[name] = i;
  }
};

DataManager.processElementNotetags1 = function(group) {
  var noteA1 = /<MULTIPLE ELEMENTS:[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var noteA2 = /<MULTIPLE ELEMENTS:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var noteA3 = /<MULTIPLE ELEMENTS:[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.elementMultiRule = Yanfly.Param.EleMultiRule;
    obj.multipleElements = [];
    obj.bypassElementReflect = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<MULTI-ELEMENT RULE:[ ]LOWEST>/i)) {
        obj.elementMultiRule = 0;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]ADD>/i)) {
        obj.elementMultiRule = 1;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]MULTIPLY>/i)) {
        obj.elementMultiRule = 2;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]HIGHEST>/i)) {
        obj.elementMultiRule = 3;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]AVERAGE>/i)) {
        obj.elementMultiRule = 4;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ](.*)>/i)) {
        obj.elementMultiRule = String(RegExp.$1);
      } else if (line.match(noteA1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.multipleElements = obj.multipleElements.concat(array);
      } else if (line.match(noteA2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.multipleElements = obj.multipleElements.concat(range);
      } else if (line.match(noteA3)) {
        var text = String(RegExp.$1);
        var array = text.split(',');
        var length = array.length;
        for (var j = 0; j < length; ++j) {
          var name = array[j].toUpperCase().trim();
          if (Yanfly.ElementIdRef[name]) {
            var id = Yanfly.ElementIdRef[name];
            obj.multipleElements.push(id);
          }
        }
      } else if (line.match(/<(?:BYPASS ELEMENT REFLECT)>/i)) {
        obj.bypassElementReflect = true;
      }
    }
  }
};

DataManager.processElementNotetags2 = function(group) {
  var noteA1 = /<(?:ELEMENT ABSORB):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var noteB1 = /<(?:ELEMENT REFLECT)[ ](\d+):[ ]([\+\-]\d+)([%％])>/i;
  var noteB2 = /<(?:ELEMENT REFLECT)[ ](.*):[ ]([\+\-]\d+)([%％])>/i;
  var noteC1 = /<(?:ELEMENT AMPLIFY)[ ](\d+):[ ]([\+\-]\d+)([%％])>/i;
  var noteC2 = /<(?:ELEMENT AMPLIFY)[ ](.*):[ ]([\+\-]\d+)([%％])>/i;
  var noteC3 = /<(?:ELEMENT MAGNIFY)[ ](\d+):[ ]([\+\-]\d+)([%％])>/i;
  var noteC4 = /<(?:ELEMENT MAGNIFY)[ ](.*):[ ]([\+\-]\d+)([%％])>/i;
  var noteD1 = /<FORCE ELEMENT[ ](\d+)[ ]RATE:[ ](\d+)([%％])>/i;
  var noteD2 = /<FORCE ELEMENT[ ](\d+)[ ]RATE:[ ]-(\d+)([%％])>/i;
  var noteD3 = /<FORCE ELEMENT[ ](.*)[ ]RATE:[ ](\d+)([%％])>/i;
  var noteD4 = /<FORCE ELEMENT[ ](.*)[ ]RATE:[ ]-(\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.elementAbsorb = [];
    obj.elementReflect = {};
    obj.elementAmplify = {};
    obj.elementMagnify = {};
    obj.elementNull = false;
    obj.elementForcedRate = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:ELEMENT ABSORB):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.elementAbsorb = obj.elementAbsorb.concat(array);
      } else if (line.match(noteA1)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.elementAbsorb = obj.elementAbsorb.concat(range);
      } else if (line.match(/<(?:ELEMENT ABSORB):[ ](.*)>/i)) {
        var text = String(RegExp.$1);
        var array = text.split(',');
        var length = array.length;
        for (var j = 0; j < length; ++j) {
          var name = array[j].toUpperCase().trim();
          if (Yanfly.ElementIdRef[name]) {
            var id = Yanfly.ElementIdRef[name];
            obj.elementAbsorb.push(id);
          }
        }
      } else if (line.match(noteB1)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementReflect[elementId] = rate;
      } else if (line.match(noteB2)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementReflect[id] = rate;
        }
      } else if (line.match(noteC1)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementAmplify[elementId] = rate;
      } else if (line.match(noteC2)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementAmplify[id] = rate;
        }
      } else if (line.match(noteC3)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementMagnify[elementId] = rate;
      } else if (line.match(noteC4)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementMagnify[id] = rate;
        }
      } else if (line.match(/<(?:ELEMENT NULL)>/i)) {
        obj.elementNull = true;
      } else if (line.match(noteD1)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementForcedRate[elementId] = rate;
      } else if (line.match(noteD2)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementForcedRate[elementId] = rate * -1;
      } else if (line.match(noteD3)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementForcedRate[id] = rate;
        }
      } else if (line.match(noteD4)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementForcedRate[id] = rate * -1;
        }
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

Yanfly.Ele.BattleManager_processActionSequence =
    BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // ADD ELEMENT: X
  if (actionName === 'ADD ELEMENT') {
    return this.actionAddElement(actionArgs);
  }
  // CLEAR ELEMENT
  if (actionName === 'CLEAR ELEMENT') {
    return this.actionClearElement();
  }
  // FORCE ELEMENT: X
  if (actionName === 'FORCE ELEMENT') {
    return this.actionForceElement(actionArgs);
  }
  // FORCE ELEMENT
  if (actionName === 'NULL ELEMENT') {
    return this.actionNullElement();
  }
  return Yanfly.Ele.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.actionAddElement = function(actionArgs) {
    if (!actionArgs) return;
    var array = [];
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var ele = actionArgs[i].toUpperCase().trim();
      if (ele.match(/(\d+)/i)) {
        array.push(parseInt(RegExp.$1));
      } else if (Yanfly.ElementIdRef[ele]) {
        array.push(Yanfly.ElementIdRef[ele]);
      }
    }
    $gameTemp._addedElements = array;
    return true;
};

BattleManager.actionClearElement = function() {
    $gameTemp._addedElements = undefined;
    $gameTemp._forcedElements = undefined;
    return true;
};

BattleManager.actionForceElement = function(actionArgs) {
    if (!actionArgs) return;
    var array = [];
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var ele = actionArgs[i].toUpperCase().trim();
      if (ele.match(/(\d+)/i)) {
        array.push(parseInt(RegExp.$1));
      } else if (Yanfly.ElementIdRef[ele]) {
        array.push(Yanfly.ElementIdRef[ele]);
      }
    }
    $gameTemp._forcedElements = array;
    return true;
};

BattleManager.actionNullElement = function() {
    $gameTemp._forcedElements = [];
    return true;
};

}; // Imported.YEP_BattleEngineCore

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.Ele.Game_BtlrBase_elementRate =
    Game_BattlerBase.prototype.elementRate;
Game_BattlerBase.prototype.elementRate = function(elementId) {
  var rate = this.forcedElementRate(elementId);
  if (rate !== undefined) return rate;
  var result = Yanfly.Ele.Game_BtlrBase_elementRate.call(this, elementId);
  if (this.isAbsorbElement(elementId) && result > 0) {
    result = Math.min(result - 2.0, -0.01);
  }
  return result;
};

Game_BattlerBase.prototype.getObjElementReflectRate = function(obj, elementId) {
  if (!obj) return 0;
  if (!obj.elementReflect) return 0;
  return obj.elementReflect[elementId] || 0;
};

Game_BattlerBase.prototype.getObjElementAmplifyRate = function(obj, elementId) {
  if (!obj) return 0;
  if (!obj.elementAmplify) return 0;
  return obj.elementAmplify[elementId] || 0;
};

Game_BattlerBase.prototype.getObjElementMagnifyRate = function(obj, elementId) {
  if (!obj) return 0;
  if (!obj.elementMagnify) return 0;
  return obj.elementMagnify[elementId] || 0;
};

Game_BattlerBase.prototype.getObjElementForcedRate = function(obj, elementId) {
  if (!obj) return undefined;
  if (!obj.elementForcedRate) return undefined;
  return obj.elementForcedRate[elementId] || undefined;
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.isAbsorbElement = function(elementId) {
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var state = this.states()[i];
    if (!state) continue;
    if (!state.elementAbsorb) continue;
    if (state.elementAbsorb.contains(elementId)) return true;
  }
  return false;
};

Game_Battler.prototype.elementReflectRate = function(elementId) {
  var rate = 0;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    rate += this.getObjElementReflectRate(obj, elementId);
  }
  return rate;
};

Game_Battler.prototype.elementAmplifyRate = function(elementId) {
  var rate = 0;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    rate += this.getObjElementAmplifyRate(obj, elementId);
  }
  return rate;
};

Game_Battler.prototype.elementMagnifyRate = function(elementId) {
  var rate = 1;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    rate += this.getObjElementMagnifyRate(obj, elementId);
  }
  return rate;
};

Game_Battler.prototype.isNullElement = function() {
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var state = this.states()[i];
    if (state && state.elementNull) return true;
  }
  return false;
};

Game_Battler.prototype.forcedElementRate = function(elementId) {
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var state = this.states()[i];
    var rate = this.getObjElementForcedRate(state, elementId);
    if (rate !== undefined) return rate;
  }
  return undefined;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.isAbsorbElement = function(elementId) {
  if (this.actor().elementAbsorb.contains(elementId)) return true;
  if (this.currentClass().elementAbsorb.contains(elementId)) return true;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    if (!equip) continue;
    if (!equip.elementAbsorb) continue;
    if (equip.elementAbsorb.contains(elementId)) return true;
  }
  return Game_Battler.prototype.isAbsorbElement.call(this, elementId);
};

Game_Actor.prototype.elementReflectRate = function(elementId) {
  var rate = Game_Battler.prototype.elementReflectRate.call(this, elementId);
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    rate += this.getObjElementReflectRate(obj, elementId);
  }
  rate += this.getObjElementReflectRate(this.actor(), elementId);
  rate += this.getObjElementReflectRate(this.currentClass(), elementId);
  return rate;
};

Game_Actor.prototype.elementAmplifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementAmplifyRate.call(this, elementId);
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    rate += this.getObjElementAmplifyRate(obj, elementId);
  }
  rate += this.getObjElementAmplifyRate(this.actor(), elementId);
  rate += this.getObjElementAmplifyRate(this.currentClass(), elementId);
  return rate;
};

Game_Actor.prototype.elementMagnifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementMagnifyRate.call(this, elementId);
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    rate += this.getObjElementMagnifyRate(obj, elementId);
  }
  rate += this.getObjElementMagnifyRate(this.actor(), elementId);
  rate += this.getObjElementMagnifyRate(this.currentClass(), elementId);
  return rate;
};

Game_Actor.prototype.isNullElement = function() {
  if (this.actor().elementNull) return true;
  if (this.currentClass().elementNull) return true;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.elementNull) return true;
  }
  return Game_Battler.prototype.isNullElement.call(this);
};

Game_Actor.prototype.forcedElementRate = function(elementId) {
  var rate = Game_Battler.prototype.forcedElementRate.call(this, elementId);
  if (rate !== undefined) return rate;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    rate = this.getObjElementForcedRate(equip, elementId);
    if (rate !== undefined) return rate;
  }
  rate = this.getObjElementForcedRate(this.currentClass(), elementId);
  if (rate !== undefined) return rate;
  rate = this.getObjElementForcedRate(this.actor(), elementId);
  if (rate !== undefined) return rate;
  return undefined;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.isAbsorbElement = function(elementId) {
  if (this.enemy().elementAbsorb.contains(elementId)) return true;
  return Game_Battler.prototype.isAbsorbElement.call(this, elementId);
};

Game_Enemy.prototype.elementReflectRate = function(elementId) {
  var rate = Game_Battler.prototype.elementReflectRate.call(this, elementId);
  rate += this.getObjElementReflectRate(this.enemy(), elementId);
  return rate;
};

Game_Enemy.prototype.elementAmplifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementAmplifyRate.call(this, elementId);
  rate += this.getObjElementAmplifyRate(this.enemy(), elementId);
  return rate;
};

Game_Enemy.prototype.elementMagnifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementMagnifyRate.call(this, elementId);
  rate += this.getObjElementMagnifyRate(this.enemy(), elementId);
  return rate;
};

Game_Enemy.prototype.isNullElement = function() {
  if (this.enemy().elementNull) return true;
  return Game_Battler.prototype.isNullElement.call(this);
};

Game_Enemy.prototype.forcedElementRate = function(elementId) {
  var rate = Game_Battler.prototype.forcedElementRate.call(this, elementId);
  if (rate !== undefined) return rate;
  rate = this.getObjElementForcedRate(this.enemy(), elementId);
  if (rate !== undefined) return rate;
  return undefined;
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.getItemElements = function() {
  if ($gameTemp._forcedElements !== undefined) {
    return $gameTemp._forcedElements.filter(Yanfly.Util.onlyUnique);
  }
  if (this.subject().isNullElement()) return [];
  var elements = [];
  if (this.item().damage.elementId < 0) {
    Yanfly.Util.extend(elements, this.subject().attackElements());
  } else if (this.item().damage.elementId > 0) {
    elements.push(this.item().damage.elementId);
  }
  Yanfly.Util.extend(elements, this.item().multipleElements);
  if ($gameTemp._addedElements !== undefined) {
    Yanfly.Util.extend(elements, $gameTemp._addedElements);
  }
  return elements.filter(Yanfly.Util.onlyUnique);
};

Game_Action.prototype.calcElementRate = function(target) {
  if (!this.item()) return 1;
  var finalRate;
  var elements = this.getItemElements();
  if (elements.length < 1) return 1.00;
  var rule = this.item().elementMultiRule;
  var average = 0;
  while (elements.length > 0) {
    var elementId = elements.shift();
    var eleRate = target.elementRate(elementId);
    eleRate *= Math.max(0, this.subject().elementMagnifyRate(elementId));
    var absorbed = eleRate < 0;
    eleRate += this.subject().elementAmplifyRate(elementId);
    if (rule === 0) { // Lowest Rate
      finalRate = finalRate || eleRate;
      finalRate = Math.min(finalRate, eleRate);
    } else if (rule === 1) { // Additive
      finalRate = finalRate || 1.00;
      eleRate -= 1.00;
      finalRate += eleRate;
    } else if (rule === 2) { // Multiplicative
      finalRate = finalRate || 1.00;
      finalRate *= Math.abs(eleRate);
      if (eleRate < 0) finalRate = Math.abs(finalRate) * -1;
    } else if (rule === 3) { // Highest
      finalRate = finalRate || eleRate;
      finalRate = Math.max(finalRate, eleRate);
    } else if (rule === 4) { // Average
      finalRate = finalRate || 0;
      finalRate += eleRate;
      average += 1;
    } else {
      finalRate = this.calcElementRateRule(target, elementId, finalRate,
        eleRate, rule);
    }
  }
  if (rule === 4) finalRate /= Math.max(1, average);
  if (finalRate === undefined) finalRate = 1.00;
  return finalRate;
};

Game_Action.prototype.calcElementRateRule = function(target, elementId,
finalRate, eleRate, rule) {
  return finalRate;
};

Yanfly.Ele.Game_Action_itemMrf = Game_Action.prototype.itemMrf;
Game_Action.prototype.itemMrf = function(target) {
  var rate = Yanfly.Ele.Game_Action_itemMrf.call(this, target);
  if (this.item().bypassElementReflect) return rate;
  var elements = this.getItemElements();
  while (elements.length > 0) {
    var elementId = elements.shift();
    rate += target.elementReflectRate(elementId);
  }
  return rate;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.extend = function (mainArray, otherArray) {
    otherArray.forEach(function(i) {
      mainArray.push(i)
    }, this);
}

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
