//=============================================================================
// Yanfly Engine Plugins - Core Engine
// YEP_CoreEngine.js
// Last Updated: 2015.08.01
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_CoreEngine"] = true;

//=============================================================================
/*:
 * @plugindesc Needed for the majority of Yanfly Engine Scripts. Also contains
 * bug fixes found inherently in RPG Maker.
 * @author Yanfly Engine Plugins
 *
 * @param ---Screen---
 * @default
 *
 * @param Screen Width
 * @desc Adjusts the width of the screen.                           .
 * Default: 816
 * @default 816
 *
 * @param Screen Height
 * @desc Adjusts the height of the screen.                          .
 * Default: 624
 * @default 624
 *
 * @param Reposition Battlers
 * @desc Allow the plugin to reposition battlers to fit resolution?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Eventing---
 * @desc
 *
 * @param Flexible Variables
 * @desc Game Variables are no longer restricted to just integers.  .
 * OFF - false     ON - true
 * @default true
 *
 * @param ---Gold---
 * @desc
 *
 * @param Gold Max
 * @desc The maximum amount of gold the player can have.            .
 * Default: 99999999
 * @default 99999999999999
 *
 * @param Gold Font Size
 * @desc The font size used to display gold.                        .
 * Default: 28
 * @default 20
 *
 * @param Gold Icon
 * @desc This will be the icon used to represent gold in the gold
 * window. If left at 0, no icon will be displayed.
 * @default 297
 *
 * @param Gold Overlap
 * @desc This will be what's displayed when the gold number exceeds
 * the allocated area's content size.
 * @default A lotta
 *
 * @param ---Items---
 * @desc
 *
 * @param Default Max
 * @desc This is the maximum number of items a player can hold.     .
 * Default: 99
 * @default 9999
 *
 * @param Quantity Text Size
 * @desc This is the text's font size used for the item quantity.   .
 * Default: 28
 * @default 20
 *
 * @param ---Stats---
 * @default
 *
 * @param Max Level
 * @desc Adjusts the maximum level limit for actors.                .
 * Default: 99
 * @default 9999
 *
 * @param Actor MaxHP
 * @desc Adjusts the maximum HP limit for actors.                   .
 * Default: 9999
 * @default 99999999999999
 *
 * @param Actor MaxMP
 * @desc Adjusts the maximum MP limit for actors.                   .
 * Default: 9999
 * @default 99999999999999
 *
 * @param Actor Parameter
 * @desc Adjusts the maximum parameter limit for actors.            .
 * Default: 999
 * @default 99999999999999
 *
 * @param Enemy MaxHP
 * @desc Adjusts the maximum HP limit for enemies.                  .
 * Default: 999999
 * @default 99999999999999
 *
 * @param Enemy MaxMP
 * @desc Adjusts the maximum MP limit for enemies.                  .
 * Default: 9999
 * @default 99999999999999
 *
 * @param Enemy Parameter
 * @desc Adjusts the maximum parameter limit for enemies.           .
 * Default: 999
 * @default 99999999999999
 *
 * @param ---Battle---
 * @desc
 *
 * @param Animation Rate
 * @desc Adjusts the rate of battle animations. Lower for faster.   .
 * Default: 4
 * @default 4
 *
 * @param Flash Target
 * @desc If an enemy is targeted, it flashes or it can whiten.      .
 * OFF - false     ON - true
 * @default false
 *
 * @param ---Font---
 * @desc
 *
 * @param Chinese Font
 * @desc Default font(s) used for a Chinese RPG.                    .
 * Default: SimHei, Heiti TC, sans-serif
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Korean Font
 * @desc Default font(s) used for a Korean RPG.                     .
 * Default: Dotum, AppleGothic, sans-serif
 * @default Dotum, AppleGothic, sans-serif
 *
 * @param Default Font
 * @desc Default font(s) used for everything else.                  .
 * Default: GameFont
 * @default GameFont
 *
 * @param Font Size
 * @desc Default font size used for windows.                        .
 * Default: 28
 * @default 28
 *
 * @param ---Windows---
 * @default
 *
 * @param Digit Grouping
 * @desc Groups together digits with a comma.                       .
 * false - OFF     true - ON
 * @default true
 *
 * @param Line Height
 * @desc Adjusts universal line height used in Windows.             .
 * Default: 36
 * @default 36
 *
 * @param Icon Width
 * @desc Adjusts the width of your icons.                           .
 * Default: 32
 * @default 32
 *
 * @param Icon Height
 * @desc Adjusts the height of your icons.                          .
 * Default: 32
 * @default 32
 *
 * @param Face Width
 * @desc Adjusts the width of actors' faces.                        .
 * Default: 144
 * @default 144
 *
 * @param Face Height
 * @desc Adjusts the height of actors' faces.                       .
 * Default: 144
 * @default 144
 *
 * @param Window Padding
 * @desc Adjusts the padding for all standard windows.              .
 * Default: 18
 * @default 18
 *
 * @param Text Padding
 * @desc Adjusts the padding for text inside of windows.            .
 * Default: 6
 * @default 6
 *
 * @param Window Opacity
 * @desc Adjusts the background opacity for windows.                .
 * Default: 192
 * @default 192
 *
 * @param Gauge Outline
 * @desc Enable outlines for gauges.                                .
 * false - OFF     true - ON
 * @default true
 *
 * @param Gauge Height
 * @desc Sets the height for gauges.                                .
 * Default: 6
 * @default 18
 *
 * @param Menu TP Bar
 * @desc Draws a TP bar in the menu status for actors.              .
 * false - OFF     true - ON
 * @default true
 *
 * @param ---Window Colors---
 * @default
 *
 * @param Color: Normal
 * @desc Changes the text color for Windows.                        .
 * Default: 0
 * @default 0
 *
 * @param Color: System
 * @desc Changes the text color for Windows.                        .
 * Default: 16
 * @default 16
 *
 * @param Color: Crisis
 * @desc Changes the text color for Windows.                        .
 * Default: 17
 * @default 17
 *
 * @param Color: Death
 * @desc Changes the text color for Windows.                        .
 * Default: 18
 * @default 18
 *
 * @param Color: Gauge Back
 * @desc Changes the text color for Windows.                        .
 * Default: 19
 * @default 19
 *
 * @param Color: HP Gauge 1
 * @desc Changes the text color for Windows.                        .
 * Default: 20
 * @default 20
 *
 * @param Color: HP Gauge 2
 * @desc Changes the text color for Windows.                        .
 * Default: 21
 * @default 21
 *
 * @param Color: MP Gauge 1
 * @desc Changes the text color for Windows.                        .
 * Default: 22
 * @default 22
 *
 * @param Color: MP Gauge 2
 * @desc Changes the text color for Windows.                        .
 * Default: 23
 * @default 23
 *
 * @param Color: MP Cost
 * @desc Changes the text color for Windows.                        .
 * Default: 23
 * @default 23
 *
 * @param Color: Power Up
 * @desc Changes the text color for Windows.                        .
 * Default: 24
 * @default 24
 *
 * @param Color: Power Down
 * @desc Changes the text color for Windows.                        .
 * Default: 25
 * @default 25
 *
 * @param Color: TP Gauge 1
 * @desc Changes the text color for Windows.                        .
 * Default: 28
 * @default 28
 *
 * @param Color: TP Gauge 2
 * @desc Changes the text color for Windows.                        .
 * Default: 29
 * @default 29
 *
 * @param Color: TP Cost Color
 * @desc Changes the text color for Windows.                        .
 * Default: 29
 * @default 29
 *
 * @help
 * Just place this on top of all the other Yanfly Engine Plugins.
 * Adjust any parameters as you see fit.
 *
 * ============================================================================
 *
 * This plugin fixes a few bugs found present within RPG Maker MV. Of them are
 * the following:
 *
 * Animation Overlay
 *   When a skill/item that targets multiple enemies at once using a fullscreen
 *   animation, it will overlay multiple times causing the image to look
 *   distorted by a series of overlayed effects.
 *
 * Screen Tearing
 *   When moving slowly, the tiles on the screen tear. While it's not
 *   noticeable on all systems, slower computers will definitely show it.
 *
 * ============================================================================
 *
 * Gold
 * You can use the plugin commands to add or remove gold more than the
 * editor's 9,999,999 limit. You can also place notetags into items, weapons,
 * and armors to over the 999,999 cost limit.
 *
 * Plugin Command:
 *   GainGold 1234567890       # Party gains 1234567890 gold.
 *   LoseGold 9876543210       # Party loses 9876543210 gold.
 *
 * Item, Weapon, Armor Notetags
 *   <Price: x>
 *   Changes the price of the item to x. This notetag allows you to bypass the
 *   editor's 999,999 gold cost limit.
 *
 * Enemy Notetag
 *   <Gold: x>
 *   Changes the gold drop value of enemies to x. This notetag allows you to
 *   bypass the editor's 9,999,999 gold drop limit.
 *
 * ============================================================================
 *
 * Items
 * Change the parameters to reflect the maximum number of items a player can
 * hold per item. If you wish to make individual items have different max
 * values, use the following notetag:
 *
 * Item, Weapon, Armor Notetag:
 *   <Max Item: x>
 *   This changes the maximum amount of the item to x.
 *
 * ============================================================================
 *
 * Stats
 * Even with the parameter limits raised, the editor is still confined to RPG
 * Maker MV's default limits. To break past them, use the following notetags
 * to allow further control over the individual aspects for the parameters.
 *
 * Actor Notetag
 *   <Initial Level: x>
 *   Changes the actor's initial level to x. This allows you to bypass the
 *   editor's level 99 limit.
 *
 *   <Max Level: x>
 *   Changes the actor's max level to x. This allows you to bypass the editor's
 *   level 99 limit.
 *
 * Class Skill Learn Notetag
 *   <Learn at Level: x>
 *   When placed inside a class's "Skills to Learn" notetag, this will cause
 *   the class to learn the skill at level x.
 *
 * Weapon and Armor Notetags
 *   <stat: +x>
 *   <stat: -x>
 *   Allows the piece of weapon or armor to gain or lose x amount of stat.
 *   Replace "stat" with "hp", "mp", "atk", "def", "mat", "mdf", "agi", or
 *   "luk" to alter that specific stat. This allows the piece of equipment
 *   to go past the editor's default limitation.
 *
 * Enemy Notetags
 *   <stat: x>
 *   This changes the enemy's stat to x amount. Replace "stat" with "hp",
 *   "mp", "atk", "def", "mat", "mdf", "agi", or "luk" to alter that
 *   specific stat. This allows the piece of equipment to go past the
 *   editor's default limitation.
 *
 *   <exp: x>
 *   This changes the enemy's exp given out to x amount. This allows the
 *   enemy give out more exp than the editor's default 9,999,999 limit.
 *
 * ============================================================================
 *
 * ChangeLog:
 *   2015.08.01 - Adjusting resolution size also now adjusts window size.
 *   2015.07.30 - Combined Core Engine with Higher Parameters, Higher Item, and
 *                Higher Gold Limit plugins.
 *   2015.07.16 - Added Flexible Variables parameter.
 *   2015.07.15 - Fixed Screen Tearing.
 *   2015.07.10 - Completed.
 */
