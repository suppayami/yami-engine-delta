//=============================================================================
// Yanfly Engine Plugins - Base Parameter Extension - Class Base Parameters
// YEP_X_ClassBaseParam.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ClassBaseParam = true;

var Yanfly = Yanfly || {};
Yanfly.CBP = Yanfly.CBP || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 (Requires YEP_BaseParamControl) Allow you to use
 * formulas for class parameter growth.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_BaseParamControl. Make sure this plugin is located
 * under YEP_BaseParamControl in the plugin list.
 *
 * For those who don't like the way base parameters are determined by the
 * editor, you can use your own formulas to determine the parameter growth for
 * each class using this plugin. This plugin also allows you to adjust the exp
 * needed for each level per class.
 *
 * ============================================================================
 * Lunatic Mode - Custom Class Parameters
 * ============================================================================
 *
 * If your formulas are short and simple, you can use this notetag to cover the
 * entire formula list for all of the base parameters:
 *
 * Class Notetag:
 *
 *   <Custom Class Parameters>
 *    maxhp = level * 30 + 300;
 *    maxmp = level * 20 + 150;
 *    atk = level * 15 + 15;
 *    def = level * 11 + 16;
 *    mat = level * 12 + 14;
 *    mdf = level * 10 + 13;
 *    agi = level * 14 + 15;
 *    luk = level * 13 + 12;
 *    exp = level * 100;
 *   </Custom Class Parameters>
 *   The 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi', 'luk', and 'exp'.
 *   variables each refer to their own individual stats. The 'level' variable
 *   refers to the actor's current level. The formula can be made any way you
 *   like as long as it returns a legal number.
 *   * Note: The 'exp' stat here refers to the amount of exp needed to reach
 *   the next level.
 *
 * ============================================================================
 * Lunatic Mode - Detailed Custom Parameter Formulas
 * ============================================================================
 *
 * For those who wish to put a bit more detail in calculating the formula for
 * each stat, you can use the following notetag setup:
 *
 * Class Notetags:
 *
 *   <Custom Param Formula>
 *    if (this.name() === 'Harold') {
 *      value = level * 30 + 300;
 *    } else {
 *      value = level * 25 + 250;
 *    }
 *   </Custom Param Formula>
 *   Replace 'Param' with 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi',
 *   'luk', or 'exp'. The 'value' variable is the final result that's returned
 *   to count as the base class parameter. The 'level' variable refers to the
 *   actor's current level. The formula can be made any way you like as long as
 *   it returns a legal number.
 *   * Note: The 'exp' stat here refers to the amount of exp needed to reach
 *   the next level.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Fixed a bug that caused the <Custom Param Formula> notetag to not work.
 *
 * Version 1.01:
 * - Fixed a bug that caused errors on loading up a game with the EXP formula.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BaseParamControl) {

//=============================================================================
// DataManager
//=============================================================================

Yanfly.CBP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.CBP.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ClassBaseParam) {
    this.processCBPNotetags1($dataClasses);
    Yanfly._loaded_YEP_X_ClassBaseParam = true;
  }
  
  return true;
};

