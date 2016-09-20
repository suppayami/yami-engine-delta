//=============================================================================
// Yanfly Engine Plugins - Enhanced TP Extension - More TP Modes 1
// YEP_X_MoreTPModes1.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MoreTPModes1 = true;

var Yanfly = Yanfly || {};
Yanfly.ETP = Yanfly.ETP || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_EnhancedTP.js) Adds TP Modes 21 to 40
 * to your game!
 * @author Yanfly Engine Plugins
 *
 * @param ---Mode 21 Settings--
 * @default
 *
 * @param Mode 21 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 21 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 21 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 21 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 21 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 21 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 21 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 21 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 21 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 21 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 21 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 21 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 21 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 21 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 21 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 21 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 21 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 21 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 21 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 21 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 21 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 21 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 21 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 21 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 21 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 21 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 21 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 22 Settings--
 * @default
 *
 * @param Mode 22 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 22 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 22 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 22 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 22 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 22 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 22 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 22 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 22 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 22 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 22 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 22 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 22 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 22 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 22 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 22 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 22 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 22 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 22 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 22 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 22 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 22 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 22 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 22 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 22 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 22 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 22 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 23 Settings--
 * @default
 *
 * @param Mode 23 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 23 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 23 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 23 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 23 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 23 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 23 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 23 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 23 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 23 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 23 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 23 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 23 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 23 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 23 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 23 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 23 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 23 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 23 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 23 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 23 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 23 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 23 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 23 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 23 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 23 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 23 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 24 Settings--
 * @default
 *
 * @param Mode 24 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 24 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 24 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 24 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 24 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 24 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 24 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 24 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 24 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 24 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 24 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 24 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 24 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 24 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 24 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 24 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 24 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 24 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 24 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 24 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 24 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 24 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 24 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 24 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 24 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 24 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 24 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 25 Settings--
 * @default
 *
 * @param Mode 25 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 25 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 25 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 25 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 25 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 25 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 25 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 25 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 25 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 25 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 25 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 25 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 25 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 25 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 25 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 25 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 25 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 25 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 25 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 25 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 25 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 25 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 25 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 25 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 25 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 25 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 25 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 26 Settings--
 * @default
 *
 * @param Mode 26 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 26 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 26 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 26 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 26 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 26 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 26 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 26 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 26 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 26 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 26 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 26 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 26 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 26 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 26 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 26 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 26 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 26 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 26 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 26 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 26 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 26 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 26 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 26 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 26 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 26 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 26 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 27 Settings--
 * @default
 *
 * @param Mode 27 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 27 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 27 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 27 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 27 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 27 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 27 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 27 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 27 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 27 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 27 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 27 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 27 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 27 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 27 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 27 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 27 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 27 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 27 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 27 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 27 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 27 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 27 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 27 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 27 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 27 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 27 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 28 Settings--
 * @default
 *
 * @param Mode 28 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 28 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 28 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 28 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 28 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 28 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 28 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 28 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 28 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 28 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 28 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 28 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 28 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 28 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 28 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 28 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 28 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 28 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 28 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 28 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 28 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 28 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 28 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 28 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 28 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 28 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 28 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 29 Settings--
 * @default
 *
 * @param Mode 29 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 29 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 29 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 29 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 29 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 29 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 29 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 29 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 29 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 29 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 29 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 29 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 29 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 29 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 29 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 29 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 29 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 29 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 29 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 29 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 29 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 29 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 29 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 29 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 29 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 29 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 29 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 30 Settings--
 * @default
 *
 * @param Mode 30 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 30 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 30 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 30 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 30 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 30 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 30 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 30 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 30 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 30 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 30 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 30 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 30 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 30 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 30 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 30 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 30 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 30 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 30 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 30 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 30 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 30 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 30 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 30 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 30 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 30 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 30 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 31 Settings--
 * @default
 *
 * @param Mode 31 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 31 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 31 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 31 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 31 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 31 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 31 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 31 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 31 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 31 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 31 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 31 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 31 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 31 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 31 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 31 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 31 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 31 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 31 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 31 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 31 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 31 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 31 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 31 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 31 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 31 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 31 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 32 Settings--
 * @default
 *
 * @param Mode 32 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 32 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 32 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 32 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 32 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 32 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 32 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 32 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 32 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 32 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 32 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 32 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 32 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 32 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 32 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 32 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 32 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 32 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 32 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 32 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 32 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 32 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 32 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 32 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 32 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 32 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 32 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 33 Settings--
 * @default
 *
 * @param Mode 33 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 33 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 33 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 33 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 33 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 33 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 33 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 33 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 33 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 33 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 33 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 33 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 33 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 33 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 33 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 33 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 33 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 33 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 33 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 33 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 33 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 33 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 33 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 33 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 33 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 33 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 33 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 34 Settings--
 * @default
 *
 * @param Mode 34 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 34 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 34 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 34 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 34 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 34 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 34 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 34 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 34 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 34 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 34 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 34 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 34 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 34 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 34 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 34 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 34 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 34 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 34 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 34 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 34 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 34 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 34 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 34 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 34 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 34 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 34 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 35 Settings--
 * @default
 *
 * @param Mode 35 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 35 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 35 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 35 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 35 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 35 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 35 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 35 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 35 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 35 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 35 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 35 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 35 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 35 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 35 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 35 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 35 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 35 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 35 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 35 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 35 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 35 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 35 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 35 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 35 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 35 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 35 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 36 Settings--
 * @default
 *
 * @param Mode 36 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 36 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 36 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 36 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 36 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 36 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 36 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 36 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 36 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 36 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 36 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 36 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 36 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 36 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 36 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 36 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 36 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 36 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 36 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 36 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 36 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 36 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 36 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 36 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 36 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 36 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 36 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 37 Settings--
 * @default
 *
 * @param Mode 37 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 37 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 37 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 37 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 37 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 37 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 37 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 37 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 37 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 37 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 37 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 37 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 37 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 37 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 37 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 37 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 37 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 37 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 37 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 37 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 37 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 37 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 37 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 37 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 37 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 37 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 37 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 38 Settings--
 * @default
 *
 * @param Mode 38 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 38 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 38 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 38 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 38 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 38 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 38 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 38 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 38 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 38 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 38 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 38 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 38 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 38 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 38 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 38 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 38 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 38 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 38 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 38 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 38 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 38 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 38 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 38 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 38 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 38 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 38 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 39 Settings--
 * @default
 *
 * @param Mode 39 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 39 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 39 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 39 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 39 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 39 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 39 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 39 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 39 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 39 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 39 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 39 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 39 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 39 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 39 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 39 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 39 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 39 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 39 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 39 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 39 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 39 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 39 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 39 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 39 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 39 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 39 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 40 Settings--
 * @default
 *
 * @param Mode 40 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 40 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 40 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 40 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 40 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 40 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 40 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 40 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 40 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 40 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 40 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 40 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 40 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 40 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 40 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 40 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 40 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 40 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 40 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 40 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 40 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 40 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 40 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 40 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 40 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 40 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 40 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_EnhancedTP.
 * Make sure this plugin is located under YEP_EnhancedTP in the plugin list.
 *
 * If you have other YEP_X_MoreTPModes plugins, place them in sequential order.
 *
 * For those who think that 20 TP Modes isn't enough, this will expand the
 * amount of TP Modes for your game by another 20 for a total of 40 TP Modes!
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_EnhancedTP) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_MoreTPModes1');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ETPMax = 40;
for (Yanfly.i = 21; Yanfly.i < Yanfly.Param.ETPMax + 1; ++Yanfly.i) {
  $dataTpModes[Yanfly.i] = {
    id: Yanfly.i,
    name: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Name']),
    iconIndex: Number(Yanfly.Parameters['Mode ' + Yanfly.i + ' Icon']),
    description: 
      String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Help Line 1']) + '\n' +
      String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Help Line 2']),
    maxTp: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Max TP']),
    preserve: eval(String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Preserve'])),
    initialTp: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Initial TP']),
    regenTp: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Regen TP']),
    takeHpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Take HP DMG']),
    dealHpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Deal HP DMG']),
    healHpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Heal HP DMG']),
    allyHpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Ally HP DMG']),
    takeMpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Take MP DMG']),
    dealMpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Deal MP DMG']),
    healMpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Heal MP DMG']),
    allyMpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Ally MP DMG']),
    allyMpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Ally MP DMG']),
    dealState: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Deal State']),
    gainState: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Gain State']),
    killAlly: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Kill Ally']),
    killEnemy: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Kill Enemy']),
    winBattle: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Win Battle']),
    fleeBattle: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Flee Battle']),
    loseBattle: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Lose Battle']),
    crisisHp: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Crisis HP']),
    crisisMp: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Crisis MP']),
    onlyMember: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Only Member']),
    evasion: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Evasion'])
  }
};

//=============================================================================
// End of File
//=============================================================================
};