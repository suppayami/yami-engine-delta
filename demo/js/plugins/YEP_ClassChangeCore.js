//=============================================================================
// Yanfly Engine Plugins - Class Change Core
// YEP_ClassChangeCore.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ClassChangeCore = true;

var Yanfly = Yanfly || {};
Yanfly.CCC = Yanfly.CCC || {};

//=============================================================================
 /*:
 * @plugindesc This plugin creates a system where your player can change
 * classes through the main menu.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Class Command
 * @desc This is the text used for the menu command.
 * @default Class
 *
 * @param Show Command
 * @desc Show the Class command in the main menu by default?    .
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Command
 * @desc Enable the Class command in the main menu by default?  .
 * NO - false     YES - true
 * @default true
 *
 * @param Auto Place Command
 * @desc Allow this plugin to decide the menu placement position?   .
 * NO - false     YES - true
 * @default true
 *
 * @param Maintain Levels
 * @desc Maintain levels throughout all classes?                    .
 * NO - false     YES - true     Default: false
 * @default false
 *
 * @param Unlocked Classes
 * @desc These are the classes that are unlocked by default. List
 * the ID's of the classes with spaces in between them.
 * @default 1 2 3 4
 *
 * @param ---Command Window---
 * @default
 *
 * @param Class Change Command
 * @desc The command text used for changing the primary class.
 * @default Class
 *
 * @param Finish Command
 * @desc The command text used for exiting the class scene.
 * @default Finish
 *
 * @param Text Alignment
 * @desc How to align the text for the command window.              .
 * left     center     right
 * @default center
 *
 * @param ---Window Settings---
 * @default
 *
 * @param Current Class Color
 * @desc This is the text color used for the actor's current class.
 * @default 17
 *
 * @param Class Level Format
 * @desc This is the text format for the Class Level.
 * @default LV%1
 *
 * @param Class Level Font Size
 * @desc This is the font size used for the class level.
 * @default 20
 *
 * @help
 * ============================================================================
 * Introduction                                                     .
 * ============================================================================
 *
 * This plugin adds the ability for your player to freely change the classes of
 * actors outside of battle from a menu. When changing classes, this script
 * gives the option for the developer to choose whether or not classes have
 * their own levels (causing the actor’s level to reset back to the class’s
 * level) or to maintain the current level.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are some notetags you can use with the Class Change Core
 * plugin.
 *
 * Actor Notetags:
 *   <Unlock Class: x>
 *   <Unlock Class: x, x, x>
 *   This actor will have class(es) x unlocked at the start of the game in
 *   addition to its current class and access to any of the global classes.
 *
 *   <Class x Character: filename y>
 *   When this actor's class is x, the actor's character sprite will become
 *   'filename' and index y on the fieldmap.
 *
 *   <Class x Face: filename y>
 *   When this actor's class is x, the actor's face graphic will become
 *   'filename' and index y for menus.
 *
 *   <Class x Battler: filename>
 *   When this actor's class is x, the actor's battler sprite will become
 *   filename in battle.
 *
 * Class Notetags:
 *   <Icon: x>
 *   Sets the icon for this class to x. This icon is used in the Class Change
 *   menu listing.
 *
 *   <Help Description>
 *    Text
 *    Text
 *   </Help Description>
 *   Sets the help description for the class to the specified text.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Included in this plugin are multiple Plugin Commands to help assist you with
 * class changing for your game.
 *
 * Plugin Command
 *   OpenClass            This opens the class changing scene.
 *   ShowClass            This shows the Class option from the main menu.
 *   HideClass            This hides the Class option from the main menu.
 *   EnableClass          This makes the Class option enabled.
 *   DisableClass         This makes the Class option disabled.
 *   UnlockClass 5 6      This allows Actor 5 to unlock Class 6.
 *   RemoveClass 5 7      This causes Actor 5 to no longer access Class 7.
 *   UnlockClassAll 8     This unlocks Class 8 for the global pool.
 *   RemoveClassAll 9     This removes Class 9 from the global pool.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ClassChangeCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CCCCmdName = String(Yanfly.Parameters['Class Command']);
Yanfly.Param.CCCShowCmd = String(Yanfly.Parameters['Show Command']);
Yanfly.Param.CCCEnableCmd = String(Yanfly.Parameters['Enable Command']);
Yanfly.Param.CCCAutoPlace = String(Yanfly.Parameters['Auto Place Command']);
Yanfly.Param.CCCMaintainLv = String(Yanfly.Parameters['Maintain Levels']);
Yanfly.Param.CCCUnlock = String(Yanfly.Parameters['Unlocked Classes']);
Yanfly.Param.CCCUnlock = Yanfly.Param.CCCUnlock.split(' ');
if (Yanfly.Param.CCCUnlock === '') Yanfly.Param.CCCUnlock = [];
for (Yanfly.i = 0; Yanfly.i < Yanfly.Param.CCCUnlock.length; ++Yanfly.i) {
	Yanfly.Param.CCCUnlock[Yanfly.i] = parseInt(Yanfly.Param.CCCUnlock[Yanfly.i]);
}
Yanfly.Param.CCCClassCmd = String(Yanfly.Parameters['Class Change Command']);
Yanfly.Param.CCCFinishCmd = String(Yanfly.Parameters['Finish Command']);
Yanfly.Param.CCCTextAlign = String(Yanfly.Parameters['Text Alignment']);
Yanfly.Param.CCCClassColor = Number(Yanfly.Parameters['Current Class Color']);
Yanfly.Param.CCCLvFmt = String(Yanfly.Parameters['Class Level Format']);
Yanfly.Param.CCCLvFontSize = Number(Yanfly.Parameters['Class Level Font Size']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.CCC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.CCC.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processCCCNotetags1($dataActors);
		this.processCCCNotetags2($dataClasses);
		return true;
};

DataManager.processCCCNotetags1 = function(group) {
	var note1 = /<(?:UNLOCK CLASS|unlock classes):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	var note2 = /<(?:CLASS)[ ](\d+)[ ](?:CHARACTER|SPRITE):[ ](.*)[ ](\d+)>/i;
	var note3 = /<(?:CLASS)[ ](\d+)[ ](?:FACE):[ ](.*)[ ](\d+)>/i;
	var note4 = /<(?:CLASS)[ ](\d+)[ ](?:BATTLER):[ ](.*)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.unlockedClasses = [];
		obj.classCharacter = {};
		obj.classFace = {};
		obj.classBattler = {};

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.unlockedClasses = obj.unlockedClasses.concat(array);
			} else if (line.match(note2)) {
				var classId = parseInt(RegExp.$1);
				var filename = String(RegExp.$2);
				var index = parseInt(RegExp.$3);
				obj.classCharacter[classId] = [filename, index];
			} else if (line.match(note3)) {
				var classId = parseInt(RegExp.$1);
				var filename = String(RegExp.$2);
				var index = parseInt(RegExp.$3);
				obj.classFace[classId] = [filename, index];
			} else if (line.match(note4)) {
				var classId = parseInt(RegExp.$1);
				var filename = String(RegExp.$2);
				obj.classBattler[classId] = filename;
			}
		}
		obj.unlockedClasses = obj.unlockedClasses.filter(Yanfly.Util.onlyUnique);
	}
};

DataManager.processCCCNotetags2 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.iconIndex = 0;
		obj.description = '';
		var descMode = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:ICON):[ ](\d+)>/i)) {
				obj.iconIndex = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HELP DESCRIPTION)>/i)) {
				descMode = true;
			} else if (line.match(/<\/(?:HELP DESCRIPTION)>/i)) {
				descMode = false;
			} else if (descMode) {
				obj.description += line + '\n';
			}
		}
	}
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.CCC.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.CCC.Game_System_initialize.call(this);
    this.initClasses();
};

Game_System.prototype.initClasses = function() {
    this._showClass = eval(Yanfly.Param.CCCShowCmd);
    this._enableClass = eval(Yanfly.Param.CCCEnableCmd);
};

Game_System.prototype.isShowClass = function() {
    return this._showClass;
};

Game_System.prototype.isEnableClass = function() {
    return this._enableClass;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.CCC.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.CCC.Game_Actor_setup.call(this, actorId);
		this.initClasses();
};

Game_Actor.prototype.initClasses = function() {
		if (!this.actor().unlockedClasses) return;
		this._unlockedClasses = this.actor().unlockedClasses.slice();
		this.unlockClass(this._classId);
		this._unlockedClasses.sort(function(a, b) { return a - b });
};

Yanfly.CCC.Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
		this.updateUnlockedClassSkills();
    Yanfly.CCC.Game_Actor_refresh.call(this);
};

Game_Actor.prototype.unlockedClasses = function() {
		if (this._unlockedClasses === undefined) this.initClasses();
		var classes = this._unlockedClasses.sort(function(a, b) { return a - b });
		classes = classes.concat($gameParty.unlockedClasses());
		return classes.filter(Yanfly.Util.onlyUnique);
};

Game_Actor.prototype.unlockClass = function(classId) {
		if (this._unlockedClasses === undefined) this.initClasses();
		if (this._unlockedClasses.contains(classId)) return;
		this._unlockedClasses.push(classId);
		this._unlockedClasses.sort(function(a, b) { return a - b });
		this.refresh();
};

Game_Actor.prototype.removeClass = function(classId) {
		if (this._unlockedClasses === undefined) this.initClasses();
		if (!this._unlockedClasses.contains(classId)) return;
		if (classId === this._classId) return;
		var index = this._unlockedClasses.indexOf(classId);
    if (index >= 0) this._unlockedClasses.splice(index, 1);
		this.refresh();
};

Yanfly.CCC.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    keepExp = eval(Yanfly.Param.CCCMaintainLv);
		Yanfly.CCC.Game_Actor_changeClass.call(this, classId, keepExp);
		this.updateLearnedSkills(classId);
		this.unlockClass(classId);
};

Game_Actor.prototype.updateUnlockedClassSkills = function() {
		for (var i = 0; i < this.unlockedClasses().length; ++i) {
			var classId = this.unlockedClasses()[i];
			this.updateLearnedSkills(classId);
		}
};

Game_Actor.prototype.updateLearnedSkills = function(classId) {
		$dataClasses[classId].learnings.forEach(function(learning) {
				if (this.classLevel(classId) >= learning.level) {
					this.learnSkill(learning.skillId);
				}
		}, this);
};

Game_Actor.prototype.classLevel = function(classId) {
		if (eval(Yanfly.Param.CCCMaintainLv)) return this.level;
		if (this._exp[classId] === undefined) this._exp[classId] = 0;
		var level = 1;
		for (;;) {
			if (level >= this.maxLevel()) break;
			if (this.expForLevel(level + 1) > this._exp[classId]) break;
			level++;
		}
		return level;
};

Yanfly.CCC.Game_Actor_characterName = Game_Actor.prototype.characterName;
Game_Actor.prototype.characterName = function() {
		if (this.actor().classCharacter) {
			if (this.actor().classCharacter[this._classId] !== undefined) {
				return this.actor().classCharacter[this._classId][0];
			}
		}
		return Yanfly.CCC.Game_Actor_characterName.call(this);
};

Yanfly.CCC.Game_Actor_characterIndex = Game_Actor.prototype.characterIndex;
Game_Actor.prototype.characterIndex = function() {
		if (this.actor().classCharacter) {
			if (this.actor().classCharacter[this._classId] !== undefined) {
				return this.actor().classCharacter[this._classId][1];
			}
		}
		return Yanfly.CCC.Game_Actor_characterIndex.call(this);
};

Yanfly.CCC.Game_Actor_faceName = Game_Actor.prototype.faceName;
Game_Actor.prototype.faceName = function() {
		if (this.actor().classFace) {
			if (this.actor().classFace[this._classId] !== undefined) {
				return this.actor().classFace[this._classId][0];
			}
		}
		return Yanfly.CCC.Game_Actor_faceName.call(this);
};

Yanfly.CCC.Game_Actor_faceIndex = Game_Actor.prototype.faceIndex;
Game_Actor.prototype.faceIndex = function() {
		if (this.actor().classFace) {
			if (this.actor().classFace[this._classId] !== undefined) {
				return this.actor().classFace[this._classId][1];
			}
		}
		return Yanfly.CCC.Game_Actor_faceIndex.call(this);
};

Yanfly.CCC.Game_Actor_battlerName = Game_Actor.prototype.battlerName;
Game_Actor.prototype.battlerName = function() {
		if (this.actor().classBattler) {
			if (this.actor().classBattler[this._classId] !== undefined) {
				return this.actor().classBattler[this._classId];
			}
		}
		return Yanfly.CCC.Game_Actor_battlerName.call(this);
};
//=============================================================================
// Game_Party
//=============================================================================

Yanfly.CCC.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    Yanfly.CCC.Game_Party_initialize.call(this);
		this.initClasses();
};

Game_Party.prototype.initClasses = function() {
		this._unlockedClasses = Yanfly.Param.CCCUnlock.slice();
		this._unlockedClasses.sort(function(a, b) { return a - b });
};

Game_Party.prototype.unlockedClasses = function() {
		if (this._unlockedClasses === undefined) this.initClasses();
		var classes = this._unlockedClasses.sort(function(a, b) { return a - b });
		return classes.filter(Yanfly.Util.onlyUnique);
};

Game_Party.prototype.unlockClass = function(classId) {
		if (this._unlockedClasses === undefined) this.initClasses();
		if (this._unlockedClasses.contains(classId)) return;
		this._unlockedClasses.push(classId);
		this._unlockedClasses.sort(function(a, b) { return a - b });
};

Game_Party.prototype.removeClass = function(classId) {
		if (this._unlockedClasses === undefined) this.initClasses();
		if (!this._unlockedClasses.contains(classId)) return;
		if (classId === this._classId) return;
		var index = this._unlockedClasses.indexOf(classId);
    if (index >= 0) this._unlockedClasses.splice(index, 1);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.CCC.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.CCC.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'OpenClass') this.gotoSceneClass();
		if (command === 'ShowClass') $gameSystem._showClass = true;
		if (command === 'HideClass') $gameSystem._showClass = false;
		if (command === 'EnableClass') $gameSystem._enableClass = true;
		if (command === 'DisableClass') $gameSystem._enableClass = false;
		if (command === 'UnlockClass') this.unlockClass(args);
		if (command === 'RemoveClass') this.removeClass(args);
		if (command === 'UnlockClassAll') this.unlockClassAll(args);
		if (command === 'RemoveClassAll') this.removeClassAll(args);
};

Game_Interpreter.prototype.gotoSceneClass = function() {
    if (!$gameParty.inBattle()) {
        SceneManager.push(Scene_Class);
    }
    return true;
};

Game_Interpreter.prototype.unlockClass = function(args) {
		var actorId = parseInt(args[0]);
		var actor = $gameActors.actor(actorId);
		if (!actor) return;
		var classId = parseInt(args[1]);
		if (!$dataClasses[classId]) return;
		actor.unlockClass(classId);
};

Game_Interpreter.prototype.removeClass = function(args) {
		var actorId = parseInt(args[0]);
		var actor = $gameActors.actor(actorId);
		if (!actor) return;
		var classId = parseInt(args[1]);
		if (!$dataClasses[classId]) return;
		actor.removeClass(classId);
};

Game_Interpreter.prototype.unlockClassAll = function(args) {
		var classId = parseInt(args[0]);
		if (!$dataClasses[classId]) return;
		$gameParty.unlockClass(classId);
};

Game_Interpreter.prototype.removeClassAll = function(args) {
		var classId = parseInt(args[0]);
		if (!$dataClasses[classId]) return;
		$gameParty.removeClass(classId);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Yanfly.CCC.Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    Yanfly.CCC.Window_MenuCommand_addOriginalCommands.call(this);
    this.addClassCommand();
};

Window_MenuCommand.prototype.addClassCommand = function() {
    if (!eval(Yanfly.Param.CCCAutoPlace)) return;
    if (!$gameSystem.isShowClass()) return;
		if (this.findSymbol('class') > -1) return;
    var text = Yanfly.Param.CCCCmdName;
    var enabled = $gameSystem.isEnableClass();
    this.addCommand(text, 'class', enabled);
};

//=============================================================================
// Window_ClassCommand
//=============================================================================

function Window_ClassCommand() {
    this.initialize.apply(this, arguments);
}

Window_ClassCommand.prototype = Object.create(Window_Command.prototype);
Window_ClassCommand.prototype.constructor = Window_ClassCommand;

Window_ClassCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
};

Window_ClassCommand.prototype.windowWidth = function() {
    return 240;
};

Window_ClassCommand.prototype.numVisibleRows = function() {
    return 4;
};

Window_ClassCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.CCCTextAlign;
};

Window_ClassCommand.prototype.makeCommandList = function() {
    this.addClassCommand();
    this.addCustomCommand();
    this.addFinishCommand();
};

Window_ClassCommand.prototype.addClassCommand = function() {
    this.addCommand(Yanfly.Param.CCCClassCmd, 'class', true);
};

Window_ClassCommand.prototype.addCustomCommand = function() {
};

Window_ClassCommand.prototype.addFinishCommand = function() {
    this.addCommand(Yanfly.Param.CCCFinishCmd, 'cancel', true);
};

//=============================================================================
// Window_ClassList
//=============================================================================

function Window_ClassList() {
    this.initialize.apply(this, arguments);
}

Window_ClassList.prototype = Object.create(Window_Selectable.prototype);
Window_ClassList.prototype.constructor = Window_ClassList;

Window_ClassList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._data = [];
};

Window_ClassList.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
    this.refresh();
    this.resetScroll();
};

Window_ClassList.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_ClassList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_ClassList.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_ClassList.prototype.makeItemList = function() {
    if (this._actor) {
        this._data = this._actor.unlockedClasses().slice();
    } else {
        this._data = [];
    }
		this._data.sort(function(a, b) { return a - b });
};

Window_ClassList.prototype.drawItem = function(index) {
		var item = $dataClasses[this._data[index]];
		if (!item) return;
		var rect = this.itemRect(index);
		this.drawClassName(item, rect.x, rect.y, rect.width);
		var rect = this.itemRectForText(index);
		this.drawClassLevel(item, rect.x, rect.y, rect.width);
};

Window_ClassList.prototype.drawClassName = function(item, x, y, width) {
    this.resetFontSettings();
		var iconBoxWidth = Window_Base._iconWidth + 4;
		if (item === this._actor.currentClass()) {
			this.changeTextColor(this.textColor(Yanfly.Param.CCCClassColor));
		} else {
			this.changeTextColor(this.normalColor());
		}
    this.drawIcon(item.iconIndex, x + 2, y + 2);
    this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
};

Window_ClassList.prototype.drawClassLevel = function(item, x, y, width) {
    var level = Yanfly.Util.toGroup(this._actor.classLevel(item.id));
		var fmt = Yanfly.Param.CCCLvFmt;
		var text = fmt.format(level);
		this.resetFontSettings();
		this.changeTextColor(this.normalColor());
		this.contents.fontSize = Yanfly.Param.CCCLvFontSize;
		this.drawText(text, x, y, width, 'right');
};

Window_ClassList.prototype.updateHelp = function() {
    this.setHelpWindowItem($dataClasses[this.item()]);
		if (this._actor && this.item() && this._statusWindow) {
        var actor = JsonEx.makeDeepCopy(this._actor);
        actor.changeClass(this.item(), false);
        this._statusWindow.setTempActor(actor);
    }
};

Window_ClassList.prototype.refresh = function() {
		this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_ClassList.prototype.selectLast = function() {
    this._index = this._data.indexOf(this._actor._classId);
    this.select(this._index);
};

//=============================================================================
// Window_StatCompare
//=============================================================================

function Window_StatCompare() {
    this.initialize.apply(this, arguments);
}

Window_StatCompare.prototype = Object.create(Window_Base.prototype);
Window_StatCompare.prototype.constructor = Window_StatCompare;

Window_StatCompare.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this._actor = null;
    this._tempActor = null;
    this.refresh();
};

Window_StatCompare.prototype.createWidths = function() {
		this._paramNameWidth = 0;
		this._paramValueWidth = 0;
		this._arrowWidth = this.textWidth('\u2192' + ' ');
		var buffer = this.textWidth(' ');
		for (var i = 0; i < 8; ++i) {
			var value1 = this.textWidth(TextManager.param(i));
			var value2 = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(i)));
			this._paramNameWidth = Math.max(value1, this._paramNameWidth);
			this._paramValueWidth = Math.max(value2, this._paramValueWidth);
		}
		this._bonusValueWidth = this._paramValueWidth;
		this._bonusValueWidth += this.textWidth('(+)') + buffer;
		this._paramNameWidth += buffer;
		this._paramValueWidth;
		if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth +
			this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
};

Window_StatCompare.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
		this.createWidths();
    this.refresh();
};

Window_StatCompare.prototype.refresh = function() {
    this.contents.clear();
    if (!this._actor) return;
    for (var i = 0; i < 8; ++i) {
        this.drawItem(0, this.lineHeight() * i, i);
    }
};

Window_StatCompare.prototype.setTempActor = function(tempActor) {
    if (this._tempActor === tempActor) return;
    this._tempActor = tempActor;
    this.refresh();
};

Window_StatCompare.prototype.drawItem = function(x, y, paramId) {
		this.drawDarkRect(x, y, this.contents.width, this.lineHeight());
		this.drawParamName(y, paramId);
    this.drawCurrentParam(y, paramId);
		this.drawRightArrow(y);
    if (!this._tempActor) return;
		this.drawNewParam(y, paramId);
		this.drawParamDifference(y, paramId);
};

Window_StatCompare.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_StatCompare.prototype.drawParamName = function(y, paramId) {
    var x = this.textPadding();
		this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), x, y, this._paramNameWidth);
};

Window_StatCompare.prototype.drawCurrentParam = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
		x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
		this.resetTextColor();
		var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawRightArrow = function(y) {
		var x = this.contents.width - this.textPadding();
		x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
		var dw = this.textWidth('\u2192' + ' ');
		this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
};

Window_StatCompare.prototype.drawNewParam = function(y, paramId) {
		var x = this.contents.width - this.textPadding();
		x -= this._paramValueWidth + this._bonusValueWidth;
		var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
		var actorparam = Yanfly.Util.toGroup(newValue);
		this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawParamDifference = function(y, paramId) {
		var x = this.contents.width - this.textPadding();
		x -= this._bonusValueWidth;
		var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
		if (diffvalue === 0) return;
		var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
		var text = Yanfly.Util.toGroup(diffvalue);
		if (diffvalue > 0) {
			text = ' (+' + text + ')';
		} else {
			text = ' (' + text + ')';
		}
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.CCC.Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    Yanfly.CCC.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('class', this.commandPersonal.bind(this));
};

Yanfly.CCC.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
    if (this._commandWindow.currentSymbol() === 'class') {
			SceneManager.push(Scene_Class);
		} else {
			Yanfly.CCC.Scene_Menu_onPersonalOk.call(this);
		}
};

//=============================================================================
// Scene_Class
//=============================================================================

function Scene_Class() {
    this.initialize.apply(this, arguments);
}

Scene_Class.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Class.prototype.constructor = Scene_Class;

Scene_Class.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Class.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
		this.createCommandWindow();
		this.createStatusWindow();
		this.createItemWindow();
		this.createCompareWindow();
    this.refreshActor();
};

Scene_Class.prototype.createCommandWindow = function() {
		this._commandWindow = new Window_ClassCommand();
		this._commandWindow.y = this._helpWindow.height;
		this._commandWindow.setHandler('ok', this.commandOk.bind(this));
		this._commandWindow.setHandler('cancel', this.popScene.bind(this));
		this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
		this.addWindow(this._commandWindow);
};

Scene_Class.prototype.createStatusWindow = function() {
    var wx = this._commandWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._commandWindow.height;
    this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
};

Scene_Class.prototype.createItemWindow = function() {
    var wx = 0;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ClassList(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
};

Scene_Class.prototype.createCompareWindow = function() {
    var wx = this._itemWindow.width;
		var wy = this._itemWindow.y;
		var ww = Graphics.boxWidth - wx;
		var wh = Graphics.boxHeight - wy;
		this._compareWindow = new Window_StatCompare(wx, wy, ww, wh);
		this._itemWindow.setStatusWindow(this._compareWindow);
    this.addWindow(this._compareWindow);
};

Scene_Class.prototype.refreshActor = function() {
    var actor = this.actor();
    this._statusWindow.setActor(actor);
		this._itemWindow.setActor(actor);
		this._compareWindow.setActor(actor);
};

Scene_Class.prototype.refreshWindows = function() {
		this._itemWindow.refresh();
		this._statusWindow.refresh();
		this._compareWindow.refresh();
};

Scene_Class.prototype.commandOk = function() {
		this._itemWindow.activate();
		this._itemWindow.selectLast();
};

Scene_Class.prototype.onItemOk = function() {
		SoundManager.playEquip();
		var classId = this._itemWindow.item();
		var hpRate = this.actor().hp / this.actor().mhp;
		var mpRate = this.actor().mp / this.actor().mmp;
		this.actor().changeClass(classId, eval(Yanfly.Param.CCCMaintainLv));
		this.actor().setHp(parseInt(this.actor().mhp * hpRate));
		this.actor().setMp(parseInt(this.actor().mmp * mpRate));
		this._itemWindow.activate();
		this.refreshWindows();
};

Scene_Class.prototype.onItemCancel = function() {
		this._itemWindow.deselect();
    this._commandWindow.activate();
		this._helpWindow.setItem(null);
};

Scene_Class.prototype.onActorChange = function() {
    this.refreshActor();
    this._commandWindow.activate();
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
		Yanfly.Util.toGroup = function(inVal) {
				return inVal;
		}
};

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