DataManager.processCBPNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.baseParamFormula = [
      '', '', '', '', '', '', '', '', ''
    ];
    var evalMode = 'none';
    var paramId = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<CUSTOM[ ](.*)[ ]FORMULA>/i)) {
        var param = String(RegExp.$1).toUpperCase().trim();
        if (['MHP', 'MAX HP', 'MAXHP', 'HP'].contains(param)) {
          paramId = 0;
        } else if (['MMP', 'MAX MP', 'MAXMP', 'MP'].contains(param)) {
          paramId = 1;
        } else if (['ATK', 'STR'].contains(param)) {
          paramId = 2;
        } else if (['DEF'].contains(param)) {
          paramId = 3;
        } else if (['MAT', 'INT', 'SPI'].contains(param)) {
          paramId = 4;
        } else if (['MDF', 'RES'].contains(param)) {
          paramId = 5;
        } else if (['AGI', 'SPD'].contains(param)) {
          paramId = 6;
        } else if (['LUK'].contains(param)) {
          paramId = 7;
        } else if (['EXP'].contains(param)) {
          paramId = 8;
        } else {
          continue;
        }
        evalMode = 'custom class param formula';
      } else if (line.match(/<\/CUSTOM[ ](.*)[ ]FORMULA>/i)) {
        paramId = 0;
        evalMode = 'none'
      } else if (evalMode === 'custom class param formula') {
        obj.baseParamFormula[paramId] += line + '\n';
      } else if (line.match(/<CUSTOM CLASS PARAMETERS>/i)) {
        evalMode = 'custom class parameters';
      } else if (line.match(/<\/CUSTOM CLASS PARAMETERS>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom class parameters') {
        if (line.match(/(?:MHP|MAX HP|MAXHP|HP)[ ]=[ ](.*)/i)) {
          var code = 'mhp = ' + String(RegExp.$1).trim();
          paramId = 0;
        } else if (line.match(/(?:MMP|MAX MP|MAXMP|MP)[ ]=[ ](.*)/i)) {
          var code = 'mmp = ' + String(RegExp.$1).trim();
          paramId = 1;
        } else if (line.match(/(?:MSP|MAX SP|MAXSP|SP)[ ]=[ ](.*)/i)) {
          var code = 'mmp = ' + String(RegExp.$1).trim();
          paramId = 1;
        } else if (line.match(/(?:ATK|STR)[ ]=[ ](.*)/i)) {
          var code = 'atk = ' + String(RegExp.$1).trim();
          paramId = 2;
        } else if (line.match(/(?:DEF)[ ]=[ ](.*)/i)) {
          var code = 'def = ' + String(RegExp.$1).trim();
          paramId = 3;
        } else if (line.match(/(?:MAT|INT|SPI)[ ]=[ ](.*)/i)) {
          var code = 'mat = ' + String(RegExp.$1).trim();
          paramId = 4;
        } else if (line.match(/(?:MDF|RES)[ ]=[ ](.*)/i)) {
          var code = 'mdf = ' + String(RegExp.$1).trim();
          paramId = 5;
        } else if (line.match(/(?:AGI|SPD)[ ]=[ ](.*)/i)) {
          var code = 'agi = ' + String(RegExp.$1).trim();
          paramId = 6;
        } else if (line.match(/(?:LUK)[ ]=[ ](.*)/i)) {
          var code = 'luk = ' + String(RegExp.$1).trim();
          paramId = 7;
        } else if (line.match(/(?:EXP)[ ]=[ ](.*)/i)) {
          var code = 'exp = ' + String(RegExp.$1).trim();
          paramId = 8;
        } else {
          continue;
        }
        obj.baseParamFormula[paramId] += code + '\n';
      }
    }
  }
};

//=============================================================================
// MainCode
//=============================================================================

Yanfly.CBP.Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
    if (this.currentClass().baseParamFormula[paramId] !== '') {
      var formula = this.currentClass().baseParamFormula[paramId];
      return this.classBaseParamFormula(formula, paramId);
    }
    return Yanfly.CBP.Game_Actor_paramBase.call(this, paramId);
};

Game_Actor.prototype.classBaseParamFormula = function(formula, paramId, level) {
  var value = 0; var hp = 0; var mp = 0; level = level || this.level;
  var maxhp = 0; var mhp = 0;
  var maxmp = 0; var mmp = 0; var sp = 0; var maxsp = 0; var msp = 0;
  var atk = 0; var str = 0;
  var def = 0;
  var mat = 0; var int = 0; var spi = 0;
  var mdf = 0; var res = 0;
  var agi = 0; var spd = 0;
  var luk = 0;
  var exp = 0;
  var a = this;
  var b = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  eval(formula);
  switch (paramId) {
  case 0:
    value += hp + maxhp + mhp;
    break;
  case 1:
    value += mp + maxmp + mmp + sp + maxsp + msp;
    break;
  case 2:
    value += atk + str;
    break;
  case 3:
    value += def;
    break;
  case 4:
    value += mat + int + spi;
    break;
  case 5:
    value += mdf + res;
    break;
  case 6:
    value += agi + spd;
    break;
  case 7:
    value += luk;
    break;
  case 8:
    value += exp;
    break;
  }
  return value;
};

Yanfly.CBP.Game_Actor_expForLevel = Game_Actor.prototype.expForLevel;
Game_Actor.prototype.expForLevel = function(level) {
  if (this.currentClass().baseParamFormula[8] !== '' && level > 1) {
    var formula = this.currentClass().baseParamFormula[8];
    value = Math.round(this.classBaseParamFormula(formula, 8, level - 1));
    return Math.max(value, 1);
  }
  return Yanfly.CBP.Game_Actor_expForLevel.call(this, level);
};

//=============================================================================
// End of File
//=============================================================================
}; // Imported.YEP_BaseParamControl