//=============================================================================

//=============================================================================
// Number
//=============================================================================

var parameters = PluginManager.parameters('YEP_CoreEngine');
var _yep_DigitGroup = String(parameters['Digit Grouping'] || 'true');

toGroup = function(inVal) {
    if (typeof inVal !== 'string') { inVal = String(inVal); }
    if (!eval(_yep_DigitGroup)) {
            return inVal;
    }
    var arrWhole = inVal.split(".");
    var arrTheNumber = arrWhole[0].split("").reverse();
    var newNum = Array();
    for(var i=0; i<arrTheNumber.length; i++){
        newNum[newNum.length] = ((i%3===2) && (i<arrTheNumber.length-1)) ? "," +
            arrTheNumber[i]: arrTheNumber[i];
    }
    var returnNum = newNum.reverse().join("");
    if(arrWhole[1]){
    returnNum += "." + arrWhole[1];
    }
    return returnNum;
};

//=============================================================================
// Bitmap
//=============================================================================

var _yep_DefaultFont = String(parameters['Default Font'] || 'GameFont');

var _YEP_CoreEngine_Bitmap_init = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
    _YEP_CoreEngine_Bitmap_init.call(this, width, height);
    this.fontFace = _yep_DefaultFont;
}

//=============================================================================
// DataManager
//=============================================================================

