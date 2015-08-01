//=============================================================================
// Yanfly Engine Plugins - Party System
// YEP_PartySystem.js
// Last Updated: 2015.07.30
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_PartySystem"] = true;

//=============================================================================
 /*:
 * @plugindesc Replaces the default 'Formation' command with a new menu for
 * players to easily change party formations.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Max Battle Members
 * @desc Maximum amount of actors that can participate in battle.   .
 * Default: 4
 * @default 4
 *
 * @param ---Menu---
 * @default
 *
 * @param Text Alignment
 * @desc The text alignment for the command window.                 .
 * @default center
 *
 * @param Change Command
 * @desc How the 'Change' command appears in the command menu.
 * @default Change
 *
 * @param Remove Command
 * @desc How the 'Remove' command appears in the command menu.
 * @default Remove
 *
 * @param Revert Command
 * @desc How the 'Revert' command appears in the command menu.
 * @default Revert
 *
 * @param Finish Command
 * @desc How the 'Finish' command appears in the command menu.
 * @default Finish
 *
 * @param ---Selection---
 * @default
 *
 * @param Empty Text
 * @desc What text to display in an empty party slot.
 * @default - Empty -
 *
 * @param Actor Face
 * @desc Show the actor's face?                                     .
 * NO - false     YES - true
 * @default true
 *
 * @param Actor Sprite
 * @desc Show the actor's sprite?                                   .
 * NO - false     YES - true
 * @default true
 *
 * @param ---List---
 * @default
 *
 * @param Remove Text
 * @desc The text used to display the "Remove" command in the party
 * member list.
 * @default Remove
 *
 * @param Remove Icon
 * @desc The icon used to display next to the "Remove" command in the
 * party member list.
 * @default 16
 *
 * @param Sprite Y Buffer
 * @desc This is the amount to adjust the actor graphic by.
 * @default 16
 *
 * @param In Party Text Color
 * @desc This is the text color to be used if the actor is currently
 * in the party.
 * @default 6
 *
 * @param ---Locking---
 * @default
 *
 * @param Lock First Actor
 * @desc Allows you to lock the first actor in the game by default.
 * OFF - false     ON - true
 * @default false
 *
 * @param Locked Icon
 * @desc This sets what icon to be used when an actor is locked.
 * @default 195
 *
 * @param Required Icon
 * @desc This sets what icon to be used when an actor is required.
 * @default 205
 *
 * @help
 * This plugin replaces the "Formation" command found in the in-game menu with
 * a new scene where the player can adjust the party he or she wants in a more
 * comfortable way.
 *                                                                  .
 * This plugin is plug and play. All you have to do is just turn it on and
 * change the parameters to your liking.
 *
 * Plugin Command:
 *   OpenPartyMenu     Opens up the Party Menu from the field.
 *
 * Actors can also be required, meaning the player must have that actor(s) in
 * the party before the player is able to leave the party menu. Required actors
 * can be moved around, unlike locked actors. Keep in mind if you do make some
 * actors required, do not make the game require more actors than the possible
 * maximum battle members or else the player will be stuck in the party menu.
 *
 * Plugin Command:
 *   LockActor 3          - Locks actor 3.
 *   LockActor 4 5 6      - Locks actors 4, 5, and 6.
 *   UnlockActor 3        - Unlocks actor 3.
 *   UnlockActor 4 5 6    - Unlocks actors 4, 5, and 6.
 *                        * Locked Actors cannot be moved out of their current
                            position and must be in the party.
 *
 *   RequireActor 3       - Player must have actor 3 in party.
 *   RequireActor 4 5 6   - Player must have actors 4, 5, and 6 in party.
 *   UnrequireActor 3     - Player no longer needs actor 3 in party.
 *   UnrequireActor 4 5 6 - Player no longer needs actors 4, 5, and 6 in party.
 *                        * Required Actors must be in the party in order for
 *                          the player to be able to exit the party menu.
 *
 * ChangeLog:
 *   2015.07.30 - Combined plugin with Actor Lock.
 *   2015.07.18 - Code efficiency update and added Plugin Command.
 *   2015.07.17 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_PartySystem');

//=============================================================================
// Game_Actor
//=============================================================================

var _YEP_PARTY_Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    _YEP_PARTY_Game_Actor_setup.call(this, actorId);
    this.initLocked();
};

Game_Actor.prototype.initLocked = function() {
    this._locked = false;
    this._required = false;
};

var _YEP_PARTY_Game_Actor_isFormationChangeOk =
    Game_Actor.prototype.isFormationChangeOk;
Game_Actor.prototype.isFormationChangeOk = function() {
    if (this._locked) return false;
    return _YEP_PARTY_Game_Actor_isFormationChangeOk.call(this);
};

//=============================================================================
// Game_Party
//=============================================================================

var _YEP_PARTY_Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    _YEP_PARTY_Game_Party_initialize.call(this);
    this.initializeBattleMembers();
};

Game_Party.prototype.battleMembers = function() {
    if (this.toInitializeBattleMembers()) this.initializeBattleMembers();
    var battleParty = [];
    for (var i = 0; i < this._battleMembers.length; ++i) {
      var actorId = this._battleMembers[i];
      if (battleParty.length > this.maxBattleMembers()) break;
      if (actorId === null) continue;
      if (!$gameActors.actor(actorId)) continue;
      if (!$gameActors.actor(actorId).isAppeared()) continue;
      battleParty.push($gameActors.actor(actorId));
    }
    return battleParty;
};

var _yep_party_maxMembers = String(parameters['Max Battle Members'] || '4');
Game_Party.prototype.maxBattleMembers = function() {
    return Math.max(_yep_party_maxMembers, 1);
};

var _yep_party_lockFirst = String(parameters['Lock First Actor'] || 'false');
var _YEP_PARTY_Game_Party_setupStartingMembers =
    Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function() {
    _YEP_PARTY_Game_Party_setupStartingMembers.call(this);
    this.initializeBattleMembers();
    if (_yep_party_lockFirst) this.lockActor(this._actors[0]);
};

Game_Party.prototype.toInitializeBattleMembers = function() {
    if (this._battleMembers === null) return true;
    return (this._battleMembers.length !== this.maxBattleMembers());
};

var _YEP_PARTY_Game_Party_setupBattleTestMembers =
    Game_Party.prototype.setupBattleTestMembers;
Game_Party.prototype.setupBattleTestMembers = function() {
    _YEP_PARTY_Game_Party_setupBattleTestMembers.call(this);
    if (_yep_party_lockFirst) this.lockActor(this._actors[0]);
};

Game_Party.prototype.initializeBattleMembers = function() {
    this._battleMembers = [];
    for (var i = 0; i < this.maxBattleMembers(); ++i) {
      if (this._actors[i]) {
        this._battleMembers.push(this._actors[i]);
      } else {
        this._battleMembers.push(0);
      }
    }
    if ($gamePlayer) $gamePlayer.refresh();
};

var _YEP_PARTY_Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    _YEP_PARTY_Game_Party_addActor.call(this, actorId);
    if (this._battleMembers.contains(actorId)) return;
    if (!this._battleMembers.contains(0)) return;
    var index = this._battleMembers.indexOf(0);
    this._battleMembers[index] = actorId;
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    this.rearrangeActors();
};

var _YEP_PARTY_Game_Party_removeActor = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
    _YEP_PARTY_Game_Party_removeActor.call(this, actorId);
    if (!this._battleMembers.contains(actorId)) return;
    var index = this._battleMembers.indexOf(actorId);
    this._battleMembers[index] = 0;
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    this.rearrangeActors();
};

Game_Party.prototype.rearrangeActors = function() {
    if (this._battleMembers === null) this.initializeBattleMembers();
    var array = [];
    for (var i = 0; i < this._battleMembers.length; ++i) {
      var actorId = this._battleMembers[i];
      if (actorId !== null && $gameActors.actor(actorId)) {
        array.push(actorId);
      }
    }
    for (var i = 0; i < this._actors.length; ++i) {
      var actorId = this._actors[i];
      if (!array.contains(actorId) && $gameActors.actor(actorId) !== null) {
        array.push(actorId)
      }
    }
    this._actors = array;
};

Game_Party.prototype.lockActor = function(actorId) {
    var actor = $gameActors.actor(actorId);
    if (actor) actor._locked = true;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _YEP_PARTY_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _YEP_PARTY_Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'OpenPartyMenu') this.gotoSceneParty();
    if (command === 'LockActor') this.lockActor(args, true);
    if (command === 'UnlockActor') this.lockActor(args, false);
    if (command === 'RequireActor') this.requireActor(args, true);
    if (command === 'UnrequireActor') this.requireActor(args, false);
};

Game_Interpreter.prototype.gotoSceneParty = function() {
    if (!$gameParty.inBattle()) SceneManager.push(Scene_Party);
    return true;
};

Game_Interpreter.prototype.lockActor = function(args, value) {
    for (i = 0; i < args.length; i++) {
      var actorId = Number(args[i]);
      if ($gameActors.actor(actorId)) {
        $gameActors.actor(actorId)._locked = value;
      }
    }
};

Game_Interpreter.prototype.requireActor = function(args, value) {
    for (i = 0; i < args.length; i++) {
      var actorId = Number(args[i]);
      if ($gameActors.actor(actorId)) {
        $gameActors.actor(actorId)._required = value;
      }
    }
};

//=============================================================================
// Window_PartyMenuCommand
//=============================================================================

Window_PartyMenuCommand = function() {
    this.initialize.apply(this, arguments);
}

Window_PartyMenuCommand.prototype = Object.create(Window_Command.prototype);
Window_PartyMenuCommand.prototype.constructor = Window_PartyMenuCommand;

Window_PartyMenuCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
};

Window_PartyMenuCommand.prototype.windowWidth = function() {
    var ww = $gameParty.maxBattleMembers() * Window_Base._faceWidth;
    ww += this.standardPadding() * 2;
    return (Graphics.boxWidth - ww).clamp(Graphics.boxWidth / 4, 240);
};

Window_PartyMenuCommand.prototype.numVisibleRows = function() {
    return 4;
};

var _yep_party_textAlign = String(parameters['Text Alignment'] || 'center');
Window_PartyMenuCommand.prototype.itemTextAlign = function() {
    return _yep_party_textAlign;
};

var _yep_party_command1 = String(parameters['Change Command'] || 'Change');
var _yep_party_command2 = String(parameters['Remove Command'] || 'Remove');
var _yep_party_command3 = String(parameters['Revert Command'] || 'Revert');
var _yep_party_command4 = String(parameters['Cancel Command'] || 'Cancel');
Window_PartyMenuCommand.prototype.makeCommandList = function() {
    this.addChangeCommand();
    this.addRemoveCommand();
    this.addRevertCommand();
    this.addCustomCommand();
    this.addCancelCommand();
};

Window_PartyMenuCommand.prototype.addChangeCommand = function() {
    this.addCommand(_yep_party_command1, 'change');
};

Window_PartyMenuCommand.prototype.addRemoveCommand = function() {
    this.addCommand(_yep_party_command2, 'remove');
};

Window_PartyMenuCommand.prototype.addRevertCommand = function() {
    this.addCommand(_yep_party_command3, 'revert');
};

Window_PartyMenuCommand.prototype.addCustomCommand = function() {
};

Window_PartyMenuCommand.prototype.addCancelCommand = function() {
    this.addCommand(_yep_party_command4, 'cancel', this.isCancelEnabled());
};

Window_PartyMenuCommand.prototype.inParty = function(actor) {
    return ($gameParty.battleMembers().contains(actor));
};

Window_PartyMenuCommand.prototype.isCancelEnabled = function() {
    if ($gameParty.battleMembers().length <= 0) return false;
    for (var i = 0; i < $gameParty._actors.length; ++i) {
      var actorId = $gameParty._actors[i];
      if (this.refuseCancel(actorId)) return false;
    }
    return true
};

Window_PartyMenuCommand.prototype.refuseCancel = function(actorId) {
    if ($gameParty._battleMembers.contains(actorId)) return false;
    if ($gameActors.actor(actorId)._locked) return true;
    if ($gameActors.actor(actorId)._required) return true;
    return $gameActors.actor(actorId).isFormationChangeOk();
};

//=============================================================================
// Window_PartySelect
//=============================================================================

Window_PartySelect = function() {
    this.initialize.apply(this, arguments);
}

Window_PartySelect.prototype = Object.create(Window_Selectable.prototype);
Window_PartySelect.prototype.constructor = Window_PartySelect;

Window_PartySelect.prototype.initialize = function(commandWindow) {
    var wx = commandWindow.width;
    var wy = commandWindow.y;
    var ww = Graphics.boxWidth - commandWindow.width;
    var wh = commandWindow.height;
    Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
    this.select(-1);
    this.deactivate();
    this.refresh();
};

Window_PartySelect.prototype.maxCols = function() {
    return $gameParty.maxBattleMembers();
};

Window_PartySelect.prototype.maxItems = function() {
    return $gameParty.maxBattleMembers();
};

Window_PartySelect.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    rect.width = this.contents.width / this.maxItems();
    rect.height = this.contents.height;
    rect.x = index * rect.width;
    rect.y = 0;
    return rect;
};

Window_PartySelect.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_PartySelect.prototype.makeItemList = function() {
    this._data = $gameParty._battleMembers.slice(0);
};

Window_PartySelect.prototype.drawItem = function(index) {
    var actor = $gameActors.actor(this._data[index]);
    var rect = this.itemRect(index);
    rect.x += this.textPadding() / 2;
    rect.y += this.textPadding() / 2;
    rect.width -= this.textPadding();
    rect.height -= this.textPadding();
    if (actor) {
      this.drawActor(rect, actor);
    } else {
      this.drawEmpty(rect);
    }
};

var _yep_party_empty = String(parameters['Empty Text'] || '- Empty -');
Window_PartySelect.prototype.drawEmpty = function(rect) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    this.changePaintOpacity(true);
    this.resetFontSettings();
    var text = _yep_party_empty
    this.contents.drawText(text, rect.x, rect.y, rect.width,
        rect.height, 'center');
};

var _yep_party_showface = String(parameters['Actor Face'] || 'true');
var _yep_party_showchar = String(parameters['Actor Sprite'] || 'true');
Window_PartySelect.prototype.drawActor = function(rect, actor) {
    if (eval(_yep_party_showface)) {
      this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
    }
    if (eval(_yep_party_showchar)) {
      var ry = rect.height * 19/20;
      this.drawActorCharacter(actor, rect.x + rect.width / 2, ry);
    }
    this.drawActorName(actor, rect.x, rect.y, rect.width);
    this.drawLockedIcon(actor, rect);
    this.drawRequiredIcon(actor, rect);
};

var _yep_party_lockIcon = Number(parameters['Locked Icon'] || 0);
Window_PartySelect.prototype.drawLockedIcon = function(actor, rect) {
    if (!actor._locked) return;
    var ix = rect.x + rect.width - Window_Base._iconWidth - 2;
    var iy = rect.y + rect.height - Window_Base._iconHeight - 2;
    this.drawIcon(_yep_party_lockIcon, ix, iy)
};

var _yep_party_reqIcon = Number(parameters['Required Icon'] || 0);
Window_PartySelect.prototype.drawRequiredIcon = function(actor, rect) {
    if (!actor._required) return;
    var ix = rect.x + 2;
    var iy = rect.y + rect.height - Window_Base._iconHeight - 2;
    this.drawIcon(_yep_party_reqIcon, ix, iy)
};

Window_PartySelect.prototype.curActor = function() {
    var actorId = this._data[this._index];
    return $gameActors.actor(actorId);
};

Window_PartySelect.prototype.prevActor = function() {
    var id = this._index === 0 ? this._data.length - 1 : this._index - 1;
    var actorId = this._data[id];
    return $gameActors.actor(actorId);
};

Window_PartySelect.prototype.nextActor = function() {
    var id = this._index === this._data.length - 1 ? 0 : this._index + 1;
    var actorId = this._data[id];
    return $gameActors.actor(actorId);
};

Window_PartySelect.prototype.processActor = function(value) {
    return true;
};

Window_PartySelect.prototype.isCurrentItemEnabled = function() {
    if (this.curActor()) return this.curActor().isFormationChangeOk();
    return true;
};

Window_PartySelect.prototype.processPageup = function() {
    if (this.curActor() && this.curActor()._locked) {
      this.playBuzzerSound();
    } else if (this.prevActor() && this.prevActor()._locked) {
      this.playBuzzerSound();
    } else if (this.processActor('prevActor')) {
      Window_Selectable.prototype.processPageup.call(this);
      this.activate();
      this.select(this._index === 0 ? this._data.length - 1 : this._index - 1)
    } else {
      this.playBuzzerSound();
    }
};

Window_PartySelect.prototype.processPagedown = function() {
    if (this.curActor() && this.curActor()._locked) {
      this.playBuzzerSound();
    } else if (this.nextActor() && this.nextActor()._locked) {
      this.playBuzzerSound();
    } else if (this.processActor('nextActor')) {
      Window_Selectable.prototype.processPagedown.call(this);
      this.activate();
      this.select(this._index === this._data.length - 1 ? 0 : this._index + 1)
    } else {
      this.playBuzzerSound();
    }
};

Window_PartySelect.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.curActor());
};

Window_PartySelect.prototype.setHelpWindowItem = function(actor) {
    if (this._helpWindow && actor) {
        this._helpWindow.setText(actor.profile());
    } else if (this._helpWindow) {
        this._helpWindow.clear();
    }
};

Window_PartySelect.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

//=============================================================================
// Window_PartyList
//=============================================================================

Window_PartyList = function() {
    this.initialize.apply(this, arguments);
}

Window_PartyList.prototype = Object.create(Window_Selectable.prototype);
Window_PartyList.prototype.constructor = Window_PartyList;

Window_PartyList.prototype.initialize = function(partyWindow) {;
    var wy = partyWindow.y + partyWindow.height;
    var ww = this.windowWidth();
    var wh = Graphics.boxHeight - wy;
    Window_Selectable.prototype.initialize.call(this, 0, wy, ww, wh);
    this.select(1);
    this.deactivate();
    this.refresh();
};

Window_PartyList.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_PartyList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_PartyList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_PartyList.prototype.makeItemList = function() {
    this._data = [0];
    this.createActorOrder();
    this._data.push(0);
};

Window_PartyList.prototype.createActorOrder = function() {
    for (var i = 0; i < $dataActors.length; ++i) {
      if ($gameParty._actors.contains(i)) this._data.push(i);
    }
};

Window_PartyList.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

Window_PartyList.prototype.drawItem = function(index) {
    this.clearItem(index);
    var rect = this.itemRect(index);
    if (this._data[index] === 0) {
      this.drawRemove(rect);
      return;
    }
    var actor = $gameActors.actor(this._data[index]);
    this.drawActor(actor, rect);
};

var _yep_party_removeIcon = Number(parameters['Remove Icon'] || 16);
Window_PartyList.prototype.drawRemove = function(rect) {
    var ibw = Window_Base._iconWidth + 4;
    rect.width -= this.textPadding();
    this.drawIcon(_yep_party_removeIcon, rect.x + 2, rect.y + 2);
    this.drawText(_yep_party_command2, rect.x + ibw, rect.y, rect.width - ibw);
};

Window_PartyList.prototype.drawActor = function(actor, rect) {
    this.drawBasic(actor, rect);
    this.drawExtra(actor, rect);
};

var _yep_party_yBuffer = Number(parameters['Sprite Y Buffer'] || 12);
Window_PartyList.prototype.drawBasic = function(actor, rect) {
    var wx = Window_Base._iconWidth / 2 + this.textPadding() / 2;
    var wy = rect.y + rect.height + _yep_party_yBuffer
    this.drawActorCharacter(actor, wx, wy);
    this.changeTextColor(this.listColor(actor));
    this.changePaintOpacity(this.actorIsEnabled(actor));
    var ibw = Window_Base._iconWidth + 4;
    this.drawText(actor.name(), rect.x + ibw, rect.y);
    this.changePaintOpacity(true);
    this.resetFontSettings();
};

Window_PartyList.prototype.drawExtra = function(actor, rect) {
    var section = this.itemSection();
    this.drawActorLevel(actor, section * 2, rect.y);
    this.drawActorHp(actor, section * 3, rect.y, section - 6);
    this.drawActorMp(actor, section * 4, rect.y, section - 6);
    this.drawRestrictions(actor, rect);
};

Window_PartyList.prototype.drawRestrictions = function(actor, rect) {
    var section = this.itemSection();
    var wx = section * 2 - Window_Base._iconWidth - 2;
    if (actor._locked) {
      this.drawIcon(_yep_party_lockIcon, wx, rect.y);
      wx -= Window_Base._iconWidth;
    }
    if (actor._required) {
      this.drawIcon(_yep_party_reqIcon, wx, rect.y);
    }
};

Window_PartyList.prototype.itemSection = function() {
    return this.contents.width / 5;
};

Window_PartyList.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
		var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth(toGroup(max));
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    this.changeTextColor(color1);
    this.drawText(toGroup(current), x1, y, valueWidth, 'right');
};

var _yep_party_inPartyColor = Number(parameters['In Party Text Color'] || 6);
Window_PartyList.prototype.listColor = function(actor) {
    if (actor.isBattleMember()) {
      return this.textColor(_yep_party_inPartyColor);
    }
    return this.normalColor()
};

Window_PartyList.prototype.curActor = function() {
    var actorId = this._data[this._index];
    return $gameActors.actor(actorId);
};

Window_PartyList.prototype.isCurrentItemEnabled = function() {
    if (this.curActor()) return this.curActor().isFormationChangeOk();
    return true;
};

Window_PartyList.prototype.actorIsEnabled = function(actor) {
    return actor.isAppeared();
};

Window_PartyList.prototype.updateHelp = function() {
    this.setHelpWindowItem($gameActors.actor(this.item()));
};

Window_PartyList.prototype.setHelpWindowItem = function(actor) {
    if (this._helpWindow && actor) {
        this._helpWindow.setText(actor.profile());
    } else if (this._helpWindow) {
        this._helpWindow.clear();
    }
};

Window_PartyList.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

//=============================================================================
// Scene_Menu
//=============================================================================

Scene_Menu.prototype.commandFormation = function() {
    SceneManager.push(Scene_Party);
};

//=============================================================================
// Scene_Party
//=============================================================================

Scene_Party = function() {
    this.initialize.apply(this, arguments);
}

Scene_Party.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Party.prototype.constructor = Scene_Party;

Scene_Party.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this._formerParty = $gameParty._battleMembers.slice(0);
};

Scene_Party.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCommandWindow();
    this.createPartyWindow();
    this.createListWindow();
};

Scene_Party.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_PartyMenuCommand(0, 0);
    this._commandWindow.y = this._helpWindow.height;
    this._commandWindow.setHandler('change', this.commandAdjust.bind(this));
    this._commandWindow.setHandler('remove', this.commandAdjust.bind(this));
    this._commandWindow.setHandler('revert', this.commandRevert.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Party.prototype.createPartyWindow = function() {
    this._partyWindow = new Window_PartySelect(this._commandWindow);
    this._partyWindow.setHelpWindow(this._helpWindow);
    this._partyWindow.setHandler('ok',       this.onPartyOk.bind(this));
    this._partyWindow.setHandler('cancel',   this.onPartyCancel.bind(this));
    this._partyWindow.setHandler('pageup',   this.onPartyPageUp.bind(this));
    this._partyWindow.setHandler('pagedown', this.onPartyPageDown.bind(this));
    this.addWindow(this._partyWindow);
};

Scene_Party.prototype.createListWindow = function() {
    this._listWindow = new Window_PartyList(this._partyWindow);
    this._listWindow.setHelpWindow(this._helpWindow);
    this._listWindow.setHandler('ok',     this.onListOk.bind(this));
    this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
    this.addWindow(this._listWindow);
};

Scene_Party.prototype.refreshWindows = function() {
    $gameParty.rearrangeActors();
    this._commandWindow.refresh();
    this._partyWindow.refresh();
    this._listWindow.refresh();
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
};

Scene_Party.prototype.commandAdjust = function() {
    this._partyWindow.activate();
    this._partyWindow.select(0);
};

Scene_Party.prototype.commandRevert = function() {
    this._commandWindow.activate();
    $gameParty._battleMembers = this._formerParty.slice(0);
    this.refreshWindows();
};

Scene_Party.prototype.onPartyOk = function() {
    var symbol = this._commandWindow.currentSymbol();
    if (symbol === 'change') {
      this._listWindow.activate()
    } else if (symbol === 'remove') {
      SoundManager.playEquip();
      var index = this._partyWindow._index;
      var actor = $gameActors.actor($gameParty._battleMembers[index]);
      $gameParty._battleMembers[index] = 0
      this.refreshWindows();
      this._partyWindow.activate();
    }
};

Scene_Party.prototype.onPartyCancel = function() {
    this._partyWindow.select(-1);
    this._commandWindow.activate();
};

Scene_Party.prototype.onPartyPageUp = function() {
    SoundManager.playEquip();
    var actorId1 = this._partyWindow.item();
    if (!this._partyWindow.prevActor()) {
      var actorId2 = 0;
    } else {
      var actorId2 = this._partyWindow.prevActor().actorId();
    }
    var max = this._partyWindow.maxItems() - 1;
    var index1 = this._partyWindow._index;
    var index2 = this._partyWindow._index === 0 ? max : index1 - 1;
    $gameParty._battleMembers[index1] = actorId2;
    $gameParty._battleMembers[index2] = actorId1;
    this.refreshWindows();
};

Scene_Party.prototype.onPartyPageDown = function() {
    SoundManager.playEquip();
    var actorId1 = this._partyWindow.item();
    if (!this._partyWindow.nextActor()) {
      var actorId2 = 0;
    } else {
      var actorId2 = this._partyWindow.nextActor().actorId();
    }
    var max = this._partyWindow.maxItems() - 1;
    var index1 = this._partyWindow._index;
    var index2 = this._partyWindow._index === max ? 0 : index1 + 1;
    $gameParty._battleMembers[index1] = actorId2;
    $gameParty._battleMembers[index2] = actorId1;
    this.refreshWindows();
};

Scene_Party.prototype.onListCancel = function() {
    this._partyWindow.activate();
};

Scene_Party.prototype.onListOk = function() {
    SoundManager.playEquip();
    if (this._listWindow.item() <= 0) {
      this.otherAction();
    } else {
      this.switchActors();
    }
    this.refreshWindows();
    this._partyWindow.activate();
};

Scene_Party.prototype.otherAction = function() {
    if (this._listWindow.item() === 0) {
      $gameParty._battleMembers[this._partyWindow._index] = 0;
    }
};

Scene_Party.prototype.switchActors = function() {
    var targetId = this._listWindow.item();
    var targetIndex = this._partyWindow._index;
    if ($gameParty._battleMembers.contains(targetId)) {
      var switchId = this._partyWindow.item();
      var switchIndex = $gameParty._battleMembers.indexOf(targetId);
      $gameParty._battleMembers[switchIndex] = switchId;
    };
    $gameParty._battleMembers[targetIndex] = targetId;
};

//=============================================================================
// Other Functions
//=============================================================================

if (typeof toGroup !== 'function'){
		toGroup = function(inVal) {
				return inVal;
		}
}

//=============================================================================
// End of File
//=============================================================================
