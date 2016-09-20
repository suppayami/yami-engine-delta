//=============================================================================
// Yanfly Engine Plugins - Row Formation
// YEP_RowFormation.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_RowFormation = true;

var Yanfly = Yanfly || {};
Yanfly.Row = Yanfly.Row || {};

//=============================================================================
 /*:
 * @plugindesc v1.10 Places party members into row formations to give
 * them distinct advantages based on row location.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Maximum Rows
 * @desc Maximum amount of rows used in your game. This value cannot
 * be changed mid-game. Minimum: 1. Maximum: 10.
 * @default 3
 *
 * @param Command Name
 * @desc The command name used for Row formation command.
 * @default Row
 *
 * @param Auto Add Menu
 * @desc Automatically add the 'Row' command to the main menu?
 * NO - false     YES - true
 * @default true
 *
 * @param Show Menu Command
 * @desc Show the command in the main menu?
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Menu Command
 * @desc Enable the command in the main menu?
 * NO - false     YES - true
 * @default true
 *
 * @param Show Battle Command
 * @desc Show the command in the battle menu?
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Battle Command
 * @desc Enable the command in the battle menu?
 * NO - false     YES - true
 * @default true
 *
 * @param Battle Cooldown
 * @desc How many turns must the player wait after changing rows?
 * @default 1
 *
 * @param ---Defaults---
 * @default
 *
 * @param Default Row
 * @desc The default row used by all battlers unless modified by a
 * notetag. Minimum: 1. Maximum: 10.
 * @default 1
 *
 * @param Enemy Row Lock
 * @desc Row lock the enemies to prevent them from changing rows?
 * NO - false     YES - true
 * @default false
 *
 * @param ---Menu Settings---
 * @default
 *
 * @param Use Map Sprite
 * @desc Use map sprite instead of sideview sprite for menu?
 * NO - false     YES - true
 * @default false
 *
 * @param Front Buffer Y
 * @desc The sprite buffer Y formula if you're using front view.
 * @default (rect.height - 48) / 2;
 *
 * @param Side Buffer Y
 * @desc The sprite buffer Y formula if you're using sideview.
 * @default (rect.height - 64) / 2;
 *
 * @param ---Position Settings---
 * @default
 *
 * @param Maximum Row X
 * @desc The maximum X position value for the row X value.
 * @default screenWidth - partySize * 32 - 16
 *
 * @param Maximum Row Y
 * @desc The maximum Y position value for the row Y value.
 * @default screenHeight - statusHeight - 16
 *
 * @param Minimum Row Y
 * @desc The maximum Y position value for the row Y value.
 * @default screenHeight - statusHeight - 16 - (maxSize * 64)
 *
 * @param Center Row Y
 * @desc The center Y position value for the row Y value.
 * @default (maxRowY + minRowY) / 2 + 16
 *
 * @param ---Row 1 Settings---
 * @default
 *
 * @param Row 1 Name
 * @desc The name used to refer to this row.
 * @default Front Row
 *
 * @param Row 1 Help Line 1
 * @desc The help description used for this row.
 * @default This is the front row.
 *
 * @param Row 1 Help Line 2
 * @desc The help description used for this row.
 * @default Place your melee allies here.
 *
 * @param Row 1 States
 * @desc When a battler is in this row, apply these states.
 * Separate the states allocated with a space.
 * @default
 *
 * @param Row 1 Home X
 * @desc This is the formula used to determine the Home X location
 * for this row.
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 1 Home Y
 * @desc This is the formula used to determine the Home Y location
 * for this row.
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 * 
 * @param ---Row 2 Settings---
 * @default
 *
 * @param Row 2 Name
 * @desc The name used to refer to this row.
 * @default Middle Row
 *
 * @param Row 2 Help Line 1
 * @desc The help description used for this row.
 * @default This is the middle row.
 *
 * @param Row 2 Help Line 2
 * @desc The help description used for this row.
 * @default Place allies here who can fight from the middle.
 *
 * @param Row 2 States
 * @desc When a battler is in this row, apply these states.
 * Separate the states allocated with a space.
 * @default
 *
 * @param Row 2 Home X
 * @desc This is the formula used to determine the Home X location
 * for this row.
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 2 Home Y
 * @desc This is the formula used to determine the Home Y location
 * for this row.
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 * 
 * @param ---Row 3 Settings---
 * @default
 *
 * @param Row 3 Name
 * @desc The name used to refer to this row.
 * @default Back Row
 *
 * @param Row 3 Help Line 1
 * @desc The help description used for this row.
 * @default This is the back row.
 *
 * @param Row 3 Help Line 2
 * @desc The help description used for this row.
 * @default Place allies here to take less melee damage.
 *
 * @param Row 3 States
 * @desc When a battler is in this row, apply these states.
 * Separate the states allocated with a space.
 * @default
 *
 * @param Row 3 Home X
 * @desc This is the formula used to determine the Home X location
 * for this row.
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 3 Home Y
 * @desc This is the formula used to determine the Home Y location
 * for this row.
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 * 
 * @param ---Row 4 Settings---
 * @default
 *
 * @param Row 4 Name
 * @desc The name used to refer to this row.
 * @default Row 4
 *
 * @param Row 4 Help Line 1
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 4 Help Line 2
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 4 States
 * @desc When a battler is in this row, apply these states.
 * Separate the states allocated with a space.
 * @default
 *
 * @param Row 4 Home X
 * @desc This is the formula used to determine the Home X location
 * for this row.
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 4 Home Y
 * @desc This is the formula used to determine the Home Y location
 * for this row.
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 * 
 * @param ---Row 5 Settings---
 * @default
 *
 * @param Row 5 Name
 * @desc The name used to refer to this row.
 * @default Row 5
 *
 * @param Row 5 Help Line 1
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 5 Help Line 2
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 5 States
 * @desc When a battler is in this row, apply these states.
 * Separate the states allocated with a space.
 * @default
 *
 * @param Row 5 Home X
 * @desc This is the formula used to determine the Home X location
 * for this row.
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 5 Home Y
 * @desc This is the formula used to determine the Home Y location
 * for this row.
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 * 
 * @param ---Row 6 Settings---
 * @default
 *
 * @param Row 6 Name
 * @desc The name used to refer to this row.
 * @default Row 6
 *
 * @param Row 6 Help Line 1
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 6 Help Line 2
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 6 States
 * @desc When a battler is in this row, apply these states.
 * Separate the states allocated with a space.
 * @default
 *
 * @param Row 6 Home X
 * @desc This is the formula used to determine the Home X location
 * for this row.
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 6 Home Y
 * @desc This is the formula used to determine the Home Y location
 * for this row.
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 * 
 * @param ---Row 7 Settings---
 * @default
 *
 * @param Row 7 Name
 * @desc The name used to refer to this row.
 * @default Row 7
 *
 * @param Row 7 Help Line 1
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 7 Help Line 2
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 7 States
 * @desc When a battler is in this row, apply these states.
 * Separate the states allocated with a space.
 * @default
 *
 * @param Row 7 Home X
 * @desc This is the formula used to determine the Home X location
 * for this row.
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 7 Home Y
 * @desc This is the formula used to determine the Home Y location
 * for this row.
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 * 
 * @param ---Row 8 Settings---
 * @default
 *
 * @param Row 8 Name
 * @desc The name used to refer to this row.
 * @default Row 8
 *
 * @param Row 8 Help Line 1
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 8 Help Line 2
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 8 States
 * @desc When a battler is in this row, apply these states.
 * Separate the states allocated with a space.
 * @default
 *
 * @param Row 8 Home X
 * @desc This is the formula used to determine the Home X location
 * for this row.
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 8 Home Y
 * @desc This is the formula used to determine the Home Y location
 * for this row.
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 * 
 * @param ---Row 9 Settings---
 * @default
 *
 * @param Row 9 Name
 * @desc The name used to refer to this row.
 * @default Row 9
 *
 * @param Row 9 Help Line 1
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 9 Help Line 2
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 9 States
 * @desc When a battler is in this row, apply these states.
 * Separate the states allocated with a space.
 * @default
 *
 * @param Row 9 Home X
 * @desc This is the formula used to determine the Home X location
 * for this row.
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 9 Home Y
 * @desc This is the formula used to determine the Home Y location
 * for this row.
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 * 
 * @param ---Row 10 Settings---
 * @default
 *
 * @param Row 10 Name
 * @desc The name used to refer to this row.
 * @default Row 10
 *
 * @param Row 10 Help Line 1
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 10 Help Line 2
 * @desc The help description used for this row.
 * @default Help Description
 *
 * @param Row 10 States
 * @desc When a battler is in this row, apply these states.
 * Separate the states allocated with a space.
 * @default
 *
 * @param Row 10 Home X
 * @desc This is the formula used to determine the Home X location
 * for this row.
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 10 Home Y
 * @desc This is the formula used to determine the Home Y location
 * for this row.
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 *
 * @param ---Enemy Rows---
 * @default
 *
 * @param Adjust Relative
 * @desc Adjusts enemy rows at the start of battle or as is.
 * false - As Is     true - Adjust Relative
 * @default false
 *
 * @param Enemy Row X
 * @desc Whenever an enemy changes rows, adjust X to this location.
 * This is a formula.
 * @default screenX - (rowId - 1) * 64
 *
 * @param Enemy Row Y
 * @desc Whenever an enemy changes rows, adjust Y to this location.
 * This is a formula.
 * @default screenY
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin places party members into row formations to give them distinct
 * advantages based on row location in the form of states for maximum control.
 * Skills and items are capable of moving targets to different row locations.
 * 
 * If you are using YEP_BattleEngineCore.js, place this plugin under the
 * YEP_BattleEngineCore.js plugin in the Plugin Manager list to receive extra
 * features such as being able to change Rows mid-battle.
 *
 * ============================================================================
 * What are Rows?
 * ============================================================================
 * 
 * Rows are positions your party members are placed in. Depending on how you
 * set up the rows for your project (and how many), rows can provide different
 * advantages to the party members for just simply being in that row.
 *
 * These advantages are granted through the states that are given to the party
 * members from the plugin parameter settings. How you set up these advantages
 * is entirely up to you.
 *
 * ---
 *
 * An example of some setups:
 *
 * Front Row:
 * Members in the front row will receive full damage from the Melee element.
 *
 * Middle Row:
 * Members in the middle row will receive slightly less damage from the Melee
 * element, but the Attack command is sealed unless they have a ranged weapon.
 *
 * Back Row:
 * Members in the back row will receive a lot less damage fom the Melee element
 * and also cannot use the Attack command unless equipped with a ranged weapon.
 *
 * ---
 *
 * How you choose to set up your rows is dependent on how you can set up your
 * states that affect those rows. These states cannot be removed by skills and
 * are considered a passive effective.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use these notetags to modify the various aspects of row formations.
 *
 * Actor and Enemy Notetags:
 *   <Default Row: x>
 *   <Default Row: x, x, x>
 *   This is the default row assigned to the battler by default. This will
 *   override the default parameter settings. If multiple x values are assigned
 *   then the battler can start in any of those rows. If multiple rows are
 *   included, then at the start of the game (for actors) or start of battle
 *   (for enemies), the battler will start in a random row included.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *   <Row Lock>
 *   This causes the affected battler to be row locked and unable to switch
 *   rows. For enemies, this will override the default parameters.
 *
 *   <Not Row Lock>
 *   This causes the affected battler to be not be row locked and able to
 *   switch rows. This is primarily for enemies since all non-enemies are not
 *   row locked by default. This will override the default parameters.
 *
 * Skill and Item Notetags:
 *   <Row Only: x>
 *   <Row Only: x, x, x>
 *   <Row Only: x to y>
 *   This makes it so that this skill/item can only be used by the battler if
 *   the battler is in row x. If multiple rows are used, the battler can be in
 *   any of those rows. If you use the x to y notetag, this will account for
 *   all the rows from x to y.
 *
 *   <Change Target Row: x>
 *   Changes target's current row to x. This cannot go under 1 nor can it go
 *   past the designated maximum row set in the parameters.
 *
 *   <Push Back Target Row: x>
 *   This will push the target back x rows. This cannot exceed the maximum row
 *   set in the parameters.
 *
 *   <Pull Forward Target Row: x>
 *   This will pull the target forward x rows. This cannot exceed the maximum
 *   rows set in the parameters.
 *
 *   <Change User Row: x>
 *   Changes user's current row to x. This cannot go under 1 nor can it go
 *   past the designated maximum row set in the parameters.
 *
 *   <Push Back User Row: x>
 *   This will push the user back x rows. This cannot exceed the maximum row
 *   set in the parameters.
 *
 *   <Pull Forward User Row: x>
 *   This will pull the user forward x rows. This cannot exceed the maximum
 *   rows set in the parameters.
 *
 * ============================================================================
 * Lunatic Mode - Conditional Row Modification
 * ============================================================================
 *
 * To the users who have a bit of JavaScript proficiency, you can use these
 * notetags to give your skills and items custom row modification properties.
 *
 * Skill and Item Notetags
 *
 *   <Custom Target Row>
 *    if (user.hpRate() > 0.50) {
 *      row += 1;
 *    } else {
 *      row = 1;
 *    }
 *   </Custom Target Row>
 *   The 'row' variable refers to the target's row. This will allow you to set
 *   or alter the target's row based on values. Remember that the lower the row
 *   number, the closer the target is to the opposing party.
 *
 *   <Custom User Row>
 *    if (user.hpRate() > 0.50) {
 *      row += 1;
 *    } else {
 *      row = 1;
 *    }
 *   </Custom User Row>
 *   The 'row' variable refers to the user's row. This will allow you to set or
 *   alter the user's row based on values. Remember that the lower the row
 *   number, the closer the user is the the opposing party.
 *
 * ============================================================================
 * Lunatic Mode - Conditional Row State
 * ============================================================================
 *
 * To the users who have a bit of JavaScript proficiency, you can use these
 * notetags to give your row states conditional activation properities, you can
 * use these notetags. These states have to be applied via the Row States in
 * the plugin parameters. However, they will not be applied to the battler
 * unless the conditions are met.
 *
 * State Notetags:
 *   <Custom Row Condition>
 *   if (user.hp / user.mhp <= 0.25) {
 *     condition = true;
 *   } else {
 *     condition = false;
 *   }
 *   </Custom Row Condition>
 *   The 'condition' variable determines if the condition is met or not. If the
 *   condition is true, the condition is met and this state will be applied to
 *   the battler as a row state. If the 'condition' variable is false, then the
 *   row state will not be applied to the battler.
 *
 * ============================================================================
 * Lunatic Mode - New JavaScript Functions~
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can make use of some of these
 * newly added functions when you do an eval check for the battler info:
 *
 * battler.row()
 * This will return the row the battler is currently resided in.
 *
 * battler.rowIndex()
 * This will return the battler's index in relation to the other battlers of
 * the same team in the same row.
 *
 * battler.isRowLocked()
 * This will return a true/false if the battler is row locked.
 *
 * battler.setRow(x)
 * This will set the battler's row to x. In battle, this will visually move
 * the battler there, unless the battler is the active battler.
 *
 * battler.alterRow(x)
 * This will alter the battler's row by x. In battle, this will visually move
 * the battler there, unless the battler is the active battler.
 *
 * $gameParty.rowSize(x)
 * $gameTroop.rowSize(x)
 * This will return the number of members found in that group in row x.
 *
 * $gameParty.rowAliveSize(x)
 * $gameTroop.rowAliveSize(x)
 * This will return the number of alive members found in that group in row x.
 *
 * $gameParty.rowDeadSize(x)
 * $gameTroop.rowDeadSize(x)
 * This will return the number of dead members found in that group in row x.
 *
 * $gameParty.rowMembers(x)
 * $gameTroop.rowMembers(x)
 * This will return each member of the group in row x.
 *
 * $gameParty.rowAliveMembers(x)
 * $gameTroop.rowAliveMembers(x)
 * This will return each alive member of the group in row x.
 *
 * $gameParty.rowDeadMembers(x)
 * $gameTroop.rowDeadMembers(x)
 * This will return each dead member of the group in row x.
 *
 * $gameParty.updateRows();
 * $gameTroop.updateRows();
 * This is a special command. This will check each row in the party. If a row
 * is empty and/or doesn't have any alive members, all the remaining members
 * behind that row will move forward one row until all the empty rows are gone.
 *
 * ============================================================================
 * Main Menu Manager - Positioning the Row Command
 * ============================================================================
 *
 * For those using the Main Menu Manager and would like to position the Row
 * command in a place you'd like, use the following format:
 *
 *       Name: Yanfly.Param.RowCmdName
 *     Symbol: row
 *       Show: $gameSystem.isShowRowMenu()
 *    Enabled: $gameSystem.isEnabledRowMenu()
 *        Ext: 
 *  Main Bind: this.commandRow.bind(this)
 * Actor Bind:
 *
 * Insert the above setup within a Main Menu Manager slot. Provided you copy
 * the exact settings to where you need it, it will appear there while using
 * all of the naming, enabling, disabling, hiding, and showing effects done by
 * the plugin parameters.
 *
 * Remember to turn off 'Auto Add Menu' from the plugin parameters.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are some plugin commands you can use to adjust rows mid-game.
 *
 * Plugin Command:
 *
 *   ShowMenuRow
 *   HideMenuRow
 *   This will either show or hide the Row command from the main menu.
 *
 *   EnableMenuRow
 *   DisableMenuRow
 *   This will either enable or disable the Row command from the main menu.
 *
 *   ShowBattleRow
 *   HideBattleRow
 *   This will either show or hide the Row command from the battle party menu.
 *   This requires the YEP_BattleEngineCore plugin to take effect.
 *
 *   EnableBattleRow
 *   DisableBattleRow
 *   This will either enable or disable the Row command from the battle party
 *   menu. This requires the YEP_BattleEngineCore plugin to take effect.
 *
 *   SetActorRow actorId x
 *   This will set the actor represented by actorId to move to row x. If you
 *   want to move actor 3 to the 2nd row, the plugin command would look like:
 *   SetActorRow 3 2
 *
 *   SetPartyRow slotId x
 *   This will set the party member in slotId to move to row x. If you want to
 *   move the 3rd party member to the 2nd row, the plugin command would look
 *   like: SetPartyRow 3 2
 *
 *   SetEnemyRow slotId x
 *   This will set the enemy member in slotId to move to row x. If you want to
 *   move the 3rd enemy member to the 2nd row, the plugin command would look
 *   like: SetEnemyRow 3 2
 *   * Note: If you use this plugin command during turn 0 and the parameter
 *   'Adjust Relative' is set to false, the enemies will not move and
 *   automatically assume the position they are in will be the row they'll be
 *   in. On the other hand, using this plugin on anything after turn 0 will
 *   move the enemy visually to a different position on the screen. If the
 *   parameter 'Adjust Relative' is true, the enemies will move.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.10:
 * - Updated <Default Row: x> notetag to also include <Default Row: x, x, x> so
 * that actors or enemies can start in any of those default rows. If multiple
 * rows are included, then at the start of the game (for actors) or start of
 * battle (for enemies), the battler will start in a random row included.
 *
 * Version 1.09b:
 * - Updated Lunatic Mode to have an innate 'user' variable.
 * - Added 'Auto Add Menu' to plugin parameters. This way, users don't have to
 * make conflict with it if manually positioning the command with the Main Menu
 * Manager plugin.
 * - Documentation update for 'SetEnemyRow slotId x' plugin command.
 *
 * Version 1.08:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.07b:
 * - Fixed a bug that prevented the Row command in-battle from updating.
 * - Optimization update.
 * - Disabled Row States from being applied outside of battle.
 *
 * Version 1.06a:
 * - Fixed a bug where Lunatic Mode effects weren't working properly.
 * - Added a 'Use Map Sprite' plugin parameter for those using battlers that
 * are too big for the Row changing menu.
 * - Added new section to Help File on how to place Row Formation into the
 * Main Menu Manager.
 *
 * Version 1.05:
 * - Fixed a bug with user row changing notetags not working properly.
 *
 * Version 1.04:
 * - Fixed a bug with the SetPartyRow slotId x plugin command.
 * - Added 'Adjust Relative' plugin parameter for enemy rows.
 * If this value is set to false, their positions in the Troops tab is where
 * their designated row is. Meaning if you have a Wisp in Row 3, its current
 * location in the Troops tab is where it would be if it be if it was in Row 3.
 * If this value is set to true, their positions in the Troops tab is where
 * their row 1 is. Meaning if you have a Wisp in Row 3, upon starting battle,
 * it will be pushed back in positioning relative to its Troops tab position,
 * which is row 1.
 *
 * Version 1.03a:
 * - More positioning fixes. Enemies no longer shift when entering and exiting
 * the in-battle menu.
 *
 * Version 1.02:
 * - Made a change where enemies of different default rows don't automatically
 * move positions at the start of battle.
 * - Fixed an incompatibility issue for those using larger screen resolutions
 * and battle repositioning.
 *
 * Version 1.01:
 * - Fixed a bug that caused music to not replay properly when accessing the
 * Row change menu from battle.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_RowFormation');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.RowMaximum = Number(Yanfly.Parameters['Maximum Rows']);
Yanfly.Param.RowMaximum = Yanfly.Param.RowMaximum.clamp(1, 10);
Yanfly.Param.RowCmdName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.RowAutoAdd = eval(String(Yanfly.Parameters['Auto Add Menu']));
Yanfly.Param.RowShowMenu = eval(String(Yanfly.Parameters['Show Menu Command']));
Yanfly.Param.RowEnMenu = eval(String(Yanfly.Parameters['Enable Menu Command']));
Yanfly.Param.RowShowBat = String(Yanfly.Parameters['Show Battle Command']);
Yanfly.Param.RowShowBat = eval(Yanfly.Param.RowShowBat);
Yanfly.Param.RowEnBat = String(Yanfly.Parameters['Enable Battle Command']);
Yanfly.Param.RowEnBat = eval(Yanfly.Param.RowEnBat);
Yanfly.Param.RowCooldown = Number(Yanfly.Parameters['Battle Cooldown']);

Yanfly.Param.RowDefault = Number(Yanfly.Parameters['Default Row']);
Yanfly.Param.RowDefault = Yanfly.Param.RowDefault.clamp(1, 10);
Yanfly.Param.RowEnemyLock = eval(String(Yanfly.Parameters['Enemy Row Lock']));

Yanfly.Param.RowMapSprite = eval(String(Yanfly.Parameters['Use Map Sprite']));
Yanfly.Param.RowFrontBufferY = String(Yanfly.Parameters['Front Buffer Y']);
Yanfly.Param.RowSideBufferY = String(Yanfly.Parameters['Side Buffer Y']);

Yanfly.Param.RowMaxRowX = String(Yanfly.Parameters['Maximum Row X']);
Yanfly.Param.RowMaxRowY = String(Yanfly.Parameters['Maximum Row Y']);
Yanfly.Param.RowMinRowY = String(Yanfly.Parameters['Minimum Row Y']);
Yanfly.Param.RowCenterY = String(Yanfly.Parameters['Center Row Y']);

Yanfly.Row.Name = {};
Yanfly.Row.Help = {};
Yanfly.Row.States = {};
Yanfly.Row.HomeX = {};
Yanfly.Row.HomeY = {};
for (Yanfly.i = 1; Yanfly.i < 11; ++Yanfly.i) {
  Yanfly.text = 'Row ' + Yanfly.i + ' Name';
  Yanfly.Row.Name[Yanfly.i] = String(Yanfly.Parameters[Yanfly.text]);
  Yanfly.text = 'Row ' + Yanfly.i + ' Help Line 1';
  Yanfly.Row.Help[Yanfly.i] = String(Yanfly.Parameters[Yanfly.text]) + '\n';
  Yanfly.text = 'Row ' + Yanfly.i + ' Help Line 2';
  Yanfly.Row.Help[Yanfly.i] += String(Yanfly.Parameters[Yanfly.text]);
  Yanfly.text = 'Row ' + Yanfly.i + ' States';
  Yanfly.array = String(Yanfly.Parameters[Yanfly.text]).split(' ');
  Yanfly.Row.States[Yanfly.i] = [];
  for (Yanfly.j = 0; Yanfly.j < Yanfly.array.length; ++Yanfly.j) {
    Yanfly.Row.States[Yanfly.i].push(parseInt(Yanfly.array[Yanfly.j]));
  }
  Yanfly.text = 'Row ' + Yanfly.i + ' Home X';
  Yanfly.Row.HomeX[Yanfly.i] = String(Yanfly.Parameters[Yanfly.text]);
  Yanfly.text = 'Row ' + Yanfly.i + ' Home Y';
  Yanfly.Row.HomeY[Yanfly.i] = String(Yanfly.Parameters[Yanfly.text]);
};

Yanfly.Param.RowEnemyAdj = eval(String(Yanfly.Parameters['Adjust Relative']));
Yanfly.Param.RowEnemyX = String(Yanfly.Parameters['Enemy Row X']);
Yanfly.Param.RowEnemyY = String(Yanfly.Parameters['Enemy Row Y']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Row.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Row.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_RowFormation) {
    this.processRowNotetags1($dataActors);
    this.processRowNotetags1($dataEnemies);
    this.processRowNotetags2($dataSkills);
    this.processRowNotetags2($dataItems);
    this.processRowNotetags3($dataActors);
    this.processRowNotetags3($dataClasses);
    this.processRowNotetags3($dataEnemies);
    this.processRowNotetags3($dataWeapons);
    this.processRowNotetags3($dataArmors);
    this.processRowNotetags3($dataStates);
    this.processRowNotetags4($dataStates);
    Yanfly._loaded_YEP_RowFormation = true;
  }
  return true;
};

DataManager.processRowNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.defaultRow = [Yanfly.Param.RowDefault];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:DEFAULT ROW):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        obj.defaultRow = [];
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.defaultRow = obj.defaultRow.concat(array);
      }
    }
  }
};

DataManager.processRowNotetags2 = function(group) {
  var noteR1 = /<(?:ROW ONLY):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var noteR2 = /<(?:ROW ONLY):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.rowOnly = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    obj.changeTargetRow = 0;
    obj.alterTargetRow = 0;
    obj.targetRowEval = '';
    obj.changeUserRow = 0;
    obj.alterUserRow = 0;
    obj.userRowEval = '';
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteR1)) {
        obj.rowOnly = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      } else if (line.match(noteR2)) {
        obj.rowOnly = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
      } else if (line.match(/<(?:CHANGE TARGET ROW):[ ](\d+)>/i)) {
        obj.changeTargetRow = parseInt(RegExp.$1);
      } else if (line.match(/<(?:PUSH BACK TARGET ROW):[ ](\d+)>/i)) {
        obj.alterTargetRow = parseInt(RegExp.$1);
      } else if (line.match(/<(?:PULL FORWARD TARGET ROW):[ ](\d+)>/i)) {
        obj.alterTargetRow = parseInt(RegExp.$1) * -1;
      } else if (line.match(/<(?:CUSTOM TARGET ROW)>/i)) {
        evalMode = 'customTargetRow';
      } else if (line.match(/<\/(?:CUSTOM TARGET ROW)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'customTargetRow') {
        obj.targetRowEval = obj.targetRowEval + line + '\n';
      } else if (line.match(/<(?:CHANGE USER ROW):[ ](\d+)>/i)) {
        obj.changeUserRow = parseInt(RegExp.$1);
      } else if (line.match(/<(?:PUSH BACK USER ROW):[ ](\d+)>/i)) {
        obj.alterUserRow = parseInt(RegExp.$1);
      } else if (line.match(/<(?:PULL FORWARD USER ROW):[ ](\d+)>/i)) {
        obj.alterUserRow = parseInt(RegExp.$1) * -1;
      } else if (line.match(/<(?:CUSTOM USER ROW)>/i)) {
        evalMode = 'customUserRow';
      } else if (line.match(/<\/(?:CUSTOM USER ROW)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'customUserRow') {
        obj.userRowEval = obj.userRowEval + line + '\n';
      }
    }
  }
};

DataManager.processRowNotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.rowLock = group === $dataEnemies ? Yanfly.Param.RowEnemyLock : false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:ROW LOCK|LOCK ROW)>/i)) {
        obj.rowLock = true;
      } else if (line.match(/<(?:NOT ROW LOCK|NOT LOCK ROW)>/i)) {
        obj.rowLock = false;
      }
    }
  }
};

DataManager.processRowNotetags4 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.rowConditionEval = '';
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:CUSTOM ROW CONDITION)>/i)) {
        var evalMode = 'customRowCondition';
      } else if (line.match(/<\/(?:CUSTOM ROW CONDITION)>/i)) {
        var evalMode = 'none';
      } else if (evalMode === 'customRowCondition') {
        obj.rowConditionEval = obj.rowConditionEval + line + '\n';
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Row.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Yanfly.Row.BattleManager_initMembers.call(this);
    this.clearRefreshRows();
};

BattleManager.clearRefreshRows = function() {
    this._refreshRows = false;
};

BattleManager.requestRefreshRows = function() {
    if (!$gameSystem.isSideView()) return;
    this._refreshRows = true;
};

BattleManager.isRowRefreshRequested = function() {
    return this._refreshRows;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Row.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.Row.Game_System_initialize.call(this);
    this.initRowSettings();
};

Game_System.prototype.initRowSettings = function() {
    this._showRowMenu = Yanfly.Param.RowShowMenu;
    this._enableRowMenu = Yanfly.Param.RowEnMenu;
    this._showRowBattle = Yanfly.Param.RowShowBat;
    this._enableRowBattle = Yanfly.Param.RowEnBat;
};

Game_System.prototype.isShowRowMenu = function() {
    if (this._showRowMenu === undefined) this.initRowSettings();
    return this._showRowMenu;
};

Game_System.prototype.setShowRowMenu = function(value) {
    if (this._showRowMenu === undefined) this.initRowSettings();
    this._showRowMenu = value;
};

Game_System.prototype.isEnabledRowMenu = function() {
    if (this._enableRowMenu === undefined) this.initRowSettings();
    return this._enableRowMenu;
};

Game_System.prototype.setEnabledRowMenu = function(value) {
    if (this._enableRowMenu === undefined) this.initRowSettings();
    this._enableRowMenu = value;
};

Game_System.prototype.isShowRowBattle = function() {
    if (this._showRowBattle === undefined) this.initRowSettings();
    return this._showRowBattle;
};

Game_System.prototype.setShowRowBattle = function(value) {
    if (this._showRowBattle === undefined) this.initRowSettings();
    this._showRowBattle = value;
};

Game_System.prototype.isEnabledRowBattle = function() {
    if (this._enableRowBattle === undefined) this.initRowSettings();
    if (this._battleRowCooldown === undefined) {
      this.resetBattleRowCooldown();
    }
    if (this._battleRowCooldown > 0) return false;
    return this._enableRowBattle;
};

Game_System.prototype.setEnabledRowBattle = function(value) {
    if (this._enableRowBattle === undefined) this.initRowSettings();
    this._enableRowBattle = value;
};

Game_System.prototype.resetBattleRowCooldown = function() {
    this._battleRowCooldown = 0;
};

Game_System.prototype.updateBattleRowCooldown = function() {
    if (this._battleRowCooldown === undefined) {
      this.resetBattleRowCooldown();
    }
    this._battleRowCooldown--;
};

Game_System.prototype.setBattleRowCooldown = function() {
    this._battleRowCooldown = Yanfly.Param.RowCooldown;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.Row.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    this._isRowLocked = undefined;
    this._requestRowStatesRefresh = true;
    Yanfly.Row.Game_BattlerBase_refresh.call(this);
};

Yanfly.Row.Game_BattlerBase_states = Game_BattlerBase.prototype.states;
Game_BattlerBase.prototype.states = function() {
    var array = Yanfly.Row.Game_BattlerBase_states.call(this);
    if ($gameParty.inBattle()) {
      this.addRowStates(array);
      this.sortRowStates(array);
    }
    return array;
};

Yanfly.Row.Game_BattlerBase_isStateAffected =
    Game_BattlerBase.prototype.isStateAffected;
Game_BattlerBase.prototype.isStateAffected = function(stateId) {
    if (this.isRowStateAffected(stateId)) return true;
    return Yanfly.Row.Game_BattlerBase_isStateAffected.call(this, stateId);
};

Game_BattlerBase.prototype.addRowStates = function(array) {
    var length = this.rowStatesRaw().length;
    for (var i = 0; i < length; ++i) {
      var stateId = this.rowStatesRaw()[i];
      var state = $dataStates[stateId];
      if (state) array.push(state);
    }
};

Game_BattlerBase.prototype.rowStates = function() {
    var array = [];
    for (var i = 0; i < this.rowStatesRaw().length; ++i) {
      var state = $dataStates[this.rowStatesRaw()[i]];
      if (state && array.contains(state)) continue;
      array.push(state);
    }
    return array;
};

Game_BattlerBase.prototype.rowStatesRaw = function() {
    if (this._rowStatesRaw !== undefined) return this._rowStatesRaw;
    var array = this.getRowStateData();
    this._rowStatesRaw = array.filter(Yanfly.Util.onlyUnique)
    return this._rowStatesRaw;
};

Game_BattlerBase.prototype.getRowStateData = function() {
    var source = Yanfly.Row.States[this.row()].slice();
    var array = [];
    for (var i = 0; i < source.length; ++i) {
      var stateId = source[i];
      if (!this.meetRowStateCondition(stateId)) continue;
      array.push(stateId);
    }
    return array;
};

Game_BattlerBase.prototype.meetRowStateCondition = function(stateId) {
    if (!$gameParty.inBattle()) return false;
    if (this._checkingRowStateCondition) return false;
    var state = $dataStates[stateId];
    if (!state) return false;
    if (state.rowConditionEval === '') return true;
    return this.rowStateConditionEval(state);
};

Game_BattlerBase.prototype.rowStateConditionEval = function(state) {
    this._checkingRowStateCondition = state.id;
    var condition = true;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(state.rowConditionEval);
    this._checkingRowStateCondition = 0;
    return condition;
};

Game_BattlerBase.prototype.sortRowStates = function(array) {
    array.sort(function(a, b) {
      var p1 = a.priority;
      var p2 = b.priority;
      if (p1 !== p2) return p2 - p1;
      return a - b;
    });
};

Game_BattlerBase.prototype.isRowStateAffected = function(stateId) {
    if (!$gameParty.inBattle()) return false;
    return this.rowStatesRaw().contains(stateId);
};

Yanfly.Row.Game_BattlerBase_meetsSkillConditions =
    Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    if (!skill.rowOnly.contains(this.row())) return false;
    return Yanfly.Row.Game_BattlerBase_meetsSkillConditions.call(this, skill);
};

Yanfly.Row.Game_BattlerBase_meetsItemConditions =
    Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    if (!item.rowOnly.contains(this.row())) return false;
    return Yanfly.Row.Game_BattlerBase_meetsItemConditions.call(this, item);
};

Game_BattlerBase.prototype.isRowStateRefreshRequested = function() {
    return this._requestRowStatesRefresh;
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.initRowFormation = function() {
    if (this.isActor()) {
      var rows = this.actor().defaultRow;
    } else if (this.isEnemy()) {
      var rows = this.enemy().defaultRow;
    }
    this._row = rows[Math.floor(Math.random() * rows.length)];;
    this._row = this._row.clamp(1, Yanfly.Param.RowMaximum);
    this._rowStatesRaw = undefined;
};

Game_Battler.prototype.row = function() {
    if (this._row === undefined) this.initRowFormation();
    return this._row;
};

Game_Battler.prototype.rowIndex = function() {
    var group = (this.isActor()) ? $gameParty : $gameTroop;
    var index = group.rowMembers(this.row()).indexOf(this);
    return index;
};

Yanfly.Row.Game_Battler_isStateAddable = Game_Battler.prototype.isStateAddable;
Game_Battler.prototype.isStateAddable = function(stateId) {
    if (this.isRowStateAffected(stateId)) return false;
    return Yanfly.Row.Game_Battler_isStateAddable.call(this, stateId);
};

Yanfly.Row.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    if (this.isRowStateAffected(stateId)) return;
    Yanfly.Row.Game_Battler_removeState.call(this, stateId);
};

Game_Battler.prototype.isRowLocked = function() {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var state = this.states()[i];
      if (state && state.rowLock) {
        this._isRowLocked = true;
        return this._isRowLocked;
      }
    }
    return false;
};

Game_Battler.prototype.setRow = function(rowId) {
    if (this._row === undefined) this.initRowFormation();
    if (this.isRowLocked()) return;
    var currentRow = this._row;
    this._row = rowId.clamp(1, Yanfly.Param.RowMaximum);
    var changed = currentRow !== this._row;
    if (changed) this.friendsUnit().clearBattleRowCache();
    if ($gameParty.inBattle() && changed) BattleManager.requestRefreshRows();
};

Game_Battler.prototype.alterRow = function(value) {
    if (this._row === undefined) this.initRowFormation();
    if (this.isRowLocked()) return;
    var currentRow = this._row;
    this._row += value;
    this._row = this._row.clamp(1, Yanfly.Param.RowMaximum);
    var changed = currentRow !== this._row;
    if (changed) this.friendsUnit().clearBattleRowCache();
    if ($gameParty.inBattle() && changed) BattleManager.requestRefreshRows();
};

Game_Battler.prototype.targetRowEval = function(code, user, item) {
    var visible = true;
    var skill = item;
    var a = user;
    var subject = user;
    var b = this;
    var target = this;
    var row = this._row;
    var currentRow = this._row;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(code);
    if (currentRow !== row) this.setRow(row);
    var changed = currentRow !== this._row;
    if ($gameParty.inBattle() && changed) BattleManager.requestRefreshRows();
};

Game_Battler.prototype.userRowEval = function(code, target, item) {
    var visible = true;
    var skill = item;
    var a = this;
    var user = this;
    var subject = this;
    var b = target;
    var target = target;
    var row = this._row;
    var currentRow = this._row;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(code);
    if (currentRow !== row) this.setRow(row);
    var changed = currentRow !== this._row;
    if ($gameParty.inBattle() && changed) BattleManager.requestRefreshRows();
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Row.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.Row.Game_Actor_setup.call(this, actorId);
    this.initRowFormation();
};

Game_Actor.prototype.isRowLocked = function() {
    if (this._isRowLocked !== undefined) return this._isRowLocked;
    if (this.actor().rowLock) {
      this._isRowLocked = true;
      return this._isRowLocked;
    }
    if (this.currentClass().rowLock) {
      this._isRowLocked = true;
      return this._isRowLocked;
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.rowLock) {
        this._isRowLocked = true;
        return this._isRowLocked;
      }
    }
    if (Game_Battler.prototype.isRowLocked.call(this)) {
      this._isRowLocked = true;
      return this._isRowLocked;
    }
    this._isRowLocked = false;
    return this._isRowLocked;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Yanfly.Row.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Yanfly.Row.Game_Enemy_setup.call(this, enemyId, x, y);
    this.initRowFormation();
};

Game_Enemy.prototype.isRowLocked = function() {
    if (this._isRowLocked !== undefined) return this._isRowLocked;
    if (this.enemy().rowLock) {
      this._isRowLocked = true;
      return this._isRowLocked;
    }
    if (Game_Battler.prototype.isRowLocked.call(this)) {
      this._isRowLocked = true;
      return this._isRowLocked;
    }
    this._isRowLocked = false;
    return this._isRowLocked;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Row.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    if ($gameTroop.turnCount() <= 0) target._allowRowReposition = true;
    Yanfly.Row.Game_Action_apply.call(this, target);
    if ($gameParty.inBattle() && this.item()) {
      this.applyUserItemRowEffect(target);
    }
};

Yanfly.Row.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.Row.Game_Action_applyItemUserEffect.call(this, target);
    if (!$gameParty.inBattle()) return;
    if (!this.item()) return;
    this.applyItemRowEffect(target);
};

Game_Action.prototype.applyItemRowEffect = function(target) {
    if (!target) return;
    var item = this.item();
    if (item.changeTargetRow > 0) target.setRow(item.changeTargetRow);
    if (item.alterTargetRow !== 0) target.alterRow(item.alterTargetRow);
    if (item.targetRowEval !== '') target.targetRowEval(item.targetRowEval, 
      this.subject(), item);
};

Game_Action.prototype.applyUserItemRowEffect = function(target) {
    var item = this.item();
    var user = this.subject();
    if (!user) return;
    if (item.changeUserRow > 0) user.setRow(item.changeUserRow);
    if (item.alterUserRow !== 0) user.alterRow(item.alterUserRow);
    if (item.userRowEval !== '') user.userRowEval(item.userRowEval, 
      target, item);
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.rowSize = function(rowId) {
    return this.rowMembers(rowId).length;
};

Game_Unit.prototype.rowAliveSize = function(rowId) {
    return this.rowAliveMembers(rowId).length;
};

Game_Unit.prototype.rowDeadSize = function(rowId) {
    return this.rowDeadMembers(rowId).length;
};

Game_Unit.prototype.rowMembers = function(rowId) {
    var group = [];
    var length = this.members().length;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member && member.row() === rowId) group.push(member);
    }
    return group;
};

Game_Unit.prototype.rowAliveMembers = function(rowId) {
    var group = [];
    var length = this.aliveMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = this.aliveMembers()[i];
      if (member && member.row() === rowId) group.push(member);
    }
    return group;
};

Game_Unit.prototype.rowDeadMembers = function(rowId) {
    var group = [];
    var length = this.deadMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = this.deadMembers()[i];
      if (member && member.row() === rowId) group.push(member);
    }
    return group;
};

Game_Unit.prototype.updateRows = function() {
    for (var i = 0; i < Yanfly.Param.RowMaximum; ++i) {
      var rowId = i + 1;
      if (this.rowAliveSize(rowId) <= 0) this.updateMemberRows(rowId);
    }
};

Game_Unit.prototype.updateMemberRows = function(rowId) {
    for (var i = 0; i < this.aliveMembers().length; ++i) {
      var member = this.aliveMembers()[i];
      if (!member) continue;
      if (member.row() < rowId) continue;
      member.alterRow(-1);
    }
};

Game_Unit.prototype.isRowStateRefreshRequested = function() {
    var length = this.members();
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member && member.isRowStateRefreshRequested())  return true;
    }
    return false;
};

Game_Unit.prototype.clearBattleRowCache = function() {
    var length = this.members().length;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member) {
        member._rowStatesRaw = undefined;
        member._requestRowStatesRefresh = false;
      }
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.rowMembers = function(rowId) {
    var group = [];
    var length = this.battleMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member && member.row() === rowId) group.push(member);
    }
    return group;
};

Game_Party.prototype.loadActorImages = function() {
    for (var i = 0; i < this.members().length; ++i) {
      var actor = this.members()[i];
      if (!actor) continue;
      ImageManager.loadFace(actor.faceName());
      ImageManager.loadCharacter(actor.characterName());
    }
};

//=============================================================================
// Game_Troop
//=============================================================================

Yanfly.Row.Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
Game_Troop.prototype.increaseTurn = function() {
    Yanfly.Row.Game_Troop_increaseTurn.call(this);
    $gameSystem.updateBattleRowCooldown();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Row.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Row.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowMenuRow') $gameSystem.setShowRowMenu(true);
  if (command === 'HideMenuRow') $gameSystem.setShowRowMenu(false);
  if (command === 'EnableMenuRow') $gameSystem.setEnabledRowMenu(true);
  if (command === 'DisableMenuRow') $gameSystem.setEnabledRowMenu(false);
  if (command === 'ShowBattleRow') $gameSystem.setShowRowBattle(true);
  if (command === 'HideBattleRow') $gameSystem.setShowRowBattle(false);
  if (command === 'EnableBattleRow') $gameSystem.setEnabledRowBattle(true);
  if (command === 'DisableBattleRow') $gameSystem.setEnabledRowBattle(false);
  if (command === 'SetActorRow') this.setActorRow(args);
  if (command === 'SetPartyRow') this.setPartyRow(args);
  if (command === 'SetEnemyRow') this.setEnemyRow(args);
};

Game_Interpreter.prototype.setActorRow = function(args) {
    if (!args) return;
    var actorId = parseInt(args[0]);
    var rowId = parseInt(args[1]);
    $gameActors.actor(actorId).setRow(rowId);
};

Game_Interpreter.prototype.setPartyRow = function(args) {
    if (!args) return;
    var index = parseInt(args[0]) - 1;
    var rowId = parseInt(args[1]);
    $gameParty.members()[index].setRow(rowId);
};

Game_Interpreter.prototype.setEnemyRow = function(args) {
    if (!args) return;
    var index = parseInt(args[0]) - 1;
    var rowId = parseInt(args[1]);
    $gameTroop.members()[index].setRow(rowId);
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.Row.Sprite_Battler_setHome = Sprite_Battler.prototype.setHome;
Sprite_Battler.prototype.setHome = function(x, y) {
    if (this._enemy) return this.setEnemyHome(this._enemy.index());
    Yanfly.Row.Sprite_Battler_setHome.call(this, x, y);
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Yanfly.Row.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    if (!$gameSystem.isSideView()) {
      return Yanfly.Row.Sprite_Actor_setActorHome.call(this);
    }
    this.alterActorHome(index);
    this.setHome(this._homeX, this._homeY);
    this.moveToStartPosition();
};

Sprite_Actor.prototype.alterActorHome = function(index) {
    var screenWidth = Graphics.boxWidth;
    var screenHeight = Graphics.boxHeight;
    var maxSize = $gameParty.maxBattleMembers();
    var maxRows = Yanfly.Param.RowMaximum;
    var partySize = $gameParty.battleMembers().length;
    var rowId = this._actor.row();
    var rowSize = $gameParty.rowSize(rowId);
    var rowMembers = $gameParty.rowMembers(rowId);
    var rowIndex = this._actor.rowIndex();
    if (Imported.YEP_BattleEngineCore) {
      var statusHeight = eval(Yanfly.Param.BECCommandRows);
    } else {
      var statusHeight = 4;
    }
    statusHeight *= Window_Base.prototype.lineHeight.call(this);
    statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
    var maxRowX = eval(Yanfly.Param.RowMaxRowX);
    var maxRowY = eval(Yanfly.Param.RowMaxRowY);
    var minRowY = eval(Yanfly.Param.RowMinRowY);
    var centerY = eval(Yanfly.Param.RowCenterY);
    var homeX = eval(Yanfly.Row.HomeX[rowId]);
    var homeY = eval(Yanfly.Row.HomeY[rowId]);
    this._homeX = homeX;
    this._homeY = homeY;
};

Sprite_Actor.prototype.refreshActorRow = function() {
    if (!this._actor) return;
    var index = this._actor.index();
    var x = this.x;
    var y = this.y;
    this.alterActorHome(index);
    this._offsetX = x - this._homeX;
    this._offsetY = y - this._homeY;
    this._targetOffsetX = this._targetOffsetX || 0;
    this._targetOffsetY = this._targetOffsetY || 0;
    if (this.isNotChangeRowPosition()) this._movementDuration = 12;
};

Sprite_Actor.prototype.isNotChangeRowPosition = function() {
    if (this._actor === BattleManager._subject) return false;
    if (this._actor.isDead()) return false;
    if (this._actor._allowRowReposition) {
      this._actor._allowRowReposition = undefined;
      return false;
    }
    return true;
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

Sprite_Enemy.prototype.refreshEnemyRow = function() {
    if (!this._enemy) return;
    var index = this._enemy.index();
    if (this.isNotChangeRowPosition()) return this.setRowHomePosition();
    var x = this.x;
    var y = this.y;
    this.alterEnemyHome(index);
    this._offsetX = x - this._homeX;
    this._offsetY = y - this._homeY;
    this._targetOffsetX = this._targetOffsetX || 0;
    this._targetOffsetY = this._targetOffsetY || 0;
    if (this._enemy !== BattleManager._subject) this._movementDuration = 12;
};

Sprite_Enemy.prototype.isNotChangeRowPosition = function() {
    if (Yanfly.Param.RowEnemyAdj) return false;
    if (this._enemy._allowRowReposition) {
      this._enemy._allowRowReposition = undefined;
      return false;
    }
    if ($gameTroop.turnCount() <= 0) return true;
    if (this._enemy.isDead()) return true;
    return false;
};

Sprite_Enemy.prototype.setRowHomePosition = function() {
    if (BattleManager._bypassMoveToStartLocation) return;
    var screenWidth = Graphics.boxWidth;
    var screenHeight = Graphics.boxHeight;
    var maxSize = $gameTroop.members().length;
    var maxRows = Yanfly.Param.RowMaximum;
    var partySize = $gameTroop.members().length;
    var rowId = this._enemy.row();
    var rowSize = $gameTroop.rowSize(rowId);
    var rowMembers = $gameTroop.rowMembers(rowId);
    var rowIndex = this._enemy.rowIndex();
    if (Imported.YEP_BattleEngineCore) {
      var statusHeight = eval(Yanfly.Param.BECCommandRows);
    } else {
      var statusHeight = 4;
    }
    statusHeight *= Window_Base.prototype.lineHeight.call(this);
    statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
    var maxRowX = eval(Yanfly.Param.RowMaxRowX);
    var maxRowY = eval(Yanfly.Param.RowMaxRowY);
    var minRowY = eval(Yanfly.Param.RowMinRowY);
    var centerY = eval(Yanfly.Param.RowCenterY);
    var screenX = this._enemy.screenX();
    var screenY = this._enemy.screenY();
    var homeX = eval(Yanfly.Param.RowEnemyX);
    var homeY = eval(Yanfly.Param.RowEnemyY);
    this._enemy._screenX += this._homeX - homeX;
    this._enemy._screenY += this._homeY - homeY;
};

Sprite_Enemy.prototype.setEnemyHome = function(index) {
    if (this.isNotChangeRowPosition()) {
      this._homeX = this._enemy.screenX();
      this._homeY = this._enemy.screenY();
      if (!BattleManager._bypassMoveToStartLocation) {
        return this.setRowHomePosition();
      }
    }
    this.alterEnemyHome(index);
    Yanfly.Row.Sprite_Battler_setHome.call(this, this._homeX, this._homeY);
};

Sprite_Enemy.prototype.alterEnemyHome = function(index) {
    var screenWidth = Graphics.boxWidth;
    var screenHeight = Graphics.boxHeight;
    var maxSize = $gameTroop.members().length;
    var maxRows = Yanfly.Param.RowMaximum;
    var partySize = $gameTroop.members().length;
    var rowId = this._enemy.row();
    var rowSize = $gameTroop.rowSize(rowId);
    var rowMembers = $gameTroop.rowMembers(rowId);
    var rowIndex = this._enemy.rowIndex();
    if (Imported.YEP_BattleEngineCore) {
      var statusHeight = eval(Yanfly.Param.BECCommandRows);
    } else {
      var statusHeight = 4;
    }
    statusHeight *= Window_Base.prototype.lineHeight.call(this);
    statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
    var maxRowX = eval(Yanfly.Param.RowMaxRowX);
    var maxRowY = eval(Yanfly.Param.RowMaxRowY);
    var minRowY = eval(Yanfly.Param.RowMinRowY);
    var centerY = eval(Yanfly.Param.RowCenterY);
    var screenX = this._enemy.screenX();
    var screenY = this._enemy.screenY();
    var homeX = eval(Yanfly.Param.RowEnemyX);
    var homeY = eval(Yanfly.Param.RowEnemyY);
    this._homeX = homeX;
    this._homeY = homeY;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Yanfly.Row.Spriteset_Battle_createLowerLayer =
    Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    Yanfly.Row.Spriteset_Battle_createLowerLayer.call(this);
    //this.refreshRowPositions();
};

Spriteset_Battle.prototype.refreshRowPositions = function() {
    var length = this._actorSprites.length;
    for (var i = 0; i < length; ++i) {
      var sprite = this._actorSprites[i];
      if (!sprite) continue;
      sprite.refreshActorRow();
    }
    var length = this._enemySprites.length;
    for (var i = 0; i < length; ++i) {
      var sprite = this._enemySprites[i];
      if (!sprite) continue;
      sprite.refreshEnemyRow();
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawSvActor = function(actor, x, y) {
    var filename = actor.battlerName();
    var bitmap = ImageManager.loadSvActor(filename);
    var pw = bitmap.width / 9;
    var ph = bitmap.height / 6;
    var sx = 0;
    var sy = 0;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

//=============================================================================
// Window_ItemList
//=============================================================================

Yanfly.Row.Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
Window_ItemList.prototype.isEnabled = function(item) {
    if ($gameParty.inBattle()) return this.isRowEnabled(item);
    return Yanfly.Row.Window_ItemList_isEnabled.call(this, item);
};

Window_ItemList.prototype.isRowEnabled = function(item) {
    var actor = BattleManager.actor();
    if (!actor) return Yanfly.Row.Window_ItemList_isEnabled.call(this, item);
    return actor.canUse(item);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Yanfly.Row.Window_MenuCommand_addFormationCommand =
    Window_MenuCommand.prototype.addFormationCommand;
Window_MenuCommand.prototype.addFormationCommand = function() {
    Yanfly.Row.Window_MenuCommand_addFormationCommand.call(this);
    if (Yanfly.Param.RowAutoAdd) this.addRowCommand();
};

Window_MenuCommand.prototype.addRowCommand = function() {
    if (!$gameSystem.isShowRowMenu()) return;
    if (this.findSymbol('row') > -1) return;
    var text = Yanfly.Param.RowCmdName;
    var enabled = $gameSystem.isEnabledRowMenu();
    this.addCommand(text, 'row', enabled);
};

//=============================================================================
// Window_RowFormation
//=============================================================================

function Window_RowFormation() {
    this.initialize.apply(this, arguments);
}

Window_RowFormation.prototype = Object.create(Window_Selectable.prototype);
Window_RowFormation.prototype.constructor = Window_RowFormation;

Window_RowFormation.prototype.initialize = function(wy) {
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - wy;
    Window_Selectable.prototype.initialize.call(this, 0, wy, ww, wh);
    this.loadImages();
    this.refresh();
    this.select(0);
    this.activate();
};

Window_RowFormation.prototype.maxItems = function() {
    return $gameParty.size();
};

Window_RowFormation.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    clientHeight = Math.floor(clientHeight / this.numVisibleRows())
    clientHeight = Math.max(clientHeight, this.lineHeight() * 2);
    return clientHeight;
};

Window_RowFormation.prototype.numVisibleRows = function() {
    return $gameParty.maxBattleMembers();
};

Window_RowFormation.prototype.loadImages = function() {
    $gameParty.members().forEach(function(actor) {
      this.getImage(actor);
    }, this);
};

Window_RowFormation.prototype.getActor = function(index) {
    return $gameParty.members()[index];
};

Window_RowFormation.prototype.getImage = function(actor) {
    if (Yanfly.Param.RowMapSprite) {
      var image = ImageManager.loadCharacter(actor.characterName());
    } else {
      var image = ImageManager.loadSvActor(actor.battlerName());
    }
    return image;
};

Window_RowFormation.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
      var index = topIndex + i;
      if (index < this.maxItems()) {
        this.drawItem(index);
        var rect = this.itemRect(index + 1);
        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
      }
    }
};

Window_RowFormation.prototype.drawItem = function(index) {
  var actor = this.getActor(index);
  if (!actor) return;
  var image = this.getImage(actor);
  if (image.width <= 0) return setTimeout(this.drawItem.bind(this, index), 5);
  this.drawRowItem(index);
};

Window_RowFormation.prototype.drawRowItem = function(index) {
    var actor = this.getActor(index);
    this.drawRowRects(index);
    this.drawActorRowPosition(actor, index);
    this.drawActorDetail(actor, index);
};

Window_RowFormation.prototype.drawRowRects = function(index) {
    for (var i = 0; i < Yanfly.Param.RowMaximum; ++i) {
      var rect = this.rowRect(index, i + 1)
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    }
};

Window_RowFormation.prototype.rowRect = function(index, rowId) {
    var actor = this.getActor(index);
    var rect = this.itemRect(index);
    rect.width = Math.floor(rect.width / Yanfly.Param.RowMaximum);
    rect.width = Math.min(rect.width, rect.height);
    var sx = (this.contents.width - rect.width * Yanfly.Param.RowMaximum) / 2
    rect.x = sx + (rowId - 1) * rect.width;
    return rect;
};

Window_RowFormation.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 2, dy + 2, dw - 4, dh - 4, color);
    this.changePaintOpacity(true);
};

Window_RowFormation.prototype.drawActorRowPosition = function(actor, index) {
    var img = this.getImage(actor);
    var rect = this.rowRect(index, actor.row());
    if (Yanfly.Param.RowMapSprite) {
      var buffer = eval(Yanfly.Param.RowFrontBufferY);
      var wx = Math.floor(rect.x + rect.width / 2);
      var wy = Math.floor(rect.y + rect.height - buffer);
      this.drawActorCharacter(actor, wx, wy);
    } else {
      var buffer = eval(Yanfly.Param.RowSideBufferY);
      var wx = Math.floor(rect.x + rect.width / 2);
      var wy = Math.floor(rect.y + rect.height - buffer);
      this.drawSvActor(actor, wx, wy)
    }
};

Window_RowFormation.prototype.drawActorDetail = function(actor, index) {
    var rect = this.itemRect(index);
    var wx = rect.x + this.textPadding();
    var ww = rect.width - this.textPadding() * 2;
    this.changeTextColor(this.normalColor());
    this.drawText(actor.name(), wx, rect.y, ww);
    var wy = rect.y + this.lineHeight();
    this.changeTextColor(this.systemColor());
    this.drawText(actor.currentClass().name, wx, wy, ww);
};

Window_RowFormation.prototype.updateCursor = function() {
    var index = this.index();
    var actor = this.getActor(index);
    var rowId = (actor) ? actor.row() : 1;
    var rect = this.rowRect(index, rowId);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};

Window_RowFormation.prototype.cursorRight = function(wrap) {
    var actor = this.getActor(this.index());
    if (!actor) return;
    if (actor.row() < Yanfly.Param.RowMaximum) {
      if (actor.isRowLocked()) return SoundManager.playBuzzer();
      SoundManager.playCursor();
      actor.alterRow(1);
      actor.refresh();
      this.refresh();
      this.updateHelp();
      this.updateCursor();
    }
};

Window_RowFormation.prototype.cursorLeft = function(wrap) {
    var actor = this.getActor(this.index());
    if (!actor) return;
    if (actor.row() > 1) {
      if (actor.isRowLocked()) return SoundManager.playBuzzer();
      SoundManager.playCursor();
      actor.alterRow(-1);
      actor.refresh();
      this.refresh();
      this.updateHelp();
      this.updateCursor();
    }
};

Window_RowFormation.prototype.updateHelp = function() {
    var actor = this.getActor(this.index());
    if (!actor) return this._helpWindow.clear();
    var rowId = actor.row();
    this._helpWindow.setText(Yanfly.Row.Help[rowId]);
};

Window_RowFormation.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);
    if (hitIndex >= 0 && this.isCursorMovable()) {
      this.updateTouchRectRow(hitIndex, x, y);
    } else {
      Window_Selectable.prototype.onTouch.call(this, triggered);
    }
};

Window_RowFormation.prototype.updateTouchRectRow = function(index, x, y) {
    for (var i = 1; i < Yanfly.Param.RowMaximum + 1; ++i) {
      var rect = this.rowRect(index, i);
      if (x >= rect.x && x <= rect.x + rect.width) {
        if (y >= rect.y && y <= rect.y + rect.height) {
          var actor = this.getActor(index);
          var currentIndex = this.index();
          this.select(index);
          var changedIndex = currentIndex !== this.index();
          var currentRow = actor._row;
          actor.setRow(i);
          actor.refresh();
          this.refresh();
          this.updateHelp();
          this.updateCursor();
          var changedRow = currentRow !== actor._row;
          if (changedIndex || changedRow) SoundManager.playCursor();
        }
      }
    }
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Row.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    Yanfly.Row.Scene_Battle_update.call(this);
    if (BattleManager.isRowRefreshRequested()) this.refreshRowPositions();
    if ($gameParty.isRowStateRefreshRequested()) {
      $gameParty.clearBattleRowCache();
    }
    if ($gameTroop.isRowStateRefreshRequested()) {
      $gameTroop.clearBattleRowCache();
    }
};

Scene_Battle.prototype.refreshRowPositions = function() {
    this._spriteset.refreshRowPositions();
    BattleManager.clearRefreshRows();
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.Row.Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    Yanfly.Row.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('row', this.commandRow.bind(this));
};

Scene_Menu.prototype.commandRow = function() {
    SceneManager.push(Scene_Row);
};

//=============================================================================
// Scene_Row
//=============================================================================

function Scene_Row() {
    this.initialize.apply(this, arguments);
}

Scene_Row.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Row.prototype.constructor = Scene_Row;

Scene_Row.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Row.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createRowFormationWindow();
};

Scene_Row.prototype.createRowFormationWindow = function() {
    var wy = this._helpWindow.height;
    this._rowFormationWindow = new Window_RowFormation(wy);
    this._rowFormationWindow.setHelpWindow(this._helpWindow);
    this._rowFormationWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._rowFormationWindow);
};

//=============================================================================
// Battle Engine Core Implementation
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Row.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    if (!$gameTemp._rowBattle) {
      Yanfly.Row.BattleManager_startBattle.call(this);
    }
    $gameTemp._rowBattle = false;
    this._bypassMoveToStartLocation = false;
    //this._spriteset.refreshRowPositions();
};

Yanfly.Row.BattleManager_playBattleBgm = BattleManager.playBattleBgm;
BattleManager.playBattleBgm = function() {
    var restartBgm = true;
    if (Yanfly.Row.SavedBattleBgm) {
      AudioManager.playBgm(Yanfly.Row.SavedBattleBgm);
      Yanfly.Row.SavedBattleBgm = undefined;
      restartBgm = false;
    }
    if (Yanfly.Row.SavedBattleBgs) {
      AudioManager.playBgs(Yanfly.Row.SavedBattleBgs);
      Yanfly.Row.SavedBattleBgs = undefined;
      restartBgm = false;
    }
    if (restartBgm) Yanfly.Row.BattleManager_playBattleBgm.call(this);
};

//=============================================================================
// Game_Unit
//=============================================================================

Yanfly.Row.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function() {
    if ($gameTemp._rowBattle) return;
    Yanfly.Row.Game_Unit_onBattleStart.call(this);
    $gameSystem.resetBattleRowCooldown();
};

Yanfly.Row.Game_Unit_onBattleEnd = Game_Unit.prototype.onBattleEnd;
Game_Unit.prototype.onBattleEnd = function() {
    if ($gameTemp._rowBattle) return;
    Yanfly.Row.Game_Unit_onBattleEnd.call(this);
    $gameSystem.resetBattleRowCooldown();
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

Yanfly.Row.Window_PartyCommand_makeCommandList =
    Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
    Yanfly.Row.Window_PartyCommand_makeCommandList.call(this);
    this.addRowCommand();
};

Window_PartyCommand.prototype.addRowCommand = function() {
    if (!$gameSystem.isShowRowBattle()) return;
    var index = this.findSymbol('escape');
    var enabled = $gameSystem.isEnabledRowBattle();
    this.addCommandAt(index, Yanfly.Param.RowCmdName, 'row', enabled);
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Yanfly.Row.Sprite_Actor_moveToStartPosition =
    Sprite_Actor.prototype.moveToStartPosition;
Sprite_Actor.prototype.moveToStartPosition = function() {
    if (BattleManager._bypassMoveToStartLocation) return;
    Yanfly.Row.Sprite_Actor_moveToStartPosition.call(this);
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Yanfly.Row.Spriteset_Battle_createBackground =
    Spriteset_Battle.prototype.createBackground;
Spriteset_Battle.prototype.createBackground = function() {
    Yanfly.Row.Spriteset_Battle_createBackground.call(this);
    if (Yanfly.Row.SavedBackgroundBitmap) {
      var spr = this._backgroundSprite;
      spr.bitmap = Yanfly.Row.SavedBackgroundBitmap;
      Yanfly.Row.SavedBackgroundBitmap = undefined;
    }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.Row.Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    Yanfly.Row.Scene_Map_create.call(this);
    $gameParty.loadActorImages();
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Row.Scene_Battle_createDisplayObjects =
    Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    Yanfly.Row.Scene_Battle_createDisplayObjects.call(this);
    $gameParty.loadActorImages();
};

Yanfly.Row.Scene_Battle_createPartyCommandWindow =
    Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    Yanfly.Row.Scene_Battle_createPartyCommandWindow.call(this);
    var win = this._partyCommandWindow;
    win.setHandler('row', this.partyCommandRow.bind(this));
};

Scene_Battle.prototype.partyCommandRow = function() {
    BattleManager._bypassMoveToStartLocation = true;
    $gameParty.loadActorImages();
    this.prepareBackground();
    BattleManager._savedActor = BattleManager.actor();
    $gameSystem.setBattleRowCooldown();
    Yanfly.Row.SavedBattleBgm = AudioManager.saveBgm();
    Yanfly.Row.SavedBattleBgs = AudioManager.saveBgs();
    SceneManager.push(Scene_Row);
    BattleManager._phase = 'input';
    $gameTemp._rowBattle = true;
};

Scene_Battle.prototype.prepareBackground = function() {
    Yanfly.Row.SavedBackgroundBitmap = SceneManager._backgroundBitmap;
    this._prevWindowLayer = this._windowLayer.y;
    this._windowLayer.y = Graphics.boxHeight * 495;
    SceneManager.snapForBackground();
    this._windowLayer.y = this._prevWindowLayer;
};

}; // Imported.YEP_BattleEngineCore

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================