var _YEP_CORE_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    _YEP_CORE_Scene_Boot_start.call(this);
    DataManager.processCORENotetags1($dataItems);
  DataManager.processCORENotetags1($dataWeapons);
  DataManager.processCORENotetags1($dataArmors);
    DataManager.processCORENotetags2($dataEnemies);
    DataManager.processCORENotetags3($dataActors);
    DataManager.processCORENotetags4($dataClasses);
};

var _yep_core_maxItem = Number(parameters['Default Max'] || 99);
DataManager.processCORENotetags1 = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        obj.maxItem = _yep_core_maxItem;

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:PRICE|price):[ ](\d+)>/i)) {
        obj.price = parseInt(RegExp.$1);
            } else if (line.match(/<(?:MAX ITEM|max item):[ ](\d+)>/i)) {
        obj.maxItem = Math.max(1, parseInt(RegExp.$1));
            } else if (line.match(/<(.*):[ ]*([\+\-]\d+)>/i)) {
        var stat = String(RegExp.$1).toUpperCase();
                var value = parseInt(RegExp.$2);
                switch (stat) {
                    case 'HP' || 'MAXHP' || 'MAX HP':
                        obj.params[0] = value;
                        break;
                    case 'MP' || 'MAXMP' || 'MAX MP' || 'SP' || 'MAXSP' || 'MAX SP':
                        obj.params[1] = value;
                        break;
                    case 'ATK' || 'STR':
                        obj.params[2] = value;
                        break;
                    case 'DEF':
                        obj.params[3] = value;
                        break;
                    case 'MAT' || 'INT' || 'SPI':
                        obj.params[4] = value;
                        break;
                    case 'MDF' || 'RES':
                        obj.params[5] = value;
                        break;
                    case 'AGI' || 'SPD':
                        obj.params[6] = value;
                        break;
                    case 'LUK':
                        obj.params[7] = value;
                        break;
                    case 'EXP' || 'XP':
                        obj.exp = value;
                }
            }
        }
    }
};

