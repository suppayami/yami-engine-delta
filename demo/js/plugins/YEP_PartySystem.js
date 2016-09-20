//=============================================================================
// Yanfly Engine Plugins - Party System
// YEP_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_PartySystem = true;

var Yanfly = Yanfly || {};
Yanfly.Party = Yanfly.Party || {};

//=============================================================================
 /*:
 * @plugindesc v1.09 Replaces the default 'Formation' command with a new
 * menu for players to easily change party formations.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Max Battle Members
 * @desc Maximum amount of actors that can participate in battle.
 * Default: 4
 * @default 4
 *
 * @param Show Battle Command
 * @desc Show the 'Formation' command in the Party Command Window?
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Battle Command
 * @desc Enable the 'Formation' command in the Party Command Window?
 * NO - false     YES - true
 * @default true
 *
 * @param Battle Cooldown
 * @desc How many turns must the player wait after changing party?
 * @default 1
 *
 * @param Maximum Followers
 * @desc Maximum number of followers on the map.
 * Default: 4
 * @default 4
 *
 * @param EXP Distribution
 * @desc Divide battle EXP gained across live members?
 * NO - false     YES - true
 * @default false
 *
 * @param ---Menu---
 * @default
 *
 * @param Help Window
 * @desc Show the Help Window in the party menu?
 * NO - false     YES - true
 * @default false
 *
 * @param Text Alignment
 * @desc The text alignment for the command window.
 * left     center     right
 * @default center
 *
 * @param Change Command
 * @desc How the 'Change' command appears in the command menu.
 * Leave this blank to remove it.
 * @default Change
 *
 * @param Remove Command
 * @desc How the 'Remove' command appears in the command menu.
 * Leave this blank to remove it.
 * @default Remove
 *
 * @param Revert Command
 * @desc How the 'Revert' command appears in the command menu.
 * Leave this blank to remove it.
 * @default Revert
 *
 * @param Finish Command
 * @desc How the 'Finish' command appears in the command menu.
 * Leave this blank to remove it.
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
 * @desc Show the actor's face?
 * NO - false     YES - true
 * @default true
 *
 * @param Actor Sprite
 * @desc Show the actor's sprite?
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
 * @param ---Detail Window---
 * @default
 *
 * @param Enable Detail Window
 * @desc Make use of the detailed party window next to the list.
 * NO - false     YES - true
 * @default true
 *
 * @param List Width
 * @desc If detail window is enabled, what is the width of the
 * party list window?
 * @default 300
 *
 * @param Actor Parameters
 * @desc If there is enough room, this is the text shown to list
 * the actor's parameters.
 * @default Parameters
 *
 * @param Actor Equipment
 * @desc If there is enough room, this is the text shown to list
 * the actor's equipment.
 * @default Equipment
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin replaces the "Formation" command found in the in-game menu with
 * a new scene where the player can adjust the party he or she wants in a more
 * comfortable way.
 *
 * If you are using YEP_BattleEngineCore.js and would like to enable party
 * switching mid-battle, place this plugin under YEP_BattleEngineCore.js in
 * the plugin's list.
 *
 * This plugin is plug and play. All you have to do is just turn it on and
 * change the parameters to your liking.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Here are some plugin commands you can use!
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
 *   ShowBattleFormation    - Shows 'Formation' command in battle.
 *   HideBattleFormation    - Hides 'Formation' command in battle.
 *   EnableBattleFormation  - Enables 'Formation' command in battle.
 *   DisableBattleFormation - Disables 'Formation' command in battle.
 *
 *   LockActor 3          - Locks actor 3.
 *   LockActor 4 5 6      - Locks actors 4, 5, and 6.
 *   UnlockActor 3        - Unlocks actor 3.
 *   UnlockActor 4 5 6    - Unlocks actors 4, 5, and 6.
 *                        * Locked Actors cannot be moved out of their current
 *                          position and must be in the party.
 *
 *   RequireActor 3       - Player must have actor 3 in party.
 *   RequireActor 4 5 6   - Player must have actors 4, 5, and 6 in party.
 *   UnrequireActor 3     - Player no longer needs actor 3 in party.
 *   UnrequireActor 4 5 6 - Player no longer needs actors 4, 5, and 6 in party.
 *                        * Required Actors must be in the party in order for
 *                          the player to be able to exit the party menu.
 *
 *   ChangePartyMax 5     - Changes max party size to 5.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - Fixed a bug that caused party members to not index themselves properly in
 * battle. When in battle, actor index will now refer to the index of their
 * battle member positions.
 *
 * Version 1.08:
 * - Added 'EXP Distribution' parameter into the plugin parameters. Enabling
 * this will cause the EXP distributed to party members to be divided based on
 * the number of alive members at the end of battle.
 *
 * Version 1.07:
 * - Fixed a bug that caused music to not replay properly when accessing the
 * Party change menu from battle.
 *
 * Version 1.06:
 * - Fixed a bug with certain actors not drawing properly.
 * 
 * Version 1.05:
 * - Added 'Maximum Followers' parameter. This number should be the maximum
 * number you have in your game if you ever increase the maximum party size
 * midway through your game.
 *
 * Version 1.04:
 * - Fixed a visual bug with mid-battle formation changing against backgrounds
 * without battlebacks.
 * - Formation changes during mid-battle will resume bgm/bgs currently played.
 *
 * Version 1.03:
 * - Fixed a bug that would cause AutoBattlers to stall if they got added into
 * the party mid-battle.
 *
 * Version 1.02:
 * - Made a change so that the number of followers updates properly when you
 * increase the maximum number of battle members.
 *
 * Version 1.01:
 * - Added 'Battle Cooldown' plugin parameter.
 * - Added 'ChangePartyMax x' plugin command.
 * - Added feature where if you leave the class comand name empty, it will
 * remove the command.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_PartySystem');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.MaxBattleMembers = Number(Yanfly.Parameters['Max Battle Members']);
Yanfly.Param.PartyShowBattle = String(Yanfly.Parameters['Show Battle Command']);
Yanfly.Param.PartyEnBattle = String(Yanfly.Parameters['Enable Battle Command']);
Yanfly.Param.PartyCooldown = Number(Yanfly.Parameters['Battle Cooldown']);
Yanfly.Param.PartyMaxFollower = Number(Yanfly.Parameters['Maximum Followers']);
Yanfly.Param.ParamExpDis = eval(String(Yanfly.Parameters['EXP Distribution']));

Yanfly.Param.PartyHelpWindow = String(Yanfly.Parameters['Help Window']);
Yanfly.Param.PartyLockFirst = String(Yanfly.Parameters['Lock First Actor']);
Yanfly.Param.PartyTextAlign = String(Yanfly.Parameters['Text Alignment']);
Yanfly.Param.PartyCommand1 = String(Yanfly.Parameters['Change Command']);
Yanfly.Param.PartyCommand2 = String(Yanfly.Parameters['Remove Command']);
Yanfly.Param.PartyCommand3 = String(Yanfly.Parameters['Revert Command']);
Yanfly.Param.PartyCommand4 = String(Yanfly.Parameters['Finish Command']);
Yanfly.Param.PartyEmptyText = String(Yanfly.Parameters['Empty Text']);
Yanfly.Param.PartyShowFace = String(Yanfly.Parameters['Actor Face']);
Yanfly.Param.PartyShowCharacter = String(Yanfly.Parameters['Actor Sprite']);
Yanfly.Icon.PartyLocked = Number(Yanfly.Parameters['Locked Icon']);
Yanfly.Icon.PartyRequired = Number(Yanfly.Parameters['Required Icon']);
Yanfly.Icon.PartyRemove = Number(Yanfly.Parameters['Remove Icon']);
Yanfly.Param.PartySpriteBufferY = Number(Yanfly.Parameters['Sprite Y Buffer']);
Yanfly.Param.ColorInParty = Number(Yanfly.Parameters['In Party Text Color']);
Yanfly.Param.PartyDetailWin = String(Yanfly.Parameters['Enable Detail Window']);
Yanfly.Param.PartyListWidth = Number(Yanfly.Parameters['List Width']);
Yanfly.Param.PartyDetailParam = String(Yanfly.Parameters['Actor Parameters']);
Yanfly.Param.PartyDetailEquip = String(Yanfly.Parameters['Actor Equipment']);

//=============================================================================
// BattleManager
//=============================================================================

if (Yanfly.Param.ParamExpDis) {

Yanfly.Party.BattleManager_gainExp = BattleManager.gainExp;
BattleManager.gainExp = function() {
  var alive = $gameParty.aliveMembers().length;
  this._rewards.exp = Math.ceil(this._rewards.exp / alive);
  Yanfly.Party.BattleManager_gainExp.call(this);
};

}; // Yanfly.Param.ParamExpDis

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Party.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.Party.Game_System_initialize.call(this);
    this.initPartySettings();
};

Game_System.prototype.initPartySettings = function() {
    this._showBattleFormation = eval(Yanfly.Param.PartyShowBattle);
    this._battleFormationEnabled = eval(Yanfly.Param.PartyEnBattle);
};

Game_System.prototype.isShowBattleFormation = function() {
    if (this._showBattleFormation === undefined) this.initPartySettings();
    return this._showBattleFormation;
};

Game_System.prototype.setShowBattleFormation = function(value) {
    if (this._showBattleFormation === undefined) this.initPartySettings();
    this._showBattleFormation = value;
};

Game_System.prototype.isBattleFormationEnabled = function() {
    if (this._battleFormationEnabled === undefined) this.initPartySettings();
    if (this._battleFormationCooldown === undefined) {
      this.resetBattleFormationCooldown();
    }
    if (this._battleFormationCooldown > 0) return false;
    return this._battleFormationEnabled;
};

Game_System.prototype.setBattleFormationEnabled = function(value) {
    if (this._battleFormationEnabled === undefined) this.initPartySettings();
    this._battleFormationEnabled = value;
};

Game_System.prototype.resetBattleFormationCooldown = function() {
    this._battleFormationCooldown = 0;
};

Game_System.prototype.updateBattleFormationCooldown = function() {
    if (this._battleFormationCooldown === undefined) {
      this.resetBattleFormationCooldown();
    }
    this._battleFormationCooldown--;
};

Game_System.prototype.setBattleFormationCooldown = function() {
    this._battleFormationCooldown = Yanfly.Param.PartyCooldown;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Party.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.Party.Game_Actor_setup.call(this, actorId);
    this.initLocked();
};

Game_Actor.prototype.initLocked = function() {
    this._locked = false;
    this._required = false;
};

Yanfly.Party.Game_Actor_isFormationChangeOk =
    Game_Actor.prototype.isFormationChangeOk;
Game_Actor.prototype.isFormationChangeOk = function() {
    if (this._locked) return false;
    return Yanfly.Party.Game_Actor_isFormationChangeOk.call(this);
};

Yanfly.Party.Game_Actor_index = Game_Actor.prototype.index;
Game_Actor.prototype.index = function() {
    if ($gameParty.inBattle()) {
      return $gameParty.battleMembers().indexOf(this);
    } else {
      return Yanfly.Party.Game_Actor_index.call(this);
    }
    return $gameParty.members().indexOf(this);
};

//=============================================================================
// Game_Party
//=============================================================================

Yanfly.Party.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    Yanfly.Party.Game_Party_initialize.call(this);
    this.initBattleMaxSize();
    this.initializeBattleMembers();
};

Game_Party.prototype.initBattleMaxSize = function() {
    this._BattleMaxSize = Yanfly.Param.MaxBattleMembers;
    this.initializeBattleMembers();
};

Game_Party.prototype.changeBattleMax = function(value) {
    this._BattleMaxSize = value;
    this.initializeBattleMembers();
};

Game_Party.prototype.loadActorImages = function() {
    for (var i = 0; i < this.members().length; ++i) {
      var actor = this.members()[i];
      if (!actor) continue;
      ImageManager.loadFace(actor.faceName());
      ImageManager.loadCharacter(actor.characterName());
    }
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

Game_Party.prototype.maxBattleMembers = function() {
    if (this._BattleMaxSize === undefined) this.initBattleMaxSize();
    return Math.max(this._BattleMaxSize, 1);
};

Yanfly.Party.Game_Party_setupStartingMembers =
    Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function() {
    Yanfly.Party.Game_Party_setupStartingMembers.call(this);
    this.initializeBattleMembers();
    if (eval(Yanfly.Param.PartyLockFirst)) this.lockActor(this._actors[0]);
};

Game_Party.prototype.toInitializeBattleMembers = function() {
    if (this._battleMembers === null) return true;
    if (!this._battleMembers) this.initializeBattleMembers();
    return (this._battleMembers.length !== this.maxBattleMembers());
};

Yanfly.Party.Game_Party_setupBattleTestMembers =
    Game_Party.prototype.setupBattleTestMembers;
Game_Party.prototype.setupBattleTestMembers = function() {
    Yanfly.Party.Game_Party_setupBattleTestMembers.call(this);
    if (eval(Yanfly.Param.PartyLockFirst)) this.lockActor(this._actors[0]);
    for (var i = 0; i < $dataActors.length; ++i) {
      var actor = $dataActors[i];
      if (!actor) continue;
      if (this._battleMembers.contains(actor.id)) continue;
      this._actors.push(actor.id);
    }
    this.loadActorImages();
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

Yanfly.Party.Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    Yanfly.Party.Game_Party_addActor.call(this, actorId);
    if (this._battleMembers.contains(actorId)) return;
    if (!this._battleMembers.contains(0)) return;
    var index = this._battleMembers.indexOf(0);
    this._battleMembers[index] = actorId;
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    this.rearrangeActors();
};

Yanfly.Party.Game_Party_removeActor = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
    Yanfly.Party.Game_Party_removeActor.call(this, actorId);
    if (!this._battleMembers.contains(actorId)) return;
    var index = this._battleMembers.indexOf(actorId);
    this._battleMembers[index] = 0;
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    this.rearrangeActors();
};

Game_Party.prototype.rearrangeActors = function() {
    if (this._battleMembers === null) this.initializeBattleMembers();
    var battleArray = [];
    for (var i = 0; i < this._battleMembers.length; ++i) {
      var actorId = this._battleMembers[i];
      if (actorId === null) continue;
      if ($gameActors.actor(actorId)) battleArray.push(actorId);
    }
    var reserveArray = [];
    for (var i = 0; i < this._actors.length; ++i) {
      var actorId = this._actors[i];
      if (battleArray.contains(actorId)) continue;
      if ($gameActors.actor(actorId) === null) continue;
      reserveArray.push(actorId);
    }
    reserveArray = this.sortReserveParty(reserveArray);
    this._actors = battleArray.concat(reserveArray);
};

Game_Party.prototype.sortReserveParty = function(party) {
    party.sort(function(a, b) { return a - b; });
    return party;
};

Game_Party.prototype.lockActor = function(actorId) {
    var actor = $gameActors.actor(actorId);
    if (actor) actor._locked = true;
};

Game_Party.prototype.reconstructActions = function(actorId) {
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (!member) continue;
      if (member.currentAction() && member.currentAction().item()) continue;
      member.makeActions();
    }
};

Yanfly.Party.Game_Party_swapOrder = Game_Party.prototype.swapOrder;
Game_Party.prototype.swapOrder = function(index1, index2) {
    this.swapOrderBattleMembers(index1, index2);
    Yanfly.Party.Game_Party_swapOrder.call(this, index1, index2);
    this.rearrangeActors();
    $gamePlayer.refresh();
};

Game_Party.prototype.swapOrderBattleMembers = function(index1, index2) {
    var bm = this._battleMembers;
    if (bm.length > index1 && bm.length > index2) {
      var actorId1 = this._battleMembers[index1];
      var actorId2 = this._battleMembers[index2];
    } else if (bm.length > index1) {
      var actorId1 = this._battleMembers[index1];
      var actorId2 = this._actors[index2];
    } else if (bm.length > index2) {
      var actorId1 = this._actors[index1];
      var actorId2 = this._battleMembers[index2];
    }
    if (bm.length > index1) this._battleMembers[index1] = actorId2;
    if (bm.length > index2) this._battleMembers[index2] = actorId1;
};

//=============================================================================
// Game_Troop
//=============================================================================

Yanfly.Party.Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
Game_Troop.prototype.increaseTurn = function() {
    Yanfly.Party.Game_Troop_increaseTurn.call(this);
    $gameSystem.updateBattleFormationCooldown();
};

//=============================================================================
// Game_Player
//=============================================================================

Game_Followers.prototype.initialize = function() {
    this._visible = $dataSystem.optFollowers;
    this._gathering = false;
    this._data = [];
    var max = Yanfly.Param.PartyMaxFollower || $gameParty.maxBattleMembers();
    for (var i = 1; i < max; i++) {
        this._data.push(new Game_Follower(i));
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Party.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Party.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'OpenPartyMenu') this.gotoSceneParty();
    if (command === 'ChangePartyMax') $gameParty.changeBattleMax(args[0]);
    if (command === 'LockActor') this.lockActor(args, true);
    if (command === 'UnlockActor') this.lockActor(args, false);
    if (command === 'RequireActor') this.requireActor(args, true);
    if (command === 'UnrequireActor') this.requireActor(args, false);
    if (command === 'ShowBattleFormation') {
      $gameSystem.setShowBattleFormation(true);
    }
    if (command === 'HideBattleFormation') {
      $gameSystem.setShowBattleFormation(false);
    }
    if (command === 'EnableBattleFormation') {
      $gameSystem.setBattleFormationEnabled(true);
    }
    if (command === 'DisableBattleFormation') {
      $gameSystem.setBattleFormationEnabled(false);
    }
};

Game_Interpreter.prototype.gotoSceneParty = function() {
    if ($gameParty.inBattle()) return;
    $gameParty.loadActorImages();
    SceneManager.push(Scene_Party);
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

Window_PartyMenuCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.PartyTextAlign;
};

Window_PartyMenuCommand.prototype.makeCommandList = function() {
    this.addChangeCommand();
    this.addRemoveCommand();
    this.addRevertCommand();
    this.addCustomCommand();
    this.addCancelCommand();
};

Window_PartyMenuCommand.prototype.addChangeCommand = function() {
    if (Yanfly.Param.PartyCommand1 === '') return;
    this.addCommand(Yanfly.Param.PartyCommand1, 'change');
};

Window_PartyMenuCommand.prototype.addRemoveCommand = function() {
    if (Yanfly.Param.PartyCommand2 === '') return;
    this.addCommand(Yanfly.Param.PartyCommand2, 'remove');
};

Window_PartyMenuCommand.prototype.addRevertCommand = function() {
    if (Yanfly.Param.PartyCommand3 === '') return;
    this.addCommand(Yanfly.Param.PartyCommand3, 'revert');
};

Window_PartyMenuCommand.prototype.addCustomCommand = function() {
};

Window_PartyMenuCommand.prototype.addCancelCommand = function() {
    var enabled = this.isCancelEnabled();
    if (Yanfly.Param.PartyCommand4 === '') return;
    this.addCommand(Yanfly.Param.PartyCommand4, 'cancel', enabled);
};

Window_PartyMenuCommand.prototype.inParty = function(actor) {
    return ($gameParty.battleMembers().contains(actor));
};

Window_PartyMenuCommand.prototype.isCancelEnabled = function() {
    if ($gameParty.aliveMembers().length <= 0) return false;
    if ($gameParty.battleMembers().length <= 0) return false;
    for (var i = 0; i < $gameParty._actors.length; ++i) {
      var actorId = $gameParty._actors[i];
      if (this.refuseCancel(actorId)) return false;
    }
    return true
};

Window_PartyMenuCommand.prototype.refuseCancel = function(actorId) {
    if ($gameParty._battleMembers.contains(actorId)) return false;
    if ($gameActors.actor(actorId)._required) return true;
    return false;
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

Window_PartySelect.prototype.drawEmpty = function(rect) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    this.changePaintOpacity(true);
    this.resetFontSettings();
    var text = Yanfly.Param.PartyEmptyText
    this.contents.drawText(text, rect.x, rect.y, rect.width,
        rect.height, 'center');
};

Window_PartySelect.prototype.drawActor = function(rect, actor) {
    if (eval(Yanfly.Param.PartyShowFace)) {
      this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
    }
    if (eval(Yanfly.Param.PartyShowCharacter)) {
      var ry = rect.height * 19/20;
      this.drawActorCharacter(actor, rect.x + rect.width / 2, ry);
    }
    this.drawActorName(actor, rect.x, rect.y, rect.width);
    this.drawLockedIcon(actor, rect);
    this.drawRequiredIcon(actor, rect);
};

Window_PartySelect.prototype.drawLockedIcon = function(actor, rect) {
    if (!actor._locked) return;
    var ix = rect.x + rect.width - Window_Base._iconWidth - 2;
    var iy = rect.y + rect.height - Window_Base._iconHeight - 2;
    this.drawIcon(Yanfly.Icon.PartyLocked, ix, iy)
};

Window_PartySelect.prototype.drawRequiredIcon = function(actor, rect) {
    if (!actor._required) return;
    var ix = rect.x + 2;
    var iy = rect.y + rect.height - Window_Base._iconHeight - 2;
    this.drawIcon(Yanfly.Icon.PartyRequired, ix, iy)
};

Window_PartySelect.prototype.curActor = function() {
    if (!this._data) return null;
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

Window_PartySelect.prototype.setDetailWindow = function(win) {
    this._detailWindow = win;
    this.callUpdateHelp();
};

Window_PartySelect.prototype.callUpdateHelp = function() {
    this.setHelpWindowItem(this.curActor());
    this.setDetailWindowItem(this.curActor());
};

Window_PartySelect.prototype.setHelpWindowItem = function(actor) {
    if (this._helpWindow && actor) {
      this._helpWindow.setText(actor.profile());
    } else if (this._helpWindow) {
      this._helpWindow.clear();
    }
};

Window_PartySelect.prototype.setDetailWindowItem = function(actor) {
    if (this._detailWindow) this._detailWindow.setActor(actor);
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
    this._detailedWindow = eval(Yanfly.Param.PartyDetailWin);
    var ww = this.windowWidth();
    var wh = Graphics.boxHeight - wy;
    Window_Selectable.prototype.initialize.call(this, 0, wy, ww, wh);
    this.select(1);
    this.deactivate();
    this.refresh();
};

Window_PartyList.prototype.windowWidth = function() {
    if (this._detailedWindow) {
      return Yanfly.Param.PartyListWidth;
    } else {
      return Graphics.boxWidth;
    }
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
    for (var i = 0; i < $gameParty._actors.length; ++i) {
      var actorId = $gameParty._actors[i];
      if ($gameActors.actor(actorId)) this._data.push(actorId);
    }
};

Window_PartyList.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
            this.clearItem(index + 1);
        }
    }
};

Window_PartyList.prototype.drawItem = function(index) {
    var actor = $gameActors.actor(this._data[index]);
    if (actor) {
      var bitmap = ImageManager.loadCharacter(actor.characterName());
      if (bitmap.width <= 0) {
        return setTimeout(this.drawItem.bind(this, index), 5);
      }
    }
    this.clearItem(index);
    var rect = this.itemRect(index);
    if (this._data[index] === 0) {
      this.drawRemove(rect);
      return;
    }
    this.drawActor(actor, rect);
};

Window_PartyList.prototype.drawRemove = function(rect) {
    var ibw = Window_Base._iconWidth + 4;
    rect.width -= this.textPadding();
    this.drawIcon(Yanfly.Icon.PartyRemove, rect.x + 2, rect.y + 2);
    this.drawText(Yanfly.Param.PartyCommand2, rect.x + ibw, rect.y,
      rect.width - ibw);
};

Window_PartyList.prototype.drawActor = function(actor, rect) {
    this.drawBasic(actor, rect);
    if (this._detailedWindow) return;
    this.drawExtra(actor, rect);
};

Window_PartyList.prototype.drawBasic = function(actor, rect) {
    var wx = Window_Base._iconWidth / 2 + this.textPadding() / 2;
    var wy = rect.y + rect.height + Yanfly.Param.PartySpriteBufferY
    this.drawActorCharacter(actor, wx, wy);
    this.changeTextColor(this.listColor(actor));
    this.changePaintOpacity(this.actorIsEnabled(actor));
    var ibw = Window_Base._iconWidth + 4;
    this.drawText(actor.name(), rect.x + ibw, rect.y, rect.width - ibw);
    this.changePaintOpacity(true);
    this.drawRestrictions(actor, rect);
    this.resetFontSettings();
};

Window_PartyList.prototype.drawExtra = function(actor, rect) {
    var section = this.itemSection();
    this.drawActorLevel(actor, section * 2, rect.y);
    this.drawActorHp(actor, section * 3, rect.y, section - 6);
    this.drawActorMp(actor, section * 4, rect.y, section - 6);
    if ($dataSystem.optDisplayTp) {
      this.drawActorTp(actor, section * 5, rect.y, section - 6);
    }
    this.drawRestrictions(actor, rect);
};

Window_PartyList.prototype.drawRestrictions = function(actor, rect) {
    if (this._detailedWindow) {
      var wx = this.contents.width - Window_Base._iconWidth - 2;
    } else {
      var section = this.itemSection();
      var wx = section * 2 - Window_Base._iconWidth - 2;
    }
    if (actor._locked) {
      this.drawIcon(Yanfly.Icon.PartyLocked, wx, rect.y);
      wx -= Window_Base._iconWidth;
    }
    if (actor._required) {
      this.drawIcon(Yanfly.Icon.PartyRequired, wx, rect.y);
    }
};

Window_PartyList.prototype.itemSection = function() {
    var sections = 5;
    if ($dataSystem.optDisplayTp) sections += 1;
    return this.contents.width / sections;
};

Window_PartyList.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth(Yanfly.Util.toGroup(max));
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    this.changeTextColor(color1);
    this.drawText(Yanfly.Util.toGroup(current), x1, y, valueWidth, 'right');
};

Window_PartyList.prototype.listColor = function(actor) {
    if (actor.isBattleMember()) {
      return this.textColor(Yanfly.Param.ColorInParty);
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

Window_PartyList.prototype.setDetailWindow = function(win) {
    this._detailWindow = win;
    this.callUpdateHelp();
};

Window_PartyList.prototype.callUpdateHelp = function() {
    this.setHelpWindowItem($gameActors.actor(this.item()));
    this.setDetailWindowItem($gameActors.actor(this.item()));
};

Window_PartyList.prototype.setHelpWindowItem = function(actor) {
    if (this._helpWindow && actor) {
        this._helpWindow.setText(actor.profile());
    } else if (this._helpWindow) {
        this._helpWindow.clear();
    }
};

Window_PartyList.prototype.setDetailWindowItem = function(actor) {
    if (this._detailWindow) this._detailWindow.setActor(actor);
};

Window_PartyList.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

//=============================================================================
// Window_PartyDetail
//=============================================================================

function Window_PartyDetail() {
    this.initialize.apply(this, arguments);
}

Window_PartyDetail.prototype = Object.create(Window_Base.prototype);
Window_PartyDetail.prototype.constructor = Window_PartyDetail;

Window_PartyDetail.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
};

Window_PartyDetail.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
    this.refresh();
};

Window_PartyDetail.prototype.clear = function() {
    this.contents.clear();
    this.drawDarkRect(0, 0, this.contents.width, this.contents.height);
    this.changeTextColor(this.systemColor());
    var text = Yanfly.Param.PartyEmptyText
    this.contents.drawText(text, 0, 0, this.contents.width,
        this.contents.height, 'center');
};

Window_PartyDetail.prototype.refresh = function() {
    if (!this._actor) return this.clear();
    this.contents.clear();
    this.drawActorBasicInfo();
    this.calculateAvailableLines();
    this.drawDarkRectangles();
    this.drawActorParams();
    this.drawActorEquips();
};

Window_PartyDetail.prototype.drawDarkRectangles = function() {
    var ww = this.contents.width / 2;
    var wy = this.lineHeight() * 4;
    if (this._linesAvailable >= 7) wy += this.lineHeight();
    if (this._linesAvailable === 4) wy += this.lineHeight();
    var max = this._linesAvailable;
    max = Math.min(this._linesAvailable, this._actor.equipSlots().length);
    for (var i = 0; i < max; ++i) {
      if (wy + this.lineHeight() > this.contents.height) break;
      this.drawDarkRect(ww, wy, ww, this.lineHeight());
      wy += this.lineHeight();
    }
    var wy = this.lineHeight() * 4;
    if (this._linesAvailable >= 7) wy += this.lineHeight();
    if (this._linesAvailable === 4) wy += this.lineHeight();
    for (var i = 0; i < 6; ++i) {
      var rect = this.paramRect(i);
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    }
};

Window_PartyDetail.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_PartyDetail.prototype.paramRect = function(index) {
    var rect = new Rectangle();
    rect.x = 0;
    rect.y = this.lineHeight() * 4;
    rect.height = this.lineHeight();
    rect.width = this.contents.width / 2
    if (this._linesAvailable >= 7) rect.y += this.lineHeight();
    if (this._linesAvailable === 4) rect.y += this.lineHeight();
    if (this._linesAvailable >= 6) {
      rect.y += this.lineHeight() * index;
    } else {
      rect.width /= 2;
      rect.x = index % 2 === 0 ? 0 : rect.width;
      rect.y += this.lineHeight() * Math.floor(index / 2);
    }
    return rect;
};

Window_PartyDetail.prototype.drawActorBasicInfo = function() {
    var w = this.width - this.padding * 2;
    var h = this.height - this.padding * 2;
    var y = 0;
    var padding = 0;
    var xpad = padding + Window_Base._faceWidth;
    var width = w - 162 - this.textPadding();
    h = Window_Base._faceHeight;
    this.drawActorFace(this._actor, 0, 0, Window_Base._faceWidth, h);
    this.drawActorSimpleStatus(this._actor, xpad, y, width);
};

Window_PartyDetail.prototype.calculateAvailableLines = function() {
    if (this._linesAvailable) return;
    this._linesAvailable = this.contents.height - this.lineHeight() * 4;
    this._linesAvailable /= this.lineHeight();
    this._linesAvailable = Math.floor(this._linesAvailable);
};

Window_PartyDetail.prototype.drawActorParams = function() {
    this.drawActorParamsTitle();
    for (var i = 0; i < 6; ++i) {
      var rect = this.paramRect(i);
      if (this._linesAvailable > 4) {
        rect.x += 8;
        rect.width -= 16;
      } else {
        rect.x += 4;
        rect.width -= 8;
      }
      var paramId = i + 2;
      var text = TextManager.param(paramId);
      this.changeTextColor(this.systemColor());
      this.drawText(text, rect.x, rect.y, rect.width);
      var paramValue = Yanfly.Util.toGroup(this._actor.param(paramId));
      this.changeTextColor(this.normalColor());
      this.drawText(paramValue, rect.x, rect.y, rect.width, 'right');
    }
};

Window_PartyDetail.prototype.drawActorParamsTitle = function() {
    var wy = this.lineHeight() * 4;
    var ww = this.contents.width / 2;
    if (this._linesAvailable >= 7) {
      var text = Yanfly.Param.PartyDetailParam;
      this.changeTextColor(this.systemColor());
      this.drawText(text, 0, wy, ww, 'center');
    } else if (this._linesAvailable === 4) {
      var text = Yanfly.Param.PartyDetailParam;
      this.changeTextColor(this.systemColor());
      this.drawText(text, 0, wy, ww, 'center');
    }
};

Window_PartyDetail.prototype.drawActorEquips = function() {
    this.drawActorEquipsTitle();
    var equips = this.getActorEquips();
    this.drawActorEquipsList(equips);
};

Window_PartyDetail.prototype.drawActorEquipsTitle = function() {
    var wy = this.lineHeight() * 4;
    var ww = this.contents.width / 2;
    if (this._linesAvailable >= 7) {
      var text = Yanfly.Param.PartyDetailEquip;
      this.changeTextColor(this.systemColor());
      this.drawText(text, ww, wy, ww, 'center');
    } else if (this._linesAvailable === 4) {
      var text = Yanfly.Param.PartyDetailEquip;
      this.changeTextColor(this.systemColor());
      this.drawText(text, ww, wy, ww, 'center');
    }
};

Window_PartyDetail.prototype.getActorEquips = function() {
    var equips = [];
    for (var i = 0; i < this._actor.equips().length; ++i) {
      var equip = this._actor.equips()[i];
      if (equip) equips.push(equip);
    }
    return equips;
};

Window_PartyDetail.prototype.drawActorEquipsList = function(equips) {
    this._lastSlot = false;
    var max = this._linesAvailable;
    var ww = this.contents.width / 2;
    var wh = this.lineHeight();
    var wy = this.lineHeight() * 4;
    var wx = ww + 6;
    ww -= 12;
    if (this._linesAvailable >= 7) {
      max -= 1;
      wy += this.lineHeight();
    }
    if (this._linesAvailable === 4) {
      max -= 1;
      wy += this.lineHeight();
    }
    for (var i = 0; i < equips.length; ++i) {
      var equip = equips[i];
      if (!equip) break;
      if (i >= max - 1 && i < equips.length - 1) this._lastSlot = true;
      if (this._lastSlot) {
        var iconIndex = equip.iconIndex;
        this.drawIcon(iconIndex, wx + 2, wy + 2);
        wx += Window_Base._iconWidth;
        continue;
      } else if (this._lastSlot && i === equips.length - 1) {
        var iconIndex = equip.iconIndex;
        this.drawIcon(iconIndex, wx + 2, wy + 2);
        wx += Window_Base._iconWidth;
      } else {
        this.drawItemName(equip, wx, wy, ww);
      }
      wy += this.lineHeight();
    }
};

//=============================================================================
// Battle Engine Core Implementation
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Party.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    if (!$gameTemp._partyBattle) {
      Yanfly.Party.BattleManager_startBattle.call(this);
    }
    $gameTemp._partyBattle = false;
    this._bypassMoveToStartLocation = false;
};

Yanfly.Party.BattleManager_playBattleBgm = BattleManager.playBattleBgm;
BattleManager.playBattleBgm = function() {
    var restartBgm = true;
    if (Yanfly.Party.SavedBattleBgm) {
      AudioManager.playBgm(Yanfly.Party.SavedBattleBgm);
      Yanfly.Party.SavedBattleBgm = undefined;
      restartBgm = false;
    }
    if (Yanfly.Party.SavedBattleBgs) {
      AudioManager.playBgs(Yanfly.Party.SavedBattleBgs);
      Yanfly.Party.SavedBattleBgs = undefined;
      restartBgm = false;
    }
    if (restartBgm) Yanfly.Party.BattleManager_playBattleBgm.call(this);
};

//=============================================================================
// Game_Unit
//=============================================================================

Yanfly.Party.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function() {
    if ($gameTemp._partyBattle) return;
    Yanfly.Party.Game_Unit_onBattleStart.call(this);
    $gameSystem.resetBattleFormationCooldown();
};

Yanfly.Party.Game_Unit_onBattleEnd = Game_Unit.prototype.onBattleEnd;
Game_Unit.prototype.onBattleEnd = function() {
    if ($gameTemp._partyBattle) return;
    Yanfly.Party.Game_Unit_onBattleEnd.call(this);
    $gameSystem.resetBattleFormationCooldown();
};

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.addCommandAt = function(index, name, symbol, en, ext) {
    if (en === undefined) enabled = true;
    if (ext === undefined) ext = null;
    var obj = { name: name, symbol: symbol, enabled: en, ext: ext};
    this._list.splice(index, 0, obj);
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Yanfly.Party.Window_PartyCommand_makeCommandList =
    Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
    Yanfly.Party.Window_PartyCommand_makeCommandList.call(this);
    this.addFormationCommand();
};

Window_PartyCommand.prototype.addFormationCommand = function() {
    if (!$gameSystem.isShowBattleFormation()) return;
    var index = this.findSymbol('escape');
    var enabled = $gameSystem.isBattleFormationEnabled();
    this.addCommandAt(index, TextManager.formation, 'formation', enabled);
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Yanfly.Party.Sprite_Actor_moveToStartPosition =
    Sprite_Actor.prototype.moveToStartPosition;
Sprite_Actor.prototype.moveToStartPosition = function() {
    if (BattleManager._bypassMoveToStartLocation) return;
    Yanfly.Party.Sprite_Actor_moveToStartPosition.call(this);
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Yanfly.Party.Spriteset_Battle_createBackground =
    Spriteset_Battle.prototype.createBackground;
Spriteset_Battle.prototype.createBackground = function() {
    Yanfly.Party.Spriteset_Battle_createBackground.call(this);
    if (Yanfly.Party.SavedBackgroundBitmap) {
      var spr = this._backgroundSprite;
      spr.bitmap = Yanfly.Party.SavedBackgroundBitmap;
      Yanfly.Party.SavedBackgroundBitmap = undefined;
    }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.Party.Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    Yanfly.Party.Scene_Map_create.call(this);
    $gameParty.loadActorImages();
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Party.Scene_Battle_createDisplayObjects =
    Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    Yanfly.Party.Scene_Battle_createDisplayObjects.call(this);
    $gameParty.loadActorImages();
};

Yanfly.Party.Scene_Battle_createPartyCommandWindow =
    Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    Yanfly.Party.Scene_Battle_createPartyCommandWindow.call(this);
    var win = this._partyCommandWindow;
    win.setHandler('formation', this.partyCommandFormation.bind(this));
};

Scene_Battle.prototype.partyCommandFormation = function() {
    BattleManager._bypassMoveToStartLocation = true;
    $gameParty.loadActorImages();
    this.prepareBackground();
    BattleManager._savedActor = BattleManager.actor();
    $gameSystem.setBattleFormationCooldown();
    Yanfly.Party.SavedBattleBgm = AudioManager.saveBgm();
    Yanfly.Party.SavedBattleBgs = AudioManager.saveBgs();
    SceneManager.push(Scene_Party);
    BattleManager._phase = 'input';
    $gameTemp._partyBattle = true;
};

Scene_Battle.prototype.prepareBackground = function() {
    Yanfly.Party.SavedBackgroundBitmap = SceneManager._backgroundBitmap;
    this._prevWindowLayer = this._windowLayer.y;
    this._windowLayer.y = Graphics.boxHeight * 495;
    SceneManager.snapForBackground();
    this._windowLayer.y = this._prevWindowLayer;
};

}; // Imported.YEP_BattleEngineCore

//=============================================================================
// Scene_Menu
//=============================================================================

Scene_Menu.prototype.commandFormation = function() {
    $gameParty.loadActorImages();
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
    if (eval(Yanfly.Param.PartyHelpWindow)) this.createHelpWindow();
    this.createCommandWindow();
    this.createPartyWindow();
    this.createListWindow();
    this.createDetailWindow();
};

Scene_Party.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_PartyMenuCommand(0, 0);
    if (this._helpWindow) this._commandWindow.y = this._helpWindow.height;
    this._commandWindow.setHandler('change', this.commandAdjust.bind(this));
    this._commandWindow.setHandler('remove', this.commandAdjust.bind(this));
    this._commandWindow.setHandler('revert', this.commandRevert.bind(this));
    this._commandWindow.setHandler('cancel', this.commandFinish.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Party.prototype.createPartyWindow = function() {
    this._partyWindow = new Window_PartySelect(this._commandWindow);
    if (this._helpWindow) this._partyWindow.setHelpWindow(this._helpWindow);
    this._partyWindow.setHandler('ok',       this.onPartyOk.bind(this));
    this._partyWindow.setHandler('cancel',   this.onPartyCancel.bind(this));
    this._partyWindow.setHandler('pageup',   this.onPartyPageUp.bind(this));
    this._partyWindow.setHandler('pagedown', this.onPartyPageDown.bind(this));
    this.addWindow(this._partyWindow);
};

Scene_Party.prototype.createListWindow = function() {
    this._listWindow = new Window_PartyList(this._partyWindow);
    if (this._helpWindow) this._listWindow.setHelpWindow(this._helpWindow);
    this._listWindow.setHandler('ok',     this.onListOk.bind(this));
    this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
    this.addWindow(this._listWindow);
};

Scene_Party.prototype.createDetailWindow = function() {
    if (!eval(Yanfly.Param.PartyDetailWin)) return;
    var wx = this._listWindow.width;
    var wy = this._listWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = Graphics.boxHeight - wy;
    this._detailWindow = new Window_PartyDetail(wx, wy, ww, wh);
    this.addWindow(this._detailWindow);
    this._partyWindow.setDetailWindow(this._detailWindow);
    this._listWindow.setDetailWindow(this._detailWindow);
    this._detailWindow.clear();
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

Scene_Party.prototype.commandFinish = function() {
    if ($gameParty.inBattle()) {
      $gameParty.reconstructActions();
      if (BattleManager._savedActor) {
        BattleManager._actorIndex = BattleManager._savedActor.index();
      }
    }
    this.popScene();
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
    if (this._helpWindow) this._helpWindow.setItem(null);
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
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
