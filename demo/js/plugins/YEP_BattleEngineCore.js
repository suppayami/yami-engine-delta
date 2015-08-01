//=============================================================================
// Yanfly Engine Plugins - Battle Engine Core
// YEP_BattleEngineCore.js
// Last Updated: 2015.07.29
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_BattleEngineCore"] = true;

//=============================================================================
 /*:
 * @plugindesc Have more control over the flow of the battle system with this
 * plugin and alter various aspects to your liking.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Action Speed
 * @desc This is the formula used for an action's base speed.       .
 * Default: agi + Math.randomInt(Math.floor(5 + agi / 4))
 * @default agi
 *
 * @param Immortal State ID
 * @desc This is the state ID of the immortal state in the database.
 * Default: 3
 * @default 3
 *
 * @param ---Animation---
 * @default
 *
 * @param Animation Base Delay
 * @desc This sets the base delay in between animations.           .
 * Default: 8
 * @default 0
 *
 * @param Animation Next Delay
 * @desc This sets the sequential delay in between animations.     .
 * Default: 12
 * @default 0
 *
 * @param Certain Hit Animation
 * @desc Default animation to play for certain hit skills.          .
 * Use 0 if you wish for no animation.
 * @default 120
 *
 * @param Physical Animation
 * @desc Default animation to play for physical skills.             .
 * Use 0 if you wish for no animation.
 * @default 52
 *
 * @param Magical Animation
 * @desc Default animation to play for magical skills.              .
 * Use 0 if you wish for no animation.
 * @default 51
 *
 * @param ---Damage Popups---
 * @default
 *
 * @param Popup Duration
 * @desc Adjusts how many frames a popup will stay visible for.     .
 * Default: 90
 * @default 128
 *
 * @param Newest Popup Bottom
 * @desc Places the newest popup at the bottom of a group.          .
 * NO - false     YES - true
 * @default true
 *
 * @param Popup Overlap Rate
 * @desc When multiple damage popups appear, they cover each other.
 * Use this to change the buffer rate amount for each sprite.
 * @default 0.9
 *
 * @param Critical Popup
 * @desc Adjusts the popup's flashing color for critical hits.      .
 * Default: 255, 0, 0, 160
 * @default 255, 0, 0, 160
 *
 * @param Critical Duration
 * @desc How many frames the flashing will remain for a critical.   .
 * Default: 60
 * @default 60
 *
 * @param ---Window Settings---
 * @default
 *
 * @param Lower Windows
 * @desc Places the skill and item windows at the screen's bottom.  .
 * OFF - false     ON - true
 * @default true
 *
 * @param Window Rows
 * @desc For lower windows, how many rows of items do you wish for
 * the windows to display?
 * @default 4
 *
 * @param Command Window Rows
 * @desc Sets the number of rows for each command window to display.
 * Default: 4
 * @default 4
 *
 * @param Command Alignment
 * @desc Sets the text alignment for the Party/Actor Commands.      .
 * Default: left
 * @default center
 *
 * @param Start Actor Command
 * @desc Starts turn with the Actor Command Window instead of Party.
 * OFF - false     ON - true
 * @default true
 *
 * @param ---Enemy Select---
 * @default
 *
 * @param Visual Enemy Select
 * @desc Replaces the enemy selection screen with a more visual one.
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Enemy Name
 * @desc Show enemy names with Visual Enemy Select.                 .
 * OFF - false     ON - true
 * @default true
 *
 * @param Enemy Font Size
 * @desc Changes the font size used to display enemy names.         .
 * Default: 28
 * @default 20
 *
 * @param Enemy Auto Select
 * @desc Changes what enemy is automatically selected at first.     .
 * LEFT - 0     RIGHT - this.furthestRight()
 * @default this.furthestRight()
 *
 * @param ---Battle Log---
 * @default
 *
 * @param Show Emerge Text
 * @desc Shows the battle start text for enemies appearing.         .
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Pre-Emptive Text
 * @desc Shows the text for getting a pre-emptive attack.           .
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Surprise Text
 * @desc Shows the text for getting a surprise attack.              .
 * OFF - false     ON - true
 * @default true
 *
 * @param Optimize Speed
 * @desc Cuts out log base line process to optimize the battle speed.
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Action Text
 * @desc Displays the full action text or a simplified version of it.
 * SIMPLE - false     FULL - true
 * @default false
 *
 * @param Show State Text
 * @desc Shows all text regarding states.                           .
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Buff Text
 * @desc Shows all text regarding buffs.                            .
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Counter Text
 * @desc Shows text regarding counter attacks.                      .
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Reflect Text
 * @desc Shows text regarding reflected spells.                     .
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Substitute Text
 * @desc Shows text regarding substituted damage.                   .
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Fail Text
 * @desc Shows text regarding failed attacks.                       .
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Critical Text
 * @desc Shows text regarding critical hits.                        .
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Miss Text
 * @desc Shows text regarding missed attacks.                       .
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Evasion Text
 * @desc Shows text regarding evaded attacks.                       .
 * OFF - false     ON - true
 * @default false
 *
 * @param Show HP Text
 * @desc Shows text regarding HP damage or heals.                   .
 * OFF - false     ON - true
 * @default false
 *
 * @param Show MP Text
 * @desc Shows text regarding MP damage or heals.                   .
 * OFF - false     ON - true
 * @default false
 *
 * @param Show TP Text
 * @desc Shows text regarding TP damage or heals.                   .
 * OFF - false     ON - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin alters the various aspects of the default battle system,
 * allowing it to be more streamlined like most modern RPG's and less clunky
 * like older RPG's. This ranges from choosing what text will appear in the
 * battle log window at the top and how it will be displayed.
 *
 * ============================================================================
 * Battle Messages
 * ============================================================================
 *
 * When changing "Terms" and the "Messages" that appear in battle, inserting
 * the following tag anywhere in the message will cause the message to center
 * itself in the battle log.
 *
 *   <CENTER>
 *   This tag must be all caps in order for the battle log window to recognize
 *   it as an instruction to center the displayed battle text message.
 *
 * ============================================================================
 * Battle Windows
 * ============================================================================
 *
 * There's various options to adjust the window settings found in the battle
 * system to make navigating the battle system more intuitive. Such options
 * include starting the turns with the Actor Command Window instead of the
 * Party Command Window (the Fight/Escape Window). The Party Command Window is
 * still accessible but only by pressing cancel on the first actor's window.
 *
 * ============================================================================
 * Battle Order
 * ============================================================================
 *
 * The battle turn order is also fixed, too. This way, any battlers that Have
 * their AGI value changed over the course of battle will reflect those changes
 * during the current turn rather than the following turn. The action speed
 * calculation can also be adjusted and finetuned to have the random factor of
 * its speed calculation formula removed, too, making AGI actually worthwhile
 * as a tactical parameter.
 *
 * ============================================================================
 * Multiple Hits
 * ============================================================================
 *
 * Multi-hit action will no longer end prematurely if the target dies midway
 * through the action. This is done through toggling immortal states. To make
 * use of feature, make sure your database has an Immortal State somewhere. If
 * you do not wish to use this feature, set the Parameter for Immortal State ID
 * to 0 instead.
 *
 * ============================================================================
 * Popup Revamp
 * ============================================================================
 *
 * Although the damage popups may still look the same as the default ones from
 * MV, the process in which they're created is now different to streamline the
 * damage popup process. Before, popups would only appear one a time with a
 * frame's different at minimum in order for them to show. Now, any actions
 * that occur at the same frame will now all show popups at the same frame,
 * making for smoother and less clunky damage popups.
 *
 * ============================================================================
 * Common Events
 * ============================================================================
 *
 * Common Events will now occur at the end of each action regardless of whether
 * or not the enemy party is still alive. With proper placing of the action
 * sequence tags, you can make the skill's common event occur in the middle of
 * an action, too. However, keep in mind if you force an action in the middle
 * of another action, it the remainder of the former action's sequence list
 * will become null and void in favor of the new forced action.
 *
 * ============================================================================
 * Casting Animations
 * ============================================================================
 *
 * Casting Animations help provide visual hints for players either by letting
 * them know which battler is going to perform an action or what type of skill
 * that action will be. This plugin enables skills to have casting animations
 * that can be modified universally or customized for each individual skill.
 *
 * Skill Notetag:
 *   <Cast Animation: x>
 *   Sets the skill's cast animation to animation ID x. Setting x to zero will
 *   cause the skill to not have any animaiton at all.
 *
 * ============================================================================
 * Action Sequences
 * ============================================================================
 *
 * The Yanfly Engine Plugins - Battle Engine Core includes the capability of
 * using custom action sequences. Action sequences are basic instructions for
 * the game to creating a customized skill both visually and mechanically.
 * The Battle Engine Core, however, will only include the most basic of action
 * sequences so the instructions on how to create a custom action sequence will
 * be included in the Help file on future extension plugins for this plugin.
 *
 * ----------------------------------------------------------------------------
 * Change Log
 * ----------------------------------------------------------------------------
 *
 * ChangeLog:
 *   2015.07.29 - Rehauled Sideview Sprite system.
 *   2015.07.24 - Added new Parameter for Popups to appear from bottom to top
 *                or top to bottom.
 *   2015.07.23 - Added Optimize Speed parameter option.
 *   2015.07.22 - Added Melody Engine Core.
 *   2015.07.20 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_BattleEngineCore');

//=============================================================================
// DataManager
//=============================================================================

var _YEP_BEC_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_BEC_Scene_Boot_start.call(this);
  DataManager.processMELODYNotetags($dataSkills);
  DataManager.processMELODYNotetags($dataItems);
	DataManager.processBECNotetags1($dataSkills);
	DataManager.processBECNotetags2($dataSkills);
	DataManager.processBECNotetags2($dataItems);
};

DataManager.processMELODYNotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    var actionType = 0;
		this.setDefaultActions(obj);

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:SETUP_ACTION|setup action|setup)>/i)) {
        actionType = 1;
        obj.setupActions = [];
			} else if (line.match(/<\/(?:SETUP_ACTION|setup action|setup)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:WHOLE_ACTION|whole action|whole)>/i)) {
        actionType = 2;
        obj.wholeActions = [];
      } else if (line.match(/<\/(?:WHOLE_ACTION|whole action|whole)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:TARGET_ACTION|target action|target)>/i)) {
        actionType = 3;
        obj.targetActions = [];
      } else if (line.match(/<\/(?:TARGET_ACTION|target action|target)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:FOLLOW_ACTION|follow action|follow)>/i)) {
        actionType = 4;
        obj.followActions = [];
      } else if (line.match(/<\/(?:FOLLOW_ACTION|follow action|follow)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:FINISH_ACTION|finish action|finish)>/i)) {
        actionType = 5;
        obj.followActions = [];
      } else if (line.match(/<\/(?:FINISH_ACTION|finish action|finish)>/i)) {
        var actionType = 0;
      } else {
        this.convertSequenceLine(obj, line, actionType);
      }
		}
	}
};

var _YEP_defaultActionSetup = [
    ['DISPLAY ACTION'],
		['IMMORTAL', ['TARGETS', 'TRUE']],
    ['PERFORM START'],
    ['WAIT FOR MOVEMENT'],
    ['CAST ANIMATION'],
    ['WAIT FOR ANIMATION']
];
var _YEP_defaultActionWhole =[
		['PERFORM ACTION'],
		['ACTION ANIMATION'],
		['WAIT FOR ANIMATION'],
		['ACTION EFFECT']
];
var _YEP_defaultActionTarget =[
		['PERFORM ACTION'],
		['ACTION ANIMATION'],
		['WAIT FOR ANIMATION'],
		['ACTION EFFECT'],
    ['DEATH BREAK']
];
var _YEP_defaultActionFollow =[
];
var _YEP_defaultActionFinish =[
		['IMMORTAL', ['TARGETS', 'FALSE']],
		['WAIT FOR NEW LINE'],
		['CLEAR BATTLE LOG'],
		['PERFORM FINISH'],
		['ACTION COMMON EVENT'],
];
DataManager.setDefaultActions = function(obj) {
		obj.setupActions = _YEP_defaultActionSetup;
		if (this.isWholeAction(obj)) {
			obj.wholeActions = _YEP_defaultActionWhole;
      obj.targetActions = [];
		} else {
      obj.wholeActions = [];
			obj.targetActions = _YEP_defaultActionTarget;
		}
		obj.followActions = _YEP_defaultActionFollow;
		obj.finishActions = _YEP_defaultActionFinish;
};

DataManager.isWholeAction = function(obj) {
		if (obj.animationId > 0 && $dataAnimations[obj.animationId]) {
			var animation = $dataAnimations[obj.animationId];
			if (animation.position === 3) return true;
			if (animation.position !== 3 && obj.scope === 2) return true;
		}
		return false;
};

var seqType6 = /[ ]*(.*):[ ](.*),[ ](.*),[ ](.*),[ ](.*),[ ](.*),[ ](.*)/i;
var seqType5 = /[ ]*(.*):[ ](.*),[ ](.*),[ ](.*),[ ](.*),[ ](.*)/i;
var seqType4 = /[ ]*(.*):[ ](.*),[ ](.*),[ ](.*),[ ](.*)/i;
var seqType3 = /[ ]*(.*):[ ](.*),[ ](.*),[ ](.*)/i;
var seqType2 = /[ ]*(.*):[ ](.*),[ ](.*)/i;
var seqType1 = /[ ]*(.*):[ ](.*)/i;
var seqType0 = /[ ]*(.*)/i;
DataManager.convertSequenceLine = function(obj, line, actionType) {
	if (actionType <= 0 || actionType > 5) return;
  var seqType;
  var seqArgs;
  if (line.match(seqType6)) {
    seqType = RegExp.$1;
    seqArgs =
			[RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$7];
  } else if (line.match(seqType5)) {
    seqType = RegExp.$1;
    seqArgs = [RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6];
  } else if (line.match(seqType4)) {
    seqType = RegExp.$1;
    seqArgs = [RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5];
  } else if (line.match(seqType3)) {
    seqType = RegExp.$1;
    seqArgs = [RegExp.$2, RegExp.$3, RegExp.$4];
  } else if (line.match(seqType2)) {
    seqType = RegExp.$1;
    seqArgs = [RegExp.$2, RegExp.$3];
  } else if (line.match(seqType1)) {
    seqType = RegExp.$1;
    seqArgs = [RegExp.$2];
  } else if (line.match(seqType0)) {
    seqType = RegExp.$1;
    seqArgs = [];
  } else {
    return;
  }
  var array = [seqType, seqArgs];
  if (actionType === 1) obj.setupActions[obj.setupActions.length] = array;
  if (actionType === 2) obj.wholeActions[obj.wholeActions.length] = array;
  if (actionType === 3) obj.targetActions[obj.targetActions.length] = array;
  if (actionType === 4) obj.followActions[obj.followActions.length] = array;
  if (actionType === 5) obj.finishActions[obj.finishActions.length] = array;
};

var _yep_cast_certainHit = Number(parameters['Certain Hit Animation'] || 0);
var _yep_cast_physical   = Number(parameters['Physical Animation'] || 0);
var _yep_cast_magical    = Number(parameters['Magical Animation'] || 0);
DataManager.processBECNotetags1 = function(group) {
	var note1 = /<(?:CAST_ANIMATION|cast animation|cast ani):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.castAnimation = 0;
    if (obj.hitType === 0) obj.castAnimation = _yep_cast_certainHit;
    if (obj.hitType === 1) obj.castAnimation = _yep_cast_physical;
    if (obj.hitType === 2) obj.castAnimation = _yep_cast_magical;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.castAnimation = parseInt(RegExp.$1);
			}
		}
	}
};

DataManager.processBECNotetags2 = function(group) {
	var note1 = /<(?:ACTION_COPY|action copy):[ ](.*):[ ]*(\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				var text = String(RegExp.$1).toUpperCase();
				var target;
				if (['I', 'ITEM'].contains(text)) {
					target = $dataItems[parseInt(RegExp.$2)];
				} else if (['S', 'SKILL'].contains(text)) {
					target = $dataSkills[parseInt(RegExp.$2)];
				}
				if (target) {
					obj.setupActions = target.setupActions.clone();
					obj.wholeActions = target.wholeActions.clone();
					obj.targetActions = target.targetActions.clone();
					obj.followActions = target.followActions.clone();
					obj.finishActions = target.finishActions.clone();
				}
			}
		}
	}
};

//=============================================================================
// BattleManager
//=============================================================================

var _yep_bec_optSpeed = String(parameters['Optimize Speed'] || 'false');

var _yep_bec_emergText  = String(parameters['Show Emerge Text'] || 'true');
var _yep_bec_preempText = String(parameters['Show Pre-Emptive Text'] || 'true');
var _yep_bec_surpText   = String(parameters['Show Surprise Text'] || 'true');
BattleManager.displayStartMessages = function() {
    if (eval(_yep_bec_emergText)) {
      $gameTroop.enemyNames().forEach(function(name) {
          $gameMessage.add(TextManager.emerge.format(name));
      });
    }
    if (this._preemptive && eval(_yep_bec_preempText)) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise && eval(_yep_bec_surpText)) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
};

BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
    var lastActor = this.actor();
    this._actorIndex = newActorIndex;
    var newActor = this.actor();
    if (lastActor) {
        lastActor.setActionState(lastActorActionState);
        lastActor.spriteReturnHome();
    }
    if (newActor) {
        newActor.setActionState('inputting');
        newActor.spriteStepForward();
    }
};

var _YEP_BEC_BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
BattleManager.checkBattleEnd = function() {
    if (this._phase === 'actionList' || this._phase === 'actionTargetList' ||
			$gameTroop.isEventRunning()) return false;
    return _YEP_BEC_BattleManager_checkBattleEnd.call(this);
};

var _YEP_BEC_BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
    this._logWindow.clear();
		_YEP_BEC_BattleManager_processVictory.call(this);
};

var _YEP_BEC_BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    $gameParty.clearBattlerSprites();
    _YEP_BEC_BattleManager_endBattle.call(this, result);
};

BattleManager.startTurn = function() {
    this._phase = 'turn';
    this.clearActor();
    $gameTroop.increaseTurn();
    this._performedBattlers = [];
    this.makeActionOrders();
    $gameParty.requestMotionRefresh();
    this._logWindow.startTurn();
};

BattleManager.getNextSubject = function() {
    this._performedBattlers = this._performedBattlers || [];
    this.makeActionOrders();
    for (;;) {
        var battlerArray = [];
        for (var i = 0; i < this._actionBattlers.length; ++i) {
          var obj = this._actionBattlers[i];
          if (!this._performedBattlers.contains(obj)) battlerArray.push(obj);
        }
        this._actionBattlers = battlerArray;
        var battler = this._actionBattlers.shift();
        if (!battler) return null;
        if (battler.isBattleMember() && battler.isAlive()) {
            this._performedBattlers.push(battler);
            return battler;
        }
    }
};

BattleManager.update = function() {
    if (!this.isBusy() && !this.updateEvent()) {
        switch (this._phase) {
        case 'start':
            this.startInput();
            break;
        case 'turn':
            this.updateTurn();
            break;
        case 'action':
            this.updateAction();
            break;
				case 'phaseChange':
						this.updatePhase();
						break;
				case 'actionList':
						this.updateActionList()
						break;
        case 'actionTargetList':
						this.updateActionTargetList()
						break;
        case 'turnEnd':
            this.updateTurnEnd();
            break;
        case 'battleEnd':
            this.updateBattleEnd();
            break;
        }
    }
};

BattleManager.updateEvent = function() {
    switch (this._phase) {
    case 'start':
    case 'turn':
    case 'turnEnd':
    case 'actionList':
    case 'actionTargetList':
        if (this.isActionForced()) {
            this.processForcedAction();
            return true;
        } else {
            return this.updateEventMain();
        }
    }
    return false;
};

BattleManager.updateAction = function() {
    var target = this._targets.shift();
    if (target) {
        this.invokeAction(this._subject, target);
    } else {
        if (this._returnPhase === 'target') {
          this._targets = [this._individualTargets[0]];
          this._phase = 'actionTargetList';
        } else {
          this._targets = this._allTargets.clone();
          this._phase = 'actionList';
        }
    }
};

BattleManager.invokeAction = function(subject, target) {
    if (!eval(_yep_bec_optSpeed))	this._logWindow.push('pushBaseLine');
    if (Math.random() < this._action.itemCnt(target)) {
        this.invokeCounterAttack(subject, target);
    } else if (Math.random() < this._action.itemMrf(target)) {
        this.invokeMagicReflection(subject, target);
    } else {
        this.invokeNormalAction(subject, target);
    }
    subject.setLastTarget(target);
    if (!eval(_yep_bec_optSpeed)) this._logWindow.push('popBaseLine');
    this.refreshStatus();
};

BattleManager.updatePhase = function() {
    var phase = this._phaseSteps.shift();
		if (phase) this.createPhaseChanges();
		switch (phase) {
		case 'setup':
			this.createSetupActions();
			break;
		case 'whole':
			this.createWholeActions();
			break;
		case 'target':
			this.createTargetActions();
			break;
		case 'follow':
			this.createFollowActions();
			break;
		case 'finish':
			this.createFinishActions();
			break;
		default:
			this.endAction();
			break;
		}
};

BattleManager.createPhaseChanges = function() {
		this._phase = 'actionList';
		this._targets = this._allTargets.clone();
		this._conditionFlags = [];
		this._trueFlags = [];
};

BattleManager.createSetupActions = function() {
		$gameTemp.clearActionSequenceSettings();
		this._returnPhase = 'setup';
		this._actionList = this._action.item().setupActions.clone();
};

BattleManager.createWholeActions = function() {
		this._returnPhase = 'whole';
		this._actionList = this._action.item().wholeActions.clone();
};

BattleManager.createTargetActions = function() {
		this._returnPhase = 'target';
		this._phase = 'actionTargetList';
		this._targets = [this._individualTargets[0]];
		this._actionList = this._action.item().targetActions.clone();
};

BattleManager.createFollowActions = function() {
		this._returnPhase = 'follow';
		this._actionList = this._action.item().followActions.clone();
};

BattleManager.createFinishActions = function() {
		this._returnPhase = 'finish';
		this._actionList = this._action.item().finishActions.clone();
};

BattleManager.updateActionList = function() {
		for (;;) {
      this._actSeq = this._actionList.shift();
  		if (this._actSeq) {
				if (!this.actionConditionsMet(this._actSeq)) continue;
				var seqName = this._actSeq[0].toUpperCase();
  			if (!this.processActionSequence(seqName, this._actSeq[1])) {
          break;
        }
  		} else {
  			this._phase = 'phaseChange';
        break;
  		}
    }
};

BattleManager.updateActionTargetList = function() {
		for (;;) {
      this._actSeq = this._actionList.shift();
  		if (this._actSeq) {
        if (!this.actionConditionsMet(this._actSeq)) continue;
				var seqName = this._actSeq[0].toUpperCase();
				if (!this.processActionSequence(seqName, this._actSeq[1])) {
          break;
        }
      } else if (this._individualTargets.length > 0) {
        this._individualTargets.shift();
        if (this._individualTargets.length > 0) {
          this._targets = [this._individualTargets[0]];
          this._actionList = this._action.item().targetActions.clone();
        } else {
          this._phase = 'phaseChange';
          break;
        }
  		} else {
        this._phase = 'phaseChange';
        break;
  		}
    }
};

BattleManager.startAction = function() {
    var subject = this._subject;
    var action = subject.currentAction();
    this._action = action;
		var targets = action.makeTargets();
    this._targets = targets;
		this._allTargets = targets.clone();
    this._individualTargets = targets.clone();
		this._phase = 'phaseChange';
		this._phaseSteps = ['setup', 'whole', 'target', 'follow', 'finish'];
		this._returnPhase = '';
		this._actionList = [];
    subject.useItem(this._action.item());
    this._action.applyGlobal();
    this.refreshStatus();
    this._logWindow.startAction(this._subject, this._action, this._targets);
};

BattleManager.processActionSequence = function(actionName, actionArgs) {
		// NO ACTION
		if (actionName === '') {
			return true; //
		}
    // ACTION ANIMATION
		if (actionName === 'ACTION ANIMATION') {
			return this.actionActionAnimation();
		}
    // ACTION EFFECT
		if (actionName === 'ACTION COMMON EVENT') {
      return this.actionActionCommonEvent();
		}
    // ACTION EFFECT
		if (actionName === 'ACTION EFFECT') {
      return this.actionActionEffect();
		}
		// ANI WAIT: frames
	  if (['ANI WAIT', 'ANIWAIT', 'ANIMATION WAIT'].contains(actionName)) {
	    return this.actionAniWait(actionArgs[0]);
	  }
    // CAST ANIMATION
		if (actionName === 'CAST ANIMATION') {
			return this.actionCastAnimation();
		}
		// CLEAR BATTLE LOG
		if (actionName === 'CLEAR BATTLE LOG') {
			return this.actionClearBattleLog();
		}
    // DEATH BREAK
		if (actionName === 'DEATH BREAK') {
			return this.actionDeathBreak();
		}
		// DISPLAY ACTION
		if (actionName === 'DISPLAY ACTION') {
			return this.actionDisplayAction();
		}
		// IF condition
		if (actionName.match(/IF[ ](.*)/i)) {
			return this.actionIfConditions(actionName, actionArgs);
		}
    // IMMORTAL: targets, true/false
		if (actionName === 'IMMORTAL') {
			return this.actionImmortal(actionArgs);
		}
    // PERFORM ACTION
		if (actionName === 'PERFORM ACTION') {
			return this.actionPerformAction();
		}
		// PERFORM FINISH
		if (actionName === 'PERFORM FINISH') {
			return this.actionPerformFinish();
		}
		// PERFORM START
		if (actionName === 'PERFORM START') {
			return this.actionPerformStart();
		}
		// WAIT: frames
	  if (actionName === 'WAIT') {
	    return this.actionWait(actionArgs[0]);
	  }
    // WAIT FOR ANIMATION
		if (actionName === 'WAIT FOR ANIMATION') {
			return this.actionWaitForAnimation();
		}
		// WAIT FOR MOVEMENT
		if (actionName === 'WAIT FOR MOVEMENT') {
			return this.actionWaitForMovement();
		}
		// WAIT FOR NEW LINE
		if (actionName === 'WAIT FOR NEW LINE') {
			return this.actionWaitForNewLine();
		}
    return false;
};

BattleManager.makeActionTargets = function(string) {
		var targets = []
    string = string.toUpperCase()
    if (['SUBJECT', 'USER'].contains(string)) {
      return [this._subject];
    }
    if (['TARGET', 'TARGETS'].contains(string)) {
      return this._targets;
    }
    if (['ACTORS', 'EXISTING ACTORS', 'ALIVE ACTORS'].contains(string)) {
      return $gameParty.aliveMembers();
    }
    if (['ACTORS ALL', 'ALL ACTORS', 'PARTY'].contains(string)) {
      return $gameParty.battleMembers();
    }
    if (['ACTORS NOT USER', 'ACTORS NOT SUBJECT'].contains(string)) {
      targets = $gameParty.aliveMembers();
      var index = targets.indexOf(this._subject);
      if (index >= 0) {
          targets.splice(index, 1);
      }
      delete targets[this._subject];
      return targets;
    }
    if (['ENEMIES', 'EXISTING ENEMIES', 'ALIVE ENEMIES', 'TROOP',
    'TROOPS'].contains(string)) {
      return $gameTroop.aliveMembers();
    }
    if (['ENEMIES ALL', 'ALL ENEMIES'].contains(string)) {
      return $gameTroop.members();
    }
    if (['ENEMIES NOT USER', 'ENEMIES NOT SUBJECT', 'TROOP NOT USER',
    'TROOP NOT SUBJECT'].contains(string)) {
      targets = $gameTroop.aliveMembers();
      var index = targets.indexOf(this._subject);
      if (index >= 0) {
          targets.splice(index, 1);
      }
      delete targets[this._subject];
      return targets;
    }
    if (string.match(/ACTOR[ ](\d+)/i)) {
      return [$gameParty.battleMembers()[parseInt(RegExp.$1)]];
    }
    if (string.match(/ENEMY[ ](\d+)/i)) {
      return [$gameTroop.members()[parseInt(RegExp.$1)]];
    }
    if (['FRIEND', 'FRIENDS', 'ALLIES'].contains(string)) {
      return this._action.friendsUnit().aliveMembers();
    }
    if (['OPPONENT', 'OPPONENTS', 'RIVALS', 'FOES'].contains(string)) {
      return this._action.opponentsUnit().aliveMembers();
    }
    if (['FRIENDS NOT USER', 'ALLIES NOT USER'].contains(string)) {
      targets = this._action.friendsUnit().aliveMembers();
      var index = targets.indexOf(this._subject);
      if (index >= 0) {
          targets.splice(index, 1);
      }
      delete targets[this._subject];
      return targets;
    }
    if (['EVERYTHING', 'EVERYBODY'].contains(string)) {
      targets = this._action.friendsUnit().aliveMembers();
      targets = targets.concat(this._action.opponentsUnit().aliveMembers());
      return targets;
    }
    if (['EVERYTHING NOT USER', 'EVERYBODY NOT USER'].contains(string)) {
      targets = this._action.friendsUnit().aliveMembers();
      targets = targets.concat(this._action.opponentsUnit().aliveMembers());
      var index = targets.indexOf(this._subject);
      if (index >= 0) {
          targets.splice(index, 1);
      }
      delete targets[this._subject];
      return targets;
    }
    if (['FOCUS', 'PARTICIPANTS'].contains(string)) {
      targets = this._targets.clone();
      targets.push(this._subject);
      return targets;
    }
    if (['NOT FOCUS', 'NONPARTICIPANTS'].contains(string)) {
      var focus = this._targets.clone();
      focus.push(this._subject);
      var allMembers = this._action.friendsUnit().aliveMembers();
      allMembers =
				allMembers.concat(this._action.opponentsUnit().aliveMembers());
      allMembers.forEach(function(member) {
        if (!focus.contains(member)) targets.push(member);
      }, this);
      return targets;
    }
		return targets;
};

BattleManager.actionConditionsMet = function(actSeq) {
    var ci = this._conditionFlags.length - 1;
    var actionName = actSeq[0];
    var actionArgs = actSeq[1];
    var subject = this._subject;
    var user = this._subject;
    var target = this._targets[0];
		var targets = this._targets;
    var action = this._action;
    var item = this._action.item();
    if (actionName.match(/ELSE[ ]*(.*)/i)) {
      if (this._conditionFlags.length <= 0) return false;
      if (this._conditionFlags[ci]) {
        this._conditionFlags[ci] = false;
        this._trueFlags[ci] = true;
      } else if (!this._conditionFlags[ci] && !this._trueFlags[ci]) {
        this._conditionFlags[ci] = true;
        this._trueFlags[ci] = true;
      }
      return false;
    } else if (actionName.match(/ELSE[ ]IF[ ](.*)/i)) {
      if (this._conditionFlags.length <= 0) return false;
      if (this._conditionFlags[ci]) {
        this._conditionFlags[ci] = false;
        this._trueFlags[ci] = true;
      } else if (!this._conditionFlags[ci] && !this._trueFlags[ci]) {
        var text = String(RegExp.$1);
        this._conditionFlags[ci] = eval('(' + text + ')');
        this._trueFlags[ci] = eval('(' + text + ')');
      }
      return false;
    } else if (actionName.toUpperCase() === 'END') {
      if (this._conditionFlags.length <= 0) return false;
      this._conditionFlags.pop();
      this._trueFlags.pop();
      return false;
    }
    if (this._conditionFlags.length > 0) return this._conditionFlags[ci];
    return true
};

BattleManager.actionActionAnimation = function() {
		this._logWindow.showAnimation(this._subject,
      this._targets.filter(onlyUnique), this._action.item().animationId);
    return true;
};

BattleManager.actionActionCommonEvent = function() {
    this._action.item().effects.forEach(function(effect) {
        if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
            $gameTemp.reserveCommonEvent(effect.dataId);
        }
    }, this);
    return false;
};

BattleManager.actionActionEffect = function() {
    this._targets.forEach(function(target) {
      this.invokeAction(this._subject, target);
    }, this);
    return true;
};

BattleManager.actionAniWait = function(frames) {
    frames *= _yep_ani_rate || 4;
    this._logWindow._waitCount = parseInt(frames);
    return false;
};

BattleManager.actionCastAnimation = function() {
  if (!this._action.isAttack() && !this._action.isGuard() &&
	this._action.isSkill()) {
    if (this._action.item().castAnimation > 0) {
      var ani = $dataAnimations[this._action.item().castAnimation]
			this._logWindow.showAnimation(this._subject, [this._subject],
        this._action.item().castAnimation);
    }
  }
  return true;
};


BattleManager.actionClearBattleLog = function() {
    this._logWindow.clear();
    return false;
};

BattleManager.actionDeathBreak = function() {
    if (this._subject.isDead() || this._subject.hp <= 0) {
      this._targets = [];
      this._actionList = [];
      this._individualTargets = [];
      this._phase = 'phaseChange';
      return false;
    }
    return true;
};

BattleManager.actionDisplayAction = function() {
    this._logWindow.displayAction(this._subject, this._action.item());
    return false;
};

BattleManager.actionIfConditions = function(actionName, actionArgs) {
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
	var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  var actionName = this._actSeq[0];
  if (actionName.match(/IF[ ](.*)/i)) {
    var text = String(RegExp.$1);
    this._conditionFlags.push(eval(text));
    this._trueFlags.push(false);
    var ci = this._conditionFlags.length;
  }
  return true;
};

BattleManager.actionImmortal = function(actionArgs) {
		var targets = this.makeActionTargets(actionArgs[0]).filter(onlyUnique);
		var value = eval(String(actionArgs[1]).toLowerCase());
		targets.forEach(function (target) {
			if (value) {
				target.addImmortal();
			} else {
				target.removeImmortal();
        if (target.isDead())  target.performCollapse();
			}
		}, this);
    return true;
};

BattleManager.actionPerformAction = function() {
    this._logWindow.performAction(this._subject, this._action);
    return true;
};

BattleManager.actionPerformFinish = function() {
    this._logWindow.performActionEnd(this._subject);
    $gameParty.aliveMembers().forEach(function(member) {
      member.spriteReturnHome();
    });
    $gameTroop.aliveMembers().forEach(function(member) {
      member.spriteReturnHome();
    });
    return true;
};

BattleManager.actionPerformStart = function() {
    this._logWindow.performActionStart(this._subject, this._action);
    return true;
};

BattleManager.actionWait = function(frames) {
    this._logWindow._waitCount = parseInt(frames);
    return false;
};

BattleManager.actionWaitForAnimation = function() {
    this._logWindow.waitForAnimation();
    return false;
};

BattleManager.actionWaitForMovement = function() {
    this._logWindow.waitForMovement();
    return false;
};

BattleManager.actionWaitForNewLine = function() {
    this._logWindow.waitForNewLine();
    return false;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Sprite_Battler.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
        if (this._battler.isSpriteVisible()) {
            var sprite = new Sprite_Damage();
            sprite.x = this.x + this.damageOffsetX();
            sprite.y = this.y + this.damageOffsetY();
            sprite.setup(this._battler);
            this.pushDamageSprite(sprite);
            this.parent.addChild(sprite);
        }
    } else {
      this._battler.clearDamagePopup();
      this._battler.clearResult();
    }
};

var _yep_bec_popBuffer = String(parameters['Popup Overlap Rate'] || '0.9');
var _yep_bec_popNewLoc = String(parameters['Newest Popup Bottom'] || 'false');
Sprite_Battler.prototype.pushDamageSprite = function(sprite) {
    var heightBuffer = eval(_yep_bec_popBuffer);
		if (eval(_yep_bec_popNewLoc)) {
			this._damages.forEach(function(spr) {
				for (var i = 0; i < spr.children.length; i++) {
					childSprite = spr.children[i];
					childSprite.anchor.y += heightBuffer;
				}
			}, this);
			this._damages.push(sprite);
		} else {
			this._damages.push(sprite);
			heightBuffer *= this._damages.length
			for (var i = 0; i < sprite.children.length; i++) {
				childSprite = sprite.children[i];
				childSprite.anchor.y += heightBuffer;
			}
		}
};

var _YEP_BEC_Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    _YEP_BEC_Sprite_Battler_setBattler.call(this, battler);
    if (battler) battler.setBattler(this);
};

Sprite_Battler.prototype.stepForward = function() {
    this.startMove(48, 0, 12);
};

Sprite_Battler.prototype.stepBack = function() {
    this.startMove(0, 0, 12);
};

Sprite_Battler.prototype.startMotion = function(motionType) {
};

Sprite_Battler.prototype.refreshMotion = function() {
};

Sprite_Battler.prototype.startActionMotion = function() {
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Sprite_Actor.prototype.setupMotion = function() {
};

Sprite_Actor.prototype.updateTargetPosition = function() {
};

Sprite_Actor.prototype.updateMotion = function() {
    this.updateMotionCount();
};

Sprite_Actor.prototype.onMoveEnd = function() {
    Sprite_Battler.prototype.onMoveEnd.call(this);
};

//=============================================================================
// Sprite_Damage
//=============================================================================

var _yep_bec_popupDur = String(parameters['Popup Duration'] || '90');
var _YEP_BEC_Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
    _YEP_BEC_Sprite_Damage_initialize.call(this);
    this._duration = eval(_yep_bec_popupDur);
};

Sprite_Damage.prototype.setup = function(target) {
    var result = target.shiftDamagePopup();
    if (result.missed || result.evaded) {
        this.createMiss();
    } else if (result.hpAffected) {
        this.createDigits(0, result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
        this.createDigits(2, result.mpDamage);
    }
    if (result.critical) {
        this.setupCriticalEffect();
    }
};

var _yep_bec_critPopup = String(parameters['Critical Popup'] ||
													'255, 0, 0, 160');
var _yep_bec_critDur   = String(parameters['Critical Duration'] || '60');
Sprite_Damage.prototype.setupCriticalEffect = function() {
    this._flashColor = eval('[' + _yep_bec_critPopup + ']');
    this._flashDuration = eval(_yep_bec_critDur);
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.isBusy = function() {
    return false; //this.isAnyoneMoving();
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.clearActionSequenceSettings = function() {
};

//=============================================================================
// Game_Action
//=============================================================================

var _yep_bec_actSpeed = String(parameters['Action Speed'] ||
                        'agi + Math.randomInt(Math.floor(5 + agi / 4))');
Game_Action.prototype.speed = function() {
    var agi = this.subject().agi;
    var speed = eval(_yep_bec_actSpeed);
    if (this.item()) speed += this.item().speed;
    if (this.isAttack()) speed += this.subject().attackSpeed();
    return speed;
};

var _YEP_BEC_Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    target._result = null;
    target._result = new Game_ActionResult();
    _YEP_BEC_Game_Action_apply.call(this, target);
    target.startDamagePopup();
		target.performResultEffects();
};

Game_Action.prototype.applyGlobal = function() {
};

//=============================================================================
// Game_Battler
//=============================================================================

var _yep_bec_immortal = Number(parameters['Immortal State ID'] || 3);
Game_Battler.prototype.addImmortal = function() {
    if (_yep_bec_immortal <= 0) return;
    this._prevImmortalState = this.isStateAffected(_yep_bec_immortal);
    this.addState(_yep_bec_immortal);
};

Game_Battler.prototype.removeImmortal = function() {
    if (_yep_bec_immortal <= 0) return;
    if (this._prevImmortalState) return;
    this.removeState(_yep_bec_immortal);
};

Game_Battler.prototype.clearDamagePopup = function() {
    this._damagePopup = [];
};

Game_Battler.prototype.isDamagePopupRequested = function() {
    if (!this._damagePopup) this.clearDamagePopup();
    return this._damagePopup.length > 0;
};

Game_Battler.prototype.startDamagePopup = function() {
    this._damagePopup.push(this.result());
};

Game_Battler.prototype.shiftDamagePopup = function() {
    if (!this._damagePopup) this.clearDamagePopup();
    return this._damagePopup.shift();
};


Game_Battler.prototype.performResultEffects = function() {
    var result = this.result();
    if (result.missed && result.physical) this.performMiss();
    if (result.evaded) {
      if (result.physical) {
        this.performEvasion();
      } else {
        this.performMagicEvasion();
      }
    }
    if (result.hpAffected) {
      if (result.hpDamage > 0 && !result.drain) {
        this.performDamage();
      }
      if (result.hpDamage < 0) {
        this.performRecovery();
      }
    }
    if (this.isAlive() && result.mpDamage !== 0 && result.mpDamage < 0) {
      this.performRecovery();
    }
    if (this.isAlive() && result.tpDamage !== 0 && result.tpDamage < 0) {
      this.performRecovery();
    }
};

Game_Battler.prototype.setBattler = function(sprite) {
    this._battler = sprite;
};

Game_Battler.prototype.clearBattler = function(sprite) {
    this._battler = null;
};

Game_Battler.prototype.battler = function() {
    return this._battler;
};

Game_Battler.prototype.requestMotion = function(motionType) {
    this._motionType = motionType;
    if (this.battler()) {
      this.battler().startMotion(motionType);
    }
};

Game_Battler.prototype.startWeaponAnimation = function(weaponImageId) {
    this._weaponImageId = weaponImageId;
    if (this.battler()) {
      this.battler().setupWeaponAnimation();
    }
};

Game_Battler.prototype.performActionStart = function(action) {
    if (!action.isGuard()) {
        this.setActionState('acting');
        this.spriteStepForward();
    }
};

var _YEP_BEC_Game_Battler_performActionEnd =
    Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    _YEP_BEC_Game_Battler_performActionEnd.call(this);
    this.spriteReturnHome();
};

Game_Battler.prototype.spriteStepForward = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepForward();
    }
};

Game_Battler.prototype.spriteReturnHome = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepBack();
      if (this.numActions() <= 0) {
        this.setActionState('undecided');
      }
      this.battler().refreshMotion();
    }
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.performActionStart = function(action) {
    Game_Battler.prototype.performActionStart.call(this, action);
    if (!$gameSystem.isSideView()) {
      this.requestEffect('whiten');
    }
};

Game_Enemy.prototype.sprite = function() {
    if (this._battlerSprite) return this._battlerSprite;
    this._battlerSprite = ImageManager.loadSvEnemy(this.battlerName(),
      this.battlerHue());
    return this._battlerSprite;
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.clearBattlerSprites = function() {
    this.members().forEach(function(member) {
      member.clearBattler();
    });
};

//=============================================================================
// Scene_Battle
//=============================================================================

var _yep_bec_lowerWindows = String(parameters['Lower Windows'] || 'true');
var _yep_bec_enemySelect = String(parameters['Visual Enemy Select'] || 'true');
var _disable_webglmask = false;

var _YEP_BEC_Scene_Battle_createSkillWindow =
    Scene_Battle.prototype.createSkillWindow;
Scene_Battle.prototype.createSkillWindow = function() {
    _YEP_BEC_Scene_Battle_createSkillWindow.call(this);
    if (eval(_yep_bec_lowerWindows)) this.adjustLowerWindow(this._skillWindow);
};

var _YEP_BEC_Scene_Battle_createItemWindow =
    Scene_Battle.prototype.createItemWindow;
Scene_Battle.prototype.createItemWindow = function() {
    _YEP_BEC_Scene_Battle_createItemWindow.call(this);
    if (eval(_yep_bec_lowerWindows)) this.adjustLowerWindow(this._itemWindow);
};

var _YEP_BEC_Scene_Battle_createActorWindow =
		Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
    _YEP_BEC_Scene_Battle_createActorWindow.call(this);
    this._actorWindow.x = Graphics.boxWidth - this._actorWindow.width;
};

var _yep_bec_lowerWinLines = String(parameters['Window Rows'] || '4');
Scene_Battle.prototype.adjustLowerWindow = function(win) {
    win.height = win.fittingHeight(eval(_yep_bec_lowerWinLines));
    win.y = Graphics.boxHeight - win.height;
};

var _YEP_BEC_Scene_Battle_startPartyCommandSelection =
    Scene_Battle.prototype.startPartyCommandSelection;
var _yep_bec_startActorCommand = String(parameters['Start Actor Command'] ||
                                'false');
Scene_Battle.prototype.startPartyCommandSelection = function() {
    if (eval(_yep_bec_startActorCommand)) {
      this.selectNextCommand();
    } else {
      _YEP_BEC_Scene_Battle_startPartyCommandSelection.call(this);
    }
};

var _YEP_BEC_Scene_Battle_selectPreviousCommand =
    Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
    if (eval(_yep_bec_startActorCommand)) {
      BattleManager.selectPreviousCommand();
      if (BattleManager.isInputting() && BattleManager.actor()) {
        this.startActorCommandSelection();
      } else {
        _YEP_BEC_Scene_Battle_startPartyCommandSelection.call(this);
      }
    } else {
      _YEP_BEC_Scene_Battle_selectPreviousCommand.call(this);
    }
};

var _YEP_BEC_Scene_Battle_startActorCommandSelection =
		Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    _YEP_BEC_Scene_Battle_startActorCommandSelection.call(this);
		this._statusWindow.refresh();
};

var _YEP_BEC_Scene_Battle_selectEnemySelection =
    Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    _YEP_BEC_Scene_Battle_selectEnemySelection.call(this);
    this._enemyWindow.autoSelect();
};

//=============================================================================
// Window_BattleEnemy
//=============================================================================

var _YEP_BEC_Window_BattleEnemy_initialize =
    Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(x, y) {
    if (eval(_yep_bec_enemySelect)) {
      x = y = -500;
      this._ignoreMask = true
    };
    _YEP_BEC_Window_BattleEnemy_initialize.call(this, x, y);
    if (eval(_yep_bec_enemySelect)) this.opacity = 0;
};

var _YEP_BEC_Window_BattleEnemy_windowWidth =
    Window_BattleEnemy.prototype.windowWidth;
Window_BattleEnemy.prototype.windowWidth = function() {
    if (eval(_yep_bec_enemySelect)) return Graphics.boxWidth + 500;
    return _YEP_BEC_Window_BattleEnemy_windowWidth.call(this);
};

var _YEP_BEC_Window_BattleEnemy_windowHeight =
    Window_BattleEnemy.prototype.windowHeight;
Window_BattleEnemy.prototype.windowHeight = function() {
  if (eval(_yep_bec_enemySelect)) return Graphics.boxHeight + 500;
  return _YEP_BEC_Window_BattleEnemy_windowHeight.call(this);
};

var _YEP_WindowLayer_webglMaskWindow = WindowLayer.prototype._webglMaskWindow;
WindowLayer.prototype._webglMaskWindow = function(renderSession, win) {
    if (win._ignoreMask) return;
    _YEP_WindowLayer_webglMaskWindow.call(this, renderSession, win);
};

var _YEP_BEC_Window_BattleEnemy_maxCols =
    Window_BattleEnemy.prototype.maxCols;
Window_BattleEnemy.prototype.maxCols = function() {
    if (eval(_yep_bec_enemySelect)) return this.allowedTargets().length;
    return _YEP_BEC_Window_BattleEnemy_maxCols.call(this);
};

Window_BattleEnemy.prototype.allowedTargets = function() {
    var targets = [];
    targets = targets.concat($gameTroop.aliveMembers());
    return targets;
};

Window_BattleEnemy.prototype.refresh = function() {
    this._enemies = $gameTroop.aliveMembers();
    this.sortTargets();
    Window_Selectable.prototype.refresh.call(this);
};

Window_BattleEnemy.prototype.sortTargets = function() {
		this._enemies.sort(function(a, b) {
				if (a.screenX() == b.screenX()) {
					return a.screenY() - b.screenY();
				}
				return a.screenX() - b.screenX();
		});
};

var _yep_bec_enemyfontsize = Number(parameters['Enemy Font Size'] || 28);
Window_BattleEnemy.prototype.drawItem = function(index) {
    this.resetTextColor();
    var name = this._enemies[index].name();
    if (eval(_yep_bec_enemySelect)) {
      var rect = this.nameRect(index);
      var align = 'center';
    } else {
      var rect = this.itemRectForText(index);
      var align = 'left';
    }
    this.contents.fontSize = _yep_bec_enemyfontsize;
    this.drawText(name, rect.x, rect.y, rect.width, align);
		this.resetFontSettings();
};

Window_BattleEnemy.prototype.itemRect = function(index) {
    if (eval(_yep_bec_enemySelect)) {
      var rect = new Rectangle();
  		var enemy = this._enemies[index];
  		var maxCols = this.maxCols();
      rect.width = enemy.sprite().width;
      rect.height = enemy.sprite().height;
  		var pad = this.standardPadding();
      rect.x = enemy.screenX() - rect.width / 2 - pad + 500;
      rect.y = enemy.screenY() - rect.height - pad + 500;
  		return rect;
    }
    return Window_Selectable.prototype.itemRect.call(this, index);
};

var _yep_bec_showEnemyName = String(parameters['Show Enemy Name'] || 'true');
Window_BattleEnemy.prototype.nameRect = function(index) {
		var rect = new Rectangle();
    if (!eval(_yep_bec_showEnemyName)) return rect;
		var enemy = this._enemies[index];
		var maxCols = this.maxCols();
    this.contents.fontSize = _yep_bec_enemyfontsize;
    var textSize = this.textWidth(' ' + enemy.name() + ' ');
		rect.width = Math.max(enemy.sprite().width, textSize);
		rect.height = this.lineHeight();
		var pad = this.standardPadding();
		rect.x = enemy.screenX() - rect.width / 2 - pad + 500;
		rect.y = enemy.screenY() - enemy.sprite().height - pad + 500;
		rect.y += enemy.sprite().height - this.lineHeight() -
			this.standardPadding();
		return rect;
};

Window_BattleEnemy.prototype.updateCursor = function() {
    if (eval(_yep_bec_enemySelect)) {
      if (this._cursorAll) {
    			var allRowsHeight = this.maxRows() * this.itemHeight();
    			this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
    			this.setTopRow(0);
    	} else if (this.index() < 0) {
    			this.setCursorRect(0, 0, 0, 0);
    	} else {
    			this.ensureCursorVisible();
    			var rect = this.nameRect(this.index());
    			this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    	}
    } else {
      Window_Selectable.prototype.updateCursor.call(this);
    }
};

var _yep_bec_enemyAutoSelect = String(parameters['Enemy Auto Select'] || '0');
Window_BattleEnemy.prototype.autoSelect = function() {
    var selectIndex = eval(_yep_bec_enemyAutoSelect);
    this.select(selectIndex);
};

Window_BattleEnemy.prototype.furthestRight = function() {
		return this.maxItems() - 1;
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

var _yep_bec_commandAlign = String(parameters['Command Alignment'] || 'left');
Window_PartyCommand.prototype.itemTextAlign = function() {
    return _yep_bec_commandAlign;
};

var _yep_bec_commandLines = String(parameters['Command Window Rows'] || '4');
Window_PartyCommand.prototype.numVisibleRows = function() {
    return eval(_yep_bec_commandLines);
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.itemTextAlign = function() {
    return _yep_bec_commandAlign;
};

Window_ActorCommand.prototype.numVisibleRows = function() {
    return eval(_yep_bec_commandLines);
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.numVisibleRows = function() {
    return eval(_yep_bec_commandLines);
};

//=============================================================================
// Window_BattleLog
//=============================================================================

var _yep_bec_aniBaseDelay = String(parameters['Animation Base Delay'] || '8');
Window_BattleLog.prototype.animationBaseDelay = function() {
    return eval(_yep_bec_aniBaseDelay);
};

var _yep_bec_aniNextDelay = String(parameters['Animation Next Delay'] || '12');
Window_BattleLog.prototype.animationNextDelay = function() {
    return eval(_yep_bec_aniNextDelay);
};

Window_BattleLog.prototype.updateWaitMode = function() {
    var waiting = false;
    switch (this._waitMode) {
    case 'effect':
        waiting = this._spriteset.isEffecting();
        break;
    case 'movement':
        waiting = this._spriteset.isAnyoneMoving();
        break;
    case 'animation':
        waiting = this._spriteset.isAnimationPlaying();
        break;
    }
    if (!waiting) {
        this._waitMode = '';
    }
    return waiting;
};

Window_BattleLog.prototype.startAction = function(subject, action, targets) {
};

Window_BattleLog.prototype.endAction = function(subject) {
};

Window_BattleLog.prototype.waitForAnimation = function() {
    this.setWaitMode('animation');
};

var _yep_bec_fullActionText = String(parameters['Show Action Text'] || 'true');
var _YEP_BEC_Window_BattleLog_displayAction =
    Window_BattleLog.prototype.displayAction;
Window_BattleLog.prototype.displayAction = function(subject, item) {
    if (eval(_yep_bec_fullActionText)) {
      _YEP_BEC_Window_BattleLog_displayAction.call(this, subject, item);
    } else {
      this._actionIcon = item.iconIndex;
      this.push('addText', '<SIMPLE>' + item.name);
      if (item.message2) {
        this.push('addText', '<CENTER>' + item.message2.format(item.name));
      }
    }
};

var _YEP_BEC_Window_BattleLog_dispActResults =
		Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
    if (eval(_yep_bec_optSpeed)) {
			if (target.result().used) {
	        this.displayCritical(target);
					this.displayDamage(target);
					this.displayAffectedStatus(target);
					this.displayFailure(target);
	    }
		} else {
			_YEP_BEC_Window_BattleLog_dispActResults.call(this, subject, target);
		}
};

var _YEP_BEC_Window_BattleLog_drawLineText =
    Window_BattleLog.prototype.drawLineText;
Window_BattleLog.prototype.drawLineText = function(index) {
    if (this._lines[index].match('<CENTER>')) {
      this.drawCenterLine(index);
    } else if (this._lines[index].match('<SIMPLE>')) {
      this.drawSimpleActionLine(index);
    } else {
      _YEP_BEC_Window_BattleLog_drawLineText.call(this, index);
    }
};

Window_BattleLog.prototype.drawCenterLine = function(index) {
    var text = this._lines[index].replace('<CENTER>', '');
    var rect = this.itemRectForText(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    this.drawText(text, rect.x, rect.y, Graphics.boxWidth, 'center');
};

Window_BattleLog.prototype.drawSimpleActionLine = function(index) {
    var text = this._lines[index].replace('<SIMPLE>', '');
    var rect = this.itemRectForText(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    if (this._actionIcon) {
      var tw = this.textWidth(text);
      var ix = (rect.width - tw) / 2 - 4;
      this.drawIcon(this._actionIcon, ix, rect.y);
    }
    this.drawText(text, rect.x, rect.y, Graphics.boxWidth, 'center');
};

var _yep_bec_showCounterText = String(parameters['Show Counter Text'] ||
																'true');
var _YEP_BEC_Window_BattleLog_displayCounter =
    Window_BattleLog.prototype.displayCounter;
Window_BattleLog.prototype.displayCounter = function(target) {
    if (!eval(_yep_bec_showCounterText)) return;
    _YEP_BEC_Window_BattleLog_displayCounter.call(this, target);
};

var _yep_bec_showReflectText = String(parameters['Show Reflect Text'] ||
																'true');
var _YEP_BEC_Window_BattleLog_displayReflection =
    Window_BattleLog.prototype.displayReflection;
Window_BattleLog.prototype.displayReflection = function(target) {
    if (!eval(_yep_bec_showReflectText)) return;
    _YEP_BEC_Window_BattleLog_displayReflection.call(this, target);
};

var _yep_bec_showSubText = String(parameters['Show Substitute Text'] ||
														'true');
var _YEP_BEC_Window_BattleLog_displaySubstitute =
    Window_BattleLog.prototype.displaySubstitute;
Window_BattleLog.prototype.displaySubstitute = function(target) {
    if (!eval(_yep_bec_showSubText)) return;
    _YEP_BEC_Window_BattleLog_displaySubstitute.call(this, target);
};

var _yep_bec_showFailText = String(parameters['Show Fail Text'] || 'true');
var _YEP_BEC_Window_BattleLog_displayFailure =
    Window_BattleLog.prototype.displayFailure;
Window_BattleLog.prototype.displayFailure = function(target) {
    if (!eval(_yep_bec_showFailText)) return;
    _YEP_BEC_Window_BattleLog_displayFailure.call(this, target);
};

var _yep_bec_showCritText = String(parameters['Show Critical Text'] || 'true');
var _YEP_BEC_Window_BattleLog_displayCritical =
    Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
    if (!eval(_yep_bec_showCritText)) return;
    _YEP_BEC_Window_BattleLog_displayCritical.call(this, target);
};

var _yep_bec_showMissText = String(parameters['Show Miss Text'] || 'true');
var _YEP_BEC_Window_BattleLog_displayMiss =
    Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
    if (!eval(_yep_bec_showMissText)) return;
    _YEP_BEC_Window_BattleLog_displayMiss.call(this, target);
};

var _yep_bec_showEvadeText = String(parameters['Show Evasion Text'] || 'true');
var _YEP_BEC_Window_BattleLog_displayEvasion =
    Window_BattleLog.prototype.displayEvasion;
Window_BattleLog.prototype.displayEvasion = function(target) {
    if (!eval(_yep_bec_showEvadeText)) return;
    _YEP_BEC_Window_BattleLog_displayEvasion.call(this, target);
};

var _yep_bec_showHpText = String(parameters['Show HP Text'] || 'true');
var _YEP_BEC_Window_BattleLog_displayHpDamage =
    Window_BattleLog.prototype.displayHpDamage;
Window_BattleLog.prototype.displayHpDamage = function(target) {
    if (!eval(_yep_bec_showHpText)) return;
    _YEP_BEC_Window_BattleLog_displayHpDamage.call(this, target);
};

var _yep_bec_showMpText = String(parameters['Show MP Text'] || 'true');
var _YEP_BEC_Window_BattleLog_displayMpDamage =
    Window_BattleLog.prototype.displayMpDamage;
Window_BattleLog.prototype.displayMpDamage = function(target) {
    if (!eval(_yep_bec_showMpText)) return;
    _YEP_BEC_Window_BattleLog_displayMpDamage.call(this, target);
};

var _yep_bec_showTpText = String(parameters['Show TP Text'] || 'true');
var _YEP_BEC_Window_BattleLog_displayTpDamage =
    Window_BattleLog.prototype.displayTpDamage;
Window_BattleLog.prototype.displayTpDamage = function(target) {
    if (!eval(_yep_bec_showTpText)) return;
    _YEP_BEC_Window_BattleLog_displayTpDamage.call(this, target);
};

var _yep_bec_showStateText = String(parameters['Show State Text'] || 'true');
var _YEP_BEC_Window_BattleLog_displayCurrentState =
    Window_BattleLog.prototype.displayCurrentState;
Window_BattleLog.prototype.displayCurrentState = function(subject) {
    if (!eval(_yep_bec_showStateText)) return;
    _YEP_BEC_Window_BattleLog_displayCurrentState.call(this, subject);
};

var _YEP_BEC_Window_BattleLog_displayAddedStates =
    Window_BattleLog.prototype.displayAddedStates;
Window_BattleLog.prototype.displayAddedStates = function(target) {
    if (!eval(_yep_bec_showStateText)) return;
    _YEP_BEC_Window_BattleLog_displayAddedStates.call(this, target);
};

var _YEP_BEC_Window_BattleLog_displayRemovedStates =
    Window_BattleLog.prototype.displayRemovedStates;
Window_BattleLog.prototype.displayRemovedStates = function(target) {
    if (!eval(_yep_bec_showStateText)) return;
    _YEP_BEC_Window_BattleLog_displayRemovedStates.call(this, target);
};

var _yep_bec_showBuffText = String(parameters['Show Buff Text'] || 'true');
var _YEP_BEC_Window_BattleLog_displayChangedBuffs =
    Window_BattleLog.prototype.displayChangedBuffs;
Window_BattleLog.prototype.displayChangedBuffs = function(target) {
    if (!eval(_yep_bec_showBuffText)) return;
    _YEP_BEC_Window_BattleLog_displayChangedBuffs.call(this, target);
};

Window_BattleLog.prototype.popupDamage = function(target) {
};

//=============================================================================
// New Functions
//=============================================================================

getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