DataManager.processCORENotetags2 = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:GOLD|gold):[ ](\d+)>/i)) {
        obj.gold = parseInt(RegExp.$1);
            } else if (line.match(/<(.*):[ ]*(\d+)>/i)) {
        var stat = String(RegExp.$1).toUpperCase();
                var value = parseInt(RegExp.$2);
                switch (stat) {
                    case 'HP' || 'MAXHP' || 'MAX HP':
                        obj.params[0] = value;
                        break;
                    case 'MP' || 'MAXMP' || 'MAX MP' || 'SP' || 'MAXSP' || 'MAX SP':
                        obj.params[1] = value;
                        break;
                    case 'ATK' || 'STR':
                        obj.params[2] = value;
                        break;
                    case 'DEF':
                        obj.params[3] = value;
                        break;
                    case 'MAT' || 'INT' || 'SPI':
                        obj.params[4] = value;
                        break;
                    case 'MDF' || 'RES':
                        obj.params[5] = value;
                        break;
                    case 'AGI' || 'SPD':
                        obj.params[6] = value;
                        break;
                    case 'LUK':
                        obj.params[7] = value;
                        break;
                }
            }
        }
    }
};

var _yep_core_maxLevel = Number(parameters['Max Level'] || 99);
DataManager.processCORENotetags3 = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        obj.maxLevel = _yep_core_maxLevel;

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:MAX LEVEL|max level):[ ](\d+)>/i)) {
        obj.maxLevel = parseInt(RegExp.$1);
                if (obj.maxLevel < 1) obj.maxLevel = 1;
            } else if (line.match(/<(?:INITIAL LEVEL|initial level):[ ](\d+)>/i)) {
                obj.initialLevel = parseInt(RegExp.$1);
                if (obj.initialLevel < 1) obj.initialLevel = 1;
            }
        }
    }
};

DataManager.processCORENotetags4 = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        obj.learnings.forEach(function(learning) {
            if (learning.note.match(/<(?:LEARN_LEVEL|learn level):[ ](\d+)>/i)) {
                learning.level = parseInt(RegExp.$1);
                if (learning.level < 1) obj.maxLevel = 1;
            }
        }, this);
    }
};

//=============================================================================
// Scene_Manager
//=============================================================================

SceneManager._screenWidth  = Number(parameters['Screen Width'] || 816);
SceneManager._screenHeight = Number(parameters['Screen Height'] || 624);
SceneManager._boxWidth     = Number(parameters['Screen Width'] || 816);
SceneManager._boxHeight    = Number(parameters['Screen Height'] || 624);

var _YEP_CORE_SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
    _YEP_CORE_SceneManager_run.call(this, sceneClass);
        var resizeWidth = Graphics.boxWidth - 816;
        var resizeHeight = Graphics.boxHeight - 624;
        window.resizeBy(resizeWidth, resizeHeight);
        window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
};

//=============================================================================
// BattleManager
//=============================================================================

var _YEP_CORE_BattleManager_displayStartMessages =
        BattleManager.displayStartMessages;

BattleManager.displayStartMessages = function() {
  _YEP_CORE_BattleManager_displayStartMessages.call(this);
    $gameTroop.members().forEach(function(enemy) {
            enemy.recoverAll();
    });
};

//=============================================================================
// Sprite_Animation
//=============================================================================

var _yep_ani_rate = Number(parameters['Animation Rate'] || 4);

