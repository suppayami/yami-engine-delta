//=============================================================================
// Yanfly Engine Plugins - Map Select Skill
// YEP_MapSelectSkill.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MapSelectSkill = true;

var Yanfly = Yanfly || {};
Yanfly.MSS = Yanfly.MSS || {};

//=============================================================================
 /*:
 * @plugindesc v1.01 Open up a window similar to the Select Item Window,
 * but instead, returns Skill ID's to a variable.
 * @author Yanfly Engine Plugins
 *
 * @param Default Columns
 * @desc Default number of columns for the window.
 * @default 2
 *
 * @param Default Rows
 * @desc Default number of rows for the window.
 * @default 4
 *
 * @param Default X Position
 * @desc Default X Position of the window.
 * left     center     right
 * @default right
 *
 * @param Default Y Position
 * @desc Default Y Position of the window.
 * top     middle     bottom
 * @default bottom
 *
 * @param Default Width
 * @desc Default width of the window.
 * If set to 0, window width will be the screen width.
 * @default 0
 *
 * @param Default Enable
 * @desc Enable all skills by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Default Cost
 * @desc Show the costs of the skills by default?
 * NO - false     YES - true
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin produces a window similar to that of the Select Item Window, but
 * instead, it displays a list of skills from a designated actor and the skill
 * type selected. When a skill is selected, it set the chosen variable's value
 * to become that of the picked skill's ID.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Use the following plugin commands to utilize the Map Select Skill plugin.
 *
 * --- Plugin Commands ---
 *
 * MapSelectSkill v a s
 * - This will open up the Map Select Skill window. Replace 'v' with the ID of
 * the variable you wish to set to the selected skill. Replace 'a' with the ID
 * of the actor whose skill list you want to see. 's' is optional, but if used,
 * it will display the skills from skill type 's' only. Replace 's' with the
 * skill type's ID number.
 *
 * MapSelectSkillColumns x
 * - Sets the number of columns for the Map Select Skill Window to x.
 *
 * MapSelectSkillRows x
 * - Sets the number of rows for the Map Select Skill Window to x.
 *
 * MapSelectSkillWidth x
 * - Sets the width for the Map Select Skill Window to x. If 0 is used, then
 * the window width will be the screen width.
 *
 * MapSelectSkillX left
 * MapSelectSkillX center
 * MapSelectSkillX right
 * - Sets the Map Select Skill Window to be aligned to the left side of the
 * screen, center of the screen, or right side of the screen.
 *
 * MapSelectSkillY top
 * MapSelectSkillY middle
 * MapSelectSkillY bottom
 * - Sets the Map Select Skill Window to be aligned to the top of the screen,
 * middle of the screen, or bottom of the screen.
 *
 * EnableAllMapSelectSkills
 * - This will cause all of the skills listed to become selectable regardless
 * of whether or not the actor is able to use them at the time.
 *
 * NormalAllMapSelectSkills
 * - This will cause all of the skills listed to be enabled or disabled based
 * on whether or not the actor is able to use the skill at the time.
 *
 * ShowMapSelectSkillCost
 * - Show the cost of the skills in the Map Select Skill Window.
 *
 * HideMapSelectSkillCost
 * - Hide the cost of the skills in the Map Select Skill Window.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Compatibility update with Self Switches & Variables v1.01.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MapSelectSkill');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MSSCol = Number(Yanfly.Parameters['Default Columns']);
Yanfly.Param.MSSRow = Number(Yanfly.Parameters['Default Rows']);
Yanfly.Param.MSSPosX = String(Yanfly.Parameters['Default X Position']);
Yanfly.Param.MSSPosY = String(Yanfly.Parameters['Default Y Position']);
Yanfly.Param.MSSWidth = Number(Yanfly.Parameters['Default Width']);
Yanfly.Param.MSSEnable = eval(String(Yanfly.Parameters['Default Enable']));
Yanfly.Param.MSSCost = eval(String(Yanfly.Parameters['Default Cost']));

//=============================================================================
// Game_System
//=============================================================================

Yanfly.MSS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.MSS.Game_System_initialize.call(this);
    this.initMapSelectSkill();
};

Game_System.prototype.initMapSelectSkill = function() {
    this._mapSelectSkillWindowColumns = Yanfly.Param.MSSCol;
    this._mapSelectSkillWindowRows = Yanfly.Param.MSSRow;
    this._mapSelectSkillWindowPosX = Yanfly.Param.MSSPosX;
    this._mapSelectSkillWindowPosY = Yanfly.Param.MSSPosY;
    this._mapSelectSkillWindowWidth = Yanfly.Param.MSSWidth;
    this._mapSelectSkillWindowEnable = Yanfly.Param.MSSEnable;
    this._mapSelectSkillWindowCosts = Yanfly.Param.MSSCost;
};

Game_System.prototype.getMapSelectSkillColumns = function() {
    if (this._mapSelectSkillWindowColumns === undefined) {
      this.initMapSelectSkill();
    }
    return this._mapSelectSkillWindowColumns;
};

Game_System.prototype.setMapSelectSkillColumns = function(value) {
    if (this._mapSelectSkillWindowColumns === undefined) {
      this.initMapSelectSkill();
    }
    this._mapSelectSkillWindowColumns = value;
};

Game_System.prototype.getMapSelectSkillRows = function() {
    if (this._mapSelectSkillWindowRows === undefined) {
      this.initMapSelectSkill();
    }
    return this._mapSelectSkillWindowRows;
};

Game_System.prototype.setMapSelectSkillRows = function(value) {
    if (this._mapSelectSkillWindowRows === undefined) {
      this.initMapSelectSkill();
    }
    this._mapSelectSkillWindowRows = value;
};

Game_System.prototype.getMapSelectSkillPosX = function() {
    if (this._mapSelectSkillWindowPosX === undefined) {
      this.initMapSelectSkill();
    }
    return this._mapSelectSkillWindowPosX;
};

Game_System.prototype.setMapSelectSkillPosX = function(value) {
    if (this._mapSelectSkillWindowPosX === undefined) {
      this.initMapSelectSkill();
    }
    this._mapSelectSkillWindowPosX = value;
};

Game_System.prototype.getMapSelectSkillPosY = function() {
    if (this._mapSelectSkillWindowPosY === undefined) {
      this.initMapSelectSkill();
    }
    return this._mapSelectSkillWindowPosY;
};

Game_System.prototype.setMapSelectSkillPosY = function(value) {
    if (this._mapSelectSkillWindowPosY === undefined) {
      this.initMapSelectSkill();
    }
    this._mapSelectSkillWindowPosY = value;
};

Game_System.prototype.getMapSelectSkillWidth = function() {
    if (this._mapSelectSkillWindowWidth === undefined) {
      this.initMapSelectSkill();
    }
    return this._mapSelectSkillWindowWidth;
};

Game_System.prototype.setMapSelectSkillWidth = function(value) {
    if (this._mapSelectSkillWindowWidth === undefined) {
      this.initMapSelectSkill();
    }
    this._mapSelectSkillWindowWidth = value;
};

Game_System.prototype.getMapSelectSkillEnable = function() {
    if (this._mapSelectSkillWindowEnable === undefined) {
      this.initMapSelectSkill();
    }
    return this._mapSelectSkillWindowEnable;
};

Game_System.prototype.setMapSelectSkillEnable = function(value) {
    if (this._mapSelectSkillWindowEnable === undefined) {
      this.initMapSelectSkill();
    }
    this._mapSelectSkillWindowEnable = value;
};

Game_System.prototype.getMapSelectSkillCosts = function() {
    if (this._mapSelectSkillWindowCosts === undefined) {
      this.initMapSelectSkill();
    }
    return this._mapSelectSkillWindowCosts;
};

Game_System.prototype.setMapSelectSkillCosts = function(value) {
    if (this._mapSelectSkillWindowCosts === undefined) {
      this.initMapSelectSkill();
    }
    this._mapSelectSkillWindowCosts = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.MSS.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.MSS.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'MapSelectSkill') {
    if (SceneManager._scene instanceof Scene_Map) {
      var varId = parseInt(args[0]);
      var actorId = parseInt(args[1]);
      var stypeId = parseInt(args[2] || 0);
      SceneManager._scene.setupMapSelectSkill(varId, actorId, stypeId);
      this.wait(10);
    }
  } else if (command === 'MapSelectSkillColumns') {
    var value = parseInt(args[0]);
    $gameSystem.setMapSelectSkillColumns(value);
  } else if (command === 'MapSelectSkillRows') {
    var value = parseInt(args[0]);
    $gameSystem.setMapSelectSkillRows(value);
  } else if (command === 'MapSelectSkillWidth') {
    var value = parseInt(args[0]);
    $gameSystem.setMapSelectSkillWidth(value);
  } else if (command === 'MapSelectSkillX') {
    var value = String(args[0]).toLowerCase();
    $gameSystem.setMapSelectSkillPosX(value);
  } else if (command === 'MapSelectSkillY') {
    var value = String(args[0]).toLowerCase();
    $gameSystem.setMapSelectSkillPosY(value);
  } else if (command === 'EnableAllMapSelectSkills') {
    $gameSystem.setMapSelectSkillEnable(true);
  } else if (command === 'NormalAllMapSelectSkills') {
    $gameSystem.setMapSelectSkillEnable(false);
  } else if (command === 'ShowMapSelectSkillCost') {
    $gameSystem.setMapSelectSkillCosts(true);
  } else if (command === 'HideMapSelectSkillCost') {
    $gameSystem.setMapSelectSkillCosts(false);
  }
};

//=============================================================================
// Window_MapSelectSkill
//=============================================================================

function Window_MapSelectSkill() {
    this.initialize.apply(this, arguments);
}

Window_MapSelectSkill.prototype = Object.create(Window_SkillList.prototype);
Window_MapSelectSkill.prototype.constructor = Window_MapSelectSkill;

Window_MapSelectSkill.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.openness = 0;
};

Window_MapSelectSkill.prototype.windowWidth = function() {
    return this._windowWidth || Graphics.boxWidth;
};

Window_MapSelectSkill.prototype.windowHeight = function() {
    return this._windowHeight || this.fittingHeight(4);
};

Window_MapSelectSkill.prototype.setup = function(varId, actorId, stypeId) {
    if (!varId) return;
    if (!actorId) return;
    this.updateWindowSettings();
    this._varId = varId;
    this.setActor($gameActors.actor(actorId));
    this.setStypeId(stypeId);
    this.refresh();
    this.activate();
    this.open();
    this.select(0);
};

Window_MapSelectSkill.prototype.includes = function(item) {
    if (!this._stypeId) return item;
    return item && item.stypeId === this._stypeId;
};

Window_MapSelectSkill.prototype.maxCols = function() {
    return $gameSystem.getMapSelectSkillColumns() || 1;
};

Window_MapSelectSkill.prototype.updateWindowSettings = function() {
    this.width = $gameSystem.getMapSelectSkillWidth() || Graphics.boxWidth;
    var col = $gameSystem.getMapSelectSkillRows() || 4;
    this.height = this.fittingHeight(col);
    if ($gameSystem.getMapSelectSkillPosX() === 'left') {
      this.x = 0;
    } else if ($gameSystem.getMapSelectSkillPosX() === 'center') {
      this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
    } else {
      this.x = Graphics.boxWidth - this.width;
    }
    if ($gameSystem.getMapSelectSkillPosY() === 'top') {
      this.y = 0;
    } else if ($gameSystem.getMapSelectSkillPosY() === 'middle') {
      this.y = Math.floor((Graphics.boxHeight - this.height) / 2);
    } else {
      this.y = Graphics.boxHeight - this.height;
    }
};

Window_MapSelectSkill.prototype.isEnabled = function(item) {
    if ($gameSystem.getMapSelectSkillEnable()) return true;
    return Window_SkillList.prototype.isEnabled.call(this, item);
};

Window_MapSelectSkill.prototype.drawSkillCost = function(skill, x, y, width) {
    if ($gameSystem.getMapSelectSkillCosts()) {
      var width =
        Window_SkillList.prototype.drawSkillCost.call(this, skill, x, y, width);
    }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.MSS.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    Yanfly.MSS.Scene_Map_createAllWindows.call(this);
    this.createMapSelectSkillWindow();
};

Scene_Map.prototype.createMapSelectSkillWindow = function() {
    this._mapSelectSkillWindow = new Window_MapSelectSkill();
    this._mapSelectSkillWindow.setHandler('ok', 
      this.onMapSelectSkillOk.bind(this));
    this._mapSelectSkillWindow.setHandler('cancel', 
      this.onMapSelectSkillCancel.bind(this));
    this.addChild(this._mapSelectSkillWindow);
};

Scene_Map.prototype.setupMapSelectSkill = function(varId, actorId, stypeId) {
    this._mapSelectSkillWindow.setup(varId, actorId, stypeId);
    this._active = false;
};

Scene_Map.prototype.onMapSelectSkillOk = function() {
    this._mapSelectSkillWindow.close();
    var skill = this._mapSelectSkillWindow.item();
    var varId = this._mapSelectSkillWindow._varId;
    if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvBridge();
    if (!skill) {
      $gameVariables.setValue(varId, 0);
    } else {
      $gameVariables.setValue(varId, skill.id);
    }
    if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvent();
    this._active = true;
};

Scene_Map.prototype.onMapSelectSkillCancel = function() {
    this._mapSelectSkillWindow.close();
    var varId = this._mapSelectSkillWindow._varId;
    $gameVariables.setValue(varId, 0);
    this._active = true;
};

//=============================================================================
// End of File
//=============================================================================