Sprite_Animation.prototype.setupRate = function() {
    this._rate = _yep_ani_rate;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

var _YEP_CoreEngine_Sprite_Battler_updateSelectionEffect =
        Sprite_Battler.prototype.updateSelectionEffect;
var _yep_flashTarget = String(parameters['Flash Target'] || 'true');

Sprite_Battler.prototype.updateSelectionEffect = function() {
    if (eval(_yep_flashTarget) || this._battler.isActor()) {
            _YEP_CoreEngine_Sprite_Battler_updateSelectionEffect.call(this);
        } else {
            if (this._battler.isSelected()) this.startEffect('whiten');
        }
};

//=============================================================================
// Sprite_Actor
//=============================================================================

var _yep_core_reposition = String(parameters['Reposition Battlers'] || 'true');
var _YEP_CORE_Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    _YEP_CORE_Sprite_Actor_setActorHome.call(this, index);
        if (!eval(_yep_core_reposition)) return;
        this._homeX += Graphics.boxWidth - 816;
        this._homeY += Graphics.boxHeight - 624;
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

var _YEP_CORE_Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    _YEP_CORE_Sprite_Enemy_setBattler.call(this, battler);
        if (!eval(_yep_core_reposition)) return;
        this._homeY += Graphics.boxHeight - 624;
};

//=============================================================================
// Sprite_StateIcon
//=============================================================================

Sprite_StateIcon._iconWidth  = Number(parameters['Icon Width'] || 32);;
Sprite_StateIcon._iconHeight = Number(parameters['Icon Height'] || 32);;

//=============================================================================
// Game_BattlerBase
//=============================================================================

var _yep_core_enemyMaxHp = Number(parameters['Enemy MaxHP'] || 999999);
var _yep_core_enemyMaxMp = Number(parameters['Enemy MaxMP'] || 9999);
var _yep_core_enemyParam = Number(parameters['Enemy Parameter'] || 999);
Game_BattlerBase.prototype.paramMax = function(paramId) {
    if (paramId === 0) {
        return _yep_core_enemyMaxHp;
    } else if (paramId === 1) {
        return _yep_core_enemyMaxMp;
    } else {
        return _yep_core_enemyParam;
    }
};

//=============================================================================
// Game_Actor
//=============================================================================

var _YEP_CORE_Game_Actor_isMaxLevel = Game_Actor.prototype.isMaxLevel;
Game_Actor.prototype.isMaxLevel = function() {
        if (this.maxLevel() == 0) return false;
    return _YEP_CORE_Game_Actor_isMaxLevel.call(this);
};

var _yep_core_actorMaxHp = Number(parameters['Actor MaxHP'] || 9999);
var _yep_core_actorMaxMp = Number(parameters['Actor MaxMP'] || 9999);
var _yep_core_actorParam = Number(parameters['Actor Parameter'] || 999);
Game_Actor.prototype.paramMax = function(paramId) {
    if (paramId === 0) {
            return _yep_core_actorMaxHp;
    } else if (paramId === 1) {
            return _yep_core_actorMaxMp;
    } else {
            return _yep_core_actorParam;
    }
};

var _YEP_CORE_Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
        if (this.level > 99) {
            var i = this.currentClass().params[paramId][99];
            var j = this.currentClass().params[paramId][98];
            i += (i - j) * (this.level - 99);
            return i;
        }
    return _YEP_CORE_Game_Actor_paramBase.call(this, paramId);
};

//=============================================================================
// Game_Party
//=============================================================================

var _yep_core_goldMax = String(parameters['Gold Max'] || 99999999);
Game_Party.prototype.maxGold = function() {
    return _yep_core_goldMax;
};

Game_Party.prototype.maxItems = function(item) {
    if (!item) return 1;
    return item.maxItem;
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.displayX = function() {
    return parseFloat(Math.floor(this._displayX *
            this.tileWidth())) / this.tileWidth();
};

Game_Map.prototype.displayY = function() {
    return parseFloat(Math.floor(this._displayY *
            this.tileHeight())) / this.tileHeight();
};

Game_Map.prototype.adjustX = function(x) {
    if (this.isLoopHorizontal() && x < this.displayX() -
            (this.width() - this.screenTileX()) / 2) {
        return x - this.displayX() + $dataMap.width;
    } else {
        return x - this.displayX();
    }
};

Game_Map.prototype.adjustY = function(y) {
    if (this.isLoopVertical() && y < this.displayY() -
            (this.height() - this.screenTileY()) / 2) {
        return y - this.displayY() + $dataMap.height;
    } else {
        return y - this.displayY();
    }
};

//=============================================================================
// Game_Variables
//=============================================================================

var _YEP_CoreEngine_Game_Variables_setValue =
        Game_Variables.prototype.setValue;
var _yep_flexibleVar = String(parameters['Flexible Variables'] || 'true');
Game_Variables.prototype.setValue = function(variableId, value) {
    if (eval(_yep_flexibleVar)) {
            if (variableId > 0 && variableId < $dataSystem.variables.length) {
            this._data[variableId] = value;
            this.onChange();
        }
        } else {
            _YEP_CoreEngine_Game_Variables_setValue.call(this);
        }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _YEP_CORE_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _YEP_CORE_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'GainGold') {
        $gameParty.gainGold(parseInt(args[0]));
    }
    if (command === 'LoseGold') {
        $gameParty.loseGold(parseInt(args[0]));
    }
};

//=============================================================================
// Window_Base
//=============================================================================

var _yep_ChineseFont     = String(parameters['Chinese Font'] ||
                           'SimHei, Heiti TC, sans-serif');
var _yep_KoreanFont      = String(parameters['Korean Font'] ||
                           'Dotum, AppleGothic, sans-serif');
var _yep_DefaultFont     = String(parameters['Default Font'] || 'GameFont');
var _yep_FontSize        = Number(parameters['Font Size'] || 28);
var _yep_line_height     = Number(parameters['Line Height'] || 36);
var _yep_gauge_outline   = String(parameters['Gauge Outline'] || 'false');
var _yep_gauge_height    = Number(parameters['Gauge Height'] || 6);
Window_Base._iconWidth   = Number(parameters['Icon Width'] || 32);
Window_Base._iconHeight  = Number(parameters['Icon Height'] || 32);
Window_Base._faceWidth   = Number(parameters['Face Width'] || 144);
Window_Base._faceHeight  = Number(parameters['Face Height'] || 144);
var _yep_window_padding  = Number(parameters['Window Padding'] || 18);
var _yep_text_padding    = Number(parameters['Text Padding'] || 6);
var _yep_window_opacity  = Number(parameters['Window Opacity'] || 192);
var _yep_menu_tp_bar     = String(parameters['Menu TP Bar'] || 'false');

var _yep_color_normal    = Number(parameters['Color: Normal'] || 0);
var _yep_color_system    = Number(parameters['Color: System'] || 16);
var _yep_color_crisis    = Number(parameters['Color: Crisis'] || 17);
var _yep_color_death     = Number(parameters['Color: Death'] || 18);
var _yep_color_gaugeback = Number(parameters['Color: Gauge Back'] || 19);
var _yep_color_hpgauge1  = Number(parameters['Color: HP Gauge 1'] || 20);
var _yep_color_hpgauge2  = Number(parameters['Color: HP Gauge 2'] || 21);
var _yep_color_mpgauge1  = Number(parameters['Color: MP Gauge 1'] || 22);
var _yep_color_mpgauge2  = Number(parameters['Color: MP Gauge 2'] || 23);
var _yep_color_mpcost    = Number(parameters['Color: MP Cost'] || 23);
var _yep_color_powerup   = Number(parameters['Color: Power Up'] || 24);
var _yep_color_powerdown = Number(parameters['Color: Power Down'] || 25);
var _yep_color_tpgauge1  = Number(parameters['Color: TP Gauge 1'] || 28);
var _yep_color_tpgauge2  = Number(parameters['Color: TP Gauge 2'] || 29);
var _yep_color_tpcost    = Number(parameters['Color: TP Cost'] || 29);

Window_Base.prototype.lineHeight = function() {
    return _yep_line_height;
};
Window_Base.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
        return _yep_ChineseFont;
    } else if ($gameSystem.isKorean()) {
        return _yep_KoreanFont;
    } else {
        return _yep_DefaultFont;
    }
};
Window_Base.prototype.standardFontSize = function() {
    return _yep_FontSize;
};
Window_Base.prototype.standardPadding = function() {
    return _yep_window_padding;
};
Window_Base.prototype.textPadding = function() {
    return _yep_text_padding;
};
Window_Base.prototype.standardBackOpacity = function() {
    return _yep_window_opacity;
};
Window_Base.prototype.normalColor = function() {
    return this.textColor(_yep_color_normal);
};
Window_Base.prototype.systemColor = function() {
    return this.textColor(_yep_color_system);
};
Window_Base.prototype.crisisColor = function() {
    return this.textColor(_yep_color_crisis);
};
Window_Base.prototype.deathColor = function() {
    return this.textColor(_yep_color_death);
};
Window_Base.prototype.gaugeBackColor = function() {
    return this.textColor(_yep_color_gaugeback);
};
Window_Base.prototype.hpGaugeColor1 = function() {
    return this.textColor(_yep_color_hpgauge1);
};
Window_Base.prototype.hpGaugeColor2 = function() {
    return this.textColor(_yep_color_hpgauge2);
};
Window_Base.prototype.mpGaugeColor1 = function() {
    return this.textColor(_yep_color_mpgauge1);
};
Window_Base.prototype.mpGaugeColor2 = function() {
    return this.textColor(_yep_color_mpgauge2);
};
Window_Base.prototype.mpCostColor = function() {
    return this.textColor(_yep_color_mpcost);
};
Window_Base.prototype.powerUpColor = function() {
    return this.textColor(_yep_color_powerup);
};
Window_Base.prototype.powerDownColor = function() {
    return this.textColor(_yep_color_powerdown);
};
Window_Base.prototype.tpGaugeColor1 = function() {
    return this.textColor(_yep_color_tpgauge1);
};
Window_Base.prototype.tpGaugeColor2 = function() {
    return this.textColor(_yep_color_tpgauge2);
};
Window_Base.prototype.tpCostColor = function() {
    return this.textColor(_yep_color_tpcost);
};

Window_Base.prototype.drawGauge = function(dx, dy, dw, rate, color1, color2) {
    var color3 = this.gaugeBackColor();
    var fillW = Math.floor(dw * rate).clamp(0, dw);
    var gaugeH = this.gaugeHeight();
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    if (eval(_yep_gauge_outline)) {
        color3.paintOpacity = this.translucentOpacity();
        this.contents.fillRect(dx, gaugeY-1, dw+2, gaugeH+2, color3);
        dx += 1;
    } else {
        var fillW = Math.floor(dw * rate);
        var gaugeY = dy + this.lineHeight() - gaugeH - 2;
        this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
    }
    this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
};

Window_Base.prototype.gaugeHeight = function() {
        return _yep_gauge_height;
};

Window_Base.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(toGroup(actor.level), x + 84, y, 36, 'right');
};

Window_Base.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
        var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth(toGroup(max));
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (x3 >= x + labelWidth) {
        this.changeTextColor(color1);
        this.drawText(toGroup(current), x3, y, valueWidth, 'right');
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawText(toGroup(max), x1, y, valueWidth, 'right');
    } else {
        this.changeTextColor(color1);
        this.drawText(toGroup(current), x1, y, valueWidth, 'right');
    }
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(toGroup(actor.tp), x + width - 64, y, 64, 'right');
};

Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
        var xpad = Window_Base._faceWidth + (2 * _yep_text_padding);
    var x2 = x + xpad;
    var width2 = Math.max(200, width - xpad - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
        if (eval(_yep_menu_tp_bar)) {
            this.drawActorTp(actor, x2, y + lineHeight * 3, width2);
        }
};

var _yep_core_goldFontSize = String(parameters['Gold Font Size'] || 28);
var _icon_gold            = Number(parameters['Gold Icon'] || 0);
var _yep_core_goldOverlap  = String(parameters['Gold Overlap'] || 'A lotta ');
Window_Base.prototype.drawCurrencyValue = function(value, unit, wx, wy, ww) {
    this.resetTextColor();
    this.contents.fontSize = _yep_core_goldFontSize;
    if (this.usingGoldIcon(unit)) {
      var cx = Window_Base._iconWidth;
    } else {
      var cx = this.textWidth(unit);
    }
    var text = toGroup(value);
    if (this.textWidth(text) > ww - cx) {
      text = _yep_core_goldOverlap;
    }
    this.drawText(text, wx, wy, ww - cx - 4, 'right');
    if (this.usingGoldIcon(unit)) {
      this.drawIcon(_icon_gold, wx + ww - Window_Base._iconWidth, wy + 2);
    } else {
      this.changeTextColor(this.systemColor());
      this.drawText(unit, wx, wy, ww, 'right');
    }
    this.resetFontSettings();
};

Window_Base.prototype.usingGoldIcon = function(unit) {
    if (unit !== TextManager.currencyUnit) return false;
    return _icon_gold > 0;
}

//=============================================================================
// Window_MenuStatus
//=============================================================================

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
        var xpad = _yep_window_padding + Window_Base._faceWidth;
    var x = rect.x + xpad;
        if (!eval(_yep_menu_tp_bar)) {
            var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
        } else {
            var y = rect.y;
        }
    var width = rect.width - x - this.textPadding();
    this.drawActorSimpleStatus(actor, x, y, width);
};

//=============================================================================
// Window_ItemList
//=============================================================================

Window_ItemList.prototype.numberWidth = function() {
    return this.textWidth('\u00d70,000');
};

var _yep_is_qntySize = Number(parameters['Quantity Text Size'] || 28);
Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if (!this.needsNumber()) return;
        var numItems = toGroup($gameParty.numItems(item));
    this.contents.fontSize = _yep_is_qntySize;
    this.drawText('\u00d7' + numItems, x, y, width, 'right');
    this.resetFontSettings();
};

//=============================================================================
// Window_SkillStatus
//=============================================================================

Window_SkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
                if (!eval(_yep_menu_tp_bar)) {
                    var y = rect.height / 2 - this.lineHeight() * 1.5;
                } else {
                    var y = 0;
                }
                var xpad = _yep_window_padding + Window_Base._faceWidth;
        var width = w - xpad - this.textPadding();
        this.drawActorFace(this._actor, 0, 0, 144, h);
        this.drawActorSimpleStatus(this._actor, xpad, y, width);
    }
};

Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
        this.changeTextColor(this.tpCostColor());
                var skillcost = toGroup(this._actor.skillTpCost(skill));
        this.drawText(skillcost, x, y, width, 'right');
    } else if (this._actor.skillMpCost(skill) > 0) {
        this.changeTextColor(this.mpCostColor());
                var skillcost = toGroup(this._actor.skillMpCost(skill));
        this.drawText(skillcost, x, y, width, 'right');
    }
};

//=============================================================================
// Window_EquipStatus
//=============================================================================

Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    this.resetTextColor();
        var actorparam = toGroup(this._actor.param(paramId));
    this.drawText(actorparam, x, y, 48, 'right');
};

Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
        var actorparam = toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, 48, 'right');
};

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = this.lineHeight();
                var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + padding, y + padding);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

//=============================================================================
// Window_Status
//=============================================================================

Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
        var paramId = i + 2;
        var y2 = y + lineHeight * i;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y2, 160);
        this.resetTextColor();
                var actorParam = toGroup(this._actor.param(paramId));
        this.drawText(actorParam, x + 160, y2, 60, 'right');
    }
};

Window_Status.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    } else {
            value1 = toGroup(value1);
            value2 = toGroup(value2);
        }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width);
    this.contents.fontSize = _yep_core_goldFontSize;
        var itemPrice = toGroup(this.price(item));
    this.drawText(itemPrice, rect.x, rect.y, rect.width, 'right');
    this.changePaintOpacity(true);
    this.resetFontSettings();
};

//=============================================================================
// Window_ShopNumber
//=============================================================================

Window_ShopNumber.prototype.drawNumber = function() {
    var x = this.cursorX();
    var y = this.itemY();
    var width = this.cursorWidth() - this.textPadding();
    this.resetTextColor();
        var itemNumber = toGroup(this._number);
    this.drawText(itemNumber, x, y, width, 'right');
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Window_BattleLog.prototype.showNormalAnimation = function(targets,
animationId, mirror) {
    var animation = $dataAnimations[animationId];
    if (animation) {
            if (animation.position == 3) {
                targets.forEach(function(target) {
                        target.startAnimation(animationId, mirror, 0);
                });
            } else {
                    var delay = this.animationBaseDelay();
            var nextDelay = this.animationNextDelay();
            targets.forEach(function(target) {
                target.startAnimation(animationId, mirror, delay);
                delay += nextDelay;
            });
            }
    }
};

var _yami_Game_CharacterBase_updateMove = Game_CharacterBase.prototype.updateMove;
var _yami_Game_Character_setMoveRoute = Game_Event.prototype.setMoveRoute;
var _yami_Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;

Game_CharacterBase.prototype.update = function() {
    if (this.isJumping()) {
        this.updateJump();
    } else if (this.isMoving()) {
        this.updateMove();
    }

    if (!this.isMoving()) {
        this.updateStop();
    }

    this.updateAnimation();
};

Game_CharacterBase.prototype.updateMove = function() {
    _yami_Game_CharacterBase_updateMove.call(this);

    if (!this.isMoving()) {
        this.updateStop();
    }
};

Game_Character.prototype.queueMoveRoute = function(moveRoute) {
    this._originalMoveRoute       = moveRoute;
    this._originalMoveRouteIndex  = 0;
};

Game_Character.prototype.setMoveRoute = function(moveRoute) {
    if (!this._moveRouteForcing) {
        _yami_Game_Character_setMoveRoute.call(this, moveRoute);
    } else {
        this.queueMoveRoute(moveRoute);
    }
};

Game_Event.prototype.updateSelfMovement = function() {
    _yami_Game_Event_updateSelfMovement.call(this);

    if (this.isNearTheScreen() && this.checkStop(this.stopCountThreshold())) {
        this.resetStopCount();
    }
};

//=============================================================================
// End of File
//=============================================================================
